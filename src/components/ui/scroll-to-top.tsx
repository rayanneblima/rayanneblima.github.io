"use client";

import { useState, useEffect } from "react";
import { m, useScroll, useTransform } from "framer-motion";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  /* Framer Motion scroll progress — bypasses React state for fluid updates */
  const { scrollYProgress } = useScroll();

  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  /* MotionValue: maps 0→1 scroll progress to strokeDashoffset (circumference→0) */
  const strokeOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [circumference, 0]
  );

  /* Visibility still needs React state (discrete toggle, not continuous) */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg-raised/90 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-bg-elevated cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0"
        width="44"
        height="44"
        viewBox="0 0 44 44"
      >
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="2"
        />
        <m.circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: strokeOffset,
            rotate: "-90deg",
            transformOrigin: "center",
          }}
        />
      </svg>

      {/* Arrow up icon — absolute centered to avoid flex/stacking quirks */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text-secondary"
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
