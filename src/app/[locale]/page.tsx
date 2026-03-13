import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Positioning } from "@/components/sections/positioning";
import { CoreExpertise } from "@/components/sections/core-expertise";
import { SelectedWork } from "@/components/sections/selected-work";
import { Metrics } from "@/components/sections/metrics";
import { Process } from "@/components/sections/process";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/shared/json-ld";

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
      <Metrics />
      <Process />
      <FinalCta />
    </>
  );
}
