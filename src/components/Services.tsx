"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Code2, Sparkles, Radio, Briefcase, Calendar, Clock } from "lucide-react";
import { services } from "@/data/services";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SectionDivider } from "@/components/ui/SectionDivider";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const iconFor: Record<string, typeof Code2> = {
  "fullstack-mvp": Code2,
  "ai-integration": Sparkles,
  realtime: Radio,
};

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <SectionDivider />
      <section
        id="services"
        ref={ref}
        className="relative py-24 sm:py-32 px-5 sm:px-10 lg:px-20 overflow-hidden"
        aria-labelledby="services-heading"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">
              Services
            </motion.p>

            <motion.div variants={item} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <h2
                id="services-heading"
                className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-foreground max-w-2xl"
              >
                What I can help with.
              </h2>
              <p className="max-w-md text-sm text-muted-strong">
                Three areas I take on most often. If your project sits in or near any of them, get in touch — I&apos;m happy to scope it with you.
              </p>
            </motion.div>

            <motion.div variants={container} className="grid md:grid-cols-3 gap-5">
              {services.map((s) => {
                const Icon = iconFor[s.id] ?? Code2;
                return (
                  <motion.div key={s.id} variants={item} className="h-full">
                    <SpotlightCard className="rounded-2xl h-full" spotlightColor="rgba(0, 212, 255, 0.08)">
                      <div className="h-full rounded-2xl border border-border bg-surface/60 p-6 flex flex-col">
                        <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent mb-5">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>

                        <h3 className="font-display font-bold text-xl tracking-tight text-foreground mb-1.5">
                          {s.title}
                        </h3>
                        <p className="font-mono text-xs text-accent mb-4">{s.tagline}</p>
                        <p className="text-sm text-muted-strong leading-relaxed mb-5">
                          {s.description}
                        </p>

                        <ul className="space-y-2 mb-6 mt-auto">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex gap-2.5 text-xs text-muted leading-relaxed">
                              <span className="mt-1.5 shrink-0 h-1 w-1 rounded-full bg-accent/60" aria-hidden />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Engagement model strip */}
            <motion.div
              variants={item}
              className="mt-10 grid sm:grid-cols-3 gap-3"
              aria-label="Engagement models"
            >
              {[
                {
                  icon: Briefcase,
                  label: "Fixed-scope project",
                  body: "Clear deliverable, milestone-based invoicing. Starting at $2.5k.",
                },
                {
                  icon: Calendar,
                  label: "Weekly retainer",
                  body: "20–25 hrs/week for evolving scope. 4-week minimum.",
                },
                {
                  icon: Clock,
                  label: "Advisory call",
                  body: "60-min architecture / code review. $150, applied to project if we work together.",
                },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className="rounded-xl border border-border bg-surface/40 p-4 flex items-start gap-3"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1">
                        {m.label}
                      </p>
                      <p className="text-xs text-muted-strong leading-relaxed">{m.body}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-hover hover:shadow-glow transition-all duration-300"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <p className="text-xs text-muted">Not sure if it&apos;s a fit? Ask anyway — I&apos;ll tell you straight.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
