"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { m, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ExternalLink,
  Gamepad2,
  GraduationCap,
  BookOpen,
  Wrench,
  Palette,
  LayoutGrid,
  FileText,
  ArrowLeft,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextScramble } from "@/components/ui/text-scramble";
import { useFavorites } from "./use-favorites";
import {
  resources,
  categories,
  type CategoryKey,
  type DifficultyLevel,
  type DevResource,
} from "@/data/dev-resources";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

/* ───── Icon mapping ───── */
const categoryIcons: Record<CategoryKey, React.ReactNode> = {
  interactive: <Gamepad2 className="size-4" />,
  courses: <GraduationCap className="size-4" />,
  platforms: <BookOpen className="size-4" />,
  tools: <Wrench className="size-4" />,
  design: <Palette className="size-4" />,
  components: <LayoutGrid className="size-4" />,
  references: <FileText className="size-4" />,
};

/* ───── Difficulty colors (work in both dark & light via opacity) ───── */
const levelStyles: Record<DifficultyLevel, string> = {
  iniciante: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  intermediario: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  avancado: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

const levelLabels: Record<DifficultyLevel, Record<string, string>> = {
  iniciante: { pt: "Iniciante", en: "Beginner", es: "Principiante" },
  intermediario: {
    pt: "Intermediário",
    en: "Intermediate",
    es: "Intermedio",
  },
  avancado: { pt: "Avançado", en: "Advanced", es: "Avanzado" },
};

/* ───── Resource Card ───── */
function ResourceCard({
  resource,
  locale,
  isFav,
  onToggleFav,
}: {
  resource: DevResource;
  locale: string;
  isFav: boolean;
  onToggleFav: () => void;
}) {
  const cat = categories[resource.category];

  return (
    <m.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="group relative flex flex-col rounded-xl border border-line bg-bg p-5 transition-all duration-300 hover:border-accent/30 hover:bg-bg-elevated/50"
    >
      {/* Gradient border on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,93,250,0.3), rgba(183,148,246,0.15), rgba(90,63,209,0.3))",
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-3">
        {/* Top row: category + level + favorite */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-sm border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-tertiary transition-colors group-hover:border-accent/20 group-hover:text-accent">
            {categoryIcons[resource.category]}
            {cat[locale as keyof typeof cat] || cat.en}
          </span>
          <span
            className={cn(
              "rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
              levelStyles[resource.level],
            )}
          >
            {levelLabels[resource.level][locale] ||
              levelLabels[resource.level].en}
          </span>
          <button
            onClick={onToggleFav}
            className="ml-auto rounded-md p-1 text-text-tertiary transition-colors hover:text-rose-400"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={cn(
                "size-4 transition-all",
                isFav && "fill-rose-400 text-rose-400",
              )}
            />
          </button>
        </div>

        {/* Name */}
        <h3 className="font-display text-base font-semibold tracking-tight transition-colors group-hover:text-accent">
          {resource.name}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-text-secondary">
          {resource.description[locale as keyof typeof resource.description] ||
            resource.description.en}
        </p>

        {/* Link */}
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 pt-2 font-mono text-xs text-accent transition-colors hover:text-accent-hover"
        >
          <ExternalLink className="size-3" />
          <span className="truncate">{new URL(resource.url).hostname}</span>
        </a>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-5 right-5 h-px origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        style={{
          background:
            "linear-gradient(90deg, var(--color-accent), transparent 80%)",
        }}
        aria-hidden="true"
      />
    </m.article>
  );
}

/* ───── Main Page ───── */
export function DevToolsPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("devTools");
  const { toggle, isFav, count } = useFavorites();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">(
    "all",
  );
  const [showFavsOnly, setShowFavsOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return resources.filter((r) => {
      if (activeCategory !== "all" && r.category !== activeCategory)
        return false;
      if (showFavsOnly && !isFav(r.id)) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        (
          r.description[locale as keyof typeof r.description] ||
          r.description.en
        )
          .toLowerCase()
          .includes(q) ||
        r.tags?.some((tag) => tag.includes(q))
      );
    });
  }, [search, activeCategory, showFavsOnly, isFav, locale]);

  const categoryKeys = Object.keys(categories) as CategoryKey[];

  return (
    <section className="relative min-h-screen px-6 pt-32 pb-20 sm:pt-40 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Back link */}
        <ScrollReveal>
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-tertiary transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-3" />
            {t("back")}
          </Link>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <TextScramble
              text={t("label")}
              className="font-mono text-xs uppercase tracking-[0.25em] text-accent"
            />
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {t("description")}
          </p>
        </ScrollReveal>

        {/* Search + Filters */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 space-y-4">
            {/* Search bar */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-xl border border-line bg-bg-elevated/50 py-3 pl-11 pr-10 font-body text-sm text-text placeholder:text-text-tertiary transition-colors focus:border-accent/50 focus:outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded p-0.5 text-text-tertiary hover:text-text"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Category pills + favorites toggle */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={cn(
                  "rounded-lg border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200",
                  activeCategory === "all"
                    ? "border-accent/40 bg-accent-muted text-accent"
                    : "border-line text-text-tertiary hover:border-line-hover hover:text-text-secondary",
                )}
              >
                {t("all")}
              </button>
              {categoryKeys.map((key) => (
                <button
                  key={key}
                  onClick={() =>
                    setActiveCategory(activeCategory === key ? "all" : key)
                  }
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200",
                    activeCategory === key
                      ? "border-accent/40 bg-accent-muted text-accent"
                      : "border-line text-text-tertiary hover:border-line-hover hover:text-text-secondary",
                  )}
                >
                  {categoryIcons[key]}
                  <span className="hidden sm:inline">
                    {categories[key][locale]}
                  </span>
                </button>
              ))}

              {/* Favorites filter */}
              <button
                onClick={() => setShowFavsOnly(!showFavsOnly)}
                className={cn(
                  "ml-auto inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200",
                  showFavsOnly
                    ? "border-rose-400/40 bg-rose-500/10 text-rose-400"
                    : "border-line text-text-tertiary hover:border-line-hover hover:text-text-secondary",
                )}
              >
                <Heart
                  className={cn(
                    "size-3",
                    showFavsOnly && "fill-rose-400",
                  )}
                />
                {t("favorites")}
                {count > 0 && (
                  <span className="ml-1 tabular-nums">({count})</span>
                )}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Results count */}
        <div className="mt-8 mb-6">
          <p className="font-mono text-xs text-text-tertiary">
            {filtered.length} {t("results")}
          </p>
        </div>

        {/* Resource Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <m.div
              key={`${activeCategory}-${showFavsOnly}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  locale={locale}
                  isFav={isFav(resource.id)}
                  onToggleFav={() => toggle(resource.id)}
                />
              ))}
            </m.div>
          ) : (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <Search className="mb-4 size-8 text-text-tertiary/50" />
              <p className="font-display text-lg text-text-secondary">
                {t("noResults")}
              </p>
              <p className="mt-1 text-sm text-text-tertiary">
                {t("noResultsHint")}
              </p>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-line to-transparent" />
    </section>
  );
}
