"use client";

import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  useScroll, useTransform, LayoutGroup,
} from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project as ProjectType, ProjectCategory } from "@/data/projects";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { GlowingBorder } from "@/components/ui/GlowingBorder";
import { SectionDivider } from "@/components/ui/SectionDivider";

/* ── filter list ─────────────────────────────────────────────────── */
const filters: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all",       label: "All"        },
  { id: "ai",        label: "AI / ML"    },
  { id: "fullstack", label: "Full-Stack" },
  { id: "backend",   label: "Backend"    },
];

/* ── category meta ───────────────────────────────────────────────── */
const catMeta: Record<string, {
  label: string; cls: string; spotlight: string; stripe: string;
}> = {
  ai:        { label: "AI / ML",    cls: "text-violet-400 bg-violet-400/10 border-violet-400/30", spotlight: "rgba(167,139,250,0.10)", stripe: "via-violet-500" },
  fullstack: { label: "Full-Stack", cls: "text-cyan-400   bg-cyan-400/10   border-cyan-400/30",   spotlight: "rgba(34,211,238,0.10)",  stripe: "via-cyan-500"   },
  backend:   { label: "Backend",    cls: "text-amber-400  bg-amber-400/10  border-amber-400/30",  spotlight: "rgba(251,191,36,0.08)",  stripe: "via-amber-500"  },
  frontend:  { label: "Frontend",   cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30", spotlight: "rgba(52,211,153,0.08)", stripe: "via-emerald-500" },
};

/* ── motion variants ─────────────────────────────────────────────── */
const container = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

/* ── CategoryBadge ───────────────────────────────────────────────── */
function CategoryBadge({ category }: { category: string }) {
  const meta = catMeta[category] ?? { label: category, cls: "text-muted border-border" };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.65rem] font-mono tracking-wide ${meta.cls}`}>
      {meta.label}
    </span>
  );
}

/* ── FeaturedCard ────────────────────────────────────────────────── */
function FeaturedCard({ project }: { project: ProjectType }) {
  return (
    <motion.article variants={item} className="col-span-1 md:col-span-2 lg:col-span-3">
      <GlowingBorder borderRadius="1.5rem" speed="5s">
        {/* 3-panel grid on desktop: left | divider | right */}
        <div className="relative flex flex-col lg:grid lg:grid-cols-[1fr_1px_42%] overflow-hidden rounded-[calc(1.5rem-1px)]">

          {/* ── Atmosphere ── */}
          <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
            <div className="absolute -top-48 -left-48 w-[36rem] h-[36rem] rounded-full bg-accent/[0.10] blur-[100px]" />
            <div className="absolute -bottom-48 -right-48 w-[28rem] h-[28rem] rounded-full bg-accent-2/[0.08] blur-[100px]" />
            <div className="absolute inset-0 bg-grid opacity-[0.17]" />
          </div>

          {/* ── Giant watermark title ── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none" aria-hidden>
            <span className="font-display font-black text-[6rem] sm:text-[10rem] lg:text-[13rem] text-foreground/[0.022] leading-none whitespace-nowrap tracking-tightest">
              {project.title}
            </span>
          </div>

          {/* ── Left: Identity ── */}
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/30 px-3 py-1 text-xs font-mono font-medium text-accent"
              >
                <Sparkles className="h-3 w-3 fill-current" aria-hidden />
                Featured
              </motion.span>
              {project.year && (
                <span className="font-mono text-xs text-muted">{project.year}</span>
              )}
              <CategoryBadge category={project.category} />
            </div>

            <h3 className="font-display font-bold text-[2.5rem] xs:text-[3rem] sm:text-[3.75rem] lg:text-[5rem] tracking-[-0.04em] text-foreground leading-[0.88] mb-4">
              {project.title}
            </h3>
            <p className="font-mono text-sm text-accent mb-6">{project.tagline}</p>
            <p className="text-base sm:text-lg text-muted-strong leading-relaxed max-w-md text-pretty">
              {project.description}
            </p>
            {project.role && (
              <p className="mt-5 text-sm text-muted">
                <span className="text-muted/50">Role — </span>
                {project.role}
              </p>
            )}
          </div>

          {/* ── Vertical divider (desktop only) ── */}
          <div
            className="hidden lg:block"
            style={{ background: "linear-gradient(to bottom, transparent 5%, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.07) 75%, transparent 95%)" }}
            aria-hidden
          />

          {/* ── Right: Details ── */}
          <div className="p-8 sm:p-10 lg:py-12 lg:pr-12 flex flex-col justify-between border-t border-border/40 lg:border-t-0">
            {project.highlights.length > 0 && (
              <ul className="space-y-3 mb-8">
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.45, ease: [0.22,1,0.36,1] }}
                    className="flex gap-3 text-sm sm:text-base text-muted-strong"
                  >
                    <span className="mt-2 shrink-0 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    <span>{h}</span>
                  </motion.li>
                ))}
              </ul>
            )}

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="shimmer-hover rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-mono text-muted-strong">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-hover hover:shadow-glow transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                  >
                    Live demo
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden />
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-foreground hover:text-accent hover:border-accent/40 transition-all"
                  >
                    <Github className="h-4 w-4" aria-hidden />
                    Source
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </GlowingBorder>
    </motion.article>
  );
}

/* ── ProjectCard ─────────────────────────────────────────────────── */
function ProjectCard({ project, num }: { project: ProjectType; num: number }) {
  const meta = catMeta[project.category] ?? { spotlight: "rgba(0,212,255,0.06)", stripe: "via-border" };

  return (
    <motion.div variants={item} style={{ perspective: 700 }} className="h-full">
      <SpotlightCard className="rounded-2xl h-full" spotlightColor={meta.spotlight}>
        <div className="group rounded-2xl border border-border bg-surface/60 flex flex-col overflow-hidden h-full transition-all duration-300 hover:border-white/10 hover:-translate-y-1 hover:shadow-card-hover">

          {/* Category stripe */}
          <div
            className={`h-px w-full opacity-80 bg-gradient-to-r from-transparent ${meta.stripe} to-transparent`}
            aria-hidden
          />

          <div className="p-6 flex flex-col flex-1">
            {/* Badge + number */}
            <div className="flex items-center justify-between mb-4">
              <CategoryBadge category={project.category} />
              <span className="font-mono text-[0.6rem] text-muted/35 tabular-nums select-none">
                {String(num).padStart(2, "0")}
              </span>
            </div>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground tracking-tight leading-tight mb-1.5">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-accent mb-4">{project.tagline}</p>

            <p className="text-sm text-muted-strong leading-relaxed mb-5 flex-1 text-pretty">
              {project.description}
            </p>

            {project.highlights.length > 0 && (
              <ul className="mb-5 space-y-1.5">
                {project.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="flex gap-2 text-xs text-muted leading-relaxed">
                    <span className="mt-1.5 shrink-0 h-1 w-1 rounded-full bg-accent/60" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tags.slice(0, 5).map((tag) => (
                <span key={tag} className="shimmer-hover rounded-full border border-border bg-background/40 px-2.5 py-0.5 text-[0.67rem] font-mono text-muted-strong">
                  {tag}
                </span>
              ))}
              {project.tags.length > 5 && (
                <span className="rounded-full border border-border/50 px-2.5 py-0.5 text-[0.67rem] font-mono text-muted">
                  +{project.tags.length - 5}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
              {project.liveUrl && (
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  Live
                </Link>
              )}
              {project.githubUrl && (
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent transition-colors"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden />
                  Code
                </Link>
              )}
              {!project.liveUrl && !project.githubUrl && (
                <span className="text-xs font-mono text-muted/50 italic">Private</span>
              )}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

/* ── Projects section ────────────────────────────────────────────── */
export function Projects() {
  const ref   = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const filtered = useMemo(() => {
    const base = projects.filter((p) => p.featured);
    return filter === "all" ? base : base.filter((p) => p.category === filter);
  }, [filter]);

  const featured = filtered[0];
  const rest     = filtered.slice(1);

  return (
    <>
      <SectionDivider />
      <section
        id="projects"
        ref={ref}
        className="relative py-24 sm:py-36 px-4 sm:px-10 lg:px-20"
        aria-labelledby="projects-heading"
      >
        <motion.div style={{ y }} className="max-w-7xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>

            <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">
              03 — Selected work
            </motion.p>

            <motion.div variants={item} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <h2
                id="projects-heading"
                className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-foreground max-w-2xl"
              >
                Things I&apos;ve built that{" "}
                <span className="text-gradient-accent">shipped</span>.
              </h2>

              {/* Filter strip with spring pill */}
              <LayoutGroup>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {filters.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id)}
                      className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        filter === f.id
                          ? "text-background"
                          : "border border-border text-muted hover:text-foreground hover:border-border-strong"
                      }`}
                    >
                      {filter === f.id && (
                        <motion.span
                          layoutId="filter-pill"
                          className="absolute inset-0 rounded-full bg-accent shadow-glow-sm"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{f.label}</span>
                    </button>
                  ))}
                </div>
              </LayoutGroup>
            </motion.div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-24 font-mono text-muted"
                >
                  No projects in this category yet.
                </motion.p>
              ) : (
                <motion.div
                  key={filter}
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {featured && <FeaturedCard project={featured} />}
                  {rest.map((project, i) => (
                    <ProjectCard key={project.id} project={project} num={i + 2} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {filtered.length > 0 && (
              <motion.p variants={item} className="mt-8 text-center font-mono text-xs text-muted/50">
                {filtered.length} project{filtered.length !== 1 ? "s" : ""} shown
                {filter !== "all" && ` · ${filters.find((f) => f.id === filter)?.label}`}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
