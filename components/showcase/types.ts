import React from "react";

export interface ShowcaseItem {
  id: string;
  image?: string;
  video?: string;
  alt?: string;
}

export interface ShowcaseSectionProps {
  /**
   * Children components (e.g. HeroSection) pinned underneath the transition.
   */
  children?: React.ReactNode;
  /**
   * Primary color for the expanding pillar. Defaults to `var(--brand-primary)` from globals.css.
   */
  primaryColor?: string;
  /**
   * Dynamic list of showcase images to display in sequence.
   */
  items?: ShowcaseItem[];
}
