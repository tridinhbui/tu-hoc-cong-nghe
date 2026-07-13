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
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import { getLevelByXp, getLevelProgress, getXpToNextLevel } from "@/lib/levels";
import { getMyLeaderboardRank, getUserProfile, type UserProfile } from "@/lib/supabase-user";
import { getEligibleUserBadges, type UserBadge } from "@/lib/supabase-badges";
import { getUserStreak, type UserStreak } from "@/lib/supabase-streak";
import { getAllUserNotes } from "@/lib/supabase-notes";
import { getUserLessonFlags } from "@/lib/supabase-lesson-flags";
import { getUserBookmarks, type LessonBookmark } from "@/lib/supabase-bookmarks";
import UserMenu from "@/components/UserMenu";
import { TRACKS } from "@/lib/tracks";
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
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-11 h-11 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-200">
          {icon}
        </div>
        <div>
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

export default function ProfilePage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [badges, setBadges] = useState<UserBadge[]>([]);
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
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white/95 dark:bg-stone-950/95 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
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
          <UserMenu name={displayName} email={user?.email} avatarUrl={avatarUrl || undefined} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {errorMessage && (
          <div className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm font-semibold text-red-700 dark:text-red-300">
            {errorMessage}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-7">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={displayName}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover border-2 border-stone-200 dark:border-stone-700"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-stone-200 dark:bg-stone-700 border-2 border-stone-300 dark:border-stone-600 flex items-center justify-center text-3xl font-extrabold text-stone-700 dark:text-stone-300">
                  {initials}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center rounded-full bg-stone-100 dark:bg-stone-800 px-3 py-1 text-xs font-bold text-stone-700 dark:text-stone-200">
                    {currentTrackLabel}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    Level {currentLevel.level} · {currentLevel.name}
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
                  {displayName}
                </h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">{user?.email}</p>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                  Tham gia từ {joinedAt ? new Date(joinedAt).toLocaleDateString("vi-VN") : "chưa cập nhật"}
                </p>
                <p className="text-sm text-stone-700 dark:text-stone-300 mt-4 leading-relaxed">
                  {profile?.bio?.trim() ||
                    "Bạn chưa có phần giới thiệu. Thêm vài dòng ngắn về mục tiêu học tập để hồ sơ cá nhân trông đầy đặn và rõ chất riêng hơn."}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-950/40 p-5">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div>
                  <p className="text-sm font-bold text-stone-900 dark:text-stone-100">Tiến trình lên level kế tiếp</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    {xpToNextLevel > 0 ? `Còn ${xpToNextLevel} XP để lên level tiếp theo` : "Bạn đang ở level cao nhất hiện có"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-stone-900 dark:text-stone-100">{profile?.total_xp || 0} XP</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">{levelProgress}% trong level hiện tại</p>
                </div>
              </div>
              <div className="h-3 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-stone-900 dark:bg-stone-100 transition-all"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/settings"
                className="inline-flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold px-4 py-3 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Chỉnh sửa hồ sơ
              </Link>
              <Link
                href="/analytics"
                className="inline-flex items-center gap-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/70 text-stone-900 dark:text-stone-100 font-bold px-4 py-3 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                Xem thống kê chi tiết
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Level" value={`${currentLevel.level}`} hint={currentLevel.name} />
            <StatCard label="XP" value={`${profile?.total_xp || 0}`} hint="Tổng kinh nghiệm" />
            <StatCard
              label="Hoàn thành"
              value={`${profile?.lessons_completed || 0}`}
              hint={`${lessonsStarted} bài đã bắt đầu`}
            />
            <StatCard
              label="Điểm quiz"
              value={`${Math.round(profile?.avg_quiz_score || 0)}%`}
              hint="Điểm trung bình"
            />
            <StatCard
              label="Streak"
              value={`${streak?.current_streak || 0} ngày`}
              hint={`Kỷ lục ${streak?.longest_streak || 0} ngày`}
            />
            <StatCard
              label="Xếp hạng XP"
              value={xpRank ? `#${xpRank.rank}` : "Chưa rõ"}
              hint={xpRank ? `${xpRank.value} XP trên BXH` : "Sẽ hiện khi BXH sẵn sàng"}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <SectionCard
            icon={<Target className="w-5 h-5" />}
            title="Tiến độ học tập"
            description="Nhìn nhanh xem bạn đang đi trên lộ trình nào và mỗi chặng đã tiến được tới đâu."
          >
            <div className="space-y-4">
              {trackProgress.map((track) => (
                <div
                  key={track.track}
                  className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40 p-4"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{track.title}</p>
                        {track.track === currentTrack && (
                          <span className="inline-flex rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                            Ưu tiên hiện tại
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{track.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                        {track.completed}/{track.total}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {track.percent}% · ~{track.estimatedHours} giờ học
                      </p>
                    </div>
                  </div>

                  <div className="h-2.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden mb-4">
                    <div
                      className="h-full rounded-full bg-stone-900 dark:bg-stone-100"
                      style={{ width: `${track.percent}%` }}
                    />
                  </div>

                  <div className="space-y-2">
                    {track.stages.map((stage) => (
                      <div key={`${track.track}-${stage.label}`} className="flex items-center justify-between gap-3 text-sm">
                        <div className="min-w-0">
                          <p className="font-semibold text-stone-900 dark:text-stone-100">{stage.label}</p>
                          <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{stage.name}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-stone-900 dark:text-stone-100">
                            {stage.completed}/{stage.total}
                          </p>
                          <p className="text-xs text-stone-500 dark:text-stone-400">{stage.percent}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="space-y-6">
            <SectionCard
              icon={<ShieldCheck className="w-5 h-5" />}
              title="Tóm tắt nhanh"
              description="Những con số quan trọng nhất để bạn tự kiểm tra nhịp học của mình."
            >
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400">
                    <Clock3 className="w-4 h-4" />
                    Thời gian học
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{studyMinutes} phút</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400">
                    <NotebookPen className="w-4 h-4" />
                    Ghi chú đã lưu
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{notesCount}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400">
                    <Bookmark className="w-4 h-4" />
                    Bài học đã lưu
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{bookmarks.length}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400">
                    <Bookmark className="w-4 h-4" />
                    Bài tự đánh dấu
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{flaggedLessonCount}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400">
                    <Flame className="w-4 h-4" />
                    Chuỗi dài nhất
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{streak?.longest_streak || 0} ngày</span>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              icon={<Trophy className="w-5 h-5" />}
              title={`Huy hiệu (${badges.length})`}
              description="Các huy hiệu đang hợp lệ theo level hiện tại của bạn."
            >
              {badges.length === 0 ? (
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Chưa có huy hiệu nào. Hoàn thành thêm bài học để mở huy hiệu đầu tiên.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      title={badge.badge_description}
                      className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50"
                    >
                      <span className="text-3xl">{badge.badge_icon}</span>
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-tight">
                        {badge.badge_name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <SectionCard
            icon={<BookOpen className="w-5 h-5" />}
            title="Hoạt động gần đây"
            description="Các bài vừa hoàn thành gần nhất để bạn nối lại mạch học cho dễ."
          >
            {recentLessons.length === 0 ? (
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Bạn chưa có bài hoàn thành nào để hiển thị. Bắt đầu từ dashboard để hệ thống lưu tiến độ đầu tiên.
              </p>
            ) : (
              <div className="space-y-3">
                {recentLessons.map((lesson) => (
                  <Link
                    key={`${lesson.id}-${lesson.completedAt ?? "pending"}`}
                    href={`/bai-hoc/${lesson.slug}`}
                    className="block rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{lesson.title}</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                          {lesson.completedAt
                            ? `Hoàn thành ${new Date(lesson.completedAt).toLocaleDateString("vi-VN")}`
                            : "Chưa rõ ngày"}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                          {lesson.quizScore !== null && lesson.quizScore !== undefined
                            ? `${Math.round(lesson.quizScore)}%`
                            : "Không quiz"}
                        </p>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">quiz</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard
            icon={<Bookmark className="w-5 h-5" />}
            title="Bài học đã lưu"
            description="Những bài bạn đánh dấu để quay lại đọc tiếp hoặc ôn lại sau."
          >
            {bookmarks.length === 0 ? (
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Bạn chưa lưu bài học nào. Khi thấy bài đáng quay lại, hãy bấm biểu tượng đánh dấu trong trang bài học.
              </p>
            ) : (
              <div className="space-y-3">
                {bookmarks.map((bookmark) => (
                  <Link
                    key={bookmark.id}
                    href={`/bai-hoc/${bookmark.lesson_slug}`}
                    className="block rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                          {bookmark.lesson_title}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                          Lưu ngày {new Date(bookmark.created_at).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                      <Bookmark className="w-4 h-4 shrink-0 text-amber-500 dark:text-amber-400" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard
            icon={<Medal className="w-5 h-5" />}
            title="Lối tắt hữu ích"
            description="Những nơi bạn thường muốn quay lại ngay sau khi xem hồ sơ."
          >
            <div className="space-y-3">
              <Link
                href="/ban-be"
                className="flex items-center justify-between rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
              >
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">Bạn bè & chat</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Tìm người học khác và giữ kết nối</p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-500 dark:text-stone-400" />
              </Link>
              <Link
                href="/ghi-chu"
                className="flex items-center justify-between rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
              >
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">Kho ghi chú</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Ôn lại nhanh các ý bạn đã viết ra</p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-500 dark:text-stone-400" />
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center justify-between rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
              >
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">Tiếp tục học</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Quay lại dashboard và tiếp tục đúng mạch</p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-500 dark:text-stone-400" />
              </Link>
              <Link
                href="/settings"
                className="flex items-center justify-between rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
              >
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">Cài đặt tài khoản</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Đổi avatar, bio, mật khẩu và lộ trình ưu tiên</p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-500 dark:text-stone-400" />
              </Link>
            </div>

            {flaggedLessons.length > 0 && (
              <div className="mt-5 pt-5 border-t border-stone-200 dark:border-stone-800">
                <p className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">
                  Bài bạn đã tự đánh dấu
                </p>
                <div className="space-y-2">
                  {flaggedLessons.map((lesson) => (
                    <Link
                      key={lesson.lesson_id}
                      href={`/bai-hoc/${lesson.lesson_slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800/70 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                          {lesson.lesson_title}
                        </p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
