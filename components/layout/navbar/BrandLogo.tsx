"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

interface BrandLogoProps {
  className?: string;
  text?: string;
}

/**
 * BrandLogo
 * Displays the official KV STUDIO brand logo image (kv-logo-transparent.png)
 * with a subtle, premium entrance animation and interactive hover states.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
  text = "KV STUDIO",
}) => {
  const containerRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -4 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.15,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Link
      ref={containerRef}
      href="/"
      className={`inline-flex items-center focus:outline-none select-none py-1 group ${className}`}
      aria-label={`${text} Home`}
    >
      <div className="relative flex items-center h-8 sm:h-9 md:h-10 w-auto">
        <Image
          src="/kv-logo-transparent.png"
          alt={text}
          width={184}
          height={100}
          priority
          className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-all duration-300 group-hover:opacity-85 group-hover:scale-[1.02]"
        />
      </div>
    </Link>
  );
};
