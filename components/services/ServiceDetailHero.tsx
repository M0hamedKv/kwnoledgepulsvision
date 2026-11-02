"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ServiceDetailItem } from "./servicesData";
import { ArrowRightIcon, ArrowDownIcon } from "@/svgs";

interface ServiceDetailHeroProps {
  service: ServiceDetailItem;
}

export const ServiceDetailHero: React.FC<ServiceDetailHeroProps> = ({ service }) => {
  const containerRef = useRef<HTMLElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Initial hidden states for orchestrated kinetic reveal
      gsap.set(".sd-glow", { scale: 0.6, opacity: 0 });
      gsap.set(".sd-eyebrow", { y: -20, opacity: 0 });
      gsap.set(".sd-title-char", { yPercent: 100, opacity: 0 });
      gsap.set(".sd-headline", { y: 25, opacity: 0 });
      gsap.set(".sd-laser", { scaleX: 0 });
      gsap.set(".sd-manifesto", { y: 30, opacity: 0, filter: "blur(6px)" });
      gsap.set(".sd-preview-card", { y: 40, opacity: 0, scale: 0.95 });
      gsap.set(".sd-tag", { y: 15, opacity: 0, scale: 0.92 });
      gsap.set(".sd-cta", { y: 20, opacity: 0 });

      // 2. Ambient light bloom
      tl.to(".sd-glow", {
        scale: 1,
        opacity: 0.28,
        duration: 1.4,
        ease: "power2.out",
      }, 0);

      // 3. Eyebrow badge
      tl.to(".sd-eyebrow", {
        y: 0,
        opacity: 1,
        duration: 0.7,
      }, 0.1);

      // 4. Giant Title Kinetic Rise
      tl.to(".sd-title-char", {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.025,
        ease: "power4.out",
      }, 0.2);

      // 5. Hero Sub-headline
      tl.to(".sd-headline", {
        y: 0,
        opacity: 1,
        duration: 0.8,
      }, 0.45);

      // 6. Laser Hairline Expansion
      tl.to(".sd-laser", {
        scaleX: 1,
        duration: 0.9,
        ease: "power2.inOut",
      }, 0.5);

      // 7. Manifesto Narrative & Video Preview Card in parallel
      tl.to(".sd-manifesto", {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.85,
      }, 0.65);

      tl.to(".sd-preview-card", {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.95,
        ease: "power3.out",
      }, 0.65);

      // 8. Tags & CTA Buttons
      tl.to(".sd-tag", {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.04,
        duration: 0.6,
      }, 0.8);

      tl.to(".sd-cta", {
        y: 0,
        opacity: 1,
        duration: 0.7,
      }, 0.9);
    }, containerRef);

    return () => ctx.revert();
  }, [service]);

  // Interactive 3D Wave Tilt on the Featured Hero Preview Reel
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoCardRef.current) return;
    const rect = videoCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    gsap.to(videoCardRef.current, {
      duration: 0.18,
      rotateX,
      rotateY,
      scale: 1.02,
      transformPerspective: 900,
      transformStyle: "preserve-3d",
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!videoCardRef.current) return;
    gsap.to(videoCardRef.current, {
      duration: 0.45,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const titleLetters = service.title.split("");

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-28 sm:pt-36 pb-16 px-6 sm:px-12 md:px-16 lg:px-20 border-b border-white/10 overflow-hidden bg-transparent"
    >

      {/* Blueprint Grid Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${service.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${service.accentColor} 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-8 relative z-10">

        {/* 2. Top Eyebrow Badges */}
        <div className="sd-eyebrow flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: service.accentColor }}
            />
            <span
              className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.24em]"
              style={{ color: service.accentColor }}
            >
              /{service.number} // {service.disciplineTag}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-white/50 uppercase tracking-widest">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">
              {service.badge}
            </span>
            <span
              className="px-2.5 py-1 rounded border font-bold"
              style={{
                color: service.accentColor,
                borderColor: `${service.accentColor}40`,
                backgroundColor: `${service.accentColor}12`,
              }}
            >
              {service.mediaCountLabel}
            </span>
          </div>
        </div>

        {/* 3. Giant Kinetic Headline */}
        <div className="flex flex-col gap-4 max-w-5xl">
          <h1 className="font-['BlauerNue',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.88] text-white flex flex-wrap overflow-hidden select-none">
            {titleLetters.map((char, i) => (
              <span
                key={i}
                className="sd-title-char inline-block will-change-transform"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <p className="sd-headline font-['BlauerNue',sans-serif] text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-white/90 mt-2 max-w-4xl">
            {service.heroHeadline}
          </p>
        </div>

        {/* 4. Animated Laser Divider */}
        <div className="sd-laser w-full h-px bg-white/15 origin-left"
          style={{ backgroundImage: `linear-gradient(90deg, ${service.accentColor}, transparent 60%)`}}
          aria-hidden="true" />

        {/* 5. Two-Column Split: Narrative Manifesto & Live Media Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2">

          {/* Left Column: Manifesto & Narrative */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="sd-manifesto flex flex-col gap-4">
              <p className="font-['BlauerNue',sans-serif] text-white/90 text-lg sm:text-xl font-bold uppercase tracking-wide">
                {service.subtitle}
              </p>

              {/* High-Tech Architectural Telemetry Spec Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[10px] uppercase">
                <div className="p-3 rounded-xl bg-white/3 border border-white/10 flex flex-col gap-1">
                  <span className="text-white/40">PIPELINE</span>
                  <span className="text-white font-bold" style={{ color: service.accentColor }}>RAYTRACED</span>
                </div>
                <div className="p-3 rounded-xl bg-white/3 border border-white/10 flex flex-col gap-1">
                  <span className="text-white/40">ENGINE</span>
                  <span className="text-white font-bold">UNREAL 5.4</span>
                </div>
                <div className="p-3 rounded-xl bg-white/3 border border-white/10 flex flex-col gap-1">
                  <span className="text-white/40">RESOLUTION</span>
                  <span className="text-white font-bold">4K UHD</span>
                </div>
                <div className="p-3 rounded-xl bg-white/3 border border-white/10 flex flex-col gap-1">
                  <span className="text-white/40">ARCHIVE</span>
                  <span className="text-white font-bold" style={{ color: service.accentColor }}>{service.mediaCountLabel}</span>
                </div>
              </div>
            </div>

            {/* Tags Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {service.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="sd-tag px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs uppercase tracking-wider text-white/70 hover:border-white/30 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="sd-cta flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={`/Contact?service=${service.slug}`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-black font-['BlauerNue',sans-serif] font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-white hover:shadow-[0_0_30px_rgba(0,200,255,0.4)] transition-all duration-300 group"
                style={{ backgroundColor: service.accentColor }}
              >
                <span>INQUIRE ABOUT {service.title}</span>
                <ArrowRightIcon className="w-4 h-4 stroke-current transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href="#demonstration"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white px-5 py-3.5 rounded-xl border border-white/15 hover:border-white/30 transition-colors"
              >
                <span>WATCH PRODUCTION REELS</span>
                <ArrowDownIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Video Preview Frame */}
          <div className="lg:col-span-5 flex justify-center">
            {service.coverVideo ? (
              <div
                className="sd-preview-card w-full max-w-md select-none"
                style={{ perspective: "1000px" }}
              >
                <div
                  ref={videoCardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-full aspect-16/10 sm:aspect-4/3 rounded-2xl overflow-hidden border border-white/20 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.9)] cursor-pointer group will-change-transform"
                  style={{
                    transformStyle: "preserve-3d",
                    borderColor: `${service.accentColor}55`,
                  }}
                >
                  <video
                    src={service.coverVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Gradient Lighting */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span
                      className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                      style={{
                        color: service.accentColor,
                        borderColor: `${service.accentColor}60`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: service.accentColor }}
                      />
                      FEATURED PRODUCTION REEL
                    </span>
                    <span className="font-mono text-[9px] text-white/70 uppercase tracking-widest bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                      LIVE 3D
                    </span>
                  </div>

                  {/* Bottom HUD */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="font-['BlauerNue',sans-serif] text-sm font-bold uppercase text-white truncate max-w-[75%]">
                      {service.title} ARCHITECTURAL SYSTEM
                    </span>
                    <span
                      className="w-7 h-7 rounded-full bg-black/80 backdrop-blur-xs border border-white/20 flex items-center justify-center text-xs font-bold shadow-md group-hover:scale-110 transition-transform"
                      style={{ color: service.accentColor }}
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            ) : service.coverImage ? (
              <div
                className="sd-preview-card w-full max-w-md select-none"
                style={{ perspective: "1000px" }}
              >
                <div
                  ref={videoCardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-full aspect-16/10 sm:aspect-4/3 rounded-2xl overflow-hidden border border-white/20 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.9)] cursor-pointer group will-change-transform"
                >
                  <img
                    src={service.coverImage}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

