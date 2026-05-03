"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, Globe, Layers } from "lucide-react";
import { personal } from "@/data/personal";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const stats = [
  { icon: GraduationCap, label: "Education", value: "NUST SEECS", sub: "Sub-5% acceptance" },
  { icon: Briefcase, label: "Currently", value: "Aurora Solutions", sub: "Software Engineer" },
  { icon: Layers, label: "Production projects", value: "10+", sub: "Shipped end-to-end" },
  { icon: Globe, label: "Open to", value: "Remote, global", sub: "Senior IC roles" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-20" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
          <motion.p variants={fade} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">01 — About</motion.p>
          <motion.h2
            id="about-heading"
            variants={fade}
            className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl tracking-tighter text-foreground max-w-3xl"
          >
            I build software that <span className="text-gradient-accent">earns its place</span> in production.
          </motion.h2>

          <motion.div variants={fade} className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-muted-strong text-pretty">
              <p>{personal.bio}</p>
              <p>{personal.bioExtended}</p>
              <p className="text-foreground/90">{personal.bioClose}</p>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <motion.div key={s.label} variants={fade} className="group relative rounded-2xl glass p-5 hover:border-accent/40 transition-colors">
                      <Icon className="h-5 w-5 text-accent mb-3 group-hover:scale-110 transition-transform" aria-hidden />
                      <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">{s.label}</p>
                      <p className="mt-1 font-display font-semibold text-foreground text-base sm:text-lg">{s.value}</p>
                      <p className="mt-1 text-xs text-muted">{s.sub}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
