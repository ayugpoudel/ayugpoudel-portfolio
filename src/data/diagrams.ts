import type { DiagramKind } from './case-studies';
export type DiagramNode = { title: string; detail: string; tag?: string };
export const architectureDiagrams: Record<
  Exclude<DiagramKind, 'tab' | 'database' | 'ai'>,
  { title: string; nodes: DiagramNode[]; branches?: string[]; caption: string }
> = {
  gradesense: {
    title: 'From the exam screen to a durable decision',
    nodes: [
      { title: 'Angular', detail: 'Exam screens · reactive forms · signals', tag: 'PRESENTATION' },
      { title: 'FastAPI', detail: 'Typed HTTP models · authenticated subject', tag: 'CONTRACTS' },
      {
        title: 'Business service',
        detail: 'Exam context · requests · decisions',
        tag: 'APPLICATION',
      },
      { title: 'Repositories', detail: 'Focused queries · shared session', tag: 'PERSISTENCE' },
      { title: 'PostgreSQL', detail: 'SQLModel records · grading history', tag: 'DATA' },
    ],
    branches: [
      'FastAPI ↔ Azure OpenAI: preview and recommendation',
      'FastAPI ↔ server files: graded PDFs; submission stores the path',
    ],
    caption:
      'Original architecture illustration based on the private implementation. Queue infrastructure belongs to the parent system and is not shown as a GradeSense dependency.',
  },
  empowher: {
    title: 'A connected career-development toolkit',
    nodes: [
      {
        title: 'Interview practice',
        detail: 'Guided prompts + chat API request',
        tag: 'CONVERSATION',
      },
      { title: 'Résumé analysis', detail: 'Text upload + local scoring criteria', tag: 'FEEDBACK' },
      {
        title: 'Learning resources',
        detail: 'Curated career and learning links',
        tag: 'RESOURCES',
      },
      {
        title: 'Event discovery',
        detail: 'Preset events + browser-side additions',
        tag: 'OPPORTUNITY',
      },
    ],
    branches: [
      'Shared HTML/CSS + JavaScript navigation',
      'Chat expects a local API; its backend is not in the public repository',
    ],
    caption:
      'Original product architecture illustration. The résumé scorer is deterministic browser logic in the checked-in version.',
  },
  fidelity: {
    title: 'Prototype discovery, consolidated',
    nodes: [
      { title: 'Before', detail: '4 discovery steps · 3–5 minutes', tag: 'FRAGMENTED DISCOVERY' },
      {
        title: 'Developer hub',
        detail: 'Angular + TypeScript · searchable catalog',
        tag: '40+ VERSIONED PROTOTYPES',
      },
      {
        title: 'API resolution',
        detail: 'Application + version-resolution APIs',
        tag: 'INTEGRATION',
      },
      { title: 'After', detail: '2 steps · under 30 seconds', tag: 'SELF-SERVICE DISCOVERY' },
    ],
    branches: ['Authenticated CRUD → version management → self-service publishing'],
    caption:
      'Original before/after illustration using supplied résumé metrics. No internal company interface or source code is reproduced.',
  },
  porch: {
    title: 'The server-side foundation of a neighborhood app',
    nodes: [
      {
        title: 'Community data',
        detail: 'Events · resources · neighborhood information',
        tag: 'DOMAIN',
      },
      {
        title: 'Backend',
        detail: 'APIs · data models · server workflows',
        tag: 'ENGINEERING SCOPE',
      },
      {
        title: 'iOS experience',
        detail: 'Community information in the mobile application',
        tag: 'CLIENT INTEGRATION',
      },
    ],
    branches: ['Backend ↔ iOS, product, and design collaboration'],
    caption:
      'Conceptual scope illustration based on supplied experience. No unverified backend framework or public repository is claimed.',
  },
  research: {
    title: 'From simulation output to interpretable data',
    nodes: [
      {
        title: 'Quantum ESPRESSO',
        detail: 'Simulation outputs for Sc₂C MXenes',
        tag: 'COMPUTATIONAL INPUT',
      },
      {
        title: 'Python pipelines',
        detail: 'NumPy + Pandas · automated processing',
        tag: 'FIVE ANALYSIS WORKFLOWS',
      },
      {
        title: 'Analysis',
        detail: 'Bands · density of states · Fermi level · charge density',
        tag: 'SCIENTIFIC OUTPUT',
      },
    ],
    caption:
      'Original processing-pipeline illustration. It presents the analysis workflow without inventing material-property results or numerical plots.',
  },
};
export const tabStages = [
  {
    label: 'Receive',
    title: 'A message becomes application input',
    detail:
      'Photon delivers sender identity, text, and receipt attachments. Nearby text/photo events from the same sender are merged before routing.',
    boundary: 'Messaging adapter',
    sample: 'Illustrative message: “I paid $80 for gas, split with everyone.”',
  },
  {
    label: 'Interpret',
    title: 'Gemini returns a bounded intent',
    detail:
      'Structured receipt and intent responses identify an action, amounts, split instructions, and context. Missing information becomes a follow-up question.',
    boundary: 'AI interpretation',
    sample: 'Expense intent → amount in cents → participant instruction',
  },
  {
    label: 'Execute',
    title: 'TypeScript applies deterministic rules',
    detail:
      'The agent resolves known trips and participants. Largest-remainder allocation produces exact cent shares; AI does not calculate trusted balances.',
    boundary: 'Application + domain logic',
    sample: 'Illustrative split: 2,667 + 2,667 + 2,666 = 8,000 cents',
  },
  {
    label: 'Record',
    title: 'SQLite keeps the shared record',
    detail:
      'The store persists expenses and shares transactionally, and the same ledger supports explanations, disputes, balances, and transfer history.',
    boundary: 'Durable ledger',
    sample: 'Expense → shares → pairwise balances → explanation',
  },
  {
    label: 'Settle',
    title: 'A devnet adapter executes the request',
    detail:
      'An explicit pay action uses the ledger’s counterparties, an encrypted test wallet, and a treasury-funded SPL transfer. Successful signatures enter the transfer history.',
    boundary: 'Solana devnet only',
    sample: 'Custom test token · six decimals · no real monetary value',
  },
];
export const studentWorkflow = [
  {
    title: 'Inspect the exam',
    text: 'Open an available exam, read the graded PDF, and compare question scores, maximum marks, and rubrics.',
  },
  {
    title: 'Choose a question',
    text: 'Launch a prefilled regrade dialog with the question and original mark in context.',
  },
  {
    title: 'Explain the request',
    text: 'Enter a requested score and written reasoning tied to that question.',
  },
  {
    title: 'Preview AI feedback',
    text: 'Read a brief assessment before submitting; an unavailable preview does not block the appeal.',
  },
  {
    title: 'Submit and track',
    text: 'Record the request and follow recommendation, pending-review, and final decision states.',
  },
  {
    title: 'Read the outcome',
    text: 'View the teaching team’s decision, available feedback, and final score.',
  },
];
export const instructorWorkflow = [
  {
    title: 'Define the exam',
    text: 'Create the exam, question numbers, maximum scores, and grading rubrics.',
  },
  {
    title: 'Record the assessment',
    text: 'Upload the student’s graded PDF and enter question-level scores.',
  },
  {
    title: 'Review requests',
    text: 'Inspect the student’s reasoning, original and requested marks, and AI recommendation state.',
  },
  {
    title: 'Decide',
    text: 'Accept with a final score or reject with written feedback through separate dialogs.',
  },
  {
    title: 'Return the result',
    text: 'The updated request supplies the decision and score or feedback to the student view.',
  },
];
