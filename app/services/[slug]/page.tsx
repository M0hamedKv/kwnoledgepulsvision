import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceBySlug, getAllServices } from "@/components/services/servicesData";
import { ArrowRightIcon, ArrowLeftIcon } from "@/svgs";
import { ServiceMediaShowcase, ServiceDetailHero } from "@/components/services";

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
  return services.map((s) => ({
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

  return (
    <main className="w-full min-h-screen bg-background text-white selection:bg-[#00c8ff] selection:text-black">
      {/* 1. Kinetic Master Hero with Dynamic Typography & 3D Live Media Preview */}
      <ServiceDetailHero service={service} />

      {/* 2. Immersive Media & Interactive Production Showcase */}
      <ServiceMediaShowcase service={service} />
      
      {/* DEDICATED PROPOSAL INQUIRY CTA */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-20 relative overflow-hidden bg-background">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#00c8ff] font-bold">
            COMMISSION {service.title}
          </span>

          <h2 className="font-['BlauerNue',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            {service.ctaHeading}
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href={`/Contact?service=${service.slug}`}
              className="px-8 py-4 bg-[#00c8ff] text-black font-['BlauerNue',sans-serif] font-black text-sm uppercase tracking-widest hover:bg-white transition-colors"
            >
              REQUEST A CUSTOM PROPOSAL
            </Link>

            <Link
              href="/services"
              className="px-8 py-4 border border-white/15 text-white font-mono text-xs uppercase tracking-widest hover:border-white/40 transition-colors"
            >
              BROWSE ALL SERVICES
            </Link>
          </div>
        </div>
      </section>

      {/* ADJACENT SERVICES NAVIGATION */}
      <nav aria-label="Adjacent Services Navigation" className="w-full py-8 px-6 sm:px-12 md:px-16 lg:px-20 bg-background border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          {prevService ? (
            <Link
              href={`/services/${prevService.slug}`}
              className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 stroke-current text-[#00c8ff]" />
              <div className="text-left font-mono text-xs">
                <span className="block text-white/30 text-[10px]">PREVIOUS SERVICE</span>
                <span className="font-bold uppercase tracking-wider">{prevService.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/services"
            className="font-mono text-xs uppercase tracking-widest text-[#00c8ff] hover:underline"
          >
            VIEW ALL SERVICES
          </Link>

          {nextService ? (
            <Link
              href={`/services/${nextService.slug}`}
              className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
            >
              <div className="text-right font-mono text-xs">
                <span className="block text-white/30 text-[10px]">NEXT SERVICE</span>
                <span className="font-bold uppercase tracking-wider">{nextService.title}</span>
              </div>
              <ArrowRightIcon className="w-4 h-4 stroke-current text-[#00c8ff]" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </main>
  );
}
