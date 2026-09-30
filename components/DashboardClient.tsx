"use client";

import { useState, useEffect, useCallback, useMemo, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import CoCoAvatar from "@/components/CoCoAvatar";
import PracticalSkillPanel from "@/components/PracticalSkillPanel";
import CoCoSays from "@/components/CoCoSays";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, Lock, CheckCheck, Bookmark, ChevronLeft, ChevronRight, Search, X, Route, Users, Construction, Clock, LockOpen, ChevronDown, Play, Layers, HardHat, Flag, FileText, Compass, BookOpen, Award, ArrowRight, Trophy, GitBranch, Code2, Globe, Braces, Database, Server, Cloud, ShieldCheck, Smartphone, Cpu, GraduationCap, BriefcaseBusiness, TerminalSquare, Sparkles, type LucideIcon } from "lucide-react";
import { getCommunityLearningNow, getLessonLearnerCounts, type CommunityLearner } from "@/lib/community-learning";
import { stripStageLessonPrefix } from "@/lib/lesson-stage-prefix";
import { useResizableSidebar, SIDEBAR_MIN_WIDTH, SIDEBAR_MAX_WIDTH } from "@/lib/use-resizable-sidebar";
import { useProgress } from "@/lib/client-hooks";
import { DEFAULT_PRESET, getStoredPreset, storePreset, type DashboardPreset } from "@/lib/dashboard-preset";
import { mergeCompletedLessons } from "@/lib/progress";
import { getIllustrativeCount } from "@/lib/illustrative-stats";
import { getCompletedLessons } from "@/lib/cloudflare-progress";
import type { Difficulty } from "@/lib/lesson-types";
import { createClient } from "@/lib/cloudflare";
import type { CloudflareSession as Session } from "@/lib/cloudflare";
import UserStats from "@/components/UserStats";
import ChatWithAdminWidget from "@/components/ChatWithAdminWidget";
import FloatingStudyGroupChat from "@/components/FloatingStudyGroupChat";
import LessonAppealModal from "@/components/LessonAppealModal";
import OnboardingFlow from "@/components/OnboardingFlow";
import ResumeLearningButton from "@/components/ResumeLearningButton";
import LearningFocusHero from "@/components/LearningFocusHero";
import StreakReminderManager from "@/components/StreakReminderManager";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import DashboardTour from "@/components/DashboardTour";
import DashboardRecommendations from "@/components/DashboardRecommendations";
import LearningGoalCard from "@/components/learning-flows/LearningGoalCard";
import CommunityLearningNow from "@/components/CommunityLearningNow";
import DashboardLeaderboardCard from "@/components/DashboardLeaderboardCard";
import DailyNewsQuizWidget from "@/components/DailyNewsQuizWidget";
import DashboardArenaCard from "@/components/DashboardArenaCard";
import MistakeReviewWidget from "@/components/MistakeReviewWidget";
import LessonRecallWidget from "@/components/LessonRecallWidget";
import SmartRemediationWidget from "@/components/SmartRemediationWidget";
import OnlineUsersWidget from "@/components/OnlineUsersWidget";
import ReferralPromptModal from "@/components/ReferralPromptModal";
import DiagnosticPlacementModal from "@/components/DiagnosticPlacementModal";
import CombinedRewardsWidget from "@/components/CombinedRewardsWidget";
import { hasCompletedOnboarding, completeOnboarding } from "@/lib/cloudflare-onboarding";
import { getUserProfile, recalculateUserStats, getLeaderboardByMetric } from "@/lib/cloudflare-user";
import { syncLocalLevelExams } from "@/lib/cloudflare-level-exams";
import { getDashboardSummary, getLessonState, type DashboardSummary, type LessonState } from "@/lib/cloudflare-dashboard-optimized";
import { getLevelByXp, getLevelProgress, LEVELS, XP_PER_LESSON } from "@/lib/levels";
import UnlockRequestModal from "@/components/UnlockRequestModal";
import StageMilestoneExamModal from "@/components/StageMilestoneExamModal";
import CertificateModal from "@/components/CertificateModal";
import { trackTotals } from "@/lib/track-totals";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL, isLessonInRange, PROFESSIONAL_BRANCHES, type ProfessionalBranchId } from "@/lib/track-stages";
import { getLessonShortTitle } from "@/lib/lesson-labels";
import { BONUS_CATEGORIES, BONUS_CATEGORY_FALLBACK, BONUS_CATEGORY_ORDER } from "@/lib/bonus-lesson-categories";
import { TRACKS } from "@/lib/tracks";
import { getChallengePassedLessonIds } from "@/lib/cloudflare-challenges";
import { addLessonFlag, getUserLessonFlags, removeLessonFlag } from "@/lib/cloudflare-lesson-flags";
import { getUserBookmarks, type LessonBookmark } from "@/lib/cloudflare-bookmarks";
import { getPassedMilestones, savePassedMilestone, type MilestoneCompletion } from "@/lib/cloudflare-milestones";
import { syncOfflineQueue } from "@/lib/offline-sync";
import { isValidAvatar } from "@/lib/avatar-utils";
// CosmeticStore/TechCardCollection/WeeklyChallengeWidget không còn import ở
// đây: các nhánh render của chúng đã bỏ cùng những giá trị tab không ai chọn
// được. Ba widget đó sống ở RPG hub.
import TechCharacterAvatar, { CharacterEquipments } from "@/components/TechCharacterAvatar";
import { Sys, panel, btnPrimary, btnSecondary, tabClass } from "@/components/ui/system";

/* i18n-ignore-start: định danh hệ thống trong thanh tiêu đề khung, không phải
   chữ hiển thị để dịch - cùng một chuỗi ở mọi ngôn ngữ, như đường dẫn tệp. */
