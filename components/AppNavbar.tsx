"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { isValidAvatar } from "@/lib/avatar-utils";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { FileText, BarChart3, GraduationCap, Gamepad2, Menu, X, BookOpen, Home, Flame, Users, MessageSquareMore, Search, ChevronDown, Landmark, User, Settings, Globe, LogOut, type LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format, type Dictionary } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { createClient } from "@/lib/supabase";
import GoldCoinIcon from "@/components/GoldCoinIcon";
import NotificationBell from "@/components/NotificationBell";
import Logo from "@/components/Logo";
import { claimPendingReferral } from "@/lib/referrals";
import { earnChest } from "@/lib/chests";
import { getCurrentUser, metadataString } from "@/lib/current-user";
import { getNavState } from "@/lib/supabase-nav-state";
import { useLevelUpWatcher } from "@/lib/use-level-up-watcher";
import { trackFeatureClick } from "@/lib/feature-events";
import LevelUpModal from "@/components/LevelUpModal";
import QuickShopModal from "@/components/QuickShopModal";
import GlobalSearchModal from "@/components/GlobalSearchModal";

interface NavProfile {
  full_name: string | null;
  email: string;
  avatar_url: string | null;
  total_xp: number;
  current_level: number;
  lessons_completed: number;
  coins?: number;
}

// `labelKey` indexes into the nav section of the dictionary; `dataLabelKey`
// indexes into the newer dataRest.appNavbar section (added after this file's
// labels were audited for hard-coded copy - see AGENTS.md "Translating the
// UI"); `label` is for the entries that are proper nouns and read the same in
// both languages, so translating them would only make the product harder to
// talk about.
/** `activePrefixes`: những tiền tố đường dẫn cũng làm dòng này sáng.
 *
 *  Mặc định một dòng chỉ sáng khi `pathname === href`, và điều đó đúng cho gần
 *  hết. "Chứng chỉ" là ngoại lệ: một dòng menu dẫn tới HAI route (/cfa và /frm,
 *  cùng các trang con của chúng), nên nếu không khai báo thì đứng ở FRM sẽ
 *  không có dòng nào sáng cả. */
type NavLinkBase = { href: string; icon: LucideIcon; activePrefixes?: readonly string[] };

type NavLink =
  | (NavLinkBase & { label: string; labelKey?: never; dataLabelKey?: never })
  | (NavLinkBase & { labelKey: keyof Dictionary["nav"]; label?: never; dataLabelKey?: never })
  | (NavLinkBase & { dataLabelKey: keyof Dictionary["dataRest"]["appNavbar"]; label?: never; labelKey?: never });

/**
 * Above the sections, ungrouped, always visible. Chỉ còn Dashboard: nó là
 * đường quay về tổng quan chứ không phải một đích đến ngang hàng với những
 * đích khác.
 *
 * Ba lối vào cộng đồng từng đứng ở đây. Chúng đã xuống thành nhóm "Cộng đồng"
 * gập được, nay là nhóm CUỐI - xem NAV_SECTIONS bên dưới.
 *
 * Kiểm tra ở lại trong nhóm (Thực hành, đứng đầu nhóm) chứ không lên danh sách
 * phẳng này. Nó mang huy hiệu "Tin mới" sống, và đó từng là lý do nhấc nó ra,
 * nhưng `forcedOpenKeys` phía dưới giờ tự bung nhóm nào đang có thứ chờ bên
 * trong - nên huy hiệu vẫn thấy được mà dòng ấy không phải rời khỏi nhóm của
 * nó. (Dòng này trước ghi "stays in Học tập"; /kiem-tra đã chuyển sang Thực
 * hành từ trước lần sửa thứ tự nhóm này, chỉ là chú thích chưa theo kịp.)
 */
