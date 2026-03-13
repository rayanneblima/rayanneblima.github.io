const BASE_URL = "https://rayanneblima.github.io";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Rayanne Bertolace Lima",
  alternateName: "Rayanne B. Lima",
  jobTitle: "Full Stack Engineer",
  description:
    "Full Stack Engineer com mais de 6 anos de experiência em arquitetura frontend, design systems, performance e integração com IA.",
  url: BASE_URL,
  image: `${BASE_URL}/images/og/og-image.png`,
  email: "rayanne_lima2010@hotmail.com",
  telephone: "+55-32-99981-7070",
  gender: "Female",
  nationality: {
    "@type": "Country",
    name: "Brazil",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ubá",
    addressRegion: "MG",
    addressCountry: "BR",
  },
  worksFor: [
    {
      "@type": "Organization",
      name: "Deskbee",
      url: "https://deskbee.io",
    },
    {
      "@type": "Organization",
      name: "Pulsatrix Apps",
      url: "https://pulsatrixapps.com.br",
    },
  ],
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "IFSEMG — Instituto Federal do Sudeste de Minas Gerais",
    },
    {
      "@type": "EducationalOrganization",
      name: "DOCTUM — Rede de Ensino Doctum",
    },
  ],
  knowsAbout: [
    "Frontend Architecture",
    "Vue.js",
    "Next.js",
    "TypeScript",
    "Design Systems",
    "Accessibility",
    "Performance Optimization",
    "AI Integration",
    "Laravel",
    "Supabase",
    "Nuxt.js",
    "Tailwind CSS",
  ],
  sameAs: [
    "https://linkedin.com/in/rayanneblima",
    "https://github.com/rayanneblima",
    "https://pulsatrixapps.com.br",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Pulsatrix Apps",
  url: "https://pulsatrixapps.com.br",
  founder: {
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Rayanne Bertolace Lima",
  },
  foundingDate: "2018",
  description:
    "Digital solutions company delivering enterprise-quality web applications for startups and growing businesses.",
  areaServed: {
    "@type": "Country",
    name: "Brazil",
  },
  sameAs: [
    "https://pulsatrixapps.com.br",
    "https://github.com/pulsatrixapps",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Rayanne B. Lima — Full Stack Engineer",
  url: BASE_URL,
  inLanguage: ["pt-BR", "en-US", "es-ES"],
  author: {
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
  },
  publisher: {
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
  },
};

const webPageSchema = (locale: string, inLanguage: string) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${BASE_URL}/${locale}/#webpage`,
  url: `${BASE_URL}/${locale}/`,
  name: "Rayanne B. Lima — Full Stack Engineer",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
  },
  mainEntity: {
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
  },
  about: {
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
  },
  inLanguage,
  datePublished: "2025-01-01",
  dateModified: "2026-03-12",
});

export function JsonLd({ locale }: { locale: string }) {
  const localeMap: Record<string, string> = {
    pt: "pt-BR",
    en: "en-US",
    es: "es-ES",
  };

  const inLanguage = localeMap[locale] || "pt-BR";

  const schemas = [
    personSchema,
    organizationSchema,
    { ...websiteSchema, inLanguage },
    webPageSchema(locale, inLanguage),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
