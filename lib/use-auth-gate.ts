"use client";

import { useEffect, useState } from "react";
import { getLocalPlayer } from "@/lib/local-store";

/**
 * Không còn cổng nào để gác.
 *
 * Bản cũ chờ Supabase phát `INITIAL_SESSION`, rồi đá về `/login` nếu không có
 * phiên. Gỡ Supabase là gỡ luôn đăng nhập, nên hook này chỉ còn cấp danh tính
 * cục bộ - `getLocalPlayer()` tự tạo id ở lần mở đầu tiên.
 *
 * Tên hàm giữ nguyên có chủ đích: bốn nơi gọi đều rã `{ userId, checking }`,
 * và đổi tên ở bước này chỉ tạo nhiễu trong diff của một cuộc đại phẫu vốn đã
 * lớn. Đổi tên khi Supabase đã ra khỏi repo hoàn toàn.
 *
 * `checking` vẫn tồn tại chứ không cứng thành `false`: localStorage chỉ đọc
 * được ở client, nên lượt render đầu (trên máy chủ và lượt hydrate) chưa có
 * `userId`. Trả `checking: true` ở lượt đó giữ nguyên trạng thái chờ mà các
 * component đã xử lý sẵn, thay vì để chúng thấy `userId: null` và tưởng là lỗi.
 */
export function useAuthGate() {
  const [userId, setUserId] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setUserId(getLocalPlayer().id);
    setChecking(false);
  }, []);

  return { userId, checking };
}
