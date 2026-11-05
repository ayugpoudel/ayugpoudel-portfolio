import Link from 'next/link';
import { ArrowDown, ArrowUpRight, ArrowUp, Asterisk, Trophy, ArrowRight } from 'lucide-react';
import { site, projects, experiences, skills } from '@/data/site';
import { ConfiguredLink, Reveal, SectionHeading } from './ui';
import { SystemsAtlas } from './systems-atlas';
import { ProjectVisual } from './project-visual';
import { SocialLinks } from './social-links';
import { ArchitectureDiagram } from './engineering-diagrams';
import { engineeringArchive } from '@/data/case-studies';
export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-heading">
      <div className="observatory-mast">
        <span className="observatory-index">AP / ENGINEERING OBSERVATORY</span>
        <span>SOFTWARE · DATA · INTELLIGENCE</span>
        <span className="observatory-location">
          Chapel Hill, NC <span className="tiny-dot" />
        </span>
      </div>
      <div className="hero-layout hero-layout-v3">
        <Reveal className="hero-mission">
          <div className="hero-label">
            <span className="mission-rule" />
            Ideas, connected. Systems, built.
          </div>
          <h1 id="hero-heading">
            <span className="hero-line">From ideas to</span>{' '}
            <em className="hero-line">working systems.</em>
          </h1>
        </Reveal>
        <Reveal className="hero-context" delay={0.12}>
          <p className="hero-intro">
            I’m Ayug, a Computer Science and Statistics student at UNC–Chapel Hill. I build
            full-stack applications, AI-powered tools, and backend systems that turn complicated
            problems into useful software.
          </p>
          <a className="explore-action" href="#work" aria-label="Explore projects">
            <span className="explore-symbol">
              <ArrowDown size={19} />
            </span>
            <span>
              Explore projects<small>Three complete applications, examined up close</small>
            </span>
          </a>
          <div className="hero-footnote">
            <span className="footnote-index">01—06</span>
            <span>
              Messaging. Applications. Data.
              <br />
              Follow the shared engineering.
            </span>
          </div>
        </Reveal>
        <Reveal className="hero-atlas" delay={0.2}>
          <SystemsAtlas />
        </Reveal>
      </div>
      <div className="hero-bottom">
        <span className="hero-signature">Making complex systems feel simple.</span>
        <SocialLinks className="hero-socials" />
        <a href="#work">
          Open the case files
          <ArrowDown size={13} />
        </a>
      </div>
    </section>
  );
}
export function ProjectShowcase() {
  return (
    <section id="work" className="section container">
      <SectionHeading
        number="01"
        label="Engineering case files"
        title="Open the case files."
        description="The problem, the decisions, and the system that came out of it. Three builds, examined up close."
      />
      <div className="projects case-file-grid">
        {projects.map((p, i) => (
          <Reveal key={p.slug}>
            <article className={`project-row project-row-${i}`}>
              <div className="case-file-tab">
                <span>AP—{p.number}</span>
                <span>ENGINEERING RECORD</span>
                <span aria-hidden="true">↳</span>
              </div>
              <Link
                className="project-art-link"
                href={`/projects/${p.slug}`}
                aria-label={`Explore ${p.name}`}
              >
                <ProjectVisual slug={p.slug} />
                <span className="art-link-indicator">
                  <ArrowUpRight size={20} />
                </span>
              </Link>
              <div className="project-copy">
                <div className="project-kicker">
                  <span className="project-number">
                    {p.number}
                    <span>/ 03</span>
                  </span>
                  <span className="eyebrow">{p.category}</span>
                </div>
                {p.award && (
                  <div className="award">
                    <Trophy size={13} />
                    {p.award}
                  </div>
                )}
                <Link href={`/projects/${p.slug}`} className="project-title">
                  <h3>{p.name}</h3>
                  <ArrowUpRight aria-hidden="true" size={27} />
                </Link>
                <p className="project-tagline">{p.tagline}</p>
                <p className="project-description">{p.description}</p>
                <div className="stack">
                  <span className="stack-field">Built with</span>
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <div className="project-record-meta">
                  <span>
                    {p.sourceVisibility === 'private'
                      ? 'Private source · team project'
                      : 'Public source · team project'}
                  </span>
                  <span>
                    {p.slug === 'tab'
                      ? 'HackNC 2026 / devnet'
                      : p.slug === 'gradesense'
                        ? 'Complete LearnWithAI feature'
                        : 'FidHacks 2025 / winner'}
                  </span>
                </div>
                <Link href={`/projects/${p.slug}`} className="text-link">
                  Read case file
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="more-work">
        <span className="eyebrow">
          <Asterisk size={16} />
          Beyond selected work
        </span>
        <a href="#porch">
          Porch<span>Backend / iOS community platform</span>
          <ArrowUpRight size={18} />
        </a>
        <a href="#research">
          Materials Research<span>Python / Computational science</span>
          <ArrowUpRight size={18} />
        </a>
      </Reveal>
    </section>
  );
}
export function ExperienceTimeline() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <SectionHeading
          number="02"
          label="Engineering log"
          title="A record of building."
          description="From industry tooling to scientific research. Taking responsibility for the systems behind the interface."
        />
        <div className="timeline">
          {experiences.map((e, i) => (
            <Reveal key={e.id}>
              <article className="experience-entry" id={e.id}>
                <div className="experience-date">
                  <span className="timeline-dot" />
                  <span>{e.dates}</span>
                  <small>{e.tag}</small>
                </div>
                <div className="experience-content">
                  <div className="experience-title">
                    <div>
                      <h3>{e.company}</h3>
                      <p>{e.role}</p>
                    </div>
                    <span className="experience-index">0{i + 1}</span>
                  </div>
                  <p className="experience-summary">{e.description}</p>
                  <ul>
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  {e.metrics.length > 0 && (
                    <div className="metrics">
                      {e.metrics.map((m) => (
                        <div key={m.label}>
                          <strong>{m.value}</strong>
                          <span>{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="experience-architecture">
                  <ArchitectureDiagram
                    kind={
                      e.id === 'fidelity' ? 'fidelity' : e.id === 'porch' ? 'porch' : 'research'
                    }
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
export function TechnicalProfile() {
  return (
    <section id="about" className="section container about-section">
      <SectionHeading
        number="03"
        label="About / Technical profile"
        title="The person behind the systems."
      />
      <div className="about-grid">
        <Reveal className="about-story">
          <p className="about-lead">
            I like the moment when a complicated problem starts to make sense.
          </p>
          <p className="about-body">
            That’s what connects my work across full-stack applications, AI agents, backend
            engineering, and research. I’m interested in how the pieces fit together—and how to make
            the result useful to the person on the other side of the screen.
          </p>
          <div className="education">
            <span className="eyebrow">Currently studying</span>
            <h3>
              University of North Carolina
              <br />
              at Chapel Hill
            </h3>
            <p>
              B.S. in Computer Science and Statistics
              <br />
              Double Major · Expected May 2028
            </p>
            <span className="education-coordinate">35.9049° N / 79.0469° W</span>
          </div>
        </Reveal>
        <Reveal className="technical-profile">
          <div className="technical-header">
            <span className="eyebrow">The engineering toolkit</span>
            <span className="tiny-dot" />
          </div>
          {skills.map(([label, tools], i) => (
            <div className="skill-row" key={label}>
              <span className="skill-index">0{i + 1}</span>
              <h3>{label}</h3>
              <p>{tools}</p>
            </div>
          ))}
          <div className="profile-footnote">
            <span className="mini-cross">+</span>Different tools. Connected thinking.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export function ContactFooter() {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <Reveal className="contact-heading">
          <div className="contact-coordinate">
            <span>04 / OPEN CHANNEL</span>
            <span className="contact-signal" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>Chapel Hill → wherever you are</span>
          </div>
          <div className="contact-message">
            <span className="eyebrow">Have something in mind?</span>
            <h2>
              Let’s connect
              <br />
              <em>the next dot.</em>
            </h2>
            <ConfiguredLink
              href={site.email ? `mailto:${site.email}` : null}
              label="Start a conversation"
              className="contact-button"
              icon={false}
            >
              <span aria-hidden="true">Start a conversation</span>
              <ArrowRight size={20} />
            </ConfiguredLink>
          </div>
          <div className="contact-dock">
            <span className="eyebrow">Elsewhere on the internet</span>
            <SocialLinks />
            <ConfiguredLink
              href={site.resume}
              label="Résumé.pdf"
              className="footer-document"
              icon={false}
            />
          </div>
        </Reveal>
        <div className="footer-bottom">
          <Link href="/" className="footer-name">
            Ayug Poudel<span>© {new Date().getFullYear()}</span>
          </Link>
          <span className="footer-note">Designed as a system. Built with intention.</span>
          <div className="footer-links">
            <a href="#top">
              Back to top
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function EngineeringArchive() {
  return (
    <section id="archive" className="section container engineering-archive">
      <SectionHeading
        number="A"
        label="Engineering archive"
        title="Smaller builds. Useful experiments."
        description="Public repositories beyond the featured work, with their implementation scope kept visible."
      />
      <div className="archive-records">
        {engineeringArchive.map((entry, i) => (
          <Reveal key={entry.name}>
            <article className="archive-record">
              <span className="archive-index">A—0{i + 1}</span>
              <div>
                <span className="eyebrow">{entry.kind}</span>
                <h3>
                  <a href={entry.url} target="_blank" rel="noopener noreferrer">
                    {entry.name}
                    <ArrowUpRight size={19} />
                  </a>
                </h3>
                <p>{entry.description}</p>
                <div className="archive-stack">{entry.stack.join(' / ')}</div>
                <p className="archive-limitation">{entry.limitation}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <a
        className="text-link archive-github"
        href={site.github!}
        target="_blank"
        rel="noopener noreferrer"
      >
        Browse the GitHub profile
        <ArrowUpRight size={15} />
      </a>
    </section>
  );
}
