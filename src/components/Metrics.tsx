"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { metrics } from "@/data/metrics";
import { CountUp } from "@/components/ui/CountUp";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function Metrics() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-label="Key metrics"
      className="relative px-5 sm:px-10 lg:px-20 -mt-4 sm:-mt-8 pb-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.dl
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm p-5 sm:p-6"
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.id}
              variants={item}
              className={`relative px-3 py-2 ${
                i > 0 ? "lg:border-l lg:border-border/60" : ""
              } ${i === 2 ? "lg:border-l lg:border-border/60" : ""}`}
            >
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted mb-2">
                {m.label}
              </dt>
              <dd className="font-display font-bold text-3xl sm:text-4xl text-gradient-accent leading-none">
                <CountUp
                  end={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                />
              </dd>
              <p className="mt-2 text-xs text-muted-strong leading-relaxed">{m.sub}</p>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
