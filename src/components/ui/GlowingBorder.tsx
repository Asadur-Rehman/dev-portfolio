"use client";

import { type ReactNode } from "react";

interface GlowingBorderProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
  gradientColors?: string;
  speed?: string;
}

export function GlowingBorder({
  children,
  className = "",
  borderRadius = "1.5rem",
  gradientColors = "var(--accent), var(--accent-2), var(--accent-3), var(--accent)",
  speed = "4s",
}: GlowingBorderProps) {
  return (
    <div
      className={`relative group ${className}`}
      style={{ borderRadius }}
    >
      {/* Animated rotating gradient border */}
      <div
        className="absolute -inset-px rounded-[inherit] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from var(--border-angle, 0deg), ${gradientColors})`,
          animation: `rotate-border ${speed} linear infinite`,
          borderRadius,
        }}
        aria-hidden
      />

      {/* Glow layer */}
      <div
        className="absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-md"
        style={{
          background: `conic-gradient(from var(--border-angle, 0deg), ${gradientColors})`,
          animation: `rotate-border ${speed} linear infinite`,
          borderRadius,
        }}
        aria-hidden
      />

      {/* Content container */}
      <div
        className="relative bg-surface/90 backdrop-blur-sm"
        style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
      >
        {children}
      </div>
    </div>
  );
}
