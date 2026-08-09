"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trophy } from "lucide-react";
import { createClient } from "@/lib/supabase";
import Leaderboard from "@/components/Leaderboard";
import { useI18n } from "@/lib/i18n/context";

/**
 * /bxh - bảng xếp hạng.
 *
 * TRANG NÀY TRƯỚC ĐÂY RENDER FINSOCIAL. Hàm vẫn tên `LeaderboardPage`, mục
 * navbar vẫn là "Bảng xếp hạng" với icon cúp, nhưng thân trang dựng
 * `CommunityFeedClient` cùng tiêu đề "FinSocial" và đúng câu mô tả của
 * /finsocial - tức là bấm vào Bảng xếp hạng thì ra một bản sao thứ hai của
 * bảng tin, còn bảng xếp hạng thật thì không có đường nào tới.
 *
 * Bảng xếp hạng thật là components/Leaderboard.tsx, và nó chỉ tồn tại ở
 * /analytics dưới dạng `compact` - nhét trong một cột hẹp bên cạnh biểu đồ,
 * dù bản thân nó có tới sáu cách xếp hạng (tổng hợp, XP, chuỗi ngày, đóng góp
 * cộng đồng, game, nghề nghiệp). Ở đây nó được dựng đầy đủ.
 *
 * Không gộp vào /analytics: hai trang trả lời hai câu khác nhau - trang kia là
 * "tôi đang học thế nào", trang này là "tôi đứng ở đâu so với mọi người" - và
 * navbar đã xếp chúng vào hai mục riêng từ trước.
 */
export default function LeaderboardPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      if (!session) {
        router.replace("/login");
        return;
      }
      // Leaderboard cần userId để tô đậm dòng của chính người đọc và đọc thứ
      // hạng riêng của họ; thiếu nó thì bảng vẫn chạy nhưng mất phần "bạn đang
      // ở đâu", vốn là lý do người ta mở trang này.
      setUserId(session.user.id);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 dark:bg-stone-950">
        <p className="text-sm font-medium text-stone-500">{t.finalTwo.bxhPage.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-12 dark:bg-stone-950">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 rounded-[28px] border border-stone-200 bg-white px-5 py-5 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.22)] sm:px-7 sm:py-6 dark:border-stone-800 dark:bg-stone-900">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
                {t.finalTwo.bxhPage.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base dark:text-stone-400">
                {t.finalTwo.bxhPage.desc}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-sm font-bold text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
              <Trophy className="h-4 w-4" />
              {t.finalTwo.bxhPage.communityBadge}
            </div>
          </div>
        </div>

        <Leaderboard userId={userId ?? undefined} />
      </div>
    </div>
  );
}
