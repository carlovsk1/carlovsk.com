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
    <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-24">
      <h2 className="text-sm uppercase tracking-widest text-muted mb-16">
        My expertise
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {expertise.map((item) => (
          <div
            key={item.number}
            className="expertise-item rounded-xl border border-border p-6 hover:bg-white/5 transition-colors duration-300"
          >
            <span className="text-3xl font-bold text-foreground/20">
              {item.number}
            </span>
            <h3 className="mt-4 text-lg font-semibold uppercase">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
