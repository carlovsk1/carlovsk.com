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
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-24">
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight mb-16">
        My Experience
      </h2>

      <div className="space-y-0 border-t border-border">
        {experience.map((exp) => (
          <div
            key={`${exp.company}-${exp.period}`}
            className="exp-item group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-border hover:bg-white/5 transition-colors duration-300 px-4 -mx-4"
          >
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-medium">
                {exp.role}
              </h3>
              <p className="text-muted text-sm mt-1">{exp.company}</p>
            </div>
            <p className="text-muted text-sm mt-2 md:mt-0">{exp.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
