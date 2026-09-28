"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, PlayCircle, Users, X } from "lucide-react";
import { getTotalUserCount, getTotalCompletedLessonsCount } from "@/lib/cloudflare-user";
import { roundedLessonCount } from "@/lib/track-totals";
import { animateCountTo } from "@/lib/animate-count";
import { TRACKS } from "@/lib/tracks";
import { LEARNING_FLOWS, type LearningFlow } from "@/lib/learning-flows";
import { XP_PER_LESSON } from "@/lib/levels";
import Logo from "@/components/Logo";
import Glyph from "@/components/Glyph";
import LiveNumber from "@/components/LiveNumber";
import ScrollReveal from "@/components/home/ScrollReveal";
import ProductPreview from "@/components/home/ProductPreview";
import PublicLeaderboardPreview from "@/components/login/PublicLeaderboardPreview";
import InteractiveKingdomPreview from "@/components/home/InteractiveKingdomPreview";
import ScrollytellingPinnedSection from "@/components/home/ScrollytellingPinnedSection";
import ActivityPanel from "@/components/home/ActivityPanel";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import {
  dismissHomeBanner,
  getHomeBannerDismissed,
  getHomeBannerDismissedServer,
  subscribeHomeBannerDismissed,
} from "@/lib/home-banner-dismissed";

/*
 * NGÔN NGỮ THIẾT KẾ CỦA TRANG NÀY.
 *
 * Bản trước là một trang giới thiệu SaaS: thẻ bo 12-20px, viên thuốc, bóng đổ,
 * và năm section cùng một khuôn "tiêu đề + lưới thẻ". Bản này nói bằng giao
 * diện của chính nghề công nghệ: khung soạn mã, terminal, bảng hệ thống, cây
 * thư mục. Năm luật giữ nó thành MỘT hệ thống dù mỗi section một bố cục:
 *
 *  1. Bo góc 2-6px. Không có gì tròn trừ chấm trạng thái và ảnh đại diện.
 *  2. Viền 1px làm cấu trúc, không đổ bóng. Chiều sâu đến từ sắc độ nền:
 *     giấy ngà #fbfaf7 -> thanh tiêu đề #f3f1ec -> nền mực stone-950.
 *  3. Xanh có CHỨC NĂNG: liên kết, tab đang mở, đáp án được chọn, dữ liệu
 *     sống. Không tô xanh để trang trí.
 *  4. Mono chỉ cho siêu dữ liệu máy - đường dẫn, mã module, số trong bảng,
 *     dấu thời gian. Chữ tiếng Việt luôn đi bằng phông sans, vì phông mono
 *     dựng dấu trong ô rộng cố định và vỡ nhịp đọc.
 *  5. Siêu dữ liệu không bịa: +10 XP là XP_PER_LESSON thật, số người học đọc
 *     từ D1, dấu thời gian là giờ trên máy người xem.
 */

/* i18n-ignore-start: định danh hệ thống và mã nguồn minh hoạ, không phải chữ
   hiển thị để dịch - chúng là cùng một chuỗi ở mọi ngôn ngữ, như tên lệnh hay
   đường dẫn tệp. */
const SYS = {
  root: "THCN://",
  home: "THCN://HOME",
  section: (n: number) => `THCN://SYSTEMS/${String(n).padStart(2, "0")}`,
  file: "bai-24/big-o.md",
  tabQuiz: "quiz.ts",
  tabNotes: "notes.md",
  module: "MODULE 24",
  status: "STATUS",
  live: "LIVE",
  ok: "OK",
  xp: (n: number) => `+${n} XP`,
  flowsDir: "~/hoc-theo-nhu-cau",
  flowPath: (id: string) => `/${id}`,
  run: "$ thcn run bai-24 --n=1000",
  runDone: "exit 0",
  dashboard: "THCN://APP/DASHBOARD",
  preview: "PREVIEW",
  leaderboard: "THCN://COMMUNITY/LEADERBOARD",
  kingdom: "THCN://GAME/KINGDOM",
  readme: "README.md",
  featureId: (n: number) => `F${String(n).padStart(2, "0")}`,
  stepId: (n: number) => String(n).padStart(2, "0"),
  lessons: (n: number) => `${n}×`,
  dirTracks: "/lo-trinh",
  dirEco: "/he-sinh-thai",
  dirSupport: "/ho-tro",
  build: "BUILD 2026.09",
};

const CODE_LINES: { text: string; tone?: "kw" | "num" | "dim" }[][] = [
  [{ text: "let", tone: "kw" }, { text: " steps = " }, { text: "0", tone: "num" }, { text: ";" }],
  [{ text: "for", tone: "kw" }, { text: " (let i = " }, { text: "0", tone: "num" }, { text: "; i < n; i++) {" }],
  [{ text: "  for", tone: "kw" }, { text: " (let j = " }, { text: "0", tone: "num" }, { text: "; j < n; j++) {" }],
  [{ text: "    steps++;" }],
  [{ text: "  }" }],
  [{ text: "}" }],
  [{ text: "// n = 1000 -> steps = 1000000", tone: "dim" }],
];
/* i18n-ignore-end */

