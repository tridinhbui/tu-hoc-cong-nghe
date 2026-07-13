"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { getLevelByXp } from "@/lib/levels";
import { getUserProfile } from "@/lib/supabase-user";
import { getEligibleUserBadges, type UserBadge } from "@/lib/supabase-badges";
import UserMenu from "@/components/UserMenu";

// Auth-gated and reads Supabase env vars at render time - never prerender statically.
export const dynamic = "force-dynamic";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<{ id?: string; email?: string; user_metadata?: { full_name?: string; avatar_url?: string }; created_at?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [userXp, setUserXp] = useState(0);
  const [badges, setBadges] = useState<UserBadge[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setUser(session.user);
      try {
        const profile = await getUserProfile(session.user.id);
        setUserXp(profile.total_xp);
      } catch (error) {
        console.error("Error loading user XP:", error);
      }
      // Badges were only ever shown once, as a toast at the moment they're
      // earned (awardBadges in LessonPageLayout) - nothing read them back
      // afterward, so there was no way to see which ones you'd already
      // collected.
      try {
        const earned = await getEligibleUserBadges(session.user.id);
        setBadges(earned);
      } catch (error) {
        console.error("Error loading badges:", error);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router, supabase.auth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center">
        <p className="text-stone-500 dark:text-stone-400">Đang tải...</p>
      </div>
    );
  }

  const currentLevel = getLevelByXp(userXp);
  const initials = (user?.user_metadata?.full_name || user?.email || "U")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white dark:bg-stone-950 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="text-stone-500 dark:text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 text-sm font-semibold">
              ← Quay lại
            </Link>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-2">Hồ sơ cá nhân</h1>
          </div>
          <UserMenu name={user?.user_metadata?.full_name} email={user?.email} avatarUrl={user?.user_metadata?.avatar_url} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Avatar Section */}
        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-8 text-center mb-6">
          {user?.user_metadata?.avatar_url ? (
            <Image
              src={user.user_metadata.avatar_url}
              alt={user?.user_metadata?.full_name || "User"}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-stone-300 dark:border-stone-700 mb-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center mx-auto text-3xl font-extrabold text-stone-700 dark:text-stone-300 border-2 border-stone-300 dark:border-stone-700 mb-4">
              {initials}
            </div>
          )}
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 mb-1">
            {user?.user_metadata?.full_name || "Người dùng"}
          </h2>
          <p className="text-stone-600 dark:text-stone-400">{user?.email}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Level */}
          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6">
            <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2">
              Level
            </p>
            <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
              {currentLevel.name}
            </p>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              Level {currentLevel.level}
            </p>
          </div>

          {/* XP */}
          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6">
            <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2">
              Kinh nghiệm
            </p>
            <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
              {userXp}
            </p>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              Tổng XP
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100 mb-4">
            Huy hiệu ({badges.length})
          </h3>
          {badges.length === 0 ? (
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Chưa có huy hiệu nào. Hoàn thành bài học để nhận huy hiệu đầu tiên!
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  title={badge.badge_description}
                  className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50"
                >
                  <span className="text-3xl">{badge.badge_icon}</span>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-tight">
                    {badge.badge_name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Info */}
        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6">
          <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100 mb-4">
            Thông tin tài khoản
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-1">
                Tên
              </p>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {user?.user_metadata?.full_name || "Chưa cập nhật"}
              </p>
            </div>
            <div>
              <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-1">
                Email
              </p>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-1">
                Ngày tham gia
              </p>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString("vi-VN") : "Chưa có thông tin"}
              </p>
            </div>
          </div>
        </div>

        {/* Settings Button */}
        <Link
          href="/ban-be"
          className="block mt-6 w-full bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 font-bold py-3 px-6 rounded-xl text-center transition-colors hover:bg-stone-50 dark:hover:bg-stone-800"
        >
          Bạn bè & chat
        </Link>

        <Link
          href="/settings"
          className="block mt-4 w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold py-3 px-6 rounded-xl text-center transition-colors"
        >
          Cài đặt
        </Link>
      </div>
    </div>
  );
}
