"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { personal } from "@/data/personal";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
  const [activeSection, setActiveSection] = useState("");

  const onScroll = useCallback(() => {
    const y   = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setScrolled(y > 24);
    setProgress(max > 0 ? (y / max) * 100 : 0);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["about", "tech", "projects", "experience", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/75 backdrop-blur-xl border-b border-border/80 shadow-lg shadow-black/20" : "bg-transparent"
      }`}
      role="banner"
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-accent via-accent-2 to-accent"
        style={{ width: `${progress}%`, opacity: scrolled ? 1 : 0 }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 flex items-center justify-between h-16 sm:h-20">
        {/* Logo with spin on hover */}
        <Link
          href="#hero"
          className="group inline-flex items-center gap-2.5 font-display font-bold text-foreground hover:text-accent transition-colors"
          aria-label="Home"
        >
          <motion.span
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid h-8 w-8 place-items-center rounded-lg bg-accent/10 border border-accent/25 text-accent font-mono text-sm group-hover:bg-accent group-hover:text-background transition-all duration-300"
          >
            A
          </motion.span>
          <span className="hidden sm:inline tracking-tight text-sm">
            {personal.name.split(" ")[0]}
            <span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-accent"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {/* Active indicator background */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-accent/10 border border-accent/20"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className={`relative font-mono text-[0.6rem] transition-colors ${
                      isActive ? "text-accent" : "text-accent/60 group-hover:text-accent"
                    }`}>
                      {link.num}
                    </span>
                    <span className="relative">{link.label}</span>

                    {/* Sliding underline on hover */}
                    <span
                      className={`absolute -bottom-0.5 left-4 right-4 h-px origin-left transition-transform duration-300 ${
                        isActive ? "scale-x-100 bg-accent" : "scale-x-0 bg-accent/60 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <MagneticButton strength={0.25}>
            <Link
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-foreground/95 px-5 py-2.5 text-sm font-semibold text-background hover:bg-accent transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:shadow-glow-sm"
            >
              Hire me
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-muted hover:text-accent hover:bg-surface/60 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
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
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 py-3.5 text-base font-medium transition-colors border-b border-border/50 last:border-0 ${
                        activeSection === link.href ? "text-accent" : "text-muted-strong hover:text-accent"
                      }`}
                    >
                      <span className="font-mono text-xs text-accent/70 w-6">{link.num}</span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  className="pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  <Link
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-background w-full hover:bg-accent-hover transition-colors"
                  >
                    Hire me
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
