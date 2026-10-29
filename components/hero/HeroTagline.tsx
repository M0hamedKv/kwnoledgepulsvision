import React from "react";
import { HeroTaglineProps } from "./types";

/**
 * HeroTagline
 * Single Responsibility: Renders the commercial KV STUDIO value proposition with signature golden highlight.
 * Structured with semantic classes for the master GSAP intro sequence in HeroSection.
 */
export const HeroTagline: React.FC<HeroTaglineProps> = ({
  text,
  highlightText,
}) => {
  return (
    <div className="hero-tagline-container max-w-xs sm:max-w-sm md:max-w-md text-left select-none relative will-change-transform z-20">
      <p className="text-white font-['BlauerNue',sans-serif] font-bold text-[11px] sm:text-[13px] md:text-sm leading-snug tracking-[0.14em] uppercase">
        {/* Line 1 */}
        <span className="tagline-line-1 block will-change-transform opacity-0">
          {text}
        </span>

        {/* Line 2 */}
        <span className="tagline-line-2 block mt-0.5 will-change-transform opacity-0">
          <span className="relative inline-block whitespace-nowrap text-white font-black">
            {highlightText}
          </span>
        </span>
      </p>

    </div>
  );
};
