"use client";

import React from "react";
import { AmbientSpotlights } from "@/components/ui";

export const AboutMission: React.FC = () => {
  return (
    <section
      id="mission"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-20 border-b border-white/10 bg-transparent overflow-hidden scroll-mt-28"
    >
      {/* Signature Architectural Dual Blue Spotlights (Alternate Corners) */}
      <AmbientSpotlights variant="alternate" />

      <div className="max-w-7xl mx-auto flex flex-col gap-10 lg:gap-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00c8ff] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#00c8ff]">
              02 / OUR MISSION
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            OUR <span className="text-[#00c8ff]">MISSION</span>
          </h2>
        </div>

        {/* Mission Narrative Card */}
        <div className="relative p-8 sm:p-12 md:p-16 rounded-none bg-black/60 border border-white/15 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col gap-8 max-w-4xl">
            <div className="flex flex-col gap-6 text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-normal">
              <p>
                Our vision is to redefine the future of architecture and design by bridging creativity, technology, and innovation. We aspire to create meaningful experiences that go beyond traditional design, transforming ideas into immersive, intelligent, and interactive environments.
              </p>
              <p>
                At <strong className="text-white font-bold">KV Studio – Knowledge Plus Vision</strong>, we believe that the future lies in the integration of knowledge and technology, where every vision becomes an opportunity to inspire, connect, and shape the world around us.
              </p>
            </div>

            {/* Motto Highlight Box */}
            <div className="p-6 sm:p-8 bg-white/3 border-l-4 border-[#00c8ff] backdrop-blur-md">
              <p className="font-['BlauerNue',sans-serif] text-sm sm:text-lg md:text-xl font-bold uppercase tracking-wider text-white leading-snug">
                &ldquo;Knowledge Beyond Design. Vision Beyond Limits.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
