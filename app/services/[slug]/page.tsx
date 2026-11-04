import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, getAllServices } from "@/components/services/servicesData";
import {
  AnimationPage,
  ImaquettePage,
  WebdevelopmentPage,
  BimPage,
  MepPage,
  InteriorPage,
} from "@/components/services/pages";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found — KV STUDIO",
      description: "Architectural and interactive services by KV Studio.",
    };
  }

  return {
    title: `${service.title} — ${service.discipline} | KV STUDIO`,
    description: service.subtitle,
  };
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services
    .filter((s) => s.slug !== "interior")
    .map((s) => ({
      slug: s.slug,
    }));
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const prevService = getServiceBySlug(service.prevSlug);
  const nextService = getServiceBySlug(service.nextSlug);

  // Each service has its own completely separate, dedicated design and layout
  switch (service.slug) {
    case "animation":
      return (
        <AnimationPage
          service={service}
          prevService={prevService}
          nextService={nextService}
        />
      );

    case "imaquette":
      return (
        <ImaquettePage
          service={service}
          prevService={prevService}
          nextService={nextService}
        />
      );

    case "webdevelopment":
      return (
        <WebdevelopmentPage
          service={service}
          prevService={prevService}
          nextService={nextService}
        />
      );

    case "bim":
      return (
        <BimPage
          service={service}
          prevService={prevService}
          nextService={nextService}
        />
      );

    case "mep":
      return (
        <MepPage
          service={service}
          prevService={prevService}
          nextService={nextService}
        />
      );

    case "interior":
      return (
        <InteriorPage
          service={service}
          prevService={prevService}
          nextService={nextService}
        />
      );

    default:
      return (
        <AnimationPage
          service={service}
          prevService={prevService}
          nextService={nextService}
        />
      );
  }
}
