"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { AmbientSpotlights } from "@/components/ui";

// ============================================================================
// DATA: 3 Core About Us Sections in 3D Space
// ============================================================================
export interface AboutSection {
  id: string;
  name: string;
  number: string;
  category: string;
  // 3D coordinates in space
  x: number;
  y: number;
  z: number;
  size: number;
}

const SECTIONS: AboutSection[] = [
  {
    id: "vision",
    name: "OUR VISION",
    number: "01",
    category: "01 / VISION",
    x: -240,
    y: -40,
    z: 20,
    size: 10,
  },
  {
    id: "mission",
    name: "OUR MISSION",
    number: "02",
    category: "02 / MISSION",
    x: 0,
    y: 70,
    z: -30,
    size: 10,
  },
  {
    id: "our-story",
    name: "OUR STORY",
    number: "03",
    category: "03 / OUR STORY",
    x: 240,
    y: -40,
    z: 20,
    size: 10,
  },
];

interface StarPoint {
  x: number;
  y: number;
  z: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export const ConstellationGalaxy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Rotation, camera & zoom physics state
  const stateRef = useRef({
    rotX: 0.12,
    rotY: -0.18,
    targetRotX: 0.12,
    targetRotY: -0.18,
    velX: 0,
    velY: 0,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    zoom: 1,
    targetZoom: 1,
  });

  const projectedNodesRef = useRef<
    Map<string, { px: number; py: number; visible: boolean; scale: number }>
  >(new Map());

  // Smooth scroll directly to the corresponding page section
  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(
      sectionId === "our-story" ? "our-story" : sectionId
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }

