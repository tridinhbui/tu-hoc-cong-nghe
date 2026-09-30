"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import CoCoSays, { useCoCoGreeting } from "@/components/CoCoSays";
import { getDashboardGreetingAction } from "@/app/(app)/dashboard/actions";
import { trackFeatureClick } from "@/lib/feature-events";
import { getLessonDisplayLabel, getLessonShortTitle } from "@/lib/lesson-labels";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL, isLessonInRange } from "@/lib/track-stages";
import type { RecallItem } from "@/lib/recall-schedule";
import type { StageTopicId, TopicAdviceId } from "@/lib/stage-topics";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/current-user";
import { XP_PER_LESSON } from "@/lib/levels";
import { StatusDot, Sys, btnPrimary, panel } from "@/components/ui/system";
import { getLearningGoalState, type LearningGoalState } from "@/app/actions/learning-goal";
import { LEARNING_GOAL_CHANGED } from "@/lib/learning-goal-events";

interface ResumeLearningButtonProps {
  activeTrack: "personal" | "professional";
  compact?: boolean;
  /** Id của người học, do trang gọi truyền xuống.
   *
   *  Đo được trước khi thêm: câu trả lời quan trọng nhất của trang tổng quan
   *  ("học gì tiếp") tới SAU CÙNG, vì nó nối thêm một chặng vào cuối một chuỗi
   *  đã dài - chờ phiên → hai RPC → render → thẻ này gắn → `getCurrentUser()`
   *  → server action lấy lời chúc. Chặng `getCurrentUser()` là chặng duy nhất
   *  bỏ được mà không đổi dữ liệu: DashboardClient đã có `user.id` trong tay
   *  từ lúc phiên resolve. Vẫn giữ nhánh tự đọc để thẻ còn dùng được ở chỗ
   *  không có sẵn id. */
  userId?: string | null;
  /** Cơ Cơ nói lời chào ngay trên thẻ. Tắt ở /hoc-bai, nơi Cơ Cơ đã đứng đầu
   *  trang với lời riêng của trang đó - hai con linh vật cách nhau một thẻ là
   *  một con thừa. */
  showCoCo?: boolean;
  /** Bản tập trung của dashboard: Cơ Cơ một dòng, bỏ dòng meta "+XP · chặng"
   *  và con số phần trăm lặp với thanh tiến độ. Thẻ vẫn là thứ nổi nhất trang -
   *  viền xanh, tiêu đề to, nút chính giữ nguyên. Mặc định tắt. */
  quiet?: boolean;
  /** Thẻ chính của dashboard: nền ấm cam đất, bo mềm, không viền đậm. Kèm
   *  `footnote` là một dòng nhỏ (chặng đang làm) nằm TRONG thẻ thay vì lơ
   *  lửng bên dưới. Chỉ dashboard bật; /hoc-bai giữ bản thường. */
  hero?: boolean;
  footnote?: ReactNode;
}

interface Greeting {
  nextLesson: { id: number; slug: string; title: string; subtitle: string; duration: string } | null;
  nextLessonCriteria: { readPercent: number; quizTotal: number } | null;
  todayRecallItems: RecallItem[];
  completedCount: number;
  totalMinutes: number;
  firstName: string | null;
  trackProgress: { completed: number; total: number; percent: number };
  topicGapSummary: { topicId: StageTopicId; count: number }[];
  criticalMistake: {
    lessonId: number;
    lessonSlug: string;
    lessonTitle: string;
    topicId: StageTopicId;
    wrongCount: number;
    explanation: string | null;
    adviceId: TopicAdviceId;
  } | null;
  stageReviewInsight: {
    lessonId: number;
    lessonSlug: string;
    lessonTitle: string;
    stageLabel: string;
  } | null;
}

