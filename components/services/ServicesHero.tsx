"use client";

import React from "react";
import { PageHero } from "@/components/ui/PageHero";

export const ServicesHero: React.FC = () => {
  return (
    <PageHero
      theme="dual"
      eyebrow={{
        tag: "ARCHITECTURAL & INTERACTIVE SERVICES",
        statusColor: "#00c8ff",
      }}
      metaBadge={{
        primaryText: "8 SPECIALIZED SERVICES",
        secondaryText: "DUAL-CORE ARCHITECTURE",
        dotColor: "bg-[#00c8ff]",
      }}
      headline={{
        line1: "STUDIO",
        line2: "SERVICES",
        highlightWord: "SERVICES",
      }}
      subheadline={{
        text: "TWO INTEGRATED WORLDS.",
        mutedText: "EIGHT SPECIALIZED SERVICES.",
      }}
      description="Real-time interactive proptech solutions and spatial architectural design."
      anchors={[
        {
          label: "INTERACTIVE SOLUTION (5)",
          targetId: "interactive-solutions",
          number: "01 /",
          accentColor: "#00c8ff",
        },
        {
          label: "DESIGN (3)",
          targetId: "design-discipline",
          number: "02 /",
          accentColor: "#00c8ff",
        },
      ]}
    />
  );
};
