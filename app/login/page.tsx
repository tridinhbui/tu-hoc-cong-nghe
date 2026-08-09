"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BarChart3, CheckCircle2, MessageCircleMore, ShieldCheck, Sparkles, Star, Users2 } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { translateAuthError } from "@/lib/auth-error-messages";
import { stashReferralCodeFromUrl } from "@/lib/referrals";
import { safeNextPath } from "@/lib/safe-next-path";
import Logo from "@/components/Logo";
import TrackPreviewPanel from "@/components/login/TrackPreviewPanel";
import { type TrackId } from "@/lib/tracks";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

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
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const nextPath = safeNextPath(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // Khởi tạo từ `?error=`, KHÔNG để rỗng rồi chờ một effect đổ vào.
  //
  // app/auth/callback/route.ts đá người dùng về đây kèm mô tả lỗi mỗi khi
  // đổi mã OAuth thất bại - Google bị huỷ giữa chừng, mã hết hạn, tài khoản
  // bị từ chối. Trước đây trang này chỉ đọc `next` và `mode`, nên tham số ấy
  // rơi vào hư không: người dùng quay lại đúng cái form trắng vừa rời đi,
  // không một dòng nào nói vì sao. Lỗi duy nhất mà họ thấy được là lỗi do
  // chính họ gõ sai mật khẩu.
  const [error, setError] = useState(() => searchParams.get("error") ?? "");
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
  // Same endpoint HomePage.tsx uses for its live counter - kept as a plain
  // rounded-down floor (not the animated count) since this is inline copy,
  // not a hero stat. Falls back to null (renders nothing extra) if the
  // fetch fails, rather than showing a stale hardcoded number.
  const [lessonCountFloor, setLessonCountFloor] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/lesson-count")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count?: number } | null) => {
        if (cancelled || !data?.count) return;
        setLessonCountFloor(Math.floor(data.count / 10) * 10);
      })
      .catch((error) => console.error("Error loading lesson count:", error));
    return () => {
      cancelled = true;
    };
  }, []);

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

  // Stashed to localStorage (not just read here) since an OAuth signup
  // navigates away to Google and back, losing this page's query string -
  // the referral is actually recorded later, after a session exists (see
  // AppNavbar's claimPendingReferral() call).
  useEffect(() => {
    stashReferralCodeFromUrl(searchParams);
  }, [searchParams]);

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.replace(nextPath);
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
        router.push(nextPath);
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
        router.push(nextPath);
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
          // `next` phải đi vòng qua Google rồi quay lại: callback là một route
          // handler chạy trên server, nó không thấy được `?next=` của trang này.
          // Thiếu đoạn này thì đăng nhập bằng email tôn trọng đích đến còn đăng
          // nhập bằng Google thì không - mọi liên kết sâu (bài học được chia sẻ,
          // thông báo đẩy) đều đổ về /dashboard, và người bấm vào không bao giờ
          // tới được thứ họ bấm.
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
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
    <div className="relative min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-[radial-gradient(circle_at_18%_14%,rgba(16,185,129,0.16),transparent_20%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.12),transparent_18%),radial-gradient(circle_at_50%_100%,rgba(167,139,250,0.09),transparent_22%),linear-gradient(180deg,#fbfbfd_0%,#f6f7fb_100%)] dark:bg-[radial-gradient(circle_at_18%_14%,rgba(16,185,129,0.18),transparent_20%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.12),transparent_18%),radial-gradient(circle_at_50%_100%,rgba(167,139,250,0.1),transparent_22%),linear-gradient(180deg,rgba(12,10,9,1),rgba(17,24,39,1))] px-4 sm:px-6 lg:px-8 py-3 lg:py-4 flex flex-col justify-between">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="absolute left-[-8%] top-[-12%] h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[10%] h-80 w-80 rounded-full bg-sky-300/15 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[18%] h-96 w-96 rounded-full bg-violet-300/12 blur-3xl" />
      </motion.div>

      <div className="mx-auto w-full max-w-7xl relative flex-1 flex flex-col justify-between my-auto">
        <div className="shrink-0 mb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.login.backHome}
          </Link>
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,410px)] lg:items-center my-auto flex-1">
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-900 bg-emerald-50/80 dark:bg-emerald-950/30 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                {t.login.freeForever}
              </div>

              <h1 className="mt-3 text-3xl xl:text-4xl font-black tracking-tight text-stone-950 dark:text-stone-50 leading-[1.06] text-balance">
                {t.login.heroTitle}
              </h1>
              <p className="mt-2.5 max-w-lg text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {t.login.heroBody}
              </p>

              <div className="mt-3.5 grid gap-2.5 sm:grid-cols-3">
                <div className="rounded-2xl border border-stone-200/60 dark:border-stone-800/80 bg-white/82 dark:bg-stone-900/60 p-3 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <p className="mt-2 text-xs font-bold text-stone-900 dark:text-stone-100">{t.login.perk1Title}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">{t.login.perk1Body}</p>
                </div>
                <div className="rounded-2xl border border-stone-200/60 dark:border-stone-800/80 bg-white/82 dark:bg-stone-900/60 p-3 shadow-xs">
                  <BarChart3 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <p className="mt-2 text-xs font-bold text-stone-900 dark:text-stone-100">{t.login.perk2Title}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">{t.login.perk2Body}</p>
                </div>
                <div className="rounded-2xl border border-stone-200/60 dark:border-stone-800/80 bg-white/82 dark:bg-stone-900/60 p-3 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <p className="mt-2 text-xs font-bold text-stone-900 dark:text-stone-100">{t.login.perk3Title}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">{t.login.perk3Body}</p>
                </div>
              </div>

              <div className="mt-3.5 rounded-2xl border border-stone-200/60 dark:border-stone-800/80 bg-white/82 dark:bg-stone-900/55 p-3 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <Logo size={24} />
                  <div>
                    <p className="text-xs font-bold text-stone-900 dark:text-stone-100">{t.login.trackPickTitle}</p>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400">{t.login.trackPickBody}</p>
                  </div>
                </div>
                <TrackPreviewPanel previewTrack={previewTrack} setPreviewTrack={setPreviewTrack} compact />
              </div>
            </div>
          </motion.div>

          <div className="w-full max-w-md lg:max-w-none mx-auto">
            <div className="flex items-center gap-2 mb-3 lg:hidden">
              <Logo size={24} />
              <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                {t.login.brand}
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="bg-white/78 dark:bg-stone-900/85 border border-stone-200/70 dark:border-stone-800 rounded-[32px] shadow-[0_35px_90px_-48px_rgba(15,23,42,0.45)] dark:shadow-black/30 overflow-hidden backdrop-blur-xl"
            >
              <div className="h-[3px] bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400" />
              <div className="p-5 sm:p-6 xl:p-7 space-y-3 font-sans">
                <div className="lg:hidden rounded-2xl border border-emerald-100/80 dark:border-emerald-900 bg-gradient-to-r from-emerald-50/75 via-white/70 to-teal-50/70 dark:from-emerald-950/25 dark:via-stone-900/40 dark:to-teal-950/20 px-3.5 py-2.5 shadow-xs">
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {format(t.login.lessonCountLine, { count: lessonCountFloor ?? 360 })}
                  </p>
                </div>

                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 mb-1">
                    {mode === "login" ? t.login.modeLogin : mode === "signup" ? t.login.modeSignup : t.login.modeForgot}
                  </h1>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    {mode === "login"
                      ? t.login.subLogin
                      : mode === "signup"
                        ? t.login.subSignup
                        : t.login.subForgot}
                  </p>
                </div>

                {mode !== "forgot" && (
                  <>
                    <button
                      onClick={handleGoogleLogin}
                      disabled={loading}
                      className="button-premium w-full border border-stone-200/80 dark:border-stone-700/80 bg-white/80 dark:bg-stone-950/40 hover:bg-white dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/10 hover:shadow-md cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      {t.login.google}
                    </button>

                    <div className="relative flex items-center">
                      <div className="flex-1 border-t border-stone-100 dark:border-stone-800" />
                      <span className="px-3 text-[10px] text-stone-500 dark:text-stone-400 font-extrabold uppercase tracking-wider">
                        {t.login.orEmail}
                      </span>
                      <div className="flex-1 border-t border-stone-100 dark:border-stone-800" />
                    </div>
                  </>
                )}

                {mode === "forgot" ? (
                  resetSent ? (
                    <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400 text-xs font-semibold rounded-xl px-3.5 py-3 text-center">
                      {t.login.resetSentPart1}
                      <strong>{email}</strong>
                      {t.login.resetSentPart2}
                    </div>
                  ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
                          {t.login.emailLabel}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email@vi-du.com"
                          className="input-premium w-full px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-300 dark:placeholder:text-stone-600 dark:bg-stone-800 dark:border-stone-700 rounded-xl"
                        />
                      </div>

                      {error && (
                        <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-xs font-semibold rounded-xl px-3 py-2">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="button-premium w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 py-3 rounded-xl font-black text-xs sm:text-sm transition-all duration-200 disabled:opacity-60 mt-1 cursor-pointer"
                      >
                        {loading ? t.login.sending : t.login.sendReset}
                      </button>
                    </form>
                  )
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-2.5">
                    {mode === "signup" && (
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
                          {t.login.nameLabel}
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t.login.namePlaceholder}
                          className="input-premium w-full px-3.5 py-2 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-300 dark:placeholder:text-stone-600 dark:bg-stone-800 dark:border-stone-700 rounded-xl"
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
                        {t.login.emailLabel}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@vi-du.com"
                        className="input-premium w-full px-3.5 py-2 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-300 dark:placeholder:text-stone-600 dark:bg-stone-800 dark:border-stone-700 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
                          {t.login.passwordLabel}
                        </label>
                        {mode === "login" && (
                          <button
                            type="button"
                            onClick={() => {
                              setMode("forgot");
                              setError("");
                              setResetSent(false);
                            }}
                            className="text-[11px] font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:underline"
                          >
                            {t.login.forgotLink}
                          </button>
                        )}
                      </div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                        className="input-premium w-full px-3.5 py-2 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-300 dark:placeholder:text-stone-600 dark:bg-stone-800 dark:border-stone-700 rounded-xl"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-xs font-semibold rounded-xl px-3 py-2">
                        <p>{error}</p>
                      </div>
                    )}

                    {cooldownUntil && (
                      <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-400 text-xs font-semibold rounded-xl px-3 py-2">
                        {format(t.login.tooManyAttempts, { seconds: cooldownLeft })}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !!cooldownUntil}
                      className="button-premium w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 py-3 rounded-xl font-black text-xs sm:text-sm transition-all duration-200 disabled:opacity-60 mt-1 cursor-pointer"
                    >
                      {loading ? t.login.processing : mode === "login" ? t.login.modeLogin : t.login.signUp}
                    </button>
                  </form>
                )}

                <div className="grid gap-2 grid-cols-3">
                  <div className="rounded-xl border border-stone-200/70 bg-stone-50/80 px-2.5 py-2 dark:border-stone-800 dark:bg-stone-950/35">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <p className="text-[9px] font-black uppercase text-stone-400 truncate">{t.login.statRating}</p>
                    </div>
                    <p className="mt-0.5 text-xs font-bold text-stone-900 dark:text-stone-100 truncate">{t.login.statRatingValue}</p>
                  </div>
                  <div className="rounded-xl border border-stone-200/70 bg-stone-50/80 px-2.5 py-2 dark:border-stone-800 dark:bg-stone-950/35">
                    <div className="flex items-center gap-1.5">
                      <Users2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <p className="text-[9px] font-black uppercase text-stone-400 truncate">{t.login.statLessons}</p>
                    </div>
                    <p className="mt-0.5 text-xs font-bold text-stone-900 dark:text-stone-100 truncate">{format(t.login.statLessonsValue, { count: lessonCountFloor ?? 360 })}</p>
                  </div>
                  <div className="rounded-xl border border-stone-200/70 bg-stone-50/80 px-2.5 py-2 dark:border-stone-800 dark:bg-stone-950/35">
                    <div className="flex items-center gap-1.5">
                      <MessageCircleMore className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                      <p className="text-[9px] font-black uppercase text-stone-400 truncate">{t.login.statSupport}</p>
                    </div>
                    <p className="mt-0.5 text-xs font-bold text-stone-900 dark:text-stone-100 truncate">{t.login.statSupportValue}</p>
                  </div>
                </div>

                <div className="text-center text-xs text-stone-600 dark:text-stone-400">
                  {mode === "login" ? (
                    <>
                      {t.login.noAccount}{" "}
                      <button
                        onClick={() => {
                          setMode("signup");
                          setError("");
                        }}
                        className="text-stone-900 dark:text-stone-100 font-bold hover:underline cursor-pointer"
                      >
                        {t.login.signUp}
                      </button>
                    </>
                  ) : (
                    <>
                      {t.login.haveAccount}{" "}
                      <button
                        onClick={() => {
                          setMode("login");
                          setError("");
                          setResetSent(false);
                        }}
                        className="text-stone-900 dark:text-stone-100 font-bold hover:underline cursor-pointer"
                      >
                        {t.login.modeLogin}
                      </button>
                    </>
                  )}
                </div>

                <p className="text-center text-[10px] text-stone-400 dark:text-stone-500 pt-1">
                  {t.login.termsPart1}{" "}
                  <Link href="/dieu-khoan" className="underline underline-offset-2 hover:text-stone-600 dark:hover:text-stone-400">
                    {t.login.terms}
                  </Link>{" "}
                  {t.login.termsAnd}{" "}
                  <Link href="/chinh-sach-bao-mat" className="underline underline-offset-2 hover:text-stone-600 dark:hover:text-stone-400">
                    {t.login.privacy}
                  </Link>
                  .
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
