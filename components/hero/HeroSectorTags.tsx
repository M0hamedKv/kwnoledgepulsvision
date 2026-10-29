import React from "react";
import { HeroSectorTagsProps } from "./types";

/**
 * HeroSectorTags
 * Single Responsibility: Renders KV STUDIO sector categories with interactive cues and signature angled line.
 * Controlled by the HeroSection master GSAP intro sequence.
 */
export const HeroSectorTags: React.FC<HeroSectorTagsProps> = ({
  sectors,
}) => {
  return (
    <div className="hero-sectors-container relative flex flex-col items-start select-none will-change-transform z-20">
      <nav aria-label="KV STUDIO Sectors" className="flex flex-col gap-1 sm:gap-1.5 font-['BlauerNue',sans-serif]">
        {sectors.map((sector) => {
          return (
            <p
              key={sector.id}
              className="sector-item text-left text-xs sm:text-[13px] font-bold tracking-[0.20em] uppercase text-white will-change-transform opacity-0"
            >
              {sector.label}
            </p>
          );
        })}
      </nav>
    </div>
  );
};
