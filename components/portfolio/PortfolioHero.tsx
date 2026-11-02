"use client";

import React from "react";
import { PageHero } from "@/components/ui/PageHero";

export const PortfolioHero: React.FC = () => {
  return (
    <PageHero
      theme="cyan"
      eyebrow={{
        tag: "PORTFOLIO / 3D PROPTECH SHOWCASE",
        subtitle: "KV-GRADE KINETIC ARCHITECTURE",
        statusColor: "#00c8ff",
      }}
      metaBadge={{
        primaryText: "KV ARCHITECTURE",
        secondaryText: "SYS: LIVE",
        metricText: "FPS: 60 REAL-TIME",
        dotColor: "bg-[#00c8ff]",
      }}
      headline={{
        line1: "INTERACTIVE",
        line2: "REAL ESTATE PLATFORMS",
        highlightWord: "REAL ESTATE",
        gradientText: true,
      }}
      description="From live CRM unit inventory synchronization to 360° orbital compound masterplans and dynamic facade visualizers. Scroll through our production features built for market-leading luxury developers."
      anchorsLabel="CORE CAPABILITIES:"
      anchors={[
        { label: "CRM Integration", targetId: "crm-integration", icon: "📊" },
        { label: "3D Masterplan", targetId: "interactive-masterplan", icon: "🗺️" },
        { label: "Dynamic Facades", targetId: "architectural-elevations", icon: "🏢" },
        { label: "Smart Search", targetId: "smart-unit-search", icon: "🔍" },
        { label: "360° Walkthrough", targetId: "360-virtual-tours", icon: "🌐" },
      ]}
      scrollCueText="SCROLL TO EXPLORE PRODUCTION ARCHITECTURE"
    />
  );
};
