"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextScramble } from "@/components/ui/text-scramble";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { TechIcon } from "@/components/ui/tech-icon";

const projectKeys = ["deskbee", "sosuba", "pulsatrix", "tray"] as const;
const allMetricKeys = ["m1", "m2", "m3", "m4"] as const;

const companyUrls: Record<string, string> = {
  deskbee: "https://deskbee.co",
  sosuba: "https://sosuba.com.br",
  pulsatrix: "https://pulsatrixapps.com.br",
  tray: "https://tray.com.br",
};

/* Project color accents for the mockup previews */
const projectAccents: Record<string, { from: string; via: string; to: string }> = {
  deskbee: { from: "#7C5DFA", via: "#5A3FD1", to: "#3D2A96" },
  sosuba: { from: "#E53E3E", via: "#C53030", to: "#9B2C2C" },
  pulsatrix: { from: "#B794F6", via: "#7C5DFA", to: "#5A3FD1" },
  tray: { from: "#5A3FD1", via: "#7C5DFA", to: "#B794F6" },
};

/* ─── Parallax preview container ─── */
function ParallaxPreview({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div ref={ref} style={{ y }} className="flex items-center justify-center">
      {children}
    </motion.div>
  );
}

/* Project preview image paths — labels come from i18n */
const projectPreviewSrcs: Record<string, string[]> = {
  deskbee: ["/images/preview-deskbee.png"],
  sosuba: ["/images/preview-sosuba.png"],
  pulsatrix: ["/images/preview-pulsatrix.png"],
  tray: ["/images/preview-tray.png"],
};
const previewKeys = ["p1", "p2", "p3"] as const;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

/* ─── Browser frame with carousel ─── */
function ProjectPreview({ projectKey, labels }: { projectKey: string; labels: string[] }) {
  const accent = projectAccents[projectKey];
  const srcs = projectPreviewSrcs[projectKey] ?? [];
  const slides = srcs.map((src, i) => ({ src, label: labels[i] ?? "" }));
  const [[current, direction], setCurrent] = useState([0, 0]);

  const paginate = useCallback(
    (dir: number) => {
      setCurrent(([prev]) => {
        const next = (prev + dir + slides.length) % slides.length;
        return [next, dir];
      });
    },
    [slides.length],
  );

  /* Auto-advance every 5s */
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => paginate(1), 5000);
    return () => clearInterval(id);
  }, [slides.length, paginate]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Browser chrome */}
      <div className="rounded-t-xl border border-line/60 bg-bg-elevated/80 backdrop-blur-sm px-4 py-2.5 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 ml-3 rounded-md bg-bg/60 px-3 py-1">
          <span className="font-mono text-xs text-text-tertiary tracking-wider">
            {companyUrls[projectKey]?.replace("https://", "")}
          </span>
        </div>
      </div>

      {/* Browser viewport — carousel */}
      <div className="relative rounded-b-xl border border-t-0 border-line/60 overflow-hidden aspect-16/10">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={current}
            src={slides[current]?.src}
            alt={slides[current]?.label}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="lazy"
            draggable={false}
          />
        </AnimatePresence>

        {/* Nav arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-bg/70 backdrop-blur-sm border border-line/40 text-text-tertiary hover:text-text hover:bg-bg/90 transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-bg/70 backdrop-blur-sm border border-line/40 text-text-tertiary hover:text-text hover:bg-bg/90 transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Dots + label */}
        {slides.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full bg-bg/90 backdrop-blur-md px-3 py-1.5 border border-line/50 shadow-sm">
            {slides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent([idx, idx > current ? 1 : -1])}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === current
                    ? "w-5 bg-accent"
                    : "w-1.5 bg-text-tertiary/50 hover:bg-text-tertiary/80"
                }`}
                aria-label={slide.label}
              />
            ))}
            <span className="ml-1 font-mono text-xs text-text-secondary tracking-wider">
              {slides[current]?.label}
            </span>
          </div>
        )}

        {/* Shine sweep on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-5"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 55%, transparent 70%)",
          }}
        />
      </div>

      {/* Ambient glow behind */}
      <div
        className="absolute -inset-8 -z-10 blur-[60px] opacity-15 rounded-full"
        style={{
          background: `radial-gradient(circle, ${accent.from} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export function SelectedWork() {
  const t = useTranslations("work");

  return (
    <section id="work" className="relative px-6 py-28 sm:py-36 lg:px-10 bg-bg-raised/30">
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

        {/* Stacked project blocks */}
        <div>
          {projectKeys.map((key, i) => {
            const technologies = t(`items.${key}.technologies`)
              .split(", ")
              .filter(Boolean);

            const isEven = i % 2 === 0;

            return (
              <ScrollReveal key={key} delay={0.1}>
                <article className="group border-t border-line py-20 lg:py-28">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20`}>
                    {/* Left column -- project info + metrics */}
                    <div className={isEven ? "" : "lg:order-2"}>
                      {/* Context label */}
                      <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                        {t(`items.${key}.context`)}
                      </span>

                      {/* Project name + external link */}
                      <h3 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mt-4">
                        <a
                          href={companyUrls[key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex gap-2 items-center align-middle text-text hover:text-accent transition-colors duration-200"
                          aria-label={`Visit ${t(`items.${key}.name`)}`}
                        >
                          {t(`items.${key}.name`)}
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      </h3>

                      {/* Role and year */}
                      <p className="font-mono text-sm text-text-tertiary mt-2">
                        {t(`items.${key}.role`)}
                        <span className="mx-2 text-line">·</span>
                        {t(`items.${key}.year`)}
                      </p>

                      {/* Challenge */}
                      <div className="mt-8">
                        <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary block mb-2">
                          {t("challenge")}
                        </span>
                        <p className="text-text-secondary leading-relaxed">
                          {t(`items.${key}.challenge`)}
                        </p>
                      </div>

                      {/* Impact metrics -- inline */}
                      <div className="mt-8">
                        <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary block mb-4">
                          {t("impact")}
                        </span>
                        <div className={`grid gap-4 ${
                          t.has(`items.${key}.metrics.m4.value`) ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"
                        }`}>
                          {allMetricKeys.map((m) => {
                            if (!t.has(`items.${key}.metrics.${m}.value`)) return null;
                            return (
                              <div key={m}>
                                <AnimatedCounter
                                  value={t(`items.${key}.metrics.${m}.value`)}
                                  className="font-display text-2xl lg:text-3xl font-bold"
                                />
                                <p className="mt-1 font-mono text-xs text-text-tertiary tracking-wider leading-relaxed">
                                  {t(`items.${key}.metrics.${m}.label`)}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 rounded-sm border border-line px-2.5 py-1 font-mono text-xs text-text-tertiary tracking-wider hover:border-accent/30 hover:text-accent transition-colors duration-200"
                          >
                            <TechIcon name={tech} size={12} />
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Case study link */}
                      {/* <div className="mt-8">
                        <a
                          href={`#case-${key}`}
                          className="group/link inline-flex items-center gap-2 font-mono text-sm text-accent hover:text-accent-hover transition-colors duration-200"
                        >
                          {t("caseStudy")}
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
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </a>
                      </div> */}
                    </div>

                    {/* Right column -- large preview with parallax */}
                    <div className={isEven ? "" : "lg:order-1"}>
                      <ParallaxPreview>
                        <ProjectPreview
                          projectKey={key}
                          labels={previewKeys.map((pk) => t(`items.${key}.previews.${pk}`))}
                        />
                      </ParallaxPreview>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}

          {/* Final border */}
          <div className="border-t border-line" />
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-line to-transparent" />
    </section>
  );
}
