"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle2, XCircle, Trophy, RefreshCw, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import GoldCoinIcon from "@/components/GoldCoinIcon";

interface MaClause {
  id: number;
  clauseText: string;
  isRisk: boolean;
  explanation: string;
}

const CLAUSES: MaClause[] = [
  {
    id: 1,
    clauseText: "Bên B được phép rút toàn bộ vốn lưu động 50 tỷ đồng ngay trước ngày chốt hợp đồng M&A.",
    isRisk: true,
    explanation: "Rủi ro nghiêm trọng! Rút vốn lưu động làm doanh nghiệp mục tiêu kiệt quệ tài chính.",
  },
  {
    id: 2,
    clauseText: "Bên A sẽ tiếp quản 100% nợ phải trả tồn đọng và giữ nguyên đội ngũ nhân sự cốt lõi trong 2 năm.",
    isRisk: false,
    explanation: "Điều khoản hợp lý và chuẩn mực trong giao dịch sáp nhập.",
  },
  {
    id: 3,
    clauseText: "Giá trị thương vụ M&A sẽ không được điều chỉnh lại dù báo cáo kiểm toán có phát hiện lỗ phát sinh.",
    isRisk: true,
    explanation: "Rủi ro cực lớn! Thiếu điều khoản điều chỉnh giá mua (Purchase Price Adjustment).",
  },
];

export default function MaSpeedrunGame({ onBack, completedLessonIds = [] }: { onBack?: () => void; completedLessonIds?: number[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentC = CLAUSES[currentIndex];

  const handleDecision = (flaggedAsRisk: boolean) => {
    if (flaggedAsRisk === currentC.isRisk) {
      setScore((s) => s + 100);
      toast.success(`📜 ĐÁNH GIÁ ĐÚNG! +100 Coins (${currentC.explanation})`);
    } else {
      toast.error(`❌ SAI RỒI! ${currentC.explanation}`);
    }

    if (currentIndex < CLAUSES.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="bg-white border-2 border-indigo-300 rounded-3xl p-6 shadow-xl max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-100">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-black text-stone-600 hover:text-indigo-600 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Bản Đồ
          </button>
        )}
        <div className="text-center flex-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            🏢 Investment Banking Ave
          </span>
          <h2 className="text-xl font-black text-stone-900 mt-1">
            Thỏa Thuận M&A Tốc Độ
          </h2>
        </div>
        <div className="flex items-center gap-1 font-black text-indigo-600 text-sm">
          <GoldCoinIcon className="w-4 h-4" /> {score} pts
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          <div className="bg-stone-50 p-6 rounded-3xl border-2 border-indigo-200 shadow-inner">
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block mb-2">
              📜 Điều khoản Hợp đồng #{currentC.id}
            </span>
            <p className="text-base font-black text-stone-900 leading-relaxed">
              "{currentC.clauseText}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleDecision(true)}
              className="py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-black text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <ShieldAlert className="w-5 h-5" /> BÁO ĐỘNG RỦI RO (RISK ⚠️)
            </button>
            <button
              onClick={() => handleDecision(false)}
              className="py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <CheckCircle2 className="w-5 h-5" /> AN TOÀN / DUYỆT (SAFE ✅)
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 space-y-4">
          <Trophy className="w-16 h-16 text-indigo-500 mx-auto animate-bounce" />
          <h3 className="text-2xl font-black text-stone-900">
            HOÀN THÀNH KÝ KẾT M&A!
          </h3>
          <p className="text-sm font-bold text-indigo-600">
            Tổng điểm thẩm định M&A: {score} XP & Coins!
          </p>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setScore(0);
              setIsFinished(false);
            }}
            className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-black text-sm hover:scale-105 transition-all flex items-center gap-2 mx-auto cursor-pointer shadow-md"
          >
            <RefreshCw className="w-4 h-4" /> Thẩm Định Thương Vụ Mới
          </button>
        </div>
      )}
    </div>
  );
}
