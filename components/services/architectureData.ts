export interface ArchitectureProject {
  id: string;
  title: string;
  subdiscipline: "architecture-design" | "bim";
  subdisciplineLabel: string;
  category: string;
  description: string;
  coverImage: string;
  images: {
    url: string;
    caption: string;
  }[];
}

export const ARCHITECTURE_DESIGN_PROJECTS: ArchitectureProject[] = [
  {
    id: "homex",
    title: "HOMEX",
    subdiscipline: "architecture-design",
    subdisciplineLabel: "ARCHITECTURE DESIGN",
    category: "Residential & Commercial Architecture",
    description:
      "Contemporary architectural master concept combining geometric facade dynamism, sustainable daylight distribution, and luxury residential programming.",
    coverImage: "/HOMEX/01.webp",
    images: [
      { url: "/HOMEX/01.webp", caption: "HOMEX — Primary Exterior Facade View" },
      { url: "/HOMEX/02.webp", caption: "HOMEX — Volumetric Corner Perspective" },
      { url: "/HOMEX/03.webp", caption: "HOMEX — Architectural Detail & Shading" },
      { url: "/HOMEX/04.webp", caption: "HOMEX — Streetscape Horizon Elevation" },
      { url: "/HOMEX/01-1.webp", caption: "HOMEX — Sunset Atmospheric Lighting" },
      { url: "/HOMEX/01-2.webp", caption: "HOMEX — Dusk Illumination & Spatial Depth" },
      { url: "/HOMEX/02-1.webp", caption: "HOMEX — Terraced Facade Modulation" },
      { url: "/HOMEX/04-1.webp", caption: "HOMEX — Ground Level Approach & Pedestrian Axis" },
      { url: "/HOMEX/1_Interactive_LightMi1x.webp", caption: "HOMEX — Interactive Photometric LightMix" },
    ],
  },
  {
    id: "orin",
    title: "ORIN",
    subdiscipline: "architecture-design",
    subdisciplineLabel: "ARCHITECTURE DESIGN",
    category: "High-End Architectural Atelier & Pavilion",
    description:
      "Sculptural architectural atelier celebrating tactile monolithic materials, seamless indoor-outdoor transitions, and contemplative spatial volumes.",
    coverImage: "/ORIN/3.webp",
    images: [
      { url: "/ORIN/3.webp", caption: "ORIN — Monolithic Facade Angle" },
      { url: "/ORIN/4.webp", caption: "ORIN — Architectural Courtyard & Glazing" },
      { url: "/ORIN/5.webp", caption: "ORIN — Material Textures & Sunlight Study" },
      { url: "/ORIN/6.webp", caption: "ORIN — Night Photometry & Linear Lighting" },
      { url: "/ORIN/7.webp", caption: "ORIN — Geometric Cantilever & Shadow Study" },
      { url: "/ORIN/14.webp", caption: "ORIN — Panoramic Architectural Panorama" },
      { url: "/ORIN/16.webp", caption: "ORIN — Spatial Volume & Material Junctions" },
      { url: "/ORIN/23.webp", caption: "ORIN — Dusk Silhouette & Architectural Profile" },
    ],
  },
  {
    id: "competitions",
    title: "COMPETITIONS",
    subdiscipline: "architecture-design",
    subdisciplineLabel: "ARCHITECTURE DESIGN",
    category: "International Architectural Competition Submissions",
    description:
      "Visionary competition proposals, international cultural landmarks, and speculative future masterplans designed for global architectural biennials.",
    coverImage: "/work/diva-1.webp",
    images: [
      { url: "/work/diva-1.webp", caption: "COMPETITIONS — Cultural Center Concept" },
      { url: "/work/eastville-1.webp", caption: "COMPETITIONS — Urban Landmark Proposal" },
    ],
  },
];

export const BIM_PROJECTS_DATA: ArchitectureProject[] = [
  {
    id: "amazon-warehouse",
    title: "AMAZON WAREHOUSE",
    subdiscipline: "bim",
    subdisciplineLabel: "BIM",
    category: "Industrial & Logistics Digital Twin",
    description:
      "Full-scope Building Information Modeling (LOD 400-500) for large-scale Amazon distribution and logistics fulfillment facilities, featuring automated clash detection, structural steel coordination, and MEP logistics routing.",
    coverImage:
      "https://res.cloudinary.com/hxytmocg/image/upload/v1793521506/1_View020000.webp",
    images: [
      {
        url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521506/1_View020000.webp",
        caption: "AMAZON WAREHOUSE — LOD 500 Digital Twin Overview",
      },
      {
        url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521515/1_View030000.webp",
        caption: "AMAZON WAREHOUSE — Logistics Clash Matrix & Structural Coordination",
      },
      {
        url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521519/1_View050000.webp",
        caption: "AMAZON WAREHOUSE — Parametric Steel Framing & Roof Trusses",
      },
      {
        url: "https://res.cloudinary.com/hxytmocg/image/upload/v1793521526/1_View060000.webp",
        caption: "AMAZON WAREHOUSE — High-Capacity MEP Routing & Conveyor Audits",
      },
    ],
  },
];
