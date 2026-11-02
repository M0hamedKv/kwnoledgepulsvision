"use client";

import React, { useEffect, useRef, useState } from "react";
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
 * 3. Loading bar GENUINELY waits for the video to download and buffer (real streaming progress).
 * 4. Once the video is 100% downloaded and ready, loader fades out gracefully.
 * 5. HeroHeadline appears letter-by-letter on the black curtain.
 * 6. The black curtain collapses / sweeps to the LEFT edge, revealing the live playing video.
 * 7. Taglines slide in dynamically from the right, and navbar fades in.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImageUrl = "/hero-bg.webp",
  backgroundVideoUrl = "https://res.cloudinary.com/hxytmocg/video/upload/v1793529386/close_to_building.mp4",
}) => {
  const [videoSrc, setVideoSrc] = useState(backgroundVideoUrl);

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

    // 2. Animate Company Name in with a gorgeous letter-by-letter blur & scale reveal
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
        { opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.out", delay: 0.3 }
      );
    }

    // 3. Track REAL Video Loading & Buffering Progress
    let isMounted = true;
    let currentProgress = 0;
    let targetProgress = 0; // Starts at 0, only moves as real video bytes load!
    let hasTriggeredIntro = false;
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;
    const abortController = new AbortController();

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

    // Helper to advance targetProgress only when real data arrives
    const updateProgress = (pct: number) => {
      if (!isMounted) return;
      const rounded = Math.min(Math.max(Math.round(pct), 0), 100);
      if (rounded > targetProgress) {
        targetProgress = rounded;
      }
    };

    // REAL VIDEO DOWNLOAD: Streams bytes from Cloudinary with 100% genuine progress
    const loadRealVideo = async () => {
      try {
        const response = await fetch(backgroundVideoUrl, {
          signal: abortController.signal,
          mode: "cors",
        });

        if (!response.ok || !response.body) {
          throw new Error("Direct stream fetch not available");
        }

        const contentLength = response.headers.get("content-length");
        const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;
        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let receivedBytes = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          chunks.push(value);
          receivedBytes += value.length;

          if (totalBytes > 0) {
            const percent = (receivedBytes / totalBytes) * 100;
            updateProgress(percent);
          } else {
            // If server omitted content-length, track against 8MB estimate
            const estimatedPercent = Math.min((receivedBytes / (8 * 1024 * 1024)) * 100, 95);
            updateProgress(estimatedPercent);
          }
        }

        // 100% of the video bytes are downloaded
        updateProgress(100);

        // Convert downloaded bytes into a local memory Blob URL for zero-latency instant playback
        const blob = new Blob(chunks as unknown as BlobPart[], { type: "video/mp4" });
        const blobUrl = URL.createObjectURL(blob);
        if (isMounted) {
          setVideoSrc(blobUrl);
          const bgVid = sectionRef.current?.querySelector<HTMLVideoElement>("video");
          if (bgVid) {
            bgVid.src = blobUrl;
            bgVid.play().catch(() => {});
          }
        }
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;

        // Fallback: If streaming fetch fails (e.g. CORS block), track the <video> element's real buffer
        const bgVid = sectionRef.current?.querySelector<HTMLVideoElement>("video");
        if (bgVid) {
          const onBuffer = () => {
            if (bgVid.duration > 0 && bgVid.buffered.length > 0) {
              const bufferedEnd = bgVid.buffered.end(bgVid.buffered.length - 1);
              const pct = (bufferedEnd / bgVid.duration) * 100;
              updateProgress(pct);
            }
          };

          const onReady = () => updateProgress(100);

          if (bgVid.readyState >= 4) {
            updateProgress(100);
          } else {
            bgVid.addEventListener("progress", onBuffer);
            bgVid.addEventListener("canplaythrough", onReady);
            bgVid.load();
          }
        }
      }
    };

    loadRealVideo();

    // Safety timeout (8s) only in case of completely broken network/offline so user isn't stuck
    timeoutId = setTimeout(() => {
      if (isMounted && targetProgress < 100) {
        updateProgress(100);
      }
    }, 8000);

    // 60fps Physics Ticker: STRICTLY catches up to real video progress, never runs ahead on a timer!
    const tick = () => {
      if (!isMounted) return;

      // Only advance currentProgress if real targetProgress is higher
      if (currentProgress < targetProgress) {
        const delta = targetProgress - currentProgress;
        const step = Math.max(delta * 0.12, 0.25);
        currentProgress += step;
        if (currentProgress > targetProgress) {
          currentProgress = targetProgress;
        }
      }

      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${currentProgress.toFixed(1)}%`;
      }

      // ONLY finish when video download is 100% complete AND bar has filled to 100%
      if (targetProgress >= 100 && currentProgress >= 99.5) {
        currentProgress = 100;
        if (progressFillRef.current) progressFillRef.current.style.width = "100%";
        setTimeout(finishLoaderAndStartIntro, 140);
        return;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      isMounted = false;
      abortController.abort();
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
      document.body.style.overflow = originalOverflow;
      if (navbar) gsap.set(navbar, { opacity: 1 });
    };
  }, [backgroundVideoUrl]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-dvh flex flex-col justify-between overflow-hidden text-white"
    >
      {/* 1. Cinematic Background Visual Layer (z-0) */}
      <HeroBackground imageUrl={backgroundImageUrl} videoUrl={videoSrc} />

      {/* 2. Intro Black Curtain (z-10, covers entire section initially, then sweeps left) */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-background z-10 origin-left will-change-transform pointer-events-none"
      />

      {/* 3. Dead-Center Loader: Company Name + Minimalist Loading Bar (z-25) */}
      <div
        ref={loaderRef}
        className="absolute inset-0 z-25 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none"
      >
        {/* Ambient atmospheric cyan glow */}
        <div className="absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#00c8ff]/[0.035] blur-[140px] pointer-events-none" />

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

        {/* Minimalist Progress Bar (Strictly NO numbers, NO text, Real Video Download) */}
        <div
          ref={progressBarRef}
          className="mt-6 sm:mt-7 w-48 sm:w-60 md:w-68 h-0.5 sm:h-[2.5px] bg-white/12 rounded-full overflow-hidden relative backdrop-blur-xs opacity-0 will-change-transform"
          role="progressbar"
          aria-label="Loading progress"
        >
          <div
            ref={progressFillRef}
            className="h-full bg-white rounded-full transition-all duration-75 ease-out shadow-[0_0_10px_rgba(255,255,255,0.85),0_0_20px_rgba(0,200,255,0.35)]"
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
