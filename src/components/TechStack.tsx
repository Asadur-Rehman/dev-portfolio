"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { TechConstellation } from "@/components/ui/TechConstellation";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <SectionDivider />
      <section
        id="tech"
        ref={ref}
        className="relative py-24 sm:py-32 px-5 sm:px-10 lg:px-20 border-y border-border/60 bg-background-2/40 overflow-hidden"
        aria-labelledby="tech-heading"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">
              Stack
            </motion.p>
            <motion.h2
              id="tech-heading"
              variants={item}
              className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-foreground max-w-4xl"
            >
              What I work with.
            </motion.h2>
            <motion.p variants={item} className="mt-5 max-w-2xl text-base sm:text-lg text-muted-strong">
              Tools I&apos;ve used in production. Hover any dot in the constellation for a closer look.
            </motion.p>

            <motion.div variants={item} className="mt-12 sm:mt-14">
              <TechConstellation />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
