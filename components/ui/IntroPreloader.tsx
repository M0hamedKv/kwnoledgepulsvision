"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export interface IntroPreloaderProps {
  onComplete?: () => void;
  companyName?: string;
  videoUrls?: string[];
  minDuration?: number;
  maxTimeout?: number;
}

const DEFAULT_VIDEO_URLS = [
  "https://res.cloudinary.com/hxytmocg/video/upload/v1793529386/close_to_building.mp4",
  "https://res.cloudinary.com/hxytmocg/video/upload/v1793538889/street_2.mp4",
];

/**
 * IntroPreloader
 * Single Responsibility: Minimalist, luxury architectural intro screen.
 * - Displays company name and a sleek loading bar in the dead center.
 * - ZERO text, ZERO numbers, ZERO percentage counters.
 * - Fills smoothly as background videos buffer and decode.
 * - Gracefully reveals the site once videos are ready.
 */
export const IntroPreloader: React.FC<IntroPreloaderProps> = ({
  onComplete,
  companyName = "KV STUDIO",
  videoUrls = DEFAULT_VIDEO_URLS,
  minDuration = 1400,
  maxTimeout = 4000,
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isCompletedRef = useRef(false);

  useEffect(() => {
    // Lock scrolling while the intro is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let isMounted = true;
    let currentProgress = 0;
    let targetProgress = 15; // Initial smooth start
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;

    const startTime = performance.now();

    // Outro animation triggered when 100% is reached
    const triggerOutro = () => {
      if (isCompletedRef.current) return;
      isCompletedRef.current = true;

      setTimeout(() => {
        if (!overlayRef.current) {
          setIsFinished(true);
          document.body.style.overflow = originalOverflow;
          onComplete?.();
          return;
        }

        const tl = gsap.timeline({
          onComplete: () => {
            setIsFinished(true);
            document.body.style.overflow = originalOverflow;
            onComplete?.();
          },
        });

        // 1. Center text and progress bar fade out and lift slightly
        if (contentRef.current) {
          tl.to(contentRef.current, {
            opacity: 0,
            y: -14,
            filter: "blur(6px)",
            duration: 0.45,
            ease: "power2.inOut",
          });
        }

        // 2. Fullscreen overlay curtain lifts up smoothly like a theater screen
        tl.to(
          overlayRef.current,
          {
            yPercent: -100,
            duration: 0.85,
            ease: "power3.inOut",
          },
          "-=0.1"
        );
      }, 160);
    };

    // Preload & track video buffering
    const videoElements: HTMLVideoElement[] = [];

    const handleVideoProgress = (vid: HTMLVideoElement, isHero: boolean) => {
      if (!isMounted) return;

      let ratio = 0;
      if (vid.duration > 0 && vid.buffered.length > 0) {
        const bufferedEnd = vid.buffered.end(vid.buffered.length - 1);
        // Measure first 4 seconds or total duration for buffer ratio
        ratio = Math.min(bufferedEnd / Math.min(vid.duration, 4), 1);
      }

      if (isHero) {
        // Hero video accounts for the primary progress range (up to 90%)
        const heroProgress = 20 + ratio * 70;
        if (heroProgress > targetProgress) {
          targetProgress = heroProgress;
        }
      }
    };

    const handleVideoReady = (isHero: boolean) => {
      if (!isMounted) return;
      if (isHero) {
        targetProgress = 100;
      } else {
        targetProgress = Math.max(targetProgress, 85);
      }
    };

    // 1. Track in-memory video preloading for provided URLs
    videoUrls.forEach((url, idx) => {
      const isHero = idx === 0;
      const vid = document.createElement("video");
      vid.src = url;
      vid.preload = "auto";
      vid.muted = true;
      vid.playsInline = true;

      const onProgress = () => handleVideoProgress(vid, isHero);
      const onCanPlay = () => handleVideoReady(isHero);

      vid.addEventListener("loadedmetadata", onProgress);
      vid.addEventListener("progress", onProgress);
      vid.addEventListener("loadeddata", onCanPlay);
      vid.addEventListener("canplay", onCanPlay);
      vid.addEventListener("canplaythrough", onCanPlay);

      vid.load();
      videoElements.push(vid);
    });

    // 2. Also attach listeners to any <video> elements currently in the DOM
    const domVideos = Array.from(document.querySelectorAll<HTMLVideoElement>("video"));
    domVideos.forEach((vid, idx) => {
      const isHero = idx === 0;
      if (vid.readyState >= 3) {
        handleVideoReady(isHero);
      } else {
        const onCanPlay = () => handleVideoReady(isHero);
        vid.addEventListener("canplay", onCanPlay, { once: true });
        vid.addEventListener("canplaythrough", onCanPlay, { once: true });
      }
    });

    // Safety fallback: if video is slow or network drops, force complete within maxTimeout
    timeoutId = setTimeout(() => {
      if (isMounted) {
        targetProgress = 100;
      }
    }, maxTimeout);

    // 60fps/120fps physics ticker (LERP) for liquid-smooth progress bar movement
    const tick = (now: number) => {
      if (!isMounted) return;

      const elapsed = now - startTime;

      // Ensure minimum aesthetic duration so user gets a smooth experience
      const maxAllowed =
        elapsed < minDuration ? Math.min(96, (elapsed / minDuration) * 96) : 100;

      const effectiveTarget = Math.min(targetProgress, maxAllowed);

      // Smooth step towards target
      const delta = effectiveTarget - currentProgress;
      const step = delta * 0.12;
      currentProgress += Math.max(step, 0.35);

      if (currentProgress >= 100 && elapsed >= minDuration) {
        currentProgress = 100;
        setDisplayProgress(100);
        triggerOutro();
        return;
      }

      if (currentProgress > 100) currentProgress = 100;
      setDisplayProgress(currentProgress);

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
      document.body.style.overflow = originalOverflow;
      videoElements.forEach((vid) => {
        vid.src = "";
        vid.load();
      });
    };
  }, [companyName, minDuration, maxTimeout, onComplete, videoUrls]);

  if (isFinished) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background pointer-events-auto select-none overflow-hidden will-change-transform"
      aria-hidden={isFinished}
    >
      {/* Subtle architectural atmosphere ambient blur */}
      <div className="absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#00c8ff]/[0.035] blur-[140px] pointer-events-none" />

      {/* Dead-Center Content: Company Name + Minimalist Loading Bar */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 will-change-transform"
      >
        {/* Company Name */}
        <h1 className="font-['BlauerNue',sans-serif] font-black text-2xl sm:text-3xl md:text-4xl lg:text-[42px] tracking-[0.32em] sm:tracking-[0.38em] text-white uppercase drop-shadow-[0_2px_24px_rgba(255,255,255,0.22)] select-none ml-[0.35em]">
          {companyName}
        </h1>

        {/* Minimalist Progress Bar (Strictly NO numbers, NO text) */}
        <div
          className="mt-6 sm:mt-7 w-48 sm:w-60 md:w-68 h-[2px] sm:h-[2.5px] bg-white/12 rounded-full overflow-hidden relative backdrop-blur-xs"
          role="progressbar"
          aria-label="Loading progress"
          aria-valuenow={Math.round(displayProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Glowing Fill Bar */}
          <div
            className="h-full bg-white rounded-full transition-all duration-75 ease-out shadow-[0_0_10px_rgba(255,255,255,0.85),0_0_20px_rgba(0,200,255,0.35)]"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

