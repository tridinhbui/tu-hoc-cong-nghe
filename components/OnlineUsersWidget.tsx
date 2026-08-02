"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { getOnlineCount } from "@/lib/presence";

/**
 * Số người "đang học cùng lúc" trên dashboard.
 *
 * Widget này từng liệt kê cả avatar của những người đang online thật, đọc từ
 * user_profiles.last_seen_at. Presence đã được gỡ (chỉ giữ chuông thông báo
 * realtime), nên hàng avatar cũng đi theo - không còn nguồn dữ liệu nào cho
 * nó, và trước đây nó vốn đã im lặng render rỗng bất cứ khi nào RPC không
 * tồn tại trên production.
 *
 * Con số còn lại là số dựng, xem lib/presence.ts.
 */
export default function OnlineUsersWidget() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(getOnlineCount());
    // Con số chỉ đổi theo khối 10 phút, nhưng vẫn làm mới mỗi phút để nó bước
    // sang khối mới mà người dùng không phải tải lại trang.
    const interval = window.setInterval(() => setCount(getOnlineCount()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  // Tính trong effect chứ không phải lúc render, để markup phía máy chủ và lần
  // hydrate đầu tiên khớp nhau - giờ trên máy chủ và trên máy người dùng có thể
  // rơi vào hai khối khác nhau.
  if (count === null) return null;

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 flex items-center gap-2.5">
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 w-8 h-8">
          <Users className="w-4.5 h-4.5" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Đang online
          </h3>
          <p className="text-[10px] text-stone-500 dark:text-stone-400 font-bold">{count} người đang học cùng lúc</p>
        </div>
      </div>
    </div>
  );
}
