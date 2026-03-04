/**
 * Skills / Tech stack - organized by category for TechStack section
 */
export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "tools"
  | "cloud";

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string; // Lucide icon name - we'll map in component
}

export const skillCategories: { id: SkillCategory; label: string }[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "tools", label: "Tools & Practices" },
];

export const skills: Skill[] = [
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js (App Router)", category: "frontend" },
  { name: "Redux Toolkit", category: "frontend" },
  { name: "TanStack Query", category: "frontend" },
  { name: "React Hook Form", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "PostgreSQL", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "Firebase Admin SDK", category: "database" },
  { name: "AWS Lambda", category: "cloud" },
  { name: "Amazon S3, Textract, Rekognition, Comprehend", category: "cloud" },
  { name: "Step Functions, CloudFormation, CloudWatch", category: "cloud" },
  { name: "VPC, RDS, SQS, EC2, IAM, Transcribe", category: "cloud" },
  { name: "Docker", category: "cloud" },
  { name: "CI/CD", category: "cloud" },
  { name: "Git", category: "tools" },
  { name: "GitHub", category: "tools" },
  { name: "GitLab", category: "tools" },
  { name: "Jest", category: "tools" },
  { name: "Playwright", category: "tools" },
  { name: "Selenium", category: "tools" },
  { name: "JWT", category: "tools" },
  { name: "OAuth", category: "tools" },
  { name: "WebRTC", category: "tools" },
];
