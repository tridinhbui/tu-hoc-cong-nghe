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
    // Trang này từng bị ghim vào đúng một màn hình (`h-dvh overflow-hidden`)
    // với một vùng cuộn con bên trong. Khung đó chỉ đứng được khi bảng xếp hạng
    // ở chế độ `compact` - mười người và hết. Bảng đầy đủ dài hơn thế nhiều, và
    // ép nó vào một vùng cuộn lồng trong trang không cuộn là dựng lại đúng cái
    // nó vừa thoát ra: nội dung dài nằm trong một cửa sổ hẹp.
    //
    // Thêm một lý do nữa để bỏ: `h-dvh` ở đây không trừ chiều cao thanh tiêu đề
    // trên mobile. Đó chính là lỗi mà one-screen-pages.test.ts mô tả và gác cho
    // ba trang khác - tài liệu cao 100dvh cộng thêm thanh header, nên nó cuộn
    // đúng bằng phần thừa ra, thứ mà `overflow-hidden` được đặt vào để chặn.
    // Trang này không nằm trong danh sách gác nên lỗi ấy chưa ai thấy.
    //
    // Cuộn tài liệu bình thường xử lý cả hai chuyện, và đó cũng đúng khuôn mà
    // trang /bxh cũ dùng.
    <div className="min-h-screen bg-stone-50 pb-12 dark:bg-stone-950">
      <div className="max-w-6xl mx-auto w-full px-6 pt-3 pb-2 flex items-center justify-between gap-4">
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

      <div className="max-w-[1480px] mx-auto w-full px-5 pb-4 sm:px-6">
        <div className="grid gap-4 xl:grid-cols-12 xl:items-start">
          <div className="xl:col-span-5 min-w-0 space-y-4">
            <LearningAnalytics hideLeaderboardTab />
            {/* Thời gian ngồi học trong thế giới 3D. Tấm thẻ tự ẩn khi chưa có
                phiên nào, nên nó không chiếm chỗ của người chưa vào thành phố. */}
            {userId && <FocusTimePanel userId={userId} />}
          </div>
          <div className="xl:col-span-7 min-w-0">
            {/* Bảng đầy đủ, không còn `compact`. Hai thứ `compact` cắt đi chính
                là hai thứ người ta mở bảng xếp hạng để xem: nó dừng ở mười
                người (`entries.slice(5, 10)`) và bỏ hẳn khối "bạn đang đứng ở
                đâu" (`myRank`). Trang /bxh riêng tồn tại chỉ để dựng đúng
                component này mà không truyền `compact`.

                `xl:sticky` cũng bỏ theo: ghim một khối cao hơn khung nhìn thì
                phần dưới của nó không bao giờ tới được. */}
            <Leaderboard userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
}
