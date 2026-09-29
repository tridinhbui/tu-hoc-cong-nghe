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

  const nextLesson = greeting?.nextLesson ?? null;
  const completedCount = greeting?.completedCount ?? 0;
  const firstName = greeting?.firstName ?? null;
  const trackProgress = greeting?.trackProgress ?? null;

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
  const lessonLabel = getLessonDisplayLabel(
    { id: nextLesson.id, title: nextLesson.title, track: undefined },
    t.lessonLabel
  );
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
          ? "group relative block overflow-hidden rounded-[20px] bg-gradient-to-br from-[#fff4e6] via-[#fdebd6] to-[#f6dcc0] shadow-[0_1px_0_rgba(120,70,20,0.06),0_12px_32px_-18px_rgba(150,80,20,0.45)] transition-shadow hover:shadow-[0_1px_0_rgba(120,70,20,0.06),0_18px_40px_-18px_rgba(150,80,20,0.55)] dark:from-[#2a1d12] dark:via-[#24190f] dark:to-[#1d140c]"
          : "group relative block rounded-sm border-2 border-brand-600 bg-white transition-colors hover:border-stone-400 dark:border-brand-500 dark:bg-stone-900 dark:hover:border-stone-600"}
      >
        <div className={`flex flex-col gap-3 ${hero ? "p-6 sm:p-8 md:gap-10" : quiet ? "p-5 sm:p-6" : compact ? "p-4" : "p-4 sm:p-5"} md:flex-row md:items-center md:gap-6`}>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              {hero ? (
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-700 dark:text-orange-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" aria-hidden />
                  {t.revampDashboard.heroLabel}
                </span>
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
            <span className={`block text-xs font-semibold ${hero ? "mt-4 text-[#9a6b43] dark:text-orange-200/70" : "mt-2 text-ink-faint"}`}>{lessonLabel}</span>
            <h2 className={`mt-0.5 font-black tracking-tight leading-snug ${hero ? "text-2xl sm:text-[32px] sm:leading-tight text-[#3b2414] dark:text-orange-50" : "text-lg sm:text-2xl text-ink-max"}`}>
              {shortTitle}
            </h2>
            {nextLesson.subtitle && (
              <p className={`line-clamp-2 leading-snug ${hero ? "mt-2 text-[15px] text-[#7a5436] dark:text-orange-100/70" : "mt-1 text-sm text-ink-muted"}`}>{nextLesson.subtitle}</p>
            )}

            {/* Tử số phải cùng phạm vi với mẫu số. `completedCount` đếm bài
                đã xong ở MỌI tuyến, còn `trackProgress.total` chỉ đếm bài
                của tuyến đang học, nên đặt cạnh nhau ra những dòng như
                "412/326 bài" ngay cạnh thanh 78%. Và khi chưa có
                trackProgress thì không in con số nào. Thanh màu cyan: đây là
                tiến độ đã làm, không phải hành động. */}
            <div className={`flex items-center gap-3 ${hero ? "mt-6" : "mt-4"}`}>
              {trackProgress && (
                <span className={`text-xs font-medium whitespace-nowrap ${hero ? "text-[#9a6b43] dark:text-orange-200/70" : "text-ink-faint"}`}>
                  {format(t.resume.resumeProgress, {
                    done: trackProgress.completed,
                    total: trackProgress.total,
                  })}
                </span>
              )}
              <div className={`flex-1 max-w-xs overflow-hidden relative ${hero ? "h-2 rounded-full bg-white/70 dark:bg-white/10" : "h-1.5 rounded-xs bg-surface-sunken"}`}>
                <div
                  className={`h-full transition-all duration-700 ${hero ? "rounded-full bg-orange-500" : "bg-cyan-400 dark:bg-cyan-600"}`}
                  style={{ width: `${Math.max(2, progressPercent)}%` }}
                />
              </div>
              {!quiet && (
                <span className="text-xs font-mono font-medium tabular-nums text-ink-muted">
                  {progressPercent}%
                </span>
              )}
            </div>
          </div>

          {/* Hành động chính của cả màn hình. `pointer-events-none` vì cả thẻ
              đã là một <Link>: một <a> lồng trong <a> là HTML không hợp lệ,
              nên đây là một cái nút TRÔNG như nút, còn cú bấm vẫn do thẻ nhận. */}
          <span className={hero
            ? "pointer-events-none inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-orange-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_-10px_rgba(194,65,12,0.8)] transition-colors group-hover:bg-orange-700 md:self-center"
            : `${btnPrimary} shrink-0 self-start md:self-center px-5 py-3 group-hover:bg-brand-700 dark:group-hover:bg-brand-300 pointer-events-none`}>
            {t.resume.resumeCta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
        {hero && footnote && (
          <div className="border-t border-[#e9c9a4]/60 bg-white/35 px-6 py-3 text-xs text-[#8a5f3c] sm:px-8 dark:border-white/5 dark:bg-white/5 dark:text-orange-100/60">
            {footnote}
          </div>
        )}
      </Link>
    </div>
  );
}
