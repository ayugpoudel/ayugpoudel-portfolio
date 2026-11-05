# Deployment handoff

Deployment work performed November 5, 2026. The owner purchased `ayugpoudel.dev` through Vercel, and the domain is connected to the existing portfolio project with HTTPS.

## Existing infrastructure

- Project root: `/Users/ayugpoudel/systems-atlas`
- Framework: Next.js 16.4.5, App Router, static homepage and three prerendered case studies
- Package manager: npm, committed lockfile
- Runtime: Node.js 22.x
- Build: `npm run build`; framework-managed output; project root `.`
- Vercel account: `ayugpoudel`; team: `app-f572` (App), Hobby
- Vercel project: `ayugpoudel`
- Project dashboard: https://vercel.com/app-f572/ayugpoudel
- Production domain: https://ayugpoudel.dev
- Vercel fallback alias: https://ayugpoudel.vercel.app
- Verified preview: https://ayugpoudel-jjepoalyq-app-f572.vercel.app
- No application secrets, database, or authentication service required.
- `NEXT_PUBLIC_SITE_URL` is public configuration, set to `https://ayugpoudel.dev` in Production and Preview.
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

The initial session experienced later connection timeouts. Subsequent deployment and résumé verification succeeded, so that earlier connectivity limitation is resolved.

## GitHub integration

No Git remote existed at audit time. The owner approved a public repository, now created at https://github.com/ayugpoudel/ayugpoudel-portfolio with the existing local repository connected as `origin`. Existing history is preserved.

GitHub CLI is installed and authenticated as `ayugpoudel`, and the existing history and approved PDF have been pushed to `main`. [GitHub Actions](https://github.com/ayugpoudel/ayugpoudel-portfolio/actions/runs/42088042411) passed installation, lint, type checking, build, and all 13 browser tests (22.2 seconds). Never paste credentials into source, command output, or chat.

The owner completed Vercel's GitHub authorization and repository connection. A project API check confirms the GitHub link to `ayugpoudel/ayugpoudel-portfolio` and production branch `main`.

Native Git deployment was verified: deployment `dpl_AEw56hFLK18WYMnFv55phq7MP8xe`, https://ayugpoudel-pmjlqjqa9-app-f572.vercel.app, reports `source: git`, `target: production`, `readyState: READY`, branch `main`, and commit `1ed4dfa56d4c8e79ac8ef4b87cbd7e32ad065159`. It serves the verified custom-domain metadata. Native Vercel integration handles production pushes and branch/PR previews; a separate branch/PR trigger was not exercised during this session. The existing GitHub Actions workflow performs quality checks only; no duplicate deployment pipeline is configured.

## Résumé update

The résumé preview at https://ayugpoudel-jig1y9gec-app-f572.vercel.app completed successfully after waiting for Vercel initialization. Its live navigation/PDF test passed: the résumé anchor opens in a new tab, the file returns HTTP 200 with `application/pdf`, and the response has a PDF header. The first remote test ran while Vercel still showed its build-in-progress page; it was rerun successfully after readiness.

Hosted production deployment https://ayugpoudel-ad7vll7bv-app-f572.vercel.app succeeded, and all 13 production-browser tests passed in 26.0 seconds. The résumé response is byte-for-byte identical to the approved PDF (153,054 bytes; SHA-256 `efb2e456adddda6f63283c3340e2a1a126bcf09cc862d1b9edf25762f8caa213`). The same PDF was verified at https://ayugpoudel.dev/resume.pdf after the native Git deployment.

Local Vercel output was also generated while waiting for the remote builder. Environment files remain excluded by `.vercelignore`, and no environment files were present in the generated output. Next.js function traces explicitly exclude local environment files. Vercel's generated `.vc-config.json` still listed local environment paths: the prebuilt production upload failed with `ENOENT` for an excluded environment example file. No excluded environment files were uploaded, and the prior production deployment was retained. Use the normal hosted `vercel deploy --prod` build, which does not receive the local environment files, rather than weakening exclusions. Generated `.vercel` output is excluded from linting, formatting, and Git.

## Custom domain

The owner purchased `ayugpoudel.dev` through Vercel on November 5, 2026. CLI inspection confirms ownership under `app-f572`, registrar Vercel, expiration November 5, 2027, and a quoted renewal price of $13 USD. The owner completed the purchase; no purchase or renewal was initiated by the assistant.

- Both apex and `www` are attached to the existing `ayugpoudel` project and verified by Vercel.
- DNS is managed by Vercel, with public nameservers `ns1.vercel-dns.com` and `ns2.vercel-dns.com` confirmed through DNS resolution.
- https://ayugpoudel.dev returned HTTP 200 with normal HTTPS certificate validation.
- https://www.ayugpoudel.dev returned HTTP 308 to https://ayugpoudel.dev/.
- `NEXT_PUBLIC_SITE_URL` was updated in Production and Preview after domain and HTTPS verification.
- A native Git deployment rebuilt metadata with the custom domain. All four pages return HTTP 200 and the correct custom-domain canonical and Open Graph URLs. The sitemap and robots file use the custom origin; Open Graph PNG and résumé PDF return HTTP 200.
- Redirects were verified for both HTTP-to-HTTPS and `www`-to-apex, including preserving `/projects/tab`.
- Initial custom-domain browser suite: all 13 tests passed in 28.8 seconds using a temporary, ignored Playwright configuration resolving the hostname to Vercel's verified address `216.198.79.1`, with certificate validation enabled. Normal Chrome initially failed through its HTTPS DNS discovery path. This was subsequently diagnosed and addressed as described below.
- No unrelated DNS records were modified; no generic DNS records were guessed or manually substituted.
- Initial registrar-email inspection was pending because Vercel reports that status 30 minutes after purchase. The owner should complete any registrant verification requested by Vercel or the registrar.

No `.portfolio` domain is used. Keep the apex domain as canonical and retain the `www` redirect.

## Chrome ECH compatibility fix

The owner reported `ERR_ECH_FALLBACK_CERTIFICATE_INVALID` in Chrome while Safari and cellular access worked. DNS and anonymous Chrome diagnostics showed a Vercel-managed HTTPS record advertising Encrypted Client Hello. Direct HTTPS to the published addresses and Chrome with an explicit verified DNS address both worked.

Vercel's [official OpenAPI schema](https://openapi.vercel.sh) exposes a domain-scoped `echMode` control on `PATCH /v3/domains/{domain}`. The current value was `auto`. It was changed to `disabled` for `ayugpoudel.dev` using the supported update operation. A subsequent domain API read confirmed `echMode: disabled` and `verified: true`.

Vercel-managed DNS inspection then showed that automatic HTTPS/ECH advertisements were removed; existing CAA and ALIAS routing records remained. Standard HTTPS encryption and normal certificate verification remain enabled. No certificate bypass, browser security change, manual DNS address substitution, or unrelated DNS change was applied.

The owner subsequently confirmed that the site now works in Chrome. The first normal-DNS browser suite after the change passed 10 tests; three navigations still returned cached ECH errors (768 px, JavaScript-disabled navigation, and GradeSense workflow). This is a DNS-transition qualification, not an all-pass result. The same full suite previously passed all 13 tests with a verified DNS address. Cached ECH DNS responses may need time to expire. The temporary DNS-pinned verification config remains ignored under `.vercel/` and is not part of the normal test configuration or repository.

Keep `echMode: disabled` unless ECH compatibility is deliberately retested later. Regular checks use the normal `PLAYWRIGHT_BASE_URL=https://ayugpoudel.dev npm run test:e2e` command.
