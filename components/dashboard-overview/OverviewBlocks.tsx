"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  ChevronRight,
  Crown,
  Flame,
  Gamepad2,
  GraduationCap,
  Target,
  TerminalSquare,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import CoCoSays from "@/components/CoCoSays";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

// Các khối của trang tổng quan /dashboard, dựng theo cùng ngôn ngữ với trang
// Luyện phỏng vấn: banner đầu trang có minh hoạ và Cơ Cơ, các khu đánh số
// "01 / 02 / 03", lưới thẻ có ô biểu tượng màu, và ở cột phải một thẻ "Tiến độ
// của bạn" cùng một thẻ cúp.
//
// Minh hoạ là SVG vẽ tay trong tệp này chứ không phải ảnh: nó đổi màu theo
// chế độ sáng/tối (mọi nét đi qua lớp Tailwind), nặng vài trăm byte, và giữ
// đúng tông xanh của sản phẩm - các ảnh sẵn có trong public/images là tranh
// màu nước tông xanh lá, khác hẳn phong cách này.

/** Thẻ trắng nổi nhẹ - mặt nền chung của mọi khối ở trang này. */
export const softCard =
  "rounded-2xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-12px_rgba(41,97,184,0.18)] ring-1 ring-brand-100/70 dark:bg-stone-900 dark:ring-white/5";

/** "01 Học tiếp" + một dòng gợi ý - đầu khu, như "01 Chọn vị trí". */
export function SectionHeading({ n, title, hint, action }: { n: number; title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
      <div className="min-w-0">
        <h2 className="flex items-baseline gap-2 text-lg font-black tracking-tight text-ink-max">
          <span className="font-mono text-base font-bold tabular-nums text-accent-strong">{String(n).padStart(2, "0")}</span>
          {title}
        </h2>
        {hint && <p className="mt-0.5 text-sm text-ink-muted">{hint}</p>}
      </div>
      {action}
    </div>
  );
}

/** Thanh đầu trang: tên trang bên trái, viên thưởng XP bên phải. */
export function OverviewTopBar({ xpPerLesson }: { xpPerLesson: number }) {
  const { t } = useI18n();
  const r = t.revampDashboard;
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-xl font-black tracking-tight text-ink-max sm:text-2xl">{r.pageTitle}</h1>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 ring-1 ring-amber-200/70 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20">
        <Crown className="h-3.5 w-3.5" aria-hidden />
        {format(r.rewardPill, { xp: xpPerLesson })}
      </span>
    </div>
  );
}

/** Banner đầu trang: mã định vị, tiêu đề, minh hoạ, Cơ Cơ và tiến độ lộ trình. */
export function DashboardHeroBanner({
  cocoLines,
  cocoVars,
  progressPct,
  xp,
}: {
  cocoLines: readonly string[];
  cocoVars?: Record<string, string | number>;
  progressPct: number;
  xp: number;
}) {
  const { t } = useI18n();
  const r = t.revampDashboard;
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-100/70 via-brand-50 to-sky-100/80 p-5 ring-1 ring-brand-100 sm:p-7 dark:from-brand-950/50 dark:via-stone-900 dark:to-stone-900 dark:ring-white/5">
      <div className="relative z-10 sm:pr-[290px] lg:pr-[330px]">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-strong">
          {/* i18n-ignore-start: mã định vị hệ thống, cùng họ với THCN://INTERVIEW/TECH */}
          {"THCN://APP/DASHBOARD"}
          {/* i18n-ignore-end */}
        </p>
        <h2 className="mt-2 text-2xl font-black leading-tight tracking-tight text-brand-950 sm:text-[30px] dark:text-stone-50">
          {r.heroTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-body sm:text-[15px]">{r.heroSub}</p>
      </div>

      <WorkstationArt className="pointer-events-none absolute bottom-3 right-0 hidden h-[160px] w-[280px] sm:block lg:right-3 lg:h-[180px] lg:w-[315px]" />

      <div className="relative z-10 mt-5 rounded-2xl bg-white/85 px-3 py-2.5 ring-1 ring-brand-100 backdrop-blur-sm sm:mr-[290px] lg:mr-[330px] dark:bg-stone-950/60 dark:ring-white/5">
        <CoCoSays lines={cocoLines} vars={cocoVars} size={36} quiet />
      </div>

      <div className="relative z-10 mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <div className="h-2 w-40 overflow-hidden rounded-full bg-brand-100 sm:w-56 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-600 to-cyan-400 motion-safe:transition-[width] motion-safe:duration-700"
            style={{ width: `${Math.max(2, progressPct)}%` }}
          />
        </div>
        <span className="text-xs font-bold tabular-nums text-ink-body">{format(r.heroProgress, { pct: progressPct })}</span>
        <span className="text-xs font-bold tabular-nums text-warn">{format(r.heroXp, { xp })}</span>
      </div>
    </section>
  );
}

type PracticeMode = { href: string; label: string; sub: string; icon: LucideIcon; tile: string };

