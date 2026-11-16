import { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/components/services/servicesData";
import { InteractiveCardsShowcase, InteractiveSolutionHero } from "@/components/services";
import { ArrowRightIcon } from "@/svgs";
import { AmbientSpotlights } from "@/components/ui";

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

  return (
    <main className="w-full min-h-screen bg-black text-white selection:bg-[#00c8ff] selection:text-black">
      {/* =====================================================================
          1. REAL-TIME INTERACTIVE HERO — LIVE 3D CANVAS & HUMAN INTERACTION VIDEO
          ===================================================================== */}
      <InteractiveSolutionHero />

      {/* =====================================================================
          2. INTERACTIVE PRACTICE CATALOG (IMAQUETTE, WEB DEV, ANIMATION)
          ===================================================================== */}
      <section
        id="interactive-catalog"
        className="w-full pt-16 relative bg-black scroll-mt-28"
      >
        <div className=" mx-auto flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 px-12">
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
        {/* Signature Architectural Dual Blue Spotlights */}
        <AmbientSpotlights />

        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
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

