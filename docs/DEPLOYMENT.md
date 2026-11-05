# Deployment handoff

Deployment work performed November 5, 2026. No custom domain has been purchased or configured.

## Existing infrastructure

- Project root: `/Users/ayugpoudel/systems-atlas`
- Framework: Next.js 16.4.5, App Router, static homepage and three prerendered case studies
- Package manager: npm, committed lockfile
- Runtime: Node.js 22.x
- Build: `npm run build`; framework-managed output; project root `.`
- Vercel account: `ayugpoudel`; team: `app-f572` (App), Hobby
- Vercel project: `ayugpoudel`
- Project dashboard: https://vercel.com/app-f572/ayugpoudel
- Production alias: https://ayugpoudel.vercel.app
- Verified preview: https://ayugpoudel-jjepoalyq-app-f572.vercel.app
- No application secrets, database, or authentication service required.
- `NEXT_PUBLIC_SITE_URL` is public configuration, set to `https://ayugpoudel.vercel.app` in Production and Preview.
- `.vercel/` and `.env.local` are ignored. Neither contains material intended for GitHub or deployment uploads.

Vercel assigned its first deployment to production automatically. An explicitly targeted Preview deployment was then created and verified before the final production release.

## Verification

- Clean `npm ci`: successful; zero reported vulnerabilities.
- ESLint, TypeScript, production build, formatting, and `git diff --check`: successful.
- Local production-browser suite: 13 passed.
- Actual Vercel preview-browser suite: 13 passed.
- Tests cover all project routes, keyboard navigation, animated atlas slowdown and motion controls, reduced motion, JavaScript-disabled navigation, project workflow controls, accessibility, and widths 320, 390, 768, 1024, and 1440 px.
- Public GitHub profile, TAB, BETAPP, Bet-Tracker, EmpowHER, TAB video, and TAB deployment: HTTP 200.
- LinkedIn returns HTTP 999 to automated requests; manual destination check remains.
- GradeSense has no public source button or private screenshot assets.
- Secret-pattern scans of candidate Git files and existing Git history: no matches. This is a bounded pattern scan, not a guarantee about all possible sensitive content.
- Vercel upload dry run excludes local environment files, Git metadata, `.next`, `.vercel`, and dependencies. `.vercelignore` additionally excludes generated test reports and TypeScript build caches.

Final production release: https://ayugpoudel-dvmuterqg-app-f572.vercel.app (deployment `dpl_9UUvbLkafVrLh2rxnfbJpKnC5B8R`), aliased to https://ayugpoudel.vercel.app.

- Actual production-browser suite: 13 passed in 28.9 seconds.
- Homepage and all three case studies: HTTP 200, correct titles, route-specific canonical URLs, `index, follow`, and the expected email link.
- HTTP redirects to HTTPS with status 308. HTTPS requests completed with normal certificate validation.
- `robots.txt`, `sitemap.xml`, original Open Graph PNG, and favicon SVG: HTTP 200 with expected content types. Sitemap lists the production homepage and three project pages.
- Browser audit across the four pages found no page exceptions or failed same-origin asset responses.
- Preview pages use the production canonicals and `noindex, follow`.
- Preview authentication protection was disabled for this public portfolio to allow unauthenticated browser verification.
- Desktop and mobile production screenshots were captured outside the repository for review.
- The owner approved `/Users/ayugpoudel/Desktop/Ayug_Poudel_Resume.pdf`. It is copied byte-for-byte to `public/resume.pdf` and configured as `/resume.pdf`, opening in a new tab. Local verification passed: HTTP 200, `application/pdf`, and a valid PDF header. Lint, TypeScript, production build, and the updated navigation test passed.

A later screenshot navigation timed out. Follow-up requests to the production alias, direct deployment hostname, and the separate Vercel API also timed out before connecting, although DNS resolved. The earlier production checks above were performed successfully; current reachability could not be reconfirmed from this connection. Recheck the public URL and Vercel dashboard after connectivity recovers. No application change was made in response to these connection timeouts.

## GitHub integration

No Git remote existed at audit time. The owner approved a public repository, now created at https://github.com/ayugpoudel/ayugpoudel-portfolio with the existing local repository connected as `origin`. Existing history is preserved.

GitHub CLI is installed and authenticated as `ayugpoudel`. Never paste credentials into source, command output, or chat. The first Vercel Git connection attempt failed against the empty repository. After pushing `main`, retry the connection using:

```sh
vercel git connect https://github.com/ayugpoudel/ayugpoudel-portfolio.git --project ayugpoudel
```

Confirm production branch `main` in Vercel and verify a Git-triggered deployment. Native integration should handle production on `main` and previews on branches/PRs. The existing GitHub Actions workflow performs quality checks only; do not add a second deployment pipeline.

## Domain quotes and remaining steps

Vercel CLI confirmed all three available on November 5, 2026. Quotes are USD for a one-year term; availability and prices may change before purchase.

| Domain         | Initial registration | Annual renewal |
| -------------- | -------------------: | -------------: |
| ayugpoudel.dev |                $9.99 |         $13.00 |
| ayugpoudel.com |               $12.03 |         $12.03 |
| ayugpoudel.me  |               $13.99 |         $20.00 |

[Vercel's pricing table](https://vercel.com/domains/pricing) lists WHOIS privacy as included for these TLDs, without a separate privacy fee. Applicable taxes and the final total must be checked at checkout. Registration and renewal terms require owner approval; no purchase or recurring-charge authorization has been initiated.

The owner must approve the domain and complete purchase, payment, and any registrant verification. Then add apex and `www` to this existing project, use Vercel-provided project-specific records, and preserve unrelated DNS. Prefer the apex as canonical with `www` redirecting to it. Verify DNS and HTTPS before changing `NEXT_PUBLIC_SITE_URL`, redeploy, and verify canonicals, sitemap, robots, Open Graph, and redirects again. Until then, retain the verified Vercel alias.

No `.portfolio` domain is used. No assumed DNS values or future domain URLs are hardcoded in application metadata.
