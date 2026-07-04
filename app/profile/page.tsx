"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { getLevelByXp } from "@/lib/levels";
import UserMenu from "@/components/UserMenu";

// Auth-gated and reads Supabase env vars at render time — never prerender statically.
export const dynamic = "force-dynamic";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userXp, setUserXp] = useState(0);

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
      // Mock XP for now
      setUserXp(150);
      setLoading(false);
    };

    checkAuth();
  }, [router, supabase.auth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-stone-500">Đang tải...</p>
      </div>
    );
  }

  const currentLevel = getLevelByXp(userXp);
  const initials = (user?.user_metadata?.full_name || user?.email)
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-stone-200 sticky top-0 bg-white z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="text-stone-400 hover:text-stone-600 text-sm font-semibold">
              ← Quay lại
            </Link>
            <h1 className="text-xl font-bold text-stone-900 mt-2">Hồ sơ cá nhân</h1>
          </div>
          <UserMenu name={user?.user_metadata?.full_name} email={user?.email} avatarUrl={user?.user_metadata?.avatar_url} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Avatar Section */}
        <div className="bg-white border-2 border-stone-200 rounded-xl p-8 text-center mb-6">
          {user?.user_metadata?.avatar_url ? (
            <Image
              src={user.user_metadata.avatar_url}
              alt={user?.user_metadata?.full_name || "User"}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-stone-300 mb-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-stone-200 flex items-center justify-center mx-auto text-3xl font-extrabold text-stone-700 border-2 border-stone-300 mb-4">
              {initials}
            </div>
          )}
          <h2 className="text-2xl font-extrabold text-stone-900 mb-1">
            {user?.user_metadata?.full_name || "Người dùng"}
          </h2>
          <p className="text-stone-600">{user?.email}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Level */}
          <div className="bg-white border-2 border-stone-200 rounded-xl p-6">
            <p className="text-xs font-extrabold text-stone-400 uppercase tracking-widest mb-2">
              Level
            </p>
            <p className="text-2xl font-extrabold text-stone-900">
              {currentLevel.name}
            </p>
            <p className="text-xs text-stone-600 mt-1">
              Level {currentLevel.level}
            </p>
          </div>

          {/* XP */}
          <div className="bg-white border-2 border-stone-200 rounded-xl p-6">
            <p className="text-xs font-extrabold text-stone-400 uppercase tracking-widest mb-2">
              Kinh nghiệm
            </p>
            <p className="text-2xl font-extrabold text-stone-900">
              {userXp}
            </p>
            <p className="text-xs text-stone-600 mt-1">
              Tổng XP
            </p>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white border-2 border-stone-200 rounded-xl p-6">
          <h3 className="text-lg font-extrabold text-stone-900 mb-4">
            Thông tin tài khoản
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-extrabold text-stone-400 uppercase tracking-widest mb-1">
                Tên
              </p>
              <p className="text-sm font-semibold text-stone-900">
                {user?.user_metadata?.full_name || "Chưa cập nhật"}
              </p>
            </div>
            <div>
              <p className="text-xs font-extrabold text-stone-400 uppercase tracking-widest mb-1">
                Email
              </p>
              <p className="text-sm font-semibold text-stone-900">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="text-xs font-extrabold text-stone-400 uppercase tracking-widest mb-1">
                Ngày tham gia
              </p>
              <p className="text-sm font-semibold text-stone-900">
                {new Date(user?.created_at).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>
        </div>

        {/* Settings Button */}
        <Link
          href="/settings"
          className="block mt-6 w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 px-6 rounded-xl text-center transition-colors"
        >
          Cài đặt
        </Link>
      </div>
    </div>
  );
}
