"use client";

import LearningGoalCard, { type FlowEffort } from "@/components/learning-flows/LearningGoalCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { getDashboardGreetingAction } from "@/app/(app)/dashboard/actions";
import { saveLearningPathPrefs } from "@/app/(app)/lo-trinh/actions";
import { getLessonShortTitle } from "@/lib/lesson-labels";
import { useI18n } from "@/lib/i18n/context";
import {
  DEFAULT_PACE,
  MEDIAN_LESSON_MINUTES,
  finishDate,
  readPace,
  weeksFor,
  writePace,
  type Pace,
} from "@/lib/learning-pace";
import { format, intlLocale } from "@/lib/i18n";
import type { StageTopicId } from "@/lib/stage-topics";
import { btnPrimary, textLink } from "@/components/ui/system";

type Track = "personal" | "professional";

/** Số mốc hiện ra trước; phần còn lại gộp thành một dòng "và N chặng nữa". */
const MILESTONES_SHOWN = 4;

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
  topicEntry,
  savedTrack,
  savedPace,
  flowEffort,
  milestones,
}: {
  counts: Record<Track, number>;
  done: Record<Track, number>;
  userId: string;
  topicEntry: Record<Track, Partial<Record<StageTopicId, { slug: string; title: string }>>>;
  savedTrack: Track | null;
  savedPace: Pace | null;
  /** Số bài và tổng phút của từng lối học theo nhu cầu, cho thẻ chọn mục tiêu. */
  flowEffort?: FlowEffort;
  /** Các chặng của từng hướng theo thứ tự, kèm số bài (đếm ở server bằng cùng
   *  luật với `counts`, nên tổng các chặng khớp tổng hướng). */
  milestones?: Record<Track, { total: number; done: number }[]>;
}) {
  const { t, locale } = useI18n();
  const p = t.learningPath;

  // Giá trị từ server là trạng thái ban đầu, không phải giá trị chờ effect.
  // Dựng bằng "personal" rồi để một effect sửa lại sau khi hydrate nghĩa là ai
  // đã chọn chuyên ngành vẫn thấy lộ trình cá nhân sáng lên trong một nhịp - và
  // trên kết nối chậm thì nhịp ấy đủ dài để bấm nhầm.
  const [track, setTrack] = useState<Track>(savedTrack ?? "personal");
  const [pace, setPace] = useState<Pace>(savedPace ?? DEFAULT_PACE);
  const [greeting, setGreeting] = useState<Awaited<ReturnType<typeof getDashboardGreetingAction>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<"idle" | "saved" | "failed">("idle");
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // localStorage chỉ còn là đường DỰ PHÒNG, cho tài khoản có lựa chọn từ
    // trước khi hai cột kia tồn tại. Server thắng khi cả hai cùng có: nó là thứ
    // theo được người dùng sang máy khác.
    if (savedTrack === null) {
      const local = window.localStorage.getItem("activeTrack");
      if (local === "professional" || local === "personal") setTrack(local);
    }
    if (savedPace === null) setPace(readPace());
    setToday(new Date());
  }, [savedTrack, savedPace]);

  /** Ghi lên server, và nói thật kết quả.
   *
   *  Trước đây mọi thay đổi ghi thẳng localStorage rồi im lặng. Viên nhịp đổi
   *  màu ngay dù việc ghi có thành công hay không, nên một lần lưu hỏng trông
   *  y hệt một lần lưu được - triệu chứng duy nhất là lần sau mở lại thấy nhịp
   *  cũ, mà lúc đó không còn gì để lần ra nguyên nhân. */
  const persist = (input: Parameters<typeof saveLearningPathPrefs>[0]) => {
    setSaveState("idle");
    saveLearningPathPrefs(input)
      .then((r) => setSaveState(r.ok ? "saved" : "failed"))
      .catch(() => setSaveState("failed"));
  };

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
    persist({ track: next });
  };

  const savePace = (next: Pace) => {
    setPace(next);
    writePace(next);
    persist({ perDay: next.perDay, daysPerWeek: next.daysPerWeek });
  };

  const total = counts[track];
  const remaining = Math.max(0, total - done[track]);
  const weeks = weeksFor(remaining, pace.perDay, pace.daysPerWeek);
  const nextLesson = greeting?.nextLesson ?? null;
  const gaps = greeting?.topicGapSummary ?? [];
  // Mốc "hôm nay" lấy SAU KHI mount, không phải lúc dựng.
  //
  // "use client" không có nghĩa là chỉ chạy ở client: component vẫn được dựng
  // một lần ở server để ra HTML đầu tiên. Gọi `new Date()` thẳng trong thân
  // hàm nghĩa là server dùng giờ server còn client dùng giờ máy người đọc, và
  // ở ranh giới tháng hai bên ra hai chuỗi khác nhau - React báo lệch hydrate,
  // và thứ hỏng là một dòng chữ không ai ngờ tới.
  //
  // `null` cho tới khi mount xong, nên lần dựng ở server và lần dựng đầu ở
  // client cho ra cùng một kết quả: không có dòng nào.
  const finishAt = today ? finishDate(remaining, pace, today) : null;

  const stageCopy = t.revampDashboard.stages[track] ?? [];
  const stageList = milestones?.[track] ?? [];
  const shownStages = stageList.slice(0, MILESTONES_SHOWN);
  const pct = total > 0 ? Math.round((done[track] / total) * 100) : 0;

  return (
    // pb-28 chứ không pb-8: ConnectMenu là một nút tròn `fixed bottom-6` cao
    // 56px, mount toàn app từ app/layout.tsx. Nội dung chạy sát đáy thì khối
    // cuối nằm dưới nó.
    //
    // Một cột hẹp, bốn bước đánh số theo đúng câu hỏi trong đầu người mới:
    // làm gì -> đi đường nào -> dọc đường có những mốc gì -> bài đầu tiên.
    // Phần giải thích (cách học một bài, ba nỗi lo) gập lại ở cuối: ai cần thì
    // mở, ai không cần thì không phải cuộn qua.
    <div className="mx-auto max-w-3xl px-4 pt-5 pb-28 sm:px-6">
      <header>
        <Link href="/dashboard" className={textLink}>
          <ArrowLeft className="h-4 w-4" />
          {p.backToDashboard}
        </Link>
        <h1 className="mt-4 text-3xl font-black leading-[1.1] tracking-tight text-ink-max sm:text-4xl">{p.title}</h1>
        <p className="mt-2 max-w-[56ch] text-base leading-7 text-ink-soft">{p.intro}</p>
      </header>

      <Step n={1} title={p.tocGoal}>
        <LearningGoalCard id="goal" effort={flowEffort} mission />
      </Step>

      <Step n={2} title={p.stepPickTitle} hint={p.stepPickHint} id="pick">
        <div className="grid gap-3 sm:grid-cols-2">
          {(["personal", "professional"] as const).map((id) => {
            const picked = track === id;
            const left = Math.max(0, counts[id] - done[id]);
            return (
              <button
                key={id}
                type="button"
                onClick={() => pickTrack(id)}
                aria-pressed={picked}
                className={`group cursor-pointer rounded-sm p-4 text-left transition-colors duration-200 ${
                  picked
                    ? "border border-brand-600 bg-brand-50 ring-1 ring-brand-600 dark:border-brand-400 dark:bg-brand-950/40 dark:ring-brand-400"
                    : "border border-line-strong hover:border-brand-400 dark:border-stone-800 dark:hover:border-stone-700"
                }`}
              >
                <span className="flex items-start justify-between gap-2">
                  <span className={`text-base font-black tracking-tight ${picked ? "text-brand-950 dark:text-brand-50" : "text-ink-heading"}`}>
                    {id === "personal" ? p.trackPersonalName : p.trackProfessionalName}
                  </span>
                  {picked && <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />}
                </span>
                <span className="mt-1.5 block text-sm leading-6 text-ink-soft">
                  {id === "personal" ? p.trackPersonalFor : p.trackProfessionalFor}
                </span>
                {/* Thẻ ĐANG CHỌN đếm số bài còn lại, thẻ kia đếm tổng: câu hỏi ở
                    thẻ kia là "hướng này to cỡ nào", không phải "tôi còn bao
                    nhiêu" - người đọc chưa học bài nào của nó. */}
                <span className="mt-3 block text-xs font-bold tabular-nums text-ink-muted">
                  {picked ? format(p.trackLessonsLeft, { count: left }) : format(p.trackLessons, { count: counts[id] })}
                  {" · "}
                  {format(p.trackTime, {
                    weeks: weeksFor(picked ? left : counts[id], pace.perDay, pace.daysPerWeek),
                  })}
                </span>
              </button>
            );
          })}
        </div>
        {track === "professional" && (
          <p className="mt-3 max-w-[68ch] border-l-2 border-stone-300 pl-4 text-sm leading-6 text-ink-body dark:border-stone-700">
            {p.proNote}
          </p>
        )}

        {/* Nhịp học: cùng bước với hướng đi vì cả hai cùng trả lời "bao giờ thì
            xong", và con số ước lượng nằm ngay dưới hai bộ chọn. */}
        <div id="pace" className="mt-6 scroll-mt-6">
          <h3 className="text-sm font-black text-ink-heading">{p.stepPaceTitle}</h3>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
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
          <p className="mt-4 text-sm font-bold tabular-nums text-ink-heading">
            {format(p.paceEstimate, { count: remaining, weeks })}
            {/* Ngày cụ thể cạnh con số tuần: "khoảng 28 tuần" đòi người đọc tự
                mở lịch ra cộng. Đi qua intlLocale, không viết cứng "vi-VN". */}
            {finishAt && (
              <span className="font-normal text-ink-muted">
                {" "}
                {format(p.paceFinishBy, {
                  date: finishAt.toLocaleDateString(intlLocale(locale), { month: "long", year: "numeric" }),
                })}
              </span>
            )}
          </p>
          <p className="mt-0.5 text-sm text-ink-muted">
            {format(p.paceMinutes, { minutes: pace.perDay * MEDIAN_LESSON_MINUTES })}
          </p>
          {/* Trạng thái ghi: viên nhịp đổi màu ngay khi bấm, và màu ấy chỉ nói
              "đang chọn" chứ không nói "đã lưu". */}
          {saveState !== "idle" && (
            <p role="status" className={`mt-2 text-xs font-bold ${saveState === "saved" ? "text-accent-strong" : "text-alert-strong"}`}>
              {saveState === "saved" ? p.paceSaved : p.paceSaveFailed}
            </p>
          )}
          <div className="mt-2">
            <Disclosure question={p.paceWarnTitle} answer={p.paceWarnBody} />
          </div>
        </div>
      </Step>

      {shownStages.length > 0 && (
        <Step n={3} title={p.stepMilestonesTitle} id="milestones">
          <ol className="divide-y divide-line-strong border-y border-line-strong">
            {shownStages.map((stage, i) => {
              const copy = stageCopy[i];
              return (
                <li key={i} className="flex gap-4 py-3.5">
                  <span className="w-16 shrink-0 pt-0.5 font-mono text-xs font-bold uppercase tabular-nums text-ink-muted">
                    {format(t.dashboard.stageLabel, { n: i + 1 })}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold leading-snug text-ink-max">{copy?.headline ?? t.trackStages[track]?.stages[i]?.name}</span>
                    {copy?.outcome && <span className="mt-0.5 hidden text-sm sm:block leading-6 text-ink-soft">{copy.outcome}</span>}
                  </span>
                  <span className="shrink-0 pt-0.5 text-xs font-bold tabular-nums text-ink-muted">
                    {format(p.milestoneLessons, { done: stage.done, total: stage.total })}
                  </span>
                </li>
              );
            })}
          </ol>
          {stageList.length > shownStages.length && (
            <p className="mt-2 text-sm text-ink-muted">{format(p.milestonesMore, { count: stageList.length - shownStages.length })}</p>
          )}
        </Step>
      )}

      <Step n={shownStages.length > 0 ? 4 : 3} title={p.stepFirstTitle} hint={p.heroMinutes} id="first">
        <div className="rounded-sm border border-brand-600 bg-brand-50 p-5 dark:border-brand-400 dark:bg-brand-950/40">
          {loading ? (
            <p className="text-sm text-ink-muted">{p.heroLoading}</p>
          ) : !nextLesson ? (
            <p className="text-sm leading-6 text-ink-soft">{p.heroNoLesson}</p>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-ink-muted">
                {p.heroTodayLabel}
              </p>
              <p className="mt-1.5 text-xl font-black leading-snug tracking-tight text-ink-max">
                {getLessonShortTitle({ title: nextLesson.title })}
              </p>
              <Link href={`/bai-hoc/${nextLesson.slug}`} className={`${btnPrimary} mt-4`}>
                {p.heroOpen} <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
        {/* Cùng chỗ với "bài đầu tiên" cho người đã học: tiến độ hướng này, và
            chủ đề yếu nếu có - mỗi viên dẫn tới bài CHƯA HỌC đầu tiên của chủ
            đề đó. Không có dữ liệu thì không in gì (không còn khối riêng). */}
        {!loading && nextLesson && (
          <div className="mt-4">
            <p className="text-sm font-bold tabular-nums text-ink-heading">{format(p.adjustProgress, { done: done[track], total })}</p>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={done[track]}
              aria-label={format(p.progressAria, { done: done[track], total })}
              className="mt-1.5 h-1 w-full overflow-hidden bg-surface-sunken"
            >
              <div className="h-full bg-cyan-500 motion-safe:transition-[width] motion-safe:duration-700 dark:bg-cyan-400" style={{ width: `${pct}%` }} />
            </div>
            {gaps.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-bold text-ink-heading">{p.adjustWeakest}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {gaps.map((g: { topicId: StageTopicId; count: number }) => {
                    const entry = topicEntry[track]?.[g.topicId];
                    const chip =
                      "rounded-sm border border-red-300 bg-white px-2.5 py-1 text-xs font-bold text-red-700 dark:border-red-900 dark:bg-stone-900 dark:text-red-300";
                    return entry ? (
                      <Link
                        key={g.topicId}
                        href={`/bai-hoc/${entry.slug}`}
                        title={`${p.adjustWeakestOpen}: ${entry.title}`}
                        className={`${chip} inline-flex items-center gap-1 transition-colors hover:border-red-600 dark:hover:border-red-400`}
                      >
                        {t.topics[g.topicId]}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    ) : (
                      <span key={g.topicId} className={chip}>
                        {t.topics[g.topicId]}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        <Link href="/lo-trinh/huong-dan" className={`mt-4 ${textLink}`}>
          {p.guideTitle} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Step>

      {/* Phần giải thích: gập lại. `details` của trình duyệt - không cần JS, và
          nội dung vẫn nằm trong HTML nên trình đọc màn hình và tìm kiếm thấy. */}
      <details className="group mt-10 border-t border-line-strong pt-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-ink-heading marker:content-none">
          {p.moreTitle}
          <ChevronDown className="h-4 w-4 text-ink-muted transition-transform group-open:rotate-180" aria-hidden />
        </summary>
        <div className="mt-5 space-y-8">
          <div id="how" className="scroll-mt-6">
            <h3 className="text-sm font-black text-ink-heading">{p.stepHowTitle}</h3>
            <ol className="mt-3 space-y-3">
              {[
                [p.howReadTitle, p.howReadBody],
                [p.howQuizTitle, p.howQuizBody],
                [p.howPracticeTitle, p.howPracticeBody],
              ].map(([title, body], i) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-0.5 w-6 shrink-0 font-mono text-xs font-medium tabular-nums text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-sm font-bold text-ink">{title}</p>
                    <p className="mt-0.5 max-w-[68ch] text-sm leading-6 text-ink-soft">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div id="worry" className="scroll-mt-6">
            <h3 className="text-sm font-black text-ink-heading">{p.stepWorryTitle}</h3>
            <div className="mt-2 space-y-1">
              <Disclosure question={p.worrySkipQ} answer={p.worrySkipA} />
              <Disclosure question={p.worrySlowQ} answer={p.worrySlowA} />
              <Disclosure question={p.worryWrongQ} answer={p.worryWrongA} />
            </div>
          </div>
          <div id="check" className="scroll-mt-6">
            <h3 className="text-sm font-black text-ink-heading">{p.stepCheckTitle}</h3>
            <p className="mt-2 max-w-[68ch] text-sm leading-6 text-ink-soft">{p.stepCheckBody}</p>
          </div>
        </div>
      </details>
    </div>
  );
}

/** Một bước của trang: số mono + tiêu đề lớn, ngăn bằng đường kẻ trên và
 *  khoảng trắng - không bọc khung, để thứ bậc đến từ chữ chứ không từ viền. */
function Step({
  n,
  title,
  hint,
  id,
  children,
}: {
  n: number;
  title: string;
  hint?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-6 border-t border-line-strong pt-6 first-of-type:mt-8">
      <h2 className="flex items-baseline gap-3 text-xl font-black tracking-tight text-ink-max sm:text-2xl">
        <span className="font-mono text-sm font-bold tabular-nums text-accent">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      {hint && <p className="mt-1.5 max-w-[60ch] text-sm leading-6 text-ink-soft">{hint}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold text-ink-muted">{label}</p>
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
      className={`cursor-pointer rounded-sm border px-3 py-1.5 text-sm font-bold transition-colors ${
        active
          ? "border-brand-600 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-200"
          : "border-line-strong text-ink-muted hover:border-line-strong hover:text-ink-body dark:border-stone-800 dark:hover:border-stone-700"
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
    <details className="group border-b border-stone-200 py-2 last:border-0 dark:border-stone-800">
      <summary className="cursor-pointer list-none text-sm font-bold text-stone-800 marker:content-none dark:text-stone-200">
        <span className="mr-1.5 inline-block text-stone-500 transition-transform group-open:rotate-90">›</span>
        {question}
      </summary>
      <p className="mt-2 max-w-[68ch] pl-4 text-sm leading-6 text-ink-soft">{answer}</p>
    </details>
  );
}
