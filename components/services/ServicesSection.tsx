"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServicesSectionProps, DisciplineItem } from "./types";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/svgs";

const DEFAULT_DISCIPLINES: DisciplineItem[] = [
  {
    id: "interactive-solution",
    number: "01",
    tag: "INTERACTIVE SOLUTION",
    title: "INTERACTIVE SOLUTION",
    video: "https://res.cloudinary.com/hxytmocg/video/upload/v1793204898/Diva.mp4",
    videoTitle: "iMaquette Real-Time Scale Model",
    videoBadge: "INTERACTIVE SYSTEM",
    accentColor: "#00c8ff",
    ctaText: "EXPLORE INTERACTIVE",
    ctaHref: "/services#interactive-solutions",
    subServices: [],
  },
  {
    id: "design",
    number: "02",
    tag: "DESIGN DISCIPLINE",
    title: "DESIGN",
    video: "https://res.cloudinary.com/hxytmocg/video/upload/v1793214871/reception.mp4",
    videoTitle: "Spatial Interior Architecture",
    videoBadge: "SPATIAL ATELIER",
    accentColor: "#b85d38",
    ctaText: "EXPLORE DESIGN",
    ctaHref: "/services#design-discipline",
    subServices: [],
  },
];

// ─── 3D Story-style Interactive Video Card ────────────────────────────────────
const Discipline3DCard: React.FC<{
  discipline: DisciplineItem;
  accentColor: string;
}> = ({ discipline, accentColor }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Organic 3D wave tilt (Instant Story-style physics)
    const rotateX = ((y - centerY) / centerY) * -11;
    const rotateY = ((x - centerX) / centerX) * 11;

    gsap.to(cardRef.current, {
      duration: 0.18,
      rotateX,
      rotateY,
      scale: 1.025,
      transformPerspective: 900,
      transformStyle: "preserve-3d",
      ease: "power1.out",
      overwrite: "auto",
    });

    if (glareRef.current) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
      glareRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      duration: 0.45,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      className="discipline-card h-full flex flex-col relative select-none"
      style={{ perspective: "1000px" }}
    >
      <Link
        href={discipline.ctaHref || "/services"}
        className="group flex flex-col h-full flex-1 relative"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex flex-col justify-between h-full flex-1 p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#090c15] border border-white/10 hover:border-(--accent) shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.95)] will-change-transform cursor-pointer overflow-hidden"
          style={
            {
              "--accent": `${accentColor}88`,
              transformStyle: "preserve-3d",
              transformPerspective: 900,
            } as React.CSSProperties
          }
        >
          {/* Ambient background glow */}
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[120px] pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-500"
            style={{ backgroundColor: accentColor }}
          />

          {/* Card Header: Number & Tag */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 relative z-10 pointer-events-none">
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: accentColor }}
              />
              <span
                className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.22em]"
                style={{ color: accentColor }}
              >
                /{discipline.number} // {discipline.tag}
              </span>
            </div>
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest hidden sm:inline-block">
              EXPLORE ↗
            </span>
          </div>

          {/* Card Main Headline — Unified Height to Guarantee Equal Alignment */}
          <div className="py-5 sm:py-6 relative z-10 pointer-events-none min-h-18 sm:min-h-22 flex items-center">
            <h3
              className="font-['BlauerNue',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white transition-colors duration-300 leading-none group-hover:text-(--accent)"
              style={{ "--accent": accentColor } as React.CSSProperties}
            >
              {discipline.title}
            </h3>
          </div>

          {/* 3D Video Screen */}
          <div className="relative w-full aspect-16/10 sm:aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black my-2 z-20 shadow-inner">
            <video
              src={discipline.video}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

            {/* Dynamic Specular 3D Glare */}
            <div
              ref={glareRef}
              className="absolute inset-0 pointer-events-none transition-opacity duration-200 opacity-0 z-10"
            />

            {/* Top HUD Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
              <span
                className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                style={{ color: accentColor, borderColor: `${accentColor}55` }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: accentColor }}
                />
                {discipline.videoBadge}
              </span>
              <span className="font-mono text-[9px] text-white/70 uppercase tracking-widest bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/10 flex items-center gap-1">
                <span>3D REEL</span>
                <span style={{ color: accentColor }}>✦</span>
              </span>
            </div>

            {/* Bottom HUD Title Bar */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
              <span className="font-['BlauerNue',sans-serif] text-sm sm:text-base font-bold uppercase text-white tracking-wide truncate max-w-[80%] drop-shadow-md">
                {discipline.videoTitle}
              </span>
              <span
                className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-xs border border-white/20 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 group-hover:scale-105 transition-transform"
                style={{ color: accentColor }}
              >
                <span>OPEN</span>
                <span>↗</span>
              </span>
            </div>
          </div>

          {/* Card Bottom: Minimal Action Link Locked to Baseline */}
          <div className="pt-6 mt-auto border-t border-white/10 flex items-center justify-between relative z-10 pointer-events-none">
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
              DISCOVER {discipline.title}
            </span>
            <span
              className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 group-hover:translate-x-1 transition-all duration-300"
              style={{ color: accentColor }}
            >
              <span>{discipline.ctaText || "VIEW DISCIPLINE"}</span>
              <ArrowRightIcon className="w-4 h-4 stroke-current" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  headlineMain = "SERVICES",
  manifesto = "Two integrated practices delivering real-time interactive solutions and advanced architectural design.",
  disciplines = DEFAULT_DISCIPLINES,
  services,
}) => {
  const activeDisciplines = disciplines || services || DEFAULT_DISCIPLINES;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header elements: silky smooth rise upwards with fade
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // 2. Hairline rule expansion from the left
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.0,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // 3. The 3D Video Cards: Silky smooth vertical rise upwards with fade (Zero choppiness, zero jitter)
      const cards = cardsContainerRef.current?.querySelectorAll<HTMLElement>(".discipline-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            y: 65,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.16,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    // Refresh ScrollTrigger coordinates to guarantee sync after ShowcaseSection
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Services Section: Interactive Solution and Design"
      className="relative z-50 w-full min-h-screen bg-background text-white pt-24 sm:pt-32 pb-28 sm:pb-36 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14 relative z-10">
        {/* Editorial Studio Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="flex flex-col gap-3 max-w-2xl">
            <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none text-white">
              {headlineMain}
            </h2>
            <p className="font-['Rubik',sans-serif] text-white/60 text-sm sm:text-base leading-relaxed pt-1">
              {manifesto}
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-[#00c8ff] transition-colors duration-300 pb-1 self-start md:self-end"
          >
            <span>[ VIEW ALL SERVICES ]</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5 text-white/40 group-hover:text-[#00c8ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </Link>
        </div>

        {/* Animated Hairline Rule */}
        <div
          ref={lineRef}
          className="w-full h-px bg-white/10 origin-left"
          aria-hidden="true"
        />

        {/* The Two Disciplines 3D Video Showcases */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-stretch"
        >
          {activeDisciplines.map((discipline) => {
            const accentColor =
              discipline.accentColor ||
              (discipline.id === "interactive-solution" ? "#00c8ff" : "#b85d38");

            return (
              <Discipline3DCard
                key={discipline.id}
                discipline={discipline}
                accentColor={accentColor}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
