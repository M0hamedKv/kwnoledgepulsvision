"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceDetailItem, ServiceMediaItem } from "../servicesData";
import { ArrowRightIcon, ArrowLeftIcon } from "@/svgs";
import { InViewVideo, Lightbox, LightboxItem } from "../showcase";
import { AmbientSpotlights } from "@/components/ui";
import { AnimationHero } from "../AnimationHero";

interface AnimationPageProps {
  service: ServiceDetailItem;
  prevService?: ServiceDetailItem;
  nextService?: ServiceDetailItem;
}

interface CinemaReelTileProps {
  reel: ServiceMediaItem;
  index: number;
  className?: string;
  showDescription?: boolean;
  onSelect: () => void;
}

const CinemaReelTile: React.FC<CinemaReelTileProps> = ({
  reel,
  index,
  className = "aspect-video",
  showDescription = false,
  onSelect,
}) => (
  <div
    onClick={onSelect}
    className={`group relative rounded-none overflow-hidden border border-white/10 hover:border-[#00c8ff]/70 bg-black transition-colors duration-500 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.85)] ${className}`}
  >
    <InViewVideo
      src={reel.url}
      className="w-full h-full object-cover rounded-none brightness-90 group-hover:brightness-105 group-hover:scale-104 transition-all duration-700 ease-out pointer-events-none"
    />

    {/* Minimal index tag */}
    <div className="absolute top-3 left-3 z-10 pointer-events-none">
      <span className="px-2 py-0.5 bg-black/65 backdrop-blur-sm border border-white/10 text-[10px] tracking-[0.2em] text-white/55 group-hover:text-[#00c8ff] group-hover:border-[#00c8ff]/40 transition-colors">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>

    {/* Editorial Hover Reveal */}
    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5 sm:p-7 pointer-events-none z-10">
      <div className="flex items-end justify-between gap-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
        <div className="flex flex-col gap-1 max-w-2xl">
          {reel.category && (
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#00c8ff]">
              {reel.category}
              {reel.badge ? ` // ${reel.badge}` : ""}
            </span>
          )}
          <h3 className="font-['BlauerNue',sans-serif] text-lg sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            {reel.title}
          </h3>
          {showDescription && reel.description && (
            <p className="text-xs sm:text-sm text-white/70 line-clamp-2 mt-0.5">
              {reel.description}
            </p>
          )}
        </div>

        <span className="shrink-0 px-3 py-1.5 border border-white/25 bg-black/70 text-[10px] font-bold uppercase tracking-widest text-white group-hover:border-[#00c8ff] group-hover:text-[#00c8ff] transition-colors hidden sm:inline-flex items-center gap-1">
          <span>THEATER</span>
          <span>↗</span>
        </span>
      </div>
    </div>
  </div>
);

