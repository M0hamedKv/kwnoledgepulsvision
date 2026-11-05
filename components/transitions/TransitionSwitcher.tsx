"use client";

import React, { useState } from "react";
import { usePageTransition } from "./TransitionContext";
import { TRANSITION_OPTIONS } from "./types";

export const TransitionSwitcher: React.FC = () => {
  const { transitionMode, setTransitionMode, previewTransition, isAnimating } =
    usePageTransition();
  const [isOpen, setIsOpen] = useState(true);

  const activeOption =
    TRANSITION_OPTIONS.find((o) => o.id === transitionMode) || TRANSITION_OPTIONS[0];

  return (
    <aside
      data-transition-switcher="true"
      aria-label="Page Transition Controls"
      style={{ zIndex: 1000000 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 select-none font-mono"
    >
      {/* ── Collapsed Pill Mode ── */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-black/95 backdrop-blur-xl border border-white/25 hover:border-[#00c8ff] text-white text-xs uppercase tracking-wider rounded-none shadow-[0_10px_40px_rgba(0,0,0,0.95)] transition-all cursor-pointer group hover:scale-[1.02]"
        >
          <span className="w-2 h-2 rounded-full bg-[#00c8ff] animate-pulse" />
          <span className="text-white/60">TRANSITION:</span>
          <span className="text-[#00c8ff] font-bold">{activeOption.name}</span>
          <span className="text-white/40 ml-1 group-hover:text-white">▲</span>
        </button>
      )}

      {/* ── Expanded Architectural Control Deck ── */}
      {isOpen && (
        <div className="w-[320px] sm:w-[380px] p-4 sm:p-5 bg-black/95 backdrop-blur-2xl border border-white/20 rounded-none shadow-[0_20px_60px_rgba(0,0,0,0.98)] flex flex-col gap-4 text-white">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00c8ff] animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold text-white">
                PAGE TRANSITIONS // تجربة الانتقالات
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/50 hover:text-white text-xs px-2 py-1 cursor-pointer transition-colors"
              title="تصغير اللوحة"
            >
              ▼
            </button>
          </div>

          {/* Description of current mode */}
          <div
            className="p-3 bg-white/5 border border-white/10 flex flex-col gap-1 text-right"
            dir="rtl"
          >
            <div className="flex items-center justify-between font-mono text-[11px] text-white/50">
              <span className="text-[#00c8ff] font-bold uppercase">{activeOption.name}</span>
              <span>الخيار المحدد: [{activeOption.number}]</span>
            </div>
            <span className="text-xs text-white/90 font-['Rubik',sans-serif] leading-relaxed">
              {activeOption.description}
            </span>
          </div>

          {/* 5 Mode Selector Buttons */}
          <div className="grid grid-cols-1 gap-1.5">
            {TRANSITION_OPTIONS.map((opt) => {
              const isSelected = opt.id === transitionMode;
              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isAnimating}
                  onClick={() => setTransitionMode(opt.id)}
                  className={`px-3 py-2.5 text-xs flex items-center justify-between border transition-all cursor-pointer rounded-none text-left ${
                    isSelected
                      ? "bg-[#00c8ff]/15 border-[#00c8ff] text-white font-bold shadow-[0_0_15px_rgba(0,200,255,0.25)]"
                      : "bg-white/5 border-white/10 hover:border-white/30 text-white/70 hover:text-white"
                  } ${isAnimating ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] ${
                        isSelected ? "text-[#00c8ff]" : "text-white/40"
                      }`}
                    >
                      [{opt.number}]
                    </span>
                    <span className="uppercase tracking-wider">{opt.name}</span>
                  </div>
                  <span className="text-[11px] font-['Rubik',sans-serif] text-white/60">
                    {opt.nameArabic}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-1 border-t border-white/10">
            <button
              type="button"
              disabled={isAnimating}
              onClick={previewTransition}
              className={`w-full py-3 px-4 rounded-none font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-[0.99] ${
                isAnimating
                  ? "bg-white/20 text-white/50 cursor-not-allowed"
                  : "bg-[#00c8ff] hover:bg-white text-black hover:shadow-[0_0_30px_rgba(0,200,255,0.6)]"
              }`}
            >
              {isAnimating ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  <span>جاري تشغيل الحركة...</span>
                </>
              ) : (
                <>
                  <span>▶</span>
                  <span>تجربة الانتقال الآن (Preview)</span>
                </>
              )}
            </button>

            <span className="text-[10px] text-white/40 text-center font-['Rubik',sans-serif]">
              يمكنك أيضاً تجربة الانتقال الفعلي بالنقر على أي مشروع أو صفحة
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};
