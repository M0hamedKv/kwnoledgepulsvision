"use client";

import React, { useRef, useEffect } from "react";
import { getOptimizedVideoUrl, getVideoPosterUrl } from "@/lib/media";

export interface InViewVideoProps {
  src: string;
  className?: string;
  isMuted?: boolean;
  poster?: string;
}

export const InViewVideo: React.FC<InViewVideoProps> = ({
  src,
  className = "",
  isMuted = true,
  poster,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const optimizedSrc = getOptimizedVideoUrl(src, { width: 1280, quality: "good" });
  const effectivePoster = poster || getVideoPosterUrl(src, 800);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [optimizedSrc]);

  return (
    <video
      ref={videoRef}
      src={optimizedSrc}
      poster={effectivePoster}
      muted={isMuted}
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
};

export default InViewVideo;

