"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "@/components/shared/theme-provider";

const navItems = ["expertise", "work", "process", "contact"] as const;

function handleScrollTop() {
  window.scroll({ top: 0, behavior: "smooth" });
}

const socialLinks = [
  {
    href: "mailto:rayanne_lima2010@hotmail.com",
    label: "Email",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    href: "https://github.com/rayanneblima",
    label: "GitHub",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/in/rayanneblima",
    label: "LinkedIn",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://pulsatrixapps.com.br",
    label: "Pulsatrix Apps",
    icon: (
      <svg width="20" height="20" viewBox="0 0 856 632" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M428 631.971L487.358 557.092C496.826 545.145 507.193 529.298 510.792 515.566C663.693 489.441 856 417.332 856 228.343C856 103.794 746.238 0 620.27 0C540.62 0 470.28 38.8157 428 98.1038V631.971ZM620.27 117.224H620.261C559.144 117.224 509.139 167.229 509.139 228.349V339.481H620.27C681.391 339.481 731.396 289.476 731.396 228.358V228.349C731.396 167.229 681.391 117.224 620.27 117.224Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M428 631.971L368.642 557.092C359.174 545.145 348.807 529.298 345.208 515.566C192.307 489.441 0 417.332 0 228.343C0 103.794 109.761 0 235.73 0C315.38 0 385.72 38.8157 428 98.1038V631.971ZM234.076 117.224H234.085C295.203 117.224 345.208 167.229 345.208 228.349V339.481H234.076C172.955 339.481 122.951 289.476 122.951 228.358V228.349C122.951 167.229 172.955 117.224 234.076 117.224Z" opacity="0.6" />
      </svg>
    ),
  },
];

const underlineClass =
  "hover:-translate-y-1 border border-dotted border-line rounded-xl p-2.5 transition-transform duration-200 text-text-tertiary hover:text-accent hover:border-accent/40";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const { theme, toggleTheme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dotted border-line mx-auto w-full">
      {/* ─── Top: Logo + Bio ─── */}
      <div className="relative mx-auto grid max-w-7xl items-center justify-center gap-6 p-10 pb-0 md:flex">
        <a
          href="#hero"
          className="flex shrink-0 items-center justify-center gap-2 hover:opacity-80 transition-opacity duration-300"
        >
          <img
            src="/images/logo-icon.webp"
            alt="R"
            width={32}
            height={32}
            className="h-8 w-8"
          />
        </a>
        <p className="text-center text-xs leading-5 text-text-tertiary md:text-left">
          {t("bio")}
        </p>
      </div>

      {/* ─── Navigation links ─── */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="border-b border-dotted border-line" />

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-10">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sm text-text-tertiary hover:text-text transition-colors duration-200"
            >
              {nav(item)}
            </a>
          ))}
        </div>

        <div className="border-b border-dotted border-line" />
      </div>

      {/* ─── Social links + Theme toggle ─── */}
      <div className="flex flex-wrap items-center justify-center gap-6 gap-y-6 pb-6">
        <div className="flex flex-wrap items-center justify-center gap-4 px-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={social.label}
              className={underlineClass}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Theme toggle pill */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full border border-dotted border-line">
            <button
              onClick={() => { if (theme === "dark") toggleTheme(); }}
              className={`rounded-full p-2 transition-colors duration-200 cursor-pointer ${
                theme === "light"
                  ? "bg-accent text-white"
                  : "text-text-tertiary hover:text-text"
              }`}
              aria-label="Light theme"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleScrollTop}
              className="px-1 text-text-tertiary hover:text-accent transition-colors duration-200 cursor-pointer"
              aria-label="Scroll to top"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>

            <button
              onClick={() => { if (theme === "light") toggleTheme(); }}
              className={`rounded-full p-2 transition-colors duration-200 cursor-pointer ${
                theme === "dark"
                  ? "bg-accent text-white"
                  : "text-text-tertiary hover:text-text"
              }`}
              aria-label="Dark theme"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Copyright ─── */}
      <div className="mx-auto mb-20 mt-4 flex flex-col justify-between text-center text-xs">
        <div className="flex flex-row flex-wrap items-center justify-center gap-1 text-text-tertiary">
          <span>&copy;</span>
          <span>{year}</span>
          <span>{t("madeWith")}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mx-0.5 text-accent animate-pulse"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>{t("by")}</span>
          <a
            href="https://github.com/rayanneblima"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-text hover:text-accent transition-colors duration-200"
          >
            Rayanne Bertolace Lima
          </a>
        </div>
      </div>
    </footer>
  );
}
