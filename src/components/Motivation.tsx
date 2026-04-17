"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Motivation() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="px-6 md:px-10 py-24 md:py-32">
      <div
        ref={textRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start"
      >
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-[-0.02em]">
          Motivation
        </h2>

        <p className="text-base md:text-lg leading-relaxed text-muted-strong">
          carlovsk is motivated by the endless possibilities of technology and
          its power to simplify lives. He thrives on solving challenging
          problems and is continually inspired by seeing the positive impact
          his solutions have on users and businesses alike. Committed to
          lifelong learning and professional growth, he embraces every new
          challenge as an opportunity to innovate and excel.
        </p>
      </div>
    </section>
  );
}
