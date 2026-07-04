"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");

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
        setError(""); // Clear error on success
        setLoading(false);
        // Show success message
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Hero Section ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 sm:py-24">
        <div className="max-w-2xl w-full space-y-8">
          {/* Logo & Brand */}
          <div className="space-y-3">
            <div className="text-sm font-bold text-stone-400 uppercase tracking-widest">
              Tự Học Tài Chính
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-stone-900 leading-tight">
              Hiểu tiền bạc,<br />quản lý tài sản
            </h1>
            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed max-w-lg">
              200 ngày học từ vỡ lòng đến phân tích doanh nghiệp. Chọn lộ trình phù hợp, học theo tốc độ của bạn.
            </p>
          </div>

          {/* Two Track Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border-2 border-stone-200 rounded-2xl p-6 hover:border-stone-300 transition-colors">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                Track 1
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Tài chính cá nhân</h3>
              <p className="text-sm text-stone-600 mb-4">
                Quản lý tiền, tiết kiệm, đầu tư cá nhân, lên kế hoạch tài chính.
              </p>
              <ul className="space-y-2 text-xs text-stone-500">
                <li className="flex gap-2"><span className="flex-shrink-0">+</span> Chặng 1: Tư duy tiền bạc</li>
                <li className="flex gap-2"><span className="flex-shrink-0">+</span> Chặng 2-4: Đầu tư thực tế</li>
                <li className="flex gap-2"><span className="flex-shrink-0">+</span> Không cần kiến thức ngành</li>
              </ul>
            </div>

            <div className="border-2 border-stone-200 rounded-2xl p-6 hover:border-stone-300 transition-colors">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                Track 2
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Tài chính chuyên ngành</h3>
              <p className="text-sm text-stone-600 mb-4">
                Kế toán, phân tích báo cáo, định giá, tài chính doanh nghiệp.
              </p>
              <ul className="space-y-2 text-xs text-stone-500">
                <li className="flex gap-2"><span className="flex-shrink-0">+</span> Chặng 1-9: Từ cơ bản đến nâng cao</li>
                <li className="flex gap-2"><span className="flex-shrink-0">+</span> 50+ bài học chuyên sâu</li>
                <li className="flex gap-2"><span className="flex-shrink-0">+</span> Theo ngành, theo lĩnh vực</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Form Section ── */}
      <div className="bg-stone-50 border-t border-stone-200 px-6 py-16">
        <div className="max-w-lg mx-auto">
          <div className="bg-white border border-stone-200 rounded-2xl p-8 space-y-6">
            {/* Form Title */}
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-2">
                {mode === "login" ? "Đăng nhập" : "Đăng ký"}
              </h2>
              <p className="text-sm text-stone-500">
                {mode === "login"
                  ? "Chào mừng trở lại"
                  : "Miễn phí, không cần thẻ tín dụng"}
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full border border-stone-200 hover:bg-stone-50 text-stone-900 py-3 rounded-xl font-bold text-base transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
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
          </div>

          {/* Trust indicators */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm font-bold text-stone-900">Được tin tưởng bởi</p>
            <div className="flex items-center justify-center gap-6 text-stone-500 text-xs font-semibold">
              <div className="flex items-center gap-1">
                <span>200+ bài</span>
              </div>
              <div className="w-px h-4 bg-stone-200" />
              <div className="flex items-center gap-1">
                <span>0đ chi phí</span>
              </div>
              <div className="w-px h-4 bg-stone-200" />
              <div className="flex items-center gap-1">
                <span>Mãi mãi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Info ── */}
      <div className="bg-white border-t border-stone-100 px-6 py-8 text-center text-xs text-stone-500">
        <p>Dữ liệu của bạn được bảo vệ bằng mã hóa SSL</p>
      </div>
    </div>
  );
}
