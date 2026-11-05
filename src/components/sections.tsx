import Link from 'next/link';
import { ArrowDown, ArrowUpRight, ArrowUp, Asterisk, Trophy, ArrowRight } from 'lucide-react';
import { site, projects, experiences, skills } from '@/data/site';
import { ConfiguredLink, Reveal, SectionHeading } from './ui';
import { SystemsAtlas } from './systems-atlas';
import { ProjectVisual } from './project-visual';
export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-heading">
      <div className="hero-layout">
        <div className="hero-copy">
          <Reveal>
            <div className="eyebrow hero-label">
              <span className="status-dot" />
              Software engineer · UNC–Chapel Hill
            </div>
            <h1 id="hero-heading">
              <span className="hero-line">Making</span>{' '}
              <span className="hero-line">complex systems</span>{' '}
              <span className="hero-line hero-line-accent">
                feel simple.
                <span className="headline-period" aria-hidden="true">
                  ✳
                </span>
              </span>
            </h1>
            <p className="hero-intro">
              I’m Ayug, a Computer Science and Statistics student at UNC–Chapel Hill. I build
              full-stack applications, AI-powered tools, and backend systems that turn complicated
              problems into useful software.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Explore my work
                <ArrowDown size={17} />
              </a>
              <ConfiguredLink href={site.resume} label="View résumé" className="button secondary" />
            </div>
            <div className="social-links">
              <ConfiguredLink href={site.github} label="GitHub" />
              <ConfiguredLink href={site.linkedin} label="LinkedIn" />
              <span className="social-location">Based in North Carolina</span>
            </div>
          </Reveal>
        </div>
        <Reveal className="hero-atlas" delay={0.12}>
          <SystemsAtlas />
        </Reveal>
      </div>
      <div className="hero-bottom">
        <span>
          <span className="mini-cross">+</span>Systems thinking. Human outcomes.
        </span>
        <a href="#work">
          Scroll to discover <ArrowDown size={13} />
        </a>
        <span className="hero-bottom-right">PORTFOLIO / VOL. 01 — 2026</span>
      </div>
    </section>
  );
}
export function ProjectShowcase() {
  return (
    <section id="work" className="section container">
      <SectionHeading
        number="01"
        label="Selected work"
        title="Ideas, put into orbit."
        description="A few things I’ve built. Each one a different problem, connected by the same engineering mindset."
      />
      <div className="projects">
        {projects.map((p, i) => (
          <Reveal key={p.slug}>
            <article className={`project-row project-row-${i}`}>
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
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <Link href={`/projects/${p.slug}`} className="text-link">
                  Explore the project
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
          label="Experience"
          title="Built in the real world."
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
        title="Curiosity, with structure."
      />
      <div className="about-grid">
        <Reveal>
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
          <div>
            <span className="eyebrow">
              <span className="status-dot" />
              Let’s connect
            </span>
            <h2>
              Good things start
              <br />
              with a conversation<span>.</span>
            </h2>
          </div>
          <ConfiguredLink
            href={site.email ? `mailto:${site.email}` : null}
            label="Say hello"
            className="contact-button"
          />
        </Reveal>
        <div className="footer-bottom">
          <Link href="/" className="footer-name">
            Ayug Poudel<span>© {new Date().getFullYear()}</span>
          </Link>
          <span className="footer-note">Designed as a system. Built with intention.</span>
          <div className="footer-links">
            <ConfiguredLink href={site.github} label="GitHub" />
            <ConfiguredLink href={site.linkedin} label="LinkedIn" />
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
