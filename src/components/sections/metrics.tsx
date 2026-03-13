"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const metricKeys = ["saas", "experience", "founder", "global"] as const;

export function Metrics() {
  const t = useTranslations("metrics");

  return (
    <section id="metrics" className="relative py-24 sm:py-32 border-y border-line">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
          {metricKeys.map((key, i) => (
            <ScrollReveal key={key} delay={0.1 * i}>
              <div className="group cursor-default">
                <AnimatedCounter
                  value={t(`items.${key}.value`)}
                  className="font-display text-4xl lg:text-5xl font-bold tracking-tight"
                />

                {/* Label with accent underline on hover */}
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                  <span className="relative inline-block">
                    {t(`items.${key}.label`)}
                    <span
                      className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                      aria-hidden="true"
                    />
                  </span>
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
