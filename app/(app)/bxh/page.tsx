"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { createClient } from "@/lib/supabase";
import CommunityFeedClient from "@/components/CommunityFeedClient";

export const dynamic = "force-dynamic";

export default function LeaderboardPage() {
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

    void checkAuth();
  }, [router, supabase.auth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-sm font-medium text-stone-500">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-12">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 rounded-[28px] border border-stone-200 bg-white px-5 py-5 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.22)] sm:px-7 sm:py-6">
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">FinSocial</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
                FinSocial là khu vực riêng để mọi người chia sẻ bản tin, câu hỏi và phân tích ngắn.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-sm font-bold text-emerald-700">
              <Users className="h-4 w-4" />
              Cộng đồng trong hệ học
            </div>
          </div>
        </div>
        <Suspense fallback={null}>
          <CommunityFeedClient embedded />
        </Suspense>
      </div>
    </div>
  );
}
