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
    <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-24">
      <h2 className="text-sm uppercase tracking-widest text-muted mb-16">
        Experience
      </h2>

      <div className="space-y-0 border-t border-border">
        {experience.map((exp) => (
          <div
            key={`${exp.company}-${exp.period}`}
            className="exp-item group border-b border-border py-8 hover:bg-white/5 transition-colors duration-300 px-4 -mx-4"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-muted">
                  {exp.company}
                </p>
                <h3 className="mt-1 text-xl md:text-2xl font-semibold uppercase">
                  {exp.role}
                </h3>
              </div>
              <p className="text-sm text-muted shrink-0">{exp.period}</p>
            </div>
            <p className="mt-3 text-sm text-muted/80 max-w-2xl leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
