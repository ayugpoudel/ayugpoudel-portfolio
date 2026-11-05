import { site } from '@/data/site';
import { ConfiguredLink } from './ui';

/** Brand silhouettes use each service's recognizable mark, without generic external arrows. */
function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.12.68-3.78-1.33-3.78-1.33-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 .1.84 2.34 3.27 1.42.1-.73.39-1.23.71-1.51-2.49-.28-5.11-1.25-5.11-5.54 0-1.22.44-2.22 1.15-3-.12-.29-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.15a10.73 10.73 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.67.11 2.96.72.78 1.15 1.78 1.15 3 0 4.3-2.62 5.25-5.12 5.53.4.35.76 1.03.76 2.08v3.11c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
    </svg>
  );
}
function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85h-2.94v-4.64c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.77 1.2-1.77 2.44v4.72H9.56V9.2h2.82v1.3h.04c.39-.74 1.35-1.53 2.78-1.53 2.97 0 3.52 1.95 3.52 4.49v5.29h.03Z" />
    </svg>
  );
}
export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`social-dock ${className}`} aria-label="Find Ayug online">
      <ConfiguredLink
        href={site.github}
        label="GitHub"
        className="social-icon github-icon"
        icon={false}
      >
        <GitHubMark />
        <span className="social-tooltip" aria-hidden="true">
          GitHub
        </span>
      </ConfiguredLink>
      <ConfiguredLink
        href={site.linkedin}
        label="LinkedIn"
        className="social-icon linkedin-icon"
        icon={false}
      >
        <LinkedInMark />
        <span className="social-tooltip" aria-hidden="true">
          LinkedIn
        </span>
      </ConfiguredLink>
    </div>
  );
}
