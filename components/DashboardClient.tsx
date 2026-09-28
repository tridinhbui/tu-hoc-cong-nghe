"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import TaiTaiAvatar from "@/components/TaiTaiAvatar";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, Lock, CheckCheck, Bookmark, ChevronLeft, ChevronRight, Search, X, Route, Users, Construction, Clock, LockOpen, ChevronDown, Play, Layers, HardHat, Flag, FileText, Compass, BookOpen, Award, ArrowRight, Trophy, GitBranch, Code2, Globe, Braces, Database, Server, Cloud, ShieldCheck, Smartphone, Cpu, type LucideIcon } from "lucide-react";
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
import { getLevelByXp, getLevelProgress, LEVELS } from "@/lib/levels";
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
import { Frame, Sys, StatusDot, panel, btnPrimary, btnSecondary, tabClass } from "@/components/ui/system";

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
      <div className="min-h-screen bg-[#fbfaf7] dark:bg-stone-950 flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          <span className="absolute -inset-1.5 rounded-full border-2 border-stone-300 border-t-brand-600 animate-spin dark:border-stone-700 dark:border-t-brand-400" />
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#f3f1ec] dark:bg-stone-900">
            <TaiTaiAvatar size={64} />
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
              : "max-w-[1500px] xl:grid xl:grid-cols-12 xl:grid-rows-[auto_auto_minmax(0,1fr)] xl:gap-3.5"
          }`}
        >

          {/* Level map is progress/gamification, so it stays on the overview
              route and is not repeated above the learning path. */}
          {!isLessonsView && user?.id && (() => {
            const currentUserLevel = getLevelByXp(userXp).level;
            const levelProgress = getLevelProgress(userXp);
            const openLevel = activeTooltipLevel;

            // Mảng ACCENTS cầu vồng (xám/xanh trời/lục lam/tím/cam/đỏ/vàng
            // chuyển sắc - mỗi cấp một màu) đã gỡ. Luật 3 của hệ thiết kế chung:
            // xanh chỉ đánh dấu CẤP ĐANG ĐỨNG (dữ liệu sống), còn lại trung tính.

            return (
              <Frame
                title={SYS.dashboard}
                meta={`L${currentUserLevel}/${LEVELS.length}`}
                className="xl:col-span-12 xl:min-h-0"
                bodyClassName={isCompactCard ? "p-2.5" : "p-3 sm:p-3.5"}
              >
                <div className="grid grid-cols-1 gap-2.5 xl:grid-cols-[minmax(0,1fr)_288px] xl:items-start">
                  {/* self-stretch (not the grid's items-start) so this column
                      fills the row height set by the taller UserStats sidebar -
                      otherwise the level strip sits at the top and dumps all the
                      leftover height as dead space under the avatars. */}
                  <div className="min-w-0 xl:flex xl:flex-col">
                    <div className="relative z-10 mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="text-base font-black tracking-tight text-ink-max">
                          {t.dashboard.levelMapTitle}
                        </h3>
                        {/* Dòng giải thích bản đồ chỉ có ở bản đầy đủ: nó nói
                            cách đọc dải cấp độ, và người đã chọn "Gọn" là
                            người đã đọc nó rồi. */}
                        {!isCompactCard && (
                          <p className="text-[11px] text-ink-soft mt-0.5">
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
                            className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-sm bg-white dark:bg-stone-900 border border-line-strong items-center justify-center text-ink-soft hover:border-stone-950 dark:hover:border-stone-300 transition-all opacity-0 group-hover/level-strip:opacity-100"
                            aria-label={t.dashboard.scrollLeft}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => levelStripRef.current?.scrollBy({ left: 220, behavior: "smooth" })}
                            className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-sm bg-white dark:bg-stone-900 border border-line-strong items-center justify-center text-ink-soft hover:border-stone-950 dark:hover:border-stone-300 transition-all opacity-0 group-hover/level-strip:opacity-100"
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
                                const isOpen = openLevel === lvl.level;

                                return (
                                  <div key={lvl.level} className="flex items-stretch sm:animate-fade-in [backface-visibility:hidden]">
                                    {idx > 0 && (
                                      <div className={`w-7 sm:w-9 h-px self-end mb-[42px] shrink-0 ${isReached ? "bg-stone-500 dark:bg-stone-400" : "bg-surface-deep"}`} />
                                    )}
                                    <div className="flex flex-col items-center gap-2 shrink-0">
                                      <div className="w-12 h-12 sm:w-[64px] sm:h-[64px] relative flex items-center justify-center select-none pointer-events-none overflow-hidden rounded-sm border border-line-strong bg-[#f3f1ec] dark:bg-stone-950 [backface-visibility:hidden] [transform:translateZ(0)]">
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
                                        // tên cấp tiếng Việt ngắn; tên cấp dài
                                        // hơn làm dòng XP và huy hiệu số người bị đẩy ra ngoài khung.
                                        // Hàng cha là `items-stretch`, nên thẻ cao nhất kéo cả hàng theo -
                                        // chúng vẫn bằng nhau, chỉ là bằng nhau ở chiều cao đủ chứa chữ.
                                        aria-expanded={isOpen}
                                        aria-current={isUserCurrent ? "step" : undefined}
                                        className={`relative text-left rounded-sm border p-1.5 w-[92px] min-h-[88px] shrink-0 transition-colors cursor-pointer flex flex-col [backface-visibility:hidden] ${
                                          isUserCurrent
                                            ? "border-brand-600 bg-white dark:border-brand-400 dark:bg-stone-900"
                                            : isReached
                                            ? `bg-white dark:bg-stone-900 hover:border-stone-950 dark:hover:border-stone-300 ${isOpen ? "border-stone-950 dark:border-stone-300" : "border-line-strong"}`
                                            : "border-stone-200 bg-[#f3f1ec] opacity-60 hover:opacity-90 dark:border-stone-800 dark:bg-stone-950"
                                        }`}
                                      >
                                        <div className="flex items-center justify-between gap-1">
                                          <Sys className={isUserCurrent ? "text-accent-strong" : isReached ? "text-ink-body" : "text-ink-faint"}>
                                            L{lvl.level}
                                          </Sys>
                                          {isUserCurrent && (
                                            <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase text-accent-strong">
                                              <StatusDot />
                                              {t.dashboard.youBadge}
                                            </span>
                                          )}
                                        </div>
                                        <p className={`text-[10px] font-extrabold mt-0.5 leading-snug line-clamp-2 flex-1 ${isReached ? "text-ink" : "text-ink-muted"}`}>
                                          {t.levelTitles[lvl.level] ?? lvl.name}
                                        </p>
                                        <p className="font-mono text-[9.5px] tabular-nums text-ink-muted mt-0.5">{format(t.finalOne.dashboardClient.xpValue, { xp: lvl.minXp })}</p>
                                        <div className={`inline-flex items-center gap-1 font-mono text-[9px] font-medium tabular-nums mt-1 px-1.5 py-px rounded-xs border w-fit ${isReached ? "border-stone-300 text-ink-body dark:border-stone-700" : "border-stone-200 text-ink-faint dark:border-stone-800"}`}>
                                          <Users className="w-2.5 h-2.5" aria-hidden /> {members.length}
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
                            return (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 rounded-sm border border-stone-300 bg-[#f3f1ec] p-4 dark:border-stone-700 dark:bg-stone-950">
                                  <p className="eyebrow text-ink-body mb-3">
                                    {format(t.dashboard.levelMembers, { level: lvl.level, name: t.levelTitles[lvl.level] ?? lvl.name, count: members.length })}
                                  </p>
                                  {members.length > 0 ? (
                                    <div className="grid sm:grid-cols-2 gap-2">
                                      {members.slice(0, 20).map((m, i) => (
                                        <Link
                                          key={i}
                                          href={`/nguoi-hoc/${m.userId}`}
                                          className="flex items-center gap-2.5 bg-white dark:bg-stone-900 rounded-xs border border-stone-200 px-3 py-2.5 hover:border-stone-950 transition-colors dark:border-stone-800 dark:hover:border-stone-300"
                                        >
                                          {isValidAvatar(m.avatarUrl) ? (
                                            // next/image chứ không phải <img>: đây là ảnh trong
                                            // storage của hệ cũ (hoặc Google OAuth), và một thẻ <img>
                                            // trần kéo về BẢN GỐC - tới 2MB - để vẽ ra 32 điểm ảnh,
                                            // cho từng người xem, mỗi lần cache hết hạn.
                                            <Image src={m.avatarUrl} alt={m.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover shrink-0" />
                                          ) : (
                                            <div className="w-8 h-8 rounded-full bg-[#f3f1ec] text-ink-soft flex items-center justify-center text-xs font-black shrink-0 dark:bg-stone-800">
                                              {m.name.charAt(0).toUpperCase()}
                                            </div>
                                          )}
                                          <span className="flex-1 min-w-0 text-sm font-bold text-ink-heading truncate">
                                            {m.name}
                                          </span>
                                          <span className="font-mono text-xs font-medium tabular-nums text-ink-max shrink-0">
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
                        {/* CẢ HAI luôn `compact`, không theo preset.
                            `compact={isCompactCard}` là một cái bẫy ở đây: ở
                            preset "Đầy đủ" nó dựng bản KHÔNG compact của cả
                            hai, mà bản không-compact của mỗi widget tự vẽ
                            `rounded-xl border p-4` của riêng nó - thành viền
                            trong viền ngay giữa thẻ Bản đồ Cấp độ. Với góc yên
                            tĩnh còn tệ hơn: màu cam và ngọn lửa chỉ có ở bản
                            compact, nên đúng preset mặc định lại là preset mất
                            màu.

                            Thứ tự cũng đảo: mục tiêu nghề đứng TRƯỚC. Trái là
                            việc phải làm (có nút Học tiếp), phải là chỗ để
                            nghỉ - và đó cũng là lý do bên phải được phép mang
                            màu, xem chú thích trong DailyMotivationWidget. */}
                        <div className="mt-3 grid grid-cols-1 items-stretch gap-2.5 sm:grid-cols-2">
                          {user?.id && (
                            <div className="min-w-0">
                              <DailyMotivationWidget userId={user.id} compact />
                            </div>
                          )}
                        </div>
                    </div>

                  </div>

                  <div className="min-w-0 rounded-sm border border-stone-200 bg-[#fbfaf7] p-3 dark:border-stone-800 dark:bg-stone-950 xl:p-3.5">
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
              </Frame>
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
            <span className="eyebrow text-ink-muted">
              {t.dashboard.presetLabel}
            </span>
            <div
              role="group"
              aria-label={t.dashboard.presetLabel}
              className="inline-flex rounded-sm border border-stone-300 bg-white p-0.5 dark:border-stone-700 dark:bg-stone-900"
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
                  className={`cursor-pointer rounded-xs px-3 py-1.5 text-xs font-bold transition-colors ${
                    preset === opt.id
                      ? "bg-stone-950 text-white dark:bg-stone-100 dark:text-stone-950"
                      : "text-ink-soft hover:bg-[#f3f1ec] hover:text-ink-max dark:hover:bg-stone-800"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ở /hoc-bai hai cột là `minmax(0,1fr)` + bề rộng cột phải do người
            học kéo. Bề ngang đi qua biến CSS chứ không phải gridTemplateColumns
            nội tuyến: dưới `xl` bố cục là một cột, và biến thì vô hại ở mọi
            khổ màn hình. */}
        <div
          style={{ "--sidebar-w": `${sidebar.width}px` } as React.CSSProperties}
          className={`grid grid-cols-1 gap-4 sm:gap-5 min-w-0 ${isLessonsView ? "xl:relative xl:flex-1 xl:min-h-0 xl:gap-3.5 xl:[grid-template-columns:minmax(0,1fr)_var(--sidebar-w)]" : "xl:col-span-12 xl:min-h-0 xl:grid-cols-12 xl:gap-3.5"}`}
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
                className={`group flex items-center gap-3.5 ${panel} p-4 transition-colors hover:border-stone-950 dark:hover:border-stone-300`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-stone-300 bg-[#f3f1ec] text-ink-body dark:border-stone-700 dark:bg-stone-950">
                  <Route className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black tracking-tight leading-tight text-ink-max">
                    {t.nav.learningPath}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-ink-muted">
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
            {/* Resume Learning Card */}
            <div data-tour="resume-learning">
              <ResumeLearningButton activeTrack={activeTrack} />
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
                    <div className="w-9 h-9 rounded-sm border border-stone-300 bg-[#f3f1ec] text-ink-body flex items-center justify-center dark:border-stone-700 dark:bg-stone-950">
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
                      className="group rounded-sm border border-stone-200 bg-[#fbfaf7] dark:border-stone-800 dark:bg-stone-950/40 px-4 py-3 hover:border-stone-950 dark:hover:border-stone-300 transition-colors"
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
 <div role="tablist" className="flex w-full gap-6 border-b border-line-strong select-none">
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
 : "bg-white dark:bg-stone-900 text-ink-body border-line-strong hover:border-stone-950 dark:hover:border-stone-300"
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
 <ul className="mt-2.5 divide-y divide-stone-200 overflow-hidden rounded-md border border-stone-300 bg-white dark:divide-stone-800 dark:border-stone-700 dark:bg-stone-900">
 {PROFESSIONAL_BRANCHES.map((branch) => (
 <li key={branch.id}>
 <button
 type="button" onClick={() => {
 handleSetProfessionalBranch(branch.id);
 setShowAllBranches(false);
 }}
 className={`w-full cursor-pointer px-3.5 py-2.5 text-left transition-colors hover:bg-[#f3f1ec] dark:hover:bg-stone-800/60 ${
 professionalBranch === branch.id ? "bg-[#f3f1ec] dark:bg-stone-800/60" : ""
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
 <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
 {/* Left: Compact Search Input */}
 <div className="relative flex-1 max-w-md">
 <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
 <input
 value={stageSearchQuery}
 onChange={(e) => setStageSearchQuery(e.target.value)}
 placeholder={t.dashboard.searchPlaceholder}
 className="w-full pl-10 pr-9 py-2.5 rounded-sm border border-line-strong bg-white dark:bg-stone-900 text-xs font-medium text-ink placeholder:text-stone-400 focus:outline-none focus:border-brand-600 transition-colors"
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
 className={`px-3.5 py-2 text-xs font-bold rounded-sm border transition-colors cursor-pointer flex items-center gap-1.5 ${
 flagSelectionMode
 ? "border-brand-600 bg-white text-accent-strong dark:border-brand-400 dark:bg-stone-900"
 : "border-line-strong bg-white dark:bg-stone-900 text-ink-body hover:border-stone-950 dark:hover:border-stone-300"
 }`}
 >
 <span>{t.dashboard.markLearned.button}</span>
 <span
 onClick={(e) => {
 e.stopPropagation();
 setManualFlagInfoOpen((current) => !current);
 }}
 className="inline-flex items-center justify-center rounded-xs border border-line-strong w-4 h-4 text-[10px] font-black text-stone-500 transition-colors hover:bg-[#f3f1ec] dark:text-stone-400 dark:hover:bg-stone-800" aria-expanded={manualFlagInfoOpen}
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
 {t.dashboard.markLearned.autoColour}
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

 {/* ── Stages + lessons ── */}
 <div data-tour="stage-list" className="space-y-4 mt-6">
 {(activeTrack === "professional"
 ? track.stages.filter((s) => (PROFESSIONAL_BRANCHES.find((b) => b.id === professionalBranch)!.stageLabels as readonly string[]).includes(s.label))
 : track.stages
 ).map((stage) => {
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
 const isStageLockedByMilestone = false;
 const prevStageLabel = stageIdx > 0 ? track.stages[stageIdx - 1]?.label ?? "" : "";
 
 const isCurrentMilestonePassed = passedMilestones.some((m) => m.stage_label === stage.label);

 return (
 <div
 key={stage.label}
 id={`stage-${stage.label}`}
 className={`${panel} p-4 sm:p-5`}
 >
 {/* Stage header - click to expand/collapse */}
 {(() => {
 const percent = stageLessons.length ? (stageDone / stageLessons.length) * 100 : 0;
 return (
 <div
 role="button" tabIndex={0}
 onClick={() => toggleStage(stageKey)}
 onKeyDown={(e) => {
 if (e.key === "Enter" || e.key === " ") {
 e.preventDefault();
 toggleStage(stageKey);
 }
 }}
 className="w-full flex items-center justify-between gap-3 cursor-pointer text-left select-none"
 >
 <div className="flex items-center gap-3 min-w-0 flex-1">
 {/* Biểu tượng chặng. Chặng 1 là lá cờ trên ô giấy, còn lại là ô mực
     đậm (stone-950) - trước đây là nền vàng và nền brand, nhưng xanh chỉ
     dành cho chức năng. Hình bên trong đổi theo nội dung công nghệ. */}
 {stageIdx === 0 ? (
 <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 border border-stone-300 bg-[#f3f1ec] dark:border-stone-700 dark:bg-stone-950">
 <Flag className="w-5 h-5 text-ink-body" />
 </div>
 ) : (() => {
   const StageIcon = STAGE_ICONS[(stageIdx - 1) % STAGE_ICONS.length];
   return (
     <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 bg-stone-950 text-white border border-stone-950 dark:bg-stone-100 dark:border-stone-100">
       <StageIcon className="w-5 h-5 text-white dark:text-stone-950" />
     </div>
   );
 })()}

 <div className="flex items-center gap-2 flex-wrap min-w-0">
 <span className="text-[10px] tabular-nums font-black uppercase text-ink-body bg-[#f3f1ec] px-2 py-0.5 rounded-xs border border-stone-300 shrink-0 dark:bg-stone-950 dark:border-stone-700">
 {stageDisplayLabels.get(stage.label) || stageCopy?.label || stage.label}
 </span>
 {stage.isNew && (
 <span className="text-[9px] font-black uppercase text-ink-body px-1.5 py-px rounded-xs border border-stone-400 shrink-0 dark:border-stone-600">
 {t.dashboard.isNew}
 </span>
 )}
 {/* KHÔNG `truncate`. Tên chặng là câu duy nhất nói người học sắp học
     GÌ, và nó dài - "Biết mình trước khi học: audit, ngân sách, quỹ
     khẩn cấp, nợ" cụt ở "Biết mình trước khi…" thì thẻ chặng chỉ còn
     lại con số. Một người học báo đúng chuyện đó: "tựa đề bị ba chấm,
     không biết nội dung mình đang học là bài gì". Cho xuống dòng, chặn
     ở hai dòng để thẻ không cao vô hạn. */}
 <h3 className="text-sm sm:text-base font-black text-ink-max leading-snug line-clamp-2">
 {stageCopy?.name ?? stage.name}
 </h3>
 </div>
 </div>

 {/* Right Stage Stats & Chevron */}
 <div className="flex items-center gap-3 shrink-0">
 {/* Huy hiệu "đã vượt ải" và nút NHẬN CHỨNG CHỈ.
     Khối này từng bị gỡ mất trong một lượt dựng lại phần đầu chặng.
     `CertificateModal` và state `selectedCertStage` vẫn còn nguyên bên
     dưới, nhưng KHÔNG còn chỗ nào đặt state đó khác null - nên hộp
     chứng chỉ thành mã chết và người học vượt ải xong không nhận được
     gì. Không lỗi biên dịch: `setSelectedCertStage` vẫn được gọi ở
     `onClose`, nên linter thấy nó "có dùng". */}
 {isCurrentMilestonePassed && (
   <div className="flex items-center gap-2 shrink-0">
     <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-brand-800 border border-brand-300 px-2 py-0.5 rounded-xs dark:text-brand-300 dark:border-brand-800">
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
 {stage.available && learnersInStage(stageLessons) > 0 && (
 <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
 <Users className="h-3.5 w-3.5 text-ink-faint" aria-hidden />
 <span>{format(t.dashboard.stageLearners, { count: learnersInStage(stageLessons) })}</span>
 </span>
 )}

 {stage.available && stageLessons.length > 0 && (
 <div className="flex items-center gap-2.5">
 <div className="w-14 h-1.5 bg-surface-sunken rounded-xs overflow-hidden hidden sm:block">
 <div className="h-full bg-brand-600 dark:bg-brand-500 transition-all" style={{ width: `${percent}%` }} />
 </div>
 <span className="font-mono text-xs tabular-nums font-medium text-ink-max">
 {stageDone}/{stageLessons.length}
 </span>
 </div>
 )}

 <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${stageOpen ? "rotate-180" : ""}`} />
 </div>
 </div>
 );
 })()}

 {/* Not available yet - with lock and loading animation */}
 {stageOpen && !stage.available && (
 <div className="mt-4 border border-dashed border-line-strong rounded-sm px-5 py-6 text-center bg-[#fbfaf7] dark:bg-stone-900/50 relative overflow-hidden">

 {/* Lock icon */}
 <div className="relative z-10 flex flex-col items-center gap-3">
 <div className="w-12 h-12 rounded-sm border border-stone-300 bg-[#f3f1ec] dark:border-stone-700 dark:bg-stone-950 flex items-center justify-center">
 <svg className="w-6 h-6 text-ink-soft" fill="currentColor" viewBox="0 0 24 24">
 <path d="M12 1C6.48 1 2 5.48 2 11v10c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V11c0-5.52-4.48-10-10-10zm0 2c4.41 0 8 3.59 8 8v2H4v-2c0-4.41 3.59-8 8-8zm-3 13h6v2H9z"/>
 </svg>
 </div>
 <div>
 <p className="text-ink-soft text-sm font-extrabold">{t.dashboard.stageLockedTitle}</p>
 <p className="text-ink-muted text-xs mt-1">{t.dashboard.stageLockedHint}</p>
 </div>
 </div>
 </div>
 )}

 {/* Available but no lessons in DB yet - with building animation */}
 {stageOpen && stage.available && stageLessons.length === 0 && (
 <div className="mt-4 border border-dashed border-line-strong rounded-sm px-5 py-6 text-center bg-[#fbfaf7] dark:bg-stone-900/50 relative overflow-hidden">

 {/* Content */}
 <div className="relative z-10 flex flex-col items-center gap-2">
 <HardHat className="h-8 w-8 text-ink-faint" strokeWidth={1.5} aria-hidden="true" />
 <p className="text-ink-soft text-sm font-extrabold">{t.dashboard.buildingTitle}</p>
 <p className="text-ink-muted text-xs">{t.dashboard.buildingSubtitle}</p>
 </div>
 </div>
 )}

 {/* Parts (sub-stages) - each its own collapsible accordion */}
 {stageOpen && stage.available && stageLessons.length > 0 && !isStageLockedByMilestone && (
 <div className="mt-4 space-y-2">
 {stage.parts.map((part, partIdx) => {
 const partLessons = lessonsByPartKey.get(`${stage.label}::${part.name}`) ?? [];
 if (partLessons.length === 0) return null;
 const partHasSearchMatch = partLessons.some(lessonMatchesSearch);
 if (isSearchingStages && !partHasSearchMatch) return null;
 const visiblePartLessons = isSearchingStages ? partLessons.filter(lessonMatchesSearch) : partLessons;
 const partDone = partLessons.filter((l) => completed.includes(l.id)).length;
 // `partLockedCount` từng nằm đây - cùng phép lọc thừa như ở cấp chặng.
 const partKey = `${stageKey}-${part.name}`;
 const partOpen = openParts.has(partKey) || (isSearchingStages && partHasSearchMatch);

 return (
 <div key={part.name} className="rounded-sm border border-line-strong bg-white dark:bg-stone-900 overflow-hidden">
 <button
 onClick={() => togglePart(partKey)}
 aria-expanded={partOpen}
 className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f3f1ec] dark:hover:bg-stone-800/50 transition-colors cursor-pointer text-left select-none ${partOpen ? "border-b border-stone-200 bg-[#f3f1ec] dark:border-stone-800 dark:bg-stone-950" : ""}`}
 >
 <div className="shrink-0">
 {partDone === partLessons.length && partLessons.length > 0 ? (
 <div className="w-7 h-7 rounded-sm border border-brand-300 text-brand-700 flex items-center justify-center dark:border-brand-800 dark:text-brand-400">
 <CheckCircle2 className="w-4 h-4" />
 </div>
 ) : partIdx === 0 && stageIdx === 0 ? (
 <div className="w-7 h-7 rounded-sm bg-stone-950 text-white flex items-center justify-center dark:bg-stone-100 dark:text-stone-950">
 <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
 </div>
 ) : (
 <div className="w-7 h-7 rounded-sm border border-stone-300 bg-[#f3f1ec] text-stone-400 flex items-center justify-center dark:border-stone-700 dark:bg-stone-950">
 <Lock className="w-3.5 h-3.5" />
 </div>
 )}
 </div>

 {/* Cùng lý do với tên chặng ngay trên: đây là dòng nói phần này dạy
     gì, cắt đi là mất. */}
 <span className="font-bold text-ink text-xs sm:text-sm flex-1 min-w-0 line-clamp-2">
 {stageCopy?.parts[partIdx] ?? part.name}
 </span>
 
 <span className="hidden sm:inline font-mono text-[10px] text-ink-muted tabular-nums">
 {format(t.dashboard.lessonRange, { from: lessonOrdinal.get(partLessons[0].id) ?? "", to: lessonOrdinal.get(partLessons[partLessons.length - 1].id) ?? "" })}
 </span>

 <span className="font-mono text-xs tabular-nums font-medium text-ink-max">
 {partDone}/{partLessons.length}
 </span>
 
 <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${partOpen ? "rotate-180" : ""}`} />
 </button>

 {partOpen && (
 <div className="p-2 space-y-2">
 {visiblePartLessons.map((lesson) => {
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
 className="w-full text-left block rounded-sm border border-stone-200 bg-[#f3f1ec] dark:border-stone-800 dark:bg-stone-900/50 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
 >
 <div className="flex items-center gap-4 px-6 py-5">
 <div className="w-12 flex-shrink-0 text-center">
 <span className="font-mono tabular-nums text-sm font-medium text-ink-faint">
 {String(lessonOrdinal.get(lesson.id) ?? lesson.id).padStart(3, "0")}
 </span>
 </div>
 <div className="flex-shrink-0">
 <div className="w-6 h-6 rounded-xs border border-stone-300 flex items-center justify-center dark:border-stone-700">
 <Lock className="w-3.5 h-3.5 text-ink-muted" />
 </div>
 </div>
 <div className="flex-1 min-w-0">
 <div className="text-base font-bold leading-snug text-ink-muted">
 {stripStageLessonPrefix(lesson.title)}
 </div>
 <div className="text-sm mt-1 line-clamp-2 text-ink-faint">
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
 isDone
 ? "bg-[#fbfaf7] dark:bg-stone-900/60 border-line hover:border-stone-950 dark:hover:border-stone-300"
 : lesson.id === currentLessonId
 ? "border-stone-900 bg-white dark:border-stone-100 dark:bg-stone-900"
 : isSelectedForFlag
 ? "bg-white dark:bg-stone-900 border-brand-600 dark:border-brand-400"
 : isFlagged
 ? "bg-white dark:bg-stone-900 border-accent-line-mid hover:border-brand-600"
 : "bg-white dark:bg-stone-900 border-line-strong hover:border-stone-950 dark:hover:border-stone-300"
 }`}
 >
 <div className="flex items-center gap-4 px-6 py-5">
 {/* Day number */}
 <div className="w-12 flex-shrink-0 text-center">
 <span className={`font-mono tabular-nums text-sm font-medium ${isDone ? "text-accent-strong" : isFlagged ? "text-accent-strong" : "text-ink-muted"}`}>
 {String(lessonOrdinal.get(lesson.id) ?? lesson.id).padStart(3, "0")}
 </span>
 </div>

 {/* Status circle */}
 <div className="flex-shrink-0">
 {isExamCredited ? (
 // Hổ phách chứ không xanh: đã mở khoá là đúng, nhưng ghi "xong" là
 // ghi sai - người học chưa mở bài này ra lần nào.
 <div className="w-6 h-6 rounded-xs bg-amber-500 flex items-center justify-center" title={t.dashboard.examCreditedHint}>
 <LockOpen className="w-3.5 h-3.5 text-white" />
 </div>
 ) : isDone ? (
 <div className="w-6 h-6 rounded-xs bg-brand-600 flex items-center justify-center dark:bg-brand-500">
 <CheckCircle2 className="w-4 h-4 text-white" />
 </div>
 ) : isFlagged ? (
 <div className="w-6 h-6 rounded-xs bg-brand-600 flex items-center justify-center dark:bg-brand-500">
 <CheckCheck className="w-4 h-4 text-white" />
 </div>
 ) : (
 <div className="w-6 h-6 rounded-xs border-2 border-line-strong" />
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
 <div className={`text-base font-bold leading-snug ${isDone ? "text-ink-body" : "text-ink-max"}`}>
 {stripStageLessonPrefix(lesson.title)}
 </div>
 <div className={`text-sm mt-1 line-clamp-2 ${isDone ? "text-ink-muted" : isFlagged ? "text-accent-strong" : "text-ink-soft"}`}>
 {isExamCredited ? t.dashboard.examCreditedSubtitle : isFlagged ? t.dashboard.markLearned.flaggedSubtitle : renderSubtitle(lesson.id)}
 </div>
 <div className="text-[11px] mt-0.5 text-ink-faint font-semibold">
 {/* The time estimate also sits in the desktop meta
 column to the right, which is `hidden sm:flex` -
 so on mobile it would never be shown at all
 without repeating it here. */}
 <span className="sm:hidden">⏱ {formatLessonTime(lesson, t.dashboard.minutesShort)} · </span>
 {/* CHỈ hiện khi có người thật đã học xong bài này.
  Trước đây đây là getIllustrativeCount(slug, 60, 480) - băm slug
  ra một số trong khoảng 60-480 và gọi nó là "N người đã học". Bài
  chưa ai học vẫn hiện "212 người đã học", và con số ấy không đổi
  dù cả tháng không ai mở.
  Không có số thì không dựng gì: "0 người đã học" là câu đúng
  nhưng không ai muốn đọc trước khi bắt đầu một bài. */}
 {(lessonLearnerCounts?.get(lesson.id) ?? 0) > 0 &&
 format(t.dashboard.learnerCount, { count: lessonLearnerCounts!.get(lesson.id)! })}
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

 {/* Meta */}
 <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
 <span className={`text-sm font-semibold ${isDone ? "text-ink-muted" : isFlagged ? "text-accent-strong" : "text-ink-soft"}`}>
 {formatLessonTime(lesson, t.dashboard.minutesShort)}
 </span>
 {/* Ba trạng thái, ba cách đọc: đã học
 (xanh lá - khớp chữ "autoColour" trong
 hộp giải thích), ĐANG HỌC (nền mực - chỉ
 đúng một hàng trong cả danh sách
 mang nó), chưa học (nhãn độ khó).
 Trước đây chỉ có hai, nên một chặng
 21 bài chưa học là 21 hàng giống hệt
 nhau. */}
 <span className={`text-xs font-bold rounded-xs border px-2.5 py-1 ${
 isDone
 ? "border-brand-300 text-brand-800 dark:border-brand-800 dark:text-brand-300"
 : lesson.id === currentLessonId
 ? "border-stone-950 bg-stone-950 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-950"
 : isFlagged
 ? "border-brand-300 text-accent-strong dark:border-brand-800"
 : "border-stone-300 text-ink-body dark:border-stone-700"
 }`}>
 {isDone
 ? t.dashboard.markLearned.doneBadge
 : lesson.id === currentLessonId
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

 <div className="flex-shrink-0 text-lg font-bold text-ink-faint">
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
 <div className="mt-4 p-5 rounded-sm border border-amber-300 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
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
 <div className="mt-4 border border-dashed border-rose-300 dark:border-rose-900 rounded-sm px-5 py-8 text-center bg-[#fbfaf7] dark:bg-stone-900/50 relative overflow-hidden">
 <div className="flex flex-col items-center gap-3">
 <div className="w-12 h-12 rounded-sm border border-rose-300 text-rose-600 flex items-center justify-center dark:border-rose-900 dark:text-rose-400">
 <Lock className="w-6 h-6" />
 </div>
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
 );
 })}
 </div>

 {/* Case chuyên sâu - real company/topic deep-dives outside the day curriculum */}
 {bonusLessons.length > 0 && (
 <div className="mt-6">
 {/* Đầu khu theo khuôn SectionHead: mã định vị mono + eyebrow trên
     đường kẻ 1px, rồi tiêu đề đậm - nhưng cả khối là nút gập/mở. */}
 <button
 onClick={() => toggleStage("bonus")}
 aria-expanded={bonusOpen}
 className="w-full mb-4 cursor-pointer text-left"
 >
 <span className="flex items-center justify-between gap-4 border-b border-line-strong pb-2">
 <Sys className="text-ink-muted">{SYS.bonus}</Sys>
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
 className="w-full text-left block rounded-sm border border-stone-200 bg-[#f3f1ec] dark:border-stone-800 dark:bg-stone-900/50 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
 >
 <div className="flex items-center gap-4 px-6 py-4">
 <div className="flex-shrink-0">
 <div className="w-6 h-6 rounded-xs border border-stone-300 flex items-center justify-center dark:border-stone-700">
 <Lock className="w-3.5 h-3.5 text-ink-muted" />
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
 ? "bg-[#fbfaf7] dark:bg-stone-900/60 border-line hover:border-stone-950 dark:hover:border-stone-300"
 : isSelectedForFlag
 ? "bg-white dark:bg-stone-900 border-brand-600 dark:border-brand-400"
 : isFlagged
 ? "bg-white dark:bg-stone-900 border-accent-line-mid hover:border-brand-600"
 : "bg-white dark:bg-stone-900 border-line-strong hover:border-stone-950 dark:hover:border-stone-300"
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
 <div className="w-6 h-6 rounded-xs bg-brand-600 flex items-center justify-center dark:bg-brand-500">
 <CheckCircle2 className="w-4 h-4 text-white" />
 </div>
 ) : isFlagged ? (
 <div className="w-6 h-6 rounded-xs bg-brand-600 flex items-center justify-center dark:bg-brand-500">
 <CheckCheck className="w-4 h-4 text-white" />
 </div>
 ) : (
 <div className="w-6 h-6 rounded-xs border-2 border-line-strong" />
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
 <div className="mt-6 space-y-4">
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
          <div className={`min-w-0 space-y-6 ${
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

            {isLessonsView && user?.id && <DailyNewsQuizWidget userId={user.id} compact />}

            {isLessonsView && (
              <div className={`${panel} p-5 flex items-center justify-between gap-3 select-none`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm border border-stone-300 bg-[#f3f1ec] flex items-center justify-center shrink-0 dark:border-stone-700 dark:bg-stone-950">
                    <Trophy className="w-5 h-5 text-ink-body" />
                  </div>
                  <div>
                    <span className="eyebrow text-ink-muted block">
                      {t.dashboard.nextChallenge}
                    </span>
                    <h4 className="text-sm font-black tracking-tight text-ink-max mt-0.5">
                      {format(t.dashboard.rigorousExamTitle, { level: getLevelByXp(userXp).level + 1 })}
                    </h4>
                  </div>
                </div>
                <Link
                  href="/kiem-tra"
                  className={`${btnPrimary} shrink-0 px-3 py-1.5 text-[11px] cursor-pointer`}
                >
                  <span>{t.dashboard.takeExamNow}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}

            {isLessonsView && (
              <section className={`${panel} p-3.5`}>
                <h3 className="eyebrow mb-2.5 border-b border-stone-200 pb-2 text-ink-muted dark:border-stone-800">
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
                className={`space-y-4 ${isLessonsView ? "" : "xl:min-h-0 xl:overflow-y-auto"}`}
              >
                {/* Hành trình theo nhu cầu đứng trên gợi ý chung: nó trả lời
                    "hôm nay học gì" bằng chính mục tiêu người học đã chọn. */}
                {/* Bảng xếp hạng thu nhỏ, luôn kèm dòng "Bạn" - xem
                    DashboardLeaderboardCard. Đứng đầu cột phải: người học mở
                    dashboard hỏi "mình đang ở đâu" trước "hôm nay học gì". */}
                {!isLessonsView && <DashboardLeaderboardCard userId={user.id} />}
                {!isLessonsView && <LearningGoalCard />}
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
