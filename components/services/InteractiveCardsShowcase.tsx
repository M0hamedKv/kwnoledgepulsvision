"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ServiceDetailItem } from "./servicesData";
import { ArrowUpRightIcon, ArrowLeftIcon, ArrowRightIcon } from "@/svgs";
import { getOptimizedVideoUrl, getVideoPosterUrl } from "@/lib/media";
import { AmbientSpotlights } from "@/components/ui";

interface InteractiveCardsShowcaseProps {
  services: ServiceDetailItem[];
  className?: string;
}

export const InteractiveCardsShowcase: React.FC<InteractiveCardsShowcaseProps> = ({
  services,
  className = "",
}) => {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Mouse Drag to Scroll Refs
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const handleCardClick = (id: string) => {
    // If the user dragged, don't flip the card
    if (hasDraggedRef.current) return;

    const nextId = flippedCardId === id ? null : id;
    setFlippedCardId(nextId);

    if (nextId) {
      setTimeout(() => {
        const el = cardRefs.current[id];
        if (el && scrollTrackRef.current) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }, 90);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCardId(null);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollTrackRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollTrackRef.current.style.scrollBehavior = "smooth";
      scrollTrackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // ─────────────────────────────────────────────────────────────
  // MOUSE DRAG TO SCROLL (الشد بالماوس يمين وشمال مع inertia ناعمة)
  // ─────────────────────────────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollTrackRef.current) return;

    // Stop ongoing inertia
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    isDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - scrollTrackRef.current.offsetLeft;
    scrollLeftRef.current = scrollTrackRef.current.scrollLeft;
    lastXRef.current = e.pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    // Direct 1:1 tracking without lag during drag
    scrollTrackRef.current.style.scrollBehavior = "auto";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !scrollTrackRef.current) return;

    const currentX = e.pageX;
    const currentTime = performance.now();
    const x = currentX - scrollTrackRef.current.offsetLeft;
    const walk = x - startXRef.current;

    // Threshold to differentiate click from drag
    if (Math.abs(walk) > 5) {
      if (!hasDraggedRef.current) {
        hasDraggedRef.current = true;
        setIsDragging(true);
      }
      scrollTrackRef.current.scrollLeft = scrollLeftRef.current - walk;

      // Track velocity for inertia
      const timeDiff = currentTime - lastTimeRef.current;
      if (timeDiff > 0) {
        velocityRef.current = (currentX - lastXRef.current) / timeDiff;
      }
      lastXRef.current = currentX;
      lastTimeRef.current = currentTime;
    }
  };

  const handleMouseUpOrLeave = () => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    setIsDragging(false);

    // Apply smooth inertia glide on release
    if (scrollTrackRef.current && Math.abs(velocityRef.current) > 0.15) {
      let currentVelocity = velocityRef.current * 14;
      const applyInertia = () => {
        if (!scrollTrackRef.current || Math.abs(currentVelocity) < 0.5) {
          if (scrollTrackRef.current) {
            scrollTrackRef.current.style.scrollBehavior = "smooth";
          }
          return;
        }
        scrollTrackRef.current.scrollLeft -= currentVelocity;
        currentVelocity *= 0.93; // Smooth decaying friction
        animationFrameRef.current = requestAnimationFrame(applyInertia);
      };
      animationFrameRef.current = requestAnimationFrame(applyInertia);
    } else if (scrollTrackRef.current) {
      scrollTrackRef.current.style.scrollBehavior = "smooth";
    }

    // Keep hasDraggedRef true for 80ms so child onClick doesn't trigger
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 80);
  };

  // Global mouseup cleanup
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDownRef.current) {
        handleMouseUpOrLeave();
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      aria-label="Interactive Solutions Staggered 3D Card Deck"
      className={`relative w-full text-white py-10 sm:py-14 overflow-hidden select-none flex flex-col justify-center ${className}`}
    >
      {/* Signature Architectural Dual Blue Spotlights */}
      <AmbientSpotlights />
      {/* ─────────────────────────────────────────────────────────────
          1. TRACK HEADER & SCROLL CONTROLS
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full mx-auto px-6 sm:px-12 flex items-center justify-between mb-2 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-10 h-10 border border-white/20 hover:border-[#00c8ff] hover:text-[#00c8ff] flex items-center justify-center transition-colors bg-black/60 backdrop-blur-xs cursor-pointer"
          >
            <ArrowLeftIcon className="w-4 h-4 stroke-current" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-10 h-10 border border-white/20 hover:border-[#00c8ff] hover:text-[#00c8ff] flex items-center justify-center transition-colors bg-black/60 backdrop-blur-xs cursor-pointer"
          >
            <ArrowRightIcon className="w-4 h-4 stroke-current" />
          </button>
        </div>
      </div>

      <div
        ref={scrollTrackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`relative w-full overflow-x-auto scrollbar-none flex items-center gap-7 sm:gap-9 md:gap-11 pt-24 pb-20 sm:pt-28 sm:pb-24 md:pt-32 md:pb-28 px-8 sm:px-16 md:px-24 z-10 select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ perspective: "2200px" }}
      >
        {services.map((service, index) => {
          const isFlipped = flippedCardId === service.id;
          const isHigher = index % 2 === 1;

          // Alternating Staggered Heights
          const staggerClass = isHigher
            ? "-translate-y-5 sm:-translate-y-7 md:-translate-y-9"
            : "translate-y-5 sm:translate-y-7 md:translate-y-9";

          const videoSrc =
            service.coverVideo || (service.gallery && service.gallery[0]?.url);

          return (
            <div
              key={service.id || service.slug}
              ref={(el) => {
                cardRefs.current[service.id] = el;
              }}
              className={`shrink-0 transition-all duration-900 ease-[cubic-bezier(0.25,1,0.3,1)] ${staggerClass} ${
                isFlipped
                  ? "w-80 sm:w-96 md:w-120 lg:w-130 z-30"
                  : "w-52 sm:w-56 md:w-60 lg:w-64 z-10"
              }`}
              style={{ perspective: "2200px" }}
            >
              {/* =========================================================
                  3D CARD CONTAINER
                  ========================================================= */}
              <div
                onClick={() => handleCardClick(service.id)}
                className={`relative w-full cursor-pointer transition-transform duration-900 ease-[cubic-bezier(0.25,1,0.3,1)] will-change-transform ${
                  isFlipped ? "rotate-y-180" : "rotate-y-0 hover:scale-[1.02]"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* ─────────────────────────────────────────────────────
                    FRONT FACE: Compact Collectible Card (Fixed Height)
                    ───────────────────────────────────────────────────── */}
                <div
                  className="w-full flex flex-col items-center"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* Beveled Metallic Border Frame */}
                  <div className="relative w-full h-67.5 sm:h-72.5 md:h-77.5 rounded-2xl p-0.75 bg-linear-to-b from-white via-[#dcdde1] to-[#718096] shadow-[0_12px_35px_rgba(255,255,255,0.1)] hover:shadow-[0_16px_45px_rgba(255,255,255,0.24)] transition-all duration-500">
                    <div className="relative w-full h-full rounded-[13px] overflow-hidden bg-black flex items-center justify-center">
                      {videoSrc ? (
                        <video
                          src={getOptimizedVideoUrl(videoSrc, { width: 720, quality: "good" })}
                          poster={getVideoPosterUrl(videoSrc, 720)}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover pointer-events-none"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-900" />
                      )}

                      {/* Card Stamp Badge */}
                      <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                        <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 bg-black/85 border border-white/40 text-white font-bold">
                          {service.number ? `0${service.number}`.slice(-2) : `0${index + 1}`}
                        </span>
                        <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 bg-black/85 border border-white/20 text-white/80 font-bold">
                          3D MOMENT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Title & Metric details below */}
                  <div className="flex flex-col items-center text-center mt-3 gap-0.5 pointer-events-none select-none">
                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                      {service.title}
                    </h3>
                    <span className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest font-semibold">
                      {service.badge || service.disciplineTag || "INTERACTIVE SOLUTION"}
                    </span>
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────
                    BACK FACE: Widescreen Cinema Video Card
                    ───────────────────────────────────────────────────── */}
                <div
                  className="absolute inset-0 w-full h-full flex flex-col items-center"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {/* Neon Cyan & Metallic Border Frame */}
                  <div className="relative w-full h-67.5 sm:h-72.5 md:h-77.5 rounded-2xl p-0.75 bg-linear-to-b from-[#00c8ff] via-white to-[#00c8ff]/60 shadow-[0_16px_50px_rgba(0,200,255,0.25)]">
                    <div className="relative w-full h-full rounded-[13px] overflow-hidden bg-black flex flex-col justify-between p-3 sm:p-4">
                      {/* Video Background */}
                      {videoSrc ? (
                        <video
                          src={getOptimizedVideoUrl(videoSrc, { width: 1080, quality: "good" })}
                          poster={getVideoPosterUrl(videoSrc, 1080)}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        />
                      ) : (
                        <div className="absolute inset-0 w-full h-full bg-neutral-900" />
                      )}

                      {/* Vignette Overlay for Readability */}
                      <div className="absolute inset-0 bg-linear-to-b from-black/85 via-transparent to-black/90 pointer-events-none" />

                      {/* Top Bar: Service Number Badge & Close Button */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest px-2.5 py-0.5 bg-black/85 border border-[#00c8ff]/50 text-[#00c8ff] font-bold">
                            {service.number ? `0${service.number}`.slice(-2) : `0${index + 1}`}
                          </span>
                          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest px-2.5 py-0.5 bg-black/85 border border-white/20 text-white/80 font-bold hidden sm:inline-block">
                            WIDESCREEN PREVIEW
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={handleClose}
                          aria-label="Close card"
                          className="px-3 py-1 sm:px-3.5 sm:py-1.5 bg-black/85 hover:bg-[#00c8ff] text-white hover:text-black border border-white/30 hover:border-[#00c8ff] text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-lg"
                        >
                          <span>CLOSE</span>
                          <span className="text-sm font-bold leading-none">✕</span>
                        </button>
                      </div>

                      {/* Bottom Bar: Direct Service Link CTA */}
                      <div className="relative z-10">
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="group/link w-full flex items-center justify-between p-2.5 sm:p-3 bg-black/90 hover:bg-[#00c8ff] text-white hover:text-black border border-white/30 hover:border-[#00c8ff] backdrop-blur-md transition-all duration-300 rounded-xl shadow-2xl cursor-pointer"
                        >
                          <div className="flex flex-col text-left min-w-0 pr-3">
                            <span className="text-[8px] sm:text-[9px] text-[#00c8ff] group-hover/link:text-black uppercase tracking-wider font-bold">
                              {service.disciplineTag || "INTERACTIVE SOLUTION"}
                            </span>
                            <span className="text-xs sm:text-sm font-black uppercase tracking-wider truncate">
                              {service.title} — EXPLORE SERVICE
                            </span>
                          </div>
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-current flex items-center justify-center shrink-0 group-hover/link:rotate-45 transition-transform">
                            <ArrowUpRightIcon className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-current" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Card Title & Metric details below */}
                  <div className="flex flex-col items-center text-center mt-3 gap-0.5 pointer-events-none select-none">
                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#00c8ff]">
                      {service.title}
                    </h3>
                    <span className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest font-semibold">
                      {service.badge || service.disciplineTag || "INTERACTIVE SOLUTION"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InteractiveCardsShowcase;
