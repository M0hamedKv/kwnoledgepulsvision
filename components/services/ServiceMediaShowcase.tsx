"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceDetailItem } from "./servicesData";
import { INTERIOR_PROJECTS } from "./interiorData";
import {
  LightboxItem,
  Lightbox,
  ComingSoonPanel,
  InteriorProjectSection,
  AnimationShowcase,
  ImaquetteShowcase,
} from "./showcase";

export interface ServiceMediaShowcaseProps {
  service: ServiceDetailItem;
}

export const ServiceMediaShowcase: React.FC<ServiceMediaShowcaseProps> = ({ service }) => {
  const serviceVideos = service.gallery.filter((m) => m.type === "video");

  // VIP Screening Theater / Lightbox Modal State
  const [lightboxState, setLightboxState] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  const handleOpenLightbox = (items: LightboxItem[], index: number = 0) => {
    setLightboxState({ items, index });
  };

  const handleNextLightbox = () => {
    setLightboxState((prev) => {
      if (!prev || prev.items.length <= 1) return prev;
      return {
        ...prev,
        index: (prev.index + 1) % prev.items.length,
      };
    });
  };

  const handlePrevLightbox = () => {
    setLightboxState((prev) => {
      if (!prev || prev.items.length <= 1) return prev;
      return {
        ...prev,
        index: (prev.index - 1 + prev.items.length) % prev.items.length,
      };
    });
  };

  const isComingSoon = service.status === "coming-soon";
  const isInterior = service.slug === "interior";
  const isAnimation = service.slug === "animation";
  const isImaquette = service.slug === "imaquette";

  const sectionRef = useRef<HTMLElement>(null);

  // GSAP ScrollTrigger Entrance Animations for Animation & Interior
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Premiere Reel Entrance (Animation)
      const premiere = sectionRef.current?.querySelector<HTMLElement>(".sm-premiere");
      if (premiere) {
        gsap.fromTo(
          premiere,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: premiere,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 2. Interior Projects Staggered Entrance (Interior)
      const interiorProjects = sectionRef.current?.querySelectorAll<HTMLElement>(".sm-interior-project");
      if (interiorProjects && interiorProjects.length > 0) {
        interiorProjects.forEach((proj) => {
          gsap.fromTo(
            proj,
            { y: 45, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: proj,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [service]);

  // ─── 1. IMAQUETTE SHOWCASE: 10 Alternating Story Sections ───
  if (!isComingSoon && isImaquette && serviceVideos.length > 0) {
    return (
      <section
        ref={sectionRef}
        id="demonstration"
        className="relative w-full overflow-hidden bg-transparent"
      >
        <ImaquetteShowcase
          service={service}
          serviceVideos={serviceVideos}
          onOpenTheater={(idx) => handleOpenLightbox(serviceVideos, idx)}
        />

        {lightboxState && (
          <Lightbox
            items={lightboxState.items}
            currentIndex={lightboxState.index}
            onClose={() => setLightboxState(null)}
            onNext={handleNextLightbox}
            onPrev={handlePrevLightbox}
          />
        )}
      </section>
    );
  }

  // ─── 2. DEFAULT SHOWCASE: ANIMATION, INTERIOR, OR COMING SOON ───
  return (
    <section
      ref={sectionRef}
      id="demonstration"
      className="relative w-full py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden"
    >

      <div className="max-w-7xl mx-auto flex flex-col gap-14 relative z-10">
        {/* A. Coming Soon Panel */}
        {isComingSoon && (
          <ComingSoonPanel accentColor={service.accentColor} title={service.title} />
        )}

        {/* B. Animation Architectural Cinema Archive */}
        {!isComingSoon && isAnimation && serviceVideos.length > 0 && (
          <AnimationShowcase
            service={service}
            serviceVideos={serviceVideos}
            onOpenTheater={(idx) => handleOpenLightbox(serviceVideos, idx)}
          />
        )}

        {/* C. Interior Project-by-Project Masonry Galleries */}
        {!isComingSoon && isInterior && (
          <div className="flex flex-col gap-16">
            {INTERIOR_PROJECTS.map((project) => (
              <InteriorProjectSection
                key={project.id}
                project={project}
                accentColor={service.accentColor}
                onOpenLightbox={handleOpenLightbox}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox / VIP Screening Theater Modal */}
      {lightboxState && (
        <Lightbox
          items={lightboxState.items}
          currentIndex={lightboxState.index}
          onClose={() => setLightboxState(null)}
          onNext={handleNextLightbox}
          onPrev={handlePrevLightbox}
        />
      )}
    </section>
  );
};

export default ServiceMediaShowcase;
