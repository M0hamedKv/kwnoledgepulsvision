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
      className="sm-feature-card group relative rounded-2xl overflow-hidden border border-white/10 hover:border-(--accent) bg-black/85 backdrop-blur-md transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_rgba(0,200,255,0.18)] hover:-translate-y-1.5 cursor-pointer flex flex-col will-change-transform"
      style={{ "--accent": accentColor } as React.CSSProperties}
    >
      {/* 16:9 Cinema Viewport */}
      <div className="relative w-full aspect-video bg-black overflow-hidden">
        <InViewVideo
          src={video.url}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        />

        {/* Gradient Vignette */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Card Details Body */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-2 bg-linear-to-b from-white/5 to-transparent">
        <h4
          className="font-['BlauerNue',sans-serif] text-base font-bold uppercase text-white group-hover:text-(--accent) transition-colors line-clamp-1"
          style={{ "--accent": accentColor } as React.CSSProperties}
        >
          {video.title}
        </h4>
      </div>
        <div className="flex flex-col gap-1">
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            {video.category}
          </span>
          <h4
            className="font-['BlauerNue',sans-serif] text-base font-bold uppercase text-white group-hover:text-(--accent) transition-colors line-clamp-1"
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
  );
};

export default ArchitecturalFilmCard;

