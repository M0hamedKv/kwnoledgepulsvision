"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_MENU_ITEMS, STUDIO_SOCIAL_LINKS } from "@/constant";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  ArrowUpRightIcon,
} from "@/svgs";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide global footer on full-screen 3D spatial experience
  if (pathname === "/About") return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="KV Studio Footer"
      className="relative z-40 w-full bg-transparent text-white overflow-hidden"
    >
      {/* 2. MAIN 4-COLUMN FOOTER GRID */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Column 1: Brand & Studio Info (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <Link href="/" className="group inline-block">
                <span className="font-['BlauerNue',sans-serif] text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-[#00c8ff] transition-colors">
                  KV STUDIO
                </span>
              </Link>

              <p className="font-['Rubik',sans-serif] text-white/60 text-xs sm:text-sm leading-relaxed max-w-sm">
                Creative architecture, computational design, and cutting-edge visualization practice dedicated to transforming spatial ideas into kinetic realities.
              </p>

              {/* Direct Contacts */}
              <div className="flex flex-col gap-2 pt-4 border-t border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-white/40 uppercase">EMAIL:</span>
                  <a
                    href="mailto:info@knowledgeplusvision.in"
                    className="text-white hover:text-[#00c8ff] transition-colors"
                  >
                    info@knowledgeplusvision.in
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-white/40 uppercase">TEL:</span>
                  <div className="flex items-center gap-1.5 text-white">
                    <a href="tel:+201024865713" className="hover:text-[#00c8ff] transition-colors">
                      01024865713
                    </a>
                    <span className="text-white/30">•</span>
                    <a href="tel:+201025000659" className="hover:text-[#00c8ff] transition-colors">
                      01025000659
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1 text-white/60 font-sans text-xs">
                  <span className="font-mono text-white/40 uppercase shrink-0">STUDIO:</span>
                  <span>South Academy 5TH Settlement, Cairo, Egypt</span>
                </div>
              </div>
            </div>

            {/* Column 2: Navigation Directory (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#00c8ff]">
                DIRECTORY
              </span>

              <nav aria-label="Footer Navigation" className="flex flex-col gap-3">
                {DEFAULT_MENU_ITEMS.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="font-['BlauerNue',sans-serif] text-sm uppercase tracking-wider text-white/70 hover:text-[#00c8ff] transition-colors flex items-center justify-between group">
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Core Services (3 cols) */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#00c8ff]">
                SERVICES
              </span>

              <div className="flex flex-col gap-2.5 font-mono text-xs">
                <span className="text-[10px] text-white/40 uppercase tracking-widest pt-1">
                  INTERACTIVE SYSTEMS
                </span>
                <Link
                  href="/services/imaquette"
                  className="text-white/70 hover:text-[#00c8ff] transition-colors flex items-center justify-between"
                >
                  <span>iMaquette 3D Kiosk</span>
                  <span className="text-white/30 text-[10px]">01</span>
                </Link>
                <Link
                  href="/services/webdevelopment"
                  className="text-white/70 hover:text-[#00c8ff] transition-colors flex items-center justify-between"
                >
                  <span>Kinetic Web Architecture</span>
                  <span className="text-white/30 text-[10px]">02</span>
                </Link>
                <Link
                  href="/services/animation"
                  className="text-white/70 hover:text-[#00c8ff] transition-colors flex items-center justify-between"
                >
                  <span>Cinematic 3D Animation</span>
                  <span className="text-white/30 text-[10px]">03</span>
                </Link>
                <Link
                  href="/services/vr"
                  className="text-white/70 hover:text-[#00c8ff] transition-colors flex items-center justify-between"
                >
                  <span>Virtual Reality Tours</span>
                  <span className="text-white/30 text-[10px]">04</span>
                </Link>
                <Link
                  href="/services/community-app"
                  className="text-white/70 hover:text-[#00c8ff] transition-colors flex items-center justify-between"
                >
                  <span>PropTech Community App</span>
                  <span className="text-white/30 text-[10px]">05</span>
                </Link>

                <span className="text-[10px] text-white/40 uppercase tracking-widest pt-3 border-t border-white/5">
                  DESIGN & ENGINEERING
                </span>
                <Link
                  href="/services/bim"
                  className="text-white/70 hover:text-[#00c8ff] transition-colors flex items-center justify-between"
                >
                  <span>BIM & Digital Twin LOD 500</span>
                  <span className="text-white/30 text-[10px]">05</span>
                </Link>
                <Link
                  href="/services/mep"
                  className="text-white/70 hover:text-[#00c8ff] transition-colors flex items-center justify-between"
                >
                  <span>MEP Systems Coordination</span>
                  <span className="text-white/30 text-[10px]">06</span>
                </Link>
                <Link
                  href="/services/interior"
                  className="text-white/70 hover:text-[#00c8ff] transition-colors flex items-center justify-between"
                >
                  <span>Luxury Interior Architecture</span>
                  <span className="text-white/30 text-[10px]">07</span>
                </Link>
              </div>
            </div>

            {/* Column 4: Official Social Channels (3 cols) */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#00c8ff]">
                SOCIAL PRESENCE
              </span>

              <p className="font-['Rubik',sans-serif] text-xs text-white/60 leading-relaxed">
                Follow our behind-the-scenes architectural renders, real-time walkthroughs, and studio announcements:
              </p>

              <div className="flex flex-col gap-2.5">
                {STUDIO_SOCIAL_LINKS.map((social) => {
                  const Icon =
                    social.id === "instagram"
                      ? InstagramIcon
                      : social.id === "facebook"
                      ? FacebookIcon
                      : LinkedInIcon;

                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-[#00c8ff]/10 border border-white/10 hover:border-[#00c8ff]/40 transition-all duration-300"
                      aria-label={`${social.label} - ${social.handle}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#00c8ff] text-white/70 group-hover:text-black flex items-center justify-center transition-colors duration-300">
                          <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-['BlauerNue',sans-serif] font-bold text-xs text-white group-hover:text-[#00c8ff] transition-colors">
                            {social.label}
                          </span>
                          <span className="font-mono text-[10px] text-white/40 group-hover:text-white/70 transition-colors">
                            {social.handle}
                          </span>
                        </div>
                      </div>

                      <ArrowUpRightIcon className="w-3.5 h-3.5 text-white/30 group-hover:text-[#00c8ff] transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 3. SIGNATURE OVERSIZED BACKGROUND WATERMARK */}
      {/* <div
        className="w-full overflow-hidden select-none pointer-events-none py-6 border-b border-white/5 flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="font-['BlauerNue',sans-serif] text-[11vw] font-black uppercase tracking-tight text-white/2.5 whitespace-nowrap leading-none">
          KNOWLEDGEPLUS
        </span>
      </div> */}

      {/* 4. COLOPHON BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/40">
        <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
          <span>© {currentYear} KV STUDIO.</span>
          <span className="hidden sm:inline">•</span>
          <span>ALL RIGHTS RESERVED.</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-white/60">KNOWLEDGE PLUS VISION</span>
        </div>

        {/* Smooth Scroll To Top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 text-white/50 hover:text-[#00c8ff] transition-colors cursor-pointer uppercase tracking-wider text-[11px]"
          aria-label="Scroll to top of page"
        >
          <span>BACK TO TOP</span>
          <span className="transform transition-transform duration-300 group-hover:-translate-y-1 text-[#00c8ff]">
            ↑
          </span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
