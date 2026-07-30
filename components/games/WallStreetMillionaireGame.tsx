"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, HelpCircle, Users, Sparkles, CheckCircle2, XCircle, DollarSign, ShieldAlert, ArrowLeft, RotateCcw, Award } from "lucide-react";
import { toast } from "sonner";
import { soundManager } from "@/lib/sounds";
import { recalculateUserStats } from "@/lib/supabase-user";
import { createPortal } from "react-dom";

export interface MillionaireQuestion {
  level: number;
  prize: number;
  prizeText: string;
  isMilestone?: boolean;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  taiTaiHint: string;
}

// 15 Standard Wall Street Millionaire Questions matching finance knowledge progression
const MILLIONAIRE_QUESTIONS: MillionaireQuestion[] = [
  {
    level: 1,
    prize: 100,
    prizeText: "$100",
    question: "Tài sản (Assets) trong Kế toán được định nghĩa chính xác nhất là gì?",
    options: [
      "A. Những gì đem lại dòng tiền âm cho bạn",
      "B. Nguồn lực kinh tế thuộc quyền kiểm soát của DN và tạo lợi ích tương lai",
      "C. Tiền mặt duy nhất gửi ngân hàng",
      "D. Tổng khoản nợ phải trả cho nhà cung cấp"
    ],
    correctIndex: 1,
    explanation: "Tài sản là nguồn lực kinh tế mang lại giá trị hoặc dòng tiền dương trong tương lai cho doanh nghiệp.",
    taiTaiHint: "Tài sản phải mang lại lợi ích tương lai cho doanh nghiệp! Chọn đáp án B nhé."
  },
  {
    level: 2,
    prize: 200,
    prizeText: "$200",
    question: "Chỉ số P/E (Price-to-Earnings Ratio) thể hiện điều gì?",
    options: [
      "A. Số năm để hòa vốn nếu lợi nhuận doanh nghiệp giữ nguyên",
      "B. Tỷ lệ nợ trên vốn chủ sở hữu",
      "C. Tổng doanh thu bán hàng của doanh nghiệp",
      "D. Tỷ lệ tăng trưởng doanh số hàng năm"
    ],
    correctIndex: 0,
    explanation: "P/E cho biết nhà đầu tư sẵn sàng trả bao nhiêu tiền cho $1 lợi nhuận của doanh nghiệp.",
    taiTaiHint: "P/E là tỷ lệ Giá / Lợi nhuận mỗi cổ phiếu. Đáp án A là câu trả lời chuẩn nhất."
  },
  {
    level: 3,
    prize: 300,
    prizeText: "$300",
    question: "Sức mạnh của 'Lãi suất kép' (Compound Interest) được Albert Einstein mệnh danh là gì?",
    options: [
      "A. Rủi ro lớn nhất thị trường",
      "B. Kỳ quan thứ 8 của thế giới",
      "C. Bẫy nợ tài chính",
      "D. Công cụ trốn thuế"
    ],
    correctIndex: 1,
    explanation: "Lãi kép tái đầu tư lợi nhuận để tạo ra lợi nhuận mới, giúp tài sản tăng trưởng theo cấp số nhân.",
    taiTaiHint: "Einstein từng gọi Lãi kép là kỳ quan thứ 8! Chọn B chắc chắn đúng."
  },
  {
    level: 4,
    prize: 500,
    prizeText: "$500",
    question: "Phương pháp định giá DCF (Discounted Cash Flow) dựa trên nguyên lý cốt lõi nào?",
    options: [
      "A. So sánh P/E với các đối thủ trong ngành",
      "B. Đếm số lượng máy móc hiện có của công ty",
      "C. Chiết khấu toàn bộ dòng tiền tự do tương lai về giá trị hiện tại (PV)",
      "D. Tính theo mệnh giá cổ phiếu phát hành ban đầu"
    ],
    correctIndex: 2,
    explanation: "DCF xác định giá trị nội tại của doanh nghiệp bằng tổng dòng tiền tương lai được chiết khấu về hiện tại.",
    taiTaiHint: "DCF = Discounted Cash Flow -> Chiết khấu dòng tiền về hiện tại! Chọn C nhé."
  },
  {
    level: 5,
    prize: 1000,
    prizeText: "$1,000 (Mốc An Toàn 1)",
    isMilestone: true,
    question: "Báo cáo Lưu chuyển tiền tệ (Cash Flow Statement) chia dòng tiền thành mấy hoạt động?",
    options: [
      "A. 2 hoạt động: Thu và Chi",
      "B. 3 hoạt động: Kinh doanh, Đầu tư và Tài chính",
      "C. 4 hoạt động: Ngắn hạn, Dài hạn, Thuế, Cổ tức",
      "D. 5 hoạt động theo chuẩn mực IFRS"
    ],
    correctIndex: 1,
    explanation: "Báo cáo LCTT phân loại dòng tiền gồm Operating (Kinh doanh), Investing (Đầu tư), và Financing (Tài chính).",
    taiTaiHint: "CFO + CFI + CFF = 3 hoạt động cốt lõi! Chọn B để giữ mốc an toàn 1 nhé."
  },
  {
    level: 6,
    prize: 2000,
    prizeText: "$2,000",
    question: "Mô hình DuPont phân tích chỉ số ROE thành 3 thành tố nào?",
    options: [
      "A. Lợi nhuận ròng, Nợ ngắn hạn, Giá cổ phiếu",
      "B. Biên lợi nhuận ròng, Vòng quay tài sản, Đòn bẩy tài chính (Asset Turnover & Equity Multiplier)",
      "C. Doanh thu, Chi phí bán hàng, Thuế TNDN",
      "D. P/E, P/B, EV/EBITDA"
    ],
    correctIndex: 1,
    explanation: "DuPont ROE = (Net Income/Sales) × (Sales/Assets) × (Assets/Equity).",
    taiTaiHint: "Biên lợi nhuận x Hiệu quả tài sản x Đòn bẩy tài chính. Đáp án B chuẩn xác."
  },
  {
    level: 7,
    prize: 4000,
    prizeText: "$4,000",
    question: "Khi Ngân hàng Trung ương (FED/SBV) nâng lãi suất điều hành (Hawkish), điều gì thường xảy ra?",
    options: [
      "A. Chi phí vốn tăng, định giá cổ phiếu tăng trưởng chịu áp lực chiết khấu giảm",
      "B. Thị trường chứng khoán tăng vọt ngay lập tức",
      "C. Dòng tiền gửi tiết kiệm rút ra ồ ạt",
      "D. Giá trái phiếu doanh nghiệp tăng mạnh"
    ],
    correctIndex: 0,
    explanation: "Lãi suất tăng làm tăng tỷ lệ chiết khấu (WACC), làm giảm giá trị hiện tại của dòng tiền tương lai.",
    taiTaiHint: "Lãi suất tăng -> Chi phí vốn tăng -> Định giá chịu áp lực giảm! Chọn A."
  },
  {
    level: 8,
    prize: 8000,
    prizeText: "$8,000",
    question: "Trong giao dịch M&A, thuật ngữ 'Accretion / Dilution Analysis' dùng để kiểm tra điều gì?",
    options: [
      "A. Tổng số lượng nhân viên sau khi sáp nhập",
      "B. Thương vụ có làm EPS (Thu nhập trên mỗi cổ phiếu) của công ty mua TĂNG hay GIẢM",
      "C. Tỷ lệ lạm phát của quốc gia công ty mục tiêu",
      "D. Chi phí quảng cáo thương hiệu mới"
    ],
    correctIndex: 1,
    explanation: "Accretive là thương vụ giúp tăng EPS của buyer; Dilutive là thương vụ làm giảm EPS của buyer.",
    taiTaiHint: "Accretive = Tăng EPS, Dilutive = Giảm EPS! Chọn đáp án B nhé."
  },
  {
    level: 9,
    prize: 16000,
    prizeText: "$16,000",
    question: "Chỉ số Sharpe Ratio đo lường điều gì trong quản lý danh mục đầu tư?",
    options: [
      "A. Tổng số tiền cổ tức nhận được",
      "B. Mức lợi nhuận thặng dư thu được trên mỗi đơn vị rủi ro (Risk-adjusted return)",
      "C. Tốc độ tăng trưởng doanh thu 5 năm",
      "D. Số lượng mã cổ phiếu trong danh mục"
    ],
    correctIndex: 1,
    explanation: "Sharpe Ratio = (Lợi nhuận danh mục - Lãi suất phi rủi ro) / Độ lệch chuẩn rủi ro.",
    taiTaiHint: "Sharpe Ratio là thước đo lợi nhuận điều chỉnh theo rủi ro! Chọn B chuẩn."
  },
  {
    level: 10,
    prize: 32000,
    prizeText: "$32,000 (Mốc An Toàn 2)",
    isMilestone: true,
    question: "Thương vụ LBO (Leveraged Buyout) đặc trưng bởi điều gì?",
    options: [
      "A. Mua lại công ty bằng 100% tiền mặt tự có",
      "B. Sử dụng tỷ lệ nợ vay cao (70-90%) gán vào tài sản công ty mục tiêu để mua lại",
      "C. Phát hành thêm cổ phiếu ưu đãi cho chính phủ",
      "D. Đổi tên công ty mục tiêu thành quỹ từ thiện"
    ],
    correctIndex: 1,
    explanation: "LBO sử dụng phần lớn đòn bẩy nợ để thâu tóm công ty và dùng dòng tiền của công ty đó để trả nợ.",
    taiTaiHint: "LBO = Leveraged (Đòn bẩy nợ cao)! Bạn chọn B để chốt mốc $32,000 nhé."
  },
  {
    level: 11,
    prize: 64000,
    prizeText: "$64,000",
    question: "Khi đường cong lợi suất trái phiếu (Yield Curve) bị ĐẢO NGUỢC (Inverted), thị trường thường cảnh báo điều gì?",
    options: [
      "A. Siêu lạm phát sắp xảy ra ngay lập tức",
      "B. Tín hiệu suy thoái kinh tế (Recession) trong 12-18 tháng tới",
      "C. Thị trường chứng khoán sẽ tăng bùng nổ 100%",
      "D. Ngân hàng thương mại sẽ phá sản toàn bộ"
    ],
    correctIndex: 1,
    explanation: "Lợi suất ngắn hạn cao hơn dài hạn phản ánh sự lo ngại của thị trường về triển vọng kinh tế suy thoái.",
    taiTaiHint: "Yield Curve bị đảo ngược là chỉ báo hàng đầu cảnh báo Suy thoái (Recession)! Chọn B."
  },
  {
    level: 12,
    prize: 125000,
    prizeText: "$125,000",
    question: "Khái niệm Beta (β) = 1.5 của một cổ phiếu có nghĩa là gì?",
    options: [
      "A. Cổ phiếu có cổ tức cao hơn thị trường 50%",
      "B. Khi VN-Index tăng/giảm 1%, cổ phiếu này biến động cùng chiều trung bình 1.5%",
      "C. Công ty có đòn bẩy nợ gấp 1.5 lần vốn chủ",
      "D. Cổ phiếu bị định giá cao hơn 50%"
    ],
    correctIndex: 1,
    explanation: "Beta đo lường độ nhạy rủi ro hệ thống của cổ phiếu so với biến động chung của toàn thị trường.",
    taiTaiHint: "Beta = 1.5 tức là nhạy hơn thị trường 50%! Chọn B."
  },
  {
    level: 13,
    prize: 250000,
    prizeText: "$250,000",
    question: "Mô hình Black-Scholes dùng biến số nào để tính giá trị lý thuyết của một Hợp đồng Quyền chọn (Option)?",
    options: [
      "A. Giá cơ sở, Giá thực hiện, Thời gian đáo hạn, Lãi suất phi rủi ro, Độ biến động nội hàm (Volatility)",
      "B. Chỉ cần Giá cổ phiếu hiện tại và Lợi nhuận quý gần nhất",
      "C. Chỉ số P/E và Tỷ lệ tăng trưởng doanh thu",
      "D. Tổng nợ vay ngân hàng và giá tài sản cố định"
    ],
    correctIndex: 0,
    explanation: "Black-Scholes định giá Option dựa vào 5 tham số chính bao gồm Implied Volatility (σ).",
    taiTaiHint: "Đáp án A bao gồm đủ 5 tham số cốt lõi của Black-Scholes! Chọn A."
  },
  {
    level: 14,
    prize: 500000,
    prizeText: "$500,000",
    question: "Một công ty báo EBITDA tăng 20% nhưng Cash Flow từ Hoạt động Kinh doanh (CFO) lại ÂM nặng. Nguyên nhân nguy hiểm nhất là gì?",
    options: [
      "A. Doanh nghiệp chi quá nhiều tiền trả nợ gốc ngân hàng",
      "B. Doanh thu ghi nhận ảo/dồn vào Các khoản phải thu (Receivables) mà chưa thu được tiền mặt",
      "C. Doanh nghiệp mua thêm đất đai làm trụ sở",
      "D. Doanh nghiệp chi trả cổ tức bằng tiền mặt quá cao"
    ],
    correctIndex: 1,
    explanation: "EBITDA bỏ qua lưu chuyển tiền thực. Khoản phải thu phình to làm CFO âm là dấu hiệu cảnh báo chất lượng lợi nhuận kém.",
    taiTaiHint: "EBITDA ảo do Khoản phải thu tăng vọt mà tiền chưa về! Chọn đáp án B."
  },
  {
    level: 15,
    prize: 1000000,
    prizeText: "$1,000,000 🏆 (TRIỆU PHÚ PHỐ WALL)",
    isMilestone: true,
    question: "Trong sự kiện Khủng hoảng Tài chính 2008, công cụ tài chính phái sinh nào đã khiến AIG cận kề phá sản và phải được Chính phủ Mỹ giải cứu $180 tỷ?",
    options: [
      "A. Hợp đồng Tương lai Chỉ số S&P500",
      "B. Hợp đồng Hoán đổi Rủi ro Tín dụng (Credit Default Swaps - CDS) bảo hiểm cho CDO nợ dưới chuẩn",
      "C. Quyền chọn Mua cổ phiếu Lehman Brothers",
      "D. Chứng chỉ quỹ ETF Vàng SPDR Gold Trust"
    ],
    correctIndex: 1,
    explanation: "AIG đã bán hàng trăm tỷ USD hợp đồng CDS bảo hiểm cho CDO nợ dưới chuẩn mà không có đủ vốn dự phòng khi nợ xấu bùng nổ.",
    taiTaiHint: "CDS (Credit Default Swaps) là ngòi nổ kích nổ AIG năm 2008! Bạn sắp trở thành Triệu phú Phố Wall, chọn B ngay!"
  }
];

