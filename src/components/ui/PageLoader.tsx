"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Short timeout to let fonts load and ensure smooth entrance
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          >
            {/* Animated logo / initials */}
            <div className="flex flex-col items-center gap-5">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative"
              >
                {/* Outer ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 rounded-2xl"
                  style={{
                    background: "conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent-3), var(--accent))",
                    opacity: 0.6,
                    filter: "blur(4px)",
                  }}
                  aria-hidden
                />
                <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-background border border-accent/30">
                  <span className="font-display font-bold text-2xl text-accent">A</span>
                </div>
              </motion.div>

              {/* Loading bar */}
              <div className="w-32 h-0.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full w-1/2 bg-accent rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content — fades in after loader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
