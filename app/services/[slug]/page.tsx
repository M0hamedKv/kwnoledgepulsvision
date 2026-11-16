import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, getAllServices } from "@/components/services/servicesData";
import { getArchitectureProjectById } from "@/components/services/architectureData";
import {
  AnimationPage,
  ImaquettePage,
  RealEstateWebsitePage,
  WebdevelopmentPage,
  BimPage,
  MepPage,
  InteriorPage,
  VrPage,
  ArchitecturePage,
  ArchitectureProjectDetailPage,
} from "@/components/services/pages";
import PortfolioPage from "@/app/portfolio/page";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    const archProject = getArchitectureProjectById(slug);
    if (archProject) {
      return {
        title: `${archProject.title} — ${archProject.typology} | KV STUDIO`,
        description: archProject.description,
      };
    }
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
    .filter((s) => s.slug !== "interior" && s.slug !== "architecture")
    .map((s) => ({
      slug: s.slug,
    }));
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    const archProject = getArchitectureProjectById(slug);
    if (archProject) {
      return (
        <ArchitectureProjectDetailPage
          project={archProject}
        />
      );
    }
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

    case "realestate-website":
      return (
        <PortfolioPage />
        // <RealEstateWebsitePage
        //   service={service}
        //   prevService={prevService}
        //   nextService={nextService}
        // />
      );

    case "webdevelopment":
      return (
        <WebdevelopmentPage
          service={service}
          prevService={prevService}
          nextService={nextService}
        />
      );

    case "architecture":
    case "architecture-design":
      return (
        <ArchitecturePage
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

    case "vr":
      return (
        <VrPage
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
