"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, Github, Video, Brain,
  ClipboardCheck, Users, FileSearch, Cpu, Mic, Award,
} from "lucide-react";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ShortcutsHelp } from "@/components/ui/ShortcutsHelp";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CaseStudyToc } from "./CaseStudyToc";
import { Chapter, StatStrip, MetaStrip, fade, container } from "./shared";

const meta = {
  year: "2025",
  role: "Lead developer & architect · NUST SEECS Final Year Project",
  duration: "~4 months",
  stack: ["React", "Node.js", "Express", "MongoDB", "OpenAI API", "WebRTC", "TailwindCSS", "AWS"],
};

const stats = [
  { v: "4",     k: "stages · JD → match → interview → score", icon: ClipboardCheck },
  { v: "AI",    k: "interviewer + live evaluator",            icon: Brain },
  { v: "Live",  k: "video + dynamic questioning",              icon: Video },
  { v: "FYP",   k: "final year project · NUST SEECS",         icon: Award },
];

const chapters = [
  { id: "problem",      num: "01", label: "Problem" },
  { id: "pipeline",     num: "02", label: "The pipeline" },
  { id: "ai-interview", num: "03", label: "AI interviewer" },
  { id: "decisions",    num: "04", label: "Decisions" },
  { id: "tradeoffs",    num: "05", label: "Tradeoffs" },
];

const decisions: { title: string; body: string; tone: "accent" | "muted" }[] = [
  {
    title: "Why an AI interviewer at all",
    body: "Early-stage technical interviews are a scheduling tax. Recruiters either skip them and over-trust resumes, or burn engineer hours on candidates who won't progress. An AI interview standardizes the first pass and lets human time concentrate where it actually matters.",
    tone: "accent",
  },
  {
    title: "Why MERN over Next.js",
    body: "Decoupled React + Express let me iterate on the AI service independently of the recruiter dashboard, and let the WebRTC peer signaling stay close to the API layer. Mongo's flexibility handled the variable shape of interview transcripts and evaluation rubrics without schema gymnastics.",
    tone: "muted",
  },
  {
    title: "Why WebRTC + browser-native audio",
    body: "No installs, no plugins. The candidate joins from a link in any modern browser. WebRTC handles the media pipeline; the server only sees signaling traffic. Audio is captured, transcribed, fed to the LLM, and the next question is generated in roughly conversational time.",
    tone: "accent",
  },
  {
    title: "Why dynamic question generation",
    body: "A static question bank stops working the moment candidates share answers. Generating each question from the role description + previous answers means no two interviews are identical, and the model can dig into a strong claim or a vague one in real time.",
    tone: "muted",
  },
];

const challenges = [
  {
    title: "Latency in the question-generation loop",
    body: "Candidate speaks → STT → LLM evaluation → LLM next-question → TTS back is a chain of slow steps. Cut perceived latency by streaming the model's response and starting TTS on the first sentence, and by running STT and evaluation in parallel rather than series.",
  },
  {
    title: "Fair, repeatable evaluation",
    body: "An AI score is suspicious unless you can show your work. Every evaluation persists the rubric used, the candidate's transcript, and the model's per-criterion reasoning. Recruiters see the breakdown — not just the number — so an objection has somewhere to land.",
  },
  {
    title: "The coding assessment integration",
    body: "Technical roles need code, not just talk. Built a sandboxed code-editor with auto-grading on a hidden test suite. The candidate sees pass/fail per case; the recruiter sees runtime, memory, and approach summary. Same evaluation rubric applies — score it, explain it, store it.",
  },
];

const features = [
  { icon: FileSearch,     title: "AI-generated job descriptions", body: "Paste a few bullet points; get a polished JD with role-specific skills, responsibilities, and qualifications." },
  { icon: Users,          title: "Resume ↔ job matching",         body: "Vector-based similarity between parsed resume features and the JD. Candidates are ranked, not just listed." },
  { icon: Mic,            title: "Live AI interview",             body: "Browser-native WebRTC video, real-time transcription, dynamic question generation, and live scoring against the role's rubric." },
  { icon: Cpu,            title: "Integrated coding assessment",  body: "Sandboxed editor + test-runner for technical roles. Auto-graded against hidden tests with per-case feedback." },
];

