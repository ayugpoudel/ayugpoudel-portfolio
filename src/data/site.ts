/** Set only verified public URLs. null intentionally renders an honest placeholder. */
export const site = {
  name: 'Ayug Poudel',
  title: 'Ayug Poudel | Software Engineer',
  description:
    'Ayug Poudel is a Computer Science and Statistics student at UNC–Chapel Hill building full-stack applications, AI-powered tools, and backend systems.',
  url:
    (
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : '')
    ).replace(/\/$/, '') || null,
  email: 'ayugpoudel@gmail.com' as string | null,
  github: 'https://github.com/ayugpoudel' as string | null,
  linkedin: 'https://www.linkedin.com/in/ayugp/' as string | null,
  resume: '/resume.pdf' as string | null,
};
export type Category = 'ai' | 'fullstack' | 'backend' | 'data';
export const disciplines: { id: Category; label: string; color: string }[] = [
  { id: 'ai', label: 'AI & agents', color: '#9ba6ff' },
  { id: 'fullstack', label: 'Full-stack', color: '#7bafd4' },
  { id: 'backend', label: 'Backend', color: '#a3c7c5' },
  { id: 'data', label: 'Data & research', color: '#c1b4df' },
];
export type Project = {
  slug: string;
  number: string;
  name: string;
  title: string;
  category: string;
  discipline: Category;
  tagline: string;
  description: string;
  stack: string[];
  award?: string;
  problem: string;
  approach: string;
  decisions: { title: string; text: string }[];
  challenge: string;
  outcome: string;
  features: string[];
  github: string | null;
  demo: string | null;
  video?: string;
  sourceVisibility?: 'public' | 'private';
  collaboration?: string;
};
export const projects: Project[] = [
  {
    slug: 'tab',
    number: '01',
    name: 'TAB',
    title: 'The expense agent in your iMessage conversation.',
    category: 'AI agents / Financial systems',
    discipline: 'ai',
    tagline: 'A message in. A balanced ledger out.',
    description:
      'A HackNC 2026 expense agent that turns iMessage conversations and receipt photos into trip ledgers, dispute workflows, and Solana devnet settlements.',
    stack: ['TypeScript', 'Node.js', 'Hono', 'Photon Spectrum', 'Gemini', 'SQLite', 'Solana'],
    problem:
      'Shared trips create scattered receipts, ambiguous splits, and balances that are difficult to explain. TAB puts expense entry, dispute handling, and settlement into the messaging conversation.',
    approach:
      'Built collaboratively at HackNC 2026 with Prasun Sapkota and Amit Khanal. Gemini interprets language and receipts; TypeScript owns financial calculations, ledger updates, and payment operations.',
    decisions: [
      {
        title: 'Bounded AI interpretation',
        text: 'Gemini identifies a typed intent or receipt shape; deterministic TypeScript routines perform the application action.',
      },
      {
        title: 'Exact ledger arithmetic',
        text: 'Integer-cent values and largest-remainder allocation keep shared totals explainable and consistent.',
      },
      {
        title: 'Devnet payment scope',
        text: 'A custodial test-wallet adapter demonstrates settlement with a custom Solana devnet token, without claiming production real-money readiness.',
      },
    ],
    challenge:
      'Natural language is ambiguous, while a financial ledger must be exact. Bounded AI intents, integer-cent allocation, explicit dispute states, and deterministic payment operations keep those responsibilities separate.',
    outcome:
      'A complete HackNC prototype with a public source repository, demo video, and documented deployment. Payments use a custom test token on Solana devnet; this is not a production real-money service.',
    features: [
      'iMessage text & receipt entry',
      'Multi-trip ledgers & disputes',
      'Devnet settlement & transaction history',
    ],
    github: 'https://github.com/psap2/hacknc-2026',
    demo: 'https://tab-production-2bdf.up.railway.app',
    video: 'https://vimeo.com/1234803827',
    sourceVisibility: 'public',
    collaboration: 'HackNC team · Ayug Poudel, Prasun Sapkota & Amit Khanal',
  },
  {
    slug: 'gradesense',
    number: '02',
    name: 'GradeSense',
    title: 'A clearer path from appeal to resolution.',
    category: 'Full-stack / Applied AI',
    discipline: 'fullstack',
    tagline: 'Give every appeal a structured path.',
    description:
      'An end-to-end exam and regrading feature inside LearnWithAI: graded PDFs, question rubrics, AI-assisted appeals, instructor decisions, and final-score tracking.',
    stack: ['Angular', 'TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'SQLModel', 'Azure OpenAI'],
    problem:
      'Academic regrading involves multiple roles and a request that needs to stay understandable as it moves through review. GradeSense organizes that process around structured appeals and explicit access controls.',
    approach:
      'Developed collaboratively by Ayug Poudel, Dipendra Kandel, and Jay Bhatta. Angular components call typed FastAPI endpoints, business services coordinate repositories, and PostgreSQL stores the grading and appeal workflow.',
    decisions: [
      {
        title: 'Model the workflow explicitly',
        text: 'Structured relational models organize requests and grading data, giving the backend a consistent foundation for the appeal workflow.',
      },
      {
        title: 'Access follows responsibility',
        text: 'Role-based access controls reflect the different responsibilities of students, teaching assistants, and instructors.',
      },
      {
        title: 'Test the request boundary',
        text: 'API tests cover request and grading workflows, checking behavior at the service layer where the frontend meets the underlying records.',
      },
    ],
    challenge:
      'Supporting several academic roles requires more than a shared interface. Role-based access controls and structured request models address the different responsibilities involved in the grading workflow.',
    outcome:
      'A complete collaborative grading-and-appeal workflow within LearnWithAI. The case study describes the inspected implementation, its tests, and the hardening work needed before wider deployment.',
    features: [
      'Exam PDFs, rubrics & question scores',
      'AI previews & staff review',
      'Instructor decisions & final grades',
    ],
    github: null,
    demo: null,
    sourceVisibility: 'private',
    collaboration: 'Collaborative project · Ayug Poudel, Dipendra Kandel & Jay Bhatta',
  },
  {
    slug: 'empowher',
    number: '03',
    name: 'EmpowHER',
    title: 'Practical tools for the next career step.',
    category: 'Hackathon winner / Applied AI',
    discipline: 'ai',
    tagline: 'Four tools. One next step forward.',
    award: '1st place · Fidelity FidHacks 2025',
    description:
      'An AI-powered career-development platform connecting interview practice, resume analysis, learning resources, and event discovery.',
    stack: ['HTML/CSS', 'JavaScript', 'HTTP APIs', 'FileReader', 'Servor'],
    problem:
      'Career preparation spans several disconnected activities: practicing interviews, improving a resume, finding useful learning material, and discovering opportunities. EmpowHER brings those activities together.',
    approach:
      'At Fidelity’s invite-only FidHacks 2025, I worked on a four-tool career platform and its AI response and résumé-analysis integrations. The public source shows a JavaScript frontend, a chat API contract, and browser-side résumé-scoring rules.',
    decisions: [
      {
        title: 'One connected toolkit',
        text: 'Interview practice, resume scoring, career resources, and event discovery form four distinct entry points into the same career-development experience.',
      },
      {
        title: 'Integrate around real tasks',
        text: 'AI response and resume-analysis integrations support specific preparation activities, keeping the technical work connected to the purpose of each tool.',
      },
      {
        title: 'Build within a hackathon',
        text: 'The project was developed for an invite-only event with 48 selected participants, focusing the work around four major features.',
      },
    ],
    challenge:
      'The hackathon required bringing several career tools into a coherent platform. The implementation organized the experience into four major features and connected AI responses and resume analysis through integrations.',
    outcome:
      'EmpowHER won first place at Fidelity FidHacks 2025, an invite-only hackathon with 48 selected participants. No public usage metrics are provided.',
    features: ['AI interview practice', 'Resume analysis & scoring', 'Career resources & events'],
    github: 'https://github.com/tabiyakhokhar/EmpowHer',
    demo: null,
    sourceVisibility: 'public',
    collaboration: 'Team hackathon project · AI responses and résumé-analysis integrations',
  },
];
export const experiences = [
  {
    id: 'fidelity',
    company: 'Fidelity Investments',
    role: 'Full-Stack Software Engineering Intern',
    dates: 'Jun — Aug 2026',
    tag: 'Industry',
    description: 'Making internal AI work easier to find, explore, and publish.',
    bullets: [
      'Architected an Angular/TypeScript developer hub consolidating over 40 versioned AI prototypes.',
      'Integrated application and version-resolution APIs, taking discovery from four steps to two.',
      'Implemented authenticated CRUD and version-management workflows for self-service publishing.',
    ],
    metrics: [
      { value: '40+', label: 'AI prototypes unified' },
      { value: '<30s', label: 'Discovery, from 3–5 min' },
    ],
  },
  {
    id: 'porch',
    company: 'App Team Carolina',
    role: 'Backend Developer · Porch',
    dates: 'Sep 2026 — Present',
    tag: 'Community',
    description: 'The server-side foundation for a more connected neighborhood.',
    bullets: [
      'Developed backend APIs and data models for a community-focused iOS application.',
      'Implemented server-side application workflows.',
      'Collaborated with iOS, product, and design teammates.',
    ],
    metrics: [],
  },
  {
    id: 'research',
    company: 'Fayetteville State University',
    role: 'Computational Materials Research Assistant',
    dates: 'Jun 2023 — Jun 2024',
    tag: 'Research',
    description: 'Turning simulation outputs into scientific understanding.',
    bullets: [
      'Built Python and NumPy/Pandas processing pipelines for simulation outputs.',
      'Automated five scientific analysis workflows.',
      'Studied Sc₂C MXenes using Quantum ESPRESSO outputs, including band structures, density of states, Fermi-level, and charge-density analysis.',
    ],
    metrics: [{ value: '05', label: 'Analysis workflows automated' }],
  },
];
export const skills = [
  ['Languages', 'Java, Python, JavaScript, TypeScript, HTML/CSS'],
  ['Frameworks', 'Angular, React, FastAPI, Hono, Node.js, Spring Boot, Bun, SQLModel, SQLAlchemy'],
  ['Data', 'PostgreSQL, SQLite, MySQL, Pandas, NumPy, Matplotlib'],
  [
    'AI & tools',
    'Azure OpenAI, Gemini API, Photon Spectrum, Solana devnet, Docker, Git, Jupyter, Quantum ESPRESSO',
  ],
  ['Testing', 'Playwright, Pytest, JUnit, Mockito'],
];
