"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
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
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
        },
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
      <h2
        ref={headingRef}
        className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight opacity-0"
      >
        Let&apos;s Work
        <br />
        Together
      </h2>

      <div ref={contentRef} className="opacity-0">
        <a
          href="mailto:carlovsk.edits@gmail.com"
          className="inline-block mt-12 text-sm uppercase tracking-widest border border-foreground/30 px-8 py-4 rounded-full hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          Get in touch
        </a>

        <div className="flex justify-center gap-8 mt-12">
          <a
            href="mailto:carlovsk.edits@gmail.com"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/carlovsk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com/1carlovsk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://github.com/carlovsk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
