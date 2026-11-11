import { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/components/services/servicesData";
import { InteractiveCardsShowcase } from "@/components/services";
import { ArrowRightIcon } from "@/svgs";

export const metadata: Metadata = {
  title: "INTERACTIVE SOLUTION — Real-Time 3D & Digital Flagships | KV STUDIO",
  description:
    "Explore KV Studio's specialized Interactive capabilities across iMaquette scale models, Creative Web Engineering, and Architectural Cinema Animation.",
};

export default function InteractiveSolutionServicesPage() {
  const allServices = getAllServices();
  const interactiveServices = allServices.filter(
    (s) => s.disciplineSlug === "interactive-solution"
  );

  const heroImageSrc = "/work/diva-1.png";

  return (
    <main className="w-full min-h-screen bg-black text-white selection:bg-[#00c8ff] selection:text-black">
      {/* =====================================================================
          1. FULL-BLEED IMAGE HERO — PURE IMAGE, CENTERED TITLE ONLY
          ===================================================================== */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden border-b border-white/10">
        {/* Full-bleed background image filling 100% of the Hero viewport */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src={heroImageSrc}
            alt="Interactive Solutions & Real-Time Experiences"
            className="w-full h-full object-cover scale-102"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10" />

        {/* Hero Title — Pure, Clean, Bold, Exactly in Center */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
          <h1 className="font-['BlauerNue',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] xl:text-[11rem] font-black uppercase tracking-tight leading-[0.85] text-white select-none drop-shadow-[0_10px_60px_rgba(0,0,0,0.95)]">
            INTERACTIVE SOLUTION
          </h1>
        </div>

        {/* Clean Scroll Indicator */}
        <div className="relative z-10 flex items-center justify-center">
          <a
            href="#interactive-catalog"
            className="font-mono text-xs uppercase tracking-[0.25em] text-white/60 hover:text-[#00c8ff] transition-colors flex items-center gap-2"
          >
            <span>EXPLORE INTERACTIVE PRACTICE</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* =====================================================================
          2. INTERACTIVE PRACTICE CATALOG (IMAQUETTE, WEB DEV, ANIMATION)
          ===================================================================== */}
      <section
        id="interactive-catalog"
        className="w-full py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-20 border-b border-white/10 relative bg-black scroll-mt-28"
      >
        <div className="max-w-[1700px] mx-auto flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
                01 // DIGITAL EXPERIENCES & 3D SYSTEMS
              </span>
              <h2 className="font-['BlauerNue',sans-serif] text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
                CORE SERVICES
              </h2>
            </div>
            <Link
              href="/services/design"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-[#00c8ff] transition-colors"
            >
              <span>SWITCH TO DESIGN</span>
              <ArrowRightIcon className="w-4 h-4 stroke-current" />
            </Link>
          </div>

          {/* 3D Trading Cards Deck with Rotate-To-Video Expansion (Matching Reference) */}
          <InteractiveCardsShowcase
            services={interactiveServices}
          />
        </div>
      </section>

      {/* =====================================================================
          3. CLEAN COMMISSION CTA — ZERO PARAGRAPHS
          ===================================================================== */}
      <section className="w-full py-20 px-6 sm:px-12 md:px-16 lg:px-20 relative overflow-hidden bg-black text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            COMMISSION INTERACTIVE
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/Contact"
              className="px-10 py-5 bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-black text-sm uppercase tracking-widest hover:bg-white transition-colors rounded-none shadow-2xl"
            >
              REQUEST A PROPOSAL
            </Link>

            <Link
              href="/services"
              className="px-8 py-5 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white/40 transition-colors rounded-none"
            >
              BROWSE ALL SERVICES
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

