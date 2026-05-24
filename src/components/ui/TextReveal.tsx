"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "p" | "span" | "div";
}

/**
 * TextReveal — a per-word fade-in that fires when the text enters view.
 * The earlier scroll-linked version required the user to scroll through half
 * a viewport per paragraph to complete, which felt broken on mobile.
 */
export function TextReveal({ text, className = "", as: Tag = "p" }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0.2 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
            delay: Math.min(i * 0.012, 0.6),
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
