"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Check,
  ChevronRight,
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
const SECTION_CHIPS = [
  "bg-gradient-to-br from-brand-500 to-brand-700 shadow-brand-600/30",
  "bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-500/30",
  "bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/30",
  "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/30",
];

export function SectionHeading({ n, title, hint, action, quiet = false }: { n?: number; title: string; hint?: string; action?: ReactNode; quiet?: boolean }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
      <div className="min-w-0">
        {/* `quiet`: khu phụ - chữ nhỏ, không chip số. Chỉ khu chính (Học tiếp)
            giữ cỡ tiêu đề đầy đủ, để trang có một thứ bậc rõ. */}
        <h2 className={quiet ? "text-xs font-bold uppercase tracking-[0.1em] text-ink-muted" : "flex items-center gap-2.5 text-lg font-black tracking-tight text-ink-max"}>
          {n !== undefined && (
            <span className={`inline-flex h-7 min-w-7 items-center justify-center rounded-lg px-1.5 font-mono text-[13px] font-bold tabular-nums text-white shadow-md ${SECTION_CHIPS[(n - 1) % SECTION_CHIPS.length]}`}>{String(n).padStart(2, "0")}</span>
          )}
          {title}
        </h2>
        {hint && <p className="mt-0.5 text-sm text-ink-muted lg:[@media(max-height:1199px)]:hidden">{hint}</p>}
      </div>
      {action}
    </div>
  );
}

/** Thanh đầu trang: chỉ tên trang. Viên thưởng XP/bài đã bỏ - con số đó nằm ở thẻ Học tiếp. */
export function OverviewTopBar() {
  const { t } = useI18n();
  return (
    <h1 className="text-xl font-black tracking-tight text-ink-max sm:text-2xl">{t.revampDashboard.pageTitle}</h1>
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
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-white to-brand-50 p-5 shadow-card ring-1 ring-accent-line sm:p-7 lg:[@media(max-height:1199px)]:p-4 dark:from-brand-950/50 dark:via-stone-900 dark:to-stone-900 dark:ring-white/5">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-brand-200" />
      <div aria-hidden className="pointer-events-none absolute -left-10 -top-12 h-40 w-40 rounded-full bg-brand-100/60 blur-3xl dark:bg-brand-500/10" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 right-24 h-44 w-44 rounded-full bg-brand-200/30 blur-3xl dark:bg-brand-500/10" />
      <div className="relative z-10 sm:pr-[290px] lg:pr-[330px] lg:max-xl:!pr-0 lg:[@media(max-height:1199px)]:pr-[230px]">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-strong">
          {/* i18n-ignore-start: mã định vị hệ thống, cùng họ với THCN://INTERVIEW/TECH */}
          {"THCN://APP/DASHBOARD"}
          {/* i18n-ignore-end */}
        </p>
        <h2 className="mt-2 bg-gradient-to-r from-brand-800 to-brand-600 bg-clip-text text-2xl font-black leading-tight tracking-tight text-transparent sm:text-[30px] lg:[@media(max-height:1199px)]:mt-1 lg:[@media(max-height:1199px)]:text-xl dark:from-brand-200 dark:to-brand-400">
          {r.heroTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-body sm:text-[15px] lg:[@media(max-height:1199px)]:hidden">{r.heroSub}</p>
      </div>

      <WorkstationArt className="pointer-events-none absolute bottom-3 right-0 hidden h-[160px] w-[280px] sm:block lg:right-3 lg:h-[180px] lg:w-[315px] lg:[@media(max-height:1199px)]:h-[110px] lg:[@media(max-height:1199px)]:w-[200px] lg:max-xl:!hidden" />

      <div className="relative z-10 mt-5 lg:[@media(max-height:1199px)]:hidden rounded-2xl bg-white/85 px-3 py-2.5 ring-1 ring-brand-100 backdrop-blur-sm sm:mr-[290px] lg:mr-[330px] dark:bg-stone-950/60 dark:ring-white/5">
        <CoCoSays lines={cocoLines} vars={cocoVars} size={36} quiet />
      </div>

      <div className="relative z-10 mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 lg:[@media(max-height:1199px)]:mt-2">
        <div className="h-2.5 w-40 overflow-hidden rounded-full bg-white/80 sm:w-56 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-600 via-sky-500 to-cyan-400 motion-safe:transition-[width] motion-safe:duration-700"
            style={{ width: `${Math.max(2, progressPct)}%` }}
          />
        </div>
        <span className="text-xs font-bold tabular-nums text-ink-body">{format(r.heroProgress, { pct: progressPct })}</span>
        <span className="text-xs font-bold tabular-nums text-warn">{format(r.heroXp, { xp })}</span>
      </div>
    </section>
  );
}

type PracticeMode = { href: string; label: string; icon: LucideIcon };

/** Lối tắt luyện tập: một hàng chip nhỏ, không mô tả, không tranh với Học tiếp. */
export function PracticeModeGrid({ lessonsDone = Infinity }: { lessonsDone?: number }) {
  const { t } = useI18n();
  const r = t.revampDashboard;
  const modes: PracticeMode[] = [
    { href: "/kiem-tra", label: t.nav.quiz, icon: GraduationCap },
    { href: "/phong-van-ky-thuat", label: t.nav.technicalInterview, icon: BriefcaseBusiness },
    { href: "/cong-cu", label: t.nav.toolSimulators, icon: TerminalSquare },
    { href: "/thi-vuot-chang", label: t.nav.stageSkipExam, icon: Trophy },
    { href: "/game", label: t.dataRest.appNavbar.gameKingdomLabel, icon: Gamepad2 },
  ];
  // Game Kingdom hiện sau bài thứ ba - cùng ngưỡng với thanh bên (AppNavbar).
  const shown = lessonsDone >= 3 ? modes : modes.filter((m) => m.href !== "/game");
  return (
    <nav aria-label={r.shortcutsTitle} className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">{r.shortcutsTitle}</span>
      {shown.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="group inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-2 text-sm font-bold text-brand-800 transition-colors hover:bg-brand-100 dark:bg-white/5 dark:text-brand-200 dark:hover:bg-white/10"
        >
          <Icon className="h-4 w-4 text-brand-600 dark:text-brand-300" strokeWidth={2.2} aria-hidden />
          {label}
        </Link>
      ))}
    </nav>
  );
}

