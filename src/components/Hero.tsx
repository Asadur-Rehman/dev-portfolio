"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { personal } from "@/data/personal";
import { NowBar } from "@/components/ui/NowBar";
import { TrustStrip } from "@/components/ui/TrustStrip";
import type { LiveActivity } from "@/lib/github";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const techStack = ["TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL", "OpenAI API", "MongoDB"];

export function Hero({ liveActivity }: { liveActivity?: LiveActivity | null } = {}) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-center px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-16 border-b border-border/70 section-anchor"
      aria-label="Hero"
    >
      <div className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-70" aria-hidden />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto w-full"
      >
        <motion.div variants={item} className="flex flex-wrap items-center gap-2.5 mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted-strong">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            {personal.availability}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted-strong">
            <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden />
            {personal.location}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted-strong">
            <Clock className="h-3.5 w-3.5 text-accent" aria-hidden />
            US-friendly hours (PKT)
          </span>
        </motion.div>

        <motion.p variants={item} className="font-mono text-sm text-accent mb-4 tracking-wide">
          Hi, I&apos;m {personal.firstName}.
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display font-bold text-balance leading-[1.05] tracking-tightest text-[2.5rem] xs:text-[3rem] sm:text-[3.75rem] md:text-[4.5rem] lg:text-[5rem] text-foreground"
        >
          Full-Stack &amp;{" "}
          <span className="text-gradient-accent">AI Engineer</span>
          {" "}for startups and product teams.
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-2xl text-base sm:text-lg text-muted-strong leading-relaxed">
          {personal.headline}
        </motion.p>
        <motion.p variants={item} className="mt-3 max-w-2xl text-sm sm:text-base text-muted leading-relaxed">
          {personal.subhead}
        </motion.p>

        <motion.div variants={item} className="mt-8 max-w-xl">
          <NowBar liveActivity={liveActivity ?? null} />
        </motion.div>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => scrollTo("projects")}
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
          >
            View selected work
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface-elevated px-6 py-3 text-base font-semibold text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
          >
            Start a project
          </button>
        </motion.div>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-2" aria-label="Core technologies">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md border border-border bg-surface px-3 py-1 text-xs font-mono text-muted-strong"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <TrustStrip />
      </motion.div>
    </section>
  );
}
