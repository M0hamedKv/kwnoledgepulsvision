import React from "react";
import Image from "next/image";
import { HeroBackgroundProps } from "./types";
import { getOptimizedVideoUrl, getVideoPosterUrl } from "@/lib/media";

/**
 * HeroBackground
 * Single Responsibility: Renders the full-bleed background visual layer and subtle contrast overlay.
 */
export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  imageUrl = "/hero-bg.webp",
  videoUrl = "https://res.cloudinary.com/hxytmocg/video/upload/v1793529386/close_to_building.mp4",
  alt = "KV Studio Architectural Visualization",
  priority = true,
}) => {
  const optimizedVideoUrl = videoUrl ? getOptimizedVideoUrl(videoUrl, { width: 1920, quality: "good" }) : "";
  const posterUrl = videoUrl ? getVideoPosterUrl(videoUrl, 1920) : imageUrl;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
      {/* Background Live Video / Fallback Image */}
      {videoUrl ? (
        <video
          src={optimizedVideoUrl}
          poster={posterUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        />
      ) : (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center"
        />
      )}

      {/* Subtle top gradient for header clarity */}
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/50 to-transparent" />

      {/* Subtle bottom gradient to lift the headline */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-black/60 to-transparent" />
    </div>
  );
};
