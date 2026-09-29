"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Flame, Trophy, ShieldAlert, RefreshCw } from "lucide-react";
import Glyph from "@/components/Glyph";
import { toast } from "sonner";
import TechCharacterAvatar, { CharacterEquipments } from "@/components/TechCharacterAvatar";
import { recalculateUserStats } from "@/lib/cloudflare-user";
import { DAMAGE_PER_CORRECT, bossHpPercent } from "@/lib/world-boss";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { translateApiError, ApiError } from "@/lib/api-error-code";
import { btnPrimary, btnSecondary, panel, SectionHead } from "@/components/ui/system";

/* i18n-ignore-start: định danh hệ thống, không phải chữ hiển thị */
const SYS = {
  boss: "THCN://GAME/WORLD-BOSS",
};
/* i18n-ignore-end */

interface BossQuestion {
  prompt: string;
  options: string[];
  correct: number;
}

interface WorldBoss {
  id: string;
  name: string;
  description: string;
  boss_emoji: string;
  max_hp: number;
  current_hp: number;
  questions: BossQuestion[];
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  totalDamage: number;
  avatarUrl: string | null;
}

/** Sát thương một đòn đánh trúng: 5.000 tới 6.999.
 *
 *  Để ngoài thân component vì React Compiler đọc mọi hàm khai bên trong như
 *  thể nó có thể chạy lúc render, nên chặn Math.random() ở đó - dù hàm này
 *  chỉ chạy khi người chơi bấm một đáp án.
 */
// Sát thương mỗi câu đúng lấy từ lib/world-boss, đúng con số máy chủ dùng.
// Bản cũ quay ngẫu nhiên 5.000-7.000 ở đây và máy chủ tính `score * 1000`, nên
// người chơi được khoe một tổng lớn gấp năm lần thứ thực sự trừ vào thanh máu.


