"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceDetailItem } from "./servicesData";
import { ArrowRightIcon } from "@/svgs";

interface ServicesCatalogGridProps {
  services: ServiceDetailItem[];
  accentColor: string;
  gridCols?: "3" | "2";
}

const ServiceCard3D: React.FC<{
  service: ServiceDetailItem;
  accentColor: string;
}> = ({ service, accentColor }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    gsap.to(cardRef.current, {
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
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      duration: 0.45,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      className="catalog-card-wrapper h-full flex flex-col select-none"
      style={{ perspective: "1000px" }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group flex flex-col h-full flex-1 relative"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex flex-col justify-between h-full flex-1 bg-[#0e111a] hover:bg-[#131726] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] will-change-transform cursor-pointer"
          style={
            {
              transformStyle: "preserve-3d",
              borderColor: "rgba(255,255,255,0.1)",
              "--accent": accentColor,
            } as React.CSSProperties
          }
        >
          {/* 1. VISUAL MEDIA HEADER CONTAINER */}
          <div className="relative w-full aspect-16/10 bg-[#070913] overflow-hidden border-b border-white/10 flex items-center justify-center">
            {service.status === "coming-soon" ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-linear-to-b from-white/4 to-black/60">
                {/* Glow */}
                <div
                  className="absolute inset-0 opacity-15 blur-[60px] pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${service.accentColor} 0%, transparent 70%)`,
                  }}
                />
                {/* Blueprint grid */}
                <div
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(${service.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${service.accentColor} 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="relative z-10 flex flex-col items-center gap-2.5">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundColor: `${service.accentColor}15` }}
                  >
                    <span className="text-base" style={{ color: service.accentColor }}>⏳</span>
                  </div>
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.25em]"
                    style={{ color: service.accentColor }}
                  >
                    COMING SOON
                  </span>
                  <span className="font-['BlauerNue',sans-serif] text-base font-black uppercase text-white/90 tracking-wider">
                    COMING SOON
                  </span>
                </div>

                {/* Top Floating Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
                  <span
                    className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 font-mono text-xs font-bold shadow-sm"
                    style={{ color: service.accentColor }}
                  >
                    /{service.number}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    COMING SOON
                  </span>
                </div>

                {/* Bottom Media Type Indicator */}
                <div className="absolute bottom-3 left-3.5 z-10 pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs font-mono text-[9px] uppercase tracking-widest font-semibold border border-white/10 text-white/60">
                    ⏳ PRODUCTION SOON
                  </span>
                </div>
              </div>
            ) : (
              <>
                {service.coverVideo ? (
                  <video
                    src={service.coverVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-85 group-hover:opacity-100 pointer-events-none"
                  />
                ) : (
                  <img
                    src={service.coverImage}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100 pointer-events-none"
                  />
                )}

                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0e111a] via-transparent to-black/50 pointer-events-none" />

                {/* Top Floating Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
                  <span
                    className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 font-mono text-xs font-bold shadow-sm"
                    style={{ color: service.accentColor }}
                  >
                    /{service.number}
                  </span>

                  <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 font-mono text-[10px] text-white/80 font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: service.accentColor }}
                    />
                    {service.mediaCountLabel}
                  </span>
                </div>

                {/* Bottom Media Type Indicator */}
                <div className="absolute bottom-3 left-3.5 z-10 pointer-events-none">
                  <span
                    className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs font-mono text-[9px] uppercase tracking-widest font-semibold border"
                    style={{
                      color: service.accentColor,
                      borderColor: `${service.accentColor}44`,
                    }}
                  >
                    {service.coverVideo ? "▶ VIDEO REEL" : "▤ VISUAL SHOWCASE"}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* 2. CARD CONTENT BODY */}
          <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-6 relative z-10">
            <div className="flex flex-col gap-3">
              <h3
                className="font-['BlauerNue',sans-serif] text-2xl sm:text-3xl font-black uppercase text-white transition-colors leading-tight group-hover:text-(--accent)"
                style={{ "--accent": accentColor } as React.CSSProperties}
              >
                {service.title}
              </h3>

              <p className="font-mono text-[11px] text-white/60 uppercase tracking-wider truncate">
                {service.subtitle}
              </p>

              {/* Visual Key Deliverables Pills */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {service.tags.slice(0, 3).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-white/60 uppercase tracking-wide group-hover:border-white/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div
              className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-white/80 transition-colors group-hover:text-(--accent)"
              style={{ "--accent": accentColor } as React.CSSProperties}
            >
              <span>EXPLORE PRODUCTION</span>
              <ArrowRightIcon className="w-4 h-4 stroke-current transform transition-transform group-hover:translate-x-1.5" />
            </div>
          </div>

          {/* Bottom Neon Accent Highlight Line */}
          <div
            className="absolute bottom-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            }}
          />
        </div>
      </Link>
    </div>
  );
};

export const ServicesCatalogGrid: React.FC<ServicesCatalogGridProps> = ({
  services,
  accentColor,
  gridCols = "3",
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !gridRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll<HTMLElement>(".catalog-card-wrapper");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 55, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, [services]);

  const gridClass =
    gridCols === "2"
      ? "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8";

  return (
    <div ref={gridRef} className={gridClass}>
      {services.map((service) => (
        <ServiceCard3D
          key={service.id}
          service={service}
          accentColor={accentColor}
        />
      ))}
    </div>
  );
};

