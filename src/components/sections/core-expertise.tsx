"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextScramble } from "@/components/ui/text-scramble";
import { TiltCard } from "@/components/ui/tilt-card";

const expertiseKeys = ["architecture", "designSystems", "performance", "product", "aiEngineering"] as const;

/* Minimal SVG icons -- consistent 20px stroke style */
const expertiseIcons: Record<string, React.ReactNode> = {
  architecture: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  designSystems: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  performance: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  product: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
      <path d="M18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
    </svg>
  ),
  aiEngineering: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

export function CoreExpertise() {
  const t = useTranslations("expertise");

  return (
    <section id="expertise" className="relative px-6 py-28 sm:py-36 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section label */}
        <ScrollReveal>
          <h2 className="mb-16 flex items-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <TextScramble
              text={t("label")}
              className="font-mono text-xs uppercase tracking-[0.25em] text-accent"
            />
          </h2>
        </ScrollReveal>

        {/* 2x2 Asymmetric grid -- first card spans full row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {expertiseKeys.map((key, i) => (
            <ScrollReveal
              key={key}
              delay={0.08 * i}
              className={i === 0 || i === expertiseKeys.length - 1 ? "md:col-span-2" : ""}
            >
              <TiltCard
                className="group relative h-full"
                maxTilt={4}
                glare
              >
                {/* Gradient border wrapper -- visible on hover */}
                <div
                  className="absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(124,93,250,0.4), rgba(183,148,246,0.2), rgba(90,63,209,0.4))",
                  }}
                  aria-hidden="true"
                />

                {/* Card content -- inner fill to reveal gradient border */}
                <div className="relative rounded-xl border border-line bg-bg p-8 lg:p-10 overflow-hidden transition-all duration-500 group-hover:border-transparent group-hover:bg-bg/95 group-hover:scale-[1.02]">
                  {/* Top row: number + icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-text-tertiary tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-accent/60 group-hover:text-accent transition-colors duration-300">
                      {expertiseIcons[key]}
                    </span>
                  </div>

                  {/* Title -- shifts 4px right on hover */}
                  <h3 className="font-display text-xl font-bold tracking-tight mb-3 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                    {t(`items.${key}.title`)}
                  </h3>

                  {/* Description -- fades from 70% to 100% opacity */}
                  <p className="text-sm leading-relaxed text-text-secondary opacity-70 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100">
                    {t(`items.${key}.description`)}
                  </p>

                  {/* Bottom accent line -- reveals on hover */}
                  <div
                    className="absolute bottom-0 left-8 right-8 h-px scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--color-accent), transparent 80%)",
                    }}
                    aria-hidden="true"
                  />
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-line to-transparent" />
    </section>
  );
}
