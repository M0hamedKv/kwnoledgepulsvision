export interface SectorItem {
  id: string;
  label: string;
  href?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface HeroSectionProps {
  logoText?: string;
  backgroundImageUrl?: string;
  backgroundVideoUrl?: string;
  taglineTitle?: string;
  taglineHighlight?: string;
  headlineFirst?: string;
  headlineMiddle?: string;
  headlineLast?: string;
  sectors?: SectorItem[];
  menuItems?: MenuItem[];
  onSectorSelect?: (sectorId: string) => void;
}

export interface HeroBackgroundProps {
  imageUrl?: string;
  videoUrl?: string;
  alt?: string;
  priority?: boolean;
}

export interface HeroSectorTagsProps {
  sectors: SectorItem[];
  activeSectorId?: string;
  onSelectSector?: (id: string) => void;
}

export interface HeroTaglineProps {
  text?: string;
  highlightText?: string;
}

export interface HeroHeadlineProps {
  line: string;
}

export interface HeroMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  logoText?: string;
  menuItems: MenuItem[];
  onNavigate?: (href: string) => void;
}
