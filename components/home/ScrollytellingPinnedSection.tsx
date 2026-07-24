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
  Users,
  Wallet,
  TrendingUp,
  Award,
} from "lucide-react";

export default function ScrollytellingPinnedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll progress mapped over 300vh scroll distance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Panel 1 Opacity, Y Translate, Scale
  const p1Opacity = useTransform(scrollYProgress, [0, 0.24, 0.32], [1, 1, 0]);
  const p1Y = useTransform(scrollYProgress, [0, 0.24, 0.32], [0, 0, -40]);
  const p1Scale = useTransform(scrollYProgress, [0, 0.24, 0.32], [1, 1, 0.96]);

  // Panel 2 Opacity, Y Translate, Scale
  const p2Opacity = useTransform(scrollYProgress, [0.28, 0.35, 0.58, 0.65], [0, 1, 1, 0]);
  const p2Y = useTransform(scrollYProgress, [0.28, 0.35, 0.58, 0.65], [40, 0, 0, -40]);
  const p2Scale = useTransform(scrollYProgress, [0.28, 0.35, 0.58, 0.65], [0.96, 1, 1, 0.96]);

  // Panel 3 Opacity, Y Translate, Scale
  const p3Opacity = useTransform(scrollYProgress, [0.62, 0.70, 1], [0, 1, 1]);
  const p3Y = useTransform(scrollYProgress, [0.62, 0.70, 1], [40, 0, 0]);
  const p3Scale = useTransform(scrollYProgress, [0.62, 0.70, 1], [0.96, 1, 1]);

  // Step Indicators Progress (0 to 2)
  const activeStep = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 2]);

  return (
    <section ref={containerRef} className="relative h-[300vh] font-sans bg-white dark:bg-stone-950">
      {/* Pinned 100vh Sticky Viewport Frame */}
      <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden border-y border-stone-200/80 dark:border-stone-850/80 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Top Floating Scrolly Progress Bar */}
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between shrink-0 mb-2 z-30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Scrollytelling Preview
            </span>
          </div>

          <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-900 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800">
            {[
              { id: 0, label: "1. Vì sao ở lại" },
              { id: 1, label: "2. Phương pháp" },
              { id: 2, label: "3. Đối tượng" },
            ].map((step, idx) => (
              <motion.div
                key={step.id}
                className="flex items-center gap-1.5"
              >
                <motion.span
                  style={{
                    opacity: useTransform(activeStep, (v) => (Math.round(v) === idx ? 1 : 0.45)),
                    fontWeight: useTransform(activeStep, (v) => (Math.round(v) === idx ? 900 : 600)),
                  }}
                  className="text-[11px] sm:text-xs text-stone-900 dark:text-stone-100 transition-colors"
                >
                  {step.label}
                </motion.span>
                {idx < 2 && <span className="text-stone-300 dark:text-stone-700 text-xs">/</span>}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 3 FULL-SCREEN STACKED PANELS (Absolute Overlay inside Pinned Viewport) ── */}
        <div className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center min-h-0">

          {/* ════════════ PANEL 1: VÌ SAO HỌC VIÊN CHỌN Ở LẠI ════════════ */}
          <motion.div
            style={{ opacity: p1Opacity, y: p1Y, scale: p1Scale }}
            className="absolute inset-0 flex flex-col justify-center my-auto pointer-events-auto"
          >
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 mb-2">
                01 / GIỮ CHÂN NGHỆ THUẬT
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-stone-950 dark:text-stone-100 tracking-tight leading-snug">
                Vì sao 92% học viên chọn duy trì học mỗi ngày?
              </h2>
              <p className="mt-2 text-xs sm:text-base text-stone-600 dark:text-stone-400 font-medium leading-relaxed">
                Giải quyết 4 rào cản tâm lý lớn nhất khi tự học tài chính bằng trải nghiệm sản phẩm tinh gọn.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto w-full">
              {[
                {
                  icon: Brain,
                  title: "Chống quên bài học",
                  desc: "Hệ thống Spaced Repetition tự động nhắc ôn lại đúng thời điểm sắp quên, giúp nhớ bền vững.",
                },
                {
                  icon: Sparkles,
                  title: "100% Miễn phí mãi mãi",
                  desc: "Không khoá học trả phí đắt đỏ ẩn phía sau. Toàn bộ 430+ bài học hoàn toàn tự do tiếp cận.",
                },
                {
                  icon: GraduationCap,
                  title: "Lộ trình rõ ràng từ vỡ lòng",
                  desc: "Chia chặng từng bước từ cơ bản đến phân tích báo cáo tài chính chuyên sâu, không sợ mất hướng.",
                },
                {
                  icon: Gauge,
                  title: "Đo lường phản xạ thực tế",
                  desc: "Quiz Active Recall + XP bảng xếp hạng giúp biết ngay mức độ hiểu bài chuẩn xác.",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/80 shadow-xs hover:border-emerald-400/60 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-stone-900 dark:text-stone-100">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-stone-600 dark:text-stone-400 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ════════════ PANEL 2: PHƯƠNG PHÁP HỌC ════════════ */}
          <motion.div
            style={{ opacity: p2Opacity, y: p2Y, scale: p2Scale }}
            className="absolute inset-0 flex flex-col justify-center my-auto pointer-events-auto"
          >
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 mb-2">
                02 / PHƯƠNG PHÁP KHOA HỌC
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-stone-950 dark:text-stone-100 tracking-tight leading-snug">
                Spaced Repetition & Active Recall — Học ít, nhớ lâu
              </h2>
              <p className="mt-2 text-xs sm:text-base text-stone-600 dark:text-stone-400 font-medium leading-relaxed">
                Phương pháp ghi nhớ bám sát đường cong quên lãng (Forgetting Curve) của não bộ.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 max-w-4xl mx-auto w-full">
              {[
                {
                  step: "01",
                  icon: Clock,
                  title: "5-7 phút / bài",
                  text: "Bài học ngắn gọn, tập trung đúng 1 khái niệm cốt lõi không quá tải.",
                },
                {
                  step: "02",
                  icon: Target,
                  title: "Active Recall",
                  text: "Bắt não bộ kích hoạt nhớ lại kiến thức qua Quiz kiểm tra ngay.",
                },
                {
                  step: "03",
                  icon: RotateCcw,
                  title: "Nhắc ôn đúng lúc",
                  text: "Câu hỏi ôn lặp lại xuất hiện tự động sau ~5 bài & ~12 bài tiếp theo.",
                },
                {
                  step: "04",
                  icon: CheckCircle2,
                  title: "Khắc sâu bản chất",
                  text: "Biến lý thuyết thành phản xạ tự nhiên khi đọc báo cáo tài chính.",
                },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900/50">
                          Bước {step.step}
                        </span>
                        <Icon className="w-4 h-4 text-stone-400" />
                      </div>
                      <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-400 font-medium leading-relaxed">
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
            style={{ opacity: p3Opacity, y: p3Y, scale: p3Scale }}
            className="absolute inset-0 flex flex-col justify-center my-auto pointer-events-auto"
          >
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 mb-2">
                03 / ĐỐI TƯỢNG PHÙ HỢP
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-stone-950 dark:text-stone-100 tracking-tight leading-snug">
                Lộ trình được thiết kế dành riêng cho bạn
              </h2>
              <p className="mt-2 text-xs sm:text-base text-stone-600 dark:text-stone-400 font-medium leading-relaxed">
                Dù bạn bắt đầu từ con số 0 hay cần chuẩn hóa kiến thức chuyên sâu.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto w-full">
              {[
                {
                  icon: Wallet,
                  title: "Tài chính cá nhân",
                  tag: "Quản lý dòng tiền",
                  text: "Dành cho ai muốn hiểu tiền, tiết kiệm, chi tiêu và đầu tư an toàn hằng ngày.",
                },
                {
                  icon: GraduationCap,
                  title: "Người học CFA",
                  tag: "CFA Candidates",
                  text: "Cần nạp nền tảng kiến thức chắc chắn, tăng độ bền tư duy và phản xạ lý thuyết.",
                },
                {
                  icon: Award,
                  title: "Financial Planner",
                  tag: "Chuyên viên tư vấn",
                  text: "Chuẩn hóa khung tư duy hoạch định tài chính bài bản để làm việc với khách hàng.",
                },
                {
                  icon: TrendingUp,
                  title: "Nhà đầu tư cá nhân",
                  tag: "Đọc BCTC & Cổ phiếu",
                  text: "Nắm vững cách đọc chỉ số tài chính, bóc tách doanh nghiệp và tự tin ra quyết định.",
                },
              ].map((audience, idx) => {
                const Icon = audience.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/80 shadow-xs flex flex-col justify-between hover:border-emerald-400/60 transition-all"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-3">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                        {audience.tag}
                      </span>
                      <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 mt-1">
                        {audience.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-400 font-medium leading-relaxed">
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
        <div className="w-full text-center shrink-0 z-30">
          <p className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
            ↓ Cuộn chuột để trải nghiệm tiếp các phần
          </p>
        </div>

      </div>
    </section>
  );
}
