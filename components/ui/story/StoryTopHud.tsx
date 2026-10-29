"use client";

import React from "react";

export interface StoryTopHudProps {
  index?: number;
  total?: number;
  badge?: string;
  category?: string;
  subtitle?: string;
  accentColor: string;
  isReversed: boolean;
}

export const StoryTopHud: React.FC<StoryTopHudProps> = ({
  index,
  total,
  badge,
  category,
  subtitle,
  accentColor,
  isReversed,
}) => {
  return (
    <div
      className={`flex flex-col gap-2 mb-2 z-20 relative w-full max-w-6xl px-4 ${
        isReversed ? "items-center md:items-start" : "items-center md:items-end"
      }`}
    >
      <div className="flex items-center gap-3">
        {index !== undefined && (
          <span
            className="font-mono text-xs font-bold tracking-widest px-3 py-1 rounded-full border bg-white/5 flex items-center gap-2"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: accentColor }}
            />
            <span>
              {String(index + 1).padStart(2, "0")} {total ? `// ${String(total).padStart(2, "0")}` : ""}
            </span>
          </span>
        )}
        {badge && (
          <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
            {badge}
          </span>
        )}
      </div>

      {(category || subtitle) && (
        <span
          className="font-mono text-[11px] uppercase tracking-[0.25em] font-semibold"
          style={{ color: accentColor }}
        >
          {category || subtitle}
        </span>
      )}
    </div>
  );
};

export default StoryTopHud;

