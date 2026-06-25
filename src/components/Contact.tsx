"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github, Linkedin, Mail, Send, Loader2,
  Phone, ArrowUpRight, CheckCircle2, AlertTriangle, Briefcase, Download,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { personal } from "@/data/personal";
import { linkedIn, socialLinks } from "@/data/socials";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ResponsiveLinkedInBadge } from "@/components/ui/LinkedInBadge";

const iconMap: Record<string, LucideIcon> = {
  github: Github, linkedin: Linkedin, email: Mail, upwork: Briefcase,
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const inputCls =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 transition-all duration-300 input-glow hover:border-border-strong focus:border-accent";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey || accessKey === "your_web3forms_access_key") {
      setStatus("error");
      setErrorMessage("Email service not configured yet. Please email me directly at " + personal.email);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio inquiry from ${data.name}`,
          from_name: data.name,
          name: data.name,
          email: data.email,
          message: data.message,
          botcheck: data.botcheck,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again or email me directly.");
    }
  }

  return (
    <>
      <SectionDivider />
      <section id="contact" ref={ref} className="relative py-20 sm:py-28 px-5 sm:px-8 lg:px-12 section-anchor border-t border-border/70" aria-labelledby="contact-heading">
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden />

        <div className="max-w-6xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <motion.p variants={fade} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">Contact</motion.p>

            <motion.h2 id="contact-heading" variants={fade} className="font-display font-bold text-balance text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground max-w-3xl">
              Get in touch.
            </motion.h2>

            <motion.p variants={fade} className="mt-5 max-w-2xl text-base sm:text-lg text-muted-strong">
              Have a project, a role, or a question? Send a message and I&apos;ll get back to you — usually within a few hours, always within 24 on weekdays.
            </motion.p>

            <motion.div
              variants={fade}
              className="mt-6 flex flex-wrap gap-2"
              aria-label="Response commitments"
            >
              {[
                "Reply within 24h on weekdays",
                "Honest scope, no fluff",
                "NDA / MSA signed before scope",
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-3 py-1.5 text-xs text-muted-strong"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70" aria-hidden />
                  {badge}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fade} className="mt-12 sm:mt-14 grid lg:grid-cols-5 gap-8 sm:gap-10 items-start">
              {/* Form */}
              <form onSubmit={handleSubmit} className="lg:col-span-3 self-start w-full rounded-xl border border-border bg-surface-elevated p-6 sm:p-8 space-y-5 shadow-sm" noValidate>
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden />

                <div className="group">
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-widest text-muted mb-2 group-focus-within:text-accent transition-colors">Your name</label>
                  <input id="contact-name" name="name" type="text" required className={inputCls} placeholder="Jane Doe" />
                </div>

                <div className="group">
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-widest text-muted mb-2 group-focus-within:text-accent transition-colors">Email</label>
                  <input id="contact-email" name="email" type="email" required className={inputCls} placeholder="you@company.com" />
                </div>

                <div className="group">
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-widest text-muted mb-2 group-focus-within:text-accent transition-colors">Message</label>
                  <textarea id="contact-message" name="message" required rows={6} className={`${inputCls} resize-none`} placeholder="Tell me about the project, role, or problem you want to solve…" />
                </div>

                {status === "success" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex items-start gap-2.5 rounded-xl border p-4 text-sm alert-success">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" aria-hidden /><span>Thanks, message received. I&apos;ll reply within a day or two.</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex items-start gap-2.5 rounded-xl border p-4 text-sm alert-error">
                    <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden /><span>{errorMessage}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 min-w-[160px]"
                >
                  {status === "loading" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" aria-hidden />Sending…</>
                  ) : (
                    <>Send message<Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></>
                  )}
                </button>
              </form>

              {/* Sidebar */}
              <div className="lg:col-span-2 flex flex-col gap-4 self-start w-full min-w-0">
                {/* Direct contact */}
                <div className="rounded-xl border border-border bg-surface-elevated p-6 space-y-4 shadow-sm">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">Direct</p>
                  <a href={`mailto:${personal.email}`} className="group flex items-start gap-3 hover:text-accent transition-colors">
                    <Mail className="h-4 w-4 mt-0.5 text-accent shrink-0" aria-hidden />
                    <span className="text-sm text-foreground group-hover:text-accent break-all transition-colors">{personal.email}</span>
                  </a>
                  {personal.phone && (
                    <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="group flex items-start gap-3 text-foreground hover:text-accent transition-colors">
                      <Phone className="h-4 w-4 mt-0.5 text-accent shrink-0" aria-hidden />
                      <span className="text-sm">{personal.phone}</span>
                    </a>
                  )}
                  <a
                    href={linkedIn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 text-foreground hover:text-accent transition-colors"
                  >
                    <Linkedin className="h-4 w-4 mt-0.5 text-accent shrink-0" aria-hidden />
                    <span className="text-sm group-hover:text-accent transition-colors">
                      linkedin.com/in/{linkedIn.vanity}
                    </span>
                  </a>
                  <a href={personal.resumeUrl} download className="group inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-accent/40 hover:text-accent transition-colors">
                    <Download className="h-3.5 w-3.5" aria-hidden />Download resume
                  </a>
                </div>

                {/* Social links with magnetic effect */}
                <div className="rounded-xl border border-border bg-surface-elevated p-6 shadow-sm">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">Elsewhere</p>
                  <ul className="space-y-2">
                    {socialLinks.filter((link) => link.icon !== "linkedin").map((link) => {
                      const Icon = iconMap[link.icon] || Mail;
                      const external = link.icon !== "email";
                      return (
                        <li key={link.name}>
                          <a href={link.url} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex items-center justify-between gap-3 rounded-xl p-2.5 -mx-2.5 hover:bg-surface-hover transition-colors">
                              <span className="flex items-center gap-3">
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/10 border border-accent/20 text-accent group-hover:bg-accent/20 transition-colors">
                                  <Icon className="h-4 w-4" aria-hidden />
                                </span>
                                <span>
                                  <span className="block text-sm font-medium text-foreground group-hover:text-accent transition-colors">{link.name}</span>
                                  {link.handle && <span className="block text-xs text-muted">{link.handle}</span>}
                                </span>
                              </span>
                              {external && <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-accent transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" aria-hidden />}
                            </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-surface-elevated p-4 sm:p-5 shadow-sm w-full min-w-0 overflow-hidden">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">LinkedIn profile</p>
                  <ResponsiveLinkedInBadge />
                </div>

                {/* Availability */}
                <div className="rounded-2xl border border-border bg-accent-muted p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 shrink-0 rounded-full status-dot" aria-hidden />
                    <p className="text-xs font-mono uppercase tracking-widest text-success">Currently available</p>
                  </div>
                  <p className="text-sm text-muted-strong leading-relaxed">Taking on remote contract work outside my day job. Comfortable across PKT and overlapping with US / EU mornings.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
