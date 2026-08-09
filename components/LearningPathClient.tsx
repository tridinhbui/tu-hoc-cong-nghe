"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, CalendarDays, CheckCircle2, Flame, Target, TrendingUp } from "lucide-react";
import { getDashboardGreetingAction } from "@/app/(app)/dashboard/actions";
import { getLessonShortTitle } from "@/lib/lesson-labels";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { StageTopicId } from "@/lib/stage-topics";

type Track = "personal" | "professional";

/** Trung vị `totalMinutes` của cả kho, đo lúc viết trang này (n=722, khoảng
 *  4-11). Dùng để ước lượng "bao nhiêu phút mỗi ngày" - một con số đo được thì
 *  giữ được lòng tin, còn "chỉ 5 phút thôi" thì không. */
const MEDIAN_LESSON_MINUTES = 6;

const PACE_KEY = "thtcdn_path_pace";

interface Pace {
  perDay: 1 | 2;
  daysPerWeek: number;
}

export default function LearningPathClient({
  counts,
  done,
  userId,
}: {
  counts: Record<Track, number>;
  done: Record<Track, number>;
  userId: string;
}) {
  const { t } = useI18n();
  const p = t.learningPath;

  const [track, setTrack] = useState<Track>("personal");
  const [pace, setPace] = useState<Pace>({ perDay: 1, daysPerWeek: 5 });
  const [greeting, setGreeting] = useState<Awaited<ReturnType<typeof getDashboardGreetingAction>> | null>(null);
  const [loadingGreeting, setLoadingGreeting] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setTrack(window.localStorage.getItem("activeTrack") === "professional" ? "professional" : "personal");
    const saved = window.localStorage.getItem(PACE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Pace;
        if (parsed.perDay === 1 || parsed.perDay === 2) setPace(parsed);
      } catch {
        // Nhịp là tiện nghi, không phải dữ liệu - JSON hỏng thì về mặc định.
      }
    }
  }, []);

  useEffect(() => {
    let alive = true;
    setLoadingGreeting(true);
    getDashboardGreetingAction(userId, track)
      .then((r) => alive && setGreeting(r))
      .catch(() => alive && setGreeting(null))
      .finally(() => alive && setLoadingGreeting(false));
    return () => {
      alive = false;
    };
  }, [userId, track]);

  /** Ghi CẢ HAI khoá, như DashboardClient.setActiveTrack.
   *
   *  Dashboard đọc `activeTrack` để chọn chặng nào hiện ra và
   *  `activeDashboardTab` để chọn thẻ track nào sáng lên. Ghi một mà quên cái
   *  kia thì màn hình tự mâu thuẫn - chặng chuyên ngành dưới một thẻ "Cá nhân"
   *  đang sáng - và comment ở DashboardClient ghi rõ onboarding từng là đúng
   *  một cái ghi thiếu như thế. */
  const pickTrack = (next: Track) => {
    setTrack(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("activeTrack", next);
      window.localStorage.setItem("activeDashboardTab", next);
    }
  };

  const savePace = (next: Pace) => {
    setPace(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(PACE_KEY, JSON.stringify(next));
    }
  };

  const total = counts[track];
  const remaining = Math.max(0, total - done[track]);
  const perWeek = pace.perDay * pace.daysPerWeek;
  const weeks = perWeek > 0 ? Math.ceil(remaining / perWeek) : 0;
  const minutesPerDay = pace.perDay * MEDIAN_LESSON_MINUTES;

  const nextLesson = greeting?.nextLesson ?? null;
  const gaps = greeting?.topicGapSummary ?? [];

  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 py-8">
      <header className="space-y-1">
        <h1 className="flex items-center gap-2 text-2xl font-black text-stone-900 dark:text-stone-100">
          <Flame className="h-6 w-6 text-orange-500" />
          {p.title}
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">{p.subtitle}</p>
      </header>

      {/* 1. Chọn lộ trình */}
      <Card icon={<Target className="h-4 w-4" />} title={p.stepPickTitle} hint={p.stepPickHint}>
        <div className="grid gap-3 sm:grid-cols-2">
          {(["personal", "professional"] as const).map((id) => {
            const picked = track === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => pickTrack(id)}
                aria-pressed={picked}
                className={`rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                  picked
                    ? "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40"
                    : "border-stone-200 bg-white hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-black text-stone-900 dark:text-stone-100">
                    {id === "personal" ? p.trackPersonalName : p.trackProfessionalName}
                  </span>
                  {picked && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />}
                </div>
                <p className="mt-1 text-[11px] text-stone-600 dark:text-stone-400">
                  {id === "personal" ? p.trackPersonalFor : p.trackProfessionalFor}
                </p>
                <p className="mt-2 text-[11px] font-bold text-stone-500 dark:text-stone-400">
                  {format(p.trackLessons, { count: counts[id] })}
                </p>
                <p className="mt-2 text-[10px] font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  {picked ? p.trackPicked : p.trackPick}
                </p>
              </button>
            );
          })}
        </div>
        {track === "professional" && (
          <p className="mt-3 rounded-xl border-l-2 border-amber-400 bg-amber-50 p-3 text-[11px] leading-relaxed text-stone-700 dark:bg-amber-950/30 dark:text-stone-300">
            {p.proNote}
          </p>
        )}
      </Card>

      {/* 2. Đặt nhịp */}
      <Card icon={<CalendarDays className="h-4 w-4" />} title={p.stepPaceTitle} hint={p.stepPaceHint}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={p.paceLessonsPerDay}>
            <div className="flex gap-1.5">
              {([1, 2] as const).map((n) => (
                <Pill key={n} active={pace.perDay === n} onClick={() => savePace({ ...pace, perDay: n })}>
                  {n === 1 ? p.paceOne : p.paceTwo}
                </Pill>
              ))}
            </div>
          </Field>
          <Field label={p.paceDaysPerWeek}>
            <div className="flex flex-wrap gap-1.5">
              {[3, 4, 5, 6, 7].map((d) => (
                <Pill key={d} active={pace.daysPerWeek === d} onClick={() => savePace({ ...pace, daysPerWeek: d })}>
                  {String(d)}
                </Pill>
              ))}
            </div>
          </Field>
        </div>
        <div className="mt-3 rounded-xl bg-stone-50 p-3 dark:bg-stone-950/50">
          <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
            {format(p.paceEstimate, { weeks, count: remaining })}
          </p>
          <p className="mt-0.5 text-[11px] text-stone-500 dark:text-stone-400">
            {format(p.paceMinutes, { minutes: minutesPerDay })}
          </p>
        </div>
        <details className="mt-3 rounded-xl border border-stone-200 p-3 dark:border-stone-800">
          <summary className="cursor-pointer text-[11px] font-black text-stone-700 dark:text-stone-300">
            {p.paceWarnTitle}
          </summary>
          <p className="mt-2 text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">{p.paceWarnBody}</p>
        </details>
      </Card>

      {/* 3. Ba bước mỗi bài */}
      <Card icon={<BookOpen className="h-4 w-4" />} title={p.stepHowTitle}>
        <ol className="space-y-2.5">
          {[
            [p.howReadTitle, p.howReadBody],
            [p.howQuizTitle, p.howQuizBody],
            [p.howPracticeTitle, p.howPracticeBody],
          ].map(([title, body], i) => (
            <li key={title} className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-stone-800 text-[10px] font-black text-white dark:bg-stone-700">
                {i + 1}
              </span>
              <div>
                <p className="text-xs font-bold text-stone-900 dark:text-stone-100">{title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      {/* 4. Mốc kiểm + nhịp tuần */}
      <Card icon={<CheckCircle2 className="h-4 w-4" />} title={p.stepCheckTitle}>
        <p className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">{p.stepCheckBody}</p>
        <p className="mt-3 text-[11px] font-black uppercase tracking-wide text-stone-500 dark:text-stone-400">
          {p.weekRhythmTitle}
        </p>
        <ul className="mt-1.5 space-y-1 text-[11px] text-stone-600 dark:text-stone-400">
          <li>· {format(p.weekStudy, { days: Math.max(1, pace.daysPerWeek - 1) })}</li>
          <li>· {p.weekReview}</li>
          <li>· {p.weekRest}</li>
        </ul>
      </Card>

      {/* 5. Hôm nay làm gì */}
      <Card icon={<TrendingUp className="h-4 w-4" />} title={p.stepAdjustTitle}>
        {loadingGreeting ? (
          <p className="text-[11px] text-stone-500 dark:text-stone-400">{p.adjustLoading}</p>
        ) : !nextLesson ? (
          <p className="text-[11px] text-stone-500 dark:text-stone-400">{p.adjustNoData}</p>
        ) : (
          <div className="space-y-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950/40">
              <p className="text-[10px] font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                {p.adjustNextLesson}
              </p>
              <p className="mt-0.5 text-xs font-bold text-stone-900 dark:text-stone-100">
                {getLessonShortTitle({ title: nextLesson.title })}
              </p>
              <Link
                href={`/bai-hoc/${nextLesson.slug}`}
                className="mt-2 inline-flex text-[11px] font-black text-emerald-700 hover:underline dark:text-emerald-400"
              >
                {p.adjustOpenLesson}
              </Link>
            </div>
            <p className="text-[11px] text-stone-600 dark:text-stone-400">
              {format(p.adjustProgress, { done: done[track], total })}
            </p>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wide text-stone-500 dark:text-stone-400">
                {p.adjustWeakest}
              </p>
              {gaps.length === 0 ? (
                <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">{p.adjustEmptyGaps}</p>
              ) : (
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {gaps.map((g: { topicId: StageTopicId; count: number }) => (
                    <span
                      key={g.topicId}
                      className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[10px] font-black text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300"
                    >
                      {t.topics[g.topicId]}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function Card({
  icon,
  title,
  hint,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
          {icon}
        </span>
        <h2 className="text-sm font-black text-stone-900 dark:text-stone-100">{title}</h2>
      </div>
      {hint && <p className="mt-1.5 text-[11px] text-stone-500 dark:text-stone-400">{hint}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-[10px] font-black uppercase tracking-wide text-stone-500 dark:text-stone-400">{label}</p>
      {children}
    </div>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${
        active
          ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
          : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"
      }`}
    >
      {children}
    </button>
  );
}
