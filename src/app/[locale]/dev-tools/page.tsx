import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { DevToolsPage } from "@/components/dev-tools/dev-tools-page";

export default function DevTools({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <DevToolsPage />;
}
