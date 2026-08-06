import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";
import { ChevronLeft } from "lucide-react";
import CfaGlossaryFlashcards from "@/components/CfaGlossaryFlashcards";

export async function generateMetadata() {
  const t = getDictionary(await getServerLocale());
  return {
    title: t.certPages.flashcardsMetaTitle,
    description: t.certPages.flashcardsMetaDesc,
  };
}

export default async function CfaFlashcardsPage() {
  const t = getDictionary(await getServerLocale());
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link
            href="/cfa"
            className="flex items-center justify-center w-9 h-9 rounded-full text-stone-400 dark:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            aria-label={t.certPages.backToCfa}
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">{t.certPages.flashcardsTitle}</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{t.certPages.flashcardsSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <CfaGlossaryFlashcards />
      </div>
    </div>
  );
}
