"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, CheckCircle2, Shield, Sparkles, Trophy, X, XCircle } from "lucide-react";
import FinanceCharacterAvatar, { CharacterEquipments } from "@/components/FinanceCharacterAvatar";
import { toast } from "sonner";
import { recalculateUserStats } from "@/lib/supabase-user";
import { recordCustomGameSession } from "@/lib/games";
import ModeLeaderboard from "@/components/games/ModeLeaderboard";

interface SoloBossModalProps {
  userId?: string;
  userLevel: number;
  equipments?: CharacterEquipments;
  completedLessonCount?: number;
  onClose: () => void;
  embedded?: boolean;
}

interface SoloBossQuestion {
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
  lessonTitle: string;
}

type BattleState = "intro" | "loading" | "fighting" | "result";

const BOSS_MAX_HP = 100;

export default function PvpDuelModal({
  userId,
  userLevel,
  equipments = {},
  completedLessonCount = 0,
  onClose,
  embedded = false,
}: SoloBossModalProps) {
  const [battleState, setBattleState] = useState<BattleState>("intro");
  const [questions, setQuestions] = useState<SoloBossQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [bossHp, setBossHp] = useState(BOSS_MAX_HP);
  const [error, setError] = useState<string | null>(null);
  const [resultReward, setResultReward] = useState<{ xp: number; coins: number } | null>(null);
  const [submittingResult, setSubmittingResult] = useState(false);

  const currentQuestion = questions[qIndex];
  const totalQuestions = questions.length;
  const damagePerCorrect = totalQuestions > 0 ? Math.ceil(BOSS_MAX_HP / totalQuestions) : 20;
  const progressLabel = totalQuestions > 0 ? `${qIndex + 1}/${totalQuestions}` : "0/0";

  const learnedTone = useMemo(() => {
    if (completedLessonCount >= 10) return "Trận solo chỉ dùng ngân hàng câu hỏi từ các bài bạn đã học xong.";
    if (completedLessonCount >= 3) return "Boss sẽ hỏi lại đúng vùng kiến thức bạn đã đi qua.";
    return "Hoàn thành thêm bài học để boss ra câu sát với tiến độ của bạn hơn.";
  }, [completedLessonCount]);

  useEffect(() => {
    if (battleState !== "loading") return;

    let cancelled = false;

    fetch("/api/solo-boss/questions")
      .then((res) => {
        if (!res.ok) throw new Error("Không tải được câu hỏi từ tiến độ đã học.");
        return res.json() as Promise<{ questions?: SoloBossQuestion[] }>;
      })
      .then((data) => {
        if (cancelled) return;

        const loadedQuestions = data.questions ?? [];
        setQuestions(loadedQuestions);
        setQIndex(0);
        setSelectedOpt(null);
        setScore(0);
        setBossHp(BOSS_MAX_HP);

        if (loadedQuestions.length === 0) {
          setError("Bạn chưa có đủ bài học hoàn thành để mở trận solo này.");
          setBattleState("intro");
          return;
        }

        setError(null);
        setBattleState("fighting");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Không tải được câu hỏi đã học.");
        setBattleState("intro");
      });

    return () => {
      cancelled = true;
    };
  }, [battleState]);

  function startBattle() {
    setError(null);
    setBattleState("loading");
  }

  function resetBattle() {
    setQIndex(0);
    setSelectedOpt(null);
    setScore(0);
    setBossHp(BOSS_MAX_HP);
    setResultReward(null);
    setBattleState("fighting");
  }

  function handleSelectOption(index: number) {
    if (!currentQuestion || selectedOpt !== null) return;

    setSelectedOpt(index);
    const isCorrect = index === currentQuestion.correct;
    const nextScore = score + (isCorrect ? 1 : 0);
    const nextHp = isCorrect ? Math.max(0, bossHp - damagePerCorrect) : bossHp;

    if (isCorrect) {
      setScore(nextScore);
      setBossHp(nextHp);
    }

    window.setTimeout(() => {
      if (qIndex + 1 >= totalQuestions || nextHp <= 0) {
        setBattleState("result");
        return;
      }

      setQIndex((prev) => prev + 1);
      setSelectedOpt(null);
    }, 900);
  }

  const resultWon = bossHp <= 0 || score >= Math.ceil(totalQuestions * 0.7);

  useEffect(() => {
    if (battleState !== "result" || !userId || totalQuestions === 0 || submittingResult || resultReward) return;

    let cancelled = false;
    const submit = async () => {
      setSubmittingResult(true);
      try {
        const wagerCoins = 50;
        const res = await fetch("/api/pvp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wagerCoins, score, isWin: resultWon }),
        });

        if (!res.ok) throw new Error("Không thể chốt kết quả solo.");
        const data = await res.json();
        if (cancelled) return;

        const xp = data.xpReward ?? (resultWon ? 50 : 10);
        const coins = Math.max(0, data.coinDelta ?? 0);
        setResultReward({ xp, coins });
        window.dispatchEvent(new CustomEvent("thtcdn:coin-updated", { detail: { coins: data.newCoins } }));
        await recalculateUserStats(userId);
        toast.success(`Đã ghi nhận BXH Solo: +${xp} XP${coins > 0 ? ` & +${coins} Coins` : ""}`);
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          try {
            const fallbackXp = resultWon ? 50 : 10;
            await recordCustomGameSession(userId, "solo-knowledge-boss", score, totalQuestions, fallbackXp);
            await recalculateUserStats(userId);
            setResultReward({ xp: fallbackXp, coins: 0 });
          } catch (fallbackErr) {
            console.error("Fallback solo leaderboard record failed:", fallbackErr);
          }
        }
      } finally {
        if (!cancelled) setSubmittingResult(false);
      }
    };

    void submit();
    return () => {
      cancelled = true;
    };
  }, [battleState, resultReward, resultWon, score, submittingResult, totalQuestions, userId]);

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 12 }}
      className={`bg-white border border-sky-100 text-stone-900 shadow-2xl relative overflow-hidden ${
        embedded
          ? "rounded-[28px] p-6 sm:p-7 max-w-4xl w-full mx-auto"
          : "rounded-[28px] p-6 sm:p-7 max-w-4xl w-full"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-300" />
      {!embedded && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full bg-stone-100 transition-colors z-10"
          aria-label="Đóng đấu trường"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className={`border-b border-stone-100 ${embedded ? "pb-4 mb-5" : "pb-5 mb-6 pr-10"}`}>
        <span className="inline-flex max-w-full text-[10px] uppercase font-black tracking-widest text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
          Solo Knowledge Boss
        </span>
        <h3 className={`${embedded ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"} font-black mt-2 flex items-start sm:items-center gap-2 leading-tight`}>
          <Brain className="w-5 h-5 text-sky-600 shrink-0 mt-1 sm:mt-0" />
          <span>Đấu Trường Kiến Thức Solo</span>
        </h3>
        <p className={`${embedded ? "text-xs sm:text-sm" : "text-sm"} font-semibold text-stone-500 mt-1`}>{learnedTone}</p>
      </div>

      <AnimatePresence mode="wait">
        {battleState === "intro" ? (
          <motion.div key="intro" className={embedded ? "space-y-5" : "space-y-6"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className={`grid ${embedded ? "grid-cols-1 sm:grid-cols-[auto_1fr]" : "md:grid-cols-[auto_1fr]"} gap-4 items-center bg-gradient-to-br from-sky-50 to-emerald-50 border border-sky-100 ${embedded ? "p-4" : "p-5 sm:p-6"} rounded-2xl`}>
              <div className={embedded ? "justify-self-center sm:justify-self-start" : ""}>
                <FinanceCharacterAvatar level={userLevel} equipments={equipments} size={embedded ? "sm" : "md"} />
              </div>
              <div className={embedded ? "text-center sm:text-left" : ""}>
                <p className="text-xs font-black uppercase tracking-wide text-sky-700">Người học Lv.{userLevel}</p>
                <p className={`${embedded ? "text-sm" : "text-base"} font-bold text-stone-800 mt-1`}>
                  Vào trận solo, trả lời đúng để bẻ giáp boss kiến thức.
                </p>
              </div>
            </div>

            <div className={`bg-amber-50 border border-amber-100 ${embedded ? "p-3" : "p-4"} rounded-2xl flex items-start gap-2`}>
              <Shield className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <p className={`${embedded ? "text-xs" : "text-sm"} font-semibold text-amber-800`}>
                Trận này không đấu người chơi khác. Boss chỉ hỏi lại phần bạn đã học để ôn đúng trọng tâm.
              </p>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 p-3 rounded-2xl text-xs font-semibold text-rose-700">
                {error}
              </div>
            )}

            <button
              onClick={startBattle}
              className={`w-full bg-sky-600 hover:bg-sky-500 font-black ${embedded ? "py-3.5 text-base" : "py-4 text-lg"} rounded-2xl text-white shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-center leading-tight`}
            >
              <Sparkles className="w-5 h-5" /> Bắt đầu đánh Boss Kiến Thức
            </button>

            <ModeLeaderboard
              gameType="solo-knowledge-boss"
              title="BXH Solo Kiến Thức"
              formatter={(entry) => `${entry.bestScore}/${entry.bestTotal} câu`}
            />
          </motion.div>
        ) : battleState === "loading" ? (
          <motion.div key="loading" className="py-12 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="w-10 h-10 border-2 border-sky-100 border-t-sky-500 rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-stone-500 mt-4">Đang chọn câu hỏi từ bài bạn đã học...</p>
          </motion.div>
        ) : battleState === "fighting" && currentQuestion ? (
          <motion.div key="fighting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className={`bg-stone-900 border border-sky-500/30 rounded-2xl ${embedded ? "p-3 sm:p-4 mb-4" : "p-4 sm:p-5 mb-5"} text-white`}>
              <div className="grid grid-cols-3 items-center gap-2 sm:gap-3">
                <div className="flex flex-col items-center text-center">
                  <FinanceCharacterAvatar level={userLevel} equipments={equipments} size="sm" />
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-sky-300 mt-1">Lv.{userLevel} Bạn</span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 text-white font-black text-xs flex items-center justify-center shadow-md">
                    VS
                  </span>
                  <span className="text-[10px] font-bold text-amber-400 mt-1">Câu {progressLabel}</span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-3xl shadow-lg">
                    🐂
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-amber-400 mt-0.5 leading-tight">Trâu Phố Wall</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between items-center text-[10px] font-extrabold text-stone-300 mb-1">
                  <span>Thanh Máu Giáp Boss</span>
                  <span className="text-sky-400">{bossHp}/{BOSS_MAX_HP} HP</span>
                </div>
                <div className="h-2.5 rounded-full bg-stone-800 border border-stone-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400 transition-all duration-500"
                    style={{ width: `${bossHp}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-2">
                Từ bài: {currentQuestion.lessonTitle}
              </p>
              <h3 className={`${embedded ? "text-sm" : "text-base sm:text-lg"} font-bold bg-white p-4 rounded-2xl border border-stone-200 shadow-sm leading-relaxed break-words`}>
                {currentQuestion.prompt}
              </h3>
            </div>

            <div className={embedded ? "space-y-2" : "space-y-3"}>
              {currentQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedOpt === oIdx;
                const isCorrect = oIdx === currentQuestion.correct;
                let cls = "bg-white border-stone-200 hover:border-sky-300 hover:bg-sky-50";

                if (selectedOpt !== null) {
                  if (isCorrect) cls = "bg-emerald-50 border-emerald-300 text-emerald-800";
                  else if (isSelected) cls = "bg-rose-50 border-rose-300 text-rose-800";
                  else cls = "bg-stone-50 border-stone-100 text-stone-400";
                }

                return (
                  <button
                    key={oIdx}
                    disabled={selectedOpt !== null}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full text-left ${embedded ? "text-xs p-3.5" : "text-sm p-4"} font-bold rounded-2xl border transition-colors flex items-start gap-2 ${cls}`}
                  >
                    {selectedOpt !== null && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />}
                    {selectedOpt !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {selectedOpt !== null && (
              <p className={`mt-3 ${embedded ? "text-xs p-3" : "text-sm p-4"} leading-relaxed bg-sky-50 border border-sky-100 text-sky-800 rounded-2xl`}>
                {currentQuestion.explanation}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div key="result" className={`text-center ${embedded ? "py-5 space-y-4" : "py-8 space-y-5"}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Trophy className={`w-16 h-16 mx-auto ${resultWon ? "text-amber-400" : "text-stone-300"}`} />
            <h3 className={`text-2xl font-black ${resultWon ? "text-emerald-600" : "text-sky-700"}`}>
              {resultWon ? "Hạ Boss Kiến Thức!" : "Boss còn đứng vững"}
            </h3>
            <p className={`${embedded ? "text-sm" : "text-base"} text-stone-500`}>
              Bạn trả lời đúng <strong className="text-stone-900">{score}/{totalQuestions}</strong> câu từ các bài đã học.
            </p>
            {resultReward && (
              <p className="text-sm font-bold text-emerald-600">
                Thưởng đã ghi nhận vào BXH game: +{resultReward.xp} XP{resultReward.coins > 0 ? ` & +${resultReward.coins} Coins` : ""}
              </p>
            )}
            {submittingResult && (
              <p className="text-xs font-semibold text-stone-400">Đang ghi nhận thành tích BXH...</p>
            )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={resetBattle}
                  className={`bg-stone-100 hover:bg-stone-200 font-black ${embedded ? "py-3" : "py-4"} rounded-2xl text-stone-800 transition-colors`}
              >
                Đánh lại
              </button>
              <button
                onClick={onClose}
                className={`bg-sky-600 hover:bg-sky-500 font-black ${embedded ? "py-3" : "py-4"} rounded-2xl text-white transition-colors`}
              >
                Đóng
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (embedded) {
    return cardContent;
  }

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-full px-4 py-8 sm:px-6 sm:py-10 flex items-start justify-center">
        {cardContent}
      </div>
    </div>
  );
}
