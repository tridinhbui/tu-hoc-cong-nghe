"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, CheckCircle2, ArrowRight, Sparkles, X, BrainCircuit, Award } from "lucide-react";
import { toast } from "sonner";

interface DiagnosticQuestion {
  id: number;
  question: string;
  options: { text: string; scoreTrack: "personal" | "professional" | "cfa" | "ai" }[];
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    question: "Mục tiêu tài chính lớn nhất của bạn trong 6 - 12 tháng tới là gì?",
    options: [
      { text: "Quản lý thu chi cá nhân, lập quỹ khẩn cấp & tích sản", scoreTrack: "personal" },
      { text: "Đọc hiểu Báo cáo tài chính doanh nghiệp & phân tích đầu tư", scoreTrack: "professional" },
      { text: "Chinh phục chứng chỉ quốc tế CFA & chuyên sâu Corporate Finance", scoreTrack: "cfa" },
      { text: "Ứng dụng AI (ChatGPT, Claude) để tự động hóa phân tích tài chính", scoreTrack: "ai" },
    ],
  },
  {
    id: 2,
    question: "Bạn đánh giá mức độ hiểu biết của mình về Báo cáo tài chính (BCTC) ra sao?",
    options: [
      { text: "Chưa biết gì, muốn bắt đầu từ khái niệm cơ bản nhất", scoreTrack: "personal" },
      { text: "Biết sơ bộ Bảng cân đối kế toán & Báo cáo kết quả kinh doanh", scoreTrack: "professional" },
      { text: "Thành thục kết nối 3 báo cáo tài chính & tính toán dòng tiền FCF", scoreTrack: "cfa" },
      { text: "Muốn dùng Prompt Engineering để AI đọc & bóc tách BCTC tự động", scoreTrack: "ai" },
    ],
  },
  {
    id: 3,
    question: "Bạn đã từng thực hiện định giá cổ phiếu hoặc phân tích doanh nghiệp chưa?",
    options: [
      { text: "Chưa từng, tôi muốn tích lũy kiến thức quản lý tiền cá nhân trước", scoreTrack: "personal" },
      { text: "Đã tìm hiểu các chỉ số P/E, P/B, ROE cơ bản", scoreTrack: "professional" },
      { text: "Đã thực hành các mô hình DCF, WACC, LBO chuyên sâu", scoreTrack: "cfa" },
      { text: "Tôi muốn kết hợp công cụ AI để chạy giả lập kịch bản vĩ mô", scoreTrack: "ai" },
    ],
  },
];

export default function DiagnosticPlacementModal({
  userId,
  isOpen,
  onClose,
}: {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [step, setStep] = useState<"quiz" | "result">("quiz");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    personal: 0,
    professional: 0,
    cfa: 0,
    ai: 0,
  });

  const handleSelectOption = (track: "personal" | "professional" | "cfa" | "ai") => {
    setScores((prev) => ({ ...prev, [track]: prev[track] + 1 }));

    if (currentIndex + 1 < DIAGNOSTIC_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setStep("result");
    }
  };

  const getRecommendedTrack = () => {
    const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
    return sorted[0]?.[0] || "personal";
  };

  const recommendedTrack = getRecommendedTrack();

  const trackNames: Record<string, { title: string; desc: string; url: string; emoji: string }> = {
    personal: {
      title: "Lộ Trình Tài Chính Cá Nhân",
      desc: "Phù hợp nhất cho người mới bắt đầu: Quản lý ngân sách 50/30/20, Quỹ khẩn cấp & Tích sản dài hạn.",
      url: "/roadmap",
      emoji: "🌱",
    },
    professional: {
      title: "Lộ Trình Phân Tích Doanh Nghiệp & Đầu Tư",
      desc: "Phù hợp cho người đã có nền tảng: Đọc BCTC, Phân tích chỉ số tài chính & Chiến lược đầu tư.",
      url: "/roadmap",
      emoji: "💼",
    },
    cfa: {
      title: "Lộ Trình Chuyên Sâu CFA & Corporate Finance",
      desc: "Phù hợp cho định hướng chuyên nghiệp: Mô hình định giá DCF, WACC, LBO & Chứng chỉ CFA Level 1.",
      url: "/roadmap",
      emoji: "🎓",
    },
    ai: {
      title: "Lộ Trình AI For Finance",
      desc: "Phù hợp cho tín đồ công nghệ: Ứng dụng Prompt Engineering & AI Agents trong phân tích tài chính.",
      url: "/roadmap",
      emoji: "🤖",
    },
  };

  const rec = trackNames[recommendedTrack];

  const handleComplete = () => {
    try {
      localStorage.setItem(`thtcdn_placement_test_${userId}`, recommendedTrack);
    } catch (e) {}
    toast.success(`🎉 Đã thiết lập Lộ trình học: ${rec.title}`);
    onClose();
    router.push(rec.url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-stone-900 shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                <Compass className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">
                  Chẩn Đoán Trình Độ Đầu Vào
                </h3>
                <p className="text-[11px] font-bold text-stone-400">Khảo sát 3 phút xếp lớp tự động</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            {step === "quiz" ? (
              (() => {
                const q = DIAGNOSTIC_QUESTIONS[currentIndex];
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-black text-stone-400">
                      <span>Câu hỏi {currentIndex + 1} / {DIAGNOSTIC_QUESTIONS.length}</span>
                      <span className="text-emerald-500 font-bold">Khảo sát nhanh</span>
                    </div>

                    <p className="font-extrabold text-base text-stone-900 dark:text-stone-100 leading-snug">
                      {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectOption(opt.scoreTrack)}
                          className="w-full text-left p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 transition-all cursor-pointer flex items-center justify-between"
                        >
                          <span>{opt.text}</span>
                          <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()
            ) : (
              /* Result Step */
              <div className="text-center py-4 space-y-4">
                <div className="text-5xl">{rec.emoji}</div>
                <div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-300 dark:border-emerald-800">
                    <Sparkles className="w-3 h-3 text-emerald-500" /> KẾT QUẢ GỢI Ý LỘ TRÌNH DÀNH CHO BẠN
                  </span>
                  <h3 className="text-lg font-black text-stone-900 dark:text-stone-100 mt-2">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto leading-relaxed">
                    {rec.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleComplete}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  Bắt đầu học ngay <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
