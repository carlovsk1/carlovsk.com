"use client";

import { useEffect, useRef, useState } from "react";
import { FONT_BLACK, FONT_MONO, INK, PAL, RADIUS } from "@/lib/palette";

type Mix = [string, number][];

const ERAS: { year: number; mix: Mix }[] = [
  { year: 2020, mix: [[PAL.leaf, 6], [PAL.sand, 2], [PAL.yellow, 1]] },
  { year: 2021, mix: [[PAL.yellow, 5], [PAL.leaf, 3], [PAL.sand, 1]] },
  { year: 2023, mix: [[PAL.blue, 4], [PAL.leaf, 3], [PAL.sand, 1]] },
  { year: 2024, mix: [[PAL.sand, 5], [PAL.leaf, 2], [PAL.blue, 1]] },
  { year: 2026, mix: [[PAL.yellow, 3], [PAL.blue, 2], [PAL.sand, 3], [PAL.leaf, 2]] },
];
// Every era sits in 202x, so only the last digit moves. The reel is one column, not two.
const YEAR_PREFIX = "202";
const N = ERAS.length;

const CHAPTERS = [
  {
    dot: `linear-gradient(45deg,${PAL.leaf} 50%,${PAL.sand} 50%)`,
    label: "2020 · THE ACCIDENT",
    text: "Started in digital marketing, running ads and funnels before he could legally drive.",
  },
  {
    dot: `linear-gradient(45deg,${PAL.yellow} 50%,${PAL.leaf} 50%)`,
    label: "2021 · THREE STORES",
    text: "Opened the Shopify editor to fix one thing on a dropshipping store. Did not close it for years. Three stores, R$150K a year, breaking even every single month: tuition, not salary.",
  },
  {
    dot: `linear-gradient(45deg,${PAL.blue} 50%,${PAL.leaf} 50%)`,
    label: "2023 · FOUNDER",
    text: "Founded FixaAí, an AI flashcard product, and took it from zero to 1,000 people studying with it.",
  },
  {
    dot: `linear-gradient(45deg,${PAL.sand} 50%,${PAL.leaf} 50%)`,
    label: "2024 · THE SHORTCUT",
    text: "Two years building professionally in Bubble, because an idea live in days beats a perfect one in months.",
  },
  {
    dot: `linear-gradient(45deg,${PAL.yellow} 50%,${PAL.blue} 50%)`,
    label: "2026 · NOW",
    text: "Engineers a cost-segregation SaaS in Next.js, React, TypeScript and Supabase, rebuilt from the Bubble app it used to be.",
  },
];

// Five full labels do not fit a phone. The short form keeps the rhythm without the collision.
const TIMELINE = [
  { full: "2020 · MARKETING", short: "2020" },
  { full: "2021 · SHOPIFY", short: "2021" },
  { full: "2023 · FOUNDER", short: "2023" },
  { full: "2024 · BUBBLE", short: "2024" },
  { full: "NOW", short: "NOW" },
];
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

type Tile = {
  c: number;
  r: number;
  rot: number;
  ang: number;
  born: number;
  pop: number;
  waveAt: number;
  col: string;
  score: number;
};

/**
 * 60vh of scroll per chapter. Anything longer and the copy sits unchanged for a full screen of
 * scrolling, which is what 750vh used to do.
 */
const VH_PER_CHAPTER = 60;

