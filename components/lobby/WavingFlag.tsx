"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vietnamFlagTexture } from "./room-textures";

/** Lá cờ đỏ sao vàng, vải phất theo gió.
 *
 *  Sóng vải làm bằng cách dịch đỉnh lưới mỗi khung hình chứ không bằng shader
 *  riêng: lưới chỉ 24×8 đỉnh nên chi phí không đáng kể, và giữ được
 *  meshStandardMaterial để lá cờ vẫn ăn đúng ánh sáng của cảnh thay vì sáng
 *  phẳng lì.
 *
 *  Biên độ nhân với bình phương khoảng cách tới cán cờ: mép sát cán phải đứng
 *  yên, nếu không lá cờ trông như đang rời khỏi cột. Lưới gốc được chụp lại một
 *  lần rồi mỗi khung tính từ bản gốc đó - dịch chồng lên vị trí của khung trước
 *  thì sai số cộng dồn và lá cờ sẽ từ từ nhàu nát. */
export default function WavingFlag({
  position,
  rotation,
  width = 2.7,
  height = 1.8,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
}) {
  const map = useMemo(() => vietnamFlagTexture(), []);
  const geom = useRef<THREE.PlaneGeometry>(null);
  const rest = useRef<Float32Array | null>(null);

  useFrame((state) => {
    const g = geom.current;
    if (!g) return;
    const pos = g.attributes.position as THREE.BufferAttribute;
    if (!rest.current) rest.current = Float32Array.from(pos.array as Float32Array);
    const base = rest.current;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < pos.count; i += 1) {
      const px = base[i * 3];
      const py = base[i * 3 + 1];
      // px chạy từ -width/2 (sát cán) tới +width/2 (mép bay).
      const grip = (px + width / 2) / width;
      pos.setZ(i, Math.sin(px * 2.6 - t * 3.1 + py * 0.7) * 0.19 * grip * grip);
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
  });

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry ref={geom} args={[width, height, 24, 8]} />
      <meshStandardMaterial map={map} side={THREE.DoubleSide} roughness={0.85} />
    </mesh>
  );
}
