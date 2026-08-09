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
    void recordQuizMistake(item.lessonId, item.questionIndex, correct);

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
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Arriving from the 7:30 push: say why this is a short list, so a
            trimmed session doesn't read as missing mistakes. */}
        {isMorningSession && (
          <div className="mb-6 rounded-2xl border-2 border-amber-300 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 px-5 py-4">
            <p className="text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-500">
              {t.mistakeReview.morningSession}
            </p>
            <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
              {format(t.mistakeReview.morningSub, { count: items.length })}
              {t.mistakeReview.enoughForToday}{" "}
              <Link href="/on-tap-cau-sai" className="font-bold underline">
                {t.mistakeReview.seeAllMistakes}
              </Link>
            </p>
          </div>
        )}

        {/* Header Title Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                <BrainCircuit className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {t.mistakeReview.srsBadge}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
              {t.mistakeReview.title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              {t.mistakeReview.subtitle}
            </p>
          </div>

          {/* View Mode Switcher Button */}
          <div className="flex items-center gap-1 bg-stone-200 dark:bg-stone-900 p-1 rounded-xl border border-stone-300 dark:border-stone-800 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("flashcard")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                viewMode === "flashcard"
                  ? "bg-white dark:bg-stone-800 text-emerald-600 dark:text-emerald-400 shadow-xs"
                  : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> {t.mistakeReview.tabCards}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-white dark:bg-stone-800 text-emerald-600 dark:text-emerald-400 shadow-xs"
                  : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
              }`}
            >
              <List className="w-3.5 h-3.5" /> {t.mistakeReview.tabList}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-stone-400 dark:text-stone-500">
            {t.mistakeReview.loading}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm space-y-3">
            <PartyPopper className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="font-black text-lg text-stone-900 dark:text-stone-100">{t.mistakeReview.emptyTitle}</h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
              {t.mistakeReview.emptyBody}
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-sm cursor-pointer mt-2"
            >
              {t.mistakeReview.backToDashboard} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : viewMode === "flashcard" && sessionDeck.length === 0 ? (
          /* Còn câu sai đang theo dõi, nhưng lịch xếp chúng vào ngày khác.
             Trạng thái này trước đây không tồn tại được: bộ thẻ luôn là toàn
             bộ danh sách nên nó không bao giờ rỗng. Vẫn để một lối đi vòng -
             lịch là gợi ý cho việc học, không phải cái khoá. */
          <div className="text-center py-16 px-4 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm space-y-3">
            <Calendar className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="font-black text-lg text-stone-900 dark:text-stone-100">
              {t.mistakeReview.noneDueTitle}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
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
                className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-black text-xs hover:bg-stone-200 dark:hover:bg-stone-700 cursor-pointer"
              >
                {t.mistakeReview.reviewAllAnyway}
              </button>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-sm cursor-pointer"
              >
                {t.mistakeReview.backToDashboard} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : viewMode === "flashcard" ? (
          /* ── 3D FLASHCARD INTERACTION MODE ── */
          <div className="space-y-4">
            {/* Progress Counter & SRS Stats Bar */}
            <div className="flex items-center justify-between text-xs font-black text-stone-500 dark:text-stone-400 px-1">
              <span>
                {format(t.mistakeReview.cardCounter, {
                  current: currentIndex + 1,
                  total: items.length,
                  due: sessionDeck.length,
                })}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> {t.mistakeReview.algorithmActive}
              </span>
            </div>

            {/* Session Completed View */}
            {sessionCompleted ? (
              <div className="text-center py-12 px-6 bg-gradient-to-br from-emerald-950 via-stone-900 to-teal-950 border border-emerald-500/40 rounded-3xl text-white space-y-4 shadow-xl">
                <div className="text-5xl">🎁</div>
                <h3 className="text-xl font-black text-stone-100">
                  {t.mistakeReview.doneTitle}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
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
                    className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-900 font-black text-xs hover:bg-white cursor-pointer"
                  >
                    {t.mistakeReview.restart}
                  </button>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs cursor-pointer shadow-md"
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
                          className={`absolute inset-0 w-full h-full p-5 sm:p-6 rounded-3xl border-2 bg-white dark:bg-stone-900 shadow-xl flex flex-col justify-between space-y-4 backface-hidden ${
                            isFlipped ? "pointer-events-none" : ""
                          } ${
                            isDueForReview(srsInfo.nextReviewAt)
                              ? "border-amber-400/80 dark:border-amber-600/80"
                              : "border-stone-200 dark:border-stone-800"
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
                              <Link
                                href={currentCardItem.href}
                                className="text-xs font-black text-emerald-600 dark:text-emerald-400 hover:underline truncate"
                              >
                                {currentCardItem.lessonLabel}: {currentCardItem.lessonTitle}
                              </Link>
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-[10px] font-black uppercase text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shrink-0">
                                {format(t.mistakeReview.srsLevel, { level: srsInfo.level, days: srsInfo.intervalDays })}
                              </span>
                            </div>

                            <p className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-stone-100 leading-snug">
                              {currentCardItem.question}
                            </p>

                            <div className="space-y-2">
                              {currentCardItem.options.map((opt, oi) => {
                                const isCorrectOpt = oi === currentCardItem.correct;
                                const chosen = answerState.picked === oi;
                                let cls = "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 hover:border-emerald-400/60 text-stone-800 dark:text-stone-200";
                                if (answered) {
                                  if (isCorrectOpt) cls = "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-black";
                                  else if (chosen) cls = "border-rose-400 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 font-bold";
                                  else cls = "border-stone-200 dark:border-stone-800 opacity-50";
                                }
                                return (
                                  <button
                                    key={oi}
                                    disabled={answered}
                                    onClick={() => handlePickAnswer(currentCardItem, oi)}
                                    className={`w-full text-left p-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${cls}`}
                                  >
                                    <span>{opt}</span>
                                    {answered && isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                                    {answered && chosen && !isCorrectOpt && <X className="w-4 h-4 text-rose-500 shrink-0" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-stone-400">
                              {t.mistakeReview.pickOrFlip}
                            </span>
                            <button
                              type="button"
                              onClick={() => setIsFlipped(true)}
                              className="px-3 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-black text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                            >
                              {t.mistakeReview.flipToExplanation}
                            </button>
                          </div>
                        </div>

                        {/* ── CARD BACK (MẶT SAU: LỜI GIẢI THÍCH & ĐÁNH GIÁ SM-2) ── */}
                        <div
                          className={`absolute inset-0 w-full h-full p-5 sm:p-6 rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-b from-stone-900 to-stone-950 text-white shadow-2xl flex flex-col justify-between space-y-4 rotate-y-180 backface-hidden ${
                            !isFlipped ? "pointer-events-none" : ""
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-500/40">
                                {t.mistakeReview.explanationTitle}
                              </span>
                              <button
                                type="button"
                                onClick={() => setIsFlipped(false)}
                                className="text-[11px] font-bold text-stone-400 hover:text-white underline cursor-pointer"
                              >
                                {t.mistakeReview.flipBack}
                              </button>
                            </div>

                            <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold space-y-1">
                              <p className="text-[10px] uppercase font-black tracking-widest text-emerald-400">
                                {t.mistakeReview.correctAnswer}
                              </p>
                              <p className="text-sm font-black text-white">
                                {currentCardItem.options[currentCardItem.correct]}
                              </p>
                            </div>

                            <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 text-stone-300 text-xs leading-relaxed max-h-48 overflow-y-auto">
                              <p className="font-bold text-white mb-1">{t.mistakeReview.financeExplanation}</p>
                              <p>{currentCardItem.explanation || t.mistakeReview.noExplanation}</p>
                            </div>
                          </div>

                          {/* SM-2 Quality Evaluation Rating Buttons */}
                          <div className="space-y-2 pt-2 border-t border-stone-800">
                            <p className="text-[11px] font-black text-center text-stone-400 uppercase tracking-widest">
                              {t.mistakeReview.ratePrompt}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              <button
                                type="button"
                                onClick={() => handleRateSRS(currentCardItem, "forget")}
                                className="p-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 text-xs font-black transition-all cursor-pointer text-center"
                              >
                                {t.mistakeReview.rateForgot}
                                <span className="block text-[9px] font-normal opacity-80">{t.mistakeReview.plus1Day}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRateSRS(currentCardItem, "hard")}
                                className="p-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-800 text-amber-200 text-xs font-black transition-all cursor-pointer text-center"
                              >
                                {t.mistakeReview.rateOk}
                                <span className="block text-[9px] font-normal opacity-80">{t.mistakeReview.plus3Days}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRateSRS(currentCardItem, "good")}
                                className="p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-200 text-xs font-black transition-all cursor-pointer text-center"
                              >
                                {t.mistakeReview.rateGood}
                                <span className="block text-[9px] font-normal opacity-80">{t.mistakeReview.plus7Days}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRateSRS(currentCardItem, "mastered")}
                                className="p-2 rounded-xl bg-teal-950/80 hover:bg-teal-900 border border-teal-800 text-teal-200 text-xs font-black transition-all cursor-pointer text-center"
                              >
                                {t.mistakeReview.rateEasy}
                                <span className="block text-[9px] font-normal opacity-80">{t.mistakeReview.plus30Days}</span>
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
                        className="px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-800 text-xs font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-900 disabled:opacity-40 cursor-pointer"
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
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-500 transition-colors cursor-pointer"
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
            <p className="text-xs font-bold text-stone-500 dark:text-stone-400 mb-3">
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
                    className={`bg-white dark:bg-stone-900 rounded-2xl border-2 p-5 space-y-3 transition-opacity ${
                      state.resolved ? "border-emerald-200 dark:border-emerald-900 opacity-60" : "border-stone-200 dark:border-stone-800"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        {item.lessonLabel}: {item.lessonTitle}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      {srsInfo && (
                        <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                          {format(t.mistakeReview.srsLevelShort, { level: srsInfo.level, days: srsInfo.intervalDays })}
                        </span>
                      )}
                    </div>

                    <p className="font-bold text-stone-900 dark:text-stone-100 leading-relaxed">{item.question}</p>

                    <div className="space-y-2">
                      {item.options.map((opt, oi) => {
                        const isCorrectOpt = oi === item.correct;
                        const chosen = state.picked === oi;
                        let cls = "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-stone-300 dark:hover:border-stone-500";
                        if (answered) {
                          if (isCorrectOpt) cls = "border-emerald-400 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 font-black";
                          else if (chosen) cls = "border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/50";
                          else cls = "border-stone-200 dark:border-stone-800 opacity-60";
                        }
                        return (
                          <button
                            key={oi}
                            disabled={answered}
                            onClick={() => handlePickAnswer(item, oi)}
                            className={`w-full text-left text-sm rounded-xl border px-4 py-2.5 transition-colors flex items-start gap-2 disabled:cursor-default cursor-pointer ${cls}`}
                          >
                            {answered && isCorrectOpt && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />}
                            {answered && chosen && !isCorrectOpt && <X className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />}
                            <span className="text-stone-800 dark:text-stone-100">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {answered && (
                      <div className="space-y-2">
                        <p className={`text-xs leading-relaxed rounded-xl p-3 border ${state.resolved ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200" : "bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200"}`}>
                          {item.explanation}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-[11px] font-bold text-stone-400">{t.mistakeReview.rateSrs}</span>
                          <button
                            type="button"
                            onClick={() => handleRateSRS(item, "forget")}
                            className="px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-[10px] font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-200"
                          >
                            {t.mistakeReview.plus1Day}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRateSRS(item, "good")}
                            className="px-2 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200"
                          >
                            {t.mistakeReview.plus7Days}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRateSRS(item, "mastered")}
                            className="px-2 py-1 rounded-lg bg-teal-100 dark:bg-teal-950 text-[10px] font-bold text-teal-700 dark:text-teal-300 hover:bg-teal-200"
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
