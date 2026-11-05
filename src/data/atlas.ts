import { projects, type Category } from './site';
export type AtlasProject = {
  id: string;
  name: string;
  category: Category;
  caption: string;
  href: string;
  orbit: number;
  phase: number;
  radius: number;
  technologies: string[];
  connections: string[];
};
/** Shared tools and disciplines describe relationships, never product integrations. */
export const atlasProjects: AtlasProject[] = [
  {
    id: 'tab',
    name: 'TAB',
    category: 'ai',
    caption: projects[0].description,
    href: '/projects/tab',
    orbit: 0,
    phase: 0.4,
    radius: 10,
    technologies: ['TypeScript', 'Hono', 'SQLite', 'Photon', 'Gemini', 'Solana devnet'],
    connections: ['TypeScript', 'Applied AI', 'APIs', 'Backend systems'],
  },
  {
    id: 'gradesense',
    name: 'GradeSense',
    category: 'fullstack',
    caption:
      'Exam PDFs, question rubrics, AI-assisted appeals, and teaching-team decisions inside LearnWithAI.',
    href: '/projects/gradesense',
    orbit: 1,
    phase: 3.7,
    radius: 12,
    technologies: ['Angular', 'FastAPI', 'SQLModel', 'PostgreSQL', 'Azure OpenAI'],
    connections: ['TypeScript', 'Python', 'Applied AI', 'APIs', 'Backend systems'],
  },
  {
    id: 'empowher',
    name: 'EmpowHER',
    category: 'ai',
    caption:
      'A four-tool career platform: interview practice, résumé feedback, resources, and events. First place at FidHacks 2025.',
    href: '/projects/empowher',
    orbit: 2,
    phase: 5.1,
    radius: 9,
    technologies: ['JavaScript', 'HTML/CSS', 'FileReader', 'Chat API contract'],
    connections: ['Applied AI', 'APIs', 'JavaScript'],
  },
  {
    id: 'porch',
    name: 'Porch',
    category: 'backend',
    caption:
      'Backend APIs, data models, and server-side workflows for a community-focused iOS platform.',
    href: '/#porch',
    orbit: 1,
    phase: 0.9,
    radius: 8,
    technologies: ['Backend APIs', 'Data modeling', 'iOS integration'],
    connections: ['APIs', 'Backend systems', 'Mobile integration'],
  },
  {
    id: 'fidelity',
    name: 'Fidelity Developer Hub',
    category: 'fullstack',
    caption: 'Angular and TypeScript developer tooling consolidating 40+ versioned AI prototypes.',
    href: '/#fidelity',
    orbit: 2,
    phase: 2.3,
    radius: 8,
    technologies: ['Angular', 'TypeScript', 'Application APIs', 'Version resolution'],
    connections: ['TypeScript', 'APIs', 'Developer tooling'],
  },
  {
    id: 'research',
    name: 'Materials Research',
    category: 'data',
    caption:
      'Python-driven processing of Quantum ESPRESSO outputs for bands, density of states, Fermi-level, and charge-density analysis.',
    href: '/#research',
    orbit: 0,
    phase: 3.6,
    radius: 7,
    technologies: ['Python', 'NumPy', 'Pandas', 'Quantum ESPRESSO'],
    connections: ['Python', 'Data processing', 'Scientific computing'],
  },
];
export const projectDisciplines: Record<string, Category[]> = {
  tab: ['ai', 'fullstack', 'backend'],
  gradesense: ['fullstack', 'ai', 'backend'],
  empowher: ['ai'],
  porch: ['backend'],
  fidelity: ['fullstack', 'backend'],
  research: ['data'],
};
export const atlasConnections = atlasProjects.flatMap((from, i) =>
  atlasProjects.slice(i + 1).flatMap((to) => {
    const shared = from.connections.filter((tag) => to.connections.includes(tag));
    return shared.length ? [{ from: from.id, to: to.id, shared }] : [];
  }),
);
