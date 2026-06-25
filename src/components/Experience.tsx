"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, MapPin, CalendarDays } from "lucide-react";
import { experience } from "@/data/experience";
import { SectionDivider } from "@/components/ui/SectionDivider";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <SectionDivider />
      <section
        id="experience"
        ref={ref}
        className="relative py-20 sm:py-28 px-5 sm:px-8 lg:px-12 border-t border-border/70 bg-background-2 section-anchor"
        aria-labelledby="experience-heading"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">
              Experience
            </motion.p>

            <motion.h2
              id="experience-heading"
              variants={item}
              className="font-display font-bold text-balance text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground max-w-3xl"
            >
              Where I&apos;ve worked.
            </motion.h2>

            <div className="mt-12 relative space-y-8">
              <div
                className="absolute left-3.5 top-3 bottom-3 w-px bg-border"
                aria-hidden
              />
              {experience.map((entry, idx) => (
                <motion.article key={entry.id} variants={item} className="relative pl-10">
                  <span
                    className="flex absolute left-0 top-4 h-7 w-7 items-center justify-center rounded-full bg-background border border-accent/30"
                    aria-hidden
                  >
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </span>

                  <div className="rounded-xl border border-border bg-surface-elevated p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Building2 className="h-4 w-4 text-accent shrink-0" aria-hidden />
                          <p className="font-display font-semibold text-foreground">{entry.company}</p>
                          {idx === 0 && (
                            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[0.6rem] font-mono uppercase tracking-wider alert-success">
                              Current
                            </span>
                          )}
                        </div>
                        <h3 className="font-display font-bold text-xl tracking-tight text-foreground">{entry.role}</h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                      <p className="inline-flex items-center gap-1.5 font-mono text-xs text-accent">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                        {entry.duration}
                      </p>
                      {entry.location && (
                        <p className="inline-flex items-center gap-1 text-xs text-muted">
                          <MapPin className="h-3 w-3" aria-hidden />
                          {entry.location}
                        </p>
                      )}
                    </div>

                    <ul className="space-y-2.5 mb-6">
                      {entry.achievements.map((a) => (
                        <li key={a} className="text-sm text-muted-strong flex gap-3 leading-relaxed">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {entry.tech.map((t) => (
                        <span key={t} className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-mono text-muted-strong">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
