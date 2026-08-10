"use client";

import { useCallback, useEffect, useState } from "react";

/** Trạng thái gấp/mở của một thẻ, nhớ lại giữa các lần vào trang.
 *
 *  VÌ SAO LÀ HOOK CHUNG chứ không viết thẳng vào từng thẻ: phần khó ở đây không
 *  phải cái boolean, mà là thứ tự đọc localStorage. Máy chủ không có
 *  localStorage, nên đọc nó trong `useState` initializer sẽ cho ra hai kết quả
 *  khác nhau giữa bản dựng ở server và lượt render đầu ở client - đúng định
 *  nghĩa của lỗi hydration. Phép đọc phải nằm trong effect, tức là LUÔN có một
 *  lượt dựng ở trạng thái mặc định trước khi giá trị thật tới.
 *
 *  Hệ quả của điều đó là `hydrated`, và nó không phải cờ thừa: một thẻ người
 *  dùng đã gấp sẽ dựng ra ở trạng thái MỞ rồi mới gấp lại, nên nếu có hiệu ứng
 *  chuyển động thì họ thấy nó tự sập xuống ngay trước mắt ở mỗi lần tải trang.
 *  Bên gọi dùng `hydrated` để tắt transition cho tới khi giá trị thật đã vào
 *  chỗ. Cùng cách xử lý với `sectionsHydrated` trong components/AppNavbar.tsx.
 *
 *  Hỏng localStorage (chế độ riêng tư, quota) thì thẻ vẫn gấp mở được bình
 *  thường trong phiên, chỉ là không nhớ sang lần sau. Một lựa chọn hiển thị bị
 *  quên không đáng để ném lỗi ra giữa màn hình. */
export function useCollapsibleCard(storageKey: string, defaultCollapsed = false) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(storageKey);
    } catch {
      // Không đọc được thì dùng mặc định - xem chú thích đầu tệp.
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration, xem chú thích đầu tệp
    if (stored !== null) setCollapsed(stored === "1");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration, xem chú thích đầu tệp
    setHydrated(true);
  }, [storageKey]);

  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(storageKey, next ? "1" : "0");
      } catch {
        // Lựa chọn mất sau khi tải lại; thẻ vẫn dùng được trong phiên này.
      }
      return next;
    });
  }, [storageKey]);

  return { collapsed, hydrated, toggle };
}
