"use client";

import React from "react";
import { ServiceDetailItem, ServiceMediaItem } from "../servicesData";
import { Story } from "@/components/ui/story";

const IMAQUETTE_HEADLINES: Record<string, string> = {
  "m-vid-1": "EXPLODED <br/> DIAGRAM",
  "m-vid-2": "3D <br/> SECTION ",
  "m-vid-3": "DIVA <br/> SCALE MODEL",
  "m-vid-4": "EXTERNAL <br/> PERSPECTIVE",
  "m-vid-5": "MATERIAL <br/> CUSTOMIZATION",
  "m-vid-6": "DAY & <br/> NIGHT",
  "m-vid-7": "WEATHER <br/> CHANGE",
  "m-vid-8": "CAR <br/> DRIVEN",
  "m-vid-9": "THIRDPERSON <br/> GAMEPLAY",
  "m-vid-10": "SURROUNDINGS",
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

