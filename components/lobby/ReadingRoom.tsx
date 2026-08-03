"use client";

import { useMemo } from "react";
import * as THREE from "three";
import {
  bookshelfTexture,
  cofferedCeilingTexture,
  marbleFloorTexture,
  oakTexture,
} from "./room-textures";

/** Kích thước sảnh. Phòng đọc Rose thật dài 297 feet, rộng 78, cao 52 - tỷ lệ
 *  ~4:1:0.7. Giữ đúng tỷ lệ đó nhưng thu nhỏ về đơn vị mét cho vừa tầm đi bộ,
 *  vì cảm giác "dài hun hút, trần rất cao" mới là thứ nhận ra căn phòng, không
 *  phải con số tuyệt đối. */
export const ROOM = {
  length: 56,
  width: 24,
  height: 13,
  /** Nhân vật không đi được ra ngoài khung này. */
  get bounds() {
    return { x: this.width / 2 - 1.6, z: this.length / 2 - 1.6 };
  },
};

const WINDOW_COUNT = 7;
const TABLE_ROWS = 6;

function ArchedWindow({ x, z, flip }: { x: number; z: number; flip: boolean }) {
  return (
    <group position={[x, 4.6, z]} rotation={[0, flip ? -Math.PI / 2 : Math.PI / 2, 0]}>
      {/* Hốc tường lõm vào, để cửa sổ không dán phẳng lên mặt tường */}
      <mesh position={[0, 0, -0.12]}>
        <boxGeometry args={[3.4, 6.4, 0.25]} />
        <meshStandardMaterial color="#b9a98f" />
      </mesh>
      {/* Ô kính: vật liệu phát sáng thay cho ánh sáng trời thật, rẻ hơn nhiều
          so với thêm bảy nguồn sáng vào cảnh */}
      <mesh>
        <planeGeometry args={[3, 5.4]} />
        <meshStandardMaterial
          color="#dff0ff"
          emissive="#cfe6ff"
          emissiveIntensity={1.15}
          toneMapped={false}
        />
      </mesh>
      {/* Vòm bán nguyệt phía trên */}
      <mesh position={[0, 2.7, 0]}>
        <circleGeometry args={[1.5, 24, 0, Math.PI]} />
        <meshStandardMaterial
          color="#dff0ff"
          emissive="#cfe6ff"
          emissiveIntensity={1.15}
          toneMapped={false}
        />
      </mesh>
      {/* Song chia ô kính */}
      {[-1, 0, 1].map((i) => (
        <mesh key={`v${i}`} position={[i * 1, 0, 0.02]}>
          <boxGeometry args={[0.09, 5.4, 0.06]} />
          <meshStandardMaterial color="#4b3a26" />
        </mesh>
      ))}
      {[-1.6, 0, 1.6].map((i) => (
        <mesh key={`h${i}`} position={[0, i, 0.02]}>
          <boxGeometry args={[3, 0.09, 0.06]} />
          <meshStandardMaterial color="#4b3a26" />
        </mesh>
      ))}
    </group>
  );
}

/** Đèn bàn chụp xanh - chi tiết mang tính biểu tượng nhất của phòng đọc.
 *  Chụp đèn phát sáng bằng vật liệu emissive; chỉ vài chiếc mang nguồn sáng
 *  thật, vì mỗi pointLight đều tính lại cho từng vertex. */
function DeskLamp({ position, lit }: { position: [number, number, number]; lit: boolean }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.13, 0.16, 0.12, 12]} />
        <meshStandardMaterial color="#6b5a2f" metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.52, 8]} />
        <meshStandardMaterial color="#8a7434" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.6, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.3, 0.26, 16, 1, true]} />
        <meshStandardMaterial
          color="#0f5132"
          emissive="#166534"
          emissiveIntensity={0.45}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial
          color="#fff4d0"
          emissive="#ffdca8"
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>
      {lit && <pointLight position={[0, 0.46, 0]} color="#ffcf8f" intensity={7} distance={7} decay={2} />}
    </group>
  );
}

