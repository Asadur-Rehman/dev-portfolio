"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, X } from "lucide-react";

type Row = { keys: string[]; label: string };

const rows: Row[] = [
  { keys: ["⌘", "K"], label: "Open command palette" },
  { keys: ["Ctrl", "K"], label: "Open command palette (Win/Linux)" },
  { keys: ["/"], label: "Quick-open palette (when not typing)" },
  { keys: ["?"], label: "Show this cheatsheet" },
  { keys: ["Esc"], label: "Close any open overlay" },
  { keys: ["G", "H"], label: "Go to Home" },
  { keys: ["G", "A"], label: "Go to About" },
  { keys: ["G", "S"], label: "Go to Stack" },
  { keys: ["G", "W"], label: "Go to Work" },
  { keys: ["G", "E"], label: "Go to Experience" },
  { keys: ["G", "C"], label: "Go to Contact" },
  { keys: ["↑↑↓↓←→←→BA"], label: "Try it." },
];

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-md border border-border bg-surface/70 font-mono text-[0.7rem] text-foreground shadow-[inset_0_-1px_0_rgba(255,255,255,0.04)]">
      {children}
    </kbd>
  );
}

export function ShortcutsHelp() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const inField = tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement | null)?.isContentEditable;

      if (e.key === "Escape" && open) {
        setOpen(false);
        return;
      }
      if (!inField && e.key === "?" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-shortcuts", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-shortcuts", onOpen as EventListener);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="shortcuts"
          className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-title"
        >
          <motion.button
            type="button"
            aria-label="Close shortcuts"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/55 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.985 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-2xl border border-border-strong bg-background/95 shadow-2xl shadow-black/60 overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/70">
              <div className="flex items-center gap-2">
                <Command className="h-4 w-4 text-accent" aria-hidden />
                <h2 id="shortcuts-title" className="font-mono text-xs uppercase tracking-[0.25em] text-foreground">
                  Keyboard shortcuts
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 rounded-md text-muted hover:text-foreground hover:bg-surface/60 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="max-h-[60vh] overflow-y-auto py-2 no-scrollbar">
              {rows.map((r, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-4 px-5 py-2 hover:bg-surface/30 transition-colors"
                >
                  <span className="text-sm text-muted-strong">{r.label}</span>
                  <span className="flex items-center gap-1 shrink-0">
                    {r.keys.map((k, j) => (
                      <Kbd key={j}>{k}</Kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>

            <div className="px-5 py-2.5 border-t border-border/70 bg-surface/30 text-[0.65rem] font-mono text-muted">
              Tip — press <Kbd>?</Kbd> anywhere to reopen this.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
