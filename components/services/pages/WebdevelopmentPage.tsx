"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceDetailItem } from "../servicesData";
import { ArrowRightIcon, ArrowLeftIcon } from "@/svgs";
import { Lightbox, LightboxItem } from "../showcase";

interface WebdevelopmentPageProps {
  service: ServiceDetailItem;
  prevService?: ServiceDetailItem;
  nextService?: ServiceDetailItem;
}

const ALL_WEB_PROJECTS = [
  {
    id: "rew-vid-1",
    title: "LUXURY REAL ESTATE FLAGSHIP PLATFORM",
    url: "https://res.cloudinary.com/hxytmocg/video/upload/v1794132541/66666.mp4",
    type: "video" as const,
    category: "REAL ESTATE",
  },
  {
    id: "rew-vid-2",
    title: "INTERACTIVE PROPERTY DEVELOPMENT PORTAL",
    url: "https://res.cloudinary.com/hxytmocg/video/upload/v1794132166/4444444.mp4",
    type: "video" as const,
    category: "REAL ESTATE",
  },
  {
    id: "web-1",
    title: "EASTVILLE DIGITAL RESIDENCE",
    url: "/work/eastville-1.jpg",
    type: "image" as const,
    category: "WEBSITE DEV",
  },
  {
    id: "web-2",
    title: "EASTVILLE INTERACTIVE PLATFORM",
    url: "/work/eastville-2.png",
    type: "image" as const,
    category: "WEBSITE DEV",
  },
  {
    id: "web-3",
    title: "DIVA ARCHITECTURAL ATELIER",
    url: "/work/diva-1.png",
    type: "image" as const,
    category: "WEBSITE DEV",
  },
  {
    id: "web-4",
    title: "DIVA DIGITAL SPATIAL SHOWCASE",
    url: "/work/diva-2.jpg",
    type: "image" as const,
    category: "WEBSITE DEV",
  },
];

export const WebdevelopmentPage: React.FC<WebdevelopmentPageProps> = ({
  service,
  prevService,
  nextService,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [lightboxState, setLightboxState] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  const heroImageSrc = "/work/eastville-1.jpg";

  const categories = ["ALL", "REAL ESTATE", "WEBSITE DEV"];

  const filteredProjects =
    activeCategory === "ALL"
      ? ALL_WEB_PROJECTS
      : ALL_WEB_PROJECTS.filter((p) => p.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setLightboxState({
      items: filteredProjects.map((p) => ({
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
        {/* Full-bleed background image filling 100% of the Hero viewport */}
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

        {/* Hero Title — Pure, Clean, Bold, Exactly in Center */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
          <h1 className="font-['BlauerNue',sans-serif] text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[12rem] font-black uppercase tracking-tight leading-[0.85] text-white select-none drop-shadow-[0_10px_60px_rgba(0,0,0,0.95)]">
            WEB DEV
          </h1>
        </div>

        {/* Clean Scroll Indicator */}
        <div className="relative z-10 flex items-center justify-center">
          <a
            href="#web-exhibition"
            className="font-mono text-xs uppercase tracking-[0.25em] text-white/60 hover:text-[#00c8ff] transition-colors flex items-center gap-2"
          >
            <span>EXPLORE EXHIBITION</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* =====================================================================
          2. PURE VISUAL & VIDEO EXHIBITION — SHARP CORNERS, ZERO CLUTTER
          ===================================================================== */}
      <section id="web-exhibition" className="w-full py-12 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 relative bg-black">
        <div className="max-w-[1700px] mx-auto flex flex-col gap-6 sm:gap-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pb-6 border-b border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#00c8ff] text-black font-bold shadow-[0_0_20px_rgba(0,200,255,0.4)]"
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => handleOpenLightbox(idx)}
                className="group relative rounded-none overflow-hidden border border-white/10 hover:border-white/40 bg-black transition-all duration-500 cursor-pointer flex flex-col aspect-16/10"
              >
                {project.type === "video" ? (
                  <video
                    src={project.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover rounded-none group-hover:scale-104 transition-transform duration-700 ease-out pointer-events-none"
                  />
                ) : (
                  <img
                    src={project.url}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-none grayscale contrast-[1.05] brightness-[0.9] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-104 transition-all duration-700 ease-out pointer-events-none"
                  />
                )}

                {/* Minimal Hover Overlay — Project Name ONLY */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center pointer-events-none z-10">
                  <span className="font-['BlauerNue',sans-serif] text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {project.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. CLEAN COMMISSION CTA — ZERO PARAGRAPHS
          ===================================================================== */}
      <section className="w-full py-20 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 relative overflow-hidden bg-black text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            COMMISSION WEB DEV
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/Contact?service=webdevelopment"
              className="px-10 py-5 bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-black text-sm uppercase tracking-widest hover:bg-white transition-colors rounded-none shadow-2xl"
            >
              REQUEST A PROPOSAL
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
              <div className="text-left font-mono text-xs">
                <span className="block text-white/30 text-[10px]">PREVIOUS</span>
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
            SERVICES CATALOG
          </Link>

          {nextService ? (
            <Link
              href={`/services/${nextService.slug}`}
              className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
            >
              <div className="text-right font-mono text-xs">
                <span className="block text-white/30 text-[10px]">NEXT</span>
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
