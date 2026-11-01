"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServicesSectionProps } from "./types";
import { ArrowUpRightIcon } from "@/svgs";

interface CinematicShowcaseItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  badge: string;
  video: string;
  accentColor: string;
  href: string;
  isWide?: boolean;
}

const CINEMATIC_SHOWCASES: CinematicShowcaseItem[] = [
  {
    id: "imaquette-flagship",
    number: "01",
    tag: "INTERACTIVE PROPTECH",
    title: "IMAQUETTE REAL-TIME SCALE MODEL",
    badge: "UNREAL ENGINE 5.4 • 60 FPS",
    video: "https://res.cloudinary.com/hxytmocg/video/upload/v1793558191/MVI_8622.mov",
    accentColor: "#00c8ff",
    href: "/services/imaquette",
    isWide: true,
  },
  {
    id: "night-spine",
    number: "02",
    tag: "ARCHITECTURAL CINEMA",
    title: "NIGHT ILLUMINATION MASTER FILM",
    badge: "4K RAYTRACED CINEMA",
    video: "https://res.cloudinary.com/hxytmocg/video/upload/v1793216262/NIGHT_SPINE.mp4",
    accentColor: "#ff9000",
    href: "/services/animation",
    isWide: false,
  },
  {
    id: "spatial-interior",
    number: "03",
    tag: "SPATIAL ATELIER",
    title: "LUXURY INTERIOR ARCHITECTURE",
    badge: "143 SIGNATURE RENDERS",
    video: "https://res.cloudinary.com/hxytmocg/video/upload/v1793214871/reception.mp4",
    accentColor: "#b85d38",
    href: "/services/interior",
    isWide: false,
  },
  {
    id: "spine-cam",
    number: "04",
    tag: "ARCHITECTURAL CINEMA",
    title: "ANAMORPHIC CAMERA FLYTHROUGH",
    badge: "60 FPS CINEMATIC GLIDE",
    video: "https://res.cloudinary.com/hxytmocg/video/upload/v1793208993/CAM_03_SPINE.mp4",
    accentColor: "#a855f7",
    href: "/services/animation",
    isWide: false,
  },
  {
    id: "drone-orbit",
    number: "05",
    tag: "INTERACTIVE PROPTECH",
    title: "VIRTUAL DRONE ORBIT MODE",
    badge: "360° GEOSPATIAL NAVIGATION",
    video: "https://res.cloudinary.com/hxytmocg/video/upload/v1793206972/DroneMode.mp4",
    accentColor: "#00c8ff",
    href: "/services/imaquette",
    isWide: false,
  },
  {
    id: "realtime-sim",
    number: "06",
    tag: "INTERACTIVE SIMULATION",
    title: "REAL-TIME VEHICLE DRIVE-THROUGH",
    badge: "PHYSICS & SPATIAL ENGINE",
    video: "https://res.cloudinary.com/hxytmocg/video/upload/v1793207922/Car_gameplay.mp4",
    accentColor: "#10b981",
    href: "/services/imaquette",
    isWide: true,
  },
];

const VisualPortalCard: React.FC<{ item: CinematicShowcaseItem }> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

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
      duration: 0.2,
      rotateX,
      rotateY,
      scale: 1.02,
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
      ease: "power1.out",
      overwrite: "auto",
    });

    if (glareRef.current) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.22) 0%, transparent 60%)`;
      glareRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      duration: 0.5,
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
      className={`visual-portal-wrapper h-full flex flex-col select-none ${
        item.isWide ? "lg:col-span-2" : "lg:col-span-1"
      }`}
      style={{ perspective: "1000px" }}
    >
      <Link href={item.href} className="group relative flex flex-col h-full flex-1">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-95 sm:h-110 lg:h-120 rounded-3xl overflow-hidden bg-black border border-white/10 hover:border-(--accent) shadow-[0_25px_60px_rgba(0,0,0,0.85)] will-change-transform cursor-pointer transition-colors duration-300"
          style={
            {
              "--accent": `${item.accentColor}99`,
              transformStyle: "preserve-3d",
            } as React.CSSProperties
          }
        >
          {/* 100% Full-Bleed 4K Video Background */}
          <video
            src={item.video}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100 pointer-events-none"
          />

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/25 to-black/40 pointer-events-none" />

          {/* Dynamic Specular 3D Glare */}
          <div
            ref={glareRef}
            className="absolute inset-0 pointer-events-none transition-opacity duration-200 opacity-0 z-10"
          />

          {/* Top Floating HUD Badges */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20 pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: item.accentColor }}
              />
              <span
                className="font-mono text-[11px] font-bold uppercase tracking-wider"
                style={{ color: item.accentColor }}
              >
                {item.number} / {item.tag}
              </span>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white/80 uppercase tracking-widest hidden sm:flex items-center gap-1.5">
              <span>{item.badge}</span>
            </div>
          </div>

          {/* Center Cinematic Play Glow (appears on hover) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div
              className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-lg scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-2xl"
              style={{ borderColor: item.accentColor }}
            >
              <span style={{ color: item.accentColor }}>▶</span>
            </div>
          </div>

          {/* Bottom Floating Architectural Title Bar */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-20 pointer-events-none">
            <div className="flex flex-col gap-1 max-w-[85%]">
              <h3 className="font-['BlauerNue',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight drop-shadow-md group-hover:text-(--accent) transition-colors">
                {item.title}
              </h3>
            </div>

            <div
              className="px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 font-mono text-xs font-bold uppercase tracking-wider text-white group-hover:scale-105 transition-all flex items-center gap-1 shrink-0"
              style={{ color: item.accentColor }}
            >
              <span>EXPLORE</span>
              <span>↗</span>
            </div>
          </div>

          {/* Bottom Neon Accent Highlight Line */}
          <div
            className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
            style={{
              background: `linear-gradient(90deg, transparent, ${item.accentColor}, transparent)`,
            }}
          />
        </div>
      </Link>
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  headlineMain = "SERVICES",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      const cards = cardsContainerRef.current?.querySelectorAll<HTMLElement>(".visual-portal-wrapper");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

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
        {/* Minimal High-Impact Architectural Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10"
        >
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
              02 / CREATIVE DISCIPLINES
            </span>
            <h2 className="font-['BlauerNue',sans-serif] text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-none text-white">
              {headlineMain}
            </h2>
          </div>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-[#00c8ff] transition-colors self-start md:self-end pb-1"
          >
            <span>VIEW ALL SERVICES</span>
            <ArrowUpRightIcon className="w-4 h-4 text-white/40 group-hover:text-[#00c8ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </Link>
        </div>

        {/* 6 Full-Bleed 3D Cinema Portals Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-stretch"
        >
          {CINEMATIC_SHOWCASES.map((item) => (
            <VisualPortalCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
