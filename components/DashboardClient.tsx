"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, BarChart3, Lock, FileText, Menu, X } from "lucide-react";
import { useProgress } from "@/lib/client-hooks";
import { getProgress, mergeCompletedLessons } from "@/lib/progress";
import { getCompletedLessons, markLessonComplete as markLessonCompleteSupabase } from "@/lib/supabase-progress";
import { updateStreak } from "@/lib/supabase-streak";
import type { Difficulty } from "@/lib/lesson-types";
import { createClient } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import UserStats from "@/components/UserStats";
import UserProfile from "@/components/UserProfile";
import ChatWithAdminWidget from "@/components/ChatWithAdminWidget";
import OnboardingFlow from "@/components/OnboardingFlow";
import ResumeLearningButton from "@/components/ResumeLearningButton";
import StreakDisplay from "@/components/StreakDisplay";
import DashboardTour from "@/components/DashboardTour";
import Logo from "@/components/Logo";
import Leaderboard from "@/components/Leaderboard";
import { hasCompletedOnboarding, completeOnboarding } from "@/lib/supabase-onboarding";
import { getUserProfile, recalculateUserStats } from "@/lib/supabase-user";
import UnlockRequestModal from "@/components/UnlockRequestModal";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL } from "@/lib/track-stages";
import { getLessonStage, getLessonsInStage } from "@/lib/lesson-stages";

// Slim projection of Lesson - just enough to render the dashboard listing,
// so the full lesson bodies (sections/quiz/etc) never reach this client bundle.
export interface LessonMeta {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: Difficulty;
  track?: "professional" | "personal" | "bonus";
  isFundamental?: boolean;
  prerequisiteId?: number | null;
  isVisible?: boolean;
}


// Local fast-path/fallback cache for the onboarding modal's "seen" state -
// see handleOnboardingSkip for why this exists.
const ONBOARDING_LOCAL_KEY = "onboarding_seen_v1";

/* ─── Component ─────────────────────────────────────────────────── */

