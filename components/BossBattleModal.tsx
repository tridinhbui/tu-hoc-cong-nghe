"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Heart, ShieldAlert, Trophy, Sparkles, X } from "lucide-react";
import FinanceCharacterAvatar, { CharacterEquipments } from "@/components/FinanceCharacterAvatar";
import GoldCoinIcon from "@/components/GoldCoinIcon";

interface BossQuestion {
  prompt: string;
  options: string[];
  correct: number;
}

const DEFAULT_BOSS_QUESTIONS: BossQuestion[] = [
  {
    prompt: "Khủng hoảng nợ dưới chuẩn (Subprime Mortgage) năm 2008 khởi nguồn chính từ đâu?",
    options: ["Nợ xấu chứng khoán hóa quá đà & Định giá tín nhiệm sai lầm", "Giá dầu mỏ giảm đột ngột", "Lạm phát tiền tệ ở Châu Âu"],
    correct: 0,
  },
  {
    prompt: "Chỉ số EBITDA đo lường điều gì trong phân tích tài chính doanh nghiệp?",
    options: ["Lợi nhuận trước thuế, lãi vay và khấu hao", "Tổng tài sản ngắn hạn trừ nợ ngắn hạn", "Dòng tiền cổ tức thực thu"],
    correct: 0,
  },
  {
    prompt: "Đòn bẩy tài chính (Financial Leverage) tác động như thế nào đến ROE?",
    options: ["Khuếch đại tỷ suất sinh lời trên vốn CSH nhưng gia tăng rủi ro", "Luôn làm giảm ROE trong mọi trường hợp", "Không ảnh hưởng tới ROE"],
    correct: 0,
  },
];

interface BossBattleModalProps {
  bossName?: string;
  bossEmoji?: string;
  userLevel: number;
  equipments?: CharacterEquipments;
  questions?: BossQuestion[];
  completedLessonCount?: number;
  onVictory?: (rewards: { xp: number; coins: number }) => void;
  onClose: () => void;
}

