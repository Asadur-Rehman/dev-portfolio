"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { TechConstellation } from "@/components/ui/TechConstellation";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const marqueeTokens = ["TypeScript","Next.js","React","Node.js","NestJS","Python","FastAPI","OpenAI","MongoDB","PostgreSQL","Firebase","Tailwind","FAISS","LangChain","WebRTC","Docker"];

export function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <>
      <SectionDivider />
      <section id="tech" ref={ref} className="relative py-24 sm:py-36 px-5 sm:px-10 lg:px-20 border-y border-border/60 bg-background-2/40 overflow-hidden" aria-labelledby="tech-heading">
        {/* Orbit ring */}
        <div className="absolute top-20 right-10 w-72 h-72 pointer-events-none hidden lg:block" aria-hidden>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-full h-full rounded-full border border-accent/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/40 shadow-glow-sm" />
          </motion.div>
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-6 rounded-full border border-accent-2/10">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-2/40" />
          </motion.div>
        </div>

        <motion.div style={{ y }} className="max-w-7xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">02 — Stack</motion.p>
            <motion.h2 id="tech-heading" variants={item} className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-foreground max-w-4xl">
              Tools I reach for <span className="text-gradient-accent">when work needs to ship</span>.
            </motion.h2>
            <motion.p variants={item} className="mt-5 max-w-2xl text-base sm:text-lg text-muted-strong">
              A pragmatic toolkit for full-stack systems and AI-powered products. Each dot is a tool I&apos;ve put through production — hover the constellation to map the territory.
            </motion.p>

            <motion.div variants={item} className="mt-12 sm:mt-14">
              <TechConstellation />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Dual marquee */}
        <div className="mt-20 -mx-5 sm:-mx-10 lg:-mx-20 overflow-hidden space-y-4">
          {/* Row 1 — left */}
          <div className="relative select-none">
            <div className="absolute inset-y-0 left-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-background-2 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-background-2 to-transparent pointer-events-none" />
            <div className="flex animate-marquee whitespace-nowrap will-change-transform">
              {[...marqueeTokens, ...marqueeTokens].map((t, i) => (
                <span key={`${t}-${i}`} className="mx-6 font-display text-2xl sm:text-4xl font-bold text-foreground/[0.08] hover:text-accent/50 transition-colors duration-300">
                  {t}<span className="ml-10 text-accent/20">/</span>
                </span>
              ))}
            </div>
          </div>
          {/* Row 2 — right (reverse) */}
          <div className="relative select-none">
            <div className="absolute inset-y-0 left-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-background-2 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-background-2 to-transparent pointer-events-none" />
            <div className="flex animate-marquee-reverse whitespace-nowrap will-change-transform">
              {[...[...marqueeTokens].reverse(), ...[...marqueeTokens].reverse()].map((t, i) => (
                <span key={`${t}-r-${i}`} className="mx-6 font-display text-xl sm:text-3xl font-bold text-foreground/[0.05] hover:text-accent-2/40 transition-colors duration-300">
                  {t}<span className="ml-10 text-accent-2/15">/</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
