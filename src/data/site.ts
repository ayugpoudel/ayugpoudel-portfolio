/** Set only verified public URLs. null intentionally renders an honest placeholder. */
export const site = {
  name: 'Ayug Poudel',
  title: 'Ayug Poudel — Software Engineer · The Systems Atlas',
  description:
    'Computer Science and Statistics at UNC–Chapel Hill. Full-stack applications, AI agents, backend systems, and the thinking that connects them.',
  url: process.env.NEXT_PUBLIC_SITE_URL || null,
  email: null as string | null,
  github: null as string | null,
  linkedin: null as string | null,
  resume: null as string | null,
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
};
export const projects: Project[] = [
  {
    slug: 'tab',
    number: '01',
    name: 'TAB',
    title: 'Shared expenses. Clearer connections.',
    category: 'AI agents / Full-stack',
    discipline: 'ai',
    tagline: 'Less splitting hairs. More splitting bills.',
    description:
      'An AI-assisted group expense platform that brings purchases, participant balances, and transaction histories into one mobile-first experience.',
    stack: ['TypeScript', 'React', 'Bun', 'Photon', 'Gemini API'],
    problem:
      'Shared purchases create a second job: recording receipts, tracking who participated, and keeping group balances understandable. TAB brings these pieces into a single group-oriented workflow.',
    approach:
      'I built a React and TypeScript application backed by Bun, connecting a group-chat-inspired interface to backend-managed financial records. Photon agents and the Gemini API assist with receipt processing and expense entry.',
    decisions: [
      {
        title: 'A familiar interaction model',
        text: 'A group-chat-inspired interface puts expense activity in a shared context, while the backend manages the corresponding purchases, balances, and transaction histories.',
      },
      {
        title: 'AI at the point of entry',
        text: 'Photon agents and Gemini support receipt processing and expense-entry workflows—the point where manually recording a shared purchase creates friction.',
      },
      {
        title: 'Built for smaller screens',
        text: 'A mobile-first interface keeps group expenses usable on the device people have with them when making a purchase.',
      },
    ],
    challenge:
      'The core engineering challenge was connecting a conversational group interface to structured financial records. Backend-managed purchases, participant balances, and transaction histories provide the record behind that interface.',
    outcome:
      'The resulting application connects group expense management with AI-assisted entry in a mobile-first workflow. Public usage metrics and a live demo are not provided.',
    features: [
      'Group purchases & participants',
      'Receipt-assisted expense entry',
      'Backend-managed balance records',
    ],
    github: null,
    demo: null,
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
      'An AI-assisted regrade platform that organizes grade appeals for students, teaching assistants, and instructors.',
    stack: ['Angular', 'FastAPI', 'PostgreSQL', 'SQLModel', 'OpenAI'],
    problem:
      'Academic regrading involves multiple roles and a request that needs to stay understandable as it moves through review. GradeSense organizes that process around structured appeals and explicit access controls.',
    approach:
      'I built FastAPI services and relational data models using PostgreSQL and SQLModel, with an Angular frontend. LLM-assisted appeal classification supports the request workflow, while role-based controls distinguish student, teaching assistant, and instructor access.',
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
      'GradeSense brings appeal organization, role-aware access, and AI-assisted classification into one full-stack application. Public deployment and adoption metrics are not provided.',
    features: [
      'Student, TA & instructor roles',
      'LLM-assisted classification',
      'Tested request & grading APIs',
    ],
    github: null,
    demo: null,
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
    stack: ['JavaScript', 'REST APIs', 'Open-source AI tools'],
    problem:
      'Career preparation spans several disconnected activities: practicing interviews, improving a resume, finding useful learning material, and discovering opportunities. EmpowHER brings those activities together.',
    approach:
      'At Fidelity’s invite-only FidHacks 2025, I worked on a platform combining four career-development tools. I developed integrations for AI responses and resume analysis using JavaScript, REST APIs, and open-source AI tools.',
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
    github: null,
    demo: null,
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
      'Studied electronic and structural properties of Sc₂C MXenes, including band structures, density of states, and charge-density outputs.',
    ],
    metrics: [{ value: '05', label: 'Analysis workflows automated' }],
  },
];
export const skills = [
  ['Languages', 'Java, Python, JavaScript, TypeScript, HTML/CSS'],
  ['Frameworks', 'Angular, React, FastAPI, Spring Boot, Bun, SQLModel, SQLAlchemy'],
  ['Data', 'PostgreSQL, MySQL, Pandas, NumPy, Matplotlib'],
  ['AI & tools', 'OpenAI, Gemini API, Photon, Docker, Git, Jupyter, Quantum ESPRESSO'],
  ['Testing', 'Playwright, Pytest, JUnit, Mockito'],
];
