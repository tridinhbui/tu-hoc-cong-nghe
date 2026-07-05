"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import UserMenu from "@/components/UserMenu";
import LearningAnalytics from "@/components/LearningAnalytics";

// Auth-gated and reads Supabase env vars at render time — never prerender statically.
export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<{ email?: string; user_metadata?: { full_name?: string; avatar_url?: string } } | null>(null);
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

      setUser(session.user);
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
    <div className="min-h-screen bg-white dark:bg-stone-950">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white dark:bg-stone-950 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="text-stone-500 dark:text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 text-sm font-semibold">
              ← Quay lại
            </Link>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-2">Thống kê học tập</h1>
          </div>
          <UserMenu name={user?.user_metadata?.full_name} email={user?.email} avatarUrl={user?.user_metadata?.avatar_url} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <LearningAnalytics />
      </div>
    </div>
  );
}
