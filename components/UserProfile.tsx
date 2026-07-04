"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  total_xp: number;
  current_level: number;
  lessons_completed: number;
}

export default function UserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // Fallback so the avatar/dropdown (and sign-out) always render, even if
      // the user_profiles row can't be created/read (e.g. table not migrated yet).
      const fallback: Profile = {
        id: user.id,
        email: user.email || "",
        full_name: user.user_metadata?.full_name || null,
        avatar_url: user.user_metadata?.avatar_url || null,
        total_xp: 0,
        current_level: 1,
        lessons_completed: 0,
      };

      try {
        await fetch("/api/auth/create-profile", { method: "POST" });

        const { data } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile(data || fallback);
      } catch {
        setProfile(fallback);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading || !profile) {
    return (
      <div className="w-10 h-10 bg-stone-200 rounded-full animate-pulse" />
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-stone-100 transition"
      >
        {profile.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={profile.full_name || "User"}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
            {(profile.full_name || profile.email).charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-stone-200 shadow-lg z-50 p-4">
          <div className="flex gap-3 mb-4 pb-4 border-b border-stone-100">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name || "User"}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                {(profile.full_name || profile.email).charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <p className="font-bold text-stone-900">{profile.full_name || "User"}</p>
              <p className="text-xs text-stone-500">{profile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-stone-100 text-center">
            <div>
              <p className="text-lg font-bold text-indigo-600">{profile.current_level}</p>
              <p className="text-xs text-stone-500">Cấp độ</p>
            </div>
            <div>
              <p className="text-lg font-bold text-emerald-600">{profile.total_xp}</p>
              <p className="text-xs text-stone-500">XP</p>
            </div>
            <div>
              <p className="text-lg font-bold text-stone-900">{profile.lessons_completed}</p>
              <p className="text-xs text-stone-500">Bài học</p>
            </div>
          </div>

          <div className="space-y-1 mb-2">
            <Link
              href="/profile"
              onClick={() => setShowDropdown(false)}
              className="block px-3 py-2 text-sm font-semibold text-stone-900 hover:bg-stone-50 rounded-lg transition"
            >
              Hồ sơ
            </Link>
            <Link
              href="/settings"
              onClick={() => setShowDropdown(false)}
              className="block px-3 py-2 text-sm font-semibold text-stone-900 hover:bg-stone-50 rounded-lg transition"
            >
              Cài đặt
            </Link>
          </div>

          <button
            onClick={() => {
              createClient().auth.signOut();
              window.location.href = "/login";
            }}
            className="w-full px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
