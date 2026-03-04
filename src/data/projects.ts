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
];
