"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import { observeLobbyCount } from "@/lib/supabase-lobby";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

/**
 * Số người đang ở trong thư viện 3D, đọc từ presence THẬT.
 *
 * Trước đây con số này được dựng ra: một hàm sin theo giờ trong ngày, dao động
 * trong khoảng 50-150, kèm chấm xanh nhấp nháy. Nó ổn định, có nhịp ngày đêm,
 * và hoàn toàn không liên quan tới bất kỳ ai. Người dùng đọc "137 người đang
 * học cùng lúc" rồi tin - đó là một lời nói dối, dù mã nguồn có ghi chú thành
 * thật với lập trình viên rằng đấy là số dựng.
 *
 * Lúc viết con số dựng ấy thì chưa có presence nào để đọc. Giờ có: sảnh 3D ở
 * /cong-dong dùng Supabase presence, nên số thật lấy được.
 *
 * `observeLobbyCount` NGHE MÀ KHÔNG GHI DANH. Nếu nó track thì mỗi người chỉ
 * mở dashboard sẽ hiện ra thành một nhân vật đứng bất động giữa thư viện, và
 * con số cũng tự phồng lên bằng chính người đang nhìn nó.
 *
 * Số thật thường nhỏ và có lúc bằng 0. Đó là cái giá phải trả, nhưng "chưa có
 * ai, vào trước đi" là một lời mời thật - còn "137 người" là con số mà người
 * dùng sẽ không tìm thấy ai trong đó khi họ bấm vào.
 */
export default function OnlineUsersWidget() {
  const { t } = useI18n();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => observeLobbyCount(setCount), []);

  // Chưa có phản hồi đầu tiên từ presence thì không hiện gì, thay vì nháy số 0
  // rồi sửa lại - nháy như vậy đọc ra thành "không có ai" đúng vào khoảnh khắc
  // người dùng liếc qua.
  if (count === null) return null;

  const empty = count === 0;

  return (
    <Link
      href="/cong-dong"
      className="block overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-colors hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-700"
    >
      <div className="flex items-center gap-2.5 px-5 py-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
          <Users className="h-4.5 w-4.5" />
        </div>
        <div className="min-w-0">
          <h3 className="flex items-center gap-1.5 text-base font-bold text-stone-900 dark:text-stone-100">
            {/* Chấm "đang sống" chỉ hiện khi thực sự có người. Một chấm nhấp
                nháy bên cạnh số 0 là đúng loại tín hiệu giả đang gỡ bỏ. */}
            {!empty && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            )}
            {t.miscUi.onlineUsersWidget.communityLibrary}
          </h3>
          <p className="truncate text-[10px] font-bold text-stone-500 dark:text-stone-400">
            {empty
              ? t.miscUi.onlineUsersWidget.emptyLobby
              : format(t.miscUi.onlineUsersWidget.peopleInLobby, { count })}
          </p>
        </div>
      </div>
    </Link>
  );
}
