"use client";

import React from "react";
import Link from "next/link";
import { ServiceDetailItem } from "../servicesData";
import {
  ARCHITECTURE_DESIGN_PROJECTS,
  BIM_PROJECTS_DATA,
} from "../architectureData";
import { ArrowRightIcon, ArrowLeftIcon } from "@/svgs";
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
  // Primary cover image is ORIN SHOPPING MALL
  const heroImageSrc = "/design/architecture/ORIN/3.webp";

  const orinProject = ARCHITECTURE_DESIGN_PROJECTS.find((p) => p.id === "orin");
  const homexProject = ARCHITECTURE_DESIGN_PROJECTS.find((p) => p.id === "homex");
  const competitionsProject = ARCHITECTURE_DESIGN_PROJECTS.find((p) => p.id === "competitions");

  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-[#00c8ff] selection:text-black">
      {/* =====================================================================
          1. FULL-BLEED IMAGE HERO — PURE IMAGE, CENTERED TITLE ONLY
             Featured Facade: ORIN SHOPPING MALL
          ===================================================================== */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden border-b border-white/10">
        {/* Full-bleed background image filling 100% of the Hero viewport */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src={heroImageSrc}
            alt="ORIN Shopping Mall — Architecture Atelier & Design"
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
            ORIN SHOPPING MALL • ARCHITECTURE DESIGN • BIM
          </p>
        </div>

        {/* Clean Scroll Indicator */}
        <div className="relative z-10 flex items-center justify-center">
          <a
            href="#projects-grid"
            className="text-xs uppercase tracking-[0.25em] font-bold text-white/60 hover:text-[#00c8ff] transition-colors flex items-center gap-2"
          >
            <span>EXPLORE EXHIBITION</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* =====================================================================
          2. ASYMMETRIC EDITORIAL GRID (EXACT INTERIOR STYLE)
             - Only Architecture Design projects: ORIN (The Mall - Focus), HOMEX, COMPETITIONS
             - ZERO rounded corners (rounded-none)
             - Grayscale by default, smooth hover color transition + zoom
             - Minimal hover overlay with Project Name in BlauerNue
             - Matching vertical height in each row
          ===================================================================== */}
      <section id="projects-grid" className="w-full py-10 sm:py-16 px-4 sm:px-8 md:px-12 lg:px-16 bg-black relative overflow-hidden border-b border-white/10">
        {/* Signature Architectural Dual Blue Spotlights */}
        <AmbientSpotlights />

        <div className="max-w-[1700px] mx-auto flex flex-col gap-4 sm:gap-5 md:gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
                01 // SUB-DISCIPLINE
              </span>
              <h2 className="font-['BlauerNue',sans-serif] text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                FEATURED ARCHITECTURAL COMMISSIONS
              </h2>
            </div>
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
              SELECT A COMMISSION TO EXPLORE PRODUCTION RENDERS
            </span>
          </div>

          {/* Row 1: Asymmetric Pair — ORIN SHOPPING MALL (62% Primary Focus) & HOMEX ATELIER (38%) */}
          <div className="w-full flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6 items-stretch">
            {/* 1. ORIN SHOPPING MALL (The Primary Focus) */}
            {orinProject && (
              <div className="w-full md:w-[62%] h-85 sm:h-110 lg:h-135 rounded-none overflow-hidden relative group border border-white/10 hover:border-white/35 transition-colors bg-black">
                <Link
                  href={`/services/architecture/${orinProject.id}`}
                  className="block w-full h-full relative cursor-pointer"
                >
                  <img
                    src={orinProject.coverImage}
                    alt={orinProject.title}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-none transition-all duration-700 ease-out grayscale contrast-[1.05] brightness-[0.88] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-104 pointer-events-none"
                  />

                  {/* Minimal Hover Overlay — Matching Interior */}
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-center p-6 text-center pointer-events-none z-10">
                    <span className="font-['BlauerNue',sans-serif] text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                      {orinProject.title}
                    </span>
                    <span className="mt-2 font-mono text-xs text-[#00c8ff] uppercase tracking-widest font-bold">
                      {orinProject.badge} • EXPLORE PROJECT →
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* 2. HOMEX ATELIER */}
            {homexProject && (
              <div className="w-full md:w-[38%] h-85 sm:h-110 lg:h-135 rounded-none overflow-hidden relative group border border-white/10 hover:border-white/35 transition-colors bg-black">
                <Link
                  href={`/services/architecture/${homexProject.id}`}
                  className="block w-full h-full relative cursor-pointer"
                >
                  <img
                    src={homexProject.coverImage}
                    alt={homexProject.title}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-none transition-all duration-700 ease-out grayscale contrast-[1.05] brightness-[0.88] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-104 pointer-events-none"
                  />

                  {/* Minimal Hover Overlay — Matching Interior */}
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-center p-6 text-center pointer-events-none z-10">
                    <span className="font-['BlauerNue',sans-serif] text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                      {homexProject.title}
                    </span>
                    <span className="mt-2 font-mono text-xs text-[#00c8ff] uppercase tracking-widest font-bold">
                      {homexProject.badge} • EXPLORE PROJECT →
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Row 2: INTERNATIONAL COMPETITIONS (Panoramic Full-Width Card) */}
          {competitionsProject && (
            <div className="w-full h-72 sm:h-96 lg:h-110 rounded-none overflow-hidden relative group border border-white/10 hover:border-white/35 transition-colors bg-black">
              <Link
                href={`/services/architecture/${competitionsProject.id}`}
                className="block w-full h-full relative cursor-pointer"
              >
                <img
                  src={competitionsProject.coverImage}
                  alt={competitionsProject.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-none transition-all duration-700 ease-out grayscale contrast-[1.05] brightness-[0.88] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-104 pointer-events-none"
                />

                {/* Minimal Hover Overlay — Matching Interior */}
                <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-center p-6 text-center pointer-events-none z-10">
                  <span className="font-['BlauerNue',sans-serif] text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                    {competitionsProject.title}
                  </span>
                  <span className="mt-2 font-mono text-xs text-[#00c8ff] uppercase tracking-widest font-bold">
                    {competitionsProject.badge} • EXPLORE PROJECT →
                  </span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          3. SUB-DISCIPLINE 2: BIM (AMAZON WAREHOUSE)
             Preserved strictly in its own dedicated BIM section
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
                  className="lg:col-span-8 group relative rounded-none overflow-hidden border border-white/10 hover:border-white/40 bg-black transition-all duration-500 aspect-16/10"
                >
                  <Link href="/services/bim" className="block w-full h-full relative cursor-pointer">
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
                  </Link>
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
                    <Link
                      href="/services/bim"
                      className="px-6 py-3 bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
                    >
                      EXPLORE BIM MODELS ({project.images.length})
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
    </div>
  );
};

export default ArchitecturePage;
