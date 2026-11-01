"use client";

import React from "react";

export interface ComingSoonPanelProps {
  accentColor: string;
  title: string;
}

export const ComingSoonPanel: React.FC<ComingSoonPanelProps> = ({ accentColor, title }) => (
  <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 bg-white/2 flex flex-col items-center justify-center py-28 px-8 text-center gap-7">
    {/* glow backdrop */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at center, ${accentColor}14 0%, transparent 65%)`,
      }}
    />

    {/* clock icon ring */}
    <div className="relative w-28 h-28 rounded-full flex items-center justify-center border border-white/10">
      <div
        className="absolute inset-0 rounded-full border-2 animate-ping opacity-20"
        style={{ borderColor: accentColor }}
      />
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        className="relative z-10"
      >
        <circle cx="12" cy="12" r="10" stroke={accentColor} strokeWidth="1.5" />
        <path d="M12 7v5l3 3" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>

    <div className="flex flex-col gap-3 relative z-10">
      <span
        className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em]"
        style={{ color: accentColor }}
      >
        PRODUCTION ARCHIVE
      </span>
      <h3 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
        COMING SOON
      </h3>
      <p className="font-['Rubik',sans-serif] text-sm sm:text-base text-white/50 max-w-lg leading-relaxed">
        Production media archive for{" "}
        <span className="text-white/80 font-semibold">{title}</span> is currently
        being curated and prepared. Check back soon for an immersive visual showcase.
      </p>
    </div>

    {/* subtle dot-grid texture */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.04]"
      style={{
        backgroundImage: `radial-gradient(${accentColor} 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    />
  </div>
);

export default ComingSoonPanel;

