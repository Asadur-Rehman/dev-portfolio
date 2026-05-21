"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Chapter = { id: string; num: string; label: string };

const chapters: Chapter[] = [
  { id: "about",      num: "01", label: "About"      },
  { id: "tech",       num: "02", label: "Stack"      },
  { id: "projects",   num: "03", label: "Work"       },
  { id: "experience", num: "04", label: "Experience" },
  { id: "contact",    num: "05", label: "Contact"    },
];

/**
 * ChapterIndicator — left-side editorial marker. Renders the active
 * section's "01 — About" stack vertically, large, with a hairline rule.
 * Hidden inside the hero, fades in once you scroll past it. Complements
 * (does not duplicate) the right-side ScrollRail which is for jumping;
 * this is purely for orientation.
 */
export function ChapterIndicator() {
  const [active, setActive] = useState<Chapter | null>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(c);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    const onScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      // Hide while still mostly inside the hero (chapter marker shouldn't fight with the Hero composition).
      setHidden(r.bottom > window.innerHeight * 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <aside
      aria-hidden
      className="hidden lg:flex fixed top-1/2 -translate-y-1/2 left-4 xl:left-6 z-30 pointer-events-none select-none"
    >
      <AnimatePresence mode="wait">
        {!hidden && active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-3"
          >
            {/* hairline rule */}
            <span className="block w-8 h-px bg-gradient-to-r from-accent to-transparent" />

            {/* big section number, vertical-stacked label */}
            <div className="flex items-center gap-4">
              <span className="font-display font-black text-5xl xl:text-6xl leading-none tracking-tightest text-accent/80">
                {active.num}
              </span>
              <span
                className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-muted-strong"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {active.label}
              </span>
            </div>

            {/* secondary thin rule */}
            <span className="block w-4 h-px bg-border-strong" />
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