interface WallStreetMillionaireGameProps {
  userId: string;
  onClose: () => void;
}

export default function WallStreetMillionaireGame({ userId, onClose }: WallStreetMillionaireGameProps) {
  const [mounted, setMounted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0); // 0 to 14
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [gameState, setGameState] = useState<"playing" | "locked" | "revealed" | "banked" | "won" | "lost">("playing");
  
  // Lifelines state
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [usedTaiTai, setUsedTaiTai] = useState(false);
  const [usedAudience, setUsedAudience] = useState(false);
  
  // Active Lifeline Modals/Overlays
  const [eliminatedIndices, setEliminatedIndices] = useState<number[]>([]);
  const [showTaiTaiModal, setShowTaiTaiModal] = useState(false);
  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [audiencePoll, setAudiencePoll] = useState<number[]>([25, 25, 25, 25]);

  // Earnings
  const [earnedCash, setEarnedCash] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const q = MILLIONAIRE_QUESTIONS[currentLevel];

  // Helper: Use 50:50
  const handleUseFiftyFifty = () => {
    if (usedFiftyFifty || gameState !== "playing") return;
    setUsedFiftyFifty(true);
    soundManager.playPowerup();

    const wrongIndices = [0, 1, 2, 3].filter((idx) => idx !== q.correctIndex);
    // Randomly pick 2 wrong indices to remove
    const shuffled = wrongIndices.sort(() => Math.random() - 0.5);
    const eliminated = [shuffled[0], shuffled[1]];
    setEliminatedIndices(eliminated);
    toast.success("Đã loại bỏ 2 phương án sai!", { icon: "🪄" });
  };

  // Helper: Use Mascot Tài Tài
  const handleUseTaiTai = () => {
    if (usedTaiTai || gameState !== "playing") return;
    setUsedTaiTai(true);
    soundManager.playPowerup();
    setShowTaiTaiModal(true);
  };

  // Helper: Use Audience Poll
  const handleUseAudience = () => {
    if (usedAudience || gameState !== "playing") return;
    setUsedAudience(true);
    soundManager.playPowerup();

    // Generate biased poll favoring the correct option
    const poll = [10, 10, 10, 10];
    const correctBoost = 60 + Math.floor(Math.random() * 25); // 60-85%
    const remaining = 100 - correctBoost;
    
    poll[q.correctIndex] = correctBoost;
    let pool = remaining;
    for (let i = 0; i < 4; i++) {
      if (i !== q.correctIndex) {
        const share = Math.floor(Math.random() * pool);
        poll[i] = share;
        pool -= share;
      }
    }
    // Add rest to first non-correct
    const firstOther = [0, 1, 2, 3].find((i) => i !== q.correctIndex)!;
    poll[firstOther] += pool;

    setAudiencePoll(poll);
    setShowAudienceModal(true);
  };

  // Lock answer selection
  const handleSelectOption = (index: number) => {
    if (gameState !== "playing" || eliminatedIndices.includes(index)) return;
    setSelectedOption(index);
    setGameState("locked");
    soundManager.playCorrect();

    // After 2.5s suspense, reveal answer
    setTimeout(() => {
      if (index === q.correctIndex) {
        // Correct Answer!
        soundManager.playWin();
        setGameState("revealed");

        const isFinal = currentLevel === 14;
        if (isFinal) {
          // WON 1 MILLION DOLLARS!
          setEarnedCash(1000000);
          setGameState("won");
          if (userId) recalculateUserStats(userId);
        } else {
          // Move to next question after 1.8s
          setTimeout(() => {
            setCurrentLevel((prev) => prev + 1);
            setSelectedOption(null);
            setEliminatedIndices([]);
            setGameState("playing");
          }, 1800);
        }
      } else {
        // Wrong Answer!
        soundManager.playWrong();
        setGameState("lost");

        // Determine safe milestone payout
        let safePayout = 0;
        if (currentLevel >= 9) safePayout = 32000;
        else if (currentLevel >= 4) safePayout = 1000;
        setEarnedCash(safePayout);
        if (userId) recalculateUserStats(userId);
      }
    }, 2200);
  };

  // Walk Away with Cash
  const handleBankAndWalkAway = () => {
    if (gameState !== "playing" && gameState !== "locked") return;
    const currentBank = currentLevel > 0 ? MILLIONAIRE_QUESTIONS[currentLevel - 1].prize : 0;
    setEarnedCash(currentBank);
    setGameState("banked");
    soundManager.playWin();
    toast.success(`Bạn đã quyết định dừng cuộc chơi và mang về ${MILLIONAIRE_QUESTIONS[currentLevel - 1]?.prizeText || "$0"}!`, { icon: "💰" });
    if (userId) recalculateUserStats(userId);
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-stone-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-stone-950 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-4 sm:p-6 text-white shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Top Header & Close */}
        <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 font-black text-xl shadow-lg">
              💰
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-amber-300 flex items-center gap-2">
                Ai Là Triệu Phú Phố Wall
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-bold">
                  Câu {currentLevel + 1}/15
                </span>
              </h2>
              <p className="text-xs text-stone-400">Chinh phục $1,000,000 vốn đầu tư danh giá</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentLevel > 0 && (gameState === "playing" || gameState === "locked") && (
              <button
                type="button"
                onClick={handleBankAndWalkAway}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <DollarSign className="w-4 h-4" />
                <span>Dừng cuộc chơi ({MILLIONAIRE_QUESTIONS[currentLevel - 1].prizeText})</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Main Grid Layout: Left Question Arena + Right Prize Ladder */}
        {gameState === "won" || gameState === "lost" || gameState === "banked" ? (
          /* Game Over / Victory Screen */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center space-y-5"
          >
            {gameState === "won" ? (
              <div className="w-24 h-24 rounded-full bg-amber-500/20 border-4 border-amber-400 flex items-center justify-center text-5xl shadow-[0_0_50px_rgba(245,158,11,0.6)] animate-bounce">
                👑
              </div>
            ) : gameState === "banked" ? (
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-3 border-emerald-400 flex items-center justify-center text-4xl shadow-lg">
                💰
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-red-500/20 border-3 border-red-400 flex items-center justify-center text-4xl shadow-lg">
                💔
              </div>
            )}

            <div>
              <h3 className="text-2xl font-black text-amber-300">
                {gameState === "won"
                  ? "BẠN LÀ TRIỆU PHÚ PHỐ WALL! 🏆"
                  : gameState === "banked"
                  ? "BẠN ĐÃ DỪNG CUỘC CHƠI AN TOÀN!"
                  : "RẤT TIẾC, BẠN ĐÃ CHỌN SAI!"}
              </h3>
              <p className="text-sm text-stone-300 mt-1 max-w-md">
                {gameState === "won"
                  ? "Bạn đã xuất sắc vượt qua cả 15 câu hỏi tài chính khắc nghiệt nhất để chạm tay vào mốc $1,000,000!"
                  : gameState === "banked"
                  ? "Quyết định quản trị rủi ro sáng suốt! Bạn bảo toàn phần thưởng của mình."
                  : `Đáp án đúng là "${q.options[q.correctIndex]}".`}
              </p>
            </div>

            <div className="rounded-2xl bg-amber-950/40 border border-amber-500/30 px-6 py-4 text-center">
              <span className="text-xs uppercase font-extrabold text-amber-400">Phần thưởng tiền thưởng mang về</span>
              <div className="text-3xl font-black text-amber-300 mt-1">${earnedCash.toLocaleString()} USD</div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setCurrentLevel(0);
                  setSelectedOption(null);
                  setEliminatedIndices([]);
                  setUsedFiftyFifty(false);
                  setUsedTaiTai(false);
                  setUsedAudience(false);
                  setGameState("playing");
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Thử thách lại</span>
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
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start overflow-y-auto">
            {/* Left Arena: Lifelines + Question Card + 4 Options (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Lifeline Buttons */}
              <div className="flex items-center justify-between gap-2 bg-stone-900/80 border border-amber-500/20 p-2.5 rounded-2xl">
                <span className="text-xs font-bold text-amber-300 hidden sm:inline">Quyền trợ giúp:</span>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-around">
                  {/* 50:50 */}
                  <button
                    type="button"
                    onClick={handleUseFiftyFifty}
                    disabled={usedFiftyFifty || gameState !== "playing"}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 cursor-pointer ${
                      usedFiftyFifty
                        ? "bg-stone-800 text-stone-500 border-stone-700 opacity-50 cursor-not-allowed"
                        : "bg-indigo-950/80 border-indigo-500/50 text-indigo-300 hover:bg-indigo-900 hover:scale-105 shadow-md"
                    }`}
                  >
                    <span>🪄 50:50</span>
                  </button>

                  {/* Ask Mascot Tài Tài */}
                  <button
                    type="button"
                    onClick={handleUseTaiTai}
                    disabled={usedTaiTai || gameState !== "playing"}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 cursor-pointer ${
                      usedTaiTai
                        ? "bg-stone-800 text-stone-500 border-stone-700 opacity-50 cursor-not-allowed"
                        : "bg-amber-950/80 border-amber-500/50 text-amber-300 hover:bg-amber-900 hover:scale-105 shadow-md"
                    }`}
                  >
                    <span>🤖 Hỏi Tài Tài</span>
                  </button>

                  {/* Audience Poll */}
                  <button
                    type="button"
                    onClick={handleUseAudience}
                    disabled={usedAudience || gameState !== "playing"}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 cursor-pointer ${
                      usedAudience
                        ? "bg-stone-800 text-stone-500 border-stone-700 opacity-50 cursor-not-allowed"
                        : "bg-emerald-950/80 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900 hover:scale-105 shadow-md"
                    }`}
                  >
                    <span>📊 Khảo sát BXH</span>
                  </button>
                </div>
              </div>

              {/* Question Card Box */}
              <div className="relative bg-gradient-to-r from-slate-900 via-stone-900 to-slate-900 border-2 border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-xl text-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow">
                  Mức {q.prizeText}
                </div>
                <h3 className="text-base sm:text-lg font-black text-amber-100 leading-relaxed mt-2">
                  {q.question}
                </h3>
              </div>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, idx) => {
                  const isEliminated = eliminatedIndices.includes(idx);
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === q.correctIndex;

                  let optionStyle =
                    "border-amber-500/30 bg-slate-900/90 text-stone-200 hover:border-amber-400 hover:bg-slate-800";

                  if (isEliminated) {
                    optionStyle = "border-stone-800 bg-stone-950/40 text-stone-600 opacity-30 cursor-not-allowed";
                  } else if (gameState === "locked" && isSelected) {
                    optionStyle = "border-amber-400 bg-amber-500/20 text-amber-200 animate-pulse ring-2 ring-amber-400";
                  } else if (gameState === "revealed") {
                    if (isCorrect) {
                      optionStyle = "border-emerald-400 bg-emerald-500/30 text-emerald-200 font-extrabold ring-2 ring-emerald-400";
                    } else if (isSelected) {
                      optionStyle = "border-red-400 bg-red-500/30 text-red-200 ring-2 ring-red-400";
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={gameState !== "playing" || isEliminated}
                      onClick={() => handleSelectOption(idx)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all font-bold text-xs sm:text-sm flex items-start gap-2 cursor-pointer ${optionStyle}`}
                    >
                      <span className="shrink-0 font-extrabold text-amber-400">{opt.slice(0, 3)}</span>
                      <span>{opt.slice(3)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Prize Ladder (4 Cols) */}
            <div className="lg:col-span-4 bg-stone-900/90 border border-amber-500/30 rounded-2xl p-3 sm:p-4 space-y-1">
              <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider mb-2 flex items-center justify-between border-b border-amber-500/20 pb-2">
                <span>Thang tiền thưởng</span>
                <Trophy className="w-4 h-4 text-amber-400" />
              </h4>

              <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
                {[...MILLIONAIRE_QUESTIONS].reverse().map((item) => {
                  const isActive = currentLevel === item.level - 1;
                  const isPassed = currentLevel > item.level - 1;

                  return (
                    <div
                      key={item.level}
                      className={`flex items-center justify-between px-3 py-1 rounded-xl text-xs font-black transition-all ${
                        isActive
                          ? "bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-300 font-black scale-[1.02]"
                          : isPassed
                          ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30"
                          : item.isMilestone
                          ? "bg-stone-800 text-amber-300 border border-amber-500/40 font-bold"
                          : "text-stone-400 bg-stone-950/40"
                      }`}
                    >
                      <span>
                        {item.level}. {item.isMilestone ? "🔒" : ""}
                      </span>
                      <span>{item.prizeText}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Mascot Tai Tai Modal */}
        {showTaiTaiModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-stone-900 border-2 border-amber-400 rounded-3xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 mx-auto flex items-center justify-center text-3xl shadow-lg">
                🤖
              </div>
              <h3 className="text-lg font-black text-amber-300">Linh vật Tài Tài tư vấn:</h3>
              <p className="text-sm text-stone-200 italic bg-amber-950/40 border border-amber-500/30 p-4 rounded-2xl">
                "{q.taiTaiHint}"
              </p>
              <button
                type="button"
                onClick={() => setShowTaiTaiModal(false)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs cursor-pointer shadow-md"
              >
                Cảm ơn Tài Tài!
              </button>
            </motion.div>
          </div>
        )}

        {/* Audience Poll Modal */}
        {showAudienceModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-stone-900 border-2 border-emerald-400 rounded-3xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-3xl shadow-lg">
                📊
              </div>
              <h3 className="text-lg font-black text-emerald-300">Ý kiến 1,000 Chuyên viên Phố Wall:</h3>

              <div className="space-y-2 text-left">
                {["A", "B", "C", "D"].map((letter, idx) => (
                  <div key={letter} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-stone-300">
                      <span>Phương án {letter}</span>
                      <span className="text-emerald-400 font-extrabold">{audiencePoll[idx]}%</span>
                    </div>
                    <div className="w-full bg-stone-800 h-3 rounded-full overflow-hidden border border-stone-700">
                      <div
                        className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full transition-all duration-700"
                        style={{ width: `${audiencePoll[idx]}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowAudienceModal(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs cursor-pointer shadow-md"
              >
                Đã hiểu!
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
