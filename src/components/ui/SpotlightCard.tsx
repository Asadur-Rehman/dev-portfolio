"use client";

import { type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

/** Simple card wrapper — no 3D tilt or mouse-tracking spotlight. */
export function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  return <div className={`relative ${className}`}>{children}</div>;
}
