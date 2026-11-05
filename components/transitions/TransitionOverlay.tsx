"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePageTransition } from "./TransitionContext";

/**
 * TransitionOverlay
 * Architectural Blue Slats Page Transition.
 * 5 vertical monolithic columns in electric royal blue drop sequentially to cover the viewport,
 * and then drop out of view to reveal the new page.
 */
export const TransitionOverlay: React.FC = () => {
  const { registerOverlayControls } = usePageTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial hidden state
    if (containerRef.current) {
      const slats = containerRef.current.querySelectorAll(".trans-slat");
      gsap.set(slats, { yPercent: -100 });
      gsap.set(containerRef.current, { display: "none", pointerEvents: "none" });
    }

    // Register transition animation controls
    registerOverlayControls({
      playIn: async () => {
        return new Promise<void>((resolve) => {
          if (!containerRef.current) return resolve();
          const slats = containerRef.current.querySelectorAll(".trans-slat");

          gsap.set(containerRef.current, { display: "flex", pointerEvents: "auto" });
          gsap.killTweensOf(slats);

          gsap.fromTo(
            slats,
            { yPercent: -100 },
            {
              yPercent: 0,
              duration: 0.42,
              stagger: 0.045,
              ease: "power3.inOut",
              onComplete: () => resolve(),
            }
          );
        });
      },

      playOut: async () => {
        return new Promise<void>((resolve) => {
          if (!containerRef.current) return resolve();
          const slats = containerRef.current.querySelectorAll(".trans-slat");

          gsap.killTweensOf(slats);

          gsap.to(slats, {
            yPercent: 100,
            duration: 0.42,
            stagger: 0.045,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(slats, { yPercent: -100 });
              gsap.set(containerRef.current, {
                display: "none",
                pointerEvents: "none",
              });
              resolve();
            },
          });
        });
      },
    });

    return () => {
      registerOverlayControls(null);
    };
  }, [registerOverlayControls]);

  return (
    <div ref={containerRef} style={{ zIndex: 999999, display: "none" }}
      className="fixed inset-0 pointer-events-none flex flex-row w-full h-full overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="trans-slat w-[10.1%] -mr-px h-full bg-[#051542] border-r border-[#00c8ff]/30" />
      <div className="trans-slat w-[10.1%] -mr-px h-full bg-[#0d2358] border-r border-[#00c8ff]/30" />
      <div className="trans-slat w-[10.1%] -mr-px h-full bg-[#051542] border-r border-[#00c8ff]/30" />
      <div className="trans-slat w-[10.1%] -mr-px h-full bg-[#0d2358] border-r border-[#00c8ff]/30" />
      <div className="trans-slat w-[10.1%] -mr-px h-full bg-[#051542] border-r border-[#00c8ff]/30" />
      <div className="trans-slat w-[10.1%] -mr-px h-full bg-[#0d2358] border-r border-[#00c8ff]/30" />
      <div className="trans-slat w-[10.1%] -mr-px h-full bg-[#051542] border-r border-[#00c8ff]/30" />
      <div className="trans-slat w-[10.1%] -mr-px h-full bg-[#0d2358] border-r border-[#00c8ff]/30" />
      <div className="trans-slat w-[10.1%] -mr-px h-full bg-[#051542] border-r border-[#00c8ff]/30" />
      <div className="trans-slat w-[10.1%] h-full bg-[#0d2358]" />
    </div>
  );
};
