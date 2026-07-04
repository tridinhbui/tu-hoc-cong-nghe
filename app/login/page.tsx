"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase";

// Reads Supabase env vars at render time — never prerender statically.
export const dynamic = "force-dynamic";

const TRACKS = {
  personal: {
    tab: "Tài chính cá nhân",
    subtitle: "Lộ trình 80 ngày · dành cho người mới",
    description: "Quản lý tiền, tiết kiệm, đầu tư cá nhân, lên kế hoạch tài chính — không cần kiến thức ngành.",
    stages: [
      "Chặng 1 — Tư duy tiền bạc và tài chính cơ bản",
      "Chặng 2 — Cổ phiếu, ETF và quỹ đầu tư",
      "Chặng 3 — Trái phiếu và các công cụ cố định",
      "Chặng 4 — Danh mục đầu tư và kế hoạch hưu trí",
    ],
    previewSlug: "tai-chinh-la-gi",
    previewLabel: "Day 1: Tài chính là gì?",
  },
  professional: {
    tab: "Tài chính chuyên ngành",
    subtitle: "Lộ trình 180 ngày · chuyên sâu",
    description: "Kế toán, đọc báo cáo tài chính, định giá doanh nghiệp, trái phiếu, danh mục và phái sinh.",
    stages: [
      "Chặng 1-3 — Kế toán, báo cáo tài chính, chỉ số",
      "Chặng 4-5 — Giá trị thời gian của tiền, tài chính doanh nghiệp",
      "Chặng 6-7 — Định giá cổ phiếu, trái phiếu và tín dụng",
      "Chặng 8-9 — Danh mục đầu tư và công cụ phái sinh",
    ],
    previewSlug: "ke-toan-la-gi",
    previewLabel: "Day 21: Kế toán là ngôn ngữ của kinh doanh",
  },
} as const;

