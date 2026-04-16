"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
      });

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
    <section ref={sectionRef} id="about" className="px-6 md:px-12 lg:px-20 py-24">
      <div ref={headingRef}>
        <p className="text-sm uppercase tracking-widest text-muted">More About</p>
        <h2 className="mt-2 text-5xl md:text-7xl font-bold">
          carlovsk<span className="text-muted">&copy;</span>
        </h2>
      </div>

      <div ref={textRef} className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 md:col-start-5">
          <p className="text-base md:text-lg leading-relaxed text-foreground/80">
            Carlos Henrique, professionally known as carlovsk, is a passionate Bubble
            Developer with a strong background in building dynamic, user-friendly web
            applications. Driven by innovation and efficiency, carlovsk excels in
            turning complex ideas into simple, functional digital solutions. He started
            his career at age 12 as a video editor, ventured into digital marketing
            selling info-products, and successfully managed three dropshipping
            e-commerce stores. A natural entrepreneur, he constantly seeks to create
            valuable solutions for others, leading him to discover and specialize in the
            NoCode platform Bubble.
          </p>

          <a
            href="https://drive.google.com/file/d/1K9hDVy3nky5zg8f_GgjPVR1ZQOQgku55/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full border border-foreground/30 px-6 py-3 text-xs font-medium uppercase tracking-widest transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
