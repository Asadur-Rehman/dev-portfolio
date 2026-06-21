/** Canonical site URL — used by sitemap, metadata, and JSON-LD. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://asad-ur-rehman.dev";

/** App Router pages (excluding dynamic OG images). */
export const routes = {
  home: "/",
  work: {
    syncapi: "/work/syncapi",
    flowcraft: "/work/flowcraft",
    talentscout: "/work/talentscout",
  },
  /** Home page section anchors */
  sections: {
    about: "/#about",
    tech: "/#tech",
    projects: "/#projects",
    process: "/#process",
    services: "/#services",
    experience: "/#experience",
    faq: "/#faq",
    contact: "/#contact",
  },
} as const;

export const caseStudySlugs = ["syncapi", "flowcraft", "talentscout"] as const;
