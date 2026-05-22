/**
 * Light-touch GitHub fetcher for the homepage "Now" status strip.
 * Hits the public events endpoint — no auth required, but heavily
 * rate-limited (60 req/hr per IP), so we cache aggressively via
 * Next's fetch revalidation.
 */

export type LiveActivity = {
  repo: string;      // "Asadur-Rehman/syncapi"
  message: string;   // first commit message of the push
  branch: string;    // "main"
  url: string;       // commit url
  isoTime: string;   // ISO timestamp of the event
};

type GhCommit = { message: string; sha: string; url: string };
type GhPushPayload = { commits?: GhCommit[]; ref?: string };
type GhEvent = {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: GhPushPayload;
};

const USER = "Asadur-Rehman";

export async function fetchLatestActivity(): Promise<LiveActivity | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${USER}/events/public?per_page=30`, {
      headers: { "Accept": "application/vnd.github+json", "User-Agent": "asadurrehman-portfolio" },
      // Cache for 30 minutes — the strip is decorative, not a dashboard.
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;

    const events = (await res.json()) as GhEvent[];
    const push = events.find((e) => e.type === "PushEvent" && (e.payload.commits?.length ?? 0) > 0);
    if (!push) return null;

    const commit = push.payload.commits![0];
    const branch = (push.payload.ref ?? "refs/heads/main").replace(/^refs\/heads\//, "");
    const sha = commit.sha;
    return {
      repo: push.repo.name,
      message: commit.message.split("\n")[0].trim(),
      branch,
      url: `https://github.com/${push.repo.name}/commit/${sha}`,
      isoTime: push.created_at,
    };
  } catch {
    return null;
  }
}

export function relativeTime(iso: string, now: Date = new Date()): string {
  const then = new Date(iso).getTime();
  const diffMs = now.getTime() - then;
  const sec = Math.max(0, Math.floor(diffMs / 1000));
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 48) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 14) return `${day}d ago`;
  const week = Math.floor(day / 7);
  if (week < 8) return `${week}w ago`;
  const mo = Math.floor(day / 30);
  return `${mo}mo ago`;
}
