"use client";

import React from "react";
import Link from "next/link";
import { ServiceDetailItem } from "../servicesData";
import { ArrowRightIcon, ArrowLeftIcon } from "@/svgs";

interface MepPageProps {
  service: ServiceDetailItem;
  prevService?: ServiceDetailItem;
  nextService?: ServiceDetailItem;
}

export const MepPage: React.FC<MepPageProps> = ({
  service,
  prevService,
  nextService,
}) => {
  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-[#00c8ff] selection:text-black">
      {/* =====================================================================
          1. MEP ENGINEERING HERO
          ===================================================================== */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-between pt-32 sm:pt-36 pb-12 sm:pb-16 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden border-b border-white/10">
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row lg:items-center justify-between gap-12 my-auto">
          {/* Typography & Manifesto */}
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00c8ff] animate-pulse" />
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#00c8ff]">
                /05 // ARCHITECTURAL ATELIER
              </span>
            </div>

            <h1 className="font-['BlauerNue',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.9] text-white">
              MEP
            </h1>

            <p className="font-['BlauerNue',sans-serif] text-xl sm:text-2xl font-bold uppercase tracking-wide text-white/95">
              MECHANICAL, ELECTRICAL & PLUMBING ENGINEERING SYSTEMS
            </p>

            <p className="font-['Rubik',sans-serif] text-white/80 text-sm sm:text-base leading-relaxed">
              We design energy-efficient HVAC, acoustic-treated airflow networks, high-voltage electrical infrastructure, and high-performance plumbing architectures integrated seamlessly within the building geometry.
            </p>

            {/* Engineering Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="block font-['BlauerNue',sans-serif] text-2xl font-black text-[#00c8ff]">ASHRAE</span>
                <span className="font-mono text-[11px] text-white/60 uppercase">STANDARDS</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="block font-['BlauerNue',sans-serif] text-2xl font-black text-[#00c8ff]">LEED GOLD</span>
                <span className="font-mono text-[11px] text-white/60 uppercase">EFFICIENCY</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="block font-['BlauerNue',sans-serif] text-2xl font-black text-[#00c8ff]">100%</span>
                <span className="font-mono text-[11px] text-white/60 uppercase">BIM INTEGRATED</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/Contact?service=mep"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-white transition-all shadow-2xl"
              >
                <span>COMMISSION MEP ENGINEERING</span>
                <ArrowRightIcon className="w-4 h-4 stroke-current" />
              </Link>
            </div>
          </div>

          {/* Right Video Showcase */}
          <div className="w-full lg:max-w-lg aspect-16/10 rounded-3xl overflow-hidden border border-white/20 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.9)] relative group">
            <video
              src="https://res.cloudinary.com/hxytmocg/video/upload/v1793538438/track_night.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-white/80">
              <span className="text-[#00c8ff] font-bold">HVAC & ELECTRICAL BIM</span>
              <span>ENGINEERING COORDINATION</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. DELIVERABLES & SYSTEMS
          ===================================================================== */}
      <section className="w-full py-20 px-6 sm:px-12 md:px-16 lg:px-20 relative bg-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
              MEP DELIVERABLES
            </span>
            <h2 className="font-['BlauerNue',sans-serif] text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
              BUILDING METABOLISM & INFRASTRUCTURE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00c8ff] transition-colors flex flex-col justify-between gap-6"
              >
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-xs text-[#00c8ff] font-bold uppercase tracking-wider">
                    SYSTEM // 0{idx + 1}
                  </span>
                  <h3 className="font-['BlauerNue',sans-serif] text-2xl font-bold uppercase text-white">
                    {item.title}
                  </h3>
                  <p className="font-['Rubik',sans-serif] text-sm text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {item.metric && (
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-white/40">COMPLIANCE</span>
                    <span className="text-[#00c8ff] font-bold">{item.metric}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. COMMISSION CTA
          ===================================================================== */}
      <section className="w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 relative overflow-hidden bg-black">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
            COMMISSION MEP
          </span>

          <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            INTEGRATE HIGH-PERFORMANCE INFRASTRUCTURE
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link
              href="/Contact?service=mep"
              className="px-8 py-4 bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-black text-sm uppercase tracking-widest hover:bg-white transition-colors"
            >
              REQUEST AN MEP PROPOSAL
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
    </div>
  );
};