export default function BossBattleModal({
  bossName = "Trâu Phố Wall 3D",
  bossEmoji = "🐂",
  userLevel,
  equipments = {},
  questions = DEFAULT_BOSS_QUESTIONS,
  completedLessonCount = 0,
  onVictory,
  onClose,
}: BossBattleModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bossHp, setBossHp] = useState(100);
  const [heroHp, setHeroHp] = useState(100);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [battleState, setBattleState] = useState<"fighting" | "hit_boss" | "hit_hero" | "victory" | "defeat">("fighting");

  const shuffledQuestions = React.useMemo(() => {
    return questions.map((q) => {
      const order = q.options.map((_, i) => i).sort(() => Math.random() - 0.5);
      const correct = order.indexOf(q.correct);
      return {
        ...q,
        options: order.map((i) => q.options[i]),
        correct,
      };
    }).sort(() => Math.random() - 0.5);
  }, [questions]);

  const currentQ = shuffledQuestions[currentQuestionIndex] || questions[currentQuestionIndex];
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
          onVictory?.({ xp: 300, coins: 100 });
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
            onVictory?.({ xp: 200, coins: 50 });
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

  return (
    <div className="fixed inset-0 bg-stone-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-stone-900 border-2 border-amber-500/50 rounded-3xl p-6 max-w-xl w-full text-white shadow-2xl relative overflow-hidden"
      >
        {/* Header Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Arena Header: Hero vs Boss */}
        <div className="text-center border-b border-stone-800 pb-4 mb-6">
          <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800">
            Financial RPG Arena - Boss Battle
          </span>
          <h2 className="text-xl font-black mt-2 flex items-center justify-center gap-2">
            <Swords className="w-5 h-5 text-rose-500" /> Trận Đấu: {bossName}
          </h2>
        </div>

        {/* Battle Battlefield (HP Bars & Avatars) */}
        <div className="grid grid-cols-2 gap-4 items-center justify-between bg-stone-950/60 border border-stone-800 rounded-2xl p-4 mb-6">
          {/* Hero Side */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-emerald-400 mb-1">Chiến Binh Tài Chính</span>
            <motion.div animate={battleState === "hit_hero" ? { x: [-10, 10, -10, 0] } : {}}>
              <FinanceCharacterAvatar level={userLevel} equipments={equipments} size="sm" />
            </motion.div>
            
            {/* Hero HP */}
            <div className="w-full bg-stone-800 h-3 rounded-full mt-3 overflow-hidden border border-stone-700">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${heroHp}%` }}
              />
            </div>
            <span className="text-[10px] text-stone-400 mt-1 flex items-center gap-1 font-bold">
              <Heart className="w-3 h-3 text-rose-500 fill-current" /> {heroHp} HP
            </span>
          </div>

          {/* Boss Side */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-amber-400 mb-1">{bossName}</span>
            <motion.div
              animate={battleState === "hit_boss" ? { scale: [1, 1.2, 0.9, 1], rotate: [0, -10, 10, 0], filter: ["brightness(1)", "brightness(2) saturate(2)", "brightness(1)"] } : {}}
              className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center"
            >
              <Image
                src="/boss-wallstreet-bull.png"
                alt="Wall Street bull boss"
                width={112}
                height={112}
                className="w-full h-full object-contain drop-shadow-[0_0_18px_rgba(245,158,11,0.6)]"
              />
              {battleState === "hit_boss" && (
                <span className="absolute -top-3 text-amber-300 bg-red-950/90 border border-amber-500 font-black text-xs px-2 py-0.5 rounded-full animate-bounce whitespace-nowrap shadow-xl z-20">
                  💥 -{dmgPerHit} HP
                </span>
              )}
            </motion.div>

            {/* Boss HP */}
            <div className="w-full bg-stone-800 h-3 rounded-full mt-3 overflow-hidden border border-stone-700">
              <div
                className="bg-rose-500 h-full transition-all duration-500"
                style={{ width: `${bossHp}%` }}
              />
            </div>
            <span className="text-[10px] text-stone-400 mt-1 flex items-center gap-1 font-bold">
              <ShieldAlert className="w-3 h-3 text-rose-500" /> {bossHp} HP
            </span>
          </div>
        </div>

        {/* Victory Screen */}
        {battleState === "victory" ? (
          <div className="text-center py-6 space-y-4">
            <Trophy className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-black text-amber-400">CHIẾN THẮNG RỰC RỠ!</h3>
            <p className="text-sm text-stone-300">
              Bạn đã hạ gục {bossName} và bảo vệ an toàn danh mục tài chính!
            </p>
            <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 inline-flex items-center gap-1.5">
              <span className="text-sm font-black text-amber-300 flex items-center gap-1">
                🎁 Thưởng trận đấu: +300 XP & <GoldCoinIcon className="w-4 h-4" /> +100 Coins
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-black py-3.5 rounded-xl shadow-lg hover:brightness-110 transition-all mt-4"
            >
              Nhận Thưởng & Thu Trận
            </button>
          </div>
        ) : battleState === "defeat" ? (
          <div className="text-center py-6 space-y-4">
            <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto animate-pulse" />
            <h3 className="text-2xl font-black text-rose-400">THẤT BẠI TRONG TRẬN ĐẤU!</h3>
            <p className="text-sm text-stone-400">
              {bossName} quá mạnh. Hãy ôn lại bài học kiến thức lý thuyết để củng cố lỗ hổng trước khi phục thù!
            </p>
            <div className="grid grid-cols-2 gap-2 text-left pt-2">
              <a
                href="/bai-hoc/dong-tien"
                className="p-3 rounded-xl bg-stone-800 border border-stone-700 hover:border-amber-500 text-xs font-bold text-amber-400 transition-all flex items-center justify-between"
              >
                <span>📖 Day 4: Dòng tiền là gì?</span>
                <span>→</span>
              </a>
              <a
                href="/bai-hoc/tai-chinh-la-gi"
                className="p-3 rounded-xl bg-stone-800 border border-stone-700 hover:border-amber-500 text-xs font-bold text-amber-400 transition-all flex items-center justify-between"
              >
                <span>📖 Day 1: Tài chính là gì?</span>
                <span>→</span>
              </a>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-stone-800 text-white font-bold py-3.5 rounded-xl hover:bg-stone-700 transition-all mt-4"
            >
              Thử Lại Sau Khi Ôn Tập
            </button>
          </div>
        ) : (
          /* Question & Options */
          <div>
            <div className="flex items-center justify-between text-xs text-stone-400 mb-2 font-bold">
              <span>Tấn công bằng câu hỏi {currentQuestionIndex + 1}/{maxQ}</span>
              <span className="text-amber-400">Gây sát thương: {dmgPerHit} HP</span>
            </div>
            <h3 className="text-sm font-bold text-stone-100 bg-stone-950/60 p-4 rounded-xl border border-stone-800 mb-4">
              {currentQ?.prompt}
            </h3>

            <div className="space-y-2">
              {currentQ?.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const isCorrect = oIdx === currentQ.correct;

                let btnBg = "bg-stone-800 border-stone-800 hover:border-amber-500/50";
                if (selectedOption !== null) {
                  if (isSelected && isCorrect) btnBg = "bg-emerald-950/60 border-emerald-500 text-emerald-300";
                  else if (isSelected && !isCorrect) btnBg = "bg-rose-950/60 border-rose-500 text-rose-300";
                }

                return (
                  <button
                    key={oIdx}
                    disabled={selectedOption !== null}
                    onClick={() => handleAnswer(oIdx)}
                    className={`w-full text-left text-xs font-medium p-3.5 rounded-xl border transition-all ${btnBg}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
