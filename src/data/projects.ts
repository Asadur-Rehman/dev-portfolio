/**
 * Projects data - add/edit your projects here
 * Replace image URLs with your own or use Unsplash placeholders
 */
export type ProjectCategory = "frontend" | "fullstack" | "backend" | "all";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Exceed Booking Hub",
    description:
      "Multi-tenant booking SaaS for hospitality with Admin and Customer portals, RBAC (Super Admin/Manager/Sales), and org isolation. Automated Xero invoices and Twilio/SendGrid reminders.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a0e4b219989?w=800&q=80",
    tags: [
      "Next.js",
      "PostgreSQL",
      "NextAuth",
      "Xero",
      "Twilio",
      "SendGrid",
      "Cloudinary",
      "Sentry",
    ],
    category: "fullstack",
    featured: true,
  },
  {
    id: "2",
    title: "AWS Serverless Document Processing Pipeline",
    description:
      "Scalable serverless pipeline processing 1000+ documents daily. AWS Lambda + Step Functions, Textract for OCR, Comprehend for entity recognition, ~95% extraction accuracy. S3, SQS, DynamoDB, CloudFormation.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    tags: [
      "AWS Lambda",
      "S3",
      "Textract",
      "Step Functions",
      "Comprehend",
      "DynamoDB",
      "CloudFormation",
    ],
    category: "backend",
    featured: true,
  },
  {
    id: "3",
    title: "TalentScout – AI Recruitment Platform",
    description:
      "Cloud-based AI recruitment platform with AWS Rekognition for candidate sentiment during video interviews, Amazon Transcribe for speech-to-text, and OpenAI for assessment scoring. Deployed on EC2, RDS, S3, WebRTC.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    tags: [
      "MERN Stack",
      "AWS Rekognition",
      "Amazon Transcribe",
      "OpenAI API",
      "WebRTC",
      "RDS",
      "S3",
    ],
    category: "fullstack",
    featured: true,
  },
  {
    id: "4",
    title: "KalorieKompass & Eon Testing Tool",
    description:
      "Contributed to KalorieKompass and Eon Testing Tool at Eon Intelligence: new features, web automation scripts, and UI/UX improvements with thorough testing.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["React", "Node.js", "MongoDB", "JavaScript"],
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
