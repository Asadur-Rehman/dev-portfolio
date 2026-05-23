"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Building2, MapPin, CalendarDays } from "lucide-react";
import { experience } from "@/data/experience";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SectionDivider } from "@/components/ui/SectionDivider";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const headerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function VerticalTimeline({ isInView, lineScaleY }: { isInView: boolean; lineScaleY: import("framer-motion").MotionValue<number> }) {
  return (
    <motion.div variants={container} className="mt-14 relative">
      <motion.div
        className="absolute left-3.5 top-3 bottom-3 w-px origin-top"
        style={{ scaleY: lineScaleY, background: "linear-gradient(to bottom, var(--accent) 0%, var(--accent-2) 50%, transparent 100%)" }}
        aria-hidden
      />
      <div className="space-y-8">
        {experience.map((entry, idx) => (
          <motion.article key={entry.id} variants={item} className="relative pl-10">
            <motion.span
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.2 + idx * 0.12, type: "spring", stiffness: 300 }}
              className="flex absolute left-0 top-4 h-7 w-7 items-center justify-center rounded-full bg-background border border-accent/40 ring-4 ring-background"
              aria-hidden
            >
              <span className="h-2 w-2 rounded-full bg-accent" />
            </motion.span>

            <SpotlightCard className="rounded-2xl" spotlightColor="rgba(0, 212, 255, 0.06)">
              <div className="rounded-2xl border border-border bg-surface/60 p-6 transition-all duration-300 overflow-hidden relative">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Building2 className="h-4 w-4 text-accent shrink-0" aria-hidden />
                      <p className="font-display font-semibold text-foreground">{entry.company}</p>
                      {idx === 0 && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[0.6rem] font-mono uppercase tracking-wider text-emerald-400">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-2xl tracking-tight text-foreground">{entry.role}</h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                  <p className="inline-flex items-center gap-1.5 font-mono text-xs text-accent">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden />{entry.duration}
                  </p>
                  {entry.location && (
                    <p className="inline-flex items-center gap-1 text-xs text-muted">
                      <MapPin className="h-3 w-3" aria-hidden />{entry.location}
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
                    <span key={t} className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-mono text-muted-strong">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <>
      <SectionDivider />
      <section
        id="experience"
        ref={ref}
        className="relative py-24 sm:py-28 px-5 sm:px-10 lg:px-20 border-t border-border/60 bg-background-2/40 overflow-hidden"
        aria-labelledby="experience-heading"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <motion.p variants={headerItem} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">
              Experience
            </motion.p>

            <motion.h2
              id="experience-heading"
              variants={headerItem}
              className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-foreground max-w-3xl"
            >
              Where I&apos;ve worked.
            </motion.h2>

            <VerticalTimeline isInView={isInView} lineScaleY={lineScaleY} />
          </motion.div>
        </div>
      </section>
    </>
  );
}
