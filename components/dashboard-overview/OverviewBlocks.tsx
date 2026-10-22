"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  ChevronRight,
  Flame,
  Gamepad2,
  GraduationCap,
  Target,
  TerminalSquare,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

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
    <nav aria-label={r.shortcutsTitle} className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-0.5 no-scrollbar">
      <span className="mr-1 shrink-0 text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">{r.shortcutsTitle}</span>
      {shown.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-brand-50 px-3.5 py-2 text-sm font-bold text-brand-800 transition-colors hover:bg-brand-100 dark:bg-white/5 dark:text-brand-200 dark:hover:bg-white/10"
        >
          <Icon className="h-4 w-4 text-accent" strokeWidth={2.2} aria-hidden />
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
