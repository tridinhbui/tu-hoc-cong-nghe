"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Compass, Flame, HelpCircle, ListChecks } from "lucide-react";
import { getDashboardGreetingAction } from "@/app/(app)/dashboard/actions";
import { getLessonShortTitle } from "@/lib/lesson-labels";
import { useI18n } from "@/lib/i18n/context";
import {
  DEFAULT_PACE,
  MEDIAN_LESSON_MINUTES,
  readPace,
  weeksFor,
  writePace,
  type Pace,
} from "@/lib/learning-pace";
import { format } from "@/lib/i18n";
import type { StageTopicId } from "@/lib/stage-topics";

type Track = "personal" | "professional";

/** Trung vị `totalMinutes` của cả kho, đo lúc viết trang này (n=722, khoảng
 *  4-11). Một con số đo được giữ được lòng tin; "nhẹ nhàng thôi" thì không.
 *  lib/__tests__/learning-path-claims.test.ts neo nó lại. */
// Nhịp và phép tính đi kèm nằm ở lib/learning-pace.ts: khối tóm tắt trên
// /hoc-bai đọc cùng khoá và in cùng câu "còn N bài, khoảng M tuần", nên hai
// bản sao của công thức sẽ lệch nhau mà không có gì báo.

/**
 * Thứ tự các phần là thứ tự câu hỏi trong đầu người mới, không phải thứ tự
 * logic của sản phẩm.
 *
 * Bản đầu đặt "hôm nay làm gì" ở phần thứ NĂM, sau khi đã giải thích lộ trình,
 * nhịp học và ba bước. Người đang bối rối thì câu duy nhất họ cần ngay là "vậy
 * giờ tôi bấm vào đâu" - để nó ở đáy nghĩa là bắt họ đọc hết bốn phần lý thuyết
 * trước khi được trả lời. Nên nó lên đầu, và mọi thứ khác xuống dưới nó.
 */
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
  const [pace, setPace] = useState<Pace>(DEFAULT_PACE);
  const [greeting, setGreeting] = useState<Awaited<ReturnType<typeof getDashboardGreetingAction>> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setTrack(window.localStorage.getItem("activeTrack") === "professional" ? "professional" : "personal");
    setPace(readPace());
  }, []);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getDashboardGreetingAction(userId, track)
      .then((r) => alive && setGreeting(r))
      .catch(() => alive && setGreeting(null))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [userId, track]);

  /** Ghi CẢ HAI khoá, như DashboardClient.setActiveTrack.
   *
   *  Dashboard đọc `activeTrack` để chọn chặng nào hiện và `activeDashboardTab`
   *  để chọn thẻ track nào sáng lên. Ghi một mà quên cái kia thì màn hình tự
   *  mâu thuẫn - chặng chuyên ngành dưới một thẻ "Cá nhân" đang sáng - và
   *  comment ở DashboardClient ghi rõ onboarding từng là đúng một cái ghi
   *  thiếu như thế. */
  const pickTrack = (next: Track) => {
    setTrack(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("activeTrack", next);
      window.localStorage.setItem("activeDashboardTab", next);
    }
  };

  const savePace = (next: Pace) => {
    setPace(next);
    writePace(next);
  };

  const total = counts[track];
  const remaining = Math.max(0, total - done[track]);
  const weeks = weeksFor(remaining, pace.perDay, pace.daysPerWeek);
  const nextLesson = greeting?.nextLesson ?? null;
  const gaps = greeting?.topicGapSummary ?? [];

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-8">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100">{p.title}</h1>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">{p.subtitle}</p>
      </header>

      {/* Câu trả lời trước tiên: mỗi ngày 6 phút, và hôm nay là bài này. */}
      <section className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-5 dark:border-emerald-900 dark:from-emerald-950/40 dark:to-stone-900">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 shrink-0 text-orange-500" />
          <p className="text-xl font-black text-stone-900 dark:text-stone-100">{p.heroMinutes}</p>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">{p.heroBody}</p>

        <div className="mt-4 rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
          {loading ? (
            <p className="text-sm text-stone-500 dark:text-stone-400">{p.heroLoading}</p>
          ) : !nextLesson ? (
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">{p.heroNoLesson}</p>
          ) : (
            <>
              <p className="text-xs font-bold text-stone-500 dark:text-stone-400">{p.heroTodayLabel}</p>
              <p className="mt-1 text-base font-bold leading-snug text-stone-900 dark:text-stone-100">
                {getLessonShortTitle({ title: nextLesson.title })}
              </p>
              <Link
                href={`/bai-hoc/${nextLesson.slug}`}
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
              >
                {p.heroOpen} <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
      </section>

      <Card icon={<Compass className="h-4 w-4" />} title={p.stepPickTitle} hint={p.stepPickHint}>
        <div className="grid gap-3 sm:grid-cols-2">
          {(["personal", "professional"] as const).map((id) => {
            const picked = track === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => pickTrack(id)}
                aria-pressed={picked}
                className={`cursor-pointer rounded-2xl border p-4 text-left transition-all ${
                  picked
                    ? "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40"
                    : "border-stone-200 bg-white hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-base font-black text-stone-900 dark:text-stone-100">
                    {id === "personal" ? p.trackPersonalName : p.trackProfessionalName}
                  </span>
                  {picked && <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {id === "personal" ? p.trackPersonalFor : p.trackProfessionalFor}
                </p>
                <p className="mt-3 text-xs font-bold text-stone-500 dark:text-stone-400">
                  {format(p.trackLessons, { count: counts[id] })} ·{" "}
                  {format(p.trackTime, { weeks: weeksFor(counts[id], pace.perDay, pace.daysPerWeek) })}
                </p>
                <p className="mt-2 text-xs font-black text-emerald-700 dark:text-emerald-400">
                  {picked ? p.trackPicked : p.trackPick}
                </p>
              </button>
            );
          })}
        </div>
        {track === "professional" && (
          <p className="mt-3 rounded-xl border-l-2 border-amber-400 bg-amber-50 p-3 text-sm leading-relaxed text-stone-700 dark:bg-amber-950/30 dark:text-stone-300">
            {p.proNote}
          </p>
        )}
      </Card>

      <Card icon={<CalendarDays className="h-4 w-4" />} title={p.stepPaceTitle} hint={p.stepPaceHint}>
        <div className="flex flex-wrap gap-5">
          <Field label={p.paceLessonsPerDay}>
            {([1, 2] as const).map((n) => (
              <Pill key={n} active={pace.perDay === n} onClick={() => savePace({ ...pace, perDay: n })}>
                {n === 1 ? p.paceOne : p.paceTwo}
              </Pill>
            ))}
          </Field>
          <Field label={p.paceDaysPerWeek}>
            {[3, 4, 5, 6, 7].map((d) => (
              <Pill key={d} active={pace.daysPerWeek === d} onClick={() => savePace({ ...pace, daysPerWeek: d })}>
                {format(p.paceDays, { days: d })}
              </Pill>
            ))}
          </Field>
        </div>
        <div className="mt-4 rounded-xl bg-stone-50 p-3.5 dark:bg-stone-950/50">
          <p className="text-sm font-bold text-stone-800 dark:text-stone-200">
            {format(p.paceEstimate, { count: remaining, weeks })}
          </p>
          <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
            {format(p.paceMinutes, { minutes: pace.perDay * MEDIAN_LESSON_MINUTES })}
          </p>
        </div>
        <Disclosure question={p.paceWarnTitle} answer={p.paceWarnBody} />
      </Card>

      <Card icon={<ListChecks className="h-4 w-4" />} title={p.stepHowTitle}>
        <ol className="space-y-3.5">
          {[
            [p.howReadTitle, p.howReadBody],
            [p.howQuizTitle, p.howQuizBody],
            [p.howPracticeTitle, p.howPracticeBody],
          ].map(([title, body], i) => (
            <li key={title} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-stone-800 text-xs font-black text-white dark:bg-stone-700">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      {/* Trả lời cả điều họ chưa hỏi nhưng đang lo. */}
      <Card icon={<HelpCircle className="h-4 w-4" />} title={p.stepWorryTitle}>
        <div className="space-y-1">
          <Disclosure question={p.worrySkipQ} answer={p.worrySkipA} />
          <Disclosure question={p.worrySlowQ} answer={p.worrySlowA} />
          <Disclosure question={p.worryWrongQ} answer={p.worryWrongA} />
        </div>
      </Card>

      <Card icon={<CheckCircle2 className="h-4 w-4" />} title={p.stepCheckTitle}>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">{p.stepCheckBody}</p>
        <p className="mt-4 text-sm font-bold text-stone-800 dark:text-stone-200">{p.weekRhythmTitle}</p>
        <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          <li>· {format(p.weekStudy, { days: Math.max(1, pace.daysPerWeek - 1) })}</li>
          <li>· {p.weekReview}</li>
          <li>· {p.weekRest}</li>
        </ul>
      </Card>

      <Card icon={<Flame className="h-4 w-4" />} title={p.stepAdjustTitle}>
        {loading ? (
          <p className="text-sm text-stone-500 dark:text-stone-400">{p.adjustLoading}</p>
        ) : !nextLesson ? (
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">{p.adjustNoData}</p>
        ) : (
          <div className="space-y-3.5">
            <p className="text-sm font-bold text-stone-800 dark:text-stone-200">
              {format(p.adjustProgress, { done: done[track], total })}
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${total > 0 ? Math.round((done[track] / total) * 100) : 0}%` }}
              />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-800 dark:text-stone-200">{p.adjustWeakest}</p>
              {gaps.length === 0 ? (
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{p.adjustEmptyGaps}</p>
              ) : (
                <>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {gaps.map((g: { topicId: StageTopicId; count: number }) => (
                      <span
                        key={g.topicId}
                        className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300"
                      >
                        {t.topics[g.topicId]}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                    {p.adjustWeakestHint}
                  </p>
                </>
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
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
          {icon}
        </span>
        <h2 className="text-base font-black text-stone-900 dark:text-stone-100">{title}</h2>
      </div>
      {hint && <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{hint}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold text-stone-500 dark:text-stone-400">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer rounded-full px-3.5 py-2 text-sm font-bold transition-colors ${
        active
          ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
          : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"
      }`}
    >
      {children}
    </button>
  );
}

/** Câu hỏi mở ra câu trả lời. Dùng `details` của trình duyệt thay vì state:
 *  không cần JavaScript, đọc được bằng trình đọc màn hình, và câu hỏi vẫn thấy
 *  được khi đóng - nên người học biết ở đây có gì mà không phải mở ra. */
function Disclosure({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-stone-100 py-2.5 last:border-0 dark:border-stone-800">
      <summary className="cursor-pointer list-none text-sm font-bold text-stone-800 marker:content-none dark:text-stone-200">
        <span className="mr-1.5 inline-block text-stone-400 transition-transform group-open:rotate-90">›</span>
        {question}
      </summary>
      <p className="mt-2 pl-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{answer}</p>
    </details>
  );
}
