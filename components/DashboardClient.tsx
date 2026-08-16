"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import TaiTaiAvatar from "@/components/TaiTaiAvatar";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, Lock, CheckCheck, Bookmark, ChevronLeft, ChevronRight, Search, X, Route } from "lucide-react";
import { useProgress } from "@/lib/client-hooks";
import { DEFAULT_PRESET, getStoredPreset, storePreset, type DashboardPreset } from "@/lib/dashboard-preset";
import { mergeCompletedLessons } from "@/lib/progress";
import { getIllustrativeCount } from "@/lib/illustrative-stats";
import { getCompletedLessons } from "@/lib/supabase-progress";
import type { Difficulty } from "@/lib/lesson-types";
import { createClient } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import UserStats from "@/components/UserStats";
import ChatWithAdminWidget from "@/components/ChatWithAdminWidget";
import FloatingStudyGroupChat from "@/components/FloatingStudyGroupChat";
import LessonAppealModal from "@/components/LessonAppealModal";
import OnboardingFlow from "@/components/OnboardingFlow";
import LearningProgressHeader from "@/components/LearningProgressHeader";
import StreakReminderManager from "@/components/StreakReminderManager";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import DashboardTour from "@/components/DashboardTour";
import DashboardRecommendations from "@/components/DashboardRecommendations";
import CommunityLearningNow from "@/components/CommunityLearningNow";
import DailyNewsQuizWidget from "@/components/DailyNewsQuizWidget";
import DashboardArenaCard from "@/components/DashboardArenaCard";
import MistakeReviewWidget from "@/components/MistakeReviewWidget";
import LessonRecallWidget from "@/components/LessonRecallWidget";
import SmartRemediationWidget from "@/components/SmartRemediationWidget";
import OnlineUsersWidget from "@/components/OnlineUsersWidget";
import CareerGoalWidget from "@/components/CareerGoalWidget";
import ReferralPromptModal from "@/components/ReferralPromptModal";
import DiagnosticPlacementModal from "@/components/DiagnosticPlacementModal";
import CombinedRewardsWidget from "@/components/CombinedRewardsWidget";
import { hasCompletedOnboarding, completeOnboarding } from "@/lib/supabase-onboarding";
import { getUserProfile, recalculateUserStats, getLeaderboardByMetric, getCfaCompletedCount } from "@/lib/supabase-user";
import { syncLocalLevelExams } from "@/lib/supabase-level-exams";
import { getDashboardSummary, getLessonState, type DashboardSummary, type LessonState } from "@/lib/supabase-dashboard-optimized";
import { getLevelByXp, getLevelProgress, LEVELS, XP_PER_LESSON } from "@/lib/levels";
import UnlockRequestModal from "@/components/UnlockRequestModal";
import KnowledgeChallengeModal from "@/components/KnowledgeChallengeModal";
import StageMilestoneExamModal from "@/components/StageMilestoneExamModal";
import ProgressionHero from "@/components/dashboard/ProgressionHero";
import RigorousLevelExamModal from "@/components/RigorousLevelExamModal";
import CertificateModal from "@/components/CertificateModal";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL, isLessonInRange, PROFESSIONAL_BRANCHES, type ProfessionalBranchId } from "@/lib/track-stages";
import { getLessonShortTitle } from "@/lib/lesson-labels";
import { BONUS_CATEGORIES, BONUS_CATEGORY_ORDER } from "@/lib/bonus-lesson-categories";
import { TRACKS } from "@/lib/tracks";
import { getChallengePassedLessonIds } from "@/lib/supabase-challenges";
import { addLessonFlag, getUserLessonFlags, removeLessonFlag } from "@/lib/supabase-lesson-flags";
import { getUserBookmarks, type LessonBookmark } from "@/lib/supabase-bookmarks";
import { getPassedMilestones, savePassedMilestone, type MilestoneCompletion } from "@/lib/supabase-milestones";
import { syncOfflineQueue } from "@/lib/offline-sync";
import { isValidAvatar } from "@/lib/avatar-utils";
// CosmeticStore/FinanceCardCollection/WeeklyChallengeWidget không còn import ở
// đây: các nhánh render của chúng đã bỏ cùng những giá trị tab không ai chọn
// được. Ba widget đó sống ở RPG hub.
import FinanceCharacterAvatar, { CharacterEquipments } from "@/components/FinanceCharacterAvatar";
import BossBattleModal from "@/components/BossBattleModal";
import PvpDuelModal from "@/components/PvpDuelModal";
import DashboardStreakWidget from "@/components/DashboardStreakWidget";
import DailyMotivationWidget from "@/components/DailyMotivationWidget";
import LearningPathSummary from "@/components/LearningPathSummary";
import NotesShortcutCard from "@/components/NotesShortcutCard";
import CommunityStreakWidget from "@/components/CommunityStreakWidget";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";



