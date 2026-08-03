"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, TrendingUp, ShieldAlert, Sparkles, Trophy, RotateCcw, DollarSign, Award, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { toast } from "sonner";
import { soundManager } from "@/lib/sounds";
import { recalculateUserStats } from "@/lib/supabase-user";
import { recordCustomGameSession } from "@/lib/games";
import { useIsClient } from "@/lib/use-is-client";

interface Strategy {
  id: "safe" | "balanced font" | "growth" | "leveraged";
  name: string;
  emoji: string;
  baseReturn: number; // e.g. 0.08
  volatility: number; // e.g. 0.05
  desc: string;
}

const STRATEGIES: { id: string; name: string; emoji: string; baseReturn: number; volatility: number; desc: string }[] = [
  {
    id: "safe",
    name: "Tiết kiệm & Trái phiếu",
    emoji: "🏦",
    baseReturn: 0.07,
    volatility: 0.02,
    desc: "Lợi suất 7%/năm, rủi ro cực thấp, an toàn như thạch."
  },
  {
    id: "balanced",
    name: "Danh mục Cân bằng",
    emoji: "⚖️",
    baseReturn: 0.14,
    volatility: 0.08,
    desc: "Lợi suất 14%/năm, tăng trưởng ổn định theo VN30."
  },
  {
    id: "growth",
    name: "Cổ phiếu Tăng trưởng",
    emoji: "🚀",
    baseReturn: 0.24,
    volatility: 0.16,
    desc: "Lợi suất 24%/năm, đòn bẩy tuyết lăn cấp số nhân."
  },
  {
    id: "leveraged",
    name: "Tài sản Đòn bẩy High-Beta",
    emoji: "💎",
    baseReturn: 0.45,
    volatility: 0.35,
    desc: "Lợi suất tới 45%/năm nhưng biến động dữ dội."
  }
];

interface MarketEvent {
  name: string;
  emoji: string;
  impactMultiplier: number; // e.g. 1.25 or 0.8
  desc: string;
}

const MARKET_EVENTS: MarketEvent[] = [
  { name: "Sóng công nghệ AI bùng nổ", emoji: "🚀", impactMultiplier: 1.3, desc: "Toàn bộ danh mục tăng trưởng vượt bậc +30%!" },
  { name: "Cơn bão Lạm phát toàn cầu", emoji: "🌪️", impactMultiplier: 0.85, desc: "Lãi suất điều hành tăng làm tài sản chiết khấu -15%." },
  { name: "Chính phủ tung gói kích cầu", emoji: "💵", impactMultiplier: 1.2, desc: "Dòng tiền bơm mạnh vào thị trường +20%." },
  { name: "Khủng hoảng thanh khoản ngắn hạn", emoji: "📉", impactMultiplier: 0.8, desc: "Thị trường điều chỉnh mạnh -20%." },
  { name: "Thưởng cổ tức đặc biệt", emoji: "🎁", impactMultiplier: 1.15, desc: "Cổ tức tiền mặt dồi dào giúp tuyết lăn nhanh hơn +15%." }
];

