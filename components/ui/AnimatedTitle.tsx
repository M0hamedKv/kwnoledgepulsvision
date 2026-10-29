"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  title: string;
  children?: React.ReactNode;
  clasContainer?: string;
}

function AnimatedTitle({ children, title, clasContainer = "" }: AnimatedTitleProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll(".animated-word");
      if (!words || words.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "center 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        words,
        {
          opacity: 0,
          transform: "translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)",
          transformOrigin: "50% 50% -150px",
          willChange: "opacity, transform",
        },
        {
          opacity: 1,
          transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.out",
          stagger: 0.03,
          duration: 0.7,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`animated-title ${clasContainer}`}>
      {title.split(/<br\s*\/?>/gi).map((line: string, index: number) => (
        <div key={index} className="flex justify-center items-center max-w-full flex-wrap gap-2 px-4 sm:px-10 md:gap-3">
          {line
            .trim()
            .split(" ")
            .filter(Boolean)
            .map((word: string, i: number) => (
              <span
                className="animated-word inline-block will-change-transform"
                key={i}
                dangerouslySetInnerHTML={{ __html: word }}
              />
            ))}
        </div>
      ))}
      {children}
    </div>
  );
}

export default AnimatedTitle;
