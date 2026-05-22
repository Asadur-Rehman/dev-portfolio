"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Command, ArrowUpRight, Github } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ShortcutsHelp } from "@/components/ui/ShortcutsHelp";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function NotFound() {
  return (
    <>
      <CustomCursor />
      <CommandPalette />
      <ShortcutsHelp />
      <Header />

      <main id="main-content" className="relative min-h-[80vh] flex items-center justify-center px-5 sm:px-10 lg:px-20 pt-24 sm:pt-32 pb-24 overflow-hidden">
        {/* atmosphere */}
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-accent/[0.08] blur-[120px]" />
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
        </div>

        <div className="relative max-w-2xl text-center">
          {/* huge 404 with subtle glitch */}
          <div className="relative inline-block" aria-hidden>
            <motion.span
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black leading-none tracking-tightest text-[8rem] xs:text-[10rem] sm:text-[14rem] md:text-[16rem] text-foreground/95"
            >
              404
            </motion.span>
            {/* offset color-layer glitch */}
            <span
              aria-hidden
              className="absolute inset-0 font-display font-black leading-none tracking-tightest text-[8rem] xs:text-[10rem] sm:text-[14rem] md:text-[16rem] text-accent/40 mix-blend-screen select-none pointer-events-none"
              style={{ transform: "translate(3px, 2px)" }}
            >
              404
            </span>
            <span
              aria-hidden
              className="absolute inset-0 font-display font-black leading-none tracking-tightest text-[8rem] xs:text-[10rem] sm:text-[14rem] md:text-[16rem] text-accent-2/30 mix-blend-screen select-none pointer-events-none"
              style={{ transform: "translate(-3px, -1px)" }}
            >
              404
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground"
          >
            Page not in production.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-md mx-auto text-base sm:text-lg text-muted-strong leading-relaxed"
          >
            Either this got renamed, never shipped, or you typed something I haven&apos;t built yet.
            Try the command palette or head home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-hover hover:shadow-glow transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to home
            </Link>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-5 py-3 text-sm font-mono text-muted-strong hover:text-accent hover:border-accent/40 transition-all"
            >
              <Command className="h-4 w-4" />
              Search
              <kbd className="ml-1 rounded border border-border bg-background/60 px-1 py-0.5 text-[0.6rem]">⌘</kbd>
              <kbd className="rounded border border-border bg-background/60 px-1 py-0.5 text-[0.6rem]">K</kbd>
            </button>
          </motion.div>

          {/* suggestions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto"
          >
            {[
              { href: "/#projects", label: "Selected work" },
              { href: "/#experience", label: "Experience" },
              { href: "/#contact", label: "Get in touch" },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-2xl border border-border bg-surface/40 px-4 py-3 text-sm text-muted-strong hover:text-accent hover:border-accent/40 transition-all inline-flex items-center justify-between"
              >
                <span>{s.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </motion.div>

          {/* footer hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted/60"
          >
            <span className="inline-flex items-center gap-2">
              <Github className="h-3 w-3" />
              <a href="https://github.com/Asadur-Rehman/dev-portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                view source
              </a>
            </span>
          </motion.p>
        </div>
      </main>

      <Footer />
    </>
  );
}
