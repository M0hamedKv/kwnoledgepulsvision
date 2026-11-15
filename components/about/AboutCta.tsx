import React from "react";
import Link from "next/link";

export const AboutCta: React.FC = () => {
  return (
    <section className="relative w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-20 border-b border-white/10 bg-transparent overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
          READY TO SHAPE THE <span className="text-[#00c8ff]">FUTURE</span> OF YOUR PROJECT?
        </h2>

        <p className="text-white/70 text-base sm:text-xl max-w-2xl leading-relaxed">
          Whether you are launching an off-plan residential community, commercial tower, or digital sales gallery — partner with KV Studio to bring your spatial vision to life.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/portfolio"
            className="px-8 sm:px-10 py-4 sm:py-5 bg-[#00c8ff] hover:bg-white text-black font-black uppercase text-xs sm:text-sm tracking-widest transition-all shadow-2xl rounded-none inline-flex items-center justify-center"
          >
            VIEW OUR PROJECTS →
          </Link>
          <Link
            href="/Contact"
            className="px-8 sm:px-10 py-4 sm:py-5 border border-white/20 hover:border-white/40 text-white font-black uppercase text-xs sm:text-sm tracking-widest hover:text-white transition-colors rounded-none inline-flex items-center justify-center"
          >
            GET IN TOUCH
          </Link>
        </div>
      </div>
    </section>
  );
};
