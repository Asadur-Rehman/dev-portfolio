"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

export type TocChapter = { id: string; num: string; label: string };

type Props = {
  chapters: TocChapter[];
  /** Element whose scroll height determines the reading progress bar. Defaults to <main>. */
  rootSelector?: string;
};

/**
 * CaseStudyToc — a vertical chapter index on the right (lg+) with an
 * active highlight and a thin top-of-page reading-progress bar. The
 * top bar is always visible (mobile included); the side list is desktop
 * only and avoids the right-side ScrollRail (which is hidden on case
 * study pages).
 */
export function CaseStudyToc({ chapters, rootSelector = "main" }: Props) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(chapters[0]?.id ?? "");
  const [hovered, setHovered] = useState<string | null>(null);

  const onScroll = useCallback(() => {
    const root = (rootSelector ? document.querySelector(rootSelector) : null) as HTMLElement | null;
    const max = root ? root.scrollHeight - window.innerHeight : (document.documentElement.scrollHeight - window.innerHeight);
    const y = window.scrollY;
    setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
  }, [rootSelector]);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(c.id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [chapters]);

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      {/* Top reading-progress bar — always visible */}
      <div
        className="fixed top-0 inset-x-0 h-px z-[60] pointer-events-none"
        aria-hidden
      >
        <span className="absolute inset-0 bg-border/40" />
        <span
          className="absolute left-0 top-0 h-px bg-gradient-to-r from-accent via-accent-2 to-accent transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Side TOC — desktop only */}
      <aside
        aria-label="Case study chapters"
        className="hidden lg:flex fixed top-1/2 -translate-y-1/2 right-4 xl:right-6 z-40 flex-col items-end gap-3 select-none"
      >
        <div className="relative flex flex-col items-end gap-2.5 py-3 pl-3 pr-1">
          {chapters.map((c) => {
            const isActive = c.id === active;
            const isHover = hovered === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => jump(c.id)}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered(null)}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex items-center gap-3"
              >
                <motion.span
                  animate={{
                    opacity: isActive || isHover ? 1 : 0,
                    x: isActive || isHover ? 0 : 8,
                  }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="font-mono text-[0.6rem] tracking-[0.25em] uppercase pointer-events-none whitespace-nowrap"
                >
                  <span className="text-muted/60">{c.num}</span>
                  <span className={`ml-2 ${isActive ? "text-accent" : "text-muted-strong"}`}>{c.label}</span>
                </motion.span>

                <span className="relative grid place-items-center w-6 h-6">
                  <motion.span
                    animate={{
                      scale: isActive ? 1 : 0.55,
                      backgroundColor: isActive ? "var(--accent)" : "rgba(168,168,184,0.55)",
                      boxShadow: isActive ? "0 0 0 4px rgba(255, 106, 61, 0.15)" : "0 0 0 0 rgba(0,0,0,0)",
                    }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="block w-1.5 h-1.5 rounded-full"
                  />
                </span>
              </button>
            );
          })}

          {/* track */}
          <span aria-hidden className="absolute right-[10px] top-2 bottom-2 w-px bg-border/60 -z-10" />
          <span
            aria-hidden
            style={{ transform: `scaleY(${progress})`, transformOrigin: "top" }}
            className="absolute right-[10px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent/60 to-accent-2 -z-10 transition-transform duration-150"
          />
        </div>

        <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted/40 tabular-nums pr-2">
          {Math.round(progress * 100).toString().padStart(2, "0")}%
        </span>
      </aside>
    </>
  );
}
