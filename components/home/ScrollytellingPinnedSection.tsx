"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  GraduationCap,
  Gauge,
  CheckCircle2,
  Clock,
  RotateCcw,
  Target,
  Wallet,
  TrendingUp,
  Award,
} from "lucide-react";

const PANELS = [
  {
    id: 0,
    tag: "01 / NGUYÊN TẮC THIẾT KẾ",
    badge: "1. Vì sao ở lại",
    title: "Vì sao 92% học viên duy trì thói quen học mỗi ngày?",
    subtitle: "Giải quyết 4 rào cản tâm lý lớn nhất khi tự học tài chính bằng thiết kế sản phẩm tinh gọn.",
    items: [
      {
        icon: Brain,
        title: "Chống quên bài học",
        desc: "Spaced Repetition tự động nhắc ôn lại đúng thời điểm sắp quên.",
      },
      {
        icon: Sparkles,
        title: "100% Miễn phí mãi mãi",
        desc: "Không khoá học trả phí đắt đỏ ẩn phía sau. Tự do học hoàn toàn.",
      },
      {
        icon: GraduationCap,
        title: "Lộ trình rõ ràng",
        desc: "Chia chặng từng bước từ cơ bản đến phân tích báo cáo tài chính.",
      },
      {
        icon: Gauge,
        title: "Đo lường phản xạ",
        desc: "Quiz Active Recall + XP bảng xếp hạng giúp biết ngay độ hiểu bài.",
      },
    ],
  },
  {
    id: 1,
    tag: "02 / PHƯƠNG PHÁP KHOA HỌC",
    badge: "2. Phương pháp",
    title: "Spaced Repetition & Active Recall — Học ít, nhớ lâu",
    subtitle: "Phương pháp ghi nhớ bám sát đường cong quên lãng (Forgetting Curve) của não bộ.",
    items: [
      {
        step: "01",
        icon: Clock,
        title: "5-7 phút / bài",
        desc: "Bài học ngắn gọn, tập trung đúng 1 khái niệm cốt lõi.",
      },
      {
        step: "02",
        icon: Target,
        title: "Active Recall",
        desc: "Bắt não kích hoạt nhớ lại kiến thức qua Quiz kiểm tra.",
      },
      {
        step: "03",
        icon: RotateCcw,
        title: "Nhắc ôn đúng lúc",
        desc: "Câu hỏi ôn lặp lại xuất hiện tự động sau ~5 bài tiếp.",
      },
      {
        step: "04",
        icon: CheckCircle2,
        title: "Khắc sâu bản chất",
        desc: "Biến lý thuyết thành phản xạ đọc báo cáo tài chính.",
      },
    ],
  },
  {
    id: 2,
    tag: "03 / ĐỐI TƯỢNG PHÙ HỢP",
    badge: "3. Đối tượng",
    title: "Lộ trình được thiết kế dành riêng cho bạn",
    subtitle: "Dù bạn bắt đầu từ con số 0 hay cần chuẩn hóa kiến thức chuyên sâu.",
    items: [
      {
        icon: Wallet,
        title: "Tài chính cá nhân",
        tag: "Dòng tiền",
        desc: "Dành cho ai muốn quản lý tiền, tiết kiệm và đầu tư an toàn.",
      },
      {
        icon: GraduationCap,
        title: "Người học CFA",
        tag: "Candidates",
        desc: "Cần nạp nền tảng kiến thức chắc chắn và phản xạ lý thuyết.",
      },
      {
        icon: Award,
        title: "Financial Planner",
        tag: "Tư vấn",
        desc: "Chuẩn hóa khung tư duy hoạch định tài chính bài bản.",
      },
      {
        icon: TrendingUp,
        title: "Nhà đầu tư cá nhân",
        tag: "Cổ phiếu",
        desc: "Nắm vững cách đọc chỉ số tài chính và bóc tách doanh nghiệp.",
      },
    ],
  },
];

export default function ScrollytellingPinnedSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto rotation timer every 6 seconds unless user pauses/clicks
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % PANELS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Mouse wheel scroll to flip tabs smoothly
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) < 15) return;

    if (e.deltaY > 0 && activeTab < PANELS.length - 1) {
      setActiveTab((prev) => prev + 1);
      setIsPaused(true);
    } else if (e.deltaY < 0 && activeTab > 0) {
      setActiveTab((prev) => prev - 1);
      setIsPaused(true);
    }
  };

  const currentPanel = PANELS[activeTab];

  return (
    <section className="relative w-full font-sans bg-white dark:bg-stone-950 py-8 sm:py-12 border-y border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Segmented Tab Controller */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Khám phá sản phẩm
            </span>
          </div>

          {/* Interactive 3 Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
            {PANELS.map((panel, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={panel.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(idx);
                    setIsPaused(true);
                  }}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isActive
                      ? "text-stone-950 dark:text-stone-900 shadow-sm"
                      : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="scrollyTabPill"
                      className="absolute inset-0 bg-white dark:bg-emerald-400 rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{panel.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Panel Content Stage (Support Wheel Scroll & Zero Empty Space Gap!) */}
        <div
          onWheel={handleWheel}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative min-h-[380px] sm:min-h-[340px] rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 p-5 sm:p-8 shadow-sm overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPanel.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col justify-between h-full"
            >
              {/* Panel Header */}
              <div className="text-center max-w-2xl mx-auto mb-6">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 mb-2">
                  {currentPanel.tag}
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-stone-950 dark:text-stone-100 tracking-tight leading-snug">
                  {currentPanel.title}
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium leading-relaxed max-w-xl mx-auto">
                  {currentPanel.subtitle}
                </p>
              </div>

              {/* Panel Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {currentPanel.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="p-4 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900/90 shadow-xs hover:border-emerald-400/60 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <Icon className="w-4 h-4" />
                          </div>
                          {"step" in item && item.step && (
                            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900/50">
                              Bước {item.step}
                            </span>
                          )}
                          {"tag" in item && item.tag && (
                            <span className="text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 font-medium leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator Bar */}
          <div className="mt-6 flex justify-center gap-1.5">
            {PANELS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveTab(idx);
                  setIsPaused(true);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeTab === idx ? "w-8 bg-emerald-500" : "w-2 bg-stone-300 dark:bg-stone-700"
                }`}
                title={`Chuyển tới Tab ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
