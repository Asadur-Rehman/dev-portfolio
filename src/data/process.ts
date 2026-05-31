export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export const process: ProcessStep[] = [
  {
    id: "discovery",
    step: "01",
    title: "Discovery & scope",
    duration: "Day 0 — 2",
    description:
      "We jump on a call to talk through what you're building, what success looks like, and what the constraints are. I leave with enough to write a real proposal — not a pricing PDF generated before I understand the problem.",
    deliverables: [
      "30-min intro call",
      "Written scope + milestones",
      "Fixed-price or weekly retainer quote",
    ],
  },
  {
    id: "plan",
    step: "02",
    title: "Plan & architecture",
    duration: "Week 1",
    description:
      "I write up the architecture — data model, API surface, third-party integrations, auth model, deployment target — and we agree on it before I touch a single file. Catching design issues here is cheap; catching them in production is not.",
    deliverables: [
      "System design doc",
      "Tech stack confirmed",
      "Repo + CI scaffolded",
    ],
  },
  {
    id: "build",
    step: "03",
    title: "Build in slices",
    duration: "Week 2 — N",
    description:
      "I ship in weekly slices, each one a working end-to-end vertical you can click through on a preview URL. No 'big reveal' four weeks in. You see progress every Friday, give feedback Monday, and we adjust the next slice.",
    deliverables: [
      "Weekly deployable build",
      "Loom walkthrough every Friday",
      "Async standup in Slack / email",
    ],
  },
  {
    id: "ship",
    step: "04",
    title: "Harden & ship",
    duration: "Final week",
    description:
      "Tests, error monitoring, performance pass, SEO, accessibility, and a deployment runbook. I don't disappear once it's live — I stick around for the first two weeks of production to fix the things you only find with real traffic.",
    deliverables: [
      "Production deploy + runbook",
      "Monitoring + error tracking wired",
      "2 weeks of post-launch support",
    ],
  },
];
