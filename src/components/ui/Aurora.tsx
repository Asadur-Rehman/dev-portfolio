"use client";

import { useEffect, useRef, useCallback } from "react";

interface AuroraProps {
  className?: string;
}

export function Aurora({ className = "" }: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Blob configurations
    const blobs = [
      { x: 0.15, y: 0.12, r: 0.42, speedX: 0.08, speedY: 0.06, hue: 190, sat: 100, light: 55, alpha: 0.12 },
      { x: 0.82, y: 0.35, r: 0.34, speedX: -0.06, speedY: 0.09, hue: 260, sat: 80, light: 65, alpha: 0.10 },
      { x: 0.50, y: 0.85, r: 0.38, speedX: 0.05, speedY: -0.07, hue: 195, sat: 90, light: 50, alpha: 0.08 },
      { x: 0.30, y: 0.55, r: 0.28, speedX: -0.04, speedY: 0.05, hue: 280, sat: 70, light: 60, alpha: 0.07 },
      { x: 0.70, y: 0.15, r: 0.30, speedX: 0.07, speedY: -0.04, hue: 45, sat: 90, light: 60, alpha: 0.05 },
    ];

    let t = 0;

    const draw = () => {
      t += 0.003;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const blob of blobs) {
        // Organic oscillation + mouse influence
        const offsetX = Math.sin(t * blob.speedX * 10 + blob.hue) * 0.06 + (mx - 0.5) * 0.04;
        const offsetY = Math.cos(t * blob.speedY * 10 + blob.hue) * 0.06 + (my - 0.5) * 0.04;

        const cx = (blob.x + offsetX) * width;
        const cy = (blob.y + offsetY) * height;
        const radius = blob.r * Math.max(width, height);

        // Breathing alpha
        const breathe = 0.85 + Math.sin(t * 1.5 + blob.hue * 0.01) * 0.15;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `hsla(${blob.hue}, ${blob.sat}%, ${blob.light}%, ${blob.alpha * breathe})`);
        grad.addColorStop(0.5, `hsla(${blob.hue}, ${blob.sat}%, ${blob.light}%, ${blob.alpha * breathe * 0.4})`);
        grad.addColorStop(1, `hsla(${blob.hue}, ${blob.sat}%, ${blob.light}%, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ filter: "blur(60px) saturate(1.4)" }}
      aria-hidden
    />
  );
}
