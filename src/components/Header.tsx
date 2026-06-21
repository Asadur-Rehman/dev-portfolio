"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { personal } from "@/data/personal";

/** Primary nav — shown on desktop */
const primaryNav = [
  { href: "/#about", label: "About", id: "about" },
  { href: "/#projects", label: "Work", id: "projects" },
  { href: "/#services", label: "Services", id: "services" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

/** Full nav — mobile menu + footer */
const allNav = [
  ...primaryNav.slice(0, 2),
  { href: "/#tech", label: "Stack", id: "tech" },
  ...primaryNav.slice(2),
  { href: "/#process", label: "Process", id: "process" },
  { href: "/#faq", label: "FAQ", id: "faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 16);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    const sectionIds = allNav.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(`/#${id}`);
        },
        { rootMargin: "-28% 0px -58% 0px", threshold: 0.1 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "bg-[rgba(227,224,218,0.88)] backdrop-blur-xl border-b border-border/80 shadow-[0_1px_0_rgba(20,18,16,0.04),0_8px_24px_-12px_rgba(20,18,16,0.12)]"
          : "bg-transparent border-b border-transparent"
      }`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-[4.25rem]">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-display font-bold text-[0.9375rem] text-foreground hover:text-accent"
          aria-label="Home"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-surface-elevated border border-border text-accent font-mono text-sm shadow-sm">
            A
          </span>
          <span className="hidden sm:inline tracking-tight">
            {personal.name.split(" ")[0]}
            <span className="text-accent">.</span>
          </span>
        </Link>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link inline-flex items-center rounded-lg px-3 py-2.5"
                  data-active={activeSection === link.href ? "true" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-[0.8125rem] font-semibold text-surface-elevated hover:bg-accent"
          >
            Hire me
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 rounded-lg text-muted-strong hover:text-foreground hover:bg-surface-elevated/80"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden border-t border-border/80 bg-[rgba(227,224,218,0.96)] backdrop-blur-xl overflow-hidden"
          >
            <nav aria-label="Mobile navigation">
              <ul className="px-5 py-3 flex flex-col max-h-[70vh] overflow-y-auto">
                {allNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center py-3 text-[0.9375rem] font-medium border-b border-border/50 last:border-0 ${
                        activeSection === link.href
                          ? "text-accent"
                          : "text-muted-strong hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4 pb-2">
                  <Link
                    href="/#contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white w-full hover:bg-accent-hover"
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
