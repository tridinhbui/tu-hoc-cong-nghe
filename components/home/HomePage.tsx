"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { getTotalUserCount, getTotalCompletedLessonsCount } from "@/lib/supabase-user";
import { animateCountTo } from "@/lib/animate-count";
import { TRACKS } from "@/lib/tracks";
import Logo from "@/components/Logo";
import LiveNumber from "@/components/LiveNumber";
import ScrollReveal from "@/components/home/ScrollReveal";
import ProductPreview from "@/components/home/ProductPreview";
import PublicLeaderboardPreview from "@/components/login/PublicLeaderboardPreview";
import InteractiveKingdomPreview from "@/components/home/InteractiveKingdomPreview";
import InteractiveEcosystemShowcase from "@/components/home/InteractiveEcosystemShowcase";
import ScrollytellingPinnedSection from "@/components/home/ScrollytellingPinnedSection";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

function SoftFadeDivider() {
  return (
    <div className="w-full h-12 pointer-events-none bg-gradient-to-b from-transparent via-emerald-500/10 dark:via-emerald-400/5 to-transparent my-[-1px]" />
  );
}

export default function HomePage() {
  const { t } = useI18n();
  const [displayedUserCount, setDisplayedUserCount] = useState(0);
  const [displayedLessonCount, setDisplayedLessonCount] = useState(0);
  const [displayedCompletedCount, setDisplayedCompletedCount] = useState(0);
  const [heroSpotlight, setHeroSpotlight] = useState({ x: 50, y: 35 });
  // Plain (non-animated) rounded-down count for inline copy ("360+ bài
  // học..." in the hero paragraph and pain-point card) - the animated
  // displayedLessonCount above counts up from 0 on load, which reads fine
  // as a standalone hero stat but looks broken mid-sentence in body text.
  const [lessonCountFloor, setLessonCountFloor] = useState<number | null>(null);
  const userCountLoadedRef = useRef(false);
  const completedCountLoadedRef = useRef(false);
  const heroParallaxX = (heroSpotlight.x - 50) / 10;
  const heroParallaxY = (heroSpotlight.y - 35) / 10;


  useEffect(() => {
    const cancelledRef = { current: false };
    const loadUserCount = async () => {
      try {
        const count = await getTotalUserCount();
        if (cancelledRef.current || !count) return;
        // Số THẬT, không có sàn. Trước đây chỗ này là Math.max(count, 1000):
        // một người học thứ 40 vẫn được trang chủ báo là người thứ 1.000. Sàn
        // như vậy không phải làm tròn cho đẹp mà là nói sai với người chưa đăng
        // ký - đúng nhóm người không có cách nào kiểm chứng.
        const safeCount = count;
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

    // Nạp MỘT lần, không lặp.
    //
    // Trước đây chỗ này gọi lại mỗi 30 giây. Đây là trang chủ công khai, nên
    // mỗi tab để mở - kể cả tab bị bỏ quên và mỗi bot chạy JS - gọi hai RPC
    // ĐẾM TOÀN BẢNG hai lần mỗi phút, mãi mãi. Con số nó nuôi là một dòng
    // trang trí ("Hơn X người học đã tham gia") thay đổi vài đơn vị mỗi ngày:
    // không có câu hỏi nào mà việc làm mới nó sau 30 giây trả lời được.
    void loadUserCount();

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
        animateCountTo(data.count, setDisplayedLessonCount, cancelledRef);
        setLessonCountFloor(Math.floor(data.count / 10) * 10);
      })
      .catch((error) => console.error("Error loading lesson count:", error));
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  useEffect(() => {
    const cancelledRef = { current: false };
    const loadCompletedCount = async () => {
      try {
        const count = await getTotalCompletedLessonsCount();
        if (cancelledRef.current || !count) return;
        // Số THẬT, không có sàn - xem ghi chú ở phần đếm người học.
        const safeCount = count;
        if (!completedCountLoadedRef.current) {
          completedCountLoadedRef.current = true;
          animateCountTo(safeCount, setDisplayedCompletedCount, cancelledRef);
        } else {
          setDisplayedCompletedCount(safeCount);
        }
      } catch (error) {
        console.error("Error loading total completed lessons count:", error);
      }
    };

    // Nạp một lần - xem ghi chú ở phần đếm người học phía trên.
    void loadCompletedCount();

    return () => {
      cancelledRef.current = true;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-stone-950 transition-colors duration-300">
      <div className="bg-stone-50/60 dark:bg-stone-950 relative overflow-hidden">
        {/* Stripe-style Ambient Radial Glow Beam, Grid Mesh & Floating Blur Orbs */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Top Radial Beam */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.22),rgba(20,184,166,0.08)_50%,transparent_100%)] opacity-90" />

          {/* Floating Glowing Blur Orbs (● blur) */}
          <div className="absolute -top-36 -left-36 w-[560px] h-[560px] rounded-full bg-emerald-400/22 blur-[130px] animate-pulse" />
          <div className="absolute top-[380px] -right-36 w-[500px] h-[500px] rounded-full bg-teal-400/20 blur-[130px]" />
          <div className="absolute top-[42%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-emerald-400/15 blur-[150px]" />
          <div className="absolute top-[70%] -left-44 w-[580px] h-[580px] rounded-full bg-sky-400/15 blur-[140px]" />

          {/* Stripe SVG Fine Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98112_1px,transparent_1px),linear-gradient(to_bottom,#10b98112_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_65%,transparent_100%)]" />
        </div>
      <style>{`
        @keyframes landing-aurora-drift {
          0% { transform: translate3d(-2%, -1%, 0) scale(1); }
          50% { transform: translate3d(2%, 1.5%, 0) scale(1.03); }
          100% { transform: translate3d(-1%, 2%, 0) scale(1.01); }
        }
        @keyframes landing-orbit-drift {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          100% { transform: translate3d(0, -16px, 0) rotate(360deg); }
        }
        @keyframes landing-grid-drift {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(24px, 18px, 0); }
        }
        @keyframes landing-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes landing-pulse-glow {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.78; transform: scale(1.08); }
        }
        @keyframes ticker-drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes spotlight-sweep {
          0% { transform: translateX(-130%) skewX(-18deg); opacity: 0; }
          20% { opacity: 0.18; }
          100% { transform: translateX(240%) skewX(-18deg); opacity: 0; }
        }
        .landing-texture::before {
          content: "";
          position: absolute;
          inset: -5%;
          background-image:
            radial-gradient(circle at 20% 25%, rgba(16,185,129,0.08), transparent 24%),
            radial-gradient(circle at 78% 18%, rgba(245,158,11,0.08), transparent 22%),
            radial-gradient(circle at 62% 72%, rgba(20,184,166,0.07), transparent 26%);
          pointer-events: none;
        }
        .landing-texture::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background-image:
            radial-gradient(rgba(15,23,42,0.35) 0.6px, transparent 0.6px),
            linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.8) 45%, transparent 100%);
          background-size: 16px 16px, 100% 100%;
          mix-blend-mode: multiply;
          pointer-events: none;
        }
        .landing-drift-grid {
          animation: landing-grid-drift 18s linear infinite alternate;
        }
        .landing-aurora {
          animation: landing-aurora-drift 16s ease-in-out infinite alternate;
        }
        .landing-orbit {
          animation: landing-orbit-drift 24s linear infinite;
        }
        .landing-glow {
          animation: landing-pulse-glow 8s ease-in-out infinite;
        }
        .landing-float {
          animation: landing-float 5.5s ease-in-out infinite;
        }
        .landing-ticker {
          animation: ticker-drift 26s linear infinite;
          width: max-content;
          will-change: transform;
          transform: translateZ(0);
        }
        .cta-electric {
          position: relative;
          overflow: hidden;
        }
        .cta-electric::after {
          content: "";
          position: absolute;
          inset: -40%;
          background: linear-gradient(110deg, transparent 34%, rgba(255,255,255,0.32) 48%, transparent 62%);
          transform: translateX(-140%) skewX(-18deg);
          animation: spotlight-sweep 3.8s ease-in-out infinite;
          pointer-events: none;
        }
        .cta-electric:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 18px 44px -22px rgba(16,185,129,0.65);
        }
        .landing-band {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .landing-band::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .landing-band > * {
          position: relative;
          z-index: 1;
        }
        .landing-band-soft::before {
          background:
            linear-gradient(180deg, rgba(255,255,255,0.78), rgba(248,250,252,0.45)),
            radial-gradient(circle at 18% 22%, rgba(16,185,129,0.08), transparent 26%),
            radial-gradient(circle at 82% 74%, rgba(20,184,166,0.07), transparent 24%);
        }
        .landing-band-glass::before {
          background:
            linear-gradient(180deg, rgba(248,250,252,0.88), rgba(255,255,255,0.58)),
            linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px);
          background-size: auto, 30px 30px, 30px 30px;
        }
        .landing-band-emerald::before {
          background:
            linear-gradient(180deg, rgba(236,253,245,0.92), rgba(255,255,255,0.68)),
            radial-gradient(circle at 20% 30%, rgba(16,185,129,0.12), transparent 24%),
            radial-gradient(circle at 78% 72%, rgba(5,150,105,0.08), transparent 22%);
        }
        .landing-band-dark::before {
          background:
            linear-gradient(180deg, rgba(12,18,28,0.92), rgba(12,18,28,0.78)),
            radial-gradient(circle at 18% 24%, rgba(245,158,11,0.12), transparent 20%),
            radial-gradient(circle at 78% 68%, rgba(16,185,129,0.1), transparent 24%);
        }
        .landing-band-divider::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -1px;
          width: min(92vw, 1120px);
          height: 96px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, rgba(255,255,255,0), rgba(16,185,129,0.06) 48%, rgba(255,255,255,0));
          filter: blur(18px);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>
      {/* Ambient background glows - fixed page-level, not nested inside any section */}
      <div className="pointer-events-none absolute inset-0 landing-texture z-0" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_12%_18%,rgba(16,185,129,0.12),transparent_28%),radial-gradient(circle_at_78%_12%,rgba(20,184,166,0.10),transparent_26%),linear-gradient(180deg,rgba(236,253,245,0.28),rgba(255,255,255,0.18)_38%,rgba(240,253,250,0.34))]" />
      <div className="pointer-events-none absolute inset-0 landing-drift-grid bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:28px_28px] z-0" />
      <div className="pointer-events-none absolute inset-0 landing-aurora z-0 opacity-90">
        <div className="absolute left-[8%] top-[8%] h-[22rem] w-[22rem] rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/10" />
        <div className="absolute right-[12%] top-[20%] h-[20rem] w-[20rem] rounded-full bg-teal-400/10 blur-[120px] dark:bg-teal-500/10" />
        <div className="absolute left-[46%] top-[48%] h-[26rem] w-[26rem] rounded-full bg-amber-400/10 blur-[140px] dark:bg-amber-400/10" />
      </div>
      <div className="pointer-events-none absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] z-0 landing-glow" />
      <div className="pointer-events-none absolute top-[45%] right-[8%] w-[550px] h-[550px] rounded-full bg-teal-500/10 dark:bg-teal-500/5 blur-[150px] z-0 landing-glow" />
      <div className="pointer-events-none absolute top-[75%] left-[12%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[130px] z-0 landing-glow" />

      <div className="relative z-10">
        {/* Top banner - pushed to the very top of the page per request, in
            Vietnamese-flag red/yellow, same commitment message previously
            further down in the Social Proof section (moved here, not
            duplicated). */}
        {/* Top banner - pushed to the very top of the page per request, in
            Vietnamese-flag red/yellow */}
        <div className="relative overflow-hidden bg-[#DA251D]">
          <div className="pointer-events-none absolute -top-8 -right-8 text-[100px] leading-none text-[#FFCD00]/10 select-none">
            ★
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col gap-1.5 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-3 sm:text-left">
            <span className="hidden sm:inline text-lg leading-none text-[#FFCD00]" aria-hidden="true">
              ★
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white/95 leading-relaxed">
              {t.home.banner.part1}
              <strong className="text-[#FFCD00]">{t.home.banner.freeForever}</strong>
              {t.home.banner.part2}
            </p>
            <a
              href="https://www.facebook.com/share/g/1C2jTdsgF5/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-black text-white hover:underline whitespace-nowrap shrink-0"
            >
              {t.home.banner.facebook}
              <ArrowRight className="icon-micro w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ── NAV ── */}
        <header className="sticky top-0 z-40 bg-white/85 dark:bg-stone-950/85 backdrop-blur-md border-b border-stone-100 dark:border-stone-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Logo size={28} />
              <span className="text-sm sm:text-base font-black text-stone-800 dark:text-stone-200 uppercase tracking-widest flex items-center gap-2">
                {t.home.brand}
                <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200/50 hidden xs:inline-block">
                  {t.home.brandBadge}
                </span>
              </span>
            </div>
            <Link
              href="/login"
              className="cta-electric group inline-flex items-center gap-2 rounded-2xl border border-emerald-200/80 dark:border-emerald-800 bg-gradient-to-r from-emerald-500 to-teal-500 px-4.5 py-2.5 text-sm font-bold text-white shadow-[0_12px_28px_-20px_rgba(16,185,129,0.35)] transition-all hover:shadow-[0_16px_34px_-22px_rgba(16,185,129,0.45)]"
            >
              {t.home.navCta}
              <ArrowRight className="icon-micro w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </header>

        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden landing-band landing-band-soft"
          onMouseMove={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setHeroSpotlight({
              x: Math.max(10, Math.min(90, x)),
              y: Math.max(10, Math.min(90, y)),
            });
          }}
        >
          <div className="absolute inset-0">
            <Image
              src="/times-square.jpg"
              alt={t.home.hero.bgAlt}
              fill
              sizes="100vw"
              className="object-cover object-center opacity-[0.16]"
              priority
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.16),transparent_26%),radial-gradient(circle_at_85%_25%,rgba(245,158,11,0.15),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.9),rgba(247,250,252,0.8)_40%,rgba(240,253,250,0.62)_100%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_26%),radial-gradient(circle_at_85%_25%,rgba(245,158,11,0.16),transparent_24%),linear-gradient(135deg,rgba(9,9,11,0.92),rgba(15,23,42,0.84)_40%,rgba(6,78,59,0.46)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
            <div
              className="pointer-events-none absolute inset-0 opacity-70 transition-[background-position] duration-300 ease-out"
              style={{
                background: `radial-gradient(circle at ${heroSpotlight.x}% ${heroSpotlight.y}%, rgba(255,255,255,0.34), transparent 22%), radial-gradient(circle at ${heroSpotlight.x}% ${heroSpotlight.y}%, rgba(16,185,129,0.14), transparent 32%)`,
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-10">
            <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7 max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-white/80 px-3.5 py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.14em] text-emerald-700 backdrop-blur-sm dark:border-emerald-900 dark:bg-stone-950/55 dark:text-emerald-300"
                >
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
                  </span>
                  {t.home.hero.badge}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
                  className="mb-4 text-[2.5rem] sm:text-[3.6rem] lg:text-[3.8rem] xl:text-[4.4rem] font-black leading-[1.02] tracking-tight text-stone-950 dark:text-stone-50"
                >
                  {t.home.hero.titlePart1}{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-black">
                    {t.home.hero.titleHighlight}
                  </span>
                  ,<br />
                  {t.home.hero.titlePart2}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
                  className="mb-8 max-w-xl text-[15px] leading-7 text-stone-600 [filter:none] dark:text-stone-300 sm:text-lg"
                >
                  {format(t.home.hero.sub, { count: lessonCountFloor ?? 360 })}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 }}
                  className="mb-10 flex flex-wrap items-center gap-3 [filter:none]"
                >
                  <Link
                    href="/login?mode=signup"
                    className="cta-electric group inline-flex items-center gap-2 rounded-[20px] bg-stone-950 px-6 py-3.5 text-base font-black text-white shadow-[0_16px_34px_-24px_rgba(15,23,42,0.38)] transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.015] active:scale-[0.98] hover:bg-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
                  >
                    {t.home.hero.ctaPrimary}
                    <ArrowRight className="icon-micro w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={`/bai-hoc/${TRACKS.personal.previewSlug}`}
                    className="inline-flex items-center gap-2 rounded-[20px] border border-stone-200/80 bg-white/70 px-5 py-3 text-sm font-bold text-stone-900 backdrop-blur transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.015] hover:bg-white dark:border-stone-700 dark:bg-stone-950/45 dark:text-stone-100 dark:hover:bg-stone-900"
                  >
                    <PlayCircle className="w-4 h-4" />
                    {t.home.hero.ctaSecondary}
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.24 }}
                  className="w-full rounded-[1.35rem] border border-stone-200/80 bg-white/70 px-4 py-3.5 shadow-[0_22px_44px_-30px_rgba(16,185,129,0.35)] backdrop-blur-sm dark:border-stone-800 dark:bg-stone-950/45 sm:w-fit sm:px-5"
                >
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:border-emerald-900/50 dark:bg-stone-900/60 dark:text-emerald-300">
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
                    </span>
                    {t.home.hero.liveLabel}
                  </div>
                  <div className="flex items-stretch divide-x divide-stone-200 dark:divide-stone-800">
                    <div className="min-w-0 pr-3 sm:pr-6">
                      <LiveNumber value={displayedUserCount} className="text-lg sm:text-2xl" />
                      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 sm:text-[11px]">{t.home.hero.statLearners}</p>
                    </div>
                    <div className="min-w-0 px-3 sm:px-6">
                      <LiveNumber value={displayedLessonCount} className="text-lg sm:text-2xl" />
                      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 sm:text-[11px]">{t.home.hero.statLessons}</p>
                    </div>
                    <div className="min-w-0 pl-3 sm:pl-6">
                      <LiveNumber value={displayedCompletedCount} className="text-lg sm:text-2xl" />
                      <p className="mt-0.5 whitespace-nowrap text-[10px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 sm:whitespace-normal sm:text-[11px]">{t.home.hero.statCompleted}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

                <motion.div
                  initial={{ opacity: 0, x: 24, scale: 0.96, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
                  className="lg:col-span-5 relative flex justify-center w-full mt-6 lg:mt-0"
                >
                <div className="landing-float relative w-full max-w-[590px] overflow-hidden rounded-[20px] border border-stone-200/80 bg-stone-950 text-white shadow-[0_26px_70px_-34px_rgba(15,23,42,0.58)] dark:border-stone-800 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_30px_78px_-34px_rgba(15,23,42,0.62)]">
                  <div className="absolute inset-0">
                    <Image
                      src="/boss-wallstreet-bull.png"
                      alt={t.home.card.bullAlt}
                      fill
                      sizes="520px"
                      className="object-cover object-center opacity-55"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.24),transparent_28%),linear-gradient(115deg,rgba(15,23,42,0.96),rgba(15,23,42,0.76)_44%,rgba(6,78,59,0.62))]" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-stone-950/90 to-transparent" />
                  </div>

                  <div
                      className="relative p-5 xl:p-6"
                      style={{
                        transform: `perspective(1200px) translate3d(${heroParallaxX * 0.5}px, ${heroParallaxY * 0.35}px, 0)`,
                      }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200 backdrop-blur">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                        {t.home.card.studyingNow}
                      </div>
                      <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-amber-100">
                        {t.home.card.lessonNo}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 xl:grid-cols-[minmax(0,1.08fr)_minmax(190px,0.82fr)]">
                      <div
                        className="rounded-[1.6rem] border border-white/12 bg-white/10 p-3.5 backdrop-blur-sm xl:p-4"
                        style={{
                          transform: `perspective(1200px) translate3d(${heroParallaxX * 0.8}px, ${heroParallaxY * 0.6}px, 0) rotateY(${heroParallaxX * 0.45}deg)`,
                        }}
                      >
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">{t.home.card.todayLabel}</p>
                            <p className="mt-1 text-base font-black leading-tight text-white xl:text-lg">{t.home.card.todayTitle}</p>
                          </div>
                          <div className="shrink-0 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-black text-emerald-200">
                            {t.home.card.comprehension}
                          </div>
                        </div>
                        <div className="rounded-[1.35rem] border border-white/10 bg-stone-950/45 p-3">
                          <div className="rounded-[18px] bg-white/8 p-2.5">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-400">{t.home.card.exampleLabel}</p>
                                <p className="mt-1 text-[13px] font-bold leading-snug text-white">
                                  {t.home.card.exampleText}
                                </p>
                              </div>
                              <div className="rounded-full bg-amber-300/15 px-2 py-1 text-[10px] font-black text-amber-100">{t.finalOne.homePage.peBadge}</div>
                            </div>
                            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                              {[
                                [t.home.card.priceLabel, t.home.card.priceValue],
                                [t.finalOne.homePage.epsLabel, t.home.card.epsValue],
                                [t.finalOne.homePage.peBadge, t.home.card.peValue],
                              ].map(([label, value]) => (
                                <div key={label} className="rounded-[14px] bg-stone-950/45 px-1.5 py-2">
                                  <p className="text-[9px] font-black uppercase tracking-[0.12em] text-stone-500">{label}</p>
                                  <p className="mt-1 text-[13px] font-black leading-tight text-white">{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-3 space-y-2">
                            {[
                              ["1", t.home.card.tip1],
                              ["2", t.home.card.tip2],
                              ["3", t.home.card.tip3],
                            ].map(([step, text]) => (
                              <div key={step} className="flex items-center gap-2 rounded-[14px] bg-white/7 px-2.5 py-2 text-[11px] font-bold leading-snug text-stone-200">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-300/15 text-[10px] text-emerald-100">{step}</span>
                                {text}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {[
                            [t.home.card.metaLesson, t.home.card.metaLessonValue],
                            // Ô này từng hiện "Quiz đúng: N%" với N tính bằng
                            // (số bài đã hoàn thành % 100) rồi kẹp vào 72-98.
                            // Đó không phải một tỷ lệ được đo từ đâu cả - nó là
                            // một con số trông giống thống kê. Thay bằng thứ
                            // kiểm chứng được: mỗi bài có 5 câu hỏi.
                            [t.finalOne.homePage.quizLabel, t.home.card.metaQuizValue],
                            [t.home.card.metaReview, t.home.card.metaReviewValue],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-[16px] border border-white/10 bg-white/8 px-3 py-2">
                              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-400">{label}</p>
                              <p className="mt-1 text-[13px] font-black leading-tight text-white">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3 xl:block xl:space-y-3">
                        <div
                          className="rounded-[1.45rem] border border-white/12 bg-white/10 p-3.5 backdrop-blur-sm xl:p-4"
                          style={{
                            transform: `perspective(1200px) translate3d(${heroParallaxX * 1.1}px, ${heroParallaxY * 0.8}px, 0) rotateY(${heroParallaxX * 0.7}deg)`,
                          }}
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-stone-300">{t.home.card.quizLabel}</p>
                          <p className="mt-2 text-sm font-black text-white">{t.home.card.quizQuestion}</p>
                          <div className="mt-3 space-y-2">
                            <div className="rounded-full bg-emerald-300/18 px-3 py-2 text-xs font-black text-emerald-100">{t.home.card.quizRight}</div>
                            <div className="rounded-full bg-white/8 px-3 py-2 text-xs font-bold text-stone-300">{t.home.card.quizWrong}</div>
                          </div>
                        </div>
                        <div
                          className="rounded-[1.45rem] border border-white/12 bg-white/10 p-3.5 backdrop-blur-sm xl:p-4"
                          style={{
                            transform: `perspective(1200px) translate3d(${heroParallaxX * 1.6}px, ${heroParallaxY * 1.15}px, 0) rotateY(${heroParallaxX * 0.9}deg)`,
                          }}
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-stone-300">{t.finalOne.homePage.flashcardLabel}</p>
                          <p className="mt-2 text-sm font-black text-white">{t.home.card.flashQuestion}</p>
                          <p className="mt-1 text-xs leading-relaxed text-stone-300">{t.home.card.flashAnswer}</p>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div className="preview-progress-live h-full w-3/4 rounded-full bg-gradient-to-r from-amber-300 to-emerald-300" />
                          </div>
                        </div>
                        <div className="rounded-[1.45rem] border border-emerald-300/20 bg-emerald-400/10 p-3.5 backdrop-blur-sm xl:p-4">
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">{t.home.card.noteLabel}</p>
                          <p className="mt-2 text-sm font-black text-white">{t.home.card.noteTitle}</p>
                          <p className="mt-1 text-xs leading-relaxed text-stone-300">{t.home.card.noteBody}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PRODUCT PREVIEW ── */}
        <section className="landing-band landing-band-soft landing-band-divider relative py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-2xl mb-8">
            <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              {t.home.preview.eyebrow}
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-stone-900 dark:text-stone-100">
              {t.home.preview.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-stone-600 dark:text-stone-400 leading-relaxed sm:text-base">
              {t.home.preview.sub}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <ProductPreview />
          </ScrollReveal>
          <div className="mt-5 overflow-hidden rounded-full border border-stone-200/80 bg-white/80 px-3 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-stone-500 shadow-sm dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-400">
            <div className="landing-ticker flex items-center gap-10">
              {/* Listed twice on purpose: the CSS marquee translates by -50%,
                  so the second copy is what makes the loop seamless. */}
              {[
                t.home.ticker.liveXp,
                t.home.ticker.weeklyBoard,
                t.home.ticker.spacedRepetition,
                t.home.ticker.gameKingdom,
                t.home.ticker.finsocial,
                t.home.ticker.studyGroup,
              ]
                .concat([
                  t.home.ticker.liveXp,
                  t.home.ticker.weeklyBoard,
                  t.home.ticker.spacedRepetition,
                  t.home.ticker.gameKingdom,
                  t.home.ticker.finsocial,
                  t.home.ticker.studyGroup,
                ])
                .map((item, index) => (
                  <span key={`${item}-${index}`} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {item}
                  </span>
                ))}
            </div>
          </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ── */}
        <section className="bg-white dark:bg-stone-950 py-5 sm:py-6 relative border-y border-stone-200/80 dark:border-stone-800/80 font-sans">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-5">
              <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
                {t.home.social.eyebrow}
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 mb-2 leading-snug">
                {t.home.social.title}
              </h2>
              <p className="max-w-xl mx-auto text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                {t.home.social.sub}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <PublicLeaderboardPreview />
            </ScrollReveal>
          </div>
        </section>

        {/* ── GAME KINGDOM PREVIEW ── */}
        <section className="landing-band landing-band-dark landing-band-divider relative py-5 sm:py-6 font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl mb-3">
            <p className="text-[11px] font-black text-amber-200 uppercase tracking-widest mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
              {t.home.kingdom.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.72)]">
              {t.home.kingdom.title}
            </h2>
            <p className="mt-1.5 max-w-xl text-xs sm:text-sm leading-relaxed text-stone-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]">
              {t.home.kingdom.sub}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <InteractiveKingdomPreview />
          </ScrollReveal>
        </div>
      </section>

        {/* ── FEATURE SHOWCASE ── */}
        <section className="landing-band landing-band-emerald landing-band-divider relative py-5 sm:py-6 font-sans border-y border-stone-200/80 dark:border-stone-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="max-w-3xl mb-4">
              <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                {t.home.ecosystem.eyebrow}
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-stone-900 dark:text-stone-100">
                {t.home.ecosystem.titlePart1}{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  {t.home.ecosystem.titleHighlight}
                </span>
              </h2>
              <p className="mt-3 max-w-xl text-sm text-stone-600 dark:text-stone-400 leading-relaxed sm:text-base">
                {t.home.ecosystem.sub}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <InteractiveEcosystemShowcase />
            </ScrollReveal>
          </div>
        </section>

        <SoftFadeDivider />

        {/* ── UNIFIED 3-PANEL PINNED SCROLLYTELLING SECTION (QUICK & FLUID 160VH) ── */}
        <ScrollytellingPinnedSection />

        {/* ── VISION & MISSION ── */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <ScrollReveal>
            <div className="animated-border-card rounded-[20px] border border-stone-200/80 dark:border-stone-800/85 bg-white/70 dark:bg-stone-900/60 backdrop-blur-sm p-5 sm:p-6 shadow-sm">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.95fr)] lg:items-center">
                <div>
                  <p className="mb-2 inline-flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs shadow-xs border border-emerald-200/80 dark:bg-emerald-950/40 dark:border-emerald-900/50">
                      🇻🇳
                    </span>
                    {t.home.vision.eyebrow}
                  </p>
                  <h2 className="max-w-xl text-xl sm:text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100 leading-snug">
                    {t.home.vision.title}
                  </h2>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-emerald-200/50 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 p-3">
                      <div className="text-[9px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                        {t.home.vision.stat1Label}
                      </div>
                      <div className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        24%
                      </div>
                      <p className="mt-1 text-[11px] leading-snug text-stone-600 dark:text-stone-300">
                        {t.home.vision.stat1Note}
                      </p>
                    </div>
                    <div className="rounded-xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 p-3">
                      <div className="text-[9px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
                        {t.home.vision.stat2Label}
                      </div>
                      <div className="mt-1 text-2xl font-black text-stone-800 dark:text-stone-100">
                        3/4
                      </div>
                      <p className="mt-1 text-[11px] leading-snug text-stone-600 dark:text-stone-300">
                        {t.home.vision.stat2Note}
                      </p>
                    </div>
                    <div className="rounded-xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 p-3">
                      <div className="text-[9px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
                        {t.home.vision.stat3Label}
                      </div>
                      <div className="mt-1 text-2xl font-black text-stone-800 dark:text-stone-100">
                        70,6%
                      </div>
                      <p className="mt-1 text-[11px] leading-snug text-stone-600 dark:text-stone-300">
                        {t.home.vision.stat3Note}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="rounded-xl border border-emerald-200/70 dark:border-emerald-900/40 bg-gradient-to-b from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/20 dark:to-teal-950/10 p-4 shadow-xs">
                    <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">
                      <span>🇻🇳</span>
                      {t.home.vision.missionLabel}
                    </p>
                    <p className="text-xs leading-relaxed text-stone-700 dark:text-stone-300 font-medium">
                      {t.home.vision.missionBody}
                    </p>
                    <div className="mt-3">
                      <Link
                        href="/login?mode=signup"
                        className="cta-electric inline-flex items-center gap-2 rounded-xl bg-stone-950 px-4 py-2 text-xs font-black text-white hover:bg-stone-900 dark:bg-emerald-500 dark:text-stone-950 dark:hover:bg-emerald-400 transition-all cursor-pointer"
                      >
                        {t.home.vision.cta}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>

        {/* ── RICH FOOTER ── */}
        <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 relative z-10 pt-6 pb-6 font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12 pb-6 border-b border-stone-800">
              {/* Col 1: Brand Info */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <Logo size={32} />
                  <span className="text-lg font-black tracking-tight text-white">{t.home.brand}</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
                  {t.home.footer.blurb}
                </p>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1 text-[11px] font-bold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t.home.footer.community}</span>
                </div>
              </div>

              {/* Col 2: Lộ trình */}
              <div className="lg:col-span-2 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-white">{t.home.footer.tracksTitle}</p>
                <ul className="space-y-2 text-xs text-stone-400 font-semibold">
                  <li>
                    <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">{t.home.footer.trackPersonal}</Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">{t.home.footer.trackCorporate}</Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">{t.home.footer.trackCfa}</Link>
                  </li>
                  <li>
                    <Link href="/game" className="hover:text-emerald-400 transition-colors">{t.home.footer.trackGame}</Link>
                  </li>
                </ul>
              </div>

              {/* Col 3: Hệ sinh thái */}
              <div className="lg:col-span-3 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-white">{t.home.footer.ecoTitle}</p>
                <ul className="space-y-2 text-xs text-stone-400 font-semibold">
                  <li>
                    <Link href="/nhom-hoc" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                      <span>{t.home.footer.ecoStudyRoom}</span>
                      <span className="text-[9px] font-bold text-amber-400 bg-amber-950 px-1.5 py-0.2 rounded-md">{t.home.footer.ecoHot}</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/finsocial" className="hover:text-emerald-400 transition-colors">{t.home.footer.ecoFinsocial}</Link>
                  </li>
                  <li>
                    <Link href="/su-nghiep" className="hover:text-emerald-400 transition-colors">{t.home.footer.ecoCareer}</Link>
                  </li>
                  <li>
                    <Link href="/cua-hang" className="hover:text-emerald-400 transition-colors">{t.home.footer.ecoShop}</Link>
                  </li>
                </ul>
              </div>

              {/* Col 4: Pháp lý & Hỗ trợ */}
              <div className="lg:col-span-2 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-white">{t.home.footer.supportTitle}</p>
                <ul className="space-y-2 text-xs text-stone-400 font-semibold">
                  <li>
                    <Link href="/dieu-khoan" className="hover:text-emerald-400 transition-colors">{t.home.footer.terms}</Link>
                  </li>
                  <li>
                    <Link href="/chinh-sach-bao-mat" className="hover:text-emerald-400 transition-colors">{t.home.footer.privacy}</Link>
                  </li>
                  <li>
                    <Link href="/login" className="hover:text-emerald-400 transition-colors">{t.home.footer.login}</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Khẩu hiệu chủ quyền. Ngôi sao vẽ bằng SVG chứ không dùng emoji
                ⭐: emoji sao vàng trên nền đỏ render khác nhau tuỳ hệ điều
                hành, và trên Windows nó ra màu cam. */}
            <div className="pt-6 flex justify-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-gradient-to-r from-red-800 to-red-700 px-4 py-2 text-xs font-bold text-white shadow-lg">
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 text-yellow-300" fill="currentColor" aria-hidden="true">
                  <path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.2 5.8 20.9l1.6-7L2 9.2l7.1-.6L12 2Z" />
                </svg>
                {t.home.footer.sovereignty}
              </p>
            </div>

            {/* Bottom copyright line */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-semibold">
              <p>{t.home.footer.copyright}</p>
              <p className="flex items-center gap-1 text-[11px] text-stone-400">
                <span>{t.home.footer.tagline}</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
