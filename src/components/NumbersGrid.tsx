"use client";

import { useEffect, useRef } from "react";
import { FONT_BLACK, FONT_MONO, INK, PAL, RADIUS, onDark } from "@/lib/palette";

type Stat = {
  to: number;
  prefix?: string;
  suffix?: string;
  accent: string;
  numSize: string;
  pad: string;
  tileSize: number;
  outerGap: string;
  label: string;
  labelMax: string;
  call: string;
  callSize: string;
  callMax: string;
};

const STATS: Stat[] = [
  {
    to: 30000,
    accent: PAL.yellow,
    numSize: "clamp(58px,8.6vw,148px)",
    pad: "clamp(24px,3vw,42px)",
    tileSize: 18,
    outerGap: "clamp(22px,2.6vw,36px)",
    label: "users reached on arOS, a multi-agent marketing OS",
    labelMax: "36ch",
    call: "He built the agent core.",
    callSize: "clamp(17px,1.5vw,21px)",
    callMax: "32ch",
  },
  {
    to: 150000,
    prefix: "R$",
    suffix: "+",
    accent: PAL.blue,
    numSize: "clamp(34px,3.4vw,52px)",
    pad: "clamp(22px,2.4vw,32px)",
    tileSize: 16,
    outerGap: "clamp(22px,2.6vw,36px)",
    label: "a year across three stores he built and ran, at 15",
    labelMax: "36ch",
    call: "Broke even every month. He calls it tuition, not salary.",
    callSize: "clamp(15px,1.25vw,18px)",
    callMax: "32ch",
  },
  {
    to: 1000,
    accent: PAL.sand,
    numSize: "clamp(38px,4vw,62px)",
    pad: "clamp(22px,2.4vw,32px)",
    tileSize: 16,
    outerGap: "clamp(22px,2.6vw,36px)",
    label: "people studying on FixaAí",
    labelMax: "36ch",
    call: "He founded it and took it from zero to a thousand.",
    callSize: "clamp(15px,1.25vw,18px)",
    callMax: "32ch",
  },
  {
    to: 371,
    accent: PAL.yellow,
    numSize: "clamp(38px,4.4vw,68px)",
    pad: "clamp(22px,2.4vw,32px)",
    tileSize: 16,
    outerGap: "clamp(22px,2.6vw,36px)",
    label: "pull requests merged in five months, at a 94% merge rate",
    labelMax: "36ch",
    call: "Median 137 lines. Small enough to review, which is the whole point.",
    callSize: "clamp(15px,1.25vw,18px)",
    callMax: "38ch",
  },
  {
    to: 51,
    accent: PAL.blue,
    numSize: "clamp(38px,4.4vw,68px)",
    pad: "clamp(22px,2.4vw,32px)",
    tileSize: 16,
    outerGap: "clamp(22px,2.6vw,36px)",
    label: "merged in his busiest week, 20 of them in a single day",
    labelMax: "36ch",
    call: "Two engineers. Every one merged because a human decided it should exist.",
    callSize: "clamp(15px,1.25vw,18px)",
    callMax: "38ch",
  },
  {
    to: 15,
    suffix: "+",
    accent: PAL.sand,
    numSize: "clamp(38px,4vw,62px)",
    pad: "clamp(24px,2.6vw,36px)",
    tileSize: 16,
    outerGap: "clamp(22px,2.6vw,28px)",
    label: "products shipped",
    labelMax: "36ch",
    call: "Two of those years in Bubble, on purpose: an idea live in days beats a perfect one in months.",
    callSize: "clamp(15px,1.25vw,18px)",
    callMax: "64ch",
  },
];

const fmtStat = (s: Stat, v: number) =>
  (s.prefix || "") + Math.round(v).toLocaleString("en-US") + (s.suffix || "");

