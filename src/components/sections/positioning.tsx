"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TechMarqueeTop, TechMarqueeBottom } from "@/components/ui/tech-marquee";

const EASING = [0.22, 1, 0.36, 1] as const;

export function Positioning() {
  const t = useTranslations("positioning");
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(headlineRef, { once: true, margin: "-50px" });

  const words = t("headline").split(" ");

  return (
    <section className="relative py-32 sm:py-40 lg:py-48 bg-bg-raised overflow-hidden">
      {/* Top gradient divider */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, var(--color-bg), transparent)",
        }}
      />

      {/* Marquee top — frameworks & languages */}
      <ScrollReveal delay={0.2}>
        <div className="mb-16 sm:mb-20">
          <TechMarqueeTop />
        </div>
      </ScrollReveal>

      <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
        {/* Headline with per-word blur-in reveal */}
        <h2
          ref={headlineRef}
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 16 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              transition={{
                duration: 0.6,
                ease: EASING,
                delay: i * 0.08,
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </h2>

        {/* Caption with delayed reveal */}
        <ScrollReveal delay={0.2}>
          <p className="mt-8 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            {t("caption")}
          </p>
        </ScrollReveal>
      </div>

      {/* Marquee bottom — tooling & infra */}
      <ScrollReveal delay={0.4}>
        <div className="mt-16 sm:mt-20">
          <TechMarqueeBottom />
        </div>
      </ScrollReveal>

      {/* Bottom gradient divider */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to top, var(--color-bg), transparent)",
        }}
      />
    </section>
  );
}
