"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      const words = textRef.current?.querySelectorAll(".word");
      words?.forEach((w) => gsap.set(w, { opacity: 1 }));
      if (btnRef.current) gsap.set(btnRef.current, { opacity: 1 });
      return;
    }

    const words = textRef.current?.querySelectorAll(".word");
    if (!words) return;

    gsap.fromTo(
      words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      btnRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: btnRef.current,
          start: "top 85%",
        },
        duration: 0.8,
        ease: "power3.out",
      }
    );
  }, [prefersReducedMotion]);

  const text =
    "From video editing at 12 to building scalable web applications — my journey has always been about creating. Today I combine design thinking with engineering to build products that users love.";

  const splitText = text.split(" ").map((word, i) => (
    <span key={i} className="word inline-block">
      {word}&nbsp;
    </span>
  ));

  return (
    <section
      id="about"
      ref={sectionRef}
      className="flex min-h-screen flex-col justify-center px-8 py-32 md:px-12"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-sm font-light uppercase tracking-widest text-muted">
            About me
          </p>
        </div>
        <div className="md:col-span-8">
          <p
            ref={textRef}
            className="text-3xl font-light leading-relaxed md:text-4xl lg:text-5xl"
          >
            {splitText}
          </p>
          <a
            ref={btnRef}
            href="#contact"
            data-cursor-hover
            className="group mt-16 inline-flex h-32 w-32 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition-transform duration-300 hover:scale-110 md:h-40 md:w-40"
            style={{ opacity: 0 }}
          >
            Let&apos;s talk
          </a>
        </div>
      </div>
    </section>
  );
}
