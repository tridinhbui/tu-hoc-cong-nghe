"use client";

import { useEffect, useRef, useState } from "react";
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
import { useRoutePrefetch } from "@/lib/use-route-prefetch";

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
  const userCountLoadedRef = useRef(false);

  useRoutePrefetch(["/login", "/login?mode=signup", `/bai-hoc/${TRACKS.personal.previewSlug}`], { delayMs: 500 });

  useEffect(() => {
    const cancelledRef = { current: false };
    const loadUserCount = async () => {
      try {
        const count = await getTotalUserCount();
        if (cancelledRef.current || !count) return;
        const safeCount = Math.max(count, 1000);
        if (!userCountLoadedRef.current) {
          userCountLoadedRef.current = true;
          animateCountTo(safeCount, setDisplayedUserCount, cancelledRef);
        } else {
          setDisplayedUserCount(safeCount);
        }
      } catch (error) {
        console.error("Error loading total user count:", error);
      }
    };

    void loadUserCount();
    const intervalId = window.setInterval(() => {
      void loadUserCount();
    }, 30000);

    return () => {
      cancelledRef.current = true;
      window.clearInterval(intervalId);
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
      <div className="border-b border-emerald-100 bg-emerald-50/85 dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-sm font-semibold text-stone-700 dark:text-stone-200">
            Duy trì miễn phí vĩnh viễn cho cộng đồng học tài chính cá nhân, CFA, financial planner, investor và người làm tài chính chuyên nghiệp.
          </p>
          <a
            href="https://www.facebook.com/share/g/1C2jTdsgF5/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
          >
            Tham gia group cộng đồng
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

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
              Cộng đồng hỗ trợ · Miễn phí vĩnh viễn · Cho mọi lộ trình tài chính
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
              300+ bài học miễn phí cho người học tài chính cá nhân, CFA, financial planner, investor
              và cả người mới vào nghề kế toán hoặc tài chính chuyên nghiệp. Học theo Spaced
              Repetition để nhớ lâu thay vì học vẹt rồi quên.
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
              className="mb-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40 px-5 py-3.5 w-fit"
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:border-emerald-900/50 dark:bg-stone-900/60 dark:text-emerald-300">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
                </span>
                Live cập nhật trực tiếp
              </div>
              <div className="flex items-stretch divide-x divide-stone-200 dark:divide-stone-800">
                <div className="pr-6">
                  <LiveNumber value={displayedUserCount} className="text-2xl" />
                  <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 mt-0.5">người học</p>
                </div>
                <div className="pl-6">
                  <LiveNumber value={displayedLessonCount} className="text-2xl" />
                  <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 mt-0.5">bài học</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.28 }}
              className="max-w-xl rounded-2xl border border-rose-100 dark:border-rose-950 bg-rose-50/70 dark:bg-rose-950/20 px-5 py-4"
            >
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    Duy trì miễn phí vĩnh viễn cho cộng đồng tài chính
                  </p>
                  <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    Từ tài chính cá nhân đến CFA, planning, đầu tư, và nền tảng nghề nghiệp cho kế toán
                    hoặc nhân sự tài chính mới vào nghề.
                  </p>
                  <a
                    href="https://www.facebook.com/share/g/1C2jTdsgF5/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-rose-600 transition-colors hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
                  >
                    Vào group Facebook của cộng đồng
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
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

      {/* ── VISION & MISSION ── */}
      <section className="max-w-6xl mx-auto px-6 pb-8 lg:pb-12">
        <ScrollReveal>
          <div className="rounded-[30px] border border-stone-200 dark:border-stone-800 bg-[linear-gradient(135deg,rgba(255,255,255,0.985),rgba(248,250,252,0.94))] dark:bg-[linear-gradient(135deg,rgba(28,25,23,0.98),rgba(24,24,27,0.94))] p-6 lg:p-8 shadow-[0_24px_60px_-42px_rgba(28,25,23,0.2)]">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.95fr)] lg:items-start">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-sm shadow-sm ring-1 ring-emerald-200/80 dark:bg-emerald-950/40 dark:ring-emerald-900/50">
                    🇻🇳
                  </span>
                  Vì sao chúng tôi làm
                </p>
                <h2 className="max-w-2xl text-2xl lg:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
                  Hiểu biết tài chính ở Việt Nam đang cải thiện, nhưng khoảng trống nền tảng vẫn còn rất lớn.
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-900/50 bg-emerald-50/70 dark:bg-emerald-950/20 px-4 py-4">
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                      Hiểu biết cơ bản
                    </div>
                    <div className="mt-3 text-4xl font-extrabold tracking-tight text-emerald-700 dark:text-emerald-300">
                      24%
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                      đạt ngưỡng hiểu biết tài chính cơ bản.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/50 px-4 py-4">
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                      Khoảng trống còn lại
                    </div>
                    <div className="mt-3 text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
                      3/4
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                      vẫn chưa đạt mức nền tảng.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/50 px-4 py-4">
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                      Tiếp cận năm 2024
                    </div>
                    <div className="mt-3 text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
                      70,6%
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                      đã có tài khoản tài chính hoặc tiền di động.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-stone-50/80 dark:bg-stone-900/50 px-4 py-4 text-sm lg:text-base leading-relaxed text-stone-600 dark:text-stone-400">
                  Vấn đề không nằm ở việc người học thiếu cố gắng, mà ở chỗ kiến thức tài chính thường còn khó, rời rạc và xa nhu cầu thực tế.
                </div>
              </div>

              <div className="lg:self-center lg:translate-y-4">
                <div className="rounded-[28px] border border-emerald-200/80 dark:border-emerald-900/50 bg-[linear-gradient(180deg,rgba(236,253,245,0.78),rgba(220,252,231,0.6))] dark:bg-[linear-gradient(180deg,rgba(6,78,59,0.2),rgba(4,120,87,0.12))] p-5 lg:p-6 shadow-[0_22px_48px_-36px_rgba(16,185,129,0.28)]">
                <p className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-sm shadow-sm ring-1 ring-emerald-200/80 dark:bg-stone-950/30 dark:ring-emerald-900/40">
                    🇻🇳
                  </span>
                  Tầm nhìn và sứ mệnh
                </p>
                <div className="grid gap-3">
                  <div className="rounded-2xl bg-white/55 dark:bg-stone-950/10 px-4 py-4">
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                      Mục tiêu
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                      Xây giáo trình miễn phí, rõ ràng và đủ sâu cho người học cá nhân lẫn người đi theo nghề.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-emerald-100/60 dark:bg-emerald-900/20 px-4 py-4">
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                      Tinh thần
                    </div>
                    <p className="mt-2 text-sm leading-relaxed font-semibold text-emerald-700 dark:text-emerald-300">
                      Làm vì cộng đồng, duy trì miễn phí và giúp kiến thức tài chính trở nên gần gũi hơn với mọi người.
                    </p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── WHO IT IS FOR ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <ScrollReveal className="max-w-2xl mb-10">
          <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
            Đối tượng phù hợp
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100">
            Nền tảng này dành cho ai?
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400 leading-relaxed">
            Mục tiêu của chúng tôi là đem kiến thức tài chính đến với nhiều nhóm người học khác nhau,
            từ tự học cá nhân đến lộ trình nghề nghiệp chuyên sâu.
          </p>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Tài chính cá nhân",
              text: "Người muốn hiểu tiền, tiết kiệm, đầu tư, nợ, ngân sách và cách ra quyết định tài chính hằng ngày.",
            },
            {
              title: "Người học CFA",
              text: "Ai cần nền tảng kiến thức chắc hơn để học CFA, luyện tư duy phân tích và tăng độ bền kiến thức.",
            },
            {
              title: "Financial planner",
              text: "Người làm tư vấn hoặc lập kế hoạch tài chính cần hệ thống hóa kiến thức để tư vấn tự tin hơn.",
            },
            {
              title: "Investor",
              text: "Nhà đầu tư cá nhân muốn hiểu doanh nghiệp, định giá, dòng tiền và chất lượng tài sản sâu hơn.",
            },
            {
              title: "Kế toán mới vào nghề",
              text: "Người mới đi làm cần củng cố nền tảng để đọc số liệu, hiểu báo cáo và giao tiếp tài chính tốt hơn.",
            },
            {
              title: "Tài chính chuyên nghiệp mới vào nghề",
              text: "Nhân sự finance/FP&A/analysis mới vào nghề cần một hệ thống học nhanh, rõ và bền hơn.",
            },
          ].map((item) => (
            <ScrollReveal key={item.title}>
              <div className="h-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/70 dark:border-emerald-900/40 dark:bg-emerald-950/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                  Phù hợp
                </div>
                <h3 className="mt-4 text-lg font-bold text-stone-900 dark:text-stone-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{item.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="bg-stone-50 dark:bg-stone-900/40 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-start">
          <ScrollReveal>
            <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              Cộng đồng thật
            </p>
            <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Học viên nổi bật đang học mỗi ngày, từ tài chính cá nhân đến CFA và nghề nghiệp tài chính
            </h2>
            <PublicLeaderboardPreview />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex items-start gap-3 rounded-2xl border border-rose-100 dark:border-rose-950 bg-rose-50/60 dark:bg-rose-950/20 px-5 py-4 mb-4">
              <Heart className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Cam kết toàn bộ bài học tại đây{" "}
                <strong className="text-stone-800 dark:text-stone-200">miễn phí mãi mãi</strong> vì sự
                phát triển của cộng đồng học tài chính cá nhân, CFA, financial planner, investor và
                người làm tài chính chuyên nghiệp.{" "}
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
                "Không dùng thử giới hạn ngày",
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
