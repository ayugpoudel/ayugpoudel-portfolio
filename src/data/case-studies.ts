export type DiagramKind =
  'tab' | 'gradesense' | 'empowher' | 'database' | 'ai' | 'fidelity' | 'porch' | 'research';
export type StudySection = {
  id: string;
  title: string;
  kicker: string;
  paragraphs: string[];
  items?: { title: string; text: string }[];
  steps?: string[];
  diagram?: DiagramKind;
  note?: string;
};
export type CaseStudy = {
  scope: string;
  attribution: string;
  evidence: string;
  sections: StudySection[];
  sources: { label: string; url: string }[];
};
export const caseStudies: Record<string, CaseStudy> = {
  gradesense: {
    scope: 'Complete application feature / LearnWithAI',
    attribution:
      'GradeSense was developed collaboratively by Ayug Poudel, Dipendra Kandel, and Jay Bhatta. This case study presents the full team-built feature and its architecture. Ayug’s engineering background includes backend services, relational models, access controls, and API workflow tests; the complete implementation is shared team work.',
    evidence:
      'Based on the private GradeSense documentation, Angular components and services, FastAPI routes and models, core services and repositories, schema definitions, and associated tests. Private screenshots were reviewed; all visuals here are original explanatory illustrations.',
    sources: [],
    sections: [
      {
        id: 'overview',
        title: 'Product Overview',
        kicker: 'The complete grading loop',
        paragraphs: [
          'GradeSense is an exam and regrade-request feature inside LearnWithAI. It connects the original grading context—exam PDFs, question rubrics, maximum scores, and recorded marks—to a student’s appeal and the teaching team’s final decision.',
          'The application has two complete experiences: students inspect their graded work and request reconsideration; instructors and teaching assistants create exams, upload submissions, record scores, review reasoning, and resolve requests. AI provides preview feedback and a recommendation state, while staff make the final grading decision.',
        ],
        items: [
          {
            title: 'Student workspace',
            text: 'Course exams, graded PDFs, question scores, rubrics, regrade forms, preview feedback, and request history.',
          },
          {
            title: 'Teaching workspace',
            text: 'Exam definitions, submission uploads, question-level grading, request review, acceptance with a final score, and rejection with feedback.',
          },
        ],
      },
      {
        id: 'problem',
        title: 'Problem and Solution',
        kicker: 'Keep the evidence with the appeal',
        paragraphs: [
          'A grade appeal is difficult to assess when the exam, rubric, awarded score, requested score, and student’s explanation live in separate places. A single changed grade also needs to be reflected in what the student sees afterward.',
          'GradeSense organizes the process around a specific exam question. The student starts with the actual question context, submits a structured request, and can return to a status view containing the decision, available feedback, and final score. Staff review that same request in the exam context.',
        ],
      },
      {
        id: 'student',
        title: 'Student Experience',
        kicker: 'From graded work to a tracked decision',
        paragraphs: [
          'The exam list exposes the exams available in a course and a route to the student’s request history. An exam detail page combines a graded PDF with question-level scores and expandable rubric information, making the original assessment available before an appeal is written.',
          'Selecting a question opens a prefilled regrade dialog. The question number and original score can be locked from the selected question; the student supplies a requested score and written reasoning. A separate preview action returns AI feedback without requiring immediate submission.',
        ],
        steps: [
          'View course exams and open the relevant graded exam.',
          'Read the graded PDF alongside individual question marks, maximum scores, and rubrics.',
          'Select a question and enter a requested score with supporting reasoning.',
          'Request AI preview feedback; continue to submission even if the preview is unavailable.',
          'Submit the appeal and return to the request-status view.',
          'Track the request state, instructor decision, final score, and available AI or instructor feedback.',
        ],
        note: 'The preview is assistance for the student. It does not itself change a grade.',
      },
      {
        id: 'instructor',
        title: 'Instructor Experience',
        kicker: 'Define, assess, review, resolve',
        paragraphs: [
          'Instructors and TAs create an exam with a title and a dynamic list of questions. Each question has a maximum score and an optional rubric. They can then upload a student’s graded PDF and record the scores for that student’s questions.',
          'The exam request-review page shows the submitted reasoning, original and requested scores, recommendation state, and decision controls. Accepting opens a final-score dialog; rejecting opens a feedback dialog. The updated request is reflected in the review list and the student’s status view.',
        ],
        steps: [
          'Create an exam and define each question’s number, maximum score, and rubric.',
          'Select a student submission, upload the graded PDF, and record per-question marks.',
          'Open the exam’s review list and inspect student reasoning and recommendation states.',
          'Accept with a final score, or reject with written feedback.',
          'Return the decision and associated grade or feedback to the student-facing workflow.',
        ],
        note: 'This is a connected grading-and-appeal workflow, rather than a standalone request-status page.',
      },
      {
        id: 'architecture',
        title: 'System Architecture',
        kicker: 'Explicit boundaries across the stack',
        paragraphs: [
          'Angular components coordinate screens and forms through a feature-specific frontend service. Most structured operations use generated API functions; PDF upload and preview feedback also use HttpClient. FastAPI request and response models define the HTTP contracts.',
          'Routes handle authentication, course-role checks on the relevant operations, HTTP errors, file delivery, and AI orchestration. RegradeRequestService coordinates application rules through repositories. SQLModel maps the records to PostgreSQL; graded PDF bytes are stored on the server with a path in the submission record.',
        ],
        diagram: 'gradesense',
        note: 'LearnWithAI also contains Dramatiq, RabbitMQ, development containers, and quality gates. The inspected GradeSense request flow calls AI synchronously; it is not presented here as a queue-driven GradeSense pipeline.',
      },
      {
        id: 'frontend',
        title: 'Frontend Engineering',
        kicker: 'Forms, typed clients, and role-aware screens',
        paragraphs: [
          'The feature uses focused Angular components for exam lists, exam detail, exam creation, PDF upload, request dialogs, staff review, and student status. Signals represent loading, errors, current records, and submission or preview progress; the inspected components use OnPush change detection.',
          'Reactive forms validate required fields, positive question numbers, non-negative scores, and minimum reasoning length in the appeal dialog. Staff exam creation uses a FormArray for question definitions. The upload workflow sends multipart PDF data and then records question scores through a separate typed operation.',
          'The frontend service keeps endpoint details out of the view components. Generated API methods handle structured requests and responses; PDF retrieval uses an authenticated blob request and an object URL for the embedded viewer. Success snackbars, disabled in-flight actions, and visible failure messages give the user feedback at each boundary.',
        ],
      },
      {
        id: 'backend',
        title: 'Backend Engineering',
        kicker: 'Routes → business services → repositories',
        paragraphs: [
          'The HTTP layer exposes exam creation and retrieval, submission upload, score updates, question retrieval, preview feedback, appeal submission, staff review lists, acceptance, rejection, and the student’s request history. Typed models describe nested exam questions, score lists, preview context, and decision payloads.',
          'The business service validates exam titles and question lists, confirms referenced exams exist, rejects invalid or decreasing requested scores, and rejects blank reasoning. It combines question definitions with the current student’s submission scores for exam detail. Repositories encapsulate course, exam, student, and submission queries.',
          'The shared session dependency owns transaction commit, rollback, and closure. This keeps transaction lifecycle out of route handlers and gives repositories a consistent request-scoped session. Constructor-injected repositories make service behavior testable without requiring a browser or the entire HTTP application.',
        ],
        items: [
          {
            title: 'Creation and retrieval',
            text: 'Persist an exam and its question definitions; retrieve course exams and a student’s submission context.',
          },
          {
            title: 'Appeal processing',
            text: 'Validate input, attach the authenticated student identity, create the request, and return an explicit submission response.',
          },
          {
            title: 'Staff decisions',
            text: 'Accept with a final-score update or reject with professor feedback, then return the updated request representation.',
          },
        ],
      },
      {
        id: 'database',
        title: 'Database Architecture',
        kicker: 'Relational context for every request',
        paragraphs: [
          'The GradeSense schema separates exams, exam questions, student submissions, submission question scores, and regrade requests. Exams reference a course and creator. A submission connects a student to an exam and a stored PDF path. Scores reference the submission and carry a question number.',
          'A regrade request references the exam and student, identifies the question number, and stores original and requested marks, reasoning, workflow state, and optional AI feedback, instructor feedback, and final-score fields. This preserves the distinction between the original assessment, the request, and its disposition.',
          'The inspected application initializes SQLModel metadata through the shared database layer. No feature-specific versioned migration sequence was found in the reviewed tree, so this case study does not claim one.',
        ],
        diagram: 'database',
        note: 'This diagram summarizes the domain relationships. It is an original illustration, not a dump of private database source.',
      },
      {
        id: 'ai',
        title: 'AI Integration',
        kicker: 'Two assistance paths, one human decision',
        paragraphs: [
          'For a preview, the frontend sends the question number, maximum and current scores, rubric, and student reasoning to an authenticated endpoint. A shared Azure OpenAI-compatible completion service generates a brief assessment, which is returned in a typed HTTP response containing a summary string.',
          'Submission uses a separate classification call with question context loaded from the backend. The response is interpreted by an APPROVED prefix; other responses map to an AI-denied recommendation. Missing configuration or a classification error falls back to staff review. Neither recommendation directly performs a final grade update.',
          'The HTTP response has a defined shape, but the underlying model completion is prose rather than a guaranteed JSON-schema output. Preview feedback is displayed in the dialog; the inspected submission path primarily persists the recommendation state. Optional AI-score and feedback columns do not mean every submission populates them.',
        ],
        diagram: 'ai',
        note: 'An unavailable preview shows a fallback message and still allows the student to submit. Staff acceptance or rejection remains the final decision boundary.',
      },
      {
        id: 'permissions',
        title: 'Authentication and Permissions',
        kicker: 'Identity comes from the parent application',
        paragraphs: [
          'GradeSense reuses LearnWithAI’s authenticated user dependency and JWT-backed identity. Course membership and instructor/TA role checks guard the inspected exam-creation, upload, score-setting, staff-list, and decision routes. Student PDF and question retrieval use the authenticated subject and course context.',
          'The student-history endpoint queries requests by the authenticated student identifier. The Angular UI also changes navigation and available actions for students and staff, while backend checks remain the authority for protected operations.',
          'Permission coverage should be assessed endpoint by endpoint. The project demonstrates role-aware behavior, but this portfolio does not claim a complete security audit or uniform authorization hardening across every mutation.',
        ],
      },
      {
        id: 'testing',
        title: 'Testing and Reliability',
        kicker: 'Test contracts, rules, persistence, and UI behavior',
        paragraphs: [
          'The inspected API tests cover successful submission, invalid score input, missing exams, authentication requirements, staff-only operations, course membership checks, PDF delivery failures, AI-preview availability, and classification fallback. Service tests isolate business validation and decision behavior; repository tests exercise the data-access operations.',
          'Angular tests cover service calls and dialog behavior, including prefilled values, invalid forms, duplicate in-flight actions, successful previews, unavailable previews, and submission errors. Associated exam-list, exam-detail, creation, upload, and status tests are also present.',
          'These are observations from the checked-in suites, not a newly measured coverage report. No coverage percentage or passing test count for the private application is claimed. Existing tests cover state-dependent UI behavior, while stronger server-side transition guards remain a future hardening task.',
        ],
      },
      {
        id: 'challenges',
        title: 'Engineering Challenges',
        kicker: 'The difficult parts live between layers',
        paragraphs: [
          'The central challenge is keeping question context, student input, AI guidance, staff decisions, and stored grades consistent across several screens and API operations. Separate models, services, repositories, and a frontend service make those boundaries explicit and easier to test.',
        ],
        items: [
          {
            title: 'AI availability without a blocked appeal',
            text: 'Preview failure is visible in the dialog, while classification failure produces a staff-review state so model availability does not decide whether a request can be recorded.',
          },
          {
            title: 'Readable contracts across Angular and Python',
            text: 'Typed request/response models and generated client functions reduce duplicated endpoint assumptions; multipart uploads and PDF blobs are handled explicitly.',
          },
          {
            title: 'Grade-update integrity',
            text: 'Reviewing the current write path identifies follow-up work around preserving unrelated question scores, consistent fractional-score handling, and server-side state transitions. These are hardening needs, not guarantees already implemented.',
          },
        ],
      },
      {
        id: 'outcomes',
        title: 'Outcomes and Lessons',
        kicker: 'A complete feature, with honest next steps',
        paragraphs: [
          'The collaborative implementation connects exam setup and grading to question-specific appeals, optional AI preview, teaching-team review, and student-visible decisions. The documentation and reviewed screenshots demonstrate both sides of that workflow.',
          'The strongest engineering lesson is that AI belongs inside an explicit application process: typed context in, assistance out, and accountable human decisions at the grade-change boundary. The other lesson is that schema precision, authorization consistency, and partial-update regression tests deserve dedicated attention before wider deployment.',
          'This case study describes the complete team application. The repository and screenshots remain private, and no adoption figures or deployment claims are invented.',
        ],
      },
    ],
  },
  tab: {
    scope: 'HackNC 2026 / Messaging agent + ledger + devnet settlement',
    attribution:
      'Built collaboratively at HackNC 2026 by Ayug Poudel, Prasun Sapkota, and Amit Khanal. The case study describes the complete team application verified in the supplied public repository; it does not assign every subsystem to one contributor.',
    evidence:
      'Reviewed the public README and ADR alongside the agent router, Gemini adapter, Photon adapter, SQLite store, split and settlement logic, Hono pages, wallet adapter, and Vitest suites. The demo video and documented deployment responded successfully during review.',
    sources: [
      { label: 'Public repository', url: 'https://github.com/psap2/hacknc-2026' },
      {
        label: 'Architecture decisions',
        url: 'https://github.com/psap2/hacknc-2026/blob/main/docs/adr/0001-velo-architecture.md',
      },
      { label: 'Demo video', url: 'https://vimeo.com/1234803827' },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Product Overview',
        kicker: 'The trip ledger in your messages',
        paragraphs: [
          'TAB is an AI-powered expense agent with an iMessage entry point. Friends create or join trips, text expenses or receipt photos, inspect balances, dispute a charge, and request settlement. A mobile trip page provides the line items and transfer history behind the conversation.',
          'The product includes participant registration, multiple open trips, equal and itemized splits, balance explanations, disputes and their resolution, reminders, trip closure, and devnet payment execution. The central interface is the conversation; the web experience supports onboarding and transparent inspection of the ledger.',
        ],
        note: 'The payment integration uses a custom six-decimal SPL test token on Solana devnet, labeled test USDC in the project. It has no real monetary value and is not production USDC.',
      },
      {
        id: 'problem',
        title: 'Problem and Solution',
        kicker: 'Understand the number, not just the total',
        paragraphs: [
          'On a shared trip, the hard part is not simply dividing a total. People participate in different purchases, receipts arrive later, two people may owe each other, and a disputed item should not silently remain payable.',
          'TAB makes the trip ledger accessible through natural language and gives each balance a traceable set of expense shares and transfers. Questions such as who participated, which trip an expense belongs to, and why a person owes an amount become part of the application workflow.',
        ],
      },
      {
        id: 'messaging',
        title: 'Messaging and Product Flow',
        kicker: 'Photon carries the conversation',
        paragraphs: [
          'Photon Spectrum supplies inbound iMessages and attachments through its SDK stream and sends outbound responses. The shared-number setup uses individual conversations and project-user registration; the application does not claim native group-chat participation.',
          'The adapter merges text and image messages from the same sender over a short window so a receipt and its instructions can be processed together. The agent maintains per-sender queues and persisted pending conversation states for follow-up questions, names, trip selection, item assignments, and dispute answers.',
        ],
        steps: [
          'Register a participant, create a trip, and share its invitation.',
          'Receive a natural-language purchase or receipt image through Photon.',
          'Resolve the trip, payer, amount, and intended participants.',
          'Compute and persist the expense and shares; notify the people involved.',
          'Expose balances, explanations, disputes, and settlement through messages and the trip page.',
        ],
      },
      {
        id: 'architecture',
        title: 'System Architecture',
        kicker: 'Interpretation and execution have different owners',
        paragraphs: [
          'The inspected application runs TypeScript on Node.js with Hono for web routes and SQLite through better-sqlite3 for persistence. Messaging, AI interpretation, ledger calculations, storage, and chain operations sit behind distinct interfaces.',
          'Gemini reads language and receipt content into a bounded intent or receipt shape. The agent resolves that interpretation against real participants and trips before invoking deterministic operations. The model does not calculate trusted balances, produce arbitrary messages to friends, or execute an unrestricted tool loop.',
        ],
        diagram: 'tab',
        note: 'Explore the stages below. This is an interactive architecture illustration; it does not send messages or initiate a payment.',
      },
      {
        id: 'receipts',
        title: 'Receipt Processing and Exact Splits',
        kicker: 'Flexible input, integer-cent accounting',
        paragraphs: [
          'Gemini’s receipt path requests structured JSON containing merchant, date, item amounts, subtotal, tax, tip, and total. The image-processing helper resizes inputs for the model; receipt consistency checks compare item and total arithmetic before the result is described as matched.',
          'Financial values are represented as integer cents. Equal splits and weighted allocation use a largest-remainder method so the allocated shares sum back to the total. Itemized splitting distributes each item among its participants, then allocates tax, tip, and rounding differences proportionally.',
          'Unspecified participants, missing totals, or unresolved item assignments trigger follow-up questions. Failed receipt interpretation becomes a request for clarification instead of an invented amount.',
        ],
      },
      {
        id: 'trips',
        title: 'Trips, Disputes, and Transaction History',
        kicker: 'Keep the ledger explainable as the story changes',
        paragraphs: [
          'A participant can belong to several trips. Named-trip matching, active-trip context, and explicit clarification handle ambiguous messages. The same persisted expenses, shares, and transfers power running balances, line-by-line explanations, reminders, and the trip page.',
          'The current code logs shares as active immediately and supports a dispute-first workflow. Disputing a share removes it from payable calculations. A payer can supply a receipt to restore the contested share or agree to remove the participant and re-split the expense among those remaining.',
          'Settlement uses pairwise netting so the person named in a balance explanation is also the person paid. A separate global-netting helper exists, but the active trip ledger prefers understandable creditor relationships over routing money through unrelated participants to reduce transfer count.',
        ],
      },
      {
        id: 'backend',
        title: 'Backend and Data Architecture',
        kicker: 'One durable ledger, several interfaces',
        paragraphs: [
          'SQLite stores users, trips, membership, expenses, per-person shares, transfers, pending conversations, and payment nudges. Expenses retain receipt metadata and active/deleted state; shares retain participation and dispute state. Related expense-and-share changes use store transactions.',
          'Hono serves organizer registration, invitation acceptance, per-trip pages, manifests, and generated preview-card assets. The trip page uses server-rendered HTML plus browser JavaScript to display people, expense details, balances, and on-chain transfer links. It is not a React frontend in the reviewed repository.',
          'Railway is documented as a long-lived container with persistent SQLite storage. That deployment shape supports the Photon stream, timer, and database file in one process; it is a hackathon-scale operating model rather than a claim of distributed infrastructure.',
        ],
      },
      {
        id: 'payments',
        title: 'Solana Devnet Settlement',
        kicker: 'A test-token payment rail with explicit boundaries',
        paragraphs: [
          'The chain adapter creates per-member custodial wallets and encrypts their secret material with AES-256-GCM. A treasury sponsors fees and funds the custom devnet mint. Transfers use the SPL checked-transfer instruction and convert cents to the token’s six-decimal base units with integer arithmetic.',
          'A payment action derives debts from the ledger, checks the sender’s available token balance, and transfers to the recorded counterparties. Successful signatures are stored with the transfer history and linked to the devnet explorer. If a batch transfer fails, later transfers stop and the application reports the partial result.',
          'A per-user in-process payment guard prevents overlapping payment execution within the running process. This is not a claim of crash-safe, distributed exactly-once settlement. Production custody, real-value tokens, broader authentication, and reconciliation would require additional engineering.',
        ],
        note: 'Demo/deployment availability does not establish that every provider or on-chain path is currently operational. No real-money payment flow is presented as production-ready.',
      },
      {
        id: 'identity',
        title: 'Identity and Access Model',
        kicker: 'Messaging identity is not a production login system',
        paragraphs: [
          'The messaging adapter uses the sender identity provided by Photon, and trip membership scopes the agent’s operations. Joining and registration are application workflows, with private conversations carrying personalized links.',
          'The web viewer token is an HMAC-derived shortcut for choosing the initial member view. The source explicitly describes it as view selection, not authentication. This case study therefore does not describe the trip page as a securely authenticated financial dashboard.',
          'Custodial devnet keys are an MVP tradeoff. A production design would need a stronger identity and authorization model, a reviewed custody approach, and durable transaction recovery beyond the current single-process guards.',
        ],
      },
      {
        id: 'testing',
        title: 'Testing and Reliability',
        kicker: 'Deterministic behavior at the money boundary',
        paragraphs: [
          'The public Vitest suites cover equal and itemized splits, rounding, tax and tip allocation, ledger calculations, trip stories, multiple-trip routing, joining, disputes, and personalized viewer links. Fake messenger and chain implementations allow conversational and settlement behavior to be exercised without live providers.',
          'Gemini has model fallback and keyword-based interpretation when unavailable. Photo failures ask for a usable amount, provider registration has bounded retries, and deterministic message formatting keeps model prose out of the outbound financial explanation.',
          'The repository’s tests were inspected rather than rerun as part of this portfolio build. No new test count, coverage percentage, real receipt accuracy metric, or live transaction success is claimed.',
        ],
      },
      {
        id: 'challenges',
        title: 'Challenges & solutions',
        kicker: 'Designing for ambiguity without ambiguous accounting',
        paragraphs: [
          'The most important separation is between understanding a person and mutating a financial record. Typed intents constrain the AI layer; explicit agent branches resolve context; domain functions own the split and ledger arithmetic.',
        ],
        items: [
          {
            title: 'Receipts arrive separately from text',
            text: 'The Photon adapter merges nearby attachment and text events from the same sender before routing the combined expense context.',
          },
          {
            title: 'Several trips can be open',
            text: 'Trip names, active context, persisted pending state, and clarification questions keep expenses and disputes attached to the intended trip.',
          },
          {
            title: 'A dispute changes who owes what',
            text: 'The ledger excludes disputed shares and handles payer agreement and receipt-backed restoration through explicit state changes and notifications.',
          },
        ],
      },
      {
        id: 'outcomes',
        title: 'Outcomes and Lessons',
        kicker: 'A complete HackNC prototype',
        paragraphs: [
          'TAB connects iMessage onboarding, natural-language entry, receipt interpretation, exact splitting, multi-trip ledgers, dispute resolution, transparent histories, and devnet settlement in one application. The public repository, video, and documented deployment make the product and its architecture inspectable.',
          'The main lesson is to use AI for interpretation and conventional code for accounting, state transitions, and execution. A second is to choose an architecture that fits the operating environment: a long-lived messaging stream and local database favor a simple persistent service for this prototype.',
          'The ADR contains earlier approval-oriented design notes. The case study follows the current implementation’s dispute-first behavior where those notes and the source differ.',
        ],
      },
    ],
  },
  empowher: {
    scope: 'Fidelity FidHacks 2025 / Four-tool career platform',
    attribution:
      'A team-built hackathon project. Ayug’s supplied experience describes AI response and résumé-analysis integrations. The case study covers the complete product while distinguishing the public frontend from integrations whose backend code is not present.',
    evidence:
      'Reviewed the public repository and matching local project files: chat page, résumé scorer, browser scoring logic, resources, events, navigation, and package configuration. The event page confirms 48 participants; the first-place result is supplied by Ayug.',
    sources: [
      { label: 'Public project source', url: 'https://github.com/tabiyakhokhar/EmpowHer' },
      { label: 'FidHacks event', url: 'https://nc-fidhacks-2025.devpost.com/participants' },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Product Overview',
        kicker: 'Four ways to prepare for the next opportunity',
        paragraphs: [
          'EmpowHER combines interview practice, résumé feedback, learning resources, and event discovery in a career-development experience. The project won first place at Fidelity FidHacks 2025, an invite-only event with 48 selected participants.',
          'The platform’s product scope is broader than a chatbot: someone can practice an interview, inspect résumé feedback, find a learning resource, and discover a career event through related pages in the same experience.',
        ],
        diagram: 'empowher',
      },
      {
        id: 'problem',
        title: 'Problem and Solution',
        kicker: 'Career preparation needs more than one tool',
        paragraphs: [
          'Interview preparation, résumé improvement, resource discovery, and professional events are often treated as separate tasks. EmpowHER brings them into a common entry point with a supportive career-development voice.',
          'The hackathon build prioritizes concrete activities instead of requiring a complex account or infrastructure setup. The resulting pages make each tool directly accessible while keeping a shared navigation and visual language.',
        ],
      },
      {
        id: 'features',
        title: 'The Complete Toolkit',
        kicker: 'One platform, four distinct workflows',
        paragraphs: [
          'Each part of the frontend supports a different preparation task. The inspected code also makes clear where a feature is driven by local browser logic and where it expects an external response.',
        ],
        items: [
          {
            title: 'Interview practice',
            text: 'A conversational HERa interface with a guided mock-interview question sequence and a separate chat request path.',
          },
          {
            title: 'Résumé analysis and scoring',
            text: 'Upload a text résumé, select a target role, and receive a score and feedback based on contact information, structure, action verbs, measurable results, role keywords, and length.',
          },
          {
            title: 'Career resources',
            text: 'A curated set of learning, networking, communication, and confidence-building links arranged for direct browsing.',
          },
          {
            title: 'Event discovery',
            text: 'A browser-rendered event collection with preset entries and a form for adding an event to the current experience.',
          },
        ],
      },
      {
        id: 'architecture',
        title: 'Application Architecture',
        kicker: 'A lightweight browser-first build',
        paragraphs: [
          'The public source is a multi-page HTML/CSS and JavaScript application served locally with Servor. Shared navigation connects the chat, résumé, resources, and event pages. Feature logic lives in inline scripts and a separate résumé-scoring script.',
          'Résumé input is read with FileReader and evaluated locally. Event entries are rendered from client-side data. The chat page posts a message to a local /chat endpoint. The corresponding AI backend implementation is not included in the checked-in repository, so its model, hosting, and persistence are not asserted here.',
          'No implemented production database or server-side authentication system was verified in this source. Local browser state is used in navigation/account affordances; it should not be described as secure identity management.',
        ],
      },
      {
        id: 'ai',
        title: 'AI and API Integrations',
        kicker: 'Separate the product intent from the checked-in implementation',
        paragraphs: [
          'The chat UI supports sending a message and displaying an API response, with a local endpoint contract for an AI mentor interaction. Guided interview mode uses a predefined sequence of prompts in the browser.',
          'The checked-in résumé scorer is deterministic JavaScript: it reads a text file and evaluates explicit criteria and role-keyword matches. It is not an LLM-based résumé-scoring model in this public version. The broader project was presented as an AI-powered career platform; this portfolio makes that implementation distinction explicit.',
          'The resource page contains curated outbound links, and the events page uses browser data. Neither is represented here as a live third-party event feed or a search integration that the source does not show.',
        ],
      },
      {
        id: 'testing',
        title: 'Reliability and Scope',
        kicker: 'Useful prototype behavior, honest limits',
        paragraphs: [
          'The résumé flow checks for an uploaded .txt file and reports a user-facing error when input is missing or incompatible. The chat interface includes an error/fallback path around its network request.',
          'No automated test suite is configured in the inspected package manifest. The portfolio therefore does not claim test coverage, validated AI accuracy, production security, or persistent event storage. Those would be the next foundations for turning the hackathon concept into a durable service.',
        ],
      },
      {
        id: 'challenges',
        title: 'Challenges & solutions',
        kicker: 'Build a coherent toolkit under hackathon constraints',
        paragraphs: [
          'The engineering challenge was connecting four career-preparation activities in a limited build window. A lightweight multi-page structure let the team focus on the core interactions and link them into a complete demonstration.',
        ],
        items: [
          {
            title: 'Several feature types',
            text: 'A shared navigation ties together conversational practice, file-based scoring, curated content, and event browsing.',
          },
          {
            title: 'Feedback that is easy to inspect',
            text: 'The résumé scorer exposes concrete criteria and role keywords rather than presenting its number as a validated hiring prediction.',
          },
          {
            title: 'An integration boundary to improve',
            text: 'A deployable, protected AI service, reproducible setup, and automated workflow tests would make the chat contract more reliable beyond the event demonstration.',
          },
        ],
      },
      {
        id: 'outcomes',
        title: 'Outcome and Lessons',
        kicker: '1st place / Fidelity FidHacks 2025',
        paragraphs: [
          'EmpowHER earned first place at the invite-only Fidelity FidHacks 2025 event. Its four-feature scope demonstrated a connected career-development concept rather than a single isolated AI interaction.',
          'The lasting engineering lesson is to distinguish a compelling product workflow from the guarantees of an early implementation. Clear interfaces, inspectable scoring logic, and honest integration boundaries are the starting point for a more reliable next version.',
        ],
      },
    ],
  },
};

export const engineeringArchive = [
  {
    name: 'Bet-Tracker',
    kind: 'Data engineering experiment',
    stack: ['Python', 'Pandas', 'SciPy', 'CSV'],
    url: 'https://github.com/ayugpoudel/Bet-Tracker',
    description:
      'A season-data collection script and a CLI that computes player-stat distributions using a normal CDF. A useful early example of a collection → CSV → analysis pipeline.',
    limitation:
      'Exploratory statistical code with local-path assumptions. No validated prediction accuracy or wagering performance is claimed.',
  },
  {
    name: 'BETAPP',
    kind: 'Early full-stack scaffold',
    stack: ['React', 'FastAPI', 'Axios'],
    url: 'https://github.com/ayugpoudel/BETAPP',
    description:
      'A frontend/backend starter with FastAPI health endpoints and a React application structure. Included as an exploratory repository, separate from the featured applications.',
    limitation:
      'The repository marks prediction, authentication, persistence, and ML integration as future work.',
  },
];
