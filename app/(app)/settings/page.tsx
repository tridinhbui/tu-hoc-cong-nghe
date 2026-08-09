"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, BookOpen, LogOut, MoonStar, Shield, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { getUserProfile, setDarkMode, setPreferredTrack, updateUserProfile } from "@/lib/supabase-user";
import { getInitialTheme, setTheme, type Theme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import { getNotificationPreferences, saveNotificationPreferences } from "@/lib/notification-preferences";
import { isPushSupported, subscribeToPush, unsubscribeFromPush } from "@/lib/push-notifications";


interface CurrentUser {
  id?: string;
  email?: string;
  created_at?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

type FlashTone = "success" | "error";

function SectionCard({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6 bg-white dark:bg-stone-900">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-11 h-11 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-200">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{title}</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { locale, t } = useI18n();
  const supabase = createClient();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [preferredTrack, setPreferredTrackState] = useState<"personal" | "professional">("personal");
  const [theme, setThemeState] = useState<Theme>("light");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPreferences, setSavingPreferences] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [flash, setFlash] = useState<{ tone: FlashTone; text: string } | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [emailRemindersEnabled, setEmailRemindersEnabled] = useState(false);
  const [savingReminders, setSavingReminders] = useState(false);
  const [weeklyDigestEnabled, setWeeklyDigestEnabled] = useState(false);
  const [savingWeeklyDigest, setSavingWeeklyDigest] = useState(false);
  const [browserRemindersEnabled, setBrowserRemindersEnabled] = useState(false);
  const [morningReviewEnabled, setMorningReviewEnabled] = useState(false);
  const [savingMorningReview, setSavingMorningReview] = useState(false);
  const [savingBrowserReminders, setSavingBrowserReminders] = useState(false);

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
      setThemeState(getInitialTheme());

      try {
        const profile = await getUserProfile(session.user.id);
        setName(profile.full_name || session.user.user_metadata?.full_name || "");
        setBio(profile.bio || "");
        setPreferredTrackState(profile.preferred_track === "professional" ? "professional" : "personal");
        setThemeState(profile.dark_mode ? "dark" : "light");
      } catch (error) {
        console.error("Error loading user profile:", error);
        setName(session.user.user_metadata?.full_name || "");
        setBio("");
      }

      try {
        const notificationPrefs = await getNotificationPreferences(session.user.id);
        setEmailRemindersEnabled(notificationPrefs?.emailRemindersEnabled ?? false);
        setWeeklyDigestEnabled(notificationPrefs?.weeklyDigestEnabled ?? false);
        setBrowserRemindersEnabled(notificationPrefs?.browserRemindersEnabled ?? false);
        setMorningReviewEnabled(notificationPrefs?.morningReviewEnabled ?? false);
      } catch (error) {
        console.error("Error loading notification preferences:", error);
      }

      setAvatarPreview(session.user.user_metadata?.avatar_url || null);
      setLoading(false);
    };

    void checkAuth();
  }, [router, supabase.auth]);

  useEffect(() => {
    if (!flash) return;
    const timeout = window.setTimeout(() => setFlash(null), 3000);
    return () => window.clearTimeout(timeout);
  }, [flash]);

  const showFlash = (tone: FlashTone, text: string) => setFlash({ tone, text });

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setSavingProfile(true);
    setFlash(null);

    try {
      const trimmedName = name.trim();
      const trimmedBio = bio.trim();

      const [{ error: authError }, profile] = await Promise.all([
        supabase.auth.updateUser({
          data: {
            full_name: trimmedName,
          },
        }),
        updateUserProfile(user.id, {
          full_name: trimmedName,
          bio: trimmedBio || null,
        }),
      ]);

      if (authError) {
        // Supabase error text is always English; the prefix is what gets
        // translated, so the untranslated tail reads as quoted detail.
        showFlash("error", format(t.settings.profile.errorPrefix, { message: authError.message }));
      } else {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                user_metadata: {
                  ...prev.user_metadata,
                  full_name: profile.full_name || trimmedName,
                },
              }
            : prev
        );
        showFlash("success", t.settings.profile.saved);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      showFlash("error", t.settings.profile.saveFailed);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    if (file.size > 2 * 1024 * 1024) {
      showFlash("error", t.settings.profile.avatarTooLarge);
      return;
    }

    if (!file.type.startsWith("image/")) {
      showFlash("error", t.settings.profile.avatarNotImage);
      return;
    }

    setAvatarUploading(true);
    setFlash(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, {
        upsert: true,
      });

      if (uploadError) {
        showFlash(
          "error",
          format(t.settings.profile.uploadErrorPrefix, { message: uploadError.message })
        );
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const [{ error: updateError }, profile] = await Promise.all([
        supabase.auth.updateUser({
          data: {
            avatar_url: publicUrl,
          },
        }),
        updateUserProfile(user.id, {
          avatar_url: publicUrl,
        }),
      ]);

      if (updateError) {
        showFlash(
          "error",
          format(t.settings.profile.updateErrorPrefix, { message: updateError.message })
        );
      } else {
        setAvatarPreview(publicUrl);
        setUser((prev) =>
          prev
            ? {
                ...prev,
                user_metadata: {
                  ...prev.user_metadata,
                  avatar_url: profile.avatar_url || publicUrl,
                },
              }
            : prev
        );
        showFlash("success", t.settings.profile.avatarSaved);
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      showFlash("error", t.settings.profile.avatarFailed);
    } finally {
      setAvatarUploading(false);
      e.target.value = "";
    }
  };

  const handleSavePreferences = async () => {
    if (!user?.id) return;
    setSavingPreferences(true);
    setFlash(null);

    try {
      await Promise.all([
        setPreferredTrack(user.id, preferredTrack),
        setDarkMode(user.id, theme === "dark"),
      ]);
      showFlash("success", t.settings.appearance.saved);
    } catch (error) {
      console.error("Error saving preferences:", error);
      showFlash("error", t.settings.appearance.saveFailed);
    } finally {
      setSavingPreferences(false);
    }
  };

  const handleToggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setThemeState(nextTheme);
    setTheme(nextTheme);
  };

  const handleToggleEmailReminders = async () => {
    if (!user?.id) return;
    const next = !emailRemindersEnabled;
    setEmailRemindersEnabled(next);
    setSavingReminders(true);
    setFlash(null);

    try {
      await saveNotificationPreferences(user.id, { emailRemindersEnabled: next });
      showFlash(
        "success",
        next ? t.settings.reminders.emailEnabled : t.settings.reminders.emailDisabled
      );
    } catch (error) {
      console.error("Error saving notification preferences:", error);
      setEmailRemindersEnabled(!next);
      showFlash("error", t.settings.reminders.emailFailed);
    } finally {
      setSavingReminders(false);
    }
  };

  const handleToggleWeeklyDigest = async () => {
    if (!user?.id) return;
    const next = !weeklyDigestEnabled;
    setWeeklyDigestEnabled(next);
    setSavingWeeklyDigest(true);
    setFlash(null);

    try {
      await saveNotificationPreferences(user.id, { weeklyDigestEnabled: next });
      showFlash(
        "success",
        next ? t.settings.reminders.weeklyEnabled : t.settings.reminders.weeklyDisabled
      );
    } catch (error) {
      console.error("Error saving weekly digest preference:", error);
      setWeeklyDigestEnabled(!next);
      showFlash("error", t.settings.reminders.weeklyFailed);
    } finally {
      setSavingWeeklyDigest(false);
    }
  };

  const handleToggleBrowserReminders = async () => {
    if (!user?.id) return;
    const next = !browserRemindersEnabled;
    setSavingBrowserReminders(true);
    setFlash(null);

    try {
      if (next) {
        await subscribeToPush(user.id);
      } else {
        await unsubscribeFromPush(user.id);
      }
      setBrowserRemindersEnabled(next);
      await saveNotificationPreferences(user.id, { browserRemindersEnabled: next });
      showFlash(
        "success",
        next ? t.settings.reminders.browserEnabled : t.settings.reminders.browserDisabled
      );
    } catch (error) {
      console.error("Error toggling browser push:", error);
      showFlash(
        "error",
        error instanceof Error ? error.message : t.settings.reminders.browserFailed
      );
    } finally {
      setSavingBrowserReminders(false);
    }
  };

  // Turning this on needs a push subscription just like the streak reminder
  // does, but the two preferences stay independent: subscribeToPush is
  // idempotent, and unsubscribing here would silently kill the evening
  // reminder too, so it only ever removes the subscription when the other
  // channel is off as well.
  const handleToggleMorningReview = async () => {
    if (!user?.id) return;
    const next = !morningReviewEnabled;
    setSavingMorningReview(true);
    setFlash(null);

    try {
      if (next) {
        await subscribeToPush(user.id);
      } else if (!browserRemindersEnabled) {
        await unsubscribeFromPush(user.id);
      }
      setMorningReviewEnabled(next);
      await saveNotificationPreferences(user.id, { morningReviewEnabled: next });
      showFlash(
        "success",
        next ? t.settings.reminders.morningEnabled : t.settings.reminders.morningDisabled
      );
    } catch (error) {
      console.error("Error toggling morning review push:", error);
      showFlash(
        "error",
        error instanceof Error ? error.message : t.settings.reminders.morningFailed
      );
    } finally {
      setSavingMorningReview(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    setSendingReset(true);
    setFlash(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        showFlash("error", format(t.settings.security.resetFailed, { message: error.message }));
      } else {
        showFlash("success", format(t.settings.security.resetSent, { email: user.email }));
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      showFlash("error", t.settings.security.resetError);
    } finally {
      setSendingReset(false);
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center">
        <p className="text-stone-500 dark:text-stone-400">{t.settings.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/profile" className="text-stone-500 dark:text-stone-400 hover:opacity-70 text-sm font-semibold">
            {t.settings.back}
          </Link>
          <h1 className="text-2xl font-bold mt-2 text-stone-900 dark:text-stone-100">
            {t.settings.title}
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{t.settings.subtitle}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {flash && (
          <div
            className={`px-4 py-3 rounded-2xl text-sm font-semibold border ${
              flash.tone === "error"
                ? "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900"
                : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900"
            }`}
          >
            {flash.text}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <SectionCard
            icon={<UserRound className="w-5 h-5" />}
            title={t.settings.profile.title}
            description={t.settings.profile.description}
          >
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-widest text-stone-600 dark:text-stone-400">
                  {t.settings.profile.avatarLabel}
                </label>
                <div className="mt-3 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-stone-100 dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 flex items-center justify-center">
                    {avatarPreview ? (
                      <Image src={avatarPreview} alt={t.settings.profile.avatarAlt} width={80} height={80} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl">👤</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      disabled={avatarUploading}
                      className="hidden"
                    />
                    <label
                      htmlFor="avatar-upload"
                      className={`inline-block px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-colors ${
                        avatarUploading
                          ? "bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-600 cursor-not-allowed"
                          : "bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900"
                      }`}
                    >
                      {avatarUploading
                        ? t.settings.profile.avatarUploading
                        : t.settings.profile.avatarPick}
                    </label>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
                      {t.settings.profile.avatarHint}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-widest text-stone-600 dark:text-stone-400">
                  {t.settings.profile.nameLabel}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.settings.profile.namePlaceholder}
                  className="w-full mt-2 px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 transition-colors focus:outline-none focus:border-stone-400 dark:focus:border-stone-500"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-widest text-stone-600 dark:text-stone-400">
                  {t.settings.profile.bioLabel}
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 240))}
                  rows={4}
                  placeholder={t.settings.profile.bioPlaceholder}
                  className="w-full mt-2 px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 transition-colors focus:outline-none focus:border-stone-400 dark:focus:border-stone-500 resize-none"
                />
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
                  {format(t.settings.profile.bioCount, { count: bio.length })}
                </p>
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-60"
              >
                {savingProfile ? t.settings.profile.saving : t.settings.profile.save}
              </button>
            </form>
          </SectionCard>

          <div className="space-y-6">
            <SectionCard
              icon={<MoonStar className="w-5 h-5" />}
              title={t.settings.appearance.title}
              description={t.settings.appearance.description}
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-stone-900 dark:text-stone-100">
                      {t.settings.appearance.darkMode}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                      {format(t.settings.appearance.current, {
                        mode:
                          theme === "dark"
                            ? t.settings.appearance.dark
                            : t.settings.appearance.light,
                      })}
                    </p>
                  </div>
                  <button
                    onClick={handleToggleTheme}
                    aria-label={
                      theme === "dark"
                        ? t.settings.appearance.switchToLight
                        : t.settings.appearance.switchToDark
                    }
                    className={`w-14 h-7 rounded-full border-2 transition-colors flex items-center cursor-pointer ${
                      theme === "dark" ? "bg-emerald-600 border-emerald-700" : "bg-stone-200 border-stone-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        theme === "dark" ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100 mb-3">
                    {t.settings.appearance.preferredTrack}
                  </p>
                  <div className="space-y-3">
                    {(["personal", "professional"] as const).map((trackId) => (
                      <label
                        key={trackId}
                        className={`block rounded-2xl border p-4 cursor-pointer transition-colors ${
                          preferredTrack === trackId
                            ? "border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800"
                            : "border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="preferred-track"
                            checked={preferredTrack === trackId}
                            onChange={() => setPreferredTrackState(trackId)}
                            className="mt-1"
                          />
                          <div>
                            {/* Copy comes from the dictionary, not lib/tracks.ts -
                                that file keeps the structure (estimatedHours,
                                previewSlug, and the `stages` list that
                                stage-numbering.test.ts holds against
                                lib/track-stages.ts). */}
                            <p className="font-bold text-stone-900 dark:text-stone-100">
                              {t.tracks[trackId].tab}
                            </p>
                            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                              {t.tracks[trackId].subtitle}
                            </p>
                            <p className="text-sm text-stone-600 dark:text-stone-300 mt-2">
                              {t.tracks[trackId].description}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSavePreferences}
                  disabled={savingPreferences}
                  className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-60"
                >
                  {savingPreferences ? t.settings.appearance.saving : t.settings.appearance.save}
                </button>
              </div>
            </SectionCard>

            <SectionCard
              icon={<Bell className="w-5 h-5" />}
              title={t.settings.reminders.title}
              description={t.settings.reminders.description}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-stone-900 dark:text-stone-100">
                      {t.settings.reminders.email}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                      {t.settings.reminders.emailHint}
                    </p>
                  </div>
                  <button
                    onClick={handleToggleEmailReminders}
                    disabled={savingReminders}
                    aria-label={
                      emailRemindersEnabled
                        ? t.settings.reminders.emailOff
                        : t.settings.reminders.emailOn
                    }
                    className={`w-14 h-7 rounded-full border-2 transition-colors flex items-center cursor-pointer disabled:opacity-60 ${
                      emailRemindersEnabled ? "bg-emerald-600 border-emerald-700" : "bg-stone-200 border-stone-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        emailRemindersEnabled ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {t.settings.reminders.emailFootnote}
                </p>

                <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <div>
                    <p className="font-bold text-stone-900 dark:text-stone-100">
                      {t.settings.reminders.weekly}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                      {t.settings.reminders.weeklyHint}
                    </p>
                  </div>
                  <button
                    onClick={handleToggleWeeklyDigest}
                    disabled={savingWeeklyDigest}
                    aria-label={
                      weeklyDigestEnabled
                        ? t.settings.reminders.weeklyOff
                        : t.settings.reminders.weeklyOn
                    }
                    className={`w-14 h-7 rounded-full border-2 transition-colors flex items-center cursor-pointer disabled:opacity-60 flex-shrink-0 ${
                      weeklyDigestEnabled ? "bg-emerald-600 border-emerald-700" : "bg-stone-200 border-stone-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        weeklyDigestEnabled ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {isPushSupported() && (
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
                    <div>
                      <p className="font-bold text-stone-900 dark:text-stone-100">
                        {t.settings.reminders.browser}
                      </p>
                      <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                        {t.settings.reminders.browserHint}
                      </p>
                    </div>
                    <button
                      onClick={handleToggleBrowserReminders}
                      disabled={savingBrowserReminders}
                      aria-label={
                        browserRemindersEnabled
                          ? t.settings.reminders.browserOff
                          : t.settings.reminders.browserOn
                      }
                      className={`w-14 h-7 rounded-full border-2 transition-colors flex items-center cursor-pointer disabled:opacity-60 flex-shrink-0 ${
                        browserRemindersEnabled ? "bg-emerald-600 border-emerald-700" : "bg-stone-200 border-stone-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          browserRemindersEnabled ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                )}

                {isPushSupported() && (
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
                    <div>
                      <p className="font-bold text-stone-900 dark:text-stone-100">
                        {t.settings.reminders.morning}
                      </p>
                      <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                        {t.settings.reminders.morningHint}
                      </p>
                    </div>
                    <button
                      onClick={handleToggleMorningReview}
                      disabled={savingMorningReview}
                      aria-label={
                        morningReviewEnabled
                          ? t.settings.reminders.morningOff
                          : t.settings.reminders.morningOn
                      }
                      className={`w-14 h-7 rounded-full border-2 transition-colors flex items-center cursor-pointer disabled:opacity-60 flex-shrink-0 ${
                        morningReviewEnabled ? "bg-emerald-600 border-emerald-700" : "bg-stone-200 border-stone-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          morningReviewEnabled ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>
            </SectionCard>

            <SectionCard
              icon={<Bell className="w-5 h-5" />}
              title={t.settings.quickActions.title}
              description={t.settings.quickActions.description}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/analytics" className="rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <p className="font-bold text-stone-900 dark:text-stone-100">
                    {t.settings.quickActions.analytics}
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                    {t.settings.quickActions.analyticsHint}
                  </p>
                </Link>
                <Link href="/ghi-chu" className="rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <p className="font-bold text-stone-900 dark:text-stone-100">
                    {t.settings.quickActions.notes}
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                    {t.settings.quickActions.notesHint}
                  </p>
                </Link>
                <Link href="/ban-be" className="rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <p className="font-bold text-stone-900 dark:text-stone-100">
                    {t.settings.quickActions.friends}
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                    {t.settings.quickActions.friendsHint}
                  </p>
                </Link>
                <Link href="/tai-lieu" className="rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <p className="font-bold text-stone-900 dark:text-stone-100">
                    {t.settings.quickActions.documents}
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                    {t.settings.quickActions.documentsHint}
                  </p>
                </Link>
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <SectionCard
            icon={<Shield className="w-5 h-5" />}
            title={t.settings.security.title}
            description={t.settings.security.description}
          >
            <div className="space-y-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-stone-600 dark:text-stone-400">
                  {t.settings.security.emailLabel}
                </p>
                <p className="text-sm font-semibold mt-1 text-stone-900 dark:text-stone-100">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-stone-600 dark:text-stone-400">
                  {t.settings.security.joinedLabel}
                </p>
                <p className="text-sm font-semibold mt-1 text-stone-900 dark:text-stone-100">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString(intlLocale(locale))
                    : t.settings.security.joinedUnknown}
                </p>
              </div>
              <button
                type="button"
                onClick={handlePasswordReset}
                disabled={sendingReset}
                className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-60"
              >
                {sendingReset ? t.settings.security.sendingReset : t.settings.security.sendReset}
              </button>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {t.settings.security.resetFootnote}
              </p>
            </div>
          </SectionCard>

          <SectionCard
            icon={<BookOpen className="w-5 h-5" />}
            title={t.settings.session.title}
            description={t.settings.session.description}
          >
            <div className="space-y-4">
              <div className="rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 p-4">
                <p className="font-bold text-stone-900 dark:text-stone-100">
                  {t.settings.session.statusTitle}
                </p>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                  {t.settings.session.statusBody}
                </p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-60"
              >
                <LogOut className="w-4 h-4" />
                {signingOut ? t.settings.session.signingOut : t.settings.session.signOut}
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
