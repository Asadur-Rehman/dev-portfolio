export interface Metric {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
}

export const metrics: Metric[] = [
  {
    id: "projects",
    value: 10,
    suffix: "+",
    label: "Production projects shipped",
    sub: "End-to-end, in real codebases",
  },
  {
    id: "years",
    value: 3,
    suffix: "+",
    label: "Years building for the web",
    sub: "From freelance MVPs to enterprise SaaS",
  },
  {
    id: "stack",
    value: 40,
    suffix: "+",
    label: "Tools across the stack",
    sub: "Frontend, backend, data, AI, DevOps",
  },
  {
    id: "uptime",
    value: 100,
    suffix: "%",
    label: "On-time delivery to date",
    sub: "I'd rather scope smaller than miss",
  },
];
