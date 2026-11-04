"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServicesSectionProps } from "./types";
import { ArrowUpRightIcon } from "@/svgs";

interface DualShowcaseItem {
  id: string;
  title: string;
  video: string;
  href: string;
  accentColor: string;
}

const DUAL_SHOWCASES: DualShowcaseItem[] = [
  {
    id: "interactive-solution",
    title: "INTERACTIVE SOLUTION",
    video: "https://res.cloudinary.com/hxytmocg/video/upload/v1793558191/MVI_8622.mov",
    href: "/services",
    accentColor: "#00c8ff",
  },
  {
    id: "design",
    title: "DESIGN",
    video: "https://res.cloudinary.com/hxytmocg/video/upload/v1793214871/reception.mp4",
    href: "/services",
    accentColor: "#0055ff",
  },
];

const DualPortalCard: React.FC<{ item: DualShowcaseItem }> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(cardRef.current, {
      duration: 0.35,
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      duration: 0.5,
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
    });
  };

  return (
    <div className="w-full flex flex-col select-none" style={{ perspective: "1000px" }}>
      <Link href={item.href} className="group relative block w-full">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-100 sm:h-125 lg:h-145 rounded-3xl overflow-hidden bg-black border border-white/10 hover:border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] will-change-transform cursor-pointer transition-colors duration-500"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* 100% Full-Bleed 4K Video Background (Strictly ZERO text by default) */}
          <video
            src={item.video}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out pointer-events-none"
          />

          {/* Minimal Hover Overlay - ONLY appears on hover with the service name */}
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 sm:p-10 text-center pointer-events-none z-20">
            <span className="font-['BlauerNue',sans-serif] text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
              {item.title}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  headlineMain = "DISCIPLINES",
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
          headerRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      if (cardsContainerRef.current) {
        gsap.fromTo(
          cardsContainerRef.current.children,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
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

        {/* Exactly 2 Full-Bleed 3D Cinema Portals: INTERACTIVE SOLUTION & DESIGN */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-stretch"
        >
          {DUAL_SHOWCASES.map((item) => (
            <DualPortalCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
