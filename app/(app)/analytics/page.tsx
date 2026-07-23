"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import dynamicImport from "next/dynamic";
import Leaderboard from "@/components/Leaderboard";

const LearningAnalytics = dynamicImport(
  () => import("@/components/LearningAnalytics"),
  { ssr: false, loading: () => <div className="text-center py-20 text-xs text-stone-505 dark:text-stone-400">Đang tải phân tích học tập...</div> }
);

// Auth-gated and reads Supabase env vars at render time - never prerender statically.
export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
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
        <p className="text-stone-500 dark:text-stone-400">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-4">
        <Link 
          href="/dashboard" 
          className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1"
        >
          ← Quay lại Dashboard
        </Link>
      </div>

      <div className="max-w-[1480px] mx-auto px-5 pb-8 sm:px-6">
        <div className="mb-6 rounded-[28px] border border-stone-200 bg-white px-5 py-5 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.22)] sm:px-7 sm:py-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-700">
                Thống kê
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">Thống kê & BXH</h1>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5 min-w-0">
            <LearningAnalytics hideLeaderboardTab />
          </div>
          <div className="lg:col-span-7 min-w-0">
            <div className="lg:sticky lg:top-6">
              <Leaderboard userId={userId} compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
