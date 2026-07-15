"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import dynamicImport from "next/dynamic";

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

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setLoading(false);
    };

    checkAuth();
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

      <div className="max-w-6xl mx-auto px-6">
        <LearningAnalytics />
      </div>
    </div>
  );
}
