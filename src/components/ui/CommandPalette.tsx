"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Mail, Phone, Github, Linkedin, Briefcase, Download,
  Sparkles, Code2, Compass, Cpu, Layers, FolderGit2, Send,
  CornerDownLeft, Command,
  type LucideIcon,
} from "lucide-react";
import { personal } from "@/data/personal";
import { linkedIn } from "@/data/socials";

type Action = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Quick actions" | "Links" | "Source";
  icon: LucideIcon;
  iconColor?: string;
  keywords?: string;
  shortcut?: string[];
  run: () => void | Promise<void>;
};

const REPO_URL = "https://github.com/Asadur-Rehman/dev-portfolio";

function scrollTo(id: string) {
  // If we're on a page that has this section, scroll in-page.
  // Otherwise navigate to the home page anchor.
  if (id === "hero" && window.location.pathname === "/") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  window.location.href = id === "hero" ? "/" : `/#${id}`;
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

async function copy(text: string) {
  try { await navigator.clipboard.writeText(text); } catch {}
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }, []);

  const actions = useMemo<Action[]>(() => [
    // Navigate
    { id: "nav-hero", group: "Navigate", icon: Compass, label: "Go to Top", keywords: "hero home", run: () => scrollTo("hero") },
    { id: "nav-about", group: "Navigate", icon: Sparkles, label: "Go to About", keywords: "bio intro", run: () => scrollTo("about") },
    { id: "nav-tech", group: "Navigate", icon: Cpu, label: "Go to Stack", keywords: "skills tools", run: () => scrollTo("tech") },
    { id: "nav-proj", group: "Navigate", icon: Layers, label: "Go to Work", keywords: "projects portfolio", run: () => scrollTo("projects") },
    { id: "nav-process", group: "Navigate", icon: Compass, label: "Go to Process", keywords: "how i work workflow methodology", run: () => scrollTo("process") },
    { id: "nav-services", group: "Navigate", icon: Code2, label: "Go to Services", keywords: "freelance hire offerings", run: () => scrollTo("services") },
    { id: "nav-exp", group: "Navigate", icon: Briefcase, label: "Go to Experience", keywords: "work history", run: () => scrollTo("experience") },
    { id: "nav-faq", group: "Navigate", icon: Sparkles, label: "Go to FAQ", keywords: "questions pricing rates", run: () => scrollTo("faq") },
    { id: "nav-contact", group: "Navigate", icon: Send, label: "Go to Contact", keywords: "email hire", run: () => scrollTo("contact") },

    // Quick actions
    { id: "copy-email", group: "Quick actions", icon: Mail, label: "Copy email address", hint: personal.email, run: async () => { await copy(personal.email); flash("Email copied"); } },
    { id: "copy-phone", group: "Quick actions", icon: Phone, label: "Copy phone number", hint: personal.phone, run: async () => { await copy(personal.phone); flash("Phone copied"); } },
    { id: "mail-me", group: "Quick actions", icon: Send, label: "Send me an email", hint: "opens mail client", run: () => { window.location.href = `mailto:${personal.email}`; } },
    { id: "download-cv", group: "Quick actions", icon: Download, label: "Download résumé", hint: "PDF", run: () => { const a = document.createElement("a"); a.href = personal.resumeUrl; a.download = "asad-ur-rehman-resume.pdf"; a.click(); flash("Résumé downloading"); } },
    { id: "show-help", group: "Quick actions", icon: Command, label: "Show keyboard shortcuts", hint: "?", shortcut: ["?"], run: () => { window.dispatchEvent(new CustomEvent("open-shortcuts")); } },

    // Links
    { id: "link-github", group: "Links", icon: Github, label: "GitHub profile", hint: "@Asadur-Rehman", run: () => openExternal("https://github.com/Asadur-Rehman") },
    { id: "link-linkedin", group: "Links", icon: Linkedin, label: "LinkedIn", hint: linkedIn.vanity, run: () => openExternal(linkedIn.url) },
    { id: "link-upwork", group: "Links", icon: Briefcase, label: "Upwork profile", run: () => openExternal("https://www.upwork.com/freelancers/~01a6a9563845b65fdc") },

    // Source
    { id: "src-portfolio", group: "Source", icon: FolderGit2, label: "View source for this portfolio", hint: REPO_URL.replace("https://", ""), run: () => openExternal(REPO_URL) },
    { id: "src-syncapi", group: "Source", icon: Code2, label: "SyncAPI — source", run: () => openExternal("https://github.com/Asadur-Rehman/syncapi") },
    { id: "src-flowcraft", group: "Source", icon: Code2, label: "FlowCraft — source", run: () => openExternal("https://github.com/Asadur-Rehman/FlowCraft") },
    { id: "src-arcadia", group: "Source", icon: Code2, label: "Arcadia — source", run: () => openExternal("https://github.com/Asadur-Rehman/arcadia") },
    { id: "src-talentscout", group: "Source", icon: Code2, label: "TalentScout — source", run: () => openExternal("https://github.com/Asadur-Rehman/TalentScout") },
  ], [flash]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) =>
      a.label.toLowerCase().includes(q) ||
      a.hint?.toLowerCase().includes(q) ||
      a.keywords?.toLowerCase().includes(q) ||
      a.group.toLowerCase().includes(q)
    );
  }, [actions, query]);

  // Group preserving filtered order
  const grouped = useMemo(() => {
    const g: Record<string, Action[]> = {};
    for (const a of filtered) {
      (g[a.group] ||= []).push(a);
    }
    return g;
  }, [filtered]);

  const flatOrdered = useMemo(() => Object.values(grouped).flat(), [grouped]);

  // Global open/close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const inField = tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement | null)?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
        return;
      }
      // Quick-open with "/"
      if (!open && !inField && e.key === "/") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    const onOpen = () => setOpen(true);
    window.addEventListener("open-command-palette", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen as EventListener);
    };
  }, [open]);

  // Reset when opening
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // focus next tick after animation begins
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Clamp active when filtered changes
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, flatOrdered.length - 1)));
  }, [flatOrdered.length]);

  // Keep active item in view
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const runAndClose = (a: Action) => {
    setOpen(false);
    // Defer so the modal can unmount before scroll/open
    setTimeout(() => a.run(), 60);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flatOrdered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const a = flatOrdered[active];
      if (a) runAndClose(a);
    } else if (e.key === "Tab") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(1, flatOrdered.length));
    }
  };

  return (
    <>
      {/* Floating toast (e.g. "Email copied") */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10001] rounded-full border border-accent/30 bg-background/90 backdrop-blur-md px-4 py-2 text-xs font-mono text-accent shadow-glow-sm"
            role="status"
            aria-live="polite"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="palette"
            className="fixed inset-0 z-[10000] flex items-start justify-center pt-[12vh] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            {/* backdrop */}
            <motion.button
              type="button"
              aria-label="Close command palette"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-[6px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* panel */}
            <motion.div
              className="relative w-full max-w-xl rounded-2xl border border-border-strong bg-background/95 shadow-2xl shadow-black/60 overflow-hidden"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.985 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* search row */}
              <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-border/70">
                <Search className="h-4 w-4 text-muted shrink-0" aria-hidden />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActive(0); }}
                  onKeyDown={onInputKey}
                  placeholder="Search actions, sections, links…"
                  className="flex-1 bg-transparent text-sm sm:text-base text-foreground placeholder:text-muted/60 focus:outline-none"
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="off"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border bg-surface/60 px-1.5 py-0.5 font-mono text-[0.65rem] text-muted">
                  esc
                </kbd>
              </div>

              {/* results */}
              <div ref={listRef} className="max-h-[55vh] overflow-y-auto py-2 no-scrollbar">
                {flatOrdered.length === 0 ? (
                  <div className="px-5 py-10 text-center text-sm text-muted font-mono">
                    No matches for &quot;{query}&quot;
                  </div>
                ) : (
                  (Object.keys(grouped) as Array<keyof typeof grouped>).map((g) => {
                    const items = grouped[g];
                    if (!items?.length) return null;
                    return (
                      <div key={g} className="mb-1">
                        <p className="px-5 pt-2 pb-1 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted/60">
                          {g}
                        </p>
                        <ul>
                          {items.map((a) => {
                            const idx = flatOrdered.indexOf(a);
                            const isActive = idx === active;
                            const Icon = a.icon;
                            return (
                              <li key={a.id}>
                                <button
                                  type="button"
                                  data-idx={idx}
                                  onMouseEnter={() => setActive(idx)}
                                  onClick={() => runAndClose(a)}
                                  className={`group w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                                    isActive ? "bg-accent/[0.08] text-foreground" : "text-muted-strong hover:bg-surface/40"
                                  }`}
                                >
                                  <span
                                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-md border ${
                                      isActive ? "border-accent/40 bg-accent/10 text-accent" : "border-border bg-surface/60 text-muted"
                                    } transition-colors`}
                                    style={a.iconColor ? { color: a.iconColor, borderColor: `${a.iconColor}55`, background: `${a.iconColor}1a` } : undefined}
                                  >
                                    <Icon className="h-3.5 w-3.5" aria-hidden />
                                  </span>
                                  <span className="flex-1 min-w-0">
                                    <span className="block text-sm truncate">{a.label}</span>
                                    {a.hint && (
                                      <span className="block text-[0.7rem] font-mono text-muted/70 truncate">{a.hint}</span>
                                    )}
                                  </span>
                                  {isActive && (
                                    <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[0.65rem] text-accent">
                                      <CornerDownLeft className="h-3 w-3" aria-hidden />
                                    </span>
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })
                )}
              </div>

              {/* footer */}
              <div className="flex items-center justify-between gap-4 px-5 py-2.5 border-t border-border/70 bg-surface/30">
                <div className="flex items-center gap-3 text-[0.65rem] font-mono text-muted">
                  <span className="inline-flex items-center gap-1"><kbd className="rounded border border-border px-1">↑</kbd><kbd className="rounded border border-border px-1">↓</kbd> navigate</span>
                  <span className="inline-flex items-center gap-1"><kbd className="rounded border border-border px-1">⏎</kbd> open</span>
                  <span className="hidden sm:inline-flex items-center gap-1"><kbd className="rounded border border-border px-1">/</kbd> quick-open</span>
                </div>
                <span className="text-[0.65rem] font-mono text-muted/60">{flatOrdered.length} action{flatOrdered.length !== 1 ? "s" : ""}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

