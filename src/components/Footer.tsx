"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Briefcase, ArrowUp, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { personal } from "@/data/personal";
import { socialLinks } from "@/data/socials";

const iconMap: Record<string, LucideIcon> = {
  github: Github, linkedin: Linkedin, email: Mail, upwork: Briefcase,
};

const navLinks = [
  ["/#about", "About"],
  ["/#tech", "Stack"],
  ["/#projects", "Work"],
  ["/#services", "Services"],
  ["/#experience", "Experience"],
  ["/#contact", "Contact"],
];

function useLocalTime(timezone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () => {
      try {
        setTime(new Date().toLocaleTimeString("en-US", {
          timeZone: timezone,
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }));
      } catch { setTime(""); }
    };
    format();
    const id = setInterval(format, 30000);
    return () => clearInterval(id);
  }, [timezone]);
  return time;
}

export function Footer() {
  const localTime = useLocalTime(personal.timezone);

  return (
    <footer
      className="border-t border-border bg-background-2 px-5 sm:px-8 lg:px-12 pt-14 pb-8"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-10">
          <div className="sm:col-span-2 lg:col-span-6">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">
              Get in touch
            </p>
            <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-foreground max-w-lg leading-tight">
              Got a project in mind?{" "}
              <Link href={`mailto:${personal.email}`} className="text-accent hover:underline underline-offset-4">
                Let&apos;s talk.
              </Link>
            </h3>
            <p className="mt-3 text-sm text-muted max-w-sm">
              Available for remote contract work with US-friendly hours.
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent/40 hover:text-accent transition-colors"
            >
              Contact form
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">Navigate</p>
            <ul className="space-y-2">
              {navLinks.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-strong hover:text-accent transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">Connect</p>
            <ul className="space-y-2">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon] || Mail;
                const external = link.icon !== "email";
                return (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-sm text-muted-strong hover:text-accent transition-colors"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} {personal.name}
          </p>
          <div className="flex items-center gap-4">
            {localTime && (
              <span className="font-mono">{personal.location.split(",")[0]} · {localTime} PKT</span>
            )}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1 hover:text-accent transition-colors"
            >
              Back to top
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
