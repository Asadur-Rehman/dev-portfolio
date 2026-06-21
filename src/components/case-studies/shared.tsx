"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export const fade = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const primaryBtn =
  "inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover transition-colors";

export const secondaryBtn =
  "inline-flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-6 py-3 text-sm font-semibold text-foreground hover:border-accent/40 hover:text-accent transition-colors";

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
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative px-5 sm:px-10 lg:px-20 py-16 sm:py-24 scroll-mt-24 ${
        tone === "alt" ? "bg-background-2 border-y border-border/60" : ""
      }`}
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-5xl mx-auto"
      >
        <motion.p variants={fade} className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">
          {number} — {label}
        </motion.p>
        <motion.div variants={fade}>{children}</motion.div>
      </motion.div>
    </section>
  );
}

export function StatStrip({ items }: { items: { v: string; k: string; icon: LucideIcon }[] }) {
  return (
    <section className="px-5 sm:px-10 lg:px-20 pb-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-xl border border-border bg-border">
          {items.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.k} className="bg-surface-elevated px-5 py-5 flex flex-col gap-2">
                <Icon className="h-4 w-4 text-accent" aria-hidden />
                <span className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-foreground">{s.v}</span>
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
    <motion.div variants={fade} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent-muted px-2.5 py-1 text-accent">
        Case study
      </span>
      <span>{year}</span>
      <span>·</span>
      <span>{duration}</span>
      <span className="hidden sm:inline">·</span>
      <span className="basis-full sm:basis-auto normal-case tracking-normal text-muted-strong">{role}</span>
    </motion.div>
  );
}

export function CaseStudyHero({
  title,
  highlight,
  description,
  meta,
  actions,
}: {
  title: string;
  highlight?: string;
  description: string;
  meta?: { year: string; duration: string; role: string };
  actions?: ReactNode;
}) {
  return (
    <section className="relative px-5 sm:px-10 lg:px-20 pb-12 sm:pb-16 border-b border-border/60">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto">
        <motion.div variants={fade}>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to work
          </Link>
        </motion.div>

        {meta && <MetaStrip year={meta.year} duration={meta.duration} role={meta.role} />}

        <motion.h1
          variants={fade}
          className="mt-6 font-display font-bold text-balance tracking-tight text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.05]"
        >
          {title}
          {highlight && (
            <>
              {" "}
              <span className="text-gradient-accent">{highlight}</span>
            </>
          )}
        </motion.h1>

        <motion.p variants={fade} className="mt-5 max-w-2xl text-base sm:text-lg text-muted-strong leading-relaxed text-pretty">
          {description}
        </motion.p>

        {actions && (
          <motion.div variants={fade} className="mt-8 flex flex-wrap items-center gap-3">
            {actions}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="px-5 sm:px-10 lg:px-20 py-16 sm:py-24 border-t border-border/60 bg-background-2">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Next</p>
        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground">
          Want to talk through how it&apos;s built?
        </h2>
        <p className="mt-4 text-base text-muted-strong leading-relaxed">
          Happy to walk through the code, the deployment, or any of these decisions in more depth.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/#contact" className={primaryBtn}>
            Get in touch
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/#projects" className={secondaryBtn}>
            <ArrowLeft className="h-4 w-4" />
            Back to all work
          </Link>
        </div>
      </div>
    </section>
  );
}

/** SVG diagram box tuned for the light theme */
export function DiagramBox({
  x, y, w, h, title, sub, tone = "default",
}: {
  x: number; y: number; w: number; h: number;
  title: string; sub: string;
  tone?: "default" | "accent" | "muted";
}) {
  const stroke =
    tone === "accent" ? "var(--accent)" :
    tone === "muted" ? "var(--border-strong)" :
    "var(--border)";
  const fill =
    tone === "accent" ? "var(--accent-muted)" :
    tone === "muted" ? "var(--surface)" :
    "var(--surface-elevated)";
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth="1" />
      <text x={x + 14} y={y + 26} fontFamily="var(--font-display)" fontWeight="700" fontSize="14" fill="var(--foreground)">{title}</text>
      <text x={x + 14} y={y + 46} fontFamily="var(--font-mono)" fontSize="10" fill="var(--muted)">{sub}</text>
    </g>
  );
}

export function DiagramLabel({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} fontFamily="var(--font-mono)" fontSize="9" fill="var(--muted)">{children}</text>
  );
}
