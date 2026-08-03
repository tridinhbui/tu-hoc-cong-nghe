"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ROOM } from "./ReadingRoom";
import { MEZZ_BAND, MEZZ_Y, ROOF_STAIR_Z0, ROOF_STAIR_Z1, ROOF_Y } from "./world";
import type { DaySample } from "./daylight";

/** Sân thượng thư viện.
 *
 *  Toà nhà có sàn đọc và ban công, và cả hai đều nhìn vào trong. Mái là chỗ duy
 *  nhất nhìn ra - thấy con phố, dãy nhà bên kia đường, và bầu trời đang ở đúng
 *  giờ thật của người học. Nó không có tính năng nào và không nên có: mỗi thứ
 *  trong thành phố này đều bắt người ta làm gì đó, và một chỗ để đứng yên là
 *  thứ còn thiếu.
 *
 *  Lên mái phải đi hết chiều dài ban công rồi leo thêm một thang nữa. Cố ý:
 *  chỗ nào cũng tới được trong ba giây thì không chỗ nào đáng tới. */

const halfW = ROOM.width / 2;
const halfL = ROOM.length / 2;

/** Bể nước trên mái - thứ có mặt trên mọi mái nhà Sài Gòn. */
function WaterTank({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, ROOF_Y, z]}>
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.9, 1.6, 14]} />
        <meshStandardMaterial color="#9aa3a8" roughness={0.55} metalness={0.45} />
      </mesh>
      {[-0.55, 0.55].map((ox) =>
        [-0.55, 0.55].map((oz) => (
          <mesh key={`${ox}:${oz}`} position={[ox, 0.35, oz]}>
            <boxGeometry args={[0.1, 0.7, 0.1]} />
            <meshStandardMaterial color="#5b5f63" roughness={0.8} metalness={0.3} />
          </mesh>
        ))
      )}
    </group>
  );
}

/** Kính viễn vọng chĩa ra phố. Không bấm được - nó ở đây để nói "chỗ này để
 *  nhìn", và một cái nút nữa sẽ biến chỗ đứng yên thành chỗ phải làm việc. */
function Telescope() {
  const tube = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    // Đảo rất chậm như có gió - đủ để nó không giống một khối dán chết.
    if (tube.current) tube.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
  });
  return (
    <group position={[0, ROOF_Y, halfL - 4]}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.09, 0.16, 1, 10]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.6} metalness={0.5} />
      </mesh>
      <mesh ref={tube} position={[0, 1.15, 0]} rotation={[0.5, 0, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.22, 1.5, 12]} />
        <meshStandardMaterial color="#1c2b33" roughness={0.35} metalness={0.7} />
      </mesh>
    </group>
  );
}

/** Dây đèn vắt ngang mái - chỉ sáng khi trời tối. */
function RoofLights({ on }: { on: boolean }) {
  return (
    <group>
      {[-8, 6].map((z) => (
        <group key={z}>
          <mesh position={[0, ROOF_Y + 2.6, z]}>
            <boxGeometry args={[halfW * 1.7, 0.03, 0.03]} />
            <meshStandardMaterial color="#2a2320" />
          </mesh>
          {on &&
            [-7, -3.5, 0, 3.5, 7].map((x) => (
              <group key={x} position={[x, ROOF_Y + 2.45, z]}>
                <mesh>
                  <sphereGeometry args={[0.1, 8, 8]} />
                  <meshBasicMaterial color="#ffcf87" toneMapped={false} />
                </mesh>
                <pointLight intensity={2.2} distance={9} color="#ffcf87" />
              </group>
            ))}
        </group>
      ))}
    </group>
  );
}

