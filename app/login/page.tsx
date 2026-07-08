"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { GraduationCap, Gauge, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { translateAuthError, isUnconfirmedEmailError } from "@/lib/auth-error-messages";
import { TRACKS, type TrackId } from "@/lib/tracks";
import TrackPreviewPanel from "@/components/login/TrackPreviewPanel";
import Logo from "@/components/Logo";

const MAX_ATTEMPTS = 5;
const COOLDOWN_MS = 60_000;

const TRUST_HIGHLIGHTS = [
  { icon: Sparkles, label: "Tất cả bài học miễn phí" },
  { icon: GraduationCap, label: "Lộ trình rõ ràng, có kiểm tra sau mỗi bài" },
  { icon: Gauge, label: "Học theo tốc độ của riêng bạn" },
] as const;

// Reads Supabase env vars at render time - never prerender statically.
export const dynamic = "force-dynamic";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [name, setName] = useState("");
  const [previewTrack, setPreviewTrack] = useState<TrackId>("personal");
  const [resetSent, setResetSent] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [resendingConfirmation, setResendingConfirmation] = useState(false);
  const [confirmationResent, setConfirmationResent] = useState(false);
  const [showResendConfirmation, setShowResendConfirmation] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [cooldownLeft, setCooldownLeft] = useState(0);

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
        setFailedAttempts(0);
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [cooldownUntil]);

  const registerFailedAttempt = () => {
    setFailedAttempts((prev) => {
      const next = prev + 1;
      if (next >= MAX_ATTEMPTS) {
        setCooldownUntil(Date.now() + COOLDOWN_MS);
      }
      return next;
    });
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
    setConfirmationResent(false);
    setShowResendConfirmation(false);

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
          },
        });

        if (signupError) {
          registerFailedAttempt();
          setError(translateAuthError(signupError.message));
          setLoading(false);
          return;
        }

        setError("");
        setPassword("");
        setName("");
        setSignupSuccess(true);
        toast.success("Đã tạo tài khoản! Kiểm tra email để xác nhận trước khi đăng nhập.");
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
          registerFailedAttempt();
          setShowResendConfirmation(isUnconfirmedEmailError(loginError.message));
          setError(translateAuthError(loginError.message));
          setLoading(false);
          return;
        }

        setFailedAttempts(0);
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  async function handleResendConfirmation() {
    if (!email.trim()) return;
    setResendingConfirmation(true);
    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email: email.toLowerCase().trim(),
    });
    setResendingConfirmation(false);
    if (resendError) {
      setError(translateAuthError(resendError.message));
      return;
    }
    setConfirmationResent(true);
    toast.success("Đã gửi lại email xác nhận.");
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
        setError(translateAuthError(error.message));
        setLoading(false);
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 flex">
      {/* ── LEFT SIDE: Hero + Info ── */}
      <div className="hidden lg:flex flex-col w-1/2 bg-white dark:bg-stone-950 px-12 py-16 justify-between">
        <div className="space-y-12">
          {/* Logo & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Logo size={28} />
              <div className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                Tự Học Tài Chính
              </div>
            </div>
            <h1 className="text-5xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
              Hiểu tiền bạc,<br />quản lý tài sản
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-md">
              200+ bài học miễn phí từ vỡ lòng đến phân tích doanh nghiệp. Chọn lộ trình phù hợp, học theo tốc độ của bạn.
            </p>

            {/* Trust highlights - gives a cold visitor a reason to stay before hitting the auth form */}
            <ul className="space-y-2.5 pt-2">
              {TRUST_HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-stone-600 dark:text-stone-400">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-900 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <TrackPreviewPanel previewTrack={previewTrack} setPreviewTrack={setPreviewTrack} />
        </div>

      </div>

      {/* ── RIGHT SIDE: Form ── */}
      <div className="w-full lg:w-1/2 bg-stone-50 dark:bg-stone-900/50 flex flex-col items-center justify-center px-6 py-16 lg:py-0">
        <div className="w-full max-w-sm">
          {/* Mobile Brand (visible on small screens) */}
          <div className="lg:hidden space-y-4 mb-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <Logo size={24} />
              <div className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                Tự Học Tài Chính
              </div>
            </div>
            <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100">
              Hiểu tiền bạc
            </h1>
          </div>

          {/* Mobile: same interactive track tabs as desktop, just more compact */}
          <div className="lg:hidden">
            <TrackPreviewPanel previewTrack={previewTrack} setPreviewTrack={setPreviewTrack} compact />
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 space-y-6">
            {/* Form Title */}
            <div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                {mode === "login" ? "Đăng nhập" : mode === "signup" ? "Đăng ký" : "Quên mật khẩu"}
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                {mode === "login"
                  ? "Đăng nhập để tiếp tục học"
                  : mode === "signup"
                    ? "Tạo tài khoản để bắt đầu học"
                    : "Nhập email để nhận link đặt lại mật khẩu"}
              </p>
            </div>

            {mode !== "forgot" && (
              <>
                {/* Google Login Button */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100 py-3 rounded-xl font-bold text-base transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
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
            ) : mode === "signup" && signupSuccess ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400 text-sm font-semibold rounded-xl px-4 py-4 text-center space-y-3">
                <p>
                  Đã tạo tài khoản cho <strong>{email}</strong>! Kiểm tra email và bấm vào link xác nhận trước khi đăng nhập.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setSignupSuccess(false);
                  }}
                  className="text-emerald-900 dark:text-emerald-300 underline underline-offset-2 font-bold"
                >
                  Đến trang đăng nhập
                </button>
              </div>
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
                  <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-xs font-semibold rounded-xl px-4 py-3 space-y-2">
                    <p>{error}</p>
                    {mode === "login" && showResendConfirmation && !confirmationResent && (
                      <button
                        type="button"
                        onClick={handleResendConfirmation}
                        disabled={resendingConfirmation}
                        className="text-red-800 dark:text-red-300 underline underline-offset-2 font-bold disabled:opacity-60"
                      >
                        {resendingConfirmation ? "Đang gửi lại..." : "Gửi lại email xác nhận"}
                      </button>
                    )}
                    {confirmationResent && <p className="text-emerald-700 dark:text-emerald-400">Đã gửi lại email xác nhận.</p>}
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
                  className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 py-4 rounded-xl font-bold text-base transition-colors disabled:opacity-60 mt-2"
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
                      setSignupSuccess(false);
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
                      setSignupSuccess(false);
                    }}
                    className="text-stone-900 dark:text-stone-100 font-bold hover:underline"
                  >
                    Đăng nhập
                  </button>
                </>
              )}
            </div>

          </div>

          <p className="text-center text-xs text-stone-400 dark:text-stone-600 mt-4">
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
  );
}
