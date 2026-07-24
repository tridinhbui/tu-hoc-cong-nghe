"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

export default function ScrollytellingPinnedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 300vh scroll container -> scrollYProgress from 0.00 to 1.00
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Panel 1 Transforms (0.00 -> 0.33)
  const p0Opacity = useTransform(scrollYProgress, [0, 0.26, 0.34], [1, 1, 0]);
  const p0Y = useTransform(scrollYProgress, [0, 0.26, 0.34], [0, 0, -45]);
  const p0Scale = useTransform(scrollYProgress, [0, 0.26, 0.34], [1, 1, 0.95]);

  // Panel 2 Transforms (0.33 -> 0.66)
  const p1Opacity = useTransform(scrollYProgress, [0.28, 0.35, 0.59, 0.67], [0, 1, 1, 0]);
  const p1Y = useTransform(scrollYProgress, [0.28, 0.35, 0.59, 0.67], [45, 0, 0, -45]);
  const p1Scale = useTransform(scrollYProgress, [0.28, 0.35, 0.59, 0.67], [0.95, 1, 1, 0.95]);

  // Panel 3 Transforms (0.66 -> 1.00)
  const p2Opacity = useTransform(scrollYProgress, [0.61, 0.69, 0.98], [0, 1, 1]);
  const p2Y = useTransform(scrollYProgress, [0.61, 0.69, 0.98], [45, 0, 0]);
  const p2Scale = useTransform(scrollYProgress, [0.61, 0.69, 0.98], [0.95, 1, 1]);

  // Step Progress Indicator (0, 1, 2)
  const activeStep = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 2]);

  return (
    <section ref={containerRef} className="relative h-[160vh] font-sans bg-white dark:bg-stone-950">
      {/* Crisp 1/2 VH Sticky Viewport Frame (Approx 48-50vh Height) */}
      <div className="sticky top-16 sm:top-20 h-[48vh] sm:h-[50vh] min-h-[340px] max-h-[440px] w-full flex flex-col justify-between overflow-hidden border-y border-stone-200/80 dark:border-stone-850/80 px-3 sm:px-6 lg:px-8 py-3 sm:py-4 shadow-xs">
        
        {/* Top Scrolly Progress Navigation Bar */}
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between shrink-0 mb-2 z-30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Scrollytelling
            </span>
          </div>

          {/* Interactive Step Pills */}
          <div className="flex items-center gap-1.5 sm:gap-3 bg-stone-100 dark:bg-stone-900/90 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 shadow-xs">
            {[
              { id: 0, label: "1. Vì sao ở lại" },
              { id: 1, label: "2. Phương pháp" },
              { id: 2, label: "3. Đối tượng" },
            ].map((step, idx) => (
              <div key={step.id} className="flex items-center gap-1 sm:gap-2">
                <motion.span
                  style={{
                    opacity: useTransform(activeStep, (v) => (Math.round(v) === idx ? 1 : 0.4)),
                    fontWeight: useTransform(activeStep, (v) => (Math.round(v) === idx ? 900 : 600)),
                  }}
                  className="text-[10px] sm:text-xs text-stone-900 dark:text-stone-100 transition-all"
                >
                  {step.label}
                </motion.span>
                {idx < 2 && <span className="text-stone-300 dark:text-stone-700 text-[10px]">/</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ── 3 FULL-SCREEN OVERLAY PANELS ── */}
        <div className="relative flex-1 w-full max-w-4xl mx-auto flex items-center justify-center min-h-0">

          {/* ════════════ PANEL 1: VÌ SAO HỌC VIÊN CHỌN Ở LẠI ════════════ */}
          <motion.div
            style={{ opacity: p0Opacity, y: p0Y, scale: p0Scale }}
            className="absolute inset-0 flex flex-col justify-center my-auto pointer-events-auto"
          >
            <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6">
              <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 mb-1.5">
                01 / NGUYÊN TẮC THIẾT KẾ
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-stone-950 dark:text-stone-100 tracking-tight leading-snug">
                Vì sao 92% học viên duy trì thói quen học mỗi ngày?
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium leading-relaxed max-w-xl mx-auto">
                Giải quyết 4 rào cản tâm lý lớn nhất khi tự học tài chính bằng thiết kế sản phẩm tinh gọn.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-3xl mx-auto w-full">
              {[
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
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/80 shadow-xs hover:border-emerald-400/60 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 font-medium leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ════════════ PANEL 2: PHƯƠNG PHÁP HỌC ════════════ */}
          <motion.div
            style={{ opacity: p1Opacity, y: p1Y, scale: p1Scale }}
            className="absolute inset-0 flex flex-col justify-center my-auto pointer-events-auto"
          >
            <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6">
              <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 mb-1.5">
                02 / PHƯƠNG PHÁP KHOA HỌC
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-stone-950 dark:text-stone-100 tracking-tight leading-snug">
                Spaced Repetition & Active Recall — Học ít, nhớ lâu
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium leading-relaxed max-w-xl mx-auto">
                Phương pháp ghi nhớ bám sát đường cong quên lãng (Forgetting Curve) của não bộ.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 max-w-3xl mx-auto w-full">
              {[
                {
                  step: "01",
                  icon: Clock,
                  title: "5-7 phút / bài",
                  text: "Bài học ngắn gọn, tập trung đúng 1 khái niệm cốt lõi.",
                },
                {
                  step: "02",
                  icon: Target,
                  title: "Active Recall",
                  text: "Bắt não kích hoạt nhớ lại kiến thức qua Quiz kiểm tra.",
                },
                {
                  step: "03",
                  icon: RotateCcw,
                  title: "Nhắc ôn đúng lúc",
                  text: "Câu hỏi ôn lặp lại xuất hiện tự động sau ~5 bài tiếp.",
                },
                {
                  step: "04",
                  icon: CheckCircle2,
                  title: "Khắc sâu bản chất",
                  text: "Biến lý thuyết thành phản xạ đọc báo cáo tài chính.",
                },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900/50">
                          Bước {step.step}
                        </span>
                        <Icon className="w-3.5 h-3.5 text-stone-400" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 font-medium leading-snug">
                        {step.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ════════════ PANEL 3: ĐỐI TƯỢNG PHÙ HỢP ════════════ */}
          <motion.div
            style={{ opacity: p2Opacity, y: p2Y, scale: p2Scale }}
            className="absolute inset-0 flex flex-col justify-center my-auto pointer-events-auto"
          >
            <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6">
              <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 mb-1.5">
                03 / ĐỐI TƯỢNG PHÙ HỢP
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-stone-950 dark:text-stone-100 tracking-tight leading-snug">
                Lộ trình được thiết kế dành riêng cho bạn
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium leading-relaxed max-w-xl mx-auto">
                Dù bạn bắt đầu từ con số 0 hay cần chuẩn hóa kiến thức chuyên sâu.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 max-w-3xl mx-auto w-full">
              {[
                {
                  icon: Wallet,
                  title: "Tài chính cá nhân",
                  tag: "Dòng tiền",
                  text: "Dành cho ai muốn quản lý tiền, tiết kiệm và đầu tư an toàn.",
                },
                {
                  icon: GraduationCap,
                  title: "Người học CFA",
                  tag: "Candidates",
                  text: "Cần nạp nền tảng kiến thức chắc chắn và phản xạ lý thuyết.",
                },
                {
                  icon: Award,
                  title: "Financial Planner",
                  tag: "Tư vấn",
                  text: "Chuẩn hóa khung tư duy hoạch định tài chính bài bản.",
                },
                {
                  icon: TrendingUp,
                  title: "Nhà đầu tư cá nhân",
                  tag: "Cổ phiếu",
                  text: "Nắm vững cách đọc chỉ số tài chính và bóc tách doanh nghiệp.",
                },
              ].map((audience, idx) => {
                const Icon = audience.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/80 shadow-xs flex flex-col justify-between hover:border-emerald-400/60 transition-all"
                  >
                    <div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-2">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                        {audience.tag}
                      </span>
                      <h3 className="text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100 mt-0.5">
                        {audience.title}
                      </h3>
                      <p className="mt-1 text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 font-medium leading-snug">
                        {audience.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* Bottom Scroll Cue */}
        <div className="w-full text-center shrink-0 z-30 pt-1">
          <p className="text-[10px] sm:text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
            ↓ Cuộn chuột để lật trang tự động
          </p>
        </div>

      </div>
    </section>
  );
}
