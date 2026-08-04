"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { ROOM } from "./ReadingRoom";
import { PLAZA_Y, REAR_Z, SIDE_X0, SIDE_X1, STEP_Z0 } from "./world";
import { asphaltTexture } from "./room-textures";
import { StaticInstances } from "./instanced";
import type { DaySample } from "./daylight";

/** Cảnh vòng quanh thư viện: hai hẻm hông và sân sau.
 *
 *  Trước đây ngoài trời chỉ có quảng trường trước cửa. Bước ra là đứng trong
 *  một cái hộp: quay đầu thấy mặt tiền, ngoảnh sang hai bên thấy hư không, và
 *  toà nhà hoá ra chỉ là một tấm bìa dựng đứng. Vành đai này làm nó thành một
 *  khối có bốn mặt.
 *
 *  Mặt sau cố ý KHÔNG đẹp: thùng rác, điều hoà, xe tải giao hàng, cửa hậu.
 *  Một thư viện mà bốn mặt đều hoành tráng thì không giống một toà nhà thật -
 *  và cái phần lem nhem phía sau mới là thứ khiến mặt tiền trông có lý. */

const halfW = ROOM.width / 2;
const halfL = ROOM.length / 2;


/** Cục nóng điều hoà bám tường - chi tiết rẻ nhất biến một bức tường phẳng
 *  thành mặt sau của một toà nhà đang hoạt động. */

/** Toàn bộ cục nóng điều hoà bám tường, gộp về hai draw call.
 *
 *  Tám cái ở ba nơi: hai cái sau lưng thư viện, sáu cái trong hai hẻm hông.
 *  Trước đây mỗi cái là một group xoay chứa hai mesh, tức mười sáu draw call
 *  cho một thứ không ai nhìn quá hai giây.
 *
 *  Cánh quạt phải dùng quaternion ghép sẵn chứ không phải bộ Euler: bản cũ lồng
 *  một mesh xoay quanh X vào một group xoay quanh Y, và tích hai phép xoay đó
 *  không bằng Euler XYZ của cùng hai góc. */
function AcUnits({ units }: { units: Array<{ x: number; y: number; z: number; ry: number }> }) {
  const bodies = useMemo(
    () =>
      units.map((u) => ({
        position: [u.x, PLAZA_Y + u.y, u.z] as [number, number, number],
        rotation: [0, u.ry, 0] as [number, number, number],
      })),
    [units]
  );
  const fans = useMemo(
    () =>
      units.map((u) => ({
        // Mặt quạt nằm ở +0,29 theo trục z ĐỊA PHƯƠNG, nên phải xoay theo ry
        // trước khi cộng vào vị trí của cục nóng.
        position: [
          u.x + Math.sin(u.ry) * 0.29,
          PLAZA_Y + u.y,
          u.z + Math.cos(u.ry) * 0.29,
        ] as [number, number, number],
        quaternion: new THREE.Quaternion()
          .setFromEuler(new THREE.Euler(0, u.ry, 0))
          .multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0))),
      })),
    [units]
  );

  return (
    <group>
      <StaticInstances transforms={bodies} castShadow>
        <boxGeometry args={[1.1, 0.9, 0.55]} />
        <meshStandardMaterial color="#8b8d90" roughness={0.7} metalness={0.35} />
      </StaticInstances>
      <StaticInstances transforms={fans}>
        <cylinderGeometry args={[0.32, 0.32, 0.04, 14]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.8} />
      </StaticInstances>
    </group>
  );
}

/** Thùng rác: sáu cái, ba draw call thay vì hai mươi bốn. Màu thân khác nhau
 *  nên đi qua màu riêng của từng bản sao. */
function Dumpsters({ units }: { units: Array<{ x: number; z: number; color: string }> }) {
  const bodies = useMemo(
    () => units.map((u) => ({ position: [u.x, PLAZA_Y + 0.75, u.z] as [number, number, number] })),
    [units]
  );
  const lids = useMemo(
    () =>
      units.map((u) => ({
        position: [u.x, PLAZA_Y + 1.55, u.z] as [number, number, number],
        rotation: [-0.18, 0, 0] as [number, number, number],
      })),
    [units]
  );
  const wheels = useMemo(
    () =>
      units.flatMap((u) =>
        [-0.8, 0.8].map((wx) => ({
          position: [u.x + wx, PLAZA_Y + 0.12, u.z + 0.5] as [number, number, number],
          rotation: [Math.PI / 2, 0, 0] as [number, number, number],
        }))
      ),
    [units]
  );
  const colors = useMemo(() => units.map((u) => u.color), [units]);

  return (
    <group>
      <StaticInstances transforms={bodies} colors={colors} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.5, 1.3]} />
        <meshStandardMaterial roughness={0.85} metalness={0.2} />
      </StaticInstances>
      <StaticInstances transforms={lids} castShadow>
        <boxGeometry args={[2.3, 0.1, 1.4]} />
        <meshStandardMaterial color="#2f3a33" roughness={0.9} />
      </StaticInstances>
      <StaticInstances transforms={wheels}>
        <torusGeometry args={[0.12, 0.05, 6, 12]} />
        <meshStandardMaterial color="#1c1917" roughness={0.95} />
      </StaticInstances>
    </group>
  );
}

