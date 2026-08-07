"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Volume2,
  Bookmark,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Zap,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { CFA_GLOSSARY_TERMS, type CfaGlossaryTerm } from "@/lib/cfa-glossary-terms";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";
import FormulaBlock from "@/components/FormulaBlock";

/** Kênh báo khi danh sách thẻ đã thuộc đổi trong cùng tab. */
const LEARNED_CHANGED_EVENT = "thtcdn:cfa-glossary-learned";
import { useLocalStorageValue, writeLocalStorageValue } from "@/lib/use-local-storage-value";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

/**
 * Dùng chung cho cả CFA và FRM. Mặc định là CFA để mọi chỗ gọi cũ
 * (`<CfaGlossaryFlashcards />`) giữ nguyên hành vi; FRM truyền bộ thẻ và danh
 * sách môn của mình vào. Nhân đôi 300 dòng này cho track thứ hai thì hai bản
 * sẽ trôi khỏi nhau ngay ở lần sửa đầu tiên - đúng như hai dropdown avatar
 * từng trôi khỏi nhau trước khi AppNavbar gộp chúng lại.
 */
/**
 * Hình dạng chung của một thẻ. `subjectId` để là string thay vì union của
 * từng track: component chỉ in nó ra và so bằng, nên siết thành union sẽ khoá
 * component vào một track mà không đổi lại được gì.
 */
export interface GlossaryTerm {
  id: string;
  termEn: string;
  termVi: string;
  subjectId: string;
  definitionVi: string;
  definitionEn?: string;
  formula?: { equation?: string; numerator?: string; denominator?: string; multiplier?: string };
  example?: string;
  cfaTip?: string;
  frmTip?: string;
}

export interface GlossaryDeckProps {
  terms?: readonly GlossaryTerm[];
  /** `weight` hiện trên chip lọc; cả CFA lẫn FRM đều công bố trọng số môn. */
  subjects?: readonly { id: string; name: string; weight: string }[];
  /** Khoá localStorage riêng cho từng bộ, để tiến độ hai track không đè nhau. */
  storageKey?: string;
  /** Nhãn in trên mặt thẻ, ví dụ "CFA TERM" hay "FRM TERM". */
  badgeLabel?: string;
  /** Nhãn trước phần mẹo, vì mỗi kỳ thi gọi tên kỳ thi của mình. */
  tipLabel?: string;
  allLabel?: string;
  learnedToastText?: string;
}

