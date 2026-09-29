"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isValidAvatar } from "@/lib/avatar-utils";
import { ArrowRight, Bookmark, CheckCircle2, Edit3, Trophy } from "lucide-react";
import Glyph from "@/components/Glyph";
import { APP_SYS } from "@/components/analytics/system-codes";
import { StatusDot, Sys, panel, textLink } from "@/components/ui/system";
import { createClient } from "@/lib/cloudflare";
import { getLevelByXp, getLevelProgress, getXpToNextLevel } from "@/lib/levels";
import { getMyLeaderboardRank, getUserProfile, recalculateUserStats, type UserProfile } from "@/lib/cloudflare-user";
import { getEligibleUserBadges, type UserBadge } from "@/lib/cloudflare-badges";
import { getUnlockedCosmetics } from "@/lib/chests";
import { getMyGameTitles, type EarnedGameTitle } from "@/lib/games";
import { getMyJourney, type JourneyMilestone } from "@/lib/journey";
import { getUserStreak, type UserStreak } from "@/lib/cloudflare-streak";
import { countUserNotes } from "@/lib/cloudflare-notes";
import { getUserLessonFlags } from "@/lib/cloudflare-lesson-flags";
import { getUserBookmarks, type LessonBookmark } from "@/lib/cloudflare-bookmarks";
import { TRACKS } from "@/lib/tracks";
import { useI18n } from "@/lib/i18n/context";
import { badgeDescription, badgeName } from "@/lib/badge-label";
import { format, intlLocale } from "@/lib/i18n";
import { toast } from "sonner";
import {
  TRACK_PERSONAL,
  TRACK_PROFESSIONAL,
  isLessonIdInTrack,
  isLessonInRange,
  orderLessonsForTrack,
} from "@/lib/track-stages";
import type { LessonMeta } from "@/lib/lesson-types";


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

// `t` truyền vào chứ không gọi `useI18n()` ở đây: đây là hàm thuần, chạy trong
// một effect, không phải component - hook sẽ không hợp lệ. Chữ hiển thị của
// chặng tra theo VỊ TRÍ trong `config.stages`, giống DashboardClient; `label`
// vẫn giữ nguyên bản Việt ở những chỗ nó là khoá.
function summarizeTrackProgress(
  lessons: LessonMeta[],
  completedLessonIds: Set<number>,
  track: TrackId,
  t: ReturnType<typeof useI18n>["t"]
): TrackProgressSummary {
  const config = track === "personal" ? TRACK_PERSONAL : TRACK_PROFESSIONAL;
  const trackLessons = orderLessonsForTrack(
    lessons.filter((lesson) => isLessonInTrackMeta(lesson, track)),
    track
  );
  const trackLessonIds = new Set(trackLessons.map((lesson) => lesson.id));
  const total = trackLessons.length;
  const completed = trackLessons.filter((lesson) => completedLessonIds.has(lesson.id)).length;

  const stages = config.stages.map((stage, stageIdx) => {
    const stageCopy = t.trackStages[track]?.stages[stageIdx];
    const stageLessons = trackLessons.filter(
      (lesson) => trackLessonIds.has(lesson.id) && isLessonInRange(lesson.id, stage)
    );
    const stageCompleted = stageLessons.filter((lesson) => completedLessonIds.has(lesson.id)).length;
    return {
      label: stageCopy?.label ?? stage.label,
      name: stageCopy?.name ?? stage.name,
      completed: stageCompleted,
      total: stageLessons.length,
      percent: stageLessons.length > 0 ? Math.round((stageCompleted / stageLessons.length) * 100) : 0,
    };
  });

  return {
    track,
    title: track === "personal" ? t.tracks.personal.tab : t.tracks.professional.tab,
    subtitle: track === "personal" ? t.tracks.personal.subtitle : t.tracks.professional.subtitle,
    estimatedHours: track === "personal" ? TRACKS.personal.estimatedHours : TRACKS.professional.estimatedHours,
    completed,
    total,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
    stages,
  };
}

