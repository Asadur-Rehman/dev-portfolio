"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, MapPin } from "lucide-react";
import { experience } from "@/data/experience";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-20 border-t border-border/60 bg-background-2/40" aria-labelledby="experience-heading">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
          <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">04 — Experience</motion.p>
          <motion.h2 id="experience-heading" variants={item} className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl tracking-tighter text-foreground max-w-3xl">
            A track record of <span className="text-gradient-accent">production work</span>.
          </motion.h2>
          <motion.div variants={container} className="mt-16 relative">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-border-strong to-transparent hidden md:block" aria-hidden />
            <div className="space-y-10">
              {experience.map((entry, idx) => (
                <motion.article key={entry.id} variants={item} className="relative md:pl-14">
                  <span className="hidden md:grid absolute left-0 top-3 h-7 w-7 place-items-center rounded-full bg-background border border-accent/40 ring-4 ring-background" aria-hidden>
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <div className="group rounded-2xl border border-border bg-surface/60 p-6 sm:p-7 hover:border-accent/40 transition-all">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className="h-4 w-4 text-accent" aria-hidden />
                          <p className="font-display font-semibold text-foreground text-base">{entry.company}</p>
                          {idx === 0 && (
                            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[0.65rem] font-mono uppercase tracking-wider text-emerald-400">Current</span>
                          )}
                        </div>
                        <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-foreground">{entry.role}</h3>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-xs sm:text-sm text-accent">{entry.duration}</p>
                        {entry.location && (
                          <p className="mt-1 text-xs text-muted inline-flex items-center gap-1"><MapPin className="h-3 w-3" aria-hidden />{entry.location}</p>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-2.5 mb-5">
                      {entry.achievements.map((a) => (
                        <li key={a} className="text-sm sm:text-base text-muted-strong flex gap-3 leading-relaxed">
                          <span className="text-accent mt-2 shrink-0">▸</span><span>{a}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {entry.tech.map((t) => (
                        <span key={t} className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-mono text-muted-strong">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
