"use client";

import React, { useState } from "react";
import { ServiceDetailItem, ServiceMediaItem } from "../servicesData";
import { InViewVideo } from "./InViewVideo";
import { ArchitecturalFilmCard } from "./ArchitecturalFilmCard";

export interface AnimationShowcaseProps {
  service: ServiceDetailItem;
  serviceVideos: ServiceMediaItem[];
  onOpenTheater: (index: number) => void;
}

export const AnimationShowcase: React.FC<AnimationShowcaseProps> = ({
  service,
  serviceVideos,
  onOpenTheater,
}) => {
  const premiereFilm = serviceVideos.length > 0 ? serviceVideos[0] : null;
  const [premiereMuted, setPremiereMuted] = useState(true);

  // Group Animation videos by category
  const animationCategories: Record<string, ServiceMediaItem[]> = {};
  for (const v of serviceVideos) {
    const cat = v.category ?? "Other";
    if (!animationCategories[cat]) animationCategories[cat] = [];
    animationCategories[cat].push(v);
  }

  return (
    <div className="flex flex-col gap-16">
      {/* A. Premiere Flagship Reel (Top Spotlight) */}
      {premiereFilm && (
        <div className="sm-premiere flex flex-col gap-4 will-change-transform">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white font-bold tracking-widest uppercase">
                PREMIERE FLAGSHIP REEL // {premiereFilm.category}
              </span>
            </div>
            <span className="text-white/50 uppercase tracking-widest hidden sm:inline-block">
              4K RAY-TRACED CINEMA
            </span>
          </div>

          <div
            className="relative w-full aspect-21/9 sm:aspect-21/9 bg-black border border-white/15 rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)] group cursor-pointer"
            onClick={() => onOpenTheater(0)}
          >
            <InViewVideo
              src={premiereFilm.url}
              isMuted={premiereMuted}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            />

            {/* Gradient Lighting */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Content HUD */}
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex items-end justify-between gap-4">
              <h3 className="font-['BlauerNue',sans-serif] text-xl sm:text-3xl font-black uppercase tracking-tight text-white">
                {premiereFilm.title}
              </h3>

              <div
                className="flex items-center gap-3 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setPremiereMuted(!premiereMuted)}
                  className="px-4 py-2.5 rounded-none bg-white/10 hover:bg-[#00c8ff] hover:text-black text-white font-mono text-xs uppercase tracking-wider backdrop-blur-md border border-white/15 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>{premiereMuted ? "UNMUTE" : "MUTE"}</span>
                  <span>{premiereMuted ? "🔇" : "🔊"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* B. All Films Exhibited by Architectural Development Category */}
      <div className="flex flex-col gap-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <span
            className="font-mono text-xs uppercase tracking-widest font-bold"
            style={{ color: service.accentColor }}
          >
            ARCHITECTURAL CINEMA ARCHIVE ({serviceVideos.length} PRODUCTION FILMS):
          </span>
          <span className="font-mono text-xs text-white/40 uppercase">
            HOVER TO PREVIEW • CLICK FOR 4K THEATER
          </span>
        </div>

        {Object.entries(animationCategories).map(([category, videos]) => (
          <div key={category} className="flex flex-col gap-6">
            {/* Category Section Header */}
            <div className="flex items-center gap-4">
              <span
                className="font-mono text-xs font-bold uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-full border bg-white/2"
                style={{
                  color: service.accentColor,
                  borderColor: `${service.accentColor}40`,
                }}
              >
                {category} — {videos.length} {videos.length === 1 ? "FILM" : "FILMS"}
              </span>
              <div
                className="h-px flex-1 opacity-15"
                style={{ backgroundColor: service.accentColor }}
              />
            </div>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => {
                const overallIndex = serviceVideos.findIndex((v) => v.id === video.id);
                return (
                  <ArchitecturalFilmCard
                    key={video.id}
                    video={video}
                    accentColor={service.accentColor}
                    onOpenTheater={() =>
                      onOpenTheater(overallIndex >= 0 ? overallIndex : 0)
                    }
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimationShowcase;

