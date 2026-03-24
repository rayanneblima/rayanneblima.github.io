import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { JsonLd } from "@/components/shared/json-ld";

/* Below-fold sections — lazy-loaded to reduce initial JS parse/execution */
const Positioning = dynamic(() => import("@/components/sections/positioning").then(m => ({ default: m.Positioning })));
const CoreExpertise = dynamic(() => import("@/components/sections/core-expertise").then(m => ({ default: m.CoreExpertise })));
const SelectedWork = dynamic(() => import("@/components/sections/selected-work").then(m => ({ default: m.SelectedWork })));
const Metrics = dynamic(() => import("@/components/sections/metrics").then(m => ({ default: m.Metrics })));
const Process = dynamic(() => import("@/components/sections/process").then(m => ({ default: m.Process })));
const LogoCloud = dynamic(() => import("@/components/sections/logo-cloud").then(m => ({ default: m.LogoCloud })));
const Talks = dynamic(() => import("@/components/sections/talks").then(m => ({ default: m.Talks })));
const FinalCta = dynamic(() => import("@/components/sections/final-cta").then(m => ({ default: m.FinalCta })));

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <JsonLd locale={locale} />
      <Hero />
      <Positioning />
      <CoreExpertise />
      <SelectedWork />
      <LogoCloud />
      <Metrics />
      <Process />
      <Talks />
      <FinalCta />
    </>
  );
}
