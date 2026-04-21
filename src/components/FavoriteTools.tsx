"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stack } from "@/lib/data";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function FavouriteStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stack-item").forEach((item, i) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="px-6 md:px-10 py-24 md:py-40">
      <h2
        className="mb-12 md:mb-16 font-black uppercase tracking-[-0.02em]"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        Favourite
        <br />
        Stack
      </h2>

      <div className="flex flex-col gap-3">
        {stack.map((item) => (
          <div
            key={item.name}
            className="stack-item rounded-lg bg-surface p-5 md:p-6 grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_2fr] gap-4 md:gap-6 items-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-background text-muted-strong text-xs font-semibold uppercase">
              {item.name.slice(0, 1)}
            </div>
            <div className="flex flex-col">
              <h3 className="text-base md:text-lg font-semibold uppercase tracking-wider">
                {item.name}
              </h3>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
                {item.category}
              </p>
            </div>
            <p className="col-span-2 md:col-span-1 text-sm text-muted-strong leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
