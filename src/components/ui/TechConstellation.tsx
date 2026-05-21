"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills, skillCategories } from "@/data/skills";
import type { SkillCategory } from "@/data/skills";

type CatColor = { hex: string; glow: string };

const colors: Record<SkillCategory, CatColor> = {
  languages: { hex: "#22d3ee", glow: "rgba(34,211,238,0.45)" },
  frontend:  { hex: "#a78bfa", glow: "rgba(167,139,250,0.45)" },
  backend:   { hex: "#fbbf24", glow: "rgba(251,191,36,0.45)" },
  database:  { hex: "#34d399", glow: "rgba(52,211,153,0.40)" },
  ai:        { hex: "#f472b6", glow: "rgba(244,114,182,0.45)" },
  tools:     { hex: "#fb923c", glow: "rgba(251,146,60,0.40)" },
};

const categoryAngle: Record<SkillCategory, number> = {
  languages: -Math.PI / 2,                  // top
  frontend:  -Math.PI / 2 + (Math.PI / 3),  // upper right
  backend:   -Math.PI / 2 + (2 * Math.PI / 3), // lower right
  database:   Math.PI / 2,                  // bottom
  ai:        Math.PI / 2 + (2 * Math.PI / 3), // lower left
  tools:     Math.PI / 2 + (Math.PI / 3),    // upper left  (the other way around)
};

// stable jitter per name so layout doesn't shift on rerender
function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 0xffffffff;
}

type Node = {
  key: string;
  name: string;
  category: SkillCategory;
  x: number; // 0..1 normalized
  y: number;
};

