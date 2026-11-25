"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { AmbientSpotlights } from "@/components/ui";

interface DustMote {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  isAccent: boolean;
}

interface AperturePulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface AnimationHeroProps {
  videoSrc: string;
}

/**
 * Full-bleed interactive cinema hero for the Architectural Animation service.
 * Combines camera-rig video parallax, optical bokeh/anamorphic flare canvas,
 * click aperture ripples, and a GSAP masked typographic reveal.
 */
export const AnimationHero: React.FC<AnimationHeroProps> = ({ videoSrc }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  // Ensure smooth muted autoplay on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [videoSrc]);

  // Choreographed GSAP architectural cinema title reveal
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (lineTopRef.current && lineBottomRef.current) {
        tl.fromTo(
          [lineTopRef.current, lineBottomRef.current],
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.9, stagger: 0.08 }
        );
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { y: 48, opacity: 0, letterSpacing: "0.14em" },
          { y: 0, opacity: 1, letterSpacing: "-0.02em", duration: 1.05 },
          "-=0.7"
        );
      }

      if (scrollCueRef.current) {
        tl.fromTo(
          scrollCueRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.45"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Optical bokeh field, anamorphic lens streak, click aperture ripples & video parallax
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = sectionRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
    };

    const motes: DustMote[] = [];
    const pulses: AperturePulse[] = [];

    const initMotes = () => {
      motes.length = 0;
      const count = Math.min(72, Math.max(36, Math.floor((width * height) / 22000)));
      for (let i = 0; i < count; i++) {
        const isAccent = Math.random() > 0.65;
        motes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: 0.4 + Math.random() * 1.4,
          vx: (Math.random() - 0.5) * 0.28,
          vy: -0.18 - Math.random() * 0.35,
          radius: isAccent ? 1.6 + Math.random() * 2.4 : 1.0 + Math.random() * 1.8,
          alpha: 0.25 + Math.random() * 0.5,
          isAccent,
        });
      }
    };

    initMotes();

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      initMotes();
    };

    const emitPulse = (x: number, y: number) => {
      pulses.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.42,
        alpha: 1.0,
      });
    };

    const initPulseTimer = setTimeout(() => emitPulse(width / 2, height / 2), 600);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const onMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      emitPulse(e.clientX - rect.left, e.clientY - rect.top);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const tx = e.touches[0].clientX - rect.left;
        const ty = e.touches[0].clientY - rect.top;
        mouse.targetX = tx;
        mouse.targetY = ty;
        emitPulse(tx, ty);
      }
    };

    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("click", onClick);
    container.addEventListener("touchstart", onTouchStart, { passive: true });

    let time = 0;
    const render = () => {
      time += 0.016;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Smooth subtle 3D camera-rig parallax on background video
      if (videoWrapRef.current) {
        const normX = (mouse.x / Math.max(1, width) - 0.5) * 2;
        const normY = (mouse.y / Math.max(1, height) - 0.5) * 2;
        videoWrapRef.current.style.transform = `scale(1.055) translate3d(${(-normX * 14).toFixed(2)}px, ${(-normY * 10).toFixed(2)}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Anamorphic cyan optical flare streak tracking cursor elevation
      if (mouse.isHovered) {
        const streakWidth = Math.min(width * 0.55, 680);
        const grad = ctx.createLinearGradient(
          mouse.x - streakWidth / 2,
          mouse.y,
          mouse.x + streakWidth / 2,
          mouse.y
        );
        grad.addColorStop(0, "rgba(0, 200, 255, 0)");
        grad.addColorStop(0.45, "rgba(0, 200, 255, 0.16)");
        grad.addColorStop(0.5, "rgba(255, 255, 255, 0.28)");
        grad.addColorStop(0.55, "rgba(0, 200, 255, 0.16)");
        grad.addColorStop(1, "rgba(0, 200, 255, 0)");

        ctx.save();
        ctx.fillStyle = grad;
        ctx.fillRect(mouse.x - streakWidth / 2, mouse.y - 1, streakWidth, 2);
        ctx.restore();
      }

      // 2. Volumetric light dust / bokeh particles drifting with parallax
      const offsetX = (mouse.x - width / 2) * 0.018;
      const offsetY = (mouse.y - height / 2) * 0.018;

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.vx + Math.sin(time * 0.7 + i) * 0.12;
        m.y += m.vy;

        if (m.y < -20) {
          m.y = height + 20;
          m.x = Math.random() * width;
        }
        if (m.x < -20) m.x = width + 20;
        if (m.x > width + 20) m.x = -20;

        const drawX = m.x - offsetX * m.z;
        const drawY = m.y - offsetY * m.z;
        const distCursor = Math.hypot(mouse.x - drawX, mouse.y - drawY);
        const nearBoost = mouse.isHovered && distCursor < 180 ? 1 - distCursor / 180 : 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(drawX, drawY, m.radius * (1 + nearBoost * 0.8), 0, Math.PI * 2);
        if (m.isAccent || nearBoost > 0.25) {
          ctx.fillStyle = `rgba(0, 200, 255, ${Math.min(0.95, m.alpha + nearBoost * 0.5)})`;
          ctx.shadowColor = "#00c8ff";
          ctx.shadowBlur = 10 + nearBoost * 10;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha * 0.75})`;
        }
        ctx.fill();
        ctx.restore();
      }

      // 3. Expanding cinema aperture pulses on click
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.radius += 6.2;
        pulse.alpha = Math.max(0, 1 - pulse.radius / pulse.maxRadius);

        ctx.save();
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 200, 255, ${pulse.alpha * 0.45})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#00c8ff";
        ctx.shadowBlur = 14;
        ctx.stroke();

        if (pulse.radius > 40) {
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, pulse.radius - 26, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${pulse.alpha * 0.18})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.restore();

        if (pulse.radius >= pulse.maxRadius) {
          pulses.splice(p, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearTimeout(initPulseTimer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("click", onClick);
      container.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden border-b border-white/10 select-none bg-black"
      aria-label="Animation Architectural Cinema Hero"
    >
      {/* 1. Full-Bleed Cinema Video with Smooth Mouse Rig Parallax */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div
          ref={videoWrapRef}
          className="w-full h-full will-change-transform transition-transform duration-200 ease-out"
          style={{ transform: "scale(1.055)" }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover brightness-[0.68] contrast-[1.08]"
          />
        </div>

        {/* Cinema Letterbox & Contrast Vignettes */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-0 top-0 h-44 bg-linear-to-b from-black via-black/65 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-linear-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* 2. Architectural Ambient Spotlights */}
      <AmbientSpotlights />

      {/* 3. Live Optical Bokeh & Anamorphic Streak Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
      />

      {/* 4. Subtle Architectural Cinema Viewfinder Corner Brackets */}
      <div className="pointer-events-none absolute inset-6 sm:inset-10 z-10">
        <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#00c8ff]/50" />
        <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#00c8ff]/50" />
        <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#00c8ff]/50" />
        <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#00c8ff]/50" />
      </div>

      {/* Top Spacer */}
      <div className="relative z-20" />

      {/* 5. Center Title with Symmetric Laser Rules */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto px-4">
        <div
          ref={lineTopRef}
          className="w-28 sm:w-44 h-px bg-linear-to-r from-transparent via-[#00c8ff] to-transparent mb-5 origin-center"
        />

        <h1
          ref={titleRef}
          className="font-['BlauerNue',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] xl:text-[11rem] font-black uppercase tracking-tight leading-[0.85] text-white select-none drop-shadow-[0_12px_60px_rgba(0,0,0,0.95)]"
        >
          ANIMATION
        </h1>

        <div
          ref={lineBottomRef}
          className="w-28 sm:w-44 h-px bg-linear-to-r from-transparent via-[#00c8ff] to-transparent mt-5 origin-center"
        />
      </div>

      {/* 6. Clean Scroll Cue */}
      <div ref={scrollCueRef} className="relative z-20 flex items-center justify-center">
        <a
          href="#cinema-reels"
          className="text-xs uppercase tracking-[0.25em] font-bold text-white/65 hover:text-[#00c8ff] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>DISCOVER CINEMA</span>
          <span>↓</span>
        </a>
      </div>
    </section>
  );
};
