"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, Lock, CheckCheck, Bookmark } from "lucide-react";
import { useProgress } from "@/lib/client-hooks";
import { mergeCompletedLessons } from "@/lib/progress";
import { getCompletedLessons } from "@/lib/supabase-progress";
import type { Difficulty } from "@/lib/lesson-types";
import { createClient } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import UserStats from "@/components/UserStats";
import ChatWithAdminWidget from "@/components/ChatWithAdminWidget";
import LessonAppealModal from "@/components/LessonAppealModal";
import OnboardingFlow from "@/components/OnboardingFlow";
import ResumeLearningButton from "@/components/ResumeLearningButton";
import StreakReminderManager from "@/components/StreakReminderManager";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import DashboardTour from "@/components/DashboardTour";
import Leaderboard from "@/components/Leaderboard";
import DashboardRecommendations from "@/components/DashboardRecommendations";
import MistakeReviewWidget from "@/components/MistakeReviewWidget";
import DailyQuestsWidget from "@/components/DailyQuestsWidget";
import LessonRecallWidget from "@/components/LessonRecallWidget";
import SmartRemediationWidget from "@/components/SmartRemediationWidget";
import { hasCompletedOnboarding, completeOnboarding } from "@/lib/supabase-onboarding";
import { getUserProfile, recalculateUserStats } from "@/lib/supabase-user";
import UnlockRequestModal from "@/components/UnlockRequestModal";
import KnowledgeChallengeModal from "@/components/KnowledgeChallengeModal";
import StageMilestoneExamModal from "@/components/StageMilestoneExamModal";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL, isLessonInRange } from "@/lib/track-stages";
import { BONUS_CATEGORIES, BONUS_CATEGORY_ORDER } from "@/lib/bonus-lesson-categories";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";
import { TRACKS } from "@/lib/tracks";
import CfaTrackView from "@/components/CfaTrackView";
import { getChallengePassedLessonIds } from "@/lib/supabase-challenges";
import { addLessonFlag, getUserLessonFlags, removeLessonFlag } from "@/lib/supabase-lesson-flags";
import { getUserBookmarks, type LessonBookmark } from "@/lib/supabase-bookmarks";
import { useRoutePrefetch } from "@/lib/use-route-prefetch";
import { getPassedMilestones, savePassedMilestone, type MilestoneCompletion } from "@/lib/supabase-milestones";