export function TechConstellation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 560 });
  const [hover, setHover] = useState<string | null>(null);

  // Mobile: phones can't hover. Show labels only for the tapped node.
  const isSmall = size.w < 640;

  // Measure container
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      const w = Math.max(280, r.width);
      // Phones get a much taller canvas so the 31 nodes have room without colliding.
      const h = w < 480 ? 640 : w < 640 ? 600 : w < 1024 ? 580 : 640;
      setSize({ w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Build node positions: each category forms a small cluster around its anchor
  const nodes: Node[] = useMemo(() => {
    const cx = 0.5;
    const cy = 0.5;
    const anchorR = 0.30; // distance from center to cluster anchor
    return skills.map((s) => {
      const angle = categoryAngle[s.category];
      const ax = cx + Math.cos(angle) * anchorR;
      const ay = cy + Math.sin(angle) * anchorR;
      const h1 = hash(s.name);
      const h2 = hash(s.name + "y");
      // small offset within cluster
      const off = 0.13;
      const ox = (h1 - 0.5) * off * 2;
      const oy = (h2 - 0.5) * off * 2;
      return { key: s.name, name: s.name, category: s.category, x: ax + ox, y: ay + oy };
    });
  }, []);

  // Quick lookup: neighbours (same category) for hover highlights
  const neighborMap = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const n of nodes) {
      if (!m.has(n.key)) m.set(n.key, new Set());
      for (const o of nodes) {
        if (o.key !== n.key && o.category === n.category) m.get(n.key)!.add(o.key);
      }
    }
    return m;
  }, [nodes]);

  // Edges within each category
  const edges = useMemo(() => {
    const out: { from: Node; to: Node }[] = [];
    const byCat: Record<string, Node[]> = {};
    for (const n of nodes) {
      (byCat[n.category] ||= []).push(n);
    }
    Object.values(byCat).forEach((list: Node[]) => {
      for (const a of list) {
        const dists = list
          .filter((b: Node) => b.key !== a.key)
          .map((b: Node) => ({ b, d: Math.hypot(a.x - b.x, a.y - b.y) }))
          .sort((x: { b: Node; d: number }, y: { b: Node; d: number }) => x.d - y.d)
          .slice(0, 2);
        for (const { b } of dists) {
          if (!out.find((e) => (e.from === b && e.to === a) || (e.from === a && e.to === b))) {
            out.push({ from: a, to: b });
          }
        }
      }
    });
    return out;
  }, [nodes]);

  const W = size.w;
  const H = size.h;

  const px = (n: Node) => n.x * W;
  const py = (n: Node) => n.y * H;

  const isMuted = (key: string) =>
    !!hover && key !== hover && !(neighborMap.get(hover)?.has(key));

  const isEdgeActive = (e: { from: Node; to: Node }) =>
    !hover || e.from.key === hover || e.to.key === hover;

  // For reduced motion
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden rounded-3xl border border-border bg-surface/40"
        style={{ height: H }}
        aria-label="Interactive constellation of skills"
        role="img"
      >
        {/* faint grid */}
        <svg width={W} height={H} className="absolute inset-0 pointer-events-none" aria-hidden>
          <defs>
            <pattern id="cgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <radialGradient id="cfade" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="black" stopOpacity="1" />
              <stop offset="100%" stopColor="black" stopOpacity="0" />
            </radialGradient>
            <mask id="cgridMask">
              <rect width={W} height={H} fill="url(#cfade)" />
            </mask>
          </defs>
          <rect width={W} height={H} fill="url(#cgrid)" mask="url(#cgridMask)" />
        </svg>

        {/* ambient cluster glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {skillCategories.map((c) => {
            const a = categoryAngle[c.id];
            const ax = (0.5 + Math.cos(a) * 0.30) * W;
            const ay = (0.5 + Math.sin(a) * 0.30) * H;
            return (
              <span
                key={c.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-60"
                style={{
                  left: ax,
                  top: ay,
                  width: 230,
                  height: 230,
                  background: `radial-gradient(circle, ${colors[c.id].glow} 0%, transparent 65%)`,
                }}
              />
            );
          })}
        </div>

        {/* edges */}
        <svg width={W} height={H} className="absolute inset-0 pointer-events-none" aria-hidden>
          {edges.map((e, i) => {
            const active = isEdgeActive(e);
            const color = colors[e.from.category].hex;
            return (
              <line
                key={i}
                x1={px(e.from)} y1={py(e.from)}
                x2={px(e.to)}   y2={py(e.to)}
                stroke={color}
                strokeOpacity={active ? 0.32 : 0.06}
                strokeWidth={active ? 1.2 : 0.6}
                style={{ transition: "stroke-opacity 200ms, stroke-width 200ms" }}
              />
            );
          })}
        </svg>

        {/* nodes */}
        {nodes.map((n) => {
          const c = colors[n.category];
          const muted = isMuted(n.key);
          const active = hover === n.key;
          // On small screens, only show a label when this node is the active one
          // (avoids the 31-label collision tangle on phones).
          const showLabel = isSmall ? active : true;
          return (
            <button
              key={n.key}
              type="button"
              onMouseEnter={() => setHover(n.key)}
              onFocus={() => setHover(n.key)}
              onMouseLeave={() => setHover((h) => (h === n.key ? null : h))}
              onBlur={() => setHover((h) => (h === n.key ? null : h))}
              onClick={() => setHover((h) => (h === n.key ? null : n.key))}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
              style={{ left: px(n), top: py(n) }}
              aria-label={n.name}
            >
              {/* tap target — larger than the visible dot so phones can hit it */}
              <span
                aria-hidden
                className="absolute -inset-3 sm:-inset-2 rounded-full"
              />
              {/* pulse halo on hover/active */}
              <span
                aria-hidden
                className="absolute inset-0 m-auto rounded-full"
                style={{
                  width: 32, height: 32,
                  boxShadow: active ? `0 0 0 8px ${c.glow}` : `0 0 0 0 ${c.glow}`,
                  transition: "box-shadow 280ms ease",
                }}
              />
              {/* dot */}
              <motion.span
                animate={!reduced ? { scale: [1, 1.12, 1] } : undefined}
                transition={!reduced ? { duration: 2.6 + hash(n.name) * 1.5, repeat: Infinity, ease: "easeInOut", delay: hash(n.name + "d") * 1.5 } : undefined}
                className="relative block rounded-full"
                style={{
                  width: active ? 11 : 7,
                  height: active ? 11 : 7,
                  background: c.hex,
                  boxShadow: active ? `0 0 14px ${c.glow}` : `0 0 6px ${c.glow}`,
                  opacity: muted ? 0.25 : 1,
                  transition: "width 180ms ease, height 180ms ease, opacity 180ms ease, box-shadow 220ms ease",
                }}
              />
              {/* label */}
              {showLabel && (
                <span
                  className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.6rem] tracking-wide"
                  style={{
                    color: active ? c.hex : "rgba(168,168,184,0.55)",
                    opacity: muted ? 0.25 : active ? 1 : 0.65,
                    transition: "color 180ms ease, opacity 180ms ease",
                  }}
                >
                  {n.name}
                </span>
              )}
            </button>
          );
        })}

        {/* category legend bottom-left — clickable on touch as well */}
        <div className="absolute left-2 right-2 sm:left-4 sm:right-auto bottom-2 sm:bottom-4 flex flex-wrap gap-1.5 sm:gap-2 max-w-full sm:max-w-[60%] justify-center sm:justify-start">
          {skillCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onMouseEnter={() => {
                const first = nodes.find((n) => n.category === c.id);
                if (first) setHover(first.key);
              }}
              onMouseLeave={() => setHover(null)}
              onClick={() => {
                const first = nodes.find((n) => n.category === c.id);
                if (first) setHover((h) => (h === first.key ? null : first.key));
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 backdrop-blur px-2.5 py-1 font-mono text-[0.6rem] tracking-wide text-muted-strong hover:text-foreground transition-colors"
            >
              <span className="block w-1.5 h-1.5 rounded-full" style={{ background: colors[c.id].hex }} />
              {c.label}
            </button>
          ))}
        </div>

        {/* hovered name read-out */}
        <AnimatePresence>
          {hover && (
            <motion.div
              key={hover}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute right-3 sm:right-4 top-3 sm:top-4 rounded-full border border-border bg-background/70 backdrop-blur px-3 py-1.5 font-mono text-[0.65rem] tracking-wider"
              style={{ color: colors[(nodes.find((n) => n.key === hover)?.category) || "languages"].hex }}
            >
              {hover}
            </motion.div>
          )}
        </AnimatePresence>

        {/* phone-only hint */}
        {isSmall && !hover && (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 backdrop-blur px-3 py-1.5 font-mono text-[0.6rem] tracking-wider text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden />
            tap a dot
          </div>
        )}
      </div>
    </div>
  );
}
