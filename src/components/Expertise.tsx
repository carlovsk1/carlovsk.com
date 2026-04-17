"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expertise } from "@/lib/data";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".expertise-item").forEach((item, i) => {
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
        className="mb-12 md:mb-16 font-black uppercase leading-[0.85] tracking-[-0.04em]"
        style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)" }}
      >
        My
        <br />
        Expertise
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {expertise.map((item) => (
          <div
            key={item.number}
            className="expertise-item rounded-lg bg-surface px-6 py-8"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
              ({item.number})
            </span>
            <h3 className="mt-6 text-lg font-semibold uppercase tracking-wider">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-muted-strong leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
