"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Cần điều khiển ảo dùng chung cho cả ba thế giới 3D.
 *
 * Trước file này có hai bản gần giống hệt nhau - một trong StudyRoomWorld, một
 * trong DistrictWorld, khác nhau đúng bán kính 44 với 46 - còn Sảnh thư viện
 * thì vẫn dùng bốn nút mũi tên phát sự kiện bàn phím GIẢ. Cách bốn nút ấy tồn
 * tại từ hồi lái kiểu xe tăng; từ khi cả ba thế giới đi theo hướng nhìn thì nó
 * chỉ còn là một cần điều khiển bốn hướng, thô hơn hẳn.
 *
 * Gộp về một chỗ để ba thế giới điều khiển giống nhau: đi từ thư viện sang Phố
 * nghề mà ngón tay phải học lại cách đi là thứ người dùng đọc thành "hai ứng
 * dụng khác nhau".
 */
/** Cần điều khiển ảo: kéo trong vòng tròn, thả ra thì về giữa.
 *
 *  Có cả cần lẫn phím lẫn chạm-để-đi vì ba nhóm người dùng khác nhau: người
 *  quen game dùng phím, người dùng điện thoại dùng cần, và người chưa từng
 *  điều khiển nhân vật 3D nào thì chạm vào chỗ muốn tới - cách cuối là cách duy
 *  nhất không phải học gì cả. Cả ba ghi vào cùng một vector nên không đánh nhau. */
export default function Joystick({
  onVector,
}: {
  onVector: (x: number, y: number) => void;
}) {
  const base = useRef<HTMLDivElement>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const active = useRef(false);

  const radius = 46;

  const update = useCallback(
    (clientX: number, clientY: number) => {
      const el = base.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = clientX - cx;
      let dy = clientY - cy;
      const len = Math.hypot(dx, dy);
      if (len > radius) {
        dx = (dx / len) * radius;
        dy = (dy / len) * radius;
      }
      setKnob({ x: dx, y: dy });
      // Màn hình có trục y hướng xuống; ý định "đi tới" là hướng lên.
      onVector(dx / radius, -dy / radius);
    },
    [onVector]
  );

  const stop = useCallback(() => {
    active.current = false;
    setKnob({ x: 0, y: 0 });
    onVector(0, 0);
  }, [onVector]);

  return (
    <div
      ref={base}
      className="pointer-events-auto relative h-28 w-28 touch-none rounded-full border border-stone-700/70 bg-stone-900/60 backdrop-blur"
      onPointerDown={(e) => {
        e.preventDefault();
        active.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (active.current) update(e.clientX, e.clientY);
      }}
      onPointerUp={stop}
      onPointerCancel={stop}
      onPointerLeave={() => active.current && stop()}
      role="application"
      aria-label="Cần điều khiển: kéo để đi"
    >
      <div
        className="absolute left-1/2 top-1/2 h-12 w-12 rounded-full bg-emerald-500/85 shadow-lg transition-[background] duration-150"
        style={{ transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))` }}
      />
      <span className="pointer-events-none absolute inset-x-0 -bottom-5 text-center text-[10px] font-bold text-stone-400">
        kéo để đi
      </span>
    </div>
  );
}
