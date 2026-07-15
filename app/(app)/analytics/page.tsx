"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import LearningAnalytics from "@/components/LearningAnalytics";

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
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/dashboard" className="text-stone-500 dark:text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 text-sm font-semibold">
            ← Quay lại
          </Link>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-2">Thống kê học tập</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Đọc nhịp học của bạn rõ hơn để biết đang tiến tốt ở đâu và nên tối ưu điều gì tiếp theo.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <LearningAnalytics />
      </div>
    </div>
  );
}
