"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      [nameRef, locationRef, roleRef].forEach((ref) => {
        if (ref.current) gsap.set(ref.current, { opacity: 1 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.8 });

      tl.fromTo(
        nameRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 }
      )
        .fromTo(
          locationRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          roleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-end px-6 pb-16 md:px-12 lg:px-20"
    >
      <h1
        ref={nameRef}
        className="text-[15vw] md:text-[12vw] font-bold lowercase leading-[0.85] tracking-tighter opacity-0"
      >
        carlovsk
      </h1>

      <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p
          ref={locationRef}
          className="text-xs uppercase tracking-widest text-muted opacity-0"
        >
          Based in BR, Porto Seguro BA
        </p>

        <p ref={roleRef} className="opacity-0">
          <a
            href="#work"
            className="text-sm font-medium underline underline-offset-4 decoration-muted hover:decoration-foreground transition-colors"
          >
            Bubble Developer
          </a>
        </p>
      </div>
    </section>
  );
}
