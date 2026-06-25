"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** Match homepage horizontal rhythm */
export const caseStudySection = "px-5 sm:px-8 lg:px-12";
export const caseStudyInner = "max-w-6xl mx-auto w-full min-w-0";

export const fade = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.03 } },
};

export const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 sm:px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover transition-colors";

export const secondaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface-elevated px-5 sm:px-6 py-3 text-sm font-semibold text-foreground hover:border-accent/40 hover:text-accent transition-colors";

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
      className={`relative ${caseStudySection} py-16 sm:py-20 section-anchor ${
        tone === "alt" ? "bg-background-2 border-y border-border/60" : ""
      }`}
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className={caseStudyInner}
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
    <section className={`${caseStudySection} pb-12 sm:pb-14`}>
      <div className={caseStudyInner}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-xl border border-border bg-border">
          {items.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.k} className="bg-surface-elevated px-4 sm:px-5 py-5 flex flex-col gap-2 min-h-[7.5rem]">
                <Icon className="h-4 w-4 text-accent shrink-0" aria-hidden />
                <span className="font-display font-bold text-xl sm:text-2xl lg:text-3xl tracking-tight text-foreground leading-none">
                  {s.v}
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted leading-snug">
                  {s.k}
                </span>
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
    <motion.div
      variants={fade}
      className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted"
    >
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent-muted px-2.5 py-1 text-accent">
        Case study
      </span>
      <span>{year}</span>
      <span aria-hidden>·</span>
      <span>{duration}</span>
      <span className="hidden sm:inline" aria-hidden>·</span>
      <span className="w-full sm:w-auto normal-case tracking-normal text-muted-strong text-sm">
        {role}
      </span>
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
    <section className={`relative ${caseStudySection} pb-12 sm:pb-16 border-b border-border/70 overflow-hidden`}>
      <div className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-50 pointer-events-none" aria-hidden />
      <motion.div variants={container} initial="hidden" animate="show" className={caseStudyInner}>
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

        <motion.p
          variants={fade}
          className="mt-5 max-w-2xl text-base sm:text-lg text-muted-strong leading-relaxed text-pretty"
        >
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

export function StackPills({ items }: { items: string[] }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      {items.map((s) => (
        <span
          key={s}
          className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-mono text-muted-strong"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-xl border border-border bg-surface-elevated p-5 shadow-sm h-full flex flex-col">
      <span className="inline-grid h-9 w-9 place-items-center rounded-lg border border-accent/20 bg-accent-muted text-accent mb-3 shrink-0">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <h3 className="font-display font-semibold text-lg text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-strong leading-relaxed flex-1">{body}</p>
    </article>
  );
}

export function FeatureGrid({ items }: { items: { icon: LucideIcon; title: string; body: string }[] }) {
  return (
    <div className="mt-8 grid sm:grid-cols-2 gap-4">
      {items.map((f) => (
        <FeatureCard key={f.title} {...f} />
      ))}
    </div>
  );
}

export function DecisionGrid({
  items,
}: {
  items: { title: string; body: string; tone: "accent" | "muted" }[];
}) {
  return (
    <div className="mt-8 grid md:grid-cols-2 gap-4">
      {items.map((d) => (
        <div
          key={d.title}
          className={`rounded-xl border p-5 h-full ${
            d.tone === "accent"
              ? "border-accent/20 bg-accent-muted"
              : "border-border bg-surface-elevated"
          }`}
        >
          <h3
            className={`font-display font-semibold text-lg ${
              d.tone === "accent" ? "text-accent" : "text-foreground"
            }`}
          >
            {d.title}
          </h3>
          <p className="mt-2 text-sm text-muted-strong leading-relaxed">{d.body}</p>
        </div>
      ))}
    </div>
  );
}

export function ChallengeList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="mt-8 space-y-5">
      {items.map((c, i) => (
        <li key={c.title} className="flex gap-4 items-start">
          <span className="shrink-0 w-9 h-9 grid place-items-center rounded-full border border-accent/20 bg-accent-muted text-accent font-mono text-xs">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 pt-0.5">
            <h3 className="font-display font-semibold text-lg text-foreground">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-strong leading-relaxed">{c.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground max-w-3xl text-balance">
      {children}
    </h2>
  );
}

export function DiagramFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 rounded-xl border border-border bg-surface-elevated overflow-hidden">
      <div className="p-4 sm:p-6 lg:p-8 overflow-x-auto -webkit-overflow-scrolling-touch">
        <div className="min-w-[min(100%,36rem)]">{children}</div>
      </div>
    </div>
  );
}

export function ClosingCta({
  siblings,
}: {
  siblings?: {
    prev?: { href: string; label: string };
    next?: { href: string; label: string };
  };
}) {
  return (
    <section className={`${caseStudySection} py-16 sm:py-20 border-t border-border/60 bg-background-2`}>
      <div className={`${caseStudyInner} max-w-3xl text-center`}>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Next</p>
        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground text-balance">
          Want to talk through how it&apos;s built?
        </h2>
        <p className="mt-4 text-base text-muted-strong leading-relaxed text-pretty">
          Happy to walk through the code, the deployment, or any of these decisions in more depth.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/#contact" className={primaryBtn}>
            Get in touch
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/#projects" className={secondaryBtn}>
            <ArrowLeft className="h-4 w-4" />
            All work
          </Link>
        </div>

        {siblings && (siblings.prev || siblings.next) && (
          <div className="mt-10 pt-8 border-t border-border/60 grid sm:grid-cols-2 gap-3 text-left">
            {siblings.prev ? (
              <Link
                href={siblings.prev.href}
                className="group rounded-xl border border-border bg-surface-elevated p-4 hover:border-accent/30 transition-colors"
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Previous</span>
                <span className="mt-1 flex items-center gap-2 font-display font-semibold text-foreground group-hover:text-accent transition-colors">
                  <ArrowLeft className="h-4 w-4 shrink-0" />
                  {siblings.prev.label}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {siblings.next && (
              <Link
                href={siblings.next.href}
                className="group rounded-xl border border-border bg-surface-elevated p-4 hover:border-accent/30 transition-colors sm:text-right"
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Next case study</span>
                <span className="mt-1 flex items-center gap-2 font-display font-semibold text-foreground group-hover:text-accent transition-colors sm:justify-end">
                  {siblings.next.label}
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/** SVG diagram primitives — theme-aware via CSS variables */
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