export default function DashboardClient({ lessonsMeta }: { lessonsMeta: LessonMeta[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const progress = useProgress();
  const completed = progress.completedLessons;
  // localStorage alone can't be trusted as the progress source of truth - a
  // new browser/device/incognito session has none of it even though the
  // user's real progress lives in Supabase (user_progress). Bumping this
  // after merging server data forces a re-render, which makes useProgress()
  // pick up the freshly-merged localStorage snapshot (see mergeCompletedLessons).
  const [, forceProgressResync] = useState(0);
  const [activeTrack, setActiveTrackState] = useState<"personal" | "professional">(() => {
    if (typeof window === "undefined") return "personal";
    const saved = window.localStorage.getItem("activeTrack");
    return saved === "personal" || saved === "professional" ? saved : "personal";
  });
  const setActiveTrack = (track: "personal" | "professional") => {
    setActiveTrackState(track);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("activeTrack", track);
    }
  };
  // The lesson page redirects here with ?locked=<slug> when a user tries to
  // open a locked lesson directly by URL - surface that instead of silently
  // landing back on the dashboard with no explanation.
  useEffect(() => {
    const lockedSlug = searchParams.get("locked");
    if (lockedSlug) {
      toast.error("Bài học này đang bị khoá. Hoàn thành các bài trước để mở khoá.");
      router.replace("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const [user, setUser] = useState<{ id?: string; email?: string; user_metadata?: { full_name?: string } } | null>(null);
  const [loading, setLoading] = useState(true);
  const [userXp, setUserXp] = useState(0);
  const [avgQuizScore, setAvgQuizScore] = useState(0);
  const [openStages, setOpenStages] = useState<Set<string>>(new Set());
  const [openParts, setOpenParts] = useState<Set<string>>(new Set());
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const [unlockedLessonIds, setUnlockedLessonIds] = useState<Set<number>>(new Set());
  const [unlockModalLesson, setUnlockModalLesson] = useState<LessonMeta | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleStage = (key: string) => {
    setOpenStages((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const togglePart = (key: string) => {
    setOpenParts((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleOnboardingComplete = async (selectedTrack: "personal" | "professional") => {
    if (user?.id) {
      try {
        await completeOnboarding(user.id, selectedTrack);
        setActiveTrackState(selectedTrack);
        localStorage.setItem("activeTrack", selectedTrack);
        localStorage.setItem(ONBOARDING_LOCAL_KEY, "1");
        setShowOnboarding(false);
      } catch (error) {
        console.error("Error completing onboarding:", error);
      }
    }
  };

  const handleOnboardingSkip = () => {
    // Previously this only closed the modal for the current page view -
    // nothing was ever persisted, so a plain reload (or the DB-backed check
    // failing open because the user_onboarding migration hasn't been applied
    // on this environment yet) brought the exact same modal right back on
    // every single dashboard visit. Remember "skipped" locally too, so it
    // never resurfaces regardless of what the server-side check reports.
    localStorage.setItem(ONBOARDING_LOCAL_KEY, "1");
    setShowOnboarding(false);
  };

  // Check auth and calculate XP on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Resolve via the INITIAL_SESSION event instead of calling
      // getSession() directly. A freshly-created browser client (e.g. right
      // after redirecting here from /login or the OAuth callback) can have
      // getSession() report a false "no session" before it's finished
      // parsing the just-set auth cookie - a fixed timeout race (the
      // previous fix here) still lost that race often enough in production
      // to redirect to /login, which then bounced straight back once ITS
      // own check resolved a moment later. supabase-js guarantees
      // INITIAL_SESSION fires exactly once with the fully-resolved session
      // (or null), so waiting for that event is what actually removes the
      // race instead of just narrowing it.
      const session = await new Promise<Session | null>((resolve) => {
        let settled = false;
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, s) => {
          if (settled) return;
          if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
            settled = true;
            subscription.unsubscribe();
            resolve(s);
          }
        });
        // Safety net in case INITIAL_SESSION never fires (e.g. storage
        // access blocked) - fall back to a direct check rather than hanging.
        setTimeout(async () => {
          if (settled) return;
          settled = true;
          subscription.unsubscribe();
          const {
            data: { session: fallback },
          } = await supabase.auth.getSession();
          resolve(fallback);
        }, 3000);
      });

      if (!session) {
        router.replace("/login");
        return;
      }

      setUser(session.user);

      // Reconcile localStorage with Supabase's user_progress (source of
      // truth) before computing anything derived from `completed` below - // otherwise a fresh browser/device shows 0% progress and every lesson
      // as locked, even though the account has real progress on the server.
      //
      // EMERGENCY DATA-RECOVERY PATCH (2026-07-11): a lessons-table resync
      // accidentally cascade-deleted nearly all of user_progress in prod
      // (FK lesson_id -> lessons.id was ON DELETE CASCADE, not documented
      // anywhere in the reconstructed schema file). Supabase's free tier has
      // no backups/PITR, so the only remaining copy of most users' progress
      // is whatever is still sitting in their own browser's localStorage
      // from before the incident. Before this patch, mergeCompletedLessons
      // would have *replaced* that local list with the now-empty server
      // list, permanently destroying it the moment they opened the
      // dashboard. Instead: any lesson id present locally but missing from
      // the server is treated as lost data and re-submitted to
      // user_progress right now, before any merge happens.
      try {
        const serverCompleted = await getCompletedLessons(session.user.id);
        const localCompleted = getProgress().completedLessons;
        const lost = localCompleted.filter((id) => !serverCompleted.includes(id));

        if (lost.length > 0) {
          for (const lessonId of lost) {
            try {
              await markLessonCompleteSupabase(session.user.id, lessonId, 100, 0);
            } catch (restoreError) {
              console.error(`Error restoring lost progress for lesson ${lessonId}:`, restoreError);
            }
          }
          await recalculateUserStats(session.user.id);
          await updateStreak(session.user.id);
          toast.success(`Đã khôi phục ${lost.length} bài học từ dữ liệu trên máy này.`);
          mergeCompletedLessons([...serverCompleted, ...lost]);
        } else {
          mergeCompletedLessons(serverCompleted);
        }
        forceProgressResync((n) => n + 1);
      } catch (error) {
        console.error("Error syncing server progress:", error);
      }

      // Lesson-level unlock grants from approved admin requests (early access
      // to a lesson that would otherwise be locked behind its prerequisite).
      supabase
        .from("user_lesson_unlocks")
        .select("lesson_id")
        .eq("user_id", session.user.id)
        .then(({ data }) => {
          if (data) setUnlockedLessonIds(new Set(data.map((row) => row.lesson_id)));
        });

      // Check if user has completed onboarding. The local flag is checked
      // first and short-circuits the server round trip - it's what actually
      // stops the modal from reappearing on every visit when the
      // user_onboarding table/migration isn't available on this environment
      // (hasCompletedOnboarding fails open to "not onboarded" in that case).
      if (window.localStorage.getItem(ONBOARDING_LOCAL_KEY)) {
        setOnboardingChecked(true);
      } else {
        try {
          const hasOnboarded = await hasCompletedOnboarding(session.user.id);
          setOnboardingChecked(true);

          if (hasOnboarded) {
            window.localStorage.setItem(ONBOARDING_LOCAL_KEY, "1");
          } else {
            setShowOnboarding(true);
          }
        } catch (error) {
          console.error("Error checking onboarding:", error);
          setOnboardingChecked(true);
        }
      }

      // Read the real XP from user_profiles (the same value recalculateUserStats
      // writes and UserProfile/LearningAnalytics display) instead of
      // recomputing it client-side from the local completed-lesson count -
      // that used to produce a third, independent XP number that could
      // disagree with the stats dashboard and profile page.
      try {
        const profile = await getUserProfile(session.user.id);
        setUserXp(profile.total_xp);
      } catch (error) {
        console.error("Error loading user XP:", error);
      }

      // Mock average quiz score
      setAvgQuizScore(75);

      setLoading(false);
    };

    checkAuth();
  }, [router, supabase.auth, completed.length]);


  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-950 flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
          <span className="absolute -inset-1.5 rounded-full border-4 border-emerald-500/70 border-t-transparent animate-spin" />
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image src="/tai-tai-avatar.png" alt="Tài Tài" width={64} height={64} className="w-full h-full object-cover" />
          </div>
        </div>
        <p className="text-stone-500 dark:text-stone-400 font-semibold text-sm flex items-center gap-1.5">
          Đang tải
          <span className="inline-flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        </p>
      </div>
    );
  }

  // Show onboarding if not completed
  if (showOnboarding && onboardingChecked) {
    return (
      <OnboardingFlow
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    );
  }

  const sorted = [...lessonsMeta]
    .filter((l) => l.isVisible !== false)
    .sort((a, b) => a.id - b.id);
  const track = activeTrack === "personal" ? TRACK_PERSONAL : TRACK_PROFESSIONAL;

  // Track-relative lesson numbering: the personal track reuses lesson ids
  // from the 200s (originally written for the professional track) in its
  // own Chặng 2-4, so showing the raw id ("Day 201") right after a "Chặng 1"
  // that only went up to id 20 reads as a broken sequence to a linear
  // learner. Map each lesson to its 1-based position within THIS track's own
  // display order instead, computed with the exact same stage/part filters
  // used to render the list below so the numbers always match what's shown.
  const lessonOrdinal = new Map<number, number>();
  {
    let n = 0;
    for (const stage of track.stages) {
      for (const part of stage.parts) {
        const partLessons = sorted.filter(
          (l) => l.id >= part.days[0] && l.id <= part.days[1] && (!l.track || l.track === activeTrack)
        );
        for (const l of partLessons) {
          n += 1;
          lessonOrdinal.set(l.id, n);
        }
      }
    }
  }

  // Client-side lock check - must stay in sync with lib/lesson-lock-rule.ts.
  // Sequential unlock: first 7 lessons unlocked per stage, rest require previous lesson completed.
  // Note: server-side lesson-locking.ts handles admin unlock grants; this is UI-only.
  const isLessonLocked = (lesson: LessonMeta): boolean => {
    if (lesson.isFundamental) return false;

    const stage = getLessonStage(lesson);

    if (stage === null || stage === 0) return false;

    // All stages: first 7 lessons unlocked, rest require sequential completion
    const stageALL = getLessonsInStage(lesson, sorted).sort((a, b) => a.id - b.id);
    const index = stageALL.findIndex((l) => l.id === lesson.id);

    // First 7: unlocked
    if (index < 7) return false;

    // Beyond 7: require previous lesson completed
    if (index >= 7) {
      const previousLesson = stageALL[index - 1];
      return !completed.includes(previousLesson.id);
    }

    return false;
  };

  const getPrerequisiteLesson = (lesson: LessonMeta): LessonMeta | undefined => {
    const prerequisiteId = lesson.prerequisiteId ?? lesson.id - 1;
    return sorted.find((l) => l.id === prerequisiteId);
  };

  const totalDone = completed.length;
  const totalLessons = sorted.length;

  // Case-study lessons live outside the day-numbered curriculum entirely - // they're real company/topic deep-dives, but with no stage to belong to
  // they were previously only reachable by guessing the URL. Filtered by
  // track (not just id >= 1001) so other high-id ranges - like the advanced
  // professional Chặng 10 - don't get swept in here too.
  const bonusLessons = sorted.filter((l) => l.track === "bonus");
  const bonusDone = bonusLessons.filter((l) => completed.includes(l.id)).length;
  const bonusOpen = openStages.has("bonus");

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      {/* ── Sticky header ── */}
      <div className="border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white dark:bg-stone-950 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex-1 flex items-center gap-2.5">
            <Logo size={32} className="flex-shrink-0" />
            <div>
              <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Tự Học Tài Chính</h1>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Chọn lộ trình phù hợp với bạn</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <div className="text-xl font-bold text-stone-900 dark:text-stone-100">{totalDone}</div>
              <div className="text-xs text-stone-500 dark:text-stone-400">/ {totalLessons} bài đã học</div>
            </div>
            <div data-tour="free-docs" className="flex items-center gap-6">
              <Link
                href="/tai-lieu"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900 rounded-lg px-3 py-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                Tài liệu miễn phí
              </Link>
              <Link
                href="/analytics"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 rounded-lg px-3 py-1.5 transition-colors"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Thống kê
              </Link>
              {/* Mobile-only menu toggle - the two links above are hidden
                  below the `sm` breakpoint with no other way to reach them
                  besides the avatar dropdown, which doesn't visually read as
                  "there's more navigation here" on a first visit. */}
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors"
                aria-label="Mở menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
            <UserProfile />
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-stone-200 dark:border-stone-800 px-6 py-3 space-y-2 bg-white dark:bg-stone-950">
            <div className="text-sm text-stone-500 dark:text-stone-400 pb-1">
              {totalDone} / {totalLessons} bài đã học
            </div>
            <Link
              href="/tai-lieu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg px-3 py-2.5"
            >
              <FileText className="w-4 h-4" />
              Tài liệu miễn phí
            </Link>
            <Link
              href="/analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-bold text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 rounded-lg px-3 py-2.5"
            >
              <BarChart3 className="w-4 h-4" />
              Thống kê
            </Link>
          </div>
        )}
      </div>

      <div className="px-6 py-8">
        {/* ── User Stats + Streak (compact row) ── */}
        <div data-tour="user-stats" className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <UserStats
              xp={userXp}
              lessonsCompleted={totalDone}
              totalLessons={totalLessons}
              avgQuizScore={avgQuizScore}
            />
          </div>
          <StreakDisplay />
        </div>

        {/* ── Resume Learning Button ── */}
        <div data-tour="resume-learning" className="max-w-6xl mx-auto mb-8">
          <ResumeLearningButton activeTrack={activeTrack} />
        </div>

        {/* ── Main Content: Lessons + Leaderboard ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Lessons (2 columns on desktop) */}
          <div className="lg:col-span-2">
          {/* Track selector - Compact */}
          <div data-tour="track-selector" className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {[TRACK_PERSONAL, TRACK_PROFESSIONAL].map((t) => {
            const isActive = activeTrack === t.id;
            return (
              <div key={t.id} className="relative group">
                <button
                  onClick={() => setActiveTrack(t.id as "personal" | "professional")}
                  className={`w-full text-left rounded-xl border-2 px-5 py-4 transition-all ${
                    isActive
                      ? "border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                      : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-600"
                  }`}
                >
                  <div className={`text-base font-bold ${isActive ? "text-white dark:text-stone-900" : "text-stone-900 dark:text-stone-100"}`}>
                    {t.title}
                  </div>
                  <div className={`text-xs mt-0.5 ${isActive ? "text-stone-300 dark:text-stone-600" : "text-stone-500 dark:text-stone-400"}`}>
                    ~{t.estimatedHours} giờ học
                  </div>
                  {/* Hover only works on pointer devices - phones get the same
                      description inline instead, since there's no hover to
                      reveal it on tap. */}
                  <div className={`sm:hidden text-xs mt-2 leading-snug ${isActive ? "text-stone-300 dark:text-stone-600" : "text-stone-500 dark:text-stone-400"}`}>
                    {t.description}
                  </div>
                </button>

                {/* Hover Tooltip (pointer devices only) */}
                <div className="absolute bottom-full left-0 sm:left-1/2 sm:-translate-x-1/2 mb-3 hidden sm:group-hover:block z-50 w-max max-w-xs">
                  <div className="bg-stone-900 dark:bg-stone-800 text-white rounded-xl px-4 py-3 shadow-lg border border-stone-800 dark:border-stone-700">
                    <p className="text-sm font-bold mb-2">{t.description}</p>
                    <div className="space-y-1 text-xs text-stone-300">
                      {t.pillars.map((pillar) => (
                        <div key={pillar} className="flex gap-2">
                          <span>•</span>
                          <span>{pillar}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-stone-900 dark:border-t-stone-800" />
                </div>
              </div>
            );
          })}
        </div>

          {/* ── Stages + lessons ── */}
          <div data-tour="stage-list" className="space-y-6 mt-8">
          {track.stages.map((stage) => {
            const stageLessons = sorted.filter(
              (l) => l.id >= stage.days[0] && l.id <= stage.days[1] && (!l.track || l.track === activeTrack)
            );
            const stageDone = stageLessons.filter((l) => completed.includes(l.id)).length;
            const stageLockedCount = stageLessons.filter((l) => isLessonLocked(l)).length;
            const stageKey = `${activeTrack}-${stage.label}`;
            const stageOpen = openStages.has(stageKey);

            return (
              <div key={stage.label}>
                {/* Stage header - click to expand/collapse */}
                <button
                  onClick={() => toggleStage(stageKey)}
                  className="w-full flex items-baseline gap-4 mb-4 cursor-pointer text-left"
                >
                  <span className="text-xs font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-lg">
                    {stage.label}
                  </span>
                  <span className="text-lg font-extrabold text-stone-900 dark:text-stone-100" role="heading" aria-level={2}>{stage.name}</span>
                  {stage.available && stageLockedCount > 0 && (
                    <span className="flex items-center gap-1 text-xs font-bold text-stone-500 dark:text-stone-400">
                      <Lock className="w-3 h-3" />
                      {stageLockedCount} khoá
                    </span>
                  )}
                  {stage.available && stageLessons.length > 0 && (
                    <span className="ml-auto text-base font-bold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 px-4 py-1 rounded-lg">
                      {stageDone}/{stageLessons.length}
                    </span>
                  )}
                  <span className={`text-stone-500 dark:text-stone-400 text-sm transition-transform ${stageOpen ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>

                {/* Not available yet - with lock and loading animation */}
                {stageOpen && !stage.available && (
                  <div className="border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-xl px-5 py-6 text-center bg-stone-50 dark:bg-stone-900/50 relative overflow-hidden">
                    {/* Animated building background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-200 dark:via-stone-800 to-transparent opacity-30 animate-pulse" />

                    {/* Lock icon */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-stone-200 dark:bg-stone-700 flex items-center justify-center animate-bounce">
                        <svg className="w-6 h-6 text-stone-600 dark:text-stone-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1C6.48 1 2 5.48 2 11v10c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V11c0-5.52-4.48-10-10-10zm0 2c4.41 0 8 3.59 8 8v2H4v-2c0-4.41 3.59-8 8-8zm-3 13h6v2H9z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-stone-600 dark:text-stone-400 text-sm font-extrabold">Chặng này bị khoá</p>
                        <p className="text-stone-500 dark:text-stone-400 text-xs mt-1">Hoàn thành chặng trước để mở</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Available but no lessons in DB yet - with building animation */}
                {stageOpen && stage.available && stageLessons.length === 0 && (
                  <div className="border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-xl px-5 py-6 text-center bg-emerald-50 dark:bg-emerald-950/50 relative overflow-hidden">
                    {/* Animated construction bars */}
                    <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20">
                      <div className="w-1 bg-stone-400 rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0s' }} />
                      <div className="w-1 bg-stone-400 rounded-full animate-pulse" style={{ height: '28px', animationDelay: '0.2s' }} />
                      <div className="w-1 bg-stone-400 rounded-full animate-pulse" style={{ height: '24px', animationDelay: '0.4s' }} />
                      <div className="w-1 bg-stone-400 rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0.6s' }} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="text-3xl animate-bounce">🏗️</div>
                      <p className="text-stone-600 dark:text-stone-400 text-sm font-extrabold">Đang xây dựng</p>
                      <p className="text-stone-500 dark:text-stone-400 text-xs">Bài học sắp được hoàn thiện</p>
                    </div>
                  </div>
                )}

                {/* Parts (sub-stages) - each its own collapsible accordion */}
                {stageOpen && stage.available && stageLessons.length > 0 && (
                  <div className="space-y-3">
                    {stage.parts.map((part) => {
                      const partLessons = sorted.filter(
                        (l) => l.id >= part.days[0] && l.id <= part.days[1] && (!l.track || l.track === activeTrack)
                      );
                      if (partLessons.length === 0) return null;
                      const partDone = partLessons.filter((l) => completed.includes(l.id)).length;
                      const partLockedCount = partLessons.filter((l) => isLessonLocked(l)).length;
                      const partKey = `${stageKey}-${part.name}`;
                      const partOpen = openParts.has(partKey);

                      return (
                        <div key={part.name} className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
                          <button
                            onClick={() => togglePart(partKey)}
                            className="w-full flex items-center gap-3 px-5 py-3.5 bg-stone-50 dark:bg-stone-900/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer text-left"
                          >
                            <span className="font-bold text-stone-800 dark:text-stone-300 text-sm">{part.name}</span>
                            <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                              Bài {lessonOrdinal.get(partLessons[0].id)}-{lessonOrdinal.get(partLessons[partLessons.length - 1].id)}
                            </span>
                            {partLockedCount > 0 && (
                              <span className="flex items-center gap-1 text-xs font-bold text-stone-500 dark:text-stone-400">
                                <Lock className="w-3 h-3" />
                                {partLockedCount}
                              </span>
                            )}
                            <span className="ml-auto text-sm font-bold text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-900 px-3 py-0.5 rounded-lg border border-stone-200 dark:border-stone-800">
                              {partDone}/{partLessons.length}
                            </span>
                            <span className={`text-stone-500 dark:text-stone-400 text-sm transition-transform ${partOpen ? "rotate-180" : ""}`}>
                              ▾
                            </span>
                          </button>

                          {partOpen && (
                            <div className="p-2 space-y-2">
                              {partLessons.map((lesson) => {
                                const isDone = completed.includes(lesson.id);
                                const locked = isLessonLocked(lesson);

                                if (locked) {
                                  return (
                                    <button
                                      key={lesson.id}
                                      onClick={() => setUnlockModalLesson(lesson)}
                                      className="w-full text-left block rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                      <div className="flex items-center gap-4 px-6 py-5">
                                        <div className="w-12 flex-shrink-0 text-center">
                                          <span className="font-mono text-sm font-extrabold text-stone-400 dark:text-stone-600">
                                            {String(lessonOrdinal.get(lesson.id) ?? lesson.id).padStart(3, "0")}
                                          </span>
                                        </div>
                                        <div className="flex-shrink-0">
                                          <div className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
                                            <Lock className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                                          </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="text-base font-bold leading-snug text-stone-500 dark:text-stone-500">
                                            {lesson.title}
                                          </div>
                                          <div className="text-sm mt-1 truncate text-stone-400 dark:text-stone-600">
                                            Yêu cầu hoàn thành bài trước - nhấn để nhắn admin mở khoá
                                          </div>
                                        </div>
                                      </div>
                                    </button>
                                  );
                                }

                                return (
                                  <Link
                                    key={lesson.id}
                                    href={`/bai-hoc/${lesson.slug}`}
                                    className={`block rounded-xl border-2 transition-all ${
                                      isDone
                                        ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900 hover:border-emerald-300 dark:hover:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-950"
                                        : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800"
                                    }`}
                                  >
                                    <div className="flex items-center gap-4 px-6 py-5">
                                      {/* Day number */}
                                      <div className="w-12 flex-shrink-0 text-center">
                                        <span className={`font-mono text-sm font-extrabold ${isDone ? "text-emerald-600 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"}`}>
                                          {String(lesson.id).padStart(3, "0")}
                                        </span>
                                      </div>

                                      {/* Status circle */}
                                      <div className="flex-shrink-0">
                                        {isDone ? (
                                          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-white" />
                                          </div>
                                        ) : (
                                          <div className="w-6 h-6 rounded-full border-3 border-stone-300 dark:border-stone-700" />
                                        )}
                                      </div>

                                      {/* Title + subtitle */}
                                      <div className="flex-1 min-w-0">
                                        <div className={`text-base font-bold leading-snug ${isDone ? "text-emerald-900 dark:text-emerald-400" : "text-stone-900 dark:text-stone-100"}`}>
                                          {lesson.title}
                                        </div>
                                        <div className={`text-sm mt-1 truncate ${isDone ? "text-emerald-700 dark:text-emerald-400" : "text-stone-600 dark:text-stone-400"}`}>
                                          {lesson.subtitle}
                                        </div>
                                      </div>

                                      {/* Meta */}
                                      <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                                        <span className={`text-sm font-semibold ${isDone ? "text-emerald-700 dark:text-emerald-400" : "text-stone-600 dark:text-stone-400"}`}>
                                          {lesson.duration}
                                        </span>
                                        <span className={`text-sm font-bold rounded-lg px-3 py-1 ${
                                          isDone
                                            ? "bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-300"
                                            : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                                        }`}>
                                          {isDone ? "Xong" : lesson.difficulty}
                                        </span>
                                      </div>

                                      <div className={`flex-shrink-0 text-lg font-bold ${isDone ? "text-emerald-600 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"}`}>
                                        ›
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          </div>

          {/* Case chuyên sâu - real company/topic deep-dives outside the day curriculum */}
          {bonusLessons.length > 0 && (
            <div className="mt-6">
              <button
                onClick={() => toggleStage("bonus")}
                className="w-full flex items-baseline gap-4 mb-4 cursor-pointer text-left"
              >
                <span className="text-xs font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-lg">
                  Bonus
                </span>
                <span className="text-lg font-extrabold text-stone-900 dark:text-stone-100" role="heading" aria-level={2}>Case chuyên sâu</span>
                <span className="ml-auto text-base font-bold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 px-4 py-1 rounded-lg">
                  {bonusDone}/{bonusLessons.length}
                </span>
                <span className={`text-stone-400 dark:text-stone-500 text-sm transition-transform ${bonusOpen ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>

              {bonusOpen && (
                <div className="space-y-2">
                  {bonusLessons.map((lesson) => {
                    const isDone = completed.includes(lesson.id);
                    const locked = isLessonLocked(lesson);

                    if (locked) {
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setUnlockModalLesson(lesson)}
                          className="w-full text-left block rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <div className="flex items-center gap-4 px-6 py-4">
                            <div className="flex-shrink-0">
                              <div className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
                                <Lock className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-base font-bold leading-snug text-stone-500 dark:text-stone-500">
                                {lesson.title}
                              </div>
                              <div className="text-sm mt-0.5 truncate text-stone-400 dark:text-stone-600">
                                Yêu cầu hoàn thành bài trước - nhấn để nhắn admin mở khoá
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={lesson.id}
                        href={`/bai-hoc/${lesson.slug}`}
                        className={`block rounded-xl border-2 transition-all ${
                          isDone
                            ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900 hover:border-emerald-300 dark:hover:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-950"
                            : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800"
                        }`}
                      >
                        <div className="flex items-center gap-4 px-6 py-4">
                          <div className="flex-shrink-0">
                            {isDone ? (
                              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full border-2 border-stone-300 dark:border-stone-700" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-base font-bold leading-snug ${isDone ? "text-emerald-900 dark:text-emerald-400" : "text-stone-900 dark:text-stone-100"}`}>
                              {lesson.title}
                            </div>
                            <div className={`text-sm mt-0.5 truncate ${isDone ? "text-emerald-700 dark:text-emerald-400" : "text-stone-600 dark:text-stone-400"}`}>
                              {lesson.subtitle}
                            </div>
                          </div>
                          <div className={`flex-shrink-0 text-lg font-bold ${isDone ? "text-emerald-600 dark:text-emerald-400" : "text-stone-400 dark:text-stone-500"}`}>
                            ›
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          </div>

          {/* Right: Leaderboard (1 column on desktop, full width on mobile) */}
          <div className="lg:col-span-1">
            <Leaderboard userId={user?.id} />
          </div>
        </div>
      </div>

      {/* Admin Chat */}
      <ChatWithAdminWidget />

      {/* One-time spotlight walkthrough for brand-new users */}
      <DashboardTour userId={user?.id} />

      {/* Unlock request modal - shown when clicking a locked lesson */}
      {unlockModalLesson && user?.id && (
        <UnlockRequestModal
          userId={user.id}
          lesson={unlockModalLesson}
          prerequisiteLesson={getPrerequisiteLesson(unlockModalLesson)}
          onClose={() => setUnlockModalLesson(null)}
        />
      )}
    </div>
  );
}
