export type ProjectCategory = "frontend" | "fullstack" | "backend" | "ai" | "all";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  tags: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  role?: string;
  year?: string;
  featured: boolean;
  size?: "lg" | "md";
}

export const projects: Project[] = [
  {
    id: "talentscout",
    title: "TalentScout",
    tagline: "AI-Powered Recruitment Platform",
    description:
      "Cloud-based intelligent recruitment ecosystem that automates the entire hiring pipeline — from AI-generated job descriptions to live, evaluated AI interviews.",
    highlights: [
      "AI-generated JDs and intelligent resume↔job matching algorithms",
      "Real-time AI interviewer with webcam/mic, dynamic questioning, live evaluation",
      "Integrated coding assessment environment for technical roles",
      "Recruiter & organization dashboards with hiring funnel analytics",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "OpenAI API", "WebRTC", "TailwindCSS"],
    category: "ai",
    role: "Lead Developer & Architect — Final Year Project, NUST",
    year: "2025",
    featured: true,
    size: "lg",
  },
  {
    id: "task-tracker",
    title: "Task Tracker",
    tagline: "Enterprise Task Management System",
    description:
      "Advanced personal/team task management with Kanban columns, real-time sync, and a modern decoupled architecture.",
    highlights: [
      "Kanban-style boards, profile system, real-time updates",
      "Decoupled Next.js frontend talking to a NestJS backend",
      "Firebase Firestore + Admin SDK for auth and persistence",
    ],
    tags: ["Next.js 14", "TypeScript", "TailwindCSS", "TanStack Query", "NestJS", "Firebase"],
    category: "fullstack",
    featured: true,
  },
  {
    id: "rag-chatbot",
    title: "RAG Chatbot",
    tagline: "AI Knowledge Assistant",
    description:
      "Retrieval-Augmented Generation chatbot for intelligent document Q&A — combining vector search with conversational LLM responses.",
    highlights: [
      "FAISS-powered similarity search with sentence-transformer embeddings",
      "Conversational AI built on Qwen1.5-1.8B-Chat",
      "FastAPI backend with an interactive Streamlit UI",
    ],
    tags: ["Python", "FastAPI", "Streamlit", "FAISS", "HuggingFace"],
    category: "ai",
    featured: true,
  },
  {
    id: "kaloriekompass",
    title: "KalorieKompass",
    tagline: "Diet & Nutrition Platform",
    description:
      "Health-tech platform for personalized diet management and professional nutrition consultation with multi-role dashboards.",
    highlights: [
      "Calorie tracking with goal-based meal planning (loss/gain)",
      "Multi-role dashboards: users, dietitians, nutritionists, super admins",
      "Connect with certified nutritionists for personalized plans",
    ],
    tags: ["MongoDB", "Express.js", "React", "Node.js", "RBAC"],
    category: "fullstack",
    liveUrl: "https://kaloriekompass.com",
    featured: true,
  },
  {
    id: "real-estate",
    title: "Real Estate Marketplace",
    tagline: "Full-Stack Property Platform",
    description:
      "Production-grade property listing and search platform with advanced filtering, image uploads and map integration.",
    highlights: [
      "Auth, property CRUD, multi-image uploads, advanced filters",
      "Responsive UI with map-based discovery",
    ],
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
    category: "fullstack",
    featured: true,
  },
  {
    id: "blogging-platform",
    title: "Blogging Platform",
    tagline: "Full-Stack Content Management",
    description:
      "Feature-rich blogging platform with authentication, full CRUD, and rich text editing.",
    highlights: [
      "JWT-based auth with role-aware access",
      "Rich text editor and SEO-friendly post pages",
    ],
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
    category: "fullstack",
    featured: true,
  },
  {
    id: "5",
    title: "Arcadia – NUST University Library System",
    description:
      "Digital library platform built exclusively for the NUST university community. Members can discover, borrow, and track thousands of books across multiple disciplines, with university ID verification for access control.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    tags: [
      "Next.js 15",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "NextAuth v5",
      "Tailwind CSS",
      "Upstash Redis",
    ],
    category: "fullstack",
    liveUrl: "https://arcadia-kqy3.vercel.app/",
    featured: true,
  },
  {
    id: "6",
    title: "FlowCraft – AI Workflow Automation Builder",
    description:
      "AI-powered workflow automation builder with a visual drag-and-drop interface for constructing and running automated pipelines. Features native AI nodes for summarization, content generation, and classification, queue-based async execution, real-time metrics, and multi-tenant workspaces with RBAC.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    tags: ["Next.js", "React Flow", "Prisma", "BullMQ", "TypeScript"],
    category: "fullstack",
    liveUrl: "https://flow-craft-pied.vercel.app/",
    featured: true,
  },
];
