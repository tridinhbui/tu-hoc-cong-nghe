"use client";

import { useState } from "react";
import { Printer, Search } from "lucide-react";
import { FRM_FORMULAS_DATA } from "@/lib/frm-formulas-data";
import { FRM_SUBJECTS } from "@/lib/frm-track";
import FormulaBlock from "@/components/FormulaBlock";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

// Sổ tay công thức FRM. Cùng khuôn với CfaFormulaCheatSheet, khác một điểm có
// chủ ý: nút lọc lấy `s.id` thẳng từ FRM_SUBJECTS và dữ liệu cũng dùng đúng
// các id đó. Sổ tay CFA từng để hai bên trôi khỏi nhau - dữ liệu ghi
// "fixed-income" trong khi nút lọc gửi "fixedIncome" - nên ba nhóm công thức
// không nút nào chọn ra được và bốn nút luôn cho kết quả rỗng, mà trang thì
// vẫn trông như đang chạy. Đây là lý do lib/__tests__/frm-formulas.test.ts đối
// chiếu thẳng với FRM_SUBJECTS thay vì với một danh sách tự khai.

export default function FrmFormulaCheatSheet() {
  const { t } = useI18n();
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filtered = FRM_FORMULAS_DATA.filter((item) => {
    const matchesSubject = selectedSubject === "all" || item.subjectId === selectedSubject;
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      (item.equation?.toLowerCase().includes(query) ?? false) ||
      (item.variables?.some((v) => v.name.toLowerCase().includes(query)) ?? false);
    return matchesSubject && matchesSearch;
  });

  const countFor = (subjectId: string) =>
    FRM_FORMULAS_DATA.filter((f) => f.subjectId === subjectId).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-red-950 p-6 text-white shadow-xl sm:flex-row sm:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-red-500/40 bg-red-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-300">
              {t.frmFormulas.badge}
            </span>
            <span className="rounded-full border border-stone-700 bg-stone-800 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-stone-300">
              {format(t.frmFormulas.countBadge, { count: FRM_FORMULAS_DATA.length })}
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-black text-white">{t.frmFormulas.title}</h2>
          <p className="mt-1 max-w-xl text-xs text-stone-300 sm:text-sm">
            {t.frmFormulas.subtitle}
          </p>
        </div>

        <button
          onClick={() => typeof window !== "undefined" && window.print()}
          className="flex cursor-pointer items-center gap-2 self-start rounded-xl bg-red-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-md transition-all hover:bg-red-700 sm:self-auto"
        >
          <Printer className="h-4 w-4" />
          <span>{t.frmFormulas.printCta}</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder={t.frmFormulas.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border-2 border-stone-200 bg-white py-3 pl-11 pr-4 text-sm font-semibold shadow-sm focus:border-red-500 focus:outline-none dark:border-stone-800 dark:bg-stone-900"
          />
        </div>

        {/* Chỉ hiện nút cho môn thật sự có công thức: một nút luôn trả về rỗng
            trông y hệt một bộ lọc hỏng. */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedSubject("all")}
            className={`cursor-pointer whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-all ${
              selectedSubject === "all"
                ? "bg-red-600 text-white shadow-md"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"
            }`}
          >
            {format(t.frmFormulas.allSubjects, { count: FRM_FORMULAS_DATA.length })}
          </button>

          {FRM_SUBJECTS.filter((s) => countFor(s.id) > 0).map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              className={`cursor-pointer whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-all ${
                selectedSubject === s.id
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"
              }`}
            >
              {format(t.frmFormulas.subjectOption, { name: s.name, count: countFor(s.id) })}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-6">
          {filtered.map((item) => (
            <FormulaBlock
              key={item.id}
              title={item.title}
              label={item.badge || t.frmFormulas.defaultBadge}
              numerator={item.numerator}
              denominator={item.denominator}
              multiplier={item.multiplier}
              equation={item.equation}
              variables={item.variables}
              example={item.example}
            />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-sm text-stone-500 dark:text-stone-400">
          {t.frmFormulas.noResults}
        </p>
      )}
    </div>
  );
}
