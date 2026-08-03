import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import GlossaryFlashcards from "@/components/CfaGlossaryFlashcards";
import { FRM_GLOSSARY_TERMS } from "@/lib/frm-glossary-terms";
import { FRM_SUBJECTS } from "@/lib/frm-track";

export const metadata = {
  title: "Bộ Thẻ Thuật Ngữ FRM Song Ngữ En-Vi | TuHocTaiChinh.org",
  description:
    "Thẻ ghi nhớ thuật ngữ FRM Part I và Part II - VaR, Expected Shortfall, CVA, LCR, NSFR, PD/LGD/EAD - kèm định nghĩa tiếng Việt và cái bẫy hay gặp ở từng khái niệm.",
};

// Dùng lại đúng component thẻ của CFA thay vì dựng bản thứ hai: nó nhận bộ
// thẻ, danh sách môn và khoá lưu qua props, nên hai track chia nhau một cách
// vẽ và không thể trôi khỏi nhau.
export default function FrmFlashcardsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link
            href="/frm"
            className="flex items-center justify-center w-9 h-9 rounded-full text-stone-400 dark:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            aria-label="Về trang FRM Track"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Bộ Thẻ Thuật Ngữ FRM</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Part I &amp; Part II - song ngữ Anh - Việt kèm bẫy hay gặp
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
          tipLabel="Bẫy hay gặp"
          allLabel="Tất cả (10 Môn FRM)"
          learnedToastText="✓ Đã đánh dấu thuộc thuật ngữ FRM!"
        />
      </div>
    </div>
  );
}
