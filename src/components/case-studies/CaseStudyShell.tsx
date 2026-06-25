"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { CaseStudyToc, type TocChapter } from "./CaseStudyToc";

export function CaseStudyShell({
  chapters,
  children,
}: {
  chapters: TocChapter[];
  children: React.ReactNode;
}) {
  return (
    <>
      <CommandPalette />
      <Header />
      <CaseStudyToc chapters={chapters} />
      <main id="main-content" className="pt-[4.25rem] sm:pt-[4.25rem] xl:pr-[10.5rem]">
        {children}
      </main>
      <Footer />
    </>
  );
}
