"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { personal } from "@/data/personal";

const navLinks = [
  { href: "#about",      label: "About",      num: "01" },
  { href: "#tech",       label: "Stack",       num: "02" },
  { href: "#projects",   label: "Work",        num: "03" },
  { href: "#experience", label: "Experience",  num: "04" },
  { href: "#contact",    label: "Contact",     num: "05" },
];

export function Header() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/75 backdrop-blur-xl border-b border-border/80" : "bg-transparent"
      }`}
      role="banner"
    >
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-px bg-accent transition-all duration-150 ease-out"
        style={{ width: `${progress}%`, opacity: scrolled ? 1 : 0 }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <Link
          href="#hero"
          className="group inline-flex items-center gap-2.5 font-display font-bold text-foreground hover:text-accent transition-colors"
          aria-label="Home"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/10 border border-accent/25 text-accent font-mono text-sm group-hover:bg-accent group-hover:text-background transition-all duration-300">
            A
          </span>
          <span className="hidden sm:inline tracking-tight text-sm">
            {personal.name.split(" ")[0]}
            <span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-muted hover:text-foreground hover:bg-surface/60 transition-all duration-200"
                >
                  <span className="font-mono text-[0.6rem] text-accent/60 group-hover:text-accent transition-colors">
                    {link.num}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-foreground/95 px-5 py-2.5 text-sm font-semibold text-background hover:bg-accent transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            Hire me
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-muted hover:text-accent hover:bg-surface/60 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-background/96 backdrop-blur-2xl border-b border-border overflow-hidden"
          >
            <nav aria-label="Mobile navigation">
              <ul className="px-5 pt-2 pb-4 flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 py-3.5 text-base font-medium text-muted-strong hover:text-accent transition-colors border-b border-border/50 last:border-0"
                    >
                      <span className="font-mono text-xs text-accent/70 w-6">{link.num}</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4">
                  <Link
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-background w-full hover:bg-accent-hover transition-colors"
                  >
                    Hire me
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
