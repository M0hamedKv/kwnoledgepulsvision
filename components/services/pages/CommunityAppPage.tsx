"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ServiceDetailItem } from "../servicesData";
import { ArrowRightIcon, ArrowLeftIcon } from "@/svgs";
import { Lightbox, LightboxItem } from "../showcase";

interface CommunityAppPageProps {
  service: ServiceDetailItem;
  prevService?: ServiceDetailItem;
  nextService?: ServiceDetailItem;
}

const COMMUNITY_APP_MEDIA = [
  {
    id: "app-vid-1",
    title: "SMART COMPOUND ACCESS & AMENITY SUITE",
    url: "https://res.cloudinary.com/hxytmocg/video/upload/v1793529386/close_to_building.mp4",
    type: "video" as const,
    category: "VIDEOS",
  },
  {
    id: "app-img-1",
    title: "DIGITAL ACCESS CONTROL & SMART QR PASSES",
    url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521506/1_View020000.webp",
    type: "image" as const,
    category: "APP INTERFACES",
  },
  {
    id: "app-img-2",
    title: "CLUBHOUSE & TENNIS RESERVATION ENGINE",
    url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521515/1_View030000.webp",
    type: "image" as const,
    category: "APP INTERFACES",
  },
  {
    id: "app-vid-2",
    title: "RESIDENTIAL TELEMETRY & COMPOUND NIGHT VIEW",
    url: "https://res.cloudinary.com/hxytmocg/video/upload/v1793538438/track_night.mp4",
    type: "video" as const,
    category: "VIDEOS",
  },
  {
    id: "app-img-3",
    title: "SMART HOME & HVAC TELEMETRY CONTROLS",
    url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521519/1_View050000.webp",
    type: "image" as const,
    category: "APP INTERFACES",
  },
  {
    id: "app-img-4",
    title: "CONCIERGE & MAINTENANCE BILLING PORTAL",
    url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521526/1_View060000.webp",
    type: "image" as const,
    category: "APP INTERFACES",
  },
  {
    id: "app-vid-3",
    title: "COMMUNITY STREET & NEIGHBORHOOD SYSTEM",
    url: "https://res.cloudinary.com/hxytmocg/video/upload/v1793538889/street_2.mp4",
    type: "video" as const,
    category: "VIDEOS",
  },
  {
    id: "app-img-5",
    title: "SMART GATE LICENSE PLATE RECOGNITION INTERFACE",
    url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521529/1_View080000.webp",
    type: "image" as const,
    category: "APP INTERFACES",
  },
  {
    id: "app-img-6",
    title: "PRIVATE SPA & EVENT VENUE BOOKING",
    url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521530/1c9c3d07-9236-4b4f-9755-9c70c8356571.webp",
    type: "image" as const,
    category: "APP INTERFACES",
  },
  {
    id: "app-vid-4",
    title: "VIP RECEPTION & LOBBY DISPATCH MONITORING",
    url: "https://res.cloudinary.com/hxytmocg/video/upload/v1793214871/reception.mp4",
    type: "video" as const,
    category: "VIDEOS",
  },
  {
    id: "app-img-7",
    title: "COMMUNITY NOTICEBOARD & SOCIAL FEED",
    url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521543/9169d994-df81-4538-a498-66de289aeb1e.webp",
    type: "image" as const,
    category: "APP INTERFACES",
  },
  {
    id: "app-img-8",
    title: "ENERGY MANAGEMENT & SUSTAINABILITY CONTROLS",
    url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521558/44f3d04e-c931-4cb7-907d-9f29922a286f.webp",
    type: "image" as const,
    category: "APP INTERFACES",
  },
];

export const CommunityAppPage: React.FC<CommunityAppPageProps> = ({
  service,
  prevService,
  nextService,
}) => {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [lightboxState, setLightboxState] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = true;
      heroVideoRef.current.play().catch(() => {});
    }
  }, []);

  const heroVideoSrc =
    "https://res.cloudinary.com/hxytmocg/video/upload/v1793529386/close_to_building.mp4";

  const categories = ["ALL", "VIDEOS", "APP INTERFACES"];

  const filteredMedia =
    activeCategory === "ALL"
      ? COMMUNITY_APP_MEDIA
      : COMMUNITY_APP_MEDIA.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setLightboxState({
      items: filteredMedia.map((m) => ({
        id: m.id,
        title: m.title,
        url: m.url,
        type: m.type,
      })),
      index,
    });
  };

  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-[#00c8ff] selection:text-black">
      {/* =====================================================================
          1. FULL-BLEED HERO — PURE VIDEO, CENTERED TITLE ONLY
          ===================================================================== */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <video
            ref={heroVideoRef}
            src={heroVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover scale-102"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10" />

        {/* Hero Title — Pure, Clean, Bold, Centered */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
          <h1 className="font-['BlauerNue',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black uppercase tracking-tight leading-[0.85] text-white select-none drop-shadow-[0_10px_60px_rgba(0,0,0,0.95)]">
            COMMUNITY APP
          </h1>
        </div>

        {/* Clean Scroll Indicator */}
        <div className="relative z-10 flex items-center justify-center">
          <a
            href="#app-exhibition"
            className="font-mono text-xs uppercase tracking-[0.25em] text-white/60 hover:text-[#00c8ff] transition-colors flex items-center gap-2"
          >
            <span>EXPLORE EXHIBITION</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* =====================================================================
          2. PURE MEDIA EXHIBITION — ZERO TEXT CLUTTER, 100% VISUAL
          ===================================================================== */}
      <section
        id="app-exhibition"
        className="w-full py-12 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 relative bg-black"
      >
        <div className="max-w-[1700px] mx-auto flex flex-col gap-8">
          {/* Category Filter Tabs */}
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

          {/* Pure Media Grid — Images & Videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredMedia.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(idx)}
                className="group relative rounded-none overflow-hidden border border-white/10 hover:border-white/40 bg-black transition-all duration-500 cursor-pointer flex flex-col aspect-video sm:aspect-16/10"
              >
                {item.type === "video" ? (
                  <video
                    src={item.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover rounded-none group-hover:scale-104 transition-transform duration-700 ease-out pointer-events-none"
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-none group-hover:scale-104 transition-transform duration-700 ease-out pointer-events-none"
                  />
                )}

                {/* Minimal Hover Overlay — Project Title Only */}
                <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center pointer-events-none z-10">
                  <span className="font-['BlauerNue',sans-serif] text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
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
            COMMISSION COMMUNITY APP
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/Contact?service=community-app"
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
