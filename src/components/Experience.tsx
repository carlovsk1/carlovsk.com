"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/lib/data";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".exp-item").forEach((item, i) => {
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
        Experience
      </h2>

      <div className="border-t border-border">
        {experience.map((exp) => (
          <div
            key={`${exp.company}-${exp.period}`}
            className="exp-item border-b border-border py-6 md:py-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 md:items-baseline">
              <h3 className="md:col-span-4 text-base md:text-lg font-semibold uppercase tracking-wider">
                {exp.company}
              </h3>
              <p className="md:col-span-5 text-[11px] uppercase tracking-[0.2em] text-muted-strong">
                {exp.role}
              </p>
              <p className="md:col-span-3 text-[11px] uppercase tracking-[0.2em] text-muted md:text-right">
                {exp.period}
              </p>
            </div>
            <p className="mt-3 md:mt-4 md:ml-[33%] text-sm text-muted-strong max-w-2xl leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
