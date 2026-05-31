"use client";

import { motion } from "framer-motion";

const companies = [
  { name: "Aurora Solutions", role: "Software Engineer · 2025 — present" },
  { name: "Egnitify", role: "Contract Engineer · 2024 — 2025" },
  { name: "Eon Intelligence", role: "MERN Developer · 2024" },
  { name: "NUST SEECS", role: "BS Software Engineering · '25" },
];

export function TrustStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 sm:mt-12"
      aria-label="Recent work history"
    >
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-muted mb-4">
        Recent work &amp; education
      </p>
      <ul
        role="list"
        className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
      >
        {companies.map((c, i) => (
          <li key={c.name} className="flex items-center gap-6">
            {i > 0 && (
              <span
                className="hidden sm:inline-block h-1 w-1 rounded-full bg-border-strong"
                aria-hidden
              />
            )}
            <span className="flex flex-col">
              <span className="font-display font-semibold text-foreground/95 leading-tight">
                {c.name}
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted leading-tight mt-1">
                {c.role}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
