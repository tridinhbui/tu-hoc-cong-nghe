"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Clock3,
  Edit3,
  Flame,
  Medal,
  NotebookPen,
  ShieldCheck,
  Target,
  Trophy,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import { getLevelByXp, getLevelProgress, getXpToNextLevel } from "@/lib/levels";
import { getMyLeaderboardRank, getUserProfile, recalculateUserStats, type UserProfile } from "@/lib/supabase-user";
import { getEligibleUserBadges, type UserBadge } from "@/lib/supabase-badges";
import { getMyGameTitles, type EarnedGameTitle } from "@/lib/games";
import { getMyJourney, type JourneyMilestone } from "@/lib/journey";
import { getUserStreak, type UserStreak } from "@/lib/supabase-streak";
import { getAllUserNotes } from "@/lib/supabase-notes";
import { getUserLessonFlags } from "@/lib/supabase-lesson-flags";
import { getUserBookmarks, type LessonBookmark } from "@/lib/supabase-bookmarks";
import { TRACKS } from "@/lib/tracks";
import { toast } from "sonner";
import {
  TRACK_PERSONAL,
  TRACK_PROFESSIONAL,
  isLessonIdInTrack,
  isLessonInRange,
  orderLessonsForTrack,
} from "@/lib/track-stages";
import type { LessonMeta } from "@/lib/lesson-types";

export const dynamic = "force-dynamic";

type TrackId = "personal" | "professional";

