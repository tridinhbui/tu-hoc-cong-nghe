"use client";

import { useEffect, useState } from "react";

/**
 * Tab hiện đang được nhìn hay không.
 *
 * Dùng để ngừng vẽ cảnh 3D khi người dùng chuyển sang tab khác. Không có nó
 * thì một phiên học 25 phút ở tab nền vẫn quay GPU hết tốc độ - và với một
 * phòng Pomodoro thì đó không phải trường hợp hiếm mà là cách dùng chính:
 * chuyển tab đi làm việc khác chính là điều phiên tập trung phục vụ.
 *
 * Mặc định `true` cho lần render đầu: đọc `document.hidden` lúc render sẽ khác
 * nhau giữa server và client và gây lỗi hydrate, còn đoán "đang hiện" thì sai
 * lầm tệ nhất là vẽ thừa vài khung hình đầu.
 */
export function usePageVisible(): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const read = () => setVisible(!document.hidden);
    read();
    document.addEventListener("visibilitychange", read);
    return () => document.removeEventListener("visibilitychange", read);
  }, []);

  return visible;
}
