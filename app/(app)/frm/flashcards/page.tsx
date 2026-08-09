import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";
import { ChevronLeft } from "lucide-react";
import GlossaryFlashcards from "@/components/CfaGlossaryFlashcards";
import { FRM_GLOSSARY_TERMS } from "@/lib/frm-glossary-terms";
import { FRM_SUBJECTS } from "@/lib/frm-track";

export async function generateMetadata() {
  const t = getDictionary(await getServerLocale());
  return {
    title: t.certPages.frmFlashcardsMetaTitle,
    description: t.certPages.frmFlashcardsMetaDesc,
  };
}

// Dùng lại đúng component thẻ của CFA thay vì dựng bản thứ hai: nó nhận bộ
// thẻ, danh sách môn và khoá lưu qua props, nên hai track chia nhau một cách
// vẽ và không thể trôi khỏi nhau.
export default async function FrmFlashcardsPage() {
  const t = getDictionary(await getServerLocale());
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link
            href="/frm"
            className="flex items-center justify-center w-9 h-9 rounded-full text-stone-400 dark:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            aria-label={t.certPages.backToFrm}
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">{t.certPages.frmFlashcardsTitle}</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {t.certPages.frmFlashcardsSubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <GlossaryFlashcards
          terms={FRM_GLOSSARY_TERMS}
          subjects={FRM_SUBJECTS}
          storageKey="frm_glossary_learned"
          badgeLabel="FRM TERM"
          tipLabel={t.certPages.frmTipLabel}
          allLabel={t.certPages.frmAllLabel}
          learnedToastText={t.certPages.frmLearnedToast}
        />
      </div>
    </div>
  );
}
