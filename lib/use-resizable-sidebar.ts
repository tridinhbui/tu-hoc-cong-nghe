"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorageValue, writeLocalStorageValue } from "@/lib/use-local-storage-value";

/**
 * Cột phải kéo rộng / kéo hẹp được, trong một khoảng có chặn.
 *
 * VÌ SAO CÓ CHẶN, VÀ VÌ SAO CHẶN Ở HAI ĐẦU. Dưới `MIN_WIDTH` thì mọi thứ trong
 * cột ấy - tên người, số ngày chuỗi, con số cộng đồng - bắt đầu xuống dòng
 * từng từ, đúng kiểu vỡ đã gặp ở khối tiến trình dashboard. Trên `MAX_WIDTH`
 * thì cột trái hẹp lại tới mức danh sách bài học phải cắt tiêu đề. Một thanh
 * kéo không chặn là một cách mời người dùng tự làm hỏng bố cục của mình.
 *
 * `clamp` chạy CẢ khi đọc từ localStorage, không chỉ lúc kéo: giá trị trong đó
 * có thể tới từ một phiên bản trước có giới hạn khác, hoặc từ một người sửa tay
 * devtools. Đọc mà không kẹp là tin vào dữ liệu mình không kiểm soát.
 */

export const SIDEBAR_MIN_WIDTH = 280;
export const SIDEBAR_MAX_WIDTH = 520;
export const SIDEBAR_DEFAULT_WIDTH = 340;

/** Bước nhảy khi dùng phím mũi tên. Thanh kéo phải dùng được bằng bàn phím:
 *  một điều khiển chỉ kéo được bằng chuột thì người dùng bàn phím không có
 *  cách nào chạm tới. */
const KEYBOARD_STEP = 24;

const STORAGE_KEY = "thtcdn:lessons-sidebar-width";
const CHANGE_EVENT = "thtcdn:lessons-sidebar-width-changed";

function clamp(value: number): number {
  return Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, Math.round(value)));
}

export function useResizableSidebar() {
  const stored = useLocalStorageValue(STORAGE_KEY, CHANGE_EVENT);
  const parsed = stored === null ? NaN : Number(stored);
  const savedWidth = Number.isFinite(parsed) ? clamp(parsed) : SIDEBAR_DEFAULT_WIDTH;

  /** Bề rộng ĐANG KÉO. Tách khỏi giá trị đã lưu vì ghi localStorage ở mỗi
   *  `pointermove` là hàng trăm lần ghi cho một cú kéo; chỉ lưu khi thả tay. */
  const [dragWidth, setDragWidth] = useState<number | null>(null);
  const width = dragWidth ?? savedWidth;

  const startRef = useRef({ x: 0, width: 0 });

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      startRef.current = { x: event.clientX, width };
      setDragWidth(width);
    },
    [width]
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (dragWidth === null) return;
      // Cột nằm bên PHẢI, nên kéo sang trái là rộng ra: dấu bị đảo so với một
      // thanh kéo cột trái, và đây là chỗ dễ viết ngược nhất.
      setDragWidth(clamp(startRef.current.width - (event.clientX - startRef.current.x)));
    },
    [dragWidth]
  );

  const endDrag = useCallback(() => {
    if (dragWidth === null) return;
    writeLocalStorageValue(STORAGE_KEY, String(dragWidth), CHANGE_EVENT);
    setDragWidth(null);
  }, [dragWidth]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const delta = event.key === "ArrowLeft" ? KEYBOARD_STEP : event.key === "ArrowRight" ? -KEYBOARD_STEP : 0;
      if (delta === 0) return;
      event.preventDefault();
      writeLocalStorageValue(STORAGE_KEY, String(clamp(width + delta)), CHANGE_EVENT);
    },
    [width]
  );

  // Trong lúc kéo, khoá chọn chữ và ghim con trỏ: thiếu hai thứ này thì kéo
  // qua vùng chữ sẽ bôi đen cả trang, và con trỏ nhấp nháy đổi hình mỗi lần
  // đi qua một phần tử khác.
  useEffect(() => {
    if (dragWidth === null) return;
    const previousSelect = document.body.style.userSelect;
    const previousCursor = document.body.style.cursor;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
    return () => {
      document.body.style.userSelect = previousSelect;
      document.body.style.cursor = previousCursor;
    };
  }, [dragWidth]);

  return { width, isDragging: dragWidth !== null, onPointerDown, onPointerMove, endDrag, onKeyDown };
}
