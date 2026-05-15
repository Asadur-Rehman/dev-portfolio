"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Server, Database, Wrench, Sparkles, Terminal, type LucideIcon } from "lucide-react";
import { skills, skillCategories } from "@/data/skills";
import type { SkillCategory } from "@/data/skills";

const categoryMeta: Record<SkillCategory, {
  icon: LucideIcon;
  accent: string;
  bg: string;
  glow: string;
}> = {
  languages: { icon: Terminal,  accent: "text-cyan-400",    bg: "bg-cyan-400/10 border-cyan-400/20",    glow: "rgba(34,211,238,0.12)" },
  frontend:  { icon: Code2,     accent: "text-violet-400",  bg: "bg-violet-400/10 border-violet-400/20", glow: "rgba(167,139,250,0.12)" },
  backend:   { icon: Server,    accent: "text-amber-400",   bg: "bg-amber-400/10 border-amber-400/20",   glow: "rgba(251,191,36,0.10)" },
  database:  { icon: Database,  accent: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20",glow: "rgba(52,211,153,0.10)" },
  ai:        { icon: Sparkles,  accent: "text-pink-400",    bg: "bg-pink-400/10 border-pink-400/20",     glow: "rgba(244,114,182,0.10)" },
  tools:     { icon: Wrench,    accent: "text-orange-400",  bg: "bg-orange-400/10 border-orange-400/20", glow: "rgba(251,146,60,0.10)" },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const marqueeTokens = [
  "TypeScript","Next.js","React","Node.js","NestJS","Python","FastAPI","OpenAI",
  "MongoDB","PostgreSQL","Firebase","Tailwind","FAISS","LangChain","WebRTC","Docker",
];

export function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="tech"
      ref={ref}
      className="relative py-24 sm:py-36 px-5 sm:px-10 lg:px-20 border-y border-border/60 bg-background-2/40"
      aria-labelledby="tech-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>

          <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">
            02 — Stack
          </motion.p>

          <motion.h2
            id="tech-heading"
            variants={item}
            className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl tracking-tighter text-foreground max-w-3xl"
          >
            Tools I reach for{" "}
            <span className="text-gradient-accent">when work needs to ship</span>.
          </motion.h2>

          <motion.p variants={item} className="mt-5 max-w-2xl text-base sm:text-lg text-muted-strong">
            A pragmatic toolkit for full-stack systems and AI-powered products. Sharpened in production, not tutorials.
          </motion.p>

          <motion.div variants={container} className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {skillCategories.map((cat) => {
              const meta = categoryMeta[cat.id];
              const Icon = meta.icon;
              const categorySkills = skills.filter((s) => s.category === cat.id);

              return (
                <motion.div
                  key={cat.id}
                  variants={item}
                  className="group relative rounded-2xl border border-border bg-surface/60 p-6 hover:border-white/10 hover:-translate-y-0.5 hover:shadow-card transition-all duration-300 overflow-hidden"
                >
                  {/* Hover radial glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${meta.glow}, transparent 70%)` }}
                    aria-hidden
                  />

                  <div className="flex items-center gap-3 mb-2">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${meta.bg} ${meta.accent}`}>
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <h3 className={`font-display font-semibold text-base sm:text-lg ${meta.accent}`}>{cat.label}</h3>
                  </div>

                  <p className="text-xs text-muted mb-5 ml-12">{cat.description}</p>

                  <ul className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <li
                        key={skill.name}
                        className={`rounded-full border border-border/80 bg-background/40 px-3 py-1 text-xs font-medium text-muted-strong hover:border-current/40 hover:bg-current/5 transition-all duration-200 cursor-default hover:${meta.accent}`}
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="mt-20 -mx-5 sm:-mx-10 lg:-mx-20 overflow-hidden">
        <div className="relative select-none">
          <div className="absolute inset-y-0 left-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-background-2 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-background-2 to-transparent pointer-events-none" />
          <div className="flex animate-marquee whitespace-nowrap will-change-transform">
            {[...marqueeTokens, ...marqueeTokens].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="mx-6 font-display text-2xl sm:text-4xl font-bold text-foreground/[0.08] hover:text-accent/50 transition-colors duration-300"
              >
                {t}<span className="ml-10 text-accent/20">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
