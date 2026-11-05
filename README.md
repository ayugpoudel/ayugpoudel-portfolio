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
- `projects`: the three case studies, technologies, and optional public source/demo URLs.
- `experiences`, `skills`, and `disciplines`: professional background and atlas categories.

**Finish these placeholders before publishing:** set the verified email, GitHub, LinkedIn, and résumé links; add public project source/demo URLs where available. `null` is intentional: missing site links open an availability dialog, and case studies explicitly identify unavailable links. No fake external URLs are included. Add your real résumé PDF to `public/resume.pdf` and set `site.resume` to `/resume.pdf` when ready.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the verified production origin, without a trailing slash. On Vercel, the production project URL is also used as a metadata fallback. Without a configured origin, local metadata uses localhost and the sitemap remains empty rather than advertising an invented domain.

## Orbital interaction

`src/components/systems-atlas.tsx` owns the planetary map. Six planets follow intentional tilted elliptical paths. Positions update directly on SVG groups through `requestAnimationFrame`; React does not rerender every frame. Hovering or focusing a planet eases orbital speed toward 10%, and leaving eases it back to full speed. Project previews persist so visitors can follow their links. Labels choose positions around neighboring planets and annotations.

The motion control stops orbit and signal animation. Reduced-motion preferences produce stationary planets and remove scroll/entrance movement. The animation skips elapsed background-tab time. Mobile includes a direct project directory below the compact map; all project links work independently of animation.

## Structure

```text
src/app/                     Homepage, metadata, loading/error/404 states
src/app/projects/[slug]/     Statically generated engineering case studies
src/components/              Atlas, navigation, diagrams, shared UI and sections
src/data/site.ts             Typed, editable content and link configuration
src/app/globals.css          Visual system and responsive layouts
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

`npm run preview:capture` captures local screenshots in `/tmp` with an existing preview server. GitHub Actions runs the checks and browser suite on pushes and pull requests.

## GitHub and Vercel

This repository is prepared locally; nothing is pushed or deployed automatically.

1. Review content and set the verified links above.
2. Create an empty GitHub repository and add its real URL as `origin`.
3. Commit and push when ready.
4. Import that repository in Vercel, select the Next.js framework preset and Node.js 22, and set `NEXT_PUBLIC_SITE_URL`.
5. Use the default `npm run build` build command and framework-managed output. No custom `vercel.json` is needed.
6. Review the Vercel preview before promoting production.

The GitHub workflow only checks the code; it does not deploy it.

The dependency override for `@typescript-eslint/typescript-estree` uses the patched `minimatch` 11 release to address GHSA-g3hv-75wg-m249 in the lint tooling. Lint and TypeScript checks verify the override; no runtime dependency is affected.
