import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CfaFormulaCheatSheet from "@/components/CfaFormulaCheatSheet";

export const metadata = {
  title: "Sổ Tay Công Thức CFA Level 1 | TuHocTaiChinh.org",
  description:
    "Sổ tay công thức CFA Level 1: thẻ phân số tầng trực quan, giải thích từng biến số và ví dụ tính toán bằng số thực tế cho cả mười môn thi.",
};

export default function CfaFormulasPage() {
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
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Sổ Tay Công Thức CFA Level 1</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Công thức trọng yếu cả mười môn, kèm ví dụ tính bằng số thực tế</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <CfaFormulaCheatSheet />
      </div>
    </div>
  );
}
