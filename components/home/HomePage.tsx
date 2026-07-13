"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Gauge,
  Sparkles,
  Heart,
  Brain,
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { getTotalUserCount } from "@/lib/supabase-user";
import { animateCountTo } from "@/lib/animate-count";
import { TRACKS, type TrackId } from "@/lib/tracks";
import Logo from "@/components/Logo";
import LiveNumber from "@/components/LiveNumber";
import ScrollReveal from "@/components/home/ScrollReveal";
import TrackPreviewPanel from "@/components/login/TrackPreviewPanel";
import PublicLeaderboardPreview from "@/components/login/PublicLeaderboardPreview";

// Each pain point is framed as the visitor's actual internal objection
// before signing up for yet another "learn finance" product - not a
// generic feature list. Answering the objection directly (in the same
// card) is what makes this read as understanding the customer instead of
// just listing capabilities.
const PAIN_POINTS = [
  {
    icon: Brain,
    worry: "“Học xong rồi vài tuần sau quên sạch”",
    answer:
      "Hệ thống tự chèn câu hỏi ôn lại đúng lúc sắp quên (Spaced Repetition) - không phải đọc một lần rồi thôi.",
  },
  {
    icon: Sparkles,
    worry: "“Sợ đóng tiền một khoá đắt rồi bỏ dở”",
    answer: "Toàn bộ 300+ bài học miễn phí mãi mãi - không có phiên bản trả phí ẩn phía sau.",
  },
  {
    icon: GraduationCap,
    worry: "“Không biết nên bắt đầu từ đâu”",
    answer: "Lộ trình chia theo chặng rõ ràng, từ vỡ lòng đến chuyên sâu, theo đúng thứ tự cần học.",
  },
  {
    icon: Gauge,
    worry: "“Tự học một mình, không ai kiểm tra mình có hiểu không”",
    answer: "Quiz sau mỗi bài, điểm XP, bảng xếp hạng thật - biết ngay mình đã hiểu đúng hay chưa.",
  },
] as const;

const METHOD_STEPS = [
  { step: "1", title: "Học một bài ngắn", text: "5-7 phút mỗi bài, đủ để không quá tải nhưng đủ sâu để hiểu bản chất." },
  { step: "2", title: "Làm quiz ngay sau đó", text: "Active recall - tự nhớ lại thay vì đọc lại, giúp kiến thức bám sâu hơn." },
  { step: "3", title: "Hệ thống nhắc ôn đúng lúc", text: "Trước khi bạn kịp quên (~5 và ~12 bài sau), một câu hỏi ôn lại xuất hiện." },
  { step: "4", title: "Nhớ lâu, không học vẹt", text: "Kiến thức được củng cố nhiều lần theo đúng đường cong quên lãng (forgetting curve)." },
] as const;

