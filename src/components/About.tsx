"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, Globe, Layers } from "lucide-react";
import { personal } from "@/data/personal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TextReveal } from "@/components/ui/TextReveal";
import { CountUp } from "@/components/ui/CountUp";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Portrait } from "@/components/ui/Portrait";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const stats = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "NUST SEECS '25",
    sub: "BS Software Engineering",
    accent: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/20",
    spotlightColor: "rgba(34, 211, 238, 0.08)",
  },
  {
    icon: Briefcase,
    label: "Currently",
    value: "Aurora Solutions",
    sub: "Software Engineer",
    accent: "text-violet-400",
    bg: "bg-violet-400/10 border-violet-400/20",
    spotlightColor: "rgba(167, 139, 250, 0.08)",
  },
  {
    icon: Layers,
    label: "Shipped",
    value: null,
    numericValue: 10,
    suffix: "+",
    unit: "projects",
    sub: "End-to-end",
    accent: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
    spotlightColor: "rgba(251, 191, 36, 0.08)",
  },
  {
    icon: Globe,
    label: "Working with",
    value: "Remote teams",
    sub: "PKT, flexible hours",
    accent: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
    spotlightColor: "rgba(52, 211, 153, 0.08)",
  },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <SectionDivider />
      <section
        id="about"
        ref={ref}
        className="relative py-24 sm:py-32 px-5 sm:px-10 lg:px-20 overflow-hidden"
        aria-labelledby="about-heading"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>

            <motion.p variants={fade} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">
              About
            </motion.p>

            <motion.h2
              id="about-heading"
              variants={fade}
              className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-foreground max-w-4xl"
            >
              A bit about how I work.
            </motion.h2>

            <motion.div variants={fade} className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-4">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:sticky lg:top-28"
                >
                  <Portrait
                    initials="AR"
                    caption={personal.firstName + " ur Rehman"}
                  />
                </motion.div>
              </div>

              <div className="lg:col-span-8 space-y-10">
                <div className="space-y-5 text-base sm:text-lg leading-relaxed text-muted-strong text-pretty">
                  <TextReveal
                    text={personal.bio}
                    className="text-base sm:text-lg leading-relaxed text-muted-strong text-pretty"
                  />
                  <TextReveal
                    text={personal.bioExtended}
                    className="text-base sm:text-lg leading-relaxed text-muted-strong text-pretty"
                  />
                  <TextReveal
                    text={personal.bioClose}
                    className="text-base sm:text-lg leading-relaxed text-foreground/90 font-medium text-pretty"
                  />
                </div>

                <motion.div
                  variants={container}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  className="grid grid-cols-2 gap-3 sm:gap-4"
                >
                  {stats.map((s) => {
                    const Icon = s.icon;
                    return (
                      <motion.div key={s.label} variants={cardReveal}>
                        <SpotlightCard
                          className="rounded-2xl h-full"
                          spotlightColor={s.spotlightColor}
                        >
                          <div className="glass p-5 rounded-2xl border-border/60 h-full">
                            <span className={`inline-grid h-9 w-9 place-items-center rounded-xl border mb-4 ${s.bg} ${s.accent}`}>
                              <Icon className="h-4 w-4" aria-hidden />
                            </span>
                            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1">{s.label}</p>
                            {s.value ? (
                              <p className={`font-display font-semibold text-sm sm:text-base leading-snug ${s.accent}`}>{s.value}</p>
                            ) : (
                              <p className={`font-display font-semibold text-sm sm:text-base leading-snug ${s.accent}`}>
                                <CountUp end={s.numericValue!} suffix={s.suffix} /> {s.unit}
                              </p>
                            )}
                            <p className="mt-0.5 text-xs text-muted">{s.sub}</p>
                          </div>
                        </SpotlightCard>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
