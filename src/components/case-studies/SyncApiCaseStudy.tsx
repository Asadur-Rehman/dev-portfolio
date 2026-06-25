"use client";

import {
  ArrowUpRight, Github, ExternalLink, Code2,
  Layers, Users, Database, GitBranch, Zap, Server,
} from "lucide-react";
import { CaseStudyShell } from "./CaseStudyShell";
import {
  Chapter, StatStrip, CaseStudyHero, ClosingCta,
  DiagramBox, DiagramLabel, DiagramFrame,
  FeatureGrid, DecisionGrid, ChallengeList, SectionTitle, StackPills,
  primaryBtn, secondaryBtn,
} from "./shared";

const meta = {
  year: "2026",
  role: "Sole developer · architecture, frontend, backend",
  duration: "~6 weeks",
  stack: ["Next.js 14", "TypeScript", "NestJS", "MongoDB", "Socket.io", "Redis", "Turborepo"],
};

const stats = [
  { v: "<100ms", k: "presence sync latency", icon: Zap },
  { v: "1", k: "monorepo, 2 services", icon: GitBranch },
  { v: "5+", k: "auth types supported", icon: Server },
  { v: "∞", k: "collaborators / room", icon: Users },
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
  { icon: Users, title: "Live presence", body: "Avatars in the workspace header show who's editing what in real time, with last-seen-at fallback for stale tabs." },
  { icon: Code2, title: "Request builder", body: "Multiple auth types (bearer, basic, OAuth2, API key, custom), JSON/form/raw bodies, headers, environment variable interpolation." },
  { icon: Database, title: "Shared collections", body: "Drag-and-drop folders, complete request history, per-environment variable scopes, and one-click duplication." },
  { icon: Layers, title: "Auto-generated docs", body: "Every saved request becomes a documentation entry. Shareable link, no extra step." },
];

const chapters = [
  { id: "problem", num: "01", label: "Problem" },
  { id: "architecture", num: "02", label: "Architecture" },
  { id: "capabilities", num: "03", label: "Capabilities" },
  { id: "decisions", num: "04", label: "Decisions" },
  { id: "tradeoffs", num: "05", label: "Tradeoffs" },
];

export function SyncApiCaseStudy() {
  return (
    <CaseStudyShell chapters={chapters}>
      <CaseStudyHero
        title="Sync"
        highlight="API"
        description="A real-time collaborative API workspace built for developer teams. Postman, reimagined with live presence, shared collections, and auto-generated documentation that updates as you work."
        meta={meta}
        actions={
          <>
            <a href="https://syncapi-9fkn.onrender.com" target="_blank" rel="noopener noreferrer" className={primaryBtn}>
              <ExternalLink className="h-4 w-4" />
              Live app
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/Asadur-Rehman/syncapi" target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
              <Github className="h-4 w-4" />
              Source on GitHub
            </a>
          </>
        }
      />

      <StatStrip items={stats} />

      <Chapter id="problem" number="01" label="Problem">
        <SectionTitle>
          Postman is great for solo work. <span className="text-gradient-accent">Teams need more.</span>
        </SectionTitle>
        <div className="mt-6 grid md:grid-cols-2 gap-6 text-base text-muted-strong leading-relaxed">
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
      </Chapter>

      <Chapter id="architecture" number="02" label="Architecture" tone="alt">
        <SectionTitle>One repo, two services, three persistence layers.</SectionTitle>
        <p className="mt-4 max-w-2xl text-base text-muted-strong leading-relaxed text-pretty">
          Monorepo organized with Turborepo. The Next.js app and the NestJS API share types and
          schemas via a workspace package, so a contract change is one commit and one PR.
        </p>
        <ArchitectureDiagram />
        <StackPills items={meta.stack} />
      </Chapter>

      <Chapter id="capabilities" number="03" label="Capabilities">
        <SectionTitle>What it actually does.</SectionTitle>
        <FeatureGrid items={features} />
      </Chapter>

      <Chapter id="decisions" number="04" label="Decisions" tone="alt">
        <SectionTitle>Decisions worth keeping a paper trail on.</SectionTitle>
        <DecisionGrid items={decisions} />
      </Chapter>

      <Chapter id="tradeoffs" number="05" label="Tradeoffs">
        <SectionTitle>Where the shape of the problem fought back.</SectionTitle>
        <ChallengeList items={challenges} />
      </Chapter>

      <ClosingCta siblings={{ next: { href: "/work/flowcraft", label: "FlowCraft" } }} />
    </CaseStudyShell>
  );
}

function ArchitectureDiagram() {
  return (
    <DiagramFrame>
      <svg viewBox="0 0 800 360" className="w-full h-auto" role="img" aria-label="SyncAPI architecture diagram">
        <defs>
          <marker id="arrow-syncapi" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" opacity="0.7" />
          </marker>
        </defs>

        <DiagramBox x={40} y={50} w={180} h={70} title="Browser" sub="Next.js 14 · React" />
        <DiagramBox x={310} y={50} w={180} h={70} title="Web service" sub="Next.js API routes" />
        <DiagramBox x={580} y={50} w={180} h={70} title="API" sub="NestJS" />
        <DiagramBox x={40} y={220} w={180} h={90} title="Socket.io" sub="rooms = workspaces" tone="accent" />
        <DiagramBox x={310} y={220} w={180} h={90} title="MongoDB" sub="collections, requests, logs" tone="muted" />
        <DiagramBox x={580} y={220} w={180} h={90} title="Redis" sub="presence cache + heartbeats" tone="muted" />

        <line x1="220" y1="85" x2="310" y2="85" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-syncapi)" opacity="0.65" />
        <line x1="490" y1="85" x2="580" y2="85" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-syncapi)" opacity="0.65" />
        <line x1="670" y1="120" x2="670" y2="220" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-syncapi)" opacity="0.55" />
        <line x1="400" y1="120" x2="400" y2="220" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-syncapi)" opacity="0.55" />
        <path d="M 130 120 Q 130 200 130 220" stroke="var(--accent-2)" strokeWidth="1.2" fill="none" markerEnd="url(#arrow-syncapi)" opacity="0.7" />
        <DiagramLabel x={160} y={180}>WS</DiagramLabel>
        <DiagramLabel x={245} y={78}>HTTPS</DiagramLabel>
        <DiagramLabel x={515} y={78}>REST + JWT</DiagramLabel>
        <DiagramLabel x={410} y={175}>queries</DiagramLabel>
        <DiagramLabel x={680} y={175}>heartbeat</DiagramLabel>
      </svg>
    </DiagramFrame>
  );
}
