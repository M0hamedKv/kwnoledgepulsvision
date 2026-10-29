"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

interface BrandLogoProps {
  className?: string;
  text?: string;
}

/**
 * BrandLogo
 * Single Responsibility: Clean, typographic logo for KV STUDIO.
 * Animation: "Letter Completion" (طريقة الحرف اللي بيكتمل)
 * - The letters first appear as a refined architectural blueprint outline skeleton.
 * - Progressively, each letter fills and completes itself from left-to-right (K -> V -> S -> T -> U -> D -> I -> O).
 * - Settles into pure, crisp solid white text.
 * - Zero hover animation, zero extra clutter, zero extra text or icons.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
  text = "KV STUDIO",
}) => {
  const containerRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const outlines = containerRef.current?.querySelectorAll(".logo-char-outline");
      const solids = containerRef.current?.querySelectorAll(".logo-char-solid");

      if (!outlines || !solids || outlines.length === 0) return;

      // Initial State:
      // Outline starts as architectural skeleton
      gsap.set(outlines, { opacity: 0, scale: 0.97 });
      // Solid letters start fully clipped (to complete sequentially)
      gsap.set(solids, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 1,
      });

      const tl = gsap.timeline({ delay: 0.25 });

      // 1. Blueprint outline skeleton appears
      tl.to(outlines, {
        opacity: 0.5,
        scale: 1,
        duration: 0.35,
        stagger: 0.02,
        ease: "power2.out",
      });

      // 2. Each letter completes itself by drawing/filling solid across its shape
      solids.forEach((solidChar, i) => {
        tl.to(
          solidChar,
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.26,
            ease: "power2.inOut",
          },
          i === 0 ? "+=0.08" : "-=0.12"
        );
      });

      // 3. Smoothly fade the underlying outline once all letters are 100% complete
      tl.to(
        outlines,
        {
          opacity: 0,
          duration: 0.25,
          ease: "power1.out",
        },
        "-=0.1"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const words = text.split(" ");

  return (
    <Link
      ref={containerRef}
      href="/"
      className={`inline-flex items-center font-['BlauerNue'] font-black text-sm sm:text-base tracking-[0.28em] uppercase text-white focus:outline-none select-none py-1 ${className}`}
      aria-label={`${text} Home`}
    >
      <span className="flex items-center gap-2">
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="inline-flex whitespace-nowrap">
            {word.split("").map((char, charIdx) => (
              <span
                key={charIdx}
                className="relative inline-block overflow-hidden"
              >
                {/* 1. Hollow Outline Skeleton (Blueprint layer) */}
                <span
                  className="logo-char-outline block select-none"
                  style={{
                    WebkitTextStroke: "1px rgba(255, 255, 255, 0.65)",
                    color: "transparent",
                  }}
                >
                  {char}
                </span>

                {/* 2. Solid Fill Layer (Draws across and completes the letter) */}
                <span className="logo-char-solid absolute inset-0 block text-white font-black select-none pointer-events-none will-change-[clip-path]">
                  {char}
                </span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </Link>
  );
};
