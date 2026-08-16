"use client";

import { useEffect, useState } from "react";

export type RailSection = { id: string; label: string; ground: "dark" | "light" };

/**
 * Wayfinding for a page that is ~14 screens tall. One tile per section, borrowing the mural's
 * vocabulary rather than importing a navbar: the active tile turns 90deg and takes the accent.
 *
 * Geometry rather than IntersectionObserver on purpose. Ratios punish sections taller than the
 * viewport (a 7-screen section never clears 0.15) and leave the rail on a stale tile whenever a
 * section is entered without an entry firing, such as a restored scroll position or a #hash load.
 */
export default function SectionRail({ sections }: { sections: RailSection[] }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Cached so scrolling is pure arithmetic: no layout reads per event, and nothing that a
    // throttled requestAnimationFrame can leave stale.
    let tops: number[] = [];
    const remeasure = () => {
      tops = sections.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
      });
    };

    const onScroll = () => {
      // The section owning the upper third of the viewport is the one being read.
      const line = window.scrollY + window.innerHeight * 0.35;
      let next = 0;
      for (let i = 0; i < tops.length; i++) if (tops[i] <= line) next = i;
      setActive(next);
      setVisible(window.scrollY > window.innerHeight * 0.75);
    };

    const onResize = () => {
      remeasure();
      onScroll();
    };

    // Mount can run before the browser has applied a #hash jump or restored a back-button scroll
    // position, and nothing corrects that until the reader scrolls. Measuring again on the next
    // task catches the cases where the final position lands just after the event.
    const settle = () => {
      onResize();
      window.setTimeout(onResize, 0);
    };

    settle();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pageshow", settle);
    window.addEventListener("hashchange", settle);
    // Sticky sections settle after fonts and images land, which moves every top below them.
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pageshow", settle);
      window.removeEventListener("hashchange", settle);
      ro.disconnect();
    };
  }, [sections]);

  return (
    <nav aria-label="Sections">
      <ul className="athos-rail" data-visible={visible} data-ground={sections[active]?.ground ?? "dark"}>
        {sections.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              aria-current={i === active}
              aria-label={s.label}
              title={s.label}
              onClick={() =>
                document.getElementById(s.id)?.scrollIntoView({
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                  block: "start",
                })
              }
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
