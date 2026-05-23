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
      "Building Exceed Booking Hub — a multi-tenant booking SaaS in Next.js + PostgreSQL with role-based portals for Super Admin, Manager, and Sales.",
      "Implemented booking workflows, automated Xero invoicing, and Twilio / SendGrid reminders end-to-end.",
      "Integrated NextAuth, Cloudinary, and Sentry, with full-text search and audit logging across tenants.",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "NextAuth", "Xero", "Twilio", "SendGrid", "Cloudinary", "Sentry"],
  },
  {
    id: "egnitify",
    company: "Egnitify",
    role: "Software Engineer (Contract)",
    duration: "Sep 2024 — May 2025",
    location: "Remote",
    achievements: [
      "Built a client-facing web app and admin dashboard at an early-stage AI startup, working full-stack across the delivery lifecycle.",
      "React / Next.js on the front end against Node.js REST APIs, collaborating directly with founders on feature scope.",
      "Shipped iteratively in a fast-moving environment — small team, no handoffs, production every week.",
    ],
    tech: ["React", "Next.js", "Node.js", "REST APIs", "TypeScript"],
  },
  {
    id: "eon",
    company: "Eon Intelligence",
    role: "MERN Stack Developer (Intern)",
    duration: "Jun 2024 — Sep 2024",
    location: "Islamabad, Pakistan",
    achievements: [
      "Shipped features and fixes across three production apps: EON Testing Tool, Test Scheduling Backend, and KalorieKompass.",
      "Built role-based access for the EON Testing Tool — testers, admins, super admins, team leads — for generating tests, tracking activity, and managing QA workflows.",
      "Developed web automation scripts, performed SQA across multiple codebases, and resolved release-blocking bugs.",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "RBAC"],
  },
];
