export interface PortfolioFeatureItem {
  id: string;
  stepNumber: string; // "01", "02", "03", etc.
  tag: string;
  tagIcon?: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  imageAlt: string;
  activeFilter?: {
    availableCount: number;
    soldCount: number;
    reservedCount: number;
  };
  projectPillText?: string;
  metricsBadge?: string;
}
