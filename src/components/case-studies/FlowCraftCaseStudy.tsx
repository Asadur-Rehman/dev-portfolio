"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, Github, ExternalLink, Workflow,
  Sparkles, Zap, Webhook, Layers, Activity,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ShortcutsHelp } from "@/components/ui/ShortcutsHelp";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CaseStudyToc } from "./CaseStudyToc";
import { Chapter, StatStrip, MetaStrip, fade, container } from "./shared";

const meta = {
  year: "2025",
  role: "Sole developer · workflow engine + UI",
  duration: "~5 weeks",
  stack: ["Next.js", "TypeScript", "React Flow", "Prisma", "PostgreSQL", "BullMQ", "Redis", "OpenAI", "Groq"],
};

const stats = [
  { v: "3",   k: "node types · trigger/action/AI", icon: Layers },
  { v: "5+",  k: "AI tasks supported",              icon: Sparkles },
  { v: "∞",   k: "fan-out via queue retries",       icon: Activity },
  { v: "1",   k: "click → external webhook trigger",icon: Webhook },
];

const chapters = [
  { id: "problem",      num: "01", label: "Problem" },
  { id: "architecture", num: "02", label: "Architecture" },
  { id: "engine",       num: "03", label: "Workflow engine" },
  { id: "decisions",    num: "04", label: "Decisions" },
  { id: "tradeoffs",    num: "05", label: "Tradeoffs" },
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
  { icon: Workflow,   title: "Drag-and-drop builder", body: "Trigger nodes (webhook, schedule, manual), action nodes (HTTP, DB, transform), and AI nodes (summarize, classify, generate). Connect them on an infinite canvas." },
  { icon: Sparkles,   title: "Native AI nodes",       body: "AI is a first-class node type, not a wrapper around an HTTP call. Provider-agnostic — swap OpenAI for Groq without touching the workflow." },
  { icon: Zap,        title: "Async execution",       body: "BullMQ-backed workers run workflows out of process. Retries with backoff, dead-letter queues for permanent failures, and per-workspace rate limiting." },
  { icon: Webhook,    title: "External triggers",     body: "Every workflow gets a webhook URL and a REST endpoint. Wire it to GitHub, Slack, or any service that can POST." },
];

export function FlowCraftCaseStudy() {
  return (
    <>
      <CustomCursor />
      <CommandPalette />
      <ShortcutsHelp />
      <Header />
      <CaseStudyToc chapters={chapters} />

      <main id="main-content" className="pt-24 sm:pt-32">
        <section className="relative px-5 sm:px-10 lg:px-20 pb-16 sm:pb-24 overflow-hidden">
          <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
            <div className="absolute -top-48 -right-32 w-[40rem] h-[40rem] rounded-full bg-accent/[0.08] blur-[120px]" />
            <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-accent-2/[0.06] blur-[120px]" />
            <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
          </div>

          <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto">
            <motion.div variants={fade}>
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted hover:text-accent transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                Back to work
              </Link>
            </motion.div>

            <MetaStrip year={meta.year} duration={meta.duration} role={meta.role} />

            <motion.h1
              variants={fade}
              className="mt-6 font-display font-bold tracking-tightest text-balance leading-[0.92] text-5xl xs:text-6xl sm:text-7xl md:text-8xl"
            >
              <span className="text-foreground">Flow</span>
              <span className="text-gradient-accent">Craft</span>
              <span className="text-accent">.</span>
            </motion.h1>
            <motion.p variants={fade} className="mt-6 max-w-2xl text-lg sm:text-xl text-muted-strong leading-relaxed text-pretty">
              A visual workflow builder where AI is a first-class node. Drag, connect, and trigger
              pipelines that summarize, classify, and generate — backed by a real queue, not a
              for-loop.
            </motion.p>

            <motion.div variants={fade} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="https://flow-craft-pied.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-hover hover:shadow-glow transition-all hover:scale-[1.03] active:scale-[0.97]"
              >
                <ExternalLink className="h-4 w-4" />
                Live app
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://github.com/Asadur-Rehman/FlowCraft"
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

        <StatStrip items={stats} />

        <Chapter id="problem" number="01" label="Problem">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground max-w-3xl">
            AI workflows usually live in <span className="text-gradient-accent">scripts no one reads</span>.
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-8 text-base sm:text-lg text-muted-strong leading-relaxed">
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
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground max-w-3xl">
            Web tier and execution tier, decoupled by a queue.
          </h2>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-strong leading-relaxed">
            Next.js handles the UI, the editor, and the workflow definitions. A standalone TypeScript
            worker (its own container) pulls jobs from Redis via BullMQ and writes results back to
            Postgres. Both tiers share Prisma and the workflow type definitions.
          </p>

          <ArchitectureDiagram />

          <div className="mt-12 flex flex-wrap items-center gap-2">
            {meta.stack.map((s) => (
              <span key={s} className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-mono text-muted-strong">{s}</span>
            ))}
          </div>
        </Chapter>

        <Chapter id="engine" number="03" label="Workflow engine">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground max-w-3xl">
            Three node families, one execution model.
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
        </Chapter>

        <Chapter id="decisions" number="04" label="Decisions" tone="alt">
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
        </Chapter>

        <Chapter id="tradeoffs" number="05" label="Tradeoffs">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground max-w-3xl">
            Where it got sharp.
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
        </Chapter>

        <ClosingCta />
      </main>

      <Footer />
    </>
  );
}