const TOP_LEVEL_LINKS: NavLink[] = [
  /* i18n-ignore-start: proper nouns / product names, identical in both languages (Dashboard, Bảng tin) */
  { href: "/dashboard", label: "Dashboard", icon: Home },
  // Bảng tin ra khỏi nhóm "Cộng đồng" để đứng ngay dưới Dashboard.
  //
  // Nhóm đó gập lại được, và một mục nằm trong tiêu đề gập thì chỉ tồn tại với
  // người đã từng bấm mở tiêu đề ấy - cùng lý do đã ghi ở chú thích của nhóm
  // này. Với một nguồn tin cần người vào đọc thường xuyên thì đứng sau một cú
  // bấm là quá xa; hai dòng đầu navbar là chỗ duy nhất luôn thấy.
  { href: "/bang-tin", label: "Bảng tin", icon: MessageSquareMore },
  /* i18n-ignore-end */
  // Thống kê và Tài liệu KHÔNG còn ở đây - chúng xuống BOTTOM_LEVEL_LINKS,
  // dưới các nhóm. Xem chú thích ở đó.
];

/** Hai dòng phẳng nằm DƯỚI các nhóm, sau cùng trong thanh điều hướng.
 *
 *  Cả hai vẫn phẳng chứ không gập, và lý lẽ cũ giữ nguyên: một tiêu đề gập
 *  được đặt trên đúng một dòng thì luôn lỗ - tốn một dòng để giấu một dòng, và
 *  bắt người đọc bấm một lần để thấy thứ lẽ ra đã thấy sẵn.
 *
 *  Cái đổi là VỊ TRÍ. Trước đây chúng đứng ngay dưới Dashboard và Bảng tin,
 *  tức chen vào giữa hai dòng hay dùng nhất và các nhóm việc chính. Cả hai đều
 *  là chỗ người ta ghé lại chứ không phải chỗ bắt đầu một buổi học, nên chúng
 *  thuộc về cuối danh sách.
 *
 *  Thứ tự trong đây có nghĩa: Thống kê trước, Tài liệu sau cùng.
 *
 *  Bảng xếp hạng không có dòng riêng: trang /bxh đã bị xoá và nội dung của nó
 *  nằm trong /analytics. Xem chú thích ở app/(app)/analytics/page.tsx. */
