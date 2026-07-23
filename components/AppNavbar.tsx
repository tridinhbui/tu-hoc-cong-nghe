"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { isValidAvatar } from "@/lib/avatar-utils";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { FileText, BarChart3, StickyNote, GraduationCap, Gamepad2, Menu, X, Briefcase, Home, Flame, Users } from "lucide-react";
import { createClient } from "@/lib/supabase";
import GoldCoinIcon from "@/components/GoldCoinIcon";
import { useRoutePrefetch } from "@/lib/use-route-prefetch";
import Logo from "@/components/Logo";
import { getUnresolvedMistakeCount } from "@/lib/quiz-mistakes";
import { claimPendingReferral } from "@/lib/referrals";
import { claimDailyLoginChest } from "@/lib/chests";
import { useLevelUpWatcher } from "@/lib/use-level-up-watcher";
import { usePresenceHeartbeat } from "@/lib/use-presence-heartbeat";
import { trackFeatureClick } from "@/lib/feature-events";
import LevelUpModal from "@/components/LevelUpModal";
import QuickShopModal from "@/components/QuickShopModal";

interface NavProfile {
  full_name: string | null;
  email: string;
  avatar_url: string | null;
  total_xp: number;
  current_level: number;
  lessons_completed: number;
  coins?: number;
}

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/game", label: "Game", icon: Gamepad2 },
  { href: "/analytics", label: "Thống kê", icon: BarChart3 },
  { href: "/ghi-chu", label: "Ghi chú", icon: StickyNote },
  { href: "/kiem-tra", label: "Kiểm tra", icon: GraduationCap },
  { href: "/nhom-hoc", label: "Học nhóm", icon: Users },
  { href: "/su-nghiep", label: "Sự nghiệp", icon: Briefcase },
];

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
  const [profile, setProfile] = useState<NavProfile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [showQuickShop, setShowQuickShop] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  useRoutePrefetch(["/dashboard", "/analytics", "/bxh", "/rpg", "/profile", "/ban-be", "/nhom-hoc", "/cong-dong", "/su-nghiep", "/ghi-chu", "/cong-cu", "/game", "/settings", "/tai-lieu", "/kiem-tra", "/cfa", "/cua-hang"]);

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
          if (granted) toast.success("🎁 Quà đăng nhập hôm nay đã sẵn sàng - mở ở mục Nhiệm vụ & Rương quà!");
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

  const { celebrateLevel, dismiss } = useLevelUpWatcher(profile?.current_level);
  usePresenceHeartbeat(userId);

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
    router.push("/rpg");
  };

  const displayName = profile?.full_name || profile?.email || "Người dùng";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 overflow-visible bg-white/96 dark:bg-stone-950/96 border-r border-stone-200 dark:border-stone-800 backdrop-blur">
        <div className="flex h-full w-full flex-col px-4 py-5 overflow-visible">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-2xl">
            <Logo size={30} />
            <span className="text-base font-bold text-stone-900 dark:text-stone-100">Tự Học Tài Chính</span>
          </Link>

          <nav className="mt-5 flex flex-col gap-1.5">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              const isGame = href === "/game";
              const isCareer = href === "/su-nghiep";
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => trackFeatureClick("nav_click", { label: href })}
                  className={`group relative flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-sm font-bold transition-all duration-200 ${
                    isGame
                      ? "border border-amber-200 bg-amber-50 text-amber-700 shadow-sm hover:bg-amber-100/70"
                      : active
                        ? "border border-emerald-200/70 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isGame ? "text-amber-600" : isCareer ? "text-emerald-600 dark:text-emerald-400" : ""}`} />
                  <span className="flex-1">{isGame ? "Game Kingdom" : label}</span>
                  {isGame && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white text-amber-700 border border-amber-200">
                      <Flame className="h-2.5 w-2.5 text-orange-500" />
                      HOT
                    </span>
                  )}
                  {isCareer && (
                    <span className="absolute right-3 top-3 flex h-2 w-2">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </Link>
              );
            })}

            <Link
              href="/tai-lieu"
              className={`mt-2 flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-sm font-bold transition-all duration-200 ${
                pathname === "/tai-lieu"
                  ? "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800"
                  : "bg-rose-50/70 text-rose-700 border-rose-200 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-300 dark:border-rose-900/50"
              }`}
            >
              <FileText className="w-4 h-4 shrink-0 text-rose-500" />
              <span className="flex-1">Tài liệu Miễn phí</span>
            </Link>
          </nav>

          <div className="mt-auto space-y-3 px-1">
            {profile && (
              <button
                onClick={() => setShowQuickShop(true)}
                className="flex w-full items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-sm font-black text-amber-700 shadow-sm transition-colors hover:bg-amber-100/80 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400"
                title="Số dư Coin tích lũy - Bấm để mở Cửa hàng Nhanh"
              >
                <span className="flex items-center gap-2">
                  <GoldCoinIcon className="w-5 h-5" />
                  <span>Coins</span>
                </span>
                <span>{profile.coins ?? 0}</span>
              </button>
            )}

            {!profile ? (
              <div className="h-14 rounded-2xl bg-stone-100 dark:bg-stone-900 animate-pulse" />
            ) : (
              <div className="relative overflow-visible" ref={desktopDropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-stone-200 bg-white px-3 py-3 text-left transition-colors hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:hover:bg-stone-800"
                >
                  {isValidAvatar(profile.avatar_url) ? (
                    <Image src={profile.avatar_url} alt={displayName} width={40} height={40} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {initials || "?"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-stone-900 dark:text-stone-100">{profile.full_name || "Người dùng"}</p>
                    <p className="truncate text-xs text-stone-500 dark:text-stone-400">{profile.email}</p>
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute left-full bottom-0 ml-3 w-72 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xl z-[80] p-4 pointer-events-auto">
                    <div className="space-y-1 mb-2">
                      <button
                        onClick={openRpgHub}
                        className="w-full text-left px-3 py-2 text-sm font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 hover:bg-amber-100/80 rounded-xl transition cursor-pointer flex items-center justify-between shadow-2xs mb-1"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">🎒</span> Tủ đồ, trang bị & cửa hàng
                        </span>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-white">Mới</span>
                      </button>

                      <button type="button" onClick={() => handleDropdownNavigate("/profile")} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-stone-900 transition hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800">
                        Hồ sơ
                      </button>
                      <button type="button" onClick={() => handleDropdownNavigate("/ban-be")} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-stone-900 transition hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800">
                        Bạn bè
                      </button>
                      <button type="button" onClick={() => handleDropdownNavigate("/bxh?tab=community")} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-stone-900 transition hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800">
                        Cộng đồng
                      </button>
                      <button type="button" onClick={() => handleDropdownNavigate("/settings")} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-stone-900 transition hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800">
                        Cài đặt
                      </button>
                    </div>

                    <button
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="w-full px-4 py-2 text-sm font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition disabled:opacity-50"
                    >
                      {signingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>

      <div className="lg:hidden border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white/95 dark:bg-stone-950/95 backdrop-blur z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-6">
        <Link href="/dashboard" className="flex items-center gap-2.5 flex-shrink-0">
          <Logo size={30} />
          <span className="hidden sm:inline text-base font-bold text-stone-900 dark:text-stone-100 whitespace-nowrap">Tự Học Tài Chính</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-2.5 flex-shrink-0">
          <Link
            href="/tai-lieu"
            className={`flex items-center gap-1.5 text-xs lg:text-sm font-bold px-2.5 lg:px-3 py-2 rounded-xl border transition-all duration-200 whitespace-nowrap ${
              pathname === "/tai-lieu"
                ? "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                : "bg-rose-50/70 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-950/30"
            }`}
          >
            <FileText className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />
            <span className="hidden sm:inline">Tài liệu Miễn phí</span>
            <span className="sm:hidden text-[10px]">Tài liệu</span>
          </Link>

          {profile && (
            <button
              onClick={() => setShowQuickShop(true)}
              className="flex items-center gap-1 text-xs lg:text-sm font-black px-2.5 lg:px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900 hover:bg-amber-100/80 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              title="Số dư Coin tích lũy - Bấm để mở Cửa hàng Nhanh"
            >
              <GoldCoinIcon className="w-4.5 h-4.5 lg:w-5 lg:h-5" />
              <span className="font-black text-amber-600 dark:text-amber-400">{profile.coins ?? 0}</span>
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors"
            aria-label="Mở menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {!profile ? (
            <div className="w-10 h-10 bg-stone-200 dark:bg-stone-700 rounded-full animate-pulse" />
          ) : (
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                {isValidAvatar(profile.avatar_url) ? (
                  <Image src={profile.avatar_url} alt={displayName} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                    {initials || "?"}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-[min(18rem,calc(100vw-2rem))] bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-lg z-40 p-4">
                  <div className="flex gap-3 mb-4 pb-4 border-b border-stone-100 dark:border-stone-800">
                    {isValidAvatar(profile.avatar_url) ? (
                      <Image src={profile.avatar_url} alt={displayName} width={44} height={44} className="w-11 h-11 rounded-full object-cover" />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">{initials || "?"}</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-stone-900 dark:text-stone-100 truncate">{profile.full_name || "Người dùng"}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{profile.email}</p>
                    </div>
                  </div>

                  <div className="space-y-1 mb-2">
                    <button
                      onClick={openRpgHub}
                      className="w-full text-left px-3 py-2 text-sm font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 hover:bg-amber-100/80 rounded-xl transition cursor-pointer flex items-center justify-between shadow-2xs mb-1"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">🎒</span> Tủ đồ, trang bị & cửa hàng
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-white">Mới</span>
                    </button>

                    <button type="button" onClick={() => handleDropdownNavigate("/profile")} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-stone-900 transition hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800">
                      Hồ sơ
                    </button>
                    <button type="button" onClick={() => handleDropdownNavigate("/ban-be")} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-stone-900 transition hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800">
                      Bạn bè
                    </button>
                    <button type="button" onClick={() => handleDropdownNavigate("/bxh?tab=community")} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-stone-900 transition hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800">
                      Cộng đồng
                    </button>
                    <button type="button" onClick={() => handleDropdownNavigate("/settings")} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-stone-900 transition hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800">
                      Cài đặt
                    </button>
                  </div>

                  <button
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="w-full px-4 py-2 text-sm font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition disabled:opacity-50"
                  >
                    {signingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-stone-800 px-4 sm:px-6 py-3 space-y-1.5 bg-white dark:bg-stone-950">
          <Link
            href="/tai-lieu"
            onClick={() => setMobileMenuOpen(false)}
            className={`group relative flex items-center gap-2 text-sm font-bold px-3 py-2.5 rounded-lg transition-all duration-200 ${
              pathname === "/tai-lieu"
                ? "bg-rose-500/15 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-500/25"
                : "bg-rose-50/80 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 border border-rose-200/50 dark:border-rose-900/40 hover:bg-rose-100/60 dark:hover:bg-rose-950/30"
            }`}
          >
            <FileText className="w-4 h-4 text-rose-550 shrink-0" />
            Tài liệu Miễn phí
          </Link>

          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            const isGame = href === "/game";
            const isCareer = href === "/su-nghiep";
            return (
              <Link
                key={href}
                href={href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackFeatureClick("nav_click", { label: href });
                }}
                className={`group relative flex items-center gap-2 text-sm font-bold px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  active
                    ? isGame
                      ? "bg-amber-500/15 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-500/25"
                      : isCareer
                        ? "bg-indigo-500/15 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-500/25"
                        : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                    : isGame
                      ? "bg-amber-50/80 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/40 hover:bg-amber-100/60 dark:hover:bg-amber-950/30"
                      : isCareer
                        ? "bg-indigo-50/80 dark:bg-indigo-950/20 text-indigo-650 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900/40 hover:bg-indigo-100/60 dark:hover:bg-indigo-950/30"
                        : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900"
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isGame ? "text-amber-500" : isCareer ? "text-indigo-500 dark:text-indigo-450" : ""}`} />
                <span className="flex items-center gap-1.5">
                  {label}
                  {isGame && <Flame className="w-3.5 h-3.5 text-orange-500" />}
                </span>
                {isGame && (
                  <span className="absolute top-3.5 right-4 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                )}
                {isCareer && (
                  <span className="absolute top-3.5 right-4 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}

      {celebrateLevel !== null && (
        <LevelUpModal level={celebrateLevel} userName={profile?.full_name || "Học viên"} onClose={dismiss} />
      )}

      {showQuickShop && userId && (
        <QuickShopModal userId={userId} onClose={() => setShowQuickShop(false)} />
      )}

      </div>
    </>
  );
}
