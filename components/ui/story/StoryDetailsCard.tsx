"use client";

import React from "react";

export interface StoryDetailsCardProps {
  badge?: string;
  fullTitle: string;
  description?: string;
  accentColor: string;
  isReversed: boolean;
  onOpenTheater?: () => void;
}

export const StoryDetailsCard: React.FC<StoryDetailsCardProps> = ({
  badge,
  fullTitle,
  description,
  accentColor,
  isReversed,
  onOpenTheater,
}) => {
  return (
    <div
      className={`mt-8 md:-mt-44 lg:-mt-52 flex w-full z-20 relative px-4 ${
        isReversed
          ? "justify-center md:justify-start md:ps-8 lg:ps-16"
          : "justify-center md:justify-end md:pe-8 lg:pe-16"
      }`}
    >
      <div className="flex flex-col max-w-md w-full p-6 sm:p-7 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] gap-3 text-left items-start">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider w-full">
          <span className="flex items-center gap-1.5 font-bold" style={{ color: accentColor }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            {badge || "INTERACTIVE MAQUETTE"}
          </span>
          <span className="text-white/40">INTERACTIVE SYSTEM</span>
        </div>

        <h4 className="font-['BlauerNue',sans-serif] text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
          {fullTitle}
        </h4>

        {/* Crisp HUD Spec Tags instead of text paragraph */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-white/60 uppercase">
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">UE5.4 ENGINE</span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">60 FPS REAL-TIME</span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10" style={{ color: accentColor }}>4K REEL</span>
        </div>

        <div className="pt-3 flex items-center justify-between border-t border-white/10 mt-1 w-full">
          {onOpenTheater ? (
            <button
              type="button"
              onClick={onOpenTheater}
              className="px-4 py-2 rounded-xl text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              style={{ backgroundColor: accentColor }}
            >
              <span>WATCH FULLSCREEN</span>
              <span>↗</span>
            </button>
          ) : (
            <span className="font-mono text-[10px] text-white/40 uppercase">
              TOUCH KIOSK MODE
            </span>
          )}

          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
            UE5 ARCHITECTURE
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailsCard;

