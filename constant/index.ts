import { MenuItem, SectorItem } from "@/components/hero";

export const DEFAULT_SECTORS: SectorItem[] = [
  { id: "retail", label: "RETAIL" },
  { id: "industrial", label: "INDUSTRIAL" },
  { id: "office", label: "OFFICE" },
];

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: "home", label: "HOME", href: "/" },
  { id: "portfolio", label: "PORTFOLIO", href: "/portfolio" },
  // { id: "work", label: "OUR WORK", href: "/portfolio" },
  { id: "services", label: "SERVICES", href: "/services" },
  { id: "about", label: "ABOUT US", href: "/About" },
  { id: "join", label: "JOIN US", href: "/JoinUs" },
  { id: "contact", label: "GET IN TOUCH", href: "/Contact" },
];

export * from "./theme";

export interface SocialLinkItem {
  id: "instagram" | "facebook" | "linkedin";
  label: string;
  handle: string;
  href: string;
  description: string;
}

export const STUDIO_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@kv_studioo__",
    href: "https://www.instagram.com/kv_studioo__?igsh=cmdvaGt0ZDQ5ZmU3&utm_source=qr",
    description: "Visual Portfolio & Behind The Scenes",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "KV Studio",
    href: "https://www.facebook.com/people/KV-Studio/61566515945512/?mibextid=wwXIfr&rdid=UncrC5WbO0QXb9XA&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B5gReTw42%2F%3Fmibextid%3DwwXIfr",
    description: "Community, News & Projects",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "KV Studio",
    href: "https://www.linkedin.com/company/kv8/",
    description: "Corporate & Professional Network",
  },
];

