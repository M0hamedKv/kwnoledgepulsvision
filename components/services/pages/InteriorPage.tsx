"use client";

import React from "react";
import Link from "next/link";
import { ServiceDetailItem } from "../servicesData";
import { INTERIOR_PROJECTS } from "../interiorData";
import { ArrowRightIcon, ArrowLeftIcon } from "@/svgs";
import { AmbientSpotlights } from "@/components/ui";

interface InteriorPageProps {
  service?: ServiceDetailItem;
  prevService?: ServiceDetailItem;
  nextService?: ServiceDetailItem;
}

// Asymmetric row pairings: each row has 2 cards of equal vertical height filling 100%
const PROJECT_PAIRS = [
  { firstWidth: "w-full md:w-[42%]", secondWidth: "w-full md:w-[58%]" },
  { firstWidth: "w-full md:w-[60%]", secondWidth: "w-full md:w-[40%]" },
  { firstWidth: "w-full md:w-[38%]", secondWidth: "w-full md:w-[62%]" },
  { firstWidth: "w-full md:w-[46%]", secondWidth: "w-full md:w-[54%]" },
];

export const InteriorPage: React.FC<InteriorPageProps> = ({
  service,
  prevService,
  nextService,
}) => {
  const heroImageSrc =
    service?.coverImage ||
    "/design/interior/villa ksa/11_1.webp";

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
            alt="Interior Architecture & Design"
            className="w-full h-full object-cover scale-102"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10" />

        {/* Hero Title — Pure, Clean, Bold, Exactly in Center */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
          <h1 className="font-['BlauerNue',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.85] text-white select-none drop-shadow-[0_10px_60px_rgba(0,0,0,0.95)]">
            INTERIOR
          </h1>
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
          2. ASYMMETRIC EDITORIAL GRID (EQUAL VERTICAL HEIGHTS, SHARP EDGES)
             - ZERO text on images by default
             - ZERO rounded corners (rounded-none)
             - Only on hover: smooth color transition + Project Name ONLY
             - Matching vertical height in each row, 100% full coverage
          ===================================================================== */}
      <section id="projects-grid" className="w-full py-10 sm:py-16 px-4 sm:px-8 md:px-12 lg:px-16 bg-black relative overflow-hidden">
        {/* Signature Architectural Dual Blue Spotlights */}
        <AmbientSpotlights />

        <div className="max-w-[1700px] mx-auto flex flex-col gap-4 sm:gap-5 md:gap-6 relative z-10">
          {PROJECT_PAIRS.map((pair, rowIndex) => {
            const firstProject = INTERIOR_PROJECTS[rowIndex * 2];
            const secondProject = INTERIOR_PROJECTS[rowIndex * 2 + 1];

            return (
              <div
                key={rowIndex}
                className="w-full flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6 items-stretch"
              >
                {/* First Project in Row */}
                {firstProject && (
                  <div
                    className={`${pair.firstWidth} h-85 sm:h-110 lg:h-135 rounded-none overflow-hidden relative group border border-white/10 hover:border-white/35 transition-colors bg-black`}
                  >
                    <Link
                      href={`/services/interior/${firstProject.id}`}
                      className="block w-full h-full relative cursor-pointer"
                    >
                      {/* Image fills 100% vertically and horizontally */}
                      <img
                        src={firstProject.coverImage}
                        alt={firstProject.title}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-none transition-all duration-700 ease-out grayscale contrast-[1.05] brightness-[0.88] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-104 pointer-events-none"
                      />

                      {/* Minimal Hover Overlay — ONLY Project Name Appears */}
                      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center p-6 text-center pointer-events-none z-10">
                        <span className="font-['BlauerNue',sans-serif] text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                          {firstProject.title}
                        </span>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Second Project in Row — EXACT matching vertical height */}
                {secondProject && (
                  <div
                    className={`${pair.secondWidth} h-85 sm:h-110 lg:h-135 rounded-none overflow-hidden relative group border border-white/10 hover:border-white/35 transition-colors bg-black`}
                  >
                    <Link
                      href={`/services/interior/${secondProject.id}`}
                      className="block w-full h-full relative cursor-pointer"
                    >
                      {/* Image fills 100% vertically and horizontally */}
                      <img
                        src={secondProject.coverImage}
                        alt={secondProject.title}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-none transition-all duration-700 ease-out grayscale contrast-[1.05] brightness-[0.88] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-104 pointer-events-none"
                      />

                      {/* Minimal Hover Overlay — ONLY Project Name Appears */}
                      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center p-6 text-center pointer-events-none z-10">
                        <span className="font-['BlauerNue',sans-serif] text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                          {secondProject.title}
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          3. CLEAN COMMISSION CTA — ZERO ROUNDED CORNERS
          ===================================================================== */}
      <section className="w-full py-20 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 relative overflow-hidden bg-black text-center">
        {/* Signature Architectural Dual Blue Spotlights */}
        <AmbientSpotlights variant="alternate" />

        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/Contact?service=interior"
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
          4. ADJACENT NAVIGATION
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
    </div>
  );
};
