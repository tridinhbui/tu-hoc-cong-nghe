import "server-only";

import { createAdminClient } from "@/lib/supabase-admin";
import { getLevelByXp } from "@/lib/levels";
import { getLessonsMeta, type LessonMeta } from "@/lib/lessons-loader";
import {
  TRACK_PERSONAL,
  TRACK_PROFESSIONAL,
  isLessonIdInTrack,
  isLessonInRange,
  orderLessonsForTrack,
} from "@/lib/track-stages";

type SupportedTrack = "personal" | "professional";

interface PublicProfileRow {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  current_level: number;
  total_xp: number;
  lessons_completed: number;
  avg_quiz_score: number;
  preferred_track: string;
  created_at: string;
  is_disabled?: boolean;
}

interface CompletedLessonRow {
  lesson_id: number;
  completed_at: string | null;
  quiz_score: number | null;
  time_spent_seconds: number | null;
}

export interface PublicRecentLesson {
  id: number;
  slug: string;
  title: string;
  completedAt: string | null;
  quizScore: number | null;
}

export interface PublicStageProgress {
  label: string;
  name: string;
  completed: number;
  total: number;
  percent: number;
}

export interface PublicTrackProgress {
  track: SupportedTrack;
  title: string;
  subtitle: string;
  completed: number;
  total: number;
  percent: number;
  stages: PublicStageProgress[];
}

export interface PublicUserProfileData {
  id: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  joinedAt: string;
  levelNumber: number;
  levelName: string;
  xp: number;
  lessonsCompleted: number;
  averageQuizScore: number;
  totalStudyMinutes: number;
  currentStreak: number;
  longestStreak: number;
  preferredTrack: SupportedTrack;
  trackProgress: PublicTrackProgress[];
  recentLessons: PublicRecentLesson[];
}

function normalizeTrack(track: string | null | undefined): SupportedTrack {
  return track === "professional" ? "professional" : "personal";
}

function isLessonInTrack(lesson: LessonMeta, track: SupportedTrack) {
  if (lesson.track === "bonus") return false;
  if (lesson.track === "personal" || lesson.track === "professional") {
    return lesson.track === track;
  }
  return isLessonIdInTrack(lesson.id, track);
}

function summarizeTrackProgress(
  lessons: LessonMeta[],
  completedLessonIds: Set<number>,
  track: SupportedTrack
): PublicTrackProgress {
  const config = track === "personal" ? TRACK_PERSONAL : TRACK_PROFESSIONAL;
  const trackLessons = orderLessonsForTrack(
    lessons.filter((lesson) => isLessonInTrack(lesson, track)),
    track
  );
  const trackLessonIds = new Set(trackLessons.map((lesson) => lesson.id));
  const total = trackLessons.length;
  const completed = trackLessons.filter((lesson) => completedLessonIds.has(lesson.id)).length;

  const stages = config.stages.map((stage) => {
    const stageLessons = trackLessons.filter(
      (lesson) => trackLessonIds.has(lesson.id) && isLessonInRange(lesson.id, stage)
    );
    const stageCompleted = stageLessons.filter((lesson) => completedLessonIds.has(lesson.id)).length;
    return {
      label: stage.label,
      name: stage.name,
      completed: stageCompleted,
      total: stageLessons.length,
      percent: stageLessons.length > 0 ? Math.round((stageCompleted / stageLessons.length) * 100) : 0,
    };
  });

  return {
    track,
    title: config.title,
    subtitle: config.subtitle,
    completed,
    total,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
    stages,
  };
}

export async function getPublicUserProfile(userId: string): Promise<PublicUserProfileData | null> {
  const admin = createAdminClient();

  const [{ data: profile, error: profileError }, { data: streak, error: streakError }, lessons] =
    await Promise.all([
      admin
        .from("user_profiles")
        .select(
          "id, full_name, avatar_url, bio, current_level, total_xp, lessons_completed, avg_quiz_score, preferred_track, created_at, is_disabled"
        )
        .eq("id", userId)
        .maybeSingle(),
      admin
        .from("user_streaks")
        .select("current_streak, longest_streak")
        .eq("user_id", userId)
        .maybeSingle(),
      getLessonsMeta(),
    ]);

  if (profileError) {
    throw profileError;
  }
  if (streakError && streakError.code !== "PGRST116") {
    throw streakError;
  }

  const safeProfile = profile as PublicProfileRow | null;
  if (!safeProfile || safeProfile.is_disabled) {
    return null;
  }

  const { data: progressRows, error: progressError } = await admin
    .from("user_progress")
    .select("lesson_id, completed_at, quiz_score, time_spent_seconds")
    .eq("user_id", userId)
    .eq("completed", true)
    .order("completed_at", { ascending: false });

  if (progressError) {
    throw progressError;
  }

  const progress = (progressRows ?? []) as CompletedLessonRow[];
  const completedLessonIds = new Set(progress.map((row) => row.lesson_id));
  const lessonMetaById = new Map(lessons.map((lesson) => [lesson.id, lesson]));

  const recentLessons = progress
    .map((row) => {
      const lesson = lessonMetaById.get(row.lesson_id);
      if (!lesson) return null;
      return {
        id: lesson.id,
        slug: lesson.slug,
        title: lesson.title,
        completedAt: row.completed_at,
        quizScore: row.quiz_score,
      };
    })
    .filter((lesson): lesson is PublicRecentLesson => lesson !== null)
    .slice(0, 8);

  const preferredTrack = normalizeTrack(safeProfile.preferred_track);
  const trackProgress = [
    summarizeTrackProgress(lessons, completedLessonIds, preferredTrack),
    summarizeTrackProgress(
      lessons,
      completedLessonIds,
      preferredTrack === "personal" ? "professional" : "personal"
    ),
  ];

  const totalStudyMinutes = Math.round(
    progress.reduce((sum, row) => sum + (row.time_spent_seconds ?? 0), 0) / 60
  );
  const level = getLevelByXp(safeProfile.total_xp);

  return {
    id: safeProfile.id,
    displayName: safeProfile.full_name?.trim() || "Người học",
    avatarUrl: safeProfile.avatar_url,
    bio: safeProfile.bio,
    joinedAt: safeProfile.created_at,
    levelNumber: safeProfile.current_level || level.level,
    levelName: level.name,
    xp: safeProfile.total_xp,
    lessonsCompleted: safeProfile.lessons_completed,
    averageQuizScore: Number(safeProfile.avg_quiz_score || 0),
    totalStudyMinutes,
    currentStreak: Number((streak as { current_streak?: number } | null)?.current_streak || 0),
    longestStreak: Number((streak as { longest_streak?: number } | null)?.longest_streak || 0),
    preferredTrack,
    trackProgress,
    recentLessons,
  };
}