const BOTTOM_LEVEL_LINKS: NavLink[] = [
  { href: "/analytics", labelKey: "stats", icon: BarChart3 },
  { href: "/tai-lieu", labelKey: "docsLong", icon: FileText },
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
      { href: "/hoc-bai", dataLabelKey: "hocBai", icon: BookOpen },
      // Tách khỏi dashboard cùng đợt với CFA và FRM. Cả ba trước đó là thẻ
      // trong dãy chọn track nhưng không phải track trong lộ trình đánh số
      // theo ngày - chúng là các lối học song song, nên thuộc navbar.
      //
      // Dòng "Chứng chỉ" (/cfa, kèm activePrefixes sang /frm) đã gỡ cùng hai
      // route đó. Chú thích cũ ở đây kể rằng /cfa từng không có lối vào nào
      // ngoài một modal chạy một lần rồi thôi - giữ lại ý đó ở đây vì nó là
      // bài học về navbar chứ không về CFA: một khu vực lớn mà không có dòng
      // menu nào dẫn tới thì coi như không tồn tại.
      // Kiểm tra đã xuống nhóm Thực hành, đứng đầu nhóm. Lý lẽ cũ ở đây nói
      // nó thuộc Học tập vì nó chấm đúng phần kiến thức của những lối học phía
      // trên; lý lẽ đó đúng về NỘI DUNG nhưng sai về VIỆC ĐANG LÀM. Cả ba mục
      // trong nhóm Thực hành đều là "ngồi xuống và tự thử sức", và làm bài
      // kiểm tra cũng vậy - khác Game và Phỏng vấn ở đề bài, không khác ở việc.
      // Ghi chú rời khỏi navbar: nó nằm cạnh thẻ Lộ trình trên /hoc-bai, vì
      // ghi chép là việc làm TRONG lúc học chứ không phải một đích đến chọn
      // từ menu trước khi bắt đầu. Xem components/NotesShortcutCard.tsx.
      // Mục "Sự nghiệp" (/su-nghiep) từng đứng ở đây. Nội dung của nó giờ
      // nằm ngay dưới các ô chọn nghề trong /nghe-nghiep-hoc ở nhóm trên, nên
      // hai dòng menu cho hai nửa của cùng một câu hỏi rút còn một.
    ],
  },
  {
    titleKey: "sectionPractice",
    links: [
      // Đứng ĐẦU nhóm: đây là mục duy nhất trong nhóm chấm điểm vào tiến độ
      // thật (avg_quiz_score, cổng mở bài), nên nó là lý do người ta mở nhóm
      // này ra chứ không phải Game.
      { href: "/kiem-tra", labelKey: "quiz", icon: GraduationCap },
      /* i18n-ignore-start: proper noun / product name, identical in both languages (Game) */
      { href: "/game", label: "Game", icon: Gamepad2 },
      /* i18n-ignore-end */
    ],
  },
  // Nhóm Cộng đồng quay lại, và đây là lần đảo chiều thứ hai của cùng một
  // quyết định - ghi lại để lần sau ai đó định gỡ nó thì biết đã có hai vòng.
  //
  // 9e182fa gỡ nhóm này với lý lẽ: một tiêu đề gập được đặt trên đúng ba dòng
  // tốn nhiều chỗ hơn phần nó giấu đi, và chữ "Cộng đồng" không nói thêm gì mà
  // ba cái nhãn kia chưa nói. Lý lẽ đó đúng về mặt tiết kiệm chỗ, nhưng nó bỏ
  // qua thứ người dùng thật sự muốn: gập được. Ba dòng này là ba phòng sinh
  // hoạt, không phải việc học - ai đang tập trung học muốn giấu chúng đi, và
  // trước đây không có cách nào vì chúng nằm phẳng ở TOP_LEVEL_LINKS.
  //
  // `sectionCommunity` vẫn còn nguyên trong cả vi.ts lẫn en.ts từ vòng trước,
  // nên lần này không phải thêm khoá từ điển nào.
  //
  // Đứng CUỐI trong ba nhóm, sau cả Học tập lẫn Thực hành. Nguyên tắc vẫn là
  // cái cũ - học trước, sinh hoạt sau - chỉ là trước đây nhóm này chen vào
  // giữa hai nhóm cùng nói về việc học. Đọc bài rồi tự thử sức là hai nửa liền
  // mạch của một buổi học; ba phòng sinh hoạt thì không, nên chúng lùi xuống
  // dưới thay vì cắt ngang.
  //
  // Người dùng CŨ sẽ thấy nhóm này MỞ SẴN, người mới thấy nó đóng - và đó là
  // kết quả đúng chứ không phải chỗ cần sửa cho đồng nhất. Effect đọc
  // localStorage thay nguyên danh sách gập bằng danh sách đã lưu, mà danh sách
  // ấy được ghi từ trước khi nhóm này tồn tại nên không chứa khoá của nó. Hệ
  // quả: ai đang quen thấy ba dòng này phẳng ở đầu nav thì không bị chúng biến
  // mất sau một tiêu đề gập họ chưa từng bấm.
  {
    titleKey: "sectionCommunity",
    links: [
      // "Thư viện" was hardcoded here as the 3D space's own name, like
      // Bảng tin. But the room's own header is translated (t.lobby.title,
      // "Library · Saigon Reading Room"), so the nav and the page it opens
      // named the same room two different ways in English. It is a common
      // noun; it gets translated.
      { href: "/cong-dong", dataLabelKey: "library", icon: Landmark },
      { href: "/nhom-hoc", labelKey: "studyGroup", icon: Users },
    ],
  },
  // Hai nhóm cuối - "Tiến độ" và "Tài nguyên" - không còn. Thống kê và Tài
  // liệu lên TOP_LEVEL_LINKS; /bxh bị xoá hẳn.
  //
  // Lịch sử của /bxh đáng ghi lại một dòng, vì nó là một vòng tròn khép kín.
  // Trang ấy được thêm vào navbar chính vì cổng reachability kêu rằng không
  // đường dẫn nào trong app trỏ tới nó. Cách sửa lúc đó là cho nó một dòng
  // menu. Cách sửa đúng hơn là hỏi vì sao một trang sống được nhiều tháng mà
  // không ai lần tới - và câu trả lời là nội dung của nó đã có sẵn ở
  // /analytics, chỉ bị bóp lại bằng cờ `compact`.
];

/** The closed-by-default state: every section key. Derived from NAV_SECTIONS
 *  rather than listed by hand so a section added later is folded like the
 *  rest instead of being the one that hangs open. */
const ALL_SECTION_KEYS = NAV_SECTIONS.map((section) => section.titleKey);

