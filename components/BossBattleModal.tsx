"use client";

import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { shuffleQuiz } from "@/lib/quiz-shuffle";
import { useIsClient } from "@/lib/use-is-client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Heart, ShieldAlert, Trophy, Sparkles, X } from "lucide-react";
import TechCharacterAvatar, { CharacterEquipments } from "@/components/TechCharacterAvatar";
import GoldCoinIcon from "@/components/GoldCoinIcon";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import { Sys } from "@/components/ui/system";

/* i18n-ignore-start: định danh hệ thống, không phải chữ hiển thị */
const SYS = {
  arena: "THCN://GAME/BOSS",
};
/* i18n-ignore-end */

interface BossQuestion {
  prompt: string;
  options: string[];
  correct: number;
}

function buildDefaultBossQuestions(t: Dictionary): BossQuestion[] {
  return [
    {
      prompt: t.bossBattle.defaultQ1Prompt,
      options: [t.bossBattle.defaultQ1Opt1, t.bossBattle.defaultQ1Opt2, t.bossBattle.defaultQ1Opt3],
      correct: 0,
    },
    {
      prompt: t.bossBattle.defaultQ2Prompt,
      options: [t.bossBattle.defaultQ2Opt1, t.bossBattle.defaultQ2Opt2, t.bossBattle.defaultQ2Opt3],
      correct: 0,
    },
    {
      prompt: t.bossBattle.defaultQ3Prompt,
      options: [t.bossBattle.defaultQ3Opt1, t.bossBattle.defaultQ3Opt2, t.bossBattle.defaultQ3Opt3],
      correct: 0,
    },
  ];
}

interface BossBattleModalProps {
  bossName?: string;
  bossEmoji?: string;
  bossImage?: string;
  userLevel: number;
  equipments?: CharacterEquipments;
  questions?: BossQuestion[];
  completedLessonCount?: number;
  onVictory?: (rewards: { xp: number; coins: number }) => void;
  onClose: () => void;
}

