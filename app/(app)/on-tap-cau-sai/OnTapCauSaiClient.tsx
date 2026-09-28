"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Check,
  X,
  ArrowRight,
  PartyPopper,
  Layers,
  List,
  Sparkles,
  ChevronRight,
  BrainCircuit,
  CheckCircle2,
  Calendar,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useAuthGate } from "@/lib/use-auth-gate";
import { getQuizMistakesReviewAction, type QuizMistakeReviewItem } from "./actions";
import { recordQuizMistake } from "@/lib/quiz-mistakes";
import { calculateNextSRS, isDueForReview, type SRSItemState } from "@/lib/spaced-repetition";
import { selectMorningReview } from "@/lib/morning-review";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { Sys, panel, tabClass, btnPrimary, btnSecondary, textLink } from "@/components/ui/system";

/** Mã định vị mono ở đầu trang: chính đường dẫn của route, không phải nhãn dịch. */
const ROUTE_CODE = "THCN://APP/ON-TAP-CAU-SAI";

interface CardAnswerState {
  picked: number | null;
  resolved: boolean;
}

export default function OnTapCauSaiClient() {
  const { t } = useI18n();
  const { userId, checking } = useAuthGate();
  // Set by the deep link in the 7:30 push notification.
  const isMorningSession = useSearchParams().get("phien") === "sang";
  const [items, setItems] = useState<QuizMistakeReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"flashcard" | "list">("flashcard");

  // SRS States stored per user in localStorage
  const [srsMap, setSrsMap] = useState<Record<string, SRSItemState>>({});
  const [cardAnswers, setCardAnswers] = useState<Record<string, CardAnswerState>>({});

  // 3D Flashcard State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  // Bộ thẻ của PHIÊN NÀY: các thẻ tới hạn tại lúc mở trang.
  //
  // Trước đây trang tính `dueItems` rồi chỉ dùng nó làm một con số trong dòng
  // đếm, còn bộ thẻ vẫn duyệt toàn bộ `items`. Nghĩa là bốn nút đánh giá và
  // các thông báo "+7 ngày", "+30 ngày" không xếp lịch cho bất cứ thứ gì:
  // chấm một thẻ "Thành thục" xong tải lại trang thì nó vẫn nằm nguyên trong
  // bộ. Cả phần Spaced Repetition - thứ được in ngay trên trang chủ như một
  // lời hứa - chỉ là trang trí.
  //
  // Chốt bộ thẻ MỘT LẦN chứ không lọc lại theo mỗi lần render: `srsMap` đổi
  // ngay khi người học chấm một thẻ, nên một danh sách lọc trực tiếp sẽ co lại
  // dưới chân con trỏ và thẻ kế tiếp bị nhảy cóc.
  const [deck, setDeck] = useState<QuizMistakeReviewItem[] | null>(null);

  const storageKey = userId ? `thtcdn_srs_states_${userId}` : null;

  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    // Load local SRS map. Kept in a local variable as well as in state
    // because the morning session below needs it to rank items the moment
    // the fetch resolves, and `srsMap` state would still be the previous
    // render's value at that point.
    let loadedSrs: Record<string, SRSItemState> = {};
    if (storageKey) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          loadedSrs = JSON.parse(saved);
          setSrsMap(loadedSrs);
        }
      } catch (e) {
        console.error("Error loading SRS map:", e);
      }
    }

    getQuizMistakesReviewAction(userId)
      .then((data) => {
        // Arriving from the 7:30 push (app/api/cron/morning-review), the
        // point is a bounded ~90-second session, not the full backlog - so
        // trim to ten and interleave across lessons. The plain page keeps
        // showing everything.
        const sessionItems = isMorningSession ? selectMorningReview(data, loadedSrs) : data;
        setItems(sessionItems);
        // Phiên sáng đã được selectMorningReview xếp theo lịch rồi, nên nó đi
        // thẳng vào bộ thẻ; trang thường thì lọc lấy phần tới hạn hôm nay.
        setDeck(
          isMorningSession
            ? sessionItems
            : sessionItems.filter((it) => isDueForReview(loadedSrs[itemKey(it)]?.nextReviewAt))
        );
        setCardAnswers(
          Object.fromEntries(sessionItems.map((it) => [itemKey(it), { picked: null, resolved: false }]))
        );
      })
      .catch((err) => console.error("Error loading quiz mistakes:", err))
      .finally(() => setLoading(false));
  }, [userId, storageKey, isMorningSession]);

  function itemKey(item: QuizMistakeReviewItem) {
    return `${item.lessonId}-${item.questionIndex}`;
  }

  function handlePickAnswer(item: QuizMistakeReviewItem, optionIndex: number) {
    const k = itemKey(item);
    if (cardAnswers[k]?.picked !== null) return;

    const correct = optionIndex === item.correct;
    setCardAnswers((prev) => ({ ...prev, [k]: { picked: optionIndex, resolved: correct } }));
    void recordQuizMistake(item.lessonId, item.questionIndex, correct, item.question);

    // Auto flip card to back side to show explanation
    setIsFlipped(true);
  }

  function handleRateSRS(item: QuizMistakeReviewItem, quality: "forget" | "hard" | "good" | "mastered") {
    const k = itemKey(item);
    const currentSrs = srsMap[k] || { level: 1, intervalDays: 1, nextReviewAt: new Date().toISOString() };
    const newSrs = calculateNextSRS(currentSrs.level, quality);

    const updatedMap = { ...srsMap, [k]: newSrs };
    setSrsMap(updatedMap);

    if (storageKey) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(updatedMap));
      } catch (e) {}
    }

    // Bốn câu này từng nằm thẳng trong file bằng tiếng Việt, trong khi cả
    // phần còn lại của trang đã đi qua từ điển - nên người đọc bản tiếng Anh
    // chấm một thẻ là nhận lại một dòng tiếng Việt.
    const messages = {
      forget: t.mistakeReview.ratedForget,
      hard: t.mistakeReview.ratedHard,
      good: t.mistakeReview.ratedGood,
      mastered: t.mistakeReview.ratedMastered,
    };
    toast.success(messages[quality]);

    // Advance to next flashcard
    setIsFlipped(false);
    if (currentIndex + 1 < (deck?.length ?? items.length)) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setSessionCompleted(true);
    }
  }

  if (checking || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 dark:border-stone-700 dark:border-t-stone-100 rounded-full animate-spin" />
      </div>
    );
  }

  const sessionDeck = deck ?? items;
  const currentCardItem = sessionDeck[currentIndex];

  return (
    <div className="min-h-screen bg-surface font-sans text-ink pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Arriving from the 7:30 push: say why this is a short list, so a
            trimmed session doesn't read as missing mistakes. */}
        {isMorningSession && (
          <div className="mb-6 border-l-2 border-stone-950 pl-4 dark:border-stone-200">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">
              {t.mistakeReview.morningSession}
            </p>
            <p className="text-sm text-ink-body mt-1 max-w-[68ch] leading-7">
              {format(t.mistakeReview.morningSub, { count: items.length })}
              {t.mistakeReview.enoughForToday}{" "}
              <Link href="/on-tap-cau-sai" className="font-bold text-accent-strong underline-offset-4 hover:underline">
                {t.mistakeReview.seeAllMistakes}
              </Link>
            </p>
          </div>
        )}

        {/* Header Title Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 border-b border-line-strong pb-2">
            <Sys className="text-ink-muted">{ROUTE_CODE}</Sys>
            <span className="eyebrow inline-flex items-center gap-1.5 text-right text-ink-soft">
              <BrainCircuit className="w-3.5 h-3.5" /> {t.mistakeReview.srsBadge}
            </span>
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black leading-[1.15] tracking-tight text-ink-max">
            {t.mistakeReview.title}
          </h1>
          <p className="mt-2 max-w-[68ch] text-sm leading-6 text-ink-soft">
            {t.mistakeReview.subtitle}
          </p>

          {/* View Mode Switcher: text tabs */}
          <div role="tablist" className="mt-4 flex items-center gap-5 border-b border-line">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "flashcard"}
              onClick={() => setViewMode("flashcard")}
              className={`${tabClass(viewMode === "flashcard")} inline-flex items-center gap-1.5 cursor-pointer`}
            >
              <Layers className="w-3.5 h-3.5" /> {t.mistakeReview.tabCards}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "list"}
              onClick={() => setViewMode("list")}
              className={`${tabClass(viewMode === "list")} inline-flex items-center gap-1.5 cursor-pointer`}
            >
              <List className="w-3.5 h-3.5" /> {t.mistakeReview.tabList}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-ink-faint">
            {t.mistakeReview.loading}
          </div>
        ) : items.length === 0 ? (
          <div className={`${panel} text-center py-16 px-4 space-y-3`}>
            <PartyPopper className="w-10 h-10 text-ink-muted mx-auto" strokeWidth={1.5} />
            <h3 className="font-black tracking-tight text-lg text-ink-max">{t.mistakeReview.emptyTitle}</h3>
            <p className="text-sm leading-7 text-ink-muted max-w-md mx-auto">
              {t.mistakeReview.emptyBody}
            </p>
            <Link
              href="/dashboard"
              className={`${btnPrimary} mt-2`}
            >
              {t.mistakeReview.backToDashboard} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : viewMode === "flashcard" && sessionDeck.length === 0 ? (
          /* Còn câu sai đang theo dõi, nhưng lịch xếp chúng vào ngày khác.
             Trạng thái này trước đây không tồn tại được: bộ thẻ luôn là toàn
             bộ danh sách nên nó không bao giờ rỗng. Vẫn để một lối đi vòng -
             lịch là gợi ý cho việc học, không phải cái khoá. */
          <div className={`${panel} text-center py-16 px-4 space-y-3`}>
            <Calendar className="w-10 h-10 text-ink-muted mx-auto" strokeWidth={1.5} />
            <h3 className="font-black tracking-tight text-lg text-ink-max">
              {t.mistakeReview.noneDueTitle}
            </h3>
            <p className="text-sm leading-7 text-ink-muted max-w-md mx-auto">
              {format(t.mistakeReview.noneDueBody, { count: items.length })}
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setDeck(items);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                  setSessionCompleted(false);
                }}
                className={`${btnSecondary} cursor-pointer`}
              >
                {t.mistakeReview.reviewAllAnyway}
              </button>
              <Link
                href="/dashboard"
                className={btnPrimary}
              >
                {t.mistakeReview.backToDashboard} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : viewMode === "flashcard" ? (
          /* ── 3D FLASHCARD INTERACTION MODE ── */
          <div className="space-y-4">
            {/* Progress Counter & SRS Stats Bar */}
            <div className="flex items-center justify-between text-xs font-bold text-ink-muted px-1">
              <span className="tabular-nums">
                {format(t.mistakeReview.cardCounter, {
                  current: currentIndex + 1,
                  total: items.length,
                  due: sessionDeck.length,
                })}
              </span>
              <span className="text-accent-strong flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> {t.mistakeReview.algorithmActive}
              </span>
            </div>

            {/* Session Completed View */}
            {sessionCompleted ? (
              <div className="text-center py-12 px-6 bg-stone-950 border border-stone-700 rounded-md text-white space-y-4">
                <div className="flex justify-center">
                  <span className="rounded-sm border border-stone-700 p-2.5 text-stone-300">
                    <PartyPopper aria-hidden className="h-8 w-8" strokeWidth={1.5} />
                  </span>
                </div>
                <h3 className="text-xl font-black tracking-tight text-white">
                  {t.mistakeReview.doneTitle}
                </h3>
                <p className="text-sm text-stone-300 max-w-md mx-auto leading-7">
                  {format(t.mistakeReview.doneBody, { count: items.length })}
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentIndex(0);
                      setIsFlipped(false);
                      setSessionCompleted(false);
                    }}
                    className="inline-flex items-center justify-center rounded-sm border border-stone-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:border-stone-200 cursor-pointer"
                  >
                    {t.mistakeReview.restart}
                  </button>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center rounded-sm bg-white px-4 py-2.5 text-sm font-bold text-stone-950 transition-colors hover:bg-brand-300 cursor-pointer"
                  >
                    {t.mistakeReview.backToDashboardShort}
                  </Link>
                </div>
              </div>
            ) : currentCardItem ? (
              (() => {
                const k = itemKey(currentCardItem);
                const srsInfo = srsMap[k] || { level: 1, intervalDays: 1, nextReviewAt: new Date().toISOString() };
                const answerState = cardAnswers[k] || { picked: null, resolved: false };
                const answered = answerState.picked !== null;

                return (
                  <div className="space-y-4">
                    {/* 3D Flip Card Container */}
                    <div className="relative min-h-[360px] sm:min-h-[400px] w-full perspective-1000">
                      <motion.div
                        className="w-full h-full relative"
                        initial={false}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* ── CARD FRONT (MẶT TRƯỚC: CÂU HỎI & ĐÁP ÁN) ── */}
                        <div
                          className={`absolute inset-0 w-full h-full p-5 sm:p-6 rounded-md border bg-white dark:bg-stone-900 flex flex-col justify-between space-y-4 backface-hidden ${
                            isFlipped ? "pointer-events-none" : ""
                          } ${
                            isDueForReview(srsInfo.nextReviewAt)
                              ? "border-amber-500 dark:border-amber-600"
                              : "border-line-strong"
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                              <Link
                                href={currentCardItem.href}
                                className="text-xs font-bold text-accent-strong underline-offset-4 hover:underline truncate"
                              >
                                {currentCardItem.lessonLabel}: {currentCardItem.lessonTitle}
                              </Link>
                              <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tabular-nums text-warn-ink border border-warn-line-mid shrink-0">
                                {format(t.mistakeReview.srsLevel, { level: srsInfo.level, days: srsInfo.intervalDays })}
                              </span>
                            </div>

                            <p className="font-bold text-base sm:text-lg text-ink-max leading-7">
                              {currentCardItem.question}
                            </p>

                            <div className="space-y-2">
                              {currentCardItem.options.map((opt, oi) => {
                                const isCorrectOpt = oi === currentCardItem.correct;
                                const chosen = answerState.picked === oi;
                                let cls = "border-stone-300 bg-white hover:border-stone-950 text-ink-heading dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-300";
                                let gutter = "text-ink-faint";
                                if (answered) {
                                  if (isCorrectOpt) {
                                    cls = "border-brand-600 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-200 font-bold";
                                    gutter = "text-accent-strong";
                                  } else if (chosen) {
                                    cls = "border-red-600 bg-red-50 text-red-800 dark:border-red-400 dark:bg-red-950/40 dark:text-red-200 font-bold";
                                    gutter = "text-danger";
                                  } else cls = "border-stone-200 text-ink-muted dark:border-stone-800";
                                }
                                return (
                                  <button
                                    key={oi}
                                    disabled={answered}
                                    onClick={() => handlePickAnswer(currentCardItem, oi)}
                                    className={`grid w-full grid-cols-[1.5rem_minmax(0,1fr)_auto] items-baseline gap-x-1 text-left px-3 py-2.5 rounded-sm border text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:cursor-default ${cls}`}
                                  >
                                    <Sys className={gutter}>{String.fromCharCode(65 + oi)}</Sys>
                                    <span>{opt}</span>
                                    {answered && isCorrectOpt && <CheckCircle2 className="w-4 h-4 self-center text-accent-strong shrink-0" />}
                                    {answered && chosen && !isCorrectOpt && <X className="w-4 h-4 self-center text-red-600 dark:text-red-400 shrink-0" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-line flex items-center justify-between gap-3">
                            <span className="text-[11px] font-semibold text-ink-muted">
                              {t.mistakeReview.pickOrFlip}
                            </span>
                            <button
                              type="button"
                              onClick={() => setIsFlipped(true)}
                              className={`${btnPrimary} px-3 py-1.5 text-xs cursor-pointer`}
                            >
                              {t.mistakeReview.flipToExplanation}
                            </button>
                          </div>
                        </div>

                        {/* ── CARD BACK (MẶT SAU: LỜI GIẢI THÍCH & ĐÁNH GIÁ SM-2) ── */}
                        <div
                          className={`absolute inset-0 w-full h-full p-5 sm:p-6 rounded-md border border-stone-700 bg-stone-950 text-white flex flex-col justify-between space-y-4 rotate-y-180 backface-hidden ${
                            !isFlipped ? "pointer-events-none" : ""
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-stone-400">
                                {t.mistakeReview.explanationTitle}
                              </span>
                              <button
                                type="button"
                                onClick={() => setIsFlipped(false)}
                                className="text-[11px] font-bold text-brand-300 underline-offset-4 hover:underline cursor-pointer"
                              >
                                {t.mistakeReview.flipBack}
                              </button>
                            </div>

                            <div className="border-l-2 border-brand-400 pl-4 text-xs font-bold space-y-1">
                              <p className="text-[10px] uppercase font-bold tracking-[0.08em] text-brand-300">
                                {t.mistakeReview.correctAnswer}
                              </p>
                              <p className="text-sm font-bold text-white">
                                {currentCardItem.options[currentCardItem.correct]}
                              </p>
                            </div>

                            <div className="p-3 rounded-sm bg-stone-900 border border-stone-800 text-stone-300 text-sm leading-7 max-h-48 overflow-y-auto">
                              <p className="font-bold text-white mb-1">{t.mistakeReview.financeExplanation}</p>
                              <p>{currentCardItem.explanation || t.mistakeReview.noExplanation}</p>
                            </div>
                          </div>

                          {/* SM-2 Quality Evaluation Rating Buttons */}
                          <div className="space-y-2 pt-2 border-t border-stone-800">
                            <p className="text-[11px] font-bold text-center text-stone-400 uppercase tracking-[0.08em]">
                              {t.mistakeReview.ratePrompt}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              <button
                                type="button"
                                onClick={() => handleRateSRS(currentCardItem, "forget")}
                                className="p-2 rounded-sm border border-red-800 text-red-200 text-xs font-bold transition-colors hover:border-red-400 cursor-pointer text-center"
                              >
                                {t.mistakeReview.rateForgot}
                                <span className="block text-[10px] font-normal tabular-nums opacity-80">{t.mistakeReview.plus1Day}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRateSRS(currentCardItem, "hard")}
                                className="p-2 rounded-sm border border-amber-800 text-amber-200 text-xs font-bold transition-colors hover:border-amber-400 cursor-pointer text-center"
                              >
                                {t.mistakeReview.rateOk}
                                <span className="block text-[10px] font-normal tabular-nums opacity-80">{t.mistakeReview.plus3Days}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRateSRS(currentCardItem, "good")}
                                className="p-2 rounded-sm border border-stone-700 text-stone-100 text-xs font-bold transition-colors hover:border-brand-400 cursor-pointer text-center"
                              >
                                {t.mistakeReview.rateGood}
                                <span className="block text-[10px] font-normal tabular-nums opacity-80">{t.mistakeReview.plus7Days}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRateSRS(currentCardItem, "mastered")}
                                className="p-2 rounded-sm border border-stone-700 text-stone-100 text-xs font-bold transition-colors hover:border-brand-400 cursor-pointer text-center"
                              >
                                {t.mistakeReview.rateEasy}
                                <span className="block text-[10px] font-normal tabular-nums opacity-80">{t.mistakeReview.plus30Days}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Navigation Bar */}
                    <div className="flex items-center justify-between px-1">
                      <button
                        type="button"
                        disabled={currentIndex === 0}
                        onClick={() => {
                          setIsFlipped(false);
                          setCurrentIndex((prev) => Math.max(0, prev - 1));
                        }}
                        className={`${btnSecondary} px-3 py-1.5 text-xs cursor-pointer`}
                      >
                        {t.mistakeReview.prevCard}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsFlipped(false);
                          if (currentIndex + 1 < sessionDeck.length) {
                            setCurrentIndex((prev) => prev + 1);
                          } else {
                            setSessionCompleted(true);
                          }
                        }}
                        className={`${btnPrimary} px-3 py-1.5 text-xs cursor-pointer`}
                      >
                        {t.mistakeReview.nextCard}
                      </button>
                    </div>
                  </div>
                );
              })()
            ) : null}
          </div>
        ) : (
          /* ── CLASSIC LIST VIEW MODE ── */
          <div className="space-y-4">
            <p className="text-xs font-bold tabular-nums text-ink-muted mb-3">
              {format(t.mistakeReview.totalMistakes, { count: items.length })}
            </p>
            <div className="space-y-4">
              {items.map((item) => {
                const k = itemKey(item);
                const state = cardAnswers[k] ?? { picked: null, resolved: false };
                const answered = state.picked !== null;
                const srsInfo = srsMap[k];

                return (
                  <div
                    key={k}
                    className={`bg-white dark:bg-stone-900 rounded-md border p-5 space-y-3 transition-opacity ${
                      state.resolved ? "border-brand-600 opacity-60 dark:border-brand-400" : "border-line-strong"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={item.href}
                        className={`${textLink} text-xs`}
                      >
                        {item.lessonLabel}: {item.lessonTitle}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      {srsInfo && (
                        <span className="text-[11px] font-bold tabular-nums text-warn-strong px-2 py-0.5 rounded-sm border border-warn-line-mid">
                          {format(t.mistakeReview.srsLevelShort, { level: srsInfo.level, days: srsInfo.intervalDays })}
                        </span>
                      )}
                    </div>

                    <p className="font-bold text-ink-max leading-7">{item.question}</p>

                    <div className="space-y-2">
                      {item.options.map((opt, oi) => {
                        const isCorrectOpt = oi === item.correct;
                        const chosen = state.picked === oi;
                        let cls = "border-stone-300 bg-white hover:border-stone-950 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-300";
                        let gutter = "text-ink-faint";
                        if (answered) {
                          if (isCorrectOpt) {
                            cls = "border-brand-600 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/40 font-bold";
                            gutter = "text-accent-strong";
                          } else if (chosen) {
                            cls = "border-red-600 bg-red-50 dark:border-red-400 dark:bg-red-950/40";
                            gutter = "text-danger";
                          } else cls = "border-stone-200 opacity-60 dark:border-stone-800";
                        }
                        return (
                          <button
                            key={oi}
                            disabled={answered}
                            onClick={() => handlePickAnswer(item, oi)}
                            className={`grid w-full grid-cols-[1.5rem_minmax(0,1fr)_auto] items-baseline gap-x-1 text-left text-sm leading-6 rounded-sm border px-3 py-2.5 transition-colors disabled:cursor-default cursor-pointer ${cls}`}
                          >
                            <Sys className={gutter}>{String.fromCharCode(65 + oi)}</Sys>
                            <span className="text-ink-heading">{opt}</span>
                            {answered && isCorrectOpt && <Check className="w-4 h-4 self-center text-accent-strong flex-shrink-0" />}
                            {answered && chosen && !isCorrectOpt && <X className="w-4 h-4 self-center text-red-600 dark:text-red-400 flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {answered && (
                      <div className="space-y-2">
                        <p className={`max-w-[68ch] border-l-2 pl-4 text-sm leading-7 text-ink-body ${state.resolved ? "border-brand-600 dark:border-brand-400" : "border-red-600 dark:border-red-400"}`}>
                          {item.explanation}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-[11px] font-semibold text-ink-muted">{t.mistakeReview.rateSrs}</span>
                          <button
                            type="button"
                            onClick={() => handleRateSRS(item, "forget")}
                            className="px-2 py-1 rounded-sm border border-stone-300 text-[10.5px] font-bold tabular-nums text-ink-body transition-colors hover:border-stone-950 dark:border-stone-700 dark:hover:border-stone-300"
                          >
                            {t.mistakeReview.plus1Day}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRateSRS(item, "good")}
                            className="px-2 py-1 rounded-sm border border-stone-300 text-[10.5px] font-bold tabular-nums text-ink-body transition-colors hover:border-stone-950 dark:border-stone-700 dark:hover:border-stone-300"
                          >
                            {t.mistakeReview.plus7Days}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRateSRS(item, "mastered")}
                            className="px-2 py-1 rounded-sm border border-stone-300 text-[10.5px] font-bold tabular-nums text-ink-body transition-colors hover:border-stone-950 dark:border-stone-700 dark:hover:border-stone-300"
                          >
                            {t.mistakeReview.plus30Days}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
