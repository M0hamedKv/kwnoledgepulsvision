"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceDetailItem } from "./servicesData";

interface DesignAccordionShowcaseProps {
  services: ServiceDetailItem[];
  className?: string;
}

export const DesignAccordionShowcase: React.FC<DesignAccordionShowcaseProps> = ({
  services,
  className = "",
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isAnyHovered = hoveredIndex !== null;

  return (
    <div
      className={`w-full overflow-hidden select-none ${className}`}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* =====================================================================
          EXPANDING HORIZONTAL ACCORDION (Desktop / Tablet)
          Pure visual media:
          - Default: all columns equal width, ZERO text
          - Hover: column expands, media scales up, ONLY service name fades gently upwards
          - Other columns: shrink in width & dim down
          ===================================================================== */}
      <div className="hidden md:flex w-full h-[72vh] min-h-[540px] max-h-[760px] border border-white/10 bg-black overflow-hidden">
        {services.map((service, index) => {
          const isActive = hoveredIndex === index;
          const isDimmed = isAnyHovered && !isActive;

          const mediaVideo =
            service.coverVideo ||
            (service.gallery && service.gallery.find((g) => g.type === "video")?.url);
          const mediaImage =
            service.coverImage ||
            (service.gallery && service.gallery.find((g) => g.type === "image")?.url) ||
            "https://res.cloudinary.com/hxytmocg/image/upload/v1793521335/2_View02.webp";

          return (
            <div
              key={service.id || service.slug}
              onMouseEnter={() => setHoveredIndex(index)}
              className={`relative h-full border-r border-white/10 last:border-r-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer ${
                isActive
                  ? "flex-[2.8] z-20 shadow-[0_20px_70px_rgba(0,0,0,0.95)]"
                  : isDimmed
                  ? "flex-[0.6] z-10"
                  : "flex-1 z-10"
              }`}
            >
              <Link
                href={`/services/${service.slug}`}
                className="block w-full h-full relative overflow-hidden bg-black"
              >
                {/* 1. Pure Media: 4K Video or High-Res Image */}
                {mediaVideo ? (
                  <video
                    src={mediaVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
                      isActive
                        ? "scale-108 brightness-100 opacity-100"
                        : isDimmed
                        ? "scale-100 brightness-50 opacity-25 filter blur-[0.5px]"
                        : "scale-100 brightness-85 opacity-80"
                    }`}
                  />
                ) : (
                  <img
                    src={mediaImage}
                    alt={service.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
                      isActive
                        ? "scale-108 brightness-100 opacity-100"
                        : isDimmed
                        ? "scale-100 brightness-50 opacity-25 filter blur-[0.5px]"
                        : "scale-100 brightness-85 opacity-80"
                    }`}
                  />
                )}

                {/* 2. Soft Bottom Shadow for text contrast when active */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-black/85 via-black/30 to-transparent pointer-events-none transition-opacity duration-600 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* 3. ONLY the Service Name — Fades gently upwards on hover */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 z-20 pointer-events-none overflow-hidden">
                  <h3
                    className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-white select-none transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] drop-shadow-[0_4px_25px_rgba(0,0,0,0.98)] whitespace-nowrap overflow-hidden text-ellipsis ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6 pointer-events-none"
                    }`}
                    style={{
                      fontFamily:
                        '"Bodoni MT", "Didot", "Playfair Display", "Cinzel", "Times New Roman", Georgia, serif',
                    }}
                  >
                    {service.title}
                  </h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* =====================================================================
          MOBILE RESPONSIVE ACCORDION
          Stacked with smooth vertical expansion, only service name on active tap
          ===================================================================== */}
      <div className="flex flex-col md:hidden w-full divide-y divide-white/10 border border-white/10 bg-black">
        {services.map((service, index) => {
          const isActive = hoveredIndex === index;

          const mediaVideo =
            service.coverVideo ||
            (service.gallery && service.gallery.find((g) => g.type === "video")?.url);
          const mediaImage =
            service.coverImage ||
            (service.gallery && service.gallery.find((g) => g.type === "image")?.url) ||
            "https://res.cloudinary.com/hxytmocg/image/upload/v1793521335/2_View02.webp";

          return (
            <div
              key={service.id || service.slug}
              onClick={() => setHoveredIndex(isActive ? null : index)}
              className={`relative w-full transition-all duration-500 overflow-hidden cursor-pointer ${
                isActive ? "h-[360px]" : "h-[180px]"
              }`}
            >
              <Link href={`/services/${service.slug}`} className="block w-full h-full relative">
                {mediaVideo ? (
                  <video
                    src={mediaVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isActive ? "scale-105 opacity-100" : "scale-100 opacity-60"
                    }`}
                  />
                ) : (
                  <img
                    src={mediaImage}
                    alt={service.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isActive ? "scale-105 opacity-100" : "scale-100 opacity-60"
                    }`}
                  />
                )}

                {/* Soft Bottom Shadow on Active */}
                <div
                  className={`absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Only Service Name on Mobile */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-20 pointer-events-none">
                  <h3
                    className={`text-3xl font-normal text-white transition-all duration-500 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{
                      fontFamily:
                        '"Bodoni MT", "Didot", "Playfair Display", "Cinzel", "Times New Roman", Georgia, serif',
                    }}
                  >
                    {service.title}
                  </h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesignAccordionShowcase;