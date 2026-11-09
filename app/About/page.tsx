import type { Metadata } from "next";
import { ConstellationGalaxy } from "@/components/about";

export const metadata: Metadata = {
  title: "Spatial Constellation · About Us 3D | KV Studio",
  description:
    "Explore KV Studio's architectural DNA, track record, background, and vision inside an interactive 3D particle constellation inspired by award-winning spatial web experiences.",
};

export default function About3DPage() {
  return (
    <main className="w-full h-screen bg-[#050508] overflow-hidden select-none">
      <ConstellationGalaxy />
    </main>
  );
}

