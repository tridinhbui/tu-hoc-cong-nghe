"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, BarChart3, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { translateAuthError } from "@/lib/auth-error-messages";
import Logo from "@/components/Logo";
import TrackPreviewPanel from "@/components/login/TrackPreviewPanel";
import { type TrackId } from "@/lib/tracks";

const MAX_ATTEMPTS = 5;
const COOLDOWN_MS = 60_000;

// Reads Supabase env vars at render time - never prerender statically.
export const dynamic = "force-dynamic";

// Dedicated, minimal auth screen - the marketing pitch (hero, stats, trust
// highlights, social proof) now all lives on the homepage (app/page.tsx +
// components/home/HomePage.tsx). This page's only job is to get someone who
// already decided to sign in/up through that flow with no distractions.
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Homepage CTAs link here with ?mode=signup so "Bắt đầu học miễn phí"
  // lands directly on the signup form instead of login.
  const [mode, setMode] = useState<"login" | "signup" | "forgot">(
    searchParams.get("mode") === "signup" ? "signup" : "login"
  );
  const [name, setName] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const failedAttemptsRef = useRef(0);
  const [previewTrack, setPreviewTrack] = useState<TrackId>("personal");

  // Basic client-side throttle: after MAX_ATTEMPTS failed logins/signups, force
  // a short wait before allowing another attempt. Supabase also rate-limits
  // auth endpoints server-side; this just gives the user a clearer local signal.
  useEffect(() => {
    if (!cooldownUntil) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
      setCooldownLeft(remaining);
      if (remaining <= 0) {
        setCooldownUntil(null);
        failedAttemptsRef.current = 0;
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [cooldownUntil]);

  const registerFailedAttempt = () => {
    failedAttemptsRef.current += 1;
    if (failedAttemptsRef.current >= MAX_ATTEMPTS) {
      setCooldownUntil(Date.now() + COOLDOWN_MS);
    }
  };

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

    if (cooldownUntil) {
      setError(`Bạn đã thử quá nhiều lần. Vui lòng đợi ${cooldownLeft} giây rồi thử lại.`);
      return;
    }

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
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (signupError) {
          registerFailedAttempt();
          setError(translateAuthError(signupError.message));
          setLoading(false);
          return;
        }

        // Auto-login after successful signup
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: email.toLowerCase().trim(),
          password: password,
        });

        if (loginError) {
          setError("Đã tạo tài khoản nhưng không thể tự động đăng nhập. Vui lòng đăng nhập thủ công.");
          setLoading(false);
          return;
        }

        failedAttemptsRef.current = 0;
        router.push("/dashboard");
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
          registerFailedAttempt();
          setError(translateAuthError(loginError.message));
          setLoading(false);
          return;
        }

        failedAttemptsRef.current = 0;
        router.push("/dashboard");
      }
    } catch {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  // Handle "forgot password" - sends a Supabase recovery email
  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Vui lòng nhập email của bạn.");
      return;
    }

    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.toLowerCase().trim(), {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (resetError) {
        setError(translateAuthError(resetError.message));
        setLoading(false);
        return;
      }

      setResetSent(true);
      setLoading(false);
    } catch {
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
          // Without this, Google silently reuses whichever account is
          // already active in the browser session instead of showing the
          // account chooser - a problem on shared/multi-account devices
          // where that's rarely the account the person meant to use.
          queryParams: { prompt: "select_account" },
        },
      });

      if (error) {
        setError(translateAuthError(error.message));
        setLoading(false);
      }
    } catch {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(20,184,166,0.08),_transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_28%),linear-gradient(180deg,_rgba(12,10,9,1),_rgba(17,24,39,1))] px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Về trang chủ
        </Link>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,420px)] lg:items-center">
          <div className="hidden lg:block">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-900 bg-emerald-50/80 dark:bg-emerald-950/30 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                <Sparkles className="w-4 h-4" />
                Miễn phí mãi mãi
              </div>

              <h1 className="mt-5 text-4xl xl:text-5xl font-black tracking-tight text-stone-950 dark:text-stone-50 leading-[0.98]">
                Học tài chính theo cách gọn, rõ và đủ động lực để theo lâu dài
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-stone-600 dark:text-stone-300">
                Vào lại hành trình của bạn, tiếp tục đúng bài đang học dở và để hệ thống tự giữ nhịp bằng quiz, ghi chú và Spaced Repetition.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/50 p-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <p className="mt-3 text-sm font-bold text-stone-900 dark:text-stone-100">Không cần trả phí</p>
                  <p className="mt-1 text-xs leading-5 text-stone-500 dark:text-stone-400">Học toàn bộ nội dung mà không cần thẻ.</p>
                </div>
                <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/50 p-4">
                  <BarChart3 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <p className="mt-3 text-sm font-bold text-stone-900 dark:text-stone-100">Tiến độ thật</p>
                  <p className="mt-1 text-xs leading-5 text-stone-500 dark:text-stone-400">Lưu bài học, XP, streak và thống kê học tập.</p>
                </div>
                <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/50 p-4">
                  <CheckCircle2 className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  <p className="mt-3 text-sm font-bold text-stone-900 dark:text-stone-100">Đi từng chặng</p>
                  <p className="mt-1 text-xs leading-5 text-stone-500 dark:text-stone-400">Không bị ngợp vì đã có lộ trình rõ ràng.</p>
                </div>
              </div>

              <div className="mt-7 rounded-[28px] border border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/45 p-4 shadow-[0_30px_80px_-50px_rgba(28,25,23,0.4)]">
                <div className="mb-3 flex items-center gap-2.5">
                  <Logo size={28} />
                  <div>
                    <p className="text-sm font-bold text-stone-900 dark:text-stone-100">Chọn lộ trình rồi vào học ngay</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">Bạn có thể đổi hướng học sau trong phần cài đặt.</p>
                  </div>
                </div>
                <TrackPreviewPanel previewTrack={previewTrack} setPreviewTrack={setPreviewTrack} compact />
              </div>
            </div>
          </div>

          <div className="w-full max-w-md lg:max-w-none mx-auto">
            <div className="flex items-center gap-2.5 mb-6 lg:hidden">
              <Logo size={26} />
              <span className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                Tự Học Tài Chính
              </span>
            </div>

            <div className="bg-white/95 dark:bg-stone-900/95 border border-stone-200/90 dark:border-stone-800 rounded-[28px] shadow-[0_30px_80px_-45px_rgba(28,25,23,0.35)] dark:shadow-black/30 overflow-hidden backdrop-blur">
              <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />
              <div className="p-7 xl:p-8 space-y-5">
                <div className="lg:hidden rounded-2xl border border-emerald-100 dark:border-emerald-900 bg-emerald-50/70 dark:bg-emerald-950/25 px-4 py-3">
                  <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    Học 300+ bài miễn phí, lưu tiến độ thật trên tài khoản của bạn.
                  </p>
                </div>

            {/* Form Title */}
                <div>
                  <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                    {mode === "login" ? "Đăng nhập" : mode === "signup" ? "Tạo tài khoản" : "Quên mật khẩu"}
                  </h1>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-6">
                    {mode === "login"
                      ? "Quay lại dashboard, tiếp tục bài đang học và xem lại tiến độ của bạn."
                      : mode === "signup"
                        ? "Bắt đầu hành trình học tài chính của riêng bạn chỉ trong chưa tới một phút."
                        : "Nhập email để nhận link đặt lại mật khẩu và quay lại học tiếp."}
                  </p>
                </div>

            {mode !== "forgot" && (
              <>
                {/* Google Login Button */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100 py-3.5 rounded-2xl font-bold text-base transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
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
                  <div className="flex-1 border-t border-stone-100 dark:border-stone-800" />
                  <span className="px-3 text-xs text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wider">
                    Hoặc email
                  </span>
                  <div className="flex-1 border-t border-stone-100 dark:border-stone-800" />
                </div>
              </>
            )}

            {mode === "forgot" ? (
              resetSent ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400 text-sm font-semibold rounded-xl px-4 py-4 text-center">
                  Đã gửi email tới <strong>{email}</strong>. Mở email và bấm vào link để đặt lại mật khẩu.
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
                      Địa chỉ email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@vi-du.com"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100 text-base placeholder:text-stone-300 dark:placeholder:text-stone-600"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-xs font-semibold rounded-xl px-4 py-3">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 py-4 rounded-xl font-bold text-base transition-colors disabled:opacity-60 mt-2"
                  >
                    {loading ? "Đang gửi..." : "Gửi email đặt lại mật khẩu"}
                  </button>
                </form>
              )
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
                      Tên của bạn
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100 text-base placeholder:text-stone-300 dark:placeholder:text-stone-600"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
                    Địa chỉ email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@vi-du.com"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100 text-base placeholder:text-stone-300 dark:placeholder:text-stone-600"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
                      Mật khẩu
                    </label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode("forgot");
                          setError("");
                          setResetSent(false);
                        }}
                        className="text-xs font-semibold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:underline"
                      >
                        Quên mật khẩu?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100 text-base placeholder:text-stone-300 dark:placeholder:text-stone-600"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-xs font-semibold rounded-xl px-4 py-3">
                    <p>{error}</p>
                  </div>
                )}

                {cooldownUntil && (
                  <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-400 text-xs font-semibold rounded-xl px-4 py-3">
                    Quá nhiều lần thử. Vui lòng đợi {cooldownLeft} giây rồi thử lại.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !!cooldownUntil}
                  className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 py-4 rounded-2xl font-bold text-base transition-colors disabled:opacity-60 mt-2"
                >
                  {loading
                    ? "Đang xử lý..."
                    : mode === "login"
                      ? "Đăng nhập"
                      : "Đăng ký"}
                </button>
              </form>
            )}

            {/* Mode Toggle */}
            <div className="text-center text-sm text-stone-600 dark:text-stone-400">
              {mode === "login" ? (
                <>
                  Chưa có tài khoản?{" "}
                  <button
                    onClick={() => {
                      setMode("signup");
                      setError("");
                    }}
                    className="text-stone-900 dark:text-stone-100 font-bold hover:underline"
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
                      setResetSent(false);
                    }}
                    className="text-stone-900 dark:text-stone-100 font-bold hover:underline"
                  >
                    Đăng nhập
                  </button>
                </>
              )}
            </div>

            <p className="text-center text-xs text-stone-400 dark:text-stone-600 mt-4 px-2">
              Bằng việc tiếp tục, bạn đồng ý với{" "}
              <Link href="/dieu-khoan" className="underline underline-offset-2 hover:text-stone-600 dark:hover:text-stone-400">
                Điều khoản sử dụng
              </Link>{" "}
              và{" "}
              <Link href="/chinh-sach-bao-mat" className="underline underline-offset-2 hover:text-stone-600 dark:hover:text-stone-400">
                Chính sách bảo mật
              </Link>
              .
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
