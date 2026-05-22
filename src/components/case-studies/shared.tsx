"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export function Chapter({
  id,
  number,
  label,
  tone = "default",
  children,
}: {
  id: string;
  number: string;
  label: string;
  tone?: "default" | "alt";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative px-5 sm:px-10 lg:px-20 py-20 sm:py-28 scroll-mt-24 ${
        tone === "alt" ? "bg-background-2/40 border-y border-border/60" : ""
      }`}
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto"
      >
        <motion.p variants={fade} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">
          {number} — {label}
        </motion.p>
        <motion.div variants={fade}>{children}</motion.div>
      </motion.div>
    </section>
  );
}

export function StatStrip({ items }: { items: { v: string; k: string; icon: LucideIcon }[] }) {
  return (
    <section className="px-5 sm:px-10 lg:px-20 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border/60">
          {items.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.k} className="bg-surface/40 px-5 py-6 flex flex-col gap-2 hover:bg-surface/70 transition-colors">
                <Icon className="h-4 w-4 text-accent" aria-hidden />
                <span className="font-display font-bold text-2xl sm:text-3xl tracking-tighter text-foreground">{s.v}</span>
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">{s.k}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function MetaStrip({ year, duration, role }: { year: string; duration: string; role: string }) {
  return (
    <motion.div variants={fade} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent">
        Case study
      </span>
      <span>{year}</span>
      <span>·</span>
      <span>{duration}</span>
      <span className="hidden sm:inline">·</span>
      <span className="basis-full sm:basis-auto">{role}</span>
    </motion.div>
  );
}
