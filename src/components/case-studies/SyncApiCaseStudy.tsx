"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, Github, ExternalLink, Calendar, Code2,
  Layers, Users, Database, GitBranch, Zap, Server,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ShortcutsHelp } from "@/components/ui/ShortcutsHelp";
import { CustomCursor } from "@/components/ui/CustomCursor";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const meta = {
  year: "2026",
  role: "Sole developer · architecture, frontend, backend",
  duration: "~6 weeks",
  stack: ["Next.js 14", "TypeScript", "NestJS", "MongoDB", "Socket.io", "Redis", "Turborepo"],
};

const stats = [
  { v: "<100ms",  k: "presence sync latency", icon: Zap },
  { v: "1",       k: "monorepo, 2 services",  icon: GitBranch },
  { v: "5+",      k: "auth types supported",  icon: Server },
  { v: "∞",       k: "collaborators / room",  icon: Users },
];

const decisions: { title: string; body: string; tone: "accent" | "muted" }[] = [
  {
    title: "Why monorepo with Turborepo",
    body: "Frontend and backend share request/response contracts, environment schemas, and TypeScript types. A monorepo + Turborepo eliminates the drift that an external SDK package would introduce, and lets one PR change both sides atomically.",
    tone: "accent",
  },
  {
    title: "Why MongoDB over Postgres",
    body: "Collections, requests, environments, and request logs are document-shaped with deeply variable schemas (headers, body, auth blocks differ per request type). Mongo's flexibility paid off; the relational integrity I gave up was never asked for.",
    tone: "muted",
  },
  {
    title: "Why Redis backs presence",
    body: "Presence needs to be ephemeral, fast, and survive pod restarts. A Redis hash per workspace ('who's here, in which collection, last seen at') updates on every heartbeat. Falls back to socket-only state if Redis is unreachable.",
    tone: "accent",
  },
  {
    title: "Where Socket.io shines",
    body: "Real-time isn't just chat — it's collection edits, cursor positions in the request builder, and live activity feeds. Socket.io's rooms model maps 1:1 to workspaces, so authorization is enforced once at join time instead of per-event.",
    tone: "muted",
  },
];

const challenges: { title: string; body: string }[] = [
  {
    title: "Render's free-tier cold starts",
    body: "Deployed to Render's free tier where services sleep after 15min of inactivity. First request after sleep costs ~30s. Fixed with a lightweight ping endpoint hit by an external cron — keeps the dyno warm during expected demo windows.",
  },
  {
    title: "Auth across the SSR boundary",
    body: "NextAuth handles login on the Next.js side, but the NestJS API needs to validate requests independently. Solved with signed JWTs that include workspace claims, validated by a NestJS guard. Socket.io reuses the same guard at connection time.",
  },
  {
    title: "Avoiding 'too realtime'",
    body: "Naive implementation pushed every keystroke through the socket — fine for 2 collaborators, awful for 10. Debounced collection edits to 250ms windows and batch-emit on the server. Cursor positions stayed throttled at 60ms because they're cheap.",
  },
];

const features = [
  { icon: Users,   title: "Live presence",     body: "Avatars in the workspace header show who's editing what in real time, with last-seen-at fallback for stale tabs." },
  { icon: Code2,   title: "Request builder",   body: "Multiple auth types (bearer, basic, OAuth2, API key, custom), JSON/form/raw bodies, headers, environment variable interpolation." },
  { icon: Database, title: "Shared collections", body: "Drag-and-drop folders, complete request history, per-environment variable scopes, and one-click duplication." },
  { icon: Layers,  title: "Auto-generated docs", body: "Every saved request becomes a documentation entry. Shareable link, no extra step." },
];

