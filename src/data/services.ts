export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  exampleProjectIds?: string[];
}

export const services: Service[] = [
  {
    id: "fullstack-mvp",
    title: "Full-stack web apps & MVPs",
    tagline: "From wireframe to deployed product",
    description:
      "I take product ideas from spec to live URL. Typically Next.js or MERN, with the boring bits (auth, payments, file uploads, dashboards) handled cleanly so you can focus on what your product actually does.",
    bullets: [
      "Multi-tenant SaaS with RBAC, billing, and admin tooling",
      "Internal dashboards and admin panels",
      "Marketing site + product app in one codebase",
    ],
    exampleProjectIds: ["arcadia", "kaloriekompass", "syncapi"],
  },
  {
    id: "ai-integration",
    title: "AI features in existing products",
    tagline: "RAG, agents, evaluations",
    description:
      "Adding AI features to existing apps — usually OpenAI or open-source models behind a clean abstraction, with evaluation, cost controls, and a way to tune prompts without redeploying.",
    bullets: [
      "RAG over your docs / data with vector search",
      "Agent workflows and tool-using LLM pipelines",
      "Evaluated LLM features with auditable outputs",
    ],
    exampleProjectIds: ["talentscout", "rag-chatbot", "flowcraft"],
  },
  {
    id: "realtime",
    title: "Real-time & collaborative features",
    tagline: "Presence, live editing, multiplayer",
    description:
      "Live-updating UIs done correctly — Socket.io or websockets backed by Redis, presence indicators, optimistic updates, and the room/auth model to support them.",
    bullets: [
      "Live presence + activity feeds",
      "Collaborative editing with conflict handling",
      "Background jobs, queues, and async pipelines",
    ],
    exampleProjectIds: ["syncapi", "flowcraft"],
  },
];
