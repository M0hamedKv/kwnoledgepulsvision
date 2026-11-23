"use client";

import React from "react";
import { PageHero } from "@/components/ui/PageHero";

export const PortfolioHero: React.FC = () => {
  return (
    <PageHero
      theme="cyan"
      eyebrow={{
        tag: "REAL ESTATE WEB / 3D PROPTECH SHOWCASE",
        statusColor: "#00c8ff",
      }}
      headline={{
        line1: "INTERACTIVE",
        line2: "REAL ESTATE WEBSITES",
        highlightWord: "REAL ESTATE",
        gradientText: true,
      }}
      description="From live 3D masterplans with floor-by-floor navigation and unit stacking to 360° virtual building panoramas and compound navigators."
      anchorsLabel="PROPTECH PLATFORMS:"
      anchors={[
        { label: "Diva Masterplan", targetId: "diva-masterplan", icon: "🗺️" },
        { label: "360° Panorama", targetId: "diva-panoramaview", icon: "🌐" },
        { label: "EastVille 3D", targetId: "eastville-masterplan", icon: "🏙️" },
        { label: "EastVille Tour", targetId: "eastville-tour", icon: "🚶" },
      ]}
      scrollCueText="SCROLL TO EXPLORE PROPTECH SHOWCASE"
    />
  );
};
