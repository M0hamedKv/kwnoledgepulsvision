export interface StoryProps {
  id?: string;
  video?: string;          // Primary video prop
  videoSrc?: string;       // Convenience alias
  imageSrc?: string;       // Optional fallback if static image is used
  title?: string;          // Main title / headline
  headline?: string;       // Optional custom headline with <br/> for AnimatedTitle
  subtitle?: string;
  category?: string;
  badge?: string;
  description?: string;
  index?: number;
  total?: number;
  reversed?: boolean;     // Alternating layout: even = left, odd = right
  accentColor?: string;
  className?: string;
  onOpenTheater?: () => void;
}

