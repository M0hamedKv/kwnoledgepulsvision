"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { HeroMenuModal } from "@/components/hero/HeroMenuModal";
import { DEFAULT_MENU_ITEMS } from "@/constant";

import { BrandLogo } from "./BrandLogo";

export const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Smart Scroll Direction Listener (Hide on scroll down, show on scroll up)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // When near the top, always show navbar and make background transparent
      if (currentScrollY <= 20) {
        setIsVisible(true);
        setIsScrolled(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      setIsScrolled(true);

      // If menu modal is open, always keep navbar visible
      if (isMenuOpen) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Scrolling Down -> Hide Navbar (with minimum threshold to avoid micro-jitter)
      if (currentScrollY > lastScrollY.current + 8 && currentScrollY > 70) {
        setIsVisible(false);
      }
      // Scrolling Up -> Show Navbar
      else if (currentScrollY < lastScrollY.current - 8) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-9999 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "translate-y-0" : "-translate-y-full pointer-events-none"
        } ${
          isScrolled || isMenuOpen
            ? "bg-background backdrop-blur-2xl  py-4 sm:py-5"
            : "bg-transparent py-6 sm:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-12 md:px-16 lg:px-20">
          {/* Brand Logo with Letter Completion Animation */}
          <BrandLogo />

          {/* Right Navigation & Morphing Hamburger Button */}
          <div className="flex items-center gap-6 sm:gap-8">
            {/* Quick Links on Desktop */}
            {/* <div className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-white/70">
              <Link
                href="/About"
                className={`hover:text-white transition-colors ${
                  pathname === "/About" ? "text-[#00c8ff] font-bold" : ""
                }`}
              >
                ABOUT
              </Link>
            </div> */}

            {/* Morphing Hamburger-to-X Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              className="group relative flex flex-col justify-center items-center gap-1.5 w-11 h-11 p-1.5 cursor-pointer transition-opacity hover:opacity-85 focus:outline-none pointer-events-auto"
            >
              {/* Top bar */}
              <span
                className={`h-0.5 bg-white rounded-full transition-all duration-300 ease-out origin-center ${
                  isMenuOpen
                    ? "w-7 translate-y-2 rotate-45 bg-[#00c8ff]"
                    : "w-8 group-hover:w-8"
                }`}
              />

              {/* Middle bar */}
              <span
                className={`h-0.5 bg-white rounded-full transition-all duration-200 ease-out ${
                  isMenuOpen
                    ? "w-0 opacity-0 scale-x-0"
                    : "w-6 group-hover:w-8 opacity-100"
                }`}
              />

              {/* Bottom bar */}
              <span
                className={`h-0.5 bg-white rounded-full transition-all duration-300 ease-out origin-center ${
                  isMenuOpen
                    ? "w-7 -translate-y-2 -rotate-45 bg-[#00c8ff]"
                    : "w-4 group-hover:w-8"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Navigation Modal */}
      <HeroMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        logoText="KV STUDIO" menuItems={DEFAULT_MENU_ITEMS}      />
    </>
  );
};
