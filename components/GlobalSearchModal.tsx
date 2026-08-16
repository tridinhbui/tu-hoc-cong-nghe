"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Calculator, MessageCircle, ArrowRight, X, Sparkles, HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

interface SearchResultItem {
  id: string;
  category: "lesson" | "tool" | "community" | "glossary";
  title: string;
  desc: string;
  url: string;
}

// Stub search-result data - there is already an open task to replace these
// with the real lesson/tool/glossary corpus. Translated in the meantime so
// the English UI doesn't show Vietnamese; id/category/url stay structural.
const SAMPLE_LESSON_URLS: Record<string, string> = {
  "l-1": "/bai-hoc/he-dieu-hanh-lam-gi",
  "l-2": "/dashboard",
  "l-3": "/dashboard",
  "l-4": "/dashboard",
};
const SAMPLE_GLOSSARY_URLS: Record<string, string> = {
  "g-dcf": "/tai-lieu",
  "g-wacc": "/tai-lieu",
  "g-pe": "/tai-lieu",
  "g-roe": "/tai-lieu",
};
// Cả bốn công cụ mẫu từng trỏ vào /cong-cu, route đã gỡ cùng tám máy tính tài
// chính cá nhân của nó. Đây là dữ liệu MẪU cho ô tìm kiếm (xem chú thích đầu
// tệp: sẽ thay bằng kho thật), nên chúng trỏ tạm về thư viện thay vì biến mất -
// nhóm "công cụ" trống trơn trông như ô tìm kiếm hỏng.
const SAMPLE_TOOL_URLS: Record<string, string> = {
  "t-networth": "/tai-lieu",
  "t-budget": "/tai-lieu",
  "t-fire": "/tai-lieu",
  "t-dcf": "/tai-lieu",
};

function sampleLessonsOf(t: Dictionary): SearchResultItem[] {
  return t.dataRest.globalSearchModal.sampleLessons.map((l) => ({
    ...l,
    category: "lesson" as const,
    url: SAMPLE_LESSON_URLS[l.id],
  }));
}

function sampleGlossaryOf(t: Dictionary): SearchResultItem[] {
  return t.dataRest.globalSearchModal.sampleGlossary.map((g) => ({
    ...g,
    category: "glossary" as const,
    url: SAMPLE_GLOSSARY_URLS[g.id],
  }));
}

function sampleToolsOf(t: Dictionary): SearchResultItem[] {
  return t.dataRest.globalSearchModal.sampleTools.map((tool) => ({
    ...tool,
    category: "tool" as const,
    url: SAMPLE_TOOL_URLS[tool.id],
  }));
}

export default function GlobalSearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const sampleLessons = useMemo(() => sampleLessonsOf(t), [t]);
  const sampleGlossary = useMemo(() => sampleGlossaryOf(t), [t]);
  const sampleTools = useMemo(() => sampleToolsOf(t), [t]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from parent or global handler
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }

    const filteredTools = sampleTools.filter((tool) => tool.title.toLowerCase().includes(q) || tool.desc.toLowerCase().includes(q));
    const filteredGlossary = sampleGlossary.filter((g) => g.title.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q));

    const filteredLessons = sampleLessons.filter(
      (l) => l.title.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q)
    );

    setResults([...filteredLessons, ...filteredTools, ...filteredGlossary]);
  }, [query, sampleTools, sampleGlossary, sampleLessons]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-stone-900 shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        >
          {/* Search Input Header */}
          <div className="relative border-b border-stone-100 dark:border-stone-800 p-4">
            <Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.globalSearch.inputPlaceholder}
              autoFocus
              className="w-full bg-transparent pl-9 pr-10 text-base font-bold text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label={t.globalSearch.closeAriaLabel}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
            {query.trim() === "" ? (
              <div className="text-center py-8 text-stone-400 space-y-2">
                <Sparkles className="w-8 h-8 text-emerald-500 mx-auto opacity-70" />
                <p className="text-xs font-bold">{t.globalSearch.emptyPrompt}</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2 text-[11px]">
                  {/* i18n-ignore-start: these are search query seeds, not UI copy - they
                      must match the Vietnamese-only sample data below, so they stay
                      Vietnamese regardless of UI locale (search behaviour is not copy) */}
                  {["DCF", "WACC", "LBO", "P/E", "ROE", "Nợ vay", "Tích sản"].map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setQuery(kw)}
                      className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold hover:bg-stone-200 cursor-pointer"
                    >
                      {kw}
                    </button>
                  ))}
                  {/* i18n-ignore-end */}
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="text-center py-8 text-xs text-stone-400">
                {format(t.globalSearch.noResults, { query })}
              </p>
            ) : (
              <div className="space-y-2">
                {results.map((item: SearchResultItem) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      router.push(item.url);
                    }}
                    className="w-full text-left p-3 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                        {item.category === "lesson" && <BookOpen className="w-4 h-4 text-emerald-500" />}
                        {item.category === "tool" && <Calculator className="w-4 h-4 text-sky-500" />}
                        {item.category === "glossary" && <HelpCircle className="w-4 h-4 text-amber-500" />}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                            {item.category === "lesson"
                              ? t.globalSearch.categoryLesson
                              : item.category === "tool"
                              ? t.globalSearch.categoryTool
                              : t.globalSearch.categoryGlossary}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100 mt-0.5">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">{item.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
