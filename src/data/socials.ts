export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "email" | "upwork";
  handle?: string;
}

/** LinkedIn profile + official badge vanity slug */
export const linkedIn = {
  url: "https://www.linkedin.com/in/asad-urrehman-dev",
  vanity: "asad-urrehman-dev",
  badgeLabel: "Asad ur Rehman",
} as const;

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/Asadur-Rehman",
    icon: "github",
    handle: "@Asadur-Rehman",
  },
  {
    name: "LinkedIn",
    url: linkedIn.url,
    icon: "linkedin",
    handle: linkedIn.vanity,
  },
  {
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/~01a6a9563845b65fdc",
    icon: "upwork",
    handle: "Public profile · hire me",
  },
  {
    name: "Email",
    url: "mailto:aurehman.bese21seecs@seecs.edu.pk",
    icon: "email",
    handle: "aurehman.bese21seecs@seecs.edu.pk",
  },
];
