"use client";

import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { LEVELS, getLevelByXp } from "@/lib/levels";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

/**
 * Khối chủ đạo của dashboard: cấp hiện tại, cấp kế, và VIỆC CẦN LÀM để đi từ
 * cái này sang cái kia.
 *
 * ĐO TRƯỚC KHI THIẾT KẾ, và con số đổi hẳn bố cục. Đọc 1000 hồ sơ bằng service
 * role: 95% người dùng đang ở Level 1, chỉ 5% qua được Level 2 (mốc 30 XP) và
 * 1% tới Level 3. Bản đồ cũ trải đều mười lăm cấp cùng một cỡ, tức dành phần
 * lớn diện tích cho những cấp mà chín trong mười người xem sẽ không chạm tới.
 *
 * Nên ở đây chỉ HAI cấp được vẽ to: cấp đang đứng và cấp kế. Phần còn lại rút
 * thành một dải nhỏ - vẫn thấy con đường còn dài, nhưng không tranh chỗ với
 * bước duy nhất người đọc thực sự đi được hôm nay.
 *
 * KHÔNG CÓ "MỞ KHOÁ TÍNH NĂNG". `getRequiredLevelForBuilding` trả 1 cho mọi
 * toà nhà - không gì bị khoá theo cấp, và không toà nhà nào đặt `minLevel`.
 * Viết "Level 3 mở khoá X" là hứa một phần thưởng không tồn tại. Thứ cấp mới
 * thật sự đem lại là DANH HIỆU, và cổng thật để lên cấp là bài thi thăng cấp
 * (lib/level-exams.ts, đỗ từ 80%). Nên đó là hai thứ được hiện, không thêm gì.
 */
