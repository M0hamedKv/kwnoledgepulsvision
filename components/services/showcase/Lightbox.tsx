"use client";

import React, { useRef, useEffect } from "react";
import { LightboxProps } from "./types";

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const item = items[currentIndex];
  const touchStartX = useRef<number | null>(null);

  // Keyboard navigation (Esc to close, Left/Right arrows to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  // Lock background body scroll while modal is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        onPrev();
      } else {
        onNext();
      }
    }
    touchStartX.current = null;
  };

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-99999 flex items-center justify-center bg-black/96 backdrop-blur-2xl select-none"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Fixed Top Controls Bar ── */}
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-100002 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 font-mono text-xs uppercase tracking-widest backdrop-blur-xl transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 group"
        aria-label="Close Lightbox"
      >
        <span className="font-bold">CLOSE</span>
        <span className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-black/20 flex items-center justify-center text-xs font-bold leading-none">
          ✕
        </span>
      </button>

      {/* Media Counter Indicator */}
      {items.length > 1 && (
        <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-100002 px-4 py-2 rounded-full bg-black/80 backdrop-blur-xl border border-white/15 font-mono text-xs text-white/90 font-bold uppercase tracking-widest shadow-2xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00c8ff] animate-pulse" />
          <span>
            {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>
      )}

      {/* ── Left / Right Arrow Navigation Buttons ── */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-100002 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/70 hover:bg-[#00c8ff] text-white hover:text-black border border-white/20 hover:border-[#00c8ff] backdrop-blur-xl transition-all duration-300 flex items-center justify-center cursor-pointer shadow-2xl group hover:scale-110 active:scale-95"
            aria-label="Previous"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 transform transition-transform group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-100002 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/70 hover:bg-[#00c8ff] text-white hover:text-black border border-white/20 hover:border-[#00c8ff] backdrop-blur-xl transition-all duration-300 flex items-center justify-center cursor-pointer shadow-2xl group hover:scale-110 active:scale-95"
            aria-label="Next"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 transform transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* ── Main Media Display Container ── */}
      <div
        className="relative max-w-6xl w-full max-h-[85vh] sm:max-h-[88vh] flex flex-col items-center justify-center gap-3 px-4 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-h-[72vh] sm:max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl">
          {item.type === "video" ? (
            <video
              key={item.url}
              src={item.url}
              autoPlay
              controls
              className="max-h-[72vh] sm:max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl border border-white/20 bg-black"
            />
          ) : (
            <img
              key={item.url}
              src={item.url}
              alt={item.title}
              className="max-h-[72vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/20"
            />
          )}
        </div>

        {/* Caption & Metadata Bar */}
        <div className="w-full max-w-3xl p-3.5 sm:p-4 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xl">
          <div>
            <span className="font-mono text-[11px] text-[#00c8ff] font-bold uppercase block tracking-wider">
              {item.category}
              {item.badge ? ` • ${item.badge}` : ""}
            </span>
            <h3 className="font-['BlauerNue',sans-serif] text-sm sm:text-base font-bold uppercase text-white mt-0.5">
              {item.title}
            </h3>
          </div>
          {item.description && (
            <p className="font-['Rubik',sans-serif] text-xs text-white/70 max-w-md line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;

