"use client";

import React, { useMemo } from "react";
import { InteriorProject } from "../interiorData";
import { LightboxItem } from "./types";

export interface InteriorProjectSectionProps {
  project: InteriorProject;
  accentColor: string;
  onOpenLightbox: (items: LightboxItem[], startIndex: number) => void;
}

export const InteriorProjectSection: React.FC<InteriorProjectSectionProps> = ({
  project,
  accentColor,
  onOpenLightbox,
}) => {
  const total = project.images.length;

  const projectItems: LightboxItem[] = useMemo(
    () =>
      project.images.map((imgUrl, i) => ({
        url: imgUrl,
        title: `${project.title} — View ${String(i + 1).padStart(2, "0")}`,
        type: "image",
        category: project.typology,
        badge: `${i + 1} / ${project.images.length}`,
        description: project.description,
      })),
    [project]
  );

  return (
    <div className="sm-interior-project flex flex-col gap-6 will-change-transform">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded-full border"
              style={{ color: accentColor, borderColor: `${accentColor}40` }}
            >
              {project.typology}
            </span>
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
              {project.badge}
            </span>
          </div>
          <h3 className="font-['BlauerNue',sans-serif] text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            {project.title}
          </h3>
          <p className="font-['Rubik',sans-serif] text-xs sm:text-sm text-white/55 max-w-xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 gap-x-4">
        {project.images.map((imgUrl, idx) => (
          <div
            key={`${project.id}-${idx}`}
            onClick={() => onOpenLightbox(projectItems, idx)}
            className="group relative w-full overflow-hidden rounded-xl border border-white/8 hover:border-white/25 bg-black/40 cursor-pointer transition-all duration-300 mb-4 break-inside-avoid"
          >
            <img
              src={imgUrl}
              alt={`${project.title} — ${idx + 1}`}
              loading="lazy"
              className="w-full h-auto block object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <span
                className="font-mono text-[10px] font-bold uppercase tracking-wider"
                style={{ color: accentColor }}
              >
                VIEW {String(idx + 1).padStart(2, "0")} — {project.typology}
              </span>
              <span className="font-mono text-[9px] text-white/60 uppercase mt-0.5 flex items-center gap-1">
                EXPAND FULL RESOLUTION ↗
              </span>
            </div>

            {/* Index badge */}
            <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm font-mono text-[9px] text-white/55 opacity-0 group-hover:opacity-100 transition-opacity">
              {String(idx + 1).padStart(2, "0")} / {total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteriorProjectSection;

