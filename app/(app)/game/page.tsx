import { Suspense } from "react";
import type { Metadata } from "next";
import TechRpgWorldMap from "@/components/TechRpgWorldMap";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return {
    title: t.finalTwo.gamePage.metaTitle,
    description: t.finalTwo.gamePage.metaDescription,
  };
}

export default async function GamePage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#fbfaf7] text-sm text-ink-muted dark:bg-stone-950">{t.finalTwo.gamePage.loading}</div>}>
      <TechRpgWorldMap />
    </Suspense>
  );
}
