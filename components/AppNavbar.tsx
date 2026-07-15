"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FileText, BarChart3, StickyNote, GraduationCap, Gamepad2, Layers, Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useRoutePrefetch } from "@/lib/use-route-prefetch";
import Logo from "@/components/Logo";
import LessonSearch from "@/components/LessonSearch";
import { getUnresolvedMistakeCount } from "@/lib/quiz-mistakes";
import { claimPendingReferral } from "@/lib/referrals";
import { useLevelUpWatcher } from "@/lib/use-level-up-watcher";
import LevelUpModal from "@/components/LevelUpModal";

interface NavProfile {
  full_name: string | null;
  email: string;
  avatar_url: string | null;
  total_xp: number;
  current_level: number;
  lessons_completed: number;
}

const NAV_LINKS = [
  { href: "/tai-lieu", label: "Tài liệu", icon: FileText },
  { href: "/analytics", label: "Thống kê", icon: BarChart3 },
  { href: "/ghi-chu", label: "Ghi chú", icon: StickyNote },
  { href: "/kiem-tra", label: "Kiểm tra", icon: GraduationCap },
  { href: "/game", label: "Game", icon: Gamepad2 },
  { href: "/flashcard", label: "Flashcard", icon: Layers },
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
  const [mistakeCount, setMistakeCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useRoutePrefetch(["/dashboard", "/analytics", "/profile", "/ban-be", "/ghi-chu", "/cong-cu", "/game", "/settings", "/tai-lieu", "/kiem-tra", "/cfa"]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
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
          .select("full_name, email, avatar_url, total_xp, current_level, lessons_completed")
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
    });
  }, []);

  // Keeps `profile` in sync with level/XP changes that happen after the
  // one-time fetch above - AppNavbar mounts once and stays alive across
  // client-side navigation (that's the whole point of the persistent
  // navbar), so without this it would never notice a lesson/quiz/game
  // completion that raised the user's level during the same session.
  useEffect(() => {
    function handleXpUpdate(e: Event) {
      const detail = (e as CustomEvent<{ currentLevel: number; totalXp: number }>).detail;
      if (!detail) return;
      setProfile((prev) => (prev ? { ...prev, current_level: detail.currentLevel, total_xp: detail.totalXp } : prev));
    }
    window.addEventListener("thtcdn:xp-updated", handleXpUpdate);
    return () => window.removeEventListener("thtcdn:xp-updated", handleXpUpdate);
  }, []);

  const { celebrateLevel, dismiss } = useLevelUpWatcher(profile?.current_level);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const displayName = profile?.full_name || profile?.email || "Người dùng";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white/95 dark:bg-stone-950/95 backdrop-blur z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-6">
        <Link href="/dashboard" className="flex items-center gap-2 flex-shrink-0">
          <Logo size={26} />
          <span className="hidden sm:inline text-sm font-bold text-stone-900 dark:text-stone-100">Tự Học Tài Chính</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            const isGame = href === "/game";
            return (
              <Link
                key={href}
                href={href}
                className={`group relative flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-all duration-200 ${
                  active
                    ? isGame
                      ? "bg-amber-500/15 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                      : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                    : isGame
                      ? "bg-amber-50/80 dark:bg-amber-950/20 text-amber-600 dark:text-amber-450 border border-amber-200/50 dark:border-amber-900/40 hover:bg-amber-100/60 dark:hover:bg-amber-950/30 hover:border-amber-300"
                      : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 ${isGame ? "text-amber-500" : ""}`} />
                {label}
                {isGame && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 flex-shrink-0">
          <LessonSearch />
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors"
            aria-label="Mở menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {!profile ? (
            <div className="w-9 h-9 bg-stone-200 dark:bg-stone-700 rounded-full animate-pulse" />
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                {profile.avatar_url ? (
                  <Image src={profile.avatar_url} alt={displayName} width={34} height={34} className="w-[34px] h-[34px] rounded-full object-cover" />
                ) : (
                  <div className="w-[34px] h-[34px] rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                    {initials || "?"}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-[min(18rem,calc(100vw-2rem))] bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-lg z-40 p-4">
                  <div className="flex gap-3 mb-4 pb-4 border-b border-stone-100 dark:border-stone-800">
                    {profile.avatar_url ? (
                      <Image src={profile.avatar_url} alt={displayName} width={44} height={44} className="w-11 h-11 rounded-full object-cover" />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">{initials || "?"}</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-stone-900 dark:text-stone-100 truncate">{profile.full_name || "Người dùng"}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{profile.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-stone-100 dark:border-stone-800 text-center">
                    <div>
                      <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{profile.current_level}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">Cấp độ</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{profile.total_xp}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">XP</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-stone-900 dark:text-stone-100">{profile.lessons_completed}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">Bài học</p>
                    </div>
                  </div>

                  <div className="space-y-1 mb-2">
                    <Link href="/profile" onClick={() => setDropdownOpen(false)} className="block px-3 py-2 text-sm font-semibold text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg transition">
                      Hồ sơ
                    </Link>
                    <Link href="/hanh-trinh" onClick={() => setDropdownOpen(false)} className="block px-3 py-2 text-sm font-semibold text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg transition">
                      🗺️ Hành trình của tôi
                    </Link>
                    <Link href="/ban-be" onClick={() => setDropdownOpen(false)} className="block px-3 py-2 text-sm font-semibold text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg transition">
                      Bạn bè
                    </Link>
                    <Link href="/cong-cu" onClick={() => setDropdownOpen(false)} className="block px-3 py-2 text-sm font-semibold text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg transition">
                      Công cụ cá nhân
                    </Link>

                    <Link href="/settings" onClick={() => setDropdownOpen(false)} className="block px-3 py-2 text-sm font-semibold text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg transition">
                      Cài đặt
                    </Link>
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
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 px-4 sm:px-6 py-3 space-y-1.5 bg-white dark:bg-stone-950">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            const isGame = href === "/game";
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`group relative flex items-center gap-2 text-sm font-bold px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  active
                    ? isGame
                      ? "bg-amber-500/15 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-500/25"
                      : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                    : isGame
                      ? "bg-amber-50/80 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/40 hover:bg-amber-100/60 dark:hover:bg-amber-950/30"
                      : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900"
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isGame ? "text-amber-500" : ""}`} />
                {label}
                {isGame && (
                  <span className="absolute top-3.5 right-4 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}

      {celebrateLevel !== null && <LevelUpModal level={celebrateLevel} onClose={dismiss} />}
    </div>
  );
}
