# Verification

Verified locally on November 4, 2026, with Node.js 22 and Google Chrome, against the optimized production build.

- Production compilation and static generation: passed.
- TypeScript, ESLint, and Prettier: passed.
- Playwright: 11 tests passed.
- axe WCAG 2 A/AA and WCAG 2.1 AA checks: no violations detected on the homepage and TAB case study.
- Responsive overflow checks: passed at 320, 390, 768, 1024, and 1440 px on the homepage and GradeSense route.
- Keyboard activation of SVG project links, smooth orbital slowdown to a continuing drift, pause/resume controls, reduced-motion behavior, mobile menu, missing-link dialogs, metadata, 404 content, and JavaScript-disabled project navigation: passed.
- Final desktop/mobile screenshots and the TAB case-study composition were visually inspected. Overlapping atlas labels found during inspection were corrected with adaptive label placement.
- Dependency audit after updating the lint tool’s glob matcher: zero reported vulnerabilities.

Automated accessibility checks supplement manual keyboard and visual checks; they do not establish complete WCAG conformance. Production hosting, real résumé/contact URLs, project repository URLs, real-device Safari, and production Core Web Vitals remain to be verified after the owner supplies links and authorizes deployment.

Nothing was published or pushed to a remote repository.

## V2 refinement / November 5, 2026

The existing application and content were refactored into the Engineering Observatory identity. Desktop, laptop, tablet, and mobile screenshots were inspected at 1440, 1024, 768, and 390 px, with automated overflow checks additionally covering 320 px. The final design retains the owner’s requested mission-left/orbits-right composition while replacing the wordmark/navigation, action, social link treatment, project presentation, experience log, profile, footer, and case-study covers.

The V2 regression suite adds checks for the four-section navigation, accessible brand-icon placeholders, active contact state, and multi-discipline filtering. All original route, orbital behavior, reduced motion, mobile layout, axe, and JavaScript-disabled checks remain. Final result: all 12 Playwright tests passed against the optimized production build. The final build, TypeScript, ESLint, and formatting checks passed.

## V3 / Complete engineering case studies

Verified November 5, 2026, against the optimized production build:

- All 13 Playwright tests passed.
- Production build, TypeScript, ESLint, and Prettier checks passed.
- Automated axe WCAG checks passed on the homepage and all three case-study routes after scroll-triggered content settled.
- The homepage and every case-study route passed overflow checks at 320, 390, 768, 1024, and 1440 px.
- Desktop/laptop/tablet/mobile screenshots of all case-study covers were inspected, with additional desktop/mobile inspection of the GradeSense architecture and database diagrams.
- Interactive TAB processing stages, GradeSense student/staff views, atlas project selection and shared-tool readouts, verified profile links, source-link privacy, reduced motion, keyboard project activation, and JavaScript-disabled project navigation passed.
- GradeSense renders all 13 requested sections with team attribution. No private repository link is rendered as a public source link, and no private application screenshot is included.

The initial contrast check sampled a footer entrance animation before it settled. The test now scrolls instantly between reveal positions and waits for transitions before analyzing contrast; all checks pass without disabling contrast rules.

Upstream project test sources were inspected for case-study accuracy; those applications' test suites were not rerun and no new upstream coverage claims are made. The supplied TAB video and deployment returned HTTP 200, but provider availability and live devnet execution were not tested. Private source repositories were only read, and private screenshots stayed outside the portfolio. Nothing was pushed or deployed.
