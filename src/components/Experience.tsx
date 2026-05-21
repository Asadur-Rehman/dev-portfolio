"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Building2, MapPin, CalendarDays, ArrowRight } from "lucide-react";
import { experience } from "@/data/experience";
import type { ExperienceEntry } from "@/data/experience";
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

function ExperienceCard({ entry, idx, total }: { entry: ExperienceEntry; idx: number; total: number }) {
  return (
    <article className="shrink-0 w-[78vw] sm:w-[60vw] lg:w-[440px] xl:w-[520px]">
      <SpotlightCard className="rounded-2xl h-full" spotlightColor="rgba(0, 212, 255, 0.07)">
        <div className="relative h-full rounded-2xl border border-border bg-surface/70 p-6 sm:p-7 transition-all duration-300 overflow-hidden">
          {/* corner index */}
          <span className="absolute top-4 right-5 font-mono text-[0.6rem] tracking-[0.25em] text-muted/50">
            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          {/* Header */}
          <div className="mb-5">
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
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <p className="inline-flex items-center gap-1.5 font-mono text-xs text-accent">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden />{entry.duration}
              </p>
              {entry.location && (
                <p className="inline-flex items-center gap-1 text-xs text-muted">
                  <MapPin className="h-3 w-3" aria-hidden />{entry.location}
                </p>
              )}
            </div>
          </div>

          {/* Achievements */}
          <ul className="space-y-2.5 mb-6">
            {entry.achievements.map((a) => (
              <li key={a} className="text-sm sm:text-base text-muted-strong flex gap-3 leading-relaxed">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden />
                <span>{a}</span>
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {entry.tech.map((t) => (
              <span key={t} className="shimmer-hover rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-mono text-muted-strong">
                {t}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </article>
  );
}

function HorizontalTimeline() {
  // The outer container is tall; the inner sticks and slides horizontally
  // as the page scrolls through this section.
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Tweak the end translation as you add more cards.
  // -68% slides through ~3 cards while leaving a comfortable tail.
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-68%"]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${100 + experience.length * 70}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* progress bar — top */}
        <div className="absolute left-0 right-0 top-24 mx-auto max-w-7xl px-10 lg:px-20">
          <div className="relative h-px w-full bg-border/60">
            <motion.span
              style={{ width: lineWidth }}
              className="absolute left-0 top-0 h-px bg-gradient-to-r from-accent via-accent-2 to-accent"
            />
            {/* dots over the bar */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between">
              {experience.map((e, i) => (
                <span
                  key={e.id}
                  className="block h-2 w-2 rounded-full bg-background border border-accent/40"
                  style={{ marginLeft: i === 0 ? 0 : undefined, marginRight: i === experience.length - 1 ? 0 : undefined }}
                />
              ))}
            </div>
          </div>
          <div className="mt-2 flex justify-between font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted/60">
            {experience.map((e) => (
              <span key={e.id} className="truncate max-w-[20%]">{e.duration.split("—")[0].trim()}</span>
            ))}
          </div>
        </div>

        {/* the moving row */}
        <motion.div style={{ x }} className="flex items-center gap-8 px-20 will-change-transform">
          {experience.map((entry, idx) => (
            <ExperienceCard key={entry.id} entry={entry} idx={idx} total={experience.length} />
          ))}

          {/* end-card */}
          <div className="shrink-0 w-[440px] xl:w-[520px] h-full flex items-center">
            <div className="rounded-2xl border border-dashed border-accent/30 bg-accent/[0.03] p-7 w-full">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-accent/70 mb-3">Next chapter</p>
              <h3 className="font-display font-bold text-2xl tracking-tight text-foreground">Open to the right role.</h3>
              <p className="mt-3 text-sm text-muted-strong leading-relaxed">
                Senior IC / full-stack / AI-engineering positions where the bar is high and the work is hard.
              </p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background hover:bg-accent-hover hover:shadow-glow transition-all"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </motion.div>

        {/* scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted/50">
          <span>scroll</span>
          <span aria-hidden>→</span>
        </div>
      </div>
    </div>
  );
}

function VerticalTimeline({ isInView, lineScaleY }: { isInView: boolean; lineScaleY: import("framer-motion").MotionValue<number> }) {
  return (
    <motion.div variants={container} className="mt-14 relative lg:hidden">
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
              transition={{ delay: 0.3 + idx * 0.15, type: "spring", stiffness: 300 }}
              className="flex absolute left-0 top-4 h-7 w-7 items-center justify-center rounded-full bg-background border border-accent/40 ring-4 ring-background"
              aria-hidden
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                className="h-2 w-2 rounded-full bg-accent"
              />
            </motion.span>

            <SpotlightCard className="rounded-2xl" spotlightColor="rgba(0, 212, 255, 0.06)">
              <div className="rounded-2xl border border-border bg-surface/60 p-6 transition-all duration-300 overflow-hidden relative">
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
                    <span key={t} className="shimmer-hover rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-mono text-muted-strong">
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
        {/* Decorative background number */}
        <div className="absolute inset-0 flex items-start justify-end pointer-events-none overflow-hidden select-none" aria-hidden>
          <span className="font-display font-black text-[12rem] sm:text-[18rem] lg:text-[22rem] text-foreground/[0.02] leading-none tracking-tightest pr-0 -mr-8 mt-0">
            04
          </span>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <motion.p variants={headerItem} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">
              04 — Experience
            </motion.p>

            <motion.h2
              id="experience-heading"
              variants={headerItem}
              className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-foreground max-w-3xl"
            >
              A track record of <span className="text-gradient-accent">production work</span>.
            </motion.h2>

            {/* mobile / tablet */}
            <VerticalTimeline isInView={isInView} lineScaleY={lineScaleY} />
          </motion.div>
        </div>

        {/* desktop: pinned horizontal scroll */}
        <HorizontalTimeline />
      </section>
    </>
  );
}
