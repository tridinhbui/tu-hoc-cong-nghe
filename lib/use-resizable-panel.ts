"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clampPanelWidth, readStoredWidth, widthFromPointer } from "@/lib/resizable-panel";

/** Cạnh kéo cho một panel neo mép phải.
 *
 *  Phép tính nằm ở lib/resizable-panel.ts cùng bộ test của nó; hook này chỉ lo
 *  phần trình duyệt: nghe con trỏ, nhớ lại giữa các lần mở, và co lại khi cửa
 *  sổ nhỏ đi.
 *
 *  Dùng Pointer Events chứ không phải mouse: cùng một đoạn mã chạy cho chuột,
 *  bút và cảm ứng, và `setPointerCapture` giữ được sự kiện khi con trỏ đi ra
 *  ngoài cạnh kéo - kéo nhanh mà không có nó thì panel rớt giữa chừng. */
export function useResizablePanel(storageKey: string, defaultWidth: number) {
  const [width, setWidth] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const rightOffsetRef = useRef(24);

  // Đọc bề rộng đã nhớ sau khi gắn, không phải lúc dựng: máy chủ không có
  // localStorage lẫn innerWidth, và đọc lúc dựng sẽ lệch HTML giữa hai bên.
  useEffect(() => {
    const stored = readStoredWidth(window.localStorage.getItem(storageKey), window.innerWidth);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration, xem chú thích trên
    setWidth(stored ?? clampPanelWidth(defaultWidth, window.innerWidth));
  }, [storageKey, defaultWidth]);

  // Thu cửa sổ nhỏ lại thì panel phải co theo, nếu không cạnh kéo trôi ra
  // ngoài khung nhìn và không kéo lại được nữa.
  useEffect(() => {
    const onResize = () => {
      setWidth((current) => (current === null ? current : clampPanelWidth(current, window.innerWidth)));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    const panel = event.currentTarget.parentElement;
    if (panel) {
      rightOffsetRef.current = Math.max(0, window.innerWidth - panel.getBoundingClientRect().right);
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      setWidth(widthFromPointer(event.clientX, window.innerWidth, rightOffsetRef.current));
    },
    [dragging]
  );

  const endDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      event.currentTarget.releasePointerCapture?.(event.pointerId);
      setDragging(false);
      // Chỉ ghi khi buông tay, không ghi trong lúc kéo: một lần kéo sinh ra
      // hàng trăm sự kiện move, và ghi localStorage mỗi lần là ghi đồng bộ
      // trên luồng chính giữa lúc đang kéo.
      setWidth((current) => {
        if (current !== null) window.localStorage.setItem(storageKey, String(current));
        return current;
      });
    },
    [dragging, storageKey]
  );

  return {
    /** null cho tới khi gắn xong - lúc đó dùng cỡ mặc định của CSS. */
    width,
    dragging,
    /** Gắn vào một div nằm ở cạnh trái panel. */
    handleProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
  };
}
