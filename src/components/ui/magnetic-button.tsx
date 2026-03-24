"use client";

import { useRef, useState } from "react";
import { m } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: "a" | "button";
  strength?: number;
  [key: string]: unknown;
}

export function MagneticButton({
  children,
  className,
  as = "button",
  strength = 0.35,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Use m.div as wrapper to avoid ref type issues with dynamic elements
  const Tag = as;

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
      style={{ display: "inline-flex" }}
    >
      <Tag className={className} {...props}>
        {children}
      </Tag>
    </m.div>
  );
}
