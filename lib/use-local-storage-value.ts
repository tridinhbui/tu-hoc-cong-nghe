"use client";

import { useCallback, useSyncExternalStore } from "react";

// Đọc một khoá localStorage như một nguồn dữ liệu ngoài, thay vì chép nó vào
// state bằng effect lúc mount.
//
// Cách cũ - `useState(null)` rồi `useEffect(() => setX(localStorage.getItem))`
// - có ba chỗ hụt, và cả ba đều lặng lẽ:
//
//   · Vẽ một khung hình mang giá trị rỗng trước khi effect kịp chạy, nên
//     banner chọn lộ trình chớp một nhịp ở mọi lần tải trang.
//   · Mỗi nơi đọc phải tự đăng ký nghe sự kiện để biết chỗ khác vừa ghi. Hai
//     component cùng đọc `thtcdn_learning_goal_*` đã phải chép đúng đoạn dây
//     đó hai lần.
//   · Không ai nghe sự kiện `storage` của trình duyệt, nên đổi lộ trình ở
//     một tab thì tab kia hiển thị lộ trình cũ cho tới lúc tải lại.
//
// useSyncExternalStore trả lời cả ba: React đọc thẳng từ nguồn ở mỗi lần
// render, và chỉ dựng lại khi nguồn báo có thay đổi.

/** Báo cho mọi nơi đang đọc khoá này biết giá trị vừa đổi trong cùng tab.
 *  Sự kiện `storage` của trình duyệt CHỈ bắn sang tab khác, không bắn cho
 *  chính tab vừa ghi - nên phải tự bắn lấy. */
export function notifyLocalStorageChanged(eventName: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(eventName));
}

export function useLocalStorageValue(key: string, changeEvent: string): string | null {
  const subscribe = useCallback(
    (onChange: () => void) => {
      window.addEventListener("storage", onChange);
      window.addEventListener(changeEvent, onChange);
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(changeEvent, onChange);
      };
    },
    [changeEvent],
  );

  const getSnapshot = useCallback(() => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      // Safari ở chế độ riêng tư ném lỗi khi đọc localStorage.
      return null;
    }
  }, [key]);

  // Trên server không có localStorage: coi như chưa có giá trị.
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
