"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceDetailItem } from "../servicesData";
import { ArrowRightIcon, ArrowLeftIcon } from "@/svgs";
import { Lightbox, LightboxItem } from "../showcase";

interface VrPageProps {
  service: ServiceDetailItem;
  prevService?: ServiceDetailItem;
  nextService?: ServiceDetailItem;
}

const VR_PROJECTS = [
  {
    id: "vr-1",
    title: "APPLE VISION PRO SPATIAL PENTHOUSE WALKTHROUGH",
    category: "SPATIAL COMPUTING",
    url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521315/1_Interactive_LightMix_View01_1.webp",
    type: "image" as const,
    description: "Ultra-high resolution stereoscopic 1:1 scale interior walkthrough tailored for Apple Vision Pro & Meta Quest 3.",
  },
  {
    id: "vr-2",
    title: "360° PANORAMA VIRTUAL TOUR & FLOORPLAN NAVIGATION",
    category: "3DVISTA & PANNELLUM",
    url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521360/2_1.webp",
    type: "image" as const,
    description: "High-definition interactive 360° virtual tour with smart hot spots, radar floor plans, and room-to-room transitions.",
  },
  {
    id: "vr-3",
    title: "UNREAL ENGINE 5.4 6DOF ROOM-SCALE VILLA SUITE",
    category: "UNREAL ENGINE 5.4",
    url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521352/image_14.webp",
    type: "image" as const,
    description: "Real-time photorealistic environment with Lumen dynamic lighting and physical material inspection.",
  },
  {
    id: "vr-4",
    title: "MULTI-USER REMOTE VIP SALES SUITE",
    category: "MULTI-USER WEBXR",
    url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521338/image_10.webp",
    type: "image" as const,
    description: "Synchronized guided presentations enabling international buyers to tour properties together in real-time.",
  },
];

