"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
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
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-6 md:px-12 lg:px-20 py-24"
    >
      <h2
        ref={headingRef}
        className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight"
      >
        More About
        <br />
        Carlovsk
      </h2>

      <div
        ref={textRef}
        className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8"
      >
        <div className="md:col-span-4">
          <p className="text-sm uppercase tracking-widest text-muted">
            Who I Am
          </p>
        </div>

        <div className="md:col-span-8 space-y-6">
          <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
            I&apos;m a software engineer from Porto Seguro, Brazil, passionate
            about building digital products that solve real problems. With years
            of experience spanning no-code platforms, full-stack development, and
            AI integration, I bring ideas to life through clean, functional
            design.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
            My journey started as a video editor, evolved through
            e-commerce and info products, and led me to software engineering
            where I found my true calling — creating tools that empower people.
          </p>

          <a
            href="#contact"
            className="inline-block mt-4 text-sm uppercase tracking-widest border border-foreground/30 px-6 py-3 rounded-full hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Let&apos;s talk
          </a>
        </div>
      </div>
    </section>
  );
}
