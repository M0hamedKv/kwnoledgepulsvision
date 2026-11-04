"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ServiceDetailItem } from "../servicesData";
import { ArrowRightIcon, ArrowLeftIcon } from "@/svgs";
import { Lightbox, LightboxItem } from "../showcase";

interface AnimationPageProps {
  service: ServiceDetailItem;
  prevService?: ServiceDetailItem;
  nextService?: ServiceDetailItem;
}

export const AnimationPage: React.FC<AnimationPageProps> = ({
  service,
  prevService,
  nextService,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [premiereMuted, setPremiereMuted] = useState<boolean>(true);
  const [lightboxState, setLightboxState] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  // Guarantee the hero video autoplays across all browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const heroVideoSrc =
    service.coverVideo ||
    "https://res.cloudinary.com/hxytmocg/video/upload/v1793216262/NIGHT_SPINE.mp4";

  // Filter video reels
  const videoReels = service.gallery.filter((g) => g.type === "video");
  const premiereReel = videoReels[0] || null;

  const categories = [
    "ALL",
    ...Array.from(new Set(videoReels.map((r) => r.category).filter(Boolean))),
  ];

  const filteredReels =
    activeCategory === "ALL"
      ? videoReels
      : videoReels.filter((r) => r.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setLightboxState({
      items: filteredReels.map((r) => ({
        id: r.id,
        title: r.title,
        url: r.url,
        type: "video",
        badge: r.badge,
        category: r.category,
      })),
      index,
    });
  };

  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-[#00c8ff] selection:text-black">
      {/* =====================================================================
          1. FULL-BLEED 4K PLAYING VIDEO HERO — DISPLAY ONLY, NO TEXT CLUTTER
          ===================================================================== */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden border-b border-white/10">
        {/* Full-bleed background video filling 100% of the Hero viewport */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <video
            ref={videoRef}
            src={heroVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover scale-102"
          />
          {/* Subtle cinematic overlays for visual contrast */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10" />

        {/* Hero Title — Pure, Clean, Bold */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
          <h1 className="font-['BlauerNue',sans-serif] text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] font-black uppercase tracking-tight leading-[0.8] text-white select-none drop-shadow-[0_10px_50px_rgba(0,0,0,0.95)]">
            ANIMATION
          </h1>
        </div>

        {/* Clean Scroll Indicator */}
        <div className="relative z-10 flex items-center justify-center">
          <a
            href="#cinema-reels"
            className="font-mono text-xs uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>DISCOVER CINEMA</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* =====================================================================
          2. PURE VISUAL SHOWCASE — 20 ARCHITECTURAL CINEMA REELS
          ===================================================================== */}
      <section id="cinema-reels" className="w-full py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-20 relative bg-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pb-6 border-b border-white/10">
            {categories.map((cat: any) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#00c8ff] text-black font-bold shadow-[0_0_20px_rgba(0,200,255,0.4)]"
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Premiere Flagship Reel (Featured Top) — Video-First, Zero Paragraphs */}
          {premiereReel && activeCategory === "ALL" && (
            <div
              className="relative w-full aspect-21/9 bg-black border border-white/15 rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)] group cursor-pointer"
              onClick={() => handleOpenLightbox(0)}
            >
              <video
                src={premiereReel.url}
                autoPlay
                loop
                muted={premiereMuted}
                playsInline
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

              {/* Bottom HUD: Title & Controls Only */}
              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex items-end justify-between gap-4">
                <h3 className="font-['BlauerNue',sans-serif] text-xl sm:text-3xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                  {premiereReel.title}
                </h3>

                <div
                  className="flex items-center gap-3 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setPremiereMuted(!premiereMuted)}
                    className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-[#00c8ff] hover:text-black text-white font-mono text-xs uppercase tracking-wider backdrop-blur-md border border-white/15 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>{premiereMuted ? "UNMUTE" : "MUTE"}</span>
                    <span>{premiereMuted ? "🔇" : "🔊"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenLightbox(0)}
                    className="px-5 py-2.5 rounded-xl bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all cursor-pointer"
                  >
                    EXPAND 4K THEATER ↗
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Grid of Video Reels — Clean 16:9 Presentation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredReels.map((reel, idx) => (
              <div
                key={reel.id}
                onClick={() => handleOpenLightbox(idx)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#00c8ff] bg-black transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                {/* 16:9 Video Canvas */}
                <div className="relative w-full aspect-video bg-black overflow-hidden">
                  <video
                    src={reel.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/60 group-hover:bg-[#00c8ff] text-white group-hover:text-black border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 transform scale-90 group-hover:scale-110">
                      <span className="text-sm font-mono ml-0.5 font-bold">▶</span>
                    </div>
                  </div>
                </div>

                {/* Minimalist Title Footer — NO Descriptions, Pure Visual Polish */}
                <div className="p-4 flex items-center justify-between border-t border-white/10 bg-black/80">
                  <h4 className="font-['BlauerNue',sans-serif] text-sm sm:text-base font-bold uppercase text-white group-hover:text-[#00c8ff] transition-colors line-clamp-1">
                    {reel.title}
                  </h4>
                  <span className="font-mono text-xs text-white/40 group-hover:text-[#00c8ff] transition-colors shrink-0 ml-2">
                    ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. CLEAN PROPOSAL CTA — ZERO PARAGRAPHS
          ===================================================================== */}
      <section className="w-full py-20 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 relative overflow-hidden bg-black text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            COMMISSION ANIMATION
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/Contact?service=animation"
              className="px-10 py-5 bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-black text-sm uppercase tracking-widest hover:bg-white transition-colors rounded-xl shadow-2xl"
            >
              REQUEST A PROPOSAL
            </Link>

            <Link
              href="/services"
              className="px-8 py-5 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white/40 transition-colors rounded-xl"
            >
              BROWSE ALL SERVICES
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. ADJACENT SERVICES NAVIGATION
          ===================================================================== */}
      <nav aria-label="Adjacent Services Navigation" className="w-full py-8 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          {prevService ? (
            <Link
              href={`/services/${prevService.slug}`}
              className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 stroke-current text-[#00c8ff]" />
              <div className="text-left font-mono text-xs">
                <span className="block text-white/30 text-[10px]">PREVIOUS</span>
                <span className="font-bold uppercase tracking-wider">{prevService.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/services"
            className="font-mono text-xs text-white/40 hover:text-[#00c8ff] uppercase tracking-widest transition-colors"
          >
            SERVICES CATALOG
          </Link>

          {nextService ? (
            <Link
              href={`/services/${nextService.slug}`}
              className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
            >
              <div className="text-right font-mono text-xs">
                <span className="block text-white/30 text-[10px]">NEXT</span>
                <span className="font-bold uppercase tracking-wider">{nextService.title}</span>
              </div>
              <ArrowRightIcon className="w-4 h-4 stroke-current text-[#00c8ff]" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>

      {/* Lightbox Modal */}
      {lightboxState && (
        <Lightbox
          items={lightboxState.items}
          currentIndex={lightboxState.index}
          onClose={() => setLightboxState(null)}
          onNext={() =>
            setLightboxState((prev) =>
              prev
                ? { ...prev, index: (prev.index + 1) % prev.items.length }
                : null
            )
          }
          onPrev={() =>
            setLightboxState((prev) =>
              prev
                ? {
                    ...prev,
                    index:
                      (prev.index - 1 + prev.items.length) % prev.items.length,
                  }
                : null
            )
          }
        />
      )}
    </div>
  );
};