/** Nhãn máy: mono, nhỏ, chữ hoa. Chỉ dùng cho định danh, không cho câu. */
function Sys({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[10.5px] font-medium uppercase tracking-[0.06em] ${className}`}>
      {children}
    </span>
  );
}

/**
 * Đầu một section. Mã THCN://SYSTEMS/0n thay cho số chương to nhạt của bản
 * trước: nó định vị người đọc trong trình tự y như số chương, nhưng bằng đúng
 * thứ ngôn ngữ mà sản phẩm dạy.
 */
function SectionHead({
  index,
  eyebrow,
  title,
  sub,
  dark = false,
  className = "",
}: {
  index: number;
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className={`flex items-center justify-between gap-4 border-b pb-2 ${
          dark ? "border-white/15" : "border-line-strong"
        }`}
      >
        <Sys className={dark ? "text-stone-400" : "text-ink-muted"}>{SYS.section(index)}</Sys>
        <span className={`eyebrow text-right ${dark ? "text-stone-300" : "text-ink-soft"}`}>{eyebrow}</span>
      </div>
      <h2
        className={`mt-4 text-[1.65rem] font-black leading-[1.12] tracking-tight sm:text-[2rem] lg:text-[2.25rem] ${
          dark ? "text-white" : "text-ink-max"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-3 max-w-xl text-sm leading-7 sm:text-[15px] ${dark ? "text-stone-300" : "text-ink-soft"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

/**
 * Khung cửa sổ ứng dụng: thanh tiêu đề mono + thân. Đây là "thẻ" duy nhất của
 * trang, và nó được phép tồn tại vì nó mô tả một thứ có thật - một cửa sổ -
 * chứ không phải một cái hộp dựng lên để chứa chữ.
 */
function Frame({
  title,
  meta,
  metaText,
  children,
  className = "",
  bodyClassName = "",
}: {
  title: React.ReactNode;
  /** Định danh máy (mono, chữ hoa) - "PREVIEW", "OK", dấu thời gian. */
  meta?: React.ReactNode;
  /** Chữ đã dịch ("15 chặng") - đi bằng sans, vì luật 4: tiếng Việt không đi mono. */
  metaText?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-md border border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900 ${className}`}
    >
      <div className="flex h-8 items-center justify-between gap-3 border-b border-stone-300 bg-[#f3f1ec] px-3 dark:border-stone-700 dark:bg-stone-950">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden className="flex gap-1">
            <span className="h-2 w-2 rounded-xs bg-surface-deep" />
            <span className="h-2 w-2 rounded-xs bg-surface-deep" />
            <span className="h-2 w-2 rounded-xs bg-surface-deep" />
          </span>
          <Sys className="truncate normal-case text-ink-muted">{title}</Sys>
        </div>
        {meta && <Sys className="shrink-0 text-ink-muted">{meta}</Sys>}
        {metaText && <span className="shrink-0 text-[11px] font-semibold text-ink-muted">{metaText}</span>}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/** Ô vuông trạng thái. Vuông, không tròn - cùng hệ góc cạnh với phần còn lại. */
function StatusDot({ tone = "brand" }: { tone?: "brand" | "muted" }) {
  return (
    <span
      aria-hidden
      className={`inline-block h-1.5 w-1.5 rounded-[1px] ${
        tone === "brand" ? "bg-brand-600 dark:bg-brand-500" : "bg-stone-400 dark:bg-stone-600"
      }`}
    />
  );
}

function flowLessonCount(flow: LearningFlow) {
  return flow.steps.reduce((n, s) => n + s.lessonSlugs.length, 0);
}

export default function HomePage() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  // Hiệu ứng vào của hero: ngắn, và tắt hẳn khi người xem bật reduced-motion.
  const heroReveal = (delay: number, y = 12) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, ease: "easeOut" as const, delay },
        };
  const [displayedUserCount, setDisplayedUserCount] = useState(0);
  const [displayedLessonCount, setDisplayedLessonCount] = useState(0);
  const [displayedCompletedCount, setDisplayedCompletedCount] = useState(0);
  // Dấu thời gian ở thanh trạng thái của khung soạn thảo. Đặt SAU khi gắn vào
  // trang, không lúc dựng: trang này kết xuất tĩnh, nên giờ lúc build và giờ ở
  // máy người xem khác nhau, và đặt ngay khi dựng sẽ sinh lỗi lệch hydration.
  const [clock, setClock] = useState<string | null>(null);
  const bannerDismissed = useSyncExternalStore(
    subscribeHomeBannerDismissed,
    getHomeBannerDismissed,
    getHomeBannerDismissedServer
  );
  // Số bài làm tròn xuống, cho câu văn trong hero - con số đếm lên từ 0 đọc ổn
  // khi đứng riêng, nhưng trông như hỏng khi nằm giữa một câu.
  const [lessonCountFloor, setLessonCountFloor] = useState<number | null>(null);
  const userCountLoadedRef = useRef(false);
  const completedCountLoadedRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setClock(`${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`);
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const cancelledRef = { current: false };
    // Số THẬT, không có sàn, nạp MỘT lần - trang công khai gọi hai RPC đếm toàn
    // bảng mỗi 30 giây cho mỗi tab mở là trả giá cho một dòng trang trí.
    (async () => {
      try {
        const count = await getTotalUserCount();
        if (cancelledRef.current || !count) return;
        if (!userCountLoadedRef.current) {
          userCountLoadedRef.current = true;
          animateCountTo(count, setDisplayedUserCount, cancelledRef);
        } else {
          setDisplayedUserCount(count);
        }
      } catch (error) {
        console.error("Error loading total user count:", error);
      }
    })();
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
    (async () => {
      try {
        const count = await getTotalCompletedLessonsCount();
        if (cancelledRef.current || !count) return;
        if (!completedCountLoadedRef.current) {
          completedCountLoadedRef.current = true;
          animateCountTo(count, setDisplayedCompletedCount, cancelledRef);
        } else {
          setDisplayedCompletedCount(count);
        }
      } catch (error) {
        console.error("Error loading total completed lessons count:", error);
      }
    })();
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  const flowStatusLabel = (s: LearningFlow["status"]) =>
    s === "ready" ? t.learningFlows.statusReady : s === "partial" ? t.learningFlows.statusPartial : t.learningFlows.statusSoon;

  const features = [
    t.home.ticker.liveXp,
    t.home.ticker.weeklyBoard,
    t.home.ticker.spacedRepetition,
    t.home.ticker.gameKingdom,
    t.home.ticker.feed,
    t.home.ticker.studyGroup,
  ];

  const visionRows = [
    { label: t.home.vision.stat1Label, value: "11%", note: t.home.vision.stat1Note, source: t.home.vision.stat1Source, key: true },
    { label: t.home.vision.stat2Label, value: "7/10", note: t.home.vision.stat2Note, source: t.home.vision.stat2Source, key: false },
    { label: t.home.vision.stat3Label, value: t.home.vision.stat3Value, note: t.home.vision.stat3Note, source: t.home.vision.stat3Source, key: false },
  ];

  const totalSteps = LEARNING_FLOWS.reduce((n, f) => n + f.steps.length, 0);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fbfaf7] text-ink transition-colors duration-300 dark:bg-stone-950">
      <div className="paper-grain pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10">
        {/* ── DẢI CAM KẾT ──
            Giữ nguyên nội dung và màu cờ; bỏ ngôi sao trang trí cỡ 100px ở góc.
            Màn hình hẹp đọc bản một dòng, từ sm trở lên đọc câu đầy đủ. */}
        {!bannerDismissed && (
          <div className="bg-[#DA251D]">
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-6 lg:px-8">
              <svg viewBox="0 0 24 24" className="hidden h-3.5 w-3.5 shrink-0 text-[#FFCD00] sm:block" fill="currentColor" aria-hidden="true">
                <path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.2 5.8 20.9l1.6-7L2 9.2l7.1-.6L12 2Z" />
              </svg>
              <p className="min-w-0 flex-1 truncate text-xs font-semibold text-white sm:overflow-visible sm:whitespace-normal sm:text-[13px]">
                <span className="sm:hidden">
                  {t.home.banner.shortPrefix}
                  <strong className="text-[#FFCD00]">{t.home.banner.freeForever}</strong>
                </span>
                <span className="hidden sm:inline">
                  {t.home.banner.part1}
                  <strong className="text-[#FFCD00]">{t.home.banner.freeForever}</strong>
                  {t.home.banner.part2}
                </span>
              </p>
              <a
                href="https://www.facebook.com/share/g/1C2jTdsgF5/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-bold text-white underline-offset-4 hover:underline sm:text-[13px]"
              >
                {/* Màn hẹp chỉ hiện biểu tượng: nhãn chữ chiếm chỗ đúng cụm "miễn
                    phí mãi mãi" - thông điệp của cả dải. Nhãn vẫn còn cho trình
                    đọc màn hình qua sr-only. */}
                <Users aria-hidden className="h-4 w-4 sm:hidden" />
                <span className="sr-only sm:not-sr-only">{t.home.banner.facebook}</span>
                <ArrowUpRight aria-hidden className="hidden h-3.5 w-3.5 sm:block" />
              </a>
              <button
                type="button"
                onClick={dismissHomeBanner}
                aria-label={t.home.banner.dismiss}
                className="shrink-0 rounded-xs p-1 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── NAV ── */}
        <header className="sticky top-0 z-40 border-b border-stone-300 bg-[#fbfaf7] dark:border-stone-800 dark:bg-stone-950">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Logo size={26} />
              <span className="truncate text-[13px] font-black uppercase tracking-[0.04em] text-ink-heading sm:text-[15px] sm:tracking-[0.12em]">
                {t.home.brand}
              </span>
              <span className="hidden h-4 w-px bg-surface-deep md:block" />
              <Sys className="hidden text-ink-muted md:inline">{SYS.home}</Sys>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden items-center gap-1.5 lg:inline-flex">
                <StatusDot />
                <Sys className="text-ink-muted">{t.home.brandBadge}</Sys>
              </span>
              <Link
                href="/login"
                className="group inline-flex shrink-0 items-center gap-2 rounded-sm bg-stone-950 px-3.5 py-2 text-[13px] font-bold text-white transition-colors hover:bg-brand-700 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-brand-300"
              >
                {t.home.navCta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </header>

        {/* ── HERO: tiêu đề + khung soạn thảo mở một bài học thật ──
            Lệch cột 5/7 có chủ ý: chữ hẹp và đứng dọc, khung soạn thảo rộng -
            người đọc thấy ngay đây là sản phẩm để DÙNG, không phải để đọc về. */}
        <section className="relative border-b border-line-strong">
          <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pb-14">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5 lg:pt-4">
                <motion.div {...heroReveal(0)} className="mb-6 flex items-center gap-3">
                  <Sys className="text-ink-muted">{SYS.root}</Sys>
                  <span className="h-px flex-1 bg-surface-deep" />
                </motion.div>
                <motion.p {...heroReveal(0.02)} className="eyebrow mb-4 text-ink-soft">
                  {t.home.hero.badge}
                </motion.p>
                <motion.h1
                  {...heroReveal(0.04, 14)}
                  className="mb-5 text-[2.4rem] font-black leading-[1.03] tracking-tight text-ink-max sm:text-[3.2rem] lg:text-[3.35rem] xl:text-[3.75rem]"
                >
                  {t.home.hero.titlePart1} {t.home.hero.titleHighlight},
                  <br />
                  {t.home.hero.titlePart2}
                </motion.h1>
                <motion.p {...heroReveal(0.06)} className="mb-8 max-w-md text-[15px] leading-7 text-ink-soft">
                  {format(t.home.hero.sub, { count: lessonCountFloor ?? roundedLessonCount() })}
                </motion.p>
                <motion.div {...heroReveal(0.08)} className="mb-10 flex flex-wrap items-center gap-2.5">
                  <Link
                    href="/login?mode=signup"
                    className="group inline-flex items-center gap-2 rounded-sm bg-stone-950 px-5 py-3 text-[15px] font-black text-white transition-colors hover:bg-brand-700 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-brand-300"
                  >
                    {t.home.hero.ctaPrimary}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={`/bai-hoc/${TRACKS.personal.previewSlug}`}
                    className="inline-flex items-center gap-2 rounded-sm border border-stone-400 px-4 py-[11px] text-sm font-bold text-ink transition-colors hover:border-stone-950 dark:border-stone-600 dark:hover:border-stone-200"
                  >
                    <PlayCircle className="h-4 w-4" />
                    {t.home.hero.ctaSecondary}
                  </a>
                </motion.div>

                {/* Ba con số THẬT, xếp như một bảng hệ thống: nhãn trái, số căn
                    phải bằng tabular-nums để các chữ số thẳng cột. */}
                <motion.div {...heroReveal(0.1)} className="max-w-sm">
                  <div className="flex items-center justify-between border-b border-stone-300 pb-1.5 dark:border-stone-700">
                    <span className="inline-flex items-center gap-1.5">
                      <StatusDot />
                      <Sys className="text-accent-strong">{SYS.live}</Sys>
                    </span>
                    <span className="text-[11px] font-semibold text-ink-muted">{t.home.hero.liveLabel}</span>
                  </div>
                  <dl className="divide-y divide-stone-200 dark:divide-stone-800">
                    {(
                      [
                        [t.home.hero.statLearners, displayedUserCount],
                        [t.home.hero.statLessons, displayedLessonCount],
                        [t.home.hero.statCompleted, displayedCompletedCount],
                      ] as const
                    ).map(([label, value], i) => (
                      <div key={label} className="flex items-baseline justify-between gap-4 py-2">
                        <dt className="flex items-baseline gap-3">
                          <Sys className="text-ink-faint">{SYS.stepId(i + 1)}</Sys>
                          <span className="text-sm font-semibold text-ink-body">{label}</span>
                        </dt>
                        <dd className="font-mono text-lg font-medium tabular-nums text-ink-max">
                          <LiveNumber value={value} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              </div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: "easeOut", delay: 0.08 }}
                className="min-w-0 lg:col-span-7"
              >
                <HeroEditor clock={clock} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 01 · HỌC THEO NHU CẦU: cây giáo trình ──
            Bốn luồng và mọi chặng của chúng, đọc thẳng từ lib/learning-flows.ts.
            Bản trước là bốn thẻ bằng nhau - nói "có bốn lựa chọn" nhưng giấu
            mất cái đáng nói hơn: mỗi lựa chọn dẫn qua những chặng nào. */}
        <section className="border-b border-line-strong">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-16">
            <ScrollReveal className="lg:col-span-4">
              <SectionHead
                index={1}
                eyebrow={t.learningFlows.homeEyebrow}
                title={t.learningFlows.homeTitle}
                sub={t.learningFlows.homeSub}
              />
              <blockquote className="mt-8 border-l-2 border-stone-950 pl-4 dark:border-stone-200">
                <p className="text-[15px] font-bold leading-7 text-ink-max">
                  {t.learningFlows.flows.website.steps.house.oneLiner}
                </p>
                <footer className="mt-2 text-xs font-semibold text-ink-muted">{t.learningFlows.oneLinerLabel}</footer>
              </blockquote>
              <Link
                href="/hoc-theo-nhu-cau"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-accent-strong underline-offset-4 hover:underline"
              >
                {t.learningFlows.homeAll}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.05} className="min-w-0 lg:col-span-8">
              <Frame title={SYS.flowsDir} metaText={format(t.learningFlows.stepCount, { count: totalSteps })}>
                <ul className="divide-y divide-stone-200 dark:divide-stone-800">
                  {LEARNING_FLOWS.map((flow) => {
                    const copy = t.learningFlows.flows[flow.id];
                    const stepCopy = copy.steps as Record<string, { title: string }>;
                    return (
                      <li key={flow.id}>
                        <Link
                          href={`/hoc-theo-nhu-cau/${flow.id}`}
                          className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 px-4 py-3.5 transition-colors hover:bg-brand-50/70 dark:hover:bg-brand-950/30"
                        >
                          <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-sm border border-stone-300 text-ink-soft transition-colors group-hover:border-brand-600 group-hover:text-accent-strong dark:border-stone-700">
                            <Glyph emoji={flow.emoji} className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="flex flex-wrap items-baseline gap-x-2.5">
                              <span className="font-black text-ink-max group-hover:text-accent-strong">{copy.title}</span>
                              <Sys className="normal-case text-ink-faint">{SYS.flowPath(flow.id)}</Sys>
                            </span>
                            <span className="mt-0.5 block text-[13px] text-ink-muted">“{copy.need}”</span>
                          </span>
                          <span className="flex flex-col items-end gap-1 pt-0.5">
                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold text-ink-soft">
                              <StatusDot tone={flow.status === "ready" ? "brand" : "muted"} />
                              {flowStatusLabel(flow.status)}
                            </span>
                            <Sys className="text-ink-faint">{SYS.lessons(flowLessonCount(flow))}</Sys>
                          </span>
                        </Link>
                        {/* Các chặng: đường nối dọc + số thứ tự mono, như cây
                            thư mục. Không phải liên kết riêng - bấm dòng luồng ở
                            trên là mở cả hành trình, đúng nơi các chặng sống. */}
                        <ol className="pb-3 pl-[3.35rem] pr-4">
                          {flow.steps.map((step, i) => (
                            <li
                              key={step.id}
                              className="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-3 border-l border-stone-300 py-1 pl-4 dark:border-stone-700"
                            >
                              <span aria-hidden className="absolute left-0 top-[0.95em] h-px w-2.5 bg-surface-deep" />
                              <Sys className="text-ink-faint">{SYS.stepId(i + 1)}</Sys>
                              <span className="truncate text-[13px] text-ink-body">{stepCopy[step.id]?.title}</span>
                              <Sys className="text-ink-faint">{SYS.lessons(step.lessonSlugs.length)}</Sys>
                            </li>
                          ))}
                        </ol>
                      </li>
                    );
                  })}
                </ul>
              </Frame>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 02 · GIAO DIỆN THẬT ──
            Đầu section chia đôi: tiêu đề trái, bảng tính năng phải. Rồi bản xem
            trước chạy hết chiều ngang trong một khung cửa sổ ứng dụng. */}
        <section className="border-b border-stone-300 bg-white dark:border-stone-800 dark:bg-stone-900/40">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
              <ScrollReveal className="lg:col-span-5">
                <SectionHead index={2} eyebrow={t.home.preview.eyebrow} title={t.home.preview.title} sub={t.home.preview.sub} />
              </ScrollReveal>
              <ScrollReveal delay={0.05} className="lg:col-span-6 lg:col-start-7">
                <p className="eyebrow mb-2 text-ink-muted">{t.home.preview.specLabel}</p>
                <table className="w-full border-t border-stone-300 text-left text-sm dark:border-stone-700">
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                    {features.map((f, i) => (
                      <tr key={f}>
                        <td className="w-12 py-2 pr-3 align-baseline">
                          <Sys className="text-ink-faint">{SYS.featureId(i + 1)}</Sys>
                        </td>
                        <td className="py-2 font-semibold text-ink-body">{f}</td>
                        <td className="w-6 py-2 align-baseline">
                          <Check aria-hidden className="ml-auto h-3.5 w-3.5 text-accent-strong" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollReveal>
            </div>
            {/* KHÔNG bọc Frame: ProductPreview tự có khung trình duyệt (ba chấm
                và thanh địa chỉ). Bọc thêm là hai lớp cửa sổ lồng nhau. */}
            <ScrollReveal delay={0.08} className="mt-10">
              <div className="mb-2 flex items-center justify-between">
                <Sys className="text-ink-muted">{SYS.dashboard}</Sys>
                <Sys className="text-ink-faint">{SYS.preview}</Sys>
              </div>
              <ProductPreview />
            </ScrollReveal>
          </div>
        </section>

        {/* ── 03 · CỘNG ĐỒNG: bố cục đảo chiều ──
            Bảng xếp hạng ở TRÁI, chữ ở phải - section duy nhất đặt minh hoạ
            trước chữ, để nhịp đọc dọc trang không lặp một khuôn. */}
        <section className="border-b border-line-strong">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-16">
            <ScrollReveal className="order-2 min-w-0 lg:order-1 lg:col-span-7">
              <Frame title={SYS.leaderboard} meta={clock ?? SYS.live} bodyClassName="p-3 sm:p-4">
                <PublicLeaderboardPreview />
              </Frame>
            </ScrollReveal>
            <ScrollReveal delay={0.05} className="order-1 lg:order-2 lg:col-span-4 lg:col-start-9 lg:pt-2">
              <SectionHead index={3} eyebrow={t.home.social.eyebrow} title={t.home.social.title} sub={t.home.social.sub} />
              <ActivityPanel />
            </ScrollReveal>
          </div>
        </section>

        {/* ── 04 · GAME KINGDOM: dải mực ──
            Khu trò chơi giữ nền tối - nhưng tối phẳng, không vầng sáng. */}
        <section className="border-b border-stone-800 bg-stone-950">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <ScrollReveal className="mb-8 grid gap-6 lg:grid-cols-12">
              <SectionHead
                index={4}
                dark
                eyebrow={t.home.kingdom.eyebrow}
                title={t.home.kingdom.title}
                sub={t.home.kingdom.sub}
                className="lg:col-span-7"
              />
              <div className="hidden items-end justify-end lg:col-span-5 lg:flex">
                <Sys className="text-stone-500">{SYS.kingdom}</Sys>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <InteractiveKingdomPreview />
            </ScrollReveal>
          </div>
        </section>

        {/* ── 05 · HỆ SINH THÁI ── */}
        <section className="border-b border-line-strong">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <ScrollReveal className="mb-8 max-w-3xl">
              <SectionHead
                index={5}
                eyebrow={t.home.ecosystem.eyebrow}
                sub={t.home.ecosystem.sub}
                title={
                  <>
                    {t.home.ecosystem.titlePart1} {t.home.ecosystem.titleHighlight}
                  </>
                }
              />
            </ScrollReveal>
            {/* Bản demo phòng học 3D + bảng tin (InteractiveEcosystemShowcase) đã gỡ:
                tên người học, XP, "2 giờ trước", số bình luận, "Online" đều bịa -
                có cả tên trùng học viên thật của trang cũ. Mục này giữ phần giới
                thiệu tính năng, không dựng lại hoạt động giả. */}
          </div>
        </section>

        <ScrollytellingPinnedSection />

        {/* ── 06 · VÌ SAO: bảng báo cáo + README ──
            Ba con số phải đọc CẠNH nhau mới có nghĩa, nên chúng là một bảng -
            và bảng có cột NGUỒN. Một trang nói "Việt Nam chỉ 11% lao động tay
            nghề cao" mà không nói ai đo là đang xin người đọc tin suông.
            Nguồn chi tiết: 11% ManpowerGroup Total Workforce Index (dẫn lại ở
            news.laodong.vn); 7/10 vneconomy; 1,2 triệu Bộ KH&CN. Đổi số thì đổi
            cả nguồn trong từ điển. */}
        <section className="border-t border-line-strong">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-16">
            <ScrollReveal className="min-w-0 lg:col-span-7">
              <SectionHead index={6} eyebrow={t.home.vision.eyebrow} title={t.home.vision.title} />
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-stone-950 dark:border-stone-300">
                      {[t.home.vision.colMetric, t.home.vision.colValue, t.home.vision.colNote, t.home.vision.colSource].map((h, i) => (
                        <th
                          key={h}
                          className={`pb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted ${i === 1 ? "text-right" : ""} ${i > 0 ? "pl-4" : ""}`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                    {visionRows.map((r) => (
                      <tr key={r.label} className="align-top">
                        <td className="py-3 text-sm font-bold text-ink-heading">{r.label}</td>
                        <td
                          className={`whitespace-nowrap py-3 pl-4 text-right text-xl tabular-nums ${
                            // Mono chỉ khi giá trị thuần là số. "1,2 triệu" mang chữ
                            // có dấu, nên đi bằng sans - luật 4 ở đầu tệp.
                            /^[\d.,/%\s]+$/.test(r.value) ? "font-mono font-medium" : "font-black"
                          } ${r.key ? "text-accent-strong" : "text-ink-max"}`}
                        >
                          {r.value}
                        </td>
                        <td className="py-3 pl-4 text-[13px] leading-snug text-ink-soft">{r.note}</td>
                        <td className="py-3 pl-4 text-[12px] leading-snug text-ink-muted">{r.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.06} className="lg:col-span-4 lg:col-start-9">
              <Frame title={SYS.readme} meta={SYS.ok} bodyClassName="p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">{t.home.vision.missionLabel}</p>
                <p className="text-[15px] leading-7 text-ink-body">{t.home.vision.missionBody}</p>
                <Link
                  href="/login?mode=signup"
                  className="group mt-6 inline-flex items-center gap-2 rounded-sm bg-stone-950 px-4 py-2.5 text-sm font-black text-white transition-colors hover:bg-brand-700 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-brand-300"
                >
                  {t.home.vision.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Frame>
            </ScrollReveal>
          </div>
        </section>

        {/* ── FOOTER: danh mục thư mục ── */}
        <footer className="border-t border-stone-800 bg-stone-950 text-stone-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 border-b border-stone-800 py-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2.5">
                  <Logo size={28} />
                  <span className="text-base font-black tracking-tight text-white">{t.home.brand}</span>
                </div>
                <p className="mt-4 max-w-sm text-[13px] leading-6 text-stone-400">{t.home.footer.blurb}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-stone-400">
                  <StatusDot />
                  {format(t.home.footer.community, { count: roundedLessonCount() })}
                </p>
              </div>

              {[
                {
                  dir: SYS.dirTracks,
                  title: t.home.footer.tracksTitle,
                  span: "lg:col-span-2",
                  links: [
                    ["/dashboard", t.home.footer.trackPersonal],
                    ["/dashboard", t.home.footer.trackCorporate],
                    ["/dashboard", t.home.footer.trackCfa],
                    ["/game", t.home.footer.trackGame],
                  ],
                },
                {
                  dir: SYS.dirEco,
                  title: t.home.footer.ecoTitle,
                  span: "lg:col-span-3",
                  links: [
                    ["/nhom-hoc", t.home.footer.ecoStudyRoom],
                    ["/bang-tin", t.home.footer.ecoFeed],
                    ["/cua-hang", t.home.footer.ecoShop],
                  ],
                },
                {
                  dir: SYS.dirSupport,
                  title: t.home.footer.supportTitle,
                  span: "lg:col-span-2",
                  links: [
                    ["/dieu-khoan", t.home.footer.terms],
                    ["/chinh-sach-bao-mat", t.home.footer.privacy],
                    ["/login", t.home.footer.login],
                  ],
                },
              ].map((col) => (
                <div key={col.dir} className={col.span}>
                  <Sys className="text-stone-600">{col.dir}</Sys>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-white">{col.title}</p>
                  <ul className="mt-4 space-y-2.5 text-[13px] font-semibold">
                    {col.links.map(([href, label]) => (
                      <li key={label}>
                        <Link href={href} className="text-stone-400 transition-colors hover:text-white">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Khẳng định chủ quyền: giữ nguyên nội dung, bỏ viên thuốc chuyển
                sắc đổ bóng. Ngôi sao vẽ bằng SVG - emoji sao ra màu cam trên
                Windows. */}
            <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="inline-flex items-center gap-2.5 text-[13px] font-bold text-white">
                <span className="inline-flex h-4 w-6 items-center justify-center rounded-[2px] bg-[#DA251D]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-[#FFCD00]" fill="currentColor">
                    <path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.2 5.8 20.9l1.6-7L2 9.2l7.1-.6L12 2Z" />
                  </svg>
                </span>
                {t.home.footer.sovereignty}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
                <span>{t.home.footer.copyright}</span>
                <span className="hidden sm:inline">{t.home.footer.tagline}</span>
                <Sys className="text-stone-600">{SYS.build}</Sys>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/**
 * Khung soạn thảo ở hero: một bài học thật (Big-O) mở như một tệp mã.
 *
 * Nội dung đến hết từ từ điển (t.home.card.*) - cùng bài, cùng câu hỏi, cùng
 * ghi chú với bản cũ. Khác ở hình thức: bản cũ là bốn thẻ bo tròn nổi trên ảnh
 * con bò tót, nghiêng theo con trỏ; bản này là giao diện một người học lập
 * trình thật sự nhìn thấy - tab tệp, số dòng, đoạn mã, bảng kiểm tra bên phải,
 * terminal chạy thử ở dưới, thanh trạng thái ở đáy.
 */
function HeroEditor({ clock }: { clock: string | null }) {
  const { t } = useI18n();
  const c = t.home.card;
  const tone = (k?: "kw" | "num" | "dim") =>
    k === "kw"
      ? "text-accent-strong"
      : k === "num"
        ? "font-medium text-stone-950 dark:text-white"
        : k === "dim"
          ? "text-ink-faint"
          : "";

  return (
    <div className="overflow-hidden rounded-md border border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900">
      {/* Thanh tab */}
      <div className="flex h-9 items-stretch justify-between border-b border-stone-300 bg-[#f3f1ec] dark:border-stone-700 dark:bg-stone-950">
        <div className="flex min-w-0">
          <span className="relative flex items-center gap-2 border-r border-stone-300 bg-white px-3.5 dark:border-stone-700 dark:bg-stone-900">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-brand-600 dark:bg-brand-500" />
            <Sys className="normal-case text-ink">{SYS.file}</Sys>
          </span>
          <span className="hidden items-center border-r border-stone-300 px-3.5 dark:border-stone-700 sm:flex">
            <Sys className="normal-case text-ink-muted">{SYS.tabQuiz}</Sys>
          </span>
          <span className="hidden items-center border-r border-stone-300 px-3.5 dark:border-stone-700 md:flex">
            <Sys className="normal-case text-ink-muted">{SYS.tabNotes}</Sys>
          </span>
        </div>
        <div className="flex items-center gap-3 px-3">
          <Sys className="hidden text-ink-muted xs:inline">{SYS.module}</Sys>
          <Sys className="text-accent-strong">{SYS.xp(XP_PER_LESSON)}</Sys>
        </div>
      </div>

      <div className="grid md:grid-cols-[minmax(0,1fr)_236px]">
        {/* Thân tệp bài học */}
        <div className="min-w-0 border-b border-stone-200 p-4 dark:border-stone-800 sm:p-5 md:border-b-0 md:border-r">
          <div className="flex flex-wrap items-center gap-2">
            <StatusDot />
            <span className="text-[11px] font-semibold text-ink-muted">{c.studyingNow}</span>
            <span className="text-ink-faint">·</span>
            <span className="text-[11px] font-semibold text-ink-muted">{c.todayLabel}</span>
          </div>
          <h3 className="mt-2 text-xl font-black leading-tight tracking-tight text-ink-max sm:text-[1.4rem]">{c.todayTitle}</h3>

          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted">{c.exampleLabel}</p>
          <p className="mt-1 text-sm leading-6 text-ink-body">{c.exampleText}</p>

          {/* Mã nguồn: số dòng ở rãnh trái, như mọi trình soạn thảo. */}
          <pre className="mt-4 overflow-x-auto rounded-sm border border-stone-200 bg-[#fbfaf7] py-2.5 font-mono text-[12.5px] leading-[1.7] dark:border-stone-800 dark:bg-stone-950">
            <code>
              {CODE_LINES.map((line, i) => (
                <span key={i} className="grid grid-cols-[2.25rem_minmax(0,1fr)]">
                  <span aria-hidden className="select-none pr-3 text-right text-ink-faint">
                    {i + 1}
                  </span>
                  <span className="whitespace-pre text-ink-body">
                    {line.map((tok, j) => (
                      <span key={j} className={tone(tok.tone)}>
                        {tok.text}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </code>
          </pre>

          <dl className="mt-4 grid grid-cols-3 border-y border-line">
            {[
              [c.priceLabel, c.priceValue],
              [t.finalOne.homePage.stepsLabel, c.epsValue],
              [t.finalOne.homePage.bigOBadge, c.peValue],
            ].map(([label, value], i) => (
              <div key={label} className={`min-w-0 py-2.5 ${i > 0 ? "border-l border-stone-200 pl-3 dark:border-stone-800" : ""}`}>
                <dt className="truncate text-[10.5px] font-bold uppercase tracking-[0.08em] text-ink-muted">{label}</dt>
                <dd className={`mt-0.5 font-mono text-[15px] font-medium tabular-nums ${i === 2 ? "text-accent-strong" : "text-ink-max"}`}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Bảng kiểm tra bên phải: mức hiểu bài, quiz, flashcard, ghi chú */}
        <aside className="divide-y divide-stone-200 text-sm dark:divide-stone-800">
          <div className="p-4">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{c.quizLabel}</span>
              <span className="text-[11px] font-semibold text-accent-strong">{c.comprehension}</span>
            </div>
            <div className="mt-2 h-1 bg-surface-sunken">
              <div className="h-full w-[72%] bg-brand-600 dark:bg-brand-500" />
            </div>
            <p className="mt-3 font-bold text-ink-max">{c.quizQuestion}</p>
            <ul className="mt-2 space-y-1.5 text-[13px]">
              <li className="flex items-center gap-2 rounded-sm border border-brand-600 bg-brand-50 px-2.5 py-1.5 font-semibold text-brand-800 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-200">
                <Check className="h-3.5 w-3.5 shrink-0" />
                {c.quizRight}
              </li>
              <li className="flex items-center gap-2 rounded-sm border border-stone-200 px-2.5 py-1.5 text-ink-muted line-through decoration-stone-300 dark:border-stone-800">
                <X className="h-3.5 w-3.5 shrink-0" />
                {c.quizWrong}
              </li>
            </ul>
          </div>
          <div className="p-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{t.finalOne.homePage.flashcardLabel}</span>
            <p className="mt-1.5 font-bold text-ink-max">{c.flashQuestion}</p>
            <p className="mt-1 text-[13px] leading-snug text-ink-soft">{c.flashAnswer}</p>
          </div>
          <div className="p-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{c.noteLabel}</span>
            <p className="mt-1.5 font-bold text-ink-max">{c.noteTitle}</p>
            <p className="mt-1 text-[13px] leading-snug text-ink-soft">{c.noteBody}</p>
          </div>
        </aside>
      </div>

      {/* Terminal: lệnh chạy thử và kết luận của bài. Tiền tố là mono; câu
          tiếng Việt vẫn đi bằng sans - xem luật 4 ở đầu tệp. */}
      <div className="border-t border-stone-300 bg-stone-950 px-4 py-3 text-[12.5px] leading-6 text-stone-300 dark:border-stone-700">
        <p className="font-mono text-stone-400">{SYS.run}</p>
        {[c.tip1, c.tip2, c.tip3].map((tip, i) => (
          <p key={tip} className="flex gap-3">
            <span aria-hidden className={`font-mono ${i === 0 ? "text-brand-300" : "text-stone-600"}`}>
              {i === 0 ? "+" : "·"}
            </span>
            <span className={i === 0 ? "text-white" : ""}>{tip}</span>
          </p>
        ))}
        <p className="font-mono text-stone-600">{SYS.runDone}</p>
      </div>

      {/* Thanh trạng thái */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-stone-300 bg-[#f3f1ec] px-3 py-1.5 text-[11px] dark:border-stone-700 dark:bg-stone-950">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-ink-muted">
          <span>
            {c.metaLesson}: <b className="font-semibold text-ink-body">{c.metaLessonValue}</b>
          </span>
          <span>
            {t.finalOne.homePage.quizLabel}: <b className="font-semibold text-ink-body">{c.metaQuizValue}</b>
          </span>
          <span>
            {c.metaReview}: <b className="font-semibold text-ink-body">{c.metaReviewValue}</b>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <StatusDot />
            <Sys className="text-ink-muted">{SYS.status}</Sys>
            <Sys className="text-accent-strong">{SYS.ok}</Sys>
          </span>
          {clock && <Sys className="tabular-nums text-ink-muted">{clock}</Sys>}
        </div>
      </div>
    </div>
  );
}
