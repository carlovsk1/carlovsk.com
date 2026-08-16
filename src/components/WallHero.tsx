"use client";

import { useEffect, useRef } from "react";
import { FONT_BLACK, FONT_MONO, PAL, RADIUS } from "@/lib/palette";

const TILE_SIZE = 72;

type Tile = {
  c: number;
  r: number;
  rot: number;
  ang: number;
  pop: number;
  waveAt: number;
  spin: number;
  resc: boolean;
  bg: string;
  fg: string;
};

export default function WallHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motion = reduced ? 0.15 : 1;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const size = TILE_SIZE;
    const S = {
      visible: true,
      w: 0,
      h: 0,
      tiles: [] as Tile[],
      cols: 0,
      rows: 0,
      idleAcc: 0,
      raf: 0,
      dead: false,
    };

    const scheme = () => {
      const r = Math.random();
      let fg: string = r < 0.16 ? PAL.blue : r < 0.27 ? PAL.yellow : r < 0.5 ? PAL.sand : PAL.leaf;
      let bg: string = PAL.bg;
      if (fg === PAL.sand && Math.random() < 0.12) {
        bg = PAL.sand;
        fg = PAL.bg;
      }
      return { bg, fg };
    };
    const build = () => {
      S.cols = Math.ceil(S.w / size);
      S.rows = Math.ceil(S.h / size);
      S.tiles = [];
      for (let r = 0; r < S.rows; r++)
        for (let c = 0; c < S.cols; c++) {
          const rot = (Math.random() * 4) | 0;
          S.tiles.push({ c, r, rot, ang: rot * 90, pop: 0, waveAt: 0, spin: 0, resc: false, ...scheme() });
        }
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      S.w = rect.width;
      S.h = rect.height;
      canvas.width = Math.round(S.w * dpr);
      canvas.height = Math.round(S.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver((es) => {
      S.visible = es[0].isIntersecting;
    });
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const R = size * 2.4;
      for (const t of S.tiles) {
        const cx = t.c * size + size / 2;
        const cy = t.r * size + size / 2;
        const dx = mx - cx;
        const dy = my - cy;
        if (Math.hypot(dx, dy) < R) {
          const q = Math.round(Math.atan2(dy, dx) / (Math.PI / 2));
          let diff = (((q - t.rot) % 4) + 4) % 4;
          if (diff > 2) diff -= 4;
          if (diff !== 0) {
            t.rot += diff;
            t.pop = Math.min(1, t.pop + 0.7);
          }
        }
      }
    };
    const onClick = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const now = performance.now();
      for (const t of S.tiles) {
        const cx = t.c * size + size / 2;
        const cy = t.r * size + size / 2;
        const d = Math.hypot(px - cx, py - cy);
        t.waveAt = now + d * 1.1;
        t.spin = 1 + ((Math.random() * 2) | 0);
        t.resc = Math.random() < 0.14;
      }
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onClick);

    let last = performance.now();
    const loop = (now: number) => {
      if (S.dead) return;
      S.raf = requestAnimationFrame(loop);
      const dt = Math.min(50, now - last);
      last = now;
      if (!S.visible) return;
      const f = Math.min(1, (dt / 1000) * (5.5 * Math.max(0.2, motion)));
      S.idleAcc += dt;
      const idleEvery = 320 / Math.max(0.05, motion);
      while (S.idleAcc > idleEvery && S.tiles.length) {
        S.idleAcc -= idleEvery;
        const t = S.tiles[(Math.random() * S.tiles.length) | 0];
        t.rot += Math.random() < 0.5 ? 1 : -1;
        t.pop = Math.min(1, t.pop + 0.5);
      }
      ctx.fillStyle = PAL.bg;
      ctx.fillRect(0, 0, S.w, S.h);
      const half = size / 2;
      for (const t of S.tiles) {
        if (t.waveAt && now >= t.waveAt) {
          t.rot += t.spin;
          if (t.resc) Object.assign(t, scheme());
          t.pop = 1;
          t.waveAt = 0;
        }
        t.ang += (t.rot * 90 - t.ang) * f;
        t.pop = Math.max(0, t.pop - dt * 0.0028);
        const cx = t.c * size + half;
        const cy = t.r * size + half;
        const sc = 1 - t.pop * 0.16;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((t.ang * Math.PI) / 180);
        ctx.scale(sc, sc);
        if (t.bg !== PAL.bg) {
          ctx.fillStyle = t.bg;
          ctx.fillRect(-half, -half, size, size);
        }
        ctx.fillStyle = t.fg;
        ctx.beginPath();
        ctx.moveTo(-half, -half);
        ctx.lineTo(half, -half);
        ctx.lineTo(-half, half);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    };
    S.raf = requestAnimationFrame(loop);

    return () => {
      S.dead = true;
      cancelAnimationFrame(S.raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onClick);
    };
  }, []);

  return (
    <section
      id="top"
      style={{ position: "relative", height: "100svh", minHeight: 540, overflow: "hidden", cursor: "crosshair" }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg,rgba(11,43,37,0.85) 0%,rgba(11,43,37,0) 20%,rgba(11,43,37,0) 42%,rgba(11,43,37,0.65) 68%,rgba(11,43,37,0.96) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(20px,3vw,40px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "space-between",
            fontFamily: FONT_MONO,
            fontSize: "clamp(10px,2.7vw,13px)",
            letterSpacing: "0.12em",
          }}
        >
          <span style={{ background: PAL.bg, padding: "6px 10px", borderRadius: RADIUS.chip }}>carlovsk.com</span>
          <span style={{ background: PAL.bg, padding: "6px 10px", borderRadius: RADIUS.chip }}>
            software engineer · brazil · remote
          </span>
        </div>
        <div>
          <h1
            style={{
              margin: 0,
              fontFamily: FONT_BLACK,
              fontSize: "clamp(44px,12.5vw,210px)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              color: PAL.sand,
              textShadow: "0 0 0 #0B2B25, 6px 6px 0 #0B2B25",
            }}
          >
            CARLOVSK
          </h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "12px 24px",
              marginTop: 14,
            }}
          >
            <p
              style={{
                margin: 0,
                flex: "1 1 280px",
                maxWidth: "46ch",
                fontSize: "clamp(14px,3.6vw,16px)",
                lineHeight: 1.5,
                background: PAL.bg,
                padding: "8px 10px",
                borderRadius: RADIUS.chip,
              }}
            >
              Carlos Gonçalves. He never fell in love with code. He fell in love with the experience. Code is how he
              shapes it.
            </p>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: 12,
                letterSpacing: "0.14em",
                color: PAL.yellow,
                background: PAL.bg,
                padding: "6px 10px",
                borderRadius: RADIUS.chip,
                whiteSpace: "nowrap",
              }}
            >
              TOUCH THE WALL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
