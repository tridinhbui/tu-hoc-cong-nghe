"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { isValidAvatar } from "@/lib/avatar-utils";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { FileText, BarChart3, StickyNote, GraduationCap, Gamepad2, Menu, X, Briefcase, BriefcaseBusiness, BookOpen, Home, Flame, Users, MessageSquareMore, Search, ChevronDown, Award, ShieldAlert, Route, Landmark, type LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { createClient } from "@/lib/supabase";
import GoldCoinIcon from "@/components/GoldCoinIcon";
import NotificationBell from "@/components/NotificationBell";
import { useRoutePrefetch } from "@/lib/use-route-prefetch";
import Logo from "@/components/Logo";
import { getUnresolvedMistakeCount } from "@/lib/quiz-mistakes";
import { claimPendingReferral } from "@/lib/referrals";
import { claimDailyLoginChest } from "@/lib/chests";
import { useLevelUpWatcher } from "@/lib/use-level-up-watcher";
import { trackFeatureClick } from "@/lib/feature-events";
import LevelUpModal from "@/components/LevelUpModal";
import QuickShopModal from "@/components/QuickShopModal";
import GlobalSearchModal from "@/components/GlobalSearchModal";
import { getMyCareerGoal } from "@/lib/supabase-career-goals";
import { FINANCE_CAREERS } from "@/lib/finance-careers";

interface NavProfile {
  full_name: string | null;
  email: string;
  avatar_url: string | null;
  total_xp: number;
  current_level: number;
  lessons_completed: number;
  coins?: number;
}

// `labelKey` indexes into the nav section of the dictionary; `label` is for
// the entries that are proper nouns and read the same in both languages, so
// translating them would only make the product harder to talk about.
type NavLink =
  | { href: string; label: string; labelKey?: never; icon: LucideIcon }
  | { href: string; labelKey: keyof Dictionary["nav"]; label?: never; icon: LucideIcon };

/**
 * Above the sections, ungrouped, always visible.
 *
 * Dashboard, because it is the way back to the overview rather than one
 * destination among several. Then the three community entries, which have no
 * group of their own: a collapsible header over exactly three rows costs more
 * room than it hides, and "Cộng đồng" adds nothing the three labels do not
 * already say. Đại sảnh leads them - it is the newest room and the only one
 * that opens a space rather than a page.
 *
 * Kiểm tra stays in Học tập rather than joining this list. It carries a live
 * "Tin mới" badge, which is what once justified lifting it out, but
 * `forcedOpenKeys` in the component below now unfolds a section while
 * something inside it has a prompt waiting - so the badge is visible without
 * the row leaving the group it belongs to.
 */
const TOP_LEVEL_LINKS: NavLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  // Đại sảnh 3D - tên riêng của không gian nên hardcode label như FinSocial.
  { href: "/cong-dong", label: "Đại sảnh", icon: Landmark },
  { href: "/nhom-hoc", labelKey: "studyGroup", icon: Users },
  { href: "/finsocial", label: "FinSocial", icon: MessageSquareMore },
];

/** The nav is grouped by what the reader is trying to *do*, not by feature
 *  age. Eleven flat entries gave no hint which of them belonged together, so
 *  every visit meant re-reading the whole list. `titleKey` indexes the same
 *  dictionary section as the item labels, so the headings translate too. */
type NavSection = { titleKey: keyof Dictionary["nav"]; links: NavLink[] };

/** Fold state lives in localStorage rather than component state alone: the
 *  navbar survives client-side navigation but not a reload, and a reader who
 *  folded four sections away does not want them back on every hard refresh. */
const NAV_SECTION_STORAGE_KEY = "thtcdn:nav-collapsed-sections";

