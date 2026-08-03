"use client";

import { useEffect, useRef } from "react";
import type { DistrictRoom } from "./district-space";

/** Bản đồ nhỏ của căn phòng đang đứng.
 *
 *  Ba thế giới và hơn hai mươi phòng, mà cách duy nhất để biết mình đang ở đâu
 *  là đọc dòng chữ ở góc trái. Bản đồ này trả lời hai câu cùng lúc: phòng này
 *  hình gì, và mình đang ở chỗ nào trong đó - câu thứ hai là câu mà tên phòng
 *  không bao giờ trả lời được.
 *
 *  Vẽ bằng canvas 2D chứ không bằng DOM: nó cập nhật theo vị trí người chơi
 *  (~30 lần một giây), và ba chục thẻ div nhúc nhích liên tục sẽ kéo cả cây
 *  React render lại từng ấy lần. Canvas thì chỉ là mấy lệnh vẽ. */

export interface MinimapPeer {
  x: number;
  z: number;
  color: string;
}

interface Props {
  room: DistrictRoom;
  /** Vị trí người chơi, đọc mỗi khung hình từ ref của cảnh. */
  playerRef: React.MutableRefObject<{ x: number; z: number }>;
  peers: MinimapPeer[];
}

const SIZE = 120;
const PAD = 6;

export default function Minimap({ room, playerRef, peers }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const peersRef = useRef(peers);
  // Ghi trong effect, không ghi lúc render. Bản đồ vẽ trong một vòng
  // requestAnimationFrame chạy sau khi commit, nên nó không bao giờ đọc ref
  // này trong lúc render - đổi sang effect không lệch một khung hình nào.
  useEffect(() => {
    peersRef.current = peers;
  }, [peers]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    const { minX, maxX, minZ, maxZ } = room.bounds;
    const spanX = Math.max(1, maxX - minX);
    const spanZ = Math.max(1, maxZ - minZ);
    // Giữ đúng tỉ lệ phòng: một hành lang dài 40m mà vẽ thành hình vuông thì
    // bản đồ nói sai về chính thứ nó đang mô tả.
    const scale = Math.min((SIZE - PAD * 2) / spanX, (SIZE - PAD * 2) / spanZ);
    const offX = (SIZE - spanX * scale) / 2;
    const offZ = (SIZE - spanZ * scale) / 2;
    const toX = (x: number) => offX + (x - minX) * scale;
    const toZ = (z: number) => offZ + (z - minZ) * scale;

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // nền phòng
      ctx.fillStyle = "rgba(28,25,23,0.85)";
      ctx.fillRect(offX, offZ, spanX * scale, spanZ * scale);
      ctx.strokeStyle = room.accent;
      ctx.lineWidth = 1;
      ctx.strokeRect(offX + 0.5, offZ + 0.5, spanX * scale - 1, spanZ * scale - 1);

      // đồ đạc
      ctx.fillStyle = "rgba(255,255,255,0.13)";
      for (const o of room.obstacles) {
        if (o.kind === "box") {
          ctx.fillRect(toX(o.x - o.halfW), toZ(o.z - o.halfD), o.halfW * 2 * scale, o.halfD * 2 * scale);
        } else {
          ctx.beginPath();
          ctx.arc(toX(o.x), toZ(o.z), Math.max(1, o.radius * scale), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // cửa và cổng - thứ người ta tìm trên bản đồ nhiều nhất
      for (const d of room.doorways) {
        ctx.fillStyle = d.accent;
        ctx.fillRect(toX(d.x) - 2.5, toZ(d.z) - 2.5, 5, 5);
      }
      for (const p of room.portals) {
        ctx.fillStyle = p.accent;
        ctx.beginPath();
        ctx.arc(toX(p.x), toZ(p.z), 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // người khác
      for (const peer of peersRef.current) {
        ctx.fillStyle = peer.color;
        ctx.beginPath();
        ctx.arc(toX(peer.x), toZ(peer.z), 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // mình - vẽ sau cùng để không bị ai đè lên
      const me = playerRef.current;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(toX(me.x), toZ(me.z), 3.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#0c0a09";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [room, playerRef]);

  return (
    <div className="pointer-events-none absolute bottom-4 right-4 z-10 hidden rounded-2xl border border-stone-700 bg-stone-950/80 p-1.5 shadow-xl backdrop-blur sm:block">
      {/* Canvas không có nội dung nào cho trình đọc màn hình đọc, nên phải tự
          mô tả. `img` chứ không để mặc định: đây là một hình tĩnh về mặt ngữ
          nghĩa, không phải vùng tương tác. */}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Bản đồ nhỏ của ${room.label}, hiện vị trí của bạn và những người đang ở cùng phòng`}
        style={{ width: SIZE, height: SIZE }}
      />
      <p className="mt-0.5 text-center text-[9px] font-bold text-stone-500">{room.label}</p>
    </div>
  );
}
