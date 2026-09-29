"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
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
import { StatusDot, btnPrimary, panel } from "@/components/ui/system";

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

export default function ResumeLearningButton({ activeTrack, compact = false, userId }: ResumeLearningButtonProps) {
  const { t } = useI18n();
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const [loading, setLoading] = useState(true);

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
      <div className={`${panel} p-6 flex items-center gap-4 animate-pulse`}>
      <div className="w-12 h-12 rounded-sm bg-surface-sunken" />
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
  const stageName = stageIdx >= 0 ? t.trackStages[activeTrack]?.stages[stageIdx]?.name ?? trackStages[stageIdx].name : null;

  if (!nextLesson) {
    return (
      <div className="rounded-md border border-stone-950 bg-stone-950 p-6 text-white dark:border-stone-700">
        <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-sm border border-white/15 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-black tracking-tight text-lg">{format(t.resume.congrats, { name: firstName ? `, ${firstName}` : "" })}</p>
            <p className="text-sm text-stone-300">{t.resume.allDone}</p>
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

  return (
    <div className="flex flex-col h-full justify-between font-sans">
      <Link
        href={`/bai-hoc/${nextLesson.slug}`}
        onClick={() => trackFeatureClick("resume_learning_click", { label: nextLesson.slug })}
        className="group relative overflow-hidden block rounded-md border border-line-strong bg-white dark:bg-stone-900 transition-colors hover:border-stone-950 dark:hover:border-stone-300 min-h-[175px]"
      >
        {/* Ô biểu tượng trung tính ở góc trên trái */}
        <div className="absolute top-5 left-5 z-20 hidden sm:flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-sm border border-line-strong bg-surface-raised text-ink-body flex items-center justify-center dark:border-stone-700 dark:bg-stone-950">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-stretch justify-between p-5 sm:p-6 sm:pl-20 gap-4">
          {/* Left Content */}
          <div className="min-w-0 flex-1 space-y-2.5 flex flex-col justify-between">
            {/* Top Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="eyebrow inline-flex items-center gap-1.5 text-ink-soft">
                <StatusDot />
                {t.resume.resumeBadge}
              </span>
              <span className="inline-flex items-center rounded-sm border border-line-strong px-2 py-0.5 font-mono text-[10.5px] font-medium tabular-nums text-ink-muted dark:border-stone-700">
                {format(t.resume.resumeXpBadge, { xp: XP_PER_LESSON })}
              </span>
            </div>

            {/* Main Title (2 lines) */}
            <div>
              <span className="text-xs font-bold text-ink-muted block">
                {lessonLabel}
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-ink-max tracking-tight leading-snug transition-colors mt-0.5">
                {getLessonShortTitle({ title: nextLesson.title })}
              </h2>
            </div>

            {/* Hành động chính của cả màn hình.
                Thẻ này trước đây không có nút và không có động từ nào, nên nút
                tô đậm mạnh nhất phía trên màn hình là nút "Làm ngay" của dòng
                nhiệm vụ daily_1 - trang trả lời "nhận thưởng ở đâu" trước khi
                trả lời "học gì tiếp". `pointer-events-none` vì cả thẻ đã là
                một <Link>: một <a> lồng trong <a> là HTML không hợp lệ, nên
                đây là một cái nút TRÔNG như nút, còn cú bấm vẫn do thẻ nhận. */}
            <div className="pt-0.5">
              <span className={`${btnPrimary} group-hover:bg-brand-700 dark:group-hover:bg-brand-300 pointer-events-none`}>
                {t.resume.resumeCta}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Bottom Progress Bar & Lesson Count */}
            <div className="pt-1 flex items-center gap-3">
              {/* Tử số phải cùng phạm vi với mẫu số. `completedCount` đếm bài
                  đã xong ở MỌI tuyến, còn `trackProgress.total` chỉ đếm bài
                  của tuyến đang học, nên đặt cạnh nhau ra những dòng như
                  "412/326 bài" ngay cạnh thanh 78%. Và khi chưa có
                  trackProgress thì không in con số nào: mặc định 524 cũ là
                  tổng số bài của nhiều tháng trước, giờ kho đã hơn 1.600. */}
              {trackProgress && (
                <span className="text-xs font-bold text-ink-muted whitespace-nowrap">
                  {format(t.resume.resumeProgress, {
                    done: trackProgress.completed,
                    total: trackProgress.total,
                  })}
                </span>
              )}
              <div className="flex-1 max-w-xs h-1.5 rounded-xs bg-surface-sunken overflow-hidden relative">
                <div
                  className="h-full bg-brand-600 dark:bg-brand-500 transition-all duration-700"
                  style={{ width: `${Math.max(2, progressPercent)}%` }}
                />
              </div>
              <span className="text-xs font-mono font-medium tabular-nums text-ink-max">
                {progressPercent}%
              </span>
            </div>
          </div>

          {/* Bên phải: tranh minh hoạ */}
          {/* Bề rộng ảnh ở khoảng 1024-1279px: PHÉP TÍNH CỦA CHÍNH THẺ NÀY
              không đóng được. Cột trái là `lg:col-span-7` của khung 720px
              (~412px), trừ `sm:pl-20` + `pr-6` còn ~308px chỗ cho nội dung,
              trong khi khối ảnh là `md:w-88 shrink-0` = 352px. Cột chữ
              (`flex-1 min-w-0`) co về gần 0 và tiêu đề bài bị `overflow-hidden`
              của thẻ cắt mất. Không có bề rộng ảnh nào ở dải đó vừa đủ cho chữ
              vừa đủ để ảnh còn ra hình, nên ảnh ẩn hẳn từ `lg` tới `xl` và
              quay lại ở `xl`, nơi cột trái là `col-span-8` (~814px). */}
          <div className="relative w-full md:w-88 lg:hidden xl:block xl:w-88 h-38 shrink-0 rounded-sm overflow-hidden select-none border border-line-strong bg-surface">
            <Image
              src="/images/dashboard/hero_mountain.jpg"
              alt={t.dashCards.resumeHeroAlt}
              fill
              /* Không có `sizes` thì Next phục vụ biến thể rộng nhất - 1,03MB
                 cho một hộp rộng nhất 352px. */
              sizes="(min-width: 1280px) 352px, (min-width: 768px) 352px, 100vw"
              className="object-cover object-right-top"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