const NAV_SECTIONS: NavSection[] = [
  {
    titleKey: "sectionLearn",
    links: [
      { href: "/hoc-bai", label: "Học bài", icon: BookOpen },
      // Tách khỏi dashboard cùng đợt với CFA và FRM. Cả ba trước đó là thẻ
      // trong dãy chọn track nhưng không phải track trong lộ trình đánh số
      // theo ngày - chúng là các lối học song song, nên thuộc navbar.
      //
      // Nhãn và icon phải khác hẳn "Sự nghiệp" (/su-nghiep) ở nhóm Tiến độ:
      // hai trang trả lời hai câu khác nhau - trang kia là "nghề nào hợp với
      // tôi", trang này là "nghề đó thì học bài nào" - và dùng chung icon
      // cặp táp thì đọc như một mục bị lặp.
      { href: "/nghe-nghiep-hoc", label: "Học theo nghề", icon: Route },
      // /cfa had no nav entry at all. The only way in was a placement modal
      // that fires once per browser and never again once localStorage records
      // it, so ten subjects, 324 cross-referenced lessons, fourteen
      // purpose-built Ethics lessons, flashcards and the formula sheet were
      // reachable only by typing the URL.
      { href: "/cfa", label: "CFA Level I", icon: Award },
      { href: "/frm", label: "FRM", icon: ShieldAlert },
      // Kiểm tra thuộc nhóm Học tập chứ không phải Thực hành: các bài kiểm tra
      // ở đây chấm đúng phần kiến thức của những lối học ngay phía trên, không
      // phải một trò để luyện tay như Game hay Phỏng vấn.
      { href: "/kiem-tra", labelKey: "quiz", icon: GraduationCap },
      { href: "/ghi-chu", labelKey: "notes", icon: StickyNote },
      // Sự nghiệp sits with the learning entries rather than with the progress
      // charts. "Nghề nào hợp với tôi" is a question you answer on the way in,
      // next to the tracks you would then pick - not a statistic you check
      // afterwards, which is what the Tiến độ group holds.
      { href: "/su-nghiep", labelKey: "career", icon: Briefcase },
    ],
  },
  // Không còn nhóm Cộng đồng. Ba lối vào đó lên thẳng TOP_LEVEL_LINKS: một
  // tiêu đề gập được đặt trên đúng ba dòng tốn nhiều chỗ hơn phần nó giấu đi,
  // và "Cộng đồng" không nói thêm gì mà ba cái nhãn kia chưa nói.
  {
    titleKey: "sectionPractice",
    links: [
      { href: "/game", label: "Game", icon: Gamepad2 },
      { href: "/phong-van-ky-thuat", labelKey: "technicalInterview", icon: BriefcaseBusiness },
    ],
  },
  {
    titleKey: "sectionProgress",
    links: [{ href: "/analytics", labelKey: "stats", icon: BarChart3 }],
  },
  {
    titleKey: "sectionResources",
    links: [{ href: "/tai-lieu", label: "Tài liệu Miễn phí", icon: FileText }],
  },
];

/** The closed-by-default state: every section key. Derived from NAV_SECTIONS
 *  rather than listed by hand so a section added later is folded like the
 *  rest instead of being the one that hangs open. */
const ALL_SECTION_KEYS = NAV_SECTIONS.map((section) => section.titleKey);