/** Vỏ chung của năm huy hiệu trong dòng điều hướng.
 *
 *  Trước đây mỗi cái tự viết lại chuỗi lớp của mình và chúng đã trôi khỏi nhau:
 *  hai cái `px-1.5`, ba cái `px-2`; một cái `font-bold`, bốn cái `font-black`;
 *  ba cái mang đổ bóng ở ba mức khác nhau. Chỉ phần MÀU là khác nhau có chủ ý,
 *  nên chỉ phần màu ở lại chỗ gọi. */
const NAV_BADGE =
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider";

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
  // The mobile dropdown PANEL is rendered outside the avatar button's wrapper -
  // see the comment where it is rendered - so the outside-click handler needs a
  // second ref, or a tap on a menu item would count as "outside" and close the
  // panel on mousedown before the click ever reached the item.
  const mobileDropdownPanelRef = useRef<HTMLDivElement>(null);
  // Cùng lý do, cho bản desktop: panel bay ngang ra khỏi sidebar nên nó phải
  // nằm ngoài khối cuộn, tức ngoài cả desktopDropdownRef.
  const desktopDropdownPanelRef = useRef<HTMLDivElement>(null);


  // Effect đọc mục tiêu nghề đã gỡ cùng huy hiệu "chưa chọn nghề": nó là thứ
  // duy nhất dùng `careerGoalId`, và /nghe-nghiep-hoc - trang mà huy hiệu ấy
  // mời người đọc đi tới - không còn. Đáng gỡ chứ không để lại: thanh này gắn ở
  // MỌI trang, nên effect cũ là một truy vấn Supabase trên mỗi lượt tải trang
  // của cả hệ thống, để nuôi một huy hiệu không còn hiện ra nữa.


  // Thanh này gắn ở mọi trang trong ứng dụng, nên mỗi request nó mở là một
  // request nhân với số lượt tải trang của cả hệ thống. Trước đây là bốn:
  // `auth.getUser()` (một vòng mạng ra Supabase Auth), rồi `user_profiles`,
  // `quiz_mistakes`, `user_chests`.
  //
  // Giờ là một. `getCurrentUser()` đọc phiên đã lưu sẵn bằng `getSession()` và
  // KHÔNG đi mạng - phân biệt getUser/getSession ở phía client không mua được
  // gì, vì thứ thật sự chặn là RLS trên từng truy vấn (xem lib/current-user.ts).
  // Ba truy vấn còn lại gộp vào `get_nav_state`.
  useEffect(() => {
    void (async () => {
      const user = await getCurrentUser();
      if (!user) return;
      setUserId(user.id);
      const fallback: NavProfile = {
        full_name: metadataString(user, "full_name"),
        email: user.email || "",
        avatar_url: metadataString(user, "avatar_url"),
        total_xp: 0,
        current_level: 1,
        lessons_completed: 0,
      };
      const nav = await getNavState(user.id).catch(() => null);
      setProfile(nav?.profile ?? fallback);
      setMistakeCount(nav?.unresolvedMistakes ?? 0);
      void claimPendingReferral();
      // Rương đăng nhập chỉ đổi trạng thái một lần mỗi ngày, nhưng phép kiểm
      // của nó trước đây chạy ở MỌI lượt tải trang. Câu trả lời giờ đi kèm
      // `get_nav_state`, nên phần ghi chỉ chạy đúng lần đầu trong ngày.
      if (nav && !nav.dailyChestClaimed) {
        earnChest(user.id, "daily_login", 1)
          .then((granted) => {
            if (granted) toast.success(t.nav.dailyGiftReady);
          })
          .catch(() => {});
      }
    })();
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
      const clickedInsideDesktopPanel = desktopDropdownPanelRef.current?.contains(target) ?? false;
      const clickedInsideMobile = mobileDropdownRef.current?.contains(target) ?? false;
      const clickedInsidePanel = mobileDropdownPanelRef.current?.contains(target) ?? false;
      if (
        !clickedInsideDesktop &&
        !clickedInsideDesktopPanel &&
        !clickedInsideMobile &&
        !clickedInsidePanel
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);



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

  const displayName = profile?.full_name || profile?.email || t.nav.user;
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
    // Cùng trường hợp: máy chủ không biết người đọc đã gấp những mục nào, nên
    // phép đọc phải xảy ra sau khi hydrate xong. `sectionsHydrated` tồn tại
    // riêng để tắt hiệu ứng trượt cho tới lúc đó - không có nó thì mọi mục
    // đang gấp sẽ TRƯỢT gấp lại ngay trước mắt người dùng ở lần dựng đầu.
    try {
      const raw = window.localStorage.getItem(NAV_SECTION_STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as string[];
        // Bung ngay mục chứa trang đang mở, TRONG cùng một lần đặt trạng thái.
        //
        // Lần đầu vào bằng một đường dẫn nằm sâu trong một mục đang gấp thì
        // trang đang đọc bị giấu khỏi thanh điều hướng. Trước đây có một effect
        // riêng lo việc này và nó chạy sau effect đọc localStorage, đúng thứ
        // tự khai báo. Việc bung theo pathname giờ làm lúc render, mà lúc
        // render ĐẦU TIÊN thì localStorage chưa đọc xong - làm ở đó sẽ bị chính
        // dòng dưới ghi đè. Nên trường hợp vào lần đầu phải xử lý ở đây, và gộp
        // vào một lần đặt trạng thái để không tốn thêm một lần dựng.
        const owning = NAV_SECTIONS.find((section) =>
          section.links.some((l) => l.href === pathname)
        );
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration, xem chú thích đầu effect
        setCollapsedSections(owning ? stored.filter((k) => k !== owning.titleKey) : stored);
      }
    } catch {
      // Private mode, quota, or a value from an older shape: falling back to
      // the closed default is a fine outcome, so there is nothing to recover.
    }
    setSectionsHydrated(true);
    // Cố ý chỉ chạy MỘT LẦN, nên `pathname` không nằm trong danh sách phụ
    // thuộc: đây là việc "vào trang lần đầu", còn việc "chuyển sang trang
    // khác" đã do khối chỉnh-lúc-render ở trên lo. Thêm pathname vào đây sẽ
    // bung lại mục mỗi lần đổi trang và đọc lại localStorage mỗi lần, tức ghi
    // đè luôn cả những mục người dùng vừa gấp.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Điều chỉnh khi ĐỔI TRANG, làm lúc render chứ không bằng effect.
  //
  // Trước đây đây là hai effect chạy theo `pathname`, và cả hai đều gọi
  // setState thẳng trong thân effect: React dựng xong khung hình mới với menu
  // còn mở và mục còn gấp, rồi effect chạy và bắt dựng lại lần nữa. Trên một
  // thanh điều hướng có mặt ở MỌI trang thì đó là hai lần dựng thừa cho mỗi
  // lần chuyển trang.
  //
  // So sánh với lần render trước rồi setState ngay trong thân component là
  // cách React khuyến nghị cho đúng tình huống này: React huỷ khung hình đang
  // dựng dở và dựng lại NGAY, trước khi có gì kịp lên màn hình, nên không có
  // khung hình trung gian nào và không có hiệu ứng nháy.
  //
  // Vẫn chỉ chạy khi pathname đổi, nên gấp một mục trong lúc đang đứng ở đó
  // vẫn gấp được - nếu chạy mỗi lần render thì mục đó bung lại ngay lập tức.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    // Đứng trong một mục đang gấp thì trang đang đọc bị giấu mất, nên chuyển
    // trang sẽ bung mục chứa nó ra.
    const owning = NAV_SECTIONS.find((section) => section.links.some((l) => l.href === pathname));
    if (owning) {
      setCollapsedSections((prev) =>
        prev.includes(owning.titleKey) ? prev.filter((k) => k !== owning.titleKey) : prev
      );
    }
  }

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
  const renderNavItem = (
    { href, label, labelKey, dataLabelKey, icon: Icon, activePrefixes }: NavLink,
    onNavigate?: () => void
  ) => {
    const navLabel = labelKey ? t.nav[labelKey] : dataLabelKey ? t.dataRest.appNavbar[dataLabelKey] : label;
    const active = activePrefixes
      ? activePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
      : pathname === href;
    const isGame = href === "/game";
    const isKiemTra = href === "/kiem-tra";
    const isNhomHoc = href === "/nhom-hoc";
    // Thư viện mở một không gian 3D chứ không phải một trang, nên nó vẫn có
    // huy hiệu riêng - nhưng chỉ huy hiệu. Trước đây nó, Game, và hai dòng
    // đang chờ việc mỗi cái mang một nền + viền + đổ bóng riêng, nên năm trong
    // mười dòng đọc ra như năm thành phần khác nhau thay vì một danh sách.
    // Giờ DÒNG chỉ có hai trạng thái - đang đứng ở đây, hoặc không - còn phần
    // "đây là chỗ nào" và "chỗ này đang chờ mình" do huy hiệu nói.
    const isThuVien = href === "/cong-dong";
    return (
      <Link
        key={href}
        href={href}
        onClick={() => {
          onNavigate?.();
          trackFeatureClick("nav_click", { label: href });
        }}
        className={`group relative flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-bold transition-colors duration-200 ${
          active
            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-900 dark:hover:text-stone-100"
        }`}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1">{isGame ? t.dataRest.appNavbar.gameKingdomLabel : navLabel}</span>
        {isGame && (
          <span className={`${NAV_BADGE} bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300`}>
            <Flame className="h-2.5 w-2.5" />
            {t.nav.badgeHot}
          </span>
        )}
        {isThuVien && (
          <span className={`${NAV_BADGE} bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300`}>
            {t.nav.badge3d}
          </span>
        )}
        {isKiemTra && hasPendingNewsQuiz && (
          <span className={`${NAV_BADGE} bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300`}>
            {t.nav.badgeNews}
          </span>
        )}
        {isNhomHoc && hasPendingStudyGroupCheckin && (
          <span className={`${NAV_BADGE} bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300`}>
            {t.nav.badgeCheckin}
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
        {/* Cột này KHÔNG cuộn. Trước đây nó mang `overflow-y-auto`, nên khi danh
            sách mục dài hơn màn hình thì logo và ô tìm kiếm cuộn mất theo, còn
            thẻ người dùng ở đáy chỉ tới được sau khi cuộn hết - tức hai thứ
            đáng lẽ luôn thấy lại là hai thứ trôi đi đầu tiên.

            Giờ chia ba vùng: đầu và đáy `shrink-0` nên luôn đứng yên, chỉ `<nav>`
            ở giữa cuộn. `min-h-0` trên vùng giữa là bắt buộc: mục tiêu mặc định
            của flex item là `min-height: auto`, nên không có nó thì `<nav>` nở
            ra bằng nội dung và đẩy cả cột cao hơn viewport thay vì tự cuộn. */}
        <div className="flex h-full w-full min-h-0 flex-col px-3.5 py-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-xl shrink-0">
            <Logo size={30} />
            <span className="text-base font-bold text-stone-900 dark:text-stone-100">{t.nav.brand}</span>
          </Link>

          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="mt-3 flex items-center justify-between w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-stone-400" />
              <span>{t.nav.searchPlaceholder}</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded-md bg-white dark:bg-stone-800 text-[10px] font-mono border border-stone-200 dark:border-stone-700">
              {t.dataRest.appNavbar.cmdKHint}
            </kbd>
          </button>

          <nav className="mt-3 flex min-h-0 flex-1 flex-col overflow-y-auto scrollbar-none">
            {TOP_LEVEL_LINKS.map((link) => renderNavItem(link))}
            {renderNavSections()}
            {BOTTOM_LEVEL_LINKS.map((link) => renderNavItem(link))}
          </nav>

          <div className="pt-4 space-y-2.5 shrink-0" ref={desktopDropdownRef}>
            {profile && userId && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowQuickShop(true)}
                  className="flex flex-1 min-w-0 items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm font-black text-amber-700 transition-colors hover:bg-amber-100/80 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400"
                  title={t.nav.coinBalanceTitle}
                >
                  <span className="flex items-center gap-2">
                    <GoldCoinIcon className="w-5 h-5" />
                    <span>{t.nav.coins}</span>
                  </span>
                  <span>{profile.coins ?? 0}</span>
                </button>
                <NotificationBell userId={userId} />
              </div>
            )}

            {!profile ? (
              <div className="h-12 rounded-xl bg-stone-100 dark:bg-stone-900 animate-pulse" />
            ) : (
              /* Panel không nằm ở đây nữa - nó bay NGANG ra khỏi sidebar và
                 được render ngay dưới khối cuộn, xem chú thích ở đó. */
              <div>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex w-full items-center gap-2.5 rounded-xl border border-stone-200 bg-white px-2.5 py-2.5 text-left transition-colors hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:hover:bg-stone-800 cursor-pointer"
                >
                  {isValidAvatar(profile.avatar_url) ? (
                    <Image src={profile.avatar_url} alt={displayName} width={36} height={36} className="w-9 h-9 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                      {initials || "?"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-stone-900 dark:text-stone-100">{profile.full_name || t.nav.user}</p>
                    <p className="truncate text-[11px] text-stone-500 dark:text-stone-400">{profile.email}</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Panel bay NGANG, và nó phải nằm ở đây - ngoài khối cuộn ngay trên -
            chứ không cạnh cái nút mở nó.

            Trước đây panel nằm trong luồng và dùng `flex-col-reverse` để bung
            lên. Nằm trong luồng nghĩa là nó CHIẾM CHỖ: mở menu ra là đẩy cả
            cụm dưới cùng của sidebar lên, chiều cao nội dung đổi, và với người
            dùng thì nó hiện ra như thanh bên bị xô đi.

            Không thể chỉ đổi sang `absolute` tại chỗ cũ. Khối bọc ngoài là
            `overflow-y-auto`, và theo CSS khi một trục khác `visible` thì trục
            còn lại tự thành `auto` - nên overflow-x cũng cắt, và panel thò
            sang phải sẽ bị xén đúng mép sidebar. Đưa nó ra ngoài khối cuộn là
            cách thoát mà không cần portal.

            `<aside>` là `fixed` nên nó đã là containing block; `left-full` đặt
            panel ngay sau mép phải sidebar, `bottom-4` khớp với `py-4` của khối
            cuộn để panel thẳng hàng với nút ở đáy. z-50 để nằm trên nội dung
            trang (aside là z-40).

            Vì panel không còn nằm trong `desktopDropdownRef`, nó cần ref riêng
            trong phép kiểm click-ra-ngoài - y hệt bản mobile đã phải làm. */}
        {dropdownOpen && profile && (
          <div
            ref={desktopDropdownPanelRef}
            className="absolute bottom-4 left-full ml-2 w-64 z-50 space-y-1 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-2 shadow-lg animate-[fadeIn_0.15s_ease-out]"
          >
            <button type="button" onClick={() => handleDropdownNavigate("/profile")} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold transition text-stone-800 hover:bg-stone-50 dark:text-stone-200 dark:hover:bg-stone-800">
              <User className="h-4 w-4 shrink-0 text-stone-500 dark:text-stone-400" />
              {t.nav.menuProfile}
            </button>
            <button type="button" onClick={() => handleDropdownNavigate("/ban-be")} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold transition text-stone-800 hover:bg-stone-50 dark:text-stone-200 dark:hover:bg-stone-800">
              <Users className="h-4 w-4 shrink-0 text-stone-500 dark:text-stone-400" />
              {t.nav.menuFriends}
            </button>
            <button type="button" onClick={() => handleDropdownNavigate("/settings")} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold transition text-stone-800 hover:bg-stone-50 dark:text-stone-200 dark:hover:bg-stone-800">
              <Settings className="h-4 w-4 shrink-0 text-stone-500 dark:text-stone-400" />
              {t.nav.menuSettings}
            </button>
            <div className="flex items-center justify-between gap-2 rounded-xl px-3 py-2">
              <span className="flex items-center gap-2.5 text-xs font-bold text-stone-800 dark:text-stone-200">
                <Globe className="h-4 w-4 shrink-0 text-stone-500 dark:text-stone-400" />
                {t.language.label}
              </span>
              <LanguageSwitcher compact />
            </div>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold transition text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/50 disabled:opacity-50"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {signingOut ? t.nav.signingOut : t.nav.signOut}
            </button>
          </div>
        )}
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
            <span className="hidden sm:inline text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 whitespace-nowrap">{t.nav.brand}</span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <Link
              href="/tai-lieu"
              className={`flex items-center gap-1 text-xs font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl border transition-colors duration-200 whitespace-nowrap ${
                pathname === "/tai-lieu"
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                  : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800"
              }`}
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{t.nav.docsLong}</span>
              <span className="sm:hidden text-[11px]">{t.nav.docsShort}</span>
            </Link>

            {profile && (
              <button
                onClick={() => setShowQuickShop(true)}
                className="flex items-center gap-1 text-xs font-black px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900 hover:bg-amber-100/80 transition-colors cursor-pointer whitespace-nowrap"
                title={t.nav.coinBalanceTitle}
              >
                <GoldCoinIcon className="w-4 h-4" />
                <span className="font-black text-amber-600 dark:text-amber-400">{profile.coins ?? 0}</span>
              </button>
            )}

            {profile && userId && <NotificationBell userId={userId} />}

            <button
              onClick={toggleMobileMenu}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors shrink-0"
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

              </div>
            )}
          </div>
        </div>

        {/* Avatar dropdown, deliberately rendered here as a child of <header>
            rather than inside the avatar button's wrapper.

            The row above is `h-full` of an `h-14` header AND `overflow-hidden`,
            so a panel positioned below the avatar was clipped to nothing: on a
            phone, tapping the avatar toggled the state and displayed absolutely
            nothing. That also left the phone with no reachable sign-out except
            the hamburger drawer or the bottom of /settings.

            The header is `sticky`, which is a positioned value, so it is the
            containing block for this `absolute` - and it has no overflow of its
            own, so the panel can hang below the header edge. `top-full` puts it
            on that edge; the right inset matches the row's own px-3/sm:px-6. */}
        {dropdownOpen && profile && (
          <div
            ref={mobileDropdownPanelRef}
            className="absolute right-3 sm:right-6 top-full mt-2 w-[min(16rem,calc(100vw-2rem))] bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-lg z-50 p-3.5"
          >
            <div className="flex gap-2.5 mb-3 pb-3 border-b border-stone-100 dark:border-stone-800 items-center">
              {isValidAvatar(profile.avatar_url) ? (
                <Image src={profile.avatar_url} alt={displayName} width={36} height={36} className="w-9 h-9 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shrink-0">{initials || "?"}</div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-stone-900 dark:text-stone-100 truncate text-xs">{profile.full_name || t.nav.user}</p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">{profile.email}</p>
              </div>
            </div>

            <div className="space-y-1 mb-2">
              <button type="button" onClick={() => handleDropdownNavigate("/profile")} className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-left text-xs font-semibold transition text-stone-900 hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800">
                <User className="h-3.5 w-3.5 shrink-0 text-stone-500 dark:text-stone-400" />
                {t.nav.menuProfileShort}
              </button>
              <button type="button" onClick={() => handleDropdownNavigate("/ban-be")} className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-left text-xs font-semibold transition text-stone-900 hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800">
                <Users className="h-3.5 w-3.5 shrink-0 text-stone-500 dark:text-stone-400" />
                {t.nav.menuFriendsShort}
              </button>
              <button type="button" onClick={() => handleDropdownNavigate("/settings")} className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-left text-xs font-semibold transition text-stone-900 hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800">
                <Settings className="h-3.5 w-3.5 shrink-0 text-stone-500 dark:text-stone-400" />
                {t.nav.menuSettingsShort}
              </button>
            </div>

            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-left text-xs font-semibold transition text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/50 disabled:opacity-50"
            >
              <LogOut className="h-3.5 w-3.5 shrink-0" />
              {signingOut ? t.nav.signingOut : t.nav.signOut}
            </button>
          </div>
        )}

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

            <div className="absolute left-0 right-0 top-full bg-white/98 dark:bg-stone-950/98 border-b border-stone-200 dark:border-stone-800 px-4 sm:px-6 py-3.5 space-y-1.5 shadow-lg max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain z-40 lg:hidden backdrop-blur-md">
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
                      <p className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">{profile.full_name || t.nav.user}</p>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">{format(t.nav.levelXp, { level: profile.current_level ?? 1, xp: profile.total_xp ?? 0 })}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowQuickShop(true);
                    }}
                    className="flex items-center gap-1 text-xs font-black px-2.5 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shrink-0"
                  >
                    <GoldCoinIcon className="w-3.5 h-3.5" />
                    <span>{profile.coins ?? 0}</span>
                  </button>
                </div>
              )}

              {TOP_LEVEL_LINKS.map((link) => renderNavItem(link, () => setMobileMenuOpen(false)))}
              {renderNavSections(() => setMobileMenuOpen(false), "mobile-nav")}
              {BOTTOM_LEVEL_LINKS.map((link) => renderNavItem(link, () => setMobileMenuOpen(false)))}
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
