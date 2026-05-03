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
  { name: "JavaScript", category: "languages" },
  { name: "TypeScript", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "C++", category: "languages" },
  { name: "SQL", category: "languages" },

  { name: "React.js", category: "frontend" },
  { name: "Next.js 14", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },

  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "WebRTC", category: "backend" },

  { name: "MongoDB", category: "database" },
  { name: "PostgreSQL", category: "database" },
  { name: "Firebase Firestore", category: "database" },

  { name: "OpenAI API", category: "ai" },
  { name: "HuggingFace Transformers", category: "ai" },
  { name: "FAISS", category: "ai" },
  { name: "LangChain", category: "ai" },
  { name: "RAG Architecture", category: "ai" },

  { name: "Git", category: "tools" },
  { name: "GitHub", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Vercel", category: "tools" },
  { name: "CI/CD", category: "tools" },
  { name: "Agile / Scrum", category: "tools" },
  { name: "Web Automation", category: "tools" },
];
