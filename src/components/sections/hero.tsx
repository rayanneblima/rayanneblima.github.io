"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, useEffect, useCallback } from "react";
import { m, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextScramble } from "@/components/ui/text-scramble";

/* ─── Floating particle (CSS animation — no JS on main thread) ─── */
function Particle({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <div
      className="absolute rounded-full bg-accent/20 hero-particle"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

/* ─── Animated gradient orb (CSS animation — compositor thread) ─── */
function GradientOrb({
  size,
  gradient,
  top,
  left,
  right,
  bottom,
  animDelay = 0,
}: {
  size: string;
  gradient: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  animDelay?: number;
}) {
  return (
    <div
      className="absolute rounded-full blur-3xl opacity-30 hero-orb"
      style={{
        width: size,
        height: size,
        background: gradient,
        top,
        left,
        right,
        bottom,
        animationDelay: `${animDelay}s`,
      }}
    />
  );
}

/* ─── Collaborative cursor tag (CSS animations — compositor thread) ─── */
const DRIFT_CLASSES = ["cursor-drift-1", "cursor-drift-2", "cursor-drift-3", "cursor-drift-4"] as const;

function CursorTag({
  label,
  color,
  x,
  y,
  delay = 0,
  driftIndex,
  side = "left",
}: {
  label: string;
  color: string;
  x: string;
  y: string;
  delay?: number;
  driftIndex: number;
  side?: "left" | "right";
}) {
  const isRight = side === "right";

  return (
    <div
      className="absolute pointer-events-none hidden lg:block"
      style={{
        left: x,
        top: y,
        animation: `cursor-tag-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both`,
      }}
    >
      <div
        className={`${DRIFT_CLASSES[driftIndex % DRIFT_CLASSES.length]} ${isRight ? "flex flex-row-reverse items-start" : ""}`}
      >
        {/* Cursor SVG — mirrored horizontally for right-side arrow */}
        <svg
          width="14"
          height="17"
          viewBox="0 0 14 17"
          fill="none"
          style={isRight ? { transform: "scaleX(-1)" } : undefined}
        >
          <path
            d="M0.5 0.5L13 9.5H5.5L3 16.5L0.5 0.5Z"
            fill={color}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
        </svg>
        {/* Label bubble */}
        <div
          className={`${isRight ? "mr-2 mt-1" : "ml-2.5 -mt-1"} cursor-label-pulse rounded-full px-3 py-1.5 shadow-lg backdrop-blur-sm`}
          style={{
            backgroundColor: color,
            boxShadow: `0 4px 20px ${color}40`,
            animationDelay: `${delay * 0.3}s`,
          }}
        >
          <span className="whitespace-nowrap text-xs font-semibold leading-none text-white tracking-wide">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

const SPLASH_OFFSET = 2.3; // cursor tags appear after splash fades
const cursorTags = [
  { label: "Vue.js",             color: "#42b883", x: "2%",  y: "18%", delay: SPLASH_OFFSET + 0.2, side: "right" as const, driftIndex: 0 },
  { label: "TypeScript",         color: "#3178c6", x: "85%", y: "15%", delay: SPLASH_OFFSET + 0.4, side: "left"  as const, driftIndex: 1 },
  { label: "Design Systems",     color: "#dc2590", x: "1%",  y: "55%", delay: SPLASH_OFFSET + 0.6, side: "right" as const, driftIndex: 2 },
  { label: "Acessibilidade",     color: "#10b981", x: "83%", y: "55%", delay: SPLASH_OFFSET + 0.3, side: "left"  as const, driftIndex: 3 },
  { label: "Prompt Engineering",  color: "#8b5cf6", x: "3%",  y: "36%", delay: SPLASH_OFFSET + 0.8, side: "right" as const, driftIndex: 0 },
  { label: "Testes E2E",         color: "#f59e0b", x: "87%", y: "38%", delay: SPLASH_OFFSET + 0.5, side: "left"  as const, driftIndex: 1 },
  { label: "Next.js",            color: "#a78bfa", x: "2%",  y: "75%", delay: SPLASH_OFFSET + 1.0, side: "right" as const, driftIndex: 2 },
  { label: "Product Thinking",   color: "#06b6d4", x: "80%", y: "74%", delay: SPLASH_OFFSET + 0.7, side: "left"  as const, driftIndex: 3 },
];

/* ─── CV Download dropdown ───────────────────────────────── */
function CvDropdown({ t }: { t: ReturnType<typeof useTranslations<"hero">> }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Close on click outside */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex items-center gap-2 rounded-lg border-2 border-accent/40 bg-transparent px-8 py-4 text-lg font-semibold text-text backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:scale-105 cursor-pointer"
      >
        {/* Download icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {t("cta.cv")}
        {/* Chevron */}
        <m.svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </m.svg>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 min-w-55 overflow-hidden rounded-xl border border-line bg-bg/95 shadow-xl shadow-accent/10 backdrop-blur-xl"
          >
            <a
              href="https://drive.google.com/file/d/1Jp_RSHL_rLUqLN0OK6P_oD6CvZgranp9/view"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3.5 text-sm text-text-secondary transition-colors hover:bg-accent/10 hover:text-text"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="font-medium text-text">{t("cta.cvPt")}</span>
                <span className="text-xs text-text-tertiary">PDF &middot; PT-BR</span>
              </span>
            </a>
            <div className="mx-4 h-px bg-line/50" />
            <a
              href="https://drive.google.com/file/d/1QNyiWF1OxAg8tkuz4whkYIeO4C8fODBu/view"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3.5 text-sm text-text-secondary transition-colors hover:bg-accent/10 hover:text-text"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="font-medium text-text">{t("cta.cvEn")}</span>
                <span className="text-xs text-text-tertiary">PDF &middot; English</span>
              </span>
            </a>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "10%" : "50%"]);
  const opacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.55, 1] : [0, 0.35, 0.85],
    [1, 1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.55, 1] : [0, 0.35, 0.85],
    [1, 1, 0.95],
  );
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const orbY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  /* Particles — fewer on mobile for performance */
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);
  useEffect(() => {
    const count = window.innerWidth < 640 ? 5 : 15;
    const p = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(p);
  }, []);

  /* Scroll-to-next smooth handler */
  const scrollToWork = useCallback(() => {
    document.getElementById("expertise")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* Title words for animated reveal */
  // const titleWords = [t("name1"), t("name2")];
  const titleWords = [t("name1")];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[130svh] w-full overflow-hidden sm:min-h-svh"
    >
      {/* ─── Grid background ─── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(color-mix(in srgb, var(--color-accent) 10%, transparent) 1px, transparent 1px),
                           linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 10%, transparent) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* ─── Gradient orbs ─── */}
      <m.div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ y: orbY }}>
        <GradientOrb
          size="600px"
          gradient="radial-gradient(circle, #7C5DFA 0%, transparent 70%)"
          top="-20%"
          left="-10%"
          animDelay={0}
        />
        <GradientOrb
          size="500px"
          gradient="radial-gradient(circle, #9D7FEA 0%, transparent 70%)"
          top="30%"
          right="-15%"
          animDelay={1}
        />
        <GradientOrb
          size="400px"
          gradient="radial-gradient(circle, #5A3FD1 0%, transparent 70%)"
          bottom="-10%"
          left="30%"
          animDelay={2}
        />
      </m.div>

      {/* ─── Particles ─── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      {/* ─── Collaborative cursor tags (above vignette, fades with hero) ─── */}
      <m.div className="absolute inset-0 z-40 pointer-events-none overflow-hidden" style={{ opacity }}>
        {cursorTags.map((tag) => (
          <CursorTag key={tag.label} label={tag.label} color={tag.color} x={tag.x} y={tag.y} delay={tag.delay} side={tag.side} driftIndex={tag.driftIndex} />
        ))}
      </m.div>

      {/* ─── Noise texture ─── */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* ─── Main content (centered) ─── */}
      <m.div
        className="relative z-20 flex min-h-svh flex-col items-center justify-center px-4 pt-16 pb-4 sm:px-6 sm:pt-20 sm:pb-10 lg:px-8"
        style={{ y: smoothY, opacity, scale }}
      >
        <div className="mx-auto max-w-6xl text-center">
          {/* Avatar — CSS animation (no opacity:0 in SSR for LCP) */}
          <div className="hero-avatar mb-4 flex justify-center sm:mb-6">
            <div className="relative">
              <img
                src="/images/rayanne-hero.webp"
                alt="Rayanne B. Lima"
                width={80}
                height={80}
                fetchPriority="high"
                className="h-20 w-20 rounded-full object-cover ring-2 ring-accent/30 ring-offset-4 ring-offset-bg"
              />
              {/* Glow behind avatar */}
              <div
                className="absolute -inset-3 -z-10 rounded-full opacity-40 blur-xl"
                style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
                aria-hidden="true"
              />
              {/* Status dot — online green */}
              <span className="absolute bottom-0.5 right-0.5 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-bg bg-emerald-400" />
              </span>
            </div>
          </div>

          {/* Badge / micro label — CSS animation */}
          <div className="hero-badge mb-5 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 backdrop-blur-sm sm:mb-8">
            <TextScramble
              text="Frontend Lead & Full Stack Developer"
              className="text-sm font-medium text-accent"
            />
          </div>

          {/* Title — CSS animation (no opacity:0) so Chrome registers LCP at first paint */}
          <div className="mb-6 overflow-hidden">
            {titleWords.map((word, index) => (
              <h1
                key={index}
                className="hero-title inline-block font-display text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
                style={{
                  background: "linear-gradient(135deg, var(--color-text) 0%, var(--color-accent) 50%, var(--color-accent-hover) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginRight: index < titleWords.length - 1 ? "0.3em" : "0",
                }}
              >
                {word}
              </h1>
            ))}
          </div>

          {/* Headline — CSS animation (no opacity:0 in SSR) so Chrome can pick it as LCP */}
          <p className="hero-headline mb-6 text-xl text-text-secondary sm:text-2xl md:text-3xl">
            {t("headline")}
          </p>

          {/* Sub copy — CSS animation */}
          <p className="hero-sub mx-auto mb-6 max-w-2xl text-base text-text-tertiary sm:mb-12 sm:text-lg">
            {t("sub")}
          </p>

          {/* CTA Buttons — CSS animation to avoid hydration flash */}
          <div className="hero-cta flex flex-col items-center justify-center gap-4 sm:flex-row">

            <MagneticButton
              as="a"
              href="#work"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-linear-to-r from-accent to-accent-hover px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-accent/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/50"
              data-magnetic
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("cta.work")}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </MagneticButton>

            <CvDropdown t={t} />
          </div>

          {/* Social links — CSS animation */}
          <div className="hero-social mt-5 flex items-center justify-center gap-5 sm:mt-10 lg:mt-14">

            {[
              {
                href: "mailto:rayanne_lima2010@hotmail.com",
                label: "Email",
                external: false,
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                ),
              },
              {
                href: "https://github.com/rayanneblima",
                label: "GitHub",
                external: true,
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                ),
              },
              {
                href: "https://linkedin.com/in/rayanneblima",
                label: "LinkedIn",
                external: true,
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                href: "https://pulsatrixapps.com.br",
                label: "Pulsatrix Apps",
                external: true,
                icon: (
                  <svg width="18" height="18" viewBox="0 0 856 632" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M428 631.971L487.358 557.092C496.826 545.145 507.193 529.298 510.792 515.566C663.693 489.441 856 417.332 856 228.343C856 103.794 746.238 0 620.27 0C540.62 0 470.28 38.8157 428 98.1038V631.971ZM620.27 117.224H620.261C559.144 117.224 509.139 167.229 509.139 228.349V339.481H620.27C681.391 339.481 731.396 289.476 731.396 228.358V228.349C731.396 167.229 681.391 117.224 620.27 117.224Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M428 631.971L368.642 557.092C359.174 545.145 348.807 529.298 345.208 515.566C192.307 489.441 0 417.332 0 228.343C0 103.794 109.761 0 235.73 0C315.38 0 385.72 38.8157 428 98.1038V631.971ZM234.076 117.224H234.085C295.203 117.224 345.208 167.229 345.208 228.349V339.481H234.076C172.955 339.481 122.951 289.476 122.951 228.358V228.349C122.951 167.229 172.955 117.224 234.076 117.224Z" opacity="0.6" />
                  </svg>
                ),
              },
            ].map((social) => (
              <m.a
                key={social.label}
                href={social.href}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent/80 backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent/20 hover:text-accent sm:h-12 sm:w-12"
              >
                {social.icon}
              </m.a>
            ))}
          </div>

          {/* Scroll indicator — CSS animation */}
          <div className="hero-scroll mt-4 hidden justify-center sm:mt-8 sm:flex lg:mt-10">

            <button
              onClick={scrollToWork}
              className="scroll-bounce flex flex-col items-center gap-1.5 cursor-pointer group sm:gap-2"
              aria-label="Scroll down"
            >
              <span className="text-xs text-text-tertiary group-hover:text-accent transition-colors sm:text-sm">
                Scroll to explore
              </span>
              <div className="h-8 w-5 rounded-full border-2 border-accent/30 group-hover:border-accent transition-colors flex justify-center sm:h-10 sm:w-5">
                <div
                  className="scroll-dot mt-1.5 h-1.5 w-1.5 rounded-full bg-accent sm:mt-2 sm:h-2 sm:w-2"
                />
              </div>
            </button>
          </div>
        </div>
      </m.div>

      {/* ─── Vignette effect ─── */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 15%, color-mix(in srgb, var(--color-bg) 70%, transparent) 100%)",
        }}
      />

      {/* ─── Bottom gradient line ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-px z-10 bg-linear-to-r from-transparent via-accent/40 to-transparent" />
    </section>
  );
}
