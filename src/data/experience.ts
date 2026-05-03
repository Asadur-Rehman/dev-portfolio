export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  duration: string;
  location?: string;
  logo?: string;
  achievements: string[];
  tech: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "aurora",
    company: "Aurora Solutions",
    role: "Software Engineer",
    duration: "Jun 2025 — Present",
    location: "Islamabad, Pakistan",
    achievements: [
      "Engineering full-stack solutions for enterprise clients across the entire delivery lifecycle.",
      "Building scalable, production-grade web applications with a focus on reliability and clean architecture.",
      "Collaborating with cross-functional teams to deliver complex software on aggressive timelines.",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Node.js", "Cloud Infrastructure"],
  },
  {
    id: "eon",
    company: "Eon Intelligence",
    role: "MERN Stack Developer (Intern)",
    duration: "Jul 2024 — Aug 2024",
    location: "Islamabad, Pakistan",
    achievements: [
      "Shipped features and fixes across 3 production applications: EON Testing Tool, Test Scheduling Backend, and KalorieKompass.",
      "Built role-based access for the EON Testing Tool — testers, admins, super admins, team leads — for generating tests, tracking activity, and managing QA workflows.",
      "Developed web automation scripts and performed SQA across multiple production codebases.",
      "Improved UI/UX and resolved critical bugs that had been blocking releases.",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "RBAC"],
  },
  {
    id: "oasis",
    company: "Oasis Infobyte",
    role: "Web Development Intern",
    duration: "Jul 2023 — Aug 2023",
    location: "Remote",
    achievements: [
      "Built foundational web applications including interactive calculators and task management tools.",
      "Developed responsive, accessible frontend interfaces from scratch.",
    ],
    tech: ["JavaScript", "HTML5", "CSS3", "React"],
  },
];
