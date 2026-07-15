"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, BookOpen, LogOut, MoonStar, Shield, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { getUserProfile, setDarkMode, setPreferredTrack, updateUserProfile } from "@/lib/supabase-user";
import { getInitialTheme, setTheme, type Theme } from "@/lib/theme";
import { TRACKS } from "@/lib/tracks";
import { getNotificationPreferences, saveNotificationPreferences } from "@/lib/notification-preferences";

export const dynamic = "force-dynamic";

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
        showFlash("error", `Lỗi: ${authError.message}`);
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
        showFlash("success", "Đã cập nhật hồ sơ cá nhân.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      showFlash("error", "Có lỗi xảy ra khi lưu hồ sơ.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    if (file.size > 2 * 1024 * 1024) {
      showFlash("error", "Lỗi: Kích thước file không được quá 2MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      showFlash("error", "Lỗi: Chỉ chấp nhận file hình ảnh.");
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
        showFlash("error", `Lỗi upload: ${uploadError.message}`);
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
        showFlash("error", `Lỗi cập nhật: ${updateError.message}`);
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
        showFlash("success", "Đã cập nhật avatar.");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      showFlash("error", "Có lỗi xảy ra khi upload avatar.");
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
      showFlash("success", "Đã lưu tùy chọn học tập và giao diện.");
    } catch (error) {
      console.error("Error saving preferences:", error);
      showFlash("error", "Không lưu được tùy chọn. Vui lòng thử lại.");
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
      showFlash("success", next ? "Đã bật nhắc nhở qua email." : "Đã tắt nhắc nhở qua email.");
    } catch (error) {
      console.error("Error saving notification preferences:", error);
      setEmailRemindersEnabled(!next);
      showFlash("error", "Không lưu được tùy chọn nhắc nhở. Vui lòng thử lại.");
    } finally {
      setSavingReminders(false);
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
        showFlash("error", `Không gửi được email đổi mật khẩu: ${error.message}`);
      } else {
        showFlash("success", `Đã gửi email đổi mật khẩu tới ${user.email}.`);
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      showFlash("error", "Có lỗi xảy ra khi gửi email đổi mật khẩu.");
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
        <p className="text-stone-500 dark:text-stone-400">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/profile" className="text-stone-500 dark:text-stone-400 hover:opacity-70 text-sm font-semibold">
            ← Quay lại
          </Link>
          <h1 className="text-2xl font-bold mt-2 text-stone-900 dark:text-stone-100">Cài đặt</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Tùy chỉnh hồ sơ, trải nghiệm học và bảo mật tài khoản.
          </p>
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
            title="Hồ sơ cá nhân"
            description="Cập nhật tên hiển thị, ảnh đại diện và phần giới thiệu ngắn để người khác nhận ra bạn dễ hơn."
          >
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-widest text-stone-600 dark:text-stone-400">
                  Avatar
                </label>
                <div className="mt-3 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-stone-100 dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 flex items-center justify-center">
                    {avatarPreview ? (
                      <Image src={avatarPreview} alt="Avatar" width={80} height={80} className="w-full h-full object-cover" />
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
                      {avatarUploading ? "Đang upload..." : "Chọn ảnh mới"}
                    </label>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
                      Tối đa 2MB, ưu tiên JPG hoặc PNG vuông.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-widest text-stone-600 dark:text-stone-400">
                  Tên hiển thị
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tên bạn muốn mọi người nhìn thấy"
                  className="w-full mt-2 px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 transition-colors focus:outline-none focus:border-stone-400 dark:focus:border-stone-500"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-widest text-stone-600 dark:text-stone-400">
                  Giới thiệu ngắn
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 240))}
                  rows={4}
                  placeholder="Ví dụ: Mình đang học để hiểu tiền của bản thân tốt hơn và bắt đầu đầu tư bài bản."
                  className="w-full mt-2 px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 transition-colors focus:outline-none focus:border-stone-400 dark:focus:border-stone-500 resize-none"
                />
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">{bio.length}/240 ký tự</p>
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-60"
              >
                {savingProfile ? "Đang lưu hồ sơ..." : "Lưu hồ sơ"}
              </button>
            </form>
          </SectionCard>

          <div className="space-y-6">
            <SectionCard
              icon={<MoonStar className="w-5 h-5" />}
              title="Giao diện & lộ trình"
              description="Chọn trải nghiệm hiển thị và hướng học ưu tiên để dashboard sát với mục tiêu của bạn hơn."
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-stone-900 dark:text-stone-100">Chế độ tối</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                      Hiện tại: {theme === "dark" ? "Tối" : "Sáng"}
                    </p>
                  </div>
                  <button
                    onClick={handleToggleTheme}
                    aria-label={theme === "dark" ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
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
                  <p className="font-bold text-stone-900 dark:text-stone-100 mb-3">Lộ trình ưu tiên</p>
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
                            <p className="font-bold text-stone-900 dark:text-stone-100">{TRACKS[trackId].tab}</p>
                            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                              {TRACKS[trackId].subtitle}
                            </p>
                            <p className="text-sm text-stone-600 dark:text-stone-300 mt-2">
                              {TRACKS[trackId].description}
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
                  {savingPreferences ? "Đang lưu tùy chọn..." : "Lưu tùy chọn"}
                </button>
              </div>
            </SectionCard>

            <SectionCard
              icon={<Bell className="w-5 h-5" />}
              title="Nhắc nhở học tập"
              description="Bật email nhắc nhở để không bỏ lỡ streak hoặc bài ôn tập đến hạn."
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-stone-900 dark:text-stone-100">Nhắc nhở qua email</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                      Khi sắp mất streak hoặc có bài ôn tập đến hạn
                    </p>
                  </div>
                  <button
                    onClick={handleToggleEmailReminders}
                    disabled={savingReminders}
                    aria-label={emailRemindersEnabled ? "Tắt nhắc nhở qua email" : "Bật nhắc nhở qua email"}
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
                  Email sẽ được gửi tối đa 1 lần/ngày, chỉ khi thực sự cần (sắp mất streak hoặc có bài ôn tập đến
                  hạn).
                </p>
              </div>
            </SectionCard>

            <SectionCard
              icon={<Bell className="w-5 h-5" />}
              title="Tác vụ nhanh"
              description="Những nơi người dùng hay quay lại nhất sau khi chỉnh cài đặt."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/analytics" className="rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <p className="font-bold text-stone-900 dark:text-stone-100">Thống kê học tập</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Xem tiến độ và thời gian học</p>
                </Link>
                <Link href="/ghi-chu" className="rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <p className="font-bold text-stone-900 dark:text-stone-100">Ghi chú của tôi</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Ôn lại các ý đã note</p>
                </Link>
                <Link href="/ban-be" className="rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <p className="font-bold text-stone-900 dark:text-stone-100">Bạn bè & chat</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Tìm bạn học và nhắn tin</p>
                </Link>
                <Link href="/tai-lieu" className="rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <p className="font-bold text-stone-900 dark:text-stone-100">Tài liệu miễn phí</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Mở kho tài nguyên học thêm</p>
                </Link>
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <SectionCard
            icon={<Shield className="w-5 h-5" />}
            title="Bảo mật tài khoản"
            description="Quản lý email đăng nhập và gửi link đổi mật khẩu khi cần."
          >
            <div className="space-y-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-stone-600 dark:text-stone-400">
                  Email đăng nhập
                </p>
                <p className="text-sm font-semibold mt-1 text-stone-900 dark:text-stone-100">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-stone-600 dark:text-stone-400">
                  Ngày tham gia
                </p>
                <p className="text-sm font-semibold mt-1 text-stone-900 dark:text-stone-100">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString("vi-VN") : "Chưa cập nhật"}
                </p>
              </div>
              <button
                type="button"
                onClick={handlePasswordReset}
                disabled={sendingReset}
                className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-60"
              >
                {sendingReset ? "Đang gửi email..." : "Gửi email đổi mật khẩu"}
              </button>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Hệ thống sẽ gửi link an toàn tới email hiện tại của bạn.
              </p>
            </div>
          </SectionCard>

          <SectionCard
            icon={<BookOpen className="w-5 h-5" />}
            title="Phiên làm việc & tài khoản"
            description="Thoát khỏi tài khoản khi dùng máy lạ hoặc sau khi hoàn tất phiên học."
          >
            <div className="space-y-4">
              <div className="rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 p-4">
                <p className="font-bold text-stone-900 dark:text-stone-100">Trạng thái hiện tại</p>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                  Bạn đang đăng nhập bằng tài khoản Supabase và mọi thay đổi tại đây được lưu trực tiếp vào hệ thống.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-60"
              >
                <LogOut className="w-4 h-4" />
                {signingOut ? "Đang đăng xuất..." : "Đăng xuất"}
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
