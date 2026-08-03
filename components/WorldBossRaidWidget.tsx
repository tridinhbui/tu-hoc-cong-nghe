"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Flame, Trophy, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import FinanceCharacterAvatar, { CharacterEquipments } from "@/components/FinanceCharacterAvatar";
import { recalculateUserStats } from "@/lib/supabase-user";

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
const HIT_DAMAGE_MIN = 5000;
const HIT_DAMAGE_SPREAD = 2000;
function rollHitDamage(): number {
  return HIT_DAMAGE_MIN + Math.floor(Math.random() * HIT_DAMAGE_SPREAD);
}

export default function WorldBossRaidWidget({
  userId,
  userLevel = 1,
  equipments = {},
}: {
  userId: string;
  userLevel?: number;
  equipments?: CharacterEquipments;
}) {
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
    const hitDamage = isCorrect ? rollHitDamage() : 0;

    if (isCorrect) {
      setHitState("hit_boss");
      setLastDamageText(`💥 -${hitDamage.toLocaleString()} DMG!`);
      setSessionDamage((prev) => prev + hitDamage);
      setSessionScore((prev) => prev + 1);
      toast.success(`💥 Nổ sát thương Combo: +${hitDamage.toLocaleString()} DMG!`);
    } else {
      setHitState("hit_hero");
      setLastDamageText("⚠️ MISS! BOSS PHẢN CÔNG");
      setHeroHp((hp) => Math.max(0, hp - 34));
      toast.error("Hụt rồi! Boss phản công làm bạn mất 34 HP.");
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
              damageDealt: finalDamage,
              score: finalScore,
            }),
          });
          if (res.ok) {
            const result = await res.json();
            window.dispatchEvent(new CustomEvent("thtcdn:coin-updated", { detail: { coins: result.newCoins } }));
            void recalculateUserStats(userId);
            toast.success(`🎉 Tổng sát thương trận này: ${finalDamage.toLocaleString()} DMG! +${result.xpReward} XP & +${result.coinReward} Coins`);
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

  if (loading) return <div className="text-center p-4">Đang tải dữ liệu World Boss Server...</div>;
  if (!boss) return <div className="text-center p-4">Chưa mở sự kiện World Boss tuần này.</div>;

  const hpPercent = Math.max(0, Math.round((boss.current_hp / boss.max_hp) * 100));

  return (
    <div className="h-full min-h-0 bg-gradient-to-b from-white via-orange-50 to-red-50 border-2 border-red-200 rounded-3xl p-6 text-stone-900 shadow-[0_24px_80px_rgba(239,68,68,0.16)] relative overflow-hidden flex flex-col">
      {/* Visual background aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-red-500 via-orange-400 to-amber-300" />

      {/* Header World Boss Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-red-100 pb-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-4xl shadow-lg border border-orange-200 shrink-0">
            {boss.boss_emoji}
          </div>
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-red-700 bg-white border border-red-200 px-3 py-1 rounded-full shadow-sm">
              🔥 Server World Boss Event - Hàng Tuần
            </span>
            <h3 className="text-xl font-black text-stone-950 mt-1.5 flex items-center gap-2">
              {boss.name}
            </h3>
            <p className="text-xs text-stone-500 mt-1 max-w-lg leading-relaxed">
              {boss.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setShowBossGuide((prev) => !prev)}
            className="w-full sm:w-auto bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs px-4 py-3.5 rounded-2xl hover:bg-stone-200 cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
          >
            📖 Hướng dẫn săn Boss
          </button>

          <button
            onClick={handleStartRaid}
            className="w-full sm:w-auto bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 text-white font-black text-sm px-6 py-3.5 rounded-2xl shadow-[0_18px_40px_rgba(249,115,22,0.28)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 border border-orange-200 cursor-pointer shrink-0"
          >
            <Swords className="w-5 h-5 text-white" /> Săn Boss Server Ngay!
          </button>
        </div>
      </div>

      {/* World Boss How-to-Play Guide Box */}
      {showBossGuide && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border border-red-200 dark:border-red-900/50 text-xs text-stone-800 dark:text-stone-200 space-y-2">
          <h4 className="font-black text-sm text-red-700 dark:text-red-300 flex items-center gap-1.5">
            ⚔️ Thể lệ & Cách chơi Sự Kiện Săn Boss Server:
          </h4>
          <ul className="list-disc list-inside space-y-1 font-semibold text-stone-700 dark:text-stone-300">
            <li><strong>Thanh máu gộp 1,000,000 HP</strong>: Toàn bộ học viên trên toàn server cùng tấn công để rút máu World Boss.</li>
            <li><strong>Sát thương chiến đấu</strong>: Mỗi câu trả lời trắc nghiệm đúng gây 5,000 Sát thương + Bonus dựa trên tốc độ trả lời & cấp độ nhân vật.</li>
            <li><strong>Phản công của Boss</strong>: Trả lời sai sẽ bị Boss phản công trừ 25 HP của Nhân vật. Quá 3 câu sai trận đánh sẽ kết thúc.</li>
            <li><strong>Phần thưởng Bảng Xếp Hạng</strong>: Top 10 học viên gây sát thương cao nhất tuần nhận <strong>+500 Coins</strong> + <strong>Huy hiệu dũng sĩ săn Boss</strong>!</li>
          </ul>
        </div>
      )}

      {/* Shared Server HP Bar */}
      <div className="bg-white border border-red-100 rounded-2xl p-4 mb-6 space-y-2 shadow-sm">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-stone-700 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-red-500 animate-pulse" /> Thanh Máu Gộp Toàn Server:
          </span>
          <span className="text-red-600 font-extrabold">
            {boss.current_hp.toLocaleString()} / {boss.max_hp.toLocaleString()} HP ({hpPercent}%)
          </span>
        </div>
        <div className="w-full h-4 bg-red-100 rounded-full overflow-hidden border border-red-200 p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${hpPercent}%` }}
            className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-red-500 rounded-full transition-all duration-700 shadow-inner"
          />
        </div>
      </div>

      <div className="mt-5 rounded-[28px] border-2 border-amber-300 bg-white p-3 sm:p-4 shadow-xl flex-1 min-h-0 overflow-hidden">
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
                <div className="bg-white border border-orange-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                  <div>
                    <h4 className="text-xs font-black uppercase text-orange-600 mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Trang Bị Sẵn Sàng Săn Boss
                    </h4>
                    <div className="flex items-center gap-4 bg-gradient-to-br from-orange-50 to-white p-3 rounded-xl border border-orange-100">
                      <FinanceCharacterAvatar level={userLevel} equipments={equipments} size="sm" />
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">Sức Mạnh Nhân Vật</span>
                        <span className="text-[11px] text-stone-500">Level: <strong className="text-orange-600">Lv. {userLevel}</strong></span>
                        <p className="text-[10px] text-emerald-600 mt-1">
                          ⚡ Mỗi đáp án đúng gây ~5,000+ Sát thương Server!
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-3 py-2.5">
                        <span className="text-[10px] font-black uppercase text-amber-700 block">Số câu raid</span>
                        <span className="text-base font-black text-stone-900">{boss.questions.length} câu</span>
                      </div>
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-2.5">
                        <span className="text-[10px] font-black uppercase text-emerald-700 block">Max DMG/câu</span>
                        <span className="text-base font-black text-stone-900">~7,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-red-100 rounded-2xl p-4 shadow-sm">
                  <h4 className="text-xs font-black uppercase text-orange-600 mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-orange-500" /> Bảng Xếp Hạng Top Sát Thương Server</span>
                    <button onClick={fetchBossData} className="text-stone-400 hover:text-red-500" title="Làm mới"><RefreshCw className="w-3.5 h-3.5" /></button>
                  </h4>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {leaderboard.map((item) => (
                      <div key={item.rank} className="flex items-center justify-between bg-gradient-to-r from-white to-red-50 px-3 py-2 rounded-xl text-xs border border-red-100">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] ${
                            item.rank === 1 ? "bg-amber-400 text-amber-950" :
                            item.rank === 2 ? "bg-stone-300 text-stone-900" :
                            item.rank === 3 ? "bg-orange-500 text-white" :
                            "bg-red-100 text-red-500"
                          }`}>
                            {item.rank}
                          </span>
                          <span className="font-bold text-stone-800">{item.name}</span>
                        </div>
                        <span className="font-extrabold text-red-500">{item.totalDamage.toLocaleString()} DMG</span>
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
              className="bg-gradient-to-b from-white via-amber-50/70 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 max-w-2xl w-full h-full mx-auto text-stone-900 shadow-[0_22px_60px_rgba(245,158,11,0.16)] relative overflow-hidden flex flex-col"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400" />
              <div className="absolute -top-10 right-0 h-36 w-36 rounded-full bg-orange-200/35 blur-3xl pointer-events-none" />

              {/* Header bar */}
              <div className="relative z-10 flex items-center justify-between border-b border-amber-100 pb-3 mb-4">
                <span className="text-xs font-black tracking-wider text-orange-700 bg-white border border-orange-200 px-3 py-1 rounded-full shadow-sm">
                  ⚔️ BATTLE ARENA - CÂU {qIndex + 1}/{boss.questions.length}
                </span>
                <button
                  onClick={() => setInCombat(false)}
                  className="text-stone-500 hover:text-stone-900 text-xs font-bold bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-lg transition-colors border border-stone-200"
                >
                  ✕ Thoát
                </button>
              </div>

              {!combatFinished ? (
                <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                  {/* VS ARENA HEADER: HERO VS 3D WALL STREET BULL */}
                  <div className="bg-gradient-to-r from-amber-50 via-white to-orange-50 border border-amber-200 rounded-2xl p-3 sm:p-4 mb-4 relative overflow-hidden shadow-sm">
                    <div className="grid grid-cols-3 items-center gap-2">
                      {/* Left: Hero Warrior */}
                      <motion.div
                        animate={hitState === "hit_boss" ? { x: [0, 30, 0] } : hitState === "hit_hero" ? { x: [0, -15, 0], opacity: [1, 0.4, 1] } : {}}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center text-center"
                      >
                        <div className="relative">
                          <FinanceCharacterAvatar level={userLevel} equipments={equipments} size="sm" />
                          <span className="absolute -bottom-1 -right-1 text-[9px] font-black bg-emerald-500 text-white px-1.5 py-0.5 rounded-full shadow-xs">
                            Lv.{userLevel}
                          </span>
                        </div>
                        <span className="text-[11px] font-extrabold text-stone-800 mt-1 truncate max-w-full">Chiến Binh</span>
                        {/* Hero HP Bar */}
                        <div className="w-full bg-emerald-100 h-2 rounded-full overflow-hidden mt-1 border border-emerald-200">
                          <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300" style={{ width: `${heroHp}%` }} />
                        </div>
                        <span className="text-[9px] font-bold text-emerald-400 mt-0.5">{heroHp}/100 HP</span>
                      </motion.div>

                      {/* Center: VS & Damage Pop-up */}
                      <div className="flex flex-col items-center justify-center text-center relative">
                        <span className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-red-500 text-white font-black text-sm flex items-center justify-center shadow-lg border border-amber-200 animate-pulse">
                          VS
                        </span>
                        {lastDamageText && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            animate={{ opacity: 1, scale: 1.2, y: -10 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-3 font-black text-xs sm:text-sm text-red-600 bg-white border border-red-200 px-2.5 py-1 rounded-full shadow-xl whitespace-nowrap z-20"
                          >
                            {lastDamageText}
                          </motion.span>
                        )}
                        <span className="text-[9px] font-bold text-orange-600 mt-1">DMG: +{sessionDamage.toLocaleString()}</span>
                      </div>

                      {/* Right: 3D Wall Street Bull Boss */}
                      <motion.div
                        animate={hitState === "hit_boss" ? { x: [0, 15, -15, 0], filter: ["brightness(1)", "brightness(2) saturate(2)", "brightness(1)"] } : hitState === "hit_hero" ? { x: [0, -30, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center text-center"
                      >
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                          <Image
                            src="/boss-wallstreet-bull.png"
                            alt="Wall Street bull boss"
                            width={80}
                            height={80}
                            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                          />
                        </div>
                        <span className="text-[11px] font-extrabold text-orange-700 mt-0.5 truncate max-w-full">Trâu Phố Wall 3D</span>
                        {/* Boss HP Bar */}
                        <div className="w-full bg-red-100 h-2 rounded-full overflow-hidden mt-1 border border-red-200">
                          <div className="bg-gradient-to-r from-red-600 via-amber-500 to-red-500 h-full transition-all duration-500" style={{ width: `${hpPercent}%` }} />
                        </div>
                        <span className="text-[9px] font-bold text-red-400 mt-0.5">{hpPercent}% HP</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <h3 className="text-sm font-bold bg-white p-4 rounded-2xl border border-amber-200 mb-4 leading-relaxed text-stone-900 shadow-sm">
                    {boss.questions[qIndex]?.prompt}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {boss.questions[qIndex]?.options.map((opt, oIdx) => {
                      const isSelected = selectedOpt === oIdx;
                      const isCorrect = oIdx === boss.questions[qIndex].correct;
                      let bg = "bg-white border-stone-200 hover:border-amber-400 hover:bg-amber-50/60 text-stone-700";
                      if (selectedOpt !== null) {
                        if (isSelected && isCorrect) bg = "bg-emerald-50 border-emerald-400 text-emerald-700 font-bold shadow-sm";
                        else if (isSelected && !isCorrect) bg = "bg-red-50 border-red-400 text-red-700 font-bold shadow-sm";
                        else if (isCorrect) bg = "bg-emerald-50/70 border-emerald-200 text-emerald-700";
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={selectedOpt !== null}
                          onClick={() => handleAnswerSelect(oIdx)}
                          className={`w-full text-left text-xs sm:text-sm font-semibold p-3.5 rounded-xl border-2 transition-all flex items-center justify-between gap-2 shadow-sm ${bg}`}
                        >
                          <span>{opt}</span>
                          {selectedOpt !== null && isCorrect && <span className="text-emerald-400 font-bold">✓</span>}
                          {selectedOpt !== null && isSelected && !isCorrect && <span className="text-red-400 font-bold">✕</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <Trophy className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-black text-orange-600">KẾT THÚC ĐỢT SĂN BOSS!</h3>
                  <p className="text-sm text-stone-600">
                    Bạn đã đóng góp tổng cộng <strong className="text-orange-600 text-base">+{sessionDamage.toLocaleString()} DMG</strong> vào Thanh Máu Server!
                  </p>
                  <button
                    onClick={() => setInCombat(false)}
                    className="w-full bg-gradient-to-r from-amber-500 to-red-600 text-white font-black py-3.5 rounded-xl hover:brightness-110 transition-all shadow-lg"
                  >
                    Đóng & Xem Bảng Xếp Hạng
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
