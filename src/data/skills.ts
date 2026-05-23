export type SkillCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "database"
  | "ai"
  | "tools";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export const skillCategories: { id: SkillCategory; label: string; description: string }[] = [
  { id: "languages", label: "Languages", description: "The fundamentals" },
  { id: "frontend", label: "Frontend", description: "Polished, responsive UI" },
  { id: "backend", label: "Backend", description: "APIs and services that scale" },
  { id: "database", label: "Databases", description: "Where the state lives" },
  { id: "ai", label: "AI / ML", description: "Intelligent product layers" },
  { id: "tools", label: "DevOps & Tools", description: "Ship faster, ship safer" },
];

export const skills: Skill[] = [
  // Languages
  { name: "TypeScript", category: "languages" },
  { name: "JavaScript", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "SQL", category: "languages" },
  { name: "C++", category: "languages" },

  // Frontend
  { name: "React", category: "frontend" },
  { name: "Next.js (App Router)", category: "frontend" },
  { name: "Redux Toolkit", category: "frontend" },
  { name: "TanStack Query", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },

  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "Socket.io", category: "backend" },
  { name: "WebRTC", category: "backend" },

  // Databases
  { name: "PostgreSQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "Redis", category: "database" },
  { name: "Prisma", category: "database" },
  { name: "Drizzle ORM", category: "database" },
  { name: "Firebase", category: "database" },

  // AI / ML
  { name: "OpenAI API", category: "ai" },
  { name: "Claude API", category: "ai" },
  { name: "LangChain", category: "ai" },
  { name: "RAG", category: "ai" },
  { name: "FAISS", category: "ai" },
  { name: "HuggingFace", category: "ai" },

  // DevOps & Tools
  { name: "Git", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Vercel", category: "tools" },
  { name: "CI/CD", category: "tools" },
  { name: "Turborepo", category: "tools" },
  { name: "BullMQ", category: "tools" },
  { name: "Jest", category: "tools" },
  { name: "JWT", category: "tools" },
  { name: "OAuth", category: "tools" },
];
