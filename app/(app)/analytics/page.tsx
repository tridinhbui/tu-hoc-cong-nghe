"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import dynamicImport from "next/dynamic";
import Leaderboard from "@/components/Leaderboard";
import FocusTimePanel from "@/components/FocusTimePanel";
import { useI18n } from "@/lib/i18n/context";

// next/dynamic's `loading` option is rendered as its own component, so it can
// call useI18n() even though the dynamicImport() call site itself is at
// module scope with no hook available.
function AnalyticsLoadingFallback() {
  const { t } = useI18n();
  return <div className="text-center py-20 text-xs text-stone-500 dark:text-stone-400">{t.finalTwo.analyticsPage.loadingAnalytics}</div>;
}

const LearningAnalytics = dynamicImport(() => import("@/components/LearningAnalytics"), {
  ssr: false,
  loading: AnalyticsLoadingFallback,
});

// Auth-gated and reads Supabase env vars at render time - never prerender statically.
export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
  const { t } = useI18n();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setUserId(session.user.id);
      setLoading(false);
    };

    void checkAuth();
  }, [router, supabase.auth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center">
        <p className="text-stone-500 dark:text-stone-400">{t.finalTwo.analyticsPage.loading}</p>
      </div>
    );
  }

  return (
    <div className="h-dvh overflow-hidden flex flex-col bg-stone-50 dark:bg-stone-950">
      <div className="shrink-0 max-w-6xl mx-auto w-full px-6 pt-3 pb-2 flex items-center justify-between gap-4">
        <Link
          href="/dashboard"
          className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1"
        >
          {t.finalTwo.analyticsPage.backToDashboard}
        </Link>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
          {t.finalTwo.analyticsPage.statsAndLeaderboard}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto max-w-[1480px] mx-auto w-full px-5 pb-4 sm:px-6">
        <div className="grid gap-4 xl:grid-cols-12 xl:items-start">
          <div className="xl:col-span-5 min-w-0 space-y-4">
            <LearningAnalytics hideLeaderboardTab />
            {/* Thời gian ngồi học trong thế giới 3D. Tấm thẻ tự ẩn khi chưa có
                phiên nào, nên nó không chiếm chỗ của người chưa vào thành phố. */}
            {userId && <FocusTimePanel userId={userId} />}
          </div>
          <div className="xl:col-span-7 min-w-0">
            <div className="xl:sticky xl:top-3">
              <Leaderboard userId={userId} compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
