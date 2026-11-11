"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServicesSectionProps } from "./types";
import { ArrowUpRightIcon } from "@/svgs";
import { getOptimizedVideoUrl, getVideoPosterUrl } from "@/lib/media";

interface DualShowcaseItem {
  id: "interactive-solution" | "design";
  title: string;
  video: string;
  href: string;
}

const DUAL_SHOWCASES: DualShowcaseItem[] = [
  {
    id: "interactive-solution",
    title: "INTERACTIVE",
    video: "https://res.cloudinary.com/hxytmocg/video/upload/v1793558191/MVI_8622.mov",
    href: "/services/interactive-solution",
  },
  {
    id: "design",
    title: "DESIGN",
    video: "https://res.cloudinary.com/hxytmocg/video/upload/v1793214871/reception.mp4",
    href: "/services/design",
  },
];

// =========================================================================
// DISTINCT ANIMATION TIMINGS FOR EACH STEP
// Each step has its own explicit duration for clear, rhythmic pacing
// =========================================================================
export const ANIMATION_TIMINGS = {
  // Step 1: Scale duration (Card scales up to 1.14; other card scales to 0.88)
  scaleDuration: 0.42,

  // Step 2: Slide duration (Card slides over the adjacent card by 38px)
  slideDuration: 0.40,

  // Step 3: Text lines slide-in duration (Counter-sliding text over the photo)
  textEnterDuration: 0.48,
  textLineDelay: 0.08, // Stagger delay between line 1 and line 2

  // Exit: Quick text fade-out duration when switching cards or leaving
  textExitDuration: 0.22,

  // Exit: Reset duration for both cards returning to neutral (scale: 1, x: 0)
  resetCardsDuration: 0.48,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  headlineMain = "SERVICES",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const portalStageRef = useRef<HTMLDivElement>(null);

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  const text1Line1Ref = useRef<HTMLDivElement>(null);
  const text1Line2Ref = useRef<HTMLDivElement>(null);

  const text2Line1Ref = useRef<HTMLDivElement>(null);
  const text2Line2Ref = useRef<HTMLDivElement>(null);

  const activeTlRef = useRef<gsap.core.Timeline | null>(null);
  const currentHoverRef = useRef<"none" | "card1" | "card2">("none");

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header subtle reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
            clearProps: "all",
          }
        );
      }

      // Stage gentle entrance (zero effect on card scale/hover)
      if (portalStageRef.current) {
        gsap.fromTo(
          portalStageRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: portalStageRef.current,
              start: "top 85%",
              once: true,
            },
            clearProps: "all",
          }
        );

        // Lazy video play/pause: Only stream video when user scrolls near this section
        ScrollTrigger.create({
          trigger: portalStageRef.current,
          start: "top 95%",
          end: "bottom -20%",
          onEnter: () => {
            card1Ref.current?.querySelector("video")?.play().catch(() => {});
            card2Ref.current?.querySelector("video")?.play().catch(() => {});
          },
          onLeave: () => {
            card1Ref.current?.querySelector("video")?.pause();
            card2Ref.current?.querySelector("video")?.pause();
          },
          onEnterBack: () => {
            card1Ref.current?.querySelector("video")?.play().catch(() => {});
            card2Ref.current?.querySelector("video")?.play().catch(() => {});
          },
          onLeaveBack: () => {
            card1Ref.current?.querySelector("video")?.pause();
            card2Ref.current?.querySelector("video")?.pause();
          },
        });
      }
    }, sectionRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // STEP-BY-STEP CHOREOGRAPHY CONTROLLER:
  // Step 1: Scale (duration: scaleDuration)
  // Step 2: Slide over adjacent card (duration: slideDuration)
  // Step 3: Text entrance (duration: textEnterDuration)
  // ─────────────────────────────────────────────────────────────
  const transitionTo = (target: "none" | "card1" | "card2") => {
    if (!card1Ref.current || !card2Ref.current) return;
    if (currentHoverRef.current === target) return;
    currentHoverRef.current = target;

    // Cleanly cancel previous timeline
    if (activeTlRef.current) {
      activeTlRef.current.kill();
    }

    gsap.killTweensOf([
      card1Ref.current,
      card2Ref.current,
      text1Line1Ref.current,
      text1Line2Ref.current,
      text2Line1Ref.current,
      text2Line2Ref.current,
    ]);

    const tl = gsap.timeline();
    activeTlRef.current = tl;

    // ─────────────────────────────────────────────────────────
    // TARGET: CARD 1 (INTERACTIVE)
    // ─────────────────────────────────────────────────────────
    if (target === "card1") {
      // 1. Immediately dismiss any text from Card 2
      if (text2Line1Ref.current) {
        tl.to(
          text2Line1Ref.current,
          { x: 40, opacity: 0, duration: ANIMATION_TIMINGS.textExitDuration, ease: "power2.in" },
          0
        );
      }
      if (text2Line2Ref.current) {
        tl.to(
          text2Line2Ref.current,
          { x: -40, opacity: 0, duration: ANIMATION_TIMINGS.textExitDuration, ease: "power2.in" },
          0
        );
      }

      // 2. Set depth layers
      card1Ref.current.style.zIndex = "30";
      card2Ref.current.style.zIndex = "10";

      // 3. STEP 1 (SCALE): Card 1 scales up to 1.14 & becomes 100% visible; Card 2 scales down to 0.88 & dims
      tl.to(
        card1Ref.current,
        {
          scale: 1.14,
          opacity: 1,
          duration: ANIMATION_TIMINGS.scaleDuration,
          ease: "power2.out",
        },
        0
      );

      tl.to(
        card2Ref.current,
        {
          scale: 0.88,
          opacity: 0.25,
          x: 0,
          duration: ANIMATION_TIMINGS.scaleDuration,
          ease: "power2.out",
        },
        0
      );

      // 4. STEP 2 (SLIDE): Begins distinctly after scale is well underway
      const slideStartTime = ANIMATION_TIMINGS.scaleDuration * 0.7;
      tl.to(
        card1Ref.current,
        {
          x: 38,
          duration: ANIMATION_TIMINGS.slideDuration,
          ease: "power2.out",
        },
        slideStartTime
      );

      // 5. STEP 3 (TEXT ENTRANCE OVER PHOTO):
      // Line 1 (WELCOME) slides in from LEFT
      const textStartTime = slideStartTime + 0.1;
      if (text1Line1Ref.current) {
        tl.fromTo(
          text1Line1Ref.current,
          { x: -80, opacity: 0 },
          { x: 0, opacity: 1, duration: ANIMATION_TIMINGS.textEnterDuration, ease: "power3.out" },
          textStartTime
        );
      }
      // Line 2 (to INTERACTIVE) slides in from RIGHT
      if (text1Line2Ref.current) {
        tl.fromTo(
          text1Line2Ref.current,
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: ANIMATION_TIMINGS.textEnterDuration, ease: "power3.out" },
          textStartTime + ANIMATION_TIMINGS.textLineDelay
        );
      }
    }

    // ─────────────────────────────────────────────────────────
    // TARGET: CARD 2 (DESIGN)
    // ─────────────────────────────────────────────────────────
    else if (target === "card2") {
      // 1. Immediately dismiss any text from Card 1
      if (text1Line1Ref.current) {
        tl.to(
          text1Line1Ref.current,
          { x: -40, opacity: 0, duration: ANIMATION_TIMINGS.textExitDuration, ease: "power2.in" },
          0
        );
      }
      if (text1Line2Ref.current) {
        tl.to(
          text1Line2Ref.current,
          { x: 40, opacity: 0, duration: ANIMATION_TIMINGS.textExitDuration, ease: "power2.in" },
          0
        );
      }

      // 2. Set depth layers
      card2Ref.current.style.zIndex = "30";
      card1Ref.current.style.zIndex = "10";

      // 3. STEP 1 (SCALE): Card 2 scales up to 1.14 & becomes 100% visible; Card 1 scales down to 0.88 & dims
      tl.to(
        card2Ref.current,
        {
          scale: 1.14,
          opacity: 1,
          duration: ANIMATION_TIMINGS.scaleDuration,
          ease: "power2.out",
        },
        0
      );

      tl.to(
        card1Ref.current,
        {
          scale: 0.88,
          opacity: 0.25,
          x: 0,
          duration: ANIMATION_TIMINGS.scaleDuration,
          ease: "power2.out",
        },
        0
      );

      // 4. STEP 2 (SLIDE): Begins distinctly after scale is well underway
      const slideStartTime = ANIMATION_TIMINGS.scaleDuration * 0.7;
      tl.to(
        card2Ref.current,
        {
          x: -38,
          duration: ANIMATION_TIMINGS.slideDuration,
          ease: "power2.out",
        },
        slideStartTime
      );

      // 5. STEP 3 (TEXT ENTRANCE OVER PHOTO):
      // Line 1 (WELCOME) slides in from RIGHT
      const textStartTime = slideStartTime + 0.1;
      if (text2Line1Ref.current) {
        tl.fromTo(
          text2Line1Ref.current,
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: ANIMATION_TIMINGS.textEnterDuration, ease: "power3.out" },
          textStartTime
        );
      }
      // Line 2 (to DESIGN) slides in from LEFT
      if (text2Line2Ref.current) {
        tl.fromTo(
          text2Line2Ref.current,
          { x: -80, opacity: 0 },
          { x: 0, opacity: 1, duration: ANIMATION_TIMINGS.textEnterDuration, ease: "power3.out" },
          textStartTime + ANIMATION_TIMINGS.textLineDelay
        );
      }
    }

    // ─────────────────────────────────────────────────────────
    // TARGET: NONE (MOUSE LEAVES BOTH CARDS)
    // ─────────────────────────────────────────────────────────
    else {
      // 1. Both text blocks slide out and fade with explicit duration
      if (text1Line1Ref.current) {
        tl.to(
          text1Line1Ref.current,
          { x: -35, opacity: 0, duration: ANIMATION_TIMINGS.textExitDuration, ease: "power2.inOut" },
          0
        );
      }
      if (text1Line2Ref.current) {
        tl.to(
          text1Line2Ref.current,
          { x: 35, opacity: 0, duration: ANIMATION_TIMINGS.textExitDuration, ease: "power2.inOut" },
          0
        );
      }
      if (text2Line1Ref.current) {
        tl.to(
          text2Line1Ref.current,
          { x: 35, opacity: 0, duration: ANIMATION_TIMINGS.textExitDuration, ease: "power2.inOut" },
          0
        );
      }
      if (text2Line2Ref.current) {
        tl.to(
          text2Line2Ref.current,
          { x: -35, opacity: 0, duration: ANIMATION_TIMINGS.textExitDuration, ease: "power2.inOut" },
          0
        );
      }

      // 2. Both cards return calmly to neutral (scale: 1, x: 0, opacity: 1)
      tl.to(
        [card1Ref.current, card2Ref.current],
        {
          scale: 1,
          x: 0,
          opacity: 1,
          duration: ANIMATION_TIMINGS.resetCardsDuration,
          ease: "power3.out",
          onComplete: () => {
            if (card1Ref.current) card1Ref.current.style.zIndex = "10";
            if (card2Ref.current) card2Ref.current.style.zIndex = "10";
          },
        },
        0
      );
    }
  };

  const card1 = DUAL_SHOWCASES[0];
  const card2 = DUAL_SHOWCASES[1];

  const card1OptVideo = getOptimizedVideoUrl(card1.video, { width: 960, quality: "good" });
  const card1Poster = getVideoPosterUrl(card1.video, 800);

  const card2OptVideo = getOptimizedVideoUrl(card2.video, { width: 960, quality: "good" });
  const card2Poster = getVideoPosterUrl(card2.video, 800);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Services Section: Interactive Solution and Design"
      className="relative z-50 w-full min-h-[90vh] bg-black text-white pt-20 sm:pt-28 pb-28 sm:pb-36 px-4 sm:px-8 md:px-12 lg:px-16 overflow-x-clip border-t border-white/10 select-none flex flex-col justify-between"
    >
      <div className="max-w-[1700px] w-full mx-auto flex flex-col gap-8 sm:gap-12 relative z-10">
        {/* Architectural Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10"
        >
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
              02 / SERVICES
            </span>
            <h2 className="font-['BlauerNue',sans-serif] text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-none text-white">
              {headlineMain}
            </h2>
          </div>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-[#00c8ff] transition-colors self-start md:self-end pb-1"
          >
            <span>VIEW ALL SERVICES</span>
            <ArrowUpRightIcon className="w-4 h-4 text-white/40 group-hover:text-[#00c8ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </Link>
        </div>

        {/* =====================================================================
            DUAL STAGE:
            - Distinct Duration per step (Scale -> Slide -> Text)
            - Counter-sliding Typography: One line from right, other from left (ON TOP of photos)
            - Clean exit & zero overlap collisions
            ===================================================================== */}
        <div
          ref={portalStageRef}
          onMouseLeave={() => transitionTo("none")}
          className="relative w-full flex items-center justify-center gap-3 sm:gap-5 md:gap-7 py-16 sm:py-24 my-auto"
        >
          {/* ─────────────────────────────────────────────────────────────
              EDITORIAL TYPOGRAPHY: WELCOME to INTERACTIVE
              Layered OVER the photo (z-40)
              Line 1 from Left, Line 2 from Right
              ───────────────────────────────────────────────────────────── */}
          <div
            className="pointer-events-none absolute left-0 sm:left-2 md:-left-8 lg:-left-12 bottom-4 sm:bottom-6 md:bottom-8 z-40 max-w-full select-none"
            style={{
              fontFamily:
                '"Bodoni MT", "Didot", "Playfair Display", "Cinzel", "Times New Roman", Georgia, serif',
            }}
          >
            <div
              ref={text1Line1Ref}
              style={{ opacity: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wider text-[#e0e0e0] drop-shadow-[0_6px_25px_rgba(0,0,0,0.95)] whitespace-nowrap"
            >
              WELCOME
            </div>
            <div
              ref={text1Line2Ref}
              style={{ opacity: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.04em] text-[#f5f5f5] flex items-baseline drop-shadow-[0_6px_25px_rgba(0,0,0,0.95)] whitespace-nowrap mt-1"
            >
              <span
                style={{
                  fontFamily:
                    '"Segoe Script", "Brush Script MT", "Snell Roundhand", cursive, serif',
                  fontStyle: "italic",
                }}
                className="lowercase text-2xl sm:text-3xl md:text-4xl text-[#b0b0b0] mr-2.5 sm:mr-3.5 inline-block"
              >
                to
              </span>
              INTERACTIVE
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              EDITORIAL TYPOGRAPHY: WELCOME to DESIGN
              Layered OVER the photo (z-40)
              Line 1 from Right, Line 2 from Left
              ───────────────────────────────────────────────────────────── */}
          <div
            className="pointer-events-none absolute right-0 sm:right-2 md:-right-8 lg:-right-12 bottom-4 sm:bottom-6 md:bottom-8 z-40 max-w-full select-none text-left sm:text-right"
            style={{
              fontFamily:
                '"Bodoni MT", "Didot", "Playfair Display", "Cinzel", "Times New Roman", Georgia, serif',
            }}
          >
            <div
              ref={text2Line1Ref}
              style={{ opacity: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wider text-[#e0e0e0] drop-shadow-[0_6px_25px_rgba(0,0,0,0.95)] whitespace-nowrap"
            >
              WELCOME
            </div>
            <div
              ref={text2Line2Ref}
              style={{ opacity: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.04em] text-[#f5f5f5] flex items-baseline justify-start sm:justify-end drop-shadow-[0_6px_25px_rgba(0,0,0,0.95)] whitespace-nowrap mt-1"
            >
              <span
                style={{
                  fontFamily:
                    '"Segoe Script", "Brush Script MT", "Snell Roundhand", cursive, serif',
                  fontStyle: "italic",
                }}
                className="lowercase text-2xl sm:text-3xl md:text-4xl text-[#b0b0b0] mr-2.5 sm:mr-3.5 inline-block"
              >
                to
              </span>
              DESIGN
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 1: INTERACTIVE
              Initial: scale = 1, side-by-side with NO scale
              On Hover: Stage 1 = scale up; Stage 2 = slides over Card 2
              ───────────────────────────────────────────────────────────── */}
          <div
            ref={card1Ref}
            onMouseEnter={() => transitionTo("card1")}
            style={{ zIndex: 10 }}
            className="relative w-36.25 sm:w-47.5 md:w-57.5 lg:w-65 xl:w-71.25 aspect-[1/1.38] rounded-none cursor-pointer border border-white/20 hover:border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.8)] will-change-transform"
          >
            <Link
              href={card1.href}
              className="block w-full h-full relative overflow-hidden bg-black rounded-none"
            >
              <video
                src={card1OptVideo}
                poster={card1Poster}
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover rounded-none pointer-events-none will-change-transform"
              />
            </Link>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 2: DESIGN
              Initial: scale = 1, side-by-side with NO scale
              On Hover: Stage 1 = scale up; Stage 2 = slides over Card 1
              ───────────────────────────────────────────────────────────── */}
          <div
            ref={card2Ref}
            onMouseEnter={() => transitionTo("card2")}
            style={{ zIndex: 10 }}
            className="relative w-36.25 sm:w-47.5 md:w-57.5 lg:w-65 xl:w-71.25 aspect-[1/1.38] rounded-none cursor-pointer border border-white/20 hover:border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.8)] will-change-transform"
          >
            <Link
              href={card2.href}
              className="block w-full h-full relative overflow-hidden bg-black rounded-none"
            >
              <video
                src={card2OptVideo}
                poster={card2Poster}
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover rounded-none pointer-events-none will-change-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;