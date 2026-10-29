/**
 * KV Studio Centralized Brand Theme Tokens
 * All primary brand colors, accents, and glows are configured here in ONE place.
 * Changing the accent here updates the brand identity across the entire studio platform.
 */
export const BRAND_COLORS = {
  // Primary Interactive Accent (Updated to #00c8ff Cyan)
  accent: "#00c8ff",
  accentRgb: "0, 200, 255",
  accentLight: "rgba(0, 200, 255, 0.15)",
  accentGlow: "rgba(0, 200, 255, 0.4)",

  // Secondary Architectural Accents
  terracotta: "#b85d38",
  terracottaRgb: "184, 93, 56",
  emerald: "#10b981",

  // Base Neutrals
  black: "#000000",
  dark: "#080808",
  darker: "#050505",
  cardBg: "#111111",
  cardBorder: "rgba(255, 255, 255, 0.1)",
  white: "#ffffff",
  whiteMuted: "rgba(255, 255, 255, 0.7)",
} as const;

export type BrandColors = typeof BRAND_COLORS;
