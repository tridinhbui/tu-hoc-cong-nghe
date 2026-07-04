"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import UserMenu from "@/components/UserMenu";

// Auth-gated and reads Supabase env vars at render time — never prerender statically.
export const dynamic = "force-dynamic";

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
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

      // Load dark mode preference from localStorage
      const isDark = localStorage.getItem("darkMode") === "true";
      setDarkMode(isDark);
      applyDarkMode(isDark);

      setLoading(false);
    };

    checkAuth();
  }, [router, supabase.auth]);

  const applyDarkMode = (isDark: boolean) => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      html.style.colorScheme = "dark";
      document.body.classList.add("dark");
      document.body.style.backgroundColor = "#1a1a1a";
      document.body.style.color = "#ffffff";
    } else {
      html.classList.remove("dark");
      html.style.colorScheme = "light";
      document.body.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
    }
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    applyDarkMode(newDarkMode);
  };

  const handleSaveName = async (e: React.FormEvent) => {
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
    } catch (err) {
      setMessage("Có lỗi xảy ra");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-stone-500">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{
      backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
      color: darkMode ? "#ffffff" : "#000000",
    }}>
      {/* Header */}
      <div className="border-b sticky top-0 z-10" style={{
        borderBottomColor: darkMode ? "#333333" : "#e5e5e5",
        backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
      }}>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link href="/profile" style={{
              color: darkMode ? "#888888" : "#a3a3a3",
            }} className="hover:opacity-70 text-sm font-semibold">
              ← Quay lại
            </Link>
            <h1 className="text-xl font-bold mt-2" style={{
              color: darkMode ? "#ffffff" : "#1a1a1a",
            }}>
              Cài đặt
            </h1>
          </div>
          <UserMenu name={user?.user_metadata?.full_name} email={user?.email} avatarUrl={user?.user_metadata?.avatar_url} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Dark Mode Section */}
        <div style={{
          backgroundColor: darkMode ? "#2a2a2a" : "#ffffff",
          borderColor: darkMode ? "#444444" : "#e5e5e5",
        }} className="border-2 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold">Chế độ tối</h3>
              <p style={{
                color: darkMode ? "#aaaaaa" : "#666666",
              }} className="text-sm mt-1">
                {darkMode ? "Đang bật" : "Đang tắt"}
              </p>
            </div>
            <button
              onClick={handleDarkModeToggle}
              className={`w-12 h-6 rounded-full border-2 transition-colors flex items-center ${
                darkMode
                  ? "bg-emerald-600 border-emerald-700"
                  : "bg-stone-200 border-stone-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Update Name Section */}
        <div style={{
          backgroundColor: darkMode ? "#2a2a2a" : "#ffffff",
          borderColor: darkMode ? "#444444" : "#e5e5e5",
        }} className="border-2 rounded-xl p-6">
          <h3 className="text-lg font-extrabold mb-4">Thông tin cá nhân</h3>

          <form onSubmit={handleSaveName} className="space-y-4">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-widest" style={{
                color: darkMode ? "#aaaaaa" : "#666666",
              }}>
                Tên
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 px-4 py-2 rounded-xl border-2 transition-colors focus:outline-none"
                style={{
                  backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
                  borderColor: darkMode ? "#444444" : "#e5e5e5",
                  color: darkMode ? "#ffffff" : "#000000",
                }}
              />
            </div>

            {message && (
              <div className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                message.includes("Lỗi") || message.includes("lỗi")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`} style={darkMode ? {
                backgroundColor: message.includes("Lỗi") || message.includes("lỗi") ? "#3a1f1f" : "#1f3a2a",
                borderColor: message.includes("Lỗi") || message.includes("lỗi") ? "#663333" : "#336633",
                color: message.includes("Lỗi") || message.includes("lỗi") ? "#ff9999" : "#99ff99",
              } : {}}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded-xl transition-colors disabled:opacity-60"
              style={darkMode ? {
                backgroundColor: "#444444",
              } : {}}
            >
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </form>
        </div>

        {/* Account Info */}
        <div style={{
          backgroundColor: darkMode ? "#2a2a2a" : "#ffffff",
          borderColor: darkMode ? "#444444" : "#e5e5e5",
        }} className="border-2 rounded-xl p-6 mt-6">
          <h3 className="text-lg font-extrabold mb-4">Thông tin tài khoản</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{
                color: darkMode ? "#aaaaaa" : "#666666",
              }}>
                Email
              </p>
              <p className="text-sm font-semibold mt-1">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{
                color: darkMode ? "#aaaaaa" : "#666666",
              }}>
                Ngày tham gia
              </p>
              <p className="text-sm font-semibold mt-1">
                {new Date(user?.created_at).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
