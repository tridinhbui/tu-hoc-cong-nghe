"use client";

import { MIN_PASSWORD_LENGTH } from "@/lib/auth/password-policy";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/cloudflare";
import { useI18n } from "@/lib/i18n/context";
import { Frame, Sys, btnPrimary } from "@/components/ui/system";

// Reads Cloudflare env vars at render time - never prerender statically.

/* i18n-ignore-start: định danh hệ thống, cùng một chuỗi ở mọi ngôn ngữ. */
const SYS_CODE = "THCN://AUTH/RESET-PASSWORD";
/* i18n-ignore-end */

const inputClass =
  "w-full rounded-sm border border-line-strong bg-white px-3.5 py-2.5 text-base text-ink-max transition-colors placeholder:text-stone-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20 dark:border-stone-700 dark:bg-stone-900 dark:placeholder:text-stone-500";

export default function ResetPasswordPage() {
  const { t } = useI18n();
  const router = useRouter();
  const cloudflare = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);

  // The reset-password link from Cloudflare exchanges its token for a temporary
  // session on redirect - if there's no session here, the link was invalid
  // or already used.
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await cloudflare.auth.getSession();
      setHasRecoverySession(!!session);
      setCheckingSession(false);
    };
    checkSession();
  }, [cloudflare.auth]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(t.resetPassword.passwordMinLength);
      return;
    }
    if (password !== confirmPassword) {
      setError(t.resetPassword.passwordMismatch);
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await cloudflare.auth.updateUser({ password });

      if (updateError) {
        setError(updateError.message || t.resetPassword.updateErrorFallback);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError(t.resetPassword.genericError);
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page dark:bg-stone-950">
        <p className="text-sm text-ink-muted">{t.resetPassword.loading}</p>
      </div>
    );
  }

  if (!hasRecoverySession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page px-4 dark:bg-stone-950">
        <div className="w-full max-w-sm">
          <div className="border-b border-line-strong pb-2">
            <Sys className="text-ink-muted">{SYS_CODE}</Sys>
          </div>
          <h1 className="mt-4 text-xl font-black tracking-tight text-ink-max">{t.resetPassword.invalidLinkTitle}</h1>
          <p className="mt-2 text-sm leading-6 text-ink-soft">{t.resetPassword.invalidLinkDescription}</p>
          <a href="/login" className={`${btnPrimary} mt-6`}>
            {t.resetPassword.backToLogin}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-page px-4 dark:bg-stone-950">
      <Frame title={SYS_CODE} className="w-full max-w-sm" bodyClassName="space-y-6 p-6 sm:p-7">
        <div>
          <h1 className="mb-2 text-2xl font-black tracking-tight text-ink-max">{t.resetPassword.title}</h1>
          <p className="text-sm leading-6 text-ink-soft">{t.resetPassword.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="eyebrow block text-ink-muted">{t.resetPassword.newPasswordLabel}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.resetPassword.passwordPlaceholder}
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label className="eyebrow block text-ink-muted">{t.resetPassword.confirmPasswordLabel}</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t.resetPassword.passwordPlaceholder}
              className={inputClass}
            />
          </div>

          {error && (
            <div role="alert" className="rounded-sm border border-danger-line bg-red-50 px-3 py-2 text-[13px] font-semibold text-danger dark:bg-red-950/50">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className={`${btnPrimary} mt-2 w-full`}>
            {loading ? t.resetPassword.submitting : t.resetPassword.submitButton}
          </button>
        </form>
      </Frame>
    </div>
  );
}
