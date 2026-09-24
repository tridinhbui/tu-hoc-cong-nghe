"use client";

import { useEffect, useRef } from "react";

/**
 * Nối vào một topic realtime. Thay `supabase.channel(topic).subscribe()`.
 *
 * DOMAIN RIÊNG. Kết nối thẳng tới worker thcn-realtime, không qua app chính -
 * xem workers/realtime/src/index.ts. `NEXT_PUBLIC_REALTIME_URL` là domain
 * (hoặc route) của worker đó, đặt trong biến môi trường phía trình duyệt.
 *
 * TỰ NỐI LẠI VỚI ĐỘ TRỄ TĂNG DẦN. Durable Object có thể ngủ và mất kết nối
 * bất cứ lúc nào (đúng thiết kế hibernation, không phải lỗi); trình duyệt
 * cũng rớt mạng. Không tự nối lại là một widget "thời gian thực" chỉ còn thời
 * gian thực cho tới lần rớt mạng đầu tiên.
 */
export interface TopicHandlers {
  onPresenceSync?: (state: Record<string, unknown>) => void;
  onBroadcast?: (event: string, payload: unknown, from: string) => void;
  onOpen?: () => void;
}

const REALTIME_URL = process.env.NEXT_PUBLIC_REALTIME_URL || "wss://realtime.tuhoccongnghe.vn";
const MAX_BACKOFF_MS = 15_000;

export function useTopic(topic: string | null, handlers: TopicHandlers) {
  const wsRef = useRef<WebSocket | null>(null);
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    if (!topic) return;
    let closed = false;
    let attempt = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const connect = () => {
      if (closed) return;
      const url = `${REALTIME_URL}/ws?topic=${encodeURIComponent(topic)}`;
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        attempt = 0;
        handlersRef.current.onOpen?.();
      };

      ws.onmessage = (e) => {
        let msg: { type: string; state?: Record<string, unknown>; event?: string; payload?: unknown; from?: string };
        try {
          msg = JSON.parse(e.data);
        } catch {
          return;
        }
        if (msg.type === "presence_sync" && msg.state) handlersRef.current.onPresenceSync?.(msg.state);
        if (msg.type === "broadcast" && msg.event) {
          handlersRef.current.onBroadcast?.(msg.event, msg.payload, msg.from ?? "?");
        }
      };

      ws.onclose = () => {
        if (closed) return;
        // Độ trễ tăng dần theo cấp số nhân, trần 15 giây - thử lại dồn dập khi
        // worker đang khởi động lại hàng loạt chỉ làm chậm nó phục hồi hơn.
        const delay = Math.min(1000 * 2 ** attempt, MAX_BACKOFF_MS);
        attempt += 1;
        timer = setTimeout(connect, delay);
      };
    };

    connect();
    return () => {
      closed = true;
      clearTimeout(timer);
      wsRef.current?.close();
    };
  }, [topic]);

  return {
    /** Gửi presence của chính mình. Cả phòng nhận lại ảnh chụp tổng hợp. */
    sendPresence(payload: unknown) {
      wsRef.current?.send(JSON.stringify({ type: "presence", payload }));
    },
    /** Phát một sự kiện có tên tới mọi người KHÁC trong topic. */
    sendBroadcast(event: string, payload: unknown) {
      wsRef.current?.send(JSON.stringify({ type: "broadcast", event, payload }));
    },
  };
}
