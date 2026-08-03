"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  BOARD,
  COFFEE_TABLE,
  COUNTER,
  DOOR,
  HALF_D,
  HALF_W,
  PLANTS,
  ROOM,
  SEATS,
  SHELF_X,
  SHELF_ZS,
  SOFA,
  TABLE,
} from "./study-room-space";
import { bookshelfTexture, boardTexture, oakTexture, rugTexture } from "@/components/lobby/room-textures";

/** Vỏ phòng và toàn bộ đồ đạc. Không tải model nào: mọi thứ là khối cơ bản với
 *  vân vẽ bằng canvas, cùng cách đại sảnh đang làm - một phòng nhóm phải mở
 *  được ngay trên máy yếu, và một file GLB vài MB thì không.
 *
 *  Toạ độ mọi thứ ở đây đọc từ study-room-space.ts, kể cả những thứ không phải
 *  vật cản: nếu cái bàn được vẽ ở một nơi và chặn ở một nơi khác thì chỉ cần
 *  đổi một con số là người học đi xuyên qua bàn. */

function Chair({ x, z, ry }: { x: number; z: number; ry: number }) {
  return (
    <group position={[x, 0, z]} rotation={[0, ry, 0]}>
      {/* mặt ghế */}
      <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.46, 0.07, 0.46]} />
        <meshStandardMaterial color="#4b3a2a" roughness={0.85} />
      </mesh>
      {/* lưng tựa - phía sau người ngồi, tức phía xa bàn */}
      <mesh position={[0, 0.74, 0.2]} castShadow>
        <boxGeometry args={[0.44, 0.52, 0.06]} />
        <meshStandardMaterial color="#4b3a2a" roughness={0.85} />
      </mesh>
      {[
        [-0.19, -0.19],
        [0.19, -0.19],
        [-0.19, 0.19],
        [0.19, 0.19],
      ].map(([lx, lz], i) => (
        <mesh key={i} position={[lx, 0.21, lz]}>
          <cylinderGeometry args={[0.028, 0.028, 0.42, 6]} />
          <meshStandardMaterial color="#33261a" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Plant({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.22, 0.4, 12]} />
        <meshStandardMaterial color="#6b4b32" roughness={0.9} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.16, 0.72, Math.sin(a) * 0.16]}
            rotation={[Math.cos(a) * 0.4, 0, Math.sin(a) * -0.4]}
            castShadow
          >
            <coneGeometry args={[0.17, 0.78, 5]} />
            <meshStandardMaterial color={i % 2 ? "#2f6b46" : "#3d8a58"} roughness={0.75} />
          </mesh>
        );
      })}
    </group>
  );
}

/** Đèn thả trên bàn. Ánh sáng thật (pointLight) chỉ có ở đây và ở cửa sổ: mỗi
 *  nguồn sáng động là một lần tính lại cho từng vật thể mỗi khung hình, nên
 *  phần còn lại của phòng sống bằng ambient + một directional duy nhất. */
function PendantLamp({ x, warm }: { x: number; warm: string }) {
  const light = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    // Nhấp nháy rất nhẹ, đủ để căn phòng không đứng hình như một tấm ảnh.
    if (light.current) {
      light.current.intensity = 12 + Math.sin(state.clock.elapsedTime * 1.7 + x) * 0.5;
    }
  });
  return (
    <group position={[x, 0, TABLE.z]}>
      <mesh position={[0, 2.62, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 1.1, 4]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0, 2.02, 0]} castShadow>
        <coneGeometry args={[0.34, 0.34, 16, 1, true]} />
        <meshStandardMaterial color="#1f1b17" side={THREE.DoubleSide} roughness={0.6} metalness={0.4} />
      </mesh>
      {/* Bóng đèn nhô hẳn xuống dưới miệng chụp: nằm gọn bên trong thì từ mọi
          góc nhìn ngang, cái đèn chỉ là một hình nón đen. */}
      <mesh position={[0, 1.82, 0]}>
        <sphereGeometry args={[0.13, 12, 12]} />
        <meshBasicMaterial color={warm} toneMapped={false} />
      </mesh>
      {/* Mặt trong chụp đèn hắt sáng, để cái chụp trông như đang bật. */}
      <mesh position={[0, 2.02, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.33, 0.33, 16, 1, true]} />
        <meshBasicMaterial color={warm} side={THREE.BackSide} toneMapped={false} />
      </mesh>
      <pointLight ref={light} position={[0, 1.85, 0]} intensity={12} distance={7.5} color={warm} castShadow />
    </group>
  );
}

interface Props {
  /** Dòng chữ trên bảng trắng: mục tiêu tuần và nhiệm vụ đang chạy. */
  boardTitle: string;
  boardRows: string[];
  /** Màu ánh đèn, đổi theo giờ trong ngày ở phía gọi. */
  lampColor: string;
  /** Cường độ sáng qua cửa sổ: ban ngày sáng, khuya gần như tắt. */
  daylight: number;
}

