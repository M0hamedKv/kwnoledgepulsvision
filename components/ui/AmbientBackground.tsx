import React from "react";

/**
 * AmbientBackground
 * Single Responsibility: Renders a pure solid black background (#000000) with
 * exactly TWO moderate-sized, true blue architectural spotlights:
 * 1. Top-Right (يمين فوق - أزرق صريح)
 * 2. Bottom-Left (شمال تحت - أزرق صريح)
 */
export const AmbientBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Pure Pitch Black Background */}
      <div className="absolute inset-0 bg-[#000000]" />

      {/* 2. Top-Right True Blue Spotlight (سبوت أزرق يمين فوق - حجم معتدل) */}
      <div
        className="absolute -top-[30px] sm:-top-[50px] -right-[30px] sm:-right-[50px] w-[320px] sm:w-[420px] md:w-[460px] h-[320px] sm:h-[420px] md:h-[460px] rounded-full pointer-events-none blur-[65px] sm:blur-[85px] will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(0, 85, 255, 0.48) 0%, rgba(0, 70, 240, 0.22) 45%, rgba(0, 50, 200, 0.05) 65%, transparent 72%)",
        }}
      />

      {/* 3. Bottom-Left True Blue Spotlight (سبوت أزرق شمال تحت - حجم معتدل) */}
      <div
        className="absolute -bottom-[30px] sm:-bottom-[50px] -left-[30px] sm:-left-[50px] w-[320px] sm:w-[420px] md:w-[460px] h-[320px] sm:h-[420px] md:h-[460px] rounded-full pointer-events-none blur-[65px] sm:blur-[85px] will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(0, 85, 255, 0.48) 0%, rgba(0, 70, 240, 0.22) 45%, rgba(0, 50, 200, 0.05) 65%, transparent 72%)",
        }}
      />

      {/* 4. Ultra-subtle Architectural Blueprint Film Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-screen bg-repeat pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
