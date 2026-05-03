"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Server, Database, Wrench, Sparkles, Terminal, type LucideIcon } from "lucide-react";
import { skills, skillCategories } from "@/data/skills";
import type { SkillCategory } from "@/data/skills";

const categoryIcons: Record<SkillCategory, LucideIcon> = {
  languages: Terminal,
  frontend: Code2,
  backend: Server,
  database: Database,
  ai: Sparkles,
  tools: Wrench,
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const marqueeTokens = ["TypeScript","Next.js","React","Node.js","NestJS","Python","FastAPI","OpenAI","MongoDB","PostgreSQL","Firebase","Tailwind","FAISS","LangChain","WebRTC","Docker"];

export function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tech" ref={ref} className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-20 border-y border-border/60 bg-background-2/40" aria-labelledby="tech-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
          <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">02 — Stack</motion.p>
          <motion.h2 id="tech-heading" variants={item} className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl tracking-tighter text-foreground max-w-3xl">
            Tools I reach for <span className="text-gradient-accent">when work needs to ship</span>.
          </motion.h2>
          <motion.p variants={item} className="mt-5 max-w-2xl text-lg text-muted-strong">
            A pragmatic toolkit for full-stack systems and AI-powered products. Sharpened in production, not in tutorials.
          </motion.p>
          <motion.div variants={container} className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCategories.map((cat) => {
              const Icon = categoryIcons[cat.id];
              const categorySkills = skills.filter((s) => s.category === cat.id);
              return (
                <motion.div key={cat.id} variants={item} className="group relative rounded-2xl border border-border bg-surface/60 p-6 hover:border-accent/40 hover:bg-surface transition-all duration-300 overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-accent/[0.04] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 border border-accent/20 text-accent">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <h3 className="font-display font-semibold text-foreground text-lg">{cat.label}</h3>
                    </div>
                    <p className="text-xs text-muted mb-5 ml-12">{cat.description}</p>
                    <ul className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <li key={skill.name} className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-medium text-muted-strong hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-colors cursor-default">
                          {skill.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
      <div className="mt-20 -mx-6 sm:-mx-10 lg:-mx-20 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-background-2 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-background-2 to-transparent pointer-events-none" />
          <div className="flex animate-marquee whitespace-nowrap will-change-transform">
            {[...marqueeTokens, ...marqueeTokens].map((t, i) => (
              <span key={`${t}-${i}`} className="mx-6 font-display text-3xl sm:text-4xl font-bold text-foreground/10 hover:text-accent transition-colors">
                {t}<span className="ml-12 text-accent/30">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
