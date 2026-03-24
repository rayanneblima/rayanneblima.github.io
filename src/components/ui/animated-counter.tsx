"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, m } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

/**
 * Parses stat values like "6+", "3x", "Lead", "CEO"
 * Returns { number, suffix } for numeric values, or null for text-only
 */
function parseStatValue(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)$/);
  if (match) {
    return { num: parseInt(match[1], 10), suffix: match[2] };
  }
  return null;
}

function NumberCounter({
  target,
  suffix,
  className,
}: {
  target: number;
  suffix: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 60,
    damping: 20,
    duration: 1.5,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (v) => {
      setDisplayValue(Math.round(v));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </span>
  );
}

function TextReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <m.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 12 }
      }
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </m.span>
  );
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const parsed = parseStatValue(value);

  if (parsed) {
    return (
      <NumberCounter
        target={parsed.num}
        suffix={parsed.suffix}
        className={className}
      />
    );
  }

  return <TextReveal text={value} className={className} />;
}
