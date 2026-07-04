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
    <div className="min-h-screen bg-white text-stone-900">
      {/* Header */}
      <div className="border-b border-stone-200 sticky top-0 z-10 bg-white">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link href="/profile" className="text-stone-500 hover:opacity-70 text-sm font-semibold">
              ← Quay lại
            </Link>
            <h1 className="text-xl font-bold mt-2 text-stone-900">
              Cài đặt
            </h1>
          </div>
          <UserMenu name={user?.user_metadata?.full_name} email={user?.email} avatarUrl={user?.user_metadata?.avatar_url} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Update Name Section */}
        <div className="border-2 border-stone-200 rounded-xl p-6 bg-white">
          <h3 className="text-lg font-extrabold mb-4">Thông tin cá nhân</h3>

          <form onSubmit={handleSaveName} className="space-y-4">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-widest text-stone-600">
                Tên
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 px-4 py-2 rounded-xl border-2 border-stone-200 bg-white text-stone-900 transition-colors focus:outline-none focus:border-stone-400"
              />
            </div>

            {message && (
              <div className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                message.includes("Lỗi") || message.includes("lỗi")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded-xl transition-colors disabled:opacity-60"
            >
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </form>
        </div>

        {/* Account Info */}
        <div className="border-2 border-stone-200 rounded-xl p-6 mt-6 bg-white">
          <h3 className="text-lg font-extrabold mb-4">Thông tin tài khoản</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-stone-600">
                Email
              </p>
              <p className="text-sm font-semibold mt-1">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-stone-600">
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
