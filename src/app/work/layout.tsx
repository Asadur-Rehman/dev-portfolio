import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s — Asad ur Rehman",
    default: "Case study — Asad ur Rehman",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
