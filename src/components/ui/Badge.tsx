import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "muted";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  const variants = {
    default:
      "bg-surface-elevated text-foreground border border-border",
    accent: "bg-accent-muted text-accent border border-accent/30",
    muted: "bg-surface text-muted border border-border",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium font-mono",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
