"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioFeatureItem } from "./types";

interface PortfolioItemProps {
  item: PortfolioFeatureItem;
  isReversed?: boolean;
}

export const PortfolioItem: React.FC<PortfolioItemProps> = ({
  item,
  isReversed = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const expandBoxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const innerMediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current || !expandBoxRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const expandBox = expandBoxRef.current;
      const innerMedia = innerMediaRef.current;

      const badgeElem = sectionRef.current?.querySelector(".portfolio-badge");
      const headlineElem = sectionRef.current?.querySelector(".portfolio-headline");
      const descElem = sectionRef.current?.querySelector(".portfolio-desc");
      const highlightItems = sectionRef.current?.querySelectorAll(".portfolio-highlight");

      // 1. Initial State: Width is 0%, anchored to side adjacent to text
      gsap.set(expandBox, {
        width: "0%",
        opacity: 0.4,
        transformOrigin: isReversed ? "right center" : "left center",
      });

      if (innerMedia) {
        gsap.set(innerMedia, {
          scale: 1.12,
        });
      }

      // Initial State: Ultra-clean typography starting positions (no rotation, no heavy blur)
      if (badgeElem) {
        gsap.set(badgeElem, { opacity: 0, y: 16 });
      }
      if (headlineElem) {
        gsap.set(headlineElem, { opacity: 0, y: 38 });
      }
      if (descElem) {
        gsap.set(descElem, { opacity: 0, y: 22 });
      }
      if (highlightItems && highlightItems.length > 0) {
        gsap.set(highlightItems, { opacity: 0, y: 16 });
      }

      let isExpanded = false;

      // Expand Handler (Width 0% -> 100% + Choreographed Typography Reveal)
      const expand = () => {
        if (isExpanded) return;
        isExpanded = true;

        // Image container expands smoothly outward
        gsap.to(expandBox, {
          width: "100%",
          opacity: 1,
          duration: 1.15,
          ease: "power3.out",
          overwrite: "auto",
        });

        if (innerMedia) {
          gsap.to(innerMedia, {
            scale: 1.0,
            duration: 1.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        // 1. Monospace Tag & Step Indicator
        if (badgeElem) {
          gsap.to(badgeElem, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            delay: 0.05,
            overwrite: "auto",
          });
        }

        // 2. Majestic Headline Reveal through Mask
        if (headlineElem) {
          gsap.to(headlineElem, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            delay: 0.12,
            overwrite: "auto",
          });
        }

        // 3. Crisp Description Paragraph
        if (descElem) {
          gsap.to(descElem, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            delay: 0.22,
            overwrite: "auto",
          });
        }

        // 4. Feature Checklist Cascade
        if (highlightItems && highlightItems.length > 0) {
          gsap.to(highlightItems, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.32,
            overwrite: "auto",
          });
        }
      };

      // Shrink Handler (Width 100% -> 0% - ONLY triggered when scrolling UP out of the section)
      const shrink = () => {
        if (!isExpanded) return;
        isExpanded = false;

        // Image shrinks back smoothly toward the text
        gsap.to(expandBox, {
          width: "0%",
          opacity: 0.4,
          duration: 0.95,
          ease: "power3.inOut",
          overwrite: "auto",
        });

        if (innerMedia) {
          gsap.to(innerMedia, {
            scale: 1.12,
            duration: 0.95,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }

        // Text resets smoothly so it re-reveals cleanly when scrolling back down
        const textElements = [
          badgeElem,
          headlineElem,
          descElem,
          ...(highlightItems ? Array.from(highlightItems) : []),
        ].filter(Boolean);

        if (textElements.length > 0) {
          gsap.to(textElements, {
            opacity: 0,
            y: 16,
            duration: 0.4,
            stagger: 0.02,
            ease: "power2.in",
            overwrite: "auto",
          });
        }
      };

      // Single Unified ScrollTrigger:
      // - onEnter (scrolling DOWN): Expands to 100% and stays 100% while reading
      // - onLeaveBack (scrolling UP): Shrinks back to 0% in plain sight as you exit the section towards the top
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 78%",
        onEnter: () => expand(),
        onLeaveBack: () => shrink(),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReversed]);

  return (
    <div
      id={item.id}
      ref={sectionRef}
      className="relative w-full py-12 sm:py-16 md:py-20 scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-14">

        {/* ================= TEXT CONTENT COLUMN ================= */}
        <div
          ref={textRef}
          className={`w-full lg:w-5/12 flex flex-col gap-5 ${
            isReversed ? "lg:order-2" : "lg:order-1"
          }`}
        >
          {/* Eyebrow Tag & Monospace Indicator */}
          <div className="portfolio-badge flex items-center gap-2.5 will-change-transform">
            <span className="w-2 h-2 rounded-full bg-[#00c8ff] shadow-[0_0_8px_rgba(0,200,255,0.7)]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#00c8ff]">
              {item.tag}
            </span>
            <span className="text-xs text-white/30 font-mono">// {item.stepNumber}</span>
          </div>

          {/* Masked Headline Elevation */}
          <div className="overflow-hidden py-1">
            <h2 className="portfolio-headline font-['BlauerNue',sans-serif] text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-extrabold text-white tracking-tight leading-[1.2] will-change-transform">
              {item.tagline}
            </h2>
          </div>

          {/* Crystal-Clear Description Paragraph */}
          <p className="portfolio-desc font-['Rubik',sans-serif] text-sm sm:text-base text-white/70 leading-relaxed font-normal will-change-transform">
            {item.description}
          </p>

          {/* High-Tech Telemetry Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {item.highlights.map((highlight, idx) => (
              <span
                key={idx}
                className="portfolio-highlight px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-[11px] font-bold text-[#00c8ff] uppercase tracking-wider will-change-transform flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c8ff] animate-pulse" />
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* ================= EXPANDING IMAGE SHOWCASE COLUMN (VOOM Style) ================= */}
        <div
          className={`w-full lg:w-7/12 flex ${
            isReversed ? "justify-end lg:order-1" : "justify-start lg:order-2"
          }`}
        >
          {/* Sleek reduced height container (lg:h-[315px] for cinematic widescreen ratio) */}
          <div
            ref={expandBoxRef}
            className="relative h-52.5 sm:h-62.5 md:h-71.25 lg:h-78.75 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-black/80"
          >
            {/* Inner Media anchored adjacent to text, expanding outward */}
            <div
              ref={innerMediaRef}
              className={`absolute top-0 h-full w-full min-w-85 sm:min-w-125 lg:min-w-160 max-w-none select-none ${
                isReversed ? "right-0" : "left-0"
              }`}
            >
              {/* Showcase 3D Render Image */}
              <Image
                src={item.imageUrl}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority={item.stepNumber === "01"}
              />

              {/* Ambient Vignette Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
