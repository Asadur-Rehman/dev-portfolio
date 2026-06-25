"use client";

import {
  ArrowUpRight, Github, Video, Brain,
  ClipboardCheck, Users, FileSearch, Cpu, Mic, Award,
} from "lucide-react";
import { CaseStudyShell } from "./CaseStudyShell";
import {
  Chapter, StatStrip, CaseStudyHero, ClosingCta,
  DiagramBox, DiagramFrame,
  FeatureGrid, DecisionGrid, ChallengeList, SectionTitle, StackPills,
  primaryBtn,
} from "./shared";

const meta = {
  year: "2025",
  role: "Lead developer & architect · NUST SEECS Final Year Project",
  duration: "~4 months",
  stack: ["React", "Node.js", "Express", "MongoDB", "OpenAI API", "WebRTC", "TailwindCSS", "AWS"],
};

const stats = [
  { v: "4", k: "stages · JD → match → interview → score", icon: ClipboardCheck },
  { v: "AI", k: "interviewer + live evaluator", icon: Brain },
  { v: "Live", k: "video + dynamic questioning", icon: Video },
  { v: "FYP", k: "final year project · NUST SEECS", icon: Award },
];

const chapters = [
  { id: "problem", num: "01", label: "Problem" },
  { id: "pipeline", num: "02", label: "The pipeline" },
  { id: "ai-interview", num: "03", label: "AI interviewer" },
  { id: "decisions", num: "04", label: "Decisions" },
  { id: "tradeoffs", num: "05", label: "Tradeoffs" },
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
  { icon: FileSearch, title: "AI-generated job descriptions", body: "Paste a few bullet points; get a polished JD with role-specific skills, responsibilities, and qualifications." },
  { icon: Users, title: "Resume ↔ job matching", body: "Vector-based similarity between parsed resume features and the JD. Candidates are ranked, not just listed." },
  { icon: Mic, title: "Live AI interview", body: "Browser-native WebRTC video, real-time transcription, dynamic question generation, and live scoring against the role's rubric." },
  { icon: Cpu, title: "Integrated coding assessment", body: "Sandboxed editor + test-runner for technical roles. Auto-graded against hidden tests with per-case feedback." },
];

export function TalentScoutCaseStudy() {
  return (
    <CaseStudyShell chapters={chapters}>
      <CaseStudyHero
        title="Talent"
        highlight="Scout"
        description="A cloud-based AI recruitment platform that automates the hiring pipeline — from AI-generated job descriptions to live, evaluated AI interviews. My final year project at NUST SEECS."
        meta={meta}
        actions={
          <a href="https://github.com/Asadur-Rehman/TalentScout" target="_blank" rel="noopener noreferrer" className={primaryBtn}>
            <Github className="h-4 w-4" />
            Source on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        }
      />

      <StatStrip items={stats} />

      <Chapter id="problem" number="01" label="Problem">
        <SectionTitle>
          Recruitment burns hours <span className="text-gradient-accent">before anyone codes</span>.
        </SectionTitle>
        <div className="mt-6 grid md:grid-cols-2 gap-6 text-base text-muted-strong leading-relaxed">
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
        <SectionTitle>Four stages, one rubric, one transcript per candidate.</SectionTitle>
        <p className="mt-4 max-w-2xl text-base text-muted-strong leading-relaxed text-pretty">
          Recruiter defines a role. Resumes get parsed and ranked. Top candidates take an
          AI-conducted interview. The system writes back a structured evaluation. Recruiter
          reviews the shortlist with the receipts already attached.
        </p>
        <PipelineDiagram />
        <FeatureGrid items={features} />
        <StackPills items={meta.stack} />
      </Chapter>

      <Chapter id="ai-interview" number="03" label="AI interviewer">
        <SectionTitle>How an interview actually happens.</SectionTitle>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
          {[
            { n: "1", t: "Candidate joins", b: "Browser-native WebRTC, no install. Mic + cam permission, then a quick warm-up question." },
            { n: "2", t: "Live loop", b: "Speech → STT → LLM evaluation → LLM next-question → TTS. Streamed, so the next question feels conversational." },
            { n: "3", t: "Scoring", b: "Per-criterion reasoning persisted alongside the transcript. Recruiter sees the score and the why." },
          ].map((s) => (
            <div key={s.n} className="bg-surface-elevated px-5 py-5 h-full">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-accent">{s.n.padStart(2, "0")} — step</span>
              <h3 className="mt-2 font-display font-semibold text-lg text-foreground">{s.t}</h3>
              <p className="mt-1.5 text-sm text-muted-strong leading-relaxed">{s.b}</p>
            </div>
          ))}
        </div>
      </Chapter>

      <Chapter id="decisions" number="04" label="Decisions" tone="alt">
        <SectionTitle>Decisions worth keeping a paper trail on.</SectionTitle>
        <DecisionGrid items={decisions} />
      </Chapter>

      <Chapter id="tradeoffs" number="05" label="Tradeoffs">
        <SectionTitle>Where it got sharp.</SectionTitle>
        <ChallengeList items={challenges} />
      </Chapter>

      <ClosingCta siblings={{ prev: { href: "/work/flowcraft", label: "FlowCraft" } }} />
    </CaseStudyShell>
  );
}

function PipelineDiagram() {
  return (
    <DiagramFrame>
      <svg viewBox="0 0 800 220" className="w-full h-auto min-w-[640px]" role="img" aria-label="TalentScout hiring pipeline">
        <defs>
          <marker id="arrow-ts" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" opacity="0.7" />
          </marker>
        </defs>

        <DiagramBox x={20} y={70} w={170} h={80} title="Recruiter brief" sub="role + bullets" />
        <DiagramBox x={220} y={70} w={170} h={80} title="AI-generated JD" sub="OpenAI" tone="accent" />
        <DiagramBox x={420} y={70} w={170} h={80} title="Resume ranking" sub="vector match" />
        <DiagramBox x={620} y={70} w={170} h={80} title="AI interview" sub="live + scored" tone="accent" />

        <line x1="190" y1="110" x2="220" y2="110" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-ts)" opacity="0.7" />
        <line x1="390" y1="110" x2="420" y2="110" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-ts)" opacity="0.7" />
        <line x1="590" y1="110" x2="620" y2="110" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-ts)" opacity="0.7" />

        <text x={400} y={195} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--muted)" letterSpacing="3">
          STRUCTURED PIPELINE · one rubric, one transcript per candidate
        </text>
      </svg>
    </DiagramFrame>
  );
}
