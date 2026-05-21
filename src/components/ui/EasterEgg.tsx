"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEQUENCE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  hue: number;
  size: number;
  life: number;
};

export function EasterEgg() {
  const [armed, setArmed] = useState(false);
  const idxRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const spawn = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      // Try again after mount
      setTimeout(spawn, 60);
      return;
    }
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const W = window.innerWidth;
    const H = window.innerHeight;
    const cx = W / 2;
    const cy = H / 2;
    const particles: Particle[] = [];
    for (let i = 0; i < 220; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 6 + Math.random() * 11;
      particles.push({
        id: i,
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.3,
        hue: Math.floor(Math.random() * 360),
        size: 5 + Math.random() * 6,
        life: 1,
      });
    }
    particlesRef.current = particles;

    const startedAt = performance.now();
    const tick = (t: number) => {
      const elapsed = (t - startedAt) / 1000;
      ctx.clearRect(0, 0, W, H);
      const grav = 22;
      const drag = 0.992;
      let alive = 0;
      for (const p of particlesRef.current) {
        if (p.life <= 0) continue;
        p.vx *= drag;
        p.vy = p.vy * drag + grav * 0.016;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        p.life = Math.max(0, 1 - elapsed / 3.6);
        if (p.life > 0 && p.y < H + 40) alive++;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = `hsla(${p.hue}, 92%, 62%, ${p.life})`;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }
      if (alive > 0 && elapsed < 4.2) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, W, H);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const trigger = useCallback(() => {
    setArmed(true);
    spawn();
    setTimeout(() => setArmed(false), 4200);
  }, [spawn]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const inField = tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement | null)?.isContentEditable;
      if (inField) return;

      const expected = SEQUENCE[idxRef.current];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        idxRef.current += 1;
        if (idxRef.current === SEQUENCE.length) {
          idxRef.current = 0;
          trigger();
        }
      } else if (key === SEQUENCE[0]) {
        idxRef.current = 1;
      } else {
        idxRef.current = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [trigger]);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <AnimatePresence>
        {armed && (
          <motion.div
            key="egg-toast"
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[10001] rounded-full border border-accent/40 bg-background/90 backdrop-blur-md px-4 py-2 text-xs font-mono text-accent shadow-glow-sm"
            role="status"
          >
            +30 lives — you found it.
          </motion.div>
        )}
      </AnimatePresence>

      <canvas
        ref={canvasRef}
        aria-hidden
        className="fixed inset-0 pointer-events-none z-[9998]"
      />
    </>
  );
}