// Single, persistent top navbar for every signed-in page (mounted once in
// app/(app)/layout.tsx, which Next.js keeps alive across client-side
// navigations between routes in that group - unlike each page rendering its
// own header, this one never remounts/flashes when switching pages).
//
// Also replaces two previously-separate, drifting avatar dropdowns:
// UserProfile.tsx (used only by the old dashboard header, no Game link) and
// UserMenu.tsx (used by profile/game/etc, had the Game link) - which is
// exactly why the "Mini Game" link update only ever showed up on some pages
// and not others. This is now the one place that dropdown lives.
export default function AppNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useI18n();
  const [profile, setProfile] = useState<NavProfile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [showQuickShop, setShowQuickShop] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [careerGoalId, setCareerGoalId] = useState<string | null>(null);
  // Which sections the reader has folded away. Every section starts folded, so
  // the sidebar opens as five headers rather than the ~20 links they hold. The
  // pathname effect below unfolds whichever section owns the current page, so
  // the one you are standing in is never hidden.
  //
  // Still stored as the COLLAPSED set rather than the open one, so the stored
  // preference of a reader who folded things away before this default changed
  // is still read correctly.
  const [collapsedSections, setCollapsedSections] = useState<string[]>(ALL_SECTION_KEYS);
  // Nhóm mà người đọc đã tự tay gập/mở trong phiên này.
  const [manuallyToggled, setManuallyToggled] = useState<string[]>([]);
  // Until localStorage has been read, the sections render in their default
  // state with no transition - otherwise every page load plays an animation
  // for whatever the stored preference turns out to differ on.
  const [sectionsHydrated, setSectionsHydrated] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  useRoutePrefetch(["/dashboard", "/hoc-bai", "/analytics", "/bxh", "/profile", "/ban-be", "/nhom-hoc", "/finsocial", "/bang-tin", "/cong-dong", "/su-nghiep", "/ghi-chu", "/cong-cu", "/game", "/settings", "/tai-lieu", "/kiem-tra", "/phong-van-ky-thuat", "/cfa"]);

  useEffect(() => {
    // Read local storage immediately on mount
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("active_career_goal") || localStorage.getItem("thtcdn_career_goal") || localStorage.getItem("user_career_goal");
      if (local) setCareerGoalId(local);
    }

    const loadGoal = async () => {
      if (userId) {
        const g = await getMyCareerGoal(userId).catch(() => null);
        if (g) {
          setCareerGoalId(g);
        }
      }
    };
    void loadGoal();

    function handleCareerGoalUpdate(e: Event) {
      const detail = (e as CustomEvent<{ careerId: string | null }>).detail;
      setCareerGoalId(detail?.careerId ?? null);
    }

    window.addEventListener("thtcdn:career-goal-updated", handleCareerGoalUpdate);
    return () => {
      window.removeEventListener("thtcdn:career-goal-updated", handleCareerGoalUpdate);
    };
  }, [userId]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      const fallback: NavProfile = {
        full_name: user.user_metadata?.full_name || null,
        email: user.email || "",
        avatar_url: user.user_metadata?.avatar_url || null,
        total_xp: 0,
        current_level: 1,
        lessons_completed: 0,
      };
      try {
        const { data } = await supabase
          .from("user_profiles")
          .select("full_name, email, avatar_url, total_xp, current_level, lessons_completed, coins")
          .eq("id", user.id)
          .single();
        setProfile((data as NavProfile) || fallback);
      } catch {
        setProfile(fallback);
      }
      getUnresolvedMistakeCount(user.id)
        .then(setMistakeCount)
        .catch(() => {});
      void claimPendingReferral();
      claimDailyLoginChest(user.id)
        .then((granted) => {
          if (granted) toast.success(t.nav.dailyGiftReady);
        })
        .catch(() => {});
    });
  }, []);

  // Keeps `profile` in sync with level/XP/Coin changes
  useEffect(() => {
    function handleXpUpdate(e: Event) {
      const detail = (e as CustomEvent<{ currentLevel: number; totalXp: number }>).detail;
      if (!detail) return;
      setProfile((prev) => (prev ? { ...prev, current_level: detail.currentLevel, total_xp: detail.totalXp } : prev));
    }
    function handleCoinUpdate(e: Event) {
      const detail = (e as CustomEvent<{ coins: number }>).detail;
      if (detail && typeof detail.coins === "number") {
        setProfile((prev) => (prev ? { ...prev, coins: detail.coins } : prev));
      }
    }
    window.addEventListener("thtcdn:xp-updated", handleXpUpdate);
    window.addEventListener("thtcdn:coin-updated", handleCoinUpdate);
    return () => {
      window.removeEventListener("thtcdn:xp-updated", handleXpUpdate);
      window.removeEventListener("thtcdn:coin-updated", handleCoinUpdate);
    };
  }, []);

  const [hasPendingNewsQuiz, setHasPendingNewsQuiz] = useState(false);
  const [hasPendingStudyGroupCheckin, setHasPendingStudyGroupCheckin] = useState(false);

  useEffect(() => {
    const checkNewsQuiz = () => {
      const todayKey = new Date().toISOString().split("T")[0];
      const key = userId ? `news_quiz_answered_${userId}_${todayKey}` : `news_quiz_answered_guest_${todayKey}`;
      const answered = typeof window !== "undefined" && Boolean(localStorage.getItem(key));
      setHasPendingNewsQuiz(!answered);
    };

    const checkStudyGroupCheckin = () => {
      const todayKey = new Date().toISOString().split("T")[0];
      const key = userId ? `study_group_checkin_${userId}_${todayKey}` : `study_group_checkin_guest_${todayKey}`;
      const checkedIn = typeof window !== "undefined" && Boolean(localStorage.getItem(key));
      setHasPendingStudyGroupCheckin(!checkedIn);
    };

    checkNewsQuiz();
    checkStudyGroupCheckin();

    const handleNewsAnswered = () => {
      setHasPendingNewsQuiz(false);
    };

    const handleStudyGroupCheckin = () => {
      setHasPendingStudyGroupCheckin(false);
    };

    window.addEventListener("thtcdn:daily-news-quiz-answered", handleNewsAnswered);
    window.addEventListener("thtcdn:study-group-checkin", handleStudyGroupCheckin);
    window.addEventListener("thtcdn:xp-updated", () => {
      checkNewsQuiz();
      checkStudyGroupCheckin();
    });
    return () => {
      window.removeEventListener("thtcdn:daily-news-quiz-answered", handleNewsAnswered);
      window.removeEventListener("thtcdn:study-group-checkin", handleStudyGroupCheckin);
      window.removeEventListener("thtcdn:xp-updated", checkNewsQuiz);
    };
  }, [userId]);

  const { celebrateLevel, dismiss } = useLevelUpWatcher(profile?.current_level);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const clickedInsideDesktop = desktopDropdownRef.current?.contains(target) ?? false;
      const clickedInsideMobile = mobileDropdownRef.current?.contains(target) ?? false;
      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    setSigningOut(true);
    await createClient().auth.signOut();
    router.replace("/login");
  };

  const handleDropdownNavigate = (href: string) => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push(href);
  };

  const openRpgHub = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/game?building=shop");
  };

  const displayName = profile?.full_name || profile?.email || "Người dùng";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const toggleMobileMenu = () => {
    setDropdownOpen(false);
    setMobileMenuOpen((v) => !v);
  };

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(NAV_SECTION_STORAGE_KEY);
      if (raw) setCollapsedSections(JSON.parse(raw) as string[]);
    } catch {
      // Private mode, quota, or a value from an older shape: falling back to
      // the closed default is a fine outcome, so there is nothing to recover.
    }
    setSectionsHydrated(true);
  }, []);

  // Landing inside a folded section would otherwise hide the page the reader
  // is actually on, so navigation unfolds it. This runs on the pathname, not
  // on every render, so folding a section while standing in it still works.
  useEffect(() => {
    const owning = NAV_SECTIONS.find((section) => section.links.some((l) => l.href === pathname));
    if (!owning) return;
    setCollapsedSections((prev) => (prev.includes(owning.titleKey) ? prev.filter((k) => k !== owning.titleKey) : prev));
  }, [pathname]);

  // A badge inside a folded section is a prompt that does not exist - which is
  // why Kiểm tra and Học nhóm were pulled out of the groups in the first place.
  // They are back in their groups, so instead a group force-opens while
  // something inside it has a prompt waiting.
  //
  // Derived at render rather than pushed into collapsedSections by an effect:
  // the fold state is the reader's stored preference, and a live prompt should
  // override it for as long as the prompt lasts, not overwrite it. Once the
  // check-in is done the section returns to however the reader left it.
  const badgedHrefs = [
    ...(hasPendingNewsQuiz ? ["/kiem-tra"] : []),
    ...(hasPendingStudyGroupCheckin ? ["/nhom-hoc"] : []),
  ];
  const forcedOpenKeys = badgedHrefs.length
    ? NAV_SECTIONS.filter((section) => section.links.some((l) => badgedHrefs.includes(l.href)))
        .map((section) => section.titleKey as string)
        .filter((key) => !manuallyToggled.includes(key))
    : [];

  const toggleSection = (titleKey: string) => {
    // Một cú bấm thật thắng force-open. Nếu không, người đọc bấm vào tiêu đề
    // Học tập mà không có gì xảy ra - hasPendingNewsQuiz mặc định là true tới
    // khi làm xong quiz tin tức trong ngày, tức gần như cả ngày, nên Kiểm tra
    // giữ nhóm đó mở và cái nút đọc ra là hỏng.
    //
    // Force-open sinh ra để lấn át *lựa chọn đã lưu*, không phải để lấn át
    // *một hành động đang diễn ra*.
    setManuallyToggled((prev) => (prev.includes(titleKey) ? prev : [...prev, titleKey]));
    setCollapsedSections((prev) => {
      const next = prev.includes(titleKey) ? prev.filter((k) => k !== titleKey) : [...prev, titleKey];
      try {
        window.localStorage.setItem(NAV_SECTION_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Preference is lost on reload; the nav still works this session.
      }
      return next;
    });
  };

  const toggleProfileDropdown = () => {
    setMobileMenuOpen(false);
    setDropdownOpen((v) => !v);
  };

  /** One nav row, shared by the ungrouped Dashboard link and every section
   *  below it. Written once rather than per call site: the badge and
   *  highlight rules already run to a dozen branches, and three copies of
   *  them is how the desktop and mobile menus drifted apart before. */
  const renderNavItem = ({ href, label, labelKey, icon: Icon }: NavLink, onNavigate?: () => void) => {
    const navLabel = labelKey ? t.nav[labelKey] : label;
    const active = pathname === href;
    const isGame = href === "/game";
    const isCareer = href === "/su-nghiep";
    const isKiemTra = href === "/kiem-tra";
    const isNhomHoc = href === "/nhom-hoc";
    // Đại sảnh is the only entry that opens a 3D space rather than a page, so
    // it gets a standing treatment like Game rather than a conditional badge.
    // Violet because it is the one hue the nav was not already using: amber is
    // Game and the two check-in prompts, rose is a waiting news quiz, emerald
    // is the active row. Reusing any of those would read as one of those
    // states instead of as its own destination.
    const isDaiSanh = href === "/cong-dong";
    return (
      <Link
        key={href}
        href={href}
        onClick={() => {
          onNavigate?.();
          trackFeatureClick("nav_click", { label: href });
        }}
        className={`group relative flex items-center gap-2.5 rounded-2xl px-3 py-2 text-sm font-bold transition-all duration-200 ${
          isGame
            ? "border border-amber-200 bg-amber-50 text-amber-700 shadow-sm hover:bg-amber-100/70 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-900/40"
            : isDaiSanh
            ? "border border-violet-300 bg-gradient-to-r from-violet-50 to-indigo-50/70 text-violet-700 shadow-sm hover:from-violet-100 hover:to-indigo-100/70 dark:border-violet-800/70 dark:from-violet-950/60 dark:to-indigo-950/40 dark:text-violet-300 dark:hover:from-violet-900/60"
            : isKiemTra && hasPendingNewsQuiz
              ? "border border-rose-300/80 bg-gradient-to-r from-rose-50 to-orange-50/60 text-rose-700 shadow-xs hover:bg-rose-100/80 dark:border-rose-900 dark:from-rose-950/50 dark:to-stone-900 dark:text-rose-300"
              : isNhomHoc && hasPendingStudyGroupCheckin
                ? "border border-amber-300/80 bg-amber-50/80 text-amber-800 shadow-xs hover:bg-amber-100/80 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300"
                : active
                  ? "border border-emerald-200/70 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-900 dark:hover:text-stone-100"
        }`}
      >
        <Icon className={`h-4 w-4 shrink-0 ${isGame ? "text-amber-600 dark:text-amber-400" : isDaiSanh ? "text-violet-500 dark:text-violet-400" : isCareer ? "text-emerald-600 dark:text-emerald-400" : isKiemTra && hasPendingNewsQuiz ? "text-rose-500 animate-pulse" : isNhomHoc && hasPendingStudyGroupCheckin ? "text-amber-600 animate-bounce" : ""}`} />
        <span className="flex-1">{isGame ? "Game Kingdom" : navLabel}</span>
        {isGame && (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">
            <Flame className="h-2.5 w-2.5 text-orange-500 dark:text-orange-400" />
            HOT
          </span>
        )}
        {isDaiSanh && (
          <span className="inline-flex items-center gap-1 rounded-full border border-violet-300 bg-white px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-violet-700 shadow-2xs dark:border-violet-700/70 dark:bg-violet-950 dark:text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            3D
          </span>
        )}
        {isKiemTra && hasPendingNewsQuiz && (
          <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500 text-white shadow-xs animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            Tin mới
          </span>
        )}
        {isNhomHoc && hasPendingStudyGroupCheckin && (
          <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-xs animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            Check-in
          </span>
        )}
        {isCareer && !careerGoalId && (
          <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-2xs animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            Chưa chọn
          </span>
        )}
      </Link>
    );
  };

  /** The grouped sections, each foldable. `onNavigate` is how the mobile menu
   *  closes itself on tap; the desktop sidebar passes nothing.
   *
   *  The open/close animation uses a 0fr -> 1fr grid row rather than
   *  max-height: the links inside vary in count and pick up badges at runtime,
   *  so any fixed max-height is either too small (clipping) or too large (the
   *  close lags behind the pointer by the unused pixels).
   *
   *  `idPrefix` keeps the aria wiring unique - the desktop sidebar and the
   *  mobile sheet both render this list, and duplicate ids would point every
   *  header at whichever panel mounted last. */
  const renderNavSections = (onNavigate?: () => void, idPrefix = "nav") =>
    NAV_SECTIONS.map((section) => {
      const collapsed =
        collapsedSections.includes(section.titleKey) && !forcedOpenKeys.includes(section.titleKey);
      const panelId = `${idPrefix}-section-${section.titleKey}`;
      const holdsCurrentPage = section.links.some((l) => l.href === pathname);
      return (
        <div key={section.titleKey} className="mt-2.5 first:mt-1">
          <button
            type="button"
            onClick={() => toggleSection(section.titleKey)}
            aria-expanded={!collapsed}
            aria-controls={panelId}
            className="group flex w-full items-center gap-1.5 rounded-xl px-3 py-1 text-left transition-colors hover:bg-stone-100/70 dark:hover:bg-stone-900/70 cursor-pointer"
          >
            <span className="flex-1 text-[10px] font-black uppercase tracking-[0.14em] text-stone-400 dark:text-stone-500">
              {t.nav[section.titleKey]}
            </span>
            {/* A folded section holding the current page still needs to say so,
                otherwise the only cue that you are somewhere is hidden. */}
            {collapsed && holdsCurrentPage && (
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            )}
            <ChevronDown
              className={`h-3.5 w-3.5 shrink-0 text-stone-400 transition-transform duration-200 dark:text-stone-500 ${
                collapsed ? "-rotate-90" : ""
              }`}
            />
          </button>
          <div
            id={panelId}
            className={`grid ${sectionsHydrated ? "transition-[grid-template-rows] duration-200 ease-out" : ""} ${
              collapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col gap-1 pt-1">
                {section.links.map((link) => renderNavItem(link, onNavigate))}
              </div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <>
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 bg-white/96 dark:bg-stone-950/96 border-r border-stone-200 dark:border-stone-800 backdrop-blur">
        <div className="flex h-full w-full flex-col px-3.5 py-4 overflow-y-auto scrollbar-none">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-2xl shrink-0">
            <Logo size={30} />
            <span className="text-base font-bold text-stone-900 dark:text-stone-100">Tự Học Tài Chính</span>
          </Link>

          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="mt-3 flex items-center justify-between w-full px-3 py-2 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-stone-400" />
              <span>Tìm kiếm...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded-md bg-white dark:bg-stone-800 text-[10px] font-mono border border-stone-200 dark:border-stone-700 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          <nav className="mt-3 flex flex-col shrink-0">
            {TOP_LEVEL_LINKS.map((link) => renderNavItem(link))}
            {renderNavSections()}
          </nav>

          <div className="mt-auto pt-4 space-y-2.5 shrink-0" ref={desktopDropdownRef}>
            {profile && userId && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowQuickShop(true)}
                  className="flex flex-1 min-w-0 items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm font-black text-amber-700 shadow-sm transition-colors hover:bg-amber-100/80 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400"
                  title="Số dư Coin tích lũy - Bấm để mở Cửa hàng Nhanh"
                >
                  <span className="flex items-center gap-2">
                    <GoldCoinIcon className="w-5 h-5" />
                    <span>Coins</span>
                  </span>
                  <span>{profile.coins ?? 0}</span>
                </button>
                <NotificationBell userId={userId} />
              </div>
            )}

            {!profile ? (
              <div className="h-12 rounded-2xl bg-stone-100 dark:bg-stone-900 animate-pulse" />
            ) : (
              <div>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex w-full items-center gap-2.5 rounded-2xl border border-stone-200 bg-white px-2.5 py-2.5 text-left transition-colors hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:hover:bg-stone-800 cursor-pointer"
                >
                  {isValidAvatar(profile.avatar_url) ? (
                    <Image src={profile.avatar_url} alt={displayName} width={36} height={36} className="w-9 h-9 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                      {initials || "?"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-stone-900 dark:text-stone-100">{profile.full_name || "Người dùng"}</p>
                    <p className="truncate text-[11px] text-stone-500 dark:text-stone-400">{profile.email}</p>
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="mt-2 space-y-1 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/90 dark:bg-stone-900/90 p-2 shadow-sm animate-[fadeIn_0.15s_ease-out]">
                    <button type="button" onClick={() => handleDropdownNavigate("/profile")} className="block w-full rounded-xl px-3 py-2 text-left text-xs font-bold text-stone-800 transition hover:bg-white dark:text-stone-200 dark:hover:bg-stone-800">
                      👤 Hồ sơ cá nhân
                    </button>
                    <button type="button" onClick={() => handleDropdownNavigate("/ban-be")} className="block w-full rounded-xl px-3 py-2 text-left text-xs font-bold text-stone-800 transition hover:bg-white dark:text-stone-200 dark:hover:bg-stone-800">
                      👥 Bạn bè & Kết nối
                    </button>
                    <button type="button" onClick={() => handleDropdownNavigate("/settings")} className="block w-full rounded-xl px-3 py-2 text-left text-xs font-bold text-stone-800 transition hover:bg-white dark:text-stone-200 dark:hover:bg-stone-800">
                      ⚙️ Cài đặt tài khoản
                    </button>
                    <div className="flex items-center justify-between gap-2 rounded-xl px-3 py-2">
                      <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                        🌐 {t.language.label}
                      </span>
                      <LanguageSwitcher compact />
                    </div>
                    <button
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="block w-full rounded-xl px-3 py-2 text-left text-xs font-bold text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/50 disabled:opacity-50"
                    >
                      🚪 {signingOut ? t.nav.signingOut : t.nav.signOut}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* h-14 is load-bearing, not styling. This header is `sticky`, and a
          sticky element still takes its space in normal flow - so a page that
          asks for a full `h-dvh` below it ends up 100dvh + this header tall
          and the document scrolls, defeating the point. Pages that pin
          themselves to one screen subtract exactly this height on mobile
          (see APP_MOBILE_HEADER_H in app/(app)/kiem-tra/page.tsx). Keep the
          two in step. */}
      <header className="lg:hidden h-14 shrink-0 border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white/95 dark:bg-stone-950/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto h-full px-3 sm:px-6 flex items-center justify-between gap-1.5 sm:gap-4 w-full overflow-hidden">
          <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
            <Logo size={28} />
            <span className="hidden sm:inline text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 whitespace-nowrap">Tự Học Tài Chính</span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <Link
              href="/tai-lieu"
              className={`flex items-center gap-1 text-xs font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl border transition-all duration-200 whitespace-nowrap ${
                pathname === "/tai-lieu"
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                  : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800"
              }`}
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Tài liệu Miễn phí</span>
              <span className="sm:hidden text-[11px]">Tài liệu</span>
            </Link>

            {profile && (
              <button
                onClick={() => setShowQuickShop(true)}
                className="flex items-center gap-1 text-xs font-black px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900 hover:bg-amber-100/80 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
                title="Số dư Coin tích lũy - Bấm để mở Cửa hàng Nhanh"
              >
                <GoldCoinIcon className="w-4 h-4" />
                <span className="font-black text-amber-600 dark:text-amber-400">{profile.coins ?? 0}</span>
              </button>
            )}

            {profile && userId && <NotificationBell userId={userId} />}

            <button
              onClick={toggleMobileMenu}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors shrink-0"
              aria-label={t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-rose-500" /> : <Menu className="w-5 h-5" />}
            </button>

            {!profile ? (
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-stone-200 dark:bg-stone-700 rounded-full animate-pulse shrink-0" />
            ) : (
              <div className="relative shrink-0" ref={mobileDropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center p-0.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  {isValidAvatar(profile.avatar_url) ? (
                    <Image src={profile.avatar_url} alt={displayName} width={34} height={34} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                      {initials || "?"}
                    </div>
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-[min(16rem,calc(100vw-2rem))] bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xl z-50 p-3.5">
                    <div className="flex gap-2.5 mb-3 pb-3 border-b border-stone-100 dark:border-stone-800 items-center">
                      {isValidAvatar(profile.avatar_url) ? (
                        <Image src={profile.avatar_url} alt={displayName} width={36} height={36} className="w-9 h-9 rounded-full object-cover shrink-0" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shrink-0">{initials || "?"}</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-stone-900 dark:text-stone-100 truncate text-xs">{profile.full_name || "Người dùng"}</p>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">{profile.email}</p>
                      </div>
                    </div>

                    <div className="space-y-1 mb-2">
                      <button type="button" onClick={() => handleDropdownNavigate("/profile")} className="block w-full rounded-lg px-3 py-1.5 text-left text-xs font-semibold text-stone-900 transition hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800">
                        Hồ sơ
                      </button>
                      <button type="button" onClick={() => handleDropdownNavigate("/ban-be")} className="block w-full rounded-lg px-3 py-1.5 text-left text-xs font-semibold text-stone-900 transition hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800">
                        Bạn bè
                      </button>
                      <button type="button" onClick={() => handleDropdownNavigate("/settings")} className="block w-full rounded-lg px-3 py-1.5 text-left text-xs font-semibold text-stone-900 transition hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800">
                        Cài đặt
                      </button>
                    </div>

                    <button
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="w-full px-3 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition disabled:opacity-50 text-left"
                    >
                      {signingOut ? t.nav.signingOut : t.nav.signOut}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <>
            {/* Drawer and its backdrop are `absolute` off the header, not
                `fixed`. `fixed left-0 right-0` resolves against the layout
                viewport, which on iOS Safari does not always match the visual
                viewport once anything on the page overflows horizontally - the
                drawer then renders shifted a hundred-odd px to the left of the
                header it is supposed to hang from. Anchoring to the header's
                own box makes that impossible, and drops the hardcoded
                top-[50px]/[56px] header-height guesses at the same time.
                The header carries no `relative`: `sticky` already positions
                it, so it is the containing block these resolve against. */}
            <div
              className="absolute left-0 right-0 top-full h-screen bg-stone-950/40 backdrop-blur-xs z-30 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <div className="absolute left-0 right-0 top-full bg-white/98 dark:bg-stone-950/98 border-b border-stone-200 dark:border-stone-800 px-4 sm:px-6 py-3.5 space-y-1.5 shadow-2xl max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain z-40 lg:hidden backdrop-blur-md">
              {profile && (
                <div className="flex items-center justify-between gap-3 p-3 mb-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {isValidAvatar(profile.avatar_url) ? (
                      <Image src={profile.avatar_url} alt={displayName} width={36} height={36} className="w-9 h-9 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {initials || "?"}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">{profile.full_name || "Người dùng"}</p>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">Cấp {profile.current_level ?? 1} • {profile.total_xp ?? 0} XP</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowQuickShop(true);
                    }}
                    className="flex items-center gap-1 text-xs font-black px-2.5 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shrink-0"
                  >
                    <GoldCoinIcon className="w-3.5 h-3.5" />
                    <span>{profile.coins ?? 0}</span>
                  </button>
                </div>
              )}

              {TOP_LEVEL_LINKS.map((link) => renderNavItem(link, () => setMobileMenuOpen(false)))}
              {renderNavSections(() => setMobileMenuOpen(false), "mobile-nav")}
            </div>
          </>
        )}
      </header>

      {celebrateLevel !== null && (
        <LevelUpModal level={celebrateLevel} userName={profile?.full_name || t.nav.students} onClose={dismiss} />
      )}

      {showQuickShop && userId && (
        <QuickShopModal userId={userId} onClose={() => setShowQuickShop(false)} />
      )}

      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
