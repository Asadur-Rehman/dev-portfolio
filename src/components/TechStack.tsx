"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills, skillCategories } from "@/data/skills";
import type { SkillCategory } from "@/data/skills";
import { SectionDivider } from "@/components/ui/SectionDivider";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const categoryAccent: Record<SkillCategory, string> = {
  languages: "border-l-blue-500",
  frontend: "border-l-violet-500",
  backend: "border-l-amber-500",
  database: "border-l-emerald-500",
  ai: "border-l-pink-500",
  tools: "border-l-orange-500",
};

export function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <SectionDivider />
      <section
        id="tech"
        ref={ref}
        className="relative py-20 sm:py-28 px-5 sm:px-8 lg:px-12 bg-background-2 border-y border-border/70 section-anchor"
        aria-labelledby="tech-heading"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">
              Stack
            </motion.p>
            <motion.h2
              id="tech-heading"
              variants={item}
              className="font-display font-bold text-balance text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground max-w-3xl"
            >
              Tools I use in production.
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-2xl text-base text-muted-strong">
              A practical stack for shipping SaaS, APIs, and AI features — not a laundry list.
            </motion.p>

            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((cat) => {
                const catSkills = skills.filter((s) => s.category === cat.id);
                return (
                  <motion.div
                    key={cat.id}
                    variants={item}
                    className={`rounded-xl border border-border bg-surface-elevated p-5 border-l-4 ${categoryAccent[cat.id]} shadow-sm`}
                  >
                    <h3 className="font-display font-semibold text-foreground">{cat.label}</h3>
                    <p className="text-xs text-muted mt-1 mb-4">{cat.description}</p>
                    <ul className="flex flex-wrap gap-2">
                      {catSkills.map((skill) => (
                        <li
                          key={skill.name}
                          className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-mono text-muted-strong"
                        >
                          {skill.name}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
