"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceDetailItem } from "../servicesData";
import {
  ARCHITECTURE_DESIGN_PROJECTS,
  BIM_PROJECTS_DATA,
  ArchitectureProject,
} from "../architectureData";
import { ArrowRightIcon, ArrowLeftIcon } from "@/svgs";
import { Lightbox, LightboxItem } from "../showcase";
import { AmbientSpotlights } from "@/components/ui";

interface ArchitecturePageProps {
  service?: ServiceDetailItem;
  prevService?: ServiceDetailItem;
  nextService?: ServiceDetailItem;
}

export const ArchitecturePage: React.FC<ArchitecturePageProps> = ({
  service,
  prevService,
  nextService,
}) => {
  const [lightboxState, setLightboxState] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  const heroImageSrc = "/HOMEX/01.webp";

  const handleOpenProjectGallery = (project: ArchitectureProject, startIndex: number = 0) => {
    setLightboxState({
      items: project.images.map((img, i) => ({
        id: `${project.id}-${i}`,
        title: img.caption || project.title,
        url: img.url,
        type: "image",
      })),
      index: startIndex,
    });
  };

  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-[#00c8ff] selection:text-black">
      {/* =====================================================================
          1. FULL-BLEED IMAGE HERO — PURE IMAGE, CENTERED TITLE ONLY
          ===================================================================== */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden border-b border-white/10">
        {/* Full-bleed background image filling 100% of the Hero viewport */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src={heroImageSrc}
            alt="Architecture Atelier & Design"
            className="w-full h-full object-cover scale-102"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10" />

        {/* Hero Title — Pure, Clean, Bold, Exactly in Center */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#00c8ff] font-bold mb-3">
            01 // DESIGN DISCIPLINE
          </span>
          <h1 className="font-['BlauerNue',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.85] text-white select-none drop-shadow-[0_10px_60px_rgba(0,0,0,0.95)]">
            ARCHITECTURE
          </h1>
          <p className="mt-4 text-xs sm:text-sm font-semibold uppercase tracking-widest text-white/60">
            ARCHITECTURE DESIGN • BIM
          </p>
        </div>

        {/* Clean Scroll Indicator */}
        <div className="relative z-10 flex items-center justify-center">
          <a
            href="#architecture-design-section"
            className="text-xs uppercase tracking-[0.25em] font-bold text-white/60 hover:text-[#00c8ff] transition-colors flex items-center gap-2"
          >
            <span>EXPLORE PROJECTS</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* =====================================================================
          2. SUB-DISCIPLINE 1: ARCHITECTURE DESIGN (HOMEX, ORIN, COMPETITIONS)
          ===================================================================== */}
      <section
        id="architecture-design-section"
        className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-black relative overflow-hidden border-b border-white/10 scroll-mt-28"
      >
        {/* Signature Architectural Dual Blue Spotlights */}
        <AmbientSpotlights />

        <div className="max-w-[1700px] mx-auto flex flex-col gap-10 sm:gap-14 relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
                01 // SUB-DISCIPLINE
              </span>
              <h2 className="font-['BlauerNue',sans-serif] text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
                ARCHITECTURE DESIGN
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest">
              <span>HOMEX • ORIN • COMPETITIONS</span>
            </div>
          </div>

          {/* 3 Featured Projects: HOMEX, ORIN, COMPETITIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {ARCHITECTURE_DESIGN_PROJECTS.map((project) => (
              <div
                key={project.id}
                onClick={() => handleOpenProjectGallery(project, 0)}
                className="group relative rounded-none overflow-hidden border border-white/10 hover:border-white/40 bg-black transition-all duration-500 cursor-pointer flex flex-col aspect-4/5"
              >
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-none grayscale contrast-[1.05] brightness-[0.9] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-104 transition-all duration-700 ease-out pointer-events-none"
                />

                {/* Ambient Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                {/* HUD Top Tag */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono z-10 pointer-events-none">
                  <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md border border-white/20 text-white/80 uppercase tracking-wider">
                    {project.subdisciplineLabel}
                  </span>
                  <span className="px-2 py-0.5 bg-black/75 backdrop-blur-md border border-[#00c8ff]/40 text-[#00c8ff] font-bold text-[10px]">
                    {project.images.length} RENDERS
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 z-10 pointer-events-none">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#00c8ff] font-bold">
                    {project.category}
                  </span>
                  <h3 className="font-['BlauerNue',sans-serif] text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-[#00c8ff] transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00c8ff]">
                    <span>VIEW GALLERY</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SUB-DISCIPLINE 2: BIM (AMAZON WAREHOUSE)
          ===================================================================== */}
      <section
        id="bim-section"
        className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-black relative overflow-hidden border-b border-white/10 scroll-mt-28"
      >
        {/* Signature Architectural Dual Blue Spotlights (Alternate Corners) */}
        <AmbientSpotlights variant="alternate" />

        <div className="max-w-[1700px] mx-auto flex flex-col gap-10 sm:gap-14 relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
                02 // SUB-DISCIPLINE
              </span>
              <h2 className="font-['BlauerNue',sans-serif] text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
                BIM
              </h2>
            </div>
            <Link
              href="/services/bim"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-[#00c8ff] transition-colors"
            >
              <span>EXPLORE FULL BIM SPECIFICATION</span>
              <ArrowRightIcon className="w-4 h-4 stroke-current" />
            </Link>
          </div>

          {/* Featured Project: AMAZON WAREHOUSE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {BIM_PROJECTS_DATA.map((project) => (
              <React.Fragment key={project.id}>
                {/* Visual Showcase Card */}
                <div
                  onClick={() => handleOpenProjectGallery(project, 0)}
                  className="lg:col-span-8 group relative rounded-none overflow-hidden border border-white/10 hover:border-white/40 bg-black transition-all duration-500 cursor-pointer aspect-16/10"
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-none grayscale contrast-[1.05] brightness-[0.9] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-104 transition-all duration-700 ease-out pointer-events-none"
                  />

                  {/* Minimal Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center pointer-events-none z-10">
                    <span className="font-['BlauerNue',sans-serif] text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {project.title}
                    </span>
                  </div>
                </div>

                {/* Details Narrative Column */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
                    FEATURED PROJECT // {project.subdisciplineLabel}
                  </span>
                  <h3 className="font-['BlauerNue',sans-serif] text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                    {project.title}
                  </h3>
                  <p className="font-['Rubik',sans-serif] text-sm sm:text-base text-white/70 leading-relaxed font-normal">
                    {project.description}
                  </p>
                  <div className="pt-2 flex items-center gap-4">
                    <button
                      onClick={() => handleOpenProjectGallery(project, 0)}
                      className="px-6 py-3 bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] text-xs font-black uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                    >
                      VIEW BIM MODELS ({project.images.length})
                    </button>
                    <Link
                      href="/services/bim"
                      className="px-6 py-3 border border-white/20 text-white font-['BlauerNue',sans-serif] text-xs font-black uppercase tracking-widest hover:border-white/40 hover:text-white transition-colors"
                    >
                      BIM PAGE →
                    </Link>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. ADJACENT SERVICES NAVIGATION
          ===================================================================== */}
      <nav aria-label="Adjacent Services Navigation" className="w-full py-8 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10">
        <div className="max-w-[1700px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/services/interactive-solution"
            className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 stroke-current text-[#00c8ff]" />
            <div className="text-left text-xs uppercase tracking-wider">
              <span className="block text-white/40 text-xs font-semibold">DISCIPLINE</span>
              <span className="font-bold uppercase tracking-wider text-white text-xs sm:text-sm">INTERACTIVE SOLUTION</span>
            </div>
          </Link>

          <Link
            href="/services/design"
            className="text-xs sm:text-sm font-bold text-white/60 hover:text-[#00c8ff] uppercase tracking-widest transition-colors"
          >
            DESIGN OVERVIEW
          </Link>

          <Link
            href="/services/interior"
            className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
          >
            <div className="text-right text-xs uppercase tracking-wider">
              <span className="block text-white/40 text-xs font-semibold">NEXT DESIGN SERVICE</span>
              <span className="font-bold uppercase tracking-wider text-white text-xs sm:text-sm">INTERIOR ATELIER</span>
            </div>
            <ArrowRightIcon className="w-4 h-4 stroke-current text-[#00c8ff]" />
          </Link>
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

export default ArchitecturePage;
