"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project as ProjectType, ProjectCategory } from "@/data/projects";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const filters: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "backend", label: "Backend" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function ProjectCard({ project }: { project: ProjectType }) {
  return (
    <motion.div variants={item}>
      <Card className="p-0 overflow-hidden group h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            {project.title}
          </h3>
          <p className="text-muted text-sm mb-4 line-clamp-2 flex-1">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="muted">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                Live Demo
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                <Github className="h-4 w-4" aria-hidden />
                GitHub
              </Link>
            )}
            {project.caseStudyUrl && (
              <Link
                href={project.caseStudyUrl}
                className="inline-flex items-center text-sm font-medium text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                Case Study
              </Link>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const filtered =
    filter === "all"
      ? projects.filter((p) => p.featured)
      : projects.filter((p) => p.featured && p.category === filter);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 px-6 sm:px-12 lg:px-24"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12"
        >
          <h2
            id="projects-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-foreground"
          >
            Projects
          </h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  filter === f.id
                    ? "bg-accent text-background"
                    : "bg-surface-elevated text-muted hover:text-foreground hover:bg-border"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
        {filtered.length === 0 && (
          <p className="text-muted text-center py-12">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
