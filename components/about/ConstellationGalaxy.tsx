"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@/svgs";

// ============================================================================
// DATA: Nodes with exact content from KV Studio About Us & Practice
// ============================================================================
export interface GalaxySection {
  id: string;
  name: string;
  tabLabel: string;
  category: string;
  number: string;
  // 3D coordinates in space
  x: number;
  y: number;
  z: number;
  size: number;
  isMajor: boolean;
  eyebrow: string;
  headline: string;
  description: string;
  quote?: string;
  giantBottomText: string;
  action?: { label: string; href: string };
}

const SECTIONS: GalaxySection[] = [
  {
    id: "our-story",
    name: "OUR STORY",
    tabLabel: "OUR STORY",
    category: "01 / OUR STORY",
    number: "01",
    x: -280,
    y: -70,
    z: 30,
    size: 9,
    isMajor: true,
    eyebrow: "KNOWLEDGE PLUS VISION",
    headline: "TURNING AMBITIOUS IDEAS INTO ARCHITECTURAL REALITY",
    description:
      "KV Studio is a creative architecture and visualization practice dedicated to turning ideas into reality. We specialize in architectural, interior, and landscape design, complemented by cutting-edge visualization, lighting design, and interactive solutions.",
    quote:
      "Driven by innovation, guided by design, and powered by technology, Knowledge Plus Vision is not just a visualization studio – it’s a partner in shaping the future of spaces.",
    giantBottomText: "OUR STORY",
    action: { label: "VIEW OUR PROJECTS", href: "/portfolio" },
  },
  {
    id: "our-vision",
    name: "OUR VISION",
    tabLabel: "OUR VISION",
    category: "02 / OUR VISION",
    number: "02",
    x: 310,
    y: -40,
    z: -40,
    size: 9,
    isMajor: true,
    eyebrow: "ARCHITECTURAL BENCHMARKS",
    headline: "SETTING NEW BENCHMARKS IN REAL-TIME ARCHITECTURAL VISUALIZATION",
    description:
      "Precision engineering • Immersive spatial engines • Uncompromised aesthetics. Born from a desire to liberate architectural spaces from flat, non-responsive representations into living computational environments.",
    quote:
      "Human-centric storytelling meets algorithmic spatial optimization. Zero compromises on material physics, photometric sunlight accuracy, and spatial scale.",
    giantBottomText: "OUR VISION",
    action: { label: "DISCOVER CAPABILITIES", href: "/services" },
  },
  {
    id: "experience",
    name: "EXPERIENCE",
    tabLabel: "EXPERIENCE",
    category: "GLOBAL SCALE & TRACK RECORD",
    number: "03",
    x: -340,
    y: 80,
    z: 50,
    size: 8,
    isMajor: true,
    eyebrow: "PRACTICE & GLOBAL SCALE",
    headline: "OVER 150+ MASTERPLANS AND REAL-TIME DIGITAL TWINS DELIVERED",
    description:
      "A decade at the convergence of architectural engineering, Revit BIM accuracy, and cinematic visualization. From flagship physical & digital sales galleries to multi-billion dollar masterplans across Cairo, the GCC, and Europe.",
    quote:
      "Pioneered the iMaquette touch-table digital scale model for high-density sales pavilions.",
    giantBottomText: "EXPERIENCE",
    action: { label: "EXPLORE PORTFOLIO", href: "/portfolio" },
  },
  {
    id: "skills",
    name: "SKILLS",
    tabLabel: "SKILLS",
    category: "COMPUTATIONAL ENGINES",
    number: "04",
    x: -80,
    y: -150,
    z: 80,
    size: 6,
    isMajor: false,
    eyebrow: "HIGH-COMPUTE GRAPHICS",
    headline: "UNREAL ENGINE 5.4, REVIT BIM & WEBGL SPATIAL ENGINEERING",
    description:
      "Autodesk Revit, BIM 360, Rhino 8 Grasshopper parametric computation, Next.js 16, GSAP kinetic motion, and Three.js spatial web development. Bridging the critical gap between conceptual ambition and physical constructibility.",
    quote:
      "Sub-millimeter architectural fidelity coupled with 60 FPS real-time rendering.",
    giantBottomText: "SKILLS",
    action: { label: "VIEW SERVICES", href: "/services" },
  },
  {
    id: "clients",
    name: "CLIENTS",
    tabLabel: "CLIENTS",
    category: "STRATEGIC PARTNERS",
    number: "05",
    x: 100,
    y: 20,
    z: 10,
    size: 7,
    isMajor: false,
    eyebrow: "INDUSTRY TITANS",
    headline: "TRUSTED BY LEADING REAL-ESTATE CONGLOMERATES & ATELIERS",
    description:
      "Long-term alliances with forward-thinking property conglomerates and private studios: Ajna Developments, Diva Atelier, Eastville Residences, Palm Hills, and Emaar Partners.",
    quote:
      "Empowering sales teams and developers to showcase master developments with kinetic precision.",
    giantBottomText: "CLIENTS",
    action: { label: "REQUEST A PROPOSAL", href: "/Contact" },
  },
  {
    id: "approach",
    name: "APPROACH",
    tabLabel: "APPROACH",
    category: "METHODOLOGY & CRAFT",
    number: "06",
    x: 190,
    y: 190,
    z: 60,
    size: 6,
    isMajor: false,
    eyebrow: "METHODOLOGY & CRAFT",
    headline: "THE THREE PILLARS: DISCOVER // COMPUTE // TRANSCEND",
    description:
      "A systematic three-phase methodology: 01 Spatial Precision (CAD/Revit audit) -> 02 Photorealistic Realism (IES photometric lighting and material chemistry) -> 03 Kinetic Interaction (touch-kiosk software and fluid web flagships).",
    quote:
      "Preserving architectural integrity from first conceptual wireframe to final 8K delivery.",
    giantBottomText: "APPROACH",
    action: { label: "CONTACT US", href: "/Contact" },
  },
  {
    id: "contact",
    name: "CONTACT",
    tabLabel: "CONTACT",
    category: "DIRECT ENGAGEMENT",
    number: "07",
    x: -20,
    y: 20,
    z: -70,
    size: 6,
    isMajor: false,
    eyebrow: "AWAKE ANYWAY",
    headline: "PROJECTS, COLLABORATIONS, OR JUST A HELLO ABOUT THIS PRACTICE",
    description:
      "We are open for ambitious architectural commissions, real-time sales galleries, and spatial digital flagships. Late-night messages are welcome. We're awake anyway.",
    quote:
      "Cairo Studio: New Cairo Tech & Architectural District • Direct: info@kvstudio.com",
    giantBottomText: "CONTACT",
    action: { label: "START A CONVERSATION", href: "/Contact" },
  },
];

