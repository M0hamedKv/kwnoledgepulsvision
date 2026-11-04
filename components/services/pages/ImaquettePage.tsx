"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceDetailItem } from "../servicesData";
import { ArrowRightIcon, ArrowDownIcon, ArrowLeftIcon } from "@/svgs";
import { ImaquetteShowcase, Lightbox, LightboxItem } from "../showcase";

interface ImaquettePageProps {
  service: ServiceDetailItem;
  prevService?: ServiceDetailItem;
  nextService?: ServiceDetailItem;
}

export const ImaquettePage: React.FC<ImaquettePageProps> = ({
  service,
  prevService,
  nextService,
}) => {
  const serviceVideos = service.gallery.filter((m) => m.type === "video");
  const [lightboxState, setLightboxState] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  const handleOpenLightbox = (index: number = 0) => {
    setLightboxState({
      items: serviceVideos.map((v) => ({
        id: v.id,
        title: v.title,
        url: v.url,
        type: "video",
        badge: v.badge,
        category: v.category,
        description: v.description,
      })),
      index,
    });
  };

  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-[#00c8ff] selection:text-black">
      {/* =====================================================================
          1. IMAQUETTE INTERACTIVE 3D HERO
          ===================================================================== */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-between pt-32 sm:pt-36 pb-12 sm:pb-16 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden border-b border-white/10">
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row lg:items-center justify-between gap-12 my-auto">
          {/* Left Column: Typography & Story */}
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00c8ff] animate-pulse" />
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#00c8ff]">
                /01 // DIGITAL EXPERIENCES & 3D SYSTEMS
              </span>
            </div>

            <h1 className="font-['BlauerNue',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.9] text-white">
              IMAQUETTE
            </h1>

            <p className="font-['BlauerNue',sans-serif] text-xl sm:text-2xl font-bold uppercase tracking-wide text-white/95">
              INTERACTIVE ARCHITECTURAL SCALE MODELS & SMART SALES GALLERIES
            </p>

            <p className="font-['Rubik',sans-serif] text-white/80 text-sm sm:text-base leading-relaxed">
              We engineer physical-to-digital architectural maquettes combining Unreal Engine 5.4, real-time touchscreen tables, projection mapping, and synchronized LED hardware for world-class real estate sales centers.
            </p>

            {/* Spec Badges */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase pt-2">
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white">
                UNREAL ENGINE 5.4
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white">
                TOUCH TABLE 4K / 8K
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white">
                CRM INTEGRATION
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/Contact?service=imaquette"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-white transition-all shadow-2xl"
              >
                <span>COMMISSION IMAQUETTE</span>
                <ArrowRightIcon className="w-4 h-4 stroke-current" />
              </Link>

              <a
                href="#interactive-demo"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/90 hover:text-white px-6 py-4 rounded-xl bg-white/5 border border-white/20 hover:border-white/40 transition-colors"
              >
                <span>EXPLORE 10 MODULES</span>
                <ArrowDownIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Featured Video Showcase Tablet */}
          <div className="w-full lg:max-w-lg aspect-16/10 rounded-3xl overflow-hidden border border-white/20 bg-black/80 shadow-[0_30px_90px_rgba(0,0,0,0.9)] relative group">
            <video
              src="https://res.cloudinary.com/hxytmocg/video/upload/v1793558191/MVI_8622.mov"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-white/80">
              <span className="text-[#00c8ff] font-bold">TOUCHSCREEN SCALE PREVIEW</span>
              <span>4K INTERACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. 10-CHAPTER DEEP DIVE INTO IMAQUETTE FEATURES
          ===================================================================== */}
      <section id="interactive-demo" className="w-full py-20 px-6 sm:px-12 md:px-16 lg:px-20 relative bg-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <ImaquetteShowcase
            service={service}
            serviceVideos={serviceVideos}
            onOpenTheater={handleOpenLightbox}
          />
        </div>
      </section>

      {/* =====================================================================
          3. COMMISSION CTA
          ===================================================================== */}
      <section className="w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 relative overflow-hidden bg-black">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
            COMMISSION IMAQUETTE
          </span>

          <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            COMMISSION AN IMAQUETTE FOR YOUR NEXT DEVELOPMENT
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link
              href="/Contact?service=imaquette"
              className="px-8 py-4 bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-black text-sm uppercase tracking-widest hover:bg-white transition-colors"
            >
              REQUEST A CUSTOM PROPOSAL
            </Link>

            <Link
              href="/services"
              className="px-8 py-4 border border-white/15 text-white font-mono text-xs uppercase tracking-widest hover:border-white/40 transition-colors"
            >
              BROWSE ALL SERVICES
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. NAVIGATION
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
                <span className="block text-white/30 text-[10px]">PREVIOUS SERVICE</span>
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
            ALL SERVICES CATALOG [06]
          </Link>

          {nextService ? (
            <Link
              href={`/services/${nextService.slug}`}
              className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
            >
              <div className="text-right font-mono text-xs">
                <span className="block text-white/30 text-[10px]">NEXT SERVICE</span>
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

