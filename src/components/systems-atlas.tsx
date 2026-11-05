'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Crosshair, RotateCcw } from 'lucide-react';
import { disciplines, type Category } from '@/data/site';
import { projectDisciplines, atlasProjects as planets, atlasConnections } from '@/data/atlas';

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
  const [previewId, setPreviewId] = useState<string | null>('tab');
  const [filter, setFilter] = useState<Category | null>(null);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const nodes = useRef<(SVGGElement | null)[]>([]);
  const labels = useRef<(SVGTextElement | null)[]>([]);
  const leaders = useRef<(SVGLineElement | null)[]>([]);
  const stellar = useRef<(SVGGElement | null)[]>([]);
  const connections = useRef<(SVGPathElement | null)[]>([]);
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
      atlasConnections.forEach((edge, i) => {
        const from = points[planets.findIndex((p) => p.id === edge.from)];
        const to = points[planets.findIndex((p) => p.id === edge.to)];
        connections.current[i]?.setAttribute(
          'd',
          `M${from.x} ${from.y} Q${(from.x + to.x) / 2} ${Math.min(from.y, to.y) - 45} ${to.x} ${to.y}`,
        );
      });
      planets.forEach((planet, i) => {
        const p = points[i];
        const l = layout[i];
        nodes.current[i]?.setAttribute('transform', `translate(${p.x} ${p.y})`);
        labels.current[i]?.setAttribute('x', `${l.x}`);
        labels.current[i]?.setAttribute('y', `${l.y}`);
        leaders.current[i]?.setAttribute('x2', `${l.x}`);
        leaders.current[i]?.setAttribute('y2', `${l.y > 0 ? l.y - 14 : l.y + 7}`);
      });
      stellar.current.forEach((el, i) => {
        const p = position(i % 3, [0.85, 2.5, 4.2, 5.9][i] + phase.current * (1.4 + i * 0.25));
        el?.setAttribute('transform', `translate(${p.x} ${p.y})`);
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
  const highlighted = active;
  const related = selected
    ? atlasConnections
        .filter((edge) => edge.from === selected.id || edge.to === selected.id)
        .map((edge) => ({
          node: planets.find((p) => p.id === (edge.from === selected.id ? edge.to : edge.from))!,
          shared: edge.shared,
        }))
        .sort((a, b) => b.shared.length - a.shared.length)
        .slice(0, 3)
    : [];
  function syncActive() {
    const id = hovering.current || focused.current;
    slow.current = !!id;
    setActive(id);
    if (id) setPreviewId(id);
  }
  return (
    <div
      className="atlas observatory-atlas"
      aria-label="The Systems Atlas, an interactive project map"
    >
      <div className="atlas-topline">
        <span className="eyebrow">
          <span className="status-dot" />
          The project observatory
        </span>
        <span className="atlas-edition">06 PROJECTS · ONE PERSPECTIVE</span>
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
          <title id="atlas-title">
            The Systems Atlas: projects around a black-hole observatory
          </title>
          <desc id="atlas-desc">
            Six project markers follow three orbital paths around a single black hole, framed by an
            accretion disk and light jets. Hover or focus a planet to slow the system and reveal a
            preview. Select a planet to explore its project. A motion control is below the map.
          </desc>
          <defs>
            <linearGradient id="jet-light" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#a9cfff" stopOpacity="0" />
              <stop offset=".48" stopColor="#d6eaff" stopOpacity=".5" />
              <stop offset="1" stopColor="#7c8eff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="jet-volume" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#7bafd4" stopOpacity="0" />
              <stop offset=".5" stopColor="#7bafd4" stopOpacity=".12" />
              <stop offset="1" stopColor="#7bafd4" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="field-halo">
              <stop offset="0" stopColor="#7bafd4" stopOpacity=".1" />
              <stop offset=".38" stopColor="#7bafd4" stopOpacity=".035" />
              <stop offset="1" stopColor="#7bafd4" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="disk-radiance" x1="0" y1=".7" x2="1" y2=".3">
              <stop stopColor="#7c8eff" stopOpacity=".1" />
              <stop offset=".24" stopColor="#7bafd4" stopOpacity=".5" />
              <stop offset=".55" stopColor="#e0f1ff" stopOpacity=".95" />
              <stop offset=".78" stopColor="#a8d1ee" stopOpacity=".75" />
              <stop offset="1" stopColor="#7bafd4" stopOpacity=".12" />
            </linearGradient>
            <linearGradient id="orbit-gradient">
              <stop stopColor="#7bafd4" stopOpacity=".5" />
              <stop offset=".45" stopColor="#7c8eff" stopOpacity=".12" />
              <stop offset="1" stopColor="#7bafd4" stopOpacity=".4" />
            </linearGradient>
            <pattern id="atlas-grid" width="38" height="38" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r=".65" fill="#7bafd4" opacity=".18" />
            </pattern>
          </defs>
          <rect width="680" height="570" fill="url(#atlas-grid)" />
          <g aria-hidden="true" pointerEvents="none">
            {atlasConnections.map((edge, i) => {
              const from = initialPoints[planets.findIndex((p) => p.id === edge.from)];
              const to = initialPoints[planets.findIndex((p) => p.id === edge.to)];
              return (
                <path
                  key={`${edge.from}-${edge.to}`}
                  ref={(el) => {
                    connections.current[i] = el;
                  }}
                  className="atlas-connection"
                  d={`M${from.x} ${from.y} Q${(from.x + to.x) / 2} ${Math.min(from.y, to.y) - 45} ${to.x} ${to.y}`}
                  opacity={
                    highlighted && (edge.from === highlighted || edge.to === highlighted) ? 0.22 : 0
                  }
                />
              );
            })}
          </g>
          <text x="24" y="46" className="coordinate">
            35.9049° N
          </text>
          <text x="657" y="527" textAnchor="end" className="coordinate">
            79.0469° W
          </text>
          <circle cx="340" cy="290" r="153" fill="url(#field-halo)" />
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
          <g
            className="quasar-field"
            transform="rotate(-24 340 290)"
            aria-hidden="true"
            pointerEvents="none"
          >
            <path
              className="quasar-beam"
              d="M335 240 339 100 341 100 346 240Z M335 340 340 477 342 477 346 340Z"
            />
            <path className="quasar-jet" d="M340 100V242M341 338V477" />
          </g>
          {[0.85, 2.5, 4.2, 5.9].map((a, i) => {
            const p = position(i % 3, a);
            return (
              <g
                key={i}
                ref={(el) => {
                  stellar.current[i] = el;
                }}
                transform={`translate(${p.x} ${p.y})`}
                aria-hidden="true"
                pointerEvents="none"
              >
                <circle className="stellar-point" r={i % 2 ? 1.6 : 2} />
                <path
                  className="stellar-glint"
                  d="M-4 0h8M0-4v8"
                  stroke="#b9d6ef"
                  strokeWidth=".5"
                />
              </g>
            );
          })}
          <g
            className="black-hole"
            transform="rotate(-24 340 290)"
            aria-hidden="true"
            pointerEvents="none"
          >
            {/* Far side of the disk and its lensed upper image sit behind the shadow. */}
            <ellipse
              cx="340"
              cy="290"
              rx="114"
              ry="24"
              fill="none"
              stroke="url(#disk-radiance)"
              strokeWidth="7"
              opacity=".08"
            />
            <ellipse
              cx="340"
              cy="290"
              rx="109"
              ry="21"
              fill="none"
              stroke="url(#disk-radiance)"
              strokeWidth="1"
              opacity=".55"
            />
            <path
              d="M230 290C263 286 278 287 288 264C306 218 375 217 392 264C401 286 421 287 450 290"
              fill="none"
              stroke="url(#disk-radiance)"
              strokeWidth="6"
              opacity=".07"
            />
            <path
              d="M230 290C263 286 278 287 288 264C306 218 375 217 392 264C401 286 421 287 450 290"
              fill="none"
              stroke="url(#disk-radiance)"
              strokeWidth="1.2"
              opacity=".65"
            />
            {/* One unlit shadow replaces the former globe surface entirely. */}
            <circle cx="340" cy="290" r="46" fill="#03060b" />
            <circle
              cx="340"
              cy="290"
              r="47.3"
              fill="none"
              stroke="url(#disk-radiance)"
              strokeWidth="4"
              opacity=".1"
            />
            <circle
              cx="340"
              cy="290"
              r="46.6"
              fill="none"
              stroke="url(#disk-radiance)"
              strokeWidth=".9"
              opacity=".8"
            />
            {/* The near side crosses the shadow as a band, rather than a planetary ring. */}
            <path
              d="M230 290C249 324 429 324 450 290L447 289C426 309 252 309 233 289Z"
              fill="url(#disk-radiance)"
              opacity=".3"
            />
            <path
              d="M230 290C249 324 429 324 450 290"
              fill="none"
              stroke="url(#disk-radiance)"
              strokeWidth="4"
              opacity=".14"
            />
            <path
              d="M232 290C251 317 429 317 448 290"
              fill="none"
              stroke="url(#disk-radiance)"
              strokeWidth="1.4"
            />
            <path
              d="M241 292C261 315 419 315 439 292"
              fill="none"
              stroke="url(#disk-radiance)"
              strokeWidth=".55"
              opacity=".65"
            />
          </g>
          <g className="observatory-core-label">
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
                  className={`atlas-node ${active === p.id ? 'is-active' : ''} ${filter && !projectDisciplines[p.id].includes(filter) ? 'is-dim' : ''}`}
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
          <div className="atlas-readout">
            <span className="eyebrow">
              {disciplines.find((d) => d.id === selected.category)?.label}
            </span>
            <strong>{selected.name}</strong>
            <p>{selected.caption}</p>
            <div className="preview-tech">{selected.technologies.join(' / ')}</div>
            <div className="atlas-related">
              <span>Shared engineering ↳</span>
              {related.map(({ node, shared }) => (
                <a key={node.id} href={node.href} title={`Shares ${shared.join(', ')}`}>
                  {node.name}
                </a>
              ))}
            </div>
            <a href={selected.href} className="preview-open-case">
              {selected.href.startsWith('/projects/')
                ? 'Open complete case study'
                : 'View engineering experience'}
              <ArrowUpRight size={13} />
            </a>
          </div>
        ) : (
          <div className="atlas-instruction">
            <Crosshair size={17} />
            <span>
              A connected view of my engineering work.
              <small>Hover to slow the orbits. Select a project to explore.</small>
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
      <details className="atlas-directory">
        <summary>Choose a project coordinate</summary>
        <div className="atlas-directory-grid">
          {planets.map((p) => (
            <button key={p.id} aria-pressed={previewId === p.id} onClick={() => setPreviewId(p.id)}>
              {p.name}
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}
