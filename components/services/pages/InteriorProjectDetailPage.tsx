"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { InteriorProject } from "../interiorData";
import { ArrowLeftIcon, ArrowRightIcon } from "@/svgs";

interface InteriorProjectDetailPageProps {
  project: InteriorProject;
  prevProject?: InteriorProject;
  nextProject?: InteriorProject;
}

export const InteriorProjectDetailPage: React.FC<InteriorProjectDetailPageProps> = ({
  project,
  prevProject,
  nextProject,
}) => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "Escape") setActiveLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % project.images.length : null
        );
      }
      if (e.key === "ArrowLeft") {
        setActiveLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + project.images.length) % project.images.length
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, project.images.length]);

  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-[#00c8ff] selection:text-black">
      {/* =====================================================================
          1. PROJECT CINEMATIC HERO (With In-Flow Breadcrumb, No Fixed Nav Conflict)
          ===================================================================== */}
      <section className="relative w-full min-h-[75vh] sm:min-h-[85vh] flex flex-col justify-end pt-36 pb-12 sm:pb-16 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden border-b border-white/10">
        {/* Full-bleed cover background */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover scale-102"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/30" />
        </div>

        {/* Hero Title and Info */}
        <div className="relative z-10 max-w-5xl flex flex-col gap-4">
          {/* In-flow back link */}
          <div>
            <Link
              href="/services/interior"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/70 hover:text-[#00c8ff] transition-colors"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5 stroke-current transform transition-transform group-hover:-translate-x-1 text-[#00c8ff]" />
              <span>ALL INTERIOR PROJECTS</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-none bg-black/60 backdrop-blur-md border border-[#00c8ff]/40 font-mono text-xs text-[#00c8ff] font-bold uppercase tracking-wider">
              {project.typology}
            </span>
            <span className="font-mono text-xs text-white/60 uppercase tracking-widest">
              {project.badge}
            </span>
          </div>

          <h1 className="font-['BlauerNue',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.88] text-white select-none drop-shadow-[0_6px_30px_rgba(0,0,0,0.95)]">
            {project.title}
          </h1>

          <div className="pt-2 flex items-center gap-4">
            <a
              href="#project-gallery"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00c8ff] hover:text-white transition-colors"
            >
              <span>VIEW FULL GALLERY ({project.images.length} RENDERS)</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FULL ARCHITECTURAL RENDERS GALLERY (Rhythmic Editorial Masonry)
          ===================================================================== */}
      <section id="project-gallery" className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-black">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-10">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
              CURATED PRODUCTION RENDERS // 8K ARCHITECTURAL GALLERY
            </span>
            <span className="font-mono text-xs text-white/50 uppercase">
              CLICK ANY IMAGE TO EXPAND
            </span>
          </div>

          {/* Rhythmic Grid displaying ALL images */}
          <div className="grid grid-cols-12 gap-4 sm:gap-6">
            {project.images.map((imgUrl, index) => {
              // Rhythmic pattern:
              // Index 0: 12 cols (master wide view)
              // Index 1, 2: 6 cols each (duo perspective)
              // Index 3, 4, 5: 4 cols each (trio material detail)
              // Index 6: 12 cols (panoramic)
              // Repeating rhythm
              const patternIndex = index % 7;
              let colSpan = "col-span-12 md:col-span-6";
              let aspect = "aspect-16/10";

              if (patternIndex === 0) {
                colSpan = "col-span-12";
                aspect = "aspect-16/9 sm:aspect-21/10";
              } else if (patternIndex === 1 || patternIndex === 2) {
                colSpan = "col-span-12 md:col-span-6";
                aspect = "aspect-4/3 sm:aspect-16/11";
              } else if (patternIndex === 3 || patternIndex === 4 || patternIndex === 5) {
                colSpan = "col-span-12 sm:col-span-6 md:col-span-4";
                aspect = "aspect-4/3";
              } else if (patternIndex === 6) {
                colSpan = "col-span-12";
                aspect = "aspect-16/9 sm:aspect-21/10";
              }

              return (
                <div
                  key={index}
                  onClick={() => setActiveLightboxIndex(index)}
                  className={`${colSpan} group relative rounded-none overflow-hidden bg-zinc-950 border border-white/10 hover:border-[#00c8ff] transition-all duration-500 cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.7)]`}
                >
                  <div className={`relative w-full ${aspect} overflow-hidden bg-zinc-950`}>
                    <img
                      src={imgUrl}
                      alt={`${project.title} - Render ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-104 pointer-events-none"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Top Index Badge */}
                    <div className="absolute top-3 left-3 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/15 font-mono text-[10px] text-white/90 uppercase font-bold">
                        {String(index + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Center Expand Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-black/70 border border-white/30 backdrop-blur-md flex items-center justify-center text-[#00c8ff] transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                        <span className="font-mono text-sm font-bold">↗</span>
                      </div>
                    </div>

                    {/* Bottom Label on Hover */}
                    <div className="absolute bottom-3 left-4 right-4 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-wider text-white font-bold drop-shadow-md">
                        {project.title}
                      </span>
                      <span className="font-mono text-[11px] text-[#00c8ff] uppercase tracking-widest font-bold">
                        8K LIGHTBOX
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. ADJACENT PROJECT NAVIGATION
          ===================================================================== */}
      <section className="w-full py-16 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 bg-black">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          {prevProject ? (
            <Link
              href={`/services/interior/${prevProject.id}`}
              className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors"
            >
              <div className="w-12 h-12 rounded-none border border-white/15 bg-white/5 flex items-center justify-center text-[#00c8ff] group-hover:border-[#00c8ff] transition-colors">
                <ArrowLeftIcon className="w-4 h-4 stroke-current transform transition-transform group-hover:-translate-x-1" />
              </div>
              <div className="text-left font-mono">
                <span className="block text-white/40 text-[10px] uppercase tracking-wider">PREVIOUS PROJECT</span>
                <span className="font-['BlauerNue',sans-serif] text-base font-bold uppercase text-white group-hover:text-[#00c8ff] transition-colors">
                  {prevProject.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/services/interior"
            className="px-6 py-3 rounded-none border border-white/15 text-white font-mono text-xs uppercase tracking-widest hover:border-[#00c8ff] hover:text-[#00c8ff] transition-colors"
          >
            VIEW ALL 8 PROJECTS
          </Link>

          {nextProject ? (
            <Link
              href={`/services/interior/${nextProject.id}`}
              className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors text-right"
            >
              <div className="text-right font-mono">
                <span className="block text-white/40 text-[10px] uppercase tracking-wider">NEXT PROJECT</span>
                <span className="font-['BlauerNue',sans-serif] text-base font-bold uppercase text-white group-hover:text-[#00c8ff] transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <div className="w-12 h-12 rounded-none border border-white/15 bg-white/5 flex items-center justify-center text-[#00c8ff] group-hover:border-[#00c8ff] transition-colors">
                <ArrowRightIcon className="w-4 h-4 stroke-current transform transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* =====================================================================
          5. FULLSCREEN 8K LIGHTBOX THEATER MODAL
          ===================================================================== */}
      {activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn select-none"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-['BlauerNue',sans-serif] text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                {project.title}
              </span>
              <span className="font-mono text-xs text-[#00c8ff]">
                [{String(activeLightboxIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}]
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveLightboxIndex(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer font-mono text-sm"
              aria-label="Close Lightbox"
            >
              ✕
            </button>
          </div>

          {/* Main Image Stage */}
          <div
            className="relative flex-1 flex items-center justify-center py-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={project.images[activeLightboxIndex]}
              alt={`${project.title} - Fullscreen ${activeLightboxIndex + 1}`}
              className="max-h-[82vh] max-w-[94vw] object-contain rounded-lg shadow-[0_20px_80px_rgba(0,0,0,0.9)]"
            />

            {/* Prev Button */}
            <button
              type="button"
              onClick={() =>
                setActiveLightboxIndex(
                  (prev) => (prev! - 1 + project.images.length) % project.images.length
                )
              }
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-[#00c8ff] hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer text-base"
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={() =>
                setActiveLightboxIndex(
                  (prev) => (prev! + 1) % project.images.length
                )
              }
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-[#00c8ff] hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer text-base"
              aria-label="Next image"
            >
              ›
            </button>
          </div>

          {/* Bottom Bar */}
          <div
            className="flex items-center justify-between text-xs font-mono text-white/50 z-10 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <span>USE ARROW KEYS ← → TO NAVIGATE</span>
            <span className="uppercase text-[#00c8ff]">{project.typology}</span>
          </div>
        </div>
      )}
    </div>
  );
};

