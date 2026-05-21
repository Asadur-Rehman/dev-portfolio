import type { Metadata } from "next";
import { SyncApiCaseStudy } from "@/components/case-studies/SyncApiCaseStudy";

export const metadata: Metadata = {
  title: "SyncAPI — case study",
  description:
    "A real-time collaborative API workspace built for developer teams. Realtime presence, shared collections, auto-generated documentation.",
};

export default function Page() {
  return <SyncApiCaseStudy />;
}
