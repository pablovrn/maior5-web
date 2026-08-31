"use client";

import { useEffect, useRef } from "react";

interface ContornoDividerProps {
  tone?: "sky" | "mint" | "gradient";
  flip?: boolean;
  className?: string;
}

/**
 * Línea de contorno que evoca las sierras que rodean el valle de Verín.
 * Se "dibuja" al entrar en el viewport; respeta prefers-reduced-motion.
 */
export default function ContornoDivider({ tone = "gradient", flip = false, className = "" }: ContornoDividerProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const gradientId = "contorno-gradient";

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      path.style.strokeDashoffset = "0";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.style.transition = "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)";
          path.style.strokeDashoffset = "0";
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(path);
    return () => observer.disconnect();
  }, []);

  const stroke = tone === "gradient" ? `url(#${gradientId})` : tone === "sky" ? "var(--sky-dim)" : "var(--mint-dim)";

  return (
    <svg
      className={`contour ${flip ? "contour--flip" : ""} ${className}`}
      viewBox="0 0 1200 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5f9fdb" />
          <stop offset="100%" stopColor="#86d99a" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        stroke={stroke}
        d="M0 55 C 60 20, 120 20, 170 45 C 230 76, 300 76, 350 40 C 410 -4, 470 -4, 520 30 C 590 74, 660 74, 710 38 C 780 -8, 860 -8, 920 32 C 970 62, 1040 62, 1090 34 C 1130 14, 1160 14, 1200 30"
      />
    </svg>
  );
}