/** Lưới thẻ luyện tập - mỗi chế độ một ô biểu tượng mang màu riêng. */
export function PracticeModeGrid() {
  const { t } = useI18n();
  const r = t.revampDashboard;
  const modes: PracticeMode[] = [
    { href: "/kiem-tra", label: t.nav.quiz, sub: r.practiceQuizSub, icon: GraduationCap, tile: "bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300" },
    { href: "/phong-van-ky-thuat", label: t.nav.technicalInterview, sub: r.practiceInterviewSub, icon: BriefcaseBusiness, tile: "bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300" },
    { href: "/cong-cu", label: t.nav.toolSimulators, sub: r.practiceToolsSub, icon: TerminalSquare, tile: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300" },
    { href: "/thi-vuot-chang", label: t.nav.stageSkipExam, sub: r.practiceStageSkipSub, icon: Trophy, tile: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300" },
    { href: "/game", label: t.dataRest.appNavbar.gameKingdomLabel, sub: r.practiceGameSub, icon: Gamepad2, tile: "bg-rose-100 text-rose-500 dark:bg-rose-500/15 dark:text-rose-300" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {modes.map(({ href, label, sub, icon: Icon, tile }) => (
        <Link
          key={href}
          href={href}
          className={`${softCard} group flex flex-col items-center px-3 pb-3.5 pt-4 text-center transition-[box-shadow,transform] hover:-translate-y-0.5 hover:ring-brand-300 dark:hover:ring-brand-700`}
        >
          <span className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-105 ${tile}`}>
            <Icon className="h-6 w-6" strokeWidth={2.2} aria-hidden />
          </span>
          <span className="mt-2.5 text-sm font-black leading-tight text-ink-max">{label}</span>
          <span className="mt-1 text-[11.5px] leading-snug text-ink-muted">{sub}</span>
        </Link>
      ))}
    </div>
  );
}

/** Cột phải: cấp, XP và ba số liệu đánh số. */
export function ProgressSideCard({
  level,
  xpInLevel,
  xpForLevel,
  streakSlot,
  lessonsDone,
  lessonsTotal,
  avgQuizScore,
}: {
  level: number;
  xpInLevel: number;
  xpForLevel: number | null;
  streakSlot: ReactNode;
  lessonsDone: number;
  lessonsTotal: number;
  avgQuizScore: number | null;
}) {
  const { t } = useI18n();
  const r = t.revampDashboard;
  const pct = xpForLevel ? Math.min(100, Math.round((xpInLevel / xpForLevel) * 100)) : 100;
  const rows: { icon: LucideIcon; tone: string; label: string; value: ReactNode }[] = [
    { icon: Flame, tone: "text-amber-500", label: r.sideStreak, value: streakSlot },
    { icon: BookOpenCheck, tone: "text-accent", label: r.sideLessons, value: <span className="font-mono tabular-nums">{lessonsDone}/{lessonsTotal}</span> },
    { icon: Target, tone: "text-rose-500", label: r.sideQuiz, value: <span className="font-mono tabular-nums">{avgQuizScore === null ? "--" : `${avgQuizScore}%`}</span> },
  ];
  return (
    <section className={`${softCard} p-5`}>
      <Link href="/profile" className="group flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-base font-black tracking-tight text-ink-max">
          <Target className="h-5 w-5 text-rose-500" aria-hidden />
          {r.progressTitle}
        </h2>
        <ChevronRight className="h-4 w-4 text-ink-faint transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>

      <div className="mt-4 flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-surface-raised font-mono text-base font-black text-ink-max dark:bg-stone-800">
          {format(r.sideLevel, { level })}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-sm font-bold tabular-nums text-warn">
            {xpForLevel ? format(r.sideXp, { xp: xpInLevel, next: xpForLevel }) : format(r.heroXp, { xp: xpInLevel })}
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-sunken">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500" style={{ width: `${Math.max(3, pct)}%` }} />
          </div>
        </div>
      </div>

      <ol className="mt-4 divide-y divide-line-soft">
        {rows.map(({ icon: Icon, tone, label, value }, i) => (
          <li key={label} className="flex items-center gap-3 py-2.5">
            <span className="w-5 font-mono text-[11px] tabular-nums text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-raised dark:bg-stone-800">
              <Icon className={`h-4 w-4 ${tone}`} aria-hidden />
            </span>
            <span className="flex-1 text-sm font-semibold text-ink-body">{label}</span>
            <span className="text-sm font-bold text-ink-max">{value}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Thẻ cúp ở cột phải: lời mời vào luyện phỏng vấn. */
export function TrophyPromoCard() {
  const { t } = useI18n();
  const r = t.revampDashboard;
  return (
    <Link
      href="/phong-van-ky-thuat"
      className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 via-brand-50 to-sky-100 p-5 ring-1 ring-brand-100 dark:from-brand-950 dark:via-stone-900 dark:to-brand-950/60 dark:ring-white/5"
    >
      <div className="relative z-10 max-w-[60%]">
        <p className="text-xl font-black leading-tight tracking-tight text-brand-950 dark:text-stone-50">
          {r.promoTitle1}
          <br />
          {r.promoTitle2}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ink-body">{r.promoBody}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-accent-strong">
          {r.promoCta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
      <TrophyArt className="pointer-events-none absolute -bottom-1 -right-2 h-[150px] w-[160px]" />
    </Link>
  );
}

/* ─── Minh hoạ ─────────────────────────────────────────────────────────── */

function WorkstationArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 330 190" className={className} aria-hidden>
      {/* sàn */}
      <ellipse cx="190" cy="178" rx="140" ry="9" className="fill-brand-200/50 dark:fill-white/5" />
      {/* bàn */}
      <rect x="70" y="118" width="210" height="9" rx="3" className="fill-brand-800 dark:fill-brand-700" />
      <rect x="84" y="127" width="7" height="48" rx="2" className="fill-brand-900 dark:fill-brand-800" />
      <rect x="258" y="127" width="7" height="48" rx="2" className="fill-brand-900 dark:fill-brand-800" />
      {/* màn hình */}
      <rect x="112" y="58" width="104" height="62" rx="7" className="fill-brand-700 dark:fill-brand-600" />
      <rect x="118" y="64" width="92" height="50" rx="4" className="fill-sky-100 dark:fill-brand-950" />
      <rect x="126" y="74" width="34" height="4" rx="2" className="fill-brand-500" />
      <rect x="126" y="83" width="54" height="4" rx="2" className="fill-brand-300 dark:fill-brand-700" />
      <rect x="134" y="92" width="40" height="4" rx="2" className="fill-cyan-400" />
      <rect x="126" y="101" width="26" height="4" rx="2" className="fill-brand-300 dark:fill-brand-700" />
      <rect x="158" y="118" width="12" height="4" className="fill-brand-800" />
      {/* bong bóng code */}
      <g>
        <rect x="66" y="14" width="70" height="44" rx="10" className="fill-brand-500 dark:fill-brand-600" />
        <path d="M84 58 l8 10 l6 -10 z" className="fill-brand-500 dark:fill-brand-600" />
        <text x="101" y="42" textAnchor="middle" className="fill-white font-mono text-[17px] font-bold">
          {"</>"}
        </text>
      </g>
      {/* ghế */}
      <rect x="236" y="40" width="46" height="72" rx="14" className="fill-brand-600 dark:fill-brand-500" />
      <rect x="244" y="48" width="30" height="50" rx="10" className="fill-brand-700 dark:fill-brand-600" />
      <rect x="230" y="104" width="58" height="16" rx="7" className="fill-brand-700 dark:fill-brand-600" />
      <rect x="255" y="120" width="8" height="34" className="fill-brand-900 dark:fill-brand-800" />
      <path d="M232 170 L259 154 L286 170" className="stroke-brand-900 dark:stroke-brand-800" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* chậu cây */}
      <path d="M190 118 h26 l-4 -18 h-18 z" className="fill-white dark:fill-stone-200" />
      <path d="M203 100 c-2 -14 -12 -20 -18 -18 c4 6 8 12 18 18 z" className="fill-emerald-500" />
      <path d="M203 100 c2 -16 12 -24 20 -22 c-4 8 -10 16 -20 22 z" className="fill-emerald-400" />
      <path d="M203 100 c0 -12 0 -22 0 -28" className="stroke-emerald-600" strokeWidth="2" fill="none" />
    </svg>
  );
}

function TrophyArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 150" className={className} aria-hidden>
      <path d="M0 150 L42 96 L70 124 L104 80 L160 150 Z" className="fill-white/70 dark:fill-white/5" />
      <path d="M40 150 L92 104 L130 150 Z" className="fill-brand-200/80 dark:fill-brand-900/60" />
      {/* bệ */}
      <rect x="62" y="112" width="44" height="12" rx="3" className="fill-brand-900 dark:fill-brand-800" />
      <rect x="70" y="104" width="28" height="9" rx="2" className="fill-amber-500" />
      <rect x="80" y="86" width="8" height="19" className="fill-amber-500" />
      {/* cúp */}
      <path d="M58 26 h52 v22 c0 20 -12 36 -26 36 s-26 -16 -26 -36 z" className="fill-amber-400" />
      <path d="M58 32 h-10 c0 16 8 24 16 26" className="stroke-amber-500" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M110 32 h10 c0 16 -8 24 -16 26" className="stroke-amber-500" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M66 30 v18 c0 10 4 20 10 26" className="stroke-amber-200" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M84 38 l4.5 9 l10 1.4 l-7.2 7 l1.7 9.9 l-9 -4.7 l-9 4.7 l1.7 -9.9 l-7.2 -7 l10 -1.4 z" className="fill-amber-100" />
    </svg>
  );
}
