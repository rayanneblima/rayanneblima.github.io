import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://rayanneblima.github.io";
const locales = ["pt", "en", "es"];

export default function sitemap(): MetadataRoute.Sitemap {
  // Data do build: o deploy roda a cada push na main, então acompanha a última publicação.
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: locale === "pt" ? 1.0 : 0.8,
    alternates: {
      languages: {
        "pt-BR": `${BASE_URL}/pt/`,
        "en-US": `${BASE_URL}/en/`,
        "es-ES": `${BASE_URL}/es/`,
        "x-default": `${BASE_URL}/pt/`,
      },
    },
  }));
}
