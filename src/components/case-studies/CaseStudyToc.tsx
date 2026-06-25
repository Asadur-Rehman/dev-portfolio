"use client";

import { useCallback, useEffect, useState } from "react";

export type TocChapter = { id: string; num: string; label: string };

type Props = {
  chapters: TocChapter[];
  rootSelector?: string;
};

const HEADER_OFFSET = "4.25rem";

export function CaseStudyToc({ chapters, rootSelector = "main" }: Props) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(chapters[0]?.id ?? "");
  const [hovered, setHovered] = useState<string | null>(null);

  const onScroll = useCallback(() => {
    const root = (rootSelector ? document.querySelector(rootSelector) : null) as HTMLElement | null;
    const max = root
      ? root.scrollHeight - window.innerHeight
      : document.documentElement.scrollHeight - window.innerHeight;
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
        { rootMargin: "-35% 0px -55% 0px", threshold: 0.05 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [chapters]);

  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      {/* Reading progress — sits just below the fixed header */}
      <div
        className="fixed left-0 right-0 z-[45] h-0.5 pointer-events-none"
        style={{ top: HEADER_OFFSET }}
        aria-hidden
      >
        <span className="absolute inset-0 bg-border/50" />
        <span
          className="absolute left-0 top-0 h-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Chapter index — wide screens only (avoids overlapping content on lg tablets) */}
      <aside
        aria-label="Case study chapters"
        className="hidden xl:flex fixed top-1/2 -translate-y-1/2 right-6 2xl:right-10 z-40 flex-col items-end gap-3 select-none"
      >
        <div className="relative flex flex-col items-end gap-2.5 py-3 pl-3 pr-1">
          {chapters.map((c) => {
            const isActive = c.id === active;
            const isHover = hovered === c.id;
            const showLabel = isActive || isHover;

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
                <span
                  className={`font-mono text-[0.6rem] tracking-[0.25em] uppercase whitespace-nowrap transition-all duration-200 ${
                    showLabel ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
                  }`}
                >
                  <span className="text-muted/60">{c.num}</span>
                  <span className={`ml-2 ${isActive ? "text-accent" : "text-muted-strong"}`}>{c.label}</span>
                </span>

                <span className="relative grid place-items-center w-6 h-6 shrink-0">
                  <span
                    className={`block w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? "scale-100 bg-accent shadow-[0_0_0_4px_var(--accent-muted)]"
                        : "scale-[0.55] bg-border-strong"
                    }`}
                  />
                </span>
              </button>
            );
          })}

          <span aria-hidden className="absolute right-[10px] top-2 bottom-2 w-px bg-border/60 -z-10" />
          <span
            aria-hidden
            style={{ transform: `scaleY(${progress})`, transformOrigin: "top" }}
            className="absolute right-[10px] top-2 bottom-2 w-px bg-accent/70 -z-10 transition-transform duration-150"
          />
        </div>

        <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted/50 tabular-nums pr-2">
          {Math.round(progress * 100).toString().padStart(2, "0")}%
        </span>
      </aside>
    </>
  );
}
