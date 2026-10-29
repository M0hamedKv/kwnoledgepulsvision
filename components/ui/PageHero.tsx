"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export interface HeroAnchor {
  label: string;
  targetId?: string;
  href?: string;
  icon?: string;
  number?: string;
  accentColor?: string;
}

export interface PageHeroProps {
  eyebrow: {
    tag: string;
    subtitle?: string;
    statusColor?: string;
  };
  metaBadge?: {
    primaryText: string;
    secondaryText?: string;
    metricText?: string;
    dotColor?: string;
  };
  headline: {
    line1: string;
    line2?: string;
    highlightWord?: string;
    gradientText?: boolean;
  };
  subheadline?: {
    text: string;
    mutedText?: string;
  };
  description: string;
  anchorsLabel?: string;
  anchors?: HeroAnchor[];
  scrollCueText?: string;
  theme?: "cyan" | "lime" | "dual" | "terracotta" | "white";
  className?: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  metaBadge,
  headline,
  subheadline,
  description,
  anchorsLabel,
  anchors,
  scrollCueText,
  theme = "cyan",
  className = "",
  children,
}) => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Initial States
      gsap.set(".page-hero-glow", { scale: 0.75, opacity: 0 });
      gsap.set(".page-hero-grid", { opacity: 0 });
      gsap.set(".page-hero-laser", { scaleX: 0, opacity: 0 });
      gsap.set(".page-hero-meta", { y: -15, opacity: 0 });
      gsap.set(".page-hero-eyebrow", { y: 20, opacity: 0 });
      gsap.set(".page-hero-line", { yPercent: 115, opacity: 0 });
      gsap.set(".page-hero-subheadline", { y: 20, opacity: 0 });
      gsap.set(".page-hero-desc", { y: 24, opacity: 0 });
      gsap.set(".page-hero-divider", { scaleX: 0 });
      gsap.set(".page-hero-anchor", { y: 18, opacity: 0, scale: 0.94 });
      gsap.set(".page-hero-scroll", { y: 12, opacity: 0 });

      // 1. Atmosphere Bloom
      tl.to(".page-hero-glow", {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: "power2.out",
      }, 0);

      tl.to(".page-hero-grid", {
        opacity: 0.035,
        duration: 1.2,
        ease: "power2.out",
      }, 0.1);

      // 2. Blueprint Laser Sweep
      tl.to(".page-hero-laser", {
        scaleX: 1,
        opacity: 1,
        duration: 1.1,
        ease: "power3.inOut",
      }, 0.15);

      tl.to(".page-hero-laser", {
        opacity: 0.25,
        duration: 0.8,
        ease: "power2.out",
      }, 1.2);

      // 3. Eyebrow Tag & Top Metadata
      tl.to(".page-hero-meta", {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      }, 0.2);

      tl.to(".page-hero-eyebrow", {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
      }, 0.25);

      // 4. Headline Lines Reveal (Masked vertical rise)
      tl.to(".page-hero-line", {
        yPercent: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.12,
        ease: "power4.out",
      }, 0.35);

      // 5. Subheadline (if provided)
      if (subheadline) {
        tl.to(".page-hero-subheadline", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }, 0.62);
      }

      // 6. Manifesto Divider & Paragraph
      tl.to(".page-hero-divider", {
        scaleX: 1,
        duration: 0.9,
        ease: "power3.out",
      }, subheadline ? 0.7 : 0.55);

      tl.to(".page-hero-desc", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }, subheadline ? 0.75 : 0.6);

      // 7. Anchors Pop
      if (anchors && anchors.length > 0) {
        tl.to(".page-hero-anchor", {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "back.out(1.7)",
        }, subheadline ? 0.85 : 0.72);
      }

      // 8. Scroll Cue
      if (scrollCueText) {
        tl.to(".page-hero-scroll", {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
        }, 1.05);
      }
    }, heroRef);

    return () => ctx.revert();
  }, [subheadline, anchors, scrollCueText]);

  const handleAnchorClick = (anchor: HeroAnchor) => {
    if (anchor.targetId) {
      const el = document.getElementById(anchor.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    if (anchor.href) {
      window.location.href = anchor.href;
    }
  };

  const accentHex =
    eyebrow.statusColor ||
    (theme === "cyan" || theme === "lime"
      ? "#00c8ff"
      : theme === "terracotta"
      ? "#b85d38"
      : "#ffffff");

  return (
    <section
      ref={heroRef}
      className={`relative w-full pt-32 sm:pt-40 md:pt-44 pb-14 sm:pb-20 px-6 sm:px-12 md:px-16 lg:px-20 border-b border-white/10 overflow-hidden ${className}`}
    >
      {/* ================= ATMOSPHERIC GLOWS ================= */}
      {(theme === "cyan" || theme === "lime") && (
        <div className="page-hero-glow absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(0,200,255,0.08),rgba(0,0,0,0))] pointer-events-none" />
      )}
      {theme === "terracotta" && (
        <div className="page-hero-glow absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(184,93,56,0.1),rgba(0,0,0,0))] pointer-events-none" />
      )}
      {theme === "dual" && (
        <>
          <div
            className="page-hero-glow absolute -top-32 left-1/4 w-125 h-125 rounded-full bg-[#b85d38]/12 blur-[130px] pointer-events-none will-change-transform"
            aria-hidden="true"
          />
          <div
            className="page-hero-glow absolute top-1/3 right-10 w-112.5 h-112.5 rounded-full bg-[#00c8ff]/8 blur-[140px] pointer-events-none will-change-transform"
            aria-hidden="true"
          />
        </>
      )}
      {theme === "white" && (
        <div className="page-hero-glow absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(255,255,255,0.04),rgba(0,0,0,0))] pointer-events-none" />
      )}

      {/* Blueprint Grid Overlay */}
      <div
        className="page-hero-grid absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Blueprint Laser Sweep Line */}
      <div
        className="page-hero-laser absolute top-0 left-0 right-0 h-px origin-left pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentHex}, transparent)`,
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-6 relative z-10">
        {/* ================= TOP STATUS & EYEBROW ROW ================= */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="page-hero-eyebrow flex flex-wrap items-center gap-3 will-change-transform">
            <span
              className="font-mono text-xs font-bold uppercase tracking-[0.25em] px-3.5 py-1.5 border flex items-center gap-2"
              style={{
                color: accentHex,
                backgroundColor: `${accentHex}15`,
                borderColor: `${accentHex}40`,
                boxShadow: `0 0 15px ${accentHex}25`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-ping"
                style={{ backgroundColor: accentHex }}
              />
              {eyebrow.tag}
            </span>
            {eyebrow.subtitle && (
              <span className="font-mono text-xs text-white/40 tracking-wider">
                {eyebrow.subtitle}
              </span>
            )}
          </div>

          {/* High-Tech HUD Stamp (desktop) */}
          {metaBadge && (
            <div className="page-hero-meta hidden md:flex items-center gap-3 text-[11px] font-mono text-white/40 tracking-wider will-change-transform">
              <span className="flex items-center gap-2 px-3 py-1 rounded bg-black/50 border border-white/10 backdrop-blur-md">
                <span
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                    metaBadge.dotColor || "bg-emerald-400"
                  }`}
                />
                <span className="text-white/80 font-bold">
                  {metaBadge.primaryText}
                </span>
                {metaBadge.secondaryText && (
                  <span className="text-white/40">
                    // {metaBadge.secondaryText}
                  </span>
                )}
              </span>
              {metaBadge.metricText && (
                <>
                  <span className="text-white/30">•</span>
                  <span>{metaBadge.metricText}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* ================= BIG BOLD HEADLINE (Masked Line Reveal) ================= */}
        <div className="flex flex-col gap-4 max-w-5xl">
          <div className="flex flex-col gap-1 sm:gap-2">
            <div className="overflow-hidden py-0.5">
              <h1 className="page-hero-line font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-black uppercase tracking-tight leading-[0.96] text-white will-change-transform">
                {headline.line1}
              </h1>
            </div>

            {headline.line2 && (
              <div className="overflow-hidden py-0.5">
                <h1 className="page-hero-line font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-black uppercase tracking-tight leading-[0.96] will-change-transform">
                  {headline.highlightWord && headline.line2.includes(headline.highlightWord) ? (
                    <>
                      {headline.line2.split(headline.highlightWord)[0]}
                      <span
                        className={
                          headline.gradientText
                            ? "text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-white/40"
                            : "text-white/30"
                        }
                      >
                        {headline.highlightWord}
                      </span>
                      {headline.line2.split(headline.highlightWord)[1]}
                    </>
                  ) : (
                    <span className="text-white">{headline.line2}</span>
                  )}
                </h1>
              </div>
            )}
          </div>

          {/* Subheadline / Core Proposition (optional) */}
          {subheadline && (
            <div className="overflow-hidden py-1">
              <p className="page-hero-subheadline font-['BlauerNue',sans-serif] text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-white/90 will-change-transform">
                {subheadline.text}{" "}
                {subheadline.mutedText && (
                  <span className="text-white/40">{subheadline.mutedText}</span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* ================= MANIFESTO / DESCRIPTION & QUICK ANCHORS ================= */}
        <div className="relative pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Animated Accent Divider Line */}
          <div className="page-hero-divider absolute top-0 left-0 right-0 h-px bg-white/10 origin-left" />

          <div className={anchors && anchors.length > 0 ? "lg:col-span-7" : "lg:col-span-10"}>
            <p className="page-hero-desc font-['Rubik',sans-serif] text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl will-change-transform">
              {description}
            </p>
          </div>

          {/* Quick Jump Anchors / Capability Pills */}
          {anchors && anchors.length > 0 && (
            <div className="lg:col-span-5 flex flex-wrap items-center gap-2.5">
              {anchorsLabel && (
                <span className="page-hero-desc text-xs font-mono text-white/40 uppercase tracking-wider mr-2 will-change-transform">
                  {anchorsLabel}
                </span>
              )}
              {anchors.map((anchor, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAnchorClick(anchor)}
                  className="page-hero-anchor group flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/40 text-white/80 hover:text-white transition-all duration-300 will-change-transform shadow-[0_2px_10px_rgba(0,0,0,0.5)] cursor-pointer"
                  style={{
                    borderColor: anchor.accentColor ? `${anchor.accentColor}30` : undefined,
                  }}
                >
                  {anchor.number && (
                    <span
                      className="font-bold"
                      style={{ color: anchor.accentColor || accentHex }}
                    >
                      {anchor.number}
                    </span>
                  )}
                  {anchor.icon && (
                    <span className="text-xs group-hover:scale-110 transition-transform duration-300">
                      {anchor.icon}
                    </span>
                  )}
                  <span>{anchor.label}</span>
                  <span
                    className="text-[10px] text-white/30 group-hover:translate-y-0.5 transition-all"
                    style={{ color: anchor.accentColor || undefined }}
                  >
                    ↓
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scroll Cue Indicator (optional) */}
        {scrollCueText && (
          <div className="page-hero-scroll pt-2 flex items-center gap-3 text-xs font-mono text-white/40 will-change-transform">
            <span className="w-8 h-px bg-white/20" />
            <span className="tracking-widest uppercase text-[10px] text-white/50">
              {scrollCueText}
            </span>
            <span
              className="w-4 h-4 rounded-full border text-[10px] flex items-center justify-center animate-bounce"
              style={{
                borderColor: `${accentHex}40`,
                color: accentHex,
              }}
            >
              ↓
            </span>
          </div>
        )}

        {/* Children slot for extra custom content */}
        {children}
      </div>
    </section>
  );
};
