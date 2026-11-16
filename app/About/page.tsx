import type { Metadata } from "next";
import {
  ConstellationGalaxy,
  AboutVision,
  AboutMission,
  AboutStory,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About Us · Creative Architecture & Visualization Practice | KV Studio",
  description:
    "KV Studio (Knowledge Plus Vision) is a creative architecture and visualization practice dedicated to turning ideas into reality. Driven by innovation, guided by design, and powered by technology.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-transparent text-white selection:bg-[#00c8ff] selection:text-black">
      {/* 1. Spatial Constellation Galaxy Hero (Restored) */}
      <ConstellationGalaxy />

      {/* 2. Vision Section */}
      <AboutVision />

      {/* 3. Mission Section */}
      <AboutMission />

      {/* 4. Our Story Section */}
      <AboutStory />
    </main>
  );
}
