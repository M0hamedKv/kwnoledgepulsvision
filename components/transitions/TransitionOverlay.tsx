"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePageTransition } from "./TransitionContext";

export function getPageTitle(href: string): string {
  if (!href || href === "/" || href === "/#") return "KV STUDIO";

  const clean = href.split("?")[0].split("#")[0].replace(/^\/|\/$/g, "");
  if (!clean) return "KV STUDIO";

  const lower = clean.toLowerCase();

  const titles: Record<string, string> = {
    about: "ABOUT",
    contact: "CONTACT",
    joinus: "JOIN US",
    services: "SERVICES",
    "services/interactive-solution": "INTERACTIVE SOLUTIONS",
    "services/design": "DESIGN SERVICES",
    "services/imaquette": "IMAQUETTE",
    "services/realestate-website": "REAL ESTATE WEB",
    "services/webdevelopment": "WEB DEVELOPMENT",
    "services/animation": "ANIMATION",
    "services/vr": "VR",
    "services/community-app": "COMMUNITY APP",
    "services/bim": "BIM & SCAN TO BIM",
    "services/mep": "MEP ENGINEERING",
    "services/interior": "INTERIOR",
  };

  if (titles[lower]) {
    return titles[lower];
  }

  // Handle interior sub-projects or dynamic slugs
  const segments = clean.split("/");
  const last = segments[segments.length - 1];
  return decodeURIComponent(last).replace(/[-_]/g, " ").toUpperCase();
}

/**
 * TransitionOverlay
 * Architectural Minimal Gray Transition with Center Page Name & Gentle Fade Out.
 * Replaces the previous curtain slats with a sophisticated gray background,
 * centered page title, and silky smooth fade out.
 */
export const TransitionOverlay: React.FC = () => {
  const { registerOverlayControls } = usePageTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [pageTitle, setPageTitle] = useState("KV STUDIO");

  useEffect(() => {
    // Initial hidden state
    if (containerRef.current) {
      gsap.set(containerRef.current, {
        opacity: 0,
        display: "none",
        pointerEvents: "none",
      });
    }

    // Register transition animation controls
    registerOverlayControls({
      playIn: async (href?: string) => {
        return new Promise<void>((resolve) => {
          if (!containerRef.current) return resolve();

          const title = getPageTitle(href || "");
          setPageTitle(title);

          gsap.killTweensOf(containerRef.current);
          if (contentRef.current) gsap.killTweensOf(contentRef.current);

          gsap.set(containerRef.current, {
            display: "flex",
            opacity: 0,
            pointerEvents: "auto",
          });

          if (contentRef.current) {
            gsap.set(contentRef.current, { opacity: 0, x: 25, y: 0 });
          }

          const tl = gsap.timeline({
            onComplete: () => resolve(),
          });

          // Smooth gray overlay fade in
          tl.to(containerRef.current, {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          }).to(
            contentRef.current,
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.38,
              ease: "power2.out",
            },
            "-=0.2"
          );
        });
      },

      playOut: async () => {
        return new Promise<void>((resolve) => {
          if (!containerRef.current) return resolve();

          gsap.killTweensOf(containerRef.current);
          if (contentRef.current) gsap.killTweensOf(contentRef.current);

          const tl = gsap.timeline({
            onComplete: () => {
              gsap.set(containerRef.current, {
                display: "none",
                pointerEvents: "none",
                opacity: 0,
              });
              if (contentRef.current) {
                gsap.set(contentRef.current, { x: 0, y: 0, opacity: 0 });
              }
              resolve();
            },
          });

          // Gentle fade out of the text drifting towards the left
          tl.to(contentRef.current, {
            opacity: 0,
            x: -45,
            duration: 0.45,
            ease: "power2.inOut",
          }).to(
            containerRef.current,
            {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            "-=0.25"
          );
        });
      },
    });

    return () => {
      registerOverlayControls(null);
    };
  }, [registerOverlayControls]);

  return (
    <div
      ref={containerRef}
      style={{ zIndex: 999999, display: "none" }}
      className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center w-full h-full bg-[#1c1c20] text-white select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Centered Page Name with gentle subtle branding */}
      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center text-center px-6 max-w-4xl"
      >
        <span className="font-mono text-xs uppercase tracking-[0.32em] text-[#00c8ff] mb-4 font-bold">
          KV STUDIO
        </span>
        <h2 className="font-['BlauerNue',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-none drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          {pageTitle}
        </h2>
      </div>
    </div>
  );
};
