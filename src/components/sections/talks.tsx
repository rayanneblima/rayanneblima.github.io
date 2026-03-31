"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, m } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextScramble } from "@/components/ui/text-scramble";
import { TiltCard } from "@/components/ui/tilt-card";

const talkKeys = ["womenInTech", "sosuba"] as const;

/* Minimal SVG icons for talk types */
const typeIcons: Record<string, React.ReactNode> = {
  talk: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  workshop: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  webinar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
};

/** Convert Canva share URL → embeddable URL */
function toCanvaEmbed(url: string) {
  try {
    const u = new URL(url);
    // strip all tracking params, keep only the design path
    return `${u.origin}${u.pathname}?embed`;
  } catch {
    return url;
  }
}

export function Talks() {
  const t = useTranslations("talks");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const openPreview = useCallback((url: string) => {
    setPreviewUrl(toCanvaEmbed(url));
  }, []);

  const closePreview = useCallback(() => {
    setPreviewUrl(null);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!previewUrl) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handler);
    };
  }, [previewUrl, closePreview]);

  return (
    <section id="talks" className="relative px-6 py-28 sm:py-36 lg:px-10">
      {/* Presentation preview modal */}
      <AnimatePresence>
        {previewUrl && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
            onClick={closePreview}
          >
            {/* Close button */}
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close preview"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Iframe container */}
            <m.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-full max-h-[85vh] max-w-6xl overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={previewUrl}
                title="Presentation preview"
                className="h-full w-full"
                allowFullScreen
                loading="lazy"
                style={{ border: "none" }}
              />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

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

        {/* Talks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {talkKeys.map((key, i) => {
            const type = t(`items.${key}.type`).toLowerCase();

            return (
              <ScrollReveal
                key={key}
                delay={0.08 * i}
                className={talkKeys.length === 1 || i === 0 || i === talkKeys.length - 1 ? "md:col-span-2" : ""}
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

                  {/* Card content */}
                  <div className="relative rounded-xl border border-line bg-bg p-8 lg:p-10 overflow-hidden transition-all duration-500 group-hover:border-transparent group-hover:bg-bg/95 group-hover:scale-[1.02]">
                    {/* Top row: number + type badge */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs text-text-tertiary tracking-widest">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-sm border border-line px-2.5 py-1 font-mono text-xs text-text-tertiary tracking-wider">
                        <span className="text-accent/60 group-hover:text-accent transition-colors duration-300">
                          {typeIcons[type] ?? typeIcons.talk}
                        </span>
                        {t(`items.${key}.type`)}
                      </span>
                    </div>

                    {/* Title -- shifts right on hover */}
                    <h3 className="font-display text-xl lg:text-2xl font-bold tracking-tight mb-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                      {t(`items.${key}.title`)}
                    </h3>

                    {/* Event + Date */}
                    <p className="font-mono text-sm text-text-tertiary">
                      {t(`items.${key}.event`)}
                      <span className="mx-2 text-line">·</span>
                      {t(`items.${key}.date`)}
                    </p>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-relaxed text-text-secondary opacity-70 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100">
                      {t(`items.${key}.description`)}
                    </p>

                    {/* CTA button — opens inline preview */}
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => openPreview(t(`items.${key}.link`))}
                        className="group/link inline-flex items-center gap-2 font-mono text-sm text-accent hover:text-accent-hover transition-colors duration-200 cursor-pointer"
                      >
                        {t("viewSlides")}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                        >
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <polyline points="8 21 16 21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      </button>
                    </div>

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
            );
          })}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-line to-transparent" />
    </section>
  );
}
