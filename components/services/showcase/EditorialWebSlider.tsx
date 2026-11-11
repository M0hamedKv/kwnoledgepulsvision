"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/svgs";

export interface EditorialWebItem {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  url: string;
  type: "image" | "video";
}

interface EditorialWebSliderProps {
  items: EditorialWebItem[];
  onOpenLightbox?: (index: number) => void;
  brandTag?: string;
  brandTitle?: string;
}

export const EditorialWebSlider: React.FC<EditorialWebSliderProps> = ({
  items,
  onOpenLightbox,
  brandTag = "/KV STUDIO — WEB SERVICES",
  brandTitle = "web atelier.",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = items.length;
  const maxIndex = Math.max(0, total - 2);
  const isFirstSlide = currentIndex <= 0;
  const isLastSlide = currentIndex >= maxIndex;

  const handleNext = useCallback(() => {
    if (isTransitioning || currentIndex >= maxIndex) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    setTimeout(() => setIsTransitioning(false), 1650);
  }, [maxIndex, isTransitioning, currentIndex]);

  const handlePrev = useCallback(() => {
    if (isTransitioning || currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    setTimeout(() => setIsTransitioning(false), 1650);
  }, [isTransitioning, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) handlePrev();
    else if (diff < -50) handleNext();
    touchStartX.current = null;
  };

  // Dedicated Dark Luxury Palette (matching 100% of KV Studio)
  const bgClass = "bg-black text-white";
  const lineClass = "border-white/10";
  const numColor = "text-[#00c8ff]";
  const titleColor = "text-white";
  const subtextColor = "text-white/60";

  // Prev button state: Strictly disabled with opacity & pointer-events: none on first slide
  const prevBtnClass = isFirstSlide
    ? "bg-transparent text-white/20 border border-white/10 opacity-20 pointer-events-none cursor-not-allowed"
    : "bg-white/5 text-white border border-white/20 hover:bg-white hover:text-black hover:border-white hover:scale-105 active:scale-95 shadow-xs cursor-pointer opacity-100 pointer-events-auto";

  // Next button state: Strictly disabled with opacity & pointer-events: none on last slide
  const nextBtnClass = isLastSlide
    ? "bg-transparent text-white/20 border border-white/10 opacity-20 pointer-events-none cursor-not-allowed"
    : "bg-white text-black border border-white hover:bg-[#00c8ff] hover:border-[#00c8ff] hover:text-black hover:scale-105 active:scale-95 shadow-md shadow-white/5 cursor-pointer opacity-100 pointer-events-auto";

  /**
   * Distance calculation to determine each card's relative slot:
   * Slot 0:  Active Left Card (Tall, expands in height)
   * Slot 1:  Upcoming Right Card (Short & wide, bottom aligned)
   * Slot -1: Exiting Left Card (Shrinking in height & sliding offscreen left)
   * Slot 2:  Entering Right Card (Gliding in from offscreen right)
   */
  const getDiff = (index: number) => {
    return index - currentIndex;
  };

  const getSlotConfig = (diff: number) => {
    switch (diff) {
      case 0:
        // Slot 0: Active Left Card (Prominent, Tall, 100% visible)
        return {
          containerClass:
            "left-0 w-full md:w-[53%] opacity-100 z-20 pointer-events-auto",
          mediaHeightClass:
            "h-[220px] sm:h-[280px] md:h-[340px] lg:h-[390px] xl:h-[410px]",
          isSlot1: true,
          clickableAction: "lightbox" as const,
        };
      case 1:
        // Slot 1: Upcoming Right Card (Short & Wide, Bottom-aligned, visible)
        return {
          containerClass:
            "left-full md:left-[56%] w-full md:w-[44%] opacity-0 md:opacity-100 z-10 pointer-events-auto cursor-pointer",
          mediaHeightClass:
            "h-[130px] sm:h-[160px] md:h-[190px] lg:h-[220px] xl:h-[230px]",
          isSlot1: false,
          clickableAction: "next" as const,
        };
      case -1:
        // Slot -1: Exiting Left Card (Moving left, height shrinking, fading out)
        return {
          containerClass:
            "-left-full md:-left-[60%] w-full md:w-[53%] opacity-0 z-5 pointer-events-none",
          mediaHeightClass:
            "h-[130px] sm:h-[160px] md:h-[190px] lg:h-[220px] xl:h-[230px]",
          isSlot1: false,
          clickableAction: "none" as const,
        };
      case 2:
        // Slot 2: Entering Right Card (Offscreen right waiting to slide in)
        return {
          containerClass:
            "left-[150%] md:left-[110%] w-full md:w-[44%] opacity-0 z-5 pointer-events-none",
          mediaHeightClass:
            "h-[130px] sm:h-[160px] md:h-[190px] lg:h-[220px] xl:h-[230px]",
          isSlot1: false,
          clickableAction: "none" as const,
        };
      default:
        return {
          containerClass:
            diff < 0
              ? "-left-[150%] opacity-0 pointer-events-none"
              : "left-[180%] opacity-0 pointer-events-none",
          mediaHeightClass:
            "h-[130px] sm:h-[160px] md:h-[190px] lg:h-[220px] xl:h-[230px]",
          isSlot1: false,
          clickableAction: "none" as const,
        };
    }
  };

  return (
    <section
      className={`w-full py-8 sm:py-14 md:py-20 px-4 sm:px-8 md:px-12 lg:px-20 transition-colors duration-500 overflow-hidden ${bgClass}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-[1700px] mx-auto flex flex-col gap-8 sm:gap-12">
        {/* =====================================================================
            1. TOP EDITORIAL BAR (Matching the top header in the screenshot)
            ===================================================================== */}

        {/* =====================================================================
            2. SHARP NAVIGATION BUTTONS (< and >) SITTING ABOVE THE RIGHT CARD
            ===================================================================== */}
        <div className="w-full flex items-center justify-end gap-3 pb-2">
          {/* Prev Button — Strictly disabled on first slide with opacity-25 & pointer-events-none */}
          <button
            type="button"
            disabled={isFirstSlide}
            onClick={handlePrev}
            aria-label="Previous Slide"
            aria-disabled={isFirstSlide}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-none flex items-center justify-center transition-all duration-300 ${prevBtnClass}`}
          >
            <ArrowLeftIcon className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Next Button — Strictly disabled on last slide with opacity-25 & pointer-events-none */}
          <button
            type="button"
            disabled={isLastSlide}
            onClick={handleNext}
            aria-label="Next Slide"
            aria-disabled={isLastSlide}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-none flex items-center justify-center transition-all duration-300 ${nextBtnClass}`}
          >
            <ArrowRightIcon className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        {/* =====================================================================
            3. CONTINUOUS MORPHING STAGE:
               Here, the cards visibly expand / shrink in height AND slide
               across the screen right before the user's eyes!
            ===================================================================== */}
        <div className="relative w-full h-80 sm:h-97.5 md:h-112.5 lg:h-125 xl:h-130">
          {items.map((item, index) => {
            const diff = getDiff(index);
            const { containerClass, mediaHeightClass, clickableAction } =
              getSlotConfig(diff);

            return (
              <div
                key={item.id}
                className={`absolute bottom-0 flex flex-col justify-end gap-3 sm:gap-4 transition-all duration-1600 ease-[cubic-bezier(0.16,1,0.3,1)] ${containerClass}`}
                onClick={() => {
                  if (clickableAction === "lightbox" && onOpenLightbox) {
                    onOpenLightbox(index);
                  } else if (clickableAction === "next") {
                    if (!isLastSlide) {
                      handleNext();
                    } else if (onOpenLightbox) {
                      onOpenLightbox(index);
                    }
                  }
                }}
              >
                {/* 
                  Media Container:
                  Sharp corners (rounded-none).
                  This container's height visibly animates (grows larger or shrinks smaller)
                  as the card travels horizontally across the screen!
                */}
                <div
                  className={`group relative w-full rounded-none overflow-hidden bg-neutral-950 border border-white/10 hover:border-white/30 transition-all duration-1600 ease-[cubic-bezier(0.16,1,0.3,1)] ${mediaHeightClass}`}
                >
                  {item.type === "video" ? (
                    <video
                      src={item.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103 pointer-events-none"
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103 pointer-events-none"
                    />
                  )}

                </div>

                {/* Divider Line & Caption Row (Moves in tandem with the card) */}
                <div
                  className={`pt-3 sm:pt-4 border-t ${lineClass} flex items-start gap-5 sm:gap-8`}
                >
                  <span
                    className={`font-mono text-xs sm:text-sm font-medium tracking-wider shrink-0 pt-0.5 ${numColor}`}
                  >
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(total).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3
                      className={`font-serif text-sm sm:text-base lg:text-lg font-normal leading-snug tracking-tight truncate sm:whitespace-normal ${titleColor}`}
                    >
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p
                        className={`font-serif italic text-xs sm:text-sm leading-relaxed line-clamp-1 sm:line-clamp-2 ${subtextColor}`}
                      >
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Indicators */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(i);
                  setTimeout(() => setIsTransitioning(false), 1650);
                }
              }}
              aria-label={`Jump to slide ${i + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-none cursor-pointer ${
                currentIndex === i
                  ? "w-8 bg-[#00c8ff] shadow-sm shadow-[#00c8ff]/40"
                  : "w-2 bg-white/20 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
