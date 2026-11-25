"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceDetailItem } from "../servicesData";
import { ArrowRightIcon, ArrowLeftIcon } from "@/svgs";
import { Lightbox, LightboxItem, EditorialWebSlider, EditorialWebItem } from "../showcase";
import { AmbientSpotlights } from "@/components/ui";

interface RealEstateWebsitePageProps {
  service: ServiceDetailItem;
  prevService?: ServiceDetailItem;
  nextService?: ServiceDetailItem;
}

const REAL_ESTATE_PROJECTS: EditorialWebItem[] = [
  {
    id: "rew-vid-1",
    title: "Diva Residence — 3D Masterplan & Floor Selector",
    subtitle: "Explore the building form and navigate through floor-by-floor layouts in real time, engineered to match premier real estate platforms.",
    url: "/interactive/realestatewebsite/diva-masterplan.mp4",
    type: "video",
    category: "PROPTECH 3D",
  },
  {
    id: "rew-vid-2",
    title: "Diva Residence — 360° Virtual Building Panorama",
    subtitle: "Immersive virtual showcase offering full 360-degree panoramic spatial navigation and photorealistic architectural vistas.",
    url: "/interactive/realestatewebsite/diva_panoramaview.mp4",
    type: "video",
    category: "VIRTUAL TOUR",
  },
  {
    id: "rew-vid-3",
    title: "Eastville — 3D Compound Navigator & CRM",
    subtitle: "A comprehensive real-time 3D compound masterplan featuring orbital camera navigation, daylight sun studies, and live CRM inventory.",
    url: "/interactive/realestatewebsite/EastVille.mp4",
    type: "video",
    category: "COMPOUND 3D",
  },
  {
    id: "rew-vid-4",
    title: "Eastville — Virtual Compound Walkthrough",
    subtitle: "Cinematic real estate walkthrough showcasing pedestrian pathways, green landscapes, and residential architecture in motion.",
    url: "/interactive/realestatewebsite/EastVille-tour.mp4",
    type: "video",
    category: "VIRTUAL TOUR",
  },
];

export const RealEstateWebsitePage: React.FC<RealEstateWebsitePageProps> = ({
  service,
  prevService,
  nextService,
}) => {
  const [lightboxState, setLightboxState] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  const heroImageSrc = "/work/diva-1.webp";

  const handleOpenLightbox = (index: number) => {
    setLightboxState({
      items: REAL_ESTATE_PROJECTS.map((p) => ({
        id: p.id,
        title: p.title,
        url: p.url,
        type: p.type,
      })),
      index,
    });
  };

  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-[#00c8ff] selection:text-black">
      {/* =====================================================================
          1. FULL-BLEED IMAGE HERO — PURE IMAGE, CENTERED TITLE ONLY
          ===================================================================== */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src={heroImageSrc}
            alt="Real Estate Web Development & Digital Flagships"
            className="w-full h-full object-cover scale-102"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10" />

        {/* Hero Title — Pure, Clean, Bold, Center */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
          <h1 className="font-['BlauerNue',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.85] text-white select-none drop-shadow-[0_10px_60px_rgba(0,0,0,0.95)]">
            REAL ESTATE WEB
          </h1>
        </div>

        {/* Clean Scroll Indicator */}
        <div className="relative z-10 flex items-center justify-center">
          <a
            href="#editorial-realestate-showcase"
            className="text-xs uppercase tracking-[0.25em] font-bold text-white/60 hover:text-[#00c8ff] transition-colors flex items-center gap-2"
          >
            <span>EXPLORE PLATFORMS</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* =====================================================================
          2. ASYMMETRIC EDITORIAL SLIDER (EXACT REPLICA OF THE SCREENSHOTS)
          ===================================================================== */}
      <div id="editorial-realestate-showcase" className="w-full">
        <EditorialWebSlider
          items={REAL_ESTATE_PROJECTS}
          onOpenLightbox={handleOpenLightbox}
          brandTag="/KV STUDIO — REAL ESTATE"
          brandTitle="flagship portals."
        />
      </div>

      {/* =====================================================================
          3. CLEAN COMMISSION CTA — ZERO PARAGRAPHS
          ===================================================================== */}
      <section className="w-full py-20 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 relative overflow-hidden bg-black text-center">
        {/* Signature Architectural Dual Blue Spotlights */}
        <AmbientSpotlights variant="alternate" />

        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/Contact?service=realestate-website"
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
      <nav aria-label="Adjacent Services Navigation" className="w-full py-8 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 bg-black">
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
              prev ? { ...prev, index: (prev.index + 1) % prev.items.length } : null
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
