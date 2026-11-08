"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ServiceDetailItem } from "./servicesData";
import { ArrowUpRightIcon, ArrowLeftIcon, ArrowRightIcon } from "@/svgs";

interface InteractiveCardsShowcaseProps {
  services: ServiceDetailItem[];
  className?: string;
}

export const InteractiveCardsShowcase: React.FC<InteractiveCardsShowcaseProps> = ({
  services,
  className = "",
}) => {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (id: string) => {
    if (flippedCardId === id) return;
    setFlippedCardId(id);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCardId(null);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollTrackRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollTrackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Interactive Solutions Staggered 3D Card Deck"
      className={`relative w-full min-h-[90vh] bg-[#08070b] text-white py-16 sm:py-24 overflow-hidden select-none flex flex-col justify-center ${className}`}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. BACKGROUND ATMOSPHERE: Watermark Typography & Yard Numbers
          (Exact match to reference image: deep purple/dark glow + yard markers)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-['BlauerNue',sans-serif] text-[13vw] font-black uppercase tracking-tight text-[#3b1d6e]/15 whitespace-nowrap leading-none select-none">
          INTERACTIVE SOLUTIONS
        </span>
      </div>

      {/* Horizontal Baseline Yard Markers (10, 20, 30, 40, 50) */}
      <div className="absolute inset-x-0 bottom-8 flex justify-around pointer-events-none select-none opacity-20">
        <span className="font-mono text-3xl font-black text-white/30">10</span>
        <span className="font-mono text-3xl font-black text-white/30">20</span>
        <span className="font-mono text-3xl font-black text-white/30">30</span>
        <span className="font-mono text-3xl font-black text-white/30">40</span>
        <span className="font-mono text-3xl font-black text-white/30">50</span>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TRACK HEADER & SCROLL CONTROLS
          ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[1700px] w-full mx-auto px-6 sm:px-12 flex items-center justify-between mb-4 z-20">
        <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
          INTERACTIVE DECK // CLICK TO 3D ROTATE & PLAY
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-10 h-10 border border-white/20 hover:border-[#00c8ff] hover:text-[#00c8ff] flex items-center justify-center transition-colors bg-black/60 backdrop-blur-xs cursor-pointer"
          >
            <ArrowLeftIcon className="w-4 h-4 stroke-current" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-10 h-10 border border-white/20 hover:border-[#00c8ff] hover:text-[#00c8ff] flex items-center justify-center transition-colors bg-black/60 backdrop-blur-xs cursor-pointer"
          >
            <ArrowRightIcon className="w-4 h-4 stroke-current" />
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. HORIZONTAL SCROLL TRACK ("مرصوصين جنب بعض واسكرول بالجنب")
          With Staggered Alternating Vertical Positions ("واحد فوق وواحد تحت")
          ───────────────────────────────────────────────────────────── */}
      <div
        ref={scrollTrackRef}
        className="relative w-full overflow-x-auto scrollbar-none flex items-center gap-10 sm:gap-14 md:gap-16 py-16 px-8 sm:px-16 md:px-24 scroll-smooth z-10"
        style={{ perspective: "2200px" }}
      >
        {services.map((service, index) => {
          const isFlipped = flippedCardId === service.id;
          const videoSrc =
            service.coverVideo || (service.gallery && service.gallery[0]?.url);

          // Alternating Staggered Positions: "واحد فوق وواحد تحت"
          // Even index = lower down (+translate-y), Odd index = higher up (-translate-y)
          const isHigher = index % 2 === 1;
          const staggerClass = isFlipped
            ? "translate-y-0"
            : isHigher
            ? "-translate-y-10 sm:-translate-y-14 md:-translate-y-18"
            : "translate-y-10 sm:translate-y-14 md:translate-y-18";

          return (
            <div
              key={service.id || service.slug}
              className={`shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${staggerClass} ${
                isFlipped
                  ? "w-[85vw] max-w-[780px] lg:max-w-[880px] z-30"
                  : "w-[210px] sm:w-[230px] md:w-[250px] lg:w-[265px] z-10"
              }`}
              style={{ perspective: "2200px" }}
            >
              {/* =========================================================
                  3D CARD CONTAINER (Flips/Rotates on Y axis when clicked)
                  "ولما ادوس ع وحده هي بس الي يحصلها rotate ويكون باين"
                  ========================================================= */}
              <div
                onClick={() => handleCardClick(service.id)}
                className={`relative w-full cursor-pointer transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isFlipped ? "rotate-y-180" : "rotate-y-0 hover:-translate-y-2"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  minHeight: isFlipped ? "440px" : "360px",
                }}
              >
                {/* ─────────────────────────────────────────────────────
                    FRONT FACE: Compact Collectible 3D Card (Image 1 / 3)
                    White/Silver Beveled Border Frame + Small Compact Size
                    ───────────────────────────────────────────────────── */}
                <div
                  className="w-full flex flex-col items-center"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* Beveled White Metallic Frame */}
                  <div className="relative w-full aspect-[3/4.2] rounded-2xl p-[3.5px] bg-gradient-to-b from-white via-[#dcdde1] to-[#718096] shadow-[0_12px_40px_rgba(255,255,255,0.12)] hover:shadow-[0_18px_50px_rgba(255,255,255,0.28)] transition-all duration-500">
                    <div className="relative w-full h-full rounded-[13px] overflow-hidden bg-black flex items-center justify-center">
                      {videoSrc ? (
                        <video
                          src={videoSrc}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-106 pointer-events-none"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-900" />
                      )}

                      {/* Play Action Badge */}
                      <div className="absolute inset-0 bg-black/25 hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-black/80 border border-white/80 text-white flex items-center justify-center shadow-xl hover:scale-115 hover:bg-white hover:text-black transition-all duration-300">
                          <span className="text-lg ml-0.5">▶</span>
                        </div>
                      </div>

                      {/* Card Stamp Badge */}
                      <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                        <span className="font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 bg-black/85 border border-white/40 text-white">
                          {service.number ? `0${service.number}`.slice(-2) : `0${index + 1}`}
                        </span>
                        <span className="font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 bg-black/85 border border-white/20 text-white/80">
                          3D MOMENT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Title & Metric details below (Matching Reference) */}
                  <div className="flex flex-col items-center text-center mt-3.5 gap-0.5 pointer-events-none select-none">
                    <h3 className="font-['BlauerNue',sans-serif] text-sm sm:text-base font-black uppercase tracking-wider text-white">
                      {service.title}
                    </h3>
                    <span className="font-mono text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest">
                      {service.badge || service.disciplineTag || "INTERACTIVE SOLUTION"}
                    </span>
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────
                    BACK FACE: Widescreen 16:9 Video Player (Image 2)
                    "ويكون علي الفديو اسمه علشان اروح للخدمه"
                    ───────────────────────────────────────────────────── */}
                <div
                  className="absolute inset-0 w-full h-full flex flex-col justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border-2 border-white/80 shadow-[0_30px_90px_rgba(255,255,255,0.14)] group/player">
                    {/* 4K Video */}
                    {isFlipped && (
                      <video
                        src={videoSrc}
                        autoPlay
                        loop
                        controls
                        playsInline
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    )}

                    {/* Top-Left Close Button (Matching Image 2 Reference) */}
                    <div className="absolute top-4 left-4 z-40">
                      <button
                        onClick={handleClose}
                        className="flex items-center gap-2 px-5 py-2 bg-white text-black hover:bg-[#00c8ff] hover:text-black font-['BlauerNue',sans-serif] font-black text-xs uppercase tracking-widest rounded-full shadow-2xl transition-all cursor-pointer active:scale-95"
                      >
                        <span>CLOSE</span>
                        <span className="text-sm font-bold">✕</span>
                      </button>
                    </div>

                    {/* ─────────────────────────────────────────────────
                        "ويكون علي الفديو اسمه علشان اروح للخدمه"
                        DIRECT LINK WITH SERVICE NAME ON TOP OF VIDEO
                        ───────────────────────────────────────────────── */}
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
                      <Link
                        href={`/services/${service.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="group/link inline-flex items-center gap-3 px-5 sm:px-7 py-3 sm:py-3.5 bg-black/85 hover:bg-[#00c8ff] text-white hover:text-black border border-white/30 hover:border-[#00c8ff] backdrop-blur-md transition-all duration-300 shadow-2xl cursor-pointer"
                      >
                        <div className="flex flex-col text-left">
                          <span className="font-mono text-[9px] text-[#00c8ff] group-hover/link:text-black uppercase tracking-[0.2em] font-bold">
                            {service.disciplineTag || "INTERACTIVE SOLUTION"}
                          </span>
                          <span className="font-['BlauerNue',sans-serif] text-sm sm:text-base font-black uppercase tracking-wider leading-tight">
                            {service.title} — GO TO SERVICE
                          </span>
                        </div>
                        <div className="w-7 h-7 rounded-full border border-current flex items-center justify-center shrink-0 group-hover/link:rotate-45 transition-transform">
                          <ArrowUpRightIcon className="w-3.5 h-3.5 stroke-current" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InteractiveCardsShowcase;