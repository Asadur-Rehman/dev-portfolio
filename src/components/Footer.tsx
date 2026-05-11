"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Briefcase, ArrowUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { personal } from "@/data/personal";
import { socialLinks } from "@/data/socials";

const iconMap: Record<string, LucideIcon> = {
  github: Github, linkedin: Linkedin, twitter: Mail, email: Mail, upwork: Briefcase,
};

function useLocalTime(timezone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () => {
      try {
        setTime(new Date().toLocaleTimeString("en-GB", { timeZone: timezone, hour: "2-digit", minute: "2-digit" }));
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
    <footer className="relative border-t border-border/60 bg-background-2/60 px-6 sm:px-10 lg:px-20 pt-16 pb-10" role="contentinfo">
      <div className="absolute inset-x-0 top-0 divider-glow" aria-hidden />
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-6">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">Open to opportunities</p>
            <h3 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-foreground max-w-xl">
              Have an ambitious project?{" "}
              <Link href={`mailto:${personal.email}`} className="text-gradient-accent underline-offset-4 hover:underline">Let&apos;s talk.</Link>
            </h3>
          </div>
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">Navigate</p>
            <ul className="space-y-2 text-sm">
              {[["#about","About"],["#projects","Work"],["#experience","Experience"],["#contact","Contact"]].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-muted-strong hover:text-accent transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">Connect</p>
            <ul className="space-y-2 text-sm">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon] || Mail;
                return (
                  <li key={link.name}>
                    <a href={link.url} target={link.icon === "email" ? undefined : "_blank"} rel={link.icon === "email" ? undefined : "noopener noreferrer"} className="inline-flex items-center gap-2 text-muted-strong hover:text-accent transition-colors">
                      <Icon className="h-3.5 w-3.5" aria-hidden />{link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} {personal.name}. Built with Next.js, Tailwind &amp; care.</p>
          <div className="flex items-center gap-4">
            {localTime && <span className="font-mono">{personal.location} · {localTime} {personal.timezone.split("/")[0]}</span>}
            <a href="#hero" className="inline-flex items-center gap-1 hover:text-accent transition-colors">Back to top<ArrowUp className="h-3 w-3" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
