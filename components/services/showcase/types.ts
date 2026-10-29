export interface LightboxItem {
  url: string;
  title: string;
  type: "image" | "video";
  category?: string;
  badge?: string;
  description?: string;
}

export interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

