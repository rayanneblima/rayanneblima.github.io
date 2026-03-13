"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Animation = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: Animation;
  delay?: number;
  threshold?: number;
}

const hiddenStyles: Record<Animation, React.CSSProperties> = {
  "fade-up": { opacity: 0, transform: "translateY(32px)" },
  "fade-in": { opacity: 0 },
  "slide-left": { opacity: 0, transform: "translateX(32px)" },
  "slide-right": { opacity: 0, transform: "translateX(-32px)" },
  "scale-in": { opacity: 0, transform: "scale(0.95)" },
};

const visibleStyles: React.CSSProperties = {
  opacity: 1,
  transform: "translateY(0) translateX(0) scale(1)",
};

export function ScrollReveal({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn("will-change-[opacity,transform]", className)}
      style={{
        ...(isVisible ? visibleStyles : hiddenStyles[animation]),
        transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
