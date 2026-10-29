import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  PortfolioHero,
  PortfolioItem,
  PORTFOLIO_SHOWCASE_ITEMS,
} from "@/components/portfolio";

export const metadata: Metadata = {
  title: "Portfolio · Interactive 3D Real Estate Platforms | KV Studio",
  description:
    "Explore our production proptech portfolio. Real-time CRM inventory sync, interactive 3D compound masterplans, dynamic facade elevations, and smart unit search engines.",
};

export default function PortfolioPage() {
  return (
    <main className="w-full bg-background text-white selection:bg-[#00c8ff] selection:text-black overflow-hidden relative">
      {/* Ambient background atmosphere matching the KV blueprint in screenshot */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-250 h-250 bg-[#00c8ff]/[0.035] rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-150 h-150 bg-purple-600/3 rounded-full blur-[180px] pointer-events-none" />

      {/* 1. Portfolio Hero Section */}
      <PortfolioHero />

      {/* 2. Alternating Showcase Items (صورة وكلام ثم كلام وصورة مع أنيميشن التوسع بالعرض من الصفر) */}
      <section className="relative w-full px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto flex flex-col">
        {PORTFOLIO_SHOWCASE_ITEMS.map((item, index) => (
          <PortfolioItem
            key={item.id}
            item={item}
            isReversed={index % 2 === 1}
          />
        ))}
      </section>

      {/* 3. Bottom Call To Action Banner */}
      <section className="relative w-full py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 bg-background">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#00c8ff] px-3.5 py-1.5 bg-[#00c8ff]/10 border border-[#00c8ff]/30">
            [ NEXT GENERATION PROPTECH ]
          </span>

          <h2 className="font-['BlauerNue',sans-serif] text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            READY TO ELEVATE YOUR <span className="text-[#00c8ff]">SALES PLATFORM</span>?
          </h2>

          <p className="font-['Rubik',sans-serif] text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed">
            Partner with KV Studio to architect custom real-time 3D masterplans, live CRM inventory engines, and immersive interactive showrooms.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/Contact"
              className="px-8 py-4 rounded-xl font-['BlauerNue',sans-serif] font-black tracking-widest uppercase text-xs sm:text-sm text-black bg-white hover:bg-[#00c8ff] hover:shadow-[0_0_30px_rgba(0,200,255,0.4)] transition-all duration-300"
            >
              START A PROJECT →
            </Link>
            <Link
              href="/work"
              className="px-8 py-4 rounded-xl font-mono tracking-wider uppercase text-xs sm:text-sm text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              EXPLORE CASE STUDIES
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}