export default function CfaGlossaryFlashcards({
  terms = CFA_GLOSSARY_TERMS,
  subjects = CFA_LEVEL_1_SUBJECTS,
  storageKey = "cfa_glossary_learned",
  badgeLabel,
  tipLabel,
  allLabel,
  learnedToastText,
}: GlossaryDeckProps = {}) {
  const { t } = useI18n();
  const resolvedBadgeLabel = badgeLabel ?? t.cfaGlossary.badgeLabel;
  const resolvedTipLabel = tipLabel ?? t.cfaGlossary.tipLabel;
  const resolvedAllLabel = allLabel ?? t.cfaGlossary.allLabel;
  const resolvedLearnedToastText = learnedToastText ?? t.cfaGlossary.learnedToastText;
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  // Danh sách thẻ đã thuộc sống trong localStorage; đọc thẳng từ đó thay vì
  // chép sang state trong một effect lúc mount - bản cũ vẽ một khung hình
  // "chưa thuộc thẻ nào" trước khi effect kịp chạy.
  const learnedRaw = useLocalStorageValue(storageKey, LEARNED_CHANGED_EVENT);
  const learnedIds = useMemo<string[]>(() => {
    if (!learnedRaw) return [];
    try {
      const parsed = JSON.parse(learnedRaw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [learnedRaw]);

  const filteredTerms = terms.filter((term) => {
    const matchesSubject = selectedSubject === "all" || term.subjectId === selectedSubject;
    const matchesSearch =
      term.termEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.termVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definitionVi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const currentTerm: GlossaryTerm | undefined = filteredTerms[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (filteredTerms.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % filteredTerms.length);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (filteredTerms.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + filteredTerms.length) % filteredTerms.length);
    }
  };

  const toggleLearned = (id: string) => {
    const next = learnedIds.includes(id) ? learnedIds.filter((item: string) => item !== id) : [...learnedIds, id];
    writeLocalStorageValue(storageKey, JSON.stringify(next), LEARNED_CHANGED_EVENT);
    if (!learnedIds.includes(id)) {
      toast.success(resolvedLearnedToastText);
    }
  };

  const handlePronounce = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      toast.info(t.cfaGlossary.pronounceUnsupported);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/40">
              {t.cfaGlossary.topBadge}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/40">
              {format(t.cfaGlossary.learnedCount, { done: learnedIds.length, total: terms.length })}
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-2">{t.cfaGlossary.heading}</h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
            {t.cfaGlossary.subheading}
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder={t.cfaGlossary.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 text-sm font-semibold focus:outline-none focus:border-amber-500 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
          <button
            onClick={() => {
              setSelectedSubject("all");
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              selectedSubject === "all"
                ? "bg-amber-500 text-white shadow-md"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
            }`}
          >
            {resolvedAllLabel}
          </button>

          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedSubject(s.id);
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                selectedSubject === s.id
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
              }`}
            >
              {s.name} ({s.weight})
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive 3D Flip Card Container */}
      {filteredTerms.length > 0 && currentTerm ? (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs font-extrabold text-stone-500">
            <span>
              {format(t.cfaGlossary.cardCounter, { current: currentIndex + 1, total: filteredTerms.length })}
            </span>
            <span>{t.cfaGlossary.tapToFlip}</span>
          </div>

          <div
            className="perspective-1000 min-h-[380px] cursor-pointer select-none"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              className="w-full h-full relative duration-500 transform-style-3d"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* FRONT SIDE (English Term & Audio) */}
              <div
                className={`w-full min-h-[380px] p-8 rounded-3xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-xl flex flex-col justify-between backface-hidden ${
                  isFlipped ? "hidden" : "block"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300">
                    {resolvedBadgeLabel} • {currentTerm.subjectId.toUpperCase()}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePronounce(currentTerm.termEn);
                    }}
                    className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 text-stone-600 dark:text-stone-300 transition-colors"
                    title={t.cfaGlossary.pronounceTitle}
                  >
                    <Volume2 className="w-5 h-5 text-amber-600" />
                  </button>
                </div>

                <div className="my-8 text-center space-y-3">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
                    {currentTerm.termEn}
                  </h3>
                  <p className="text-base font-bold text-amber-600 dark:text-amber-400">
                    {currentTerm.termVi}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-400 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <span>{t.cfaGlossary.tapToFlipBack}</span>
                  <span className="font-bold text-amber-500">{t.cfaGlossary.seeDefinitionCta}</span>
                </div>
              </div>

              {/* BACK SIDE (Vietnamese Definition & Formula) */}
              <div
                className={`w-full min-h-[380px] p-8 rounded-3xl border-2 border-stone-900 dark:border-stone-700 bg-stone-900 text-white shadow-xl flex flex-col justify-between [transform:rotateY(180deg)] backface-hidden ${
                  isFlipped ? "block" : "hidden"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {t.cfaGlossary.definitionBadge}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLearned(currentTerm.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      learnedIds.includes(currentTerm.id)
                        ? "bg-emerald-500 text-white"
                        : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{learnedIds.includes(currentTerm.id) ? t.cfaGlossary.markedLearned : t.cfaGlossary.markLearned}</span>
                  </button>
                </div>

                <div className="my-4 space-y-4">
                  <p className="text-base sm:text-lg leading-relaxed text-stone-200 font-medium">
                    {currentTerm.definitionVi}
                  </p>

                  {currentTerm.formula && (
                    <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 text-xs">
                      <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1.5">
                        {t.cfaGlossary.formulaLabel}
                      </p>
                      {currentTerm.formula.numerator && currentTerm.formula.denominator ? (
                        <div className="flex items-center justify-center gap-2 text-sm font-serif font-bold text-amber-200">
                          <div className="flex flex-col items-center">
                            <span className="border-b border-amber-400 px-2">{currentTerm.formula.numerator}</span>
                            <span className="px-2">{currentTerm.formula.denominator}</span>
                          </div>
                          {currentTerm.formula.multiplier && (
                            <span>× {currentTerm.formula.multiplier}</span>
                          )}
                        </div>
                      ) : (
                        <p className="font-mono text-amber-300 font-bold">{currentTerm.formula.equation}</p>
                      )}
                    </div>
                  )}

                  {(currentTerm.cfaTip ?? currentTerm.frmTip) && (
                    <p className="text-xs text-amber-300 bg-amber-950/60 p-3 rounded-xl border border-amber-500/30">
                      💡 <strong>{resolvedTipLabel}:</strong> {currentTerm.cfaTip ?? currentTerm.frmTip}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-stone-400 pt-4 border-t border-stone-800">
                  <span>{t.cfaGlossary.tapToFlipFront}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Navigation Controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={handlePrev}
              className="px-5 py-3 rounded-2xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 font-extrabold text-sm hover:bg-stone-50 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t.cfaGlossary.prevCard}</span>
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>{t.cfaGlossary.nextCard}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-stone-500">
          {t.cfaGlossary.noResults}
        </div>
      )}
    </div>
  );
}
