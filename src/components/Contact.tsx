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
      className="px-6 md:px-12 lg:px-20 py-32 text-center"
    >
      <div ref={headingRef} className="opacity-0">
        <p className="text-sm uppercase tracking-widest text-muted">
          Let&apos;s Work
        </p>
        <h2 className="mt-2 text-6xl md:text-8xl lg:text-9xl font-bold uppercase">
          Together
        </h2>
      </div>

      <div ref={contentRef} className="mt-12 opacity-0">
        <p className="mx-auto max-w-2xl text-sm uppercase tracking-wider text-muted leading-relaxed">
          Based in Brazil, I am an innovative Bubble Developer and entrepreneur.
          My passion for intuitive user experiences, elegant solutions, and
          simplifying complex processes is evident in my work.
        </p>

        <a
          href="mailto:carlovsk.edits@gmail.com"
          className="mt-10 inline-block rounded-full border border-foreground/30 px-8 py-4 text-xs font-medium uppercase tracking-widest transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          Contact Now
        </a>
      </div>
    </section>
  );
}