export const AnimationPage: React.FC<AnimationPageProps> = ({
  service,
  prevService,
  nextService,
}) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [lightboxState, setLightboxState] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  const heroVideoSrc =
    service.coverVideo ||
    "https://res.cloudinary.com/fbq1bvni/video/upload/v1795629475/CAM_01_GATE.mp4";

  const videoReels = service.gallery.filter((g) => g.type === "video");

  useEffect(() => {
    if (typeof window === "undefined" || !galleryRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = galleryRef.current?.querySelectorAll(".cinema-row");
      rows?.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              once: true,
            },
            clearProps: "transform",
          }
        );
      });
    }, galleryRef);

    return () => ctx.revert();
  }, [videoReels.length]);

  const handleOpenLightbox = (index: number) => {
    setLightboxState({
      items: videoReels.map((r) => ({
        id: r.id,
        title: r.title,
        url: r.url,
        type: "video",
        badge: r.badge,
        category: r.category,
        description: r.description,
      })),
      index,
    });
  };

  // Partition into rhythmic exhibition tiers: 1 + 2 + 3 + 1 + 2 + 3 + 2 (+ overflow fallback)
  const tier1Premiere = videoReels.slice(0, 1);
  const tier2Asym = videoReels.slice(1, 3);
  const tier3Trio = videoReels.slice(3, 6);
  const tier4Panoramic = videoReels.slice(6, 7);
  const tier5AsymRev = videoReels.slice(7, 9);
  const tier6Trio = videoReels.slice(9, 12);
  const tier7FinaleDuo = videoReels.slice(12, 14);
  const tierOverflow = videoReels.slice(14);

  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-[#00c8ff] selection:text-black">
      {/* =====================================================================
          1. INTERACTIVE CINEMA HERO — PARALLAX + BOKEH/ANAMORPHIC CANVAS + GSAP
          ===================================================================== */}
      <AnimationHero videoSrc={heroVideoSrc} />

      {/* =====================================================================
          2. CURATED RHYTHMIC CINEMA EXHIBITION (NO FILTERS — EDITORIAL MASONRY)
          ===================================================================== */}
      <section
        id="cinema-reels"
        className="w-full py-14 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 relative bg-black overflow-hidden scroll-mt-24"
      >
        {/* Signature Architectural Dual Blue Spotlights */}
        <AmbientSpotlights />

        <div ref={galleryRef} className="max-w-[1700px] mx-auto flex flex-col gap-5 sm:gap-6 relative z-10">
          {/* Editorial Archive Header */}
          <div className="cinema-row flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
                01 // ARCHITECTURAL CINEMA ARCHIVE
              </span>
              <h2 className="font-['BlauerNue',sans-serif] text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mt-1.5">
                MOTION EXHIBITION
              </h2>
            </div>
            <span className="text-xs text-white/50 uppercase tracking-[0.2em]">
              {videoReels.length} PRODUCTION FILMS • CLICK FOR THEATER
            </span>
          </div>

          {/* Tier 1: Full-Bleed Premiere Film Stage */}
          {tier1Premiere.length > 0 && (
            <div className="cinema-row w-full">
              <CinemaReelTile
                reel={tier1Premiere[0]}
                index={0}
                showDescription
                className="w-full aspect-video sm:aspect-21/9 min-h-65 sm:min-h-96 lg:min-h-130"
                onSelect={() => handleOpenLightbox(0)}
              />
            </div>
          )}

          {/* Tier 2: Asymmetric Editorial Duo (62% / 38%) */}
          {tier2Asym.length > 0 && (
            <div className="cinema-row w-full flex flex-col md:flex-row gap-5 sm:gap-6 items-stretch">
              {tier2Asym[0] && (
                <CinemaReelTile
                  reel={tier2Asym[0]}
                  index={1}
                  showDescription
                  className="w-full md:w-[62%] h-72 sm:h-96 lg:h-125"
                  onSelect={() => handleOpenLightbox(1)}
                />
              )}
              {tier2Asym[1] && (
                <CinemaReelTile
                  reel={tier2Asym[1]}
                  index={2}
                  className="w-full md:w-[38%] h-72 sm:h-96 lg:h-125"
                  onSelect={() => handleOpenLightbox(2)}
                />
              )}
            </div>
          )}

          {/* Tier 3: Architectural Cinema Trio */}
          {tier3Trio.length > 0 && (
            <div className="cinema-row grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {tier3Trio.map((reel, offset) => (
                <CinemaReelTile
                  key={reel.id}
                  reel={reel}
                  index={3 + offset}
                  className="aspect-video"
                  onSelect={() => handleOpenLightbox(3 + offset)}
                />
              ))}
            </div>
          )}

          {/* Tier 4: Widescreen Panoramic Commercial Showcase */}
          {tier4Panoramic.length > 0 && (
            <div className="cinema-row w-full">
              <CinemaReelTile
                reel={tier4Panoramic[0]}
                index={6}
                showDescription
                className="w-full aspect-video sm:aspect-21/9 min-h-65 sm:min-h-96 lg:min-h-120"
                onSelect={() => handleOpenLightbox(6)}
              />
            </div>
          )}

          {/* Tier 5: Reversed Asymmetric Duo (38% / 62%) */}
          {tier5AsymRev.length > 0 && (
            <div className="cinema-row w-full flex flex-col md:flex-row gap-5 sm:gap-6 items-stretch">
              {tier5AsymRev[0] && (
                <CinemaReelTile
                  reel={tier5AsymRev[0]}
                  index={7}
                  className="w-full md:w-[38%] h-72 sm:h-96 lg:h-125"
                  onSelect={() => handleOpenLightbox(7)}
                />
              )}
              {tier5AsymRev[1] && (
                <CinemaReelTile
                  reel={tier5AsymRev[1]}
                  index={8}
                  showDescription
                  className="w-full md:w-[62%] h-72 sm:h-96 lg:h-125"
                  onSelect={() => handleOpenLightbox(8)}
                />
              )}
            </div>
          )}

          {/* Tier 6: Prototypes & Hospitality Trio */}
          {tier6Trio.length > 0 && (
            <div className="cinema-row grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {tier6Trio.map((reel, offset) => (
                <CinemaReelTile
                  key={reel.id}
                  reel={reel}
                  index={9 + offset}
                  className="aspect-video"
                  onSelect={() => handleOpenLightbox(9 + offset)}
                />
              ))}
            </div>
          )}

          {/* Tier 7: Finale Balanced Duo */}
          {tier7FinaleDuo.length > 0 && (
            <div className="cinema-row grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {tier7FinaleDuo.map((reel, offset) => (
                <CinemaReelTile
                  key={reel.id}
                  reel={reel}
                  index={12 + offset}
                  showDescription
                  className="aspect-16/10"
                  onSelect={() => handleOpenLightbox(12 + offset)}
                />
              ))}
            </div>
          )}

          {/* Future Expansion Fallback */}
          {tierOverflow.length > 0 && (
            <div className="cinema-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {tierOverflow.map((reel, offset) => (
                <CinemaReelTile
                  key={reel.id}
                  reel={reel}
                  index={14 + offset}
                  className="aspect-video"
                  onSelect={() => handleOpenLightbox(14 + offset)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          3. CLEAN PROPOSAL CTA — ZERO PARAGRAPHS
          ===================================================================== */}
      <section className="w-full py-20 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 relative overflow-hidden bg-black text-center">
        {/* Signature Architectural Dual Blue Spotlights */}
        <AmbientSpotlights variant="alternate" />

        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/Contact?service=animation"
              className="px-8 sm:px-10 py-4 sm:py-5 bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-white transition-colors rounded-none shadow-2xl inline-flex items-center justify-center"
            >
              REQUEST A PROPOSAL
            </Link>

            <Link
              href="/services"
              className="px-8 sm:px-10 py-4 sm:py-5 border border-white/20 text-white font-['BlauerNue',sans-serif] font-black text-xs sm:text-sm uppercase tracking-widest hover:border-white/40 hover:text-white transition-colors rounded-none inline-flex items-center justify-center"
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
              <div className="text-left text-xs uppercase tracking-wider">
                <span className="block text-white/40 text-xs font-semibold">PREVIOUS</span>
                <span className="font-bold uppercase tracking-wider text-white text-xs sm:text-sm">{prevService.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/services"
            className="text-xs sm:text-sm font-bold text-white/60 hover:text-[#00c8ff] uppercase tracking-widest transition-colors"
          >
            SERVICES CATALOG
          </Link>

          {nextService ? (
            <Link
              href={`/services/${nextService.slug}`}
              className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
            >
              <div className="text-right text-xs uppercase tracking-wider">
                <span className="block text-white/40 text-xs font-semibold">NEXT</span>
                <span className="font-bold uppercase tracking-wider text-white text-xs sm:text-sm">{nextService.title}</span>
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
