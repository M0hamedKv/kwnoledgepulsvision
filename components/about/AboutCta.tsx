import React from "react";
import Link from "next/link";

export const AboutCta: React.FC = () => {
  return (
    <section className="relative w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-20 border-b border-white/10 bg-black overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#00c8ff]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#00c8ff] px-3.5 py-1.5 bg-[#00c8ff]/10 border border-[#00c8ff]/30 shadow-[0_0_15px_rgba(0,200,255,0.15)]">
          [ COMMISSIONS & PARTNERSHIPS ]
        </span>

        <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
          READY TO SHAPE THE <span className="text-[#00c8ff]">FUTURE</span> OF YOUR PROJECT?
        </h2>

        <p className="font-['Rubik',sans-serif] text-white/70 text-base sm:text-xl max-w-2xl leading-relaxed">
          Whether you are launching an off-plan residential community, commercial tower, or digital sales gallery — partner with KV Studio to bring your spatial vision to life.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/portfolio"
            className="px-8 py-4 bg-[#00c8ff] hover:bg-[#00c8ff]/90 text-black font-['BlauerNue',sans-serif] font-black uppercase text-xs sm:text-sm tracking-wider transition-all shadow-[0_0_30px_rgba(0,200,255,0.4)] hover:shadow-[0_0_45px_rgba(0,200,255,0.6)]"
          >
            VIEW OUR PROJECTS →
          </Link>
          <Link
            href="/Contact"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono uppercase text-xs sm:text-sm tracking-wider transition-colors"
          >
            GET IN TOUCH
          </Link>
        </div>
      </div>
    </section>
  );
};