const STAGE_THEMES: Record<string, { emoji: string; bg: string; text: string; barColor: string }> = {
  // All stages use the clean neutral Stone color theme of Stage 0
  "personal-Chặng 0": { emoji: "🔍", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "personal-Chặng 1": { emoji: "🧠", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "personal-Chặng 2": { emoji: "📈", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "personal-Chặng 3": { emoji: "💼", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "personal-Chặng 4": { emoji: "📊", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "personal-Chặng 5": { emoji: "🔬", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "personal-Chặng 6": { emoji: "🛡️", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  // Professional Track Stages
  "professional-Chặng 1": { emoji: "📖", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "professional-Chặng 2": { emoji: "📊", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "professional-Chặng 3": { emoji: "🧮", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "professional-Chặng 4": { emoji: "💵", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "professional-Chặng 5": { emoji: "🎯", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "professional-Chặng 6": { emoji: "🛡️", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
};

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
  const [activeTrack, setActiveTrackState] = useState<"personal" | "professional" | "cfa">(() => {
    if (typeof window === "undefined") return "personal";
    const saved = window.localStorage.getItem("activeTrack");
    return saved === "personal" || saved === "professional" || saved === "cfa" ? saved : "personal";
  });
  const [lastNonCfaTrack, setLastNonCfaTrack] = useState<"personal" | "professional">(() => {
    if (typeof window === "undefined") return "personal";
    const saved = window.localStorage.getItem("activeTrack");
    return saved === "professional" ? "professional" : "personal";
  });
  const setActiveTrack = (track: "personal" | "professional" | "cfa") => {
    setActiveTrackState(track);
    if (track !== "cfa") {
      setLastNonCfaTrack(track);
    }
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
  const [challengePassedIds, setChallengePassedIds] = useState<Set<number>>(new Set());
  const [unlockModalLesson, setUnlockModalLesson] = useState<LessonMeta | null>(null);
  const [challengeGateLesson, setChallengeGateLesson] = useState<LessonMeta | null>(null);
  const [showChallenge, setShowChallenge] = useState(false);
  const [flaggedLessonIds, setFlaggedLessonIds] = useState<Set<number>>(new Set());
  const [bookmarks, setBookmarks] = useState<LessonBookmark[]>([]);
  const [flagSelectionMode, setFlagSelectionMode] = useState(false);
  const [selectedFlagLessonIds, setSelectedFlagLessonIds] = useState<Set<number>>(new Set());
  const [flagSaving, setFlagSaving] = useState(false);
  const [manualFlagInfoOpen, setManualFlagInfoOpen] = useState(false);
  const [appealTarget, setAppealTarget] = useState<{ id: number; slug: string; title: string } | null>(null);
  const [passedMilestones, setPassedMilestones] = useState<MilestoneCompletion[]>([]);
  const [activeMilestoneExam, setActiveMilestoneExam] = useState<{ label: string; name: string; lessonIds: number[] } | null>(null);

  useRoutePrefetch(["/analytics", "/ghi-chu", "/kiem-tra", "/tai-lieu", "/ban-be", "/profile", "/settings", "/cfa"]);

  useEffect(() => {
    if (!manualFlagInfoOpen) return;
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("[data-manual-flag-info-root]")) {
        setManualFlagInfoOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [manualFlagInfoOpen]);

  // Nudge learners toward the knowledge-review challenge automatically, at
  // most once per calendar day, once they've actually completed enough
  // lessons for a randomized quiz to be worth running. Never fires more
  // than once per day per browser (tracked in localStorage) so it reads as
  // a friendly surprise rather than an every-visit interruption. Re-checked
  // right before opening (not just when the effect first ran) so it never
  // pops up on top of a gate challenge the learner is already mid-way
  // through after clicking a locked lesson.
  useEffect(() => {
    if (loading || completed.length < 5 || typeof window === "undefined") return;
    const today = new Date().toDateString();
    const lastShown = window.localStorage.getItem("thtcdn_challenge_last_shown");
    if (lastShown === today) return;
    const timer = setTimeout(() => {
      setChallengeGateLesson((gate) => {
        if (gate) return gate; // don't steal focus from an in-progress gate challenge
        window.localStorage.setItem("thtcdn_challenge_last_shown", today);
        setShowChallenge(true);
        return gate;
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, [loading, completed.length]);

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
      // truth) before computing anything derived from `completed` below.
      // localStorage is only a client-side cache / offline hint - never a
      // trusted source for restoring authoritative completion back onto the
      // account, because the learner can edit it freely in the browser.
      try {
        const serverCompleted = await getCompletedLessons(session.user.id);
        mergeCompletedLessons(serverCompleted);
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

      // Lessons unlocked by passing their gate challenge (see isChallengeGated).
      getChallengePassedLessonIds(session.user.id)
        .then((ids) => setChallengePassedIds(new Set(ids)))
        .catch((error) => console.error("Error loading challenge passes:", error));

      getUserLessonFlags(session.user.id)
        .then((flags) => setFlaggedLessonIds(new Set(flags.map((flag) => flag.lesson_id))))
        .catch((error) => console.error("Error loading lesson flags:", error));

      getUserBookmarks(session.user.id)
        .then((saved) => setBookmarks(saved.slice(0, 6)))
        .catch((error) => console.error("Error loading lesson bookmarks:", error));

      getPassedMilestones(session.user.id, activeTrack)
        .then((milestones) => setPassedMilestones(milestones))
        .catch((error) => console.error("Error loading milestones:", error));

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

      // Self-heals total_xp on every dashboard visit instead of trusting
      // whatever user_profiles.total_xp currently holds. recalculateUserStats
      // is normally called right after a lesson completes, but that call is
      // best-effort (a network blip or transient error just gets logged, not
      // retried - the completion itself still saved fine) - so a user could
      // legitimately have N completed lessons in user_progress while
      // total_xp reflects an earlier, smaller N forever, with nothing to
      // ever reconcile the two. Reported by users as "đã học xong 26 bài
      // nhưng chỉ có 110 XP". Recomputing from the real completed-lesson
      // count here, every mount, makes that permanently self-correcting.
      try {
        const stats = await recalculateUserStats(session.user.id);
        setUserXp(stats.total_xp);
      } catch (error) {
        console.error("Error recalculating user XP, falling back to stored value:", error);
        try {
          const profile = await getUserProfile(session.user.id);
          setUserXp(profile.total_xp);
        } catch (fallbackError) {
          console.error("Error loading user XP:", fallbackError);
        }
      }

      // Mock average quiz score
      setAvgQuizScore(75);

      setLoading(false);
    };

    checkAuth();
    // Deliberately mount-only. `completed.length` used to be a dependency
    // here, but this effect itself calls mergeCompletedLessons (via the
    // recovery-patch logic above), which changes completed.length - making
    // the effect re-trigger itself on every mount. Each re-run re-subscribes
    // a fresh onAuthStateChange listener and re-runs the whole reconcile/
    // unlock/onboarding/XP sequence from scratch, which is both wasted work
    // (visible as loading flicker) and another chance for the INITIAL_SESSION
    // race below to resolve unluckily and bounce to /login. checkAuth
    // already re-reads completed progress itself (getProgress()) instead of
    // relying on the closed-over `completed` value, so nothing here actually
    // needs to observe it changing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, supabase.auth]);


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
  const track = activeTrack === "professional" ? TRACK_PROFESSIONAL : TRACK_PERSONAL;
  // Cross-reference view for Track 3 - not a real day-numbered curriculum,
  // just the existing lessons (by id) grouped into the 10 official CFA
  // Level I subjects. See lib/cfa-track.ts.
  const lessonById = new Map(lessonsMeta.map((l) => [l.id, l]));
  const cfaSubjects = CFA_LEVEL_1_SUBJECTS.map((subject) => ({
    subject,
    lessons: subject.lessonIds
      .map((id) => lessonById.get(id))
      .filter((l): l is NonNullable<typeof l> => !!l && l.isVisible !== false),
  }));

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
          (l) => isLessonInRange(l.id, part) && (!l.track || l.track === activeTrack)
        );
        for (const l of partLessons) {
          n += 1;
          lessonOrdinal.set(l.id, n);
        }
      }
    }
  }

  // Client-side lock check - must stay in sync with lib/lesson-lock-rule.ts.
  // Site-wide: lesson locking is disabled for everyone (see
  // lib/lesson-lock-rule.ts and lib/lesson-locking.ts for the matching
  // server-side overrides). This third, independent copy was missed in that
  // pass - it drives the dashboard's own lock icons/badges, so even after
  // the other two were disabled, lessons here still rendered with a lock
  // icon and a "message admin to unlock" prompt despite being fully
  // reachable by direct URL. To re-enable locking, delete this early return
  // (the original sequential-unlock rule is left intact below) and restore
  // isWaitingOnChallenge's body the same way.
  const isLessonLocked = (_lesson: LessonMeta): boolean => {
    return false;
  };

  // A locked lesson is either waiting on its prerequisite (send the
  // "message admin" flow) or waiting on its challenge gate (open the
  // knowledge-check modal instead) - the two need different click handling.
  // Disabled alongside isLessonLocked above; kept as a function (not deleted)
  // since handleLockedLessonClick still calls it, though with locking off
  // that call site is itself unreachable in practice.
  const isWaitingOnChallenge = (_lesson: LessonMeta): boolean => {
    return false;
  };

  const handleLockedLessonClick = (lesson: LessonMeta) => {
    if (isWaitingOnChallenge(lesson)) {
      setShowChallenge(false); // don't stack the daily-nudge popup behind a gate challenge
      setChallengeGateLesson(lesson);
    } else {
      setUnlockModalLesson(lesson);
    }
  };

  const getPrerequisiteLesson = (lesson: LessonMeta): LessonMeta | undefined => {
    const prerequisiteId = lesson.prerequisiteId ?? lesson.id - 1;
    return sorted.find((l) => l.id === prerequisiteId);
  };

  const totalDone = completed.length;
  const totalLessons = sorted.length;

  const toggleFlagSelection = (lessonId: number) => {
    setSelectedFlagLessonIds((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) next.delete(lessonId);
      else next.add(lessonId);
      return next;
    });
  };

  const clearFlagSelection = () => {
    setFlagSelectionMode(false);
    setSelectedFlagLessonIds(new Set());
  };

  const handleSelectableLessonCardClick = (lessonId: number, isDone: boolean) => {
    if (!flagSelectionMode || isDone) return;
    toggleFlagSelection(lessonId);
  };

  const applyManualFlags = async () => {
    if (!user?.id || selectedFlagLessonIds.size === 0) return;

    const targets = sorted.filter((lesson) => selectedFlagLessonIds.has(lesson.id));
    const selectableTargets = targets.filter((lesson) => !completed.includes(lesson.id));
    if (selectableTargets.length === 0) {
      toast.message("Các bài này đã được hệ thống tính tiến độ rồi.");
      clearFlagSelection();
      return;
    }

    const confirmed = window.confirm(
      "Bạn xác nhận đã học các bài này nhé, nhưng sẽ không được nhận kinh nghiệm trừ khi bạn đọc hết và làm hết."
    );
    if (!confirmed) return;

    setFlagSaving(true);
    try {
      const toAdd = selectableTargets.filter((lesson) => !flaggedLessonIds.has(lesson.id));
      const toRemove = selectableTargets.filter((lesson) => flaggedLessonIds.has(lesson.id));

      await Promise.all([
        ...toAdd.map((lesson) => addLessonFlag(user.id!, lesson.id, lesson.slug, lesson.title)),
        ...toRemove.map((lesson) => removeLessonFlag(user.id!, lesson.id)),
      ]);

      setFlaggedLessonIds((prev) => {
        const next = new Set(prev);
        for (const lesson of toAdd) next.add(lesson.id);
        for (const lesson of toRemove) next.delete(lesson.id);
        return next;
      });

      toast.success(
        toRemove.length > 0 && toAdd.length > 0
          ? "Đã cập nhật các đánh dấu đã học."
          : toAdd.length > 0
            ? `Đã đánh dấu ${toAdd.length} bài là bạn đã học.`
            : `Đã bỏ đánh dấu ${toRemove.length} bài.`
      );
      clearFlagSelection();
    } catch (error) {
      console.error("Error applying lesson flags:", error);
      toast.error("Không thể cập nhật đánh dấu. Vui lòng thử lại.");
    } finally {
      setFlagSaving(false);
    }
  };

  // Case-study lessons live outside the day-numbered curriculum entirely - // they're real company/topic deep-dives, but with no stage to belong to
  // they were previously only reachable by guessing the URL. Filtered by
  // track (not just id >= 1001) so other high-id ranges - like the advanced
  // professional Chặng 10 - don't get swept in here too.
  const bonusLessons = sorted.filter((l) => l.track === "bonus");
  const bonusDone = bonusLessons.filter((l) => completed.includes(l.id)).length;
  const bonusOpen = openStages.has("bonus");
  // Grouped by topic (see lib/bonus-lesson-categories.ts) instead of raw id
  // order - otherwise a newly added case study always lands dead last after
  // 30+ unrelated ones, however closely it's actually related to existing
  // cases (e.g. a new valuation case landing after every non-valuation one).
  const bonusGroups = BONUS_CATEGORY_ORDER.map((category) => ({
    category,
    lessons: bonusLessons.filter((l) => (BONUS_CATEGORIES[l.slug] ?? "Khác") === category),
  })).filter((g) => g.lessons.length > 0);

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">


      <div className="px-6 py-8">
        {/* ── Admin -> everyone broadcasts (maintenance, launches, policy
            changes) - shown above the streak/recall reminders since these
            are typically more time-sensitive. ── */}
        {user?.id && <AnnouncementBanner userId={user.id} />}

        {/* ── Streak/recall browser-notification reminders (opt-in banner +
            silent background checks; client-only, no Service Worker) ── */}
        {user?.id && (
          <StreakReminderManager
            userId={user.id}
            nextLessonId={sorted.find((l) => !completed.includes(l.id))?.id}
          />
        )}

        {/* ── Unified Dashboard Grid ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-10 gap-4 sm:gap-6 items-start">
          
          {/* Left Column: Learning Path (7 columns on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Resume Learning Card */}
            <div data-tour="resume-learning">
              <ResumeLearningButton activeTrack={lastNonCfaTrack} />
            </div>

            {/* Daily Quests Widget */}
            {user?.id && (
              <DailyQuestsWidget userId={user.id} />
            )}

            {/* Lesson Recall Scheduler Widget */}
            {user?.id && (
              <LessonRecallWidget userId={user.id} />
            )}

            {/* Mistake Review Alert */}
            {user?.id && (
              <MistakeReviewWidget userId={user.id} />
            )}

            {/* Smart Remediation (Quiz Mistake smart advice) */}
            {user?.id && (
              <SmartRemediationWidget userId={user.id} lessonsMeta={lessonsMeta} />
            )}

            {/* Daily Recommendations */}
            <DashboardRecommendations lessonsMeta={lessonsMeta} completed={completed} />

            {/* Bookmarks Section */}
            {bookmarks.length > 0 && (
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 py-4 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <Bookmark className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-stone-900 dark:text-stone-100">Bài đã lưu</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">Quay lại nhanh những bài bạn muốn đọc tiếp</p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                  >
                    Xem tất cả
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {bookmarks.map((bookmark) => (
                    <Link
                      key={bookmark.id}
                      href={`/bai-hoc/${bookmark.lesson_slug}`}
                      className="group rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-950/30 px-4 py-3 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-white dark:hover:bg-stone-900 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-stone-900 dark:text-stone-100 line-clamp-2">
                            {bookmark.lesson_title}
                          </p>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                            Lưu ngày {new Date(bookmark.created_at).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                        <Bookmark className="w-4 h-4 shrink-0 text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-stone-500 dark:text-stone-400">
              {flagSelectionMode ? `${selectedFlagLessonIds.size} bài đang được chọn để tự đánh dấu` : ""}
            </div>
            <div className="flex items-center gap-2">
              {flagSelectionMode && (
                <>
                  <button
                    onClick={clearFlagSelection}
                    className="px-3 py-2 text-sm font-bold rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={applyManualFlags}
                    disabled={flagSaving || selectedFlagLessonIds.size === 0}
                    className="px-3 py-2 text-sm font-bold rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {flagSaving ? "Đang lưu..." : "Xác nhận đánh dấu"}
                  </button>
                </>
              )}
              <div data-manual-flag-info-root className="relative group">
                <button
                  onClick={() => {
                    if (flagSelectionMode) clearFlagSelection();
                    else setFlagSelectionMode(true);
                  }}
                  className={`px-3 py-2 text-sm font-bold rounded-lg border transition-colors ${
                    flagSelectionMode
                      ? "border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300"
                      : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900"
                  }`}
                >
                  Đánh dấu đã học
                </button>
                <button
                  type="button"
                  onClick={() => setManualFlagInfoOpen((current) => !current)}
                  className="ml-2 inline-flex items-center justify-center rounded-full border border-stone-200 px-2 py-1 text-[11px] font-bold text-stone-500 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:text-stone-400 dark:hover:bg-stone-900"
                  aria-expanded={manualFlagInfoOpen}
                  aria-label="Giải thích cách đánh dấu đã học"
                >
                  ?
                </button>
                <div className={`absolute right-0 top-full z-20 mt-2 w-80 max-w-[90vw] rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 py-3 text-sm text-stone-700 dark:text-stone-300 leading-relaxed shadow-xl origin-top-right transition-all duration-150 space-y-2 ${
                  manualFlagInfoOpen ? "opacity-100 scale-100 pointer-events-auto" : "pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                }`}>
                  <p>
                    Cuộn hết 100% nội dung bài <strong>và</strong> làm xong hết quiz - gồm cả câu hỏi giữa bài (nếu có) lẫn phần &quot;Kiểm tra nhanh&quot; (bài không có quiz thì cuộn hết là tính) → bài chuyển{" "}
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">xanh lá</span> và được cộng XP. Thiếu 1 trong các điều kiện trên thì chưa tính hoàn thành.
                  </p>
                  <p>
                    Chỉ bấm &quot;Tự đánh dấu&quot; vì tự biết mình đã học rồi → bài chuyển{" "}
                    <span className="font-semibold text-sky-600 dark:text-sky-400">xanh dương</span> để ghi nhớ tiến độ, nhưng không được cộng XP.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Track selector - Compact */}
          <div data-tour="track-selector" className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
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

          <button
            onClick={() => setActiveTrack("cfa")}
            className={`w-full text-left rounded-xl border-2 px-5 py-4 transition-all ${
              activeTrack === "cfa"
                ? "border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-600"
            }`}
          >
            <div className={`text-base font-bold ${activeTrack === "cfa" ? "text-white dark:text-stone-900" : "text-stone-900 dark:text-stone-100"}`}>
              Tài chính chứng chỉ
            </div>
            <div className={`text-xs mt-0.5 ${activeTrack === "cfa" ? "text-stone-300 dark:text-stone-600" : "text-stone-500 dark:text-stone-400"}`}>
              CFA Level I · ~{TRACKS.cfa.estimatedHours} giờ học
            </div>
          </button>
        </div>

          {activeTrack === "cfa" ? (
            <div data-tour="stage-list" className="mt-8">
              <CfaTrackView subjects={cfaSubjects} />
            </div>
          ) : (
          <>
          {/* ── Stages + lessons ── */}
          <div data-tour="stage-list" className="space-y-6 mt-8">
          {track.stages.map((stage) => {
            const stageLessons = sorted.filter(
              (l) => isLessonInRange(l.id, stage) && (!l.track || l.track === activeTrack)
            );
            const stageDone = stageLessons.filter((l) => completed.includes(l.id)).length;
            const stageLockedCount = stageLessons.filter((l) => isLessonLocked(l)).length;
            const stageKey = `${activeTrack}-${stage.label}`;
            const stageOpen = openStages.has(stageKey);

            const stageIdx = track.stages.indexOf(stage);
            let isStageLockedByMilestone = false;
            let prevStageLabel = "";
            let prevStageLessonsCount = 0;
            let prevStageDone = 0;
            let prevMilestonePassed = false;
            
            if (stageIdx > 1) {
              const prevStage = track.stages[stageIdx - 1];
              prevStageLabel = prevStage.label;
              const prevStageLessons = sorted.filter(
                (l) => isLessonInRange(l.id, prevStage) && (!l.track || l.track === activeTrack)
              );
              prevStageLessonsCount = prevStageLessons.length;
              prevStageDone = prevStageLessons.filter((l) => completed.includes(l.id)).length;
              
              const isPrevStageCompleted = prevStageLessons.length > 0 && prevStageDone === prevStageLessons.length;
              prevMilestonePassed = passedMilestones.some((m) => m.stage_label === prevStage.label);
              isStageLockedByMilestone = false; // Gỡ khóa bài học theo yêu cầu người dùng, mở hoàn toàn
            }
            const isCurrentMilestonePassed = passedMilestones.some((m) => m.stage_label === stage.label);

            return (
              <div key={stage.label}>
                {/* Stage header - click to expand/collapse */}
                {(() => {
                  const themeKey = `${activeTrack}-${stage.label}`;
                  const theme = STAGE_THEMES[themeKey] || { emoji: "📖", bg: "bg-stone-150 dark:bg-stone-800", text: "text-stone-900 dark:text-stone-100", barColor: "bg-stone-500" };
                  const percent = stageLessons.length ? (stageDone / stageLessons.length) * 100 : 0;
                  return (
                    <button
                      onClick={() => toggleStage(stageKey)}
                      className={`w-full flex items-center gap-3 cursor-pointer text-left flex-wrap sm:flex-nowrap transition-all ${
                        isCurrentMilestonePassed
                          ? "bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02] border border-emerald-500/20 px-4 py-3 rounded-2xl mb-4"
                          : "border-b border-stone-100 dark:border-stone-800/40 pb-3 mb-4"
                      }`}
                    >
                      <span className={`text-xs font-extrabold px-3 py-1.5 rounded-lg flex items-center ${
                        isCurrentMilestonePassed
                          ? "bg-emerald-500 text-white"
                          : `${theme.bg} ${theme.text}`
                      }`}>
                        {stage.label}
                      </span>
                      <span className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100 flex-1 leading-snug">{stage.name}</span>
                      {isCurrentMilestonePassed ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-450 shrink-0 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200/40">
                          🌟 Đã vượt ải
                        </span>
                      ) : isStageLockedByMilestone ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-rose-500 dark:text-rose-400 shrink-0">
                          <Lock className="w-3 h-3" /> Chờ vượt ải
                        </span>
                      ) : (
                        stage.available && stageLockedCount > 0 && (
                          <span className="flex items-center gap-1 text-xs font-bold text-stone-500 dark:text-stone-400 shrink-0">
                            <Lock className="w-3 h-3" />
                            {stageLockedCount} khoá
                          </span>
                        )
                      )}
                      {stage.available && stageLessons.length > 0 && (
                        <div className="flex items-center gap-3 shrink-0 ml-auto sm:ml-0">
                          <div className="w-16 h-1.5 bg-stone-150 dark:bg-stone-800 rounded-full overflow-hidden hidden sm:block">
                            <div className={`h-full ${isCurrentMilestonePassed ? "bg-emerald-500" : theme.barColor}`} style={{ width: `${percent}%` }} />
                          </div>
                          <span className={`text-sm font-bold px-3 py-1 rounded-lg ${
                            isCurrentMilestonePassed
                              ? "text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60"
                              : "text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800"
                          }`}>
                            {stageDone}/{stageLessons.length}
                          </span>
                        </div>
                      )}
                      <span className={`text-sm transition-transform shrink-0 ${
                        isCurrentMilestonePassed
                          ? "text-emerald-500 dark:text-emerald-400"
                          : "text-stone-500 dark:text-stone-400"
                      } ${stageOpen ? "rotate-180" : ""}`}>
                        {isStageLockedByMilestone ? "🔒" : "▾"}
                      </span>
                    </button>
                  );
                })()}

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
                {stageOpen && stage.available && stageLessons.length > 0 && !isStageLockedByMilestone && (
                  <div className="space-y-3">
                    {stage.parts.map((part) => {
                      const partLessons = sorted.filter(
                        (l) => isLessonInRange(l.id, part) && (!l.track || l.track === activeTrack)
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
                                const isFlagged = flaggedLessonIds.has(lesson.id);
                                const isSelectedForFlag = selectedFlagLessonIds.has(lesson.id);

                                if (locked) {
                                  return (
                                    <button
                                      key={lesson.id}
                                      onClick={() => handleLockedLessonClick(lesson)}
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
                                            {isWaitingOnChallenge(lesson)
                                              ? "🎯 Vượt qua thử thách kiến thức để mở khoá"
                                              : "Yêu cầu hoàn thành bài trước - nhấn để nhắn admin mở khoá"}
                                          </div>
                                        </div>
                                      </div>
                                    </button>
                                  );
                                }

                                return (
                                  <div
                                    key={lesson.id}
                                    onClick={() => handleSelectableLessonCardClick(lesson.id, isDone)}
                                    className={`block rounded-xl border-2 transition-all ${
                                      isDone
                                        ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900 hover:border-emerald-300 dark:hover:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-950"
                                        : isSelectedForFlag
                                          ? "bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800"
                                          : isFlagged
                                            ? "bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-900 hover:border-sky-300 dark:hover:border-sky-800"
                                            : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800"
                                    }`}
                                  >
                                    <div className="flex items-center gap-4 px-6 py-5">
                                      {/* Day number */}
                                      <div className="w-12 flex-shrink-0 text-center">
                                        <span className={`font-mono text-sm font-extrabold ${isDone ? "text-emerald-600 dark:text-emerald-400" : isFlagged ? "text-sky-600 dark:text-sky-400" : "text-stone-500 dark:text-stone-400"}`}>
                                          {String(lesson.id).padStart(3, "0")}
                                        </span>
                                      </div>

                                      {/* Status circle */}
                                      <div className="flex-shrink-0">
                                        {isDone ? (
                                          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-white" />
                                          </div>
                                        ) : isFlagged ? (
                                          <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center">
                                            <CheckCheck className="w-4 h-4 text-white" />
                                          </div>
                                        ) : (
                                          <div className="w-6 h-6 rounded-full border-3 border-stone-300 dark:border-stone-700" />
                                        )}
                                      </div>

                                      {/* Title + subtitle */}
                                      <Link
                                        href={`/bai-hoc/${lesson.slug}`}
                                        onClick={(event) => {
                                          if (flagSelectionMode) {
                                            event.stopPropagation();
                                          }
                                        }}
                                        className="flex-1 min-w-0 block"
                                      >
                                        <div className={`text-base font-bold leading-snug ${isDone ? "text-emerald-900 dark:text-emerald-400" : isFlagged ? "text-sky-900 dark:text-sky-300" : "text-stone-900 dark:text-stone-100"}`}>
                                          {lesson.title}
                                        </div>
                                        <div className={`text-sm mt-1 truncate ${isDone ? "text-emerald-700 dark:text-emerald-400" : isFlagged ? "text-sky-700 dark:text-sky-400" : "text-stone-600 dark:text-stone-400"}`}>
                                          {isFlagged ? "Bạn đã tự đánh dấu đã học bài này" : lesson.subtitle}
                                        </div>
                                      </Link>

                                      {flagSelectionMode && !isDone && (
                                        <button
                                          type="button"
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            toggleFlagSelection(lesson.id);
                                          }}
                                          className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ${
                                            isSelectedForFlag
                                              ? "border-sky-500 bg-sky-500 text-white"
                                              : "border-stone-300 dark:border-stone-700 text-transparent"
                                          }`}
                                          aria-label="Chọn để tự đánh dấu đã học"
                                        >
                                          <CheckCheck className="w-3.5 h-3.5" />
                                        </button>
                                      )}

                                      {/* Meta */}
                                      <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                                        <span className={`text-sm font-semibold ${isDone ? "text-emerald-700 dark:text-emerald-400" : isFlagged ? "text-sky-700 dark:text-sky-400" : "text-stone-600 dark:text-stone-400"}`}>
                                          {lesson.duration}
                                        </span>
                                        <span className={`text-sm font-bold rounded-lg px-3 py-1 ${
                                          isDone
                                            ? "bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-300"
                                            : isFlagged
                                              ? "bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300"
                                            : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                                        }`}>
                                          {isDone ? "Xong" : isFlagged ? "Tự đánh dấu" : lesson.difficulty}
                                        </span>
                                        {isFlagged && !isDone && (
                                          <button
                                            type="button"
                                            onClick={(event) => {
                                              event.stopPropagation();
                                              event.preventDefault();
                                              setAppealTarget({ id: lesson.id, slug: lesson.slug, title: lesson.title });
                                            }}
                                            className="text-xs font-bold text-stone-400 dark:text-stone-500 hover:text-sky-600 dark:hover:text-sky-400 underline underline-offset-2"
                                          >
                                            Khiếu nại
                                          </button>
                                        )}
                                      </div>

                                      <div className={`flex-shrink-0 text-lg font-bold ${isDone ? "text-emerald-600 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"}`}>
                                        ›
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Milestone Exam Banner (if current stage is completed but milestone is not passed) */}
                {stageOpen && stage.available && stageLessons.length > 0 && !isStageLockedByMilestone && stageDone === stageLessons.length && !passedMilestones.some((m) => m.stage_label === stage.label) && (
                  <div className="mt-4 p-5 rounded-2xl border border-amber-350 bg-amber-500/[0.04] dark:border-amber-950/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                        🏆 Đã đủ điều kiện Thi Vượt Ải {stage.label}
                      </h4>
                      <p className="text-[10px] text-stone-500 dark:text-stone-405 mt-1 leading-relaxed">
                        Chúc mừng bạn đã học xong tất cả bài học trong chặng này! Hãy vượt qua bài thi trắc nghiệm cột mốc (15 câu) để nhận <strong>+50 XP</strong> và mở khóa chặng sau.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveMilestoneExam({
                        label: stage.label,
                        name: stage.name,
                        lessonIds: stageLessons.map((l) => l.id)
                      })}
                      className="px-4 py-2 text-xs font-extrabold bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-[0_4px_10px_-2px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                    >
                      Bắt đầu thi 🏆
                    </button>
                  </div>
                )}

                {/* Locked Stage Banner (if stage is locked by previous stage milestone) */}
                {stageOpen && stage.available && isStageLockedByMilestone && (
                  <div className="border-2 border-dashed border-rose-200/60 dark:border-rose-950/40 rounded-2xl px-5 py-8 text-center bg-rose-500/[0.02] relative overflow-hidden">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-rose-55 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center animate-pulse">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-stone-900 dark:text-stone-100 text-sm font-extrabold">Chặng này đang bị khoá 🔒</p>
                        <p className="text-stone-500 dark:text-stone-400 text-xs mt-1 max-w-xs mx-auto leading-relaxed">
                          Bạn cần hoàn thành toàn bộ bài học và vượt qua <strong>Kỳ thi Vượt ải {prevStageLabel}</strong> để mở khoá chặng tiếp theo!
                        </p>
                      </div>
                    </div>
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
                <div className="space-y-5">
                  {bonusGroups.map((group) => (
                  <div key={group.category} className="space-y-2">
                    <div className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest px-1">
                      {group.category}
                    </div>
                  {group.lessons.map((lesson) => {
                    const isDone = completed.includes(lesson.id);
                    const locked = isLessonLocked(lesson);
                    const isFlagged = flaggedLessonIds.has(lesson.id);
                    const isSelectedForFlag = selectedFlagLessonIds.has(lesson.id);

                    if (locked) {
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleLockedLessonClick(lesson)}
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
                                {isWaitingOnChallenge(lesson)
                                  ? "🎯 Vượt qua thử thách kiến thức để mở khoá"
                                  : "Yêu cầu hoàn thành bài trước - nhấn để nhắn admin mở khoá"}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    }

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => handleSelectableLessonCardClick(lesson.id, isDone)}
                        className={`block rounded-xl border-2 transition-all ${
                          isDone
                            ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900 hover:border-emerald-300 dark:hover:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-950"
                            : isSelectedForFlag
                              ? "bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800"
                              : isFlagged
                                ? "bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-900 hover:border-sky-300 dark:hover:border-sky-800"
                            : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800"
                        }`}
                      >
                        <div className="flex items-center gap-4 px-6 py-4">
                          <div className="flex-shrink-0">
                            {isDone ? (
                              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              </div>
                            ) : isFlagged ? (
                              <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center">
                                <CheckCheck className="w-4 h-4 text-white" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full border-2 border-stone-300 dark:border-stone-700" />
                            )}
                          </div>
                          <Link
                            href={`/bai-hoc/${lesson.slug}`}
                            onClick={(event) => {
                              if (flagSelectionMode) {
                                event.stopPropagation();
                              }
                            }}
                            className="flex-1 min-w-0 block"
                          >
                            <div className={`text-base font-bold leading-snug ${isDone ? "text-emerald-900 dark:text-emerald-400" : isFlagged ? "text-sky-900 dark:text-sky-300" : "text-stone-900 dark:text-stone-100"}`}>
                              {lesson.title}
                            </div>
                            <div className={`text-sm mt-0.5 truncate ${isDone ? "text-emerald-700 dark:text-emerald-400" : isFlagged ? "text-sky-700 dark:text-sky-400" : "text-stone-600 dark:text-stone-400"}`}>
                              {isFlagged ? "Bạn đã tự đánh dấu đã học bài này" : lesson.subtitle}
                            </div>
                          </Link>
                          {flagSelectionMode && !isDone && (
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                toggleFlagSelection(lesson.id);
                              }}
                              className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ${
                                isSelectedForFlag
                                  ? "border-sky-500 bg-sky-500 text-white"
                                  : "border-stone-300 dark:border-stone-700 text-transparent"
                              }`}
                              aria-label="Chọn để tự đánh dấu đã học"
                            >
                              <CheckCheck className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <div className={`flex-shrink-0 text-lg font-bold ${isDone ? "text-emerald-600 dark:text-emerald-400" : "text-stone-400 dark:text-stone-500"}`}>
                            ›
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                  ))}
                </div>
              )}
            </div>
          )}
          </>
          )}
          </div>

          {/* Right: Sidebar User Stats & Leaderboard (3 columns on desktop grid of 10, full width on mobile) */}
          <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-6">
            <div data-tour="user-stats">
              <UserStats
                xp={userXp}
                lessonsCompleted={totalDone}
                totalLessons={totalLessons}
                avgQuizScore={avgQuizScore}
                userId={user?.id}
                sidebar={true}
              />
            </div>
            <Leaderboard userId={user?.id} />
          </div>
        </div>
      </div>

      {/* Admin Chat */}
      <ChatWithAdminWidget />

      {appealTarget && user?.id && (
        <LessonAppealModal userId={user.id} lesson={appealTarget} onClose={() => setAppealTarget(null)} />
      )}

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

      {showChallenge && <KnowledgeChallengeModal onClose={() => setShowChallenge(false)} />}

      {challengeGateLesson && user?.id && (
        <KnowledgeChallengeModal
          onClose={() => setChallengeGateLesson(null)}
          gate={{
            lessonId: challengeGateLesson.id,
            lessonSlug: challengeGateLesson.slug,
            lessonTitle: challengeGateLesson.title,
            userId: user.id,
          }}
          onPassed={() => {
            setChallengePassedIds((prev) => new Set(prev).add(challengeGateLesson.id));
            router.push(`/bai-hoc/${challengeGateLesson.slug}`);
            setChallengeGateLesson(null);
          }}
        />
      )}

      {activeMilestoneExam && user?.id && (
        <StageMilestoneExamModal
          userId={user.id}
          trackId={activeTrack}
          stageLabel={activeMilestoneExam.label}
          stageName={activeMilestoneExam.name}
          lessonIds={activeMilestoneExam.lessonIds}
          onClose={() => setActiveMilestoneExam(null)}
          onSuccess={() => {
            setPassedMilestones((prev) => [
              ...prev,
              { track_id: activeTrack, stage_label: activeMilestoneExam.label, score: 1 }
            ]);
            setActiveMilestoneExam(null);
          }}
        />
      )}
    </div>
  );
}
