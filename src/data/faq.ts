export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "engagement",
    question: "How do you usually engage with clients?",
    answer:
      "Two ways. Fixed-scope projects with a clear deliverable and milestone-based invoicing, or weekly retainers (20–25 hrs/week) for longer engagements where the scope evolves. I'll suggest whichever fits your situation honestly — the wrong model wastes both our time.",
  },
  {
    id: "rates",
    question: "What are your rates?",
    answer:
      "Project quotes start at around $2.5k for small MVPs and scale with scope. Retainers are billed weekly. I'll send a real number once I understand what you're building — generic rate sheets tend to be wrong in both directions.",
  },
  {
    id: "timezone",
    question: "I'm in the US / EU. Will the timezone work?",
    answer:
      "Yes. I'm in PKT (UTC+5) and keep flexible hours — I overlap with EU mornings and US East Coast mornings comfortably. Async-first by default (Loom, Linear, Slack), with sync calls when something needs whiteboarding.",
  },
  {
    id: "stack",
    question: "Are you flexible on the tech stack?",
    answer:
      "Yes, within reason. Next.js + Node/NestJS + Postgres/Mongo is where I'm fastest, but I've shipped FastAPI / Python services, MERN stacks, and Firebase backends. If you have an existing stack, I work in it. If you don't, I'll recommend one and tell you why.",
  },
  {
    id: "ai-features",
    question: "I want to add an AI feature. Where do we start?",
    answer:
      "With the problem, not the model. We figure out whether retrieval, agents, or a single well-prompted call solves it — then I build the cheapest version that works, with evaluation baked in so you can tell when it regresses. OpenAI, Claude, and open-source models are all fair game.",
  },
  {
    id: "team",
    question: "Do you work solo or with a team?",
    answer:
      "Solo by default — you get a single accountable owner end-to-end. For larger builds I can bring in a trusted designer or a second engineer I've worked with before, with rates and scope transparent up front.",
  },
  {
    id: "response",
    question: "What's your response time?",
    answer:
      "Inbound emails: within 24 hours on weekdays, usually faster. Once we're engaged, async updates daily and a synchronous Friday review by default. If something is on fire, send a WhatsApp — I won't pretend I'm offline.",
  },
  {
    id: "ip",
    question: "Who owns the code I pay for?",
    answer:
      "You do. All code, designs, and assets transfer to you on final payment, with no embedded license restrictions. Standard MSA / NDA on request — I sign yours or send a simple template if you'd prefer.",
  },
];