function DeliveryTruck({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, PLAZA_Y, z]} rotation={[0, Math.PI / 2, 0]}>
      <mesh position={[0, 1.35, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 2.3, 2.2]} />
        <meshStandardMaterial color="#d6d3d1" roughness={0.75} />
      </mesh>
      <mesh position={[2.6, 0.95, -0.4]} castShadow>
        <boxGeometry args={[1.6, 1.5, 2.1]} />
        <meshStandardMaterial color="#57534e" roughness={0.6} metalness={0.3} />
      </mesh>
      {[-1.3, 2.4].map((wx) => (
        <mesh key={wx} position={[wx, 0.4, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 12]} />
          <meshStandardMaterial color="#1c1917" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

/** Ống thoát nước chạy dọc tường - thứ mắt bắt được ngay là "mặt sau". */
function DrainPipe({ x, z, height }: { x: number; z: number; height: number }) {
  return (
    <mesh position={[x, PLAZA_Y + height / 2, z]} castShadow>
      <cylinderGeometry args={[0.14, 0.14, height, 8]} />
      <meshStandardMaterial color="#4a4844" roughness={0.9} />
    </mesh>
  );
}

export default function LibrarySurrounds({ day }: { day: DaySample }) {
  const asphalt = useMemo(() => asphaltTexture(), []);
  const alleyWidth = SIDE_X1 - SIDE_X0;
  const alleyCenter = (SIDE_X0 + SIDE_X1) / 2;
  const alleyDepth = STEP_Z0 - REAR_Z;
  const alleyMidZ = (STEP_Z0 + REAR_Z) / 2;
  const rearDepth = -halfL - REAR_Z;
  const rearMidZ = (-halfL + REAR_Z) / 2;

  // Đèn hẻm yếu hơn đèn quảng trường và chỉ bật khi trời tối - hẻm sáng trưng
  // giữa ban ngày trông sai, và một cái hẻm sáng bằng mặt tiền thì không còn
  // là hẻm.
  const lampOn = day.windowGlow < 0.45;

  return (
    <group>
      {/* Mặt sân hai hẻm và sân sau */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[side * alleyCenter, PLAZA_Y, alleyMidZ]}
          receiveShadow
        >
          <planeGeometry args={[alleyWidth, alleyDepth]} />
          <meshStandardMaterial map={asphalt} roughness={0.98} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, PLAZA_Y, rearMidZ]} receiveShadow>
        <planeGeometry args={[SIDE_X1 * 2, rearDepth]} />
        <meshStandardMaterial map={asphalt} roughness={0.98} />
      </mesh>

      {/* Tường rào ngoài cùng: nói "hết đường" mà không cần một bức tường vô
          hình. Cao vừa đủ để không che mất bầu trời. */}
      {[-1, 1].map((side) => (
        <mesh key={`fence-${side}`} position={[side * SIDE_X1, PLAZA_Y + 1.6, alleyMidZ]} castShadow>
          <boxGeometry args={[0.3, 3.2, alleyDepth]} />
          <meshStandardMaterial color="#4a443e" roughness={0.95} />
        </mesh>
      ))}
      <mesh position={[0, PLAZA_Y + 1.6, REAR_Z]} castShadow>
        <boxGeometry args={[SIDE_X1 * 2, 3.2, 0.3]} />
        <meshStandardMaterial color="#4a443e" roughness={0.95} />
      </mesh>

      {/* Mặt sau toà nhà: tường trơn, cửa hậu, ống nước, điều hoà. */}
      <mesh position={[0, PLAZA_Y + 5, -halfL - 0.15]} receiveShadow>
        <planeGeometry args={[ROOM.width, 12]} />
        <meshStandardMaterial color="#4a4038" roughness={0.98} />
      </mesh>
      <group position={[0, PLAZA_Y, -halfL - 0.1]}>
        <mesh position={[0, 1.3, 0.06]}>
          <planeGeometry args={[1.8, 2.6]} />
          <meshStandardMaterial color="#2b2420" roughness={0.9} />
        </mesh>
        {lampOn && (
          <>
            <mesh position={[0, 2.9, 0.2]}>
              <boxGeometry args={[0.5, 0.16, 0.3]} />
              <meshBasicMaterial color="#ffe0a8" toneMapped={false} />
            </mesh>
            <pointLight position={[0, 2.7, 1.4]} intensity={5} distance={9} color="#ffdca8" />
          </>
        )}
      </group>
      {[-7, 7].map((x) => (
        <DrainPipe key={x} x={x} z={-halfL - 0.4} height={11} />
      ))}
      {/* Tất cả cục nóng của cả ba mặt gom vào một cụm: hai cái sau lưng thư
          viện và sáu cái trong hai hẻm hông. */}
      <AcUnits
        units={[
          ...[-4.5, 3.5].map((x, i) => ({ x, z: -halfL - 0.55, ry: 0, y: 2.2 + i * 1.6 })),
          ...[-1, 1].flatMap((side) =>
            [-14, 2, 16].map((z) => ({
              x: side * (halfW + 0.55),
              z,
              ry: side < 0 ? Math.PI / 2 : -Math.PI / 2,
              y: 2.6,
            }))
          ),
        ]}
      />

      {/* Thùng rác mặt sau và trong hẻm - cùng một cụm. */}
      <Dumpsters
        units={[
          { x: -6, z: -halfL - 4, color: "#3f5f45" },
          { x: -3, z: -halfL - 4, color: "#4a4a4a" },
          ...[-1, 1].flatMap((side) =>
            [-6, 10].map((z) => ({ x: side * (SIDE_X1 - 1.6), z, color: "#4a4a4a" }))
          ),
        ]}
      />
      <DeliveryTruck x={7} z={-halfL - 5.5} />

      {lampOn &&
        [-1, 1].map((side) =>
          [-18, -4, 12].map((z) => (
            <group key={`l${side}:${z}`} position={[side * (halfW + 0.4), PLAZA_Y + 3.4, z]}>
              <mesh>
                <boxGeometry args={[0.36, 0.16, 0.28]} />
                <meshBasicMaterial color="#ffdca8" toneMapped={false} />
              </mesh>
              <pointLight intensity={3.5} distance={8} color="#ffdca8" />
            </group>
          ))
        )}
    </group>
  );
}