/* i18n-ignore-start: these are lookup KEYS, not display text. Each is built at
   the call site as `${track}-${stageLabel}` where stageLabel comes from
   lib/track-stages.ts, so translating them would break the lookup and every
   stage would silently fall through to the default theme. The stage label the
   learner reads is rendered separately and does go through the dictionary. */
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
  "professional-Chặng 7": { emoji: "📈", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "professional-Chặng 8": { emoji: "⚖️", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "professional-Chặng 9": { emoji: "🔄", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "professional-Chặng 10": { emoji: "👑", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "professional-Chặng 11": { emoji: "🏛️", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "professional-Chặng 12": { emoji: "🧬", bg: "bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800", text: "text-stone-600 dark:text-stone-400", barColor: "bg-stone-400" },
  "professional-Chặng 13": { emoji: "🤖", bg: "bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800", text: "text-emerald-700 dark:text-emerald-300", barColor: "bg-emerald-500" },
};
/* i18n-ignore-end */

// Slim projection of Lesson - just enough to render the dashboard listing,
// so the full lesson bodies (sections/quiz/etc) never reach this client bundle.
export interface LessonMeta {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  // Computed whole-lesson time estimate (lib/lesson-reading.js). Falls back
  // to the hand-authored `duration` string when absent.
  totalMinutes?: number;
  difficulty: Difficulty;
  track?: "professional" | "personal" | "bonus";
  isFundamental?: boolean;
  prerequisiteId?: number | null;
  isVisible?: boolean;
}


// The time cost of a lesson, shown before it is opened. Prefers the
// generated estimate (derived from the body's actual length) over the
// hand-authored `duration` string, which was written per lesson and barely
// varies with how long a lesson really is - 65% of lessons say "6 phút" or
// "7 phút" regardless of body length, so it carries almost no signal about
// which lesson is the short one.
// Nhận `minutesLabel` thay vì tự ghép chữ: hàm này ở module scope nên không gọi
// useI18n() được, và để nguyên chuỗi tiếng Việt ở đây là giữ lỗi ở chỗ khó thấy.
function formatLessonTime(
  lesson: { totalMinutes?: number; duration: string },
  minutesLabel: string
): string {
  return lesson.totalMinutes ? format(minutesLabel, { count: lesson.totalMinutes }) : lesson.duration;
}

// Local fast-path/fallback cache for the onboarding modal's "seen" state -
// see handleOnboardingSkip for why this exists.
const ONBOARDING_LOCAL_KEY = "onboarding_seen_v1";

/* ─── Component ─────────────────────────────────────────────────── */

let cachedSummary: DashboardSummary | null = null;
let cachedLessonState: LessonState | null = null;

// Two routes render this same component, differing only in which half of the
// page they show:
//   "overview" (/dashboard)  - level map, rewards, recommendations, career goal
//   "lessons"  (/hoc-bai)    - the learning path itself: track selector,
//                              stage/lesson accordion, bonus cases, plus the
//                              study aids (resume, recall, mistakes, bookmarks)
// Splitting by prop rather than extracting a component keeps all the shared
// lesson state (completed ids, unlock modals, milestone exams, manual flags)
// in one place - the accordion depends on nearly all of it.
export type DashboardView = "overview" | "lessons";

// "skill-tree" từng nằm trong danh sách này. Nó ở lại sau khi dải tab bị gỡ
// (c3f7ec9) để isDashboardTab còn nhận ra giá trị cũ trong localStorage và
// isTrackTab từ chối nó tử tế. Cây kỹ năng giờ đã bị xoá khỏi sản phẩm, nên
// giá trị đó rơi thẳng về mặc định ở isDashboardTab - cùng kết quả, ít hơn
// một dòng phải giải thích.
const DASHBOARD_TABS = ["personal", "professional", "weekly-challenge", "cards", "cosmetics"] as const;
type DashboardTab = (typeof DASHBOARD_TABS)[number];

/** Giá trị đọc từ localStorage là string bất kỳ - hàm này thu hẹp nó lại thay
 *  vì ép kiểu, nên một tab bị đổi tên sẽ rơi về mặc định chứ không lọt qua. */
function isDashboardTab(value: string | null): value is DashboardTab {
  return value !== null && (DASHBOARD_TABS as readonly string[]).includes(value);
}

/**
 * Whether a tab is one the learner can actually get back to.
 *
 * Only "personal" and "professional" have a control that selects them (the two
 * track cards). The other three are leftovers: their tab strip was removed when
 * the career path moved to /nghe-nghiep-hoc (c3f7ec9), and those widgets now
 * live in the RPG hub instead. Nothing in the app has set those values since -
 * but they were persisted, so a learner whose last visit before that commit
 * ended on one still has it in localStorage, and restoring it opens the
 * dashboard on a widget with no lesson list below it and no track card
 * selected. That is the same stale-tab trap c3f7ec9 fixed for "career" and the
 * CFA/FRM commit fixed before it; these were just left in the union.
 */
function isTrackTab(tab: DashboardTab): tab is "personal" | "professional" {
  return tab === "personal" || tab === "professional";
}

export default function DashboardClient({ lessonsMeta, view = "overview" }: { lessonsMeta: LessonMeta[]; view?: DashboardView }) {
  const isLessonsView = view === "lessons";
  // Mức dày đặc của trang tổng quan - xem lib/dashboard-preset.ts.
  //
  // Khởi tạo bằng DEFAULT_PRESET rồi mới đọc localStorage trong effect, thay
  // vì đọc ngay lúc dựng state: trang này được kết xuất trên máy chủ trước,
  // nơi không có localStorage, nên đọc lúc dựng sẽ cho hai kết quả khác nhau
  // giữa máy chủ và trình duyệt và React sẽ báo lệch hydrate. Cái giá là ai
  // chọn "đầy đủ" sẽ thấy bản gọn trong một khung hình đầu; chấp nhận được vì
  // các widget bị ẩn đều tự tải dữ liệu bất đồng bộ và vốn đã hiện sau.
  const [preset, setPreset] = useState<DashboardPreset>(DEFAULT_PRESET);
  const isFullPreset = preset === "day-du";
  // Preset CHỈ áp cho trang tổng quan. /hoc-bai có bộ widget khác hẳn (trợ
  // giúp ôn tập cạnh danh sách bài) và không có nút chuyển, nên ở đó mọi thứ
  // hiện như cũ - nếu không, một tuỳ chọn đặt ở màn hình này sẽ lặng lẽ giấu
  // widget ở màn hình kia mà không có gì bật lại được.
  const showOptional = isLessonsView || isFullPreset;
  // Bản GỌN của chính các thẻ, khác `showOptional` vốn chỉ quyết định widget
  // nào có mặt. Ở đây là thẻ vẫn có mặt nhưng thu lại.
  //
  // `isLessonsView ||` chứ không phải `&&`: /hoc-bai không có nút chuyển, nên
  // nó giữ nguyên bản gọn như trước. Nếu để preset chi phối cả trang đó thì
  // một lựa chọn đặt ở màn hình này sẽ lặng lẽ nới rộng màn hình kia - cùng
  // cái bẫy mà chú thích của `showOptional` ngay trên đã tránh.
  const isCompactCard = isLessonsView || !isFullPreset;

  useEffect(() => {
    const stored = getStoredPreset();
    if (stored) setPreset(stored);
  }, []);

  const choosePreset = useCallback((next: DashboardPreset) => {
    setPreset(next);
    storePreset(next);
  }, []);
  const { locale, t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const progress = useProgress();
  const completed = progress.completedLessons;
  // Bài thi thăng cấp mở được từ HAI chỗ, và hai chỗ đó không dùng chung state.
  // UserStats giữ bản của nó ở cột phải như một hành động phụ; khối tiến trình
  // ở cột chính cần bản riêng, vì gộp state lại phải nâng nó lên context và
  // đó là một sửa đổi lớn hơn nhiều trên một tệp đang có ba phiên cùng chạm.
  // Chỉ một modal mở được tại một thời điểm nên hai bản không chồng nhau.
  const [heroExamLevel, setHeroExamLevel] = useState<number | null>(null);
  // localStorage alone can't be trusted as the progress source of truth - a
  // new browser/device/incognito session has none of it even though the
  // user's real progress lives in Supabase (user_progress). Bumping this
  // after merging server data forces a re-render, which makes useProgress()
  // pick up the freshly-merged localStorage snapshot (see mergeCompletedLessons).
  const [, forceProgressResync] = useState(0);
  // CFA và FRM đã tách khỏi dashboard thành hai trang riêng có mục trong
  // navbar, nên "cfa" không còn là một track ở đây. Giá trị cũ còn trong
  // localStorage của người đang ở tab đó được quy về "personal" - nếu không họ
  // mở dashboard ra và không thẻ nào được chọn, nội dung bên dưới thì trống.
  const [activeTrack, setActiveTrackState] = useState<"personal" | "professional">(() => {
    if (typeof window === "undefined") return "personal";
    const saved = window.localStorage.getItem("activeTrack");
    return saved === "professional" ? "professional" : "personal";
  });
  const [activeDashboardTab, setActiveDashboardTab] = useState<DashboardTab>(() => {
    if (typeof window === "undefined") return "personal";
    const saved = window.localStorage.getItem("activeDashboardTab");
    if (isDashboardTab(saved) && isTrackTab(saved)) return saved;
    // Falls back to the saved *track*, not to "personal". Onboarding used to
    // write activeTrack without activeDashboardTab, so every learner who came
    // through it choosing "chuyên ngành" is sitting on that missing key right
    // now; defaulting to "personal" leaves them looking at professional stages
    // with the personal card highlighted and no branch strip.
    return window.localStorage.getItem("activeTrack") === "professional"
      ? "professional"
      : "personal";
  });
  const [professionalBranch, setProfessionalBranch] = useState<ProfessionalBranchId>(() => {
    if (typeof window === "undefined") return "corporate";
    const saved = window.localStorage.getItem("professionalBranch");
    // Validated against PROFESSIONAL_BRANCHES rather than a hand-written list
    // of ids. The hand-written version only ever recognised "investment", so
    // the five branches added after it (banking, quant, data, craft, ai) were
    // written to localStorage and then silently discarded on the next load -
    // the learner picked a branch, came back, and was on "corporate" again.
    return PROFESSIONAL_BRANCHES.some((b) => b.id === saved)
      ? (saved as ProfessionalBranchId)
      : "corporate";
  });
  const handleSetProfessionalBranch = (branch: ProfessionalBranchId) => {
    setProfessionalBranch(branch);
    if (typeof window !== "undefined") window.localStorage.setItem("professionalBranch", branch);
  };
  const setActiveTrack = (track: "personal" | "professional") => {
    setActiveTrackState(track);
    setActiveDashboardTab(track);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("activeTrack", track);
      window.localStorage.setItem("activeDashboardTab", track);
    }
  };
  const setDashboardTab = (tab: DashboardTab) => {
    setActiveDashboardTab(tab);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("activeDashboardTab", tab);
    }
  };

  // activeDashboardTab answers "which view" (a track listing, or one of the
  // widget tabs); activeTrack answers "which track's stages". Only the first
  // question belongs to the tab, so everything track-shaped below - the two
  // track cards' selected state and the professional branch strip - reads
  // activeTrack instead.
  //
  // They are separate pieces of state in separate localStorage keys, and the
  // dashboard rendered a *combination* of them: stages came from activeTrack
  // while the highlighted card and the branch strip came from activeDashboardTab.
  // Any write that touched one and not the other therefore produced a screen
  // that contradicted itself - professional stages under a highlighted
  // "Cá Nhân" card, with the branch pills ("Tài chính doanh nghiệp" first among
  // them) not rendered at all. Onboarding was exactly such a write. Deriving
  // from one value makes that class of bug unrepresentable rather than fixing
  // the one caller that happened to hit it.
  const isTrackView = isTrackTab(activeDashboardTab);

  // The lesson page redirects here with ?locked=<slug> when a user tries to
  // open a locked lesson directly by URL - surface that instead of silently
  // landing back on the dashboard with no explanation.
  useEffect(() => {
    const lockedSlug = searchParams.get("locked");
    if (lockedSlug) {
      toast.error(t.dashboard.lessonLocked);
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
  const [stageSearchQuery, setStageSearchQuery] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingChecked, setOnboardingChecked] = useState(false);
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
  const [selectedCertStage, setSelectedCertStage] = useState<{ label: string; name: string } | null>(null);
  const [communityUsersByLevel, setCommunityUsersByLevel] = useState<Map<number, { name: string; xp: number; avatarUrl: string | null; userId: string }[]>>(new Map());
  const [activeTooltipLevel, setActiveTooltipLevel] = useState<number | null>(null);
  const levelStripRef = useRef<HTMLDivElement>(null);
  const [cfaCompletedForLevel, setCfaCompletedForLevel] = useState(0);
  const [dbAvatarUrl, setDbAvatarUrl] = useState<string | null>(null);
  const [equippedGear, setEquippedGear] = useState<CharacterEquipments>({});
  const [showBossBattle, setShowBossBattle] = useState(false);
  const [showPvpModal, setShowPvpModal] = useState(false);
  const [showPlacementModal, setShowPlacementModal] = useState(false);

  useEffect(() => {
    if (user?.id) {
      try {
        const saved = localStorage.getItem(`thtcdn_placement_test_${user.id}`);
        if (!saved) setShowPlacementModal(true);
      } catch (e) {}
    }
  }, [user?.id]);

  // Promotion exams used to live only in localStorage (see
  // 20260818_user_level_exams.sql). Push any pre-existing local passes up once
  // per session so nobody loses a level they already certified.
  useEffect(() => {
    if (!user?.id) return;
    void syncLocalLevelExams(user.id).catch((error) =>
      console.error("Error syncing local level exams:", error)
    );
  }, [user?.id]);

  useEffect(() => {
    function handleGlobalClick(event: MouseEvent | TouchEvent) {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("[data-level-node-root]")) {
        setActiveTooltipLevel(null);
      }
    }
    document.addEventListener("mousedown", handleGlobalClick);
    document.addEventListener("touchstart", handleGlobalClick);
    return () => {
      document.removeEventListener("mousedown", handleGlobalClick);
      document.removeEventListener("touchstart", handleGlobalClick);
    };
  }, []);


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

  useEffect(() => {
    let cancelled = false;
    getLeaderboardByMetric("xp", 100)
      .then((entries) => {
        if (cancelled) return;
        const grouped = new Map<number, { name: string; xp: number; avatarUrl: string | null; userId: string }[]>();
        for (const lvl of LEVELS) {
          grouped.set(lvl.level, []);
        }
        entries.forEach((entry) => {
          // Bảng xếp hạng XP không trả về số mô-đun CFA của từng người, nên
          // `cfaCompleted` ở đây luôn là 0 (giá trị mặc định của tham số).
          //
          // Chú thích cũ ở chỗ này nói rằng hệ quả là "một vài người XP cao mà
          // chưa học CFA CÓ THỂ hiện dưới L9". Điều đó sai, và sai theo đúng
          // chiều ngược lại: cfaCompleted = 0 không bao giờ vượt được cổng
          // `minCfaCompleted: 5` của L9, nên KHÔNG AI lọt vào L9 - cả dải
          // 3.600-5.199 XP bị dồn xuống L8, còn ai đủ 5.200 thì nhảy thẳng lên
          // L10. Trên giao diện, L9 là một ô vĩnh viễn trống, và đó chính là
          // thứ một người học báo lỗi: họ 5.036 XP, thấy mình ở nhóm L8, cạnh
          // tấm thẻ L9 ghi mỗi ngưỡng XP thấp hơn số của họ.
          //
          // Xếp theo XP đơn thuần ở đây thì L9 đầy lên nhưng danh sách sẽ mâu
          // thuẫn với cấp đã lưu của chính những người đó (recalculateUserStats
          // có xét cổng CFA). Sửa đúng là để truy vấn trả kèm số mô-đun CFA;
          // trong lúc chờ, thẻ L9 đã ghi rõ cổng CFA nên ô trống ấy tự giải
          // thích được.
          const lvl = getLevelByXp(entry.value).level;
          if (grouped.has(lvl)) {
            grouped.get(lvl)?.push({ name: entry.name, xp: entry.value, avatarUrl: entry.avatarUrl, userId: entry.user_id });
          }
        });
        setCommunityUsersByLevel(grouped);
      })
      .catch((err) => console.error("Error loading community levels:", err));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    getCfaCompletedCount(user.id)
      .then((count) => {
        if (!cancelled) setCfaCompletedForLevel(count);
      })
      .catch((err) => console.error("Error loading CFA completed count:", err));
    return () => {
      cancelled = true;
    };
  }, [user?.id, completed.length]);

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
        return gate;
      });
      // Side effects moved outside state updater
      window.localStorage.setItem("thtcdn_challenge_last_shown", today);
      setShowChallenge(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, [loading, completed.length]);

  const track = activeTrack === "professional" ? TRACK_PROFESSIONAL : TRACK_PERSONAL;

  // lessonsMeta is a stable prop (fixed for the component's lifetime), but
  // this component re-renders very often from its own local state
  // (accordion toggles, hover/popover state, flag-selection mode...).
  // Without memoizing, every one of those renders re-filtered/re-sorted the
  // full lesson list (300+ entries) from scratch for no reason.
  const sorted = useMemo(
    () => [...lessonsMeta].filter((l) => l.isVisible !== false).sort((a, b) => a.id - b.id),
    [lessonsMeta]
  );

  const lessonById = useMemo(() => new Map(lessonsMeta.map((l) => [l.id, l])), [lessonsMeta]);
  const lessonsBySlug = useMemo(() => Object.fromEntries(lessonsMeta.map((l) => [l.slug, l])), [lessonsMeta]);
  const lessonsById = useMemo(() => Object.fromEntries(lessonsMeta.map((l) => [l.id, l])), [lessonsMeta]);

  // Track-relative lesson numbering: the personal track reuses lesson ids
  // from the 200s (originally written for the professional track) in its
  // own Chặng 2-4, so showing the raw id ("Day 201") right after a "Chặng 1"
  // that only went up to id 20 reads as a broken sequence to a linear
  // learner. Map each lesson to its 1-based position within THIS track's own
  // display order instead, computed with the exact same stage/part filters
  // used to render the list below so the numbers always match what's shown.
  //
  // Also precomputes the per-stage and per-part lesson lists themselves
  // (lessonsByStageLabel/lessonsByPartKey) - the stage/part accordion render
  // loop below used to call sorted.filter() again for every stage (twice -
  // once more for the previous stage's milestone check) and every part, on
  // every single render.
  const { lessonOrdinal, stageDisplayLabels, lessonsByStageLabel, lessonsByPartKey } = useMemo(() => {
    const ordinal = new Map<number, number>();
    const stageLabelsMap = new Map<string, string>();
    const byStage = new Map<string, LessonMeta[]>();
    const byPart = new Map<string, LessonMeta[]>();

    const branchStages = activeTrack === "professional"
      ? track.stages.filter((s) => (PROFESSIONAL_BRANCHES.find((b) => b.id === professionalBranch)!.stageLabels as readonly string[]).includes(s.label))
      : track.stages;

    let n = 0;
    branchStages.forEach((stage, displayIdx) => {
      const customLabel = format(t.dashboard.stageLabel, { n: displayIdx + 1 });
      stageLabelsMap.set(stage.label, customLabel);

      byStage.set(
        stage.label,
        sorted.filter((l) => isLessonInRange(l.id, stage) && (!l.track || l.track === activeTrack))
      );

      for (const part of stage.parts) {
        const partLessons = sorted.filter(
          (l) => isLessonInRange(l.id, part) && (!l.track || l.track === activeTrack)
        );
        byPart.set(`${stage.label}::${part.name}`, partLessons);
        for (const l of partLessons) {
          if (!ordinal.has(l.id)) {
            n += 1;
            ordinal.set(l.id, n);
          }
        }
      }
    });

    return {
      lessonOrdinal: ordinal,
      stageDisplayLabels: stageLabelsMap,
      lessonsByStageLabel: byStage,
      lessonsByPartKey: byPart,
    };
  }, [sorted, track, activeTrack, professionalBranch]);

  // Dữ liệu cho khối đầu trang (components/LearningProgressHeader.tsx).
  //
  // Tính TẠI ĐÂY chứ không trong component đó, vì mọi mảnh đã có sẵn ở scope
  // này: danh sách chặng, bài theo chặng, bài đã xong, và tên chặng đã dịch.
  // Để component tự đi lấy là thêm một truy vấn cho mỗi lượt mở /hoc-bai.
  const progressStages = useMemo(
    () =>
      track.stages.map((stage, idx) => {
        const stageLessons = lessonsByStageLabel.get(stage.label) ?? [];
        return {
          label: stage.label,
          // Tên đã dịch nếu có; `stage.label` là KHOÁ nên không bao giờ dịch.
          name: t.trackStages[activeTrack]?.stages[idx]?.label || stage.label,
          total: stageLessons.length,
          done: stageLessons.filter((l) => completed.includes(l.id)).length,
        };
      }),
    [track.stages, lessonsByStageLabel, completed, t.trackStages, activeTrack]
  );

  // Bài kế tiếp = bài chưa xong đầu tiên theo đúng thứ tự lộ trình. Cùng thứ tự
  // mà danh sách chặng bên dưới hiển thị, nên nút ở đầu trang và bài người học
  // thấy khi cuộn xuống không thể trỏ vào hai chỗ khác nhau.
  // Chặng ĐANG HỌC: chặng đầu tiên chưa xong. Tính ngoài vòng lặp render vì
  // nó là một tính chất của cả lộ trình, không phải của từng chặng - hỏi bên
  // trong vòng lặp thì mỗi chặng lại phải quét lại toàn bộ danh sách.
  const currentStageLabel = useMemo(
    () => progressStages.find((st) => st.total > 0 && st.done < st.total)?.label ?? null,
    [progressStages]
  );

  const nextMission = useMemo(() => {
    const lesson = sorted.find((l) => !completed.includes(l.id));
    if (!lesson) return null;
    const stage = progressStages.find((st) =>
      (lessonsByStageLabel.get(st.label) ?? []).some((l) => l.id === lesson.id)
    );
    return { slug: lesson.slug, title: lesson.title, stageName: stage?.name ?? "" };
  }, [sorted, completed, progressStages, lessonsByStageLabel]);


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

  // Diacritics-insensitive so "lai suat" matches "lãi suất" - people
  // searching a Vietnamese lesson list rarely bother typing the tone marks.
  function normalizeForSearch(text: string): string {
    return text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  }

  const stageSearchNormalized = normalizeForSearch(stageSearchQuery.trim());
  const isSearchingStages = stageSearchNormalized.length > 0;

  function lessonMatchesSearch(lesson: LessonMeta): boolean {
    if (!isSearchingStages) return true;
    return normalizeForSearch(lesson.title).includes(stageSearchNormalized);
  }

  const handleOnboardingComplete = async (selectedTrack: "personal" | "professional") => {
    if (user?.id) {
      try {
        await completeOnboarding(user.id, selectedTrack);
        // setActiveTrack, not setActiveTrackState: the track drives which
        // stages render, but activeDashboardTab drives which track card looks
        // selected AND whether the professional branch strip is rendered at
        // all. Setting only the former left a learner who picked "chuyên
        // ngành" during onboarding on activeDashboardTab === "personal", so
        // the branch pills - "Tài chính doanh nghiệp" first among them - never
        // appeared, and no reload fixed it because the key was never written.
        setActiveTrack(selectedTrack);
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

  // Synchronize stats & progress with database using optimized batch RPCs and caching
  const syncProgressAndXP = useCallback(async function syncProgressAndXP(userId: string) {
    // 1. Process offline queue asynchronously in the background
    void syncOfflineQueue(userId).then((didSync) => {
      if (didSync) {
        toast.success(t.dashboard.offlineSynced);
        // Re-run sync to pull fresh data after sync completes
        void syncProgressAndXP(userId);
      }
    }).catch((err) => {
      console.error("Offline sync error:", err);
    });

    // 2. Use cache (Stale-While-Revalidate) if available to prevent blocker state
    if (cachedSummary && cachedLessonState) {
      setUserXp(cachedSummary.stats?.total_xp ?? cachedSummary.profile?.total_xp ?? 0);
      setDbAvatarUrl(cachedSummary.profile?.avatar_url ?? null);
      setChallengePassedIds(new Set(cachedSummary.challenge_passed_ids));
      setPassedMilestones(cachedSummary.passed_milestones.filter(m => m.track_id === activeTrack));
      
      mergeCompletedLessons(cachedLessonState.completed_lessons);
      forceProgressResync((n) => n + 1);
      setFlaggedLessonIds(new Set(cachedLessonState.user_lesson_flags));
      setBookmarks(cachedLessonState.bookmarks.slice(0, 6));

      if (window.localStorage.getItem(ONBOARDING_LOCAL_KEY)) {
        setOnboardingChecked(true);
      } else {
        setOnboardingChecked(true);
        if (cachedSummary.has_completed_onboarding) {
          window.localStorage.setItem(ONBOARDING_LOCAL_KEY, "1");
        } else {
          setShowOnboarding(true);
        }
      }
    }

    const startTime = performance.now();
    try {
      // 3. Fetch both summary and lesson state in parallel
      const [summary, lessonState] = await Promise.all([
        getDashboardSummary(),
        getLessonState()
      ]);

      const duration = performance.now() - startTime;
      console.log(`[Dashboard Load] Optimized fetch completed in ${duration.toFixed(2)}ms`);

      // Update cache
      cachedSummary = summary;
      cachedLessonState = lessonState;

      // Apply fresh values to states
      setUserXp(summary.stats?.total_xp ?? summary.profile?.total_xp ?? 0);
      setDbAvatarUrl(summary.profile?.avatar_url ?? null);
      setChallengePassedIds(new Set(summary.challenge_passed_ids));
      setPassedMilestones(summary.passed_milestones.filter(m => m.track_id === activeTrack));

      mergeCompletedLessons(lessonState.completed_lessons);
      forceProgressResync((n) => n + 1);
      setFlaggedLessonIds(new Set(lessonState.user_lesson_flags));
      setBookmarks(lessonState.bookmarks.slice(0, 6));

      if (window.localStorage.getItem(ONBOARDING_LOCAL_KEY)) {
        setOnboardingChecked(true);
      } else {
        setOnboardingChecked(true);
        if (summary.has_completed_onboarding) {
          window.localStorage.setItem(ONBOARDING_LOCAL_KEY, "1");
        } else {
          setShowOnboarding(true);
        }
      }

      // Fetch RPG Equipped gear
      const { data: equips } = await supabase
        .from("user_equipments")
        .select("slot, asset_key")
        .eq("user_id", userId);

      const gear: CharacterEquipments = {};
      equips?.forEach((e: { slot: string; asset_key: string }) => {
        gear[e.slot as keyof CharacterEquipments] = e.asset_key;
      });
      setEquippedGear(gear);
    } catch (error) {
      console.error("Error loading optimized dashboard data:", error);
    }

    setAvgQuizScore(75);
  }, [activeTrack]);

  // Check auth on mount
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
      await syncProgressAndXP(session.user.id);
      setLoading(false);
    };

    checkAuth();
  }, [router, supabase.auth, syncProgressAndXP]);

  // Listen for Visibility Change (Wake Up) and Online events to trigger sync
  useEffect(() => {
    if (!user?.id) return;

    const handleSyncTrigger = () => {
      if (document.visibilityState === "visible" && user.id) {
        void syncProgressAndXP(user.id);
      }
    };

    const handleOnline = () => {
      if (user.id) {
        void syncProgressAndXP(user.id);
      }
    };

    // recalculateUserStats (lib/supabase-user.ts) dispatches this on every
    // XP change app-wide (chest opened, quest claimed, milestone passed,
    // lesson/quiz/game completed...). AppNavbar already listens for it to
    // drive its level-up celebration, but the dashboard's own XP-derived UI
    // (level roadmap, UserStats sidebar) had no listener of its own - it
    // only ever refreshed on visibility/focus/online, so earning XP while
    // staying on this same page (e.g. opening a chest from the merged
    // Rewards widget) left the roadmap showing a stale level/percent until
    // a reload. Reads totalXp straight off the event's own detail payload
    // instead of calling syncProgressAndXP (which itself calls
    // recalculateUserStats and would re-dispatch this same event - an
    // infinite loop).
    const handleXpUpdated = (e: Event) => {
      const detail = (e as CustomEvent<{ currentLevel: number; totalXp: number }>).detail;
      if (typeof detail?.totalXp === "number") {
        setUserXp(detail.totalXp);
      }
    };

    document.addEventListener("visibilitychange", handleSyncTrigger);
    window.addEventListener("focus", handleSyncTrigger);
    window.addEventListener("online", handleOnline);
    window.addEventListener("thtcdn:xp-updated", handleXpUpdated);

    return () => {
      document.removeEventListener("visibilitychange", handleSyncTrigger);
      window.removeEventListener("focus", handleSyncTrigger);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("thtcdn:xp-updated", handleXpUpdated);
    };
  }, [user?.id, syncProgressAndXP]);


  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-950 flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
          <span className="absolute -inset-1.5 rounded-full border-4 border-emerald-500/70 border-t-transparent animate-spin" />
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-stone-100 dark:bg-stone-800">
            <TaiTaiAvatar size={64} />
          </div>
        </div>
        <p className="text-stone-500 dark:text-stone-400 font-semibold text-sm flex items-center gap-1.5">
          {t.dashboard.loading}
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
      toast.message(t.dashboard.markLearned.alreadyCounted);
      clearFlagSelection();
      return;
    }

    const confirmed = window.confirm(
      t.dashboard.markLearned.confirmPrompt
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
          ? t.dashboard.markLearned.updated
          : toAdd.length > 0
            ? format(t.dashboard.markedRead, { count: toAdd.length })
            : format(t.dashboard.unmarkedRead, { count: toRemove.length })
      );
      clearFlagSelection();
    } catch (error) {
      console.error("Error applying lesson flags:", error);
      toast.error(t.dashboard.markLearned.updateFailed);
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
    // Nhãn hiển thị tra theo giá trị tiếng Việt; phép LỌC vẫn so bằng giá trị
    // gốc, vì `BONUS_CATEGORIES` ánh xạ slug sang chính chuỗi tiếng Việt đó.
    label: t.bonusCategories[category] ?? category,
    lessons: bonusLessons.filter((l) => (BONUS_CATEGORIES[l.slug] ?? t.dashboard.bonusOther) === category),
  })).filter((g) => g.lessons.length > 0);

  return (
    // xl:overflow-y-auto chứ KHÔNG phải overflow-hidden. Bố cục "một hình chữ
    // nhật" giả định mọi thứ vừa đúng một màn hình, và mỗi lần thêm một dải
    // trên đầu - thông báo của admin, rồi lối vào thư viện 3D - là một lần
    // ngân sách chiều cao bị ăn bớt mà không ai đo lại. Với overflow-hidden,
    // phần không vừa không phải là "hơi chật": nó BIẾN MẤT, và không có thanh
    // cuộn nào để lấy lại. Trên màn 1280×720 hoặc khi có banner, đó là mất
    // hẳn phần dưới của lưới.
    //
    // Màn hình đủ cao thì không có gì tràn nên cũng không có thanh cuộn, tức
    // ý đồ ban đầu vẫn nguyên; chỉ khác ở đúng trường hợp trước đây bị mất
    // nội dung.
    // Trong suốt, không `bg-white`: khung bố cục ở app/(app)/layout.tsx đã đặt
    // nền giấy ngà cho cả sản phẩm, và một lớp trắng ở đây sơn đè lên đúng thứ
    // đó - dashboard sẽ là ô trắng duy nhất trong một sản phẩm màu ngà.
    <div className="min-h-screen xl:h-screen xl:overflow-y-auto">


      <div className="px-4 py-4 sm:px-5 sm:py-5 xl:h-full xl:flex xl:flex-col xl:min-h-0">
        {/* ── Admin -> everyone broadcasts (maintenance, launches, policy
            changes) - shown above the streak/recall reminders since these
            are typically more time-sensitive. ── */}
        {user?.id && <AnnouncementBanner userId={user.id} />}
        {/* ReferralPromptModal chuyển sang GlobalChatWrapper cùng hai widget
            nổi kia - lối vào giờ là dòng "Mời bạn" trong menu Kết nối. Gắn ở
            cả hai chỗ sẽ dựng hai bản trên chính trang dashboard. */}

        {user?.id && (
          <StreakReminderManager
            userId={user.id}
            nextLessonId={sorted.find((l) => !completed.includes(l.id))?.id}
          />
        )}

        {/* ── Lối vào không gian 3D ──
            {t.dashboard.libraryPresence}
            cùng lúc, nhưng nó chỉ có một dòng trong navbar - và một dòng
            trong navbar thì trông giống mọi trang khác. Đặt ở đây vì đây là
            màn hình mọi người mở đầu tiên, và vì lời mời vào một căn phòng
            phải nói được nó là căn phòng chứ không phải một trang nữa.

            Slim và không đóng lại được: nó cao một dòng trên desktop nên
            không lấn phần lưới bên dưới, và một nút đóng sẽ biến lối vào duy
            nhất của một không gian thành thứ người dùng gạt đi trong ba giây
            đầu rồi không tìm lại được. */}
        {/* Thẻ Thư viện từng trải nguyên một dải ngang ở đây, TRÊN cả bản
            đồ cấp độ - tức vị trí đắt nhất trang dành cho một tính năng phụ.
            Nó xuống cột phải, cạnh các thẻ cộng đồng khác, giữ nguyên nội
            dung. Lý do đặt nó ngoài navbar vẫn đúng và vẫn được tôn trọng:
            nó vẫn ở trên màn hình đầu tiên, chỉ là không còn đứng trước thứ
            người ta mở dashboard để xem. */}

        {/* ── Unified Dashboard Grid ──
            The overview is laid out as one viewport-height card ("1 hình chữ
            nhật") on xl+: no page scroll, and any panel whose content is
            taller than its cell scrolls inside itself instead. Below xl the
            same panels just stack and the page scrolls normally - there is no
            honest way to fit this much on a phone screen. */}
        <div
          // Lớp tô xám của bảng bọc đã bỏ cùng lượt cho nền trắng: nó là lớp
          // xám THỨ HAI trong cùng một khung nhìn, sau nền vỏ ứng dụng, nên
          // đổi vỏ sang trắng mà giữ nó thì vẫn còn một mảng xám ở khổ xl.
          // ĐƯỜNG VIỀN giữ nguyên - nó mới là thứ gom lưới thành "một hình chữ
          // nhật" như chú thích dưới mô tả; phần tô chỉ là nhấn thêm.
          className={`mx-auto w-full space-y-5 min-w-0 xl:flex-1 xl:min-h-0 xl:space-y-0 xl:rounded-2xl xl:border xl:border-stone-200 xl:dark:border-stone-800 xl:p-3.5 ${
            isLessonsView
              ? "max-w-[1500px] xl:flex xl:flex-col"
              : "max-w-[1500px] xl:grid xl:grid-cols-12 xl:grid-rows-[auto_auto_minmax(0,1fr)] xl:gap-3.5"
          }`}
        >

          {/* Level map is progress/gamification, so it stays on the overview
              route and is not repeated above the learning path. */}
          {/* KHỐI TIẾN TRÌNH CHỦ ĐẠO, đứng trên bản đồ cấp độ.
              Bản đồ trải đều mười lăm cấp cùng một cỡ, trong khi 95% người
              dùng đang ở Level 1 (đo trên 1000 hồ sơ). Khối này phóng to đúng
              hai cấp có nghĩa với người đang xem, viết ra khoảng cách XP ngay
              trên đường đi, và gắn bài thi thăng cấp vào cấp kế thay vì để nó
              nằm riêng ở cột phải. */}
          {!isLessonsView && user?.id && (
            <ProgressionHero
              userXp={userXp}
              cfaCompleted={cfaCompletedForLevel}
              nextLesson={(() => {
                const nl = sorted.find((l) => !completed.includes(l.id));
                return nl ? { slug: nl.slug, title: nl.title, xp: XP_PER_LESSON } : null;
              })()}
              examUnlocked={getLevelProgress(userXp, cfaCompletedForLevel) >= 100}
              onOpenExam={() => {
                const cur = getLevelByXp(userXp, cfaCompletedForLevel).level;
                setHeroExamLevel(cur + 1);
              }}
            />
          )}

          {!isLessonsView && user?.id && (() => {
            const currentUserLevel = getLevelByXp(userXp, cfaCompletedForLevel).level;
            const levelProgress = getLevelProgress(userXp, cfaCompletedForLevel);
            const openLevel = activeTooltipLevel;

            const ACCENTS = [
              { text: "text-slate-600 dark:text-slate-400", bg: "bg-slate-50 dark:bg-slate-900/50", border: "border-slate-300 dark:border-slate-700", solid: "bg-slate-400" },
              { text: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/30", border: "border-sky-300 dark:border-sky-800", solid: "bg-sky-500" },
              { text: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-950/30", border: "border-cyan-300 dark:border-cyan-800", solid: "bg-cyan-500" },
              { text: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/30", border: "border-violet-400 dark:border-violet-700", solid: "bg-violet-500" },
              { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-400 dark:border-emerald-700", solid: "bg-emerald-500" },
              { text: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-950/30", border: "border-teal-400 dark:border-teal-700", solid: "bg-teal-500" },
              { text: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-950/30", border: "border-orange-400 dark:border-orange-700", solid: "bg-orange-500" },
              { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-950/30", border: "border-rose-400 dark:border-rose-700", solid: "bg-rose-500" },
              { text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-400 dark:border-amber-500", solid: "bg-gradient-to-r from-amber-400 to-yellow-500" },
            ];

            return (
              // `xl:overflow-y-auto`, KHÔNG phải `xl:overflow-hidden`.
              //
              // Thẻ này bị lưới giới hạn chiều cao. Với `overflow-hidden`, phần
              // không vừa bị CẮT và không sinh ra thanh cuộn nào - cột phải bên
              // trong (dải avatar, khối cấp độ/XP, banner thi thăng cấp) mất
              // phần dưới, và cách duy nhất để đọc nốt là thu nhỏ cả trang.
              // Người dùng báo đúng triệu chứng đó.
              //
              // Đây là bài học đã ghi ở chú thích khối ngoài cùng phía trên và
              // ở app/(app)/analytics/page.tsx: "phần không vừa không phải là
              // hơi chật: nó BIẾN MẤT, và không có thanh cuộn nào để lấy lại".
              //
              // Cho cuộn TRONG thẻ chứ không bỏ hẳn giới hạn chiều cao: thẻ nằm
              // ở hàng `auto` đầu tiên của một lưới đã bị bó chiều cao, nên để
              // nó nở tự do là bóp hàng `minmax(0,1fr)` bên dưới xuống gần 0 -
              // đổi một chỗ mất nội dung lấy một chỗ khác.
              <div className={`rounded-xl border border-stone-200/90 dark:border-stone-800 bg-white/95 dark:bg-stone-900 xl:col-span-12 xl:min-h-0 xl:overflow-y-auto ${isCompactCard ? "p-2.5" : "p-2.5 sm:p-3"}`}>
                <div className="grid grid-cols-1 gap-2.5 xl:grid-cols-[minmax(0,1fr)_264px] xl:items-start">
                  {/* self-stretch (not the grid's items-start) so this column
                      fills the row height set by the taller UserStats sidebar -
                      otherwise the level strip sits at the top and dumps all the
                      leftover height as dead space under the avatars. */}
                  <div className="min-w-0 xl:flex xl:flex-col">
                    <div className="relative z-10 mb-1.5 flex flex-col justify-between gap-1.5 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="text-[13px] font-semibold text-stone-900 dark:text-stone-100">
                          {t.dashboard.levelMapTitle}
                        </h3>
                        {/* Dòng giải thích bản đồ chỉ có ở bản đầy đủ: nó nói
                            cách đọc dải cấp độ, và người đã chọn "Gọn" là
                            người đã đọc nó rồi. */}
                        {!isCompactCard && (
                          <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                            {t.dashboard.levelMapNote}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2.5 text-left sm:text-right self-start sm:self-auto">
                        {user?.id && <DashboardStreakWidget userId={user.id} />}
                      </div>
                    </div>

                    {/* Không còn `xl:flex-1` kéo giãn theo chiều cao cột bên.
                        Nó sinh ra để lấp khoảng trống dưới dải avatar, nhưng
                        cách lấp là kéo cả thẻ cao lên bằng cột UserStats -
                        tức đổi một khoảng trống lấy một khoảng trống to hơn. */}
                    <div className="relative z-10">
                        {/* Thanh tiến độ cấp từng nằm ở đây, không nhãn.
                            Cột phải đã có đúng con số đó kèm chữ ("Tiến độ cấp
                            2 (23%)"), nên hai thanh cạnh nhau chỉ làm người đọc
                            phải đoán cái nào đo cái gì - và cái không nhãn luôn
                            là cái bị đoán sai. */}

                        <div className="relative group/level-strip">
                          <button
                            onClick={() => levelStripRef.current?.scrollBy({ left: -220, behavior: "smooth" })}
                            className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-md items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all opacity-0 group-hover/level-strip:opacity-100"
                            aria-label={t.dashboard.scrollLeft}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => levelStripRef.current?.scrollBy({ left: 220, behavior: "smooth" })}
                            className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-md items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all opacity-0 group-hover/level-strip:opacity-100"
                            aria-label={t.dashboard.scrollRight}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          <div
                            ref={levelStripRef}
                            // Khung nhìn chốt ở 7-8 cấp một lúc, phần còn lại
                            // cuộn ngang (hai nút mũi tên hai bên, và vuốt trên
                            // cảm ứng). Mỗi cấp rộng 92px cộng đoạn nối 28-36px,
                            // nên ~1000px là vừa tám cấp; hơn thế thì dải kéo
                            // hết bề ngang thẻ và cấp thứ mười lăm vẫn nằm ngoài
                            // khung - tức vẫn phải cuộn, chỉ là sau khi đã nhìn
                            // qua một hàng dài hơn mắt bắt được.
                            className="overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar overscroll-x-contain [contain:paint] [backface-visibility:hidden] [transform:translateZ(0)] xl:min-w-0 xl:max-w-[1000px]"
                            style={{ WebkitOverflowScrolling: "touch" }}
                          >
                            <div className="flex items-stretch gap-0 min-w-max [backface-visibility:hidden]">
                              {LEVELS.map((lvl, idx) => {
                                const isUserCurrent = currentUserLevel === lvl.level;
                                const isPassed = currentUserLevel > lvl.level;
                                const isReached = isPassed || isUserCurrent;
                                const members = communityUsersByLevel.get(lvl.level) || [];
                                const accent = ACCENTS[idx % ACCENTS.length];
                                const isOpen = openLevel === lvl.level;

                                return (
                                  <div key={lvl.level} className="flex items-stretch sm:animate-fade-in [backface-visibility:hidden]">
                                    {idx > 0 && (
                                      // mb ≈ nửa chiều cao thẻ cấp: đường nối
                                      // phải cắt ngang giữa thẻ, nên hai con số
                                      // này đi cùng nhau - sửa min-h thì sửa cả
                                      // mb, nếu không đường nối tụt xuống chân.
                                      <div className={`w-5 sm:w-7 h-0.5 self-end mb-[33px] shrink-0 ${isReached ? "bg-emerald-400 dark:bg-emerald-600" : "bg-stone-200 dark:bg-stone-800"}`} />
                                    )}
                                    <div className="flex flex-col items-center gap-1.5 shrink-0">
                                      <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex items-center justify-center select-none pointer-events-none overflow-hidden rounded-full border border-stone-200/50 dark:border-stone-800/50 bg-stone-50 dark:bg-stone-800 [backface-visibility:hidden] [transform:translateZ(0)]">
                                        <img
                                          src={`/levels/level${lvl.level}.jpg`}
                                          alt={t.levelTitles[lvl.level] ?? lvl.name}
                                          className={`w-full h-full object-cover transform-gpu [backface-visibility:hidden] transition-all duration-300 ${
                                            isReached ? "scale-[1.08] hover:scale-[1.15]" : "grayscale opacity-40 contrast-75"
                                          }`}
                                        />
                                      </div>

                                      <button
                                        onClick={() => setActiveTooltipLevel((prev) => (prev === lvl.level ? null : lvl.level))}
                                        // Chiều cao là SÀN, không phải chiều cao cố định. `h-[88px]` được chọn cho
                                        // tên cấp tiếng Việt; "Financial Advisor" và "Investing Legend"
                                        // dài hơn, nên dòng XP và huy hiệu số người bị đẩy ra ngoài khung.
                                        // Hàng cha là `items-stretch`, nên thẻ cao nhất kéo cả hàng theo -
                                        // chúng vẫn bằng nhau, chỉ là bằng nhau ở chiều cao đủ chứa chữ.
                                        className={`relative text-left rounded-lg border px-1.5 py-1 w-[84px] min-h-[66px] shrink-0 bg-white dark:bg-stone-900 transition-all cursor-pointer flex flex-col [backface-visibility:hidden] ${
                                          isReached
                                            ? `${accent.border} ${isOpen ? "scale-[1.02]" : ""}`
                                            : "border-stone-100 dark:border-stone-800 opacity-60 grayscale hover:opacity-90 hover:grayscale-0"
                                        }`}
                                      >
                                        {isUserCurrent && (
                                          <span className="absolute -top-1 -left-1 flex w-3 h-3">
                                            <span className={`relative inline-flex w-3 h-3 rounded-full border-2 border-white dark:border-stone-900 ${accent.solid}`} />
                                          </span>
                                        )}
                                        <div className="flex items-center justify-between gap-1">
                                          <span className={`text-[10px] font-black uppercase tracking-wider ${isReached ? accent.text : "text-stone-400 dark:text-stone-500"}`}>
                                            L{lvl.level}
                                          </span>
                                          {isUserCurrent && (
                                            <span className={`text-[7px] font-black uppercase text-white px-1 py-0.5 rounded-full ${accent.solid}`}>{t.dashboard.youBadge}</span>
                                          )}
                                        </div>
                                        <p className={`text-[10px] font-bold leading-snug line-clamp-2 flex-1 ${isReached ? "text-stone-900 dark:text-stone-100" : "text-stone-500 dark:text-stone-500"}`}>
                                          {t.levelTitles[lvl.level] ?? lvl.name}
                                        </p>
                                        {/* Cấp có cổng CFA phải nói ra, nếu không thẻ đang nói dối
                                            bằng cách nói thiếu. L9 đòi 3.600 XP VÀ 5 mô-đun CFA
                                            (lib/levels.ts), nhưng thẻ chỉ ghi ngưỡng XP - nên người học
                                            5.036 XP thấy mình đứng ở L8 cạnh một tấm thẻ ghi "3.600 XP"
                                            và kết luận hệ thống xếp sai cấp. Họ suy luận đúng theo đúng
                                            cái luật duy nhất được cho xem. */}
                                        {lvl.minCfaCompleted ? (
                                          <p className="text-[9px] text-amber-600 dark:text-amber-500 leading-tight">
                                            {format(t.finalOne.dashboardClient.levelCfaGate, { count: lvl.minCfaCompleted })}
                                          </p>
                                        ) : null}
                                        {/* XP và số người học ở CÙNG một dòng.
                                            Trước đây là hai dòng, dòng dưới còn
                                            là một viên thuốc bo tròn có nền màu
                                            riêng - ba mảng màu trên một tấm thẻ
                                            92px, chỉ để nói hai con số. */}
                                        <div className="mt-0.5 flex items-baseline justify-between gap-1 text-[9px] tabular-nums text-stone-400 dark:text-stone-500">
                                          <span>{format(t.finalOne.dashboardClient.xpValue, { xp: lvl.minXp })}</span>
                                          <span className={isReached ? accent.text : undefined}>👥 {members.length}</span>
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <AnimatePresence initial={false}>
                          {openLevel !== null && (() => {
                            const lvl = LEVELS.find((l) => l.level === openLevel)!;
                            const members = communityUsersByLevel.get(openLevel) || [];
                            const accent = ACCENTS[LEVELS.indexOf(lvl) % ACCENTS.length];
                            return (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className={`mt-4 rounded-xl ${accent.bg} p-4`}>
                                  <p className={`text-xs font-black uppercase tracking-wider ${accent.text} mb-3`}>
                                    {format(t.dashboard.levelMembers, { level: lvl.level, name: t.levelTitles[lvl.level] ?? lvl.name, count: members.length })}
                                  </p>
                                  {members.length > 0 ? (
                                    <div className="grid sm:grid-cols-2 gap-2">
                                      {members.slice(0, 20).map((m, i) => (
                                        <Link
                                          key={i}
                                          href={`/nguoi-hoc/${m.userId}`}
                                          className="flex items-center gap-2.5 bg-white dark:bg-stone-900 rounded-lg px-3 py-2.5 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                                        >
                                          {isValidAvatar(m.avatarUrl) ? (
                                            // next/image chứ không phải <img>: đây là ảnh trong
                                            // Supabase Storage (hoặc Google OAuth), và một thẻ <img>
                                            // trần kéo về BẢN GỐC - tới 2MB - để vẽ ra 32 điểm ảnh,
                                            // cho từng người xem, mỗi lần cache hết hạn.
                                            <Image src={m.avatarUrl} alt={m.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover shrink-0" />
                                          ) : (
                                            <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center text-xs font-black shrink-0">
                                              {m.name.charAt(0).toUpperCase()}
                                            </div>
                                          )}
                                          <span className="flex-1 min-w-0 text-sm font-bold text-stone-800 dark:text-stone-200 truncate">
                                            {m.name}
                                          </span>
                                          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 shrink-0">
                                            {format(t.finalOne.dashboardClient.xpValue, { xp: m.xp })}
                                          </span>
                                        </Link>
                                      ))}
                                      {members.length > 20 && (
                                        <p className="text-xs font-bold text-stone-400 dark:text-stone-500 italic sm:col-span-2">
                                          {format(t.dashboard.levelAndOthers, { count: members.length - 20 })}
                                        </p>
                                      )}
                                    </div>
                                  ) : (
                                    <p className="text-sm font-bold text-stone-400 dark:text-stone-500 italic">
                                      {t.dashboard.levelNoMembers}
                                    </p>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })()}
                        </AnimatePresence>

                        {/* Góc yên tĩnh, bản nhỏ, nằm trong chính thẻ này.
                            Nó từng là một tấm thẻ riêng cao gần bằng thẻ bản
                            đồ, cho một dòng chữ và hai liên kết - và đứng
                            riêng thì nó đòi được đọc ngang hàng với tiến độ
                            học. Ở đây nó vẫn ở màn hình đầu, chỉ là ở đúng
                            trọng lượng của nó. */}
                        {/* Mục tiêu nghề đứng CẠNH góc yên tĩnh, không dưới
                            nó. Trước đây nó nằm tận lưới dưới, cách bản đồ cấp
                            độ một màn hình - trong khi cả hai trả lời cùng một
                            câu "tôi đang đi tới đâu", chỉ khác thước đo: một
                            cái đo cấp, cái kia đo nghề nhắm tới.
                            Hai cột trên màn rộng, vì xếp dọc là cộng thêm
                            chiều cao vào đúng thẻ vừa được thu gọn. */}
                        {/* MỘT khối tiến độ, không phải hai thẻ cạnh nhau.
                            Trước đây đây là lưới hai cột chứa hai tấm thẻ có
                            viền riêng: một thẻ cam (lời động viên) và một thẻ
                            chàm (mục tiêu nghề), đặt ngang vai nhau, cạnh một
                            banner thi màu xanh lá ở cột phải. Ba khối, ba họ
                            màu, cùng trọng lượng - và không khối nào nói được
                            "đây là việc tiếp theo của bạn".
                            Giờ mục tiêu nghề đứng trên vì nó trả lời đúng câu
                            đó, còn lời động viên tụt xuống dưới một nét kẻ,
                            đúng vai một dòng chữ phụ. */}
                        <div className="mt-2.5 rounded-lg border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-900">
                          {!isLessonsView && <CareerGoalWidget userId={user?.id} compact={isCompactCard} />}
                          {user?.id && (
                            <div className="mt-2.5 border-t border-stone-200/80 pt-2.5 dark:border-stone-800">
                              {/* LUÔN compact, không theo preset nữa. Thẻ này là một câu động viên,
                                  không phải một bước trong vòng lặp chơi - ở chế độ
                                  "Đầy đủ" nó từng nở thành một thẻ viền dày tô cam
                                  chiếm nhiều chỗ hơn cả khối nhiệm vụ ngay dưới. Bản
                                  compact bỏ vỏ và giữ đúng câu chữ, nên nội dung không
                                  mất, chỉ thôi tranh chỗ. */}
                              <DailyMotivationWidget userId={user.id} compact />
                            </div>
                          )}
                        </div>
                    </div>

                  </div>

                  <div className="min-w-0 rounded-xl bg-stone-50/85 dark:bg-stone-900/60 p-3 xl:p-3.5">
                    <UserStats
                      xp={userXp}
                      lessonsCompleted={totalDone}
                      totalLessons={totalLessons}
                      avgQuizScore={avgQuizScore}
                      userId={user?.id}
                      sidebar={true}
                      embedded={true}
                      compact={isCompactCard}
                    />
                  </div>
                </div>
              </div>
            );
          })()}

        {/* Nút chuyển mức dày đặc. Chỉ ở trang tổng quan - xem `showOptional`.
            Cố ý là một hàng nhỏ, chữ thường, không viền nổi: nó là một tuỳ
            chọn hiển thị, không phải một việc cần làm, nên nó không được
            tranh chỗ với thứ người học vào đây để làm. */}
        {!isLessonsView && (
          // `xl:col-span-12` ở đây là bắt buộc, không phải trang trí.
          //
          // Dải này là một Ô của lưới 12 cột phía trên. Thiếu col-span thì nó
          // chiếm ĐÚNG MỘT cột: hai chữ "Bảng nhìn" bị ép xuống dòng, dải dạt
          // sang mép trái, và khối nội dung `col-span-12` ngay sau không lọt
          // cạnh nó nên bị đẩy xuống hàng kế.
          //
          // Hàng nó bỏ lại là hàng `minmax(0,1fr)` - hàng nuốt toàn bộ chiều
          // cao còn thừa của trang. Kết quả: một dải trống bằng nửa màn hình
          // với đúng một cái nút nhỏ nằm ở mép trái.
          //
          // Và vì thế bản mẫu hàng ở lưới cha cũng phải thành ba hàng
          // (auto_auto_minmax), nếu không hàng thứ ba là hàng ngầm và mất luôn
          // ràng buộc chiều cao mà `minmax(0,1fr)` đang giữ.
          //
          // `justify-start` là CỐ Ý, không phải sót. Dải này từng `justify-end`.
          // Đừng lẫn nó với triệu chứng mô tả ở đoạn trên: chỗ đó nói "dạt sang
          // mép trái" là khi THIẾU `xl:col-span-12` - cả dải co vào một cột hẹp
          // và kéo theo một khoảng trống nửa màn hình. Còn ở đây dải vẫn trải
          // đủ 12 cột, chỉ là nội dung neo về đầu hàng.
          <div className="flex items-center justify-start gap-2 xl:col-span-12">
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {t.dashboard.presetLabel}
            </span>
            <div
              role="group"
              aria-label={t.dashboard.presetLabel}
              className="inline-flex rounded-xl border border-stone-200 bg-white p-0.5 dark:border-stone-800 dark:bg-stone-900"
            >
              {([
                { id: "gon" as const, label: t.dashboard.presetCompact, hint: t.dashboard.presetCompactHint },
                { id: "day-du" as const, label: t.dashboard.presetFull, hint: t.dashboard.presetFullHint },
              ]).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => choosePreset(opt.id)}
                  aria-pressed={preset === opt.id}
                  title={opt.hint}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    preset === opt.id
                      ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                      : "text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={`grid grid-cols-1 gap-4 sm:gap-5 min-w-0 ${isLessonsView ? "xl:flex-1 xl:min-h-0 xl:grid-cols-12 xl:gap-3.5" : "xl:col-span-12 xl:min-h-0 xl:grid-cols-12 xl:gap-3.5"}`}>

          {/* Left Column: Learning Path (7 columns on desktop xl+) */}
          {/* min-h keeps this column's height roughly stable across track
              switches (CFA's content is much shorter than the 10-stage
              accordion) - without it, the sticky right sidebar (below)
              visibly jumps/flashes as the browser recalculates its
              scrollable range every time this column's height changes. */}
          <div className={`space-y-5 min-w-0 ${isLessonsView ? "xl:col-span-8 xl:min-h-0 xl:overflow-y-auto xl:pr-1.5" : "xl:col-span-4 xl:min-h-0 xl:overflow-y-auto xl:pr-0.5"}`}>

            {/* Thẻ "Vào Học bài" từng đứng ở đây. Nó chuyển thành tab thứ
                hai của thẻ Bản đồ Cấp độ phía trên, nên cột này giờ bắt đầu
                bằng góc yên tĩnh. */}

            {/* Lối vào Lộ trình học, đứng ĐẦU cột trái.
                Trang đó trả lời câu mà dashboard không trả lời: bắt đầu từ
                đâu, mỗi ngày bao nhiêu, bao giờ thì xong - và trước thẻ này
                nó chỉ có một dòng trong navbar, tức là ai chưa mở navbar ra
                thì không biết nó tồn tại.
                Trước đó nó đứng dưới góc yên tĩnh, và đó là sai thứ tự theo
                đúng lập luận mà chú thích cũ của góc yên tĩnh tự viết ra: chỗ
                để đặt xuống không nên đứng trên việc người ta vào đây để làm.
                Góc yên tĩnh nằm ngay dưới thẻ này.
                Đây là một thẻ liên kết, KHÔNG phải một tab dashboard: chú
                thích đầu app/(app)/lo-trinh/page.tsx nói rõ vì sao không thêm
                giá trị nào vào DASHBOARD_TABS nữa.

                Hạ độ nổi: nó từng là viền đôi xanh, nền chuyển sắc, khối biểu
                tượng 64px và chữ font-black cỡ xl - tức thẻ nổi nhất cột, cho
                một đường dẫn sang trang khác. Thứ nổi nhất trên dashboard nên
                là việc học, không phải cửa ra. Giờ nó là một hàng liên kết
                bình thường, màu xanh chỉ còn xuất hiện lúc trỏ chuột vào.

                "Đứng ĐẦU cột trái" là chữ của chú thích này từ đầu, và có một
                giai đoạn nó không còn đúng: widget chuỗi ngày được chèn lên
                trên mà chú thích vẫn nói vậy. Giờ khớp lại - thẻ này trước,
                chuỗi ngày ngay sau. */}
            {!isLessonsView && (
              <Link
                href="/lo-trinh"
                className="group flex items-center gap-3.5 rounded-xl border border-stone-200 bg-white p-4 transition-all hover:border-emerald-300 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-emerald-800"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <Route className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-tight text-stone-900 dark:text-stone-50">
                    {t.nav.learningPath}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-stone-500 dark:text-stone-400">
                    {t.dashboard.learningPathCardSub}
                  </p>
                </div>
                <span className="shrink-0 text-lg font-bold text-stone-300 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-500 dark:text-stone-600">
                  ›
                </span>
              </Link>
            )}

            {/* Chuỗi ngày học của người khác, đưa lại theo yêu cầu sau khi
                bị gỡ ở 30bca5b. Nó CHỒNG với CommunityLearningNow ở cột phải -
                cả hai đều liệt kê người kèm số ngày - và đó là lý do nó từng
                bị gỡ. Khác nhau ở hình dạng: cái này là danh sách dọc gọn
                trong cột trái, cái kia là băng chuyền ngang kèm bài vừa học.
                Giữ cả hai là một quyết định có người nhìn thấy, không phải
                một lần sót - và nó đã được nói lại lần thứ ba, sau khi widget
                bị gỡ ở 85b0f34 với lý do trùng lặp. Đừng gỡ lần nữa nếu không
                có yêu cầu mới. */}
            {!isLessonsView && isFullPreset && <CommunityStreakWidget />}

            {/* Góc yên tĩnh chuyển vào TRONG thẻ Bản đồ Cấp độ, bản nhỏ. */}

            {isLessonsView && (
            <>
            {/* Đầu trang tiến trình thay cho thẻ "Tiếp tục học".
                Thẻ cũ chỉ có một nút; khối này giữ nguyên nút đó làm hành động
                CHÍNH, và đặt quanh nó ba thứ người học phải tự suy ra trước
                đây: đang cấp mấy, còn bao nhiêu XP nữa lên cấp, và học xong bài
                này thì mở ra cái gì. `data-tour` giữ nguyên tên để bước hướng
                dẫn trỏ vào đúng chỗ cũ. */}
            <div data-tour="resume-learning">
              <LearningProgressHeader
                userXp={userXp}
                stages={progressStages}
                nextMission={nextMission}
              />
            </div>

            {/* Trên /hoc-bai chỗ này là lộ trình, không phải lời chúc.
                Người đang ở trang học bài đã quyết định học rồi; câu họ còn
                cần là "còn bao nhiêu, bao lâu nữa xong", không phải một câu
                động viên. Thẻ chào mừng ở lại trang tổng quan.

                Chỗ này từng là một ternary `isLessonsView ? lộ trình : chào
                mừng`, và vế else của nó là mã chết: cả khối nằm bên trong
                `{isLessonsView && (`, nên điều kiện luôn đúng khi tới được
                đây. Không có lỗi biên dịch nào cho một nhánh không bao giờ
                chạy, và chú thích ngay trên nó thì mô tả nhánh ấy như thật.

                `done` đếm theo TRACK ĐANG HỌC chứ không phải totalDone ngay
                dưới đây - totalDone là mọi bài đã học ở cả hai track, đặt cạnh
                totalLessons (chỉ track hiện tại) sẽ ra tỷ lệ vượt 100% cho ai
                đã học cả hai. */}
            {/* Lộ trình và sổ tay đã chuyển sang CỘT PHẢI, gộp thành một bảng -
                xem chỗ dựng ở đó. Lý do đặt sổ tay cạnh lộ trình vẫn giữ
                nguyên (ghi chú là việc làm TRONG lúc học, không phải một đích
                đến chọn từ menu); chỉ khác là bây giờ cả hai đứng cạnh danh
                sách bài thay vì chen giữa nó và thẻ tiếp tục học. */}

            {/* The recall / mistake / remediation widgets used to sit here, at
                the top of this column. Now that the column is a fixed-height
                scroll panel that would put them in front of the lesson list on
                every visit, forcing a scroll past them to reach the stages -
                they render in the right-hand column instead. */}

            {/* Bookmarks Section */}
            {bookmarks.length > 0 && (
              <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 py-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <Bookmark className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-stone-900 dark:text-stone-100">{t.dashboard.savedTitle}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">{t.dashboard.savedSubtitle}</p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                  >
                    {t.dashboard.seeAll}
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {bookmarks.map((bookmark) => (
                    <Link
                      key={bookmark.id}
                      href={`/bai-hoc/${bookmark.lesson_slug}`}
                      className="group rounded-lg bg-stone-50 dark:bg-stone-950/40 px-4 py-3 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-stone-900 dark:text-stone-100 line-clamp-2">
                            {bookmark.lesson_title}
                          </p>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                            {format(t.dashboard.bookmarkedOn, { date: new Date(bookmark.created_at).toLocaleDateString(intlLocale(locale)) })}
                          </p>
                        </div>
                        <Bookmark className="w-4 h-4 shrink-0 text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}


          {/* Track selector - Compact. All 3 cards use h-full + flex-col
              justify-between so they land on the same height regardless of
              how many content lines each one has (personal/CFA got a fun
              one-line subtitle added specifically to match professional's,
              which was shortened to a single inline badge to compensate). */}
          <div
            id="lo-trinh"
            data-tour="track-selector"
            className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-stretch scroll-mt-24 ${
              // The branch strip below belongs to the professional card, so it
              // sits one grid-gap away rather than a full section break - the
              // section's own margin then comes from the strip instead.
              isTrackView && activeTrack === "professional" ? "mb-3.5" : "mb-8"
            }`}
          >
            {/* Card 2: Tài chính Cá Nhân (Amber Gold Accent) */}
            <div className="relative group h-full">
              <button
                type="button"
                onClick={() => setActiveTrack("personal")}
                className={`relative w-full h-full flex flex-col text-left rounded-xl border px-5 py-4 transition-colors duration-200 overflow-hidden ${
                  isTrackView && activeTrack === "personal"
                    ? "border-stone-300 bg-white text-stone-900 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100"
                    : "border-stone-200/80 bg-white/70 text-stone-700 hover:border-stone-300 dark:border-stone-800/90 dark:bg-stone-900/60 dark:text-stone-300 dark:hover:border-stone-700"
                }`}
              >
                {/* Nét chỉ dấu trên đầu thẻ mang toàn bộ việc phân biệt track,
                    và đậm lên khi thẻ được chọn. Trước đây trạng thái chọn nói
                    bằng border-2 màu CỘNG ring-2 màu CỘNG nét này - ba lớp cùng
                    nói một điều, quanh một thẻ vốn đã nằm cạnh đúng một thẻ
                    khác. Một nét là đủ để biết đang ở đâu. */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 transition-colors ${
                  isTrackView && activeTrack === "personal" ? "bg-amber-500" : "bg-amber-500/30"
                }`} />
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <div className="text-base font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
                    {t.trackStages.personal.title}
                  </div>
                </div>
                <div className="text-xs mt-1.5 text-stone-500 dark:text-stone-400 font-normal">
                  {format(t.dashboard.foundationHours, { hours: TRACK_PERSONAL.estimatedHours })}
                </div>
                <div className="sm:hidden text-xs mt-2 leading-snug text-stone-500 dark:text-stone-400">
                  {t.trackStages.personal.description}
                </div>
              </button>

              {/* Hover Tooltip (pointer devices) */}
              <div className="absolute bottom-full left-0 sm:left-1/2 sm:-translate-x-1/2 mb-3 hidden sm:group-hover:block z-50 w-max max-w-xs">
                <div className="bg-stone-900 dark:bg-stone-800 text-white rounded-xl px-4 py-3 shadow-lg border border-stone-800 dark:border-stone-700">
                  <p className="text-sm font-bold mb-2">{t.trackStages.personal.description}</p>
                  <div className="space-y-1 text-xs text-stone-300">
                    {t.trackStages.personal.pillars.map((pillar) => (
                      <div key={pillar} className="flex gap-2">
                        <span>•</span>
                        <span>{pillar}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-stone-900 dark:border-t-stone-800" />
              </div>
            </div>

            {/* Card 3: Tài chính Chuyên Ngành (Emerald Green Accent) */}
            <div className="relative group h-full">
              <button
                type="button"
                onClick={() => setActiveTrack("professional")}
                className={`relative w-full h-full flex flex-col text-left rounded-xl border px-5 py-4 transition-colors duration-200 overflow-hidden ${
                  isTrackView && activeTrack === "professional"
                    ? "border-stone-300 bg-white text-stone-900 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100"
                    : "border-stone-200/80 bg-white/70 text-stone-700 hover:border-stone-300 dark:border-stone-800/90 dark:bg-stone-900/60 dark:text-stone-300 dark:hover:border-stone-700"
                }`}
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 transition-colors ${
                  isTrackView && activeTrack === "professional" ? "bg-emerald-500" : "bg-emerald-500/30"
                }`} />
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <div className="text-base font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
                    {t.trackStages.professional.title}
                  </div>
                </div>
                <div className="text-xs mt-1.5 text-stone-500 dark:text-stone-400 font-normal">
                  {t.dashboard.advancedLessons}
                </div>
                <div className="sm:hidden text-xs mt-2 leading-snug text-stone-500 dark:text-stone-400">
                  {t.trackStages.professional.description}
                </div>
              </button>

              {/* Hover Tooltip (pointer devices) */}
              <div className="absolute bottom-full left-0 sm:left-1/2 sm:-translate-x-1/2 mb-3 hidden sm:group-hover:block z-50 w-max max-w-xs">
                <div className="bg-stone-900 dark:bg-stone-800 text-white rounded-xl px-4 py-3 shadow-lg border border-stone-800 dark:border-stone-700">
                  <p className="text-sm font-bold mb-2">{t.trackStages.professional.description}</p>
                  <div className="space-y-1 text-xs text-stone-300">
                    {t.trackStages.professional.pillars.map((pillar) => (
                      <div key={pillar} className="flex gap-2">
                        <span>•</span>
                        <span>{pillar}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-stone-900 dark:border-t-stone-800" />
              </div>
            </div>
          </div>

          {/* "Tài chính chuyên ngành" split into focused branches -
              purely filters which of TRACK_PROFESSIONAL's stages show,
              same lessons/locking/XP either way.

              A filter strip rather than a card grid: these are a sub-choice
              of the professional track above, not a third peer group beside
              the two track cards. Cards also read badly here - seven of them
              in a three-column grid left one stranded on its own row, and
              their column rhythm fought the two-column track selector right
              above. Each branch's subtitle moves to a single line under the
              strip, so only the selected one is spelled out. */}
          {isTrackView && activeTrack === "professional" && (
            <div className="mb-8">
              {/* Wraps on desktop instead of scrolling: the seven pills need
                  ~1180px and the content column is narrower than that, so a
                  scroll strip would leave branches permanently off-screen with
                  nothing to hint at them. Mobile keeps the swipeable strip,
                  where a wrapped set would run five rows deep. */}
              {/* Bộ lọc phân loại, không phải bảy nút quảng cáo.
                  Trước đây mỗi nhánh là một viên thuốc bo tròn có emoji, và
                  nhánh đang chọn được tô đen đặc - tương phản mạnh nhất trên cả
                  màn hình cho một thứ chỉ là bộ lọc. Giờ là dải tab gạch chân:
                  nhãn làm chính, gạch dưới bằng màu nhấn nói cái nào đang chọn,
                  emoji bỏ đi vì nó không phân biệt được bảy nhánh với nhau. */}
              <div className="flex gap-5 overflow-x-auto sm:flex-wrap sm:gap-6 scrollbar-none border-b border-stone-200 dark:border-stone-800">
                {PROFESSIONAL_BRANCHES.map((branch) => {
                  const isActive = professionalBranch === branch.id;
                  return (
                    <button
                      key={branch.id}
                      onClick={() => handleSetProfessionalBranch(branch.id)}
                      className={`shrink-0 whitespace-nowrap border-b-2 pb-2 text-xs transition-colors cursor-pointer ${
                        isActive
                          ? "border-emerald-600 font-bold text-stone-900 dark:border-emerald-500 dark:text-stone-100"
                          : "border-transparent font-semibold text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
                      }`}
                    >
                      {t.professionalBranches[branch.id]?.label ?? branch.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2.5 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
                {t.professionalBranches[professionalBranch]?.subtitle ??
                  PROFESSIONAL_BRANCHES.find((b) => b.id === professionalBranch)?.subtitle}
              </p>
            </div>
          )}

          {/* Các nhánh render theo tab widget (weekly-challenge, cards,
              cosmetics) đã bỏ: isTrackTab chặn những giá trị đó ngay ở chỗ đọc
              localStorage, nên activeDashboardTab không thể mang chúng nữa. Ba
              widget đó vẫn ở RPG hub. Đây là bước còn thiếu của c3f7ec9 -
              commit đó gỡ dải tab nhưng để lại phần render mà dải tab từng mở. */}
          <>
          {/* ── Search Bar (Compact Left) + Flag Mode Controls (Right) ── */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Left: Compact Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                value={stageSearchQuery}
                onChange={(e) => setStageSearchQuery(e.target.value)}
                placeholder={t.dashboard.searchPlaceholder}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-sm font-medium text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              {stageSearchQuery && (
                <button
                  onClick={() => setStageSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                  title={t.dashboard.searchClear}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Right: Flag Mode Controls */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              {flagSelectionMode && (
                <>
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400 hidden lg:inline">
                    {format(t.dashboard.selectedCount, { count: selectedFlagLessonIds.size })}
                  </span>
                  <button
                    onClick={clearFlagSelection}
                    className="px-3 py-2 text-xs font-bold rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors cursor-pointer"
                  >
                    {t.dashboard.cancel}
                  </button>
                  <button
                    onClick={applyManualFlags}
                    disabled={flagSaving || selectedFlagLessonIds.size === 0}
                    className="px-3 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    {flagSaving ? t.dashboard.markLearned.saving : t.dashboard.markLearned.confirm}
                  </button>
                </>
              )}

              <div data-manual-flag-info-root className="relative group">
                <button
                  onClick={() => {
                    if (flagSelectionMode) clearFlagSelection();
                    else setFlagSelectionMode(true);
                  }}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 ${
                    flagSelectionMode
                      ? "border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300"
                      : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800"
                  }`}
                >
                  <span>{t.dashboard.markLearned.button}</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setManualFlagInfoOpen((current) => !current);
                    }}
                    className="inline-flex items-center justify-center rounded-full border border-stone-300 dark:border-stone-700 w-4 h-4 text-[10px] font-black text-stone-500 transition-colors hover:bg-stone-100 dark:text-stone-400"
                    aria-expanded={manualFlagInfoOpen}
                    aria-label={t.dashboard.markLearned.help}
                  >
                    ?
                  </span>
                </button>

                <div className={`absolute right-0 top-full z-30 mt-2 w-80 max-w-[90vw] rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 text-xs text-stone-700 dark:text-stone-300 leading-relaxed shadow-xl origin-top-right transition-all duration-150 space-y-2 ${
                  manualFlagInfoOpen ? "opacity-100 scale-100 pointer-events-auto" : "pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                }`}>
                  {/* Split into segments rather than one string, so the <strong>
                      and the coloured <span> stay in JSX. A dictionary value
                      carrying markup would have to be dangerouslySetInnerHTML'd
                      to render, and word order differs between the two
                      languages anyway. */}
                  <p>
                    {t.dashboard.markLearned.autoPart1}
                    <strong>{t.dashboard.markLearned.autoAnd}</strong>
                    {t.dashboard.markLearned.autoPart2}
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {t.dashboard.markLearned.autoColour}
                    </span>
                    {t.dashboard.markLearned.autoPart3}
                  </p>
                  <p>
                    {t.dashboard.markLearned.manualPart1}
                    <span className="font-semibold text-sky-600 dark:text-sky-400">
                      {t.dashboard.markLearned.manualColour}
                    </span>
                    {t.dashboard.markLearned.manualPart2}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stages + lessons ── */}
          <div data-tour="stage-list" className="space-y-6 mt-8">
          {(activeTrack === "professional"
            ? track.stages.filter((s) => (PROFESSIONAL_BRANCHES.find((b) => b.id === professionalBranch)!.stageLabels as readonly string[]).includes(s.label))
            : track.stages
          ).map((stage) => {
            const stageLessons = lessonsByStageLabel.get(stage.label) ?? [];
            const stageHasSearchMatch = stageLessons.some(lessonMatchesSearch);
            if (isSearchingStages && !stageHasSearchMatch) return null;
            const stageDone = stageLessons.filter((l) => completed.includes(l.id)).length;
            const stageLockedCount = stageLessons.filter((l) => isLessonLocked(l)).length;
            const stageKey = `${activeTrack}-${stage.label}`;
            const stageOpen = openStages.has(stageKey) || (isSearchingStages && stageHasSearchMatch);

            const stageIdx = track.stages.findIndex((s) => s.label === stage.label);
            // Chữ hiển thị của chặng. Tra theo VỊ TRÍ trong `track.stages`, còn
            // `stage.label` thì giữ nguyên tiếng Việt ở mọi chỗ nó là khoá:
            // `lessonsByStageLabel`, `id={`stage-...`}` và cột `stage_label` đã
            // ghi xuống Supabase cho mốc đã qua. Dịch khoá là mất tiến độ của
            // người học, không phải mất một dòng chữ.
            const stageCopy = t.trackStages[activeTrack]?.stages[stageIdx];
            let isStageLockedByMilestone = false;
            let prevStageLabel = "";
            let prevStageLessonsCount = 0;
            let prevStageDone = 0;
            let prevMilestonePassed = false;
            
            if (stageIdx > 1) {
              const prevStage = track.stages[stageIdx - 1];
              prevStageLabel = prevStage.label;
              const prevStageLessons = lessonsByStageLabel.get(prevStage.label) ?? [];
              prevStageLessonsCount = prevStageLessons.length;
              prevStageDone = prevStageLessons.filter((l) => completed.includes(l.id)).length;
              
              const isPrevStageCompleted = prevStageLessons.length > 0 && prevStageDone === prevStageLessons.length;
              prevMilestonePassed = passedMilestones.some((m) => m.stage_label === prevStage.label);
              isStageLockedByMilestone = false; // Gỡ khóa bài học theo yêu cầu người dùng, mở hoàn toàn
            }
            const isCurrentMilestonePassed = passedMilestones.some((m) => m.stage_label === stage.label);

            return (
              <div key={stage.label} id={`stage-${stage.label}`}>
                {/* Stage header - click to expand/collapse */}
                {(() => {
                  const themeKey = `${activeTrack}-${stage.label}`;
                  const theme = STAGE_THEMES[themeKey] || { emoji: "📖", bg: "bg-stone-100 dark:bg-stone-800", text: "text-stone-900 dark:text-stone-100", barColor: "bg-stone-500" };
                  const percent = stageLessons.length ? (stageDone / stageLessons.length) * 100 : 0;
                  return (
                    // Hàng chặng là div-có-role chứ không phải <button>, vì nó
                    // CHỨA một nút khác (nút chứng chỉ bên dưới). <button>
                    // lồng trong <button> là HTML không hợp lệ, và trình duyệt
                    // xử lý bằng cách bỏ nút bên trong ra khỏi luồng tiêu điểm
                    // - nên bản cũ dùng <span role="button"> để lách, đổi lấy
                    // việc người dùng bàn phím không bao giờ lấy được chứng
                    // chỉ của chính mình.
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleStage(stageKey)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleStage(stageKey);
                        }
                      }}
                      className={`w-full flex items-center gap-3 cursor-pointer text-left flex-wrap sm:flex-nowrap transition-all ${
                        isCurrentMilestonePassed
                          ? "bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02] border border-emerald-500/20 px-4 py-3 rounded-xl mb-4"
                          : "border-b border-stone-100 dark:border-stone-800/40 pb-3 mb-4"
                      }`}
                    >
                      <span className={`text-xs font-extrabold px-3 py-1.5 rounded-lg flex items-center ${
                        isCurrentMilestonePassed
                          ? "bg-emerald-500 text-white"
                          : `${theme.bg} ${theme.text}`
                      }`}>
                        {stageDisplayLabels.get(stage.label) || stageCopy?.label || stage.label}
                      </span>
                      {stage.isNew && (
                        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400 shrink-0">
                          {t.dashboard.isNew}
                        </span>
                      )}
                      <span className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100 flex-1 leading-snug">{stageCopy?.name ?? stage.name}</span>
                      {isCurrentMilestonePassed ? (
                        <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs font-bold text-stone-600 dark:text-stone-300 shrink-0 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded-lg">
                        {t.dashboard.milestone.passed}
                      </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCertStage({ label: stage.label, name: stage.name });
                            }}
                            className="flex items-center gap-1 text-[11px] font-bold text-white shrink-0 bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                          >
                            {t.dashboard.milestone.certificate}
                          </button>
                        </div>
                      ) : isStageLockedByMilestone ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-rose-500 dark:text-rose-400 shrink-0">
                          <Lock className="w-3 h-3" /> {t.dashboard.milestone.awaiting}
                        </span>
                      ) : (
                        stage.available && stageLockedCount > 0 && (
                          <span className="flex items-center gap-1 text-xs font-bold text-stone-500 dark:text-stone-400 shrink-0">
                            <Lock className="w-3 h-3" />
                            {format(t.dashboard.lockedCount, { count: stageLockedCount })}
                          </span>
                        )
                      )}
                      {/* TRẠNG THÁI + THANH, thay cho con số trần "1/20".
                          Con số ấy bắt người đọc tự chia rồi tự kết luận, và nó
                          nói cùng một giọng ở cả chặng vừa mở lẫn chặng sắp
                          xong. Ba trạng thái - đã xong / đang học / chưa bắt
                          đầu - trả lời thẳng "tôi đang ở đâu", còn thanh trả
                          lời "còn bao xa".

                          Thanh giờ hiện ở MỌI cỡ màn hình. Bản cũ `hidden
                          sm:block`, nên trên điện thoại - nơi phần lớn người
                          học mở app - thứ duy nhất còn lại đúng là con số vừa
                          bỏ. */}
                      {stage.available && stageLessons.length > 0 && (
                        <div className="flex items-center gap-2.5 shrink-0 ml-auto sm:ml-0">
                          <span
                            className={`text-[11px] font-bold uppercase tracking-[0.1em] ${
                              stageDone === stageLessons.length
                                ? "text-emerald-700 dark:text-emerald-400"
                                : stage.label === currentStageLabel
                                  ? "text-stone-900 dark:text-stone-100"
                                  : "text-stone-400 dark:text-stone-500"
                            }`}
                          >
                            {stageDone === stageLessons.length
                              ? t.progressHeader.stageDone
                              : stage.label === currentStageLabel
                                ? t.progressHeader.stageCurrent
                                : t.progressHeader.stageOpen}
                          </span>
                          <div className="h-1 w-20 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800 sm:w-24">
                            <div
                              className={`h-full rounded-full transition-[width] duration-500 ease-out ${
                                stageDone === stageLessons.length
                                  ? "bg-emerald-600 dark:bg-emerald-500"
                                  : "bg-stone-900 dark:bg-stone-300"
                              }`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="w-9 text-right text-[11px] font-bold tabular-nums text-stone-500 dark:text-stone-400">
                            {Math.round(percent)}%
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
                    </div>
                  );
                })()}

                {/* Not available yet - with lock and loading animation */}
                {stageOpen && !stage.available && (
                  <div className="border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-xl px-5 py-6 text-center bg-stone-50 dark:bg-stone-900/50 relative overflow-hidden">
                    {/* Building background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-200 dark:via-stone-800 to-transparent opacity-30" />

                    {/* Lock icon */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-stone-200 dark:bg-stone-700 flex items-center justify-center animate-bounce">
                        <svg className="w-6 h-6 text-stone-600 dark:text-stone-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1C6.48 1 2 5.48 2 11v10c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V11c0-5.52-4.48-10-10-10zm0 2c4.41 0 8 3.59 8 8v2H4v-2c0-4.41 3.59-8 8-8zm-3 13h6v2H9z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-stone-600 dark:text-stone-400 text-sm font-extrabold">{t.dashboard.stageLockedTitle}</p>
                        <p className="text-stone-500 dark:text-stone-400 text-xs mt-1">{t.dashboard.stageLockedHint}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Available but no lessons in DB yet - with building animation */}
                {stageOpen && stage.available && stageLessons.length === 0 && (
                  <div className="border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-xl px-5 py-6 text-center bg-emerald-50 dark:bg-emerald-950/50 relative overflow-hidden">
                    {/* Construction bars */}
                    <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20">
                      <div className="w-1 bg-stone-400 rounded-full" style={{ height: '20px' }} />
                      <div className="w-1 bg-stone-400 rounded-full" style={{ height: '28px' }} />
                      <div className="w-1 bg-stone-400 rounded-full" style={{ height: '24px' }} />
                      <div className="w-1 bg-stone-400 rounded-full" style={{ height: '20px' }} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="text-3xl animate-bounce">🏗️</div>
                      <p className="text-stone-600 dark:text-stone-400 text-sm font-extrabold">{t.dashboard.buildingTitle}</p>
                      <p className="text-stone-500 dark:text-stone-400 text-xs">{t.dashboard.buildingSubtitle}</p>
                    </div>
                  </div>
                )}

                {/* Parts (sub-stages) - each its own collapsible accordion */}
                {stageOpen && stage.available && stageLessons.length > 0 && !isStageLockedByMilestone && (
                  <div className="space-y-3">
                    {stage.parts.map((part, partIdx) => {
                      const partLessons = lessonsByPartKey.get(`${stage.label}::${part.name}`) ?? [];
                      if (partLessons.length === 0) return null;
                      const partHasSearchMatch = partLessons.some(lessonMatchesSearch);
                      if (isSearchingStages && !partHasSearchMatch) return null;
                      const visiblePartLessons = isSearchingStages ? partLessons.filter(lessonMatchesSearch) : partLessons;
                      const partDone = partLessons.filter((l) => completed.includes(l.id)).length;
                      const partLockedCount = partLessons.filter((l) => isLessonLocked(l)).length;
                      const partKey = `${stageKey}-${part.name}`;
                      const partOpen = openParts.has(partKey) || (isSearchingStages && partHasSearchMatch);

                      return (
                        <div key={part.name} className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
                          <button
                            onClick={() => togglePart(partKey)}
                            className="w-full flex items-center gap-3 px-5 py-3.5 bg-stone-50 dark:bg-stone-900/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer text-left"
                          >
                            <span className="font-bold text-stone-800 dark:text-stone-300 text-sm">{stageCopy?.parts[partIdx] ?? part.name}</span>
                            <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                              {format(t.dashboard.lessonRange, { from: lessonOrdinal.get(partLessons[0].id) ?? "", to: lessonOrdinal.get(partLessons[partLessons.length - 1].id) ?? "" })}
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
                              {visiblePartLessons.map((lesson) => {
                                const isDone = completed.includes(lesson.id);
                                const locked = isLessonLocked(lesson);
                                const isFlagged = flaggedLessonIds.has(lesson.id);
                                const isSelectedForFlag = selectedFlagLessonIds.has(lesson.id);

                                if (locked) {
                                  return (
                                    <button
                                      key={lesson.id}
                                      onClick={() => handleLockedLessonClick(lesson)}
                                      className="w-full text-left block rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
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
                                          <div className="text-base font-bold leading-snug text-stone-500 dark:text-stone-300">
                                            {lesson.title}
                                          </div>
                                          <div className="text-sm mt-1 truncate text-stone-400 dark:text-stone-400">
                                            {isWaitingOnChallenge(lesson)
                                              ? t.dashboard.unlockByChallenge
                                              : t.dashboard.unlockByRequest}
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
                                    className={`block rounded-lg border transition-all ${
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
                                          {String(lessonOrdinal.get(lesson.id) ?? lesson.id).padStart(3, "0")}
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
                                          {isFlagged ? t.dashboard.markLearned.flaggedSubtitle : lesson.subtitle}
                                        </div>
                                        <div className="text-[11px] mt-0.5 text-stone-400 dark:text-stone-500 font-semibold">
                                          {/* The time estimate also sits in the desktop meta
                                              column to the right, which is `hidden sm:flex` -
                                              so on mobile it would never be shown at all
                                              without repeating it here. */}
                                          <span className="sm:hidden">⏱ {formatLessonTime(lesson, t.dashboard.minutesShort)} · </span>
                                          {format(t.dashboard.learnerCount, { count: getIllustrativeCount(lesson.slug, 60, 480) })}
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
                                          aria-label={t.dashboard.markLearned.selectAria}
                                        >
                                          <CheckCheck className="w-3.5 h-3.5" />
                                        </button>
                                      )}

                                      {/* Meta */}
                                      <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                                        <span className={`text-sm font-semibold ${isDone ? "text-emerald-700 dark:text-emerald-400" : isFlagged ? "text-sky-700 dark:text-sky-400" : "text-stone-600 dark:text-stone-400"}`}>
                                          {formatLessonTime(lesson, t.dashboard.minutesShort)}
                                        </span>
                                        <span className={`text-sm font-bold rounded-lg px-3 py-1 ${
                                          isDone
                                            ? "bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-300"
                                            : isFlagged
                                              ? "bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300"
                                            : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                                        }`}>
                                          {isDone
                                              ? t.dashboard.markLearned.doneBadge
                                              : isFlagged
                                                ? t.dashboard.markLearned.flaggedBadge
                                                : t.difficulty[lesson.difficulty]}
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
                                            {t.dashboard.appeal}
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
                  <div className="mt-4 p-5 rounded-xl border border-amber-300 bg-amber-500/[0.04] dark:border-amber-950/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                        {format(t.dashboard.milestone.eligible, { stage: stage.label })}
                      </h4>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                        {t.dashboard.milestone.eligibleBodyPart1}<strong>{t.finalOne.dashboardClient.milestoneBonusXp}</strong>{t.dashboard.milestone.eligibleBodyPart2}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveMilestoneExam({
                        label: stage.label,
                        name: stage.name,
                        lessonIds: stageLessons.map((l) => l.id)
                      })}
                      className="px-4 py-2 text-xs font-extrabold bg-amber-500 hover:bg-amber-600 text-white rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                    >
                      {t.dashboard.milestone.start}
                    </button>
                  </div>
                )}

                {/* Locked Stage Banner (if stage is locked by previous stage milestone) */}
                {stageOpen && stage.available && isStageLockedByMilestone && (
                  <div className="border-2 border-dashed border-rose-200/60 dark:border-rose-950/40 rounded-xl px-5 py-8 text-center bg-rose-500/[0.02] relative overflow-hidden">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-stone-900 dark:text-stone-100 text-sm font-extrabold">{t.dashboard.stageLockedBadge}</p>
                        <p className="text-stone-500 dark:text-stone-400 text-xs mt-1 max-w-xs mx-auto leading-relaxed">
                          {t.dashboard.milestone.lockedPart1}<strong>{format(t.dashboard.milestone.lockedExamName, { stage: prevStageLabel })}</strong>{t.dashboard.milestone.lockedPart2}
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
                  {t.finalOne.dashboardClient.bonusLabel}
                </span>
                <span className="text-lg font-extrabold text-stone-900 dark:text-stone-100" role="heading" aria-level={2}>{t.dashboard.caseStudies}</span>
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
                      {group.label}
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
                          className="w-full text-left block rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <div className="flex items-center gap-4 px-6 py-4">
                            <div className="flex-shrink-0">
                              <div className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
                                <Lock className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-base font-bold leading-snug text-stone-500 dark:text-stone-300">
                                {lesson.title}
                              </div>
                              <div className="text-sm mt-0.5 truncate text-stone-400 dark:text-stone-400">
                                {isWaitingOnChallenge(lesson)
                                  ? t.dashboard.unlockByChallenge
                                  : t.dashboard.unlockByRequest}
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
                        className={`block rounded-lg border transition-all ${
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
                              {isFlagged ? t.dashboard.markLearned.flaggedSubtitle : lesson.subtitle}
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
                              aria-label={t.dashboard.markLearned.selectAria}
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
      </>
      )}
      </div>

          {/* Right: Cấp độ/streak/bài học, gợi ý hôm nay, thử thách tin tức, BXH (3 columns on desktop xl+, full width on mobile/tablet) */}
          {/* Ba hàng, khai báo hẳn ra. Cột này có BỐN khối: phần thưởng
              (chiếm dọc hai hàng đầu), gợi ý, mục tiêu nghề, và Góc yên tĩnh
              trải ngang cả hai cột. Với `grid-rows-[minmax(0,1fr)_auto]` thì
              khối thứ tư không còn chỗ và trình duyệt tự đẻ ra một HÀNG NGẦM
              thứ ba - hàng đó không nằm trong khai báo nên chiều cao của nó
              không ai tính.

              Và cột này phải TỰ CUỘN, như mọi bảng khác trong bố cục này. Bỏ
              `overflow-hidden` ở khối ngoài cùng làm phần thừa hết bị cắt,
              nhưng nó không làm phần thừa biến mất - tấm thẻ cam chuyển từ
              "bị cắt" sang "tràn ra ngoài khung". Hàng đầu là `minmax(0,1fr)`
              nên nó co lại được tới 0, còn hai hàng `auto` ở dưới thì không:
              khi bản đồ cấp độ ở hàng trên cao lên, chỗ còn lại cho cột này
              hụt đúng bằng phần chênh, và phần hụt ấy phải đi đâu đó. */}
          {/* Lưới hai cột ở trên CHỈ đúng khi CombinedRewardsWidget còn đó:
              nó là đứa con `xl:row-span-2` chiếm trọn cột thứ nhất. Ở chế độ
              Gọn widget ấy bị ẩn, và một `grid-cols-2` còn đúng một đứa con sẽ
              để trống nửa bề ngang - nên chế độ Gọn xếp chồng thay vì lên
              lưới. Đây là lý do preset phải đổi cả lớp CSS của cột chứ không
              chỉ ẩn widget: chú thích dài ở ngay trên đã ghi rằng bố cục này
              nhạy tới mức thừa một khối là trình duyệt tự đẻ ra một hàng ngầm. */}
          <div className={`min-w-0 space-y-6 ${
            isLessonsView
              ? "xl:col-span-4 xl:min-h-0 xl:overflow-y-auto xl:pr-1.5"
              : isFullPreset
                ? "xl:space-y-0 xl:col-span-8 xl:min-h-0 xl:overflow-y-auto xl:grid xl:grid-cols-2 xl:grid-rows-[minmax(0,1fr)_auto] xl:gap-3.5"
                : "xl:col-span-8 xl:min-h-0 xl:overflow-y-auto xl:pr-0.5"
          }`}>
            {/* Lộ trình + sổ tay, MỘT bảng hai hàng, đứng đầu cột phải.
                Trước đây là hai tấm thẻ rời chia đôi một hàng ở cột trái, chen
                giữa thẻ "tiếp tục học" và danh sách bài - tức là mỗi lần vào
                học đều phải lướt qua chúng để tới thứ mình vào để làm.

                Gộp chứ không chỉ dời: hai thẻ ấy mỗi cái mang một viền 2px và
                một nền gradient riêng, đặt cạnh nhau trong cột hẹp thành hai
                khung tranh nhau. Bảng này giữ viền, hai hàng bên trong chỉ còn
                một đường kẻ ngăn - còn màu nhận dạng (xanh cho lộ trình, hổ
                phách cho sổ tay) chuyển hết vào ô biểu tượng, nơi nó phân biệt
                được hai hàng mà không tốn thêm cái khung nào.

                Vẫn chỉ hiện ở chế độ xem bài, y như trước khi dời: trang tổng
                quan chưa từng dựng hai thẻ này. */}
            {isLessonsView && (
              <div className="divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white dark:divide-stone-800 dark:border-stone-800 dark:bg-stone-900">
                <LearningPathSummary
                  track={activeTrack}
                  done={sorted.filter((l) => completed.includes(l.id)).length}
                  total={sorted.length}
                />
                <NotesShortcutCard />
              </div>
            )}

            {/* Study aids, beside the lesson list rather than stacked on top of
                it - see the note in the left column. */}
            {isLessonsView && user?.id && (
              <>
                <LessonRecallWidget userId={user.id} />
                <MistakeReviewWidget userId={user.id} />
                <SmartRemediationWidget userId={user.id} lessonsMeta={lessonsMeta} />
              </>
            )}

            {/* Rewards and the career goal picker are overview concerns; the
                lessons route keeps only the "what to study next" widget. */}
            {/* `lg:aspect-square` và `min-h-[320px]` đã bỏ khỏi lớp bọc dưới
                đây: cả hai ép thẻ cao hơn nội dung của nó, và phần chênh hiện
                ra thành đúng khoảng trắng dưới danh sách nhiệm vụ. Một tấm thẻ
                hình vuông chỉ đúng khi nội dung tình cờ vuông.
                `xl:row-span-2` giữ lại: nó cho thẻ CHỖ để cao bằng cột bên,
                chứ không bắt nó phải cao thế. */}
            {!isLessonsView && isFullPreset && user?.id && (
              <div className="xl:row-span-2 xl:min-h-0 xl:overflow-y-auto">
                <CombinedRewardsWidget userId={user.id} defaultExpanded={true} compact />
              </div>
            )}
            {user?.id && (
              // `space-y-4`: hai khối bên dưới là hai thẻ riêng, mỗi cái có nền
              // và viền của mình, nhưng lớp bọc này trước đây không có khoảng
              // cách nào - nên chúng dính liền thành một thẻ trông như bị vỡ ở
              // giữa.
              <div
                className={`space-y-4 ${isLessonsView ? "" : "xl:min-h-0 xl:overflow-y-auto"}`}
              >
                <DashboardRecommendations />
                {/* Người thật, dưới phần gợi ý. Cố ý đặt SAU băng chuyền bài
                    học: thứ tự đó nói rằng đây là bằng chứng cho những gợi ý
                    trên, không phải một mục để lướt qua trước khi học. */}
                {showOptional && <CommunityLearningNow lessonsMeta={lessonsMeta} />}
                {/* Câu hỏi hôm nay, làm ngay tại chỗ, ngay dưới danh sách
                    chuỗi ngày. Đặt ở đây là cố ý: khối trên vừa cho thấy người
                    khác đang học, và thứ hợp lý tiếp theo là một việc làm được
                    ngay trong ba mươi giây mà không phải rời trang.

                    KHÔNG dựng thẻ mới. Widget này đã tồn tại và đang chạy ở
                    /kiem-tra; chú thích trong chính nó còn nói nó được thiết
                    kế cho thanh bên dashboard ("On the dashboard sidebar this
                    is now treated as a 'today in finance' block"), tức là nó
                    từng ở đây và bị gỡ ra. Viết một thẻ quiz thứ hai sẽ tách
                    đôi cả kho câu hỏi lẫn đường ghi phần thưởng.

                    Hiện ở cả hai nơi KHÔNG cộng XP hai lần: `claimQuestReward`
                    chặn theo ngày ở phía máy chủ và trả về `claimed: false`
                    cho lần thứ hai - xem chú thích "false only means already
                    claimed today" trong lib/supabase-quests.ts. Sau khi hết
                    lượt nhận thưởng, widget vẫn còn chế độ luyện không giới
                    hạn, nên thẻ không biến thành một ô chết trong ngày. */}
                {showOptional && user?.id && <DailyNewsQuizWidget userId={user.id} compact />}
                {/* Ba lối vào "thử sức", DƯỚI băng chuyền người đang học.
                    Hai trong ba đã chết trong mã: BossBattleModal và
                    PvpDuelModal vẫn được dựng ở cuối tệp này, nhưng
                    setShowBossBattle(true)/setShowPvpModal(true) không được
                    gọi ở đâu từ lúc thẻ mini-game bị gỡ. */}
                {!isLessonsView && isFullPreset && (
                  <DashboardArenaCard
                    onOpenBoss={() => setShowBossBattle(true)}
                    onOpenPvp={() => setShowPvpModal(true)}
                  />
                )}
              </div>
            )}
            {/* CareerGoalWidget chuyển vào TRONG thẻ Bản đồ Cấp độ, cạnh góc yên tĩnh. */}

          </div>
        </div>
      </div>
      </div>




      {appealTarget && user?.id && (
        <LessonAppealModal userId={user.id} lesson={appealTarget} onClose={() => setAppealTarget(null)} />
      )}

      {/* One-time spotlight walkthrough for brand-new users */}
      <DashboardTour userId={user?.id} view={view} />

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

      {selectedCertStage && user?.id && (
        <CertificateModal
          stageLabel={selectedCertStage.label}
          stageName={selectedCertStage.name}
          userName={user?.user_metadata?.full_name || user?.email || t.dashboard.defaultUserName}
          userId={user.id}
          onClose={() => setSelectedCertStage(null)}
        />
      )}

      {heroExamLevel !== null && user?.id && (
        <RigorousLevelExamModal
          levelToTest={heroExamLevel}
          userId={user.id}
          onClose={() => setHeroExamLevel(null)}
          onExamPassed={() => setHeroExamLevel(null)}
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
      {showBossBattle && user?.id ? (
        <BossBattleModal
          bossName={t.dashboard.boss.name}
          bossEmoji="🐉"
          userLevel={getLevelByXp(userXp, cfaCompletedForLevel).level}
          equipments={equippedGear}
          questions={[
            // `correct: 0` is safe here: BossBattleModal shuffles via
            // lib/quiz-shuffle, so position leaks nothing. Option length does
            // survive the shuffle - see the note on t.dashboard.boss.
            { prompt: t.dashboard.boss.q1, options: ["> 8%", "= 8%", "< 8%"], correct: 0 },
            {
              prompt: t.dashboard.boss.q2,
              options: [
                t.dashboard.boss.q2o1,
                t.dashboard.boss.q2o2,
                t.dashboard.boss.q2o3,
              ],
              correct: 0,
            },
            { prompt: t.dashboard.boss.q3, options: ["1.0x", "5.0x", "10.0x"], correct: 0 }
          ]}
          onVictory={async ({ xp, coins }) => {
            // XP goes in as a game_sessions row, not a direct total_xp write.
            // recalculateUserStats recomputes total_xp from scratch out of
            // the sources it knows about, and boss battles weren't one - so
            // the old direct write showed up, then silently vanished on the
            // next recompute. Routing it through game_sessions also puts it
            // under the same best-per-game_type 50 XP ceiling as every other
            // game, instead of minting a parallel currency.
            // Qua `grant_coins`, không đọc-rồi-ghi từ client: trigger 20260914
            // khoá cột `coins` với vai trò trình duyệt, nên câu update cũ sẽ
            // báo thành công mà số dư không đổi.
            //
            // Server chặn trên ở 50 cho một ván. Nó chưa chặn được việc gọi
            // lại - điểm số do client báo và không có gì ở server dựng lại được
            // ván đấu - nhưng mọi lượt cấp đều để lại một hàng trong
            // `coin_grants`, nên chuyện đó đọc ra được.
            const { data: grant } = await supabase.rpc("grant_coins", {
              p_source: "game",
              p_ref: null,
              p_amount: coins,
            });
            const grantRow = Array.isArray(grant) ? grant[0] : grant;
            const newCoins = grantRow?.coins_left ?? 0;
            const userId = user.id;
            if (!userId) return;
            await supabase.from("game_sessions").insert({
              user_id: userId,
              game_type: "boss-battle",
              score: 1,
              total: 1,
              xp_earned: xp,
            });
            await recalculateUserStats(userId).catch(() => {});
            window.dispatchEvent(new CustomEvent("thtcdn:coin-updated", { detail: { coins: newCoins } }));
            toast.success(format(t.finalOne.dashboardClient.bossDefeatedToast, { xp, coins }));
          }}
          onClose={() => setShowBossBattle(false)}
        />
      ) : null}

      {showPvpModal && (
        <BossBattleModal
          userLevel={getLevelByXp(userXp, cfaCompletedForLevel).level}
          equipments={equippedGear}
          completedLessonCount={completed.length}
          onClose={() => setShowPvpModal(false)}
        />
      )}

      {user?.id && (
        <DiagnosticPlacementModal
          userId={user.id}
          isOpen={showPlacementModal}
          onClose={() => setShowPlacementModal(false)}
        />
      )}
    </div>
  );
}