type TrackId = keyof typeof TRACKS;

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [previewTrack, setPreviewTrack] = useState<TrackId>("personal");

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.replace("/dashboard");
      }
    };
    checkAuth();
  }, [router, supabase.auth]);

  // Handle email/password auth
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        // Validate inputs
        if (!name.trim() || !email.trim() || !password.trim()) {
          setError("Vui lòng điền đầy đủ tên, email và mật khẩu.");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError("Mật khẩu phải ít nhất 6 ký tự.");
          setLoading(false);
          return;
        }

        const { error: signupError } = await supabase.auth.signUp({
          email: email.toLowerCase().trim(),
          password: password,
          options: {
            data: {
              full_name: name.trim(),
            },
          },
        });

        if (signupError) {
          setError(signupError.message || "Đăng ký thất bại. Vui lòng thử lại.");
          setLoading(false);
          return;
        }

        setError("");
        setEmail("");
        setPassword("");
        setName("");
        setMode("login");
        setLoading(false);
        return;
      } else {
        // Login mode
        if (!email.trim() || !password.trim()) {
          setError("Vui lòng điền email và mật khẩu.");
          setLoading(false);
          return;
        }

        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: email.toLowerCase().trim(),
          password: password,
        });

        if (loginError) {
          setError(loginError.message || "Đăng nhập thất bại. Vui lòng thử lại.");
          setLoading(false);
          return;
        }

        router.push("/dashboard");
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  // Handle Google OAuth
  async function handleGoogleLogin() {
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError("Đăng nhập Google thất bại. Vui lòng thử lại.");
        setLoading(false);
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* ── LEFT SIDE: Hero + Info ── */}
      <div className="hidden lg:flex flex-col w-1/2 bg-white px-12 py-16 justify-between">
        <div className="space-y-12">
          {/* Logo & Brand */}
          <div className="space-y-4">
            <div className="text-sm font-bold text-stone-400 uppercase tracking-widest">
              Tự Học Tài Chính
            </div>
            <h1 className="text-5xl font-bold text-stone-900 leading-tight">
              Hiểu tiền bạc,<br />quản lý tài sản
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed max-w-md">
              200 ngày học từ vỡ lòng đến phân tích doanh nghiệp. Chọn lộ trình phù hợp, học theo tốc độ của bạn.
            </p>
          </div>

          {/* Two Track Preview — interactive tabs, not static hover cards */}
          <div className="border-2 border-stone-200 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-2">
              {(Object.keys(TRACKS) as TrackId[]).map((id) => {
                const t = TRACKS[id];
                const isActive = previewTrack === id;
                return (
                  <button
                    key={id}
                    onClick={() => setPreviewTrack(id)}
                    className={`px-5 py-4 text-left transition-colors cursor-pointer ${
                      isActive ? "bg-stone-900 text-white" : "bg-white text-stone-500 hover:bg-stone-50"
                    }`}
                  >
                    <div className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">
                      {id === "personal" ? "Track 1" : "Track 2"}
                    </div>
                    <div className="font-bold text-sm">{t.tab}</div>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={previewTrack}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="p-6 space-y-4"
              >
                <div>
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">
                    {TRACKS[previewTrack].subtitle}
                  </div>
                  <p className="text-sm text-stone-600">{TRACKS[previewTrack].description}</p>
                </div>

                <ul className="space-y-2 text-xs text-stone-500">
                  {TRACKS[previewTrack].stages.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="flex-shrink-0 text-stone-300">→</span> {s}
                    </li>
                  ))}
                </ul>

                <a
                  href={`/bai-hoc/${TRACKS[previewTrack].previewSlug}`}
                  className="flex items-center justify-between gap-3 border border-stone-200 hover:border-stone-400 hover:bg-stone-50 rounded-xl px-4 py-3 transition-colors group"
                >
                  <div>
                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Xem thử ngay, không cần đăng nhập</div>
                    <div className="text-sm font-bold text-stone-900">{TRACKS[previewTrack].previewLabel}</div>
                  </div>
                  <span className="text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition-all">→</span>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* ── RIGHT SIDE: Form ── */}
      <div className="w-full lg:w-1/2 bg-stone-50 flex flex-col items-center justify-center px-6 py-16 lg:py-0">
        <div className="w-full max-w-sm">
          {/* Mobile Brand (visible on small screens) */}
          <div className="lg:hidden space-y-4 mb-12 text-center">
            <div className="text-sm font-bold text-stone-400 uppercase tracking-widest">
              Tự Học Tài Chính
            </div>
            <h1 className="text-4xl font-bold text-stone-900">
              Hiểu tiền bạc
            </h1>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-stone-200 rounded-2xl p-8 space-y-6">
            {/* Form Title */}
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-2">
                {mode === "login" ? "Đăng nhập" : "Đăng ký"}
              </h2>
              <p className="text-sm text-stone-500">
                {mode === "login"
                  ? "Chào mừng trở lại"
                  : "Tạo tài khoản để bắt đầu học"}
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full border border-stone-200 hover:bg-stone-50 text-stone-900 py-3 rounded-xl font-bold text-base transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Đăng nhập với Google
            </button>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-1 border-t border-stone-100" />
              <span className="px-3 text-xs text-stone-400 font-bold uppercase tracking-wider">
                Hoặc email
              </span>
              <div className="flex-1 border-t border-stone-100" />
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
                    Tên của bạn
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:border-stone-400 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 text-base placeholder:text-stone-300"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
                  Địa chỉ email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@vi-du.com"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:border-stone-400 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 text-base placeholder:text-stone-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:border-stone-400 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 text-base placeholder:text-stone-300"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 rounded-xl font-bold text-base transition-colors disabled:opacity-60 mt-2"
              >
                {loading
                  ? "Đang xử lý..."
                  : mode === "login"
                    ? "Đăng nhập"
                    : "Đăng ký"}
              </button>
            </form>

            {/* Mode Toggle */}
            <div className="text-center text-sm text-stone-600">
              {mode === "login" ? (
                <>
                  Chưa có tài khoản?{" "}
                  <button
                    onClick={() => {
                      setMode("signup");
                      setError("");
                    }}
                    className="text-stone-900 font-bold hover:underline"
                  >
                    Đăng ký
                  </button>
                </>
              ) : (
                <>
                  Đã có tài khoản?{" "}
                  <button
                    onClick={() => {
                      setMode("login");
                      setError("");
                    }}
                    className="text-stone-900 font-bold hover:underline"
                  >
                    Đăng nhập
                  </button>
                </>
              )}
            </div>

            {/* Preview a real lesson before signing up */}
            <div className="text-center text-sm pt-2">
              <a
                href="/bai-hoc/tai-chinh-la-gi"
                className="text-stone-500 font-semibold hover:text-stone-900 hover:underline"
              >
                Xem thử bài học đầu tiên, chưa cần đăng nhập →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