function ClosingCta() {
  return (
    <section className="px-5 sm:px-10 lg:px-20 py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[40rem] rounded-full bg-accent/[0.05] blur-[120px]" />
      </div>
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-5">Next</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground">
          Curious how a node executes end-to-end?
        </h2>
        <p className="mt-5 text-base sm:text-lg text-muted-strong leading-relaxed">
          Happy to walk through a job&apos;s journey from trigger to webhook callback.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-hover hover:shadow-glow transition-all hover:scale-[1.03] active:scale-[0.97]">
            Get in touch <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/#projects" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-foreground hover:text-accent hover:border-accent/40 transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to all work
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="mt-10 relative rounded-2xl border border-border bg-surface/40 p-6 sm:p-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
      <svg viewBox="0 0 800 360" className="relative w-full h-auto">
        <defs>
          <marker id="arrow-fc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" opacity="0.7" />
          </marker>
        </defs>

        <Box x={40}  y={50}  w={180} h={70} title="Web app" sub="Next.js · React Flow" />
        <Box x={310} y={50}  w={180} h={70} title="API routes" sub="auth · workflow CRUD" />
        <Box x={580} y={50}  w={180} h={70} title="Webhook ingress" sub="external triggers" tone="accent" />

        <Box x={310} y={170} w={180} h={70} title="Redis · BullMQ" sub="job queue" tone="accent" />
        <Box x={310} y={290} w={180} h={50} title="PostgreSQL" sub="Prisma" tone="muted" />

        <Box x={580} y={170} w={180} h={150} title="Worker container" sub="standalone TS process · pulls jobs · runs nodes · writes results" />

        <line x1="220" y1="85"  x2="310" y2="85"  stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-fc)" opacity="0.65" />
        <line x1="490" y1="85"  x2="580" y2="85"  stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-fc)" opacity="0.55" />
        <line x1="400" y1="120" x2="400" y2="170" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-fc)" opacity="0.7" />
        <line x1="490" y1="205" x2="580" y2="205" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-fc)" opacity="0.7" />
        <line x1="670" y1="320" x2="490" y2="315" stroke="var(--accent-2)" strokeWidth="1.2" markerEnd="url(#arrow-fc)" opacity="0.7" />
        <line x1="400" y1="240" x2="400" y2="290" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2 3" />

        <text x="240" y="80" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.5)">SSR</text>
        <text x="514" y="80" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.5)">POST</text>
        <text x="410" y="160" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.5)">enqueue</text>
        <text x="500" y="200" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.5)">dequeue</text>
        <text x="510" y="335" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.5)">writeback</text>
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
