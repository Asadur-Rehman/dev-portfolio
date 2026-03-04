"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Wrench,
  Cloud,
  type LucideIcon,
} from "lucide-react";
import { skills, skillCategories } from "@/data/skills";
import type { SkillCategory } from "@/data/skills";

const categoryIcons: Record<SkillCategory, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  tools: Wrench,
  cloud: Cloud,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="tech"
      ref={ref}
      className="py-24 px-6 sm:px-12 lg:px-24 bg-surface/50"
      aria-labelledby="tech-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          id="tech-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-12"
        >
          Tech Stack
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
        >
          {skillCategories.map((cat) => {
            const Icon = categoryIcons[cat.id];
            const categorySkills = skills.filter((s) => s.category === cat.id);
            return (
              <motion.div
                key={cat.id}
                variants={item}
                className="rounded-xl border border-border bg-surface-elevated p-6 hover:border-accent/30 hover:shadow-glow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="h-5 w-5 text-accent" aria-hidden />
                  <h3 className="font-display font-semibold text-foreground">
                    {cat.label}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {categorySkills.map((skill) => (
                    <li
                      key={skill.name}
                      className="text-muted hover:text-accent transition-colors cursor-default font-medium"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
