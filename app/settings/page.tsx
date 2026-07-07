"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import UserMenu from "@/components/UserMenu";
import ThemeToggle from "@/components/ThemeToggle";

// Auth-gated and reads Supabase env vars at render time - never prerender statically.
export const dynamic = "force-dynamic";

interface CurrentUser {
  email?: string;
  created_at?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

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
      setName(session.user.user_metadata?.full_name || "");
      setLoading(false);
    };

    checkAuth();
  }, [router, supabase.auth]);

  const handleSaveName = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: name,
        },
      });

      if (error) {
        setMessage("Lỗi: " + error.message);
      } else {
        setMessage("Cập nhật thành công!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch {
      setMessage("Có lỗi xảy ra");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center">
        <p className="text-stone-500 dark:text-stone-400">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 sticky top-0 z-10 bg-white dark:bg-stone-950">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link href="/profile" className="text-stone-500 dark:text-stone-400 hover:opacity-70 text-sm font-semibold">
              ← Quay lại
            </Link>
            <h1 className="text-xl font-bold mt-2 text-stone-900 dark:text-stone-100">
              Cài đặt
            </h1>
          </div>
          <UserMenu name={user?.user_metadata?.full_name} email={user?.email} avatarUrl={user?.user_metadata?.avatar_url} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Appearance Section */}
        <div className="border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6 bg-white dark:bg-stone-900 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold">Chế độ tối</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                Áp dụng cho toàn bộ ứng dụng
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Update Name Section */}
        <div className="border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6 bg-white dark:bg-stone-900">
          <h3 className="text-lg font-extrabold mb-4">Thông tin cá nhân</h3>

          <form onSubmit={handleSaveName} className="space-y-4">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-widest text-stone-600 dark:text-stone-400">
                Tên
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 px-4 py-2 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 transition-colors focus:outline-none focus:border-stone-400 dark:focus:border-stone-500"
              />
            </div>

            {message && (
              <div className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                message.includes("Lỗi") || message.includes("lỗi")
                  ? "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900"
                  : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900"
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold py-2 px-4 rounded-xl transition-colors disabled:opacity-60"
            >
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </form>
        </div>

        {/* Account Info */}
        <div className="border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6 mt-6 bg-white dark:bg-stone-900">
          <h3 className="text-lg font-extrabold mb-4">Thông tin tài khoản</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-stone-600 dark:text-stone-400">
                Email
              </p>
              <p className="text-sm font-semibold mt-1">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-stone-600 dark:text-stone-400">
                Ngày tham gia
              </p>
              <p className="text-sm font-semibold mt-1">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString("vi-VN") : "Chưa cập nhật"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
