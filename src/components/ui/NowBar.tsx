"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Rocket, Coffee, Headphones, Code2, Cpu, GitCommit, type LucideIcon } from "lucide-react";
import { relativeTime, type LiveActivity } from "@/lib/github";

type NowItem = {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "accent" | "violet" | "amber" | "emerald";
  href?: string;
};

const staticItems: NowItem[] = [
  { label: "Shipping", value: "SyncAPI — collaborative API workspace", icon: Rocket,     tone: "accent" },
  { label: "Reading",  value: "Designing Data-Intensive Applications", icon: Coffee,     tone: "amber"  },
  { label: "Tinkering", value: "Realtime presence w/ Socket.io + Redis", icon: Cpu,      tone: "violet" },
  { label: "Listening", value: "Lo-fi · deep-work shift",                icon: Headphones, tone: "emerald" },
  { label: "Practicing", value: "RAG eval pipelines, vector tuning",     icon: Code2,    tone: "accent" },
];

const toneCls: Record<NonNullable<NowItem["tone"]>, string> = {
  accent:   "text-accent       border-accent/30      bg-accent/10",
  violet:   "text-violet-400   border-violet-400/30  bg-violet-400/10",
  amber:    "text-amber-400    border-amber-400/30   bg-amber-400/10",
  emerald:  "text-emerald-400  border-emerald-400/30 bg-emerald-400/10",
};

function useLocalClock(tz: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () => {
      try {
        setTime(new Date().toLocaleTimeString("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      } catch { setTime(""); }
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return time;
}

export function NowBar({ liveActivity }: { liveActivity?: LiveActivity | null } = {}) {
  const [idx, setIdx] = useState(0);
  const time = useLocalClock("Asia/Karachi");

  // Merge: if we have live GitHub data, lead with it; static items follow.
  const items = useMemo<NowItem[]>(() => {
    if (!liveActivity) return staticItems;
    const repoShort = liveActivity.repo.split("/").pop() ?? liveActivity.repo;
    return [
      {
        label: "Last commit",
        value: `${repoShort} · ${liveActivity.message} · ${relativeTime(liveActivity.isoTime)}`,
        icon: GitCommit,
        tone: "accent",
        href: liveActivity.url,
      },
      ...staticItems,
    ];
  }, [liveActivity]);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 3400);
    return () => clearInterval(id);
  }, [items.length]);

  const cur = items[idx];
  const Icon = cur.icon;

  return (
    <div
      className="inline-flex w-full max-w-xl items-stretch overflow-hidden rounded-2xl border border-border bg-surface/50 backdrop-blur-sm font-mono text-xs select-none"
      role="status"
      aria-live="polite"
    >
      {/* LIVE indicator */}
      <div className="flex items-center gap-2 pl-3 pr-3 py-2 border-r border-border/80 bg-background/40">
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-[0.6rem] uppercase tracking-[0.25em] text-emerald-400">Now</span>
      </div>

      {/* rotating phrase */}
      <div className="relative flex-1 min-w-0 flex items-center pl-3 pr-2 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={cur.label + cur.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 min-w-0"
          >
            <span className={`grid place-items-center h-6 w-6 shrink-0 rounded-md border ${toneCls[cur.tone ?? "accent"]}`}>
              <Icon className="h-3 w-3" aria-hidden />
            </span>
            <span className="text-muted/60 shrink-0">{cur.label}</span>
            {cur.href ? (
              <a
                href={cur.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/95 truncate hover:text-accent transition-colors"
                title={cur.value}
              >
                {cur.value}
              </a>
            ) : (
              <span className="text-foreground/95 truncate">{cur.value}</span>
            )}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* clock + activity dot */}
      <div className="hidden sm:flex items-center gap-2 pl-3 pr-3 border-l border-border/80 bg-background/40">
        <Activity className="h-3 w-3 text-muted" aria-hidden />
        <span className="tabular-nums text-muted-strong">{time}</span>
        <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted/50">PKT</span>
      </div>
    </div>
  );
}