interface QuizBoost {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUIZ_BOOSTS: QuizBoost[] = [
  {
    question: "Công thức tính Lãi Kép là gì?",
    options: ["FV = PV × (1 + r)^n", "FV = PV × r × n", "FV = PV + r + n", "FV = PV / (1 + r)"],
    correct: 0,
    explanation: "Lãi kép nhân giá trị gốc với (1 + r) mũ số năm n. Đây là công thức cơ bản của time value of money."
  },
  {
    question: "Quy tắc 72 dùng để tính nhanh điều gì?",
    options: ["Số năm để số tiền đầu tư tăng gấp đôi", "Số phần trăm thuế phải nộp", "Số mã cổ phiếu nên mua", "Tỷ lệ nợ an toàn"],
    correct: 0,
    explanation: "Lấy 72 chia cho lãi suất (%) sẽ ra số năm vốn tăng gấp 2 lần. Công cụ ước tính nhanh lãi kép."
  },
  {
    question: "Hiệu ứng 'Dollar-Cost Averaging' trong đầu tư định kỳ giúp gì?",
    options: ["Loại bỏ hoàn toàn rủi ro thị trường", "Giảm thiểu tác động của biến động giá bằng cách đầu tư số tiền cố định định kỳ", "Tăng lợi nhuận lên 100% chắc chắn", "Không có tác dụng gì cả"],
    correct: 1,
    explanation: "Dollar-Cost Averaging giúp mua được cổ phiếu khi giá cao lẫn giá thấp, làm bình quân hóa chi phí mua vào."
  },
  {
    question: "Với lãi suất 12%/năm, mất bao nhiêu năm để khoản đầu tư tăng gấp BỐNLẦN?",
    options: ["12 năm (72/12×2 = 12)", "6 năm (72 / 12 = 6)", "24 năm", "4 năm (72/12/2=6)"],
    correct: 0,
    explanation: "Tăng gấp đôi lần 1 = 6 năm, tăng gấp đôi lần 2 = 6 năm nữa. Total = 12 năm để tăng 4 lần."
  },
  {
    question: "Phân bổ danh mục (Asset Allocation) 60/40 (Cổ phiếu/Trái phiếu) có lợi ích gì?",
    options: ["Tối đa hóa lợi nhuận hàng năm", "Cân bằng tăng trưởng và ổn định, giảm sức dao động (volatility)", "Loại bỏ hoàn toàn rủi ro", "Không cần thiết nếu đầu tư dài hạn"],
    correct: 1,
    explanation: "Phân bổ cân bằng giúp tận dụng tăng trưởng cổ phiếu trong năm tốt, nhưng có trái phiếu bảo vệ trong năm xấu."
  }
];

export default function SnowballRacerGame({ userId, onClose }: { userId: string; onClose: () => void }) {
  const mounted = useIsClient();
  const [year, setYear] = useState(1);
  const [netWorth, setNetWorth] = useState(10000); // Start with $10,000 capital
  const [annualContribution, setAnnualContribution] = useState(5000); // $5,000 added yearly
  const [selectedStrategy, setSelectedStrategy] = useState<string>("balanced");
  const [history, setHistory] = useState<{ year: number; worth: number; event: string; returnPct: number }[]>([]);
  const [currentEvent, setCurrentEvent] = useState<MarketEvent | null>(null);
  const [gameState, setGameState] = useState<"playing" | "quiz" | "won" | "lost">("playing");
  
  // Quiz boost state
  const [currentQuiz, setCurrentQuiz] = useState<QuizBoost | null>(null);
  const [quizBonusActive, setQuizBonusActive] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);

  const TARGET_NET_WORTH = 1000000; // $1,000,000

  const handleNextYear = () => {
    // Pick random quiz boost chance (50% chance each turn)
    if (Math.random() > 0.5 && !quizBonusActive) {
      const q = QUIZ_BOOSTS[Math.floor(Math.random() * QUIZ_BOOSTS.length)];
      setCurrentQuiz(q);
      setSelectedQuizOption(null);
      setGameState("quiz");
      soundManager.playPowerup();
      return;
    }

    executeTurn(false);
  };

  const executeTurn = (hasBonus: boolean) => {
    const strat = STRATEGIES.find((s) => s.id === selectedStrategy) || STRATEGIES[1];
    
    // Pick random market event (40% chance)
    let event: MarketEvent | null = null;
    let eventMultiplier = 1.0;
    if (Math.random() < 0.4) {
      event = MARKET_EVENTS[Math.floor(Math.random() * MARKET_EVENTS.length)];
      eventMultiplier = event.impactMultiplier;
    }
    setCurrentEvent(event);

    // Calculate Return: Base + Volatility noise + Bonus + Event Impact
    const noise = (Math.random() - 0.5) * strat.volatility * 2;
    const bonus = hasBonus ? 0.08 : 0; // +8% extra return for passing quiz
    const totalReturnPct = (strat.baseReturn + noise + bonus) * eventMultiplier;

    const newWorth = Math.round((netWorth + annualContribution) * (1 + totalReturnPct));
    setNetWorth(newWorth);

    const logEntry = {
      year,
      worth: newWorth,
      event: event ? `${event.emoji} ${event.name}` : "Thị trường bình ổn",
      returnPct: Math.round(totalReturnPct * 100)
    };
    setHistory((prev) => [logEntry, ...prev]);

    if (newWorth >= TARGET_NET_WORTH) {
      soundManager.playWin();
      setGameState("won");
      if (userId) {
        recordCustomGameSession(userId, "snowball-racer", year, 20, 50);
        recalculateUserStats(userId);
      }
      toast.success("BẠN ĐÃ CHẠM MỐC $1,000,000 LÃI KÉP!", { icon: "🏎️" });
    } else if (year >= 20) {
      // 20 years limit
      soundManager.playWrong();
      setGameState("lost");
      if (userId) {
        const xpEarned = Math.round((newWorth / TARGET_NET_WORTH) * 50);
        recordCustomGameSession(userId, "snowball-racer", newWorth, TARGET_NET_WORTH, xpEarned);
        recalculateUserStats(userId);
      }
    } else {
      setYear((prev) => prev + 1);
      soundManager.playCorrect();
    }
  };

