"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      if (headingRef.current) gsap.set(headingRef.current, { opacity: 1 });
      if (contentRef.current) gsap.set(contentRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
      });

      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="px-6 md:px-10 py-16 md:py-24 text-center"
    >
      <div ref={headingRef} className="opacity-0">
        <h2
          className="font-black uppercase leading-[0.85] tracking-[-0.04em]"
          style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
        >
          Let&apos;s work
          <br />
          Together
        </h2>
      </div>

      <div ref={contentRef} className="mt-12 opacity-0">
        <a
          href="mailto:carlovsk.edits@gmail.com"
          className="inline-block rounded-full border border-border px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          Contact Now
        </a>
      </div>
    </section>
  );
}
