export interface MenuItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface SectorItem {
  id: string;
  label: string;
}

export interface HeroSectorTagsProps {
  sectors: SectorItem[];
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
  menuItems?: MenuItem[];
  sectors?: SectorItem[];
  onSectorSelect?: (sectorId: string) => void;
}

export interface HeroBackgroundProps {
  imageUrl?: string;
  videoUrl?: string;
  alt?: string;
  priority?: boolean;
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
