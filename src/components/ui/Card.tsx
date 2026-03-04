"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = true, ...props }, ref) => {
    const Comp = motion.div;
    return (
      <Comp
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-surface p-6 shadow-card transition-all duration-300",
          hover &&
            "hover:border-accent/30 hover:shadow-card-hover hover:-translate-y-1",
          className
        )}
        whileHover={hover ? { y: -4 } : undefined}
        {...(props as React.ComponentProps<typeof Comp>)}
      >
        {children}
      </Comp>
    );
  }
);

Card.displayName = "Card";

export { Card };
