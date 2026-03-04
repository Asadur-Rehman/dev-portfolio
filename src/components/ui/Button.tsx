"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 rounded-lg";
    const variants = {
      primary:
        "bg-accent text-background hover:bg-accent-hover hover:shadow-glow-sm active:scale-[0.98]",
      secondary:
        "bg-surface-elevated text-foreground hover:bg-border hover:shadow-card",
      ghost: "text-foreground hover:bg-surface-elevated hover:text-accent",
      outline:
        "border-2 border-accent text-accent hover:bg-accent-muted hover:shadow-glow-sm",
    };
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-12 px-8 text-lg",
    };

    const Comp = motion.button;
    return (
      <Comp
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...(props as React.ComponentProps<typeof Comp>)}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };
