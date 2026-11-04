"use client";

import React from "react";
import Link from "next/link";
import { ServiceDetailItem } from "../servicesData";
import { INTERIOR_PROJECTS } from "../interiorData";
import { ArrowRightIcon, ArrowLeftIcon } from "@/svgs";

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
  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-[#00c8ff] selection:text-black">
      {/* =====================================================================
          1. CLEAN EDITORIAL HERO — ZERO ROUNDED CORNERS, ZERO CLUTTER
          ===================================================================== */}
      <section className="relative w-full pt-36 sm:pt-44 pb-12 sm:pb-16 px-6 sm:px-12 md:px-16 lg:px-20 border-b border-white/10 overflow-hidden bg-black">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
              06 // ARCHITECTURAL ATELIER
            </span>
            <h1 className="font-['BlauerNue',sans-serif] text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black uppercase tracking-tight leading-[0.85] text-white mt-3 select-none drop-shadow-[0_8px_40px_rgba(0,0,0,0.95)]">
              INTERIOR
            </h1>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
              [ 08 CURATED PROJECTS // 143 RENDERS ]
            </span>
            <a
              href="#projects-grid"
              className="font-mono text-xs text-[#00c8ff] uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>EXPLORE EXHIBITION</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. ASYMMETRIC EDITORIAL GRID (EQUAL VERTICAL HEIGHTS, SHARP EDGES)
             - ZERO text on images by default
             - ZERO rounded corners (rounded-none)
             - Only on hover: smooth color transition + Project Name ONLY
             - Matching vertical height in each row, 100% full coverage
          ===================================================================== */}
      <section id="projects-grid" className="w-full py-10 sm:py-16 px-4 sm:px-8 md:px-12 lg:px-16 bg-black">
        <div className="max-w-[1700px] mx-auto flex flex-col gap-4 sm:gap-5 md:gap-6">
          {PROJECT_PAIRS.map((pair, rowIndex) => {
            const firstProject = INTERIOR_PROJECTS[rowIndex * 2];
            const secondProject = INTERIOR_PROJECTS[rowIndex * 2 + 1];

            return (
              <div
                key={rowIndex}
                className="w-full flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6"
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
      <section className="w-full py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 relative overflow-hidden bg-black text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
            INTERIOR COMMISSIONS
          </span>

          <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            COMMISSION AN INTERIOR ATELIER PROJECT
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/Contact?service=interior"
              className="px-10 py-5 bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-black text-sm uppercase tracking-widest hover:bg-white transition-colors rounded-none shadow-2xl"
            >
              REQUEST INTERIOR PROPOSAL
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
            SERVICES CATALOG [06]
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
    </div>
  );
};
