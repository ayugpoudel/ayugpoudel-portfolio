# V3 source review

Reviewed November 5, 2026. The portfolio describes whole applications and distinguishes team work from individually supplied experience. This document records the basis for editorial choices; it contains no private source code, secrets, or application screenshots.

## TAB

Public repository verified through GitHub metadata: https://github.com/psap2/hacknc-2026. Main tree at review: `6b3d3decbb539d2d4ee47e3b2a23d44700646c0c`.

Reviewed README, architecture ADR, package configuration, agent router, Gemini and heuristic adapters, Photon transport, SQLite store, split/settlement functions, Hono web/viewer code, chain adapters, and ledger/story/trip/join/viewer test sources.

The similarly named local checkout is a different, newer implementation. Its React/Bun/Drizzle architecture is not attributed to the specified public repository. The supplied repository uses Node.js, Hono, better-sqlite3, Photon Spectrum, Gemini, and Solana devnet. Current agent code records active shares and handles disputes; this supersedes earlier approval-oriented ADR descriptions. The current ledger uses pairwise payment plans even though a global-netting helper also exists.

Gemini emits bounded intents and receipt data. Integer-cent calculations and deterministic routines own ledger operations. The custom six-decimal devnet mint is labeled test USDC in the project; it is not real-value production USDC. Custody, per-process guards, and personalized viewer links are described with their actual limits. A viewer token selects a default view and is not presented as authentication.

The supplied Vimeo video and Railway root both returned HTTP 200 with matching demo/application titles. They are linked as a demonstration and documented deployment; this does not certify current provider availability or on-chain operation. No message, registration, or payment was triggered during verification.

## GradeSense

GitHub metadata confirmed the LearnWithAI team repository is private. Reviewed the full GradeSense documentation; API routes and request/response models; core service, repositories, tables, and shared database/AI/authentication layers; Angular exam, PDF upload, rubric, request-dialog, review, status, and client service code; associated API, service, repository, and frontend tests; and repository configuration/tree for infrastructure and migration scope.

All six documented images were inspected locally: three instructor views and three student views. They show course context, graded work, scores, and identifiers. They are not copied into the portfolio. The original workflow and architecture illustrations summarize functionality without reproducing private UI, exam content, or records. No private repository URL is rendered as a public source link.

Credit: Ayug Poudel, Dipendra Kandel, and Jay Bhatta. The case study presents the complete collaborative feature, not a contribution or pull-request timeline.

Preview feedback uses question context and reasoning with the shared Azure OpenAI-compatible completion service, wrapped in a typed summary response. Classification is a separate text-prefix mapping into recommendation states, with staff-review fallback. AI labels do not themselves change grades. Optional schema fields are not represented as guaranteed populated outputs.

Observed follow-up needs include consistent fractional-grade handling, partial score-update preservation, complete server-side transition guards, and endpoint-by-endpoint authorization consistency. Existing tests are described by verified behavior, without claiming a measured coverage rate or a passing upstream suite. Shared Dramatiq/RabbitMQ infrastructure is not attributed to the synchronous GradeSense path. No versioned feature migration sequence was found in the reviewed tree.

## EmpowHER

Verified the public repository https://github.com/tabiyakhokhar/EmpowHer and its match to both local checkouts. Main tree: `006b3159ef0c644f419fa46c33ba8762ac504d7b`.

Reviewed chat/interview, résumé, event, resource, script, and package files. The chat page expects a local HTTP backend not included in the repository. The checked-in résumé scorer uses FileReader and explicit JavaScript criteria, not an LLM scoring model. Resources are curated links and event entries are browser-side data. No production database, secure server authentication, automated test suite, or live third-party event feed is invented.

The Devpost event page confirms 48 participants. First place and Ayug’s integration work come from the supplied verified experience. No individual Devpost submission is fabricated.

## Other engineering

Fidelity, Porch, and research diagrams use supplied résumé scope and metrics only. No confidential Fidelity source or interface was inspected or copied. A public Porch repository could not be verified, so none is linked. Research visuals illustrate processing steps without inventing material properties or numerical plots.

Both personal archive repositories were verified as public and owned by ayugpoudel. Bet-Tracker contains collection-to-CSV and Pandas/SciPy analysis scripts; local-path assumptions and unvalidated statistical performance are explicit. BETAPP is identified as an early scaffold with future prediction/authentication/persistence work, rather than a production AI system.

## Asset and publication boundary

Only original portfolio diagrams are served. Private review assets remain outside the portfolio directory. No repository visibility changed, source code was published, remote repository was pushed, or deployment was performed.
