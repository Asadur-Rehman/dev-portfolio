export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "twitter" | "email" | "upwork";
  handle?: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/Asadur-Rehman",
    icon: "github",
    handle: "@Asadur-Rehman",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/asad-ur-rehman",
    icon: "linkedin",
    handle: "asad-ur-rehman",
  },
  {
    name: "Email",
    url: "mailto:aurehman.bese21seecs@seecs.edu.pk",
    icon: "email",
    handle: "aurehman.bese21seecs@seecs.edu.pk",
  },
  {
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/~asadurrehman",
    icon: "upwork",
    handle: "Hire on Upwork",
  },
];
