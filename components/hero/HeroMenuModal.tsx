"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { HeroMenuModalProps, MenuItem } from "./types";
import { ArrowRightIcon } from "@/svgs";

/**
 * HeroMenuModal
 * Single Responsibility: Full-screen black navigation overlay with smooth curtain drop/roll-up
 * and choreographed GSAP undulating wave animations for menu link characters.
 */
export const HeroMenuModal: React.FC<HeroMenuModalProps> = ({
  isOpen,
  onClose,
  menuItems,
  onNavigate,
}) => {
  const navRef = useRef<HTMLElement>(null);
  const isInitialMount = useRef(true);

  // Prevent background scroll and support ESC key when menu is open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Choreographed GSAP wave animation across characters on open and close
  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      const chars = navRef.current?.querySelectorAll(".menu-char");
      if (!chars || chars.length === 0) return;

      if (isInitialMount.current) {
        isInitialMount.current = false;
        if (!isOpen) {
          gsap.set(chars, {
            yPercent: 140,
            rotateZ: -12,
            skewX: 10,
            opacity: 0,
            filter: "blur(6px)",
          });
          return;
        }
      }

      if (isOpen) {
        // Master kinetic wave timeline
        const rows = navRef.current?.querySelectorAll(".menu-item-row");
        const waveTl = gsap.timeline({
          delay: 0.22, // Synchronized with curtain drop
        });

        rows?.forEach((row, rowIndex) => {
          const rowChars = row.querySelectorAll(".menu-char");
          if (!rowChars.length) return;

          waveTl.fromTo(
            rowChars,
            {
              yPercent: 140,
              rotateZ: -14,
              skewX: 12,
              opacity: 0,
              filter: "blur(6px)",
            },
            {
              keyframes: [
                {
                  // Wave Crest: leaps above baseline with forward tilt
                  yPercent: -22,
                  rotateZ: 4,
                  skewX: -4,
                  opacity: 1,
                  filter: "blur(0px)",
                  duration: 0.42,
                  ease: "power2.out",
                },
                {
                  // Wave Trough: dips softly
                  yPercent: 7,
                  rotateZ: -1.5,
                  skewX: 1.5,
                  duration: 0.22,
                  ease: "sine.inOut",
                },
                {
                  // Settles cleanly at resting position
                  yPercent: 0,
                  rotateZ: 0,
                  skewX: 0,
                  duration: 0.2,
                  ease: "power2.out",
                },
              ],
              stagger: {
                each: 0.026,
                from: "start",
              },
              clearProps: "transform,filter",
            },
            rowIndex === 0 ? 0 : "-=0.6" // Cascading wave overlap between lines
          );
        });
      } else {
        // Reverse wave exit: sweeps out swiftly from bottom to top
        gsap.to(chars, {
          yPercent: 120,
          rotateZ: -8,
          opacity: 0,
          filter: "blur(4px)",
          duration: 0.32,
          stagger: {
            each: 0.012,
            from: "end",
          },
          ease: "power3.in",
          overwrite: "auto",
        });
      }
    }, navRef);

    return () => {
      ctx.kill();
    };
  }, [isOpen]);

  // Splits label into words and characters to enable letter-by-letter kinetic wave motion
  const renderLetters = (text: string) => {
    const words = text.split(" ");
    return words.map((word, wordIdx) => (
      <span
        key={wordIdx}
        className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0"
      >
        {word.split("").map((char, charIdx) => (
          <span
            key={charIdx}
            className="menu-char inline-block will-change-transform"
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      className={`fixed inset-0 z-90 flex flex-col justify-between bg-background text-white select-none overflow-y-auto pt-28 sm:pt-36 pb-8 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform ${
        isOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"
      }`}
    >
      {/* Main Navigation Links */}
      <main className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20">
        <nav
          ref={navRef}
          aria-label="Main Menu"
          className="flex flex-col gap-2 sm:gap-2.5 md:gap-3"
        >
          {menuItems?.map((item: MenuItem, index: number) => {
            return (
              <div
                key={item.id}
                className="menu-item-row w-fit overflow-hidden pt-1 pb-1 -mt-0.5 pr-4 sm:pr-6"
              >
                <Link
                  href={item.href}
                  onClick={() => {
                    onClose();
                    onNavigate?.(item.href);
                  }}
                  className="group relative inline-block cursor-pointer select-none"
                >
                  {/* Rolling Container: Overflow hides sliding duplicate on hover */}
                  <div className="relative overflow-hidden pr-3 sm:pr-4">
                    {/* Layer 1: Initial Text with Wave Letters (rolls up on hover) */}
                    <div className="flex items-center gap-2.5 sm:gap-3.5 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      <span className="font-mono text-xs sm:text-sm text-white/30 mr-1 sm:mr-2">
                        0{index + 1}
                      </span>
                      <span
                        className={`block font-['BlauerNue',sans-serif] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight leading-[1.15] py-0.5 transition-colors duration-300 ${
                          item.isActive
                            ? "text-[#00c8ff]"
                            : "text-white/40 group-hover:text-white"
                        }`}
                      >
                        {renderLetters(item.label)}
                      </span>
                      {/* Hidden spacer to reserve exact width for the arrow without clipping */}
                      <span
                        className="opacity-0 pointer-events-none inline-block select-none"
                        aria-hidden="true"
                      >
                        <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-current" />
                      </span>
                    </div>

                    {/* Layer 2: Duplicate Text (rolls up from bottom into view on hover) */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center gap-2.5 sm:gap-3.5 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0 pointer-events-none">
                      <span className="font-mono text-xs sm:text-sm text-[#00c8ff]/60 mr-1 sm:mr-2">
                        0{index + 1}
                      </span>
                      <span className="block font-['BlauerNue',sans-serif] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight leading-[1.15] py-0.5 text-[#00c8ff]">
                        {item.label}
                      </span>

                      {/* Interactive Arrow gliding in */}
                      <span className="inline-block transform transition-transform duration-300 translate-x-0 group-hover:translate-x-1.5 text-[#00c8ff]">
                        <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-current" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </nav>
      </main>
    </div>
  );
};

