"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { personal } from "@/data/personal";
import { Aurora } from "@/components/ui/Aurora";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NowBar } from "@/components/ui/NowBar";
import { TrustStrip } from "@/components/ui/TrustStrip";
import type { LiveActivity } from "@/lib/github";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const techStack = ["TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL", "OpenAI API", "MongoDB"];

export function Hero({ liveActivity }: { liveActivity?: LiveActivity | null } = {}) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-5 sm:px-10 lg:px-20 pt-24 sm:pt-32 pb-20 overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 -z-10" aria-hidden>
        <Aurora />
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto w-full"
      >
        <motion.div variants={item} className="flex flex-wrap items-center gap-2.5 mb-8">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted-strong">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            {personal.availability}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-strong">
            <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden />
            {personal.location}
          </span>
        </motion.div>

        <motion.p variants={item} className="font-mono text-sm text-accent mb-5 tracking-wide">
          Hi, I&apos;m {personal.firstName}.
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display font-bold text-balance leading-[0.95] tracking-tightest text-[2.75rem] xs:text-[3.25rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem]"
        >
          <span className="text-foreground">Full-Stack &amp; </span>
          <span className="text-gradient-accent">AI Engineer</span>
          <span className="text-accent">.</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-2xl text-base sm:text-lg text-muted-strong leading-relaxed">
          {personal.headline}
        </motion.p>
        <motion.p variants={item} className="mt-3 max-w-2xl text-sm text-muted">
          {personal.subhead}
        </motion.p>

        <motion.div variants={item} className="mt-8 max-w-xl">
          <NowBar liveActivity={liveActivity ?? null} />
        </motion.div>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <MagneticButton strength={0.10}>
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-background transition-all duration-300 hover:bg-accent-hover hover:shadow-glow-accent hover:scale-[1.02] active:scale-[0.98]"
            >
              See my work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </button>
          </MagneticButton>
          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-3.5 text-base font-semibold text-foreground transition-all duration-300 hover:border-accent/50 hover:text-accent hover:scale-[1.02] active:scale-[0.98]"
          >
            Get in touch
          </button>
        </motion.div>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-2" aria-label="Core technologies">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full border border-border/60 bg-surface/40 px-3 py-1 text-xs font-mono text-muted-strong"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <TrustStrip />
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
