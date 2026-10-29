export interface SubServiceItem {
  id: string;
  number: string;
  title: string;
  href?: string;
  shortDesc?: string;
  fullDesc?: string;
  capabilities?: string[];
  tags?: string[];
  ctaText?: string;
  ctaHref?: string;
}

export interface DisciplineItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  image?: string;
  video?: string;
  videoTitle?: string;
  videoBadge?: string;
  accentColor?: string;
  description?: string;
  subServices: SubServiceItem[];
  ctaText: string;
  ctaHref: string;
}

// Alias for backwards compatibility
export type ServiceItem = DisciplineItem;

export interface ServicesSectionProps {
  sectionTag?: string;
  headlineMain?: string;
  headlineSub?: string;
  manifesto?: string;
  disciplines?: DisciplineItem[];
  services?: DisciplineItem[];
}
