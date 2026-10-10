"use client";

import { MIN_PASSWORD_LENGTH } from "@/lib/auth/password-policy";
import React, { Suspense, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { roundedLessonCount } from "@/lib/track-totals";
import { translateAuthErrorCode } from "@/lib/auth-error-messages";
import { stashReferralCodeFromUrl } from "@/lib/referrals";
import { safeNextPath } from "@/lib/safe-next-path";
import { rememberOAuthNext } from "@/lib/oauth-next-cookie";
import { resetCurrentUserCache } from "@/lib/current-user";
import Logo from "@/components/Logo";
import TrackPreviewPanel from "@/components/login/TrackPreviewPanel";
import { TRACKS, type TrackId } from "@/lib/tracks";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { CropMarks, Frame, Stamp, Sys, btnPrimary, btnSecondary } from "@/components/ui/system";
import { LoadBar, Scramble, TypeText } from "@/components/ui/effects";

/* i18n-ignore-start: định danh hệ thống (đường dẫn THCN://) - cùng một chuỗi ở
   mọi ngôn ngữ, như tên tệp; không phải chữ để dịch. */
const SYS = {
  root: "THCN://AUTH",
  login: "THCN://AUTH/LOGIN",
  signup: "THCN://AUTH/SIGNUP",
  forgot: "THCN://AUTH/RESET",
  id: (n: number) => String(n).padStart(2, "0"),
  os: "THCN_OS · AUTH",
  ok: "[ OK ]",
};
/* i18n-ignore-end */

// Viết thẳng bằng Tailwind, KHÔNG dùng .input-premium: lớp đó trong globals.css
// đặt cứng `background: rgba(255,255,255,.88)` không có bản `.dark` (ô nhập
// sáng trắng với chữ sáng ở chế độ tối) và `border-radius: 18px`.
const INPUT_CLASS =
  "w-full border border-line bg-surface px-3.5 py-2.5 text-[14px] text-ink-max transition-colors placeholder:text-ink-faint focus:border-brand-600 focus:outline-none dark:focus:border-brand-400";
const LABEL_CLASS = "block font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink-muted";
const ERROR_CLASS =
  "border-2 border-danger-line bg-red-50 px-3 py-2 text-[13px] font-semibold text-danger dark:bg-red-950/50";

const MAX_ATTEMPTS = 5;
const COOLDOWN_MS = 60_000;

// Đọc cookie phiên lúc chạy (qua /api/auth/me) - không prerender tĩnh.
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
  // a short wait before allowing another attempt. Cloudflare also rate-limits
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
    let cancelled = false;
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((body: { user: unknown }) => {
        if (!cancelled && body.user) router.replace(nextPath);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [router, nextPath]);

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
        if (password.length < MIN_PASSWORD_LENGTH) {
          setError(t.login.passwordTooShort);
          setLoading(false);
          return;
        }

        // Một lượt gọi duy nhất: /api/auth/sign-up vừa tạo tài khoản vừa cấp
        // phiên ngay (xem lib/auth/service.ts). Không còn bước "đăng nhập lại
        // sau khi đăng ký" như Cloudflare, vì hệ mới không có xác nhận email -
        // không có trạng thái "chưa xác nhận" để xử lý riêng nữa.
        const res = await fetch("/api/auth/sign-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.toLowerCase().trim(),
            password,
            name: name.trim(),
          }),
        });
        const body = (await res.json().catch(() => ({}))) as { error?: string; code?: string };

        if (!res.ok) {
          registerFailedAttempt();
          setError(translateAuthErrorCode(body.code, t));
          setLoading(false);
          return;
        }

        failedAttemptsRef.current = 0;
        resetCurrentUserCache();
        router.push(nextPath);
        return;
      } else {
        // Login mode
        if (!email.trim() || !password.trim()) {
          setError(t.login.fillEmailPassword);
          setLoading(false);
          return;
        }

        const res = await fetch("/api/auth/sign-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.toLowerCase().trim(), password }),
        });
        const body = (await res.json().catch(() => ({}))) as { error?: string; code?: string };

        if (!res.ok) {
          registerFailedAttempt();
          setError(translateAuthErrorCode(body.code, t));
          setLoading(false);
          return;
        }

        failedAttemptsRef.current = 0;
        resetCurrentUserCache();
        router.push(nextPath);
      }
    } catch {
      setError(t.login.genericError);
      setLoading(false);
    }
  }

  // Quên mật khẩu. Route LUÔN trả về như nhau kể cả khi email không có tài
  // khoản - xem app/api/auth/reset-request/route.ts về lý do (chống dò email).
  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError(t.login.enterEmail);
      return;
    }

    setLoading(true);
    try {
      await fetch("/api/auth/reset-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });
      setResetSent(true);
      setLoading(false);
    } catch {
      setError(t.login.genericError);
      setLoading(false);
    }
  }

  // Đăng nhập Google. Chỉ còn một điều hướng thẳng - toàn bộ phần bắt tay
  // (PKCE, state) nằm ở app/api/auth/google/start, không phải ở đây.
  function handleGoogleLogin() {
    setError("");
    setLoading(true);
    // Đặt TRƯỚC khi điều hướng đi: trang rời đi ngay sau dòng này, nên bất kỳ
    // dòng nào sau nó đều có thể không kịp chạy. Route callback đọc lại cookie
    // này - xem app/api/auth/google/callback/route.ts.
    rememberOAuthNext(nextPath);
    window.location.href = "/api/auth/google/start";
  }

  const modeCode = mode === "login" ? SYS.login : mode === "signup" ? SYS.signup : SYS.forgot;
  const word = mode === "login" ? t.login.v2.wordLogin : mode === "signup" ? t.login.v2.wordSignup : t.login.v2.wordForgot;
  const status = loading
    ? t.login.v2.statusBusy
    : error
      ? t.login.v2.statusError
      : resetSent
        ? t.login.v2.statusSent
        : t.login.v2.statusIdle;

  return (
    /* Cùng ngôn ngữ với trang chủ biên tập (components/home/v2/kit.tsx): giấy
       ngà bẩn, nét mực 2px, không bo góc, không bóng; xanh brand là màu tín
       hiệu. Cột trái là trang bìa của "cửa vào" - chữ khổng lồ giải mã theo
       chế độ, terminal khởi động; cột phải là công cụ: form trong một Frame. */
    <div className="relative min-h-screen bg-[#eeebe3] text-ink-max dark:bg-[#0c0d10]">
      {/* Dòng đầu tài liệu. */}
      <div className="border-b border-line">
        <div className="mx-auto flex h-11 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-wide hover:text-accent-strong">
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.login.backHome}
          </Link>
          <Sys className="hidden text-ink-muted sm:inline">{t.login.v2.doc}</Sys>
          <Sys className="text-accent-strong">{modeCode}</Sys>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:gap-0 lg:px-8 lg:py-0">
        {/* ── Trang bìa ── */}
        <div className="min-w-0 lg:col-span-7 lg:border-r-2 lg:border-line-strong lg:py-12 lg:pr-10">
          <div className="flex items-center gap-2.5">
            <Logo size={24} />
            <span className="text-[13px] font-black uppercase tracking-[0.04em]">{t.login.brand}</span>
            <Stamp className="thcn-stamp ml-auto hidden sm:inline-block">{t.login.freeForever}</Stamp>
          </div>

          <p className="mt-6 whitespace-nowrap text-[17vw] font-black uppercase leading-[0.95] tracking-[-0.05em] text-accent sm:text-[12vw] lg:text-[6.8rem] xl:text-[8rem]">
            <Scramble key={mode} text={word} duration={650} />
          </p>

          <h1 className="mt-4 max-w-xl text-[1.35rem] font-black leading-[1.2] tracking-[-0.02em] sm:text-[1.6rem]">
            {t.login.heroTitle}
          </h1>
          <p className="mt-3 max-w-lg text-[14px] leading-6 text-ink-soft">{t.login.heroBody}</p>

          {/* Terminal khởi động - cùng mô-típ với hero trang chủ. */}
          <div className="mt-7 hidden max-w-xl border border-line bg-[#0d0e11] font-mono text-[11.5px] text-[#eeebe3] sm:block">
            <div className="flex items-center justify-between border-b border-white/20 px-3 py-1.5">
              <span className="text-brand-300">{SYS.os}</span>
              <span className="thcn-blink h-2 w-2 bg-brand-400" aria-hidden />
            </div>
            <ol className="px-3 py-2 leading-[1.7]">
              {t.login.v2.boot.map((line, i) => (
                <li key={line} className="flex gap-2">
                  <span className="text-brand-400">{SYS.ok}</span>
                  <TypeText
                    text={format(line, { count: lessonCountFloor })}
                    speed={16}
                    delay={i * 420}
                    cursor={i === t.login.v2.boot.length - 1}
                    className="font-sans"
                  />
                </li>
              ))}
            </ol>
          </div>

          <dl className="mt-7 grid max-w-xl border border-line sm:grid-cols-3">
            {[
              { t: t.login.perk1Title, b: t.login.perk1Body },
              { t: t.login.perk2Title, b: t.login.perk2Body },
              { t: t.login.perk3Title, b: t.login.perk3Body },
            ].map((perk, i) => (
              <div key={perk.t} className={`p-3 ${i > 0 ? "border-t border-line-strong sm:border-l sm:border-t-0" : ""}`}>
                <Sys className="text-accent-strong">{SYS.id(i + 1)}</Sys>
                <dt className="mt-1 text-[13px] font-black">{perk.t}</dt>
                <dd className="mt-0.5 text-[12px] leading-5 text-ink-soft">{perk.b}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 hidden max-w-xl lg:block">
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-1.5">
              <Sys className="text-accent-strong">{t.login.trackPickTitle}</Sys>
              <span className="text-[11px] text-ink-muted">{t.login.trackPickBody}</span>
            </div>
            <div className="mt-3">
              <TrackPreviewPanel previewTrack={previewTrack} setPreviewTrack={setPreviewTrack} compact />
            </div>
          </div>
        </div>

        {/* ── Form ── */}
        {/* order-first: ở điện thoại form đứng trên trang bìa - người vừa bấm "Bắt đầu" cần ô nhập, không phải ba ô lợi ích. Từ lg hai cột giữ thứ tự DOM. */}
        <div className="order-first min-w-0 lg:order-none lg:col-span-5 lg:py-12 lg:pl-10">
          <div className="relative lg:sticky lg:top-8">
            <CropMarks className="border-brand-600" />
            <Frame title={modeCode} meta={status} bodyClassName="p-5 sm:p-6 xl:p-7 space-y-4">
              <div>
                <h2 className="text-[1.9rem] font-black uppercase leading-none tracking-[-0.03em]">
                  <Scramble key={mode} text={mode === "login" ? t.login.modeLogin : mode === "signup" ? t.login.modeSignup : t.login.modeForgot} duration={400} />
                </h2>
                <p className="mt-2 text-[13px] leading-6 text-ink-soft">
                  {mode === "login" ? t.login.subLogin : mode === "signup" ? t.login.subSignup : t.login.subForgot}
                </p>
              </div>

              {mode !== "forgot" && (
                <>
                  <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className={`${btnSecondary} w-full bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    {t.login.google}
                  </button>

                  <div className="relative flex items-center">
                    <div className="flex-1 border-t border-line-strong" />
                    <Sys className="px-3 text-ink-muted">{t.login.orEmail}</Sys>
                    <div className="flex-1 border-t border-line-strong" />
                  </div>
                </>
              )}

              {mode === "forgot" ? (
                resetSent ? (
                  <div role="status" className="border-2 border-brand-600 bg-brand-50 px-3.5 py-3 text-center text-[13px] font-semibold text-brand-800 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-200">
                    {t.login.resetSentPart1}
                    <strong>{email}</strong>
                    {t.login.resetSentPart2}
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-3">
                    <div className="space-y-1">
                      <label className={LABEL_CLASS}>{t.login.emailLabel}</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@vi-du.com" className={INPUT_CLASS} />
                    </div>
                    {error && <div role="alert" className={ERROR_CLASS}>{error}</div>}
                    <button type="submit" disabled={loading} className={`${btnPrimary} mt-1 w-full py-3.5`}>
                      {loading ? t.login.sending : t.login.sendReset}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>
                )
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {mode === "signup" && (
                    <div className="space-y-1">
                      <label className={LABEL_CLASS}>{t.login.nameLabel}</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.login.namePlaceholder} className={INPUT_CLASS} />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className={LABEL_CLASS}>{t.login.emailLabel}</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@vi-du.com" className={INPUT_CLASS} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className={LABEL_CLASS}>{t.login.passwordLabel}</label>
                      {mode === "login" && (
                        <button
                          type="button"
                          onClick={() => {
                            setMode("forgot");
                            setError("");
                            setResetSent(false);
                          }}
                          className="text-[11px] font-bold text-accent-strong underline-offset-4 hover:underline"
                        >
                          {t.login.forgotLink}
                        </button>
                      )}
                    </div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" className={INPUT_CLASS} />
                  </div>

                  {error && (
                    <div role="alert" className={ERROR_CLASS}>
                      <p>{error}</p>
                    </div>
                  )}

                  {cooldownUntil && (
                    <div className="border-2 border-warn-line bg-amber-50 px-3 py-2 text-[13px] font-semibold text-warn-ink dark:bg-amber-950/50">
                      {format(t.login.tooManyAttempts, { seconds: cooldownLeft })}
                    </div>
                  )}

                  <button type="submit" disabled={loading || !!cooldownUntil} className={`thcn-glitch ${btnPrimary} mt-1 w-full py-3.5`}>
                    {loading ? t.login.processing : mode === "login" ? t.login.modeLogin : t.login.signUp}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  {loading && <LoadBar label={t.login.v2.statusBusy} done={SYS.ok} cells={14} />}
                </form>
              )}

              {/* Ba con số: chỉ số nào ở đây cũng phải đếm được từ dữ liệu thật. */}
              <dl className="grid grid-cols-3 border border-line">
                {[
                  { k: t.login.statLessons, v: format(t.login.statLessonsValue, { count: lessonCountFloor }) },
                  { k: t.login.statTracks, v: format(t.login.statTracksValue, { count: Object.keys(TRACKS).length }) },
                  { k: t.login.statPrice, v: t.login.statPriceValue },
                ].map((stat, i) => (
                  <div key={stat.k} className={`flex flex-col-reverse px-3 py-2 ${i > 0 ? "border-l border-line-strong" : ""}`}>
                    <dt className="mt-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink-muted">{stat.k}</dt>
                    <dd className="text-[13px] font-black tabular-nums">{stat.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="text-center text-xs text-ink-soft">
                {mode === "login" ? (
                  <>
                    {t.login.noAccount}{" "}
                    <button
                      onClick={() => {
                        setMode("signup");
                        setError("");
                      }}
                      className="cursor-pointer font-bold text-accent-strong underline-offset-4 hover:underline"
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
                      className="cursor-pointer font-bold text-accent-strong underline-offset-4 hover:underline"
                    >
                      {t.login.modeLogin}
                    </button>
                  </>
                )}
              </div>

              <p className="pt-1 text-center text-[11px] text-ink-faint">
                {t.login.termsPart1}{" "}
                <Link href="/dieu-khoan" className="underline underline-offset-2 hover:text-ink-soft">
                  {t.login.terms}
                </Link>{" "}
                {t.login.termsAnd}{" "}
                <Link href="/chinh-sach-bao-mat" className="underline underline-offset-2 hover:text-ink-soft">
                  {t.login.privacy}
                </Link>
                .
              </p>
            </Frame>
          </div>
        </div>
      </div>
    </div>
  );
}
