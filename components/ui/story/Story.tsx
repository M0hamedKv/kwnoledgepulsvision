"use client";

import React from "react";
import AnimatedTitle from "../AnimatedTitle";
import { StoryProps } from "./types";
import { StoryTopHud } from "./StoryTopHud";
import { StoryMediaFrame } from "./StoryMediaFrame";
import { StoryDetailsCard } from "./StoryDetailsCard";

export function Story({
  id,
  video,
  videoSrc,
  imageSrc,
  title = "IMAQUETTE",
  headline,
  subtitle,
  category = "Interactive Solution",
  badge = "Real-Time 3D",
  description = "Full production interactive architectural scale model system with dynamic daylight simulation, real-time material swapping, exploded views, and touchscreen kiosk controls.",
  index,
  total,
  reversed,
  accentColor = "#00c8ff",
  className = "",
  onOpenTheater,
}: StoryProps) {
  const isReversed = reversed !== undefined ? reversed : (index !== undefined ? index % 2 === 1 : false);
  const activeVideo = video || videoSrc;
  const encodedVideoSrc = activeVideo ? encodeURI(decodeURI(activeVideo)) : "";
  const displayTitle = headline || title;
  const fullTitle = title.replace(/<br\s*\/?>/gi, " ");

  return (
    <section
      id={id || `story-${index !== undefined ? index + 1 : "default"}`}
      className={`min-h-screen w-full bg-transparent text-white relative overflow-hidden py-16 sm:py-24 border-b border-white/5 select-none ${className}`}
    >
      <div className="flex size-full flex-col items-center relative z-10 px-4 sm:px-8">
        {/* Top HUD Metadata Pill — Alternates with the direction of the text */}
        <StoryTopHud
          index={index}
          total={total}
          badge={badge}
          category={category}
          subtitle={subtitle}
          accentColor={accentColor}
          isReversed={isReversed}
        />

        {/* Kinetic 3D Animated Title */}
        <AnimatedTitle title={displayTitle}
          clasContainer="mt-2 pointer-events-none mix-blend-difference z-20 relative text-center"
        />

        {/* 3D Interactive Media Mask Frame & Floating Details Card */}
        <div className="relative w-full max-w-6xl mx-auto my-4 sm:my-6">
          <StoryMediaFrame
            encodedVideoSrc={encodedVideoSrc}
            imageSrc={imageSrc}
            fullTitle={fullTitle}
            accentColor={accentColor}
            isReversed={isReversed}
            onOpenTheater={onOpenTheater}
          />

          <StoryDetailsCard
            badge={badge}
            fullTitle={fullTitle}
            description={description}
            accentColor={accentColor}
            isReversed={isReversed}
            onOpenTheater={onOpenTheater}
          />
        </div>
      </div>
    </section>
  );
}

export default Story;

