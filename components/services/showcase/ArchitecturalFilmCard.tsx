"use client";

import React from "react";
import { ServiceMediaItem } from "../servicesData";
import { InViewVideo } from "./InViewVideo";

export interface ArchitecturalFilmCardProps {
  video: ServiceMediaItem;
  accentColor: string;
  onOpenTheater: () => void;
}

export const ArchitecturalFilmCard: React.FC<ArchitecturalFilmCardProps> = ({
  video,
  accentColor,
  onOpenTheater,
}) => {
  return (
    <div
      onClick={onOpenTheater}
      className="sm-feature-card group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[var(--accent)] bg-[#090c15] transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_rgba(0,200,255,0.18)] hover:-translate-y-1.5 cursor-pointer flex flex-col will-change-transform"
      style={{ "--accent": accentColor } as React.CSSProperties}
    >
      {/* 16:9 Cinema Viewport */}
      <div className="relative w-full aspect-video bg-black overflow-hidden">
        <InViewVideo
          src={video.url}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        />

        {/* Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-75 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span
            className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/15 font-mono text-[10px] font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            {video.badge || "4K MASTER"}
          </span>
          <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md font-mono text-[9px] text-white/70 uppercase">
            ARCHITECTURAL FILM
          </span>
        </div>

        {/* Center Hover Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-12 h-12 rounded-full bg-black/70 group-hover:bg-[var(--accent)] text-white group-hover:text-black border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 transform scale-90 group-hover:scale-110 shadow-2xl"
            style={{ "--accent": accentColor } as React.CSSProperties}
          >
            <span className="text-sm font-mono ml-0.5 font-bold">▶</span>
          </div>
        </div>

        {/* Bottom Expand Indicator */}
        <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <span
            className="px-2.5 py-1 rounded text-black font-mono text-[9px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1"
            style={{ backgroundColor: accentColor }}
          >
            <span>WATCH 4K THEATER</span>
            <span>↗</span>
          </span>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-5 flex flex-col justify-between flex-1 gap-2.5 bg-gradient-to-b from-white/5 to-transparent">
        <div className="flex flex-col gap-1">
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            {video.category}
          </span>
          <h4
            className="font-['BlauerNue',sans-serif] text-base font-bold uppercase text-white group-hover:text-[var(--accent)] transition-colors line-clamp-1"
            style={{ "--accent": accentColor } as React.CSSProperties}
          >
            {video.title}
          </h4>
          {video.description && (
            <p className="font-['Rubik',sans-serif] text-xs text-white/60 line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-white/8 flex items-center justify-between font-mono text-[10px] text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            DIRECTOR CUT
          </span>
          <span className="text-white/60 group-hover:text-white transition-colors uppercase font-bold flex items-center gap-1">
            VIEW REEL ↗
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturalFilmCard;

