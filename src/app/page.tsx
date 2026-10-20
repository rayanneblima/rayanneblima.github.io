import type { Metadata } from "next";
import messages from "@/i18n/messages/pt.json";
import { SITE_URL, verification } from "@/lib/site";

// A raiz não tem conteúdo próprio: leva para /pt/. No export estático o
// `redirect()` virava uma casca de erro sem <head> útil, então aqui a página
// é estática, com metadados para quem não roda JS (prévia de link, robôs),
// `refresh` no <head> e `location.replace` como reforço.

const { title, description } = messages.metadata;
const target = "/pt/";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: target },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}${target}`,
    siteName: "Rayanne Bertolace Lima",
    locale: "pt-BR",
    type: "website",
    images: [{ url: "/images/og/og-image.png", width: 1200, height: 630, alt: "Rayanne B. Lima — Full Stack Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og/og-image.png"],
  },
  verification,
};

export default function RootPage() {
  return (
    <html lang="pt-BR">
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link rel="icon" href="/images/icons/favicon.ico" sizes="32x32" />
        <meta name="theme-color" content="#0B0B0F" />
        <script dangerouslySetInnerHTML={{ __html: `location.replace('${target}')` }} />
      </head>
      <body style={{ margin: 0, background: "#0B0B0F", color: "#F5F5FF", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "4rem 1.5rem" }}>
          <h1>{title}</h1>
          <p style={{ color: "#9B9BA0" }}>{description}</p>
          <p>
            <a href={target} style={{ color: "#8B70FF" }}>
              Abrir o portfólio
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
