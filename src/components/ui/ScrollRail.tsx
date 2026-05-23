"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Section = { id: string; label: string; num: string };

const sections: Section[] = [
  { id: "hero",       label: "Home",       num: "00" },
  { id: "about",      label: "About",      num: "01" },
  { id: "tech",       label: "Stack",      num: "02" },
  { id: "projects",   label: "Work",       num: "03" },
  { id: "services",   label: "Services",   num: "04" },
  { id: "experience", label: "Experience", num: "05" },
  { id: "contact",    label: "Contact",    num: "06" },
];

export function ScrollRail() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);

  const onScroll = useCallback(() => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(s.id); },
        { rootMargin: "-35% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Letter shortcuts: g h / g a / g t / g w / g s / g e / g c
    const keymap: Record<string, string> = { h: "hero", a: "about", t: "tech", w: "projects", s: "services", e: "experience", c: "contact" };
    let waiting = false;
    let waitTimer: ReturnType<typeof setTimeout> | null = null;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const inField = tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement | null)?.isContentEditable;
      if (inField || e.metaKey || e.ctrlKey || e.altKey) return;

      if (waiting) {
        const id = keymap[e.key.toLowerCase()];
        if (id) {
          e.preventDefault();
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        waiting = false;
        if (waitTimer) clearTimeout(waitTimer);
        return;
      }
      if (e.key.toLowerCase() === "g") {
        waiting = true;
        waitTimer = setTimeout(() => { waiting = false; }, 900);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("keydown", onKey);
      if (waitTimer) clearTimeout(waitTimer);
    };
  }, []);

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <aside
      aria-label="Section navigation"
      className="hidden lg:flex fixed top-1/2 -translate-y-1/2 right-4 xl:right-6 z-40 flex-col items-end gap-3 select-none"
    >
      {/* the rail */}
      <div className="relative flex flex-col items-end gap-3 py-3 pl-3 pr-1">
        {sections.map((s) => {
          const isActive = s.id === active;
          const isHover = hovered === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => jump(s.id)}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`Jump to ${s.label}`}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex items-center gap-3"
            >
              {/* label, slides out on hover/active */}
              <motion.span
                animate={{
                  opacity: isActive || isHover ? 1 : 0,
                  x: isActive || isHover ? 0 : 8,
                }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-[0.65rem] tracking-[0.25em] uppercase pointer-events-none"
              >
                <span className="text-muted/60">{s.num}</span>
                <span className={`ml-2 ${isActive ? "text-accent" : "text-muted-strong"}`}>{s.label}</span>
              </motion.span>

              {/* dot */}
              <span className="relative grid place-items-center w-6 h-6">
                <motion.span
                  animate={{
                    scale: isActive ? 1 : 0.55,
                    backgroundColor: isActive ? "var(--accent)" : "rgba(168,168,184,0.55)",
                    boxShadow: isActive ? "0 0 0 4px rgba(0,212,255,0.12)" : "0 0 0 0 rgba(0,0,0,0)",
                  }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="block w-1.5 h-1.5 rounded-full"
                />
              </span>
            </button>
          );
        })}

        {/* vertical progress track */}
        <span
          aria-hidden
          className="absolute right-[10px] top-2 bottom-2 w-px bg-border/60 -z-10"
        />
        <span
          aria-hidden
          style={{ transform: `scaleY(${progress})`, transformOrigin: "top" }}
          className="absolute right-[10px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent/60 to-accent-2 -z-10 transition-transform duration-200"
        />
      </div>

      {/* progress percent */}
      <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted/40 tabular-nums pr-2">
        {Math.round(progress * 100).toString().padStart(2, "0")}%
      </span>
    </aside>
  );
}
