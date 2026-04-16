"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      [headingRef, imageRef, subtitleRef].forEach((ref) => {
        if (ref.current) gsap.set(ref.current, { opacity: 1 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.5 });

      tl.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          imageRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-20"
    >
      <h1
        ref={headingRef}
        className="text-5xl md:text-7xl lg:text-[8rem] font-bold uppercase leading-[0.9] tracking-tight opacity-0"
      >
        Death Reborn
        <br />
        Lunatic
      </h1>

      <div ref={imageRef} className="relative mt-12 w-full max-w-4xl opacity-0">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#2a2a2a]">
          <Image
            src="/images/hero-laptop.webp"
            alt="Featured project preview"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          />
        </div>
      </div>

      <p
        ref={subtitleRef}
        className="mt-8 text-lg md:text-xl text-muted max-w-xl opacity-0"
      >
        Software Engineer — Porto Seguro, Brazil
      </p>
    </section>
  );
}
