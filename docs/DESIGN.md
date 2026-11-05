# Design notes

The reference homepage and `/projects/mshn`, `/projects/stym`, and `/projects/unidad` were fetched as HTML on November 4, 2026. The browser web reader could not access them; direct HTTPS fetches succeeded. User-supplied reference screenshots also informed the assessment.

Useful principles: clear navigation, deliberate editorial typography, generous spacing, readable technical summaries, and an obvious route back to selected work. The Systems Atlas uses its own identity: Carolina Blue and indigo, Space Grotesk/Inter/IBM Plex Mono, a globe with continuously orbiting project planets, schematic project illustrations, fine borders, and structured engineering profiles. No red branching network or reference assets are copied.

Palette: background #090E16, surfaces #141D2A, accent #7BAFD4, indigo #7C8EFF, primary text #EAF1F7, secondary text #8D9BAE.

Motion uses deliberately slow orbital movement, eased slowdown to 10% on hover/focus, short section reveals, and subtle pointer parallax. It is always secondary to direct navigation. Reduced-motion users receive stationary project coordinates. No generated raster image is needed for the signature visualization: it is a working SVG component.

## V2 / Engineering observatory

The final V2 follows the owner’s preference for a mission on the left and the original orbiting globe on the right. The earlier panoramic network experiment was superseded during implementation. The existing elliptical orbits, hover slowdown, previews, category controls, and keyboard project links are preserved. The central object is a single black-hole shadow with a lensed accretion disk, thin jets, and four orbiting star markers. The former globe surface, continents, and latitude lines are removed. These are artistic motifs, not an astrophysical simulation.

The identity changes are structural: an `ayug / poudel` wordmark; a floating numbered navigation instrument with Projects, Experience, About, and Contact; a separate document-style résumé control; a two-line mission combining Space Grotesk and a restrained system serif; one circular project action; and a separate dock of recognizable GitHub and LinkedIn brand marks. Source links remain the original explicit placeholders.

Project previews use one landscape case file followed by two vertical records. Experience uses a connected coordinate spine with a distinct impact rail. The profile combines an editorial introduction with an open technical index. The footer closes as an open communications channel. Case studies use a compact record cover and preserve all original project content and routes.

Shared drawing and case-study primitives remain in `globals.css`; the V2 composition lives in `observatory.css`. Retired V1 layout rules were removed rather than accumulated as conflicting overrides. `src/data/atlas.ts` defines overlapping disciplines from the supplied engineering background, so filters can highlight a project in several relevant fields. No inter-project integrations are claimed.

The final comparison retains the shared high-level left/right arrangement at the owner’s explicit request, while differentiating navigation, typography, actions, social treatment, diagrams, project records, experience, and contact composition.

## V3 / Application depth

The mission, introduction, and observatory now share a staggered twelve-column composition, preserving the approved black-hole instrument while moving away from a vertically centered pair of columns. Shared-tool paths appear during exploration, and the project readout and index connect the visual to actual technologies. The floating navigation, separate document control, circular action, and brand-icon dock remain part of the original identity.

Whole-application case studies use a source-backed data model, persistent desktop index, mobile contents control, interactive TAB pipeline and GradeSense role explorer, semantic architecture chains, database relationships, and explicit AI decision boundaries. The experience diagrams and secondary archive extend the same record-and-observatory language. No reference-site assets, private product screenshots, or fabricated interfaces are used.
