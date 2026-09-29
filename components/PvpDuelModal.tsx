"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, CheckCircle2, Shield, Swords, Trophy, X, XCircle } from "lucide-react";
import TechCharacterAvatar, { CharacterEquipments } from "@/components/TechCharacterAvatar";
import { toast } from "sonner";
import { recalculateUserStats } from "@/lib/cloudflare-user";
import { recordCustomGameSession } from "@/lib/games";
import ModeLeaderboard from "@/components/games/ModeLeaderboard";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { btnPrimary, btnSecondary, Sys } from "@/components/ui/system";

/* i18n-ignore-start: định danh hệ thống, không phải chữ hiển thị */
const SYS = {
  duel: "THCN://GAME/SOLO-BOSS",
};
/* i18n-ignore-end */

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
  const { t } = useI18n();
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
    if (completedLessonCount >= 10) return t.pvpDuel.learnedTone10;
    if (completedLessonCount >= 3) return t.pvpDuel.learnedTone3;
    return t.pvpDuel.learnedToneDefault;
  }, [completedLessonCount, t]);

  useEffect(() => {
    if (battleState !== "loading") return;

    let cancelled = false;

    fetch("/api/solo-boss/questions")
      .then((res) => {
        if (!res.ok) throw new Error(t.pvpDuel.errorLoadFailed);
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
          setError(t.pvpDuel.errorNoQuestions);
          setBattleState("intro");
          return;
        }

        setError(null);
        setBattleState("fighting");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : t.pvpDuel.errorLoadGeneric);
        setBattleState("intro");
      });

    return () => {
      cancelled = true;
    };
  }, [battleState, t]);

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

        if (!res.ok) throw new Error(t.pvpDuel.errorSubmitFailed);
        const data = await res.json();
        if (cancelled) return;

        const xp = data.xpReward ?? (resultWon ? 50 : 10);
        const coins = Math.max(0, data.coinDelta ?? 0);
        setResultReward({ xp, coins });
        window.dispatchEvent(new CustomEvent("thtcdn:coin-updated", { detail: { coins: data.newCoins } }));
        await recalculateUserStats(userId);
        toast.success(
          format(t.pvpDuel.toastRecordedBase, { xp }) +
            (coins > 0 ? format(t.pvpDuel.toastRecordedCoinsSuffix, { coins }) : "")
        );
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
  }, [battleState, resultReward, resultWon, score, submittingResult, totalQuestions, userId, t]);

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 12 }}
      className={`bg-white border border-line-strong text-ink dark:bg-stone-900 dark:border-stone-700 relative overflow-hidden ${
        embedded
          ? "rounded-md p-6 sm:p-7 max-w-4xl w-full mx-auto"
          : "rounded-md p-6 sm:p-7 max-w-4xl w-full"
      }`}
    >
      {!embedded && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-ink-muted hover:text-ink-max rounded-sm border border-line-strong hover:border-stone-400 dark:border-stone-700 dark:hover:border-stone-200 transition-colors z-10"
          aria-label={t.pvpDuel.closeAriaLabel}
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className={`border-b border-line-strong ${embedded ? "pb-4 mb-5" : "pb-5 mb-6 pr-10"}`}>
        <div className="flex max-w-full items-center gap-3">
          <Sys className="text-ink-muted">{SYS.duel}</Sys>
          <span className="eyebrow text-ink-soft">{t.pvpDuel.soloBossBadge}</span>
        </div>
        <h3 className={`${embedded ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"} font-black mt-2 flex items-start sm:items-center gap-2 leading-tight text-ink-max`}>
          <Brain className="w-5 h-5 text-ink-muted shrink-0 mt-1 sm:mt-0" />
          <span>{t.pvpDuel.title}</span>
        </h3>
        <p className={`${embedded ? "text-xs sm:text-sm" : "text-sm"} font-semibold text-ink-soft mt-1`}>{learnedTone}</p>
      </div>

      <AnimatePresence mode="wait">
        {battleState === "intro" ? (
          <motion.div key="intro" className={embedded ? "space-y-5" : "space-y-6"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="relative h-44 sm:h-52 w-full rounded-md overflow-hidden border border-line-strong">
              <Image
                src="/images/dau-truong-kien-thuc.jpg"
                alt={t.pvpDuel.heroAlt}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-stone-950/75" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-300">
                  {t.pvpDuel.arenaEyebrow}
                </span>
                <h4 className="text-lg sm:text-xl font-black text-white mt-1">{t.pvpDuel.heroTitle}</h4>
              </div>
            </div>

            <div className={`grid ${embedded ? "grid-cols-1 sm:grid-cols-[auto_1fr]" : "md:grid-cols-[auto_1fr]"} gap-4 items-center bg-page border border-line-strong dark:bg-stone-950 dark:border-stone-700 ${embedded ? "p-4" : "p-5 sm:p-6"} rounded-md`}>
              <div className={embedded ? "justify-self-center sm:justify-self-start" : ""}>
                <TechCharacterAvatar level={userLevel} equipments={equipments} size={embedded ? "sm" : "md"} />
              </div>
              <div className={embedded ? "text-center sm:text-left" : ""}>
                <p className="font-mono text-xs font-medium uppercase tabular-nums tracking-wide text-ink-muted">{format(t.pvpDuel.learnerLevelLabel, { level: userLevel })}</p>
                <p className={`${embedded ? "text-sm" : "text-base"} font-bold text-ink mt-1`}>
                  {t.pvpDuel.introDesc}
                </p>
              </div>
            </div>

            <div className={`border border-line-strong ${embedded ? "p-3" : "p-4"} rounded-md flex items-start gap-2`}>
              <Shield className="w-4 h-4 text-ink-muted mt-0.5 shrink-0" />
              <p className={`${embedded ? "text-xs" : "text-sm"} font-semibold text-ink-body`}>
                {t.pvpDuel.noticeText}
              </p>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-300 p-3 rounded-sm text-xs font-semibold text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300">
                {error}
              </div>
            )}

            <button
              onClick={startBattle}
              className={`${btnPrimary} w-full cursor-pointer text-center leading-tight`}
            >
              {t.pvpDuel.startButton}
            </button>

            <ModeLeaderboard
              gameType="solo-knowledge-boss"
              title={t.pvpDuel.leaderboardTitle}
              formatter={(entry) => format(t.pvpDuel.leaderboardFormat, { score: entry.bestScore, total: entry.bestTotal })}
            />
          </motion.div>
        ) : battleState === "loading" ? (
          <motion.div key="loading" className="py-12 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-600 rounded-full animate-spin mx-auto dark:border-stone-700 dark:border-t-brand-400" />
            <p className="text-sm font-bold text-ink-muted mt-4">{t.pvpDuel.loadingText}</p>
          </motion.div>
        ) : battleState === "fighting" && currentQuestion ? (
          <motion.div key="fighting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className={`bg-stone-950 border border-stone-800 rounded-md ${embedded ? "p-3 sm:p-4 mb-4" : "p-4 sm:p-5 mb-5"} text-white`}>
              <div className="grid grid-cols-3 items-center gap-2 sm:gap-3">
                <div className="flex flex-col items-center text-center">
                  <TechCharacterAvatar level={userLevel} equipments={equipments} size="sm" />
                  <span className="font-mono text-[10px] sm:text-[11px] font-medium tabular-nums text-stone-300 mt-1">{format(t.pvpDuel.youLabel, { level: userLevel })}</span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <span className="w-8 h-8 rounded-sm border border-white/15 text-stone-300 font-black text-xs flex items-center justify-center">
                    {t.pvpDuel.vs}
                  </span>
                  <span className="font-mono text-[10px] font-medium tabular-nums text-stone-400 mt-1">{format(t.pvpDuel.questionCounter, { progress: progressLabel })}</span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-md border border-rose-500/50 bg-stone-900 flex items-center justify-center text-rose-400">
                    <Swords className="w-7 h-7" strokeWidth={1.75} aria-hidden />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-stone-200 mt-0.5 leading-tight">{t.pvpDuel.bullNickname}</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between items-center text-[10px] font-extrabold text-stone-300 mb-1">
                  <span>{t.pvpDuel.bossHpLabel}</span>
                  <span className="font-mono font-medium tabular-nums text-rose-400">{format(t.pvpDuel.hpSuffix, { hp: bossHp, max: BOSS_MAX_HP })}</span>
                </div>
                <div className="h-2.5 rounded-xs bg-stone-950 border border-white/15 overflow-hidden">
                  <div
                    className="h-full bg-rose-600 transition-all duration-500"
                    style={{ width: `${bossHp}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-ink-muted mb-2">
                {format(t.pvpDuel.fromLessonLabel, { title: currentQuestion.lessonTitle })}
              </p>
              <h3 className={`${embedded ? "text-sm" : "text-base sm:text-lg"} font-bold bg-page p-4 rounded-md border border-line-strong text-ink-max dark:bg-stone-950 dark:border-stone-700 leading-relaxed break-words`}>
                {currentQuestion.prompt}
              </h3>
            </div>

            <div className={embedded ? "space-y-2" : "space-y-3"}>
              {currentQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedOpt === oIdx;
                const isCorrect = oIdx === currentQuestion.correct;
                let cls = "bg-white border-stone-300 text-ink hover:border-brand-500 dark:bg-stone-900 dark:border-stone-700 dark:hover:border-brand-400";

                if (selectedOpt !== null) {
                  if (isCorrect) cls = "bg-brand-50 border-brand-500 text-brand-800 dark:bg-brand-950/40 dark:text-brand-300";
                  else if (isSelected) cls = "bg-rose-50 border-rose-500 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300";
                  else cls = "bg-white border-stone-200 text-ink-faint dark:bg-stone-900 dark:border-stone-800";
                }

                return (
                  <button
                    key={oIdx}
                    disabled={selectedOpt !== null}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full text-left ${embedded ? "text-xs p-3.5" : "text-sm p-4"} font-bold rounded-sm border transition-colors flex items-start gap-2 ${cls}`}
                  >
                    {selectedOpt !== null && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />}
                    {selectedOpt !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {selectedOpt !== null && (
              <p className={`mt-3 ${embedded ? "text-xs p-3" : "text-sm p-4"} leading-relaxed bg-page border border-line-strong text-ink-body rounded-md dark:bg-stone-950 dark:border-stone-700`}>
                {currentQuestion.explanation}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div key="result" className={`text-center ${embedded ? "py-5 space-y-4" : "py-8 space-y-5"}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Trophy className={`w-14 h-14 mx-auto ${resultWon ? "text-ink-max" : "text-ink-faint"}`} strokeWidth={1.5} />
            <h3 className="text-2xl font-black text-ink-max">
              {resultWon ? t.pvpDuel.resultWonTitle : t.pvpDuel.resultLostTitle}
            </h3>
            <p className={`${embedded ? "text-sm" : "text-base"} text-ink-soft`}>
              {t.pvpDuel.resultScorePart1}<strong className="font-mono tabular-nums text-ink-max">{score}/{totalQuestions}</strong>{t.pvpDuel.resultScorePart2}
            </p>
            {resultReward && (
              <p className="font-mono text-sm font-medium tabular-nums text-accent-strong">
                {format(t.pvpDuel.rewardBase, { xp: resultReward.xp })}
                {resultReward.coins > 0 ? format(t.pvpDuel.rewardCoinsSuffix, { coins: resultReward.coins }) : ""}
              </p>
            )}
            {submittingResult && (
              <p className="text-xs font-semibold text-ink-faint">{t.pvpDuel.submittingText}</p>
            )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={resetBattle}
                  className={btnSecondary}
              >
                {t.pvpDuel.retryButton}
              </button>
              <button
                onClick={onClose}
                className={btnPrimary}
              >
                {t.pvpDuel.closeButton}
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
    <div className="fixed inset-0 bg-stone-950/70 z-50 overflow-y-auto">
      <div className="min-h-full px-4 py-8 sm:px-6 sm:py-10 flex items-start justify-center">
        {cardContent}
      </div>
    </div>
  );
}
