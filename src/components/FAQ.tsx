"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { faqs } from "@/data/faq";
import { SectionDivider } from "@/components/ui/SectionDivider";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  // JSON-LD for SEO — FAQ rich result
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <SectionDivider />
      <section
        id="faq"
        ref={ref}
        className="relative py-24 sm:py-32 px-5 sm:px-10 lg:px-20 overflow-hidden"
        aria-labelledby="faq-heading"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <div className="max-w-5xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.4em] text-accent mb-4">
              FAQ
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
            >
              <h2
                id="faq-heading"
                className="font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-foreground max-w-3xl"
              >
                Questions, before you ask.
              </h2>
              <p className="max-w-md text-sm text-muted-strong">
                The things every prospective client wants to know — answered up front so you don&apos;t have to email me for them.
              </p>
            </motion.div>

            <motion.ul variants={container} className="space-y-3">
              {faqs.map((f) => {
                const isOpen = openId === f.id;
                return (
                  <motion.li key={f.id} variants={item}>
                    <div
                      className={`rounded-2xl border bg-surface/60 transition-all duration-300 ${
                        isOpen ? "border-accent/40 shadow-glow-sm" : "border-border hover:border-border-strong"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : f.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${f.id}`}
                        className="w-full flex items-center justify-between gap-4 text-left p-5 sm:p-6"
                      >
                        <span className="flex items-start gap-3 min-w-0">
                          <MessageCircleQuestion
                            className={`h-4 w-4 mt-1 shrink-0 transition-colors ${
                              isOpen ? "text-accent" : "text-muted"
                            }`}
                            aria-hidden
                          />
                          <span
                            className={`font-display font-semibold text-base sm:text-lg leading-snug transition-colors ${
                              isOpen ? "text-foreground" : "text-foreground/90"
                            }`}
                          >
                            {f.question}
                          </span>
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className={`shrink-0 grid h-8 w-8 place-items-center rounded-full border ${
                            isOpen
                              ? "border-accent/40 bg-accent/10 text-accent"
                              : "border-border bg-background/40 text-muted"
                          }`}
                          aria-hidden
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            id={`faq-answer-${f.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-6 pb-6 sm:pb-7 -mt-1">
                              <div className="pl-7 text-sm sm:text-[0.95rem] text-muted-strong leading-relaxed text-pretty">
                                {f.answer}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">Still curious?</span>
              <a
                href="#contact"
                className="text-accent hover:text-accent-hover font-medium underline-offset-4 hover:underline transition-colors"
              >
                Send me a note →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
