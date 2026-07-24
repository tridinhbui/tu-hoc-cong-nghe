import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CfaGlossaryFlashcards from "@/components/CfaGlossaryFlashcards";

export const metadata = {
  title: "Bộ Thẻ Thuật Ngữ CFA Song Ngữ En-Vi | TuHocTaiChinh.org",
  description: "Bộ thẻ Flashcard 3D thuật ngữ tiếng Anh chuyên ngành CFA Level 1 kèm định nghĩa tiếng Việt chuẩn và công thức liên quan.",
};

export default function CfaFlashcardsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link
            href="/cfa"
            className="flex items-center justify-center w-9 h-9 rounded-full text-stone-400 dark:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            aria-label="Về trang CFA Track"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Bộ Thẻ Thuật Ngữ CFA Level 1</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Flashcard Song Ngữ Anh - Việt & Công Thức Liên Quan</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <CfaGlossaryFlashcards />
      </div>
    </div>
  );
}
