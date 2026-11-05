import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Trophy } from 'lucide-react';
import { projects, site } from '@/data/site';
import { ProjectVisual } from '@/components/project-visual';
import { Reveal } from '@/components/ui';
import { caseStudies } from '@/data/case-studies';
import { ArchitectureDiagram, StudyFigureLabel } from '@/components/engineering-diagrams';
import { MessagePipeline, GradingWorkflow } from '@/components/workflow-explorer';
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
        ...(site.url ? { alternates: { canonical: `/projects/${p.slug}` } } : {}),
        openGraph: {
          title: `${p.name} — Ayug Poudel`,
          description: p.description,
          ...(site.url ? { url: `${site.url}/projects/${p.slug}` } : {}),
        },
        twitter: {
          card: 'summary_large_image',
          title: `${p.name} — Ayug Poudel`,
          description: p.description,
        },
      }
    : { title: 'Project not found' };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const study = caseStudies[p.slug];
  return (
    <article className="case-study container">
      <div className="case-topline">
        <Link href="/#work" className="text-link">
          <ArrowLeft size={15} />
          All selected work
        </Link>
        <span className="eyebrow">AP—{p.number} / ENGINEERING CASE FILE</span>
      </div>
      <Reveal className="case-cover">
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
        <p className="case-collaboration">{p.collaboration}</p>
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
            {p.video && (
              <a href={p.video} target="_blank" rel="noopener noreferrer">
                Watch demo
                <ArrowUpRight size={15} />
              </a>
            )}
            {p.github ? (
              <a href={p.github} target="_blank" rel="noopener noreferrer">
                View source
                <ArrowUpRight size={15} />
              </a>
            ) : (
              <span>
                {p.sourceVisibility === 'private'
                  ? 'Private team repository'
                  : 'Source not published'}
              </span>
            )}
            {p.demo ? (
              <a href={p.demo} target="_blank" rel="noopener noreferrer">
                Visit deployment
                <ArrowUpRight size={15} />
              </a>
            ) : (
              <span>No public live demo</span>
            )}
          </div>
        </div>
      </Reveal>
      <Reveal className="case-visual">
        {p.slug === 'tab' ? (
          <MessagePipeline />
        ) : p.slug === 'gradesense' ? (
          <GradingWorkflow />
        ) : (
          <ProjectVisual slug={p.slug} large />
        )}
        <StudyFigureLabel />
      </Reveal>
      <div className="study-scope">
        <div>
          <span className="eyebrow">Project scope</span>
          <p>{study.scope}</p>
        </div>
        <div>
          <span className="eyebrow">Team and contribution</span>
          <p>{study.attribution}</p>
        </div>
      </div>
      <details className="mobile-study-contents">
        <summary>
          Inside this case file{' '}
          <span>{String(study.sections.length).padStart(2, '0')} sections</span>
        </summary>
        <nav aria-label="Mobile case study contents">
          {study.sections.map((section, i) => (
            <a key={section.id} href={`#${section.id}`}>
              {String(i + 1).padStart(2, '0')} / {section.title}
            </a>
          ))}
        </nav>
      </details>
      <div className="case-body">
        <aside className="case-sidebar">
          <span className="eyebrow">Inside the application</span>
          <nav aria-label="Case study contents">
            {study.sections.map((section, i) => (
              <a key={section.id} href={`#${section.id}`}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {section.title}
              </a>
            ))}
          </nav>
          <div className="case-features">
            <span className="eyebrow">At a glance</span>
            {p.features.map((f) => (
              <p key={f}>{f}</p>
            ))}
          </div>
        </aside>
        <div className="case-prose">
          {study.sections.map((section, i) => (
            <Reveal key={section.id}>
              <section id={section.id} className="study-section">
                <span className="eyebrow">
                  {String(i + 1).padStart(2, '0')} / {section.kicker}
                </span>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.steps && (
                  <ol className="study-steps">
                    {section.steps.map((step, n) => (
                      <li key={step}>
                        <span>{String(n + 1).padStart(2, '0')}</span>
                        <p>{step}</p>
                      </li>
                    ))}
                  </ol>
                )}
                {section.items && (
                  <div className="study-items">
                    {section.items.map((item) => (
                      <div key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </div>
                )}
                {section.diagram &&
                  (section.diagram === 'tab' ? (
                    <MessagePipeline />
                  ) : (
                    <ArchitectureDiagram kind={section.diagram} />
                  ))}
                {section.note && (
                  <aside className="study-note">
                    <span>Engineering note</span>
                    <p>{section.note}</p>
                  </aside>
                )}
              </section>
            </Reveal>
          ))}
          <section className="study-evidence" aria-labelledby="study-evidence-heading">
            <span className="eyebrow">Reading the source</span>
            <h2 id="study-evidence-heading">Evidence & scope</h2>
            <p>{study.evidence}</p>
            {study.sources.length > 0 && (
              <div className="evidence-links">
                {study.sources.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.label}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            )}
          </section>
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
