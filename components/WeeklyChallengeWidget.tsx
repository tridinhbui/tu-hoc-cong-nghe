"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Trophy, Sparkles, CheckCircle2, XCircle, ArrowRight, BookOpen, Flame, Award, Building2, ChevronRight, Zap, Target, Timer, BarChart3 } from "lucide-react";
import { REAL_CASE_STUDIES, type CaseStudyItem, type CaseStudyQuestion } from "@/lib/case-studies-data";
import { createClient } from "@/lib/supabase";
import { recalculateUserStats } from "@/lib/supabase-user";
import GoldCoinIcon from "@/components/GoldCoinIcon";
import { recordCustomGameSession } from "@/lib/games";
import ModeLeaderboard from "@/components/games/ModeLeaderboard";

export default function WeeklyChallengeWidget({ userId }: { userId: string }) {
  const [activeCaseId, setActiveCaseId] = useState<string>(REAL_CASE_STUDIES[0].id);
  const activeCase = REAL_CASE_STUDIES.find((c) => c.id === activeCaseId) ?? REAL_CASE_STUDIES[0];

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
      toast.success(`Chính xác! +${addedScore} điểm (Combo x${multiplier.toFixed(1)}) 🔥`);
    } else {
      setStreakCombo(0);
      toast.error("Chưa chính xác! Thất thoát Combo.");
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
        const supabase = createClient();
        const { data: profile } = await supabase.from("user_profiles").select("coins").eq("id", userId).single();
        const nextCoins = (profile?.coins || 0) + coins;

        await supabase.from("user_profiles").update({
          coins: nextCoins,
        }).eq("id", userId);

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

  let rankGrade = { label: "Hạng C - Cần Ôn Tập", color: "text-stone-500 border-stone-300", badgeBg: "bg-stone-100" };
  if (correctRatio >= 0.9) {
    rankGrade = { label: "Hạng S - Huyền Thoại Phân Tích Wall Street 🏆", color: "text-amber-700 border-amber-300", badgeBg: "bg-amber-50" };
  } else if (correctRatio >= 0.75) {
    rankGrade = { label: "Hạng A - Chuyên Gia Phân Tích Doanh Nghiệp 🥇", color: "text-emerald-600 border-emerald-300", badgeBg: "bg-emerald-50" };
  } else if (correctRatio >= 0.6) {
    rankGrade = { label: "Hạng B - Học Viên Phố Wall 🥈", color: "text-sky-600 border-sky-300", badgeBg: "bg-sky-50" };
  }

  return (
    <div className="h-full min-h-0 bg-white border-2 border-purple-200 rounded-3xl p-5 sm:p-7 shadow-xl text-stone-900 relative overflow-hidden flex flex-col">
      {/* Background Decorative Neon Lights */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header Times Square Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-200 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-black tracking-widest text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full shadow-xs">
              🏙️ Times Square Financial Hub
            </span>
            <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" /> Case Study Thực Tế
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-2 tracking-tight">
            Đấu Trường Case Study Doanh Nghiệp
          </h2>
        </div>

        {/* Game Stats Badge when playing */}
        {gameState === "playing" && (
          <div className="flex items-center gap-3 bg-purple-50 border border-purple-200 px-4 py-2 rounded-2xl shadow-sm">
            <div>
              <span className="text-[9px] font-black uppercase text-purple-600 block">Tổng Điểm Game</span>
              <span className="text-base font-black text-amber-600">{score.toLocaleString()} pts</span>
            </div>
            {streakCombo > 1 && (
              <div className="border-l border-purple-200 pl-3">
                <span className="text-[9px] font-black uppercase text-rose-500 block">Combo</span>
                <span className="text-xs font-black text-rose-500 flex items-center gap-0.5">
                  <Flame className="w-3.5 h-3.5 fill-rose-500" /> x{(1 + Math.min(streakCombo - 1, 4) * 0.25).toFixed(1)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Case Study Selection Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-6">
        {REAL_CASE_STUDIES.map((c) => {
          const isCurrent = c.id === activeCaseId;
          return (
            <button
              key={c.id}
              onClick={() => startCaseStudyGame(c.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 border transition-all ${
                isCurrent
                  ? "bg-purple-500 text-white border-purple-300 shadow-md shadow-purple-500/20 scale-105"
                  : "bg-white text-stone-600 border-stone-200 hover:border-purple-300 hover:text-purple-700"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{c.company} ({c.ticker})</span>
            </button>
          );
        })}
      </div>

      {gameState === "briefing" && (
        <div className="mb-6">
          <ModeLeaderboard
            gameType="weekly-case-challenge"
            title="BXH Case Study"
            formatter={(entry) => `${entry.bestScore.toLocaleString()} pts`}
          />
        </div>
      )}

      {gameState !== "summary" && (
        <div className="mb-6 grid gap-3 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
          <div className="rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50/90 via-white to-rose-50/70 px-4 py-3.5">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-purple-700">
                <Building2 className="w-3 h-3" />
                {activeCase.company} ({activeCase.ticker})
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-700">
                <Target className="w-3 h-3" />
                {activeCase.sector}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-stone-600">
                <BarChart3 className="w-3 h-3" />
                {activeCase.difficulty.toUpperCase()}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-stone-900 tracking-tight">
              {activeCase.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-stone-600 line-clamp-2">
              {activeCase.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-3 py-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                Thưởng XP
              </span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-black text-emerald-700">
                <Sparkles className="w-3.5 h-3.5" /> +{Math.min(50, activeCase.xpReward)}
              </span>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 px-3 py-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">
                Coins
              </span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-black text-amber-700">
                <GoldCoinIcon className="w-3.5 h-3.5" /> +{activeCase.coinReward}
              </span>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-sky-50/70 px-3 py-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 block">
                Câu hỏi
              </span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-black text-sky-700">
                <BookOpen className="w-3.5 h-3.5" /> {activeCase.questions.length} câu
              </span>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/70 px-3 py-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">
                Trạng thái
              </span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-black text-rose-700">
                <Timer className="w-3.5 h-3.5" /> {gameState === "briefing" ? "Sẵn sàng" : `${remainingQuestions} còn lại`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* GAME STATE 1: BRIEFING */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
      {gameState === "briefing" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="bg-purple-50/60 border border-purple-200 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-purple-600">
                {activeCase.sector}
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                Độ khó: {activeCase.difficulty.toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg font-black text-stone-900 mb-2">{activeCase.title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">{activeCase.description}</p>

            <div className="flex items-center gap-4 text-xs font-bold text-stone-500 pt-3 border-t border-purple-200">
              <span className="flex items-center gap-1 text-emerald-600">
                <Sparkles className="w-4 h-4" /> Thưởng tối đa: +{Math.min(50, activeCase.xpReward)} XP
              </span>
              <span className="flex items-center gap-1 text-amber-600">
                <GoldCoinIcon className="w-4 h-4" /> +{activeCase.coinReward} Coins
              </span>
              <span>❓ {activeCase.questions.length} Câu hỏi phân tích</span>
            </div>
          </div>

          <button
            onClick={() => startCaseStudyGame(activeCase.id)}
            className="w-full bg-gradient-to-r from-purple-600 via-rose-600 to-amber-500 text-white font-black py-4 rounded-2xl shadow-xl hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 text-base"
          >
            <span>Bắt Đầu Trận Đấu Case Study</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}

      {/* GAME STATE 2: PLAYING */}
      {gameState === "playing" && currentQ && (
        <motion.div key={currentQIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>Câu hỏi phân tích {currentQIndex + 1}/{activeCase.questions.length}</span>
            <span className="text-purple-600">{activeCase.company} ({activeCase.ticker})</span>
          </div>

          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-rose-500 h-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-2xl border border-purple-200 bg-purple-50/70 px-3.5 py-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 block">Điểm hiện tại</span>
              <span className="mt-1 text-lg font-black text-stone-900">{score.toLocaleString()} pts</span>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/70 px-3.5 py-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">Combo hiện tại</span>
              <span className="mt-1 inline-flex items-center gap-1 text-lg font-black text-rose-600">
                <Flame className="w-4 h-4 fill-rose-500" /> x{(1 + Math.min(streakCombo, 4) * 0.25).toFixed(1)}
              </span>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-3.5 py-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">Đúng hiện tại</span>
              <span className="mt-1 text-lg font-black text-emerald-700">{correctCount}/{Math.max(currentQIndex, 0) + (selectedOpt !== null ? 1 : 0)}</span>
            </div>
          </div>

          {/* Prompt */}
          <div className="bg-gradient-to-r from-white via-purple-50/35 to-white border border-purple-200 p-5 rounded-2xl shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-purple-700 border border-purple-200">
                <Zap className="w-3 h-3" /> Góc nhìn phân tích
              </span>
              <span className="text-[10px] font-bold text-stone-500">
                {remainingQuestions} câu sau câu này
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold leading-snug text-stone-900">
              {currentQ.prompt}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((optText, oIdx) => {
              const isSelected = selectedOpt === oIdx;
              const isCorrect = oIdx === currentQ.correct;

              let btnStyle = "bg-white border-stone-200 hover:border-purple-300 text-stone-700";
              if (selectedOpt !== null) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-700 font-bold shadow-sm";
                } else if (isSelected) {
                  btnStyle = "bg-rose-50 border-rose-300 text-rose-700 font-bold shadow-sm";
                } else {
                  btnStyle = "bg-stone-50 border-stone-200 opacity-50 text-stone-400";
                }
              }

              return (
                <button
                  key={oIdx}
                  disabled={selectedOpt !== null}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start justify-between gap-3 text-xs sm:text-sm font-medium ${btnStyle}`}
                >
                  <span className="flex-1">{optText}</span>
                  {selectedOpt !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                  {selectedOpt !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Answer */}
          {selectedOpt !== null && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-purple-50 border border-purple-200 p-4 rounded-2xl space-y-2">
              <span className="text-[10px] font-black uppercase text-purple-700 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> Giải thích chuyên môn:
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">{currentQ.explanation}</p>

              <button
                onClick={handleNextQuestion}
                className="w-full bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-black py-3 rounded-xl transition-all mt-3 flex items-center justify-center gap-2 text-xs"
              >
                <span>{currentQIndex + 1 < activeCase.questions.length ? "Câu tiếp theo" : "Xem Tổng Kết Điểm Game"}</span>
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
              <Trophy className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
              <span className={`inline-block text-xs font-black uppercase px-4 py-1.5 rounded-full border ${rankGrade.badgeBg} ${rankGrade.color}`}>
                {rankGrade.label}
              </span>
            <h3 className="text-2xl font-black text-stone-900">Hoàn Thành Case Study!</h3>
          </div>

          {/* Score breakdown card */}
          <div className="bg-white border border-purple-200 p-5 rounded-2xl max-w-md mx-auto grid grid-cols-2 gap-4 text-left shadow-sm">
            <div>
              <span className="text-[10px] font-black uppercase text-stone-500 block">Số câu đúng</span>
              <span className="text-lg font-black text-emerald-600">{correctCount}/{totalCount} câu</span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-stone-500 block">Tổng điểm Game</span>
              <span className="text-lg font-black text-amber-600">{score.toLocaleString()} pts</span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-stone-500 block">Max Combo</span>
              <span className="text-sm font-bold text-rose-500">🔥 x{maxCombo}</span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-stone-500 block">Phần thưởng</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                +{rewardEarned?.xp ?? 0} XP | <GoldCoinIcon className="w-3.5 h-3.5" /> +{rewardEarned?.coins ?? 0}
              </span>
            </div>
          </div>

          {/* Theory Lesson Recommendations */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-left space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
              💡 Gợi ý bài học ôn tập tương ứng:
            </span>
            <p className="text-xs text-stone-600 leading-relaxed mb-2">
              Để thành thạo hơn khi phân tích các doanh nghiệp thực tế, bạn nên đọc lại các bài học sau:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeCase.relatedLessonSlugs.map((l) => (
                <Link
                  key={l.slug}
                  href={`/bai-hoc/${l.slug}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 hover:border-amber-300 text-xs font-bold text-amber-700 transition-all"
                >
                  <span>📖 {l.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => startCaseStudyGame(activeCase.id)}
              className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-3.5 rounded-2xl transition-all text-xs"
            >
              Chơi Lại Case này
            </button>
            <button
              onClick={() => setGameState("briefing")}
              className="flex-1 bg-gradient-to-r from-purple-600 to-rose-600 text-white font-black py-3.5 rounded-2xl hover:brightness-110 transition-all text-xs"
            >
              Chọn Case Study Khác
            </button>
          </div>
        </motion.div>
      )}
      </div>
    </div>
  );
}
