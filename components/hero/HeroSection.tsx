"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroSectionProps } from "./types";
import { HeroBackground } from "./HeroBackground";
import { HeroTagline } from "./HeroTagline";
import { HeroHeadline } from "./HeroHeadline";

/**
 * HeroSection
 * Single Responsibility: Master Orchestrator for the KV STUDIO Hero layout and choreographed GSAP intro.
 * Choreography:
 * 1. Black curtain covers the entire section.
 * 2. HeroHeadline reveals letter-by-letter on the black curtain (each line progressively slower).
 * 3. Curtain wipes / collapses towards the left edge to reveal the background image.
 * 4. As the curtain sweeps left, and HeroTagline are pulled in dynamically.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImageUrl = "/hero-bg.webp",
  backgroundVideoUrl = "https://res.cloudinary.com/hxytmocg/video/upload/v1793529386/close_to_building.mp4",
}) => {

  const sectionRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !curtainRef.current) return;

    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({ delay: 0.2 });

      // 1. Initial State:
      // Curtain covers the entire background
      gsap.set(curtainRef.current, {
        scaleX: 1,
        transformOrigin: "left center",
      });

      // Target elements
      const navbar = sectionRef.current?.querySelector("header");
      const sectorLine = sectionRef.current?.querySelector(".sector-pointer-line line");

      const tagline1 = sectionRef.current?.querySelector(".tagline-line-1");
      const tagline2 = sectionRef.current?.querySelector(".tagline-line-2");
      const taglineUnderlinePath = sectionRef.current?.querySelector(".tagline-underline-path path");
      const taglineScribble = sectionRef.current?.querySelector(".tagline-scribble");

      const chars1 = sectionRef.current?.querySelectorAll(".headline-line-1 .headline-char");
      const chars2 = sectionRef.current?.querySelectorAll(".headline-line-2 .headline-char");
      const chars3 = sectionRef.current?.querySelectorAll(".headline-line-3 .headline-char");

      // Navbar is visible from the very start on the black intro curtain
      if (navbar) gsap.set(navbar, { opacity: 1, y: 0 });
      if (tagline1) gsap.set(tagline1, { opacity: 0, x: 280, filter: "blur(6px)" });
      if (tagline2) gsap.set(tagline2, { opacity: 0, x: 340, filter: "blur(8px)" });

      // Set initial SVG stroke dash for drawing effects
      if (sectorLine) {
        const lineElem = sectorLine as SVGLineElement;
        const len = lineElem.getTotalLength ? lineElem.getTotalLength() : 120;
        gsap.set(lineElem, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      }

      if (taglineUnderlinePath) {
        const pathElem = taglineUnderlinePath as SVGPathElement;
        const len = pathElem.getTotalLength ? pathElem.getTotalLength() : 200;
        gsap.set(pathElem, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      }

      // --- PHASE 1: HeroHeadline appears letter-by-letter on the black curtain ---
      // Line 1: RIO
      if (chars1 && chars1.length > 0) {
        masterTl.fromTo(
          chars1,
          { opacity: 0, x: 40, scale: 0.95, filter: "blur(6px)" },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: 0.02,
            ease: "power2.out",
          }
        );
      }

      // Line 2: KV STUDIO KNOWS 
      if (chars2 && chars2.length > 0) {
        masterTl.fromTo(
          chars2,
          { opacity: 0, x: 48, scale: 0.94, filter: "blur(8px)" },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.95,
            stagger: 0.028,
            ease: "power3.out",
          },
          "-=0.45"
        );
      }

      // Line 3: CAPE TOWN 
      if (chars3 && chars3.length > 0) {
        masterTl.fromTo(
          chars3,
          { opacity: 0, x: 58, scale: 0.93, filter: "blur(10px)" },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.032,
            ease: "power3.out",
          },
          "-=0.5"
        );
      }

      // --- PHASE 2: Black curtain collapses / shrinks towards the LEFT edge immediately after headline finishes ---
      masterTl.to(curtainRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.35,
        ease: "power4.inOut",
      });

      // Draw sector pointer line
      if (sectorLine) {
        masterTl.to(
          sectorLine,
          { strokeDashoffset: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );
      }

      // 3. Tagline on Right (line 2 slower than line 1)
      if (tagline1) {
        masterTl.to(
          tagline1,
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.85, ease: "power3.out" },
          "-=1.1"
        );
      }
      if (tagline2) {
        masterTl.to(
          tagline2,
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.15, ease: "power4.out" },
          "-=0.9"
        );
      }

      // Draw golden underline & ambient scribble
      if (taglineUnderlinePath) {
        masterTl.to(
          taglineUnderlinePath,
          { strokeDashoffset: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
          "-=0.4"
        );
      }

      if (taglineScribble) {
        masterTl.to(taglineScribble, { opacity: 0.6, duration: 0.8, ease: "power2.out" }, "-=0.5");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [ ]);

  return (
    <section ref={sectionRef}
      className="relative w-full h-dvh flex flex-col justify-between overflow-hidden text-white"
    >
      {/* 1. Cinematic Background Visual Layer (z-0) */}
      <HeroBackground imageUrl={backgroundImageUrl} videoUrl={backgroundVideoUrl} />

      {/* 2. Intro Black Curtain (z-10, covers entire screen initially, then sweeps left) */}
      <div ref={curtainRef}
        className="absolute inset-0 bg-background z-10 origin-left will-change-transform pointer-events-none" />

      {/* 3. Top Spacing Placeholder for Unified Global Navbar */}
      <div className="w-full pt-8 sm:pt-12 pb-4 px-6 sm:px-12 md:px-16 lg:px-20 h-20 sm:h-24 pointer-events-none" />

      {/* 4. Middle Content Section: Sectors on Left, Tagline on Right (z-20) */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 flex flex-col sm:flex-row sm:items-start justify-between gap-6 z-20">

        {/* Right Value Proposition Statement */}
        <HeroTagline
          text={"CRAFTING IMMERSIVE DIGITAL REALITIES"}
          highlightText={"KNOWLEDGE + VISION."}
        />
      </div>

      {/* 5. Bottom Giant Headline Section (z-20, sits above the curtain to appear first) */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 pb-4 sm:pb-6 md:pb-8 z-20">
        <HeroHeadline line={"KNOWLEGEPLUSVISION"} />
      </div>
    </section>
  );
};
