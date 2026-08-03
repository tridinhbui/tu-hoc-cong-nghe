"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MEZZ_Y, type Floor } from "./world";
import { STATIONS, STATION_X, nearestStation, type Station } from "./stations";
import { formulaPlaqueTexture } from "./room-textures";

/** Hành lang cửa phòng học trên ban công tầng hai.
 *
 *  Mỗi cửa: khung đá, một mặt phát sáng theo màu riêng của phòng, và biển đá
 *  khắc công thức phía trên. Cửa nào người chơi đang đứng gần thì sáng hơn hẳn -
 *  đó là toàn bộ phản hồi "chỗ này bấm được", không cần thêm chữ trong cảnh 3D
 *  vì HUD đã lo phần chữ. */

function StationDoor({
  station,
  activeRef,
}: {
  station: Station;
  /** Id cửa đang được đứng gần, đọc mỗi khung hình. Dùng ref thay vì state:
   *  đây là dữ liệu đổi theo bước chân, và setState mỗi lần đi qua một cửa sẽ
   *  dựng lại cả cây React giữa lúc đang chạy 60fps. */
  activeRef: React.MutableRefObject<string | null>;
}) {
  const plaque = useMemo(
    () => formulaPlaqueTexture(station.room, station.formula, station.note, station.accent),
    [station.room, station.formula, station.note, station.accent]
  );
  const glow = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const near = activeRef.current === station.id;
    const pulse = 0.34 + Math.sin(state.clock.elapsedTime * 1.5 + station.z) * 0.08;
    if (glow.current) {
      const mat = glow.current.material as THREE.MeshBasicMaterial;
      mat.opacity = pulse + (near ? 0.42 : 0);
    }
    if (light.current) light.current.intensity = near ? 9 : 2.4;
  });

  const face = station.side > 0 ? -Math.PI / 2 : Math.PI / 2;

  return (
    <group position={[station.side * STATION_X, MEZZ_Y, station.z]} rotation={[0, face, 0]}>
      {/* Khung cửa */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 1.24, 1.75, 0]}>
          <boxGeometry args={[0.28, 3.5, 0.42]} />
          <meshStandardMaterial color="#ddd2bc" roughness={0.85} />
        </mesh>
      ))}
      <mesh position={[0, 3.62, 0]}>
        <boxGeometry args={[2.76, 0.36, 0.42]} />
        <meshStandardMaterial color="#ddd2bc" roughness={0.85} />
      </mesh>
      {/* Ngưỡng cửa, để chân cửa không cụt vào sàn ban công */}
      <mesh position={[0, 0.05, 0.12]}>
        <boxGeometry args={[2.76, 0.1, 0.7]} />
        <meshStandardMaterial color="#c9bda4" roughness={0.9} />
      </mesh>

      {/* Mặt sáng trong khung - "phòng bên kia" */}
      <mesh ref={glow} position={[0, 1.75, 0.14]}>
        <planeGeometry args={[2.2, 3.4]} />
        <meshBasicMaterial color={station.accent} transparent opacity={0.4} toneMapped={false} />
      </mesh>
      <pointLight
        ref={light}
        position={[0, 1.9, 1.1]}
        color={station.accent}
        intensity={2.4}
        distance={7}
        decay={2}
      />

      {/* Biển công thức */}
      <mesh position={[0, 4.42, 0.1]}>
        <planeGeometry args={[2.9, 1.09]} />
        <meshBasicMaterial map={plaque} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function StationDoors({
  playerRef,
  onNearChange,
}: {
  playerRef: React.MutableRefObject<{ x: number; z: number; floor: Floor }>;
  onNearChange: (station: Station | null) => void;
}) {
  const activeRef = useRef<string | null>(null);

  useFrame(() => {
    const p = playerRef.current;
    const found = nearestStation(p.x, p.z, p.floor);
    const id = found?.id ?? null;
    // Chỉ báo ra ngoài khi ĐỔI cửa. Gọi mỗi khung hình thì HUD re-render 60
    // lần/giây để hiển thị đúng một tấm thẻ không đổi.
    if (id !== activeRef.current) {
      activeRef.current = id;
      onNearChange(found);
    }
  });

  return (
    <group>
      {STATIONS.map((s) => (
        <StationDoor key={s.id} station={s} activeRef={activeRef} />
      ))}
    </group>
  );
}
