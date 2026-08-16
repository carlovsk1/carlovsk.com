"use client";

import { Fragment, useEffect, useRef } from "react";
import { FONT_BLACK, FONT_MONO, PAL } from "@/lib/palette";

const BEFORE = ["Code", "is", "the", "cheap", "part", "now.", "Deciding", "what", "to", "build,", "and"];
const BLUE = ["refusing", "the", "states", "it", "must", "never", "reach"];
const AFTER = ["is", "the", "job."];

const WORD = { display: "inline-block" } as const;

export default function TheLine() {
  const lineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h = lineRef.current;
    if (!h) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = Array.from(h.querySelectorAll<HTMLElement>("[data-w]"));
    let played = false;
    let safety = 0;
    const clear = () =>
      words.forEach((w) => {
        w.style.animation = "none";
        w.style.opacity = "1";
        w.style.filter = "none";
        w.style.transform = "none";
      });
    words.forEach((w) => {
      w.style.opacity = "0";
      w.style.transform = "translate3d(0,0.42em,0) rotate(-1.2deg)";
      w.style.filter = "blur(6px)";
    });
    const play = () => {
      if (played) return;
      played = true;
      window.removeEventListener("scroll", check, true);
      // Nobody can watch an animation in a hidden tab, and withholding the copy waiting for one
      // is how the headline ends up permanently blank. Reveal it and drop the effect.
      if (document.hidden) {
        clear();
        return;
      }
      words.forEach((w, i) => {
        w.style.animation = "wordRise 0.78s cubic-bezier(0.16,1,0.3,1) " + (i * 0.045).toFixed(3) + "s both";
      });
      safety = window.setTimeout(clear, 2600);
    };
    const check = () => {
      const r = h.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      if (r.top < vh - Math.min(r.height * 0.35, vh * 0.22) && r.bottom > 0) play();
    };
    check();
    window.addEventListener("scroll", check, true);
    const t = window.setTimeout(play, 4000);
    return () => {
      clearTimeout(t);
      clearTimeout(safety);
      window.removeEventListener("scroll", check, true);
    };
  }, []);

  const spans = (ws: string[]) =>
    ws.map((w, i) => (
      <Fragment key={w + i}>
        {i > 0 && " "}
        <span data-w="" style={WORD}>
          {w}
        </span>
      </Fragment>
    ));

  return (
    <section
      id="the-line"
      style={{ background: PAL.sand, color: PAL.bg, padding: "clamp(72px,10vw,140px) clamp(24px,6vw,96px)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 12,
            letterSpacing: "0.22em",
            color: PAL.blue,
            marginBottom: 36,
          }}
        >
          THE LINE
        </div>
        <h2
          ref={lineRef}
          style={{
            margin: 0,
            fontFamily: FONT_BLACK,
            fontSize: "clamp(34px,5.4vw,84px)",
            lineHeight: 1.02,
            letterSpacing: "-0.015em",
            maxWidth: "20ch",
            textWrap: "pretty",
          }}
        >
          {spans(BEFORE)}{" "}
          <span style={{ color: PAL.blue }}>{spans(BLUE)}</span>
          {", "}
          {spans(AFTER)}
        </h2>
      </div>
    </section>
  );
}
