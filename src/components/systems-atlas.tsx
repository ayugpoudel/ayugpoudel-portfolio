'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Crosshair, RotateCcw } from 'lucide-react';
import { disciplines, type Category } from '@/data/site';

type Planet = {
  id: string;
  name: string;
  category: Category;
  caption: string;
  href: string;
  orbit: number;
  phase: number;
  radius: number;
};
const planets: Planet[] = [
  {
    id: 'tab',
    name: 'TAB',
    category: 'ai',
    caption: 'AI-assisted shared expenses. Built around the group.',
    href: '/projects/tab',
    orbit: 0,
    phase: 0.4,
    radius: 10,
  },
  {
    id: 'gradesense',
    name: 'GradeSense',
    category: 'fullstack',
    caption: 'A structured path from grade appeal to resolution.',
    href: '/projects/gradesense',
    orbit: 1,
    phase: 3.7,
    radius: 12,
  },
  {
    id: 'empowher',
    name: 'EmpowHER',
    category: 'ai',
    caption: 'Four connected career tools. First place at FidHacks 2025.',
    href: '/projects/empowher',
    orbit: 2,
    phase: 5.1,
    radius: 9,
  },
  {
    id: 'porch',
    name: 'Porch',
    category: 'backend',
    caption: 'Backend APIs and data models for a neighborhood iOS platform.',
    href: '/#porch',
    orbit: 1,
    phase: 0.9,
    radius: 8,
  },
  {
    id: 'fidelity',
    name: 'Developer Hub',
    category: 'fullstack',
    caption: 'A developer hub bringing 40+ versioned AI prototypes together.',
    href: '/#fidelity',
    orbit: 2,
    phase: 2.3,
    radius: 8,
  },
  {
    id: 'research',
    name: 'Materials Research',
    category: 'data',
    caption: 'Python pipelines for computational materials research.',
    href: '/#research',
    orbit: 0,
    phase: 3.6,
    radius: 7,
  },
];
const orbits = [
  { rx: 133, ry: 73 },
  { rx: 211, ry: 116 },
  { rx: 284, ry: 159 },
];
const tilt = -0.43;
function position(orbit: number, angle: number) {
  const { rx, ry } = orbits[orbit];
  const x = Math.cos(angle) * rx;
  const y = Math.sin(angle) * ry;
  return {
    x: 340 + x * Math.cos(tilt) - y * Math.sin(tilt),
    y: 290 + x * Math.sin(tilt) + y * Math.cos(tilt),
  };
}
type Point = { x: number; y: number };
type LabelBox = { x: number; y: number; w: number; h: number };
function labelLayout(points: Point[], widths: number[]) {
  const occupied: LabelBox[] = [
    { x: 272, y: 221, w: 136, h: 136 },
    { x: 268, y: 363, w: 144, h: 36 },
  ];
  const intersects = (a: LabelBox, b: LabelBox) =>
    a.x < b.x + b.w + 7 && a.x + a.w + 7 > b.x && a.y < b.y + b.h + 6 && a.y + a.h + 6 > b.y;
  return points.map((point, i) => {
    const w = widths[i] || planets[i].name.length * 7.2;
    const radius = planets[i].radius;
    const candidates = [
      { x: 0, y: radius + 24 },
      { x: 0, y: -radius - 15 },
      { x: w / 2 + radius + 14, y: 4 },
      { x: -w / 2 - radius - 14, y: 4 },
      { x: 0, y: radius + 46 },
      { x: 0, y: -radius - 37 },
      { x: w / 2 + radius + 14, y: -24 },
      { x: -w / 2 - radius - 14, y: -24 },
    ];
    const boxes = candidates.map((c) => {
      const x = Math.max(12 + w / 2, Math.min(668 - w / 2, point.x + c.x));
      return { x: x - w / 2, y: point.y + c.y - 11, w, h: 15 };
    });
    const nodeBoxes = points.map((p, n) => ({
      x: p.x - planets[n].radius - 4,
      y: p.y - planets[n].radius - 4,
      w: (planets[n].radius + 4) * 2,
      h: (planets[n].radius + 4) * 2,
    }));
    const box =
      boxes.find(
        (b) => !occupied.some((o) => intersects(b, o)) && !nodeBoxes.some((o) => intersects(b, o)),
      ) || boxes[boxes.length - 1];
    occupied.push(box);
    return { x: box.x + w / 2 - point.x, y: box.y + 11 - point.y };
  });
}
const initialPoints = planets.map((p) => position(p.orbit, p.phase));
const initialLabels = labelLayout(
  initialPoints,
  planets.map((p) => p.name.length * 7.2),
);
export function SystemsAtlas() {
  const [active, setActive] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Category | null>(null);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const nodes = useRef<(SVGGElement | null)[]>([]);
  const labels = useRef<(SVGTextElement | null)[]>([]);
  const leaders = useRef<(SVGLineElement | null)[]>([]);
  const slow = useRef(false);
  const hovering = useRef<string | null>(null);
  const focused = useRef<string | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const phase = useRef(0);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let previous = 0;
    let speed = 1;
    let widths = planets.map((p) => p.name.length * 7.2);
    function measure() {
      widths = labels.current.map((el, i) => el?.getComputedTextLength() || widths[i]);
    }
    measure();
    let mounted = true;
    void document.fonts.ready.then(() => {
      if (mounted) measure();
    });
    const observer = new ResizeObserver(measure);
    if (stage.current) observer.observe(stage.current);
    function tick(time: number) {
      const dt = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
      previous = time;
      speed += ((slow.current ? 0.1 : 1) - speed) * (1 - Math.exp(-dt * 3.5));
      if (!query.matches && motionEnabled && !document.hidden) phase.current += dt * 0.095 * speed;
      const points = planets.map((planet) =>
        position(planet.orbit, planet.phase + phase.current * [1, 0.72, 0.5][planet.orbit]),
      );
      const layout = labelLayout(points, widths);
      planets.forEach((planet, i) => {
        const p = points[i];
        const l = layout[i];
        nodes.current[i]?.setAttribute('transform', `translate(${p.x} ${p.y})`);
        labels.current[i]?.setAttribute('x', `${l.x}`);
        labels.current[i]?.setAttribute('y', `${l.y}`);
        leaders.current[i]?.setAttribute('x2', `${l.x}`);
        leaders.current[i]?.setAttribute('y2', `${l.y > 0 ? l.y - 14 : l.y + 7}`);
      });
      if (!query.matches && motionEnabled) raf = requestAnimationFrame(tick);
    }
    function start() {
      cancelAnimationFrame(raf);
      previous = 0;
      raf = requestAnimationFrame(tick);
    }
    start();
    query.addEventListener('change', start);
    return () => {
      mounted = false;
      observer.disconnect();
      cancelAnimationFrame(raf);
      query.removeEventListener('change', start);
    };
  }, [motionEnabled]);
  const selected = planets.find((p) => p.id === previewId);
  function syncActive() {
    const id = hovering.current || focused.current;
    slow.current = !!id;
    setActive(id);
    if (id) setPreviewId(id);
  }
  return (
    <div className="atlas" aria-label="The Systems Atlas, an interactive project map">
      <div className="atlas-topline">
        <span className="eyebrow">
          <span className="status-dot" />
          The systems atlas
        </span>
        <span className="atlas-edition">INTERACTIVE / 01</span>
      </div>
      <div
        className="atlas-stage"
        ref={stage}
        onPointerMove={(e) => {
          if (
            e.pointerType !== 'mouse' ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
          )
            return;
          const r = e.currentTarget.getBoundingClientRect();
          stage.current?.style.setProperty(
            '--px',
            `${((e.clientX - r.left) / r.width - 0.5) * 5}px`,
          );
          stage.current?.style.setProperty(
            '--py',
            `${((e.clientY - r.top) / r.height - 0.5) * 5}px`,
          );
        }}
        onPointerLeave={() => {
          stage.current?.style.setProperty('--px', '0px');
          stage.current?.style.setProperty('--py', '0px');
        }}
      >
        <svg
          className={`atlas-svg ${active ? 'has-active' : ''} ${!motionEnabled ? 'motion-paused' : ''}`}
          viewBox="0 0 680 570"
          role="group"
          aria-labelledby="atlas-title atlas-desc"
        >
          <title id="atlas-title">Projects orbiting Ayug’s engineering world</title>
          <desc id="atlas-desc">
            Six project planets follow three orbital paths. Hover or focus a planet to slow the
            system and reveal a preview. Select a planet to explore its project. A motion control is
            below the map.
          </desc>
          <defs>
            <radialGradient id="planet-body" cx="29%" cy="24%" r="85%">
              <stop offset="0" stopColor="#7bafd4" />
              <stop offset=".36" stopColor="#345d83" />
              <stop offset=".75" stopColor="#142c46" />
              <stop offset="1" stopColor="#090e16" />
            </radialGradient>
            <radialGradient id="atmosphere">
              <stop offset=".48" stopColor="#7bafd4" stopOpacity=".12" />
              <stop offset=".68" stopColor="#7bafd4" stopOpacity=".05" />
              <stop offset="1" stopColor="#7bafd4" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="orbit-gradient">
              <stop stopColor="#7bafd4" stopOpacity=".5" />
              <stop offset=".45" stopColor="#7c8eff" stopOpacity=".12" />
              <stop offset="1" stopColor="#7bafd4" stopOpacity=".4" />
            </linearGradient>
            <pattern id="atlas-grid" width="38" height="38" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r=".65" fill="#7bafd4" opacity=".18" />
            </pattern>
            <clipPath id="world-clip">
              <circle cx="340" cy="290" r="59" />
            </clipPath>
          </defs>
          <rect width="680" height="570" fill="url(#atlas-grid)" />
          <g className="atlas-crosshairs" stroke="#7bafd4" opacity=".28" strokeWidth=".7">
            <path d="M25 80h12m-6-6v12M634 80h12m-6-6v12M25 483h12m-6-6v12M634 483h12m-6-6v12" />
            <path d="M340 55v32M340 494v25M20 290h30M630 290h30" />
          </g>
          <text x="24" y="46" className="coordinate">
            35.9049° N
          </text>
          <text x="657" y="527" textAnchor="end" className="coordinate">
            79.0469° W
          </text>
          <circle cx="340" cy="290" r="153" fill="url(#atmosphere)" />
          <g transform="rotate(-24.637 340 290)" fill="none">
            {orbits.map((o, i) => (
              <g key={i}>
                <ellipse
                  cx="340"
                  cy="290"
                  rx={o.rx}
                  ry={o.ry}
                  stroke="url(#orbit-gradient)"
                  strokeWidth={i === 1 ? 1 : 0.7}
                />
                <ellipse
                  className="orbit-signal"
                  cx="340"
                  cy="290"
                  rx={o.rx}
                  ry={o.ry}
                  stroke="#98c9ee"
                  strokeWidth="1.4"
                  strokeDasharray="3 820"
                  style={{ animationDelay: `${i * -7}s`, animationDuration: `${24 + i * 8}s` }}
                />
              </g>
            ))}
            <ellipse
              cx="340"
              cy="290"
              rx="317"
              ry="180"
              stroke="#7bafd4"
              strokeOpacity=".09"
              strokeDasharray="2 7"
            />
          </g>
          <g className="world">
            <circle cx="340" cy="290" r="63" fill="none" stroke="#7bafd4" strokeOpacity=".2" />
            <circle
              cx="340"
              cy="290"
              r="59"
              fill="url(#planet-body)"
              stroke="#a7d5f6"
              strokeOpacity=".5"
            />
            <g
              clipPath="url(#world-clip)"
              fill="none"
              stroke="#acd4ed"
              strokeWidth=".6"
              opacity=".24"
            >
              <ellipse cx="340" cy="290" rx="25" ry="59" />
              <ellipse cx="340" cy="290" rx="47" ry="59" />
              <ellipse cx="340" cy="290" rx="59" ry="23" />
              <ellipse cx="340" cy="273" rx="57" ry="20" />
              <ellipse cx="340" cy="311" rx="56" ry="20" />
              <path d="M280 290h120M340 230v120" />
              <path
                d="M300 256l18-8 12 9-5 15 11 8-4 12-17-3-9 15-9-11 7-13-6-9zm48 34 18-9 20 9-7 13-17 3-7 21-13-6 5-15z"
                fill="#a3d0ee"
                fillOpacity=".35"
                strokeOpacity=".5"
              />
            </g>
            <circle cx="319" cy="256" r="2" fill="#c9e8ff" />
            <path d="M314 254l-15-15h-37" fill="none" stroke="#7bafd4" strokeOpacity=".6" />
            <text x="258" y="235" textAnchor="end" className="planet-callout">
              CHAPEL HILL, NC
            </text>
            <text x="340" y="378" textAnchor="middle" className="world-label">
              AYUG POUDEL
            </text>
            <text x="340" y="394" textAnchor="middle" className="coordinate">
              ENGINEER / BUILDER
            </text>
          </g>
          {planets.map((p, i) => {
            const pos = position(p.orbit, p.phase);
            const color = disciplines.find((d) => d.id === p.category)!.color;
            return (
              <g
                key={p.id}
                ref={(el) => {
                  nodes.current[i] = el;
                }}
                transform={`translate(${pos.x} ${pos.y})`}
              >
                <a
                  href={p.href}
                  className={`atlas-node ${active === p.id ? 'is-active' : ''} ${filter && filter !== p.category ? 'is-dim' : ''}`}
                  aria-label={`${p.name}: ${p.caption}`}
                  onMouseEnter={() => {
                    hovering.current = p.id;
                    syncActive();
                  }}
                  onMouseLeave={() => {
                    hovering.current = null;
                    syncActive();
                  }}
                  onFocus={() => {
                    focused.current = p.id;
                    syncActive();
                  }}
                  onBlur={() => {
                    focused.current = null;
                    syncActive();
                  }}
                  style={{ '--node-color': color } as React.CSSProperties}
                >
                  <title>{`${p.name} — ${p.caption}`}</title>
                  <line
                    ref={(el) => {
                      leaders.current[i] = el;
                    }}
                    x1="0"
                    y1="0"
                    x2={initialLabels[i].x}
                    y2={initialLabels[i].y - 14}
                    stroke={color}
                    strokeOpacity=".22"
                    strokeWidth=".6"
                  />
                  <circle className="node-hit" r="23" fill="transparent" />
                  <circle
                    className="node-halo"
                    r={p.radius + 8}
                    fill={color}
                    fillOpacity=".06"
                    stroke={color}
                    strokeOpacity=".18"
                  />
                  <circle r={p.radius} fill="#101c2d" stroke={color} strokeWidth="1.2" />
                  <circle
                    cx={-p.radius * 0.27}
                    cy={-p.radius * 0.28}
                    r={p.radius * 0.52}
                    fill={color}
                    fillOpacity=".7"
                  />
                  <circle r="2" fill="#eaf1f7" />
                  <text
                    ref={(el) => {
                      labels.current[i] = el;
                    }}
                    x={initialLabels[i].x}
                    y={initialLabels[i].y}
                    textAnchor="middle"
                    className="node-label"
                  >
                    {p.name}
                  </text>
                </a>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="atlas-preview" aria-live="polite" aria-atomic="true">
        {selected ? (
          <a href={selected.href}>
            <div>
              <span className="eyebrow">
                {disciplines.find((d) => d.id === selected.category)?.label}
              </span>
              <strong>
                {selected.name}
                <ArrowUpRight size={17} />
              </strong>
              <p>{selected.caption}</p>
            </div>
          </a>
        ) : (
          <div className="atlas-instruction">
            <Crosshair size={17} />
            <span>
              A small universe of things I build.
              <small>Hover a planet to slow down. Click to explore.</small>
            </span>
          </div>
        )}
      </div>
      <div className="atlas-legend" aria-label="Highlight a discipline">
        {disciplines.map((d) => (
          <button
            key={d.id}
            className={filter === d.id ? 'selected' : ''}
            onClick={() => setFilter(filter === d.id ? null : d.id)}
            aria-pressed={filter === d.id}
          >
            <span style={{ background: d.color }} />
            {d.label}
          </button>
        ))}
        <button
          className="motion-toggle"
          onClick={() => setMotionEnabled(!motionEnabled)}
          aria-label={motionEnabled ? 'Pause orbital animation' : 'Resume orbital animation'}
          aria-pressed={!motionEnabled}
        >
          <RotateCcw size={13} />
          <span className="sr-only">{motionEnabled ? 'Pause' : 'Resume'}</span>
        </button>
      </div>
      <div className="atlas-mobile-index" aria-label="Project directory">
        {planets.map((p) => (
          <a key={p.id} href={p.href}>
            <span
              className="tiny-dot"
              style={{ background: disciplines.find((d) => d.id === p.category)?.color }}
            />
            {p.name}
            <ArrowUpRight size={13} />
          </a>
        ))}
      </div>
    </div>
  );
}
