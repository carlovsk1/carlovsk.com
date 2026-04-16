"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Motivation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
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

      gsap.utils.toArray<HTMLElement>(".collage-item").forEach((item, i) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: collageRef.current,
            start: "top 75%",
          },
        });
      });

      gsap.from(statementRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statementRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const collageImages = [
    { src: "/images/motivation/collage-1.webp", alt: "Inspiration 1" },
    { src: "/images/motivation/collage-2.webp", alt: "Inspiration 2" },
    { src: "/images/motivation/collage-3.webp", alt: "Inspiration 3" },
    { src: "/images/motivation/collage-4.webp", alt: "Inspiration 4" },
  ];

  return (
    <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-24">
      <h2
        ref={headingRef}
        className="text-sm uppercase tracking-widest text-muted mb-12"
      >
        Motivation
      </h2>

      <div
        ref={collageRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
      >
        {collageImages.map((img, i) => (
          <div
            key={img.src}
            className={`collage-item relative overflow-hidden rounded-lg bg-[#222] ${
              i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes={i === 0 ? "50vw" : "25vw"}
            />
          </div>
        ))}
      </div>

      <h3
        ref={statementRef}
        className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase leading-[0.95] max-w-5xl"
      >
        Turn Your
        <br />
        Ideas Into
        <br />
        Reality
      </h3>
    </section>
  );
}
