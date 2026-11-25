"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceDetailItem } from "../servicesData";
import { ArrowRightIcon, ArrowLeftIcon } from "@/svgs";
import { Lightbox, LightboxItem, EditorialWebSlider, EditorialWebItem } from "../showcase";
import { AmbientSpotlights } from "@/components/ui";

interface WebdevelopmentPageProps {
  service: ServiceDetailItem;
  prevService?: ServiceDetailItem;
  nextService?: ServiceDetailItem;
}

const ALL_WEB_PROJECTS: EditorialWebItem[] = [
  {
    id: "web-seen",
    title: "Seen — Architecture Academy & Student Workshops",
    subtitle: "An interactive educational web platform enabling architecture and engineering students to attend live courses, workshops, and events.",
    category: "ACADEMY HUB",
    url: "/interactive/webdevelopment/seenintro.mp4",
    type: "video",
  },
  {
    id: "web-diva-intro",
    title: "Diva Residence — Bespoke Flagship Web Platform",
    subtitle: "A bespoke digital flagship designed with architectural precision, fluid typography, and luxury property storytelling.",
    category: "DIGITAL FLAGSHIP",
    url: "/interactive/webdevelopment/divaintro.mp4",
    type: "video",
  },
  {
    id: "web-3",
    title: "Luxury Flagship Platform & Interactive Portal",
    subtitle: "Full-scale custom real-time architectural web application with 3D unit filtering.",
    category: "FLAGSHIP WEB",
    url: "https://res.cloudinary.com/hxytmocg/video/upload/v1794132541/66666.mp4",
    type: "video",
  },
  {
    id: "web-4",
    title: "Architectural Digital Showcase & Cinema Narrative",
    subtitle: "Bespoke editorial transitions, WebGL micro-interactions, and immersive storytelling.",
    category: "EDITORIAL WEB",
    url: "https://res.cloudinary.com/hxytmocg/video/upload/v1794140108/11111.mp4",
    type: "video",
  },
  {
    id: "web-5",
    title: "Immersive Property Portfolio & Compound Explorer",
    subtitle: "Ultra-fast Next.js architecture, interactive amenity map, and fluid smooth-scroll navigation.",
    category: "PORTFOLIO",
    url: "https://res.cloudinary.com/hxytmocg/video/upload/v1794137198/2222222.mp4",
    type: "video",
  },
];

export const WebdevelopmentPage: React.FC<WebdevelopmentPageProps> = ({
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
      items: ALL_WEB_PROJECTS.map((p) => ({
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
            alt="Web Development & Digital Architecture"
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
            WEB DEV
          </h1>
        </div>

        {/* Clean Scroll Indicator */}
        <div className="relative z-10 flex items-center justify-center">
          <a
            href="#editorial-web-showcase"
            className="text-xs uppercase tracking-[0.25em] font-bold text-white/60 hover:text-[#00c8ff] transition-colors flex items-center gap-2"
          >
            <span>EXPLORE EXHIBITION</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* =====================================================================
          2. ASYMMETRIC EDITORIAL SLIDER (EXACT REPLICA OF THE SCREENSHOTS)
          ===================================================================== */}
      <div id="editorial-web-showcase" className="w-full">
        <EditorialWebSlider
          items={ALL_WEB_PROJECTS}
          onOpenLightbox={handleOpenLightbox}
          brandTag="/KV STUDIO — WEB SERVICES"
          brandTitle="web atelier."
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
              href="/Contact?service=webdevelopment"
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
