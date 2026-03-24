"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { m, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextScramble } from "@/components/ui/text-scramble";

const stepKeys = ["discover", "architect", "build", "optimize", "scale"] as const;

export function Process() {
  const t = useTranslations("process");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.6"],
  });

  // Timeline fill progress: 0% -> 100% as user scrolls through the section
  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Each dot activates when progress passes its threshold (0%, 25%, 50%, 75%, 100%)
  const dotScales = stepKeys.map((_, i) => {
    const threshold = i / (stepKeys.length - 1);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(scrollYProgress, [Math.max(0, threshold - 0.05), threshold], [1, 1.5]);
  });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative px-6 py-28 sm:py-36 lg:px-10 bg-bg-raised"
    >
      <div className="mx-auto max-w-7xl">
        {/* Label */}
        <ScrollReveal>
          <h2 className="mb-16 flex items-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <TextScramble
              text={t("label")}
              className="font-mono text-xs uppercase tracking-[0.25em] text-accent"
            />
          </h2>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* ---- Desktop: horizontal timeline line ---- */}
          <div
            className="hidden lg:block absolute top-[6px] left-0 right-0 h-px bg-line"
            aria-hidden="true"
          />
          {/* Accent fill — grows with scroll progress */}
          <m.div
            className="hidden lg:block absolute top-[6px] left-0 h-px bg-accent origin-left"
            style={{ width: fillWidth }}
            aria-hidden="true"
          />

          {/* ---- Mobile: vertical timeline line ---- */}
          <div
            className="lg:hidden absolute left-[5px] top-0 bottom-0 w-px bg-line"
            aria-hidden="true"
          />
          {/* Accent fill — grows with scroll progress (vertical) */}
          <m.div
            className="lg:hidden absolute left-[5px] top-0 w-px bg-accent origin-top"
            style={{ height: fillHeight }}
            aria-hidden="true"
          />

          {/* Steps grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-6">
            {stepKeys.map((key, i) => (
              <ScrollReveal key={key} delay={0.1 * i}>
                <div className="relative pl-8 lg:pl-0">
                  {/* Dot — mobile: absolute left, desktop: static top */}
                  <m.div
                    className="absolute left-0 top-0 lg:relative lg:mb-6 h-3 w-3 rounded-full bg-accent z-10"
                    style={{ scale: dotScales[i] }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  />

                  {/* Step number */}
                  <span className="font-mono text-xs text-text-tertiary tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold tracking-tight mt-2">
                    {t(`steps.${key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {t(`steps.${key}.description`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