// Alphanumeric matrix dust floating outside the light cone
const MATRIX_GLYPHS = [
  "%", "7", "4", "0", "1", "8", "?", "*", "/", "^", "3", "9", "2", "5", "6", "@", "#", "$",
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

interface FloatingGlyph {
  char: string;
  x: number;
  y: number;
  speed: number;
  alpha: number;
  size: number;
}

// Deterministic pseudo-random matrix glyphs (100% Identical on SSR & Client - Zero Hydration Mismatch)
const STATIC_GLYPHS: FloatingGlyph[] = Array.from({ length: 80 }, (_, i) => {
  const seedX = ((i * 37.7) % 94) + 3;
  const seedY = ((i * 59.3) % 92) + 4;
  const seedAlpha = 0.12 + ((i * 19) % 25) / 100;
  const seedSize = 9 + (i % 7);
  return {
    char: MATRIX_GLYPHS[i % MATRIX_GLYPHS.length],
    x: Number(seedX.toFixed(2)),
    y: Number(seedY.toFixed(2)),
    speed: 0.1,
    alpha: Number(seedAlpha.toFixed(2)),
    size: seedSize,
  };
});

export const ConstellationGalaxy: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lampContainerRef = useRef<HTMLDivElement | null>(null);
  const coneRef = useRef<HTMLDivElement | null>(null);
  const rootWrapperRef = useRef<HTMLDivElement | null>(null);

  // States
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("our-story");
  const [currentView, setCurrentView] = useState<"galaxy" | "lamp">("galaxy");
  const [isLampOn, setIsLampOn] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Audio Context
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);

  // Auto-start ambient sound on first user interaction (browser policy requires user gesture)
  const initSound = useCallback(() => {
    if (audioCtxRef.current) return; // already initialised
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(58.27, ctx.currentTime);
      gain.gain.setValueAtTime(0.012, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      droneOscRef.current = osc;
      droneGainRef.current = gain;
      setSoundEnabled(true);
    } catch {
      setSoundEnabled(false);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);

    // Auto-init sound on ANY first user interaction anywhere on the page
    const handleFirstInteraction = () => {
      initSound();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [initSound]);

  // Crosshair coordinates inside the lamp cone
  const [crosshairPos, setCrosshairPos] = useState<{ x: number; y: number } | null>(null);

  // Travelling Arrow State (Shoots DOWN from constellation into the waiting lamp below)
  const [beamData, setBeamData] = useState<{
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
    progress: number;
  } | null>(null);

  // Rotation, camera & lamp physics state
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
    // Interactive mouse-tracking lamp physics
    // mouseX/targetMouseX: light cone apex tracks mouse directly
    // lampOffsetX: lamp body moves OPPOSITE to mouse (counterweight pendulum)
    lampAngle: 0,
    targetLampAngle: 0,
    lampOffsetX: 0,
    targetLampOffset: 0,
    mouseX: 0,
    targetMouseX: 0,
  });

  const projectedNodesRef = useRef<Map<string, { px: number; py: number; visible: boolean; scale: number }>>(
    new Map()
  );

  // ────────────────────────────────────────────────────────────────────────
  // SOUND SYNTHESIS
  // ────────────────────────────────────────────────────────────────────────
  const playClickSound = useCallback(() => {
    if (!audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignore
    }
  }, []);

  const playBeamSound = useCallback(() => {
    if (!audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.55);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.55);
    } catch {
      // Ignore
    }
  }, []);

  // ────────────────────────────────────────────────────────────────────────
  // SCROLL DOWN TO LAMP WAITING BELOW
  // "عايز يسكرول لتحت والمصباح يكون مستنيه تحت مش يعمل اسكرول لتحت بعدين يطلع فوق"
  // ────────────────────────────────────────────────────────────────────────
  const triggerLampSequence = useCallback(
    (sectionId: string) => {
      initSound();
      if (isTransitioning || currentView === "lamp") return;
      setActiveSectionId(sectionId);
      setIsTransitioning(true);
      playBeamSound();

      const proj = projectedNodesRef.current.get(sectionId);
      const startX = proj ? proj.px : window.innerWidth * 0.35;
      const startY = proj ? proj.py : window.innerHeight * 0.5;

      const targetX = window.innerWidth / 2;
      const targetY = 72; // Where the lamp is waiting in Section 2

      // Immediately initiate smooth downward scroll to Section 2
      setCurrentView("lamp");

      const duration = 800; // ms: matches the 100vh scroll duration
      const startTime = performance.now();

      const animateBeam = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(elapsed / duration, 1);
        // Cubic easing
        const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

        setBeamData({
          startX,
          startY,
          targetX,
          targetY,
          progress: eased,
        });

        if (p < 1) {
          requestAnimationFrame(animateBeam);
        } else {
          // Arrow reached the lamp waiting below!
          setBeamData(null);
          playClickSound();
          setIsLampOn(true);
          setIsTransitioning(false);
        }
      };

      requestAnimationFrame(animateBeam);
    },
    [currentView, isTransitioning, playBeamSound, playClickSound]
  );

  // Return back UP to Section 1 (3D Constellation)
  const handleGoBack = useCallback(() => {
    playClickSound();
    setIsLampOn(false);
    setCurrentView("galaxy");
    stateRef.current.targetLampAngle = 0;
    stateRef.current.targetLampOffset = 0;
    stateRef.current.lampOffsetX = 0;
    stateRef.current.lampAngle = 0;
    stateRef.current.targetMouseX = window.innerWidth / 2;
    stateRef.current.mouseX = window.innerWidth / 2;
  }, [playClickSound]);

  // Keyboard Escape listener to return back to Constellation effortlessly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && currentView === "lamp") {
        handleGoBack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentView, handleGoBack]);

  const activeSection =
    SECTIONS.find((s) => s.id === activeSectionId) || SECTIONS[0];

  // ────────────────────────────────────────────────────────────────────────
  // 3D CONSTELLATION & LAMP PHYSICS LOOP (Pure Monochrome White & Black)
  // ────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Starfield Points (Pure White)
    const starCount = 380;
    const stars: StarPoint[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1200,
        y: (Math.random() - 0.5) * 900,
        z: (Math.random() - 0.5) * 1200,
        size: Math.random() < 0.12 ? Math.random() * 2 + 1.2 : Math.random() * 1.1 + 0.35,
        alpha: Math.random() * 0.65 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    const onMouseDown = (e: MouseEvent) => {
      if (currentView === "lamp") return;
      stateRef.current.isDragging = true;
      stateRef.current.lastMouseX = e.clientX;
      stateRef.current.lastMouseY = e.clientY;
      stateRef.current.velX = 0;
      stateRef.current.velY = 0;
    };

    // Mouse Move: Controls constellation parallax OR lamp mouse-tracking (Left/Right)
    const onMouseMove = (e: MouseEvent) => {
      if (currentView === "lamp") {
        const normX = e.clientX / window.innerWidth - 0.5;

        // ── SPOTLIGHT PHYSICS ───────────────────────────────────────────────
        // 1. Light cone follows the mouse DIRECTLY (تتبع الضوء للماوس مباشرة)
        stateRef.current.targetMouseX = e.clientX;

        // 2. Lamp body swings OPPOSITE (counterweight pendulum feel)
        stateRef.current.targetLampOffset = -normX * 100;

        // 3. Shade tilts toward the light target (shows it's "directing" the beam)
        stateRef.current.targetLampAngle = normX * 18;

        setCrosshairPos({ x: e.clientX, y: e.clientY });
        return;
      }

      if (stateRef.current.isDragging) {
        const dx = e.clientX - stateRef.current.lastMouseX;
        const dy = e.clientY - stateRef.current.lastMouseY;
        stateRef.current.targetRotY += dx * 0.0032;
        stateRef.current.targetRotX += dy * 0.0032;
        stateRef.current.velX = dx * 0.0032;
        stateRef.current.velY = dy * 0.0032;
        stateRef.current.lastMouseX = e.clientX;
        stateRef.current.lastMouseY = e.clientY;
      } else {
        const ndx = (e.clientX / width - 0.5) * 0.05;
        const ndy = (e.clientY / height - 0.5) * 0.05;
        stateRef.current.rotX += (ndy - stateRef.current.rotX) * 0.01;
        stateRef.current.rotY += (ndx - stateRef.current.rotY) * 0.01;
      }
    };

    const onMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    // Wheel Scroll support: Scroll down goes to lamp, scroll up goes to galaxy
    const onWheel = (e: WheelEvent) => {
      if (currentView === "galaxy" && e.deltaY > 60) {
        triggerLampSequence(activeSectionId);
        return;
      }
      if (currentView === "lamp" && e.deltaY < -60) {
        handleGoBack();
        return;
      }

      if (currentView === "galaxy") {
        e.preventDefault();
        const zoomDelta = e.deltaY * -0.001;
        stateRef.current.targetZoom = Math.min(
          Math.max(stateRef.current.targetZoom + zoomDelta, 0.6),
          2.2
        );
      }
    };

    const onCanvasClick = (e: MouseEvent) => {
      if (currentView === "lamp" || isTransitioning) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (const section of SECTIONS) {
        const proj = projectedNodesRef.current.get(section.id);
        if (proj && proj.visible) {
          const hitRadius = section.isMajor ? 48 : 34;
          const dist = Math.hypot(mx - proj.px, my - proj.py);
          if (dist < hitRadius) {
            triggerLampSequence(section.id);
            return;
          }
        }
      }
    };

    const onCanvasMoveCheckHover = (e: MouseEvent) => {
      if (currentView === "lamp") return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let found: string | null = null;

      for (const section of SECTIONS) {
        const proj = projectedNodesRef.current.get(section.id);
        if (proj && proj.visible) {
          const hitRadius = section.isMajor ? 44 : 30;
          const dist = Math.hypot(mx - proj.px, my - proj.py);
          if (dist < hitRadius) {
            found = section.id;
            break;
          }
        }
      }
      setHoveredNodeId(found);
      canvas.style.cursor = found ? "pointer" : stateRef.current.isDragging ? "grabbing" : "grab";
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousemove", onCanvasMoveCheckHover);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("click", onCanvasClick);

    const fov = 720;
    let time = 0;

    const render = () => {
      time += 0.016;

      if (!stateRef.current.isDragging && currentView === "galaxy") {
        stateRef.current.targetRotY += stateRef.current.velX;
        stateRef.current.targetRotX += stateRef.current.velY;
        stateRef.current.velX *= 0.94;
        stateRef.current.velY *= 0.94;
        stateRef.current.targetRotY += 0.0005;
      }

      stateRef.current.rotX += (stateRef.current.targetRotX - stateRef.current.rotX) * 0.08;
      stateRef.current.rotY += (stateRef.current.targetRotY - stateRef.current.rotY) * 0.08;
      stateRef.current.zoom += (stateRef.current.targetZoom - stateRef.current.zoom) * 0.08;

      // Lamp Mouse Tracking Physics in Section 2
      // ── SPOTLIGHT PHYSICS ───────────────────────────────────────────────────
      // • mouseX    → smoothly tracks mouse X (light cone center)
      // • lampOffsetX → moves OPPOSITE to mouse (counterweight)
      // • lampAngle   → shade tilts toward the light target
      if (isLampOn) {
        // Smooth mouse X tracking for the light cone (ناعم ومرن)
        stateRef.current.mouseX +=
          (stateRef.current.targetMouseX - stateRef.current.mouseX) * 0.07;

        // Lamp body & angle with gentle pendulum easing
        stateRef.current.lampAngle +=
          (stateRef.current.targetLampAngle - stateRef.current.lampAngle) * 0.055;
        stateRef.current.lampOffsetX +=
          (stateRef.current.targetLampOffset - stateRef.current.lampOffsetX) * 0.065;

        const offX = stateRef.current.lampOffsetX;
        const ang  = stateRef.current.lampAngle;
        const coneTargetX = stateRef.current.mouseX || width / 2;

        if (lampContainerRef.current) {
          lampContainerRef.current.style.transform = `translateX(${offX}px) rotate(${ang}deg)`;
        }

        if (coneRef.current) {
          const rad = (ang * Math.PI) / 180;
          // Bulb world position (pivot of the light cone)
          const bulbX = width / 2 + offX + Math.sin(rad) * 70;
          const bulbY = Math.max(Math.cos(rad) * 70, 68);

          // ── LIGHT CONE ────────────────────────────────────────────────────
          // Apex  = bulb position (follows lamp)
          // Base  = centered on the MOUSE X (light follows mouse directly)
          // This creates the spotlight effect: aim with mouse, lamp reacts opposite
          const spread = width * 0.36;
          const bLeft  = coneTargetX - spread;
          const bRight = coneTargetX + spread;

          coneRef.current.style.clipPath =
            `polygon(${bulbX}px ${bulbY}px, ${bRight}px 100%, ${bLeft}px 100%)`;
        }
      }

      const cosY = Math.cos(stateRef.current.rotY);
      const sinY = Math.sin(stateRef.current.rotY);
      const cosX = Math.cos(stateRef.current.rotX);
      const sinX = Math.sin(stateRef.current.rotX);

      const cx = width / 2;
      const cy = height / 2;

      ctx.fillStyle = "#050508";
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

        return { px, py, z: z2, scale, visible: px >= -80 && px <= width + 80 && py >= -80 && py <= height + 80 };
      };

      // Draw Stars (Pure White)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const proj = projectPoint(s.x, s.y, s.z);
        if (!proj || !proj.visible) continue;

        const twinkle = Math.sin(time * 3 + s.twinklePhase) * 0.3 + 0.7;
        const alpha = Math.min(Math.max(s.alpha * twinkle * proj.scale, 0.06), 0.9);
        const radius = Math.max(s.size * proj.scale, 0.45);

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Project Nodes
      const projectedNodes: {
        section: GalaxySection;
        px: number;
        py: number;
        z: number;
        scale: number;
        isHovered: boolean;
      }[] = [];

      for (const section of SECTIONS) {
        const proj = projectPoint(section.x, section.y, section.z);
        if (proj) {
          projectedNodesRef.current.set(section.id, {
            px: proj.px,
            py: proj.py,
            visible: proj.visible,
            scale: proj.scale,
          });
          if (proj.visible) {
            projectedNodes.push({
              section,
              px: proj.px,
              py: proj.py,
              z: proj.z,
              scale: proj.scale,
              isHovered: hoveredNodeId === section.id,
            });
          }
        }
      }

      // Draw Plexus Lines (Pure White Monochrome)
      ctx.lineWidth = 1;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];

          const dx = n1.section.x - n2.section.x;
          const dy = n1.section.y - n2.section.y;
          const dz = n1.section.z - n2.section.z;
          const dist3D = Math.hypot(dx, dy, dz);

          const maxDist = 480;
          if (dist3D < maxDist) {
            const isHighlight = n1.isHovered || n2.isHovered;
            const baseAlpha = (1 - dist3D / maxDist) * 0.32;
            const alpha = isHighlight ? Math.min(baseAlpha * 2.8, 0.85) : baseAlpha * 0.55;

            // PURE WHITE LINES ONLY
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.px, n1.py);
            ctx.lineTo(n2.px, n2.py);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes & Spatial Labels (Pure White Monochrome)
      projectedNodes.sort((a, b) => b.z - a.z);

      for (const item of projectedNodes) {
        const { section, px, py, scale, isHovered } = item;
        const nodeRadius = (section.size * scale * (isHovered ? 1.4 : 1)) || 4;

        if (section.isMajor || isHovered) {
          const haloRadius = nodeRadius * (isHovered ? 4.5 : 2.8);
          const halo = ctx.createRadialGradient(px, py, nodeRadius * 0.5, px, py, haloRadius);
          // Pure White Glow
          halo.addColorStop(0, isHovered ? "rgba(255, 255, 255, 0.65)" : "rgba(255, 255, 255, 0.28)");
          halo.addColorStop(0.6, isHovered ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)");
          halo.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(px, py, haloRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Solid White Core
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(px, py, Math.max(nodeRadius, 2), 0, Math.PI * 2);
        ctx.fill();

        if (section.isMajor || isHovered) {
          ctx.strokeStyle = isHovered ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.35)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(px, py, nodeRadius * 1.8, 0, Math.PI * 2);
          ctx.stroke();
        }

        const fontSize = Math.round(
          section.isMajor
            ? Math.max(16 * scale, 13)
            : Math.max(10 * scale, 8.5)
        );

        ctx.save();
        ctx.font = section.isMajor
          ? `900 ${fontSize}px 'BlauerNue', -apple-system, sans-serif`
          : `700 ${fontSize}px 'BlauerNue', monospace, sans-serif`;

        ctx.letterSpacing = section.isMajor ? "0.15em" : "0.22em";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        const textOffsetX = px + nodeRadius + 10;
        const textOffsetY = py;

        ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
        ctx.shadowBlur = 12;

        // Pure White Typography
        ctx.fillStyle = isHovered ? "#ffffff" : section.isMajor ? "#ffffff" : "rgba(255, 255, 255, 0.72)";
        ctx.fillText(section.name, textOffsetX, textOffsetY);

        if (isHovered) {
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(textOffsetX + ctx.measureText(section.name).width + 8, textOffsetY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousemove", onCanvasMoveCheckHover);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("click", onCanvasClick);
    };
  }, [activeSectionId, currentView, handleGoBack, isLampOn, isTransitioning, triggerLampSequence]);

  return (
    <div
      ref={rootWrapperRef}
      className="relative w-full h-screen overflow-hidden bg-[#050508] text-white select-none font-mono"
    >
      {/* ─────────────────────────────────────────────────────────────
          SMOOTH VERTICAL SLIDING WRAPPER (100vh Scroll)
          "عايز يسكرول لتحت والمصباح يكون مستنيه تحت"
          Section 1: 3D Constellation (top)
          Section 2: Lamp & Spotlight Room (below)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="w-full transition-transform duration-850 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: currentView === "lamp" ? "translateY(-100vh)" : "translateY(0vh)",
        }}
      >
        {/* =============================================================
            SECTION 1: PURE 3D CONSTELLATION GALAXY (100vh)
            ============================================================= */}
        <section className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
          {/* Canvas Engine — click anywhere to init audio (browser policy) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block z-0"
            style={{ touchAction: "none" }}
            onClick={initSound}
          />

          {/* Lateral Wing Links (< MAIN / PORTFOLIO >) */}
          <div className="absolute inset-y-0 left-6 sm:left-10 flex items-center z-20 pointer-events-none">
            <Link
              href="/"
              className="pointer-events-auto flex items-center gap-2 text-xs tracking-[0.22em] text-white/60 hover:text-white hover:-translate-x-1 transition-all"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5 stroke-current" />
              <span>MAIN</span>
            </Link>
          </div>

          <div className="absolute inset-y-0 right-6 sm:right-10 flex items-center z-20 pointer-events-none">
            <Link
              href="/portfolio"
              className="pointer-events-auto flex items-center gap-2 text-xs tracking-[0.22em] text-white/60 hover:text-white hover:translate-x-1 transition-all"
            >
              <span>PORTFOLIO</span>
              <ArrowRightIcon className="w-3.5 h-3.5 stroke-current" />
            </Link>
          </div>

          {/* Switch to Classic Editorial View */}
          <div className="absolute bottom-6 right-6 sm:right-10 z-30 pointer-events-auto">
            <Link
              href="/About"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 hover:bg-white text-white/70 hover:text-black border border-white/20 font-mono text-[10px] uppercase tracking-wider transition-all backdrop-blur-md"
            >
              <span>EDITORIAL VIEW</span>
              <span>↗</span>
            </Link>
          </div>
        </section>

        {/* =============================================================
            SECTION 2: THE LAMP & SPOTLIGHT ROOM (100vh WAITING BELOW)
            "يسكرول لتحت والمصباح يكون مستنيه تحت"
            ============================================================= */}
        <section
          className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-start bg-[#050508] pointer-events-auto"
          onMouseMove={(e) => {
            setCrosshairPos({ x: e.clientX, y: e.clientY });
          }}
          onMouseLeave={() => {
            setCrosshairPos(null);
            stateRef.current.targetLampAngle = 0;
            stateRef.current.targetLampOffset = 0;
            // Return light cone to center
            stateRef.current.targetMouseX = window.innerWidth / 2;
          }}
        >
          {/* A. Floating Matrix Numbers/Glyphs in the Dark Outside the Cone (Zero Hydration Mismatch) */}
          {isMounted && (
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              {STATIC_GLYPHS.map((g, i) => (
                <span
                  key={i}
                  className="absolute text-white/30 font-mono select-none"
                  style={{
                    left: `${g.x}%`,
                    top: `${g.y}%`,
                    fontSize: `${g.size}px`,
                    opacity: g.alpha,
                  }}
                >
                  {g.char}
                </span>
              ))}
            </div>
          )}

          {/* B. The Massive Conical Light Beam Polygon (Pure White & Stone Light) */}
          <div
            ref={coneRef}
            className={`absolute inset-0 pointer-events-none transition-all duration-75 ease-out ${
              isLampOn ? "opacity-100" : "opacity-0"
            }`}
            style={{
              clipPath: "polygon(50% 72px, 88% 100%, 12% 100%)",
              background:
                "linear-gradient(180deg, #ffffff 0%, #f4f3f0 35%, #eae7e0 80%, #dedad1 100%)",
              boxShadow: "0 0 140px rgba(255,255,255,0.45)",
            }}
          >
            {/* Paper grain texture */}
            <div className="absolute inset-0 opacity-20 mix-blend-multiply bg-[radial-gradient(#000000_1px,transparent_1px)] bg-size-[16px_16px]" />
          </div>

          {/* Dedicated Fixed < GO BACK Button next to Lamp (z-50, unblockable hitbox) */}
          {/* <div className="absolute top-8 left-1/2 ml-14 sm:ml-18 z-100 curosre-pointer pointer-events-auto">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleGoBack();
              }}
              title="Click or press Esc to return to Constellation Galaxy"
              className="font-mono text-xs uppercase tracking-widest text-white hover:text-white transition-all flex items-center gap-1.5 cursor-pointer py-1.5 px-3 bg-black/85 hover:bg-black border border-white/40 hover:border-white shadow-xl active:scale-95"
            >
              <span>&lt;</span>
              <span className="font-bold">GO BACK</span>
            </button>
          </div> */}

          {/* C. Hanging Pendant Lamp (Hanging from top edge of Section 2, Waiting for you!) */}
          <div
            ref={lampContainerRef}
            className="relative z-30 flex flex-col items-center mt-0 pointer-events-auto will-change-transform"
            style={{
              transformOrigin: "top center",
            }}
          >
            {/* Hanging Cord */}
            <div className="w-[1.5px] h-11 bg-white/60" />

            {/* Lamp Shade (Pendant Cone) */}
            <div className="relative flex flex-col items-center">
              <svg width="64" height="32" viewBox="0 0 64 32" className="drop-shadow-2xl">
                <polygon
                  points="18,0 46,0 62,30 2,30"
                  fill="#24232a"
                  stroke="#555361"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Glowing Bulb under shade (Pure White) */}
              <div
                className={`relative -mt-1.5 w-5 h-5 rounded-full bg-white transition-all duration-300 ${
                  isLampOn
                    ? "shadow-[0_0_30px_#ffffff,0_0_60px_rgba(255,255,255,0.95)]"
                    : "opacity-40"
                }`}
              />

              {/* Interactive Pull String hanging down on right */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleGoBack();
                }}
                title="Click or pull string to turn off lamp and scroll back up"
                className="absolute top-7 right-2 flex flex-col items-center group cursor-pointer z-40"
              >
                <div className="w-px h-14 bg-neutral-600 group-hover:h-16 transition-all" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-400 border border-black shadow-md group-hover:bg-white group-hover:scale-125 transition-all" />
              </button>
            </div>
          </div>

          {/* D. Interactive Crosshair Cursor Inside Light Cone */}
          {crosshairPos && isLampOn && (
            <div
              className="fixed pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: crosshairPos.x, top: crosshairPos.y }}
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute w-full h-px bg-black/60" />
                <div className="absolute h-full w-px bg-black/60" />
                <div className="w-2 h-2 border border-black/80 rounded-full" />
              </div>
            </div>
          )}

          {/* E. Content Inside the Light Cone (About Us Data, Tab bar & Giant Typography) */}
          {isLampOn && (
            <div className="relative z-20 w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-between pt-16 sm:pt-20 pb-4 px-6 sm:px-12 text-center text-black pointer-events-none animate-in fade-in duration-500">
              {/* 1. Subtitle / Eyebrow */}
              <div className="flex flex-col items-center gap-2 mt-4 sm:mt-8 pointer-events-auto">
                <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-neutral-800">
                  {activeSection.eyebrow}
                </span>

                {/* 2. Main Narrative from About Us */}
                <div className="max-w-2xl mx-auto flex flex-col gap-3 mt-2">
                  <h2 className="font-['BlauerNue',sans-serif] text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-black leading-snug">
                    {activeSection.headline}
                  </h2>
                  <p className="font-mono text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                    {activeSection.description}
                  </p>

                  {activeSection.quote && (
                    <p className="font-['BlauerNue',sans-serif] text-xs sm:text-sm font-bold uppercase tracking-wider text-black/90 mt-1 italic">
                      &ldquo;{activeSection.quote}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              {/* 3. Horizontal Section Tabs Bar */}
              <div className="w-full flex flex-col items-center gap-6 my-auto pt-6 pointer-events-auto">
                <nav
                  aria-label="Spotlight Sections"
                  className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 py-2.5 px-4 border-t border-b border-black/15 font-mono text-[10px] sm:text-xs uppercase tracking-wider"
                >
                  {SECTIONS.map((sec) => {
                    const isActive = activeSectionId === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => {
                          playClickSound();
                          setActiveSectionId(sec.id);
                        }}
                        className={`transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                          isActive
                            ? "font-black text-black scale-105"
                            : "text-neutral-600 hover:text-black font-semibold"
                        }`}
                      >
                        {isActive && <span className="font-black text-black">&gt;</span>}
                        <span>{sec.tabLabel}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Action Link */}
                {activeSection.action && (
                  <Link
                    href={activeSection.action.href}
                    className="inline-flex items-center gap-3 px-7 py-3 bg-black text-white hover:bg-neutral-800 font-['BlauerNue',sans-serif] text-xs font-black uppercase tracking-widest transition-all shadow-xl rounded-none cursor-pointer"
                  >
                    <span>{activeSection.action.label}</span>
                    <span>→</span>
                  </Link>
                )}
              </div>

              {/* 4. Giant Hero Brutalist Typography at Bottom */}
              <div className="w-full overflow-hidden flex justify-center items-end select-none pointer-events-none -mb-8 sm:-mb-14">
                <h1 className="font-['BlauerNue',sans-serif] text-[15vw] sm:text-[17vw] md:text-[18vw] font-black uppercase tracking-tighter leading-[0.72] text-black whitespace-nowrap opacity-95">
                  {activeSection.giantBottomText}
                </h1>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TRAVELLING PURE WHITE ARROW BEAM ANIMATION
          (Streams DOWN from constellation into the waiting lamp below)
          ───────────────────────────────────────────────────────────── */}
      {beamData && (
        <svg className="fixed inset-0 w-full h-full pointer-events-none z-50">
          <defs>
            <linearGradient id="pureWhiteBeam" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
            <filter id="whiteLaserGlow">
              <feGaussianBlur stdDeviation="3.5" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {(() => {
            const { startX, startY, targetX, targetY, progress } = beamData;
            const midX = targetX; // screen center
            const lampTopY = targetY; // 72px

            // Current coordinates streaming DOWN into the lamp
            const cpX = (startX + midX) / 2;
            const cpY = startY + (window.innerHeight - startY) * 0.4;

            const t = progress;
            const currentX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * cpX + t * t * midX;
            const currentY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * cpY + t * t * lampTopY;

            const dx = 2 * (1 - t) * (cpX - startX) + 2 * t * (midX - cpX);
            const dy = 2 * (1 - t) * (cpY - startY) + 2 * t * (lampTopY - cpY);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            return (
              <g filter="url(#whiteLaserGlow)">
                {/* Luminous Pure White Trail */}
                <path
                  d={`M ${startX} ${startY} Q ${cpX} ${cpY} ${currentX} ${currentY}`}
                  fill="none"
                  stroke="url(#pureWhiteBeam)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Leading Pure White Arrow */}
                <g transform={`translate(${currentX}, ${currentY}) rotate(${angle})`}>
                  <polygon points="0,0 -14,-7 -10,0 -14,7" fill="#ffffff" />
                  <circle cx="0" cy="0" r="14" fill="rgba(255,255,255,0.4)" />
                </g>
              </g>
            );
          })()}
        </svg>
      )}
    </div>
  );
};

export default ConstellationGalaxy;
