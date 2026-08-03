"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Âm thanh của thế giới 3D.
 *
 *  MẶC ĐỊNH TẮT, và đó không phải sự rụt rè: trình duyệt chặn phát tự động khi
 *  chưa có tương tác, còn âm thanh tự nổi lên trong một ứng dụng học tập là
 *  thứ khiến người ta đóng tab chứ không phải ở lại. Người dùng bật thì mới có
 *  tiếng, và lựa chọn đó được nhớ.
 *
 *  Không tải file âm thanh nào: mọi tiếng ở đây được tổng hợp bằng WebAudio.
 *  Ba lý do giống hệt lý do vân bề mặt được vẽ bằng canvas - không thêm asset
 *  vào bundle, không phụ thuộc mạng, không vướng CSP.
 *
 *  Cũng tôn trọng prefers-reduced-motion: người xin ít chuyển động thường cũng
 *  là người đang muốn ít kích thích nói chung. */

const STORAGE_KEY = "thtc_world_sound";

export function useWorldSound() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(window.localStorage.getItem(STORAGE_KEY) === "on");
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      } catch {
        // chế độ riêng tư chặn localStorage - vẫn bật được cho phiên này
      }
      return next;
    });
  }, []);

  /** Một tiếng ngắn. `kind` chọn cao độ và độ dài; không có mẫu âm nào cả.
   *
   *  Tạo AudioContext ở LẦN PHÁT ĐẦU TIÊN chứ không lúc mount: tạo sớm thì nó
   *  ở trạng thái "suspended" cho tới khi người dùng chạm vào trang, và Chrome
   *  ghi một cảnh báo cho mỗi lần như vậy. */
  const play = useCallback(
    (kind: "step" | "enter" | "correct" | "sit") => {
      if (!enabled || typeof window === "undefined") return;
      try {
        const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return;
        const ctx = ctxRef.current ?? (ctxRef.current = new Ctor());
        if (ctx.state === "suspended") void ctx.resume();

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const spec = {
          step: { freq: 140, dur: 0.07, peak: 0.05, type: "triangle" as OscillatorType },
          enter: { freq: 420, dur: 0.22, peak: 0.09, type: "sine" as OscillatorType },
          sit: { freq: 260, dur: 0.18, peak: 0.07, type: "sine" as OscillatorType },
          correct: { freq: 660, dur: 0.26, peak: 0.1, type: "sine" as OscillatorType },
        }[kind];

        osc.type = spec.type;
        osc.frequency.setValueAtTime(spec.freq, now);
        if (kind === "correct") osc.frequency.exponentialRampToValueAtTime(spec.freq * 1.5, now + spec.dur);
        // Bao biên độ có tấn công và tắt dần: một sóng vuông bật/tắt đột ngột
        // sinh ra tiếng "cạch" ở hai đầu, nghe như lỗi chứ không như âm thanh.
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(spec.peak, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + spec.dur);

        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + spec.dur + 0.02);
      } catch {
        // Thiết bị không cho phát âm thanh thì im lặng bỏ qua - đây là thứ
        // trang trí, không được phép làm hỏng gì.
      }
    },
    [enabled]
  );

  return { enabled, toggle, play };
}
