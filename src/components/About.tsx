"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, Globe, Layers } from "lucide-react";
import { personal } from "@/data/personal";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const stats = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "NUST SEECS",
    sub: "Sub-5% acceptance",
    accent: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/20",
  },
  {
    icon: Briefcase,
    label: "Currently",
    value: "Aurora Solutions",
    sub: "Software Engineer",
    accent: "text-violet-400",
    bg: "bg-violet-400/10 border-violet-400/20",
  },
  {
    icon: Layers,
    label: "Shipped",
    value: "10+ projects",
    sub: "End-to-end, production",
    accent: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
  {
    icon: Globe,
    label: "Open to",
    value: "Remote, global",
    sub: "Senior IC roles",
    accent: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
  },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 sm:py-36 px-5 sm:px-10 lg:px-20"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>

          <motion.p variants={fade} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">
            01 — About
          </motion.p>

          <motion.h2
            id="about-heading"
            variants={fade}
            className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl tracking-tighter text-foreground max-w-3xl"
          >
            I build software that{" "}
            <span className="text-gradient-accent">earns its place</span>{" "}
            in production.
          </motion.h2>

          <motion.div variants={fade} className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Bio */}
            <div className="lg:col-span-7 space-y-5 text-base sm:text-lg leading-relaxed text-muted-strong text-pretty">
              <p>{personal.bio}</p>
              <p>{personal.bioExtended}</p>
              <p className="text-foreground/90 font-medium">{personal.bioClose}</p>
            </div>

            {/* Stat cards */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.label}
                      variants={fade}
                      className="group relative rounded-2xl glass p-5 hover:border-white/10 hover:-translate-y-0.5 hover:shadow-card transition-all duration-300 overflow-hidden"
                    >
                      {/* Subtle hover glow */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                        style={{ background: "radial-gradient(circle at 50% 0%,rgba(0,212,255,0.06),transparent 70%)" }}
                        aria-hidden
                      />
                      <span className={`inline-grid h-9 w-9 place-items-center rounded-xl border mb-4 ${s.bg} ${s.accent}`}>
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1">{s.label}</p>
                      <p className={`font-display font-semibold text-sm sm:text-base leading-snug ${s.accent}`}>{s.value}</p>
                      <p className="mt-0.5 text-xs text-muted">{s.sub}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
