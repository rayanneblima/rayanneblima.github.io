"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { m, useInView } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { RetroGrid } from "@/components/ui/retro-grid";

export function FinalCta() {
  const t = useTranslations("finalCta");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative px-6 py-32 sm:py-40 lg:px-10 overflow-hidden"
    >
      {/* Background base */}
      <div className="absolute inset-0 bg-bg-raised" aria-hidden="true" />

      {/* Retro grid */}
      <RetroGrid />

      {/* Gradient orb — pulses in once on entry then holds */}
      <m.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full blur-[180px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,93,250,0.15) 0%, rgba(124,93,250,0.05) 40%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Headline: large, staggered animation */}
        <ScrollReveal>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-tight">
            {t("headline1")}
            <br />
            <span className="text-gradient">{t("headline2")}</span>
          </h2>
        </ScrollReveal>

        {/* Subtext: staggered 200ms after headline */}
        <ScrollReveal delay={0.2}>
          <p className="mt-8 text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            {t("sub1")}
            <br />
            {t("sub2")}
          </p>
        </ScrollReveal>

        {/* CTA: magnetic button with glow */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12">
            <MagneticButton
              as="a"
              href={`mailto:${t("email")}`}
              className="group inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 text-base font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_40px_rgba(124,93,250,0.4)]"
            >
              {t("cta")}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />
    </section>
  );
}
