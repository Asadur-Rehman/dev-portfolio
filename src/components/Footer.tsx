"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Briefcase, ArrowUp, ArrowUpRight, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { personal } from "@/data/personal";
import { socialLinks } from "@/data/socials";

const iconMap: Record<string, LucideIcon> = {
  github: Github, linkedin: Linkedin, twitter: Mail, email: Mail, upwork: Briefcase,
};

const navLinks = [
  ["#about", "About"],
  ["#tech", "Stack"],
  ["#projects", "Work"],
  ["#experience", "Experience"],
  ["#contact", "Contact"],
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function useLocalTime(timezone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () => {
      try {
        setTime(new Date().toLocaleTimeString("en-GB", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
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
  const [isHoveringTop, setIsHoveringTop] = useState(false);

  return (
    <footer
      className="relative border-t border-border/60 bg-background-2/60 px-5 sm:px-10 lg:px-20 pt-16 pb-10 overflow-hidden"
      role="contentinfo"
    >
      {/* Top glowing divider */}
      <div className="absolute inset-x-0 top-0 divider-glow" aria-hidden />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[16rem] rounded-full bg-accent/[0.04] blur-[80px] pointer-events-none" aria-hidden />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="max-w-7xl mx-auto relative"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* CTA block */}
          <motion.div variants={fadeUp} className="sm:col-span-2 lg:col-span-6">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">
              Open to opportunities
            </p>
            <h3 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-foreground max-w-lg leading-tight">
              Have an ambitious project?{" "}
              <Link
                href={`mailto:${personal.email}`}
                className="text-gradient-accent underline-offset-4 hover:underline transition-all"
              >
                Let&apos;s talk.
              </Link>
            </h3>
            <p className="mt-4 text-sm text-muted max-w-sm">
              I&apos;m available for remote engineering roles, freelance projects, and technical consulting.
            </p>
            <Link
              href="#contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/30 px-5 py-2.5 text-sm font-medium text-accent hover:bg-accent hover:text-background hover:shadow-glow transition-all duration-300"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          {/* Navigate */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {navLinks.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-strong hover:text-accent transition-colors hover:translate-x-1 inline-block duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">Connect</p>
            <ul className="space-y-2.5">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon] || Mail;
                const external = link.icon !== "email";
                return (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-sm text-muted-strong hover:text-accent transition-colors group"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {link.name}
                      {external && (
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div variants={fadeUp} className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-muted-strong">{personal.name}</span>
            {" "}· Built with Next.js &amp; Tailwind.
          </p>
          <div className="flex items-center gap-5">
            {localTime && (
              <span className="font-mono">
                {personal.location.split(",")[0]} · {localTime}
              </span>
            )}
            <a
              href="#hero"
              onMouseEnter={() => setIsHoveringTop(true)}
              onMouseLeave={() => setIsHoveringTop(false)}
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors group"
            >
              Back to top
              <motion.span
                animate={isHoveringTop ? { y: [0, -4, 0], rotate: [0, -10, 0] } : { y: 0 }}
                transition={isHoveringTop ? { duration: 0.5, repeat: Infinity } : { duration: 0.3 }}
              >
                {isHoveringTop ? <Rocket className="h-3 w-3" /> : <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />}
              </motion.span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
