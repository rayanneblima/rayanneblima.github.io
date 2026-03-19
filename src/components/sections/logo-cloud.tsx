"use client";

import { useTranslations } from "next-intl";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextScramble } from "@/components/ui/text-scramble";

type Logo = {
  src: string;
  alt: string;
};

const logos: Logo[] = [
  { src: "/images/logos/redbull.svg", alt: "Red Bull" },
  { src: "/images/logos/mcdonalds.svg", alt: "McDonald's" },
  { src: "/images/logos/nubank.svg", alt: "Nubank" },
  { src: "/images/logos/ifood.svg", alt: "iFood" },
  { src: "/images/logos/renault.svg", alt: "Renault" },
  { src: "/images/logos/claro.svg", alt: "Claro" },
  { src: "/images/logos/cocacola.svg", alt: "Coca-Cola FEMSA" },
  { src: "/images/logos/warnermedia.svg", alt: "Warner Media" },
  { src: "/images/logos/fabercastell.svg", alt: "Faber-Castell" },
  { src: "/images/logos/casio.svg", alt: "Casio" },
  { src: "/images/logos/cyrela.svg", alt: "Cyrela" },
  { src: "/images/logos/raizen.svg", alt: "Raízen" },
  { src: "/images/logos/futfanatics.svg", alt: "FutFanatics" },
];

/* 4-col grid → 4 rows (13 items, last row has 1 item spanning or 1 cell).
   We use 4 rows of 4, minus 3 = 13 items with last row having 1 extra empty cells.
   Better: use 4 cols, let grid auto-flow. We just need checkerboard + plus icons. */

type CellMeta = {
  elevated?: boolean;
  plus?: ("br" | "bl")[];
};

/*
  Checkerboard pattern matching the reference image exactly:
  Row 0: [elevated] [normal] [elevated] [normal]
  Row 1: [normal] [elevated] [normal] [elevated]
  Row 2: [elevated] [normal] [elevated] [normal]
  Row 3: [normal] ...

  Plus icons appear at bottom-right/bottom-left of cells where 4 elevated/normal cells meet.
*/
function getCellMeta(index: number): CellMeta {
  const col = index % 4;
  const row = Math.floor(index / 4);
  const elevated = (row + col) % 2 === 0;

  const plus: ("br" | "bl")[] = [];

  /* Plus at bottom-right: if this cell and the cells to the right, below, and diagonally
     form a 2x2 block. We place plus icons at select intersections for visual interest. */
  const totalRows = Math.ceil(logos.length / 4);

  /* Plus icons at inner grid intersections (where borders cross) */
  if (col < 3 && row < totalRows - 1) {
    /* Only on certain intersections to match reference pattern */
    if (elevated) {
      plus.push("br");
    }
  }
  if (col > 0 && row < totalRows - 1) {
    if (elevated && col === 2) {
      plus.push("bl");
    }
  }

  return { elevated, plus: plus.length > 0 ? plus : undefined };
}

const plusPositionClasses = {
  br: "-right-[12.5px] -bottom-[12.5px]",
  bl: "-left-[12.5px] -bottom-[12.5px]",
};

function LogoCard({ logo, index }: { logo: Logo; index: number }) {
  const col = index % 4;
  const row = Math.floor(index / 4);
  const totalRows = Math.ceil(logos.length / 4);
  const isLastRow = row === totalRows - 1;
  const meta = getCellMeta(index);

  return (
    <div
      className={cn(
        "group/logo relative flex items-center justify-center px-4 py-8 md:p-8 transition-colors duration-300",
        col < 3 && "border-r border-line/40",
        !isLastRow && "border-b border-line/40",
        meta.elevated ? "bg-bg-elevated/30" : "bg-bg",
      )}
    >
      <img
        alt={logo.alt}
        className="pointer-events-none h-4 w-auto max-w-[100px] select-none brightness-0 invert opacity-30 transition-opacity duration-500 group-hover/logo:opacity-70 md:h-5 md:max-w-[120px]"
        src={logo.src}
        loading="lazy"
        draggable={false}
      />

      {meta.plus?.map((pos) => (
        <PlusIcon
          key={pos}
          className={cn(
            "absolute z-10 hidden size-6 text-line/60 md:block",
            plusPositionClasses[pos],
          )}
          strokeWidth={1}
        />
      ))}
    </div>
  );
}

export function LogoCloud() {
  const t = useTranslations("logoCloud");

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section label */}
        <ScrollReveal>
          <h2 className="mb-12 flex items-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <TextScramble
              text={t("label")}
              className="font-mono text-xs uppercase tracking-[0.25em] text-accent"
            />
          </h2>
        </ScrollReveal>

        {/* Logo grid */}
        <ScrollReveal delay={0.1}>
          <div className="relative grid grid-cols-2 border-x border-line/40 md:grid-cols-4">
            {/* Full-width top border */}
            <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-line/40" />

            {logos.map((logo, i) => (
              <LogoCard key={logo.alt} logo={logo} index={i} />
            ))}

            {/* Fill remaining cells in last row if needed */}
            {logos.length % 4 !== 0 &&
              Array.from({ length: 4 - (logos.length % 4) }).map((_, i) => {
                const idx = logos.length + i;
                const col = idx % 4;
                const row = Math.floor(idx / 4);
                const elevated = (row + col) % 2 === 0;
                return (
                  <div
                    key={`empty-${i}`}
                    className={cn(
                      "px-4 py-8 md:p-8",
                      col < 3 && "border-r border-line/40",
                      elevated ? "bg-bg-elevated/30" : "bg-bg",
                    )}
                  />
                );
              })}

            {/* Full-width bottom border */}
            <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-line/40" />
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-line to-transparent" />
    </section>
  );
}
