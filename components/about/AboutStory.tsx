"use client";

import React from "react";
import { AmbientSpotlights } from "@/components/ui";

export const AboutStory: React.FC = () => {
  return (
    <section
      id="our-story"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-20 border-b border-white/10 bg-transparent overflow-hidden scroll-mt-28"
    >
      {/* Signature Architectural Dual Blue Spotlights */}
      <AmbientSpotlights />

      <div className="max-w-7xl mx-auto flex flex-col gap-10 lg:gap-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00c8ff] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#00c8ff]">
              03 / OUR STORY
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            OUR <span className="text-[#00c8ff]">STORY</span>
          </h2>
        </div>

        {/* Story Narrative Card */}
        <div className="relative p-8 sm:p-12 md:p-16 rounded-none bg-black/60 border border-white/15 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col gap-8 max-w-4xl">
            {/* Story Headline */}
            <h3 className="font-['BlauerNue',sans-serif] text-xl sm:text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
              Our Story – KV Studio
            </h3>

            {/* Paragraphs */}
            <div className="flex flex-col gap-5 text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              <p>
                <strong className="text-[#00c8ff] font-bold">KV Studio – Knowledge Plus Vision</strong> was founded on a simple belief: design should go beyond what we see; it should create what we experience.
              </p>
              <p>
                What started as a passion for architecture and creativity evolved into a multidisciplinary studio bringing together architecture, interior design, digital innovation, and immersive technologies.
              </p>
              <p>
                Founded by <strong className="text-white font-bold">Eng. Khaled Emad</strong> and <strong className="text-white font-bold">Eng. Heba Emad</strong>, KV Studio combines creative thinking, technical expertise, and a vision for the future to transform traditional design approaches into innovative experiences.
              </p>
              <p>
                Today, we work across different markets, collaborating with clients and partners to deliver solutions that connect physical spaces with digital possibilities.
              </p>
              <p>
                Our journey is driven by curiosity, collaboration, and the constant pursuit of what comes next.
              </p>
            </div>

            {/* Closing Motto Highlight Box */}
            <div className="p-6 sm:p-8 bg-white/3 border-l-4 border-[#00c8ff] backdrop-blur-md">
              <p className="font-['BlauerNue',sans-serif] text-sm sm:text-lg md:text-xl font-bold uppercase tracking-wider text-white leading-snug">
                &ldquo;We are KV Studio. Where Knowledge Meets Vision, and Ideas Become Experiences.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
