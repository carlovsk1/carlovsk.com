"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Intro />
        <Projects />
        <Journey />
        <Contact />
      </main>
    </>
  );
}
