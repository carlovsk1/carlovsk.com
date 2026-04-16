"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/lib/data";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      itemsRef.current.forEach((item) => {
        if (item) gsap.set(item, { opacity: 1 });
      });
      return;
    }

    itemsRef.current.forEach((item) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          duration: 0.7,
          ease: "power3.out",
        }
      );
    });
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="px-8 py-32 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-sm font-light uppercase tracking-widest text-muted">
            The journey
          </p>
        </div>
        <div className="md:col-span-8">
          {experience.map((exp, i) => (
            <div
              key={`${exp.company}-${exp.period}`}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="group flex flex-col justify-between gap-2 border-b border-border py-6 opacity-0 md:flex-row md:items-center"
            >
              <div>
                <h4 className="text-lg font-medium transition-colors duration-300 group-hover:text-accent">{exp.role}</h4>
                <p className="text-sm font-light text-muted">{exp.company}</p>
              </div>
              <p className="text-sm font-light text-muted">{exp.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
