"use client";

import React from "react";
import Image from "next/image";

export const AboutVision: React.FC = () => {
  return (
    <section
      id="our-vision"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-20 border-b border-white/10 bg-transparent scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16">
        {/* Section Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00c8ff] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#00c8ff]">
              02 / OUR VISION
            </span>
          </div>

          <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            OUR <span className="text-[#00c8ff]">VISION</span>
          </h2>
        </div>

        {/* 2-Column Architectural Layout: Vision Statement & Showcase Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Vision Statement */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="relative p-8 sm:p-12 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <div className="flex flex-col gap-6 relative z-10">
                <span className="text-4xl sm:text-5xl text-[#00c8ff] font-serif leading-none select-none">
                  &ldquo;
                </span>

                <h3 className="font-['BlauerNue',sans-serif] text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-snug">
                  SETTING NEW BENCHMARKS IN REAL-TIME ARCHITECTURAL VISUALIZATION.
                </h3>

                <p className="font-mono text-xs sm:text-sm text-white/70 uppercase tracking-widest">
                  PRECISION ENGINEERING • IMMERSIVE SPATIAL ENGINES • UNCOMPROMISED AESTHETICS
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-white/10 text-xs font-mono text-white/40">
                  <span className="text-[#00c8ff] font-bold">KV STUDIO VISION</span>
                  <span>•</span>
                  <span>DESIGN EXCELLENCE</span>
                  <span>•</span>
                  <span>SETTING NEW BENCHMARKS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md h-96 sm:h-115 rounded-2xl overflow-hidden border border-white/15 bg-black/90 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group select-none">
              <Image
                src="/showcase-3.jpg"
                alt="KV Studio Architectural Vision"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Ambient Vignette Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

              {/* HUD Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono z-10 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00c8ff] animate-pulse" />
                  ARCHITECTURAL BENCHMARKS
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-1.5 z-10 pointer-events-none">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#00c8ff] font-bold">
                  KV STUDIO PHILOSOPHY
                </span>
                <span className="font-['BlauerNue',sans-serif] text-lg font-bold uppercase text-white leading-tight">
                  EXCEEDING EXPECTATIONS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;
