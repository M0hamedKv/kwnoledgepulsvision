"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
            ? "bg-black/80 backdrop-blur-2xl border-b border-white/10 py-4 sm:py-5"
            : "bg-transparent py-6 sm:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-12 md:px-16 lg:px-20">
          {/* Brand Logo with Letter Completion Animation */}
          <BrandLogo />

          {/* Desktop Navigation Links (Visible on desktop, hidden on mobile) */}
          <nav
            aria-label="Desktop Navigation"
            className="hidden md:flex items-center gap-4 lg:gap-7 xl:gap-8"
          >
            {DEFAULT_MENU_ITEMS.map((item) => {
              const isExact = pathname === item.href;
              const isChild = item.href !== "/" && pathname.startsWith(item.href);
              const isActive = isExact || isChild;

              if (item.id === "contact") {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`px-4 py-2 border text-[11px] lg:text-xs font-bold uppercase tracking-wider lg:tracking-widest transition-all duration-300 rounded-none cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? "bg-[#00c8ff] text-black border-[#00c8ff] shadow-[0_0_20px_rgba(0,200,255,0.4)]"
                        : "border-white/20 text-white hover:border-[#00c8ff] hover:text-[#00c8ff] hover:bg-white/5"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px]">→</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative group text-[11px] lg:text-xs font-bold uppercase tracking-wider lg:tracking-widest transition-colors duration-200 py-1 ${
                    isActive ? "text-[#00c8ff]" : "text-white/70 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#00c8ff] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Morphing Hamburger-to-X Button (Visible on mobile, hidden on md+) */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            className="md:hidden group relative flex flex-col justify-center items-center gap-1.5 w-11 h-11 p-1.5 cursor-pointer transition-opacity hover:opacity-85 focus:outline-none pointer-events-auto"
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
      </header>

      {/* Full-Screen Animated Navigation Modal */}
      <HeroMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        logoText="KV STUDIO" menuItems={DEFAULT_MENU_ITEMS}      />
    </>
  );
};
