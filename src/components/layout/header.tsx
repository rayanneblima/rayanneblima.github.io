"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { m, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { useTheme } from "@/components/shared/theme-provider";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { Link, usePathname } from "@/i18n/navigation";

const navItems = ["expertise", "work", "process", "contact"] as const;

/* ─── Animated nav link with text slide-up on hover ─── */
function NavLinkAnimated({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <m.a
      href={href}
      className={cn(
        "relative px-4 py-2 text-sm font-medium transition-colors overflow-hidden",
        isActive ? "text-accent" : "text-text-secondary hover:text-text"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.95 }}
    >
      {/* Text with slide effect */}
      <span className="relative z-10 block h-5 overflow-hidden">
        <span
          className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: hovered ? "translateY(-50%)" : "translateY(0)" }}
        >
          <span className="block leading-5">{children}</span>
          <span className="block leading-5 text-accent">{children}</span>
        </span>
      </span>

      {/* Hover background glow */}
      <m.div
        className="absolute inset-0 rounded-full z-0"
        initial={false}
        animate={{ opacity: hovered ? 0.08 : 0, scale: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        style={{ backgroundColor: "var(--color-accent)" }}
      />

      {/* Bottom accent line */}
      <m.div
        className="absolute bottom-0 left-2 right-2 h-px rounded-full bg-accent"
        initial={false}
        animate={{ scaleX: hovered || isActive ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ originX: 0 }}
      />
    </m.a>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export function Header() {
  const t = useTranslations("nav");
  const { theme, toggleTheme } = useTheme();
  const activeSection = useScrollSpy();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Scroll progress — driven by MotionValue (no React state) for fluid updates */
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Mobile menu variants */
  const menuVariants = {
    closed: { opacity: 0, transition: { duration: 0.3, when: "afterChildren" } },
    open: {
      opacity: 1,
      transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.08 },
    },
  };
  const linkVariants = {
    closed: { opacity: 0, y: 40 },
    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <>
      {/* ═══ DEFAULT HEADER (visible when at top) ═══ */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "opacity-0 pointer-events-none -translate-y-4" : "opacity-100 translate-y-0"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          {isHome ? (
            <a
              href="#hero"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300"
            >
              <img src="/images/logo-icon.webp" alt="R" width={28} height={28} className="h-7 w-7" />
              <span className="font-display text-sm font-bold tracking-tight hidden sm:inline">
                rayanne<span className="text-accent">blima</span>
              </span>
            </a>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300"
            >
              <img src="/images/logo-icon.webp" alt="R" width={28} height={28} className="h-7 w-7" />
              <span className="font-display text-sm font-bold tracking-tight hidden sm:inline">
                rayanne<span className="text-accent">blima</span>
              </span>
            </Link>
          )}

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main">
            {navItems.map((item) =>
              isHome ? (
                <a
                  key={item}
                  href={`#${item}`}
                  className={cn(
                    "relative px-3 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors duration-300",
                    activeSection === item ? "text-accent" : "text-text-secondary hover:text-text"
                  )}
                >
                  {t(item)}
                </a>
              ) : (
                <Link
                  key={item}
                  href={`/#${item}`}
                  className="relative px-3 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors duration-300 text-text-secondary hover:text-text"
                >
                  {t(item)}
                </Link>
              )
            )}
            <Link
              href="/dev-tools"
              className={cn(
                "relative px-3 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors duration-300",
                !isHome ? "text-accent" : "text-text-secondary hover:text-accent"
              )}
            >
              Dev Tools
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="flex h-7 w-7 items-center justify-center rounded text-text-secondary hover:text-text transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>
            <button
              className="flex md:hidden h-7 w-7 items-center justify-center text-text-secondary hover:text-text transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ═══ FLOATING PILL HEADER (visible when scrolled) ═══ */}
      <AnimatePresence>
        {scrolled && !mobileOpen && (
          <m.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl"
          >
            <div
              className="relative rounded-full border border-line/40 shadow-2xl shadow-accent/5 transition-all duration-300"
              style={{
                background: "color-mix(in srgb, var(--color-bg) 75%, transparent)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Scroll progress bar inside pill */}
              <div
                className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full overflow-hidden"
              >
                <m.div
                  className="h-full rounded-full bg-linear-to-r from-accent to-accent-hover"
                  style={{ width: progressWidth }}
                />
              </div>

              <div className="flex items-center justify-between px-5 py-3">
                {/* Logo */}
                {isHome ? (
                  <a
                    href="#hero"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300"
                  >
                    <img src="/images/logo-icon.webp" alt="R" width={24} height={24} className="h-6 w-6" />
                    <span className="font-display text-sm font-bold tracking-tight hidden sm:inline">
                      rayanne<span className="text-accent">blima</span>
                    </span>
                  </a>
                ) : (
                  <Link
                    href="/"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300"
                  >
                    <img src="/images/logo-icon.webp" alt="R" width={24} height={24} className="h-6 w-6" />
                    <span className="font-display text-sm font-bold tracking-tight hidden sm:inline">
                      rayanne<span className="text-accent">blima</span>
                    </span>
                  </Link>
                )}

                {/* Nav links with animated hover */}
                <div className="hidden md:flex items-center gap-0.5">
                  {isHome ? (
                    navItems.map((item) => (
                      <NavLinkAnimated
                        key={item}
                        href={`#${item}`}
                        isActive={activeSection === item}
                      >
                        {t(item)}
                      </NavLinkAnimated>
                    ))
                  ) : (
                    navItems.map((item) => (
                      <Link
                        key={item}
                        href={`/#${item}`}
                        className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-text transition-colors"
                      >
                        {t(item)}
                      </Link>
                    ))
                  )}
                  <Link
                    href="/dev-tools"
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors",
                      !isHome ? "text-accent" : "text-text-secondary hover:text-accent"
                    )}
                  >
                    Dev Tools
                  </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <button
                    onClick={toggleTheme}
                    className="flex h-7 w-7 items-center justify-center rounded text-text-secondary hover:text-text transition-colors cursor-pointer"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                    )}
                  </button>
                  {/* Mobile menu button */}
                  <m.button
                    className="flex md:hidden h-8 w-8 items-center justify-center text-text-secondary hover:text-text transition-colors cursor-pointer"
                    onClick={() => setMobileOpen(true)}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Menu"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="4" y1="8" x2="20" y2="8" />
                      <line x1="4" y1="16" x2="20" y2="16" />
                    </svg>
                  </m.button>
                </div>
              </div>
            </div>
          </m.nav>
        )}
      </AnimatePresence>

      {/* ═══ FULLSCREEN MOBILE MENU ═══ */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-60 md:hidden"
            style={{
              background: "color-mix(in srgb, var(--color-bg) 98%, transparent)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Close button */}
            <div className="absolute top-5 right-6">
              <m.button
                className="flex h-10 w-10 items-center justify-center text-text-secondary hover:text-text transition-colors cursor-pointer"
                onClick={() => setMobileOpen(false)}
                whileTap={{ scale: 0.9 }}
                aria-label="Close menu"
              >
                <AnimatePresence mode="wait">
                  <m.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </m.div>
                </AnimatePresence>
              </m.button>
            </div>

            {/* Links */}
            <div className="flex flex-col items-start justify-center h-full gap-8 px-10">
              {navItems.map((item) =>
                isHome ? (
                  <m.a
                    key={item}
                    href={`#${item}`}
                    variants={linkVariants}
                    className="group relative text-5xl font-display font-bold tracking-tight text-text-secondary hover:text-text transition-colors"
                    onClick={() => setMobileOpen(false)}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{t(item)}</span>
                    <m.div
                      className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </m.a>
                ) : (
                  <m.div key={item} variants={linkVariants}>
                    <Link
                      href={`/#${item}`}
                      className="group relative text-5xl font-display font-bold tracking-tight text-text-secondary hover:text-text transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {t(item)}
                    </Link>
                  </m.div>
                )
              )}
              <m.div variants={linkVariants}>
                <Link
                  href="/dev-tools"
                  className={cn(
                    "group relative text-5xl font-display font-bold tracking-tight transition-colors",
                    !isHome ? "text-accent" : "text-text-secondary hover:text-accent"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  Dev Tools
                </Link>
              </m.div>
            </div>

            {/* Decorative orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <m.div
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent opacity-10 blur-[100px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <m.div
                className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent opacity-10 blur-[100px]"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.1, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
