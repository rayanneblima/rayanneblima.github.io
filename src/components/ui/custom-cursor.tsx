"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsMobile(!mq.matches);
    if (!mq.matches) return;

    const ring = ringRef.current;
    if (!ring) return;

    ring.style.opacity = "0";

    const moveCursor = (e: MouseEvent) => {
      ring.style.opacity = "1";
      ring.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, [data-magnetic]")) {
        setHovered(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, [data-magnetic]")) {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  if (isMobile) return null;

  // Ring trailer — cursor nativo continua visível, ring é decorativo
  const size = hovered ? 56 : 32;

  return (
    <div
      ref={ringRef}
      className="pointer-events-none fixed top-0 left-0 z-9999"
      style={{ willChange: "transform" }}
    >
      <div
        className="rounded-full transition-[width,height,margin,border-color,opacity] duration-300 ease-out"
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          border: `1.5px solid ${hovered ? "var(--color-accent)" : "var(--color-accent)"}`,
          opacity: hovered ? 0.7 : 0.25,
        }}
      />
    </div>
  );
}
