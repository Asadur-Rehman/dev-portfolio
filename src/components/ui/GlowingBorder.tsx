"use client";

import { type ReactNode } from "react";

interface GlowingBorderProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
  gradientColors?: string;
  speed?: string;
}

/** Static bordered container — rotating gradient removed. */
export function GlowingBorder({
  children,
  className = "",
  borderRadius = "1.5rem",
}: GlowingBorderProps) {
  return (
    <div
      className={`relative border border-border bg-surface-elevated shadow-card ${className}`}
      style={{ borderRadius }}
    >
      {children}
    </div>
  );
}
