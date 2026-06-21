"use client";

import {
  ArrowUpRight, Github, ExternalLink, Workflow,
  Sparkles, Zap, Webhook, Layers, Activity,
} from "lucide-react";
import { CaseStudyShell } from "./CaseStudyShell";
import {
  Chapter, StatStrip, CaseStudyHero, ClosingCta,
  DiagramBox, DiagramLabel, primaryBtn, secondaryBtn,
} from "./shared";

const meta = {
  year: "2025",
  role: "Sole developer · workflow engine + UI",
  duration: "~5 weeks",
  stack: ["Next.js", "TypeScript", "React Flow", "Prisma", "PostgreSQL", "BullMQ", "Redis", "OpenAI", "Groq"],
};

const stats = [
  { v: "3", k: "node types · trigger/action/AI", icon: Layers },
  { v: "5+", k: "AI tasks supported", icon: Sparkles },
  { v: "∞", k: "fan-out via queue retries", icon: Activity },
  { v: "1", k: "click → external webhook trigger", icon: Webhook },
];

const chapters = [
  { id: "problem", num: "01", label: "Problem" },
  { id: "architecture", num: "02", label: "Architecture" },
  { id: "engine", num: "03", label: "Workflow engine" },
  { id: "decisions", num: "04", label: "Decisions" },
  { id: "tradeoffs", num: "05", label: "Tradeoffs" },
];

const decisions: { title: string; body: string; tone: "accent" | "muted" }[] = [
  {
    title: "Why a queue (BullMQ) instead of inline execution",
    body: "Long-running AI calls can't block the request thread. BullMQ on Redis gives me durable jobs, retries with exponential backoff, fan-out across workers, and a clean separation between the web tier (Next.js) and the execution tier (a standalone TS worker). The web app stays snappy even when a workflow runs for 30 seconds.",
    tone: "accent",
  },
  {
    title: "Why a standalone worker process",
    body: "Next.js serverless functions have wall-clock and memory limits unfit for orchestration. The worker runs in its own container (Render / Fly), pulls jobs off Redis, and persists state to Postgres via Prisma. Web and worker scale independently.",
    tone: "muted",
  },
  {
    title: "Why React Flow for the editor",
    body: "Building a node-graph editor from scratch is a several-month rabbit hole. React Flow handles the canvas, minimap, edge routing, and pan/zoom. The workflow definition is its JSON, which I persist directly — no translation layer.",
    tone: "accent",
  },
  {
    title: "Why multiple AI providers (OpenAI + Groq + mock)",
    body: "Lock-in to one model means lock-in to one bill. The AI node is a small abstraction that routes to OpenAI for accuracy or Groq for speed. The 'mock' provider returns canned output for local development so I don't burn credits debugging UI.",
    tone: "muted",
  },
];

const challenges = [
  {
    title: "Idempotency for re-tried jobs",
    body: "Workers retry on transient failures, which means the same node might execute multiple times. Each run logs a deterministic execution ID, and downstream nodes check for it before re-executing. Side-effecting nodes (webhooks, emails) gate on this ID.",
  },
  {
    title: "Visual editor ↔ execution state",
    body: "Users want to see their workflow light up as it runs. Solved with a polling endpoint (could be SSE later) that returns per-node status. React Flow's edge animations turn on for the currently-active path.",
  },
  {
    title: "Tenant isolation at the queue level",
    body: "Multiple workspaces share the same worker pool. Jobs carry their workspaceId; the worker enforces row-level access on every Prisma query. Webhooks include a workspace-scoped signing secret so trigger payloads can't cross-pollinate.",
  },
];

const features = [
  { icon: Workflow, title: "Drag-and-drop builder", body: "Trigger nodes (webhook, schedule, manual), action nodes (HTTP, DB, transform), and AI nodes (summarize, classify, generate). Connect them on an infinite canvas." },
  { icon: Sparkles, title: "Native AI nodes", body: "AI is a first-class node type, not a wrapper around an HTTP call. Provider-agnostic — swap OpenAI for Groq without touching the workflow." },
  { icon: Zap, title: "Async execution", body: "BullMQ-backed workers run workflows out of process. Retries with backoff, dead-letter queues for permanent failures, and per-workspace rate limiting." },
  { icon: Webhook, title: "External triggers", body: "Every workflow gets a webhook URL and a REST endpoint. Wire it to GitHub, Slack, or any service that can POST." },
];