export function SyncApiCaseStudy() {
  return (
    <>
      <CustomCursor />
      <CommandPalette />
      <ShortcutsHelp />
      <Header />

      <main id="main-content" className="pt-24 sm:pt-32">
        {/* curtain hero */}
        <section className="relative px-5 sm:px-10 lg:px-20 pb-16 sm:pb-24 overflow-hidden">
          {/* atmosphere */}
          <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
            <div className="absolute -top-48 -right-32 w-[40rem] h-[40rem] rounded-full bg-accent/[0.08] blur-[120px]" />
            <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-accent-2/[0.06] blur-[120px]" />
            <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
          </div>

          <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto">
            {/* back link */}
            <motion.div variants={fade}>
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted hover:text-accent transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                Back to work
              </Link>
            </motion.div>

            {/* meta strip */}
            <motion.div variants={fade} className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent">
                Case study
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />{meta.year}
              </span>
              <span>·</span>
              <span>{meta.duration}</span>
              <span>·</span>
              <span>{meta.role}</span>
            </motion.div>

            {/* hero title */}
            <motion.h1
              variants={fade}
              className="mt-6 font-display font-bold tracking-tightest text-balance leading-[0.92] text-5xl xs:text-6xl sm:text-7xl md:text-8xl"
            >
              <span className="text-foreground">Sync</span>
              <span className="text-gradient-accent">API</span>
              <span className="text-accent">.</span>
            </motion.h1>
            <motion.p
              variants={fade}
              className="mt-6 max-w-2xl text-lg sm:text-xl text-muted-strong leading-relaxed text-pretty"
            >
              A real-time collaborative API workspace built for developer teams.
              Postman, reimagined with live presence, shared collections, and auto-generated
              documentation that updates as you work.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fade} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="https://syncapi-9fkn.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-hover hover:shadow-glow transition-all hover:scale-[1.03] active:scale-[0.97]"
              >
                <ExternalLink className="h-4 w-4" />
                Live app
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://github.com/Asadur-Rehman/syncapi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-foreground hover:text-accent hover:border-accent/40 transition-all"
              >
                <Github className="h-4 w-4" />
                Source on GitHub
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* stats strip */}
        <section className="px-5 sm:px-10 lg:px-20 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border/60">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.k} className="bg-surface/40 px-5 py-6 flex flex-col gap-2 hover:bg-surface/70 transition-colors">
                    <Icon className="h-4 w-4 text-accent" aria-hidden />
                    <span className="font-display font-bold text-2xl sm:text-3xl tracking-tighter text-foreground">{s.v}</span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">{s.k}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* the problem */}
        <Section number="01" label="Problem">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground max-w-3xl">
            Postman is great for solo work. <span className="text-gradient-accent">Teams need more.</span>
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-8 text-base sm:text-lg text-muted-strong leading-relaxed">
            <p>
              Working on the same API as a teammate is awkward. You message someone a curl command,
              or commit a collection JSON, or share a Postman link that immediately drifts from
              what they have locally. Documentation lives in a separate tool. Variables get out of
              sync. Nobody knows what the staging environment actually looks like right now.
            </p>
            <p>
              SyncAPI removes the friction by making the workspace itself the source of truth.
              Open a workspace, see who&apos;s currently inside it, edit the same collection in
              real time, and have the documentation regenerate automatically. No PR, no merge, no
              broadcast — everyone is already looking at the same thing.
            </p>
          </div>
        </Section>

        {/* architecture */}
        <Section number="02" label="Architecture" tone="alt">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground max-w-3xl">
            One repo, two services, three persistence layers.
          </h2>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-strong leading-relaxed">
            Monorepo organized with Turborepo. The Next.js app and the NestJS API share types and
            schemas via a workspace package, so a contract change is one commit and one PR.
          </p>

          <ArchitectureDiagram />

          <div className="mt-12 flex flex-wrap items-center gap-2">
            {meta.stack.map((s) => (
              <span key={s} className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-mono text-muted-strong">
                {s}
              </span>
            ))}
          </div>
        </Section>

        {/* features grid */}
        <Section number="03" label="Capabilities">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground max-w-3xl">
            What it actually does.
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <article key={f.title} className="rounded-2xl border border-border bg-surface/50 p-6 hover:border-accent/30 transition-colors">
                  <span className="inline-grid h-9 w-9 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent mb-4">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <h3 className="font-display font-semibold text-lg text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-strong leading-relaxed">{f.body}</p>
                </article>
              );
            })}
          </div>
        </Section>

        {/* decisions */}
        <Section number="04" label="Decisions" tone="alt">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground max-w-3xl">
            Decisions worth keeping a paper trail on.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {decisions.map((d) => (
              <div
                key={d.title}
                className={`rounded-2xl border p-6 transition-colors ${
                  d.tone === "accent"
                    ? "border-accent/30 bg-accent/[0.04] hover:border-accent/60"
                    : "border-border bg-surface/50 hover:border-border-strong"
                }`}
              >
                <h3 className={`font-display font-semibold text-lg ${d.tone === "accent" ? "text-accent" : "text-foreground"}`}>{d.title}</h3>
                <p className="mt-2 text-sm text-muted-strong leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* challenges */}
        <Section number="05" label="Tradeoffs">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground max-w-3xl">
            Where the shape of the problem fought back.
          </h2>
          <ul className="mt-10 space-y-5">
            {challenges.map((c, i) => (
              <li key={c.title} className="flex gap-5 items-start">
                <span className="shrink-0 w-10 h-10 grid place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1">
                  <h3 className="font-display font-semibold text-lg text-foreground">{c.title}</h3>
                  <p className="mt-1.5 text-sm sm:text-base text-muted-strong leading-relaxed">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* closing */}
        <section className="px-5 sm:px-10 lg:px-20 py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[40rem] rounded-full bg-accent/[0.05] blur-[120px]" />
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-5">Next</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground">
              Want to talk through how it&apos;s built?
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-strong leading-relaxed">
              Happy to walk through the code, the deployment, or any of these decisions in more depth.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-hover hover:shadow-glow transition-all hover:scale-[1.03] active:scale-[0.97]"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-foreground hover:text-accent hover:border-accent/40 transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ── Section wrapper with editorial chapter number ──────────────── */
function Section({
  number,
  label,
  tone = "default",
  children,
}: {
  number: string;
  label: string;
  tone?: "default" | "alt";
  children: React.ReactNode;
}) {
  return (
    <section className={`relative px-5 sm:px-10 lg:px-20 py-20 sm:py-28 ${tone === "alt" ? "bg-background-2/40 border-y border-border/60" : ""}`}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto"
      >
        <motion.p variants={fade} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">
          {number} — {label}
        </motion.p>
        <motion.div variants={fade}>{children}</motion.div>
      </motion.div>
    </section>
  );
}

/* ── ArchitectureDiagram — pure SVG, no external assets ─────────── */
function ArchitectureDiagram() {
  return (
    <div className="mt-10 relative rounded-2xl border border-border bg-surface/40 p-6 sm:p-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
      <svg viewBox="0 0 800 360" className="relative w-full h-auto">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" opacity="0.7" />
          </marker>
        </defs>

        {/* Boxes */}
        <Box x={40}  y={50}  w={180} h={70} title="Browser" sub="Next.js 14 · React" />
        <Box x={310} y={50}  w={180} h={70} title="Web service" sub="Next.js API routes" />
        <Box x={580} y={50}  w={180} h={70} title="API" sub="NestJS" />

        <Box x={40}  y={220} w={180} h={90} title="Socket.io" sub="rooms = workspaces" tone="accent" />
        <Box x={310} y={220} w={180} h={90} title="MongoDB" sub="collections, requests, logs" tone="muted" />
        <Box x={580} y={220} w={180} h={90} title="Redis" sub="presence cache + heartbeats" tone="muted" />

        {/* Flow lines */}
        <line x1="220" y1="85"  x2="310" y2="85"  stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow)" opacity="0.65" />
        <line x1="490" y1="85"  x2="580" y2="85"  stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow)" opacity="0.65" />
        <line x1="670" y1="120" x2="670" y2="220" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow)" opacity="0.55" />
        <line x1="400" y1="120" x2="400" y2="220" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow)" opacity="0.55" />

        {/* WebSocket loop */}
        <path d="M 130 120 Q 130 200 130 220" stroke="var(--accent-2)" strokeWidth="1.2" fill="none" markerEnd="url(#arrow)" opacity="0.7" />
        <text x="160" y="180" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent-2)" opacity="0.85">WS</text>

        {/* Labels */}
        <text x="245" y="78" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.5)">HTTPS</text>
        <text x="515" y="78" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.5)">REST + JWT</text>
        <text x="410" y="175" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.5)">queries</text>
        <text x="680" y="175" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.5)">heartbeat</text>
      </svg>
    </div>
  );
}

function Box({
  x, y, w, h, title, sub, tone = "default",
}: {
  x: number; y: number; w: number; h: number;
  title: string; sub: string;
  tone?: "default" | "accent" | "muted";
}) {
  const stroke =
    tone === "accent" ? "var(--accent)" :
    tone === "muted"  ? "rgba(255,255,255,0.18)" :
    "rgba(255,255,255,0.28)";
  const fill =
    tone === "accent" ? "rgba(255,106,61,0.06)" :
    tone === "muted"  ? "rgba(255,255,255,0.025)" :
    "rgba(255,255,255,0.04)";
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth="1" />
      <text x={x + 14} y={y + 26} fontFamily="var(--font-display)" fontWeight="700" fontSize="14" fill="var(--foreground)">{title}</text>
      <text x={x + 14} y={y + 46} fontFamily="var(--font-mono)" fontSize="10" fill="rgba(255,255,255,0.55)">{sub}</text>
    </g>
  );
}
