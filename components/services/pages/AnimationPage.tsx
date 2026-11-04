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
          1. FULL-BLEED 4K VIDEO HERO — PURE VIDEO, ZERO TEXT CLUTTER
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
          2. PURE VIDEO EXHIBITION — ZERO PLAY ICONS, ZERO CLUTTER
             - Pure video display on every card
             - Sharp edges (rounded-none)
             - Only on hover: gentle overlay with title ONLY
             - Zero play buttons, zero badges, zero text by default
          ===================================================================== */}
      <section id="cinema-reels" className="w-full py-12 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 relative bg-black">
        <div className="max-w-[1700px] mx-auto flex flex-col gap-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pb-6 border-b border-white/10">
            {categories.map((cat: any) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#00c8ff] text-black font-bold shadow-[0_0_20px_rgba(0,200,255,0.4)]"
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid of 20 Cinema Videos — 100% Pure Video Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredReels.map((reel, idx) => (
              <div
                key={reel.id}
                onClick={() => handleOpenLightbox(idx)}
                className="group relative rounded-none overflow-hidden border border-white/10 hover:border-white/40 bg-black transition-all duration-500 cursor-pointer flex flex-col aspect-video"
              >
                {/* 100% Full Video */}
                <video
                  src={reel.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover rounded-none group-hover:scale-104 transition-transform duration-700 ease-out pointer-events-none"
                />

                {/* Minimal Hover Overlay — Project Name ONLY, Zero Play Icons */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center pointer-events-none z-10">
                  <span className="font-['BlauerNue',sans-serif] text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {reel.title}
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
              className="px-10 py-5 bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-black text-sm uppercase tracking-widest hover:bg-white transition-colors rounded-none shadow-2xl"
            >
              REQUEST A PROPOSAL
            </Link>

            <Link
              href="/services"
              className="px-8 py-5 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white/40 transition-colors rounded-none"
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
        <div className="max-w-[1700px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
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
