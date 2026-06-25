"use client";

import { Moon, Sun } from "lucide-react";
import { useColorMode } from "@/hooks/useColorMode";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { mode, toggle, ready } = useColorMode();
  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-elevated text-muted-strong hover:border-border-strong hover:text-foreground transition-colors ${className}`.trim()}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      suppressHydrationWarning
    >
      <Sun
        className={`h-[1.05rem] w-[1.05rem] transition-all duration-200 ${
          ready && isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
        aria-hidden
      />
      <Moon
        className={`absolute h-[1.05rem] w-[1.05rem] transition-all duration-200 ${
          ready && isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
        aria-hidden
      />
    </button>
  );
}
