"use client";

import React, { useEffect, useRef } from "react";
import { AmbientSpotlights } from "@/components/ui";

interface NodePoint {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  isAccent: boolean;
}

interface PulseRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface ImaquetteHeroProps {
  coverVideo?: string;
}

export const ImaquetteHero: React.FC<ImaquetteHeroProps> = ({ coverVideo }) => {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cinematic video showing real hands interacting with proptech multi-touch table
  const backgroundVideoUrl =
    coverVideo ||
    "https://res.cloudinary.com/fbq1bvni/video/upload/v1795639911/imaquette.mov";

  // Ensure autoplay across all devices & browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // INTERACTIVE DIGITAL MAQUETTE 3D MESH & RADAR CANVAS ENGINE
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      initNodes();
    };

    window.addEventListener("resize", handleResize);

    // Interactive Mouse Tracking State
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
    };

    // Node & Ripple Collections
    let nodes: NodePoint[] = [];
    const ripples: PulseRipple[] = [];

    const initNodes = () => {
      nodes = [];
      const cols = Math.floor(Math.max(10, width / 70));
      const rows = Math.floor(Math.max(7, height / 70));
      const spacingX = width / (cols + 1);
      const spacingY = height / (rows + 1);

      for (let i = 1; i <= cols; i++) {
        for (let j = 1; j <= rows; j++) {
          const x = i * spacingX + (Math.random() - 0.5) * 20;
          const y = j * spacingY + (Math.random() - 0.5) * 20;
          const z = (Math.random() - 0.5) * 130;
          const isAccent = Math.random() > 0.82;

          nodes.push({
            x,
            y,
            z,
            baseX: x,
            baseY: y,
            baseZ: z,
            vx: 0,
            vy: 0,
            vz: 0,
            size: isAccent ? 2.8 : 1.8,
            color: isAccent ? "#00c8ff" : "rgba(255, 255, 255, 0.7)",
            isAccent,
          });
        }
      }
    };

    initNodes();

    // Spawn a pulse ripple at coordinates
    const emitRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.5,
        alpha: 1.0,
      });
    };

    // Initial ambient ripple to invite interaction
    const initTimer = setTimeout(() => {
      emitRipple(width / 2, height / 2);
    }, 450);

    // Mouse & Touch Handlers
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const onMouseEnter = () => {
      mouse.isHovered = true;
    };

    const onMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      emitRipple(e.clientX - rect.left, e.clientY - rect.top);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mouse.targetX = e.touches[0].clientX - rect.left;
        mouse.targetY = e.touches[0].clientY - rect.top;
        mouse.isHovered = true;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        emitRipple(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("click", onClick);
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchstart", onTouchStart, { passive: true });

    // Main 60 FPS Render Loop
    let time = 0;
    const render = () => {
      time += 0.015;

      // Smooth mouse damping (Lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Process and Draw Expanding Pulse Ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const ripple = ripples[r];
        ripple.radius += 5.5;
        ripple.alpha = Math.max(0, 1 - ripple.radius / ripple.maxRadius);

        ctx.save();
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 200, 255, ${ripple.alpha * 0.5})`;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = "#00c8ff";
        ctx.shadowBlur = 14;
        ctx.stroke();

        // Inner harmonic echo ring
        if (ripple.radius > 35) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius - 25, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 200, 255, ${ripple.alpha * 0.22})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        ctx.restore();

        if (ripple.radius >= ripple.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // 2. Update Node Positions & Interactive Physics
      const interactionRadius = 180;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Ambient architectural topographical wave motion
        const waveZ = Math.sin(time + node.baseX * 0.008 + node.baseY * 0.008) * 24;

        // Distance to active mouse cursor
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let mouseRepelX = 0;
        let mouseRepelY = 0;
        let mouseLiftZ = 0;

        if (dist < interactionRadius && mouse.isHovered) {
          const factor = 1 - dist / interactionRadius;
          const force = factor * factor * 35;
          const angle = Math.atan2(dy, dx);
          mouseRepelX = -Math.cos(angle) * force;
          mouseRepelY = -Math.sin(angle) * force;
          mouseLiftZ = factor * 85; // Lift node in 3D perspective
        }

        // Ripple shockwave impact
        let rippleLiftZ = 0;
        for (let r = 0; r < ripples.length; r++) {
          const rip = ripples[r];
          const rdx = node.x - rip.x;
          const rdy = node.y - rip.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const waveDist = Math.abs(rdist - rip.radius);
          if (waveDist < 45) {
            const ripForce = (1 - waveDist / 45) * rip.alpha * 48;
            rippleLiftZ += ripForce;
          }
        }

        const targetX = node.baseX + mouseRepelX;
        const targetY = node.baseY + mouseRepelY;
        const targetZ = node.baseZ + waveZ + mouseLiftZ + rippleLiftZ;

        node.x += (targetX - node.x) * 0.1;
        node.y += (targetY - node.y) * 0.1;
        node.z += (targetZ - node.z) * 0.1;
      }

      // 3. Connect Nearby Nodes with Architectural Vector Lines
      const maxDistance = 98;
      ctx.lineWidth = 0.75;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;

            // Highlight connections near cursor
            const midX = (n1.x + n2.x) / 2;
            const midY = (n1.y + n2.y) / 2;
            const cursorDist = Math.hypot(mouse.x - midX, mouse.y - midY);
            const isNearCursor = cursorDist < 145 && mouse.isHovered;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);

            if (isNearCursor) {
              ctx.strokeStyle = `rgba(0, 200, 255, ${alpha * 2.8})`;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            }

            ctx.stroke();
          }
        }
      }

      // 4. Draw Individual Nodes with Depth Perspective
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        const scale = 1 + node.z / 260;
        const currentSize = Math.max(0.6, node.size * scale);

        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color;

        // Glowing nodes near mouse
        const cursorDist = Math.hypot(mouse.x - node.x, mouse.y - node.y);
        if (cursorDist < 125 && mouse.isHovered) {
          ctx.shadowColor = "#00c8ff";
          ctx.shadowBlur = 12;
          ctx.fillStyle = "#00c8ff";
        }

        ctx.fill();
        ctx.restore();
      }

      // 5. Interactive Digital Maquette Targeting Crosshair near Mouse
      if (mouse.isHovered) {
        ctx.save();
        const reticleRadius = 22;
        ctx.strokeStyle = "rgba(0, 200, 255, 0.45)";
        ctx.lineWidth = 1;
        ctx.shadowColor = "#00c8ff";
        ctx.shadowBlur = 8;

        // Subtle circular reticle
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, reticleRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Precision crosshair lines
        ctx.beginPath();
        ctx.moveTo(mouse.x - reticleRadius - 8, mouse.y);
        ctx.lineTo(mouse.x - reticleRadius + 4, mouse.y);
        ctx.moveTo(mouse.x + reticleRadius - 4, mouse.y);
        ctx.lineTo(mouse.x + reticleRadius + 8, mouse.y);

        ctx.moveTo(mouse.x, mouse.y - reticleRadius - 8);
        ctx.lineTo(mouse.x, mouse.y - reticleRadius + 4);
        ctx.moveTo(mouse.x, mouse.y + reticleRadius - 4);
        ctx.lineTo(mouse.x, mouse.y + reticleRadius + 8);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("click", onClick);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden border-b border-white/10 select-none bg-black"
      aria-label="iMaquette Real-Time Touch Canvas Experience"
    >
      {/* 1. Cinematic Background Video of Human Hands on Proptech Touch Table */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <video
          ref={videoRef}
          src={backgroundVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-102 brightness-[0.55] contrast-[1.12]"
        />
        {/* Soft atmospheric gradients for text contrast */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 top-0 h-44 bg-linear-to-b from-black via-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* 2. Signature Architectural Dual Blue Spotlights */}
      <AmbientSpotlights />

      {/* 3. Live 3D Interactive Spatial Particles & Digital Maquette Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
      />

      {/* Clean Top Spacer matching Design Hero */}
      <div className="relative z-10" />

      {/* 4. Hero Title — Pure, Clean, Bold, Exactly in Center */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto">
        <h1 className="font-['BlauerNue',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] xl:text-[11rem] font-black uppercase tracking-tight leading-[0.85] text-white select-none drop-shadow-[0_12px_60px_rgba(0,0,0,0.95)]">
          IMAQUETTE
        </h1>
      </div>

      {/* 5. Clean Scroll Indicator */}
      <div className="relative z-20 flex items-center justify-center">
        <a
          href="#interactive-demo"
          className="font-mono text-xs uppercase tracking-[0.25em] text-white/60 hover:text-[#00c8ff] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>EXPLORE EXHIBITION</span>
          <span>↓</span>
        </a>
      </div>
    </section>
  );
};
