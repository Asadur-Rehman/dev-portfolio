"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { personal } from "@/data/personal";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-20 pt-32 pb-20 overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
        <div className="absolute top-[10%] left-[8%] w-[42rem] h-[42rem] rounded-full bg-accent/[0.08] blur-[140px] animate-pulse-soft" />
        <div className="absolute bottom-[-10%] right-[5%] w-[34rem] h-[34rem] rounded-full bg-accent-2/[0.10] blur-[120px] animate-pulse-soft" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-accent/[0.025] blur-[100px]" />
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="max-w-6xl mx-auto w-full">
        <motion.div variants={item} className="flex flex-wrap items-center gap-3 mb-10">
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
          <span className="hidden md:inline-flex items-center gap-1.5 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-strong">
            <Sparkles className="h-3.5 w-3.5 text-accent-2" aria-hidden />
            {personal.currentRole}
          </span>
        </motion.div>

        <motion.p variants={item} className="font-mono text-sm sm:text-base text-accent mb-5 tracking-wider">
          {"//"} Hi, I&apos;m {personal.firstName} —
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display font-bold text-balance leading-[0.95] tracking-tightest text-[3rem] sm:text-[4.5rem] md:text-[5.75rem] lg:text-[7rem] xl:text-[8rem]"
        >
          <span className="text-foreground">Full-Stack</span>
          <br />
          <span className="text-gradient-accent">Engineer</span>
          <span className="text-foreground"> &amp; </span>
          <span className="text-gradient">AI Architect</span>
          <span className="text-accent">.</span>
        </motion.h1>

        <motion.p variants={item} className="mt-8 max-w-2xl text-lg sm:text-xl text-muted-strong leading-relaxed text-pretty">
          {personal.headline}{" "}
          <span className="text-foreground/80">Building intelligent software that scales.</span>
        </motion.p>

        <motion.p variants={item} className="mt-3 max-w-2xl text-sm sm:text-base text-muted">
          {personal.subhead}
        </motion.p>

        <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollTo("projects")}
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-background transition-all duration-300 hover:bg-accent-hover hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]"
          >
            View My Work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="group inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 text-base font-semibold text-foreground transition-all duration-300 hover:border-accent/40 hover:text-accent hover:scale-[1.02] active:scale-[0.98]"
          >
            Get In Touch
            <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" aria-hidden />
          </button>
        </motion.div>

        <motion.div variants={item} className="mt-20 sm:mt-28 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 max-w-3xl">
          {[
            { k: "Education", v: "NUST SEECS" },
            { k: "Currently", v: "Aurora Solutions" },
            { k: "Focus", v: "Full-Stack & AI" },
            { k: "Location", v: "Islamabad / Remote" },
          ].map((s) => (
            <div key={s.k} className="border-l border-border-strong pl-4">
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">{s.k}</p>
              <p className="mt-1 text-sm sm:text-base font-medium text-foreground">{s.v}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors group"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce group-hover:text-accent" />
      </motion.button>
    </section>
  );
}
