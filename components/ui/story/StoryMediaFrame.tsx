"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export interface StoryMediaFrameProps {
  encodedVideoSrc?: string;
  imageSrc?: string;
  fullTitle: string;
  accentColor: string;
  isReversed: boolean;
  onOpenTheater?: () => void;
}

export const StoryMediaFrame: React.FC<StoryMediaFrameProps> = ({
  encodedVideoSrc,
  imageSrc,
  fullTitle,
  accentColor,
  isReversed,
  onOpenTheater,
}) => {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // High-performance video viewport playback observer with pre-buffering
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !encodedVideoSrc) return;

    // Immediately trigger play on mount
    vid.play().catch(() => {});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      {
        rootMargin: "300px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(vid);
    return () => observer.disconnect();
  }, [encodedVideoSrc]);

  // 3D Wave Tilt Physics (Instant cursor response)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    gsap.to(frameRef.current, {
      duration: 0.22,
      rotateX,
      rotateY,
      scale: 1.025,
      transformPerspective: 600,
      transformStyle: "preserve-3d",
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!frameRef.current) return;
    gsap.to(frameRef.current, {
      duration: 0.45,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Mirrored polygon clip-paths for alternating left/right dynamic perspective
  const polygonClip = isReversed
    ? "polygon(17% 21%, 96% 0, 100% 100%, 0% 73%)"
    : "polygon(4% 0, 83% 21%, 100% 73%, 0% 100%)";

  return (
    <div
      className="story-img-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`story-img-mask group cursor-pointer transition-all duration-700 ${
          isReversed
            ? "md:left-[16%] lg:left-[18%]"
            : "md:left-[4%] lg:left-[6%]"
        }`}
        style={{ clipPath: polygonClip }}
        onClick={onOpenTheater}
        title="Click to expand 4K Theater"
      >
        <div
          ref={frameRef}
          className="story-img-content will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {encodedVideoSrc ? (
            <video
              ref={videoRef}
              src={encodedVideoSrc}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              className="size-full object-cover pointer-events-none"
            />
          ) : imageSrc ? (
            <img
              src={imageSrc}
              alt={fullTitle}
              className="size-full object-cover pointer-events-none"
            />
          ) : (
            <div className="size-full bg-black/60 flex items-center justify-center font-mono text-xs text-white/40">
              [ NO MEDIA ATTACHED ]
            </div>
          )}

          {/* Subtle cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

          {/* Center Hover Action Indicator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="px-5 py-2.5 rounded-full bg-black/85 backdrop-blur-md border text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-2xl transform scale-95 group-hover:scale-105 transition-transform"
              style={{ borderColor: `${accentColor}60` }}
            >
              <span className="text-sm" style={{ color: accentColor }}>⛶</span>
              <span>WATCH FULLSCREEN 4K</span>
              <span style={{ color: accentColor }}>↗</span>
            </div>
          </div>

          {/* Audio Mute/Unmute Toggle */}
          {encodedVideoSrc && (
            <div
              className={`absolute bottom-5 z-30 ${isReversed ? "right-5" : "left-5"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => {
                  const vid = videoRef.current;
                  if (vid) {
                    vid.muted = !vid.muted;
                    setIsMuted(vid.muted);
                  }
                }}
                className="px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-white hover:text-black text-white font-mono text-[10px] uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 shadow-xl"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                <span>{isMuted ? "🔇 UNMUTE" : "🔊 MUTE"}</span>
              </button>
            </div>
          )}

          {/* Resolution Badge */}
          <div
            className={`absolute bottom-5 z-20 pointer-events-none hidden sm:block ${
              isReversed ? "left-5" : "right-5"
            }`}
          >
            <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[9px] text-white/70 uppercase">
              4K RAY-TRACED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryMediaFrame;

