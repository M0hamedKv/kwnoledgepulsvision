"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRightIcon } from "@/svgs";

export const AboutStory: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(cardRef.current, {
      duration: 0.4,
      rotateX,
      rotateY,
      transformPerspective: 900,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      duration: 0.6,
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="our-story"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-20 border-b border-white/10 scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16">
        {/* Section Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00c8ff] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#00c8ff]">
              01 / OUR STORY
            </span>
          </div>

          <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            OUR <span className="text-[#00c8ff]">STORY</span>
          </h2>
        </div>

        {/* 2-Column Split: Narrative & Interactive 3D Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-5 text-base sm:text-lg md:text-xl text-white/80 font-['Rubik',sans-serif] leading-relaxed">
              <p className="text-white font-normal leading-relaxed">
                <strong className="text-[#00c8ff] font-bold">KV Studio</strong> is a creative architecture and visualization practice dedicated to turning ideas into reality. We specialize in architectural, interior, and landscape design, complemented by cutting-edge visualization, lighting design, and interactive solutions.
              </p>

              {/* Highlight Quote */}
              <div className="p-6 sm:p-8 rounded-xl bg-white/3 border-l-4 border-[#00c8ff] border backdrop-blur-md">
                <p className="font-['BlauerNue',sans-serif] text-lg sm:text-2xl font-bold uppercase tracking-wide text-white leading-snug">
                  &ldquo;Driven by innovation, guided by design, and powered by technology, Knowledge Plus Vision is not just a visualization studio – it’s a partner in shaping the future of spaces.&rdquo;
                </p>
              </div>
            </div>

            {/* Requested Action Link: View Our Projects */}
            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-black uppercase text-xs sm:text-sm tracking-[0.16em] hover:bg-white hover:shadow-[0_0_30px_rgba(0,200,255,0.4)] transition-all duration-300"
              >
                <span>VIEW OUR PROJECTS</span>
                <ArrowRightIcon className="w-4 h-4 stroke-current transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Interactive 3D Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-md h-105 sm:h-120 rounded-2xl overflow-hidden border border-white/20 bg-[#0c0c0c] shadow-[0_25px_60px_rgba(0,0,0,0.9)] cursor-pointer group will-change-transform select-none"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Background Showcase Render */}
              <Image
                src="/showcase-1.jpg"
                alt="KV Studio Architectural Atelier Project"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Ambient Vignette Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/30 pointer-events-none" />

              {/* Architectural HUD Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono z-10 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#00c8ff]/40 text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00c8ff] animate-pulse" />
                  KV ATELIER // ARCHITECTURE
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white/60 text-[10px]">
                  LOD 500
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-2 z-10 pointer-events-none">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#00c8ff] font-bold">
                  KNOWLEDGE PLUS VISION
                </span>
                <h3 className="font-['BlauerNue',sans-serif] text-xl font-bold uppercase text-white leading-tight">
                  TURNING IDEAS INTO REALITY
                </h3>
                <span className="text-xs font-mono text-white/50">
                  Architectural, Interior & Visualization
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
