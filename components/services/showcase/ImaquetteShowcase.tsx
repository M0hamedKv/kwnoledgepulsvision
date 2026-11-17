"use client";

import React from "react";
import { ServiceDetailItem, ServiceMediaItem } from "../servicesData";
import { Story } from "@/components/ui/story";

const IMAQUETTE_HEADLINES: Record<string, string> = {
  "3D SECTION": "3D <br/> SECTION",
  "EXPLODED DIAGRAM": "EXPLODED <br/> DIAGRAM",
  "CAR DRIVEN": "CAR <br/> DRIVEN",
  "MATERIAL CUSTOMIZATION": "MATERIAL <br/> CUSTOMIZATION",
  "SURROUNDINGS": "SURROUNDINGS",
  "DAY & NIGHT": "DAY & <br/> NIGHT",
  "WEATHER CHANGE": "WEATHER <br/> CHANGE",
  "DRONE VIEW": "DRONE <br/> VIEW",
  "THIRD PERSON GAMEPLAY": "THIRD PERSON <br/> GAMEPLAY",
  "THIRDPERSON GAMEPLAY": "THIRD PERSON <br/> GAMEPLAY",
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
      {/* 9 Exclusive iMaquette Videos Presented Sequentially via Alternating Story Component */}
      <div className="flex flex-col w-full">
        {serviceVideos.map((video, idx) => (
          <Story
            key={video.id}
            id={`imaquette-feature-${idx + 1}`}
            index={idx}
            total={serviceVideos.length}
            video={video.url}
            headline={IMAQUETTE_HEADLINES[video.title.trim().toUpperCase()] || video.title}
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

