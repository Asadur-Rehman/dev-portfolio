"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { process } from "@/data/process";
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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <SectionDivider />
      <section
        id="process"
        ref={ref}
        className="relative py-20 sm:py-28 px-5 sm:px-8 lg:px-12 section-anchor"
        aria-labelledby="process-heading"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">
              Process
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
            >
              <h2
                id="process-heading"
                className="font-display font-bold text-balance text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground max-w-3xl"
              >
                How I actually work.
              </h2>
              <p className="max-w-md text-sm text-muted-strong">
                Four steps from intro call to live product. Predictable, transparent, and built around weekly deployable progress — not surprise reveals.
              </p>
            </motion.div>

            <motion.ol
              variants={container}
              className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {/* Connecting line on lg screens */}
              <div
                className="hidden lg:block absolute top-[2.75rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
                aria-hidden
              />

              {process.map((step) => (
                <motion.li key={step.id} variants={item} className="relative h-full list-none">
                  <div className="h-full rounded-xl border border-border bg-surface-elevated p-6 flex flex-col shadow-sm">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/30 bg-accent/10 font-mono text-sm font-semibold text-accent">
                          {step.step}
                        </span>
                        <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                          {step.duration}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg tracking-tight text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-strong leading-relaxed mb-5">
                        {step.description}
                      </p>

                      <ul className="space-y-2 mt-auto pt-4 border-t border-border/60">
                        {step.deliverables.map((d) => (
                          <li key={d} className="flex gap-2 text-xs text-muted-strong leading-relaxed">
                            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-accent/80" aria-hidden />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                </motion.li>
              ))}
            </motion.ol>
          </motion.div>
        </div>
      </section>
    </>
  );
}
