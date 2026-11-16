import { Metadata } from "next";
import { ArchitecturePage } from "@/components/services/pages";
import { getServiceBySlug } from "@/components/services/servicesData";

export const metadata: Metadata = {
  title: "ARCHITECTURE — Commercial Mall & Architectural Practice | KV STUDIO",
  description:
    "Curated collection of commercial shopping malls, residential ateliers, and architectural renders by KV Studio.",
};

export default function ServicesArchitecturePage() {
  const service = getServiceBySlug("architecture");
  const prevService = service ? getServiceBySlug(service.prevSlug) : undefined;
  const nextService = service ? getServiceBySlug(service.nextSlug) : undefined;

  return (
    <main className="w-full min-h-screen bg-black">
      <ArchitecturePage
        service={service}
        prevService={prevService}
        nextService={nextService}
      />
    </main>
  );
}
