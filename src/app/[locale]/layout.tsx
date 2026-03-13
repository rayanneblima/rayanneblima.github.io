import { Space_Grotesk, Outfit, JetBrains_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Spotlight } from "@/components/ui/spotlight";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { SplashScreen } from "@/components/ui/splash-screen";
import { LenisProvider } from "@/components/ui/lenis-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { AnimatedFavicon } from "@/components/ui/animated-favicon";
import "@/app/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const localeMap: Record<string, string> = {
    pt: "pt-BR",
    en: "en-US",
    es: "es-ES",
  };

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    metadataBase: new URL("https://rayanneblima.github.io"),
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        "pt-BR": "/pt/",
        "en-US": "/en/",
        "es-ES": "/es/",
        "x-default": "/pt/",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://rayanneblima.github.io/${locale}/`,
      siteName: "Rayanne Bertolace Lima",
      locale: localeMap[locale] || "pt-BR",
      alternateLocale: Object.values(localeMap).filter((l) => l !== (localeMap[locale] || "pt-BR")),
      type: "website",
      images: [{ url: "/images/og/og-image.png", width: 1200, height: 630, alt: "Rayanne B. Lima — Full Stack Engineer" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/og/og-image.png"],
    },
    authors: [{ name: "Rayanne Bertolace Lima", url: "https://rayanneblima.github.io" }],
    creator: "Rayanne Bertolace Lima",
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const langMap: Record<string, string> = {
    pt: "pt-BR",
    en: "en-US",
    es: "es-ES",
  };

  return (
    <html
      lang={langMap[locale] || locale}
      className={`${spaceGrotesk.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" as="image" href="/images/rayanne-hero.webp" fetchPriority="high" />
        <link rel="icon" href="/images/icons/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/png" href="/images/icons/favicon-32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/images/icons/favicon-16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/images/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#0B0B0F" />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen bg-bg text-text antialiased grain">
        <SplashScreen />
        <CustomCursor />
        <AnimatedFavicon />
        <Spotlight radius={350} brightness={0.06} color="#8B70FF" />
        <ScrollToTop />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <LenisProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </LenisProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
