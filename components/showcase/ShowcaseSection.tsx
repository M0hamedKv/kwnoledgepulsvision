"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShowcaseSectionProps, ShowcaseItem } from "./types";

const DEFAULT_ITEMS: ShowcaseItem[] = [
  {
    id: "hero-vid-1",
    video: "/Hero/close to building.mp4",
    alt: "Architectural Exterior Facade Perspective",
  },
  {
    id: "hero-vid-2",
    video: "/Hero/street 2.mp4",
    alt: "Urban Streetscape & Compound Promenade",
  },
  {
    id: "hero-vid-3",
    video: "/Hero/CAM-PADEL_Interactive LightMix_FINALmp4.mp4",
    alt: "Structural Glass Padel Pavilion",
  },
  {
    id: "hero-vid-4",
    video: "/Hero/track night.mp4",
    alt: "Night Atmospheric Illumination Master Track",
  },
  {
    id: "hero-vid-5",
    video: "/Hero/Untitled-5.mp4",
    alt: "Cinematic Modern Architectural Visualization",
  },
];

/**
 * ShowcaseSection
 * Single Responsibility: Dynamic scroll-driven multi-image showcase transition.
 *
 * Architecture:
 * - Uses native CSS `sticky top-0` so the viewport stays completely stationary.
 * - The next section (ServicesSection) scrolls naturally up OVER IT like a clean curtain.
 * - Zero JS hacks, zero glitching, rock-solid performance.
 */
export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  children,
  primaryColor,
  items = DEFAULT_ITEMS,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const pillarRef = useRef<HTMLDivElement>(null);

  // Dynamic scroll track height scaled to the number of images:
  // - animVh: Scroll distance to expand pillar & cycle through all images
  // - curtainVh: 100vh for ServicesSection to slide up over the stationary last image
  const animVh = Math.max(items.length * 100 + 80, 360);
  const curtainVh = 100;
  const totalTrackHeight = `${animVh + curtainVh}vh`;

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || !stickyRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const pillar = pillarRef.current;
      const stickyElem = stickyRef.current;
      if (!pillar || !stickyElem || !containerRef.current) return;

      // Master Scroll-scrubbed timeline tracked to the parent scroll container.
      // Pins stickyElem to top: 0 so it stays 100% stationary throughout the images sequence
      // AND while ServicesSection ascends over it.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          pin: stickyElem,
          pinSpacing: false,
          scrub: 0.8,
        },
      });

      // 1. Initial Pillar State (100% invisible at scroll 0, no dash before scroll)
      gsap.set(pillar, {
        scaleY: 0,
        scaleX: 0.025,
        opacity: 0,
        transformOrigin: "center center",
      });

      // 2. Query all dynamic card elements inside the sticky viewport
      const cards = stickyElem.querySelectorAll<HTMLDivElement>(".showcase-card");

      cards.forEach((card) => {
        gsap.set(card, {
          width: "280px",
          height: "280px",
          scale: 0.4,
          opacity: 0,
        });
      });

      // PHASE 1: As user scrolls down, rectangle appears immediately and grows vertically from 0
      tl.to(
        pillar,
        {
          opacity: 1,
          duration: 0.03,
          ease: "none",
        },
        0
      );

      tl.fromTo(
        pillar,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "none",
        },
        0
      );

      // PHASE 2: Rectangle expands horizontally to BOTH left and right equally
      tl.to(
        pillar,
        {
          scaleX: 1,
          duration: 1.2,
          ease: "none",
        },
        "+=0.05"
      );

      // PHASE 3+: DYNAMIC RECURSIVE SEQUENCE FOR ANY NUMBER OF IMAGES
      cards.forEach((card, index) => {
        if (index === 0) {
          // First image emerges in center while orange background finishes widening
          tl.fromTo(
            card,
            {
              width: "280px",
              height: "280px",
              scale: 0.4,
              opacity: 0,
            },
            {
              width: "280px",
              height: "280px",
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "none",
            },
            "-=0.4"
          );

          // Brief hold to admire the square image
          tl.to({}, { duration: 0.25 });

          // First image GROWS TO FILL THE ENTIRE SCREEN (100vw x 100vh)
          tl.to(card, {
            width: "100vw",
            height: "100vh",
            maxWidth: "100vw",
            maxHeight: "100vh",
            duration: 1.6,
            ease: "none",
          });

          // Brief hold when full-screen
          tl.to({}, { duration: 0.3 });
        } else {
          // Every subsequent image emerges in center on top of the previous full-screen image
          tl.fromTo(
            card,
            {
              width: "280px",
              height: "280px",
              scale: 0.4,
              opacity: 0,
            },
            {
              width: "280px",
              height: "280px",
              scale: 1,
              opacity: 1,
              duration: 0.7,
              ease: "none",
            }
          );

          // Brief hold
          tl.to({}, { duration: 0.25 });

          // Grows to fill the entire screen
          tl.to(card, {
            width: "100vw",
            height: "100vh",
            maxWidth: "100vw",
            maxHeight: "100vh",
            duration: 1.6,
            ease: "none",
          });

          // Brief hold when full-screen
          tl.to({}, { duration: 0.3 });
        }
      });

      // Final curtain hold: keep the last image 100% full screen & stationary
      // while ServicesSection ascends over it during the 100vh curtain scroll.
      const animDuration = tl.duration();
      const curtainHoldDuration = (curtainVh / animVh) * animDuration;
      tl.to({}, { duration: curtainHoldDuration });
    }, containerRef);

    return () => ctx.revert();
  }, [items, animVh, curtainVh]);

  // Centralized color: uses custom prop or fallback to CSS token in globals.css
  const activeBgColor = primaryColor || "black";

  return (
    <div
      ref={containerRef}
      style={{ height: totalTrackHeight }}
      className="relative w-full bg-black select-none"
    >
      {/* Pinned Viewport Layer: Pinned to top: 0 with GSAP ScrollTrigger for 100% rock-solid stationary position */}
      <div
        ref={stickyRef}
        className="relative w-full h-screen overflow-hidden bg-black z-20"
      >
        {/* 0. Base Hero Layer */}
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto">
          {children}
        </div>

        {/* 1. Expanding Rectangle: 100% hidden at scroll 0, emerges and grows on scroll */}
        <div
          ref={pillarRef}
          style={{
            backgroundColor: activeBgColor,
            opacity: 0,
            transform: "scaleY(0) scaleX(0.025)",
          }}
          className="absolute inset-0 z-20 will-change-transform origin-center pointer-events-none rounded-none"
        />

        {/* 2. Dynamic Video & Media Cards Stack */}
        {items.map((item, index) => (
          <div
            key={item.id || index}
            style={{
              width: "280px",
              height: "280px",
              maxWidth: "85vw",
              maxHeight: "85vh",
              opacity: 0,
              zIndex: 30 + index,
            }}
            className="showcase-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-[width,height,opacity] pointer-events-none rounded-none overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.7)] bg-black"
          >
            {item.video ? (
              <video
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover rounded-none"
              />
            ) : item.image ? (
              <Image
                src={item.image}
                alt={item.alt || `Showcase ${index + 1}`}
                fill
                priority={index <= 1}
                sizes="100vw"
                className="object-cover rounded-none"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
