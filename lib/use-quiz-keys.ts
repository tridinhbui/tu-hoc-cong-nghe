"use client";

import { useEffect } from "react";

/** Phím tắt dùng chung cho MỌI màn quiz: 1-4 chọn phương án, Enter nộp/đi tiếp.
 *
 *  Ba màn có chấm điểm (/kiem-tra, /phong-van-ky-thuat, StageSkipExamPanel) đều
 *  là "đọc câu hỏi, chọn một trong bốn, nộp" lặp mười lăm lần, và cả ba trước
 *  đây chỉ đi được bằng chuột. Viết ba lần cùng một effect là ba chỗ để lệch
 *  nhau, nên nó nằm ở đây - và chỗ gọi chỉ khai số phương án cùng hai hành động.
 *
 *  Hai điều kiện bỏ qua, cả hai đều là lỗi đã gặp chứ không phải phòng xa:
 *
 *  - Con trỏ đang ở ô nhập liệu thì gõ "2" phải ra chữ "2", không phải chọn
 *    phương án B. Cùng luật mà BehavioralPrepPanel dùng cho mũi tên trái/phải.
 *  - Enter khi tiêu điểm đang ở một `button`/`a` thì TRÌNH DUYỆT đã bấm phần tử
 *    đó rồi; gọi thêm `onEnter` là đi tiếp hai câu trong một lần bấm. Phím số
 *    không có vấn đề này nên không bị chặn theo. */
export function useQuizKeys({
  optionCount,
  onPick,
  onEnter,
  enabled = true,
}: {
  /** Số phương án đang hiện. Phím ngoài khoảng 1..optionCount bị bỏ qua, nên
   *  một câu ba phương án không nhận được phím 4. */
  optionCount: number;
  onPick: (index: number) => void;
  onEnter?: () => void;
  enabled?: boolean;
}) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable)) return;

      const digit = Number(e.key);
      if (Number.isInteger(digit) && digit >= 1 && digit <= optionCount) {
        e.preventDefault();
        onPick(digit - 1);
        return;
      }

      if (e.key === "Enter" && onEnter) {
        if (el?.closest?.("button, a, [role='button']")) return;
        e.preventDefault();
        onEnter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, optionCount, onPick, onEnter]);
}