export default function StudyRoomShell({ boardTitle, boardRows, lampColor, daylight }: Props) {
  const floorTex = useMemo(() => {
    const t = oakTexture(10, 12);
    return t;
  }, []);
  const shelfTex = useMemo(() => bookshelfTexture(), []);
  const rug = useMemo(() => rugTexture(), []);

  // boardTexture dựng canvas mới mỗi lần gọi (không qua cache của room-textures),
  // nên phải tự dọn - nội dung bảng đổi mỗi khi mục tiêu tuần nhích lên.
  const board = useMemo(
    () => boardTexture(boardTitle, boardRows, { accent: "#34d399" }),
    [boardTitle, boardRows]
  );
  useEffect(() => () => board.dispose(), [board]);

  return (
    <group>
      {/* ── Sàn ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM.width, ROOM.depth]} />
        <meshStandardMaterial map={floorTex} roughness={0.82} />
      </mesh>

      {/* Thảm dưới bàn: mảng màu ấm cắt bớt mặt sàn mênh mông, và cũng là dấu
          hiệu thị giác cho biết "chỗ ngồi học là đây". */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[TABLE.x, 0.01, TABLE.z]} receiveShadow>
        <planeGeometry args={[7.4, 5]} />
        <meshStandardMaterial map={rug} roughness={0.95} />
      </mesh>

      {/* ── Trần ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM.height, 0]}>
        <planeGeometry args={[ROOM.width, ROOM.depth]} />
        <meshStandardMaterial color="#221d19" roughness={1} />
      </mesh>

      {/* ── Bốn bức tường ──
          Vẽ mặt trong (BackSide trên một hộp thì rẻ hơn bốn mặt phẳng, nhưng
          bốn mặt phẳng cho phép mỗi tường một màu và một thứ treo lên). */}
      {/* bắc - tường có bảng */}
      <mesh position={[0, ROOM.height / 2, -HALF_D]} receiveShadow>
        <planeGeometry args={[ROOM.width, ROOM.height]} />
        <meshStandardMaterial color="#3a312a" roughness={0.95} />
      </mesh>
      {/* nam - tường có cửa */}
      <mesh position={[0, ROOM.height / 2, HALF_D]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[ROOM.width, ROOM.height]} />
        <meshStandardMaterial color="#3a312a" roughness={0.95} />
      </mesh>
      {/* tây - tường kệ sách */}
      <mesh position={[-HALF_W, ROOM.height / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[ROOM.depth, ROOM.height]} />
        <meshStandardMaterial color="#332b25" roughness={0.95} />
      </mesh>
      {/* đông - tường cửa sổ */}
      <mesh position={[HALF_W, ROOM.height / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[ROOM.depth, ROOM.height]} />
        <meshStandardMaterial color="#332b25" roughness={0.95} />
      </mesh>

      {/* ── Bảng trắng: mục tiêu tuần của cả nhóm ── */}
      <group position={[BOARD.x, BOARD.y, BOARD.z]}>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[BOARD.width, BOARD.height]} />
          <meshBasicMaterial map={board} toneMapped={false} />
        </mesh>
        <mesh>
          <planeGeometry args={[BOARD.width + 0.16, BOARD.height + 0.16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>
      </group>

      {/* ── Bàn học chung ── */}
      <group position={[TABLE.x, 0, TABLE.z]}>
        <mesh position={[0, TABLE.top, 0]} castShadow receiveShadow>
          <boxGeometry args={[TABLE.halfW * 2, 0.1, TABLE.halfD * 2]} />
          <meshStandardMaterial map={floorTex} color="#8b6a45" roughness={0.55} />
        </mesh>
        {[
          [-TABLE.halfW + 0.25, -TABLE.halfD + 0.25],
          [TABLE.halfW - 0.25, -TABLE.halfD + 0.25],
          [-TABLE.halfW + 0.25, TABLE.halfD - 0.25],
          [TABLE.halfW - 0.25, TABLE.halfD - 0.25],
        ].map(([lx, lz], i) => (
          <mesh key={i} position={[lx, TABLE.top / 2, lz]} castShadow>
            <boxGeometry args={[0.1, TABLE.top, 0.1]} />
            <meshStandardMaterial color="#4a3524" roughness={0.9} />
          </mesh>
        ))}
        {/* Vài quyển sách và một cốc cà phê trên mặt bàn - phòng học trống trơn
            trông như phòng chưa ai dùng. */}
        <mesh position={[-1.4, TABLE.top + 0.09, 0.2]} rotation={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.42, 0.08, 0.3]} />
          <meshStandardMaterial color="#7f1d1d" roughness={0.8} />
        </mesh>
        <mesh position={[1.25, TABLE.top + 0.07, -0.25]} rotation={[0, -0.5, 0]} castShadow>
          <boxGeometry args={[0.4, 0.05, 0.28]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
        </mesh>
        <mesh position={[0.4, TABLE.top + 0.1, 0.42]} castShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.14, 12]} />
          <meshStandardMaterial color="#e7e5e4" roughness={0.4} />
        </mesh>
      </group>

      {SEATS.map((s) => (
        <Chair key={s.index} x={s.x} z={s.z} ry={s.ry} />
      ))}

      <PendantLamp x={-1.5} warm={lampColor} />
      <PendantLamp x={1.5} warm={lampColor} />

      {/* ── Kệ sách áp tường tây ── */}
      {SHELF_ZS.map((z) => (
        <mesh key={z} position={[SHELF_X, 1.1, z]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 2.2, 3]} />
          <meshStandardMaterial map={shelfTex} roughness={0.9} />
        </mesh>
      ))}

      {/* ── Cửa sổ tường đông ──
          Kính là mặt phẳng phát sáng chứ không phải vật liệu trong suốt: ánh
          sáng thật xuyên kính cần refraction, đắt và ở đây không ai nhìn ra
          ngoài đủ lâu để nhận ra khác biệt. */}
      {[-4, 0.4, 4.8].map((z) => (
        <group key={z} position={[HALF_W - 0.06, 2.05, z]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh>
            <planeGeometry args={[2.2, 2.4]} />
            <meshBasicMaterial color="#8ec5ff" opacity={0.25 + daylight * 0.65} transparent />
          </mesh>
          <mesh position={[0, 0, -0.02]}>
            <planeGeometry args={[2.45, 2.65]} />
            <meshStandardMaterial color="#3b3128" roughness={0.8} />
          </mesh>
        </group>
      ))}
      {/* Một nguồn sáng duy nhất cho cả ba ô cửa, đặt giữa chúng: ba pointLight
          cạnh nhau tốn gấp ba mà nhìn không khác. */}
      <pointLight
        position={[HALF_W - 1.2, 2.4, 0.4]}
        intensity={4 + daylight * 26}
        distance={16}
        color="#cfe4ff"
      />

      {/* ── Góc nghỉ đông nam ── */}
      <group position={[SOFA.x, 0, SOFA.z]}>
        <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.34, 1.1]} />
          <meshStandardMaterial color="#3f4a3a" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.72, 0.42]} castShadow>
          <boxGeometry args={[2.5, 0.62, 0.26]} />
          <meshStandardMaterial color="#465440" roughness={0.95} />
        </mesh>
      </group>
      <mesh position={[COFFEE_TABLE.x, 0.36, COFFEE_TABLE.z]} castShadow receiveShadow>
        <cylinderGeometry args={[COFFEE_TABLE.radius, COFFEE_TABLE.radius * 0.85, 0.06, 20]} />
        <meshStandardMaterial color="#6b4f33" roughness={0.7} />
      </mesh>
      <mesh position={[COFFEE_TABLE.x, 0.18, COFFEE_TABLE.z]}>
        <cylinderGeometry args={[0.09, 0.09, 0.36, 8]} />
        <meshStandardMaterial color="#4a3524" roughness={0.9} />
      </mesh>

      {/* ── Quầy nước ── */}
      <group position={[COUNTER.x, 0, COUNTER.z]}>
        <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
          <boxGeometry args={[COUNTER.halfW * 2, 0.96, COUNTER.halfD * 2]} />
          <meshStandardMaterial color="#3b322a" roughness={0.85} />
        </mesh>
        <mesh position={[-0.1, 1.06, 0.3]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.24, 12]} />
          <meshStandardMaterial color="#0f766e" roughness={0.5} />
        </mesh>
        <mesh position={[-0.1, 1.06, -0.35]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.2, 12]} />
          <meshStandardMaterial color="#b45309" roughness={0.5} />
        </mesh>
      </group>

      {PLANTS.map(([x, z]) => (
        <Plant key={`${x}:${z}`} x={x} z={z} />
      ))}

      {/* ── Cửa ra, tường nam ──
          Khung cửa mở ra một mảng sáng: cửa đóng kín trông như phòng bị nhốt,
          và người học cần thấy đường ra trước khi bước vào. */}
      <group position={[DOOR.x, 0, DOOR.z - 0.04]}>
        <mesh position={[0, DOOR.height / 2, 0]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[DOOR.halfWidth * 2, DOOR.height]} />
          <meshBasicMaterial color="#f5deb3" opacity={0.5} transparent />
        </mesh>
        <mesh position={[0, DOOR.height / 2, 0.03]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[DOOR.halfWidth * 2 + 0.3, DOOR.height + 0.18]} />
          <meshStandardMaterial color="#241d18" roughness={0.9} />
        </mesh>
      </group>
      <pointLight position={[DOOR.x, 2, DOOR.z - 0.9]} intensity={5} distance={6} color="#ffd9a0" />
    </group>
  );
}