function ReadingTable({ z }: { z: number }) {
  const wood = useMemo(() => oakTexture(6, 1), []);
  return (
    <group position={[0, 0, z]}>
      {/* Mặt bàn dài, đặt dọc theo chiều ngang sảnh */}
      <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
        <boxGeometry args={[9.5, 0.12, 1.7]} />
        <meshStandardMaterial map={wood} roughness={0.62} />
      </mesh>
      {/* Vách ngăn giữa bàn, nơi gắn dãy đèn */}
      <mesh position={[0, 0.98, 0]}>
        <boxGeometry args={[9.5, 0.3, 0.08]} />
        <meshStandardMaterial color="#5a3f27" roughness={0.7} />
      </mesh>
      {[-4.5, 4.5].map((x) => (
        <mesh key={x} position={[x, 0.39, 0]}>
          <boxGeometry args={[0.22, 0.78, 1.5]} />
          <meshStandardMaterial color="#5a3f27" roughness={0.75} />
        </mesh>
      ))}
      {[-3.2, -1.05, 1.05, 3.2].map((x, i) => (
        <DeskLamp key={x} position={[x, 0.84, 0]} lit={i === 1 || i === 2} />
      ))}
      {/* Ghế: chỉ gợi hình, người dùng không ngồi được nên không cần chi tiết */}
      {[-3.4, -1.2, 1.2, 3.4].map((x) =>
        [-1.5, 1.5].map((zo) => (
          <mesh key={`${x}:${zo}`} position={[x, 0.45, zo]}>
            <boxGeometry args={[0.5, 0.9, 0.5]} />
            <meshStandardMaterial color="#4a3524" roughness={0.85} />
          </mesh>
        ))
      )}
    </group>
  );
}

export default function ReadingRoom() {
  const floor = useMemo(() => marbleFloorTexture(), []);
  const ceiling = useMemo(() => cofferedCeilingTexture(), []);
  const books = useMemo(() => bookshelfTexture(), []);
  const panel = useMemo(() => oakTexture(8, 1), []);

  const halfL = ROOM.length / 2;
  const halfW = ROOM.width / 2;

  const windowZs = useMemo(
    () =>
      Array.from({ length: WINDOW_COUNT }, (_, i) =>
        -halfL + (ROOM.length / (WINDOW_COUNT + 1)) * (i + 1)
      ),
    [halfL]
  );

  const tableZs = useMemo(
    () =>
      Array.from({ length: TABLE_ROWS }, (_, i) =>
        -halfL + (ROOM.length / (TABLE_ROWS + 1)) * (i + 1)
      ),
    [halfL]
  );

  return (
    <group>
      {/* Sàn */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM.width, ROOM.length]} />
        <meshStandardMaterial map={floor} roughness={0.35} metalness={0.05} />
      </mesh>

      {/* Trần chạm ô */}
      <mesh position={[0, ROOM.height, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[ROOM.width, ROOM.length]} />
        <meshStandardMaterial map={ceiling} roughness={0.9} />
      </mesh>

      {/* Hai tường dài */}
      {[-halfW, halfW].map((x) => (
        <group key={x}>
          <mesh position={[x, ROOM.height / 2, 0]} rotation={[0, x > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
            <planeGeometry args={[ROOM.length, ROOM.height]} />
            <meshStandardMaterial color="#cbbca4" roughness={0.95} />
          </mesh>
          {/* Ốp gỗ chân tường + kệ sách âm tường */}
          <mesh position={[x + (x > 0 ? -0.16 : 0.16), 1.35, 0]} rotation={[0, x > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
            <planeGeometry args={[ROOM.length, 2.7]} />
            <meshStandardMaterial map={books} roughness={0.85} />
          </mesh>
          <mesh position={[x + (x > 0 ? -0.2 : 0.2), 2.85, 0]} rotation={[0, x > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
            <planeGeometry args={[ROOM.length, 0.34]} />
            <meshStandardMaterial map={panel} roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Hai tường đầu hồi */}
      {[-halfL, halfL].map((z) => (
        <mesh key={z} position={[0, ROOM.height / 2, z]} rotation={[0, z > 0 ? Math.PI : 0, 0]}>
          <planeGeometry args={[ROOM.width, ROOM.height]} />
          <meshStandardMaterial color="#cbbca4" roughness={0.95} />
        </mesh>
      ))}

      {/* Cửa sổ vòm hai bên */}
      {windowZs.map((z) => (
        <group key={z}>
          <ArchedWindow x={-halfW + 0.25} z={z} flip={false} />
          <ArchedWindow x={halfW - 0.25} z={z} flip />
        </group>
      ))}

      {/* Bàn đọc */}
      {tableZs.map((z) => (
        <ReadingTable key={z} z={z} />
      ))}

      {/* Đèn chùm dọc trục giữa */}
      {tableZs.map((z) => (
        <group key={`ch${z}`} position={[0, ROOM.height - 2.4, z]}>
          <mesh>
            <torusGeometry args={[0.85, 0.07, 8, 24]} />
            <meshStandardMaterial color="#8a7434" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 2.4, 6]} />
            <meshStandardMaterial color="#6b5a2f" metalness={0.85} />
          </mesh>
          {Array.from({ length: 6 }, (_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(a) * 0.85, 0.12, Math.sin(a) * 0.85]}>
                <sphereGeometry args={[0.12, 10, 10]} />
                <meshStandardMaterial
                  color="#fff2cf"
                  emissive="#ffd79a"
                  emissiveIntensity={2.2}
                  toneMapped={false}
                />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}
