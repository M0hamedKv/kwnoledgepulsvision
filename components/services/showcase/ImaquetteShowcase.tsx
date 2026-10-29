"use client";

import React from "react";
import { ServiceDetailItem, ServiceMediaItem } from "../servicesData";
import { Story } from "@/components/ui/Story";

const IMAQUETTE_HEADLINES: Record<string, string> = {
  "m-vid-1": "DIVA <br/> SCALE MODEL",
  "m-vid-2": "MAGHAMIS <br/> MASTERPLAN 3D",
  "m-vid-3": "EXPLODED <br/> DIAGRAM",
  "m-vid-4": "DRONE <br/> ORBIT MODE",
  "m-vid-5": "MATERIAL <br/> CUSTOMIZER",
  "m-vid-6": "DAY TO NIGHT <br/> SIMULATION",
  "m-vid-7": "WEATHER & <br/> SEASONS",
  "m-vid-8": "VEHICLE <br/> DRIVE-THROUGH",
  "m-vid-9": "PEDESTRIAN <br/> WALKTHROUGH",
  "m-vid-10": "REGIONAL <br/> WAYFINDING",
};

export interface ImaquetteShowcaseProps {
  service: ServiceDetailItem;
  serviceVideos: ServiceMediaItem[];
  onOpenTheater: (index: number) => void;
}

export const ImaquetteShowcase: React.FC<ImaquetteShowcaseProps> = ({
  service,
  serviceVideos,
  onOpenTheater,
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* Top Header Strip */}
      <div className="w-full border-b border-white/10 bg-black/40 backdrop-blur-md py-6 px-6 sm:px-12 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span
              className="font-mono text-xs uppercase tracking-[0.25em] font-bold"
              style={{ color: service.accentColor }}
            >
              INTERACTIVE MAQUETTE ARCHIVE // FULL PRODUCTION REELS
            </span>
          </div>
          <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
            {serviceVideos.length} PRODUCTION MODULES • SCROLL TO EXPLORE
          </span>
        </div>
      </div>

      {/* All 10 iMaquette Videos Presented Sequentially via Alternating Story Component */}
      <div className="flex flex-col w-full">
        {serviceVideos.map((video, idx) => (
          <Story
            key={video.id}
            id={`imaquette-feature-${idx + 1}`}
            index={idx}
            total={serviceVideos.length}
            video={video.url}
            headline={IMAQUETTE_HEADLINES[video.id] || video.title}
            title={video.title}
            subtitle={video.category}
            category={video.category}
            badge={video.badge}
            description={video.description}
            accentColor={service.accentColor}
            onOpenTheater={() => onOpenTheater(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImaquetteShowcase;

