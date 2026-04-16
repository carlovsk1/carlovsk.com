"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Motivation from "@/components/Motivation";
import FavoriteTools from "@/components/FavoriteTools";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
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
        <Projects />
        <About />
        <Experience />
        <Motivation />
        <FavoriteTools />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