export const VrPage: React.FC<VrPageProps> = ({
  service,
  prevService,
  nextService,
}) => {
  const [lightboxState, setLightboxState] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  const heroImageSrc =
    "https://res.cloudinary.com/hxytmocg/image/upload/v1793521315/1_Interactive_LightMix_View01_1.webp";

  const handleOpenLightbox = (index: number) => {
    setLightboxState({
      items: VR_PROJECTS.map((p) => ({
        id: p.id,
        title: p.title,
        url: p.url,
        type: p.type,
        category: p.category,
        description: p.description,
      })),
      index,
    });
  };

  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-[#00c8ff] selection:text-black">
      {/* =====================================================================
          1. FULL-BLEED IMAGE HERO — CINEMATIC SPATIAL HERO
          ===================================================================== */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden border-b border-white/10">
        {/* Full-bleed background image filling 100% of the Hero viewport */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src={heroImageSrc}
            alt="Virtual Reality & Spatial Walkthroughs"
            className="w-full h-full object-cover scale-102"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black to-transparent" />
        </div>

        {/* Top Discipline Tag */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
            04 / {service.disciplineTag || "DIGITAL EXPERIENCES & 3D SYSTEMS"}
          </span>
          <span className="font-mono text-xs text-white/50 tracking-widest hidden sm:inline-block">
            SPATIAL 1:1 SCALE IMMERSION
          </span>
        </div>

        {/* Hero Title — Pure, Clean, Bold */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-8">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-[#00c8ff] mb-4">
            VIRTUAL REALITY & 360° EXPERIENCES
          </span>
          <h1 className="font-['BlauerNue',sans-serif] text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] font-black uppercase tracking-tight leading-[0.8] text-white select-none drop-shadow-[0_10px_60px_rgba(0,0,0,0.95)]">
            VR
          </h1>
          <p className="mt-8 max-w-2xl font-mono text-xs sm:text-sm uppercase tracking-wider text-white/75 leading-relaxed">
            {service.subtitle}
          </p>
        </div>

        {/* Clean Scroll Indicator */}
        <div className="relative z-10 flex items-center justify-center">
          <a
            href="#vr-exhibition"
            className="font-mono text-xs uppercase tracking-[0.25em] text-white/60 hover:text-[#00c8ff] transition-colors flex items-center gap-2"
          >
            <span>EXPLORE VR SUITE</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* =====================================================================
          2. FEATURED VR & 360 PANORAMA EXHIBITION (3DVISTA & UNREAL ENGINE)
          ===================================================================== */}
      <section id="vr-exhibition" className="w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-20 relative bg-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
                SPATIAL GALLERIES & 360° TOURS
              </span>
              <h2 className="font-['BlauerNue',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                IMMERSIVE VIRTUAL ENVIRONMENTS
              </h2>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/50 max-w-md">
              Engineered with 3DVista, Pannellum WebXR, and Unreal Engine 5.4 for fluid cross-device exploration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {VR_PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => handleOpenLightbox(idx)}
                className="group relative flex flex-col gap-4 cursor-pointer overflow-hidden border border-white/10 hover:border-[#00c8ff]/60 bg-white/2 transition-all duration-500"
              >
                <div className="relative w-full aspect-16/10 overflow-hidden bg-neutral-950">
                  <img
                    src={project.url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 font-mono text-[10px] uppercase tracking-widest text-[#00c8ff]">
                    {project.category}
                  </div>

                  {/* Hover Inspect CTA */}
                  <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3.5 py-1.5 bg-white text-black font-mono text-xs uppercase font-bold tracking-wider">
                    INSPECT PROJECT ↗
                  </div>
                </div>

                <div className="flex flex-col gap-2 p-5 pt-0">
                  <h3 className="font-['BlauerNue',sans-serif] text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#00c8ff] transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-white/60 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. CORE DELIVERABLES & TECHNICAL CAPABILITIES
          ===================================================================== */}
      <section className="w-full py-20 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 bg-neutral-950">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
              DELIVERABLES
            </span>
            <h2 className="font-['BlauerNue',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              WHAT WE DELIVER
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.deliverables?.map((deliv, i) => (
              <div
                key={i}
                className="flex flex-col justify-between p-6 bg-black/60 border border-white/10 hover:border-[#00c8ff]/50 transition-all duration-300 gap-4"
              >
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-xs text-[#00c8ff] font-bold">
                    0{i + 1}
                  </span>
                  <h3 className="font-['BlauerNue',sans-serif] text-base sm:text-lg font-bold uppercase tracking-tight text-white">
                    {deliv.title}
                  </h3>
                  <p className="font-mono text-xs text-white/60 leading-relaxed">
                    {deliv.description}
                  </p>
                </div>
                {deliv.metric && (
                  <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-[#00c8ff] font-bold tracking-wider">
                    {deliv.metric}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. TECHNICAL SPECIFICATIONS & PRODUCTION PROCESS
          ===================================================================== */}
      <section className="w-full py-24 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Specifications */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
                ENGINEERING STANDARDS
              </span>
              <h2 className="font-['BlauerNue',sans-serif] text-3xl font-black uppercase tracking-tight text-white">
                HARDWARE & ENGINE SPECS
              </h2>
            </div>

            <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
              {service.specifications?.map((spec, i) => (
                <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                    {spec.label}
                  </span>
                  <span className="font-mono text-xs uppercase font-bold text-white tracking-wider text-left sm:text-right">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Step Process */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
                EXECUTION PIPELINE
              </span>
              <h2 className="font-['BlauerNue',sans-serif] text-3xl font-black uppercase tracking-tight text-white">
                HOW WE BUILD VR TOURS
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {service.process?.map((step, i) => (
                <div key={i} className="flex gap-4 p-4 border border-white/5 bg-white/2 hover:border-white/20 transition-all">
                  <span className="font-mono text-sm font-black text-[#00c8ff]">
                    {step.number}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-['BlauerNue',sans-serif] text-sm font-bold uppercase tracking-tight text-white">
                      {step.title}
                    </h4>
                    <p className="font-mono text-xs text-white/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. COMMISSION CTA
          ===================================================================== */}
      <section className="w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 relative overflow-hidden bg-neutral-950">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
            COMMISSION VIRTUAL REALITY
          </span>

          <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1] text-white">
            {service.ctaHeading || "STEP INTO THE FUTURE OF SPATIAL IMMERSION"}
          </h2>

          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-white/60 max-w-2xl leading-relaxed">
            {service.ctaSubtext || "Experience your projects in true 1:1 scale virtual reality before breaking ground."}
          </p>

          <Link
            href="/Contact"
            className="mt-6 px-8 sm:px-12 py-4 sm:py-5 bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-black text-sm uppercase tracking-[0.22em] hover:bg-white transition-all shadow-[0_10px_40px_rgba(0,200,255,0.3)] hover:scale-102 active:scale-98"
          >
            COMMISSION VR PROJECT →
          </Link>
        </div>
      </section>

      {/* =====================================================================
          6. SERVICE PAGINATION NAVIGATION (< PREV / NEXT >)
          ===================================================================== */}
      <nav aria-label="Service Pagination" className="w-full border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-2 divide-x divide-white/10">
          {prevService ? (
            <Link
              href={`/services/${prevService.slug}`}
              className="group p-6 sm:p-10 flex flex-col gap-2 hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/50 group-hover:text-[#00c8ff]">
                <ArrowLeftIcon className="w-3.5 h-3.5 stroke-current" />
                <span>PREVIOUS DISCIPLINE</span>
              </div>
              <span className="font-['BlauerNue',sans-serif] text-lg sm:text-2xl font-black uppercase tracking-tight text-white group-hover:translate-x-1 transition-transform">
                {prevService.title}
              </span>
            </Link>
          ) : <div />}

          {nextService ? (
            <Link
              href={`/services/${nextService.slug}`}
              className="group p-6 sm:p-10 flex flex-col items-end gap-2 hover:bg-white/5 transition-all text-right"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/50 group-hover:text-[#00c8ff]">
                <span>NEXT DISCIPLINE</span>
                <ArrowRightIcon className="w-3.5 h-3.5 stroke-current" />
              </div>
              <span className="font-['BlauerNue',sans-serif] text-lg sm:text-2xl font-black uppercase tracking-tight text-white group-hover:-translate-x-1 transition-transform">
                {nextService.title}
              </span>
            </Link>
          ) : <div />}
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
                    index: (prev.index - 1 + prev.items.length) % prev.items.length,
                  }
                : null
            )
          }
        />
      )}
    </div>
  );
};

