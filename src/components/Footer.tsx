"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { personal } from "@/data/personal";
import { socialLinks } from "@/data/socials";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

function useLocalTime(timezone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () => {
      try {
        setTime(
          new Date().toLocaleTimeString("en-GB", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      } catch {
        setTime("");
      }
    };
    format();
    const id = setInterval(format, 1000);
    return () => clearInterval(id);
  }, [timezone]);
  return time;
}

export function Footer() {
  const localTime = useLocalTime(personal.timezone);

  return (
    <footer
      className="border-t border-border py-12 px-6 sm:px-12 lg:px-24 bg-surface/50"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-muted text-sm">
          © {new Date().getFullYear()} {personal.name}. All rights reserved.
        </p>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-6">
            <li>
              <Link
                href="#about"
                className="text-muted hover:text-accent text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#projects"
                className="text-muted hover:text-accent text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="text-muted hover:text-accent text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.name}
                href={link.url}
                target={link.icon === "email" ? undefined : "_blank"}
                rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                className="text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded p-1"
                aria-label={link.name}
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted">
        <span>Built with Next.js</span>
        {localTime && (
          <span>
            {personal.location} · {localTime}
          </span>
        )}
      </div>
    </footer>
  );
}
