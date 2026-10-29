import { PortfolioFeatureItem } from "./types";

export const PORTFOLIO_SHOWCASE_ITEMS: PortfolioFeatureItem[] = [
  {
    id: "crm-integration",
    stepNumber: "01",
    tag: "CRM INTEGRATION",
    tagIcon: "📊",
    title: "CRM INTEGRATION",
    tagline: "Always Sell with Real-Time Accuracy.",
    description:
      "Keep your inventory perfectly synchronized across every marketing channel and showroom display—no errors, no double-bookings, no confusion.",
    highlights: [
      "Automatically updates sold, reserved, and available units in real-time",
      "Ensures 100% accurate inventory data across sales teams and client portals",
      "Direct API hooks for Salesforce, HubSpot, and bespoke proptech CRMs",
    ],
    imageUrl: "/work/eastville-2.png",
    imageAlt: "Real-time 3D compound inventory CRM integration",
    activeFilter: {
      availableCount: 142,
      soldCount: 88,
      reservedCount: 24,
    },
    projectPillText: "EastVille // Phase 01",
    metricsBadge: "REAL-TIME SYNC",
  },
  {
    id: "interactive-masterplan",
    stepNumber: "02",
    tag: "INTERACTIVE MASTERPLAN",
    tagIcon: "🗺️",
    title: "INTERACTIVE MASTERPLAN",
    tagline: "Explore Developments Before Breaking Ground.",
    description:
      "Empower prospective buyers and regional investors with geospatial site wayfinding, sun-study daylight cycles, and clickable building pins directly in browser.",
    highlights: [
      "360° orbital aerial compound exploration with fluid camera glide",
      "Real-time daylight and seasonal sun-study simulation",
      "Clickable villa and building pins with instant pricing preview",
    ],
    imageUrl: "/work/eastville-1.jpg",
    imageAlt: "Aerial interactive masterplan compound navigator",
    activeFilter: {
      availableCount: 198,
      soldCount: 114,
      reservedCount: 32,
    },
    projectPillText: "EastVille // Masterplan",
    metricsBadge: "60 FPS 3D",
  },
  {
    id: "architectural-elevations",
    stepNumber: "03",
    tag: "ELEVATIONS & FACADES",
    tagIcon: "🏢",
    title: "DYNAMIC FACADE ELEVATIONS",
    tagline: "Every Angle Visualized to the Millimeter.",
    description:
      "Switch seamlessly between front and back architectural facades, inspecting exterior materials, cantilevered balconies, spatial volumes, and structural detailing.",
    highlights: [
      "Instant toggle between front, back, and cross-section facade perspectives",
      "High-fidelity ray-traced material finishes with realistic specular reflections",
      "Unit boundary highlights and direct floorplan sheet drawer",
    ],
    imageUrl: "/work/diva-1.png",
    imageAlt: "Dynamic architectural elevations and building facade visualizer",
    projectPillText: "Diva Residence // Elevation A",
    metricsBadge: "FACADE INSPECTOR",
  },
  {
    id: "smart-unit-search",
    stepNumber: "04",
    tag: "SMART UNIT INVENTORY",
    tagIcon: "🔍",
    title: "SUB-SECOND UNIT SEARCH",
    tagline: "Instant Filtering By Typology, Area & Budget.",
    description:
      "Replace cumbersome PDF brochures with an ultra-fast unit search engine. Buyers and brokers filter by room count, gross internal area, floor level, and price tier in milliseconds.",
    highlights: [
      "Multi-parameter search by unit code, typology, and square meters",
      "Interactive 2D & 3D floorplan overlays with architectural dimensioning",
      "Instant reservation inquiry button linked directly to sales team",
    ],
    imageUrl: "/work/diva-2.jpg",
    imageAlt: "Smart unit search engine and interior floorplans",
    activeFilter: {
      availableCount: 64,
      soldCount: 112,
      reservedCount: 16,
    },
    projectPillText: "Diva Residence // Unit Explorer",
    metricsBadge: "< 100MS LATENCY",
  },
  {
    id: "360-virtual-tours",
    stepNumber: "05",
    tag: "360° VIRTUAL WALKTHROUGHS",
    tagIcon: "🌐",
    title: "SPATIAL DIGITAL TWIN",
    tagline: "Immersive Showroom Experience Anywhere in the World.",
    description:
      "Full-screen cinematic virtual walkthroughs designed for VIP sales centers and high-net-worth international clients. Experience every corridor and luxury amenity before construction.",
    highlights: [
      "Ultra-responsive touch navigation tailored for physical showroom video walls",
      "Seamless orbital movement from the main gate to private interior atriums",
      "Zero app installation required—runs smoothly across desktop, tablet, and mobile",
    ],
    imageUrl: "/showcase-1.jpg",
    imageAlt: "Immersive architectural spatial digital twin walkthrough",
    projectPillText: "Helical Atrium // 360° Walkthrough",
    metricsBadge: "4K IMMERSIVE",
  },
];
