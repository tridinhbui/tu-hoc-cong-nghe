"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Printer, Bookmark, Sparkles, Filter, Calculator } from "lucide-react";
import { toast } from "sonner";
import { CFA_FORMULAS_DATA, type CfaFormulaItem } from "@/lib/cfa-formulas-data";
import { mergeFormulas } from "@/lib/cfa-formulas-i18n";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";
import FormulaBlock from "@/components/FormulaBlock";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

export default function CfaFormulaCheatSheet() {
  const { t, locale } = useI18n();
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Hợp nhất TRƯỚC khi lọc, không phải lúc vẽ - cùng lý do đã ghi ở
  // FrmFormulaCheatSheet: ô tìm kiếm so khớp `item.title` và `variables[].name`,
  // nên nếu chỉ dịch ở bước vẽ thì người đọc tiếng Anh gõ "Sharpe" vẫn phải
  // trúng chữ tiếng Việt mới ra kết quả.
  const localized = useMemo(() => mergeFormulas(CFA_FORMULAS_DATA, locale), [locale]);

  const filteredFormulas = localized.filter((item) => {
    const matchesSubject = selectedSubject === "all" || item.subjectId === selectedSubject;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.equation && item.equation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.variables && item.variables.some((v) => v.name.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesSubject && matchesSearch;
  });

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/40">
              {t.cfaFormulas.badge}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest bg-stone-800 text-stone-300 px-2.5 py-1 rounded-full border border-stone-700">
              {format(t.cfaFormulas.countBadge, { count: CFA_FORMULAS_DATA.length })}
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-2">{t.cfaFormulas.title}</h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
            {t.cfaFormulas.subtitle}
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 font-extrabold text-xs text-white transition-all shadow-md self-start sm:self-auto cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>{t.cfaFormulas.printCta}</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder={t.cfaFormulas.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 text-sm font-semibold focus:outline-none focus:border-amber-500 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
          <button
            onClick={() => setSelectedSubject("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              selectedSubject === "all"
                ? "bg-amber-500 text-white shadow-md"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
            }`}
          >
            {t.cfaFormulas.allSubjects}
          </button>

          {CFA_LEVEL_1_SUBJECTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                selectedSubject === s.id
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
              }`}
            >
              {format(t.cfaFormulas.subjectOption, { name: s.name, weight: s.weight })}
            </button>
          ))}
        </div>
      </div>

      {/* Render Formula Cards */}
      {filteredFormulas.length > 0 ? (
        <div className="space-y-6">
          {filteredFormulas.map((item) => (
            <FormulaBlock
              key={item.id}
              title={item.title}
              label={item.badge || t.cfaFormulas.defaultBadge}
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
        <div className="text-center py-12 text-stone-500">
          {t.cfaFormulas.noResults}
        </div>
      )}
    </div>
  );
}
