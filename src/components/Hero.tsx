"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { personal } from "@/data/personal";
import { Button } from "@/components/ui/Button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-24 pb-16 overflow-hidden"
      aria-label="Hero"
    >
      {/* Subtle animated background - gradient mesh */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[80px]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl"
      >
        {/* Availability badge */}
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-muted px-4 py-2 mb-8"
        >
          <span
            className="relative flex h-2 w-2"
            aria-hidden
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm font-medium text-foreground">
            {personal.availability}
          </span>
        </motion.div>

        <motion.p
          variants={item}
          className="font-display text-accent text-lg sm:text-xl mb-2 font-mono"
        >
          Hi, I&apos;m {personal.name}
        </motion.p>
        <motion.h1
          variants={item}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4"
        >
          Full-Stack Developer
        </motion.h1>
        <motion.p
          variants={item}
          className="text-lg sm:text-xl text-muted max-w-2xl mb-10"
        >
          {personal.headline}
        </motion.p>
        <motion.div variants={item}>
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="group"
          >
            View Projects
            <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-0.5" aria-hidden />
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={scrollToProjects}
          className="flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          aria-label="Scroll to projects"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
