"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personal } from "@/data/personal";
import { skills } from "@/data/skills";
import { Card } from "@/components/ui/Card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stats = [
  { label: "Years of Experience", value: "4+" },
  { label: "Projects Completed", value: "20+" },
  { label: "Technologies Mastered", value: "15+" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-6 sm:px-12 lg:px-24"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          id="about-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-12"
        >
          About Me
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid lg:grid-cols-5 gap-12 lg:gap-16"
        >
          <div className="lg:col-span-3 space-y-8">
            <motion.p variants={item} className="text-muted text-lg leading-relaxed">
              {personal.bio}
            </motion.p>
            <motion.div variants={item} className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} hover={false} className="text-center">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-accent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted mt-1">{stat.label}</p>
                </Card>
              ))}
            </motion.div>
          </div>
          <div className="lg:col-span-2">
            <motion.p variants={item} className="text-sm font-medium text-muted mb-4">
              Tech stack
            </motion.p>
            <motion.div
              variants={container}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill.name}
                  variants={item}
                  className="inline-flex items-center rounded-lg bg-surface-elevated border border-border px-3 py-2 text-sm font-medium text-foreground hover:border-accent/50 hover:text-accent transition-colors cursor-default"
                >
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