interface CurrentUser {
  id?: string;
  email?: string;
  created_at?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface ProgressRow {
  lesson_id: number;
  completed: boolean;
  completed_at: string | null;
  quiz_score: number | null;
  time_spent_seconds: number | null;
}

interface RecentLesson {
  id: number;
  slug: string;
  title: string;
  completedAt: string | null;
  quizScore: number | null;
}

interface TrackProgressSummary {
  track: TrackId;
  title: string;
  subtitle: string;
  estimatedHours: number;
  completed: number;
  total: number;
  percent: number;
  stages: Array<{
    label: string;
    name: string;
    completed: number;
    total: number;
    percent: number;
  }>;
}

function SectionCard({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-6 min-w-0">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-11 h-11 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-200 flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{title}</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-5">
      <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2">
        {label}
      </p>
      <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">{value}</p>
      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{hint}</p>
    </div>
  );
}

function normalizeTrack(track: string | null | undefined): TrackId {
  return track === "professional" ? "professional" : "personal";
}

function isLessonInTrackMeta(lesson: LessonMeta, track: TrackId) {
  if (lesson.track === "bonus") return false;
  if (lesson.track === "personal" || lesson.track === "professional") {
    return lesson.track === track;
  }
  return isLessonIdInTrack(lesson.id, track);
}

function summarizeTrackProgress(
  lessons: LessonMeta[],
  completedLessonIds: Set<number>,
  track: TrackId
): TrackProgressSummary {
  const config = track === "personal" ? TRACK_PERSONAL : TRACK_PROFESSIONAL;
  const trackLessons = orderLessonsForTrack(
    lessons.filter((lesson) => isLessonInTrackMeta(lesson, track)),
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
    title: track === "personal" ? TRACKS.personal.tab : TRACKS.professional.tab,
    subtitle: track === "personal" ? TRACKS.personal.subtitle : TRACKS.professional.subtitle,
    estimatedHours: track === "personal" ? TRACKS.personal.estimatedHours : TRACKS.professional.estimatedHours,
    completed,
    total,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
    stages,
  };
}

const TYPE_ACCENT: Record<JourneyMilestone["type"], string> = {
  signup: "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30",
  lesson_milestone: "border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30",
  badge: "border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function ProfilePage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [milestones, setMilestones] = useState<JourneyMilestone[]>([]);
  const [streak, setStreak] = useState<UserStreak | null>(null);
  const [notesCount, setNotesCount] = useState(0);
  const [flaggedLessonCount, setFlaggedLessonCount] = useState(0);
  const [flaggedLessons, setFlaggedLessons] = useState<Array<{ lesson_id: number; lesson_slug: string; lesson_title: string }>>([]);
  const [bookmarks, setBookmarks] = useState<LessonBookmark[]>([]);
  const [recentLessons, setRecentLessons] = useState<RecentLesson[]>([]);
  const [trackProgress, setTrackProgress] = useState<TrackProgressSummary[]>([]);
  const [studyMinutes, setStudyMinutes] = useState(0);
  const [lessonsStarted, setLessonsStarted] = useState(0);
  const [xpRank, setXpRank] = useState<{ rank: number; value: number } | null>(null);
  const [gameTitles, setGameTitles] = useState<EarnedGameTitle[]>([]);
  const [unlockedTitles, setUnlockedTitles] = useState<string[]>([]);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [unlockedThemes, setUnlockedThemes] = useState<string[]>([]);
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    const loadProfileRewards = () => {
      if (typeof window !== "undefined") {
        setUnlockedTitles(JSON.parse(window.localStorage.getItem(`thtcdn_unlocked_titles_${user.id}`) ?? "[]"));
        setActiveTitle(window.localStorage.getItem(`thtcdn_active_title_${user.id}`));
        setUnlockedThemes(JSON.parse(window.localStorage.getItem(`thtcdn_unlocked_themes_${user.id}`) ?? "[]"));
        setActiveTheme(window.localStorage.getItem(`thtcdn_active_theme_${user.id}`));
      }
    };
    loadProfileRewards();
    window.addEventListener("thtcdn_profile_updated", loadProfileRewards);
    return () => {
      window.removeEventListener("thtcdn_profile_updated", loadProfileRewards);
    };
  }, [user?.id]);

  const handleEquipTitle = (title: string) => {
    if (!user?.id) return;
    if (activeTitle === title) {
      setActiveTitle(null);
      localStorage.removeItem(`thtcdn_active_title_${user.id}`);
    } else {
      setActiveTitle(title);
      localStorage.setItem(`thtcdn_active_title_${user.id}`, title);
    }
    window.dispatchEvent(new Event("thtcdn_profile_updated"));
    toast.success("Đã cập nhật danh hiệu hiển thị!");
  };

  const handleEquipTheme = (theme: string) => {
    if (!user?.id) return;
    if (activeTheme === theme) {
      setActiveTheme(null);
      localStorage.removeItem(`thtcdn_active_theme_${user.id}`);
    } else {
      setActiveTheme(theme);
      localStorage.setItem(`thtcdn_active_theme_${user.id}`, theme);
    }
    window.dispatchEvent(new Event("thtcdn_theme_updated"));
    window.dispatchEvent(new Event("thtcdn_profile_updated"));
    toast.success("Đã cập nhật giao diện hiển thị!");
  };

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setUser(session.user);
      setErrorMessage(null);

      try {
        const [
          nextProfile,
          nextStreak,
          earnedBadges,
          notes,
          flags,
          bookmarksResponse,
          rank,
          progressResponse,
          lessonsResponse,
          journeyMilestones,
        ] = await Promise.all([
          getUserProfile(session.user.id),
          getUserStreak(session.user.id),
          getEligibleUserBadges(session.user.id),
          getAllUserNotes(session.user.id),
          getUserLessonFlags(session.user.id),
          getUserBookmarks(session.user.id),
          getMyLeaderboardRank("xp", session.user.id),
          supabase
            .from("user_progress")
            .select("lesson_id, completed, completed_at, quiz_score, time_spent_seconds")
            .eq("user_id", session.user.id)
            .order("completed_at", { ascending: false }),
          supabase.from("lessons").select("id, slug, title, track").order("id", { ascending: true }),
          getMyJourney(session.user.id),
        ]);

        if (progressResponse.error) {
          throw progressResponse.error;
        }
        if (lessonsResponse.error) {
          throw lessonsResponse.error;
        }

        const progressRows = (progressResponse.data ?? []) as ProgressRow[];
        const lessons = (lessonsResponse.data ?? []) as LessonMeta[];
        const completedProgress = progressRows.filter((row) => row.completed);
        const completedLessonIds = new Set(completedProgress.map((row) => row.lesson_id));
        const lessonMetaById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
        const preferredTrack = normalizeTrack(nextProfile.preferred_track);

        setProfile(nextProfile);
        setStreak(nextStreak);
        setBadges(earnedBadges);
        setMilestones(journeyMilestones);
        // Best-effort, separate from the critical Promise.all above (6 RPC
        // calls at limit=3 each) - a failure here shouldn't block the rest
        // of the profile from rendering.
        getMyGameTitles(session.user.id)
          .then(setGameTitles)
          .catch((err) => console.error("Error loading game titles:", err));
        // Self-heals total_xp/level/lessons_completed against the real
        // completed-lesson count - see the matching note in
        // DashboardClient.tsx. Fires after the fast initial paint above so a
        // stale number briefly shows, then corrects, rather than blocking
        // the page on it.
        recalculateUserStats(session.user.id)
          .then((stats) =>
            setProfile((prev) =>
              prev
                ? {
                    ...prev,
                    total_xp: stats.total_xp,
                    current_level: stats.current_level,
                    lessons_completed: stats.total_lessons_completed,
                    avg_quiz_score: stats.avg_quiz_score,
                  }
                : prev
            )
          )
          .catch((err) => console.error("Error recalculating user stats:", err));
        setNotesCount(notes.length);
        setFlaggedLessonCount(flags.length);
        setFlaggedLessons(flags.slice(0, 4));
        setBookmarks(bookmarksResponse.slice(0, 6));
        setXpRank(rank);
        setLessonsStarted(progressRows.length);
        setStudyMinutes(
          Math.round(progressRows.reduce((sum, row) => sum + (row.time_spent_seconds ?? 0), 0) / 60)
        );
        setTrackProgress([
          summarizeTrackProgress(lessons, completedLessonIds, preferredTrack),
          summarizeTrackProgress(
            lessons,
            completedLessonIds,
            preferredTrack === "personal" ? "professional" : "personal"
          ),
        ]);
        setRecentLessons(
          completedProgress
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
            .filter((lesson): lesson is RecentLesson => lesson !== null)
            .slice(0, 5)
        );
      } catch (error) {
        console.error("Error loading profile page:", error);
        setErrorMessage("Không tải được đầy đủ hồ sơ. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    void checkAuth();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center">
        <p className="text-stone-500 dark:text-stone-400">Đang tải...</p>
      </div>
    );
  }

  const displayName = profile?.full_name || user?.user_metadata?.full_name || "Người dùng";
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || null;
  const joinedAt = profile?.created_at || user?.created_at || null;
  const currentLevel = getLevelByXp(profile?.total_xp || 0);
  const levelProgress = getLevelProgress(profile?.total_xp || 0);
  const xpToNextLevel = getXpToNextLevel(profile?.total_xp || 0);
  const currentTrack = normalizeTrack(profile?.preferred_track);
  const currentTrackLabel = currentTrack === "personal" ? TRACKS.personal.tab : TRACKS.professional.tab;
  const initials = (displayName || user?.email || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 overflow-x-hidden">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/dashboard"
            className="text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-sm font-semibold"
          >
            ← Quay lại
          </Link>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-2">Hồ sơ cá nhân</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Nơi bạn theo dõi hành trình học, thành tích và những việc nên làm tiếp theo.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {errorMessage && (
          <div className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm font-semibold text-red-700 dark:text-red-300">
            {errorMessage}
          </div>
        )}

        {/* Premium Dark Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-stone-900 dark:bg-stone-950 text-white p-6 sm:p-8 shadow-lg border border-stone-850">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {avatarUrl ? (
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white/10 dark:border-stone-800 shadow-md flex-shrink-0">
                  <Image
                    src={avatarUrl}
                    alt={displayName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-500 border-4 border-white/10 dark:border-stone-800 shadow-md flex items-center justify-center text-4xl font-extrabold text-white flex-shrink-0">
                  {initials}
                </div>
              )}

              <div className="min-w-0">
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mb-2.5">
                  <span className="inline-flex items-center rounded-full bg-white/10 dark:bg-stone-800 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">
                    {currentTrackLabel}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-emerald-550/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">
                    Level {currentLevel.level} · {currentLevel.name}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {displayName}
                </h2>
                {activeTitle && (
                  <p className="text-xs font-bold text-amber-300 mt-1 flex items-center gap-1 justify-center sm:justify-start">
                    🏆 {activeTitle}
                  </p>
                )}
                <p className="text-sm text-stone-400 mt-1.5">{user?.email}</p>
                <p className="text-xs text-stone-500 mt-1">
                  Tham gia ngày {joinedAt ? new Date(joinedAt).toLocaleDateString("vi-VN") : "chưa rõ"}
                </p>
                <p className="text-sm text-stone-300 mt-4 max-w-xl leading-relaxed italic">
                  "{profile?.bio?.trim() || "Bạn chưa có phần giới thiệu. Hãy thêm vài dòng ngắn về mục tiêu học tập để hồ sơ rõ chất riêng hơn!"}"
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 self-stretch sm:self-auto shrink-0">
              <Link
                href="/settings"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold px-4 py-2.5 text-xs transition-all shadow-sm active:scale-95 w-full sm:w-auto"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Thiết lập tài khoản
              </Link>
            </div>
          </div>

          {/* Integrated Level Progress Bar */}
          <div className="mt-8 pt-5 border-t border-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 text-xs text-stone-400">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-stone-200">Tiến trình lên Level {currentLevel.level + 1}</span>
                <span>·</span>
                <span>{xpToNextLevel > 0 ? `Còn ${xpToNextLevel} XP` : "Đã đạt cấp tối đa"}</span>
              </div>
              <div className="font-extrabold text-stone-200">
                {profile?.total_xp || 0} XP <span className="text-stone-500 font-normal">({levelProgress}%)</span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-white/10 dark:bg-stone-850 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Dashboard Body */}
        <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] min-w-0">

          {/* Left Column: Learning Track Progress & Recent Lessons */}
          <div className="space-y-6 min-w-0">
            
            {/* Track Progress Summary Card */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-start gap-4 mb-5 border-b border-stone-100 dark:border-stone-800 pb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-450 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100">Tiến độ Lộ trình</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Tiến độ tổng quát lộ trình học của bạn</p>
                </div>
              </div>

              <div className="space-y-4">
                {trackProgress.map((track) => {
                  const isCurrent = track.track === currentTrack;
                  return (
                    <div
                      key={track.track}
                      className={`rounded-xl border p-4 transition-all ${
                        isCurrent
                          ? "border-emerald-250 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/5 shadow-[0_8px_20px_-12px_rgba(16,185,129,0.15)]"
                          : "border-stone-200 dark:border-stone-800/80 bg-stone-50/40 dark:bg-stone-900/10"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-100">{track.title}</p>
                            {isCurrent && (
                              <span className="inline-flex rounded bg-emerald-100/70 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-455 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider">
                                Đang học
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 truncate max-w-[280px]">
                            {track.subtitle}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-100">
                            {track.completed}/{track.total} bài
                          </p>
                          <p className="text-[10px] text-stone-455 dark:text-stone-500 mt-0.5">
                            {track.percent}% · ~{track.estimatedHours} giờ
                          </p>
                        </div>
                      </div>

                      <div className="h-2 rounded-full bg-stone-200 dark:bg-stone-850 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${isCurrent ? "bg-emerald-500" : "bg-stone-450 dark:bg-stone-600"}`}
                          style={{ width: `${track.percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Lessons Card */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-start gap-4 mb-5 border-b border-stone-100 dark:border-stone-800 pb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-550/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100">Bài học hoàn thành gần đây</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Các bài vừa học xong gần nhất để bạn ôn tập</p>
                </div>
              </div>

              {recentLessons.length === 0 ? (
                <p className="text-xs text-stone-500 dark:text-stone-400 py-2">
                  Chưa có bài hoàn thành nào để hiển thị. Hãy tiếp tục học trên Dashboard để lưu tiến độ nhé!
                </p>
              ) : (
                <div className="space-y-2.5">
                  {recentLessons.map((lesson) => (
                    <Link
                      key={`${lesson.id}-${lesson.completedAt ?? "pending"}`}
                      href={`/bai-hoc/${lesson.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-stone-150 dark:border-stone-800/80 px-4 py-3 hover:bg-stone-50/70 dark:hover:bg-stone-800/50 transition-colors group"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                          {lesson.title}
                        </p>
                        <p className="text-[10px] text-stone-455 dark:text-stone-500 mt-0.5">
                          {lesson.completedAt ? `Hoàn thành ngày ${new Date(lesson.completedAt).toLocaleDateString("vi-VN")}` : "Không rõ ngày"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <span className="text-xs font-extrabold text-stone-900 dark:text-stone-100">
                            {lesson.quizScore !== null && lesson.quizScore !== undefined ? `${Math.round(lesson.quizScore)}%` : "N/A"}
                          </span>
                          <p className="text-[9px] text-stone-455 dark:text-stone-500">Đọc & Quiz</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-500 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Learning Journey Timeline Card */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-start gap-4 mb-5 border-b border-stone-100 dark:border-stone-800 pb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-650 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-violet-500" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100">Hành trình học tập</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Dòng thời gian các cột mốc quan trọng của bạn</p>
                </div>
              </div>

              {milestones.length === 0 ? (
                <p className="text-xs text-stone-550 dark:text-stone-400 py-2">
                  Chưa có cột mốc nào để hiển thị. Hãy tiếp tục học để tạo cột mốc đầu tiên nhé!
                </p>
              ) : (
                <div className="relative pl-6 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-stone-200 dark:scrollbar-thumb-stone-800">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-stone-200 dark:bg-stone-850" aria-hidden="true" />
                  <div className="space-y-4">
                    {[...milestones].reverse().map((m, i) => (
                      <div key={`${m.type}-${m.date}-${i}`} className="relative">
                        <span
                          className={`absolute -left-6 top-1.5 w-6 h-6 rounded-full border flex items-center justify-center text-xs bg-white dark:bg-stone-900 ${TYPE_ACCENT[m.type]}`}
                        >
                          {m.emoji}
                        </span>
                        <div className="bg-stone-50/50 dark:bg-stone-950/20 border border-stone-150 dark:border-stone-800/80 rounded-xl px-4 py-2.5 ml-2.5">
                          <p className="text-[9px] font-black text-stone-450 dark:text-stone-500 mb-0.5">{formatDate(m.date)}</p>
                          <p className="font-extrabold text-stone-900 dark:text-stone-100 text-xs">{m.title}</p>
                          <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">{m.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Key Stats, Achievements & Shortcuts */}
          <div className="space-y-6 min-w-0">

            {/* Unified Key Stats Grid */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl p-5 shadow-sm">
              <h4 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 mb-4 tracking-tight">Thống kê tóm tắt</h4>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="min-w-0 bg-stone-50/70 dark:bg-stone-900/30 border border-stone-200/50 dark:border-stone-800 rounded-xl p-3.5">
                  <span className="text-[10px] font-extrabold text-stone-450 dark:text-stone-500 uppercase tracking-wider block mb-1">Thời gian học</span>
                  <p className="text-base font-extrabold text-stone-900 dark:text-stone-100 truncate">{studyMinutes} phút</p>
                  <p className="text-[10px] text-stone-455 dark:text-stone-450 mt-0.5 truncate">{lessonsStarted} bài đã mở</p>
                </div>
                <div className="min-w-0 bg-stone-50/70 dark:bg-stone-900/30 border border-stone-200/50 dark:border-stone-800 rounded-xl p-3.5">
                  <span className="text-[10px] font-extrabold text-stone-450 dark:text-stone-500 uppercase tracking-wider block mb-1">Xếp hạng tuần</span>
                  <p className="text-base font-extrabold text-stone-900 dark:text-stone-100 truncate">{xpRank ? `#${xpRank.rank}` : "Chưa xếp hạng"}</p>
                  <p className="text-[10px] text-stone-455 dark:text-stone-450 mt-0.5 truncate">{xpRank ? `${xpRank.value} XP` : "Học tiếp để lên hạng"}</p>
                </div>
                <div className="min-w-0 bg-stone-50/70 dark:bg-stone-900/30 border border-stone-200/50 dark:border-stone-800 rounded-xl p-3.5">
                  <span className="text-[10px] font-extrabold text-stone-450 dark:text-stone-500 uppercase tracking-wider block mb-1">Nhịp học streak</span>
                  <p className="text-base font-extrabold text-stone-900 dark:text-stone-100 truncate">{streak?.current_streak || 0} ngày</p>
                  <p className="text-[10px] text-stone-455 dark:text-stone-450 mt-0.5 truncate">Kỷ lục {streak?.longest_streak || 0} ngày</p>
                </div>
                <div className="min-w-0 bg-stone-50/70 dark:bg-stone-900/30 border border-stone-200/50 dark:border-stone-800 rounded-xl p-3.5">
                  <span className="text-[10px] font-extrabold text-stone-450 dark:text-stone-500 uppercase tracking-wider block mb-1">Ghi chú & Flag</span>
                  <p className="text-base font-extrabold text-stone-900 dark:text-stone-100 truncate">{notesCount} Note</p>
                  <p className="text-[10px] text-stone-455 dark:text-stone-450 mt-0.5 truncate">{flaggedLessonCount} bài tự đánh dấu</p>
                </div>
              </div>
            </div>

            {/* Achievements & Badges */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-stone-100 dark:border-stone-800 pb-3">
                <h4 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Huy hiệu & Danh hiệu
                </h4>
                <span className="text-[10px] font-extrabold text-stone-450 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                  Tổng {badges.length + gameTitles.length}
                </span>
              </div>

              {gameTitles.length > 0 && (
                <div className="space-y-2 mb-4">
                  {gameTitles.map((t) => (
                    <div
                      key={t.gameType}
                      className="flex items-center gap-3 rounded-xl border border-amber-250 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/10 px-3.5 py-2.5"
                    >
                      <span className="text-xl flex-shrink-0">{t.gameEmoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-extrabold text-amber-700 dark:text-amber-400 truncate">{t.title}</p>
                        <p className="text-[10px] text-stone-500 dark:text-stone-450 truncate">{t.gameLabel}</p>
                      </div>
                      <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-500 shrink-0">Hạng #{t.rank}</span>
                    </div>
                  ))}
                </div>
              )}

              {badges.length === 0 ? (
                <p className="text-xs text-stone-500 dark:text-stone-400 py-1">
                  Chưa đạt được huy hiệu học tập nào. Hoàn thành thêm bài học nhé!
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      title={badge.badge_description}
                      className="flex flex-col items-center text-center gap-1 p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30"
                    >
                      <span className="text-2xl">{badge.badge_icon}</span>
                      <span className="text-[9px] font-extrabold text-stone-900 dark:text-stone-200 leading-tight truncate w-full">
                        {badge.badge_name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Unlocked Titles & Themes */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl p-5 shadow-sm">
              <h4 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 border-b border-stone-100 dark:border-stone-800 pb-3 mb-4">
                <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
                Vật phẩm Rương Quà
              </h4>
              
              {/* Titles Section */}
              <div className="space-y-2 mb-4">
                <h5 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  Danh hiệu ({unlockedTitles.length})
                </h5>
                {unlockedTitles.length === 0 ? (
                  <p className="text-xs text-stone-500 dark:text-stone-450 italic">
                    Chưa mở khóa danh hiệu nào. Mở rương quà ở Dashboard để kiếm danh hiệu!
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {unlockedTitles.map((t) => {
                      const isEquipped = activeTitle === t;
                      return (
                        <button
                          key={t}
                          onClick={() => handleEquipTitle(t)}
                          className={`px-3 py-1.5 rounded-xl border text-[10px] sm:text-[11px] font-bold transition-all focus:outline-none cursor-pointer whitespace-nowrap ${
                            isEquipped
                              ? "bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/20"
                              : "border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400 dark:hover:border-amber-700"
                          }`}
                        >
                          {t} {isEquipped ? "✓" : ""}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Themes Section */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  Giao diện ({unlockedThemes.length})
                </h5>
                {unlockedThemes.length === 0 ? (
                  <p className="text-xs text-stone-500 dark:text-stone-450 italic">
                    Chưa mở khóa giao diện nào.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {unlockedThemes.map((th) => {
                      const isEquipped = activeTheme === th;
                      const themeName = th === "gold" ? "Hoàng Kim" : "Ngọc Lục Bảo";
                      const colorClass = th === "gold" ? "text-amber-500" : "text-emerald-500";
                      return (
                        <button
                          key={th}
                          onClick={() => handleEquipTheme(th)}
                          className={`px-3 py-1.5 rounded-xl border text-[10px] sm:text-[11px] font-bold transition-all focus:outline-none cursor-pointer whitespace-nowrap ${
                            isEquipped
                              ? th === "gold"
                                ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                                : "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                              : "border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-700"
                          }`}
                        >
                          <span className={isEquipped ? "text-white" : colorClass}>✦</span> Giao diện {themeName} {isEquipped ? "✓" : ""}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Bookmarked Lessons Card */}
            {bookmarks.length > 0 && (
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl p-5 shadow-sm">
                <h4 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 mb-3.5 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-emerald-500" />
                  Bài học đã lưu ({bookmarks.length})
                </h4>
                <div className="space-y-2">
                  {bookmarks.map((bookmark) => (
                    <Link
                      key={bookmark.id}
                      href={`/bai-hoc/${bookmark.lesson_slug}`}
                      className="flex items-center justify-between gap-2.5 rounded-xl border border-stone-150 dark:border-stone-800/80 px-3 py-2.5 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group"
                    >
                      <span className="text-xs font-bold text-stone-850 dark:text-stone-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                        {bookmark.lesson_title}
                      </span>
                      <Bookmark className="w-3.5 h-3.5 text-amber-550 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Flagged Lessons Shortcuts */}
            {flaggedLessons.length > 0 && (
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl p-5 shadow-sm">
                <h4 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 mb-3.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  Bài tự đánh dấu ({flaggedLessonCount})
                </h4>
                <div className="space-y-2">
                  {flaggedLessons.map((lesson) => (
                    <Link
                      key={lesson.lesson_id}
                      href={`/bai-hoc/${lesson.lesson_slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-stone-150 dark:border-stone-800/80 px-3 py-2.5 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group"
                    >
                      <span className="text-xs font-bold text-stone-850 dark:text-stone-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                        {lesson.lesson_title}
                      </span>
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