export default function ProgressionHero({
  userXp,
  cfaCompleted,
  nextLesson,
  onOpenExam,
  examUnlocked,
}: {
  userXp: number;
  cfaCompleted: number;
  nextLesson: { slug: string; title: string; xp: number } | null;
  onOpenExam: () => void;
  /** Đã đủ XP để được thi thăng cấp hay chưa. */
  examUnlocked: boolean;
}) {
  const { t } = useI18n();
  const d = t.dashboard;

  const current = getLevelByXp(userXp, cfaCompleted);
  const idx = LEVELS.findIndex((l) => l.level === current.level);
  const next = LEVELS[idx + 1] ?? null;

  // Cấp cuối: không còn mốc nào để đếm, nên khối này không dựng một thanh tiến
  // độ chạy tới hư không.
  if (!next) return null;

  const span = next.minXp - current.minXp;
  const done = Math.max(0, userXp - current.minXp);
  const gap = Math.max(0, next.minXp - userXp);
  const pct = span > 0 ? Math.min(100, Math.round((done / span) * 100)) : 0;

  // Sau bài học kế tiếp thì còn thiếu bao nhiêu. Đây là con số làm khối nhiệm
  // vụ có nghĩa: nó nối bài học -> XP -> phần còn lại -> bài thi, thay vì chỉ
  // nói "học tiếp đi".
  const gapAfter = nextLesson ? Math.max(0, gap - nextLesson.xp) : gap;

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5 dark:border-stone-800 dark:bg-stone-900">
      {/* Hai cấp, vẽ to, nối bằng một thanh tiến độ có con số nằm NGAY TRÊN
          đường đi - không phải trong một thẻ riêng ở cột khác. */}
      <div className="flex items-stretch gap-3">
        <LevelNode level={current} state="current" label={d.phCurrent} />

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <p className="text-center text-sm font-black text-stone-900 dark:text-stone-100">
            {format(d.phXpToNext, { xp: gap, level: next.level })}
          </p>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={span}
            aria-valuenow={Math.min(done, span)}
            aria-label={format(d.phXpToNext, { xp: gap, level: next.level })}
            className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800"
          >
            <div
              className="h-full rounded-full bg-stone-900 transition-all duration-500 dark:bg-stone-100"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-1 text-center text-[11px] font-bold text-stone-500 dark:text-stone-400">
            {format(d.phXpOf, { done: userXp, total: next.minXp })}
          </p>
        </div>

        <LevelNode level={next} state="next" label={d.phNext} />
      </div>

      {/* Bài thi thăng cấp gắn NGAY dưới nút cấp kế, không nằm ở cột phải.
          Nó là cổng thật giữa hai cấp - tách nó ra chỗ khác thì người đọc
          không thấy nó thuộc về con đường này. */}
      <button
        type="button"
        onClick={onOpenExam}
        disabled={!examUnlocked}
        className={`mt-3 flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors ${
          examUnlocked
            ? "cursor-pointer border-emerald-300 bg-emerald-50 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60"
            : "cursor-not-allowed border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-950/50"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          {examUnlocked ? (
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Lock className="h-4 w-4 shrink-0 text-stone-400" />
          )}
          <span className="min-w-0">
            <span className="block truncate text-sm font-black text-stone-900 dark:text-stone-100">
              {format(d.phExamTitle, { level: next.level })}
            </span>
            <span className="block truncate text-[11px] font-medium text-stone-500 dark:text-stone-400">
              {examUnlocked ? d.phExamReady : format(d.phExamLocked, { xp: gap })}
            </span>
          </span>
        </span>
        {examUnlocked && <ArrowRight className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />}
      </button>

      {/* NHIỆM VỤ TIẾP THEO: thứ rõ ràng nhất trên trang. Nó viết ra trọn chuỗi
          bài học -> XP -> phần còn lại -> bài thi, nên người đọc không phải tự
          nối bốn khối rời lại với nhau. */}
      {nextLesson && (
        <Link
          href={`/bai-hoc/${nextLesson.slug}`}
          className="mt-3 block rounded-xl bg-stone-900 p-3.5 transition-opacity hover:opacity-90 dark:bg-stone-100"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
            {d.phMissionEyebrow}
          </p>
          <p className="mt-1 truncate text-base font-black text-white dark:text-stone-900">{nextLesson.title}</p>
          <p className="mt-1.5 text-xs font-bold text-stone-300 dark:text-stone-600">
            {format(d.phMissionChain, {
              xp: nextLesson.xp,
              remaining: gapAfter,
              level: next.level,
            })}
          </p>
        </Link>
      )}

      {/* Những cấp xa rút thành một dải. Vẫn thấy con đường còn dài mà không
          lấy mất chỗ của bước kế tiếp. */}
      {idx + 2 < LEVELS.length && (
        <div className="mt-3 flex items-center gap-1.5 overflow-hidden border-t border-stone-100 pt-2.5 dark:border-stone-800">
          {LEVELS.slice(idx + 2).map((l) => (
            <span
              key={l.level}
              title={`${l.name} · ${l.minXp} XP`}
              className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold text-stone-400 dark:text-stone-600"
            >
              L{l.level}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

function LevelNode({
  level,
  state,
  label,
}: {
  level: (typeof LEVELS)[number];
  state: "current" | "next";
  label: string;
}) {
  const isCurrent = state === "current";
  return (
    <div
      className={`flex w-[6.5rem] shrink-0 flex-col items-center justify-center rounded-xl border p-2.5 text-center sm:w-28 ${
        isCurrent
          ? "border-stone-900 bg-stone-900 dark:border-stone-100 dark:bg-stone-100"
          : "border-dashed border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900"
      }`}
    >
      <span
        className={`text-[9px] font-black uppercase tracking-wider ${
          isCurrent ? "text-stone-400 dark:text-stone-500" : "text-stone-400 dark:text-stone-500"
        }`}
      >
        {label}
      </span>
      <span className="mt-0.5 text-2xl leading-none">{level.emoji}</span>
      <span
        className={`mt-1 text-xs font-black leading-tight ${
          isCurrent ? "text-white dark:text-stone-900" : "text-stone-700 dark:text-stone-300"
        }`}
      >
        L{level.level}
      </span>
      <span
        className={`mt-0.5 line-clamp-2 text-[10px] font-semibold leading-tight ${
          isCurrent ? "text-stone-300 dark:text-stone-600" : "text-stone-500 dark:text-stone-400"
        }`}
      >
        {level.name}
      </span>
    </div>
  );
}
