"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, Globe, Layers } from "lucide-react";
import { personal } from "@/data/personal";
import { CountUp } from "@/components/ui/CountUp";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Portrait } from "@/components/ui/Portrait";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const stats = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "NUST SEECS '25",
    sub: "BS Software Engineering",
  },
  {
    icon: Briefcase,
    label: "Currently",
    value: "Aurora Solutions",
    sub: "Software Engineer",
  },
  {
    icon: Layers,
    label: "Shipped",
    value: null,
    numericValue: 10,
    suffix: "+",
    unit: "projects",
    sub: "End-to-end",
  },
  {
    icon: Globe,
    label: "Working with",
    value: "Remote teams",
    sub: "US-friendly hours",
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
        className="relative py-20 sm:py-28 px-5 sm:px-8 lg:px-12 section-anchor"
        aria-labelledby="about-heading"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <motion.p variants={fade} className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">
              About
            </motion.p>

            <motion.h2
              id="about-heading"
              variants={fade}
              className="font-display font-bold text-balance text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground max-w-3xl"
            >
              How I work with product teams.
            </motion.h2>

            <motion.div variants={fade} className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <Portrait
                    initials="AR"
                    caption={personal.firstName + " ur Rehman"}
                  />
                </div>
              </div>

              <div className="lg:col-span-8 space-y-5">
                <p className="text-base sm:text-lg leading-relaxed text-muted-strong text-pretty">
                  {personal.bio}
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-muted-strong text-pretty">
                  {personal.bioExtended}
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-foreground font-medium text-pretty">
                  {personal.bioClose}
                </p>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
                  {stats.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.label}
                        className="rounded-xl border border-border bg-surface-elevated p-5 shadow-sm"
                      >
                        <span className="inline-grid h-9 w-9 place-items-center rounded-lg bg-accent-muted text-accent mb-3">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1">
                          {s.label}
                        </p>
                        {s.value ? (
                          <p className="font-display font-semibold text-sm sm:text-base leading-snug text-foreground">
                            {s.value}
                          </p>
                        ) : (
                          <p className="font-display font-semibold text-sm sm:text-base leading-snug text-foreground">
                            <CountUp end={s.numericValue!} suffix={s.suffix} /> {s.unit}
                          </p>
                        )}
                        <p className="mt-0.5 text-xs text-muted">{s.sub}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
