"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, MapPin, Sparkles, Command } from "lucide-react";
import { personal } from "@/data/personal";
import { Aurora } from "@/components/ui/Aurora";
import { TypeWriter } from "@/components/ui/TypeWriter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { DistortName } from "@/components/ui/DistortName";
import { NowBar } from "@/components/ui/NowBar";
import type { LiveActivity } from "@/lib/github";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// Letter-by-letter stagger for headline
const letterContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.018, delayChildren: 0.25 },
  },
};

const letter = {
  hidden: { opacity: 0, y: 24, rotateX: -20 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const techStack = ["TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL", "OpenAI API", "MongoDB"];

const stats = [
  { k: "Education", v: "NUST SEECS" },
  { k: "Currently", v: "Aurora Solutions" },
  { k: "Focus", v: "Full-Stack & AI" },
  { k: "Location", v: "Remote / Global" },
];

function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span variants={letterContainer} initial="hidden" animate="show" className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letter}
          className="inline-block"
          style={{ transformOrigin: "center bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function TerminalWidget() {
  return (
    <SpotlightCard
      className="rounded-2xl"
      spotlightColor="rgba(0, 212, 255, 0.12)"
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong rounded-2xl overflow-hidden shadow-card border-border/80 w-full max-w-xs"
        aria-hidden
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-surface/60">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
          <span className="ml-auto font-mono text-[0.6rem] tracking-widest text-muted uppercase">~/asad</span>
        </div>
        {/* Code */}
        <div className="p-5 font-mono text-[0.72rem] leading-[1.75] text-foreground/80">
          <p><span className="text-accent-2">const</span> <span className="text-foreground">engineer</span> <span className="text-muted/60">=</span> {"{"}</p>
          <p className="pl-4"><span className="text-accent">role</span><span className="text-muted/60">:</span> <span className="text-accent-3">&quot;Full‑Stack + AI&quot;</span><span className="text-muted/50">,</span></p>
          <p className="pl-4"><span className="text-accent">stack</span><span className="text-muted/60">:</span> <span className="text-accent">[</span></p>
          {["Next.js", "TypeScript", "Node.js", "Python"].map((s) => (
            <p key={s} className="pl-8 text-foreground/60">&quot;{s}&quot;<span className="text-muted/50">,</span></p>
          ))}
          <p className="pl-4"><span className="text-accent">]</span><span className="text-muted/50">,</span></p>
          <p className="pl-4"><span className="text-accent">available</span><span className="text-muted/60">:</span> <span className="text-emerald-400">true</span></p>
          <p>{"}"}</p>
        </div>
        {/* Status */}
        <div className="px-5 py-3 border-t border-border/60 bg-surface/40 flex items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[0.65rem] text-emerald-400 tracking-wide">Open to remote roles</span>
        </div>
      </motion.div>
    </SpotlightCard>
  );
}

export function Hero({ liveActivity }: { liveActivity?: LiveActivity | null } = {}) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-5 sm:px-10 lg:px-20 pt-24 sm:pt-32 pb-20 overflow-hidden"
      aria-label="Hero"
    >
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <Aurora />
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[54rem] h-[54rem] rounded-full bg-accent/[0.02] blur-[100px]" />
        {/* Orbit rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-[36rem] h-[36rem] rounded-full border border-accent/[0.06] hidden lg:block"
        >
          <div className="absolute top-1/4 right-0 w-1.5 h-1.5 rounded-full bg-accent/40 shadow-glow-sm translate-x-1/2 -translate-y-1/2" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -right-10 w-[24rem] h-[24rem] rounded-full border border-accent-2/[0.05] hidden lg:block"
        >
          <div className="absolute bottom-1/4 left-0 w-1 h-1 rounded-full bg-accent-2/40 -translate-x-1/2" />
        </motion.div>
      </div>

      {/* Vertical scroll label — desktop only */}
      <div className="hidden lg:flex absolute right-6 xl:right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-10" aria-hidden>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-border-strong to-transparent" />
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-muted/25 [writing-mode:vertical-rl] rotate-180 select-none">
          scroll to explore
        </span>
      </div>

      {/* Content — 2-column at 2xl */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto w-full xl:grid xl:grid-cols-[1fr_340px] xl:gap-12 xl:items-center"
      >
        {/* ── Left / Main ── */}
        <div>
          {/* Status badges */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-2.5 mb-10">
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

          {/* Greeting with typewriter */}
          <motion.p variants={item} className="font-mono text-sm sm:text-base text-accent mb-5 tracking-wider">
            <TypeWriter text={`// Hi, I'm ${personal.firstName} —`} speed={45} delay={400} />
          </motion.p>

          {/* Headline — first line uses cursor-distorted letters */}
          <motion.h1
            variants={item}
            className="font-display font-bold text-balance leading-[0.93] tracking-tightest text-[2.75rem] xs:text-[3.25rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem] xl:text-[5rem] 2xl:text-[6.5rem]"
          >
            <DistortName text="Full-Stack" className="text-foreground" lift={26} radius={170} />
            <br />
            <AnimatedHeadline text="Engineer" className="text-gradient-accent" />
            <span className="text-foreground"> & </span>
            <AnimatedHeadline text="AI Architect" className="text-gradient" />
            <motion.span
              className="text-accent inline-block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.3, type: "spring", stiffness: 300 }}
            >
              .
            </motion.span>
          </motion.h1>

          {/* Live "Now" status bar */}
          <motion.div variants={item} className="mt-7 max-w-xl">
            <NowBar liveActivity={liveActivity ?? null} />
          </motion.div>

          {/* Subhead */}
          <motion.p variants={item} className="mt-7 max-w-2xl text-base sm:text-lg text-muted-strong leading-relaxed text-pretty">
            {personal.headline}{" "}
            <span className="text-foreground/80">Building intelligent software that scales.</span>
          </motion.p>
          <motion.p variants={item} className="mt-3 max-w-xl text-sm text-muted">
            {personal.subhead}
          </motion.p>

          {/* CTAs with magnetic effect */}
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton strength={0.12}>
              <button
                onClick={() => scrollTo("projects")}
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-background transition-all duration-300 hover:bg-accent-hover hover:shadow-glow-accent hover:scale-[1.03] active:scale-[0.97]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
              </button>
            </MagneticButton>
            <MagneticButton strength={0.12}>
              <button
                onClick={() => scrollTo("contact")}
                className="group inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-3.5 text-base font-semibold text-foreground transition-all duration-300 hover:border-accent/50 hover:text-accent hover:scale-[1.03] active:scale-[0.97] hover:shadow-glow-sm"
              >
                Get In Touch
                <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" aria-hidden />
              </button>
            </MagneticButton>

            {/* Cmd+K hint — invites discovery of the palette */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-3.5 py-2 text-xs font-mono text-muted hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all"
              aria-label="Open command palette"
            >
              <Command className="h-3.5 w-3.5" aria-hidden />
              <span>Press</span>
              <kbd className="rounded border border-border bg-background/60 px-1 py-0.5 text-[0.6rem]">⌘</kbd>
              <kbd className="rounded border border-border bg-background/60 px-1 py-0.5 text-[0.6rem]">K</kbd>
              <span className="text-muted/60">to navigate</span>
            </button>
          </motion.div>

          {/* Tech badges strip */}
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-2" aria-label="Core technologies">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.04, duration: 0.3 }}
                className="shimmer-hover inline-flex items-center rounded-full border border-border/60 bg-surface/40 px-3 py-1 text-xs font-mono text-muted-strong hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Stat cards */}
          <motion.div variants={item} className="mt-14 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            {stats.map((s, i) => (
              <SpotlightCard
                key={s.k}
                className="rounded-xl"
                spotlightColor="rgba(0, 212, 255, 0.06)"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                  className="glass p-4 rounded-xl border-border/60 hover:border-accent/30 transition-all duration-300"
                >
                  <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">{s.k}</p>
                  <p className="mt-1.5 text-xs sm:text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">{s.v}</p>
                </motion.div>
              </SpotlightCard>
            ))}
          </motion.div>
        </div>

        {/* ── Right / Terminal (xl+) ── */}
        <div className="hidden xl:flex flex-col gap-5 items-end">
          <TerminalWidget />
          {/* Floating stat card */}
          <SpotlightCard className="rounded-xl w-full max-w-xs" spotlightColor="rgba(167, 139, 250, 0.08)">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="glass rounded-xl p-4 w-full"
              aria-hidden
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-3">Currently at</p>
              <div className="flex items-center gap-3">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 border border-accent/20 font-display font-bold text-accent text-sm"
                >
                  A
                </motion.span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Aurora Solutions</p>
                  <p className="text-xs text-muted">Software Engineer</p>
                </div>
              </div>
            </motion.div>
          </SpotlightCard>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors group"
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