export default function NumbersGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = gridRef.current;
    if (!wrap) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cells = Array.from(wrap.querySelectorAll<HTMLElement>("[data-stat]"));

    // Yellow and sand are light enough to carry dark ink. Blue is not: dark ink on it lands at
    // 3.0:1 and the small mono labels at 2.3:1, so a blue cell inverts the other way instead.
    const hotInk = (accent: string) => (accent === PAL.blue ? PAL.sand : PAL.bg);
    const hotLabel = (accent: string) =>
      accent === PAL.blue ? "rgba(244,237,224,0.82)" : "rgba(11,43,37,0.78)";

    const state = cells.map((c, i) => ({
      cell: c,
      stat: STATS[i],
      num: c.querySelector<HTMLElement>("[data-num]"),
      labels: Array.from(c.querySelectorAll<HTMLElement>("[data-label]")),
      tile: c.querySelector<HTMLElement>("[data-tile]"),
      rot: 0,
      hot: false,
      raf: 0,
      numColor: "",
      labelColors: [] as string[],
      tileBg: "",
    }));
    state.forEach((s) => {
      s.numColor = s.num ? s.num.style.color : "";
      s.labelColors = s.labels.map((l) => l.style.color);
      s.tileBg = s.tile ? s.tile.style.background : "";
      if (!reduced) {
        s.cell.style.opacity = "0";
        s.cell.style.transform = "translateY(22px)";
      }
    });

    const count = (s: (typeof state)[number]) => {
      const to = s.stat.to;
      if (!s.num || reduced) return;
      const dur = 1000 + Math.min(500, to / 800);
      const t0 = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - k, 4);
        s.num!.textContent = fmtStat(s.stat, to * e);
        if (k < 1) s.raf = requestAnimationFrame(step);
        else s.num!.textContent = fmtStat(s.stat, to);
      };
      s.num.textContent = fmtStat(s.stat, 0);
      s.raf = requestAnimationFrame(step);
    };

    const timers: number[] = [];
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const i = cells.indexOf(e.target as HTMLElement);
          const s = state[i];
          timers.push(
            window.setTimeout(() => {
              s.cell.style.opacity = "1";
              s.cell.style.transform = "none";
              count(s);
            }, i * 110),
          );
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    cells.forEach((c) => io.observe(c));

    const paint = (s: (typeof state)[number], hot: boolean) => {
      const accent = s.stat.accent;
      s.hot = hot;
      s.cell.style.background = hot ? accent : PAL.leaf;
      if (s.num) s.num.style.color = hot ? hotInk(accent) : s.numColor;
      s.labels.forEach((l, j) => {
        l.style.color = hot ? hotLabel(accent) : s.labelColors[j];
      });
      if (s.tile)
        s.tile.style.background = hot
          ? `linear-gradient(45deg,${hotInk(accent)} 50%,transparent 50%)`
          : s.tileBg;
    };
    const spin = (s: (typeof state)[number], by: number) => {
      s.rot += by;
      if (s.tile) s.tile.style.transform = "rotate(" + s.rot * 90 + "deg)";
    };
    const listeners: (() => void)[] = [];
    state.forEach((s) => {
      const on = () => {
        paint(s, true);
        spin(s, 1);
      };
      const off = () => paint(s, false);
      // Deliberately hover-only: the inversion reveals nothing that is not already on screen, so
      // giving six inert cells a tab stop each would cost keyboard users more than it returns.
      s.cell.addEventListener("pointerenter", on);
      s.cell.addEventListener("pointerleave", off);
      listeners.push(() => {
        s.cell.removeEventListener("pointerenter", on);
        s.cell.removeEventListener("pointerleave", off);
      });
    });

    let idle = 0;
    if (!reduced)
      idle = window.setInterval(() => {
        if (!wrap.isConnected) return;
        const r = wrap.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const s = state[(Math.random() * state.length) | 0];
        if (!s.hot) spin(s, Math.random() < 0.5 ? 1 : -1);
      }, 1600);

    return () => {
      io.disconnect();
      clearInterval(idle);
      timers.forEach(clearTimeout);
      state.forEach((s) => cancelAnimationFrame(s.raf));
      listeners.forEach((f) => f());
    };
  }, []);

  return (
    <section id="numbers" style={{ padding: "clamp(72px,10vw,140px) clamp(24px,6vw,96px)", background: PAL.leaf }}>
      <div className="athos-stats-wrap" style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 24,
            flexWrap: "wrap",
            paddingBottom: 18,
            borderBottom: "2px solid rgba(244,237,224,0.18)",
          }}
        >
          <h2 style={{ margin: 0, fontFamily: FONT_MONO, fontSize: 12, fontWeight: 400, letterSpacing: "0.22em", color: PAL.yellow }}>
            NUMBERS
          </h2>
          <p style={{ margin: 0, fontFamily: FONT_MONO, fontSize: 13, letterSpacing: "0.06em", color: INK.faint }}>
            all of these are true
          </p>
        </div>
        <div ref={gridRef} className="athos-stats">
          {STATS.map((s, i) => (
            <div
              key={i}
              data-stat=""
              style={{
                background: PAL.leaf,
                padding: s.pad,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: s.outerGap,
                transition: "background .28s ease,opacity .7s ease,transform .7s cubic-bezier(.2,.8,.2,1)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                <span
                  data-tile=""
                  style={{
                    flex: "none",
                    width: s.tileSize,
                    height: s.tileSize,
                    background: `linear-gradient(45deg,${onDark(s.accent)} 50%,transparent 50%)`,
                    borderRadius: RADIUS.mark,
                    transition: "transform .4s cubic-bezier(.2,.8,.2,1),background .28s ease",
                  }}
                />
                <span
                  data-label=""
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    color: INK.faint,
                    transition: "color .28s ease",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {/* Card 01 spans two rows whose height is set by its neighbours' copy, so it always
                  has slack. Auto margins centre that slack instead of dumping it all above the
                  number, which read as a misaligned grid. */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(18px,2.2vw,26px)",
                  margin: i === 0 ? "auto 0" : undefined,
                }}
              >
                <div>
                  <div
                    data-num=""
                    style={{
                      fontFamily: FONT_BLACK,
                      fontSize: s.numSize,
                      lineHeight: 0.88,
                      letterSpacing: "-0.03em",
                      color: onDark(s.accent),
                      fontVariantNumeric: "tabular-nums",
                      transition: "color .28s ease",
                    }}
                  >
                    {fmtStat(s, s.to)}
                  </div>
                  {/* Was mono. At 13-15px over 36ch it read as data, not as the sentence it is. */}
                  <div
                    data-label=""
                    style={{
                      fontSize: "clamp(14px,1.05vw,16px)",
                      lineHeight: 1.5,
                      marginTop: 14,
                      maxWidth: s.labelMax,
                      color: INK.soft,
                      textWrap: "pretty",
                      transition: "color .28s ease",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
                {/* The rule already says "a different kind of line follows". A repeated THE CALL
                    label above all six only made the grid read as a filled-in template. */}
                <div style={{ borderTop: "1px solid rgba(244,237,224,0.2)", paddingTop: 14, maxWidth: s.callMax }}>
                  <span
                    data-label=""
                    style={{
                      fontSize: s.callSize,
                      lineHeight: 1.5,
                      color: "rgba(244,237,224,0.92)",
                      textWrap: "pretty",
                      transition: "color .28s ease",
                    }}
                  >
                    {s.call}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
