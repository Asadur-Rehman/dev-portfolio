import { type ClassValue, clsx } from "clsx";

/**
 * Merge class names with tailwind-merge for no conflicts.
 * Using clsx for conditional classes (add tailwind-merge if you install it).
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
