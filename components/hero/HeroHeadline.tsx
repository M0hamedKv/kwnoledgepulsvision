import React from "react";
import { HeroHeadlineProps } from "./types";

/**
 * HeroHeadline
 * Single Responsibility: Displays the giant architectural headline.
 * Letters are prepared with .headline-char and line classes for master GSAP intro orchestration.
 */
export const HeroHeadline: React.FC<HeroHeadlineProps> = ({
  line,
}) => {
  // Splits line into words and characters while preserving spacing and prevent word breaks
  const renderLetters = (text: string) => {
    const words = text.split(" ");
    return words.map((word, wordIdx) => (
      <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.22em] last:mr-0">
        {word.split("").map((char, charIdx) => (
          <span
            key={charIdx}
            className="headline-char inline-block will-change-transform opacity-0"
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <div className="hero-headline-container w-full select-none pointer-events-none z-20">
      <h1 className="w-full flex flex-col font-['BlauerNue',sans-serif] font-black uppercase tracking-tight leading-[0.80] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
        {/* Line 1: RIO */}
        <span className="headline-line-1 block text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[7.6vw] xl:text-[7.8vw]">
          {renderLetters(line)}
        </span>
      </h1>
    </div>
  );
};
