"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      [chipRef, nameRef, metaRef].forEach((ref) => {
        if (ref.current) gsap.set(ref.current, { opacity: 1 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.8 });

      tl.fromTo(
        chipRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          nameRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=0.3"
        )
        .fromTo(
          metaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center px-6 pt-32 pb-10 md:px-10"
    >
      <div className="flex flex-col items-center justify-center flex-1">
        <div
          ref={chipRef}
          className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-strong opacity-0"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Available
        </div>

        <h1
          ref={nameRef}
          className="text-center font-black uppercase leading-[0.85] tracking-[-0.04em] opacity-0"
          style={{ fontSize: "clamp(3rem, 15vw, 12rem)" }}
        >
          Carlovsk
        </h1>
      </div>

      <div
        ref={metaRef}
        className="mt-10 md:mt-12 flex flex-col gap-2 border-t border-border pt-5 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-muted opacity-0 md:flex-row md:items-center md:justify-between"
      >
        <p>Based in BR, Porto Seguro BA</p>
        <p className="hidden md:block" aria-hidden>
          ●
        </p>
        <p>Bubble Developer</p>
      </div>
    </section>
  );
}
