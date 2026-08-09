"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { useI18n } from "@/lib/i18n/context";

// Reads Supabase env vars at render time - never prerender statically.

export default function ResetPasswordPage() {
  const { t } = useI18n();
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);

  // The reset-password link from Supabase exchanges its token for a temporary
  // session on redirect - if there's no session here, the link was invalid
  // or already used.
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setHasRecoverySession(!!session);
      setCheckingSession(false);
    };
    checkSession();
  }, [supabase.auth]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError(t.resetPassword.passwordMinLength);
      return;
    }
    if (password !== confirmPassword) {
      setError(t.resetPassword.passwordMismatch);
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        setError(updateError.message || t.resetPassword.updateErrorFallback);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError(t.resetPassword.genericError);
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center">
        <p className="text-stone-500 dark:text-stone-400">{t.resetPassword.loading}</p>
      </div>
    );
  }

  if (!hasRecoverySession) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center px-6">
        <div className="text-center space-y-4 max-w-sm">
          <p className="text-lg font-bold text-stone-900 dark:text-stone-100">{t.resetPassword.invalidLinkTitle}</p>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {t.resetPassword.invalidLinkDescription}
          </p>
          <a
            href="/login"
            className="inline-block bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 px-6 py-3 rounded-xl font-bold text-sm transition-colors"
          >
            {t.resetPassword.backToLogin}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900/50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">{t.resetPassword.title}</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">{t.resetPassword.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
              {t.resetPassword.newPasswordLabel}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.resetPassword.passwordPlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100 text-base placeholder:text-stone-300 dark:placeholder:text-stone-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
              {t.resetPassword.confirmPasswordLabel}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t.resetPassword.passwordPlaceholder}
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
            {loading ? t.resetPassword.submitting : t.resetPassword.submitButton}
          </button>
        </form>
      </div>
    </div>
  );
}