  const handleAnswerQuiz = (optIndex: number) => {
    if (!currentQuiz || selectedQuizOption !== null) return;
    setSelectedQuizOption(optIndex);

    if (optIndex === currentQuiz.correct) {
      soundManager.playWin();
      toast.success("Chính xác! Nhận +8% Lợi suất Lãi kép năm nay!", { icon: "⚡" });
      setTimeout(() => {
        setGameState("playing");
        executeTurn(true);
      }, 1500);
    } else {
      soundManager.playWrong();
      toast.error("Chưa chính xác! Bỏ lỡ cơ hội gia tốc.", { icon: "❌" });
      setTimeout(() => {
        setGameState("playing");
        executeTurn(false);
      }, 1500);
    }
  };

  if (!mounted) return null;

  const progressPct = Math.min(100, Math.round((netWorth / TARGET_NET_WORTH) * 100));

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-stone-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-stone-950 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-4 sm:p-6 text-white shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 font-black text-xl shadow-lg">
              🏎️
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-emerald-300 flex items-center gap-2">
                Đua Xe Lãi Kép & Hòn Tuyết Lăn
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold">
                  Năm {year}/20
                </span>
              </h2>
              <p className="text-xs text-stone-400">Tăng tốc tài sản đạt $1,000,000 qua sức mạnh thời gian</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Victory / Defeat Overlay */}
        {gameState === "won" || gameState === "lost" ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center space-y-5"
          >
            {gameState === "won" ? (
              <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-4 border-emerald-400 flex items-center justify-center text-5xl shadow-[0_0_50px_rgba(16,185,129,0.6)] animate-bounce">
                🏁
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-red-500/20 border-3 border-red-400 flex items-center justify-center text-4xl shadow-lg">
                ⏰
              </div>
            )}

            <div>
              <h3 className="text-2xl font-black text-emerald-300">
                {gameState === "won" ? "BẠN ĐÃ CÁN ĐÍCH $1,000,000 RỰC RỠ!" : "HẾT 20 NĂM ĐẦU TƯ!"}
              </h3>
              <p className="text-sm text-stone-300 mt-1 max-w-md">
                {gameState === "won"
                  ? `Chúc mừng bạn! Chỉ sau ${year} năm kiên trì tái đầu tư lãi kép, hòn tuyết lăn tài chính của bạn đã bùng nổ thành $1,000,000!`
                  : `Bạn dừng chân tại cột mốc $${netWorth.toLocaleString()} USD sau 20 năm.`}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-950/40 border border-emerald-500/30 px-6 py-4 text-center">
              <span className="text-xs uppercase font-extrabold text-emerald-400">Tổng tài sản tích lũy</span>
              <div className="text-3xl font-black text-emerald-300 mt-1">${netWorth.toLocaleString()} USD</div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setYear(1);
                  setNetWorth(10000);
                  setHistory([]);
                  setCurrentEvent(null);
                  setGameState("playing");
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Đua lại từ đầu</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm transition-all cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        ) : gameState === "quiz" && currentQuiz ? (
          /* Quiz Mini-boost Overlay */
          <div className="bg-stone-900/90 border-2 border-emerald-400/60 rounded-2xl p-6 text-center space-y-4 my-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-black uppercase">
              ⚡ Trạm Tiếp Nhiên Liệu Lãi Kép (+8% Lợi suất)
            </div>

            <h3 className="text-base sm:text-lg font-black text-white">{currentQuiz.question}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {currentQuiz.options.map((opt, idx) => {
                const isSelected = selectedQuizOption === idx;
                const isCorrect = idx === currentQuiz.correct;
                let btnStyle = "border-stone-700 bg-stone-800 text-stone-200 hover:border-emerald-400";

                if (selectedQuizOption !== null) {
                  if (isCorrect) btnStyle = "border-emerald-400 bg-emerald-500/30 text-emerald-200 font-bold";
                  else if (isSelected) btnStyle = "border-red-400 bg-red-500/30 text-red-200";
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={selectedQuizOption !== null}
                    onClick={() => handleAnswerQuiz(idx)}
                    className={`p-3.5 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Main Race Dashboard */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start overflow-y-auto">
            {/* Left Column: Race Track & Strategy Selector (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Race Progress Track Bar */}
              <div className="bg-stone-900/90 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-emerald-400 flex items-center gap-1.5 font-black">
                    🏎️ Đường đua $1,000,000
                  </span>
                  <span className="text-stone-300 font-extrabold">${netWorth.toLocaleString()} / $1,000,000</span>
                </div>

                <div className="w-full bg-stone-800 h-5 rounded-full overflow-hidden border border-emerald-500/30 relative">
                  <div
                    className="bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-300 h-full transition-all duration-700"
                    style={{ width: `${progressPct}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white drop-shadow">
                    {progressPct}% Tiến độ
                  </span>
                </div>
              </div>

              {/* Strategy Selector Header */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                  Chọn chiến lược phân bổ vốn Năm {year}:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {STRATEGIES.map((s) => {
                    const isSelected = selectedStrategy === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedStrategy(s.id)}
                        className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "border-emerald-400 bg-emerald-950/60 text-white ring-2 ring-emerald-400/40"
                            : "border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700"
                        }`}
                      >
                        <div className="flex items-center justify-between font-black text-xs">
                          <span className="flex items-center gap-1.5">
                            <span>{s.emoji}</span>
                            <span>{s.name}</span>
                          </span>
                          <span className="text-emerald-400 font-extrabold">+{Math.round(s.baseReturn * 100)}%/năm</span>
                        </div>
                        <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">{s.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Button: Accelerate Next Year */}
              <button
                type="button"
                onClick={handleNextYear}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-black text-sm shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-stone-950" />
                <span>Tăng tốc Lợi nhuận Năm {year} →</span>
              </button>
            </div>

            {/* Right Column: Event Log & History (5 Cols) */}
            <div className="lg:col-span-5 bg-stone-900/90 border border-emerald-500/30 rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-black uppercase text-emerald-400 tracking-wider border-b border-emerald-500/20 pb-2">
                Nhật ký Thị trường & Tích lũy
              </h4>

              {currentEvent && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2">
                  <span className="text-lg">{currentEvent.emoji}</span>
                  <div>
                    <span className="font-bold block text-amber-300">{currentEvent.name}</span>
                    <span className="text-[11px]">{currentEvent.desc}</span>
                  </div>
                </div>
              )}

              <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1 text-xs">
                {history.length === 0 ? (
                  <p className="text-stone-500 text-center py-6">Bấm "Tăng tốc" để bắt đầu năm đầu tiên!</p>
                ) : (
                  history.map((h) => (
                    <div
                      key={h.year}
                      className="flex items-center justify-between p-2 rounded-xl bg-stone-950/60 border border-stone-800"
                    >
                      <div>
                        <span className="font-bold text-emerald-300">Năm {h.year}:</span>{" "}
                        <span className="text-stone-300">${h.worth.toLocaleString()}</span>
                      </div>
                      <span className={`font-black ${h.returnPct >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {h.returnPct >= 0 ? `+${h.returnPct}%` : `${h.returnPct}%`}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