export default function BossBattleModal({
  bossName,
  bossImage = "/boss-server-outage.svg",
  userLevel,
  equipments = {},
  questions,
  completedLessonCount = 0,
  onVictory,
  onClose,
}: BossBattleModalProps) {
  const { t } = useI18n();
  const mounted = useIsClient();
  const resolvedBossName = bossName ?? t.bossBattle.defaultBossName;
  const resolvedQuestions = useMemo(() => questions ?? buildDefaultBossQuestions(t), [questions, t]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bossHp, setBossHp] = useState(100);
  const [heroHp, setHeroHp] = useState(100);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [battleState, setBattleState] = useState<"fighting" | "hit_boss" | "hit_hero" | "victory" | "defeat">("fighting");

  // Xáo một lần khi trận mở ra, không xáo lúc render: random lúc render thì
  // server và client dựng hai thứ tự khác nhau, và mọi lần render lại giữa
  // trận sẽ đảo chỗ đáp án ngay dưới ngón tay người chơi.
  // Khởi tạo lười: xáo đúng một lần cho cả trận. Bản dựng trên server bị bỏ
  // đi (`mounted` còn false nên chưa render portal), nên không có chuyện
  // server và client lệch thứ tự.
  const [shuffledQuestions] = useState(() => shuffleQuiz(resolvedQuestions));

  const currentQ = shuffledQuestions[currentQuestionIndex] || resolvedQuestions[currentQuestionIndex];
  const maxQ = shuffledQuestions.length;
  const dmgPerHit = Math.ceil(100 / maxQ);

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null || battleState !== "fighting") return;
    setSelectedOption(optionIndex);

    const isCorrect = optionIndex === currentQ.correct;

    if (isCorrect) {
      // Đánh Boss
      setBattleState("hit_boss");
      const nextBossHp = Math.max(0, bossHp - dmgPerHit);
      setBossHp(nextBossHp);

      setTimeout(() => {
        if (nextBossHp === 0 || currentQuestionIndex + 1 >= maxQ) {
          setBattleState("victory");
          // 50 XP = the per-game_type ceiling the rest of the XP economy
          // runs on (MAX_GAME_XP_PER_TYPE in lib/games.ts, enforced by a
          // CHECK on game_sessions). The old 300 was ~30 lessons' worth.
          onVictory?.({ xp: 50, coins: 100 });
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedOption(null);
          setBattleState("fighting");
        }
      }, 1200);
    } else {
      // Boss phản công
      setBattleState("hit_hero");
      const nextHeroHp = Math.max(0, heroHp - 34);
      setHeroHp(nextHeroHp);

      setTimeout(() => {
        if (nextHeroHp === 0) {
          setBattleState("defeat");
        } else if (currentQuestionIndex + 1 >= maxQ) {
          if (bossHp <= 30) {
            setBattleState("victory");
            onVictory?.({ xp: 30, coins: 50 });
          } else {
            setBattleState("defeat");
          }
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedOption(null);
          setBattleState("fighting");
        }
      }, 1200);
    }
  };

  if (!mounted) return null;

  // `overflow-y-auto` trên lớp phủ, `my-auto` trên tấm. Một tấm cao hơn màn
  // hình mà lớp phủ không cuộn được thì bị cắt cụt cả trên lẫn dưới, và chính
  // hai đầu ấy chứa nút đóng và nút hành động. Điện thoại xoay ngang chỉ còn
  // 375px chiều cao, thấp hơn gần hết các tấm ở đây. `my-auto` là phần bắt
  // buộc đi kèm: `items-center` trong một khung cuộn được sẽ cắt mất đầu trên
  // khi nội dung tràn.
  return createPortal(
    <div className="fixed inset-0 bg-stone-950/70 z-[9999] flex items-center justify-center overflow-y-auto p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-brand-600 border border-brand-700 rounded-md p-6 max-w-xl w-full my-auto text-white relative overflow-hidden"
      >
        {/* Header Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white rounded-sm border border-white/15 hover:border-white/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Arena Header: Hero vs Boss */}
        <div className="border-b border-white/15 pb-4 mb-6 pr-10">
          <div className="flex items-center gap-3">
            <Sys className="text-stone-400">{SYS.arena}</Sys>
            <span className="eyebrow text-stone-300">{t.bossBattle.arenaBadge}</span>
          </div>
          <h2 className="text-xl font-black mt-2 flex items-center gap-2">
            <Swords className="w-5 h-5 text-rose-500" /> {format(t.bossBattle.battleTitle, { bossName: resolvedBossName })}
          </h2>
        </div>

        {/* Battle Battlefield (HP Bars & Avatars) */}
        <div className="grid grid-cols-2 gap-4 items-center justify-between bg-stone-900 border border-white/10 rounded-md p-4 mb-6">
          {/* Hero Side */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-stone-300 mb-1">{t.bossBattle.heroLabel}</span>
            <motion.div animate={battleState === "hit_hero" ? { x: [-10, 10, -10, 0] } : {}}>
              <TechCharacterAvatar level={userLevel} equipments={equipments} size="sm" />
            </motion.div>
            
            {/* Hero HP */}
            <div className="w-full bg-stone-950 h-3 rounded-xs mt-3 overflow-hidden border border-white/15">
              <div
                className="bg-brand-500 h-full transition-all duration-500"
                style={{ width: `${heroHp}%` }}
              />
            </div>
            <span className="text-[10px] text-stone-400 mt-1 flex items-center gap-1 font-mono font-medium tabular-nums">
              <Heart className="w-3 h-3 text-rose-500 fill-current" /> {format(t.bossBattle.heroHp, { hp: heroHp })}
            </span>
          </div>

          {/* Boss Side */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-stone-300 mb-1">{resolvedBossName}</span>
            <motion.div
              animate={battleState === "hit_boss" ? { scale: [1, 1.2, 0.9, 1], rotate: [0, -10, 10, 0], filter: ["brightness(1)", "brightness(2) saturate(2)", "brightness(1)"] } : {}}
              className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center"
            >
              <Image
                src={bossImage}
                alt={resolvedBossName}
                width={112}
                height={112}
                className="w-full h-full object-contain"
              />
              {battleState === "hit_boss" && (
                <span className="absolute -top-3 text-rose-300 bg-stone-950 border border-rose-500/60 font-mono font-bold tabular-nums text-xs px-2 py-0.5 rounded-sm whitespace-nowrap z-20">
                  {format(t.bossBattle.damageTag, { dmg: dmgPerHit })}
                </span>
              )}
            </motion.div>

            {/* Boss HP */}
            <div className="w-full bg-stone-950 h-3 rounded-xs mt-3 overflow-hidden border border-white/15">
              <div
                className="bg-rose-600 h-full transition-all duration-500"
                style={{ width: `${bossHp}%` }}
              />
            </div>
            <span className="text-[10px] text-rose-400 mt-1 flex items-center gap-1 font-mono font-medium tabular-nums">
              <ShieldAlert className="w-3 h-3 text-rose-500" /> {format(t.bossBattle.bossHp, { hp: bossHp })}
            </span>
          </div>
        </div>

        {/* Victory Screen */}
        {battleState === "victory" ? (
          <div className="text-center py-6 space-y-4">
            <Trophy className="w-14 h-14 text-stone-300 mx-auto" strokeWidth={1.5} />
            <h3 className="text-2xl font-black text-white">{t.bossBattle.victoryTitle}</h3>
            <p className="text-sm text-stone-300">
              {format(t.bossBattle.victoryDesc, { bossName: resolvedBossName })}
            </p>
            <div className="border border-white/15 rounded-sm px-3 py-2 inline-flex items-center gap-1.5">
              <span className="text-sm font-black text-amber-300 flex items-center gap-1">
                {t.bossBattle.victoryRewardPart1} <GoldCoinIcon className="w-4 h-4" /> {t.bossBattle.victoryRewardPart2}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-full rounded-sm bg-white px-4 py-3 text-sm font-bold text-stone-950 transition-colors hover:bg-brand-300 mt-4"
            >
              {t.bossBattle.claimButton}
            </button>
          </div>
        ) : battleState === "defeat" ? (
          <div className="text-center py-6 space-y-4">
            <ShieldAlert className="w-14 h-14 text-rose-500 mx-auto" strokeWidth={1.5} />
            <h3 className="text-2xl font-black text-white">{t.bossBattle.defeatTitle}</h3>
            <p className="text-sm text-stone-400">
              {format(t.bossBattle.defeatDesc, { bossName: resolvedBossName })}
            </p>
            <div className="grid grid-cols-2 gap-2 text-left pt-2">
              <Link
                href="/bai-hoc/dong-lenh-bon-lenh-dau-tien"
                className="p-3 rounded-sm bg-stone-900 border border-white/15 hover:border-brand-400 text-xs font-bold text-brand-300 transition-colors flex items-center justify-between"
              >
                <span>{t.bossBattle.reviewLesson4}</span>
                <span>→</span>
              </Link>
              <Link
                href="/bai-hoc/he-dieu-hanh-lam-gi"
                className="p-3 rounded-sm bg-stone-900 border border-white/15 hover:border-brand-400 text-xs font-bold text-brand-300 transition-colors flex items-center justify-between"
              >
                <span>{t.bossBattle.reviewLesson1}</span>
                <span>→</span>
              </Link>
            </div>
            <button
              onClick={onClose}
              className="w-full rounded-sm border border-white/15 px-4 py-3 text-sm font-bold text-white transition-colors hover:border-white/40 mt-4"
            >
              {t.bossBattle.retryButton}
            </button>
          </div>
        ) : (
          /* Question & Options */
          <div>
            <div className="flex items-center justify-between text-xs text-stone-400 mb-2 font-mono font-medium tabular-nums">
              <span>{format(t.bossBattle.questionCounter, { current: currentQuestionIndex + 1, max: maxQ })}</span>
              <span className="text-rose-400">{format(t.bossBattle.damageLabel, { dmg: dmgPerHit })}</span>
            </div>
            <h3 className="text-sm font-bold text-stone-100 bg-stone-900 p-4 rounded-md border border-white/10 mb-4">
              {currentQ?.prompt}
            </h3>

            <div className="space-y-2">
              {currentQ?.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const isCorrect = oIdx === currentQ.correct;

                let btnBg = "bg-stone-900 border-white/15 text-stone-200 hover:border-brand-400";
                if (selectedOption !== null) {
                  if (isSelected && isCorrect) btnBg = "bg-brand-950/40 border-brand-500 text-brand-300";
                  else if (isSelected && !isCorrect) btnBg = "bg-rose-950/40 border-rose-500 text-rose-300";
                }

                return (
                  <button
                    key={oIdx}
                    disabled={selectedOption !== null}
                    onClick={() => handleAnswer(oIdx)}
                    className={`w-full text-left text-xs font-medium p-3.5 rounded-sm border transition-colors ${btnBg}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>,
    document.body
  );
}
