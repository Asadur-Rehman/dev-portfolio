/**
 * Work experience - customize with your real roles and achievements
 */
export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  duration: string;
  logo?: string; // URL or path to logo image
  achievements: string[];
  tech: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "1",
    company: "Aurora Solutions",
    role: "Software Engineer",
    duration: "Jun 2025 – Present",
    achievements: [
      "Built Exceed Booking Hub, a multi-tenant booking SaaS using Next.js + PostgreSQL, with role-based portals for Super Admin, Manager, and Sales.",
      "Implemented booking workflows, automated Xero invoices, and reminders via Twilio and SendGrid.",
      "Integrated NextAuth, Cloudinary, and Sentry; shipped pagination, search, and audit logs for scalability and traceability.",
    ],
    tech: [
      "Next.js",
      "PostgreSQL",
      "NextAuth",
      "Xero",
      "Twilio",
      "SendGrid",
      "Cloudinary",
      "Sentry",
    ],
  },
  {
    id: "2",
    company: "Eon Intelligence",
    role: "MERN Stack Development Intern",
    duration: "June 2024 – September 2024",
    achievements: [
      "Contributed to the Test Scheduling Backend, Eon Testing Tool and KalorieKompass, enhancing functionality and user experience.",
      "Developed web automation scripts, implemented critical features, and conducted thorough testing to ensure reliability.",
      "Improved UI/UX by resolving multiple issues and adding new features.",
    ],
    tech: ["MERN Stack", "React", "Node.js", "MongoDB", "JavaScript"],
  },
];
