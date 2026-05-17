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
      // Use lower resolution for performance — aurora is blurred anyway
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Fewer blobs = less GPU work per frame
    const blobs = [
      { x: 0.15, y: 0.12, r: 0.45, speedX: 0.06, speedY: 0.04, hue: 190, sat: 100, light: 55, alpha: 0.10 },
      { x: 0.82, y: 0.35, r: 0.38, speedX: -0.05, speedY: 0.07, hue: 260, sat: 80, light: 65, alpha: 0.08 },
      { x: 0.50, y: 0.85, r: 0.40, speedX: 0.04, speedY: -0.05, hue: 195, sat: 90, light: 50, alpha: 0.06 },
    ];

    let t = 0;
    let lastFrameTime = 0;
    const TARGET_FPS = 30; // Cap to 30fps — aurora doesn't need 60
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    const draw = (now: number) => {
      animationRef.current = requestAnimationFrame(draw);

      // Throttle to target FPS
      if (now - lastFrameTime < FRAME_INTERVAL) return;
      lastFrameTime = now;

      t += 0.003;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const blob of blobs) {
        const offsetX = Math.sin(t * blob.speedX * 10 + blob.hue) * 0.05 + (mx - 0.5) * 0.03;
        const offsetY = Math.cos(t * blob.speedY * 10 + blob.hue) * 0.05 + (my - 0.5) * 0.03;

        const cx = (blob.x + offsetX) * width;
        const cy = (blob.y + offsetY) * height;
        const radius = blob.r * Math.max(width, height);

        const breathe = 0.9 + Math.sin(t * 1.2 + blob.hue * 0.01) * 0.1;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `hsla(${blob.hue}, ${blob.sat}%, ${blob.light}%, ${blob.alpha * breathe})`);
        grad.addColorStop(0.5, `hsla(${blob.hue}, ${blob.sat}%, ${blob.light}%, ${blob.alpha * breathe * 0.35})`);
        grad.addColorStop(1, `hsla(${blob.hue}, ${blob.sat}%, ${blob.light}%, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
    };

    animationRef.current = requestAnimationFrame(draw);

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
      style={{ filter: "blur(60px) saturate(1.3)", willChange: "transform" }}
      aria-hidden
    />
  );
}
