"use client";

import React from "react";
import { PageHero } from "@/components/ui/PageHero";

export const ServicesHero: React.FC = () => {
  return (
    <PageHero
      theme="dual"
      eyebrow={{
        tag: "[ 02 // ARCHITECTURAL & INTERACTIVE DISCIPLINES ]",
        statusColor: "#00c8ff",
      }}
      metaBadge={{
        primaryText: "8 SPECIALIZED DISCIPLINES",
        secondaryText: "DUAL-CORE ARCHITECTURE",
        dotColor: "bg-[#00c8ff]",
      }}
      headline={{
        line1: "SERVICES",
        line2: "& DISCIPLINES",
        highlightWord: "&",
      }}
      subheadline={{
        text: "TWO INTEGRATED WORLDS.",
        mutedText: "EIGHT SPECIALIZED DISCIPLINES.",
      }}
      description="We operate at the convergence of cutting-edge digital spatial technology and rigorous physical architectural engineering. Each service has a dedicated design philosophy, custom tooling, and bespoke delivery pipeline."
      anchors={[
        {
          label: "INTERACTIVE SOLUTION (5)",
          targetId: "interactive-solutions",
          number: "01 //",
          accentColor: "#00c8ff",
        },
        {
          label: "DESIGN (3)",
          targetId: "design-discipline",
          number: "02 //",
          accentColor: "#b85d38",
        },
      ]}
    />
  );
};
