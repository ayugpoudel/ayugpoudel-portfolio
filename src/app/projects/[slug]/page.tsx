import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Trophy } from 'lucide-react';
import { projects } from '@/data/site';
import { ProjectVisual } from '@/components/project-visual';
import { Reveal } from '@/components/ui';
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? {
        title: `${p.name} · Engineering case study`,
        description: p.description,
        openGraph: { title: `${p.name} — Ayug Poudel`, description: p.description },
      }
    : { title: 'Project not found' };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <article className="case-study container">
      <div className="case-topline">
        <Link href="/#work" className="text-link">
          <ArrowLeft size={15} />
          All selected work
        </Link>
        <span className="eyebrow">CASE STUDY / {p.number}</span>
      </div>
      <Reveal>
        <div className="eyebrow case-category">{p.category}</div>
        <h1 className="case-title">
          {p.name}
          <span>.</span>
        </h1>
        <p className="case-tagline">{p.title}</p>
        <p className="case-description">{p.description}</p>
        {p.award && (
          <div className="award">
            <Trophy size={15} />
            {p.award}
          </div>
        )}
        <div className="case-meta">
          <div>
            <span className="eyebrow">Built with</span>
            <div className="stack">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div className="project-availability">
            {p.github ? (
              <a href={p.github} target="_blank" rel="noopener noreferrer">
                View source
                <ArrowUpRight size={15} />
              </a>
            ) : (
              <span>Source link · not yet added</span>
            )}
            {p.demo ? (
              <a href={p.demo} target="_blank" rel="noopener noreferrer">
                Live demo
                <ArrowUpRight size={15} />
              </a>
            ) : (
              <span>Live demo · not yet added</span>
            )}
          </div>
        </div>
      </Reveal>
      <Reveal className="case-visual">
        <ProjectVisual slug={p.slug} large />
        <p>
          Illustrative system diagram · {p.name}. This is a conceptual overview, not a product
          screenshot.
        </p>
      </Reveal>
      <div className="case-body">
        <aside className="case-sidebar">
          <span className="eyebrow">Inside the build</span>
          <nav aria-label="Case study contents">
            <a href="#problem">01 / The problem</a>
            <a href="#approach">02 / Engineering approach</a>
            <a href="#decisions">03 / Technical decisions</a>
            <a href="#challenges">04 / Challenges & solutions</a>
            <a href="#outcomes">05 / Outcomes</a>
          </nav>
          <div className="case-features">
            <span className="eyebrow">At a glance</span>
            {p.features.map((f) => (
              <p key={f}>{f}</p>
            ))}
          </div>
        </aside>
        <div className="case-prose">
          <Reveal>
            <section id="problem">
              <span className="eyebrow">01 / Context</span>
              <h2>The problem</h2>
              <p>{p.problem}</p>
            </section>
          </Reveal>
          <Reveal>
            <section id="approach">
              <span className="eyebrow">02 / Implementation</span>
              <h2>The engineering approach</h2>
              <p>{p.approach}</p>
            </section>
          </Reveal>
          <Reveal>
            <section id="decisions">
              <span className="eyebrow">03 / Under the hood</span>
              <h2>Decisions that shaped the build</h2>
              <div className="decision-list">
                {p.decisions.map((d, i) => (
                  <div key={d.title}>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{d.title}</h3>
                      <p>{d.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
          <Reveal>
            <section id="challenges">
              <span className="eyebrow">04 / Tradeoffs</span>
              <h2>Challenges & solutions</h2>
              <p>{p.challenge}</p>
            </section>
          </Reveal>
          <Reveal>
            <section id="outcomes">
              <span className="eyebrow">05 / Result</span>
              <h2>What came out of it</h2>
              <p>{p.outcome}</p>
            </section>
          </Reveal>
        </div>
      </div>
      <Link className="next-project" href={`/projects/${next.slug}`}>
        <div>
          <span className="eyebrow">Continue exploring / {next.number}</span>
          <h2>{next.name}</h2>
        </div>
        <ArrowRight size={36} />
      </Link>
    </article>
  );
}
