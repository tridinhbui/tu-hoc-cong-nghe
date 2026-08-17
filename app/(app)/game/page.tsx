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
    <Suspense fallback={<div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-500">{t.finalTwo.gamePage.loading}</div>}>
      <TechRpgWorldMap />
    </Suspense>
  );
}
