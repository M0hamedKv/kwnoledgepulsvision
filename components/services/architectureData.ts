export interface ArchitectureProject {
  id: string;
  title: string;
  typology: string;
  subdiscipline: "architecture-design" | "bim";
  subdisciplineLabel: string;
  category: string;
  badge: string;
  description: string;
  coverImage: string;
  images: string[];
}

export const ARCHITECTURE_DESIGN_PROJECTS: ArchitectureProject[] = [
  {
    id: "orin",
    title: "ORIN SHOPPING MALL",
    typology: "COMMERCIAL MALL & SHOPPING DESTINATION",
    subdiscipline: "architecture-design",
    subdisciplineLabel: "ARCHITECTURE DESIGN",
    category: "Commercial Shopping Mall & Retail Atelier",
    badge: "8 RENDERS",
    description:
      "Sculptural architectural shopping mall celebrating tactile monolithic materials, seamless indoor-outdoor commercial flows, and monumental spatial volumes.",
    coverImage: "/design/architecture/ORIN/3.webp",
    images: [
      "/design/architecture/ORIN/3.webp",
      "/design/architecture/ORIN/4.webp",
      "/design/architecture/ORIN/5.webp",
      "/design/architecture/ORIN/6.webp",
      "/design/architecture/ORIN/7.webp",
      "/design/architecture/ORIN/14.webp",
      "/design/architecture/ORIN/16.webp",
      "/design/architecture/ORIN/23.webp",
    ],
  },
  {
    id: "homex",
    title: "HOMEX ATELIER",
    typology: "LUXURY RESIDENTIAL & COMMERCIAL",
    subdiscipline: "architecture-design",
    subdisciplineLabel: "ARCHITECTURE DESIGN",
    category: "Residential & Commercial Architecture",
    badge: "9 RENDERS",
    description:
      "Contemporary architectural master concept combining geometric facade dynamism, sustainable daylight distribution, and luxury residential programming.",
    coverImage: "/design/architecture/HOMEX/01.webp",
    images: [
      "/design/architecture/HOMEX/01.webp",
      "/design/architecture/HOMEX/02.webp",
      "/design/architecture/HOMEX/03.webp",
      "/design/architecture/HOMEX/04.webp",
      "/design/architecture/HOMEX/01-1.webp",
      "/design/architecture/HOMEX/01-2.webp",
      "/design/architecture/HOMEX/02-1.webp",
      "/design/architecture/HOMEX/04-1.webp",
      "/design/architecture/HOMEX/1_Interactive_LightMi1x.webp",
    ],
  },
  {
    id: "competitions",
    title: "INTERNATIONAL COMPETITIONS",
    typology: "CULTURAL LANDMARKS & BIENNIALS",
    subdiscipline: "architecture-design",
    subdisciplineLabel: "ARCHITECTURE DESIGN",
    category: "International Architectural Competition Submissions",
    badge: "2 SUBMISSIONS",
    description:
      "Visionary competition proposals, international cultural landmarks, and speculative future masterplans designed for global architectural biennials.",
    coverImage: "/work/diva-1.webp",
    images: [
      "/work/diva-1.webp",
      "/work/eastville-1.webp",
    ],
  },
];

export const BIM_PROJECTS_DATA: ArchitectureProject[] = [
  {
    id: "amazon-warehouse",
    title: "AMAZON WAREHOUSE",
    typology: "INDUSTRIAL & LOGISTICS DIGITAL TWIN",
    subdiscipline: "bim",
    subdisciplineLabel: "BIM",
    category: "Industrial & Logistics Digital Twin",
    badge: "4 LOD 500 MODELS",
    description:
      "Full-scope Building Information Modeling (LOD 400-500) for large-scale Amazon distribution and logistics fulfillment facilities, featuring automated clash detection, structural steel coordination, and MEP logistics routing.",
    coverImage:
      "/design/interior/fox hills/1_View020000.webp",
    images: [
      "/design/interior/fox hills/1_View020000.webp",
      "/design/interior/fox hills/1_View030000.webp",
      "/design/interior/fox hills/1_View050000.webp",
      "/design/interior/fox hills/1_View060000.webp",
    ],
  },
];

export function getArchitectureProjectById(id: string): ArchitectureProject | undefined {
  const all = [...ARCHITECTURE_DESIGN_PROJECTS, ...BIM_PROJECTS_DATA];
  return all.find((p) => p.id.toLowerCase() === id.toLowerCase());
}