/** Đầu một khối trong hồ sơ: tiêu đề đậm trên đường kẻ 1px, không ô icon màu. */
function CardHead({ title, sub, aside }: { title: string; sub?: string; aside?: ReactNode }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h3 className="text-base font-black tracking-tight text-ink-max">{title}</h3>
        {sub && <p className="mt-0.5 text-xs text-ink-muted">{sub}</p>}
      </div>
      {aside}
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/** Huy hiệu cấp trong lib/badges.ts dùng chữ số khoanh tròn ("②"), là ký
 *  tự chữ chứ không phải emoji - vẽ thành một pill số nhỏ. Mọi huy hiệu
 *  khác là emoji dữ liệu, đi qua Glyph. */
function BadgeGlyph({ icon, className }: { icon: string | null | undefined; className?: string }) {
  const cp = icon && [...icon].length === 1 ? icon.codePointAt(0) ?? 0 : 0;
  if (cp >= 0x2460 && cp <= 0x2473) {
    return (
      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-accent-soft px-1 font-mono text-[10px] font-medium tabular-nums text-accent not-italic">
        {cp - 0x2460 + 1}
      </span>
    );
  }
  return <Glyph emoji={icon} className={className} />;
}

export default function ProfilePage() {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [cloudflare] = useState(() => createClient());
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
    const userId = user?.id;
    if (!userId) return;
    // Owned titles/themes come from the server (chest wins + shop
    // purchases both land in user_chests - see lib/chests.ts's
    // getUnlockedCosmetics), not localStorage. Which one is currently
    // *equipped* stays a device-local preference (no server column for
    // that), so activeTitle/activeTheme keep reading localStorage.
    const loadUnlockedCosmetics = () => {
      getUnlockedCosmetics(userId)
        .then((cosmetics) => {
          setUnlockedTitles(cosmetics.titles);
          setUnlockedThemes(cosmetics.themes);
        })
        .catch((error) => console.error("Error loading unlocked cosmetics:", error));
    };
    const loadEquippedSelection = () => {
      if (typeof window !== "undefined") {
        setActiveTitle(window.localStorage.getItem(`thtcdn_active_title_${userId}`));
        setActiveTheme(window.localStorage.getItem(`thtcdn_active_theme_${userId}`));
      }
    };
    loadUnlockedCosmetics();
    loadEquippedSelection();
    window.addEventListener("thtcdn_profile_updated", loadUnlockedCosmetics);
    return () => {
      window.removeEventListener("thtcdn_profile_updated", loadUnlockedCosmetics);
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
    toast.success(t.profile.titleUpdated);
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
    toast.success(t.profile.themeUpdated);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await cloudflare.auth.getSession();

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
          notesTotal,
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
          countUserNotes(session.user.id),
          getUserLessonFlags(session.user.id),
          getUserBookmarks(session.user.id),
          getMyLeaderboardRank("xp", session.user.id),
          cloudflare
            .from("user_progress")
            .select("lesson_id, completed, completed_at, quiz_score, time_spent_seconds")
            .eq("user_id", session.user.id)
            .order("completed_at", { ascending: false }),
          cloudflare.from("lessons").select("id, slug, title, track").order("id", { ascending: true }),
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
              prev && stats
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
        setNotesCount(notesTotal);
        setFlaggedLessonCount(flags.length);
        setFlaggedLessons(flags.slice(0, 4));
        setBookmarks(bookmarksResponse.slice(0, 6));
        setXpRank(rank);
        setLessonsStarted(progressRows.length);
        setStudyMinutes(
          Math.round(progressRows.reduce((sum, row) => sum + (row.time_spent_seconds ?? 0), 0) / 60)
        );
        setTrackProgress([
          summarizeTrackProgress(lessons, completedLessonIds, preferredTrack, t),
          summarizeTrackProgress(
            lessons,
            completedLessonIds,
            preferredTrack === "personal" ? "professional" : "personal",
            t
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
        setErrorMessage(t.profile.loadPartialError);
      } finally {
        setLoading(false);
      }
    };

    void checkAuth();
  }, [router, cloudflare]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center">
        <p className="text-ink-muted">{t.profile.loading}</p>
      </div>
    );
  }

  const displayName = profile?.full_name || user?.user_metadata?.full_name || t.profile.defaultName;
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || null;
  const joinedAt = profile?.created_at || user?.created_at || null;
  const currentLevel = getLevelByXp(profile?.total_xp || 0);
  const levelProgress = getLevelProgress(profile?.total_xp || 0);
  const xpToNextLevel = getXpToNextLevel(profile?.total_xp || 0);
  const currentTrack = normalizeTrack(profile?.preferred_track);
  const currentTrackLabel = currentTrack === "personal" ? t.tracks.personal.tab : t.tracks.professional.tab;
  const initials = (displayName || user?.email || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Khối số liệu của hồ sơ: nhãn sans chữ hoa nhỏ, giá trị mono căn thẳng.
  const summaryRows = [
    { label: t.profile.studyTime, value: format(t.profile.minutes, { count: studyMinutes }), hint: format(t.profile.lessonsOpened, { count: lessonsStarted }) },
    { label: t.profile.weeklyRank, value: xpRank ? `#${xpRank.rank}` : t.profile.unranked, hint: xpRank ? format(t.profile.xpWithPercent, { xp: xpRank.value }) : t.profile.rankKeepGoing },
    { label: t.profile.streakLabel, value: format(t.profile.days, { count: streak?.current_streak || 0 }), hint: format(t.profile.streakRecord, { count: streak?.longest_streak || 0 }) },
    { label: t.profile.notesAndFlags, value: format(t.profile.noteCount, { count: notesCount }), hint: format(t.profile.flaggedCount, { count: flaggedLessonCount }) },
  ];

  return (
    <div className="min-h-screen bg-page overflow-x-hidden dark:bg-stone-950">
      <div className="border-b border-line-strong">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center justify-between gap-4 border-b border-line pb-2">
            <Link href="/dashboard" className={`${textLink} text-xs`}>
              {t.profile.back}
            </Link>
            <Sys className="text-ink-muted">{APP_SYS.profile}</Sys>
          </div>
          <h1 className="mt-3 text-2xl font-black tracking-tight text-ink-max">{t.profile.title}</h1>
          <p className="text-sm text-ink-soft mt-1">
            {t.profile.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {errorMessage && (
          <div role="alert" className="rounded-sm border border-danger-line bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm font-semibold text-danger">
            {errorMessage}
          </div>
        )}

        {/* Đầu hồ sơ: dải mực phẳng (stone-950) - không vầng sáng mờ, không bóng. */}
        <div className="rounded-md border border-stone-800 bg-stone-950 p-6 text-white sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {isValidAvatar(avatarUrl) ? (
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-white/15 flex-shrink-0">
                  <Image
                    src={avatarUrl}
                    alt={displayName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-stone-800 border border-white/15 flex items-center justify-center text-4xl font-black text-white flex-shrink-0">
                  {initials}
                </div>
              )}

              <div className="min-w-0">
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mb-2.5">
                  <span className="inline-flex items-center rounded-sm border border-white/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.06em] text-stone-300">
                    {currentTrackLabel}
                  </span>
                  <span className="inline-flex items-center rounded-sm border border-white/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.06em] text-stone-300">
                    {format(t.profile.levelLine, { level: currentLevel.level, name: currentLevel.name })}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {displayName}
                </h2>
                {activeTitle && (
                  <p className="text-xs font-bold text-stone-300 mt-1 flex items-center gap-1 justify-center sm:justify-start">
                    <Trophy className="w-3.5 h-3.5 shrink-0" aria-hidden /> {activeTitle}
                  </p>
                )}
                <p className="text-sm text-stone-400 mt-1.5">{user?.email}</p>
                <p className="text-xs text-stone-500 mt-1">
                  {format(t.profile.joinedOn, { date: joinedAt ? new Date(joinedAt).toLocaleDateString(intlLocale(locale)) : t.profile.joinedUnknown })}
                </p>
                <p className="text-sm text-stone-300 mt-4 max-w-xl leading-relaxed italic">
                  &quot;{profile?.bio?.trim() || t.profile.bioEmpty}&quot;
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 self-stretch sm:self-auto shrink-0">
              <Link
                href="/settings"
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-white px-4 py-2.5 text-sm font-bold text-stone-950 transition-colors hover:bg-brand-100 sm:w-auto"
              >
                <Edit3 className="w-3.5 h-3.5" aria-hidden />
                {t.profile.accountSettings}
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 text-xs text-stone-400">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-stone-200">{format(t.profile.progressToLevel, { level: currentLevel.level + 1 })}</span>
                <span>·</span>
                <span>{xpToNextLevel > 0 ? format(t.profile.xpToGo, { xp: xpToNextLevel }) : t.profile.maxLevel}</span>
              </div>
              <div className="font-mono tabular-nums text-stone-200">
                {format(t.profile.xpWithPercent, { xp: profile?.total_xp || 0 })}{" "}
                <span className="text-stone-500">({levelProgress}%)</span>
              </div>
            </div>
            <div className="h-1.5 rounded-xs bg-white/10 overflow-hidden">
              <div
                className="h-full bg-brand-500 transition-[width] duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] min-w-0">
          <div className="space-y-6 min-w-0">
            <section className={`${panel} p-5 sm:p-6`}>
              <CardHead title={t.profile.trackProgressTitle} sub={t.profile.trackProgressSub} />

              <div className="divide-y divide-stone-200 border-y border-line dark:divide-stone-800">
                {trackProgress.map((track) => {
                  const isCurrent = track.track === currentTrack;
                  return (
                    <div key={track.track} className="py-4">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="text-sm font-bold text-ink-max">{track.title}</p>
                            {isCurrent && (
                              <span className="inline-flex items-center gap-1.5 rounded-sm border border-accent-line px-1.5 py-0.5 text-[10.5px] font-bold text-accent-strong">
                                <StatusDot />
                                {t.profile.inProgress}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-ink-muted mt-0.5 truncate max-w-[280px]">
                            {track.subtitle}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-mono text-sm tabular-nums text-ink-max">
                            {format(t.profile.lessonsOf, { done: track.completed, total: track.total })}
                          </p>
                          <p className="font-mono text-[10.5px] tabular-nums text-ink-faint mt-0.5">
                            {format(t.profile.percentAndHours, { percent: track.percent, hours: track.estimatedHours })}
                          </p>
                        </div>
                      </div>

                      <div className="h-1.5 rounded-xs bg-surface-sunken overflow-hidden">
                        <div
                          className={`h-full ${isCurrent ? "bg-brand-600 dark:bg-brand-500" : "bg-stone-400 dark:bg-stone-600"}`}
                          style={{ width: `${track.percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className={`${panel} p-5 sm:p-6`}>
              <CardHead title={t.profile.recentTitle} sub={t.profile.recentSub} />

              {recentLessons.length === 0 ? (
                <p className="text-xs text-ink-muted py-2">
                  {t.profile.recentEmpty}
                </p>
              ) : (
                <div className="divide-y divide-stone-200 border-y border-line dark:divide-stone-800">
                  {recentLessons.map((lesson) => (
                    <Link
                      key={`${lesson.id}-${lesson.completedAt ?? "pending"}`}
                      href={`/bai-hoc/${lesson.slug}`}
                      className="flex items-center justify-between gap-3 px-1 py-3 hover:bg-surface-raised dark:hover:bg-stone-800/50 transition-colors group"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-ink group-hover:text-accent-strong transition-colors truncate">
                          {lesson.title}
                        </p>
                        <p className="text-[11px] text-ink-faint mt-0.5">
                          {lesson.completedAt ? format(t.profile.completedOn, { date: new Date(lesson.completedAt).toLocaleDateString(intlLocale(locale)) }) : t.profile.dateUnknown}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <span className="font-mono text-sm tabular-nums text-ink-max">
                            {/* i18n-ignore-start: "N/A" is language-neutral, the same in both locales */}
                            {lesson.quizScore !== null && lesson.quizScore !== undefined ? `${Math.round(lesson.quizScore)}%` : "N/A"}
                            {/* i18n-ignore-end */}
                          </span>
                          <p className="text-[10px] text-ink-faint">{t.profile.readAndQuiz}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-ink-faint group-hover:text-accent transition-colors" aria-hidden />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            <section className={`${panel} p-5 sm:p-6`}>
              <CardHead title={t.profile.journeyTitle} sub={t.profile.journeySub} />

              {milestones.length === 0 ? (
                <p className="text-xs text-ink-muted py-2">
                  {t.profile.journeyEmpty}
                </p>
              ) : (
                <ol className="max-h-[350px] divide-y divide-stone-200 overflow-y-auto border-y border-line pr-2 dark:divide-stone-800">
                  {[...milestones].reverse().map((m, i) => (
                    <li key={`${m.type}-${m.date}-${i}`} className="flex items-start gap-3 py-2.5">
                      <time dateTime={m.date} className="w-[5.5rem] shrink-0 pt-0.5 font-mono text-[11px] tabular-nums text-ink-faint">
                        {formatDate(m.date)}
                      </time>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-line text-xs">
                        <BadgeGlyph icon={m.emoji} className="w-3.5 h-3.5 text-ink-soft" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-ink-max">{m.title}</p>
                        <p className="text-[11px] text-ink-muted mt-0.5">{m.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </div>

          <div className="space-y-6 min-w-0">
            <section className={`${panel} p-5`}>
              <CardHead title={t.profile.summaryTitle} />
              <dl className="grid grid-cols-2 border-y border-line">
                {summaryRows.map((row, i) => (
                  <div
                    key={row.label}
                    className={`min-w-0 py-3 ${i % 2 === 0 ? "pr-3" : "border-l border-line pl-3"} ${i >= 2 ? "border-t border-line" : ""}`}
                  >
                    <dt className="truncate text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-muted">{row.label}</dt>
                    <dd className="mt-1 truncate font-mono text-base font-medium tabular-nums text-ink-max">{row.value}</dd>
                    <dd className="mt-0.5 truncate text-[11px] text-ink-faint">{row.hint}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className={`${panel} p-5`}>
              <CardHead
                title={t.profile.badgesTitle}
                aside={
                  <span className="font-mono text-[11px] tabular-nums text-ink-muted">
                    {format(t.profile.badgesTotal, { count: badges.length + gameTitles.length })}
                  </span>
                }
              />

              {gameTitles.length > 0 && (
                <div className="mb-4 divide-y divide-stone-200 border-y border-line dark:divide-stone-800">
                  {gameTitles.map((gt) => (
                    <div key={gt.gameType} className="flex items-center gap-3 py-2.5">
                      <Glyph emoji={gt.gameEmoji} className="w-5 h-5 flex-shrink-0 text-ink-soft" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-ink-max truncate">{gt.title}</p>
                        <p className="text-[11px] text-ink-muted truncate">{gt.gameLabel}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs tabular-nums text-ink-max">{format(t.profile.rankNumber, { rank: gt.rank })}</span>
                    </div>
                  ))}
                </div>
              )}

              {badges.length === 0 ? (
                <p className="text-xs text-ink-muted py-1">
                  {t.profile.badgesEmpty}
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      title={badgeDescription(badge, t)}
                      className="flex flex-col items-center text-center gap-1 p-2.5 rounded-sm border border-line"
                    >
                      <span className="flex h-7 items-center justify-center"><BadgeGlyph icon={badge.badge_icon} className="w-6 h-6 text-ink-soft" /></span>
                      <span className="text-[10px] font-bold text-ink leading-tight truncate w-full">
                        {badgeName(badge, t)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className={`${panel} p-5`}>
              <CardHead title={t.profile.chestItems} />

              <div className="space-y-2 mb-5">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">
                  {format(t.profile.titlesSection, { count: unlockedTitles.length })}
                </h3>
                {unlockedTitles.length === 0 ? (
                  <p className="text-xs text-ink-muted italic">
                    {t.profile.titlesEmpty}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {unlockedTitles.map((title) => {
                      const isEquipped = activeTitle === title;
                      return (
                        <button
                          key={title}
                          type="button"
                          onClick={() => handleEquipTitle(title)}
                          aria-pressed={isEquipped}
                          className={`cursor-pointer whitespace-nowrap rounded-sm border px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
                            isEquipped
                              ? "border-brand-600 bg-brand-50 text-accent-strong dark:border-brand-400 dark:bg-brand-950/40"
                              : "border-line text-ink-body hover:border-stone-500"
                          }`}
                        >
                          {title} {isEquipped ? "✓" : ""}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">
                  {format(t.profile.themesSection, { count: unlockedThemes.length })}
                </h3>
                {unlockedThemes.length === 0 ? (
                  <p className="text-xs text-ink-muted italic">
                    {t.profile.themesEmpty}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {unlockedThemes.map((th) => {
                      const isEquipped = activeTheme === th;
                      const themeName = th === "gold" ? t.profile.themeGold : t.profile.themeEmerald;
                      // Ô màu là mẫu của chính giao diện đó - màu ở đây mô tả
                      // lựa chọn, không phải trang trí.
                      const swatch = th === "gold" ? "bg-amber-500" : "bg-brand-500";
                      return (
                        <button
                          key={th}
                          type="button"
                          onClick={() => handleEquipTheme(th)}
                          aria-pressed={isEquipped}
                          className={`inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-sm border px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
                            isEquipped
                              ? "border-brand-600 bg-brand-50 text-accent-strong dark:border-brand-400 dark:bg-brand-950/40"
                              : "border-line text-ink-body hover:border-stone-500"
                          }`}
                        >
                          <span className={`h-2 w-2 rounded-[1px] ${swatch}`} aria-hidden />
                          {format(t.profile.themeLabel, { name: themeName })} {isEquipped ? "✓" : ""}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            {bookmarks.length > 0 && (
              <section className={`${panel} p-5`}>
                <CardHead title={format(t.profile.savedLessons, { count: bookmarks.length })} />
                <div className="divide-y divide-stone-200 border-y border-line dark:divide-stone-800">
                  {bookmarks.map((bookmark) => (
                    <Link
                      key={bookmark.id}
                      href={`/bai-hoc/${bookmark.lesson_slug}`}
                      className="flex items-center justify-between gap-2.5 px-1 py-2.5 hover:bg-surface-raised dark:hover:bg-stone-800/50 transition-colors group"
                    >
                      <span className="text-sm font-semibold text-ink-heading group-hover:text-accent-strong transition-colors truncate">
                        {bookmark.lesson_title}
                      </span>
                      <Bookmark className="w-3.5 h-3.5 text-ink-faint shrink-0" aria-hidden />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {flaggedLessons.length > 0 && (
              <section className={`${panel} p-5`}>
                <CardHead title={format(t.profile.flaggedLessons, { count: flaggedLessonCount })} />
                <div className="divide-y divide-stone-200 border-y border-line dark:divide-stone-800">
                  {flaggedLessons.map((lesson) => (
                    <Link
                      key={lesson.lesson_id}
                      href={`/bai-hoc/${lesson.lesson_slug}`}
                      className="flex items-center justify-between gap-3 px-1 py-2.5 hover:bg-surface-raised dark:hover:bg-stone-800/50 transition-colors group"
                    >
                      <span className="text-sm font-semibold text-ink-heading group-hover:text-accent-strong transition-colors truncate">
                        {lesson.lesson_title}
                      </span>
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-ink-faint" aria-hidden />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
