import React from "react";
import Link from "next/link";

interface SpecializationItem {
  id: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  accentColor: string;
  deliverables: string[];
}

const SPECIALIZATIONS: SpecializationItem[] = [
  {
    id: "architecture",
    number: "01",
    title: "ARCHITECTURAL DESIGN",
    tag: "SPATIAL SYSTEMS",
    description:
      "From residential luxury estates to commercial flagships and masterplanned developments. We synthesize functional program requirements into timeless structural volumes.",
    accentColor: "#00c8ff",
    deliverables: [
      "Masterplanning & Zoning",
      "Concept to Construction Drawings",
      "Parametric Envelope Optimization",
    ],
  },
  {
    id: "interior",
    number: "02",
    title: "INTERIOR DESIGN",
    tag: "CURATED EXPERIENCES",
    description:
      "Crafting bespoke spatial atmospheres for high-end hospitality, penthouses, and executive sales galleries with custom millwork and material harmony.",
    accentColor: "#b85d38",
    deliverables: [
      "Material & Spec Curation",
      "Custom Joinery & Lighting Fixtures",
      "Spatial Ergonomics & Flow",
    ],
  },
  {
    id: "landscape",
    number: "03",
    title: "LANDSCAPE DESIGN",
    tag: "BIOPHILIC CONTEXT",
    description:
      "Integrating outdoor environments with the built structure. Sustainable botanical planning, hardscaping, reflecting pools, and private botanical courtyards.",
    accentColor: "#34d399",
    deliverables: [
      "Site Grading & Hardscape Detailing",
      "Microclimate & Sun-Shade Modeling",
      "Civic Masterplan Wayfinding",
    ],
  },
  {
    id: "visualization",
    number: "04",
    title: "CUTTING-EDGE VISUALIZATION",
    tag: "RAY-TRACED PHOTOREALISM",
    description:
      "CGI artistry meets optical precision. We produce hyper-realistic 3D architectural stills, emotive daylight studies, and 8K cinematic walkthrough films.",
    accentColor: "#00c8ff",
    deliverables: [
      "Photorealistic 8K Renders",
      "Day-to-Night Circadian Studies",
      "Cinematic Motion Graphics",
    ],
  },
  {
    id: "lighting",
    number: "05",
    title: "ARCHITECTURAL LIGHTING DESIGN",
    tag: "LUMEN PRECISION",
    description:
      "Sculpting space with light. We calculate photometric distributions, exterior facade illumination, and subtle circadian interior atmospheres.",
    accentColor: "#fbbf24",
    deliverables: [
      "Dialux & Photometric Simulations",
      "Facade Illuminance Schemes",
      "Smart Control Integration",
    ],
  },
  {
    id: "interactive",
    number: "06",
    title: "INTERACTIVE SOLUTIONS",
    tag: "REAL-TIME PROPTECH",
    description:
      "Transforming static presentations into live digital flagships. 3D orbital masterplans, real-time CRM inventory synchronization, and web showroom kiosks.",
    accentColor: "#a855f7",
    deliverables: [
      "WebGL 3D Compound Navigators",
      "Live CRM Inventory Sync",
      "Interactive Sales Showroom Displays",
    ],
  },
];

export const AboutSpecializations: React.FC = () => {
  return (
    <section
      id="specializations"
      className="relative w-full py-20 sm:py-28 md:py-32 px-6 sm:px-12 md:px-16 lg:px-20 border-b border-white/10 bg-[#080808] scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00c8ff] animate-pulse" />
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#00c8ff]">
                02 / MULTIDISCIPLINARY PRACTICE
              </span>
            </div>

            <h2 className="font-['BlauerNue',sans-serif] text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              CORE <span className="text-[#00c8ff]">SPECIALIZATIONS</span>
            </h2>
          </div>

          <p className="font-['Rubik',sans-serif] text-white/60 text-sm sm:text-base max-w-md leading-relaxed">
            Six cohesive disciplines operating under one collaborative roof to ensure uninterrupted fidelity from initial sketch to interactive deployment.
          </p>
        </div>

        {/* 6 Specializations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SPECIALIZATIONS.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between bg-[#101010] hover:bg-[#141414] border border-white/10 hover:border-white/30 transition-all duration-300 p-8 sm:p-9 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
              style={{
                borderTopColor: `${item.accentColor}80`,
                borderTopWidth: "2px",
              }}
            >
              {/* Background Number Watermark */}
              <span
                className="absolute -top-3 -right-2 font-['BlauerNue',sans-serif] text-8xl font-black text-white/2.5 select-none pointer-events-none group-hover:text-white/5 transition-colors"
                aria-hidden="true"
              >
                {item.number}
              </span>

              <div className="flex flex-col gap-4 relative z-10">
                {/* Number & Category Pill */}
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: item.accentColor }}
                  >
                    /{item.number}
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 font-mono text-[10px] text-white/60 uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-['BlauerNue',sans-serif] text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-['Rubik',sans-serif] text-white/70 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                  {item.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-white/80">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.accentColor }}
                      />
                      <span className="font-['Rubik',sans-serif]">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40 group-hover:text-white/80 transition-colors">
                <span>KV PRACTICE</span>
                <span>VERIFIED STANDARD →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
