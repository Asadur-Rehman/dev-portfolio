"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/data/experience";
import { Badge } from "@/components/ui/Badge";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0 },
};

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 px-6 sm:px-12 lg:px-24 bg-surface/50"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          id="experience-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-12"
        >
          Experience
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="relative"
        >
          {/* Vertical line - desktop */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block"
            aria-hidden
          />
          <div className="space-y-12">
            {experience.map((entry) => (
              <motion.article
                key={entry.id}
                variants={item}
                className="relative flex gap-8 md:gap-12"
              >
                <div className="hidden md:flex shrink-0 w-12 justify-center">
                  <div className="w-4 h-4 rounded-full bg-accent ring-4 ring-background" />
                </div>
                <div className="flex-1 min-w-0 pl-0 md:pl-4">
                  <div className="rounded-xl border border-border bg-surface-elevated p-6 hover:border-accent/30 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {entry.role}
                        </h3>
                        <p className="text-accent font-medium">{entry.company}</p>
                      </div>
                      <span className="text-sm text-muted shrink-0">
                        {entry.duration}
                      </span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {entry.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="text-muted text-sm flex gap-2"
                        >
                          <span className="text-accent mt-1.5">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {entry.tech.map((t) => (
                        <Badge key={t} variant="muted">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