export default function Rooftop({ day }: { day: DaySample }) {
  const dark = day.windowGlow < 0.45;
  const lane = (MEZZ_BAND[0] + MEZZ_BAND[1]) / 2;

  return (
    <group>
      {/* Mặt mái */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, ROOF_Y, 0]} receiveShadow>
        <planeGeometry args={[ROOM.width, ROOM.length]} />
        <meshStandardMaterial color="#6b625a" roughness={0.98} />
      </mesh>

      {/* Lan can bốn phía. Đặc ở dưới và hở ở trên: đặc hết thì đứng trên mái
          không thấy phố, mà không thấy phố thì lên mái làm gì. */}
      {[
        { pos: [0, ROOF_Y + 0.55, -halfL + 0.3] as [number, number, number], args: [ROOM.width, 1.1, 0.25] as [number, number, number] },
        { pos: [0, ROOF_Y + 0.55, halfL - 0.3] as [number, number, number], args: [ROOM.width, 1.1, 0.25] as [number, number, number] },
        { pos: [-halfW + 0.3, ROOF_Y + 0.55, 0] as [number, number, number], args: [0.25, 1.1, ROOM.length] as [number, number, number] },
        { pos: [halfW - 0.3, ROOF_Y + 0.55, 0] as [number, number, number], args: [0.25, 1.1, ROOM.length] as [number, number, number] },
      ].map((r, i) => (
        <mesh key={i} position={r.pos} args={undefined} castShadow receiveShadow>
          <boxGeometry args={r.args} />
          <meshStandardMaterial color="#7d746a" roughness={0.95} />
        </mesh>
      ))}

      {/* Thang từ ban công lên mái, ở đầu bắc - hai bên, đúng dải ban công. */}
      {[-1, 1].map((side) => {
        const steps = 12;
        return (
          <group key={side}>
            {Array.from({ length: steps }, (_, i) => {
              const t = (i + 1) / steps;
              const z = ROOF_STAIR_Z0 + (ROOF_STAIR_Z1 - ROOF_STAIR_Z0) * t;
              const y = MEZZ_Y + (ROOF_Y - MEZZ_Y) * t;
              return (
                <mesh
                  key={i}
                  position={[side * lane, y - 0.12, z]}
                  castShadow
                  receiveShadow
                >
                  <boxGeometry args={[MEZZ_BAND[1] - MEZZ_BAND[0], 0.24, (ROOF_STAIR_Z1 - ROOF_STAIR_Z0) / steps]} />
                  <meshStandardMaterial color="#5c5349" roughness={0.9} />
                </mesh>
              );
            })}
            {/* Miệng thang trên mái: một khung nhô lên để nhìn từ trên mái biết
                đường xuống ở đâu. */}
            <mesh position={[side * lane, ROOF_Y + 0.5, ROOF_STAIR_Z1 + 0.2]}>
              <boxGeometry args={[MEZZ_BAND[1] - MEZZ_BAND[0] + 0.4, 1, 0.2]} />
              <meshStandardMaterial color="#7d746a" roughness={0.95} />
            </mesh>
          </group>
        );
      })}

      <WaterTank x={-halfW + 3} z={-halfL + 6} />
      <WaterTank x={-halfW + 3} z={-halfL + 9} />
      <Telescope />
      <RoofLights on={dark} />

      {/* Vài chậu cây và hai cái ghế - dấu hiệu duy nhất nói rằng chỗ này để
          ngồi chứ không phải để bảo trì. */}
      {[-3.5, 3.5].map((x) => (
        <group key={x} position={[x, ROOF_Y, halfL - 8]}>
          <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 0.09, 0.5]} />
            <meshStandardMaterial color="#6b4f33" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.55, -0.22]} castShadow>
            <boxGeometry args={[1.6, 0.5, 0.07]} />
            <meshStandardMaterial color="#6b4f33" roughness={0.9} />
          </mesh>
        </group>
      ))}
      {[[-6, halfL - 11], [6, halfL - 11]].map(([x, z]) => (
        <group key={x} position={[x, ROOF_Y, z]}>
          <mesh position={[0, 0.28, 0]} castShadow>
            <cylinderGeometry args={[0.34, 0.28, 0.56, 12]} />
            <meshStandardMaterial color="#6b4b32" roughness={0.9} />
          </mesh>
          {[0, 1, 2, 3].map((i) => {
            const a = (i / 4) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[Math.cos(a) * 0.18, 0.95, Math.sin(a) * 0.18]}
                rotation={[Math.cos(a) * 0.35, 0, Math.sin(a) * -0.35]}
                castShadow
              >
                <coneGeometry args={[0.2, 0.9, 5] as [number, number, number]} />
                <meshStandardMaterial color={i % 2 ? "#2f6b46" : "#3d8a58"} roughness={0.8} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}