export default function ResumeLearningButton({ activeTrack, compact = false, userId, showCoCo = true, quiet = false, hero = false, footnote }: ResumeLearningButtonProps) {
  const { t } = useI18n();
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const [loading, setLoading] = useState(true);
  // Gọi ở đầu, trước mọi nhánh return: đây là một hook. Tên chưa có thì lời
  // chào vẫn đúng, chỉ không kèm tên - và tự cập nhật khi greeting về.
  const cocoLead = useCoCoGreeting(greeting?.firstName ?? null);

  // Thẻ hero đi theo MỤC TIÊU HỌC khi người học đã chọn một (câu "Bạn học để
  // làm gì?" hoặc thẻ Lộ trình): bài kế tiếp của hành trình đó, đếm "Bài 1/13"
  // thay cho "0/268 bài". Người chọn "dùng AI cho văn phòng" mà thẻ to nhất
  // vẫn chỉ vào bài dòng lệnh là lý do đầu tiên họ bỏ đi.
  const [goalState, setGoalState] = useState<LearningGoalState | null>(null);
  useEffect(() => {
    if (!hero) return;
    let alive = true;
    const load = () => {
      getLearningGoalState()
        .then((s) => alive && setGoalState(s))
        .catch(() => {});
    };
    load();
    window.addEventListener(LEARNING_GOAL_CHANGED, load);
    return () => {
      alive = false;
      window.removeEventListener(LEARNING_GOAL_CHANGED, load);
    };
  }, [hero]);

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const id = userId ?? (await getCurrentUser())?.id ?? null;
        if (id) {
          const result = await getDashboardGreetingAction(id, activeTrack);
          setGreeting(result);
        }
      } catch (error) {
        console.error("Error fetching dashboard greeting:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGreeting();
  }, [activeTrack, userId]);

  if (loading) {
    return (
      <div className={`${panel} p-5 flex items-center gap-4 animate-pulse`}>
        <div className="w-11 h-11 rounded-sm bg-surface-sunken" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-surface-sunken rounded-xs w-1/3" />
          <div className="h-5 bg-surface-sunken rounded-xs w-3/4" />
        </div>
      </div>
    );
  }

  const goalProgress = hero && goalState?.goal ? goalState.progress[goalState.goal] : null;
  const flowNext = goalProgress?.next ?? null;
  const nextLesson = flowNext
    ? { id: -1, slug: flowNext.slug, title: flowNext.title, subtitle: "", duration: "" }
    : greeting?.nextLesson ?? null;
  const completedCount = greeting?.completedCount ?? 0;
  const firstName = greeting?.firstName ?? null;
  const trackProgress = flowNext && goalProgress
    ? { completed: goalProgress.done, total: goalProgress.total, percent: 0 }
    : greeting?.trackProgress ?? null;

  const trackStages = activeTrack === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages;
  const stageIdx = nextLesson ? trackStages.findIndex((stage) => isLessonInRange(nextLesson.id, stage)) : -1;
  const stageTag = stageIdx >= 0 ? t.revampDashboard.stages[activeTrack]?.[stageIdx]?.tag ?? null : null;

  // Cơ Cơ là thứ ĐẦU TIÊN nói với người học khi mở app: lời chào theo giờ,
  // rồi đúng một câu về việc hôm nay. Nó thay cho dòng "Nhiệm vụ đang học"
  // cứng trước đây - cùng thông tin, nhưng có người nói.
  if (!nextLesson) {
    return (
      <div className="space-y-3">
        {showCoCo && <CoCoSays lead={cocoLead} lines={t.coco.dashboardDone} size={quiet ? 26 : compact ? 36 : 40} quiet={quiet} />}
        <div className="rounded-sm border border-line bg-white p-4 dark:bg-stone-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 rounded-sm bg-surface-raised text-cyan-600 flex items-center justify-center dark:text-cyan-400">
              <CheckCircle2 className="w-5 h-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="font-black tracking-tight text-base text-ink-max">{format(t.resume.congrats, { name: firstName ? `, ${firstName}` : "" })}</p>
              <p className="text-sm text-ink-muted">{t.resume.allDone}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = trackProgress && trackProgress.total > 0
    ? Math.round((trackProgress.completed / trackProgress.total) * 100)
    : 0;

  // Nhãn chặng/bài đọc từ TIÊU ĐỀ, qua đúng hàm mà trang bài học và trang ôn
  // tập dùng. Bản trước tự dựng lấy hai con số và cả hai đều sai:
  //
  //   - số chặng bắt bằng `stageName.match(/\d+/)`, tức con số đầu tiên trong
  //     TÊN chặng ("Nền tảng lập trình" không có số nào) rồi rơi về "1";
  //   - số bài lấy thẳng `nextLesson.id`, là số thứ tự trong dữ liệu.
  //
  // Người học báo đúng hậu quả: bài mang tiêu đề "Chặng 12, Bài 2" hiện ra
  // "Chặng 1 • Bài 301" ở thẻ Học tiếp, trong khi mọi màn hình khác gọi
  // getLessonDisplayLabel nên vẫn ghi "Chặng 12 · Bài 2". Hai con số ấy không
  // có cách nào khớp được, vì id không phải thứ tự học.
  const lessonLabel = flowNext && goalProgress && goalState?.goal
    ? format(t.revampDashboard.flowLessonLabel, {
        n: goalProgress.done + 1,
        total: goalProgress.total,
        flow: t.learningFlows.flows[goalState.goal].title,
      })
    : getLessonDisplayLabel({ id: nextLesson.id, title: nextLesson.title, track: undefined }, t.lessonLabel);
  const shortTitle = getLessonShortTitle({ title: nextLesson.title });

  return (
    <div className={`flex flex-col h-full font-sans ${quiet ? "gap-2.5" : "gap-3"}`}>
      {showCoCo && (
        <CoCoSays
          lead={cocoLead}
          lines={completedCount === 0 ? t.coco.dashboardFirst : t.coco.dashboardNext}
          vars={{ lesson: shortTitle }}
          size={quiet ? 26 : compact ? 36 : 40}
          quiet={quiet}
        />
      )}

      {/* Ảnh minh hoạ ngọn núi từng chiếm nửa phải thẻ này (352px) - ảnh không
          nói gì về bài học, và cái giá của nó là tiêu đề bài bị ép hẹp ở
          1024-1279px. Chỗ đó giờ là của bài học và nút hành động. */}
      <Link
        href={`/bai-hoc/${nextLesson.slug}`}
        onClick={() => trackFeatureClick("resume_learning_click", { label: nextLesson.slug })}
        className={hero
          ? "group relative block overflow-hidden rounded-[20px] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white shadow-[0_18px_40px_-22px_rgba(22,60,130,0.9)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-22px_rgba(22,60,130,0.95)] dark:from-brand-800 dark:via-brand-900 dark:to-stone-950"
          : "group relative block rounded-sm border border-line bg-white transition-colors hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-600"}
      >
        {hero && (
          // Hai vệt sáng mờ: đủ để thẻ có chiều sâu, không đủ để thành hoạ tiết.
          <>
            <span aria-hidden className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-cyan-300/25 blur-3xl" />
            <span aria-hidden className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-brand-300/20 blur-3xl" />
          </>
        )}
        <div className={`relative flex flex-col gap-3 ${hero ? "p-6 sm:p-8 md:gap-10" : quiet ? "p-5 sm:p-6" : compact ? "p-4" : "p-4 sm:p-5"} md:flex-row md:items-center md:gap-6`}>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              {hero ? (
                <>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white ring-1 ring-white/20">
                    <span className="relative flex h-2 w-2" aria-hidden>
                      <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                    </span>
                    {t.revampDashboard.heroLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-300/20 px-2.5 py-1 font-mono text-[11px] font-bold tabular-nums text-amber-200 ring-1 ring-amber-200/30">
                    {format(t.resume.resumeXpBadge, { xp: XP_PER_LESSON })}
                  </span>
                </>
              ) : (
                <Sys className="inline-flex items-center gap-1.5 text-accent-strong">
                  <StatusDot />
                  {t.revampDashboard.todayLabel}
                </Sys>
              )}
              {!quiet && (
                <span className="font-mono text-[10.5px] font-medium tabular-nums text-ink-faint">
                  {stageTag
                    ? format(t.revampDashboard.todayMeta, { xp: XP_PER_LESSON, stage: stageTag })
                    : format(t.resume.resumeXpBadge, { xp: XP_PER_LESSON })}
                </span>
              )}
            </div>
            <span className={`block text-xs font-semibold ${hero ? "mt-5 text-brand-100" : "mt-2 text-ink-faint"}`}>{lessonLabel}</span>
            <h2 className={`mt-0.5 font-black tracking-tight leading-snug ${hero ? "text-2xl sm:text-[34px] sm:leading-tight text-white" : "text-lg sm:text-2xl text-ink-max"}`}>
              {shortTitle}
            </h2>
            {nextLesson.subtitle && (
              <p className={`line-clamp-2 leading-snug ${hero ? "mt-2 max-w-2xl text-[15px] text-brand-50/90" : "mt-1 text-sm text-ink-muted"}`}>{nextLesson.subtitle}</p>
            )}

            {/* Tử số phải cùng phạm vi với mẫu số. `completedCount` đếm bài
                đã xong ở MỌI tuyến, còn `trackProgress.total` chỉ đếm bài
                của tuyến đang học, nên đặt cạnh nhau ra những dòng như
                "412/326 bài" ngay cạnh thanh 78%. Và khi chưa có
                trackProgress thì không in con số nào. Thanh màu cyan: đây là
                tiến độ đã làm, không phải hành động. */}
            <div className={`flex items-center gap-3 ${hero ? "mt-6" : "mt-4"}`}>
              {trackProgress && (
                <span className={`text-xs font-medium whitespace-nowrap ${hero ? "font-semibold text-brand-50" : "text-ink-faint"}`}>
                  {format(t.resume.resumeProgress, {
                    done: trackProgress.completed,
                    total: trackProgress.total,
                  })}
                </span>
              )}
              <div className={`flex-1 max-w-xs overflow-hidden relative ${hero ? "h-2.5 max-w-sm rounded-full bg-white/20" : "h-1.5 rounded-xs bg-surface-sunken"}`}>
                <div
                  className={`h-full motion-safe:transition-[width] motion-safe:duration-700 ${hero ? "rounded-full bg-gradient-to-r from-cyan-300 to-white shadow-[0_0_12px_rgba(103,232,249,0.7)]" : "bg-cyan-400 dark:bg-cyan-600"}`}
                  style={{ width: `${Math.max(2, progressPercent)}%` }}
                />
              </div>
              {(hero || !quiet) && (
                <span className={`text-xs font-mono tabular-nums ${hero ? "font-bold text-white" : "font-medium text-ink-muted"}`}>
                  {progressPercent}%
                </span>
              )}
            </div>
          </div>

          {/* Hành động chính của cả màn hình. `pointer-events-none` vì cả thẻ
              đã là một <Link>: một <a> lồng trong <a> là HTML không hợp lệ,
              nên đây là một cái nút TRÔNG như nút, còn cú bấm vẫn do thẻ nhận. */}
          <span className={hero
            ? "pointer-events-none inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-7 py-3.5 text-[15px] font-black text-brand-700 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.45)] transition-transform group-hover:scale-[1.03] md:self-center"
            : `${btnPrimary} shrink-0 self-start md:self-center px-5 py-3 group-hover:bg-brand-700 dark:group-hover:bg-brand-300 pointer-events-none`}>
            {t.resume.resumeCta}
            <ArrowRight className="w-4 h-4 motion-safe:transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
        {hero && footnote && !flowNext && (
          <div className="relative border-t border-white/10 bg-black/10 px-6 py-3 text-xs font-medium text-brand-100 sm:px-8">
            {footnote}
          </div>
        )}
      </Link>
    </div>
  );
}
