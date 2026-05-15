"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className = "" }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={`relative flex items-center justify-center py-2 ${className}`}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md h-px origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--border-strong) 15%, var(--accent) 50%, var(--border-strong) 85%, transparent)",
        }}
      />
      {/* Center glow dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="absolute h-1.5 w-1.5 rounded-full bg-accent shadow-glow-sm"
        aria-hidden
      />
    </div>
  );
}
