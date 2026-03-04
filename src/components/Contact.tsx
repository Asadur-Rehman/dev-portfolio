"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, Send, Loader2, Phone } from "lucide-react";
import { personal } from "@/data/personal";
import { socialLinks } from "@/data/socials";
import { Button } from "@/components/ui/Button";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Mail,
  email: Mail,
};

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

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 px-6 sm:px-12 lg:px-24"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4"
        >
          Let&apos;s Build Something Together
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted mb-10"
        >
          Have a project in mind or want to chat? Get in touch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-[1fr,auto] gap-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                Name <span className="text-accent">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                Email <span className="text-accent">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            {status === "success" && (
              <p className="text-accent text-sm">Thanks! Your message was sent.</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm">{errorMessage}</p>
            )}
            <Button
              type="submit"
              disabled={status === "loading"}
              className="min-w-[140px]"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" aria-hidden />
                  Send
                </>
              )}
            </Button>
          </form>

          <div className="flex md:flex-col gap-6">
            <div>
              {personal.phone && (
                <a
                  href={`tel:${personal.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  <Phone className="h-5 w-5" aria-hidden />
                  {personal.phone}
                </a>
              )}
              <p className="text-sm font-medium text-muted mb-3">Social</p>
              <ul className="flex md:flex-col gap-3">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <li key={link.name}>
                      <a
                        href={link.url}
                        target={link.icon === "email" ? undefined : "_blank"}
                        rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                        className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <a
                href={personal.resumeUrl}
                download
                className="inline-flex items-center rounded-lg border-2 border-accent px-4 py-2 text-accent font-medium hover:bg-accent-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
