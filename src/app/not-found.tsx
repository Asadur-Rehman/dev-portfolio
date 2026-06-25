"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/ui/CommandPalette";

export default function NotFound() {
  return (
    <>
      <CommandPalette />
      <Header />

      <main id="main-content" className="min-h-[70vh] flex items-center justify-center px-5 sm:px-8 lg:px-12 pt-28 pb-20">
        <div className="max-w-lg w-full text-center">
          <p className="font-mono text-sm text-accent mb-3">404</p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-foreground">
            Page not found
          </h1>
          <p className="mt-4 text-base text-muted-strong leading-relaxed">
            That URL doesn&apos;t exist. Head back to the homepage or jump to a section below.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/#projects", label: "Work" },
              { href: "/#experience", label: "Experience" },
              { href: "/#contact", label: "Contact" },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm text-muted-strong hover:text-accent hover:border-accent/30 transition-colors inline-flex items-center justify-between"
              >
                {s.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-border/60">
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-3">Case studies</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { href: "/work/syncapi", label: "SyncAPI" },
                { href: "/work/flowcraft", label: "FlowCraft" },
                { href: "/work/talentscout", label: "TalentScout" },
              ].map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-mono text-muted-strong hover:text-accent hover:border-accent/30 transition-colors"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