export function TalentScoutCaseStudy() {
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
              <span className="text-foreground">Talent</span>
              <span className="text-gradient-accent">Scout</span>
              <span className="text-accent">.</span>
            </motion.h1>
            <motion.p variants={fade} className="mt-6 max-w-2xl text-lg sm:text-xl text-muted-strong leading-relaxed text-pretty">
              A cloud-based AI recruitment platform that automates the hiring pipeline — from
              AI-generated job descriptions to live, evaluated AI interviews. My final year project at
              NUST SEECS.
            </motion.p>

            <motion.div variants={fade} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/Asadur-Rehman/TalentScout"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-hover hover:shadow-glow transition-all hover:scale-[1.03] active:scale-[0.97]"
              >
                <Github className="h-4 w-4" />
                Source on GitHub
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        <StatStrip items={stats} />

        <Chapter id="problem" number="01" label="Problem">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground max-w-3xl">
            Recruitment burns hours <span className="text-gradient-accent">before anyone codes</span>.
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-8 text-base sm:text-lg text-muted-strong leading-relaxed">
            <p>
              The first 80% of hiring is structural: writing a JD, ranking resumes, scheduling phone
              screens, normalizing notes. None of it is judgment work — and yet it consumes the
              recruiters and engineers who&apos;d be better used on the final 20% where the actual
              hire/no-hire decision lives.
            </p>
            <p>
              TalentScout collapses the structural layer. JDs are generated from a brief, resumes
              are ranked by semantic match, and the first technical pass is an AI-conducted
              interview with a defensible rubric. By the time a human engineer joins the loop,
              there&apos;s a transcript, a score breakdown, and a shortlist worth their attention.
            </p>
          </div>
        </Chapter>

        <Chapter id="pipeline" number="02" label="The pipeline" tone="alt">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground max-w-3xl">
            Four stages, one rubric, one transcript per candidate.
          </h2>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-strong leading-relaxed">
            Recruiter defines a role. Resumes get parsed and ranked. Top candidates take an
            AI-conducted interview. The system writes back a structured evaluation. Recruiter
            reviews the shortlist with the receipts already attached.
          </p>

          <PipelineDiagram />

          <div className="mt-12 grid sm:grid-cols-2 gap-5">
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

          <div className="mt-12 flex flex-wrap items-center gap-2">
            {meta.stack.map((s) => (
              <span key={s} className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-mono text-muted-strong">{s}</span>
            ))}
          </div>
        </Chapter>

        <Chapter id="ai-interview" number="03" label="AI interviewer">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground max-w-3xl">
            How an interview actually happens.
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border/60">
            {[
              { n: "1", t: "Candidate joins",  b: "Browser-native WebRTC, no install. Mic + cam permission, then a quick warm-up question." },
              { n: "2", t: "Live loop",        b: "Speech → STT → LLM evaluation → LLM next-question → TTS. Streamed, so the next question feels conversational." },
              { n: "3", t: "Scoring",          b: "Per-criterion reasoning persisted alongside the transcript. Recruiter sees the score and the why." },
            ].map((s) => (
              <div key={s.n} className="bg-surface/40 px-5 py-6 hover:bg-surface/70 transition-colors">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-accent">{s.n.padStart(2, "0")} — step</span>
                <h3 className="mt-2 font-display font-semibold text-lg text-foreground">{s.t}</h3>
                <p className="mt-1.5 text-sm text-muted-strong leading-relaxed">{s.b}</p>
              </div>
            ))}
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
          Want the full demo or the rubric design rationale?
        </h2>
        <p className="mt-5 text-base sm:text-lg text-muted-strong leading-relaxed">
          Happy to walk through the evaluation framework, the WebRTC plumbing, or any architectural decision.
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

function PipelineDiagram() {
  return (
    <div className="mt-10 relative rounded-2xl border border-border bg-surface/40 p-6 sm:p-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
      <svg viewBox="0 0 800 220" className="relative w-full h-auto">
        <defs>
          <marker id="arrow-ts" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" opacity="0.7" />
          </marker>
        </defs>

        <PBox x={20}  y={70} w={170} h={80} title="Recruiter brief"  sub="role + bullets" />
        <PBox x={220} y={70} w={170} h={80} title="AI-generated JD"  sub="OpenAI" tone="accent" />
        <PBox x={420} y={70} w={170} h={80} title="Resume ranking"   sub="vector match" />
        <PBox x={620} y={70} w={170} h={80} title="AI interview"     sub="live + scored" tone="accent" />

        <line x1="190" y1="110" x2="220" y2="110" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-ts)" opacity="0.7" />
        <line x1="390" y1="110" x2="420" y2="110" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-ts)" opacity="0.7" />
        <line x1="590" y1="110" x2="620" y2="110" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-ts)" opacity="0.7" />

        <text x="400" y="195" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="rgba(255,255,255,0.45)" letterSpacing="3">
          STRUCTURED PIPELINE · one rubric, one transcript per candidate
        </text>
      </svg>
    </div>
  );
}

function PBox({
  x, y, w, h, title, sub, tone = "default",
}: {
  x: number; y: number; w: number; h: number;
  title: string; sub: string;
  tone?: "default" | "accent";
}) {
  const stroke = tone === "accent" ? "var(--accent)" : "rgba(255,255,255,0.25)";
  const fill   = tone === "accent" ? "rgba(255,106,61,0.06)" : "rgba(255,255,255,0.035)";
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth="1" />
      <text x={x + 14} y={y + 32} fontFamily="var(--font-display)" fontWeight="700" fontSize="14" fill="var(--foreground)">{title}</text>
      <text x={x + 14} y={y + 54} fontFamily="var(--font-mono)" fontSize="10" fill="rgba(255,255,255,0.55)">{sub}</text>
    </g>
  );
}
