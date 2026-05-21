"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const dotX = useSpring(mouseX, { damping: 50, stiffness: 900, mass: 0.1 });
  const dotY = useSpring(mouseY, { damping: 50, stiffness: 900, mass: 0.1 });
  const ringX = useSpring(mouseX, { damping: 26, stiffness: 360, mass: 0.45 });
  const ringY = useSpring(mouseY, { damping: 26, stiffness: 360, mass: 0.45 });

  useEffect(() => {
    setMounted(true);
    const touch = window.matchMedia("(hover: none)").matches;
    setIsTouch(touch);
    if (touch) return;
    const style = document.createElement("style");
    style.id = "cursor-none-override";
    style.textContent = "* { cursor: none !important; }";
    document.head.appendChild(style);
    return () => document.getElementById("cursor-none-override")?.remove();
  }, []);

  useEffect(() => {
    if (!mounted || isTouch) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setIsPointer(!!el.closest("a, button, input, textarea, select, [role='button']"));
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mounted, isTouch, mouseX, mouseY]);

  if (!mounted || isTouch) return null;

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <motion.div
          className="rounded-full border"
          animate={{
            width:  isPointer ? 52 : isClicking ? 18 : 34,
            height: isPointer ? 52 : isClicking ? 18 : 34,
            borderColor: isPointer
              ? "rgba(0,212,255,0.85)"
              : isClicking
              ? "rgba(0,212,255,0.95)"
              : "rgba(0,212,255,0.32)",
            boxShadow: isPointer
              ? "0 0 22px -6px rgba(0,212,255,0.45)"
              : "none",
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        />
      </motion.div>

      {/* Inner fast dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <motion.div
          className="rounded-full bg-accent"
          animate={{
            width:  isClicking ? 16 : isPointer ? 3 : 5,
            height: isClicking ? 16 : isPointer ? 3 : 5,
            opacity: isClicking ? 0.65 : 1,
          }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        />
      </motion.div>
    </>
  );
}
