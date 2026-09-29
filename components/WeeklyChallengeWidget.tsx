"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Trophy, Sparkles, CheckCircle2, XCircle, ArrowRight, BookOpen, Flame, Award, Building2, ChevronRight, Zap, Target, Timer, BarChart3 } from "lucide-react";
import { REAL_CASE_STUDIES, type CaseStudyItem, type CaseStudyQuestion } from "@/lib/case-studies-data";
import { createClient } from "@/lib/cloudflare";
import { recalculateUserStats } from "@/lib/cloudflare-user";
import GoldCoinIcon from "@/components/GoldCoinIcon";
import { recordCustomGameSession } from "@/lib/games";
import ModeLeaderboard from "@/components/games/ModeLeaderboard";
import { useI18n } from "@/lib/i18n/context";
import { mergeCaseStudies } from "@/lib/case-studies-i18n";
import { format } from "@/lib/i18n";
import { btnPrimary, btnSecondary, tabClass, Sys } from "@/components/ui/system";

/* i18n-ignore-start: định danh hệ thống, không phải chữ hiển thị */
const SYS = {
  cases: "THCN://GAME/CASE-ARENA",
};
/* i18n-ignore-end */

export default function WeeklyChallengeWidget({ userId }: { userId: string }) {
  const { t, locale } = useI18n();
  // Nội dung case nằm ngoài từ điển UI - xem lib/case-studies-i18n.
  const cases = useMemo(() => mergeCaseStudies(REAL_CASE_STUDIES, locale), [locale]);
  // State giữ ID chứ không giữ bản ghi: giữ bản ghi thì nó là ảnh chụp mảng
  // tiếng Việt lúc mount, và đổi ngôn ngữ sẽ không đổi case đang mở.
  const [activeCaseId, setActiveCaseId] = useState<string>(REAL_CASE_STUDIES[0].id);
  const activeCase = cases.find((c) => c.id === activeCaseId) ?? cases[0];

  const [gameState, setGameState] = useState<"briefing" | "playing" | "summary">("briefing");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answeredMap, setAnsweredMap] = useState<Record<number, { selected: number; isCorrect: boolean }>>({});
  
  // Scoring & Combo States
  const [score, setScore] = useState(0);
  const [streakCombo, setStreakCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [rewardEarned, setRewardEarned] = useState<{ xp: number; coins: number } | null>(null);

  const currentQ: CaseStudyQuestion | undefined = activeCase.questions[currentQIndex];
  const remainingQuestions = Math.max(activeCase.questions.length - currentQIndex - (selectedOpt !== null ? 1 : 0), 0);
  const progressPct = ((currentQIndex + 1) / activeCase.questions.length) * 100;

  function startCaseStudyGame(caseId: string) {
    setActiveCaseId(caseId);
    setGameState("playing");
    setCurrentQIndex(0);
    setSelectedOpt(null);
    setAnsweredMap({});
    setScore(0);
    setStreakCombo(0);
    setMaxCombo(0);
    setRewardEarned(null);
  }

  function handleSelectOption(optIdx: number) {
    if (selectedOpt !== null || !currentQ) return;
    setSelectedOpt(optIdx);

    const isCorrect = optIdx === currentQ.correct;
    let addedScore = 0;

    if (isCorrect) {
      const nextCombo = streakCombo + 1;
      setStreakCombo(nextCombo);
      if (nextCombo > maxCombo) setMaxCombo(nextCombo);

      // Multiplier: 1 + (combo * 0.25)
      const multiplier = 1 + Math.min(nextCombo - 1, 4) * 0.25;
      addedScore = Math.round(200 * multiplier);
      setScore((s) => s + addedScore);
      toast.success(format(t.caseArena.correctToast, { score: addedScore, multiplier: multiplier.toFixed(1) }));
    } else {
      setStreakCombo(0);
      toast.error(t.caseArena.wrongToast);
    }

    setAnsweredMap((prev) => ({
      ...prev,
      [currentQIndex]: { selected: optIdx, isCorrect },
    }));
  }

  function handleNextQuestion() {
    if (currentQIndex + 1 < activeCase.questions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOpt(null);
    } else {
      finishGame();
    }
  }

  async function finishGame() {
    setGameState("summary");
    const totalCorrect = Object.values(answeredMap).filter((v) => v.isCorrect).length;
    const totalQ = activeCase.questions.length;
    const ratio = totalCorrect / totalQ;

    let xp = 0;
    let coins = 0;
    if (ratio >= 0.6) {
      xp = Math.min(50, Math.round(activeCase.xpReward * (ratio >= 0.9 ? 1.25 : 1.0)));
      coins = Math.round(activeCase.coinReward * (ratio >= 0.9 ? 1.25 : 1.0));
      setRewardEarned({ xp, coins });

    }

    if (userId) {
      try {
        const cloudflare = createClient();
        // Qua `grant_coins`, không đọc-rồi-ghi: trigger 20260914 khoá cột
        // `coins` với vai trò trình duyệt, nên câu update cũ sẽ báo thành công
        // mà số dư không đổi.
        //
        // Trần server là 100 - `coinReward` cao nhất đang là 80, nhân hệ số
        // 1.25 khi đạt trên 90% ra 100 tròn.
        const { data: grant } = await cloudflare.rpc("grant_coins", {
          p_source: "challenge",
          p_ref: null,
          p_amount: coins,
        });
        const grantRow = Array.isArray(grant) ? grant[0] : grant;
        const nextCoins = grantRow?.coins_left ?? 0;

        await recordCustomGameSession(
          userId,
          "weekly-case-challenge",
          score,
          activeCase.questions.length * 300,
          xp
        );

        window.dispatchEvent(new CustomEvent("thtcdn:coin-updated", { detail: { coins: nextCoins } }));
        await recalculateUserStats(userId);
      } catch (e) {
        console.error("Error updating case study rewards:", e);
      }
    }
  }

  // Calculate Grade Rank
  const correctCount = Object.values(answeredMap).filter((v) => v.isCorrect).length;
  const totalCount = activeCase.questions.length;
  const correctRatio = totalCount > 0 ? correctCount / totalCount : 0;

  let rankGrade = { label: t.caseArena.rankC, color: "text-ink-muted border-line-strong", badgeBg: "" };
  if (correctRatio >= 0.9) {
    rankGrade = { label: t.caseArena.rankS, color: "text-white border-stone-950 dark:text-stone-950 dark:border-stone-100", badgeBg: "bg-stone-950 dark:bg-stone-100" };
  } else if (correctRatio >= 0.75) {
    rankGrade = { label: t.caseArena.rankA, color: "text-ink-max border-line-strong", badgeBg: "" };
  } else if (correctRatio >= 0.6) {
    rankGrade = { label: t.caseArena.rankB, color: "text-ink border-line-firm", badgeBg: "" };
  }

  return (
    <div className="h-full min-h-0 bg-white border border-line-strong rounded-md p-5 sm:p-7 text-ink relative overflow-hidden flex flex-col dark:bg-stone-900 dark:border-stone-700">

      {/* Header Times Square Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-stone-300 pb-5 mb-6 dark:border-stone-700">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <Sys className="text-ink-muted">{SYS.cases}</Sys>
            <span className="eyebrow text-ink-soft">{t.caseArena.hubTitle}</span>
            <span className="text-[10px] font-extrabold text-ink-soft border border-line-strong px-2 py-0.5 rounded-sm flex items-center gap-1 dark:border-stone-700">
              <Zap className="w-3 h-3" /> {t.caseArena.badge}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-ink-max mt-2 tracking-tight">
            {t.caseArena.title}
          </h2>
        </div>

        {/* Game Stats Badge when playing */}
        {gameState === "playing" && (
          <div className="flex items-center gap-3 border border-line-strong bg-page px-4 py-2 rounded-sm dark:border-stone-700 dark:bg-stone-950">
            <div>
              <span className="text-[9px] font-black uppercase text-ink-muted block">{t.caseArena.totalScore}</span>
              <span className="font-mono text-base font-medium tabular-nums text-ink-max">{score.toLocaleString()} pts</span>
            </div>
            {streakCombo > 1 && (
              <div className="border-l border-stone-300 pl-3 dark:border-stone-700">
                <span className="text-[9px] font-black uppercase text-ink-muted block">{t.caseArena.combo}</span>
                <span className="font-mono text-xs font-medium tabular-nums text-ink-max flex items-center gap-0.5">
                  <Flame className="w-3.5 h-3.5" /> x{(1 + Math.min(streakCombo - 1, 4) * 0.25).toFixed(1)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Case Study Selection Carousel */}
      <div className="flex items-center gap-5 overflow-x-auto scrollbar-none border-b border-stone-300 mb-6 dark:border-stone-700">
        {cases.map((c) => {
          const isCurrent = c.id === activeCaseId;
          return (
            <button
              key={c.id}
              onClick={() => startCaseStudyGame(c.id)}
              className={`flex shrink-0 items-center gap-2 pt-1 ${tabClass(isCurrent)}`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{c.company} <span className="font-mono font-medium">({c.ticker})</span></span>
            </button>
          );
        })}
      </div>

      {gameState === "briefing" && (
        <div className="mb-6">
          <ModeLeaderboard
            gameType="weekly-case-challenge"
            title={t.caseArena.leaderboardTitle}
            formatter={(entry) => `${entry.bestScore.toLocaleString()} pts`}
          />
        </div>
      )}

      {gameState !== "summary" && (
        <div className="mb-6 grid gap-3 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
          <div className="rounded-md border border-line-strong bg-page px-4 py-3.5 dark:border-stone-700 dark:bg-stone-950">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-sm border border-line-strong px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-ink-soft dark:border-stone-700">
                <Building2 className="w-3 h-3" />
                {activeCase.company} ({activeCase.ticker})
              </span>
              <span className="inline-flex items-center gap-1 rounded-sm border border-line-strong px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-ink-soft dark:border-stone-700">
                <Target className="w-3 h-3" />
                {activeCase.sector}
              </span>
              <span className="inline-flex items-center gap-1 rounded-sm border border-line-strong px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-ink-soft dark:border-stone-700">
                <BarChart3 className="w-3 h-3" />
                {activeCase.difficulty.toUpperCase()}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-ink-max tracking-tight">
              {activeCase.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft line-clamp-2">
              {activeCase.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-sm border border-line-strong px-3 py-3 dark:border-stone-700">
              <span className="text-[10px] font-black uppercase tracking-wider text-ink-muted block">
                {t.caseArena.xpReward}
              </span>
              <span className="mt-1 inline-flex items-center gap-1 font-mono text-sm font-medium tabular-nums text-ink-max">
                <Sparkles className="w-3.5 h-3.5" /> +{Math.min(50, activeCase.xpReward)}
              </span>
            </div>
            <div className="rounded-sm border border-line-strong px-3 py-3 dark:border-stone-700">
              <span className="text-[10px] font-black uppercase tracking-wider text-ink-muted block">
                {t.caseArena.coins}
              </span>
              <span className="mt-1 inline-flex items-center gap-1 font-mono text-sm font-medium tabular-nums text-warn-strong">
                <GoldCoinIcon className="w-3.5 h-3.5" /> +{activeCase.coinReward}
              </span>
            </div>
            <div className="rounded-sm border border-line-strong px-3 py-3 dark:border-stone-700">
              <span className="text-[10px] font-black uppercase tracking-wider text-ink-muted block">
                {t.caseArena.questions}
              </span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-black text-ink-max">
                <BookOpen className="w-3.5 h-3.5" /> {format(t.caseArena.questionCount, { count: activeCase.questions.length })}
              </span>
            </div>
            <div className="rounded-sm border border-line-strong px-3 py-3 dark:border-stone-700">
              <span className="text-[10px] font-black uppercase tracking-wider text-ink-muted block">
                {t.caseArena.status}
              </span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-black text-ink-max">
                <Timer className="w-3.5 h-3.5" /> {gameState === "briefing" ? t.caseArena.ready : format(t.caseArena.remaining, { count: remainingQuestions })}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* GAME STATE 1: BRIEFING */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
      {gameState === "briefing" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="bg-page border border-line-strong rounded-md p-5 relative overflow-hidden dark:bg-stone-950 dark:border-stone-700">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-ink-muted">
                {activeCase.sector}
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-sm text-ink-soft border border-line-strong">
                {format(t.caseArena.difficulty, { level: activeCase.difficulty.toUpperCase() })}
              </span>
            </div>
            <h3 className="text-lg font-black text-ink-max mb-2">{activeCase.title}</h3>
            <p className="text-xs text-ink-soft leading-relaxed mb-4">{activeCase.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-ink-muted pt-3 border-t border-line-strong">
              <span className="flex items-center gap-1 text-ink-body">
                <Sparkles className="w-4 h-4" /> {format(t.caseArena.maxReward, { xp: Math.min(50, activeCase.xpReward) })}
              </span>
              <span className="flex items-center gap-1 text-warn-strong">
                <GoldCoinIcon className="w-4 h-4" /> {format(t.caseArena.coinReward, { coins: activeCase.coinReward })}
              </span>
              <span>{format(t.caseArena.analysisQuestions, { count: activeCase.questions.length })}</span>
            </div>
          </div>

          <button
            onClick={() => startCaseStudyGame(activeCase.id)}
            className={`${btnPrimary} w-full`}
          >
            <span>{t.caseArena.start}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* GAME STATE 2: PLAYING */}
      {gameState === "playing" && currentQ && (
        <motion.div key={currentQIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-ink-muted">
            <span className="font-mono font-medium tabular-nums">{format(t.caseArena.questionCounter, { current: currentQIndex + 1, total: activeCase.questions.length })}</span>
            <span className="text-ink-body">{activeCase.company} <span className="font-mono font-medium">({activeCase.ticker})</span></span>
          </div>

          <div className="w-full bg-stone-100 h-2 rounded-xs border border-line-strong overflow-hidden dark:bg-stone-950 dark:border-stone-700">
            <div
              className="bg-brand-600 dark:bg-brand-500 h-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-sm border border-line-strong px-3 py-3 dark:border-stone-700">
              <span className="text-[10px] font-black uppercase tracking-wider text-ink-muted block">{t.caseArena.currentScore}</span>
              <span className="mt-1 block font-mono text-lg font-medium tabular-nums text-ink-max">{score.toLocaleString()} pts</span>
            </div>
            <div className="rounded-sm border border-line-strong px-3 py-3 dark:border-stone-700">
              <span className="text-[10px] font-black uppercase tracking-wider text-ink-muted block">{t.caseArena.currentCombo}</span>
              <span className="mt-1 inline-flex items-center gap-1 font-mono text-lg font-medium tabular-nums text-ink-max">
                <Flame className="w-4 h-4" /> x{(1 + Math.min(streakCombo, 4) * 0.25).toFixed(1)}
              </span>
            </div>
            <div className="rounded-sm border border-line-strong px-3 py-3 dark:border-stone-700">
              <span className="text-[10px] font-black uppercase tracking-wider text-ink-muted block">{t.caseArena.currentCorrect}</span>
              <span className="mt-1 block font-mono text-lg font-medium tabular-nums text-ink-max">{correctCount}/{Math.max(currentQIndex, 0) + (selectedOpt !== null ? 1 : 0)}</span>
            </div>
          </div>

          {/* Prompt */}
          <div className="bg-page border border-line-strong p-5 rounded-md dark:bg-stone-950 dark:border-stone-700">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-ink-soft border border-line-strong">
                <Zap className="w-3 h-3" /> {t.caseArena.analysisAngle}
              </span>
              <span className="text-[10px] font-bold text-ink-muted">
                {format(t.caseArena.questionsAfterThis, { count: remainingQuestions })}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold leading-snug text-ink-max">
              {currentQ.prompt}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((optText, oIdx) => {
              const isSelected = selectedOpt === oIdx;
              const isCorrect = oIdx === currentQ.correct;

              let btnStyle = "bg-white border-stone-300 hover:border-brand-500 text-ink dark:bg-stone-900 dark:border-stone-700 dark:hover:border-brand-400";
              if (selectedOpt !== null) {
                if (isCorrect) {
                  btnStyle = "bg-brand-50 border-brand-500 text-brand-800 font-bold dark:bg-brand-950/40 dark:text-brand-300";
                } else if (isSelected) {
                  btnStyle = "bg-rose-50 border-rose-500 text-rose-800 font-bold dark:bg-rose-950/40 dark:text-rose-300";
                } else {
                  btnStyle = "bg-white border-stone-200 opacity-60 text-ink-faint dark:bg-stone-900 dark:border-stone-800";
                }
              }

              return (
                <button
                  key={oIdx}
                  disabled={selectedOpt !== null}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-left p-4 rounded-sm border transition-colors flex items-start justify-between gap-3 text-xs sm:text-sm font-medium ${btnStyle}`}
                >
                  <span className="flex-1">{optText}</span>
                  {selectedOpt !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 dark:text-brand-400" />}
                  {selectedOpt !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Answer */}
          {selectedOpt !== null && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-page border border-line-strong p-4 rounded-md space-y-2 dark:bg-stone-950 dark:border-stone-700">
              <span className="text-[10px] font-black uppercase text-ink-muted flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> {t.caseArena.expertExplanation}
              </span>
              <p className="text-xs text-ink-body leading-relaxed">{currentQ.explanation}</p>

              <button
                onClick={handleNextQuestion}
                className={`${btnPrimary} mt-3 w-full`}
              >
                <span>{currentQIndex + 1 < activeCase.questions.length ? t.caseArena.nextQuestion : t.caseArena.seeSummary}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* GAME STATE 3: SUMMARY */}
      {gameState === "summary" && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center py-2">
            <div className="space-y-2">
              <Trophy className="w-14 h-14 text-ink-muted mx-auto" strokeWidth={1.5} />
              <span className={`inline-block text-xs font-black uppercase px-3 py-1 rounded-sm border ${rankGrade.badgeBg} ${rankGrade.color}`}>
                {rankGrade.label}
              </span>
            <h3 className="text-2xl font-black text-ink-max">{t.caseArena.doneTitle}</h3>
          </div>

          {/* Score breakdown card */}
          <div className="bg-white border border-line-strong p-5 rounded-md max-w-md mx-auto grid grid-cols-2 gap-4 text-left dark:bg-stone-900 dark:border-stone-700">
            <div>
              <span className="text-[10px] font-black uppercase text-stone-500 block">{t.caseArena.correctCount}</span>
              <span className="font-mono text-lg font-medium tabular-nums text-ink-max">{format(t.caseArena.correctOf, { correct: correctCount, total: totalCount })}</span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-stone-500 block">{t.caseArena.totalGameScore}</span>
              <span className="font-mono text-lg font-medium tabular-nums text-ink-max">{score.toLocaleString()} pts</span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-stone-500 block">{t.caseArena.maxCombo}</span>
              <span className="font-mono text-sm font-medium tabular-nums text-ink-max">{format(t.caseArena.maxComboValue, { combo: maxCombo })}</span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-stone-500 block">{t.caseArena.reward}</span>
              <span className="font-mono text-xs font-medium tabular-nums text-ink-max flex items-center gap-1">
                {format(t.caseArena.rewardXp, { xp: rewardEarned?.xp ?? 0 })} | <GoldCoinIcon className="w-3.5 h-3.5" /> +{rewardEarned?.coins ?? 0}
              </span>
            </div>
          </div>

          {/* Theory Lesson Recommendations */}
          <div className="bg-page border border-line-strong p-4 rounded-md text-left space-y-2 dark:bg-stone-950 dark:border-stone-700">
            <span className="text-[11px] font-black uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              {t.caseArena.lessonHintTitle}
            </span>
            <p className="text-xs text-ink-soft leading-relaxed mb-2">
              {t.caseArena.lessonHintBody}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeCase.relatedLessonSlugs.map((l) => (
                <Link
                  key={l.slug}
                  href={`/bai-hoc/${l.slug}`}
                  className="flex items-center justify-between p-2.5 rounded-sm bg-white border border-line-strong hover:border-brand-500 text-xs font-bold text-accent-strong transition-colors dark:bg-stone-900 dark:border-stone-700 dark:hover:border-brand-400"
                >
                  <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden /> {l.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => startCaseStudyGame(activeCase.id)}
              className={`${btnSecondary} flex-1`}
            >
              {t.caseArena.replayCase}
            </button>
            <button
              onClick={() => setGameState("briefing")}
              className={`${btnPrimary} flex-1`}
            >
              {t.caseArena.pickAnotherCase}
            </button>
          </div>
        </motion.div>
      )}
      </div>
    </div>
  );
}