export default function WorldBossRaidWidget({
  userId,
  userLevel = 1,
  equipments = {},
}: {
  userId: string;
  userLevel?: number;
  equipments?: CharacterEquipments;
}) {
  const { t } = useI18n();
  const [boss, setBoss] = useState<WorldBoss | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [inCombat, setInCombat] = useState(false);
  const [showBossGuide, setShowBossGuide] = useState(false);
  
  // Combat State
  const [qIndex, setQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [sessionDamage, setSessionDamage] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [combatFinished, setCombatFinished] = useState(false);

  const fetchBossData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/world-boss");
      if (res.ok) {
        const data = await res.json();
        setBoss(data.boss);
        setLeaderboard(data.leaderboard || []);
      }
    } catch (err) {
      console.error("Error fetching World Boss data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBossData();
  }, []);

  // Attack Animation States
  const [hitState, setHitState] = useState<"idle" | "hit_boss" | "hit_hero">("idle");
  const [lastDamageText, setLastDamageText] = useState<string | null>(null);
  const [heroHp, setHeroHp] = useState(100);

  const handleStartRaid = () => {
    // KHÔNG vào đấu trường khi không có câu hỏi nào.
    //
    // Trước đây `setInCombat(true)` chạy vô điều kiện, và phép kiểm ngay dưới -
    // `if (boss?.questions)` - chỉ gác phần xáo lại thứ tự: một mảng RỖNG vẫn
    // là truthy, nên nó xáo không có gì rồi đi tiếp. Đấu trường mở ra với tiêu
    // đề "CÂU 1/0", một ô trắng chỗ đề bài, và không nút nào - vì
    // `boss.questions[qIndex]?.prompt` và `?.options.map` đều lặng lẽ vẽ ra
    // rỗng. Dấu `?.` ở đó để tránh sập, và nó đã đổi một cú sập lấy một màn
    // hình trắng không giải thích gì.
    //
    // Người dùng báo đúng ba triệu chứng ấy: không hiện nội dung, không có nút,
    // không có thông báo. Cái thứ ba là cái tệ nhất - hai cái đầu còn đoán được
    // là hỏng, cái thứ ba làm người ta tưởng mình bấm sai.
    if (!boss?.questions?.length) {
      toast.error(t.worldBoss.noQuestions);
      return;
    }

    // Client-side option reshuffling safeguard to guarantee answer positions A, B, C are randomly distributed
    if (boss?.questions) {
      const reshuffledQuestions = boss.questions.map((q) => {
        const order = q.options.map((_, i) => i).sort(() => Math.random() - 0.5);
        const correct = order.indexOf(q.correct);
        return {
          ...q,
          options: order.map((i) => q.options[i]),
          correct,
        };
      }).sort(() => Math.random() - 0.5);

      setBoss({
        ...boss,
        questions: reshuffledQuestions,
      });
    }

    setInCombat(true);
    setQIndex(0);
    setSelectedOpt(null);
    setSessionDamage(0);
    setSessionScore(0);
    setCombatFinished(false);
    setHitState("idle");
    setLastDamageText(null);
    setHeroHp(100);
  };

  const handleAnswerSelect = async (optionIndex: number) => {
    if (!boss || selectedOpt !== null) return;
    setSelectedOpt(optionIndex);

    const q = boss.questions[qIndex];
    const isCorrect = optionIndex === q.correct;
    const hitDamage = isCorrect ? DAMAGE_PER_CORRECT : 0;

    if (isCorrect) {
      setHitState("hit_boss");
      setLastDamageText(format(t.miscUi.worldBossRaidWidget.hitDamage, { damage: hitDamage.toLocaleString() }));
      setSessionDamage((prev) => prev + hitDamage);
      setSessionScore((prev) => prev + 1);
      toast.success(format(t.miscUi.worldBossRaidWidget.comboDamage, { damage: hitDamage.toLocaleString() }));
    } else {
      setHitState("hit_hero");
      setLastDamageText(t.miscUi.worldBossRaidWidget.missCounterattack);
      setHeroHp((hp) => Math.max(0, hp - 34));
      toast.error(t.worldBoss.counterattack);
    }

    setTimeout(async () => {
      setHitState("idle");
      setLastDamageText(null);

      if (qIndex + 1 >= boss.questions.length) {
        // Kết thúc trận Raid
        const finalDamage = sessionDamage + hitDamage;
        const finalScore = sessionScore + (isCorrect ? 1 : 0);

        setCombatFinished(true);

        // Nộp dữ liệu về API
        try {
          const res = await fetch("/api/world-boss", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bossId: boss.id,
              score: finalScore,
            }),
          });
          if (!res.ok) {
            // Im lặng ở đây là lý do lỗi cũ sống lâu: đánh xong, được chúc
            // mừng, và không có gì thay đổi.
            const detail = await res.json().catch(() => null);
            toast.error(
              translateApiError(t, new ApiError("", detail?.code)) ?? t.miscUi.worldBossRaidWidget.submitFailedError
            );
          } else {
            const result = await res.json();
            window.dispatchEvent(new CustomEvent("thtcdn:coin-updated", { detail: { coins: result.newCoins } }));
            void recalculateUserStats(userId);
            // Con số của MÁY CHỦ, không phải tổng cộng dồn ở đây: chỉ nó mới
            // là thứ thực sự trừ vào thanh máu.
            setSessionDamage(result.damageDealt ?? finalDamage);
            toast.success(
              format(t.miscUi.worldBossRaidWidget.raidSummary, {
                damage: (result.damageDealt ?? finalDamage).toLocaleString(),
                xp: result.xpReward,
                coins: result.coinReward,
              })
            );
            fetchBossData();
          }
        } catch (error) {
          console.error("Error submitting raid damage:", error);
        }
      } else {
        setQIndex((prev) => prev + 1);
        setSelectedOpt(null);
      }
    }, 1300);
  };

  if (loading) return <div className="text-center p-4">{t.worldBoss.loading}</div>;
  if (!boss) return <div className="text-center p-4">{t.worldBoss.noEvent}</div>;

  const hpPercent = bossHpPercent(boss.current_hp, boss.max_hp);

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-md border border-line-strong bg-white p-6 text-ink dark:border-stone-700 dark:bg-stone-900">
      {/* Header World Boss Banner */}
      <div className="mb-6 flex flex-col items-start justify-between gap-6 border-b border-stone-300 pb-6 md:flex-row md:items-end dark:border-stone-700">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface-raised text-rose-600 dark:border-stone-700 dark:bg-stone-950 dark:text-rose-400">
            <Glyph emoji={boss.boss_emoji} className="w-7 h-7" strokeWidth={1.5} />
          </div>
          <SectionHead
            code={SYS.boss}
            eyebrow={t.worldBoss.eventTitle}
            title={boss.name}
            sub={boss.description}
            size="sm"
            className="min-w-0 flex-1"
          />
        </div>

        <div className="flex w-full flex-col items-center gap-2 sm:flex-row md:w-auto">
          <button
            onClick={() => setShowBossGuide((prev) => !prev)}
            className={`${btnSecondary} w-full shrink-0 sm:w-auto`}
          >
            {t.worldBoss.guideToggle}
          </button>

          <button
            onClick={handleStartRaid}
            className={`${btnPrimary} w-full shrink-0 sm:w-auto`}
          >
            <Swords className="w-4 h-4" /> {t.worldBoss.huntNow}
          </button>
        </div>
      </div>

      {/* World Boss How-to-Play Guide Box */}
      {showBossGuide && (
        <div className="mb-6 space-y-2 rounded-md border border-line-strong bg-page p-4 text-xs text-ink-heading dark:border-stone-700 dark:bg-stone-950">
          <h4 className="flex items-center gap-1.5 text-sm font-black text-ink-max">
            {t.worldBoss.rulesTitle}
          </h4>
          <ul className="list-disc list-inside space-y-1 font-semibold text-ink-body">
            <li><strong>{t.worldBoss.rule1Label}</strong>: {t.worldBoss.rule1Body}</li>
            <li><strong>{t.worldBoss.rule2Label}</strong>: {t.worldBoss.rule2Body}</li>
            <li><strong>{t.worldBoss.rule3Label}</strong>: {t.worldBoss.rule3Body}</li>
            <li>
              <strong>{t.worldBoss.rule4Label}</strong>: {t.worldBoss.rule4BodyPart1}
              <strong>{t.worldBoss.rule4Coins}</strong>
              {t.worldBoss.rule4BodyPart2}
              <strong>{t.worldBoss.rule4Badge}</strong>
              {t.worldBoss.rule4BodyPart3}
            </li>
          </ul>
        </div>
      )}

      {/* Shared Server HP Bar */}
      <div className="mb-6 space-y-2 rounded-md border border-line-strong bg-page p-4 dark:border-stone-700 dark:bg-stone-950">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
          <span className="flex items-center gap-1.5 text-ink-body">
            <Flame className="w-4 h-4 text-alert" /> {t.worldBoss.serverHpLabel}
          </span>
          <span className="font-mono tabular-nums text-alert-strong">
            {format(t.worldBoss.hpLine, { current: boss.current_hp.toLocaleString(), max: boss.max_hp.toLocaleString(), percent: hpPercent })}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-xs border border-line-strong bg-stone-100 dark:border-stone-700 dark:bg-stone-900">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${hpPercent}%` }}
            className="h-full bg-rose-600 transition-all duration-700 dark:bg-rose-500"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden rounded-md border border-line-strong bg-white p-3 sm:p-4 dark:border-stone-700 dark:bg-stone-900">
        <AnimatePresence mode="wait">
          {!inCombat ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="h-full min-h-0 overflow-y-auto pr-1"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${panel} flex flex-col justify-between p-4`}>
                  <div>
                    <h4 className="mb-3 flex items-center gap-1.5 text-xs font-black uppercase text-ink-soft">
                      {t.worldBoss.gearTitle}
                    </h4>
                    <div className="flex items-center gap-4 rounded-md border border-line-strong bg-page p-3 dark:border-stone-700 dark:bg-stone-950">
                      <TechCharacterAvatar level={userLevel} equipments={equipments} size="sm" />
                      <div>
                        <span className="block text-xs font-bold text-ink-max">{t.worldBoss.heroPower}</span>
                        <span className="text-[11px] text-ink-muted">{t.worldBoss.levelPrefix}<strong className="font-mono tabular-nums text-ink-max">{format(t.worldBoss.levelValue, { level: userLevel })}</strong></span>
                        <p className="mt-1 text-[10px] text-ink-soft">
                          {t.worldBoss.damagePerAnswer}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-sm border border-line-strong px-3 py-2.5 dark:border-stone-700">
                        <span className="block text-[10px] font-black uppercase text-ink-muted">{t.worldBoss.raidQuestionCount}</span>
                        <span className="text-base font-black text-ink-max">{format(t.worldBoss.questionCount, { count: boss.questions.length })}</span>
                      </div>
                      <div className="rounded-sm border border-line-strong px-3 py-2.5 dark:border-stone-700">
                        <span className="block text-[10px] font-black uppercase text-ink-muted">{t.worldBoss.maxDamagePerQuestion}</span>
                        <span className="font-mono text-base font-medium tabular-nums text-alert-strong">{DAMAGE_PER_CORRECT.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${panel} p-4`}>
                  <h4 className="mb-3 flex items-center justify-between border-b border-stone-300 pb-2 text-xs font-black uppercase text-ink-soft dark:border-stone-700">
                    <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-ink-muted" /> {t.worldBoss.leaderboardTitle}</span>
                    <button onClick={fetchBossData} className="text-ink-faint hover:text-accent-strong" title={t.worldBoss.refreshTitle}><RefreshCw className="w-3.5 h-3.5" /></button>
                  </h4>

                  <div className="max-h-56 divide-y divide-stone-200 overflow-y-auto pr-1 dark:divide-stone-800">
                    {leaderboard.map((item) => (
                      <div key={item.rank} className="flex items-center justify-between py-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`flex h-5 w-5 items-center justify-center rounded-xs font-mono text-[10px] font-bold tabular-nums ${
                            item.rank <= 3
                              ? "bg-stone-950 text-white dark:bg-stone-100 dark:text-stone-950"
                              : "border border-line-strong text-ink-muted dark:border-stone-700"
                          }`}>
                            {item.rank}
                          </span>
                          <span className="font-bold text-ink">{item.name}</span>
                        </div>
                        <span className="font-mono font-medium tabular-nums text-alert-strong">{format(t.worldBoss.damageValue, { value: item.totalDamage.toLocaleString() })}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="combat"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative mx-auto flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-md border border-stone-800 bg-stone-950 p-5 text-stone-100 sm:p-6"
            >
              {/* Header bar */}
              <div className="relative z-10 mb-4 flex items-center justify-between border-b border-white/15 pb-3">
                <span className="font-mono text-xs font-medium tabular-nums text-stone-300">
                  {format(t.worldBoss.arenaTitle, { current: qIndex + 1, total: boss.questions.length })}
                </span>
                <button
                  onClick={() => setInCombat(false)}
                  className="rounded-sm border border-white/15 px-2.5 py-1 text-xs font-bold text-stone-300 transition-colors hover:border-white/40 hover:text-white"
                >
                  {t.worldBoss.exit}
                </button>
              </div>

              {!combatFinished ? (
                <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                  {/* VS ARENA HEADER: HERO VS BOSS */}
                  <div className="relative mb-4 overflow-hidden rounded-md border border-white/10 bg-stone-900 p-3 sm:p-4">
                    <div className="grid grid-cols-3 items-center gap-2">
                      {/* Left: Hero Warrior */}
                      <motion.div
                        animate={hitState === "hit_boss" ? { x: [0, 30, 0] } : hitState === "hit_hero" ? { x: [0, -15, 0], opacity: [1, 0.4, 1] } : {}}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center text-center"
                      >
                        <div className="relative">
                          <TechCharacterAvatar level={userLevel} equipments={equipments} size="sm" />
                          <span className="absolute -bottom-1 -right-1 rounded-xs border border-white/15 bg-stone-950 px-1.5 py-0.5 font-mono text-[9px] font-medium tabular-nums text-white">
                            {format(t.worldBoss.levelShort, { level: userLevel })}
                          </span>
                        </div>
                        <span className="mt-1 max-w-full truncate text-[11px] font-extrabold text-stone-200">{t.worldBoss.heroName}</span>
                        {/* Hero HP Bar */}
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-xs border border-white/15 bg-stone-950">
                          <div className="h-full bg-brand-500 transition-all duration-300" style={{ width: `${heroHp}%` }} />
                        </div>
                        <span className="mt-0.5 font-mono text-[9px] font-medium tabular-nums text-stone-400">{format(t.worldBoss.heroHp, { hp: heroHp })}</span>
                      </motion.div>

                      {/* Center: VS & Damage Pop-up */}
                      <div className="relative flex flex-col items-center justify-center text-center">
                        <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 text-sm font-black text-stone-300">
                          {t.worldBoss.vs}
                        </span>
                        {lastDamageText && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            animate={{ opacity: 1, scale: 1.2, y: -10 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-3 z-20 whitespace-nowrap rounded-sm border border-rose-500/60 bg-stone-950 px-2.5 py-1 font-mono text-xs font-bold tabular-nums text-rose-400 sm:text-sm"
                          >
                            {lastDamageText}
                          </motion.span>
                        )}
                        <span className="mt-1 font-mono text-[9px] font-medium tabular-nums text-stone-400">{format(t.worldBoss.sessionDamage, { value: sessionDamage.toLocaleString() })}</span>
                      </div>

                      {/* Right: 3D boss */}
                      <motion.div
                        animate={hitState === "hit_boss" ? { x: [0, 15, -15, 0], filter: ["brightness(1)", "brightness(2) saturate(2)", "brightness(1)"] } : hitState === "hit_hero" ? { x: [0, -30, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center text-center"
                      >
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                          <Image
                            src="/boss-server-outage.svg"
                            alt={t.worldBoss.bossAlt}
                            width={80}
                            height={80}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="mt-0.5 max-w-full truncate text-[11px] font-extrabold text-stone-200">{t.worldBoss.bossName}</span>
                        {/* Boss HP Bar */}
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-xs border border-white/15 bg-stone-950">
                          <div className="h-full bg-rose-600 transition-all duration-500" style={{ width: `${hpPercent}%` }} />
                        </div>
                        <span className="mt-0.5 font-mono text-[9px] font-medium tabular-nums text-rose-400">{format(t.worldBoss.bossHpPercent, { percent: hpPercent })}</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Lưới thứ hai. Chặn ở handleStartRaid là đủ cho lối vào,
                      nhưng câu hỏi cũng có thể biến mất GIỮA phiên - một lượt
                      tải lại boss trả về rỗng chẳng hạn - và khi đó `?.` bên
                      dưới lại vẽ ra một màn hình trắng im lặng. Nói thẳng ra
                      vẫn hơn. */}
                  {!boss.questions[qIndex] && (
                    <p className="mb-4 rounded-md border border-white/10 bg-stone-900 p-4 text-sm font-bold leading-relaxed text-stone-100">
                      {t.worldBoss.noQuestions}
                    </p>
                  )}

                  {/* Question Prompt */}
                  {boss.questions[qIndex] && (
                  <h3 className="mb-4 rounded-md border border-white/10 bg-stone-900 p-4 text-sm font-bold leading-relaxed text-stone-100">
                    {boss.questions[qIndex]?.prompt}
                  </h3>
                  )}

                  {/* Options */}
                  <div className="space-y-2">
                    {boss.questions[qIndex]?.options.map((opt, oIdx) => {
                      const isSelected = selectedOpt === oIdx;
                      const isCorrect = oIdx === boss.questions[qIndex].correct;
                      let bg = "border-white/15 bg-stone-900 text-stone-200 hover:border-brand-400";
                      if (selectedOpt !== null) {
                        if (isSelected && isCorrect) bg = "border-brand-500 bg-brand-950/40 text-brand-300 font-bold";
                        else if (isSelected && !isCorrect) bg = "border-rose-500 bg-rose-950/40 text-rose-300 font-bold";
                        else if (isCorrect) bg = "border-brand-700 bg-stone-900 text-brand-300";
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={selectedOpt !== null}
                          onClick={() => handleAnswerSelect(oIdx)}
                          className={`flex w-full items-center justify-between gap-2 rounded-sm border p-3.5 text-left text-xs font-semibold transition-colors sm:text-sm ${bg}`}
                        >
                          <span>{opt}</span>
                          {selectedOpt !== null && isCorrect && <span className="font-bold text-brand-400">✓</span>}
                          {selectedOpt !== null && isSelected && !isCorrect && <span className="font-bold text-rose-400">✕</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <Trophy className="mx-auto h-14 w-14 text-stone-300" strokeWidth={1.5} />
                  <h3 className="text-2xl font-black text-white">{t.worldBoss.doneTitle}</h3>
                  <p className="text-sm text-stone-300">
                    {t.worldBoss.donePart1}
                    <strong className="font-mono text-base tabular-nums text-rose-400">{format(t.worldBoss.doneDamage, { value: sessionDamage.toLocaleString() })}</strong>
                    {t.worldBoss.donePart2}
                  </p>
                  <button
                    onClick={() => setInCombat(false)}
                    className="w-full rounded-sm bg-white px-4 py-3 text-sm font-bold text-stone-950 transition-colors hover:bg-brand-300"
                  >
                    {t.worldBoss.closeAndSeeBoard}
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
