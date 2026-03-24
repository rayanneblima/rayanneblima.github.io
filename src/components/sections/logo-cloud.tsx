"use client";

import { useTranslations } from "next-intl";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/shared/theme-provider";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextScramble } from "@/components/ui/text-scramble";

type Logo = {
  src: string;
  /** Optional theme-specific variants (PNG). When present, these override `src`. */
  srcDark?: string;
  srcLight?: string;
  alt: string;
};

/* 12 logos = perfect 4×3 grid.
   Brands with dark/light PNG variants swap based on theme.
   Others use a single SVG with CSS grayscale filter. */
const logos: Logo[] = [
  { src: "/images/logos/redbull.svg", alt: "Red Bull" },
  { src: "/images/logos/mcdonalds-light.png", srcDark: "/images/logos/mcdonalds-dark.png", srcLight: "/images/logos/mcdonalds-light.png", alt: "McDonald's" },
  { src: "/images/logos/nubank-light.png", srcDark: "/images/logos/nubank-dark.png", srcLight: "/images/logos/nubank-light.png", alt: "Nubank" },
  { src: "/images/logos/ifood.svg", alt: "iFood" },
  { src: "/images/logos/renault-light.png", srcDark: "/images/logos/renault-dark.png", srcLight: "/images/logos/renault-light.png", alt: "Renault" },
  { src: "/images/logos/claro.svg", alt: "Claro" },
  { src: "/images/logos/cocacola-light.png", srcDark: "/images/logos/cocacola-dark.png", srcLight: "/images/logos/cocacola-light.png", alt: "Coca-Cola FEMSA" },
  { src: "/images/logos/warnermedia-light.png", srcDark: "/images/logos/warnermedia-dark.png", srcLight: "/images/logos/warnermedia-light.png", alt: "Warner Bros. Discovery" },
  { src: "/images/logos/fabercastell-light.png", srcDark: "/images/logos/fabercastell-dark.png", srcLight: "/images/logos/fabercastell-light.png", alt: "Faber-Castell" },
  { src: "/images/logos/casio.svg", alt: "Casio" },
  { src: "/images/logos/cyrela.svg", alt: "Cyrela" },
  { src: "/images/logos/raizen.svg", alt: "Raízen" },
];

const COLS = 4;
const ROWS = Math.ceil(logos.length / COLS);

const plusConfig: Record<number, ("br" | "bl")[]> = {
  0: ["br"],
  2: ["br", "bl"],
  8: ["br"],
  10: ["br", "bl"],
};

function LogoCard({ logo, index, theme }: { logo: Logo; index: number; theme: "dark" | "light" }) {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const isLastRow = row === ROWS - 1;
  const elevated = (row + col) % 2 === 0;
  const plus = plusConfig[index];
  const hasVariants = !!(logo.srcDark && logo.srcLight);
  const imgSrc = hasVariants
    ? (theme === "dark" ? logo.srcDark! : logo.srcLight!)
    : logo.src;

  return (
    <div
      className={cn(
        "group/logo relative flex items-center justify-center px-4 py-10 md:px-6 md:py-12 transition-colors duration-300",
        col < COLS - 1 && "border-r border-line/40",
        !isLastRow && "border-b border-line/40",
        elevated ? "bg-bg-elevated/30" : "bg-bg",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={logo.alt}
        className={cn(
          "logo-cloud-img pointer-events-none h-8 w-auto max-w-32 select-none sm:h-10 md:h-12 md:max-w-44",
          !hasVariants && "logo-cloud-svg",
        )}
        src={imgSrc}
        loading="lazy"
        draggable={false}
      />

      {plus?.map((pos) => (
        <PlusIcon
          key={pos}
          className={cn(
            "absolute z-10 hidden size-6 text-text-tertiary/50 md:block",
            pos === "br" && "-right-[12.5px] -bottom-[12.5px]",
            pos === "bl" && "-left-[12.5px] -bottom-[12.5px]",
          )}
          strokeWidth={1}
        />
      ))}
    </div>
  );
}

export function LogoCloud() {
  const t = useTranslations("logoCloud");
  const { theme } = useTheme();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <h2 className="mb-12 flex items-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <TextScramble
              text={t("label")}
              className="font-mono text-xs uppercase tracking-[0.25em] text-accent"
            />
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative grid grid-cols-2 border-x border-line/40 overflow-visible md:grid-cols-4">
            <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-line/40" />

            {logos.map((logo, i) => (
              <LogoCard key={logo.alt} logo={logo} index={i} theme={theme} />
            ))}

            <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-line/40" />
          </div>
        </ScrollReveal>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-line to-transparent" />
    </section>
  );
}
