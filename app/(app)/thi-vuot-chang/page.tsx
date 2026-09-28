"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import StageSkipExamPanel from "@/components/StageSkipExamPanel";
import { useI18n } from "@/lib/i18n/context";
import { getCurrentUserId } from "@/lib/current-user";

/* Thi vượt chặng có trang riêng, không còn là một tab của /kiem-tra.
 *
 * Hai thứ nằm chung ở đó là hai việc khác nhau: /kiem-tra là luyện tập, làm
 * bao nhiêu lần cũng được, sai thì làm lại. Thi vượt chặng ghi thẳng vào tiến
 * độ - đạt là cả chặng được tính hoàn thành, trượt là phải chờ hết thời gian
 * nguội mới thi lại. Một cái là bàn tập, cái kia là phòng thi, và đứng sau
 * cùng một thanh tab thì người học không có tín hiệu nào để phân biệt.
 *
 * Vì là phòng thi nên nó cũng cần đứng ở chỗ tìm thấy được: một tab bên trong
 * một trang khác chỉ tồn tại với người đã vào trang ấy rồi.
 *
 * Hợp đồng "một màn hình" giống /kiem-tra - xem lib/__tests__/one-screen-pages.test.ts
 * cho lý do phải trừ đúng chiều cao thanh điều hướng trên mobile. */
export default function ThiVuotChangPage() {
  const { t } = useI18n();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    void getCurrentUserId().then(setUserId);
  }, []);

  return (
    <div className="h-[calc(100dvh-3.5rem)] lg:h-dvh overflow-hidden flex flex-col bg-surface font-sans text-ink">
      <div className="border-b border-line bg-white dark:bg-stone-900/90 sticky top-0 z-30 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100/80 dark:bg-amber-950 shrink-0">
            <Trophy className="w-5 h-5 text-warn-strong" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-black text-ink-max tracking-tight">
              {t.stageSkip.title}
            </h1>
            <p className="text-xs text-ink-muted mt-0.5">
              {t.stageSkip.pageSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* `overflow-hidden`, KHÔNG phải `overflow-y-auto`: vùng cuộn duy nhất
          nằm sâu hơn một tầng, quanh đúng khối thẻ chặng. Để chỗ này cuộn nữa
          là có hai thanh cuộn lồng nhau, và cái ngoài kéo cả hero đi mất. */}
      <div className="flex-1 min-h-0 overflow-hidden w-full px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto h-full min-h-0">
          <StageSkipExamPanel userId={userId} fullPage />
        </div>
      </div>
    </div>
  );
}
