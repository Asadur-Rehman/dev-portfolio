import type { Metadata } from "next";
import { FlowCraftCaseStudy } from "@/components/case-studies/FlowCraftCaseStudy";

export const metadata: Metadata = {
  title: "FlowCraft — case study",
  description:
    "A visual workflow builder where AI is a first-class node. Drag, connect, and trigger pipelines backed by a real queue.",
};

export default function Page() {
  return <FlowCraftCaseStudy />;
}
