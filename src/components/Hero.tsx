"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      [subtitleRef, titleRef, marqueeRef, locationRef].forEach((ref) => {
        if (ref.current) gsap.set(ref.current, { opacity: 1 });
      });
      return;
    }

    const tl = gsap.timeline({ delay: 0.8 });

    tl.fromTo(
      subtitleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        marqueeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        locationRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen flex-col justify-between overflow-hidden px-8 pt-28 pb-8 md:px-12"
    >
      <div className="flex flex-1 flex-col justify-center">
        <div ref={subtitleRef} className="mb-6 opacity-0">
          <p className="text-lg font-light text-muted md:text-xl">
            Software Engineer
          </p>
        </div>
        <div ref={titleRef} className="opacity-0">
          <h1 className="max-w-4xl text-4xl font-light leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Building digital experiences that make a difference
          </h1>
        </div>
      </div>

      <div ref={locationRef} className="mb-4 flex items-center gap-2 opacity-0">
        <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
        <span className="text-sm font-light text-muted">
          Available — Porto Seguro, Brazil
        </span>
      </div>

      <div
        ref={marqueeRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden opacity-0"
      >
        <div className="marquee flex whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="mx-4 inline-block text-[12vw] font-bold leading-none text-foreground/5"
            >
              carlovsk
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
