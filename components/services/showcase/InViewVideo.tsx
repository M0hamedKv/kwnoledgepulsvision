"use client";

import React, { useRef, useEffect } from "react";

export interface InViewVideoProps {
  src: string;
  className?: string;
  isMuted?: boolean;
}

export const InViewVideo: React.FC<InViewVideoProps> = ({
  src,
  className = "",
  isMuted = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted={isMuted}
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
};

export default InViewVideo;