/** Cột phải: chuỗi ngày, bài đã học, điểm quiz. Cấp và XP đã nằm ở thẻ Học tiếp nên không lặp ở đây. */
export function ProgressSideCard({
  streakSlot,
  lessonsDone,
  lessonsTotal,
  avgQuizScore,
}: {
  streakSlot: ReactNode;
  lessonsDone: number;
  lessonsTotal: number;
  avgQuizScore: number | null;
}) {
  const { t } = useI18n();
  const r = t.revampDashboard;
  const rows: { icon: LucideIcon; tone: string; chip: string; label: string; value: ReactNode }[] = [
    { icon: Flame, tone: "text-orange-500", chip: "bg-orange-100 dark:bg-orange-500/15", label: r.sideStreak, value: streakSlot },
    { icon: BookOpenCheck, tone: "text-brand-600", chip: "bg-brand-100 dark:bg-brand-500/15", label: r.sideLessons, value: <span className="font-mono tabular-nums">{lessonsDone}/{lessonsTotal}</span> },
    { icon: Target, tone: "text-brand-600", chip: "bg-brand-100 dark:bg-brand-500/15", label: r.sideQuiz, value: <span className="font-mono tabular-nums">{avgQuizScore === null ? "--" : `${avgQuizScore}%`}</span> },
  ];
  return (
    <section className={`${softCard} p-5`}>
      <Link href="/profile" className="group flex items-center justify-between gap-2">
        <h2 className="text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">{r.achievementsTitle}</h2>
        <ChevronRight className="h-4 w-4 text-ink-faint transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
      <ul className="mt-2 divide-y divide-line-soft">
        {rows.map(({ icon: Icon, tone, chip, label, value }) => (
          <li key={label} className="flex items-center gap-3 py-2.5">
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${chip}`}>
              <Icon className={`h-4 w-4 ${tone}`} aria-hidden />
            </span>
            <span className="flex-1 text-sm font-semibold text-ink-body">{label}</span>
            <span className="text-sm font-bold text-ink-max">{value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export type JourneyStage = { key: string; label: string; name: string; done: number; total: number };

/** Hành trình ngắn: chặng vừa xong, chặng hiện tại (có tiến độ) và mốc kế tiếp. */
export function JourneyCard({ stages, currentIndex, pathPct }: { stages: JourneyStage[]; currentIndex: number; pathPct: number }) {
  const { t } = useI18n();
  const r = t.revampDashboard;
  const cur = Math.min(Math.max(currentIndex, 0), Math.max(stages.length - 1, 0));
  const window = stages.slice(Math.max(0, cur - 1), cur + 2);
  const current = stages[cur];
  const left = current ? Math.max(0, current.total - current.done) : 0;
  return (
    <section className={`${softCard} flex flex-col p-5`}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">{r.journeyTitle}</h2>
        <span className="font-mono text-xs font-bold tabular-nums text-brand-700 dark:text-brand-300">{pathPct}%</span>
      </div>
      <ol className="mt-4 flex-1">
        {window.map((st, i) => {
          const idx = stages.indexOf(st);
          const isCur = idx === cur;
          const isDone = idx < cur;
          const pct = st.total > 0 ? Math.round((st.done / st.total) * 100) : 0;
          return (
            <li key={st.key} className="relative flex gap-3 pb-4 last:pb-0">
              {i < window.length - 1 && <span aria-hidden className={`absolute left-[13px] top-7 bottom-0 w-0.5 ${isDone ? "bg-brand-500" : "bg-brand-100 dark:bg-white/10"}`} />}
              <span
                className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-black ${
                  isDone ? "bg-brand-500 text-white" : isCur ? "bg-brand-600 text-white ring-4 ring-brand-100 dark:ring-brand-500/20" : "bg-white text-ink-faint ring-2 ring-brand-100 dark:bg-stone-900 dark:ring-white/10"
                }`}
              >
                {isDone ? <Check className="h-3.5 w-3.5" aria-hidden /> : idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className={`text-[11px] font-bold uppercase tracking-[0.08em] ${isCur ? "text-accent-strong" : "text-ink-faint"}`}>
                  {isCur ? r.journeyNow : isDone ? st.label : r.journeyNext}
                </p>
                <p className={`truncate font-black leading-snug ${isCur ? "text-base text-ink-max" : "text-sm text-ink-soft"}`}>{st.name}</p>
                {isCur && (
                  <>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-100 dark:bg-white/10">
                      <div className="h-full rounded-full bg-brand-500 motion-safe:transition-[width] motion-safe:duration-700" style={{ width: `${Math.max(3, pct)}%` }} />
                    </div>
                    <p className="mt-1.5 text-xs text-ink-muted">
                      <span className="font-mono tabular-nums">{format(r.journeyLessons, { done: st.done, total: st.total })}</span>
                      {" · "}
                      {cur < stages.length - 1 ? format(r.journeyLeft, { n: left }) : r.journeyLast}
                    </p>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <Link href="/lo-trinh" className="group mt-4 inline-flex items-center gap-1 self-start text-sm font-bold text-brand-700 hover:text-brand-900 dark:text-brand-300">
        {r.roadmapOpen}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </section>
  );
}

/** Dải cấp + XP gắn ở chân thẻ Học tiếp. Không tương tác (thẻ cha là một <Link>). */
export function HeroLevelStrip({ level, name, progressPct, nextLine }: { level: number; name: string; progressPct: number; nextLine: string }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 shrink-0 items-center justify-center rounded-lg bg-brand-600 px-2.5 font-mono text-xs font-black text-white">
        {format(t.revampDashboard.sideLevel, { level })}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <span className="truncate text-sm font-black text-ink-max">{name}</span>
          <span className="shrink-0 text-xs font-semibold text-ink-muted">{nextLine}</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-brand-100 dark:bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-cyan-400 motion-safe:transition-[width] motion-safe:duration-700" style={{ width: `${Math.max(3, progressPct)}%` }} />
        </div>
      </div>
    </div>
  );
}

/** Thẻ cúp ở cột phải: lời mời vào luyện phỏng vấn. */
export function TrophyPromoCard() {
  const { t } = useI18n();
  const r = t.revampDashboard;
  return (
    <Link
      href="/phong-van-ky-thuat"
      className="group relative block overflow-hidden rounded-2xl bg-accent-soft p-5 shadow-card ring-1 ring-accent-line transition-colors hover:ring-brand-300"
    >
      <div className="relative z-10 max-w-[60%]">
        <p className="text-xl font-black leading-tight tracking-tight text-ink-max">
          {r.promoTitle1}
          <br />
          {r.promoTitle2}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ink-soft">{r.promoBody}</p>
        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
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
