import React from "react";

interface AmbientSpotlightsProps {
  className?: string;
  variant?: "default" | "alternate";
}

/**
 * AmbientSpotlights
 * KV Studio Signature Architectural Dual Blue Spotlights:
 * 1. Spot 1: Top True Blue architectural spotlight
 * 2. Spot 2: Bottom True Blue architectural spotlight
 *
 * Renders the brand's signature dual ambient glowing blue divs with smooth radial falloff
 * and calibrated architectural blur.
 */
export const AmbientSpotlights: React.FC<AmbientSpotlightsProps> = ({
  className = "",
  variant = "default",
}) => {
  const isDefault = variant === "default";

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. First True Blue Spotlight */}
      <div
        className={`absolute w-[320px] sm:w-[420px] md:w-[480px] h-[320px] sm:h-[420px] md:h-[480px] rounded-full pointer-events-none blur-[70px] sm:blur-[90px] will-change-transform ${
          isDefault
            ? "-top-12 sm:-top-20 -right-12 sm:-right-20"
            : "-top-12 sm:-top-20 -left-12 sm:-left-20"
        } ${className}`}
        style={{
          background:
            "radial-gradient(circle, rgba(0, 85, 255, 0.44) 0%, rgba(0, 70, 240, 0.20) 45%, rgba(0, 50, 200, 0.05) 65%, transparent 72%)",
        }}
      />

      {/* 2. Second True Blue Spotlight */}
      <div
        className={`absolute w-[320px] sm:w-[420px] md:w-[480px] h-[320px] sm:h-[420px] md:h-[480px] rounded-full pointer-events-none blur-[70px] sm:blur-[90px] will-change-transform ${
          isDefault
            ? "-bottom-12 sm:-bottom-20 -left-12 sm:-left-20"
            : "-bottom-12 sm:-bottom-20 -right-12 sm:-right-20"
        } ${className}`}
        style={{
          background:
            "radial-gradient(circle, rgba(0, 85, 255, 0.44) 0%, rgba(0, 70, 240, 0.20) 45%, rgba(0, 50, 200, 0.05) 65%, transparent 72%)",
        }}
      />
    </div>
  );
};
