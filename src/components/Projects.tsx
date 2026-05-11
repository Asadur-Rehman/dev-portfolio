"use client";

import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star, ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project as ProjectType, ProjectCategory } from "@/data/projects";

const filters: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI / ML" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "backend", label: "Backend" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function FeaturedCard({ project }: { project: ProjectType }) {
  return (
    <motion.article variants={item} className="group relative col-span-1 md:col-span-2 row-span-2 rounded-3xl border border-border bg-surface/60 p-7 sm:p-9 overflow-hidden hover:border-accent/40 transition-all duration-500">
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-accent/[0.10] blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[24rem] h-[24rem] rounded-full bg-accent-2/[0.10] blur-3xl" />
      </div>
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/30 px-3 py-1 text-xs font-mono font-medium text-accent">
          <Star className="h-3 w-3 fill-current" aria-hidden />Featured
        </span>
        {project.year && <span className="font-mono text-xs text-muted">{project.year}</span>}
      </div>
      <h3 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground mb-2">{project.title}</h3>
      <p className="font-mono text-sm text-accent mb-5">{project.tagline}</p>
      <p className="text-base text-muted-strong leading-relaxed max-w-2xl">{project.description}</p>
      {project.role && (
        <p className="mt-4 text-sm text-muted-strong"><span className="text-muted">Role: </span>{project.role}</p>
      )}
      {project.highlights.length > 0 && (
        <ul className="mt-6 grid sm:grid-cols-2 gap-2.5 max-w-3xl">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm text-muted-strong">
              <Sparkles className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-7 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-mono text-muted-strong">{tag}</span>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {project.liveUrl && (
          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group/btn inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background hover:bg-accent-hover transition-colors">
            Live demo
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden />
          </Link>
        )}
        {project.githubUrl && (
          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full glass px-5 py-2.5 text-sm font-semibold text-foreground hover:text-accent hover:border-accent/40 transition-colors">
            <Github className="h-4 w-4" aria-hidden />Source
          </Link>
        )}
      </div>
    </motion.article>
  );
}

function ProjectCard({ project }: { project: ProjectType }) {
  return (
    <motion.article variants={item} className="group relative rounded-2xl border border-border bg-surface/60 p-6 hover:border-accent/40 hover:bg-surface transition-all duration-300 flex flex-col">
      <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent/[0.06] blur-3xl" />
      </div>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-display font-semibold text-xl text-foreground tracking-tight">{project.title}</h3>
          <p className="font-mono text-xs text-accent mt-1">{project.tagline}</p>
        </div>
        <span className="text-xs font-mono text-muted shrink-0">
          {project.category === "ai" ? "AI" : project.category === "fullstack" ? "Full-Stack" : project.category}
        </span>
      </div>
      <p className="text-sm text-muted-strong leading-relaxed mb-4 flex-1">{project.description}</p>
      {project.highlights.length > 0 && (
        <ul className="mb-5 space-y-1.5">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2 text-xs text-muted">
              <span className="text-accent mt-1.5 shrink-0">▸</span><span>{h}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.slice(0, 5).map((tag) => (
          <span key={tag} className="rounded-full border border-border bg-background/40 px-2.5 py-0.5 text-[0.7rem] font-mono text-muted-strong">{tag}</span>
        ))}
        {project.tags.length > 5 && <span className="text-[0.7rem] font-mono text-muted px-1 py-0.5">+{project.tags.length - 5}</span>}
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/60">
        {project.liveUrl && (
          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />Live
          </Link>
        )}
        {project.githubUrl && (
          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent transition-colors">
            <Github className="h-3.5 w-3.5" aria-hidden />Code
          </Link>
        )}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const filtered = useMemo(() => {
    const base = projects.filter((p) => p.featured);
    return filter === "all" ? base : base.filter((p) => p.category === filter);
  }, [filter]);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section id="projects" ref={ref} className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-20" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
          <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">03 — Selected work</motion.p>
          <motion.div variants={item} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <h2 id="projects-heading" className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl tracking-tighter text-foreground max-w-2xl">
              Things I&apos;ve built that <span className="text-gradient-accent">shipped</span>.
            </h2>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button key={f.id} onClick={() => setFilter(f.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    filter === f.id ? "bg-accent text-background shadow-glow-sm" : "border border-border text-muted hover:text-foreground hover:border-border-strong"
                  }`}
                >{f.label}</button>
              ))}
            </div>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div key={filter} variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
              {featured && <FeaturedCard project={featured} />}
              {rest.map((project) => <ProjectCard key={project.id} project={project} />)}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && <p className="text-muted text-center py-12">No projects in this category yet.</p>}
        </motion.div>
      </div>
    </section>
  );
}
