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
    <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-24">
      <h2 className="text-sm uppercase tracking-widest text-muted mb-8">
        Motivation
      </h2>

      <div ref={textRef} className="max-w-3xl">
        <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
          carlovsk is motivated by the endless possibilities of technology and its
          power to simplify lives. He thrives on solving challenging problems and is
          continually inspired by seeing the positive impact his solutions have on
          users and businesses alike. Committed to lifelong learning and professional
          growth, he embraces every new challenge as an opportunity to innovate and
          excel.
        </p>
      </div>
    </section>
  );
}
