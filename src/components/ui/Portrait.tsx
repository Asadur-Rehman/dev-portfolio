"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  /** initials shown when no image asset is available */
  initials?: string;
  /** caption beneath the portrait */
  caption?: string;
  /** path under /public to a portrait image (jpg/png/webp). If present, replaces the monogram. */
  src?: string;
};

/**
 * Portrait — renders /public/<src> if it loads, otherwise an animated SVG
 * monogram. The monogram is intentionally graphical so the section never
 * feels empty even without an image asset.
 */
export function Portrait({ initials = "AR", caption = "Asad ur Rehman", src = "/portrait.jpg" }: Props) {
  const [imgState, setImgState] = useState<"checking" | "ok" | "missing">("checking");

  useEffect(() => {
    // Probe the asset rather than rendering a broken <img> shell.
    const img = new Image();
    img.onload = () => setImgState("ok");
    img.onerror = () => setImgState("missing");
    img.src = src;
  }, [src]);

  return (
    <figure className="relative">
      {/* Frame */}
      <div className="relative aspect-[4/5] w-full max-w-[22rem] mx-auto overflow-hidden rounded-3xl border border-border bg-surface/40">
        {/* Ambient gradient backdrop — always present, sits behind everything */}
        <div className="absolute inset-0 -z-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent-2/15" />
          <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute -bottom-16 -right-12 w-64 h-64 rounded-full bg-accent-2/20 blur-3xl" />
          <div className="absolute inset-0 bg-grid opacity-20" />
        </div>

        {imgState === "ok" ? (
          // Real image, with a subtle ken-burns float
          <motion.img
            src={src}
            alt={caption}
            className="relative z-10 h-full w-full object-cover"
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <MonogramArt initials={initials} />
        )}

        {/* Soft inner border */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.04]" aria-hidden />

        {/* Sticker / metadata overlay */}
        <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-background/70 backdrop-blur px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            On
          </span>
        </div>

        <div className="absolute right-3 top-3 z-20">
          <span className="inline-flex items-center rounded-full border border-border bg-background/70 backdrop-blur px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted-strong">
            v.{new Date().getFullYear().toString().slice(2)}
          </span>
        </div>

        {/* Caption strip at bottom */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-3 sm:p-4 bg-gradient-to-t from-background/85 via-background/40 to-transparent">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-display font-bold text-base sm:text-lg tracking-tight text-foreground">{caption}</p>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
                {imgState === "ok" ? "Portrait" : "Monogram · drop /public/portrait.jpg to replace"}
              </p>
            </div>
            <span className="font-mono text-[0.6rem] tabular-nums text-muted/70">
              33.6844°N · 73.0479°E
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
}

/* ── MonogramArt — animated SVG initials in a generative frame ─── */
function MonogramArt({ initials }: { initials: string }) {
  return (
    <div className="relative z-10 h-full w-full">
      <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" aria-hidden>
        {/* concentric circular guides */}
        <defs>
          <radialGradient id="por-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="var(--accent-2)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="por-text" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--foreground)" />
            <stop offset="60%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
          <pattern id="por-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill="rgba(255,255,255,0.06)" />
          </pattern>
        </defs>

        {/* dotted backdrop, masked behind glow */}
        <rect width="400" height="500" fill="url(#por-dots)" />
        <ellipse cx="200" cy="200" rx="220" ry="200" fill="url(#por-glow)" />

        {/* orbit rings */}
        <g stroke="var(--accent)" strokeOpacity="0.18" fill="none">
          <motion.circle
            cx="200" cy="225" r="150"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            strokeWidth="0.6"
          />
          <motion.circle
            cx="200" cy="225" r="120"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            strokeWidth="0.6"
            strokeDasharray="2 4"
          />
          <motion.circle
            cx="200" cy="225" r="90"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            strokeWidth="0.6"
          />
        </g>

        {/* satellite dot orbits */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 225px" }}
        >
          <circle cx="350" cy="225" r="2.5" fill="var(--accent)" />
        </motion.g>
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 225px" }}
        >
          <circle cx="80" cy="225" r="2" fill="var(--accent-2)" />
        </motion.g>

        {/* big initials */}
        <motion.text
          x="200"
          y="265"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-display)"
          fontWeight="800"
          fontSize="180"
          letterSpacing="-6"
          fill="url(#por-text)"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {initials}
        </motion.text>

        {/* small metadata lines */}
        <text x="40" y="40" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.35)" letterSpacing="2">
          0x{Math.floor(Math.random() * 0xfffff).toString(16).padStart(5, "0")}
        </text>
        <text x="360" y="40" textAnchor="end" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.35)" letterSpacing="2">
          NUST · SEECS
        </text>
        <text x="40" y="450" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.35)" letterSpacing="2">
          ISLAMABAD · PK
        </text>
        <text x="360" y="450" textAnchor="end" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.35)" letterSpacing="2">
          AVAILABLE
        </text>
      </svg>
    </div>
  );
}
