"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { roundedLessonCount } from "@/lib/track-totals";
import { translateAuthError, isUnconfirmedEmailError } from "@/lib/auth-error-messages";
import { stashReferralCodeFromUrl } from "@/lib/referrals";
import { safeNextPath } from "@/lib/safe-next-path";
import { rememberOAuthNext } from "@/lib/oauth-next-cookie";
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
  // Tài khoản đã tồn tại nhưng chưa bấm link trong hộp thư. Trạng thái riêng
  // chứ không phải một chuỗi trong `error`, vì nó cần một NÚT đi kèm - và câu
  // thông báo trong lib/auth-error-messages.ts đã hứa cái nút đó từ đầu ("hoặc
  // gửi lại email xác nhận bên dưới") trong khi không có gì ở dưới cả.
  const [needsEmailConfirm, setNeedsEmailConfirm] = useState(false);
  const [confirmResent, setConfirmResent] = useState(false);

  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const failedAttemptsRef = useRef(0);
  const [previewTrack, setPreviewTrack] = useState<TrackId>("personal");
  // Same endpoint HomePage.tsx uses for its live counter - kept as a plain
  // rounded-down floor (not the animated count) since this is inline copy,
  // not a hero stat. Falls back to null (renders nothing extra) if the
  // fetch fails, rather than showing a stale hardcoded number.
  // Khởi tạo bằng con số THẬT lúc build, không phải `null` rồi rơi về 360.
  //
  // 360 là số gõ tay từ hồi kho có ngần ấy bài; hôm nay là 813, nên lần vẽ đầu
  // của trang đăng nhập in ra một con số lệch 450 rồi mới nhảy khi fetch về.
  // TOTAL_LESSONS đọc từ chính kho bài lúc build nên nó không lệch được, và
  // dùng nó thì không còn nhấp nháy.
  //
  // VẪN GIỮ lời gọi API bên dưới: nó đếm sau khi lọc cờ `is_visible` của bảng
  // `lessons`, thứ chỉ biết được lúc chạy. Hằng số là điểm khởi đầu đúng, còn
  // API là con số chính xác - xem ghi chú ở lib/track-totals.ts về việc hai
  // con số này trả lời hai câu hỏi khác nhau.
  const [lessonCountFloor, setLessonCountFloor] = useState<number>(roundedLessonCount());

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
      setError(format(t.login.tooManyAttempts, { seconds: cooldownLeft }));
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        // Validate inputs
        if (!name.trim() || !email.trim() || !password.trim()) {
          setError(t.login.fillAllSignup);
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError(t.login.passwordTooShort);
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
          setError(translateAuthError(signupError.message, t));
          setLoading(false);
          return;
        }

        // Auto-login after successful signup
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: email.toLowerCase().trim(),
          password: password,
        });

        if (loginError) {
          // Nếu dự án bật xác nhận email thì bước tự đăng nhập này LUÔN hỏng,
          // và lời khuyên cũ - "vui lòng đăng nhập thủ công" - dẫn người mới
          // đăng ký thẳng vào một lần thất bại nữa với đúng lý do đó. Phân
          // biệt ra để nói đúng việc cần làm: mở hộp thư.
          if (isUnconfirmedEmailError(loginError.message)) {
            setNeedsEmailConfirm(true);
            setError("");
          } else {
            setError(t.login.signupNoAutoLogin);
          }
          setLoading(false);
          return;
        }

        failedAttemptsRef.current = 0;
        router.push(nextPath);
        return;
      } else {
        // Login mode
        if (!email.trim() || !password.trim()) {
          setError(t.login.fillEmailPassword);
          setLoading(false);
          return;
        }

        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: email.toLowerCase().trim(),
          password: password,
        });

        if (loginError) {
          // Email chưa xác nhận KHÔNG phải một lần đăng nhập sai, nên nó
          // không tính vào bộ đếm khoá 5 lần: gõ đúng mật khẩu mà bị khoá vì
          // chưa bấm link trong hộp thư là phạt nhầm người.
          if (isUnconfirmedEmailError(loginError.message)) {
            setNeedsEmailConfirm(true);
            setError("");
          } else {
            registerFailedAttempt();
            setError(translateAuthError(loginError.message, t));
          }
          setLoading(false);
          return;
        }

        failedAttemptsRef.current = 0;
        router.push(nextPath);
      }
    } catch {
      setError(t.login.genericError);
      setLoading(false);
    }
  }

  // Gửi lại email xác nhận đăng ký. Dùng đúng emailRedirectTo như lúc đăng ký,
  // nếu không thì link trong thư thứ hai đưa người dùng về một nơi khác thư
  // thứ nhất.
  async function handleResendConfirmation() {
    if (!email.trim() || loading) return;
    setLoading(true);
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: email.toLowerCase().trim(),
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (resendError) {
        setError(translateAuthError(resendError.message, t));
      } else {
        setConfirmResent(true);
      }
    } catch {
      setError(t.login.genericError);
    } finally {
      setLoading(false);
    }
  }

  // Handle "forgot password" - sends a Supabase recovery email
  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError(t.login.enterEmail);
      return;
    }

    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.toLowerCase().trim(), {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (resetError) {
        setError(translateAuthError(resetError.message, t));
        setLoading(false);
        return;
      }

      setResetSent(true);
      setLoading(false);
    } catch {
      setError(t.login.genericError);
      setLoading(false);
    }
  }

  // Handle Google OAuth
  async function handleGoogleLogin() {
    setError("");
    setLoading(true);

    try {
      // Đặt TRƯỚC khi gọi: signInWithOAuth điều hướng trình duyệt đi ngay, nên
      // bất kỳ dòng nào sau nó đều có thể không kịp chạy.
      rememberOAuthNext(nextPath);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // `redirectTo` KHÔNG mang query. Supabase khớp URL này với danh
          // sách Redirect URLs trên TOÀN BỘ chuỗi, nên một mục đăng ký không
          // có ký tự đại diện sẽ không khớp khi có `?next=` phía sau - và khi
          // không khớp thì nó rơi về Site URL kèm `?code=`, tức trang chủ, và
          // lần đăng nhập ấy không bao giờ hoàn tất. Xem
          // lib/oauth-next-cookie.ts.
          //
          // `next` vẫn phải đi vòng qua Google rồi quay lại - callback là route
          // handler chạy trên server, nó không thấy `?next=` của trang này -
          // nên nó đi bằng cookie, đặt ngay trên dòng gọi hàm này.
          redirectTo: `${window.location.origin}/auth/callback`,
          // Without this, Google silently reuses whichever account is
          // already active in the browser session instead of showing the
          // account chooser - a problem on shared/multi-account devices
          // where that's rarely the account the person meant to use.
          queryParams: { prompt: "select_account" },
        },
      });

      if (error) {
        setError(translateAuthError(error.message, t));
        setLoading(false);
      }
    } catch {
      setError(t.login.genericError);
      setLoading(false);
    }
  }

  return (
    /* Modern Editorial EdTech, khớp với components/home/HomePage.tsx: nền
       #fbfaf7 phẳng, số chương + gạch mảnh thay cho thẻ nổi, và xanh lá chỉ
       dùng ở chỗ mang nghĩa.

       Nền cũ là bốn lớp gradient chồng nhau có cả xanh dương (59,130,246) lẫn
       tím (167,139,250), cộng ba quả cầu blur-3xl bay phía sau - đó là thứ tạo
       ra cảm giác SaaS mà trang chủ đã bỏ. Không thay bằng gradient khác, thay
       bằng KHÔNG gradient: trang chủ dùng đúng một màu nền và để chữ làm việc. */
    <div className="relative min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-[#fbfaf7] dark:bg-stone-950 px-4 sm:px-6 lg:px-8 py-3 lg:py-4 flex flex-col justify-between transition-colors duration-300">
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

        <div className="grid gap-8 lg:gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,400px)] lg:items-center my-auto flex-1">
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {/* Con số vàng nhạt phía sau - mượn đúng thủ pháp của trang chủ.
                Đây là phần "có chiều sâu, không vô trùng": nó là hoa văn chứ
                không phải một hiệu ứng phát sáng. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-4 -top-14 select-none text-[110px] font-black leading-none text-[#FFCD00]/10"
            >
              01
            </div>

            <div className="relative max-w-xl">
              <div className="flex items-baseline gap-3">
                <span className="shrink-0 font-black tabular-nums leading-none text-[1.75rem] text-stone-300 dark:text-stone-700">
                  01
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400 sm:text-[11px]">
                  {t.login.freeForever}
                </span>
              </div>

              <div className="mt-3 h-px w-full bg-stone-300/70 dark:bg-stone-700/70" />

              <h1 className="mt-3.5 text-[1.9rem] xl:text-[2.25rem] font-black tracking-tight text-stone-950 dark:text-stone-50 leading-[1.08] text-balance">
                {t.login.heroTitle}
              </h1>
              <p className="mt-2.5 max-w-lg text-[13px] leading-6 text-stone-600 dark:text-stone-400">
                {t.login.heroBody}
              </p>

              {/* Ba lợi ích: cùng nội dung, bỏ ba cái thẻ. Chia bằng gạch dọc
                  mảnh và bỏ ba màu icon xanh lá / xanh dương / tím vốn là thứ
                  làm trang này trông như một bảng giá SaaS.
                  Xếp NGANG chứ không dọc, và đó không phải chuyện thẩm mỹ: khối
                  bọc ngoài là `lg:overflow-hidden`, nên một cột trái cao quá
                  viewport bị CẮT chứ không cuộn được. Bản danh sách dọc đo được
                  770px trong khung 720px và ăn mất đáy khối xem trước. */}
              <dl className="mt-5 grid grid-cols-3 divide-x divide-stone-200 border-y border-stone-200 py-2.5 dark:divide-stone-800 dark:border-stone-800">
                {[
                  { t: t.login.perk1Title, b: t.login.perk1Body },
                  { t: t.login.perk2Title, b: t.login.perk2Body },
                  { t: t.login.perk3Title, b: t.login.perk3Body },
                ].map((perk, i) => (
                  <div key={perk.t} className={i === 0 ? "pr-4" : i === 2 ? "pl-4" : "px-4"}>
                    <span aria-hidden="true" className="block h-1 w-5 bg-emerald-600 dark:bg-emerald-500" />
                    <dt className="mt-1.5 text-[13px] font-black text-stone-900 dark:text-stone-100">{perk.t}</dt>
                    <dd className="mt-0.5 text-[12px] leading-5 text-stone-600 dark:text-stone-400">{perk.b}</dd>
                  </div>
                ))}
              </dl>

              {/* Một khối xem trước duy nhất, đóng khung bằng nhãn + gạch mảnh
                  thay vì một thẻ bo tròn có đổ bóng. */}
              <div className="mt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                    {t.login.trackPickTitle}
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">{t.login.trackPickBody}</span>
                </div>
                <div className="mt-2 h-px w-full bg-stone-300/70 dark:bg-stone-700/70" />
                <div className="mt-2.5">
                  <TrackPreviewPanel previewTrack={previewTrack} setPreviewTrack={setPreviewTrack} compact />
                </div>
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

            {/* Thẻ form: bo 16px thay vì 32, viền đặc thay vì trong mờ, bóng nhẹ
                thay cho bóng 90px, và bỏ backdrop-blur cùng dải gradient ba màu
                ở mép trên. Vẫn là thẻ nổi duy nhất trên trang - đó là thứ giữ
                cho nó "premium" mà không cần thêm hiệu ứng nào. */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="p-5 sm:p-6 xl:p-7 space-y-3.5 font-sans">
                <div className="lg:hidden border-l-2 border-emerald-600 dark:border-emerald-500 pl-3">
                  <p className="text-[13px] font-bold text-stone-900 dark:text-stone-100">
                    {format(t.login.lessonCountLine, { count: lessonCountFloor })}
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="shrink-0 font-black tabular-nums leading-none text-[1.4rem] text-stone-300 dark:text-stone-700">
                      02
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">
                      {t.login.brand}
                    </span>
                  </div>
                  <div className="mt-2.5 mb-3 h-px w-full bg-stone-200 dark:bg-stone-800" />
                  <h1 className="text-[1.6rem] font-black leading-[1.15] tracking-tight text-stone-950 dark:text-stone-50 mb-1.5">
                    {mode === "login" ? t.login.modeLogin : mode === "signup" ? t.login.modeSignup : t.login.modeForgot}
                  </h1>
                  <p className="text-[13px] leading-6 text-stone-600 dark:text-stone-400">
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
                      className="button-premium w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950/40 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100 py-2.5 rounded-lg font-bold text-[13px] transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/30 cursor-pointer"
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
                    <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400 text-[13px] font-semibold rounded-lg px-3.5 py-3 text-center">
                      {t.login.resetSentPart1}
                      <strong>{email}</strong>
                      {t.login.resetSentPart2}
                    </div>
                  ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-3">
                      <div className="space-y-1">
                        {/* KHÔNG dùng .input-premium ở đây nữa. Lớp đó trong
                            globals.css đặt cứng `background: rgba(255,255,255,.88)`
                            và KHÔNG có bản `.dark`, nên ở chế độ tối nó thắng
                            `dark:bg-stone-800` - ô nhập sáng trắng trong khi chữ
                            là `dark:text-stone-100`, tức gõ xong gần như không
                            đọc được. Nó cũng đặt cứng `border-radius: 18px`, ghi
                            đè luôn bo góc của trang này. Viết thẳng bằng Tailwind
                            thì cả hai vấn đề biến mất và không đụng globals.css. */}
                        <label className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.18em] block">
                          {t.login.emailLabel}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email@vi-du.com"
                          className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-[13px] text-stone-900 transition-colors placeholder:text-stone-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500"
                        />
                      </div>

                      {error && (
                        <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-[13px] font-semibold rounded-lg px-3 py-2">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="button-premium w-full bg-stone-950 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-950 py-3 rounded-lg font-black text-[13px] uppercase tracking-[0.08em] transition-colors duration-200 disabled:opacity-60 mt-1 cursor-pointer"
                      >
                        {loading ? t.login.sending : t.login.sendReset}
                      </button>
                    </form>
                  )
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-2.5">
                    {mode === "signup" && (
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.18em] block">
                          {t.login.nameLabel}
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t.login.namePlaceholder}
                          className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-[13px] text-stone-900 transition-colors placeholder:text-stone-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500"
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.18em] block">
                        {t.login.emailLabel}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@vi-du.com"
                        className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-[13px] text-stone-900 transition-colors placeholder:text-stone-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.18em] block">
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
                        className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-[13px] text-stone-900 transition-colors placeholder:text-stone-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-[13px] font-semibold rounded-lg px-3 py-2">
                        <p>{error}</p>
                      </div>
                    )}

                    {needsEmailConfirm && (
                      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-[13px] font-semibold rounded-lg px-3 py-2.5 space-y-2">
                        <p>{t.login.emailNotConfirmed}</p>
                        {confirmResent ? (
                          <p className="font-bold">{t.login.confirmResent}</p>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendConfirmation}
                            disabled={loading}
                            className="underline font-black disabled:opacity-60 cursor-pointer"
                          >
                            {t.login.resendConfirm}
                          </button>
                        )}
                      </div>
                    )}

                    {cooldownUntil && (
                      <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-400 text-[13px] font-semibold rounded-lg px-3 py-2">
                        {format(t.login.tooManyAttempts, { seconds: cooldownLeft })}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !!cooldownUntil}
                      className="button-premium w-full bg-stone-950 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-950 py-3 rounded-lg font-black text-[13px] uppercase tracking-[0.08em] transition-colors duration-200 disabled:opacity-60 mt-1 cursor-pointer"
                    >
                      {loading ? t.login.processing : mode === "login" ? t.login.modeLogin : t.login.signUp}
                    </button>
                  </form>
                )}

                {/* Ba con số: cùng nội dung, bỏ ba cái thẻ có viền và ba màu
                    icon. Chia bằng gạch dọc mảnh và dùng tabular-nums như dải
                    thống kê ở hero trang chủ, nên giá trị thẳng cột với nhau. */}
                <dl className="grid grid-cols-3 divide-x divide-stone-200 border-t border-stone-200 pt-3 dark:divide-stone-800 dark:border-stone-800">
                  {[
                    { k: t.login.statRating, v: t.login.statRatingValue },
                    { k: t.login.statLessons, v: format(t.login.statLessonsValue, { count: lessonCountFloor }) },
                    { k: t.login.statSupport, v: t.login.statSupportValue },
                  ].map((stat, i) => (
                    <div key={stat.k} className={i === 0 ? "pr-3" : i === 2 ? "pl-3" : "px-3"}>
                      <dd className="text-[13px] font-black tabular-nums text-stone-900 dark:text-stone-100">{stat.v}</dd>
                      <dt className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                        {stat.k}
                      </dt>
                    </div>
                  ))}
                </dl>

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
