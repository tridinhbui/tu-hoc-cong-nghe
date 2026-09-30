"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/cloudflare";
import dynamicImport from "next/dynamic";
import Leaderboard from "@/components/Leaderboard";
import FocusTimePanel from "@/components/FocusTimePanel";
import { useI18n } from "@/lib/i18n/context";
import { textLink } from "@/components/ui/system";

// next/dynamic's `loading` option is rendered as its own component, so it can
// call useI18n() even though the dynamicImport() call site itself is at
// module scope with no hook available.
function AnalyticsLoadingFallback() {
  const { t } = useI18n();
  return <div className="text-center py-20 text-xs text-ink-muted">{t.finalTwo.analyticsPage.loadingAnalytics}</div>;
}

const LearningAnalytics = dynamicImport(() => import("@/components/LearningAnalytics"), {
  ssr: false,
  loading: AnalyticsLoadingFallback,
});

// Auth-gated and reads Cloudflare env vars at render time - never prerender statically.

export default function AnalyticsPage() {
  const { t } = useI18n();
  const router = useRouter();
  const cloudflare = createClient();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await cloudflare.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setUserId(session.user.id);
      setLoading(false);
    };

    void checkAuth();
  }, [router, cloudflare.auth]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page dark:bg-stone-950">
        <p className="text-ink-muted">{t.finalTwo.analyticsPage.loading}</p>
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
    <div className="min-h-screen bg-page pb-12 dark:bg-stone-950">
      {/* Thanh định vị: liên kết về + mã khu, trên một đường kẻ 1px - cùng khuôn
          với đầu section của trang chủ, thay cho viên thuốc xanh. */}
      <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between gap-4 px-5 pt-4 pb-4 sm:px-6">
        <div className="flex w-full items-center justify-between gap-4 border-b border-line pb-2">
          <Link href="/dashboard" className={`${textLink} text-xs`}>
            {t.finalTwo.analyticsPage.backToDashboard}
          </Link>
          <span className="eyebrow text-right text-ink-soft">{t.finalTwo.analyticsPage.statsAndLeaderboard}</span>
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
