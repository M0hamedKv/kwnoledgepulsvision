"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceDetailItem } from "./servicesData";

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

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(cardRef.current, {
      duration: 0.3,
      rotateX,
      rotateY,
      scale: 1.02,
      transformPerspective: 1000,
      ease: "power2.out",
      overwrite: "auto",
    });
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
  };

  const mediaVideo = service.coverVideo;
  const mediaImage = service.coverImage || "/showcase-1.jpg";

  return (
    <div
      className="catalog-card-wrapper w-full flex flex-col select-none will-change-[clip-path]"
      style={{ perspective: "1000px" }}
    >
      <Link href={`/services/${service.slug}`} className="group relative block w-full h-115 sm:h-135 lg:h-155 rounded-3xl overflow-hidden bg-black border border-white/10 hover:border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-colors duration-500 cursor-pointer">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-full will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* 1. Full-Bleed Portrait Video or Image (Strictly ZERO text by default) */}
          {mediaVideo ? (
            <video
              src={mediaVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out pointer-events-none"
            />
          ) : (
            <img
              src={mediaImage}
              alt={service.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out pointer-events-none"
            />
          )}

          {/* 2. Hover Reveal Overlay: Only appears on hover to display the service name */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 sm:p-10 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/50 backdrop-blur-xs pointer-events-none">
            <span className="font-['BlauerNue',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
              {service.title}
            </span>
          </div>
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
        // Curtain drop reveal animation: unfolds from height 0 (clipPath top-to-bottom) to normal height
        gsap.fromTo(
          cards,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            opacity: 0.6,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.15,
            stagger: 0.14,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, gridRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [services]);

  const gridClass =
    gridCols === "2"
      ? "grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10";

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

export default ServicesCatalogGrid;
