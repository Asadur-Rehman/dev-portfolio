"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, ArrowUpRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SectionDivider } from "@/components/ui/SectionDivider";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Hide the entire section if there are no testimonials yet — no awkward empty state.
  if (testimonials.length === 0) return null;

  return (
    <>
      <SectionDivider />
      <section
        id="testimonials"
        ref={ref}
        className="relative py-24 sm:py-32 px-5 sm:px-10 lg:px-20 overflow-hidden"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">
              References
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
            >
              <h2
                id="testimonials-heading"
                className="font-display font-bold text-balance text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground max-w-3xl"
              >
                What people I&apos;ve worked with say.
              </h2>
              <p className="max-w-md text-sm text-muted-strong">
                A few words from founders, managers, and teammates I&apos;ve shipped with. More references available on request.
              </p>
            </motion.div>

            <motion.div variants={container} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((t) => (
                <motion.figure key={t.id} variants={item} className="h-full">
                  <SpotlightCard className="rounded-2xl h-full" spotlightColor="rgba(0, 212, 255, 0.08)">
                    <div className="h-full rounded-2xl border border-border bg-surface/60 p-6 flex flex-col">
                      <Quote className="h-5 w-5 text-accent/70 mb-4" aria-hidden />
                      <blockquote className="text-sm sm:text-[0.95rem] text-foreground/90 leading-relaxed text-pretty mb-6">
                        {t.quote}
                      </blockquote>

                      <figcaption className="mt-auto pt-4 border-t border-border/60 flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent font-mono text-xs font-semibold">
                          {t.avatarInitials ??
                            t.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground truncate">{t.name}</p>
                          <p className="text-xs text-muted truncate">
                            {t.role} · {t.company}
                          </p>
                        </div>
                        {t.linkedInUrl && (
                          <a
                            href={t.linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 grid h-8 w-8 place-items-center rounded-full border border-border bg-background/40 text-muted hover:text-accent hover:border-accent/40 transition-colors"
                            aria-label={`${t.name} on LinkedIn`}
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </figcaption>
                    </div>
                  </SpotlightCard>
                </motion.figure>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
