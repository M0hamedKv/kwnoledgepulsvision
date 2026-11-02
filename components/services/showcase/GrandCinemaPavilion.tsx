"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ServiceMediaItem } from "../servicesData";
import { InViewVideo } from "./InViewVideo";

export interface GrandCinemaPavilionProps {
  video: ServiceMediaItem;
  accentColor: string;
  onOpenTheater: () => void;
}

export const GrandCinemaPavilion: React.FC<GrandCinemaPavilionProps> = ({
  video,
  accentColor,
  onOpenTheater,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(cardRef.current, {
      duration: 0.18,
      rotateX,
      rotateY,
      scale: 1.015,
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      duration: 0.45,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      className="sm-pavilion-card select-none"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-3xl overflow-hidden border border-white/15 bg-black/90 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] flex flex-col will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          borderColor: `${accentColor}44`,
        }}
      >
        {/* Top Header HUD */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-white/5 border-b border-white/10 font-mono text-xs pointer-events-none">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white font-bold tracking-widest uppercase">
              {video.category || "MASTER DEVELOPMENT"} // {video.badge || "REAL-TIME MAQUETTE"}
            </span>
          </div>
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            TOUCH TABLE KIOSK SYSTEM
          </span>
        </div>

        {/* Main 16:9 Video Canvas */}
        <div
          className="relative w-full aspect-video bg-black overflow-hidden cursor-pointer"
          onClick={onOpenTheater}
        >
          <InViewVideo
            src={video.url}
            isMuted={isMuted}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />

          {/* Ambient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Center Hover Action */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="px-5 py-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 group-hover:scale-105 transition-transform duration-300 shadow-2xl"
            >
              <span className="text-sm" style={{ color: accentColor }}>⛶</span>
              <span>CLICK FOR FULLSCREEN 4K THEATER</span>
            </div>
          </div>

          {/* Audio Toggle on Canvas */}
          <div
            className="absolute bottom-4 right-4 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="px-3 py-1.5 rounded-lg bg-black/80 hover:bg-white hover:text-black text-white font-mono text-xs uppercase tracking-wider border border-white/15 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{isMuted ? "🔇 UNMUTE" : "🔊 MUTE"}</span>
            </button>
          </div>
        </div>

        {/* Pavilion Bottom Content */}
        <div className="p-6 sm:p-7 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-['BlauerNue',sans-serif] text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
              {video.title}
            </h3>
            <button
              type="button"
              onClick={onOpenTheater}
              className="px-4 py-2 rounded-xl text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all cursor-pointer flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
              style={{ backgroundColor: accentColor }}
            >
              <span>WATCH MASTER REEL</span>
              <span>↗</span>
            </button>
          </div>
          {video.description && (
            <p className="font-['Rubik',sans-serif] text-xs sm:text-sm text-white/65 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrandCinemaPavilion;

