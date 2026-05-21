"use client";

import { useCallback, useEffect, useRef } from "react";

type Props = {
  text: string;
  className?: string;
  /** max pixel lift applied to letters nearest the cursor */
  lift?: number;
  /** falloff radius in px — beyond this, letters are unaffected */
  radius?: number;
  /** apply a hue tint to the closest letters */
  tint?: boolean;
};

/**
 * A headline whose letters lift toward the cursor with a smooth falloff,
 * and slightly scale + tint when closest. Pure DOM math — no layout thrash
 * (we cache letter centers and update them on resize / scroll).
 */
export function DistortName({ text, className = "", lift = 24, radius = 160, tint = true }: Props) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const centersRef = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: -10000, y: -10000 });

  const measure = useCallback(() => {
    const els = lettersRef.current;
    centersRef.current = els.map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
  }, []);

  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize);
    };
  }, [measure]);

  useEffect(() => {
    const tick = () => {
      const { x: mx, y: my } = targetRef.current;
      const els = lettersRef.current;
      const centers = centersRef.current;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        const c = centers[i];
        if (!el || !c) continue;
        const dx = c.x - mx;
        const dy = c.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        const t = Math.max(0, 1 - d / radius); // 0 (far) → 1 (near)
        // Bell-ish curve via t^2
        const k = t * t;
        const ty = -lift * k;
        const scale = 1 + 0.18 * k;
        el.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
        if (tint) {
          el.style.color = k > 0.05 ? `rgba(0, 212, 255, ${Math.min(1, 0.35 + k * 0.65)})` : "";
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [lift, radius, tint]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      targetRef.current = { x: -10000, y: -10000 };
    };
    const onTouchEnd = () => onLeave();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  lettersRef.current = [];

  return (
    <span ref={rootRef} className={`inline-block ${className}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          ref={(el) => { if (el) lettersRef.current[i] = el; }}
          aria-hidden
          className="inline-block transition-[color] duration-300 will-change-transform"
          style={{ transformOrigin: "50% 70%" }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
