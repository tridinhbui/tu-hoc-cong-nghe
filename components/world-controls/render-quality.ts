"use client";

import { useEffect, useState } from "react";

/** Mức chi tiết của cảnh 3D, và việc tôn trọng "giảm chuyển động".
 *
 *  Hai thứ ở chung một chỗ vì chúng cùng trả lời một câu hỏi: cảnh này nên
 *  chạy nhẹ tới mức nào, và vì lý do gì. Một máy yếu cần bớt bóng đổ; một
 *  người say chuyển động cần bớt thứ tự động nhúc nhích. Trước đó không thế
 *  giới nào trong ba cái đọc `prefers-reduced-motion`, dù phần còn lại của ứng
 *  dụng có - nên người bật nó lên không có đường nào ngoài rời trang. */

export interface RenderQuality {
  /** Bóng đổ - thứ đắt nhất trong cảnh, và là thứ đầu tiên nên tắt. */
  shadows: boolean;
  /** Trần tỉ lệ điểm ảnh. Màn Retina 3x không cần render 3x cho một sảnh. */
  dpr: [number, number];
  /** Người dùng đã bật "giảm chuyển động" của hệ điều hành. */
  reducedMotion: boolean;
}

/** Mặc định lúc chưa đo được: giữ nguyên chất lượng, không giả định máy yếu.
 *  Đoán sai chiều này chỉ là một khung hình đẹp hơn cần thiết; đoán sai chiều
 *  kia là cả cảnh xấu đi trên máy vốn chạy tốt. */
const FULL: RenderQuality = { shadows: true, dpr: [1, 1.75], reducedMotion: false };

export function useRenderQuality(): RenderQuality {
  const [quality, setQuality] = useState<RenderQuality>(FULL);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      const reducedMotion = motionQuery.matches;
      // Số nhân logic là chỉ dấu thô nhưng có sẵn và không tốn gì. Bốn nhân
      // trở xuống gần như luôn là máy tính bảng, điện thoại, hoặc laptop cũ -
      // đúng nhóm mà bóng đổ làm tụt khung hình rõ nhất.
      const weak = (navigator.hardwareConcurrency ?? 8) <= 4;
      setQuality({
        // Giảm chuyển động cũng tắt bóng đổ: bóng động là một nguồn chuyển
        // động nữa trong khung hình, và người bật tuỳ chọn này thường cũng là
        // người đang dùng máy không mạnh.
        shadows: !weak && !reducedMotion,
        dpr: weak ? [1, 1.25] : [1, 1.75],
        reducedMotion,
      });
    };

    measure();
    motionQuery.addEventListener("change", measure);
    return () => motionQuery.removeEventListener("change", measure);
  }, []);

  return quality;
}
