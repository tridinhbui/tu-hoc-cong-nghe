import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";
import { ChevronLeft } from "lucide-react";
import FrmFormulaCheatSheet from "@/components/FrmFormulaCheatSheet";

export async function generateMetadata() {
  const t = getDictionary(await getServerLocale());
  return {
    title: t.certPages.frmFormulasMetaTitle,
    description: t.certPages.frmFormulasMetaDesc,
  };
}

export default async function FrmFormulasPage() {
  const t = getDictionary(await getServerLocale());
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-6 py-4">
          <Link
            href="/frm"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:text-stone-500 dark:hover:bg-stone-800 dark:hover:text-stone-200"
            aria-label={t.certPages.backToFrmTrack}
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {t.certPages.frmFormulasTitle}
            </h1>
            <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
              {t.certPages.frmFormulasSubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <FrmFormulaCheatSheet />
      </div>
    </div>
  );
}
