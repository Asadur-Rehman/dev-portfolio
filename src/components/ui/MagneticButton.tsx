"use client";

import { type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Passthrough wrapper — magnetic pull effect removed for a cleaner feel. */
export function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  return <div className={className}>{children}</div>;
}
