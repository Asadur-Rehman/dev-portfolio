"use client";

import { useEffect, useMemo, useState } from "react";
import { GitCommit } from "lucide-react";
import { personal } from "@/data/personal";
import { relativeTime, type LiveActivity } from "@/lib/github";

function useLocalClock(tz: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () => {
      try {
        setTime(
          new Date().toLocaleTimeString("en-US", {
            timeZone: tz,
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
        );
      } catch {
        setTime("");
      }
    };
    fmt();
    const id = setInterval(fmt, 30000);
    return () => clearInterval(id);
  }, [tz]);
  return time;
}

export function NowBar({ liveActivity }: { liveActivity?: LiveActivity | null } = {}) {
  const time = useLocalClock(personal.timezone);

  const statusLine = useMemo(() => {
    if (liveActivity) {
      const repoShort = liveActivity.repo.split("/").pop() ?? liveActivity.repo;
      return {
        label: "Last commit",
        value: `${repoShort} · ${relativeTime(liveActivity.isoTime)}`,
        href: liveActivity.url,
      };
    }
    return {
      label: "Currently",
      value: personal.currentRole,
    };
  }, [liveActivity]);

  return (
    <div
      className="inline-flex w-full max-w-xl items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-xs sm:text-sm"
      role="status"
    >
      <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden />
      <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted shrink-0">
        {statusLine.label}
      </span>
      {statusLine.href ? (
        <a
          href={statusLine.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground truncate hover:text-accent transition-colors"
          title={statusLine.value}
        >
          {statusLine.value}
        </a>
      ) : (
        <span className="text-foreground truncate">{statusLine.value}</span>
      )}
      {liveActivity && (
        <GitCommit className="h-3.5 w-3.5 text-muted shrink-0 ml-auto hidden sm:block" aria-hidden />
      )}
      <span className="ml-auto shrink-0 font-mono text-muted tabular-nums hidden sm:inline">
        {time} PKT
      </span>
    </div>
  );
}
