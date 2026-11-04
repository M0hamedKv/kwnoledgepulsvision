import { Metadata } from "next";
import { InteriorPage } from "@/components/services/pages";
import { getServiceBySlug } from "@/components/services/servicesData";

export const metadata: Metadata = {
  title: "INTERIOR ATELIER — Haute Architectural Interiors | KV STUDIO",
  description:
    "Curated collection of luxury residential, commercial headquarters, and hospitality interior architecture renders by KV Studio.",
};

export default function ServicesInteriorPage() {
  const service = getServiceBySlug("interior");
  const prevService = service ? getServiceBySlug(service.prevSlug) : undefined;
  const nextService = service ? getServiceBySlug(service.nextSlug) : undefined;

  return (
    <main className="w-full min-h-screen bg-black">
      <InteriorPage
        service={service}
        prevService={prevService}
        nextService={nextService}
      />
    </main>
  );
}

