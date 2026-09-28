"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Calculator, MessageCircle, ArrowRight, X, HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import { panel } from "@/components/ui/system";

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
  "g-idempotency": "/tai-lieu",
  "g-slo": "/tai-lieu",
  "g-p99": "/tai-lieu",
  "g-cache-hit": "/tai-lieu",
};
// Dữ liệu MẪU cho ô tìm kiếm (xem chú thích đầu tệp: sẽ thay bằng kho thật),
// nên các công cụ mẫu trỏ tạm về thư viện - nhóm "công cụ" trống trơn trông
// như ô tìm kiếm hỏng.
const SAMPLE_TOOL_URLS: Record<string, string> = {
  "t-big-o": "/tai-lieu",
  "t-capacity": "/tai-lieu",
  "t-infra-budget": "/tai-lieu",
  "t-latency": "/tai-lieu",
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
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-950/60 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className={`${panel} relative w-full max-w-2xl overflow-hidden`}
        >
          {/* Search Input Header */}
          <div className="relative border-b border-line-strong p-4">
            <Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.globalSearch.inputPlaceholder}
              autoFocus
              className="w-full bg-transparent pl-9 pr-10 text-base font-bold text-ink placeholder:text-ink-faint focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label={t.globalSearch.closeAriaLabel}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-sm text-ink-faint hover:bg-surface-raised hover:text-ink cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
            {query.trim() === "" ? (
              <div className="text-center py-8 text-ink-muted space-y-2">
                <p className="text-xs font-bold">{t.globalSearch.emptyPrompt}</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2 text-[11px]">
                  {/* i18n-ignore-start: these are search query seeds, not UI copy - they
                      are technical terms that read the same in both locales */}
                  {["Git", "API", "Big-O", "SLO", "p99", "Idempotency", "Cache"].map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setQuery(kw)}
                      className="px-2.5 py-1 rounded-sm border border-line-strong font-mono text-ink-soft hover:border-stone-950 hover:text-ink dark:hover:border-stone-200 cursor-pointer"
                    >
                      {kw}
                    </button>
                  ))}
                  {/* i18n-ignore-end */}
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="text-center py-8 text-xs text-ink-muted">
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
                    className="w-full text-left p-3 rounded-sm border border-line-strong hover:border-stone-950 dark:hover:border-stone-300 transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-line-strong text-ink-soft">
                        {item.category === "lesson" && <BookOpen className="w-4 h-4" />}
                        {item.category === "tool" && <Calculator className="w-4 h-4" />}
                        {item.category === "glossary" && <HelpCircle className="w-4 h-4" />}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="eyebrow text-ink-faint">
                            {item.category === "lesson"
                              ? t.globalSearch.categoryLesson
                              : item.category === "tool"
                              ? t.globalSearch.categoryTool
                              : t.globalSearch.categoryGlossary}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-ink mt-0.5">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-ink-muted line-clamp-1">{item.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-accent transition-colors shrink-0" />
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
