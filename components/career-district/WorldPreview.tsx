"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import DistrictShell from "./DistrictShell";
import { DISTRICT_ROOMS, getRoom, type DistrictRoomId } from "./district-space";
import { CAREER_CATEGORY_ORDER, type CareerCategory } from "@/lib/career-categories";

/** Bàn đo cảnh 3D: chọn phòng, đọc chi phí thật.
 *
 *  Ba thứ trang này phải làm được mà `/pho-nghe` không làm được:
 *
 *  1. Vào được khi chưa đăng nhập - để soát bố cục mà không phải gõ mật khẩu.
 *  2. Chạy `frameloop="always"` vô điều kiện. Cảnh thật dừng vẽ khi tab bị ẩn
 *     (đúng đắn, tiết kiệm pin), nhưng khung xem của công cụ LUÔN báo là ẩn,
 *     nên qua đường đó không đo được gì cả.
 *  3. Đọc gl.info thật thay vì đếm thẻ <mesh> trong mã nguồn. Một component
 *     dùng sáu lần chỉ đếm một lần trong mã - con số đó nói dối.
 *
 *  Dữ liệu là dữ liệu giả cố định. Trang này để nhìn HÌNH HỌC; nội dung thật
 *  đã có test riêng và không cần một trình duyệt để kiểm. */

/** Đọc chi phí khung hình.
 *
 *  `gl.info.autoReset` mặc định là true, tức bộ đếm bị xoá TRƯỚC mỗi khung
 *  hình, nên đọc lúc nào cũng ra 0. Bản đầu của trang đo in đúng
 *  "draw calls: 0" và suýt được ghi lại thành kết luận. Phải tự tắt autoReset
 *  rồi tự reset SAU khi đọc. */
function Meter({ onRead }: { onRead: (line: string) => void }) {
  const { gl } = useThree();

  useEffect(() => {
    gl.info.autoReset = false;
    return () => {
      gl.info.autoReset = true;
    };
  }, [gl]);

  useFrame(() => {
    const r = gl.info.render;
    if (r.calls > 0) {
      onRead(
        `draw call: ${r.calls} · tam giác: ${r.triangles.toLocaleString("vi-VN")}` +
          ` · geometry: ${gl.info.memory.geometries} · texture: ${gl.info.memory.textures}`
      );
    }
    gl.info.reset();
  });

  return null;
}

const NO_SLUGS = new Set<string>();
const NO_SEATS = new Set<number>();

const FAKE_PROGRESS = Object.fromEntries(
  CAREER_CATEGORY_ORDER.map((c, i) => [c, { done: i, total: 8 }])
) as Record<CareerCategory, { done: number; total: number }>;

export default function WorldPreview() {
  // Lấy id từ `room.id` chứ không từ Object.keys: DISTRICT_ROOMS khai báo là
  // Record<string, …> nên keys ra `string`, còn getRoom nhận DistrictRoomId.
  const ids = useMemo(
    () => Object.values(DISTRICT_ROOMS).map((r) => r.id).sort(),
    []
  );
  const [id, setId] = useState<DistrictRoomId>("street");
  const [line, setLine] = useState("đang dựng…");
  // Số đo nhảy mỗi khung hình; giữ trong ref rồi bơm ra state theo nhịp chậm
  // để chữ đọc được, thay vì nhấp nháy 60 lần một giây.
  const latest = useRef(line);

  useEffect(() => {
    const t = setInterval(() => setLine(latest.current), 500);
    return () => clearInterval(t);
  }, []);

  const room = getRoom(id);

  return (
    // Xếp dọc chứ không chồng lớp: ở 375px danh sách 26 phòng xuống tới bảy
    // dòng, và bản đầu để dòng số đo ở `top-14` tuyệt đối nên nó nằm đè lên
    // giữa đám nút.
    <div className="fixed inset-0 flex flex-col bg-sky-300">
      <div className="flex shrink-0 flex-wrap gap-1 bg-stone-900 p-2">
        {ids.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => {
              setId(r);
              latest.current = "đang dựng…";
            }}
            className={`cursor-pointer rounded px-1.5 py-0.5 font-mono text-[10px] ${
              r === id ? "bg-cyan-400 text-stone-950" : "bg-stone-800/80 text-stone-200"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <p className="shrink-0 bg-stone-950 px-2 py-1 font-mono text-[11px] text-emerald-300">
        {id} — {line}
      </p>

      <div className="min-h-0 flex-1">
        {room && (
          <Canvas key={id} frameloop="always" shadows camera={{ position: [0, 14, 22], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 20, 10]} intensity={1.1} castShadow />
            <Meter onRead={(l) => (latest.current = l)} />
            <DistrictShell
              room={room}
              lessonTitles={room.desks.map((_, i) => `Bài mẫu ${i + 1}`)}
              doneSlugs={NO_SLUGS}
              dueSlugs={NO_SLUGS}
              progressByCategory={FAKE_PROGRESS}
              seatTaken={NO_SEATS}
            />
          </Canvas>
        )}
      </div>
    </div>
  );
}
