"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { isValidAvatar } from "@/lib/avatar-utils";
import CharacterCustomizerModal from "@/components/CharacterCustomizerModal";
import { useI18n } from "@/lib/i18n/context";
import { getCurrentUser, metadataString } from "@/lib/current-user";

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
  const { t } = useI18n();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await createClient().auth.signOut();
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();

      const user = await getCurrentUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // Fallback so the avatar/dropdown (and sign-out) always render, even if
      // the user_profiles row can't be created/read (e.g. table not migrated yet).
      const fallback: Profile = {
        id: user.id,
        email: user.email || "",
        full_name: metadataString(user, "full_name"),
        avatar_url: metadataString(user, "avatar_url"),
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
      <div className="w-10 h-10 bg-stone-200 dark:bg-stone-700 rounded-full animate-pulse" />
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition"
      >
        {isValidAvatar(profile.avatar_url) ? (
          <Image
            src={profile.avatar_url}
            alt={profile.full_name || t.userProfile.fallbackName}
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
        <div className="absolute right-0 mt-2 w-[min(18rem,calc(100vw-2rem))] bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-lg z-50 p-4">
          <div className="flex gap-3 mb-4 pb-4 border-b border-stone-100 dark:border-stone-800">
            {isValidAvatar(profile.avatar_url) ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name || t.userProfile.fallbackName}
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
              <p className="font-bold text-stone-900 dark:text-stone-100">{profile.full_name || t.userProfile.fallbackName}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400">{profile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-stone-100 dark:border-stone-800 text-center">
            <div>
              <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{profile.current_level}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400">{t.userProfile.level}</p>
            </div>
            <div>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{profile.total_xp}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400">{t.userProfile.xp}</p>
            </div>
            <div>
              <p className="text-lg font-bold text-stone-900 dark:text-stone-100">{profile.lessons_completed}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400">{t.userProfile.lessons}</p>
            </div>
          </div>

          <div className="space-y-1 mb-2">
            <button
              onClick={() => {
                setShowDropdown(false);
                setShowCustomizer(true);
              }}
              className="w-full text-left px-3 py-2 text-sm font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100/80 rounded-lg transition border border-amber-200 dark:border-amber-900/60 flex items-center gap-1.5"
            >
              {t.userProfile.customizeAvatar}
            </button>
            <Link
              href="/analytics"
              onClick={() => setShowDropdown(false)}
              className="block px-3 py-2 text-sm font-semibold text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg transition"
            >
              {t.userProfile.analytics}
            </Link>
            <Link
              href="/tai-lieu"
              onClick={() => setShowDropdown(false)}
              className="block px-3 py-2 text-sm font-semibold text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg transition"
            >
              {t.userProfile.documents}
            </Link>
            <Link
              href="/profile"
              onClick={() => setShowDropdown(false)}
              className="block px-3 py-2 text-sm font-semibold text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg transition"
            >
              {t.userProfile.profile}
            </Link>
            <Link
              href="/settings"
              onClick={() => setShowDropdown(false)}
              className="block px-3 py-2 text-sm font-semibold text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg transition"
            >
              {t.userProfile.settings}
            </Link>
          </div>

          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full px-4 py-2 text-sm font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition disabled:opacity-50"
          >
            {signingOut ? t.userProfile.signingOut : t.userProfile.signOut}
          </button>
        </div>
      )}

      <CharacterCustomizerModal
        userId={profile.id}
        userLevel={profile.current_level}
        isOpen={showCustomizer}
        onClose={() => setShowCustomizer(false)}
      />
    </div>
  );
}