    const section = SECTIONS.find((s) => s.id === sectionId);
    if (section) {
      const targetAngleY = Math.atan2(section.x, 500) * 0.45;
      const targetAngleX = -Math.atan2(section.y, 500) * 0.45;
      stateRef.current.targetRotY = -targetAngleY;
      stateRef.current.targetRotX = targetAngleX;
    }
  }, []);

  // 3D Canvas Lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      const w = rect?.width || window.innerWidth;
      const h = rect?.height || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      return { w, h };
    };

    let { w: width, h: height } = updateSize();

    const onResize = () => {
      const size = updateSize();
      width = size.w;
      height = size.h;
    };
    window.addEventListener("resize", onResize);

    // Generate gentle background star field
    const starsCount = 350;
    const stars: StarPoint[] = [];
    for (let i = 0; i < starsCount; i++) {
      const radius = 300 + Math.random() * 900;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      stars.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        size: 0.8 + Math.random() * 1.6,
        alpha: 0.2 + Math.random() * 0.6,
        twinkleSpeed: 0.015 + Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Mouse drag handlers
    const onMouseDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.lastMouseX = e.clientX;
      stateRef.current.lastMouseY = e.clientY;
      stateRef.current.velX = 0;
      stateRef.current.velY = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!stateRef.current.isDragging) return;
      const dx = e.clientX - stateRef.current.lastMouseX;
      const dy = e.clientY - stateRef.current.lastMouseY;
      stateRef.current.lastMouseX = e.clientX;
      stateRef.current.lastMouseY = e.clientY;

      stateRef.current.velX = dx * 0.003;
      stateRef.current.velY = dy * 0.003;
      stateRef.current.targetRotY += stateRef.current.velX;
      stateRef.current.targetRotX += stateRef.current.velY;
    };

    const onMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      // Allow page scrolling unless dragging
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        const zoomDelta = e.deltaX * -0.001;
        stateRef.current.targetZoom = Math.min(
          Math.max(stateRef.current.targetZoom + zoomDelta, 0.6),
          2.0
        );
      }
    };

    const onCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (const section of SECTIONS) {
        const proj = projectedNodesRef.current.get(section.id);
        if (proj && proj.visible) {
          const hitRadius = 48;
          const dist = Math.hypot(mx - proj.px, my - proj.py);
          if (dist < hitRadius) {
            scrollToSection(section.id);
            return;
          }
        }
      }
    };

    const onCanvasMoveCheckHover = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let found: string | null = null;
      for (const section of SECTIONS) {
        const proj = projectedNodesRef.current.get(section.id);
        if (proj && proj.visible) {
          const hitRadius = 46;
          const dist = Math.hypot(mx - proj.px, my - proj.py);
          if (dist < hitRadius) {
            found = section.id;
            break;
          }
        }
      }
      setHoveredNodeId(found);
      canvas.style.cursor = found
        ? "pointer"
        : stateRef.current.isDragging
        ? "grabbing"
        : "grab";
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousemove", onCanvasMoveCheckHover);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("wheel", onWheel, { passive: true });
    canvas.addEventListener("click", onCanvasClick);

    const fov = 750;
    let animationFrameId: number;

    const render = () => {
      if (!stateRef.current.isDragging) {
        stateRef.current.targetRotY += 0.0006;
        stateRef.current.velX *= 0.94;
        stateRef.current.velY *= 0.94;
        stateRef.current.targetRotY += stateRef.current.velX;
        stateRef.current.targetRotX += stateRef.current.velY;
      }

      stateRef.current.rotX +=
        (stateRef.current.targetRotX - stateRef.current.rotX) * 0.08;
      stateRef.current.rotY +=
        (stateRef.current.targetRotY - stateRef.current.rotY) * 0.08;
      stateRef.current.zoom +=
        (stateRef.current.targetZoom - stateRef.current.zoom) * 0.08;

      const cosY = Math.cos(stateRef.current.rotY);
      const sinY = Math.sin(stateRef.current.rotY);
      const cosX = Math.cos(stateRef.current.rotX);
      const sinX = Math.sin(stateRef.current.rotX);

      const cx = width / 2;
      const cy = height / 2;

      ctx.fillStyle = "#030305";
      ctx.fillRect(0, 0, width, height);

      const projectPoint = (x: number, y: number, z: number) => {
        const tx = x * stateRef.current.zoom;
        const ty = y * stateRef.current.zoom;
        const tz = z * stateRef.current.zoom;

        const x1 = tx * cosY - tz * sinY;
        const z1 = tz * cosY + tx * sinY;

        const y2 = ty * cosX - z1 * sinX;
        const z2 = z1 * cosX + ty * sinX;

        const dist = fov + z2;
        if (dist <= 10) return null;

        const scale = fov / dist;
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        return {
          px,
          py,
          z: z2,
          scale,
          visible:
            px >= -80 && px <= width + 80 && py >= -80 && py <= height + 80,
        };
      };

      // 1. Draw Star Field
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.twinklePhase += star.twinkleSpeed;
        const proj = projectPoint(star.x, star.y, star.z);
        if (!proj || !proj.visible) continue;

        const alphaMod = 0.5 + 0.5 * Math.sin(star.twinklePhase);
        const depthAlpha = Math.max(
          0.1,
          Math.min(1, 1 - (proj.z - -600) / 1800)
        );
        const finalAlpha = star.alpha * alphaMod * depthAlpha;

        ctx.fillStyle = `rgba(180, 225, 255, ${finalAlpha})`;
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, star.size * proj.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Project 3 Core Sections
      const projectedSections: Array<{
        section: AboutSection;
        px: number;
        py: number;
        z: number;
        scale: number;
        visible: boolean;
      }> = [];

      for (const section of SECTIONS) {
        const proj = projectPoint(section.x, section.y, section.z);
        if (proj) {
          projectedSections.push({ section, ...proj });
          projectedNodesRef.current.set(section.id, proj);
        }
      }

      // 3. Draw Constellation Triangle Lines
      if (projectedSections.length === 3) {
        ctx.strokeStyle = "rgba(0, 200, 255, 0.25)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(projectedSections[0].px, projectedSections[0].py);
        ctx.lineTo(projectedSections[1].px, projectedSections[1].py);
        ctx.lineTo(projectedSections[2].px, projectedSections[2].py);
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 4. Sort and Draw the 3 Nodes
      projectedSections.sort((a, b) => b.z - a.z);

      for (const item of projectedSections) {
        if (!item.visible) continue;

        const isHovered = hoveredNodeId === item.section.id;
        const baseRadius = Math.max(item.section.size * item.scale, 5);

        // Outer Glow Halo
        const glowRadius = baseRadius * (isHovered ? 3.5 : 2.2);
        const grad = ctx.createRadialGradient(
          item.px,
          item.py,
          baseRadius * 0.3,
          item.px,
          item.py,
          glowRadius
        );
        grad.addColorStop(0, "rgba(0, 200, 255, 0.6)");
        grad.addColorStop(0.5, "rgba(0, 200, 255, 0.15)");
        grad.addColorStop(1, "rgba(0, 200, 255, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(item.px, item.py, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Core Solid Circle
        ctx.fillStyle = isHovered ? "#ffffff" : "#00c8ff";
        ctx.beginPath();
        ctx.arc(item.px, item.py, baseRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node Label
        ctx.font = `bold ${Math.max(11, Math.round(12 * item.scale))}px "BlauerNue", Arial, sans-serif`;
        ctx.fillStyle = isHovered ? "#00c8ff" : "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(item.section.name, item.px, item.py + baseRadius + 8);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousemove", onCanvasMoveCheckHover);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("click", onCanvasClick);
    };
  }, [hoveredNodeId, scrollToSection]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen min-h-160 bg-[#030305] text-white overflow-hidden select-none border-b border-white/10"
    >
      {/* 1. Global Ambient Spotlights */}
      <AmbientSpotlights />

      {/* 2. Interactive 3D Spatial Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-10"
      />

      {/* 3. Subtle Scroll Cue */}
      <div className="absolute bottom-8 inset-x-0 z-20 flex justify-center pointer-events-none">
        <button
          onClick={() => scrollToSection("vision")}
          aria-label="Scroll to content"
          className="pointer-events-auto text-white/40 hover:text-[#00c8ff] text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer flex flex-col items-center gap-1"
        >
          <span className="text-[10px] tracking-[0.2em]">SCROLL</span>
          <span className="animate-bounce text-sm">↓</span>
        </button>
      </div>
    </div>
  );
};

export default ConstellationGalaxy;