export default function StoryWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onesRef = useRef<HTMLDivElement>(null);
  const chWrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sec = sectionRef.current;
    const canvas = canvasRef.current;
    const ones = onesRef.current;
    const fill = fillRef.current;
    const marker = markerRef.current;
    const chWrap = chWrapRef.current;
    if (!sec || !canvas || !ones || !fill || !marker || !chWrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const chEls = Array.from(chWrap.querySelectorAll<HTMLElement>("[data-ch]"));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const S = {
      visible: true,
      w: 0,
      h: 0,
      size: 56,
      tiles: [] as Tile[],
      p: 0,
      pS: 0,
      ch: -1,
      raf: 0,
      dead: false,
    };

    const pick = (mix: Mix) => {
      let tot = 0;
      for (const m of mix) tot += m[1];
      let r = Math.random() * tot;
      for (const m of mix) {
        r -= m[1];
        if (r <= 0) return m[0];
      }
      return mix[0][0];
    };
    const build = () => {
      const size = (S.size = Math.max(40, Math.min(72, S.w / 16)));
      const cols = Math.ceil(S.w / size);
      const rows = Math.ceil(S.h / size);
      S.tiles = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          S.tiles.push({
            c,
            r,
            rot: (Math.random() * 4) | 0,
            ang: 0,
            born: 0,
            pop: 0,
            waveAt: 0,
            col: PAL.leaf,
            score: (rows - 1 - r) + c * 0.55 + Math.random() * 2.8,
          });
      S.tiles.sort((a, b) => a.score - b.score);
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
      const size = S.size;
      const R = size * 2.2;
      for (const t of S.tiles) {
        if (!t.born) continue;
        const dx = mx - (t.c * size + size / 2);
        const dy = my - (t.r * size + size / 2);
        if (Math.hypot(dx, dy) < R) {
          const q = Math.round(Math.atan2(dy, dx) / (Math.PI / 2));
          let diff = (((q - t.rot) % 4) + 4) % 4;
          if (diff > 2) diff -= 4;
          if (diff) {
            t.rot += diff;
            t.pop = Math.min(1, t.pop + 0.6);
          }
        }
      }
    };
    canvas.addEventListener("pointermove", onMove);

    let last = performance.now();
    const loop = (now: number) => {
      if (S.dead) return;
      S.raf = requestAnimationFrame(loop);
      const dt = Math.min(50, now - last);
      last = now;
      const vh = window.innerHeight;
      const rct = sec.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -rct.top / Math.max(1, rct.height - vh)));
      S.p = p;
      S.pS += (p - S.pS) * (reduced ? 1 : Math.min(1, dt * 0.007));
      if (!S.visible) return;
      const t = S.pS * N;
      let yearF: number;
      if (t <= 0.5) yearF = ERAS[0].year;
      else if (t >= N - 0.5) yearF = ERAS[N - 1].year;
      else {
        const i = Math.min(N - 2, Math.floor(t - 0.5));
        const k = t - 0.5 - i;
        const e = k * k * (3 - 2 * k);
        yearF = ERAS[i].year + (ERAS[i + 1].year - ERAS[i].year) * e;
      }
      ones.style.transform = "translateY(" + (-(yearF % 10)).toFixed(4) + "em)";
      chEls.forEach((el, i) => {
        const a = t - i;
        const inK = Math.max(0, Math.min(1, (a + (i === 0 ? 0.3 : 0)) / 0.3));
        const outK = i === N - 1 ? 0 : Math.max(0, Math.min(1, (a - 0.68) / 0.3));
        el.style.opacity = Math.min(inK, 1 - outK).toFixed(3);
        el.style.transform = "translateY(-50%) translateY(" + ((1 - inK) * 46 - outK * 46).toFixed(1) + "px)";
      });
      fill.style.width = (p * 100).toFixed(2) + "%";
      marker.style.left = (p * 100).toFixed(2) + "%";
      marker.style.transform = "translate(-50%,-50%) rotate(" + (p * 720).toFixed(1) + "deg)";
      const size = S.size;
      const half = size / 2;
      const chNow = Math.min(N - 1, Math.floor(p * N));
      if (chNow !== S.ch) {
        if (S.ch !== -1 && !reduced)
          for (const tl of S.tiles)
            if (tl.born) tl.waveAt = now + Math.hypot(tl.c * size, S.h - tl.r * size) * 0.8;
        S.ch = chNow;
      }
      ctx.fillStyle = PAL.bg;
      ctx.fillRect(0, 0, S.w, S.h);
      const targetN = Math.round(S.tiles.length * (0.05 + 0.95 * S.pS));
      const f = Math.min(1, (dt / 1000) * 6);
      for (let i = 0; i < S.tiles.length; i++) {
        const tl = S.tiles[i];
        if (i < targetN && !tl.born) {
          tl.born = now;
          tl.col = pick(ERAS[chNow].mix);
          tl.ang = tl.rot * 90 - 90;
          tl.pop = 0;
        } else if (i >= targetN && tl.born) {
          tl.born = 0;
          continue;
        }
        if (!tl.born) continue;
        if (tl.waveAt && now >= tl.waveAt) {
          tl.waveAt = 0;
          tl.rot += 1;
          tl.pop = Math.max(tl.pop, 0.75);
          if (Math.random() < 0.18) tl.col = pick(ERAS[chNow].mix);
        }
        const k = Math.min(1, (now - tl.born) / 500);
        const grow = 1 - Math.pow(1 - k, 3);
        tl.ang += (tl.rot * 90 - tl.ang) * f;
        tl.pop = Math.max(0, tl.pop - dt * 0.002);
        const sc = grow * (1 - tl.pop * 0.18);
        if (sc <= 0.02) continue;
        ctx.save();
        ctx.translate(tl.c * size + half, tl.r * size + half);
        ctx.rotate((tl.ang * Math.PI) / 180);
        ctx.scale(sc, sc);
        ctx.fillStyle = tl.col;
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
    };
  }, [reduced]);

  const digitCol = (ref: React.RefObject<HTMLDivElement | null>, initial: string) => (
    <div style={{ overflow: "hidden", height: "1em", width: "0.64em" }}>
      <div ref={ref} style={{ display: "flex", flexDirection: "column", transform: initial }}>
        {DIGITS.map((d, i) => (
          <div key={i} style={{ height: "1em", textAlign: "center" }}>
            {d}
          </div>
        ))}
      </div>
    </div>
  );

  // Asking for less motion should not still cost several screens of sticky scrolling.
  if (reduced) {
    return (
      <section id="story" style={{ padding: "clamp(72px,10vw,140px) clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ margin: 0, fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.22em", color: PAL.yellow }}>
            BY ACCIDENT
          </h2>
          <ol style={{ listStyle: "none", margin: "clamp(32px,4vw,56px) 0 0", padding: 0, display: "grid", gap: 40 }}>
            {CHAPTERS.map((ch) => (
              <li key={ch.label} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <span
                  style={{ flex: "none", width: 16, height: 16, background: ch.dot, borderRadius: RADIUS.mark, marginTop: "0.5em" }}
                />
                <div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 13, letterSpacing: "0.18em", color: PAL.yellow }}>
                    {ch.label}
                  </div>
                  <p style={{ margin: "12px 0 0", maxWidth: "52ch", fontSize: "clamp(19px,1.8vw,26px)", lineHeight: 1.6 }}>
                    {ch.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section id="story" ref={sectionRef} style={{ position: "relative", height: `${N * VH_PER_CHAPTER}vh` }}>
      <div style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", cursor: "crosshair" }}
        />
        <div
          style={{
            position: "absolute",
            left: "clamp(24px,6vw,96px)",
            top: "clamp(20px,4vh,44px)",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: FONT_MONO,
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.22em",
              color: PAL.yellow,
              background: PAL.bg,
              padding: "6px 10px",
              borderRadius: RADIUS.chip,
            }}
          >
            BY ACCIDENT
          </h2>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 13,
              color: INK.soft,
              background: PAL.bg,
              padding: "6px 10px",
              borderRadius: RADIUS.chip,
            }}
          >
            every tile is a day of work. scroll, and the wall goes up
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 clamp(24px,6vw,96px) calc(4vh + 78px)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "clamp(16px,3vw,40px)",
              width: "100%",
            }}
          >
            {/* The reel is one stack of 0-9 sliding behind a 1em window. Read aloud it is just
                "0 1 2 3 4 5 6 7 8 9", so the chapter labels carry the year for assistive tech. */}
            <div style={{ flex: "0 1 auto" }} aria-hidden="true">
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 13,
                  letterSpacing: "0.22em",
                  color: PAL.yellow,
                  background: PAL.bg,
                  display: "inline-block",
                  padding: "6px 10px",
                  borderRadius: RADIUS.chip,
                  marginBottom: 8,
                }}
              >
                YEAR
              </div>
              <div
                style={{
                  display: "flex",
                  fontFamily: FONT_BLACK,
                  fontSize: "clamp(52px,9vw,170px)",
                  lineHeight: 1,
                  color: PAL.sand,
                  textShadow: "6px 6px 0 #0B2B25",
                }}
              >
                <span>{YEAR_PREFIX}</span>
                {digitCol(onesRef, "translateY(0em)")}
              </div>
            </div>
            <div
              ref={chWrapRef}
              style={{
                flex: "1 1 340px",
                maxWidth: 520,
                position: "relative",
                height: "clamp(230px,44vh,380px)",
                pointerEvents: "none",
              }}
            >
              {CHAPTERS.map((ch, i) => (
                <div
                  key={i}
                  data-ch={i}
                  style={{ position: "absolute", top: "50%", left: 0, right: 0, opacity: 0, transform: "translateY(-50%)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <span
                      style={{ width: 16, height: 16, background: ch.dot, borderRadius: RADIUS.mark, outline: `5px solid ${PAL.bg}` }}
                    />
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 13,
                        letterSpacing: "0.18em",
                        color: PAL.yellow,
                        background: PAL.bg,
                        padding: "5px 9px",
                        borderRadius: RADIUS.chip,
                      }}
                    >
                      {ch.label}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: "clamp(19px,1.8vw,26px)", lineHeight: 1.6, color: PAL.sand }}>
                    <span
                      style={{
                        background: PAL.bg,
                        padding: "6px 10px",
                        borderRadius: RADIUS.chip,
                        boxDecorationBreak: "clone",
                        WebkitBoxDecorationBreak: "clone",
                      }}
                    >
                      {ch.text}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: "clamp(24px,6vw,96px)",
            right: "clamp(24px,6vw,96px)",
            bottom: "4vh",
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "relative", height: 2, borderRadius: 999, background: "rgba(244,237,224,0.22)" }}>
            <div
              ref={fillRef}
              style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "0%", borderRadius: 999, background: PAL.yellow }}
            />
            <div
              ref={markerRef}
              style={{
                position: "absolute",
                left: "0%",
                top: "50%",
                width: 13,
                height: 13,
                borderRadius: RADIUS.mark,
                background: `linear-gradient(45deg,${PAL.yellow} 50%,${PAL.blue} 50%)`,
                transform: "translate(-50%,-50%)",
                boxShadow: "0 0 0 5px #0B2B25",
              }}
            />
          </div>
          {/* Every other label in this section sits on a bg chip so the mural cannot swallow it.
              These were the exception, and sand-on-sand tiles made them vanish. */}
          <div
            aria-hidden="true"
            style={{
              display: "flex",
              flexWrap: "nowrap",
              gap: 8,
              justifyContent: "space-between",
              marginTop: 12,
              fontFamily: FONT_MONO,
              fontSize: "clamp(9px,2.3vw,11px)",
              letterSpacing: "0.1em",
            }}
          >
            {TIMELINE.map((t, i) => (
              <span
                key={t.full}
                style={{
                  background: PAL.bg,
                  padding: "4px 8px",
                  borderRadius: RADIUS.chip,
                  whiteSpace: "nowrap",
                  color: i === TIMELINE.length - 1 ? PAL.yellow : INK.faint,
                }}
              >
                <span className="athos-tl-full">{t.full}</span>
                <span className="athos-tl-short">{t.short}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
