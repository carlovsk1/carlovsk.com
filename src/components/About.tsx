"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

const PARAGRAPHS = [
  "Most developers learn to code in a classroom. I learned by shipping things people paid for. At 12, editing videos. At 15, selling info-products online. Then three e-commerce stores \u2014 scaling, breaking, fixing, figuring out what actually makes someone click \u201Cbuy.\u201D Every project taught me the same lesson: ideas are cheap, execution is everything. That's what pulled me into Bubble \u2014 turning concepts into working products in days, not months. Today I build digital experiences with the same obsession: ship fast, learn faster, and cut every friction between an idea and a real user. I don't just write code. I build things people use.",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
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

      const words =
        paragraphRef.current?.querySelectorAll<HTMLSpanElement>("[data-word]");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.15 },
          {
            opacity: 1,
            ease: "none",
            duration: 2,
            stagger: 0.3,
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: "top 75%",
              end: "bottom 40%",
              scrub: 0.8,
            },
          }
        );
      }

      gsap.from(buttonRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: buttonRef.current, start: "top 90%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-6 md:px-10 py-24 md:py-40 text-center"
    >
      <div ref={headingRef}>
        <h2
          className="font-black uppercase leading-[0.85] tracking-[-0.04em]"
          style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)" }}
        >
          More about
          <br />
          Carlovsk<span className="text-muted">&copy;</span>
        </h2>
      </div>

      <div ref={textRef} className="mt-16 flex flex-col items-center">
        <div
          ref={paragraphRef}
          className="max-w-3xl text-2xl md:text-4xl leading-[1.25] text-foreground"
        >
          {PARAGRAPHS.map((paragraph, i) => {
            const words = paragraph.split(" ");
            return (
              <p key={i}>
                {words.map((word, j) => (
                  <span key={j}>
                    <span data-word>{word}</span>
                    {j < words.length - 1 && " "}
                  </span>
                ))}
              </p>
            );
          })}
        </div>

        <a
          ref={buttonRef}
          href="https://drive.google.com/file/d/1K9hDVy3nky5zg8f_GgjPVR1ZQOQgku55/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-full border border-border px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}
