"use server";

import { getResumeLesson } from "@/lib/resume-learning";
import { getDb } from "@/lib/d1/server";
import { getLessonsMeta, getLessonById } from "@/lib/lessons-loader";
import { isLessonIdInTrack, isLessonInRange, TRACK_PERSONAL, TRACK_PROFESSIONAL } from "@/lib/track-stages";
import { stageTopicFor, TOPIC_ADVICE, type StageTopicId, type TopicAdviceId } from "@/lib/stage-topics";
import { getLessonRecallDay } from "@/lib/lesson-labels";
import { RECALL_SCHEDULE, type RecallItem } from "@/lib/recall-schedule";
import type { LessonMeta } from "@/lib/lesson-types";

// Server action, nên KHÔNG trả câu chữ - trả id để client tra trong từ điển.
//
// AGENTS.md ghi hai lối cho chuyện này: route đọc locale, hoặc route trả id
// cho client tự tra. Ở đây id là lối đúng vì chủ đề không chỉ để hiện lên:
// topicCounts dùng nó làm KHÓA cộng dồn, và TOPIC_ADVICE dùng nó để chọn câu
// khuyên. Một khóa mà đổi theo ngôn ngữ thì hai người học cùng một điểm yếu sẽ
// cộng vào hai ô khác nhau.
interface TopicGapSummary {
  topicId: StageTopicId;
  count: number;
}

interface CriticalMistakeInsight {
  lessonId: number;
  lessonSlug: string;
  lessonTitle: string;
  topicId: StageTopicId;
  wrongCount: number;
  // null khi câu quiz không có explanation; client hiện câu dự phòng của mình.
  explanation: string | null;
  adviceId: TopicAdviceId;
}

interface StageReviewInsight {
  lessonId: number;
  lessonSlug: string;
  lessonTitle: string;
  stageLabel: string;
}

function isStageReviewLesson(lesson: LessonMeta): boolean {
  return /tổng ôn chặng|ôn tập chặng|tổng ôn|ôn tập/i.test(lesson.title);
}

function getStageReviewInsight(
  allLessons: LessonMeta[],
  completedLessons: number[],
  track: "personal" | "professional"
): StageReviewInsight | null {
  const trackStages = track === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages;
  const completedSet = new Set(completedLessons);

  for (let i = trackStages.length - 1; i >= 0; i -= 1) {
    const stage = trackStages[i];
    const stageLessons = allLessons
      .filter((lesson) => lesson.isVisible !== false && isLessonInRange(lesson.id, stage) && isLessonIdInTrack(lesson.id, track))
      .sort((a, b) => a.id - b.id);

    const reviewLesson = stageLessons.find(isStageReviewLesson);
    if (!reviewLesson || completedSet.has(reviewLesson.id)) continue;

    const nonReviewLessons = stageLessons.filter((lesson) => lesson.id !== reviewLesson.id);
    if (nonReviewLessons.length === 0) continue;

    const completedBeforeReview = nonReviewLessons.filter((lesson) => completedSet.has(lesson.id)).length;
    const progressRatio = completedBeforeReview / nonReviewLessons.length;
    if (progressRatio < 0.7) continue;

    return {
      lessonId: reviewLesson.id,
      lessonSlug: reviewLesson.slug,
      lessonTitle: reviewLesson.title,
      stageLabel: stage.label,
    };
  }

  return null;
}

async function getCompletedLessonIds(userId: string): Promise<number[]> {
  const db = getDb();
  const { results } = await db
    .prepare(`select lesson_id from user_progress where user_id = ? and completed = 1`)
    .bind(userId)
    .all<{ lesson_id: number }>();
  return (results ?? []).map((row) => row.lesson_id);
}

async function getTotalTimeSpentMinutes(userId: string): Promise<number> {
  const db = getDb();
  const row = await db
    .prepare(`select coalesce(sum(time_spent_seconds), 0) as total from user_progress where user_id = ?`)
    .bind(userId)
    .first<{ total: number }>();
  return Math.round((row?.total ?? 0) / 60);
}

// Wraps lib/resume-learning.ts as a Server Action. That module reads the
// full lesson dataset (lib/lessons.ts, ~1.3MB of lesson content) via
// getLessonsMeta() - it must run server-side. Before this,
// ResumeLearningButton.tsx (a client component) imported getResumeLesson
// directly and called it in a useEffect, which pulled the entire lessons
// array into the client bundle (verified via a production build: a
// separate ~1.3MB chunk containing every lesson's content, shipped on every
// /dashboard load). A Server Action keeps that data server-only and returns
// only the small resolved lesson object to the client.
export async function getResumeLessonAction(userId: string, track: "personal" | "professional") {
  return getResumeLesson(userId, track);
}

