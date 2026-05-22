import type { Metadata } from "next";
import { TalentScoutCaseStudy } from "@/components/case-studies/TalentScoutCaseStudy";

export const metadata: Metadata = {
  title: "TalentScout — case study",
  description:
    "A cloud-based AI recruitment platform — AI-generated JDs, resume↔job matching, and a real-time AI interviewer. NUST SEECS final-year project.",
};

export default function Page() {
  return <TalentScoutCaseStudy />;
}
