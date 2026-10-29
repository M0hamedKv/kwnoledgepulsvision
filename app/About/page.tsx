import React from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { AboutStory, AboutVision } from "@/components/about";

export const metadata: Metadata = {
  title: "About Us · Creative Architecture & Visualization Practice | KV Studio",
  description:
    "KV Studio (Knowledge Plus Vision) is a creative architecture and visualization practice dedicated to turning ideas into reality. Driven by innovation, guided by design, and powered by technology.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background text-white selection:bg-[#00c8ff] selection:text-black">
      {/* 1. Grand Cinematic Page Hero */}
      <PageHero
        theme="cyan"
        eyebrow={{
          tag: "[ ABOUT // KNOWLEDGE PLUS VISION ]",
          subtitle: "CREATIVE ARCHITECTURE & VISUALIZATION",
          statusColor: "#00c8ff",
        }}
        metaBadge={{
          primaryText: "KV STUDIO",
          secondaryText: "INNOVATION • DESIGN • TECH",
          metricText: "CAIRO // GLOBAL",
          dotColor: "bg-[#00c8ff]",
        }}
        headline={{
          line1: "SHAPING THE",
          line2: "FUTURE OF SPACES",
          highlightWord: "FUTURE",
          gradientText: true,
        }}
        subheadline={{
          text: "DRIVEN BY INNOVATION.",
          mutedText: "GUIDED BY DESIGN. POWERED BY TECHNOLOGY.",
        }}
        description="KV Studio is a creative architecture and visualization practice dedicated to turning ideas into reality. We specialize in architectural, interior, and landscape design, complemented by cutting-edge visualization, lighting design, and interactive solutions."
        anchorsLabel="EXPLORE PRACTICE:"
        anchors={[
          { label: "OUR STORY", targetId: "our-story", number: "01 //", accentColor: "#00c8ff" },
          { label: "OUR VISION", targetId: "our-vision", number: "02 //", accentColor: "#00c8ff" },
        ]}
        scrollCueText="SCROLL TO EXPLORE"
      />

      {/* 2. Our Story Section: Exact Narrative + [View Our Projects] Button */}
      <AboutStory />

      {/* 3. Our Vision Section: Exact Narrative & Benchmark Creed */}
      <AboutVision />
    </main>
  );
}