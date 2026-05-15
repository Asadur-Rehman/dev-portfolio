"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Building2, MapPin, CalendarDays } from "lucide-react";
import { experience } from "@/data/experience";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SectionDivider } from "@/components/ui/SectionDivider";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, x: -40, scale: 0.97 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const headerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Timeline line draws as user scrolls through section
  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <>
      <SectionDivider />
      <section id="experience" ref={ref} className="relative py-24 sm:py-36 px-5 sm:px-10 lg:px-20 border-t border-border/60 bg-background-2/40" aria-labelledby="experience-heading">
        <motion.div style={{ y }} className="max-w-5xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <motion.p variants={headerItem} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">04 — Experience</motion.p>

            <motion.h2 id="experience-heading" variants={headerItem} className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl tracking-tighter text-foreground max-w-3xl">
              A track record of <span className="text-gradient-accent">production work</span>.
            </motion.h2>

            <motion.div variants={container} className="mt-14 sm:mt-16 relative">
              {/* Animated timeline line */}
              <motion.div
                className="absolute left-3.5 top-3 bottom-3 w-px origin-top hidden md:block"
                style={{
                  scaleY: lineScaleY,
                  background: "linear-gradient(to bottom, var(--accent) 0%, var(--accent-2) 50%, transparent 100%)",
                }}
                aria-hidden
              />

              <div className="space-y-8 sm:space-y-10">
                {experience.map((entry, idx) => (
                  <motion.article key={entry.id} variants={item} className="relative md:pl-14">
                    {/* Timeline dot with pulse */}
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.3 + idx * 0.15, type: "spring", stiffness: 300 }}
                      className="hidden md:flex absolute left-0 top-4 h-7 w-7 items-center justify-center rounded-full bg-background border border-accent/40 ring-4 ring-background"
                      aria-hidden
                    >
                      <motion.span
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                        className="h-2 w-2 rounded-full bg-accent"
                      />
                    </motion.span>

                    {/* Mobile dot */}
                    <div className="md:hidden flex items-center gap-2.5 mb-3">
                      <span className="h-2 w-2 rounded-full bg-accent shrink-0" aria-hidden />
                      <p className="font-mono text-xs text-accent">{entry.duration}</p>
                    </div>

                    {/* Card with spotlight */}
                    <SpotlightCard className="rounded-2xl" spotlightColor="rgba(0, 212, 255, 0.06)">
                      <div className="rounded-2xl border border-border bg-surface/60 p-6 sm:p-7 transition-all duration-300 overflow-hidden relative">
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <Building2 className="h-4 w-4 text-accent shrink-0" aria-hidden />
                              <p className="font-display font-semibold text-foreground">{entry.company}</p>
                              {idx === 0 && (
                                <span className="breathing-glow inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[0.6rem] font-mono uppercase tracking-wider text-emerald-400">
                                  Current
                                </span>
                              )}
                            </div>
                            <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-foreground">{entry.role}</h3>
                          </div>

                          <div className="hidden md:block text-right shrink-0">
                            <p className="inline-flex items-center gap-1.5 font-mono text-xs text-accent">
                              <CalendarDays className="h-3.5 w-3.5" aria-hidden />{entry.duration}
                            </p>
                            {entry.location && (
                              <p className="mt-1 flex items-center justify-end gap-1 text-xs text-muted">
                                <MapPin className="h-3 w-3" aria-hidden />{entry.location}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Achievements */}
                        <ul className="space-y-2.5 mb-6">
                          {entry.achievements.map((a) => (
                            <li key={a} className="text-sm sm:text-base text-muted-strong flex gap-3 leading-relaxed">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden /><span>{a}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2">
                          {entry.tech.map((t) => <span key={t} className="shimmer-hover rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-mono text-muted-strong">{t}</span>)}
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
