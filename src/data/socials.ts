/**
 * Social and external links - add your real URLs
 */
export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "twitter" | "email";
}

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/Asadur-Rehman", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/asad-ur-rehman",
    icon: "linkedin",
  },
  { name: "Email", url: "mailto:aurehman.bese21seecs@seecs.edu.pk", icon: "email" },
];
