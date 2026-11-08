"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface TransitionControls {
  playIn: () => Promise<void>;
  playOut: () => Promise<void>;
}

interface TransitionContextType {
  isAnimating: boolean;
  navigateWithTransition: (href: string) => Promise<void>;
  registerOverlayControls: (controls: TransitionControls | null) => void;
  transitionMode?: string;
  setTransitionMode?: (mode: any) => void;
  previewTransition?: () => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return context;
};

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  // Synchronized refs to avoid stale closures in event listeners
  const isAnimatingRef = useRef(false);
  const pendingHrefRef = useRef<string | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const overlayControlsRef = useRef<TransitionControls | null>(null);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  // Stable callback so overlay setup never re-runs needlessly
  const registerOverlayControls = useCallback((controls: TransitionControls | null) => {
    overlayControlsRef.current = controls;
  }, []);

  // Programmatic and link-based transition execution
  const navigateWithTransition = useCallback(
    async (href: string) => {
      if (isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      setIsAnimating(true);
      pendingHrefRef.current = href;

      try {
        if (overlayControlsRef.current) {
          await overlayControlsRef.current.playIn();
        }
        router.push(href);

        // Safety timeout: prevents lock if route change is delayed
        if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
        safetyTimeoutRef.current = setTimeout(() => {
          if (pendingHrefRef.current) {
            pendingHrefRef.current = null;
            if (overlayControlsRef.current) {
              overlayControlsRef.current.playOut().finally(() => {
                isAnimatingRef.current = false;
                setIsAnimating(false);
              });
            } else {
              isAnimatingRef.current = false;
              setIsAnimating(false);
            }
          }
        }, 2500);
      } catch (err) {
        console.error("Navigation error:", err);
        isAnimatingRef.current = false;
        setIsAnimating(false);
        router.push(href);
      }
    },
    [router]
  );

  // When pathname changes (new route has mounted), trigger playOut
  useEffect(() => {
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }

    if (pendingHrefRef.current) {
      pendingHrefRef.current = null;
      if (overlayControlsRef.current) {
        overlayControlsRef.current.playOut().finally(() => {
          isAnimatingRef.current = false;
          setIsAnimating(false);
        });
      } else {
        isAnimatingRef.current = false;
        setIsAnimating(false);
      }
    }
  }, [pathname]);

  // Global click interceptor for internal links
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a") as HTMLAnchorElement | null;
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel, target="_blank", download, or pure hash anchors
      if (
        target.target === "_blank" ||
        target.hasAttribute("download") ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      ) {
        return;
      }

      // Handle internal routes
      if (href.startsWith("/")) {
        const [path, hash] = href.split("#");
        const normalizedPath = (path || "").replace(/\/$/, "") || "/";
        const normalizedCurrent = (pathname || "").replace(/\/$/, "") || "/";

        // Same page with hash: let native anchor scrolling handle it
        if (normalizedPath === normalizedCurrent && hash) {
          return;
        }

        // Exact same page without hash: do nothing
        if (normalizedPath === normalizedCurrent && !hash) {
          return;
        }

        e.preventDefault();
        navigateWithTransition(href);
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, [navigateWithTransition, pathname]);

  return (
    <TransitionContext.Provider
      value={{
        isAnimating,
        navigateWithTransition,
        registerOverlayControls,
        transitionMode: "slats",
        setTransitionMode: () => {},
        previewTransition: () => {},
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};