const SYS = {
  dashboard: "THCN://APP/DASHBOARD",
  lessons: "THCN://APP/HOC-BAI",
  bonus: "THCN://APP/HOC-BAI/BONUS",
};
/* i18n-ignore-end */
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
  "personal-Chặng 0": { emoji: "🔍", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "personal-Chặng 1": { emoji: "🧠", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "personal-Chặng 2": { emoji: "📈", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "personal-Chặng 3": { emoji: "💼", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "personal-Chặng 4": { emoji: "📊", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "personal-Chặng 5": { emoji: "🔬", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "personal-Chặng 6": { emoji: "🛡️", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  // Professional Track Stages
  "professional-Chặng 1": { emoji: "📖", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "professional-Chặng 2": { emoji: "📊", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "professional-Chặng 3": { emoji: "🧮", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "professional-Chặng 4": { emoji: "💵", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "professional-Chặng 5": { emoji: "🎯", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "professional-Chặng 6": { emoji: "🛡️", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "professional-Chặng 7": { emoji: "📈", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "professional-Chặng 8": { emoji: "⚖️", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "professional-Chặng 9": { emoji: "🔄", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "professional-Chặng 10": { emoji: "👑", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "professional-Chặng 11": { emoji: "🏛️", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "professional-Chặng 12": { emoji: "🧬", bg: "bg-stone-50 dark:bg-stone-900/60 border border-line", text: "text-ink-soft", barColor: "bg-stone-400" },
  "professional-Chặng 13": { emoji: "🤖", bg: "bg-brand-50/60 dark:bg-brand-950/40 border border-accent-line-mid", text: "text-accent-strong", barColor: "bg-brand-500" },
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
 * selected. That is the same stale-tab trap c3f7ec9 fixed for "career"; these
 * were just left in the union.
 */
function isTrackTab(tab: DashboardTab): tab is "personal" | "professional" {
  return tab === "personal" || tab === "professional";
}

/** Hình trong ô biểu tượng của chặng 2 trở đi, xoay vòng. Thứ tự đi theo
 *  lộ trình Nền tảng: Git, lập trình, web, JavaScript, dữ liệu, API, cơ sở dữ
 *  liệu, triển khai... - để hình gần đúng chủ đề ở những chặng người học gặp
 *  đầu tiên. */
/** Một cờ mở/đóng của trang tổng quan, nhớ trong localStorage.
 *
 *  Đọc qua useSyncExternalStore chứ không đọc lúc dựng state: máy chủ không có
 *  localStorage, nên snapshot phía máy chủ luôn là "đóng" và trình duyệt đọc
 *  giá trị thật sau hydrate - không lệch HTML, không cần effect. Mọi lần đọc
 *  và ghi bọc try/catch: Safari riêng tư ném lỗi, và một tuỳ chọn hiển thị
 *  không được làm hỏng trang. */
const subscribeNoop = () => () => {};
function readStoredFlag(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}
function useStoredFlag(key: string): [boolean, () => void] {
  const stored = useSyncExternalStore(subscribeNoop, () => readStoredFlag(key), () => false);
  const [override, setOverride] = useState<boolean | null>(null);
  const value = override ?? stored;
  const toggle = useCallback(() => {
    const next = !value;
    setOverride(next);
    try {
      window.localStorage.setItem(key, next ? "1" : "0");
    } catch {
      // Không lưu được thì lựa chọn chỉ sống trong phiên này.
    }
  }, [key, value]);
  return [value, toggle];
}

const STAGE_ICONS: LucideIcon[] = [GitBranch, Code2, Globe, Braces, Layers, Server, Database, Cloud, FileText, Compass, Cpu, Cloud, BookOpen, ShieldCheck, Smartphone, HardHat];

export default function DashboardClient({ lessonsMeta, view = "overview" }: { lessonsMeta: LessonMeta[]; view?: DashboardView }) {
  const isLessonsView = view === "lessons";
  // Cột phải của /hoc-bai kéo đổi bề rộng được - xem lib/use-resizable-sidebar.ts.
  const sidebar = useResizableSidebar();
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
  const cloudflare = createClient();
  const progress = useProgress();
  const completed = progress.completedLessons;
  // localStorage alone can't be trusted as the progress source of truth - a
  // new browser/device/incognito session has none of it even though the
  // user's real progress lives in Cloudflare (user_progress). Bumping this
  // after merging server data forces a re-render, which makes useProgress()
  // pick up the freshly-merged localStorage snapshot (see mergeCompletedLessons).
  const [, forceProgressResync] = useState(0);
  // Giá trị track cũ không còn hợp lệ trong localStorage được quy về
  // "personal" - nếu không người học mở dashboard ra và không thẻ nào được
  // chọn, nội dung bên dưới thì trống.
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
    if (typeof window === "undefined") return "services";
    const raw = window.localStorage.getItem("professionalBranch");
    // Id cũ đã lưu trước khi đổi tên nhánh.
    const legacy: Record<string, ProfessionalBranchId> = { corporate: "services", investment: "systems", banking: "security-data" };
    const saved = raw ? (legacy[raw] ?? raw) : raw;
    // Validated against PROFESSIONAL_BRANCHES rather than a hand-written list
    // of ids, so every branch written to localStorage survives the next load.
    return PROFESSIONAL_BRANCHES.some((b) => b.id === saved)
      ? (saved as ProfessionalBranchId)
      : "services";
  });

  // Dải pill chỉ hiện mô tả của nhánh ĐANG CHỌN, nên sáu nhánh còn lại là sáu
  // cái nhãn không nói gì: muốn biết "Định lượng & dữ liệu" dạy gì thì phải bấm
  // vào nó, tức phải rời chỗ đang đứng để đọc rồi bấm quay lại. Nút này mở cả
  // bảy mô tả cùng lúc để so sánh trước khi chọn.
  const [showAllBranches, setShowAllBranches] = useState(false);
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
  // "Cá Nhân" card, with the branch pills not rendered at all. Onboarding was exactly such a write. Deriving
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
  /** Bài tính hoàn thành nhờ thi vượt chặng (/thi-vuot-chang), chưa đọc thật. */
  const [examCreditedIds, setExamCreditedIds] = useState<Set<number>>(new Set());
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
  // Dải cấp gọn (chỉ cấp gần) hay đủ 15 cấp; bảng xếp hạng thu gọn hay mở.
  const [showAllLevels, toggleAllLevels] = useStoredFlag("thtcdn_dashboard_all_levels");
  const [rankingOpen, toggleRanking] = useStoredFlag("thtcdn_dashboard_ranking_open");
  const [levelsOpen, setLevelsOpen] = useState(false);
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

      // Bài của chặng xếp THEO THỨ TỰ PHẦN, không theo id. Một phần có thể
      // trỏ tới dải id nằm sau phần kế tiếp (Chặng 1 mở bằng bài 1351, rồi mới
      // tới 263), và `currentLessonId` lấy bài chưa học đầu tiên của danh sách
      // này - xếp theo id thì "bài đang học" nhảy qua bài 001 để chỉ vào 002,
      // trong khi số thứ tự bên cạnh vẫn đếm theo phần.
      const stageLessons: LessonMeta[] = [];
      const seen = new Set<number>();
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
          if (!seen.has(l.id)) {
            seen.add(l.id);
            stageLessons.push(l);
          }
        }
      }
      // Bài thuộc dải của chặng mà không phần nào nhận: giữ lại ở cuối, như
      // trước đây chúng vẫn được đếm.
      for (const l of sorted) {
        if (!seen.has(l.id) && isLessonInRange(l.id, stage) && (!l.track || l.track === activeTrack)) {
          stageLessons.push(l);
        }
      }
      byStage.set(stage.label, stageLessons);
    });

    return {
      lessonOrdinal: ordinal,
      stageDisplayLabels: stageLabelsMap,
      lessonsByStageLabel: byStage,
      lessonsByPartKey: byPart,
    };
  }, [sorted, track, activeTrack, professionalBranch]);

  // Số người vừa học từng chặng (dòng "N người vừa học chặng này") và số người
  // đã học xong từng bài. Chỉ tải ở /hoc-bai - trang tổng quan không dựng
  // danh sách chặng.
  const [communityLearners, setCommunityLearners] = useState<CommunityLearner[]>([]);
  const [lessonLearnerCounts, setLessonLearnerCounts] = useState<Map<number, number> | null>(null);
  useEffect(() => {
    if (!isLessonsView) return;
    let cancelled = false;
    getLessonLearnerCounts()
      .then((counts) => { if (!cancelled) setLessonLearnerCounts(counts); })
      .catch(() => { if (!cancelled) setLessonLearnerCounts(null); });
    getCommunityLearningNow(200, 7)
      .then((list) => { if (!cancelled) setCommunityLearners(list); })
      .catch(() => { if (!cancelled) setCommunityLearners([]); });
    return () => { cancelled = true; };
  }, [isLessonsView]);

  /** Bao nhiêu người vừa học một bài trong chặng này, trong bảy ngày qua.
   *  RPC trả về bài CUỐI CÙNG của mỗi người, nên đây là "vừa học", không phải
   *  "đang mở trang". */
  const learnersInStage = useCallback(
    (stageLessons: LessonMeta[]) => {
      if (communityLearners.length === 0) return 0;
      const ids = new Set(stageLessons.map((l) => l.id));
      return communityLearners.filter((l) => l.lessonId !== null && ids.has(l.lessonId)).length;
    },
    [communityLearners]
  );

  /** Số bài đã học / tổng của MỘT lộ trình, đếm theo đúng luật mà danh sách
   *  bài bên dưới dùng (lessonsByStageLabel): nằm trong khoảng chặng, và không
   *  khai rõ mình thuộc lộ trình khác. */
  const trackCounts = useMemo(() => {
    const count = (trackId: "personal" | "professional") => {
      const stages = (trackId === "professional" ? TRACK_PROFESSIONAL : TRACK_PERSONAL).stages;
      const lessons = sorted.filter(
        (l) => (!l.track || l.track === trackId) && stages.some((stage) => isLessonInRange(l.id, stage))
      );
      return { done: lessons.filter((l) => completed.includes(l.id)).length, total: lessons.length };
    };
    return { personal: count("personal"), professional: count("professional") };
  }, [sorted, completed]);

  /** Tiến độ của từng nhánh chuyên sâu, hiện cạnh tên nhánh trên dải lọc. */
  const branchProgress = useMemo(() => {
    const out = new Map<string, { done: number; total: number }>();
    for (const branch of PROFESSIONAL_BRANCHES) {
      const stages = TRACK_PROFESSIONAL.stages.filter((stage) =>
        (branch.stageLabels as readonly string[]).includes(stage.label)
      );
      const lessons = sorted.filter(
        (l) => (!l.track || l.track === "professional") && stages.some((stage) => isLessonInRange(l.id, stage))
      );
      out.set(branch.id, { done: lessons.filter((l) => completed.includes(l.id)).length, total: lessons.length });
    }
    return out;
  }, [sorted, completed]);

  /** Bài đầu tiên chưa học của lộ trình đang xem - chặng chứa nó tự mở. */
  const currentLessonId = useMemo(() => {
    for (const stage of track.stages) {
      for (const lesson of lessonsByStageLabel.get(stage.label) ?? []) {
        if (!completed.includes(lesson.id)) return lesson.id;
      }
    }
    return null;
  }, [track, lessonsByStageLabel, completed]);

  /** Phụ đề đã nằm sẵn trong lessonsMeta, nên chỉ cần tra. */
  const subtitleById = useMemo(() => new Map(lessonsMeta.map((l) => [l.id, l.subtitle])), [lessonsMeta]);
  const renderSubtitle = (lessonId: number) => subtitleById.get(lessonId) ?? null;


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
        // the branch pills never appeared, and no reload fixed it because the key was never written.
        setActiveTrack(selectedTrack);
        localStorage.setItem(ONBOARDING_LOCAL_KEY, "1");
        setShowOnboarding(false);
      } catch (error) {
        // Lưu lên server hỏng thì vẫn cho vào học: đóng màn hướng dẫn, giữ
        // lộ trình vừa chọn và nhớ trên máy như nút "Bỏ qua". Trước đây lỗi
        // bị nuốt ở đây mà màn hình vẫn đứng yên - bấm "Bắt đầu học" không
        // có phản hồi nào.
        console.error("Error completing onboarding:", error);
        setActiveTrack(selectedTrack);
        localStorage.setItem(ONBOARDING_LOCAL_KEY, "1");
        setShowOnboarding(false);
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
      setExamCreditedIds(new Set(cachedLessonState.exam_credited_lessons ?? []));
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
      setExamCreditedIds(new Set(lessonState.exam_credited_lessons ?? []));
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
      const { data: equips } = await cloudflare
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
      // own check resolved a moment later. SDK client cũ guarantees
      // INITIAL_SESSION fires exactly once with the fully-resolved session
      // (or null), so waiting for that event is what actually removes the
      // race instead of just narrowing it.
      const session = await new Promise<Session | null>((resolve) => {
        let settled = false;
        const {
          data: { subscription },
        } = cloudflare.auth.onAuthStateChange((event, s) => {
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
          } = await cloudflare.auth.getSession();
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
  }, [router, cloudflare.auth, syncProgressAndXP]);

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

    // recalculateUserStats (lib/cloudflare-user.ts) dispatches this on every
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
      <div className="min-h-screen bg-page dark:bg-stone-950 flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          <span className="absolute -inset-1.5 rounded-full border-2 border-stone-300 border-t-brand-600 animate-spin dark:border-stone-700 dark:border-t-brand-400" />
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-surface-raised dark:bg-stone-900">
            <CoCoAvatar size={64} />
          </div>
        </div>
        <p className="text-ink-muted font-semibold text-sm flex items-center gap-1.5">
          {t.dashboard.loading}
          <span className="inline-flex gap-1">
            <span className="w-1.5 h-1.5 rounded-[1px] bg-stone-400" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 rounded-[1px] bg-stone-400" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 rounded-[1px] bg-stone-400" style={{ animationDelay: "300ms" }} />
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
    // Dự phòng là KHOÁ `BONUS_CATEGORY_FALLBACK`, không phải một nhãn đã dịch.
    // Bản cũ so `t.dashboard.bonusOther` với khoá tiếng Việt, nên nó chỉ đúng
    // ở tiếng Việt ("Khác" === "Khác"); với tiếng Anh nhãn ấy là "Other",
    // không khớp nhóm nào, và 25 bài chưa gán nhóm biến mất - chỉ với người
    // đọc tiếng Anh, tức đúng nửa người dùng mà người sửa ít khi mở ra xem.
    // `bonusOther` đã được gỡ khỏi từ điển: nhãn của nhóm dự phòng nay chỉ có
    // một nguồn, `t.bonusCategories["Khác"]`.
    lessons: bonusLessons.filter(
      (l) => (BONUS_CATEGORIES[l.slug] ?? BONUS_CATEGORY_FALLBACK) === category
    ),
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
          className={`mx-auto w-full space-y-5 min-w-0 xl:flex-1 xl:min-h-0 xl:space-y-0 ${
            isLessonsView
              ? "max-w-[1500px] xl:flex xl:flex-col"
              : "max-w-[1500px] pt-2 sm:pt-4"
          }`}
        >

          {/* ── Trang tổng quan: một bàn học, ba tiêu điểm ──
              Lượt làm nhẹ: chỉ ba thứ giữ màu xanh, cỡ chữ và độ tương phản -
              bài đang học (thẻ Học tiếp), cấp hiện tại, và mở khoá kế tiếp.
              Mọi thứ khác lùi xuống: chuỗi ngày thành một dòng, số liệu học
              thành một dòng, năng lực thực hành thu gọn sau "Xem chi tiết",
              cấp khoá xa gộp thành "+N cấp", lời nhắn hôm nay một dòng.
              Không có tính năng nào bị gỡ - mọi thứ lùi đều mở lại được.

              Khung Frame (thanh tiêu đề mono + viền) đã đổi thành một mặt nền
              trắng không viền trên nền giấy: nhóm bằng sắc độ, không bằng
              khung. Mã L{n}/{tổng} ở thanh tiêu đề bỏ theo - cấp đã được nói
              to ngay trong thẻ. */}
          {!isLessonsView && user?.id && (() => {
            const currentUserLevel = getLevelByXp(userXp).level;
            const levelProgress = getLevelProgress(userXp);
            const openLevel = activeTooltipLevel;
            const nextLvl = LEVELS.find((l) => l.level === currentUserLevel + 1) ?? null;
            const xpLeft = nextLvl ? Math.max(0, nextLvl.minXp - userXp) : 0;
            const objStage = currentLessonId !== null
              ? track.stages.find((s) => (lessonsByStageLabel.get(s.label) ?? []).some((l) => l.id === currentLessonId)) ?? null
              : null;
            const objIdx = objStage ? track.stages.indexOf(objStage) : -1;
            const objLessons = objStage ? lessonsByStageLabel.get(objStage.label) ?? [] : [];
            const objDone = objLessons.filter((l) => completed.includes(l.id)).length;
            const objCopy = objIdx >= 0 ? t.revampDashboard.stages[activeTrack]?.[objIdx] : undefined;
            const anyDone = completed.length > 0;

            // Dải cấp: "gần" là cấp đã qua gần nhất, cấp đang đứng và hai cấp
            // kế tiếp. Phần còn lại gộp thành hai nút "+N cấp" ở hai đầu, bấm
            // là mở cả dải (lựa chọn được nhớ). Mở ra thì cấp xa vẫn mờ hẳn và
            // không mang nhãn phụ - nhưng vẫn bấm được để xem thành viên.
            const isNear = (level: number) => level >= currentUserLevel - 1 && level <= currentUserLevel + 2;
            const hiddenBefore = LEVELS.filter((l) => l.level < currentUserLevel - 1).length;
            const hiddenAfter = LEVELS.filter((l) => l.level > currentUserLevel + 2).length;
            const visibleLevels = showAllLevels ? LEVELS : LEVELS.filter((l) => isNear(l.level));
            const moreLevelsButton = (count: number) => (
              <button
                type="button"
                onClick={toggleAllLevels}
                aria-expanded={false}
                className="mx-1.5 shrink-0 cursor-pointer self-center rounded-control px-2.5 py-1.5 font-mono text-[11px] font-medium tabular-nums text-ink-faint transition-colors hover:bg-surface-raised hover:text-ink-body"
              >
                {format(t.revampDashboard.moreLevels, { count })}
              </button>
            );

            return (
              <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start xl:gap-12">
                {/* ── Cột chính: một hành trình đọc từ trên xuống ──
                    1. Học tiếp hôm nay (thẻ duy nhất nổi màu), 2. tiến độ gọn,
                    3. một khu lộ trình. Mọi thứ phụ sang cột phải. */}
                <div className="min-w-0 space-y-10">
                  <div data-tour="resume-learning">
                    <ResumeLearningButton
                      activeTrack={activeTrack}
                      userId={user?.id}
                      compact={isCompactCard}
                      quiet
                      hero
                      footnote={
                        <span className="block truncate" title={objCopy?.outcome}>
                        {objStage ? (
                          <>
                            {format(t.revampDashboard.objectiveStage, {
                              stage: stageDisplayLabels.get(objStage.label) ?? objStage.label,
                              tag: objCopy?.tag ?? "",
                            })}
                            {" · "}
                            <span className="font-mono tabular-nums">
                              {format(t.revampDashboard.objectiveProgress, { done: objDone, total: objLessons.length })}
                            </span>
                            {" · "}
                            {objCopy?.headline ?? t.trackStages[activeTrack]?.stages[objIdx]?.name ?? objStage.name}
                          </>
                        ) : anyDone ? (
                          t.revampDashboard.objectiveAllDone
                        ) : (
                          t.revampDashboard.objectiveNone
                        )}
                        </span>
                      }
                    />
                  </div>

                  {/* ── Tiến độ: cấp, XP, chuỗi ngày trong một mặt nền.
                      Dải cấp đầy đủ và danh sách người ở từng cấp chỉ mở khi
                      bấm "Xem các cấp". */}
                  <section className="rounded-[20px] bg-gradient-to-br from-brand-50 to-white p-5 ring-1 ring-brand-100 sm:p-6 dark:from-brand-950/40 dark:to-stone-900 dark:ring-brand-900/60">
                    <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
                      <div className="flex min-w-0 items-center gap-5">
                        <div className="relative shrink-0">
                          <div className="h-[72px] w-[72px] overflow-hidden rounded-2xl ring-2 ring-white shadow-[0_8px_20px_-12px_rgba(41,97,184,0.7)] dark:ring-brand-900">
                            <Image
                              src={`/levels/level${currentUserLevel}.jpg`}
                              alt={t.levelTitles[currentUserLevel] ?? ""}
                              width={72}
                              height={72}
                              className="h-full w-full scale-[1.08] object-cover"
                            />
                          </div>
                          {/* Huy hiệu cấp đè góc ảnh: dấu thành tích, không phải nút. */}
                          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-600 px-2 py-0.5 font-mono text-[10px] font-black tabular-nums text-white shadow ring-2 ring-white dark:ring-stone-900">
                            LV{String(currentUserLevel).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-strong">
                            {t.revampDashboard.progressTitle}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                            <h3 className="text-xl font-black tracking-tight text-ink-max dark:text-stone-100">
                              {t.levelTitles[currentUserLevel] ?? LEVELS[currentUserLevel - 1]?.name}
                            </h3>
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 font-mono text-[11px] font-bold tabular-nums text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
                              <Sparkles className="h-3 w-3" aria-hidden />
                              {format(t.revampDashboard.totalXp, { xp: userXp })}
                            </span>
                          </div>
                          <div className="mt-3 h-2.5 w-full max-w-[380px] overflow-hidden rounded-full bg-brand-100 dark:bg-white/10">
                            <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-cyan-400 motion-safe:transition-[width] motion-safe:duration-700" style={{ width: `${nextLvl ? Math.max(3, levelProgress) : 100}%` }} />
                          </div>
                          <p className="mt-2 text-xs font-semibold text-ink-body dark:text-stone-300">
                            {nextLvl
                              ? format(t.dashboard.nextUnlockLine, { level: String(nextLvl.level).padStart(2, "0"), name: t.levelTitles[nextLvl.level] ?? nextLvl.name, xp: xpLeft })
                              : t.dashboard.maxLevelLine}
                            {nextLvl && (
                              <span className="font-medium text-ink-muted dark:text-stone-400">
                                {" · "}
                                {format(t.dashboard.nextUnlockHint, { lessons: Math.ceil(xpLeft / XP_PER_LESSON) })}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-sm ring-1 ring-brand-100 dark:bg-stone-900/80 dark:ring-brand-900/60">
                        <DashboardStreakWidget userId={user.id} quiet />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLevelsOpen((v) => !v)}
                      aria-expanded={levelsOpen}
                      className="mt-4 inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-brand-700 transition-colors hover:text-brand-900 dark:text-brand-300 dark:hover:text-brand-200"
                    >
                      {levelsOpen ? t.revampDashboard.hideDetails : t.revampDashboard.showLevels}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${levelsOpen ? "rotate-180" : ""}`} aria-hidden />
                    </button>
                    {levelsOpen && (
                      <div className="mt-2">
                      {/* Dải cấp: gần thì rõ, xa thì gộp. Mũi tên cuộn chỉ cần
                          khi cả dải đang mở - bản gọn vừa một hàng. */}
                      <div className="relative group/level-strip mt-6">
                        {showAllLevels && (
                          <>
                            <button
                              onClick={() => levelStripRef.current?.scrollBy({ left: -220, behavior: "smooth" })}
                              className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-control bg-surface items-center justify-center text-ink-muted hover:text-ink-body transition-all opacity-0 group-hover/level-strip:opacity-100"
                              aria-label={t.dashboard.scrollLeft}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => levelStripRef.current?.scrollBy({ left: 220, behavior: "smooth" })}
                              className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-control bg-surface items-center justify-center text-ink-muted hover:text-ink-body transition-all opacity-0 group-hover/level-strip:opacity-100"
                              aria-label={t.dashboard.scrollRight}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        <div
                          ref={levelStripRef}
                          className="overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar overscroll-x-contain [contain:paint] xl:min-w-0"
                          style={{ WebkitOverflowScrolling: "touch" }}
                        >
                          <div className="flex min-w-max items-stretch">
                            {!showAllLevels && hiddenBefore > 0 && moreLevelsButton(hiddenBefore)}
                            {visibleLevels.map((lvl, idx) => {
                              const isUserCurrent = currentUserLevel === lvl.level;
                              const isPassed = currentUserLevel > lvl.level;
                              const isReached = isPassed || isUserCurrent;
                              const members = communityUsersByLevel.get(lvl.level) || [];
                              const isOpen = openLevel === lvl.level;
                              const isNextLevel = currentUserLevel + 1 === lvl.level;
                              const near = isNear(lvl.level);

                              return (
                                <div key={lvl.level} className="flex items-stretch">
                                  {/* Đoạn nối chỉ ghi giá XP ở đúng một chỗ: bước
                                      sang cấp kế tiếp. Các đoạn khác là một nét
                                      mảnh không chữ. */}
                                  {idx > 0 && (
                                    <div className="flex w-7 shrink-0 flex-col items-center justify-center gap-0.5 sm:w-9">
                                      {isNextLevel && (
                                        <span className="font-mono text-[9px] font-medium tabular-nums text-ink-muted">
                                          {format(t.dashboard.levelGap, { xp: lvl.minXp - (LEVELS.find((l) => l.level === lvl.level - 1)?.minXp ?? 0) })}
                                        </span>
                                      )}
                                      <div className={`h-px w-full ${isReached ? "bg-line-strong" : isNextLevel ? "bg-accent-line-mid" : "bg-line-soft"}`} />
                                    </div>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => setActiveTooltipLevel((prev) => (prev === lvl.level ? null : lvl.level))}
                                    aria-expanded={isOpen}
                                    aria-current={isUserCurrent ? "step" : undefined}
                                    title={t.levelTitles[lvl.level] ?? lvl.name}
                                    className={`relative flex min-h-[64px] w-[96px] shrink-0 cursor-pointer flex-col rounded-control px-2 py-1.5 text-left transition-[background-color,opacity] ${
                                      isUserCurrent
                                        ? "bg-brand-600 text-white dark:bg-brand-600"
                                        : isNextLevel
                                          ? `bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 ${isOpen ? "ring-1 ring-brand-300" : ""}`
                                          : near
                                            ? `hover:bg-surface-raised ${isOpen ? "bg-surface-raised" : ""}`
                                            : `hover:bg-surface-raised hover:opacity-80 ${isOpen ? "bg-surface-raised opacity-80" : "opacity-40"}`
                                    }`}
                                  >
                                    <span className="flex items-center justify-between gap-1">
                                      <Sys className={isUserCurrent ? "text-white" : isNextLevel ? "text-accent-strong" : near ? "text-ink-muted" : "text-ink-faint"}>
                                        LV{String(lvl.level).padStart(2, "0")}
                                      </Sys>
                                      {isPassed && near && <CheckCircle2 className="h-3 w-3 text-ink-faint" aria-hidden />}
                                      {!isReached && <Lock className={`h-2.5 w-2.5 ${isNextLevel ? "text-accent-strong" : "text-ink-faint"}`} aria-hidden />}
                                    </span>
                                    {isNextLevel && (
                                      <span className="mt-0.5 font-mono text-[8px] font-bold tracking-wider text-accent-strong">{t.revampDashboard.nextBadge}</span>
                                    )}
                                    <span className={`mt-0.5 line-clamp-2 flex-1 text-[10.5px] font-bold leading-snug ${isUserCurrent ? "text-white" : isNextLevel ? "text-ink-body" : near ? "text-ink-soft" : "text-ink-faint"}`}>
                                      {t.levelTitles[lvl.level] ?? lvl.name}
                                    </span>
                                    {/* Số người ở cấp: gợi ý rằng bấm vào xem được
                                        ai đang ở đây. Chỉ ở cấp gần. */}
                                    {near && members.length > 0 && (
                                      <span className={`mt-1 inline-flex w-fit items-center gap-1 font-mono text-[9px] tabular-nums ${isUserCurrent ? "text-brand-100" : "text-ink-faint"}`}>
                                        <Users className="h-2.5 w-2.5" aria-hidden /> {members.length}
                                      </span>
                                    )}
                                  </button>
                                </div>
                              );
                            })}
                            {!showAllLevels && hiddenAfter > 0 && moreLevelsButton(hiddenAfter)}
                            {showAllLevels && hiddenBefore + hiddenAfter > 0 && (
                              <button
                                type="button"
                                onClick={toggleAllLevels}
                                aria-expanded
                                className="mx-1.5 shrink-0 cursor-pointer self-center rounded-control px-2.5 py-1.5 text-[11px] font-semibold text-ink-faint transition-colors hover:bg-surface-raised hover:text-ink-body"
                              >
                                {t.revampDashboard.hideDetails}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {openLevel !== null && (() => {
                          const lvl = LEVELS.find((l) => l.level === openLevel)!;
                          const members = communityUsersByLevel.get(openLevel) || [];
                          return (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 rounded-card bg-surface-raised p-4 dark:bg-stone-950">
                                <p className="mb-3 text-xs font-semibold text-ink-muted">
                                  {format(t.dashboard.levelMembers, { level: lvl.level, name: t.levelTitles[lvl.level] ?? lvl.name, count: members.length })}
                                </p>
                                {members.length > 0 ? (
                                  <div className="grid sm:grid-cols-2 gap-2">
                                    {members.slice(0, 20).map((m, i) => (
                                      <Link
                                        key={i}
                                        href={`/nguoi-hoc/${m.userId}`}
                                        className="flex items-center gap-2.5 rounded-control bg-surface px-3 py-2.5 transition-colors hover:bg-surface-sunken"
                                      >
                                        {isValidAvatar(m.avatarUrl) ? (
                                          // next/image chứ không phải <img>: đây là ảnh trong
                                          // storage của hệ cũ (hoặc Google OAuth), và một thẻ <img>
                                          // trần kéo về BẢN GỐC - tới 2MB - để vẽ ra 32 điểm ảnh,
                                          // cho từng người xem, mỗi lần cache hết hạn.
                                          <Image src={m.avatarUrl} alt={m.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover shrink-0" />
                                        ) : (
                                          <div className="w-8 h-8 rounded-full bg-surface-raised text-ink-soft flex items-center justify-center text-xs font-black shrink-0 dark:bg-stone-800">
                                            {m.name.charAt(0).toUpperCase()}
                                          </div>
                                        )}
                                        <span className="flex-1 min-w-0 text-sm font-bold text-ink-heading truncate">
                                          {m.name}
                                        </span>
                                        <span className="font-mono text-xs font-medium tabular-nums text-ink-muted shrink-0">
                                          {format(t.finalOne.dashboardClient.xpValue, { xp: m.xp })}
                                        </span>
                                      </Link>
                                    ))}
                                    {members.length > 20 && (
                                      <p className="text-xs font-bold text-ink-faint italic sm:col-span-2">
                                        {format(t.dashboard.levelAndOthers, { count: members.length - 20 })}
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-sm font-bold text-ink-faint italic">
                                    {t.dashboard.levelNoMembers}
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          );
                        })()}
                      </AnimatePresence>
                      </div>
                    )}
                  </section>

                  {/* ── Lộ trình: mục tiêu đã chọn và gợi ý học tiếp, một khu. */}
                  <section className="space-y-5">
                    <div className="flex flex-wrap items-end justify-between gap-3 px-1">
                      <div>
                        <h2 className="text-xl font-black tracking-tight text-brand-950 dark:text-stone-100">{t.revampDashboard.roadmapTitle}</h2>
                        <p className="mt-1 text-sm text-ink-body dark:text-stone-300">{t.revampDashboard.roadmapSub}</p>
                      </div>
                      <Link
                        href="/lo-trinh"
                        className="group inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-bold text-brand-700 transition-colors hover:bg-brand-100 dark:bg-white/5 dark:text-brand-300 dark:hover:bg-white/10"
                      >
                        <Route className="h-4 w-4" aria-hidden />
                        {t.revampDashboard.roadmapOpen}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </Link>
                    </div>
                    <div className="space-y-8 px-1">
                      <LearningGoalCard quiet warm />
                      <DashboardRecommendations />
                    </div>
                  </section>
                </div>

                {/* ── Cột phải: nhẹ, cho việc luyện tập và thông tin phụ ── */}
                <aside className="min-w-0 space-y-6 xl:sticky xl:top-2">
                  <section className="px-1">
                    <h2 className="text-sm font-black tracking-tight text-ink-max dark:text-stone-100">{t.revampDashboard.practiceTitle}</h2>
                    <p className="mt-0.5 text-xs text-ink-muted dark:text-stone-400">{t.revampDashboard.practiceSub}</p>
                    <nav className="-mx-2.5 mt-3 space-y-0.5">
                      {([
                        { href: "/kiem-tra", label: t.nav.quiz, icon: GraduationCap },
                        { href: "/phong-van-ky-thuat", label: t.nav.technicalInterview, icon: BriefcaseBusiness },
                        { href: "/cong-cu", label: t.nav.toolSimulators, icon: TerminalSquare },
                        { href: "/thi-vuot-chang", label: t.nav.stageSkipExam, icon: Trophy },
                      ] as const).map(({ href, label, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          className="group flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-semibold text-ink-body transition-colors hover:bg-brand-50 hover:text-brand-700 dark:text-stone-300 dark:hover:bg-white/5 dark:hover:text-brand-300"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-white/5 dark:text-brand-300"><Icon className="h-4 w-4" aria-hidden /></span>
                          <span className="flex-1">{label}</span>
                          <ChevronRight className="h-4 w-4 text-ink-faint opacity-0 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden />
                        </Link>
                      ))}
                    </nav>
                  </section>

                  {showOptional && <DailyNewsQuizWidget userId={user.id} compact quiet />}

                  <div className="space-y-5 px-1">
                    <PracticalSkillPanel compact collapsible />
                    <div data-tour="user-stats" className="min-w-0">
                      <UserStats
                        xp={userXp}
                        lessonsCompleted={totalDone}
                        totalLessons={totalLessons}
                        avgQuizScore={avgQuizScore}
                        userId={user?.id}
                        sidebar={true}
                        embedded={true}
                        compact={isCompactCard}
                        hideIdentity
                        quiet
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={toggleRanking}
                        aria-expanded={rankingOpen}
                        className="flex w-full cursor-pointer items-center justify-between gap-2 py-1 text-xs font-semibold text-ink-faint transition-colors hover:text-ink-body"
                      >
                        <span>{t.revampDashboard.rankingLabel}</span>
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${rankingOpen ? "rotate-180" : ""}`} aria-hidden />
                      </button>
                      {rankingOpen && (
                        <div className="mt-3 rounded-2xl bg-surface p-4 dark:bg-stone-900">
                          <DashboardLeaderboardCard userId={user.id} bare />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Chế độ Đầy đủ: phần thưởng, đấu trường và cộng đồng -
                      xếp ở cuối cột phụ, không tranh với việc học. */}
                  {isFullPreset && (
                    <div className="space-y-6">
                      <CombinedRewardsWidget userId={user.id} defaultExpanded={false} compact />
                      <DashboardArenaCard onOpenBoss={() => setShowBossBattle(true)} onOpenPvp={() => setShowPvpModal(true)} />
                      <CommunityLearningNow lessonsMeta={lessonsMeta} />
                      <CommunityStreakWidget />
                    </div>
                  )}

                  <div className="space-y-4 px-1">
                    <DailyMotivationWidget userId={user.id} quiet />
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs text-ink-faint">{t.dashboard.presetLabel}</span>
                      <div role="group" aria-label={t.dashboard.presetLabel} className="inline-flex rounded-full bg-surface-raised p-0.5 dark:bg-stone-900">
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
                            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                              preset === opt.id ? "bg-white text-ink-heading shadow-sm dark:bg-stone-800 dark:text-stone-100" : "text-ink-faint hover:text-ink-body"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            );
          })()}

        {/* Nút chuyển mức dày đặc. Chỉ ở trang tổng quan - xem `showOptional`.
            Cố ý là một hàng nhỏ, chữ thường, không viền nổi: nó là một tuỳ
            chọn hiển thị, không phải một việc cần làm, nên nó không được
            tranh chỗ với thứ người học vào đây để làm. */}
        {/* Ở /hoc-bai hai cột là `minmax(0,1fr)` + bề rộng cột phải do người
            học kéo. Bề ngang đi qua biến CSS chứ không phải gridTemplateColumns
            nội tuyến: dưới `xl` bố cục là một cột, và biến thì vô hại ở mọi
            khổ màn hình. */}
        {isLessonsView && (
        <div
          style={{ "--sidebar-w": `${sidebar.width}px` } as React.CSSProperties}
          className={`grid grid-cols-1 min-w-0 ${isLessonsView ? "gap-4 sm:gap-5 xl:relative xl:flex-1 xl:min-h-0 xl:gap-3.5 xl:[grid-template-columns:minmax(0,1fr)_var(--sidebar-w)]" : "gap-6 xl:col-span-12 xl:min-h-0 xl:grid-cols-12 xl:gap-5"}`}
        >
          {/* Thanh kéo, chỉ từ `xl` trở lên. Đặt tuyệt đối trên lưới thay vì
              làm một rãnh thứ ba, để không cộng thêm một `gap`. */}
          {isLessonsView && (
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label={t.dashboard.sidebarResizeLabel}
              aria-valuenow={sidebar.width}
              aria-valuemin={SIDEBAR_MIN_WIDTH}
              aria-valuemax={SIDEBAR_MAX_WIDTH}
              tabIndex={0}
              onPointerDown={sidebar.onPointerDown}
              onPointerMove={sidebar.onPointerMove}
              onPointerUp={sidebar.endDrag}
              onPointerCancel={sidebar.endDrag}
              onKeyDown={sidebar.onKeyDown}
              style={{ right: "calc(var(--sidebar-w) + 0.4375rem)" }}
              className={`absolute inset-y-0 z-20 hidden w-1.5 -translate-x-1/2 cursor-col-resize rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 xl:block ${
                sidebar.isDragging ? "bg-brand-500" : "bg-transparent hover:bg-surface-deep"
              }`}
            />
          )}

          {/* Left Column: Learning Path (7 columns on desktop xl+) */}
          {/* min-h keeps this column's height roughly stable across track
              switches (tracks differ a lot in length) - without it, the sticky right sidebar (below)
              visibly jumps/flashes as the browser recalculates its
              scrollable range every time this column's height changes. */}
          <div className={`space-y-5 min-w-0 ${isLessonsView ? "xl:min-h-0 xl:overflow-y-auto xl:pr-1.5" : "xl:col-span-4 xl:min-h-0 xl:overflow-y-auto xl:pr-0.5"}`}>

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
                className="group flex items-center gap-3.5 rounded-card bg-surface p-4 transition-colors hover:bg-surface-raised"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-surface-raised text-ink-faint dark:bg-stone-950">
                  <Route className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold tracking-tight leading-tight text-ink-body">
                    {t.nav.learningPath}
                  </p>
                  <p className="mt-0.5 truncate text-xs leading-snug text-ink-faint">
                    {t.dashboard.learningPathCardSub}
                  </p>
                </div>
                <span className="shrink-0 text-lg font-bold text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:text-accent-strong">
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
            {/* Cơ Cơ mở đầu trang Học bài với lời của riêng trang này; thẻ
                Học tiếp ngay dưới vì thế tắt lời chào của nó (showCoCo) - hai
                linh vật cách nhau một thẻ là một con thừa. */}
            <CoCoSays lines={t.coco.hocBai} size={36} />

            {/* Học tiếp: bài và chặng lấy từ CHÍNH danh sách bên dưới (xem chú
                thích đầu LearningFocusHero). Hết bài thì lùi về
                ResumeLearningButton, nơi có sẵn lời chúc mừng khi xong lộ trình. */}
            <div data-tour="resume-learning">
              {(() => {
                const focusLesson = currentLessonId !== null ? lessonById.get(currentLessonId) : undefined;
                const focusStageIdx = focusLesson
                  ? track.stages.findIndex((s) => (lessonsByStageLabel.get(s.label) ?? []).some((l) => l.id === focusLesson.id))
                  : -1;
                const focusStage = focusStageIdx >= 0 ? track.stages[focusStageIdx] : null;
                if (!focusLesson || !focusStage) {
                  return <ResumeLearningButton activeTrack={activeTrack} userId={user?.id} showCoCo={false} />;
                }
                const focusStageLessons = lessonsByStageLabel.get(focusStage.label) ?? [];
                const focusCopy = t.revampDashboard.stages[activeTrack]?.[focusStageIdx];
                const focusStageCopy = t.trackStages[activeTrack]?.stages[focusStageIdx];
                return (
                  <LearningFocusHero
                    stageKicker={format(t.revampDashboard.stageKicker, {
                      stage: stageDisplayLabels.get(focusStage.label) || focusStageCopy?.label || focusStage.label,
                      tag: focusCopy?.tag ?? "",
                    })}
                    stageHeadline={focusCopy?.headline ?? focusStageCopy?.name ?? focusStage.name}
                    lessonTitle={stripStageLessonPrefix(focusLesson.title)}
                    lessonSubtitle={renderSubtitle(focusLesson.id)}
                    lessonNumber={String(lessonOrdinal.get(focusLesson.id) ?? focusLesson.id).padStart(3, "0")}
                    lessonTime={formatLessonTime(focusLesson, t.dashboard.minutesShort)}
                    href={`/bai-hoc/${focusLesson.slug}`}
                    slug={focusLesson.slug}
                    stageSegments={focusStageLessons.map((l) =>
                      completed.includes(l.id) ? "done" : l.id === focusLesson.id ? "current" : "todo"
                    )}
                    courseDone={trackCounts[activeTrack].done}
                    courseTotal={trackCounts[activeTrack].total}
                    onJumpToStage={() =>
                      document.getElementById(`stage-${focusStage.label}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  />
                );
              })()}
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
              <div className={`${panel} px-4 py-4`}>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-sm bg-surface-raised text-ink-muted flex items-center justify-center dark:bg-stone-950">
                      <Bookmark className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-ink">{t.dashboard.savedTitle}</p>
                      <p className="text-xs text-ink-muted">{t.dashboard.savedSubtitle}</p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="text-xs font-bold text-ink-muted hover:text-ink-heading"
                  >
                    {t.dashboard.seeAll}
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {bookmarks.map((bookmark) => (
                    <Link
                      key={bookmark.id}
                      href={`/bai-hoc/${bookmark.lesson_slug}`}
                      className="group rounded-sm border border-transparent bg-page dark:bg-stone-950/40 px-4 py-3 hover:border-line-strong transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-ink line-clamp-2">
                            {bookmark.lesson_title}
                          </p>
                          <p className="text-xs text-ink-muted mt-1">
                            {format(t.dashboard.bookmarkedOn, { date: new Date(bookmark.created_at).toLocaleDateString(intlLocale(locale)) })}
                          </p>
                        </div>
                        <Bookmark className="w-4 h-4 shrink-0 text-ink-faint group-hover:text-accent-strong transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}


 {/* Dải nhịp cộng đồng ("N người đang học · N bài hoàn thành") ĐÃ GỠ
 khỏi /hoc-bai theo yêu cầu. Nó từng dựng HAI lần trong cùng một
 nhánh isLessonsView, nên trang học bài hiện nó hai lượt. Component
 components/CommunityPulseStrip.tsx vẫn còn nguyên nếu cần dùng lại
 ở trang khác. */}

 <div
 id="lo-trinh" data-tour="track-selector" className="scroll-mt-24 max-w-full overflow-hidden"
 >
 {/* Chọn track: tab chữ theo hệ thiết kế chung (gạch dưới xanh cho tab
     đang mở), không còn hai viên thuốc nền brand đậm. Vẫn chia đôi đúng
     chiều ngang khung. */}
 <div role="tablist" className="flex w-full gap-6 border-b border-line select-none">
 {(["personal", "professional"] as const).map((trackId) => {
 const isActive = isTrackView && activeTrack === trackId;
 return (
 <button
 key={trackId}
 type="button" role="tab" aria-selected={isActive} onClick={() => setActiveTrack(trackId)}
 className={`${tabClass(isActive)} flex-1 min-w-0 cursor-pointer pt-1 flex items-center justify-center gap-2.5`}
 >
 <span className="text-center leading-snug">{t.trackStages[trackId].title}</span>
 <span className={`shrink-0 font-mono text-[11px] font-medium tabular-nums ${
 isActive ? "text-accent-strong" : "text-ink-faint"
 }`}>
 {format(t.dashboard.trackDoneOfTotal, trackCounts[trackId])}
 </span>
 </button>
 );
 })}
 </div>
 </div>

 {/* Secondary Domain Branch Filter Chips */}
 {isTrackView && activeTrack === "professional" && (
 <div className="mt-3.5 space-y-2.5">
 <div className="flex gap-2 overflow-x-auto sm:flex-wrap pb-1 scrollbar-none">
 {PROFESSIONAL_BRANCHES.map((branch) => {
 const isActive = professionalBranch === branch.id;
 return (
 <button
 key={branch.id}
 onClick={() => handleSetProfessionalBranch(branch.id)}
 aria-pressed={isActive}
 className={`shrink-0 whitespace-nowrap px-3.5 py-2 text-xs font-bold rounded-sm transition-colors cursor-pointer border ${
 isActive
 ? "border-brand-600 bg-white text-accent-strong dark:border-brand-400 dark:bg-stone-900"
 : "bg-transparent text-ink-muted border-line hover:border-line-strong hover:text-ink-body"
 }`}
 >
 <span>{t.professionalBranches[branch.id]?.label ?? branch.label}</span>
 {(branchProgress.get(branch.id)?.total ?? 0) > 0 && (
 <span
 className={`ml-2 font-mono text-[10px] tabular-nums font-medium ${
 isActive ? "text-accent-strong" : "text-ink-faint"
 }`}
 >
 {branchProgress.get(branch.id)!.done}/{branchProgress.get(branch.id)!.total}
 </span>
 )}
 </button>
 );
 })}
 </div>
 <div className="flex items-center justify-between gap-4 px-1">
 <p className="text-[11px] leading-relaxed text-ink-muted font-medium">
 {t.professionalBranches[professionalBranch]?.subtitle ??
 PROFESSIONAL_BRANCHES.find((b) => b.id === professionalBranch)?.subtitle}
 </p>
 <button
 type="button" onClick={() => setShowAllBranches((v) => !v)}
 className="shrink-0 cursor-pointer text-[11px] font-bold text-stone-600 underline-offset-2 hover:underline dark:text-stone-400"
 >
 {showAllBranches ? t.dashboard.branchesCollapse : t.dashboard.branchesShowAll}
 </button>
 </div>

 {/* Bảy nhánh kèm mô tả */}
 {showAllBranches && (
 <ul className="mt-2.5 divide-y divide-line overflow-hidden rounded-md border border-line bg-white dark:bg-stone-900">
 {PROFESSIONAL_BRANCHES.map((branch) => (
 <li key={branch.id}>
 <button
 type="button" onClick={() => {
 handleSetProfessionalBranch(branch.id);
 setShowAllBranches(false);
 }}
 className={`w-full cursor-pointer px-3.5 py-2.5 text-left transition-colors hover:bg-surface-raised dark:hover:bg-stone-800/60 ${
 professionalBranch === branch.id ? "bg-surface-raised dark:bg-stone-800/60" : ""
 }`}
 >
 <span className={`block text-xs font-bold ${professionalBranch === branch.id ? "text-accent-strong" : "text-ink"}`}>
 {t.professionalBranches[branch.id]?.label ?? branch.label}
 </span>
 <span className="mt-0.5 block text-[11px] leading-relaxed text-ink-muted">
 {t.professionalBranches[branch.id]?.subtitle ?? branch.subtitle}
 </span>
 </button>
 </li>
 ))}
 </ul>
 )}
 </div>
 )}

 <>
 {/* ── Search Bar + Flag Mode Controls ── */}
 <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
 {/* Left: Compact Search Input */}
 <div className="relative flex-1 max-w-md">
 <Search className="w-3.5 h-3.5 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
 <input
 value={stageSearchQuery}
 onChange={(e) => setStageSearchQuery(e.target.value)}
 placeholder={t.dashboard.searchPlaceholder}
 className="w-full pl-9 pr-9 py-2 rounded-control border border-transparent bg-surface-raised dark:bg-stone-900/60 text-xs font-medium text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand-400 focus:bg-white dark:focus:bg-stone-900 transition-colors"
 />
 {stageSearchQuery && (
 <button
 onClick={() => setStageSearchQuery("")}
 className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-ink-body cursor-pointer" title={t.dashboard.searchClear}
 >
 <X className="w-4 h-4" />
 </button>
 )}
 </div>

 {/* Right: Flag Mode Controls */}
 <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
 {flagSelectionMode && (
 <>
 <span className="font-mono text-[11px] font-medium tabular-nums text-accent-strong hidden lg:inline">
 {format(t.dashboard.selectedCount, { count: selectedFlagLessonIds.size })}
 </span>
 <button
 onClick={clearFlagSelection}
 className={`${btnSecondary} px-3 py-2 text-xs cursor-pointer`}
 >
 {t.dashboard.cancel}
 </button>
 <button
 onClick={applyManualFlags}
 disabled={flagSaving || selectedFlagLessonIds.size === 0}
 className={`${btnPrimary} px-3 py-2 text-xs cursor-pointer`}
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
 aria-pressed={flagSelectionMode}
 className={`px-2.5 py-1.5 text-xs font-semibold rounded-control border transition-colors cursor-pointer flex items-center gap-1.5 ${
 flagSelectionMode
 ? "border-brand-600 bg-white text-accent-strong dark:border-brand-400 dark:bg-stone-900"
 : "border-transparent bg-transparent text-ink-faint hover:bg-surface-raised hover:text-ink-body"
 }`}
 >
 <span>{t.dashboard.markLearned.button}</span>
 <span
 onClick={(e) => {
 e.stopPropagation();
 setManualFlagInfoOpen((current) => !current);
 }}
 className="inline-flex items-center justify-center rounded-full border border-line w-4 h-4 text-[10px] font-bold text-ink-faint transition-colors hover:bg-surface-raised dark:text-stone-400 dark:hover:bg-stone-800" aria-expanded={manualFlagInfoOpen}
 aria-label={t.dashboard.markLearned.help}
 >
 ?
 </span>
 </button>

 <div className={`absolute right-0 top-full z-30 mt-2 w-80 max-w-[90vw] rounded-md border border-line-strong bg-white dark:bg-stone-900 p-4 text-xs text-ink-body leading-relaxed origin-top-right transition-all duration-150 space-y-2 ${
 manualFlagInfoOpen ? "opacity-100 scale-100 pointer-events-auto" : "pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
 }`}>
 <p>
 {t.dashboard.markLearned.autoPart1}
 <strong>{t.dashboard.markLearned.autoAnd}</strong>
 {t.dashboard.markLearned.autoPart2}
 <span className="font-semibold text-accent-strong">
 {t.revampDashboard.autoColour}
 </span>
 {t.dashboard.markLearned.autoPart3}
 </p>
 <p>
 {t.dashboard.markLearned.manualPart1}
 <span className="font-semibold text-accent-strong">
 {t.dashboard.markLearned.manualColour}
 </span>
 {t.dashboard.markLearned.manualPart2}
 </p>
 </div>
 </div>
 </div>
 </div>

 {/* ── Stages + lessons: cây kỹ năng ──
     Từng là một chồng thẻ accordion giống hệt nhau, mỗi thẻ một khung viền,
     mỗi phần một khung viền nữa bên trong, mỗi bài một khung viền nữa - ba
     lớp khung lồng nhau và không lớp nào nói chặng này dạy LÀM gì.

     Giờ mỗi chặng là một nút trên một thanh dọc: nút và đoạn nối đổi màu
     theo trạng thái (cyan = thành thạo, xanh = đang học, xám + ổ khoá = chưa
     mở), và đầu chặng nói "sau chặng này bạn có thể" bằng việc cụ thể
     (t.revampDashboard.stages, viết theo tiêu đề bài của từng chặng).
     Chỉ chặng đang học mang khung đậm; chặng khác chỉ có khung khi mở ra,
     để danh sách bài có chỗ tựa.

     Không đổi gì ở chương trình học: thứ tự chặng, cách lọc theo nhánh, luật
     khoá (isLessonLocked), tìm kiếm, gập/mở, đánh dấu đã học, thi chặng và
     chứng chỉ vẫn đi qua đúng các hàm cũ. */}
 {(() => {
 const visibleStages = activeTrack === "professional"
 ? track.stages.filter((s) => (PROFESSIONAL_BRANCHES.find((b) => b.id === professionalBranch)!.stageLabels as readonly string[]).includes(s.label))
 : track.stages;
 return (
 <ol data-tour="stage-list" className="mt-8">
 {visibleStages.map((stage, visIdx) => {
 const stageLessons = lessonsByStageLabel.get(stage.label) ?? [];
 const stageHasSearchMatch = stageLessons.some(lessonMatchesSearch);
 if (isSearchingStages && !stageHasSearchMatch) return null;
 const stageDone = stageLessons.filter((l) => completed.includes(l.id)).length;
 // `stageLockedCount` từng nằm đây - một phép lọc qua cả chặng, không ai đọc.
 const stageKey = `${activeTrack}-${stage.label}`;
 const isCurrentStage = currentLessonId !== null && stageLessons.some((l) => l.id === currentLessonId);
 const stageOpen = openStages.has(stageKey) || isCurrentStage || (isSearchingStages && stageHasSearchMatch);

 const stageIdx = track.stages.findIndex((s) => s.label === stage.label);
 const stageCopy = t.trackStages[activeTrack]?.stages[stageIdx];
 const outcomeCopy = t.revampDashboard.stages[activeTrack]?.[stageIdx];
 const isStageLockedByMilestone = false;
 const prevStageLabel = stageIdx > 0 ? track.stages[stageIdx - 1]?.label ?? "" : "";

 const isCurrentMilestonePassed = passedMilestones.some((m) => m.stage_label === stage.label);

 // Năm trạng thái, mỗi cái một cách đọc khác hẳn nhau.
 const isMastered = stage.available && stageLessons.length > 0 && stageDone === stageLessons.length;
 const status: "locked" | "mastered" | "active" | "started" | "notStarted" = !stage.available
 ? "locked"
 : isMastered
 ? "mastered"
 : isCurrentStage
 ? "active"
 : stageDone > 0
 ? "started"
 : "notStarted";
 const isActive = status === "active";
 const statusLabel = {
 locked: t.revampDashboard.statusLocked,
 mastered: t.revampDashboard.statusMastered,
 active: t.revampDashboard.statusActive,
 started: t.revampDashboard.statusStarted,
 notStarted: t.revampDashboard.statusNotStarted,
 }[status];

 // Điều kiện tiên quyết: chặng liền trước trong lộ trình ĐANG XEM (đã lọc
 // theo nhánh). Chỉ là lời khuyên - khoá thật vẫn do isLessonLocked quyết.
 const prevStage = visIdx > 0 ? visibleStages[visIdx - 1] : null;
 const prevLessons = prevStage ? lessonsByStageLabel.get(prevStage.label) ?? [] : [];
 const prevMastered = prevLessons.length > 0 && prevLessons.every((l) => completed.includes(l.id));
 const prevIdx = prevStage ? track.stages.indexOf(prevStage) : -1;
 const showPrereq = prevStage !== null && !prevMastered && (status === "notStarted" || status === "locked");

 const StageIcon = stageIdx === 0 ? Flag : STAGE_ICONS[(stageIdx - 1) % STAGE_ICONS.length];
 const isLastStage = visIdx === visibleStages.length - 1;
 const percent = stageLessons.length ? (stageDone / stageLessons.length) * 100 : 0;

 return (
 <li
 key={stage.label}
 id={`stage-${stage.label}`}
 className="relative flex gap-2 sm:gap-4"
 >
 {/* Nút trên thanh dọc + đoạn nối xuống chặng sau */}
 <div className="flex shrink-0 flex-col items-center">
 <div
 aria-hidden
 className={`flex shrink-0 items-center justify-center rounded-sm ${isActive ? "h-8 w-8 sm:h-10 sm:w-10" : "mt-1 h-7 w-7 sm:h-8 sm:w-8"} ${
 status === "mastered"
 ? "bg-surface-raised text-cyan-600 dark:text-cyan-400"
 : status === "active"
 ? "bg-brand-600 text-white dark:bg-brand-500"
 : status === "started"
 ? "border border-line text-cyan-600 dark:text-cyan-400"
 : status === "locked"
 ? "text-ink-faint opacity-60"
 : "border border-line text-ink-faint"
 }`}
 >
 {status === "mastered" ? (
 <CheckCircle2 className="h-5 w-5" />
 ) : status === "locked" ? (
 <Lock className="h-4 w-4" />
 ) : (
 <StageIcon className="h-5 w-5" />
 )}
 </div>
 {!isLastStage && (
 <div className={`my-1 w-px flex-1 ${status === "mastered" ? "bg-cyan-200 dark:bg-cyan-900" : isActive ? "bg-brand-200 dark:bg-brand-900" : "bg-line"}`} />
 )}
 </div>

 <div className={`min-w-0 flex-1 ${isLastStage ? "" : isActive || stageOpen ? "pb-7" : "pb-1.5"}`}>
 <div
 className={`rounded-sm transition-colors ${
 isActive
 ? "rounded-card bg-brand-50/80 p-3 sm:p-6 dark:bg-brand-950/35"
 : stageOpen
 ? "rounded-card bg-surface-raised/70 px-3.5 py-3 sm:px-4 dark:bg-stone-900/60"
 : "px-3.5 py-2 hover:bg-surface-raised sm:px-4 dark:hover:bg-stone-900/60"
 }`}
 >
 {/* Stage header - click to expand/collapse */}
 <div
 role="button" tabIndex={0}
 aria-expanded={stageOpen}
 onClick={() => toggleStage(stageKey)}
 onKeyDown={(e) => {
 if (e.key === "Enter" || e.key === " ") {
 e.preventDefault();
 toggleStage(stageKey);
 }
 }}
 className="flex w-full cursor-pointer select-none items-start gap-3 text-left"
 >
 <div className="min-w-0 flex-1">
 <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
 <Sys className={isActive ? "font-bold text-accent-strong" : status === "locked" || status === "notStarted" ? "text-ink-faint" : "text-ink-muted"}>
 {format(t.revampDashboard.stageKicker, {
 stage: stageDisplayLabels.get(stage.label) || stageCopy?.label || stage.label,
 tag: outcomeCopy?.tag ?? "",
 })}
 </Sys>
 {(status === "active" || status === "started" || status === "mastered") && <span className={`font-mono text-[9px] font-bold tracking-wider ${
 status === "active"
 ? "text-accent-strong"
 : status === "mastered" || status === "started"
 ? "text-cyan-700 dark:text-cyan-400"
 : "text-ink-faint"
 }`}>
 {statusLabel}
 </span>}
 {stage.isNew && (isActive || stageOpen) && (
 <span className="text-[9px] font-bold uppercase text-ink-muted">
 {t.dashboard.isNew}
 </span>
 )}
 </div>
 {/* KHÔNG `truncate`. Đây là câu duy nhất nói người học sắp làm
     được gì; cắt ba chấm là thẻ chặng chỉ còn lại con số. Tên chặng
     gốc vẫn ở `title` cho ai rê chuột vào. */}
 <h3
 title={stageCopy?.name ?? stage.name}
 className={`${isActive ? "mt-1.5" : "mt-0.5"} leading-snug tracking-tight ${
 isActive ? "font-black text-xl sm:text-2xl text-ink-max" : status === "locked" ? "font-semibold text-sm text-ink-faint" : status === "notStarted" ? "font-semibold text-sm text-ink-soft" : status === "mastered" ? "font-semibold text-sm text-ink-muted" : "font-bold text-sm text-ink-body"
 }`}
 >
 {outcomeCopy?.headline ?? stageCopy?.name ?? stage.name}
 </h3>
 {outcomeCopy && (isActive || stageOpen) && (
 <div className={isActive ? "mt-3" : "mt-1.5"}>
 <span className={`eyebrow ${isActive ? "text-accent-strong" : "text-ink-faint"}`}>
 {status === "mastered" ? t.revampDashboard.masteredOutcomeLabel : t.revampDashboard.outcomeLabel}
 </span>
 {isActive ? (
 <ul className="mt-1 flex flex-wrap gap-x-3.5 gap-y-1">
 {outcomeCopy.outcome.split(" · ").map((item) => (
 <li key={item} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-body">
 <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-[1px] bg-accent-line-mid" />
 {item}
 </li>
 ))}
 </ul>
 ) : (
 <p className={`mt-0.5 text-xs leading-relaxed line-clamp-2 ${status === "locked" || status === "notStarted" ? "text-ink-faint" : "text-ink-muted"}`}>
 {outcomeCopy.outcome}
 </p>
 )}
 </div>
 )}
 {showPrereq && prevStage && stageOpen && (
 <p className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-faint">
 <Lock className="h-3 w-3 shrink-0 text-ink-faint" aria-hidden />
 {format(t.revampDashboard.prereqLine, {
 stage: stageDisplayLabels.get(prevStage.label) || prevStage.label,
 tag: t.revampDashboard.stages[activeTrack]?.[prevIdx]?.tag ?? "",
 })}
 </p>
 )}
 </div>

 {/* Right Stage Stats & Chevron */}
 <div className="flex shrink-0 items-center gap-2.5 pt-0.5">
 {/* Huy hiệu "đã vượt ải" và nút NHẬN CHỨNG CHỈ.
     Khối này từng bị gỡ mất trong một lượt dựng lại phần đầu chặng.
     `CertificateModal` và state `selectedCertStage` vẫn còn nguyên bên
     dưới, nhưng KHÔNG còn chỗ nào đặt state đó khác null - nên hộp
     chứng chỉ thành mã chết và người học vượt ải xong không nhận được
     gì. Không lỗi biên dịch: `setSelectedCertStage` vẫn được gọi ở
     `onClose`, nên linter thấy nó "có dùng". */}
 {isCurrentMilestonePassed && (
   <div className="flex items-center gap-2 shrink-0">
     <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-700 dark:text-cyan-400">
       {t.dashboard.milestone.passed}
     </span>
     <button
       type="button"
       onClick={(e) => {
         e.stopPropagation();
         setSelectedCertStage({ label: stage.label, name: stage.name });
       }}
       className={`${btnPrimary} px-2.5 py-1 text-[11px] cursor-pointer`}
     >
       <Award className="w-3.5 h-3.5" />
       {t.dashboard.milestone.certificate}
     </button>
   </div>
 )}
 {/* Số người vừa học: chỉ ở chặng đang học. Trên mười chặng khác nó là
     một dòng siêu dữ liệu nữa mà không ai cần để chọn việc tiếp theo. */}
 {isActive && learnersInStage(stageLessons) > 0 && (
 <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-ink-muted font-medium">
 <Users className="h-3.5 w-3.5 text-ink-faint" aria-hidden />
 <span>{format(t.dashboard.stageLearners, { count: learnersInStage(stageLessons) })}</span>
 </span>
 )}

 {stage.available && stageLessons.length > 0 && (
 <div className="flex items-center gap-2">
 <div className="hidden h-1.5 w-12 overflow-hidden rounded-xs bg-surface-sunken sm:block">
 <div className="h-full bg-cyan-400 transition-all dark:bg-cyan-600" style={{ width: `${percent}%` }} />
 </div>
 <span className={`font-mono text-xs font-medium tabular-nums ${stageDone > 0 ? "text-ink-muted" : "text-ink-faint"}`}>
 {stageDone}/{stageLessons.length}
 </span>
 </div>
 )}

 <ChevronDown className={`w-4 h-4 text-ink-faint transition-transform ${stageOpen ? "rotate-180" : ""}`} />
 </div>
 </div>

 {/* Tiến độ chặng đang học, trải ngang: con số nhỏ ở góc phải không đủ
     cho thứ người học đang theo đuổi. */}
 {isActive && stageLessons.length > 0 && (
 <div className="mt-4 flex items-center gap-3">
 <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-brand-100 dark:bg-brand-900/60">
 <div className="h-full rounded-full bg-brand-600 transition-[width] duration-700 dark:bg-brand-500" style={{ width: `${Math.max(percent, 2)}%` }} />
 </div>
 <span className="font-mono text-[11px] font-semibold tabular-nums text-accent-strong">{Math.round(percent)}%</span>
 </div>
 )}

 {/* "Bước tiếp theo" từng là một khung xanh thứ hai kèm nút HỌC TIẾP thứ
     hai, ngay dưới thẻ Học tiếp đầu trang - hai nút chính cho cùng một
     việc. Thẻ đầu trang giờ là nút duy nhất; trong chặng, bài đang học
     được nhấn bằng chính hàng của nó. */}

 {/* Not available yet */}
 {stageOpen && !stage.available && (
 <div className="mt-3 flex items-center gap-3 px-1 py-2">
 <Lock className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
 <div>
 <p className="text-ink-muted text-sm font-bold">{t.dashboard.stageLockedTitle}</p>
 <p className="text-ink-faint text-xs mt-0.5">{t.dashboard.stageLockedHint}</p>
 </div>
 </div>
 )}

 {/* Available but no lessons in DB yet */}
 {stageOpen && stage.available && stageLessons.length === 0 && (
 <div className="mt-3 flex items-center gap-3 px-1 py-2">
 <HardHat className="h-5 w-5 shrink-0 text-ink-faint" strokeWidth={1.5} aria-hidden="true" />
 <div>
 <p className="text-ink-muted text-sm font-bold">{t.dashboard.buildingTitle}</p>
 <p className="text-ink-faint text-xs mt-0.5">{t.dashboard.buildingSubtitle}</p>
 </div>
 </div>
 )}

 {/* Parts (sub-stages) - each its own collapsible row. Một đường kẻ ngăn
     giữa các phần thay cho một khung viền quanh từng phần. */}
 {stageOpen && stage.available && stageLessons.length > 0 && !isStageLockedByMilestone && (
 <div className={isActive ? "mt-5 space-y-0.5" : "mt-3 divide-y divide-line"}>
 {stage.parts.map((part, partIdx) => {
 const partLessons = lessonsByPartKey.get(`${stage.label}::${part.name}`) ?? [];
 if (partLessons.length === 0) return null;
 const partHasSearchMatch = partLessons.some(lessonMatchesSearch);
 if (isSearchingStages && !partHasSearchMatch) return null;
 const visiblePartLessons = isSearchingStages ? partLessons.filter(lessonMatchesSearch) : partLessons;
 const partDone = partLessons.filter((l) => completed.includes(l.id)).length;
 // `partLockedCount` từng nằm đây - cùng phép lọc thừa như ở cấp chặng.
 const partKey = `${stageKey}-${part.name}`;
 // Phần chứa bài đang học tự mở, và vẫn gập lại được: một cú bấm
 // đảo trạng thái mặc định (XOR) thay vì chỉ cộng thêm vào nó.
 const partHasCurrent = currentLessonId !== null && partLessons.some((l) => l.id === currentLessonId);
 const partOpen = openParts.has(partKey) !== partHasCurrent || (isSearchingStages && partHasSearchMatch);
 const partMastered = partDone === partLessons.length;

 return (
 <div key={part.name}>
 <button
 onClick={() => togglePart(partKey)}
 aria-expanded={partOpen}
 className="flex w-full cursor-pointer select-none items-center gap-3 rounded-control px-1.5 py-2 text-left transition-colors hover:bg-white/70 dark:hover:bg-stone-800/50"
 >
 <span className="shrink-0" aria-hidden>
 {partMastered ? (
 <span className="flex h-6 w-6 items-center justify-center rounded-xs text-cyan-600 dark:text-cyan-400">
 <CheckCircle2 className="h-3.5 w-3.5" />
 </span>
 ) : partHasCurrent ? (
 <span className="flex h-6 w-6 items-center justify-center rounded-xs bg-brand-600 text-white dark:bg-brand-500">
 <Play className="h-3 w-3 translate-x-px fill-current" />
 </span>
 ) : partDone > 0 ? (
 <span className="flex h-6 w-6 items-center justify-center rounded-xs border border-cyan-300 dark:border-cyan-800" />
 ) : (
 <span className="flex h-6 w-6 items-center justify-center rounded-xs border border-line" />
 )}
 </span>

 {/* Cùng lý do với tên chặng ngay trên: đây là dòng nói phần này dạy
     gì, cắt đi là mất. */}
 <span className={`min-w-0 flex-1 text-xs sm:text-sm line-clamp-2 ${partHasCurrent ? "font-black text-ink-max" : partMastered ? "font-semibold text-ink-muted" : "font-semibold text-ink-body"}`}>
 {stageCopy?.parts[partIdx] ?? part.name}
 </span>

 <span className="hidden sm:inline font-mono text-[10px] text-ink-faint tabular-nums">
 {format(t.dashboard.lessonRange, { from: lessonOrdinal.get(partLessons[0].id) ?? "", to: lessonOrdinal.get(partLessons[partLessons.length - 1].id) ?? "" })}
 </span>

 <span className={`font-mono text-xs tabular-nums font-medium ${partDone > 0 ? "text-ink-muted" : "text-ink-faint"}`}>
 {partDone}/{partLessons.length}
 </span>

 <ChevronDown className={`w-3.5 h-3.5 text-ink-faint transition-transform ${partOpen ? "rotate-180" : ""}`} />
 </button>

 {partOpen && (
 <div className={`ml-1.5 space-y-0.5 border-l pb-2 pl-1 sm:ml-4 sm:pl-2 ${partHasCurrent ? "border-accent-line-mid" : "border-line"}`}>
 {visiblePartLessons.map((lesson) => {
 const isDone = completed.includes(lesson.id);
 const isExamCredited = isDone && examCreditedIds.has(lesson.id);
 const locked = isLessonLocked(lesson);
 const isFlagged = flaggedLessonIds.has(lesson.id);
 const isSelectedForFlag = selectedFlagLessonIds.has(lesson.id);
 const isCurrentLesson = lesson.id === currentLessonId;

 if (locked) {
 return (
 <button
 key={lesson.id}
 onClick={() => handleLockedLessonClick(lesson)}
 className="w-full text-left block rounded-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
 >
 <div className="flex items-center gap-3 px-3 py-2.5 sm:px-4">
 <span className="w-10 shrink-0 text-center font-mono tabular-nums text-xs font-medium text-ink-faint">
 {String(lessonOrdinal.get(lesson.id) ?? lesson.id).padStart(3, "0")}
 </span>
 <Lock className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
 <div className="flex-1 min-w-0">
 <div className="text-sm font-semibold leading-snug text-ink-muted">
 {stripStageLessonPrefix(lesson.title)}
 </div>
 <div className="text-xs mt-0.5 line-clamp-2 text-ink-faint">
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
 className={`relative block rounded-sm border transition-colors ${
 isCurrentLesson && !isDone
 ? "border-brand-300 bg-white shadow-[0_2px_10px_-4px_rgba(41,97,184,0.35)] dark:border-brand-700 dark:bg-stone-900"
 : isSelectedForFlag
 ? "border-brand-600 bg-white dark:border-brand-400 dark:bg-stone-900"
 : isFlagged
 ? "border-transparent hover:border-line dark:bg-stone-900"
 : "border-transparent hover:border-line hover:bg-white dark:hover:bg-stone-900"
 }`}
 >
 <div className={`flex items-center gap-2.5 px-3 sm:gap-3 sm:px-4 ${isCurrentLesson && !isDone ? "py-3.5" : "py-2.5"}`}>
 {/* Day number */}
 <span className={`hidden w-10 shrink-0 text-center font-mono tabular-nums text-xs font-medium sm:inline-block ${isCurrentLesson && !isDone ? "text-accent-strong" : "text-ink-faint"}`}>
 {String(lessonOrdinal.get(lesson.id) ?? lesson.id).padStart(3, "0")}
 </span>

 {/* Status square */}
 <div className="flex-shrink-0">
 {isExamCredited ? (
 // Hổ phách chứ không cyan: đã mở khoá là đúng, nhưng ghi "xong" là
 // ghi sai - người học chưa mở bài này ra lần nào.
 <div className="w-6 h-6 rounded-xs bg-amber-500 flex items-center justify-center" title={t.dashboard.examCreditedHint}>
 <LockOpen className="w-3.5 h-3.5 text-white" />
 </div>
 ) : isDone ? (
 <div className="w-6 h-6 rounded-xs flex items-center justify-center">
 <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
 </div>
 ) : isFlagged ? (
 <div className="w-6 h-6 rounded-xs bg-accent-soft flex items-center justify-center">
 <CheckCheck className="w-4 h-4 text-accent-strong" />
 </div>
 ) : isCurrentLesson ? (
 <div className="w-6 h-6 rounded-xs bg-brand-600 flex items-center justify-center dark:bg-brand-500">
 <Play className="w-3 h-3 translate-x-px fill-current text-white" />
 </div>
 ) : (
 <div className="w-6 h-6 rounded-xs border border-line" />
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
 <div className={`leading-snug ${isCurrentLesson && !isDone ? "text-base font-black text-ink-max" : isDone ? "text-sm font-semibold text-ink-muted" : "text-sm font-semibold text-ink-body"}`}>
 {stripStageLessonPrefix(lesson.title)}
 </div>
 {/* Phụ đề chỉ ở bài đang học và bài có trạng thái riêng cần giải
     thích. Trên mọi hàng khác nó là dòng chữ thứ hai lặp lại
     hàng chục lần, làm danh sách dài gấp đôi. */}
 {(isCurrentLesson || isExamCredited || isFlagged) && (
 <div className={`text-xs mt-0.5 line-clamp-2 ${isFlagged ? "text-accent-strong" : "text-ink-soft"}`}>
 {isExamCredited ? t.dashboard.examCreditedSubtitle : isFlagged ? t.dashboard.markLearned.flaggedSubtitle : renderSubtitle(lesson.id)}
 </div>
 )}
 {(lessonLearnerCounts?.get(lesson.id) ?? 0) > 0 && (
 <div className="text-[11px] mt-0.5 text-ink-faint font-semibold">
 {/* CHỈ hiện khi có người thật đã học xong bài này.
  Trước đây đây là getIllustrativeCount(slug, 60, 480) - băm slug
  ra một số trong khoảng 60-480 và gọi nó là "N người đã học".
  Không có số thì không dựng gì: "0 người đã học" là câu đúng
  nhưng không ai muốn đọc trước khi bắt đầu một bài. */}
 {format(t.dashboard.learnerCount, { count: lessonLearnerCounts!.get(lesson.id)! })}
 </div>
 )}
 {/* Điện thoại: thời lượng xuống dưới tiêu đề. Ở cột phải nó cùng số
     thứ tự và mũi tên ép tiêu đề còn ~70px - mỗi dòng một chữ. */}
 <div className="mt-0.5 font-mono text-[11px] tabular-nums text-ink-faint sm:hidden">
 {formatLessonTime(lesson, t.dashboard.minutesShort)}
 </div>
 </Link>

 {flagSelectionMode && !isDone && (
 <button
 type="button" onClick={(event) => {
 event.stopPropagation();
 toggleFlagSelection(lesson.id);
 }}
 className={`flex-shrink-0 w-6 h-6 rounded-xs border-2 flex items-center justify-center ${
 isSelectedForFlag
 ? "border-brand-600 bg-brand-600 text-white"
 : "border-line-strong text-transparent"
 }`}
 aria-label={t.dashboard.markLearned.selectAria}
 >
 <CheckCheck className="w-3.5 h-3.5" />
 </button>
 )}

 {/* Meta: thời lượng luôn hiện (cả trên điện thoại), nhãn trạng
     thái chỉ khi có trạng thái. Nhãn độ khó trên mọi bài chưa
     học từng là một khung viền nữa lặp lại hàng chục lần - giờ là
     chữ nhạt, không khung. */}
 <div className="flex items-center gap-2.5 flex-shrink-0">
 <span className="hidden font-mono text-[11px] tabular-nums text-ink-faint sm:inline">
 {formatLessonTime(lesson, t.dashboard.minutesShort)}
 </span>
 <span className={`hidden sm:inline-flex text-[11px] ${
 isDone
 ? "font-semibold text-cyan-700 dark:text-cyan-400"
 : isCurrentLesson
 ? "font-bold text-accent-strong"
 : isFlagged
 ? "font-semibold text-accent-strong"
 : "font-medium text-ink-faint"
 }`}>
 {isDone
 ? t.dashboard.markLearned.doneBadge
 : isCurrentLesson
 ? t.dashboard.markLearned.inProgressBadge
 : isFlagged
 ? t.dashboard.markLearned.flaggedBadge
 : t.difficulty[lesson.difficulty]}
 </span>
 {isFlagged && !isDone && (
 <button
 type="button" onClick={(event) => {
 event.stopPropagation();
 event.preventDefault();
 setAppealTarget({ id: lesson.id, slug: lesson.slug, title: lesson.title });
 }}
 className="text-xs font-bold text-ink-faint hover:text-accent-strong underline underline-offset-2"
 >
 {t.dashboard.appeal}
 </button>
 )}
 </div>

 <ChevronRight className="hidden h-4 w-4 shrink-0 text-ink-faint sm:block" aria-hidden />
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
 <div className="mt-3.5 p-4 rounded-sm bg-amber-50/60 dark:bg-amber-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
 <div className="min-w-0 flex-1">
 <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
 {format(t.dashboard.milestone.eligible, { stage: stage.label })}
 </h4>
 <p className="text-[10px] text-ink-muted mt-1 leading-relaxed">
 {t.dashboard.milestone.eligibleBodyPart1}<strong>{t.finalOne.dashboardClient.milestoneBonusXp}</strong>{t.dashboard.milestone.eligibleBodyPart2}
 </p>
 </div>
 <button
 onClick={() => setActiveMilestoneExam({
 label: stage.label,
 name: stage.name,
 lessonIds: stageLessons.map((l) => l.id)
 })}
 className={`${btnPrimary} px-4 py-2 text-xs cursor-pointer shrink-0`}
 >
 {t.dashboard.milestone.start}
 </button>
 </div>
 )}

 {/* Locked Stage Banner (if stage is locked by previous stage milestone) */}
 {stageOpen && stage.available && isStageLockedByMilestone && (
 <div className="mt-3.5 border border-dashed border-rose-300 dark:border-rose-900 rounded-sm px-5 py-6 text-center">
 <div className="flex flex-col items-center gap-3">
 <Lock className="w-6 h-6 text-alert" aria-hidden />
 <div>
 <p className="text-ink text-sm font-extrabold">{t.dashboard.stageLockedBadge}</p>
 <p className="text-ink-muted text-xs mt-1 max-w-xs mx-auto leading-relaxed">
 {t.dashboard.milestone.lockedPart1}<strong>{format(t.dashboard.milestone.lockedExamName, { stage: prevStageLabel })}</strong>{t.dashboard.milestone.lockedPart2}
 </p>
 </div>
 </div>
 </div>
 )}
 </div>
 </div>
 </li>
 );
 })}
 </ol>
 );
 })()}

 {/* Case chuyên sâu - real company/topic deep-dives outside the day curriculum */}
 {bonusLessons.length > 0 && (
 <div className="mt-10">
 {/* Đầu khu theo khuôn SectionHead: mã định vị mono + eyebrow trên
     đường kẻ 1px, rồi tiêu đề đậm - nhưng cả khối là nút gập/mở. */}
 <button
 onClick={() => toggleStage("bonus")}
 aria-expanded={bonusOpen}
 className="w-full mb-4 cursor-pointer text-left"
 >
 <span className="flex items-center justify-between gap-4 border-b border-line pb-2">
 <Sys className="text-ink-faint">{SYS.bonus}</Sys>
 <span className="eyebrow text-ink-soft">{t.finalOne.dashboardClient.bonusLabel}</span>
 </span>
 <span className="mt-3 flex items-baseline gap-4">
 <span className="text-lg font-black tracking-tight text-ink-max" role="heading" aria-level={2}>{t.dashboard.caseStudies}</span>
 <span className="ml-auto font-mono text-base font-medium tabular-nums text-ink-max">
 {bonusDone}/{bonusLessons.length}
 </span>
 <span className={`text-ink-faint text-sm transition-transform ${bonusOpen ? "rotate-180" : ""}`}>
 ▾
 </span>
 </span>
 </button>

 {bonusOpen && (
 <div className="space-y-5">
 {bonusGroups.map((group) => (
 <div key={group.category} className="space-y-2">
 <div className="eyebrow text-ink-muted px-1">
 {group.label}
 </div>
 {group.lessons.map((lesson) => {
 const isDone = completed.includes(lesson.id);
 const isExamCredited = isDone && examCreditedIds.has(lesson.id);
 const locked = isLessonLocked(lesson);
 const isFlagged = flaggedLessonIds.has(lesson.id);
 const isSelectedForFlag = selectedFlagLessonIds.has(lesson.id);

 if (locked) {
 return (
 <button
 key={lesson.id}
 onClick={() => handleLockedLessonClick(lesson)}
 className="w-full text-left block rounded-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
 >
 <div className="flex items-center gap-4 px-6 py-4">
 <div className="flex-shrink-0">
 <div className="w-6 h-6 rounded-xs flex items-center justify-center">
 <Lock className="w-3.5 h-3.5 text-ink-faint" />
 </div>
 </div>
 <div className="flex-1 min-w-0">
 <div className="text-base font-bold leading-snug text-ink-muted">
 {stripStageLessonPrefix(lesson.title)}
 </div>
 <div className="text-sm mt-0.5 line-clamp-2 text-ink-faint">
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
 className={`block rounded-sm border transition-colors ${
 isDone
 ? "border-transparent hover:border-line"
 : isSelectedForFlag
 ? "bg-white dark:bg-stone-900 border-brand-600 dark:border-brand-400"
 : isFlagged
 ? "border-transparent hover:border-line"
 : "border-transparent hover:border-line hover:bg-white dark:hover:bg-stone-900"
 }`}
 >
 <div className="flex items-center gap-4 px-6 py-4">
 <div className="flex-shrink-0">
 {isExamCredited ? (
 // Hổ phách chứ không xanh: đã mở khoá là đúng, nhưng ghi "xong" là
 // ghi sai - người học chưa mở bài này ra lần nào.
 <div className="w-6 h-6 rounded-xs bg-amber-500 flex items-center justify-center" title={t.dashboard.examCreditedHint}>
 <LockOpen className="w-3.5 h-3.5 text-white" />
 </div>
 ) : isDone ? (
 <div className="w-6 h-6 rounded-xs flex items-center justify-center">
 <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
 </div>
 ) : isFlagged ? (
 <div className="w-6 h-6 rounded-xs bg-accent-soft flex items-center justify-center">
 <CheckCheck className="w-4 h-4 text-accent-strong" />
 </div>
 ) : (
 <div className="w-6 h-6 rounded-xs border border-line" />
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
 <div className={`text-base font-bold leading-snug ${isDone ? "text-ink-body" : "text-ink-max"}`}>
 {stripStageLessonPrefix(lesson.title)}
 </div>
 <div className={`text-sm mt-0.5 line-clamp-2 ${isDone ? "text-ink-muted" : isFlagged ? "text-accent-strong" : "text-ink-soft"}`}>
 {isExamCredited ? t.dashboard.examCreditedSubtitle : isFlagged ? t.dashboard.markLearned.flaggedSubtitle : renderSubtitle(lesson.id)}
 </div>
 </Link>
 {flagSelectionMode && !isDone && (
 <button
 type="button" onClick={(event) => {
 event.stopPropagation();
 toggleFlagSelection(lesson.id);
 }}
 className={`flex-shrink-0 w-6 h-6 rounded-xs border-2 flex items-center justify-center ${
 isSelectedForFlag
 ? "border-brand-600 bg-brand-600 text-white"
 : "border-line-strong text-transparent"
 }`}
 aria-label={t.dashboard.markLearned.selectAria}
 >
 <CheckCheck className="w-3.5 h-3.5" />
 </button>
 )}
 <div className="flex-shrink-0 text-lg font-bold text-ink-faint">
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

 {/* Khối "Cộng đồng học tập hôm nay" ĐÃ GỠ khỏi cuối cột trái.
 Nó dựng CommunityLearningNow lần thứ hai trên cùng một màn hình:
 cột phải đã có mục "Cộng đồng hôm nay" với đúng danh sách người
 đang giữ chuỗi ngày, chỉ khác hình dạng - một băng chuyền ngang ở
 đây, một danh sách dọc ở kia. Hai bản của cùng một dữ liệu, cách
 nhau một lần cuộn.
 Nếu sau này muốn dựng lại thì việc đúng là bỏ bản ở cột phải,
 không phải thêm bản thứ ba. */}

 {/* Ba công cụ ôn tập, chuyển từ thanh bên xuống đây - xem chú thích
 ở chỗ thanh bên. Chúng là việc học thật, chỉ là việc SAU bài kế
 tiếp chứ không phải việc cạnh nó. */}
 {isLessonsView && user?.id && (
 <div className="mt-10 space-y-6">
 <LessonRecallWidget userId={user.id} />
 <SmartRemediationWidget userId={user.id} lessonsMeta={lessonsMeta} />
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
          <div className={`min-w-0 ${isLessonsView ? "space-y-3" : "space-y-6"} ${
            isLessonsView
              ? "xl:min-h-0 xl:overflow-y-auto xl:pr-1.5"
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
            {/* Cột phải của /hoc-bai, theo thứ tự:
                sổ tay và câu sai (việc làm TRONG lúc học) đứng đầu, rồi thử
                thách mỗi ngày, thử thách tiếp theo, và cộng đồng hôm nay. Ôn
                tập theo lịch và gợi ý bù lỗ hổng đã xuống cuối cột trái. */}
            {isLessonsView && <NotesShortcutCard />}

            {isLessonsView && user?.id && <MistakeReviewWidget userId={user.id} />}

            {isLessonsView && user?.id && <DailyNewsQuizWidget userId={user.id} compact quiet />}

            {isLessonsView && (
              <div className="rounded-card bg-surface-raised/70 px-3.5 py-3 flex items-center justify-between gap-3 select-none dark:bg-stone-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-control bg-white flex items-center justify-center shrink-0 dark:bg-stone-950">
                    <Trophy className="w-4 h-4 text-ink-muted" />
                  </div>
                  <div>
                    <span className="eyebrow text-ink-muted block">
                      {t.dashboard.nextChallenge}
                    </span>
                    <h4 className="text-sm font-semibold tracking-tight text-ink-body mt-0.5">
                      {format(t.dashboard.rigorousExamTitle, { level: getLevelByXp(userXp).level + 1 })}
                    </h4>
                  </div>
                </div>
                <Link
                  href="/kiem-tra"
                  className="group inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-control px-2 py-1.5 text-[11px] font-semibold text-ink-muted transition-colors hover:bg-white hover:text-accent-strong dark:hover:bg-stone-950"
                >
                  <span>{t.dashboard.takeExamNow}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}

            {isLessonsView && (
              <section className="px-1 pt-1">
                <h3 className="eyebrow mb-2.5 text-ink-faint">
                  {t.dashboard.communityTodayTitle}
                </h3>
                <div className="[&>*]:border-0 [&>*]:bg-transparent [&>*]:p-0 [&>*]:shadow-none">
                  <CommunityLearningNow lessonsMeta={lessonsMeta} />
                </div>
              </section>
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
            {!isLessonsView && user?.id && (
              // `space-y-4`: hai khối bên dưới là hai thẻ riêng, mỗi cái có nền
              // và viền của mình, nhưng lớp bọc này trước đây không có khoảng
              // cách nào - nên chúng dính liền thành một thẻ trông như bị vỡ ở
              // giữa.
              <div
                className={`space-y-6 ${isLessonsView ? "" : "xl:min-h-0 xl:overflow-y-auto"}`}
              >
                {/* Hành trình theo nhu cầu đứng trên gợi ý chung: nó trả lời
                    "hôm nay học gì" bằng chính mục tiêu người học đã chọn. */}
                {!isLessonsView && <LearningGoalCard quiet />}
                <DashboardRecommendations />
                {/* Bảng xếp hạng thu nhỏ, luôn kèm dòng "Bạn" - xem
                    DashboardLeaderboardCard. Từng đứng ĐẦU cột phải với lập
                    luận "mình đang ở đâu" trước "hôm nay học gì". Câu "mình
                    đang ở đâu" giờ do trung tâm kỹ năng phía trên trả lời bằng
                    cấp và XP của chính người học; thứ hạng so với người khác là
                    thông tin phụ, nên nó xuống dưới gợi ý, mờ đi một bậc, và có
                    nhãn nhóm riêng để không đọc như việc cần làm. */}
                {/* Lượt làm nhẹ: thu gọn mặc định sau một dòng "Xếp hạng".
                    Chỉ dựng (và chỉ tải) khi mở - lựa chọn được nhớ. */}
                {!isLessonsView && (
                  <div>
                    <button
                      type="button"
                      onClick={toggleRanking}
                      aria-expanded={rankingOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-control px-1 py-1 text-xs font-semibold text-ink-faint transition-colors hover:text-ink-body"
                    >
                      <span>{t.revampDashboard.rankingLabel}</span>
                      <span className="inline-flex items-center gap-1">
                        {rankingOpen ? t.revampDashboard.hideDetails : t.revampDashboard.showDetails}
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${rankingOpen ? "rotate-180" : ""}`} aria-hidden />
                      </span>
                    </button>
                    {rankingOpen && (
                      <div className="mt-3 rounded-card bg-surface p-4">
                        <DashboardLeaderboardCard userId={user.id} bare />
                      </div>
                    )}
                  </div>
                )}
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
                    kế cho thanh bên dashboard, tức là nó từng ở đây và bị gỡ ra. Viết một thẻ quiz thứ hai sẽ tách
                    đôi cả kho câu hỏi lẫn đường ghi phần thưởng.

                    Hiện ở cả hai nơi KHÔNG cộng XP hai lần: `claimQuestReward`
                    chặn theo ngày ở phía máy chủ và trả về `claimed: false`
                    cho lần thứ hai - xem chú thích "false only means already
                    claimed today" trong lib/cloudflare-quests.ts. Sau khi hết
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
        )}
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

      {/* Cổng thử thách kiến thức chưa được dựng lại ở đây:
          `challengeGateLesson` giờ chỉ còn được đặt rồi xoá mà không mở gì -
          khi có bộ câu hỏi công nghệ thì dựng lại cổng ở đúng chỗ này. */}

      {selectedCertStage && user?.id && (
        <CertificateModal
          stageLabel={selectedCertStage.label}
          stageName={selectedCertStage.name}
          userName={user?.user_metadata?.full_name || user?.email || t.dashboard.defaultUserName}
          userId={user.id}
          onClose={() => setSelectedCertStage(null)}
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
          userLevel={getLevelByXp(userXp).level}
          equipments={equippedGear}
          questions={[
            // `correct: 0` is safe here: BossBattleModal shuffles via
            // lib/quiz-shuffle, so position leaks nothing. Option length does
            // survive the shuffle - see the note on t.dashboard.boss.
            { prompt: t.dashboard.boss.q1, options: ["~43 phút/tháng", "~4 phút/tháng", "~7 giờ/tháng"], correct: 0 },
            {
              prompt: t.dashboard.boss.q2,
              options: [
                t.dashboard.boss.q2o1,
                t.dashboard.boss.q2o2,
                t.dashboard.boss.q2o3,
              ],
              correct: 0,
            },
            { prompt: t.dashboard.boss.q3, options: ["80%", "30%", "5%"], correct: 0 }
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
            const { data: grant } = await cloudflare.rpc("grant_coins", {
              p_source: "game",
              p_ref: null,
              p_amount: coins,
            });
            const grantRow = Array.isArray(grant) ? grant[0] : grant;
            const newCoins = grantRow?.coins_left ?? 0;
            const userId = user.id;
            if (!userId) return;
            await cloudflare.from("game_sessions").insert({
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
          userLevel={getLevelByXp(userXp).level}
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
