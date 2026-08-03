"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pomodoroTexture } from "./room-textures";
import { POMODORO_MS } from "@/lib/supabase-lobby";

/** Đồng hồ treo trên một bàn đang có người ngồi học.
 *
 *  Đồng hồ thuộc về BÀN, không thuộc về người: mốc bắt đầu là mốc sớm nhất
 *  trong số người đang ngồi đó, nên ai ngồi xuống muộn vẫn nhận đúng thời gian
 *  còn lại thay vì khởi động một phiên riêng cạnh người khác. Đó là khác biệt
 *  giữa "cùng học" và "ngồi gần nhau". */
export default function PomodoroClock({
  position,
  startedAt,
  seatedCount,
}: {
  position: [number, number, number];
  startedAt: number;
  seatedCount: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  // Chỉ đổi mỗi giây, không mỗi frame: vẽ lại canvas 60 lần/giây cho một con
  // số chỉ nhảy mỗi giây là đốt GPU không đổi lấy gì.
  const [tick, setTick] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    const timer = window.setInterval(() => setTick(Math.floor(Date.now() / 1000)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const texture = useMemo(() => {
    const left = POMODORO_MS - (tick * 1000 - startedAt);
    return pomodoroTexture(left, seatedCount);
  }, [tick, startedAt, seatedCount]);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state) => {
    // Quay về camera để đọc được từ mọi phía trong phòng.
    if (mesh.current) mesh.current.quaternion.copy(state.camera.quaternion);
  });

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[1.5, 0.75]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}
