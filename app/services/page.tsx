import { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/components/services/servicesData";
import { ServicesHero, ServicesCatalogGrid, DesignAccordionShowcase } from "@/components/services";

export const metadata: Metadata = {
  title: "Services & Core Disciplines — KV STUDIO",
  description:
    "Explore KV Studio's specialized capabilities across Interactive Real-Time Solutions and Architectural Engineering Design.",
};

export default function ServicesPage() {
  const allServices = getAllServices();
  const interactiveServices = allServices.filter((s) => s.disciplineSlug === "interactive-solution");
  const designServices = allServices.filter((s) => s.disciplineSlug === "design");

  return (
    <main className="w-full min-h-screen bg-transparent text-white selection:bg-[#00c8ff] selection:text-black">
      {/* Animated Services Hero Section */}
      <ServicesHero />

      {/* DISCIPLINE 1: INTERACTIVE SOLUTION (5 SERVICES) */}
      <section id="interactive-solutions"
        className="w-full py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-20 border-b border-white/10 relative scroll-mt-28">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Discipline Category Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
                01 / INTERACTIVE PRACTICE
              </span>
              <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mt-3">
                INTERACTIVE SOLUTION
              </h2>
            </div>
          </div>

          {/* 5 Interactive Services Animated Grid */}
          <ServicesCatalogGrid
            services={interactiveServices}
            accentColor="#00c8ff"
            gridCols="3"
          />
        </div>
      </section>

      {/* DISCIPLINE 2: DESIGN (3 SERVICES) */}
      <section
        id="design-discipline"
        className="w-full py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-20 border-b border-white/10 relative bg-transparent scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Discipline Category Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
                02 / ARCHITECTURAL ATELIER
              </span>
              <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mt-3">
                DESIGN
              </h2>
            </div>
          </div>

          {/* Expanding Horizontal Design Accordion Showcase */}
          <DesignAccordionShowcase
            services={designServices}
            accentColor="#00c8ff"
          />
        </div>
      </section>

      {/* MASTER CONSULTATION CTA */}
      <section className="w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
            COMMISSION YOUR PROJECT
          </span>

          <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            SHAPE YOUR NEXT LANDMARK WITH KV STUDIO
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <Link
              href="/Contact"
              className="px-8 py-4 bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-black text-sm uppercase tracking-widest hover:bg-white transition-colors"
            >
              DISCUSS YOUR PROJECT
            </Link>

            <Link href="/" className="px-8 py-4 border border-white/15 text-white font-mono text-xs uppercase tracking-widest hover:border-white/40 transition-colors" >
              BACK TO HOME
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
