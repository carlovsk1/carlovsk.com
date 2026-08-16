"use client";

import { useEffect, useRef } from "react";
import { PAL } from "@/lib/palette";

export default function WaveBand({ phase = 0 }: { phase?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motion = reduced ? 0.15 : 1;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const S = { visible: true, w: 0, h: 0, t: phase, raf: 0, dead: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      S.w = rect.width;
      S.h = rect.height;
      canvas.width = Math.round(S.w * dpr);
      canvas.height = Math.round(S.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver((es) => {
      S.visible = es[0].isIntersecting;
    });
    io.observe(canvas);

    let last = performance.now();
    const loop = (now: number) => {
      if (S.dead) return;
      S.raf = requestAnimationFrame(loop);
      const dt = Math.min(50, now - last);
      last = now;
      if (!S.visible) return;
      S.t += dt * 0.00022 * Math.max(0.1, motion);
      ctx.fillStyle = PAL.bg;
      ctx.fillRect(0, 0, S.w, S.h);
      const nB = 4;
      const bh = S.h / nB;
      const step = 12;
      const yAt = (i: number, x: number) => i * bh + Math.sin(x * 0.006 + S.t * 3 + i * 1.1) * bh * 0.6;
      for (let i = -1; i <= nB; i++) {
        if (((i % 2) + 2) % 2) continue;
        ctx.fillStyle = PAL.sand;
        ctx.beginPath();
        ctx.moveTo(0, yAt(i, 0));
        for (let x = step; x <= S.w + step; x += step) ctx.lineTo(x, yAt(i, x));
        for (let x = S.w + step; x >= -step; x -= step) ctx.lineTo(x, yAt(i + 1, x));
        ctx.closePath();
        ctx.fill();
      }
    };
    S.raf = requestAnimationFrame(loop);

    return () => {
      S.dead = true;
      cancelAnimationFrame(S.raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [phase]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "clamp(64px,11vw,120px)" }}
    />
  );
}