// Feeds the Tài Tài greeting card on the dashboard: the next lesson to
// continue plus enough context (total minutes learned so far, whether any
// lesson has been completed at all) for the greeting text to actually
// reflect the learner's real progress instead of being a generic label.
export async function getDashboardGreetingAction(userId: string, track: "personal" | "professional") {
  const db = getDb();
  const [nextLesson, completedLessons, totalMinutes, profileRow, allLessons, mistakeRows] = await Promise.all([
    getResumeLesson(userId, track),
    getCompletedLessonIds(userId),
    getTotalTimeSpentMinutes(userId),
    db.prepare(`select full_name, email from user_profiles where id = ?`).bind(userId).first<{ full_name: string | null; email: string | null }>(),
    getLessonsMeta(),
    db
      .prepare(
        `select lesson_id, question_index, wrong_count, last_attempt_at
           from quiz_mistakes
          where user_id = ? and coalesce(resolved, 0) = 0
          order by wrong_count desc, last_attempt_at desc
          limit 30`
      )
      .bind(userId)
      .all<{ lesson_id: number; question_index: number; wrong_count: number; last_attempt_at: string }>(),
  ]);

  const firstName =
    profileRow?.full_name?.trim().split(/\s+/).pop() || // Vietnamese names: given name is last
    profileRow?.email?.split("@")[0] ||
    null;

  // Track-scoped completion, for the "Chặng X · Y% track" progress bar on
  // the resume card - completedLessons above spans every track, so it has
  // to be filtered down to just this one before it means anything as a %.
  const trackLessonIds = allLessons.filter((l) => isLessonIdInTrack(l.id, track)).map((l) => l.id);
  const completedInTrack = trackLessonIds.filter((id) => completedLessons.includes(id)).length;
  const trackProgressPercent = trackLessonIds.length > 0 ? Math.round((completedInTrack / trackLessonIds.length) * 100) : 0;

  // Enough to tell the learner exactly what's left on the in-progress lesson
  // (scroll % + quiz answered count) right on the dashboard card, instead of
  // them having to open the lesson to see the checklist. Quiz count comes
  // from the full lesson record (server-only - lib/lessons.ts is ~1.3MB and
  // must never reach a client bundle, see the note above on this file).
  let nextLessonCriteria: { readPercent: number; quizTotal: number } | null = null;
  if (nextLesson) {
    const [readingRow, fullLesson] = await Promise.all([
      db
        .prepare(`select max_percent_reached from reading_progress where user_id = ? and lesson_id = ?`)
        .bind(userId, nextLesson.id)
        .first<{ max_percent_reached: number | null }>(),
      getLessonById(nextLesson.id),
    ]);
    nextLessonCriteria = {
      readPercent: Math.round(readingRow?.max_percent_reached ?? 0),
      quizTotal: fullLesson?.quiz?.length ?? 0,
    };
  }

  // "Ôn tập hôm nay": the recall system (lib/recall-schedule.ts) ties review
  // items to a specific lesson's position in the sequence (surfaced inline
  // via RecallCard when that lesson is opened), not to a calendar date - so
  // there's no independent "due today" list to query. The closest honest
  // equivalent is the recall items already attached to the learner's next
  // lesson: material from lessons ~5-12 back that they're about to be
  // quizzed on anyway. Surfacing it on the dashboard lets them warm up
  // before clicking in, instead of only discovering it once they're already
  // on the page.
  const todayRecallItems: RecallItem[] = nextLesson
    ? RECALL_SCHEDULE[getLessonRecallDay(nextLesson) ?? -1] ?? []
    : [];

  const visibleTrackLessons = allLessons.filter((lesson) => lesson.isVisible !== false && isLessonIdInTrack(lesson.id, track));
  const topicCounts = new Map<StageTopicId, number>();
  let criticalMistake: CriticalMistakeInsight | null = null;

  for (const row of mistakeRows.results ?? []) {
    const lesson = visibleTrackLessons.find((item) => item.id === row.lesson_id);
    if (!lesson) continue;
    const topicId = stageTopicFor(lesson.id, track);
    topicCounts.set(topicId, (topicCounts.get(topicId) ?? 0) + Number(row.wrong_count));

    if (!criticalMistake) {
      const lessonDetail = await getLessonById(lesson.id);
      const question = lessonDetail?.quiz?.[row.question_index];
      criticalMistake = {
        lessonId: lesson.id,
        lessonSlug: lesson.slug,
        lessonTitle: lesson.title,
        topicId,
        wrongCount: Number(row.wrong_count),
        explanation: question?.explanation ?? null,
        adviceId: TOPIC_ADVICE[topicId],
      };
    }
  }

  const topicGapSummary: TopicGapSummary[] = Array.from(topicCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([topicId, count]) => ({ topicId, count }));

  const stageReviewInsight = getStageReviewInsight(allLessons, completedLessons, track);

  return {
    nextLesson,
    nextLessonCriteria,
    todayRecallItems,
    completedCount: completedLessons.length,
    totalMinutes,
    firstName,
    trackProgress: {
      completed: completedInTrack,
      total: trackLessonIds.length,
      percent: trackProgressPercent,
    },
    topicGapSummary,
    criticalMistake,
    stageReviewInsight,
  };
}