export function FlowCraftCaseStudy() {
  return (
    <CaseStudyShell chapters={chapters}>
      <CaseStudyHero
        title="Flow"
        highlight="Craft"
        description="A visual workflow builder where AI is a first-class node. Drag, connect, and trigger pipelines that summarize, classify, and generate — backed by a real queue, not a for-loop."
        meta={meta}
        actions={
          <>
            <a href="https://flow-craft-pied.vercel.app/" target="_blank" rel="noopener noreferrer" className={primaryBtn}>
              <ExternalLink className="h-4 w-4" />
              Live app
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/Asadur-Rehman/FlowCraft" target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
              <Github className="h-4 w-4" />
              Source on GitHub
            </a>
          </>
        }
      />

      <StatStrip items={stats} />

      <Chapter id="problem" number="01" label="Problem">
        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground max-w-3xl">
          AI workflows usually live in <span className="text-gradient-accent">scripts no one reads</span>.
        </h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6 text-base text-muted-strong leading-relaxed">
          <p>
            Most teams I&apos;ve worked with end up with a folder of Python scripts that call an LLM,
            maybe transform the output, post to a Slack webhook, and pray. They run on cron,
            fail silently, and nobody can change them without becoming an honorary infra engineer.
          </p>
          <p>
            FlowCraft turns those scripts into editable, observable workflows. A non-engineer can
            wire a trigger → AI summarize → POST to webhook in three nodes. An engineer can drop
            in a custom action when needed. Both see the same pipeline, the same logs, and the
            same failure modes.
          </p>
        </div>
      </Chapter>

      <Chapter id="architecture" number="02" label="Architecture" tone="alt">
        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground max-w-3xl">
          Web tier and execution tier, decoupled by a queue.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-muted-strong leading-relaxed">
          Next.js handles the UI, the editor, and the workflow definitions. A standalone TypeScript
          worker (its own container) pulls jobs from Redis via BullMQ and writes results back to
          Postgres. Both tiers share Prisma and the workflow type definitions.
        </p>
        <ArchitectureDiagram />
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {meta.stack.map((s) => (
            <span key={s} className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-mono text-muted-strong">{s}</span>
          ))}
        </div>
      </Chapter>

      <Chapter id="engine" number="03" label="Workflow engine">
        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground max-w-3xl">
          Three node families, one execution model.
        </h2>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <article key={f.title} className="rounded-xl border border-border bg-surface-elevated p-5 shadow-sm">
                <span className="inline-grid h-9 w-9 place-items-center rounded-lg border border-accent/20 bg-accent-muted text-accent mb-3">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="font-display font-semibold text-lg text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-strong leading-relaxed">{f.body}</p>
              </article>
            );
          })}
        </div>
      </Chapter>

      <Chapter id="decisions" number="04" label="Decisions" tone="alt">
        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground max-w-3xl">
          Decisions worth keeping a paper trail on.
        </h2>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {decisions.map((d) => (
            <div
              key={d.title}
              className={`rounded-xl border p-5 ${
                d.tone === "accent" ? "border-accent/20 bg-accent-muted" : "border-border bg-surface-elevated"
              }`}
            >
              <h3 className={`font-display font-semibold text-lg ${d.tone === "accent" ? "text-accent" : "text-foreground"}`}>{d.title}</h3>
              <p className="mt-2 text-sm text-muted-strong leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </Chapter>

      <Chapter id="tradeoffs" number="05" label="Tradeoffs">
        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground max-w-3xl">
          Where it got sharp.
        </h2>
        <ul className="mt-8 space-y-5">
          {challenges.map((c, i) => (
            <li key={c.title} className="flex gap-4 items-start">
              <span className="shrink-0 w-9 h-9 grid place-items-center rounded-full border border-accent/20 bg-accent-muted text-accent font-mono text-xs">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-strong leading-relaxed">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Chapter>

      <ClosingCta />
    </CaseStudyShell>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="mt-8 relative rounded-xl border border-border bg-surface-elevated p-6 sm:p-8 overflow-hidden">
      <svg viewBox="0 0 800 360" className="relative w-full h-auto">
        <defs>
          <marker id="arrow-fc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" opacity="0.7" />
          </marker>
        </defs>

        <DiagramBox x={40} y={50} w={180} h={70} title="Web app" sub="Next.js · React Flow" />
        <DiagramBox x={310} y={50} w={180} h={70} title="API routes" sub="auth · workflow CRUD" />
        <DiagramBox x={580} y={50} w={180} h={70} title="Webhook ingress" sub="external triggers" tone="accent" />
        <DiagramBox x={310} y={170} w={180} h={70} title="Redis · BullMQ" sub="job queue" tone="accent" />
        <DiagramBox x={310} y={290} w={180} h={50} title="PostgreSQL" sub="Prisma" tone="muted" />
        <DiagramBox x={580} y={170} w={180} h={150} title="Worker container" sub="standalone TS process · pulls jobs · runs nodes · writes results" />

        <line x1="220" y1="85" x2="310" y2="85" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-fc)" opacity="0.65" />
        <line x1="490" y1="85" x2="580" y2="85" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-fc)" opacity="0.55" />
        <line x1="400" y1="120" x2="400" y2="170" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-fc)" opacity="0.7" />
        <line x1="490" y1="205" x2="580" y2="205" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-fc)" opacity="0.7" />
        <line x1="670" y1="320" x2="490" y2="315" stroke="var(--accent-2)" strokeWidth="1.2" markerEnd="url(#arrow-fc)" opacity="0.7" />
        <line x1="400" y1="240" x2="400" y2="290" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="2 3" />

        <DiagramLabel x={240} y={80}>SSR</DiagramLabel>
        <DiagramLabel x={514} y={80}>POST</DiagramLabel>
        <DiagramLabel x={410} y={160}>enqueue</DiagramLabel>
        <DiagramLabel x={500} y={200}>dequeue</DiagramLabel>
        <DiagramLabel x={510} y={335}>writeback</DiagramLabel>
      </svg>
    </div>
  );
}