export default function HomePage() {
  const [displayedUserCount, setDisplayedUserCount] = useState(0);
  const [displayedLessonCount, setDisplayedLessonCount] = useState(0);
  const [previewTrack, setPreviewTrack] = useState<TrackId>("personal");

  useEffect(() => {
    const cancelledRef = { current: false };
    getTotalUserCount()
      .then((count) => {
        if (cancelledRef.current || !count) return;
        animateCountTo(Math.max(count, 1000), setDisplayedUserCount, cancelledRef);
      })
      .catch((error) => console.error("Error loading total user count:", error));
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  useEffect(() => {
    const cancelledRef = { current: false };
    fetch("/api/lesson-count")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count?: number } | null) => {
        if (cancelledRef.current || !data?.count) return;
        animateCountTo(Math.max(data.count, 300), setDisplayedLessonCount, cancelledRef);
      })
      .catch((error) => console.error("Error loading lesson count:", error));
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  return (
    <div className="bg-white dark:bg-stone-950">
      {/* ── NAV ── */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-100 dark:border-stone-900">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size={26} />
            <span className="text-sm font-bold text-stone-700 dark:text-stone-300 uppercase tracking-widest hidden sm:inline">
              Tự Học Tài Chính
            </span>
          </div>
          <Link
            href="/login"
            className="group inline-flex items-center gap-2 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/25"
          >
            Vào học ngay
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-0 w-[32rem] h-[32rem] rounded-full bg-emerald-200/40 dark:bg-emerald-900/20 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-stone-200/50 dark:bg-stone-800/30 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-14 lg:pt-24 lg:pb-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
            <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 mb-4"
            >
              <span className="relative flex w-1.5 h-1.5">
                <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
              </span>
              Miễn phí mãi mãi · Không cần thẻ tín dụng
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 }}
              className="text-5xl lg:text-6xl font-bold text-stone-900 dark:text-stone-100 leading-[0.98] mb-5"
            >
              Hiểu{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                tiền bạc
              </span>
              ,<br />quản lý tài sản
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
              className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-7 max-w-xl"
            >
              300+ bài học miễn phí từ vỡ lòng đến phân tích doanh nghiệp, ứng dụng Spaced
              Repetition để bạn nhớ lâu thay vì học vẹt rồi quên.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.18 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <Link
                href="/login?mode=signup"
                className="group inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-stone-900/10 active:scale-[0.98]"
              >
                Bắt đầu học miễn phí
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href={`/bai-hoc/${TRACKS.personal.previewSlug}`}
                className="inline-flex items-center gap-2 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold px-6 py-3.5 rounded-xl transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                Xem thử bài học
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.24 }}
              className="flex items-stretch divide-x divide-stone-200 dark:divide-stone-800 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40 px-5 py-3.5 w-fit"
            >
              <div className="pr-6">
                <LiveNumber value={displayedUserCount} className="text-2xl" />
                <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 mt-0.5">người học</p>
              </div>
              <div className="pl-6">
                <LiveNumber value={displayedLessonCount} className="text-2xl" />
                <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 mt-0.5">bài học</p>
              </div>
            </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 }}
              className="relative hidden lg:flex justify-center"
            >
              <div className="relative w-full max-w-[480px] rounded-[2rem] border border-emerald-100/80 dark:border-emerald-900/40 bg-white/80 dark:bg-stone-900/60 p-8 shadow-[0_35px_90px_-45px_rgba(16,185,129,0.35)] backdrop-blur">
                <div className="absolute inset-x-10 top-8 h-24 rounded-full bg-emerald-300/25 dark:bg-emerald-700/15 blur-3xl" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="absolute inset-0 scale-125 rounded-full bg-emerald-200/40 dark:bg-emerald-800/20 blur-2xl" />
                    <Logo size={220} className="relative rounded-[2rem] shadow-2xl shadow-emerald-500/10" />
                  </div>

                  <div className="mt-8 grid w-full gap-3">
                    <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-950/40 px-4 py-3">
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                        Học rõ ràng hơn
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                        Một lộ trình gọn, dễ theo và đủ đẹp để tạo cảm giác muốn quay lại học tiếp mỗi ngày.
                      </p>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white/75 dark:bg-stone-900/70 px-4 py-3">
                      <span className="text-sm font-semibold text-stone-600 dark:text-stone-300">Spaced Repetition</span>
                      <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">Nhớ lâu hơn</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS / TRUST ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <ScrollReveal className="max-w-2xl mb-10">
          <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
            Vì sao học viên chọn ở lại
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100">
            Những lo lắng thường gặp khi tự học tài chính
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {PAIN_POINTS.map(({ icon: Icon, worry, answer }, i) => (
            <ScrollReveal key={worry} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors">
                <span className="inline-flex w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                </span>
                <p className="text-sm font-bold text-stone-500 dark:text-stone-500 italic mb-1.5">{worry}</p>
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{answer}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── METHOD (Spaced Repetition) ── */}
      <section className="bg-stone-50 dark:bg-stone-900/40 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal className="max-w-2xl mb-10">
            <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              Phương pháp học
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              Spaced Repetition - học ít, nhớ lâu
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              Không phải mẹo riêng của chúng tôi - đây là phương pháp ôn tập ngắt quãng được
              khoa học nhận thức nghiên cứu kỹ nhất, dựa trên đường cong quên lãng
              (Ebbinghaus forgetting curve).
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {METHOD_STEPS.map(({ step, title, text }, i) => (
              <ScrollReveal key={step} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center mb-3">
                    {step}
                  </div>
                  <p className="font-bold text-stone-900 dark:text-stone-100 mb-1.5">{title}</p>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACKS ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <ScrollReveal className="max-w-2xl mb-8">
          <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
            Lộ trình
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100">
            Chọn lộ trình phù hợp với bạn
          </h2>
        </ScrollReveal>

        <ScrollReveal className="max-w-2xl">
          <TrackPreviewPanel previewTrack={previewTrack} setPreviewTrack={setPreviewTrack} />
        </ScrollReveal>

        <ScrollReveal delay={0.08} className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/70 dark:bg-emerald-950/20 px-5 py-4">
            <div>
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Chưa chắc nên đi track nào?
              </p>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                Tạo tài khoản và vào thẳng bài đầu tiên, hệ thống sẽ giúp bạn chỉnh lại hành trình sau.
              </p>
            </div>
            <Link
              href="/login?mode=signup"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white px-5 py-3 text-sm font-bold text-white dark:text-stone-900 transition-colors whitespace-nowrap"
            >
              Tạo hành trình học
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="bg-stone-50 dark:bg-stone-900/40 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-start">
          <ScrollReveal>
            <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              Cộng đồng thật
            </p>
            <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Học viên nổi bật đang học mỗi ngày
            </h2>
            <PublicLeaderboardPreview />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex items-start gap-3 rounded-2xl border border-rose-100 dark:border-rose-950 bg-rose-50/60 dark:bg-rose-950/20 px-5 py-4 mb-4">
              <Heart className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Cam kết toàn bộ bài học tại đây{" "}
                <strong className="text-stone-800 dark:text-stone-200">miễn phí mãi mãi</strong> vì sự
                phát triển của cộng đồng Tự Học Tài Chính.{" "}
                <a
                  href="https://www.facebook.com/share/g/1C2jTdsgF5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-rose-600 dark:text-rose-400 hover:underline"
                >
                  Tham gia group Facebook →
                </a>
              </p>
            </div>
            <ul className="space-y-2.5">
              {[
                "Không cần thẻ tín dụng, không dùng thử giới hạn ngày",
                "Không quảng cáo xen giữa bài học",
                "Nội dung được cập nhật và mở rộng liên tục",
              ].map((line) => (
                <li key={line} className="flex items-center gap-2.5 text-sm text-stone-600 dark:text-stone-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {line}
                </li>
              ))}
            </ul>

            <Link
              href="/login?mode=signup"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
            >
              Vào học cùng cộng đồng
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden bg-stone-900 dark:bg-stone-950">
        <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <ScrollReveal className="relative max-w-3xl mx-auto px-6 py-20 text-center">
          <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Sẵn sàng hiểu tiền bạc của chính mình?
          </h2>
          <p className="text-stone-300 leading-relaxed mb-8 max-w-xl mx-auto">
            Không mất phí, không cần thẻ, học ngay trong 30 giây.
          </p>
          <Link
            href="/login?mode=signup"
            className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-900 font-bold px-7 py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]"
          >
            Bắt đầu học miễn phí
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400 dark:text-stone-600">
        <div className="flex items-center gap-2">
          <Logo size={18} />
          Tự Học Tài Chính
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dieu-khoan" className="hover:text-stone-600 dark:hover:text-stone-400">
            Điều khoản sử dụng
          </Link>
          <Link href="/chinh-sach-bao-mat" className="hover:text-stone-600 dark:hover:text-stone-400">
            Chính sách bảo mật
          </Link>
        </div>
      </footer>
    </div>
  );
}
