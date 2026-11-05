# The Systems Atlas

Ayug Poudel’s personal portfolio: a planetary map of full-stack applications, AI agents, backend engineering, and computational research.

Built with Next.js App Router, TypeScript, Tailwind CSS 4, Motion for React, custom SVG, and Lucide. The homepage and three case studies are prerendered. Fonts are bundled locally; no Google Fonts request, database, account, API key, or analytics service is needed.

## Run locally

Use Node.js 22 and npm:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For a production preview:

```sh
npm run build
npm run start
```

## Update the portfolio

All content and external links live in `src/data/site.ts`:

- `site`: name, description, email, GitHub, LinkedIn, résumé URL, and production origin.
- `projects`: featured-project summaries, technologies, attribution, and verified public source/demo URLs.
- `src/data/case-studies.ts`: complete technical narratives, sources, evidence notes, and archive entries.
- `src/data/diagrams.ts`: original architecture and workflow diagram content.
- `experiences`, `skills`, and `disciplines`: professional background and atlas categories.
- `src/data/atlas.ts`: overlapping project disciplines for multi-category filtering.

The approved résumé is published at `public/resume.pdf`, and `site.resume` points to `/resume.pdf`. Navigation and footer links open the PDF in a new tab. To update it, replace that file. Email, GitHub, LinkedIn, TAB source/video/deployment, EmpowHER source, and archive repository links are configured from verified or supplied sources. GradeSense stays private. `null` is intentional for unavailable links; case studies identify unpublished sources instead of using fake URLs.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the verified production origin, without a trailing slash. On Vercel, the production project URL is also used as a metadata fallback. Without a configured origin, local metadata uses localhost and the sitemap remains empty rather than advertising an invented domain.

## Orbital interaction

`src/components/systems-atlas.tsx` owns the planetary map. Six project planets follow intentional tilted elliptical paths around a single black-hole shadow, framed by a lensed accretion disk, narrow jets, and four orbiting star markers. Positions update directly on SVG groups through `requestAnimationFrame`; React does not rerender every frame. Hovering or focusing a planet eases orbital speed toward 10%, and leaving eases it back to full speed. Project previews persist so visitors can follow their links. Labels choose positions around neighboring planets and annotations.

The motion control stops orbit and signal animation. Reduced-motion preferences produce stationary planets and remove scroll/entrance movement. The animation skips elapsed background-tab time. Mobile includes a direct project directory below the compact map; all project links work independently of animation.

## Structure

```text
src/app/                     Homepage, metadata, loading/error/404 states
src/app/projects/[slug]/     Statically generated engineering case studies
src/components/              Atlas, navigation, diagrams, shared UI and sections
src/data/site.ts             Typed, editable content and link configuration
src/app/globals.css          Shared styles, diagrams, and case-study primitives
src/app/observatory.css      V2 identity, composition, and responsive layouts
scripts/capture-preview.mjs  Optional local screenshot capture
```

Project visuals are original **concept diagrams**, explicitly labeled as illustrations, not product screenshots. Descriptions use the supplied résumé facts. Public demo links, adoption numbers, and unspecified implementation details are not invented. Fidelity is described only with the supplied public-facing résumé summary; no internal code or links are included.

## Verify

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

The browser suite starts the production server automatically if none is running. Build first, and stop any development server before production verification. Local tests use installed Google Chrome. CI installs Playwright Chromium instead. Tests cover all case-study routes, unknown routes, metadata, keyboard navigation, orbital slowdown and motion controls, reduced motion, configuration dialogs, responsive overflow at 320–1440 px, mobile navigation, JavaScript-disabled content, and axe accessibility checks.

`npm run preview:capture` captures homepage screenshots in `/tmp` with an existing preview server. `npm run preview:cases` captures all three case studies and key GradeSense diagrams at desktop, laptop, tablet, and mobile widths. GitHub Actions runs the checks and browser suite on pushes and pull requests.

## GitHub and Vercel

The portfolio is deployed to Vercel project `ayugpoudel`: https://ayugpoudel.dev. The `www` hostname redirects permanently to the apex. Native GitHub integration is connected: pushes to `main` deploy production, and other branches/PRs use Vercel previews. See [deployment status and handoff](docs/DEPLOYMENT.md) for verification.

1. Public repository: https://github.com/ayugpoudel/ayugpoudel-portfolio, created with owner approval.
2. Keep updates on the existing `main` history without force-pushing.
3. GitHub CLI authentication is configured locally; never commit credentials.
4. Keep the existing native GitHub connection to Vercel project `ayugpoudel`, with production branch `main`. Do not create a second deployment pipeline.
5. Keep Next.js defaults, Node.js 22, and `npm run build`. `NEXT_PUBLIC_SITE_URL` is configured on Vercel as `https://ayugpoudel.dev`. No custom `vercel.json` is needed.
6. Keep Vercel-managed DNS for the registered domain. Review registration/verification messages in the owner's account. Redeploy after changing production metadata configuration.

The GitHub workflow only checks the code; it does not deploy it.

Run the same browser suite against a deployed site with:

```sh
PLAYWRIGHT_BASE_URL=https://ayugpoudel.dev npm run test:e2e
```

Remote verification skips the local server. Preview builds emit `noindex` metadata and disallow crawling; production uses route-specific canonical URLs. `.vercelignore` excludes local environment files and generated test/build artifacts from CLI uploads.

The dependency override for `@typescript-eslint/typescript-estree` uses the patched `minimatch` 11 release to address GHSA-g3hv-75wg-m249 in the lint tooling. Lint and TypeScript checks verify the override; no runtime dependency is affected.

## V3 / Complete engineering case studies

GradeSense includes the full 13-section application case study, student/instructor workflow explorer, architecture and database views, AI boundaries, attribution, and testing observations. TAB uses the specified public Node/Hono/SQLite implementation and an interactive message-to-ledger pipeline. EmpowHER distinguishes the product scope from browser scoring and the external chat API contract present in its public source.

The atlas retains the black-hole observatory and original smooth orbiting behavior. Hover/focus reveals shared-tool connections; its readout shows technologies, related projects, and direct case-study navigation. All diagrams are original illustrations. See `docs/SOURCE_REVIEW.md` for evidence and privacy decisions. No private screenshots or private source files are bundled.
