"use client";

import { useState, useEffect } from "react";

interface SplashScreenProps {
  /** Minimum display time in ms */
  minDuration?: number;
}

export function SplashScreen({
  minDuration = 800,
}: SplashScreenProps) {
  // Start hidden — only show after JS hydrates (prevents blocking LCP in static HTML)
  const [visible, setVisible] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Show splash immediately on hydration
    setVisible(true);
    // Then schedule removal
    const timer = setTimeout(() => setRemoved(true), minDuration + 500);
    return () => clearTimeout(timer);
  }, [minDuration]);

  // Before hydration: nothing renders → hero content is the LCP element
  // After hydration: splash shows briefly then fades out
  if (!visible || removed) return null;

  return (
    <div
      className="splash-overlay fixed inset-0 z-[9998] flex items-center justify-center bg-bg"
      aria-hidden="true"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-accent) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Logo animation */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6">
        {/* Icon with scale + blur entrance */}
        <div className="splash-icon">
          <img
            src="/images/logo-icon.webp"
            alt=""
            width={120}
            height={120}
            className="h-20 w-20 sm:h-24 sm:w-24"
          />
        </div>

        {/* Brand name */}
        <span className="splash-brand font-display text-xl sm:text-2xl font-bold tracking-tight">
          rayanne<span className="text-accent">blima</span>
        </span>

        {/* Subtitle */}
        <span className="splash-subtitle font-mono text-xs uppercase tracking-[0.3em] text-accent whitespace-nowrap">
          Frontend Lead & Full Stack Developer
        </span>
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-10 h-10 border-l border-t border-line" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-r border-b border-line" />
    </div>
  );
}
