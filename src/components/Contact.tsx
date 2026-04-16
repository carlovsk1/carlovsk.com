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

    gsap.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        duration: 1,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        },
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      }
    );
  }, [prefersReducedMotion]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center bg-[#111] px-8 py-32 md:px-12"
    >
      <div className="mx-auto w-full max-w-5xl">
        <h2
          ref={headingRef}
          className="mb-20 text-5xl font-light leading-tight opacity-0 md:text-7xl lg:text-8xl"
        >
          Let&apos;s work
          <br />
          together
        </h2>

        <div ref={contentRef} className="opacity-0">
          <div className="relative flex items-center">
            <div className="h-px flex-1 bg-foreground/15" />
            <a
              href="mailto:carlovsk.edits@gmail.com"
              data-cursor-hover
              className="relative -my-24 ml-8 inline-flex h-48 w-48 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium text-white transition-transform duration-300 hover:scale-110"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-20 flex flex-col gap-4 sm:flex-row sm:gap-4">
            <a
              href="mailto:carlovsk.edits@gmail.com"
              data-cursor-hover
              className="cursor-pointer rounded-full border border-muted/50 px-8 py-4 text-sm font-light transition-colors duration-300 hover:bg-foreground hover:text-background"
            >
              carlovsk.edits@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/carlovsk/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="cursor-pointer rounded-full border border-muted/50 px-8 py-4 text-sm font-light transition-colors duration-300 hover:bg-foreground hover:text-background"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/1carlovsk/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="cursor-pointer rounded-full border border-muted/50 px-8 py-4 text-sm font-light transition-colors duration-300 hover:bg-foreground hover:text-background"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 flex w-full items-center justify-between px-8 py-6 md:px-12">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-[10px] font-light uppercase tracking-widest text-muted">
              Version
            </p>
            <p className="text-sm font-light">2026 Edition</p>
          </div>
          <div>
            <p className="text-[10px] font-light uppercase tracking-widest text-muted">
              Local time
            </p>
            <p className="text-sm font-light" suppressHydrationWarning>
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "America/Bahia",
              })}{" "}
              GMT-3
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <p className="text-[10px] font-light uppercase tracking-widest text-muted">
            Socials
          </p>
          <a
            href="https://linkedin.com/in/carlovsk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light transition-colors hover:text-foreground text-muted"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com/1carlovsk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light transition-colors hover:text-foreground text-muted"
          >
            Instagram
          </a>
          <a
            href="https://github.com/carlovsk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light transition-colors hover:text-foreground text-muted"
          >
            GitHub
          </a>
        </div>
      </footer>
    </section>
  );
}
