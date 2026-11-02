"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroSectionProps } from "./types";
import { HeroBackground } from "./HeroBackground";
import { HeroTagline } from "./HeroTagline";
import { HeroHeadline } from "./HeroHeadline";

/**
 * HeroSection
 * Master Orchestrator for KV STUDIO:
 * 1. Black curtain covers the section initially.
 * 2. Center Loader: Company name appears with elegant letter-by-letter reveal + sleek loading bar.
 * 3. Loading bar features an organic, realistic loading simulation that actively waits for the Hero video to buffer.
 * 4. Once the video is verified loaded and ready to play, the bar glides to 100% and fades out gracefully.
 * 5. HeroHeadline appears letter-by-letter on the black curtain.
 * 6. The black curtain collapses / sweeps to the LEFT edge, revealing the live playing video.
 * 7. Taglines slide in dynamically from the right, and navbar fades in.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImageUrl = "/hero-bg.webp",
  backgroundVideoUrl = "https://res.cloudinary.com/hxytmocg/video/upload/v1793529386/close_to_building.mp4",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !curtainRef.current) return;

    // Lock body scrolling during the initial intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const navbar = document.querySelector("header");
    if (navbar) gsap.set(navbar, { opacity: 0 });

    const sectorLine = sectionRef.current.querySelector(".sector-pointer-line line");
    const tagline1 = sectionRef.current.querySelector(".tagline-line-1");
    const tagline2 = sectionRef.current.querySelector(".tagline-line-2");
    const taglineUnderlinePath = sectionRef.current.querySelector(".tagline-underline-path path");
    const taglineScribble = sectionRef.current.querySelector(".tagline-scribble");
    const chars1 = sectionRef.current.querySelectorAll(".headline-line-1 .headline-char");
    const loaderChars = loaderRef.current?.querySelectorAll(".loader-char");

    // 1. Initial State: Curtain covers background, taglines and headline primed
    gsap.set(curtainRef.current, {
      scaleX: 1,
      transformOrigin: "left center",
    });

    if (chars1.length > 0) gsap.set(chars1, { opacity: 0, x: 40, scale: 0.95, filter: "blur(6px)" });
    if (tagline1) gsap.set(tagline1, { opacity: 0, x: 280, filter: "blur(6px)" });
    if (tagline2) gsap.set(tagline2, { opacity: 0, x: 340, filter: "blur(8px)" });

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

    // 2. Animate Company Name in with letter-by-letter blur & scale reveal
    if (loaderChars && loaderChars.length > 0) {
      gsap.fromTo(
        loaderChars,
        {
          opacity: 0,
          y: 28,
          scale: 0.88,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.035,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    }

    // Reveal progress bar container smoothly
    if (progressBarRef.current) {
      gsap.fromTo(
        progressBarRef.current,
        { opacity: 0, scaleX: 0.7 },
        { opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.out", delay: 0.25 }
      );
    }

    // 3. Realistic Loading Engine: Continuous Organic Progression + Video Buffer Gate
    let isMounted = true;
    let currentProgress = 0;
    let isVideoReady = false;
    let isComplete = false;
    let hasTriggeredIntro = false;
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;
    let lastTime = performance.now();

    // Query the actual background video in the DOM
    const bgVid = sectionRef.current.querySelector<HTMLVideoElement>("video");

    const checkVideoBufferReady = (): boolean => {
      if (!bgVid) return false;
      // readyState 3 = HAVE_FUTURE_DATA, 4 = HAVE_ENOUGH_DATA
      if (bgVid.readyState >= 3) return true;
      if (bgVid.duration > 0 && bgVid.buffered.length > 0) {
        const bufferedEnd = bgVid.buffered.end(bgVid.buffered.length - 1);
        if (bufferedEnd >= Math.min(bgVid.duration, 3.5)) return true;
      }
      return false;
    };

    const onVideoReady = () => {
      if (!isMounted) return;
      isVideoReady = true;
      if (bgVid) bgVid.play().catch(() => {});
    };

    if (bgVid) {
      if (checkVideoBufferReady()) {
        isVideoReady = true;
      } else {
        bgVid.addEventListener("canplay", onVideoReady);
        bgVid.addEventListener("canplaythrough", onVideoReady);
        bgVid.addEventListener("progress", () => {
          if (checkVideoBufferReady()) onVideoReady();
        });
      }
    }

    // Preloader backup element to accelerate video fetch in browser cache
    const testVideo = document.createElement("video");
    testVideo.src = backgroundVideoUrl;
    testVideo.preload = "auto";
    testVideo.muted = true;
    testVideo.playsInline = true;
    testVideo.addEventListener("canplay", onVideoReady);
    testVideo.addEventListener("canplaythrough", onVideoReady);
    testVideo.load();

    // Safety timeout (8s) only for completely offline/restricted networks so user is never stuck
    timeoutId = setTimeout(() => {
      if (isMounted) onVideoReady();
    }, 8000);

    // The Master Intro Sequence (Headline reveal -> Curtain sweeps left -> Tagline)
    const playOriginalIntro = () => {
      if (hasTriggeredIntro) return;
      hasTriggeredIntro = true;

      // Unlock body scrolling
      document.body.style.overflow = originalOverflow;

      const masterTl = gsap.timeline({ delay: 0.08 });

      // PHASE 1: HeroHeadline appears letter-by-letter on the black curtain
      if (chars1 && chars1.length > 0) {
        masterTl.fromTo(
          chars1,
          { opacity: 0, x: 40, scale: 0.95, filter: "blur(6px)" },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.75,
            stagger: 0.02,
            ease: "power2.out",
          }
        );
      }

      // PHASE 2: Black curtain collapses / sweeps towards the LEFT edge
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

      // Reveal Navbar seamlessly
      if (navbar) {
        masterTl.to(navbar, { opacity: 1, duration: 0.85, ease: "power2.out" }, "-=1.0");
      }
    };

    // Transition from loader to intro: Fade out loader text & bar smoothly
    const finishLoaderAndStartIntro = () => {
      const loaderTl = gsap.timeline({
        onComplete: () => {
          if (loaderRef.current) gsap.set(loaderRef.current, { display: "none" });
          playOriginalIntro();
        },
      });

      if (loaderChars && loaderChars.length > 0) {
        loaderTl.to(loaderChars, {
          opacity: 0,
          y: -18,
          filter: "blur(8px)",
          stagger: 0.015,
          duration: 0.45,
          ease: "power2.in",
        });
      }

      if (progressBarRef.current) {
        loaderTl.to(
          progressBarRef.current,
          {
            opacity: 0,
            scaleX: 0.8,
            duration: 0.35,
            ease: "power2.in",
          },
          "-=0.3"
        );
      }
    };

    // 60fps/120fps Natural Progression Loop (Smooth continuous fill + Video Buffer Gate)
    const tick = (now: number) => {
      if (!isMounted || isComplete) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Periodically check if video is ready
      if (!isVideoReady && checkVideoBufferReady()) {
        onVideoReady();
      }

      if (!isVideoReady) {
        // Natural progressive curve while waiting for video:
        // Starts moving IMMEDIATELY (never stays empty or frozen)
        if (currentProgress < 40) {
          currentProgress += 32 * dt;
        } else if (currentProgress < 72) {
          currentProgress += 20 * dt;
        } else if (currentProgress < 86) {
          currentProgress += 10 * dt;
        } else if (currentProgress < 91) {
          // Graceful slow hold pattern waiting for the video
          currentProgress += 1.2 * dt;
        }
      } else {
        // Video has buffered and is ready!
        // Smoothly and swiftly glide towards 100% without jumping
        const remaining = 100 - currentProgress;
        const speed = Math.max(remaining * 4.2, 28);
        currentProgress += speed * dt;

        if (currentProgress >= 100) {
          currentProgress = 100;
          isComplete = true;
          if (progressFillRef.current) progressFillRef.current.style.width = "100%";
          setTimeout(finishLoaderAndStartIntro, 160);
          return;
        }
      }

      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${currentProgress.toFixed(1)}%`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
      document.body.style.overflow = originalOverflow;
      if (navbar) gsap.set(navbar, { opacity: 1 });
      testVideo.src = "";
    };
  }, [backgroundVideoUrl]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-dvh flex flex-col justify-between overflow-hidden text-white"
    >
      {/* 1. Cinematic Background Visual Layer (z-0) */}
      <HeroBackground imageUrl={backgroundImageUrl} videoUrl={backgroundVideoUrl} />

      {/* 2. Intro Black Curtain (z-10, covers entire section initially, then sweeps left) */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-black z-10 origin-left will-change-transform pointer-events-none"
      />

      {/* 3. Dead-Center Loader: Company Name + Minimalist Loading Bar (z-25) */}
      <div
        ref={loaderRef}
        className="absolute inset-0 z-25 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none"
      >
        {/* Ambient atmospheric true blue glow */}
        <div
          className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full pointer-events-none blur-[70px] sm:blur-[90px]"
          style={{
            background: "radial-gradient(circle, rgba(0, 85, 255, 0.35) 0%, rgba(0, 60, 220, 0.15) 50%, transparent 70%)",
          }}
        />

        {/* Company Name with letter-by-letter reveal animation */}
        <h1 className="relative z-10 flex items-center font-['BlauerNue',sans-serif] font-black text-2xl sm:text-3xl md:text-4xl lg:text-[42px] tracking-[0.32em] sm:tracking-[0.38em] text-white uppercase drop-shadow-[0_2px_24px_rgba(255,255,255,0.22)] select-none ml-[0.35em]">
          {"KV STUDIO".split("").map((char, i) => (
            <span
              key={i}
              className="loader-char inline-block will-change-transform opacity-0"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Minimalist Progress Bar (Strictly NO numbers, NO text, Natural Progressive Fill) */}
        <div
          ref={progressBarRef}
          className="mt-6 sm:mt-7 w-48 sm:w-60 md:w-68 h-0.5 sm:h-[2.5px] bg-white/12 rounded-full overflow-hidden relative backdrop-blur-xs opacity-0 will-change-transform"
          role="progressbar"
          aria-label="Loading progress"
        >
          <div
            ref={progressFillRef}
            className="h-full bg-linear-to-r from-white/70 via-white to-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.85),0_0_20px_rgba(0,200,255,0.35)] will-change-[width]"
            style={{ width: "0%" }}
          />
        </div>
      </div>

      {/* 4. Top Spacing Placeholder for Unified Global Navbar */}
      <div className="w-full pt-8 sm:pt-12 pb-4 px-6 sm:px-12 md:px-16 lg:px-20 h-20 sm:h-24 pointer-events-none" />

      {/* 5. Middle Content Section: Tagline on Right (z-20, sits above the z-10 curtain) */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 flex flex-col sm:flex-row sm:items-start justify-between gap-6 z-20">
        <HeroTagline
          text={"CRAFTING IMMERSIVE DIGITAL REALITIES"}
          highlightText={"KNOWLEDGE + VISION."}
        />
      </div>

      {/* 6. Bottom Giant Headline Section (z-20, sits above the z-10 curtain to appear first) */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 pb-4 sm:pb-6 md:pb-8 z-20">
        <HeroHeadline line={"KNOWLEGEPLUSVISION"} />
      </div>
    </section>
  );
};
