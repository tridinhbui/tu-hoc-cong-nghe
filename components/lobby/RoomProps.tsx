"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { ROOM, TABLE_ZS } from "./ReadingRoom";
import {
  ARMCHAIR_X,
  ARMCHAIR_ZS,
  BUST_ZS,
  CARREL_X,
  CARREL_ZS,
  CATALOG_ZS,
  GLOBE_POS,
  FLAGPOLE_SPOTS,
  PLANT_SPOTS,
  ROTUNDA_COLUMNS,
  ROTUNDA_RADIUS,
  ROTUNDA_Z,
} from "./room-obstacles";
import {
  MEZZ_DEPTH,
  MEZZ_INNER_X,
  MEZZ_Y,
  STAIR_STEPS,
  STAIR_Z0,
  STAIR_Z1,
} from "./world";
import { globeTexture, oakTexture, rugTexture, wallClockTexture } from "./room-textures";
import WavingFlag from "./WavingFlag";

/** Nội thất và kiến trúc phụ. Tách khỏi ReadingRoom vì file kia lo phần vỏ -
 *  sàn, tường, trần, cửa sổ, bàn - còn đây là những thứ làm căn phòng có chiều
 *  sâu để đi bộ qua: sảnh tròn ở lối vào, ban công lửng, tủ phiếu mục lục,
 *  tượng bán thân, chậu cọ, thảm, đồng hồ lớn.
 *
 *  Mọi vật cản đi kèm đã khai báo ở room-obstacles.ts - đừng thêm khối chặn ở
 *  đây, hai nguồn sự thật là cách chắc chắn nhất để chúng lệch nhau. */

const halfL = ROOM.length / 2;
const halfW = ROOM.width / 2;

/** Cột đá kiểu Corinth rút gọn: thân có gờ, đế và đầu cột loe ra. */
function Column({ x, z, height = 8.4 }: { x: number; z: number; height?: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[1.5, 0.44, 1.5]} />
        <meshStandardMaterial color="#cfc3ac" roughness={0.9} />
      </mesh>
      <mesh position={[0, height / 2 + 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.58, height, 16]} />
        <meshStandardMaterial color="#ddd2bc" roughness={0.85} />
      </mesh>
      <mesh position={[0, height + 0.55, 0]}>
        <cylinderGeometry args={[0.74, 0.52, 0.5, 16]} />
        <meshStandardMaterial color="#e5dbc6" roughness={0.8} />
      </mesh>
      <mesh position={[0, height + 0.92, 0]}>
        <boxGeometry args={[1.65, 0.3, 1.65]} />
        <meshStandardMaterial color="#cfc3ac" roughness={0.9} />
      </mesh>
    </group>
  );
}

/** Quả địa cầu đồng trên bệ - điểm nhấn giữa sảnh tròn và cũng là mốc định
 *  hướng: nhìn thấy nó là biết đâu là lối vào. */
function BrassGlobe() {
  const map = useMemo(() => globeTexture(), []);
  const [x, z] = GLOBE_POS;
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.85, 1.0, 0.6, 20]} />
        <meshStandardMaterial color="#4a3220" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.16, 0.22, 0.55, 12]} />
        <meshStandardMaterial color="#8a7434" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.85, 0]} rotation={[0, 0, 0.4]} castShadow>
        <sphereGeometry args={[0.78, 32, 24]} />
        <meshStandardMaterial map={map} roughness={0.55} metalness={0.2} />
      </mesh>
      {/* Vòng kinh tuyến bằng đồng ôm ngoài */}
      <mesh position={[0, 1.85, 0]} rotation={[0, 0, 0.4]}>
        <torusGeometry args={[0.9, 0.045, 8, 40]} />
        <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.25} />
      </mesh>
    </group>
  );
}

/** Tủ phiếu mục lục: khối gỗ với lưới ô kéo nhỏ, mỗi ô một núm đồng. */
function CardCatalog({ x, z, flip }: { x: number; z: number; flip: boolean }) {
  const wood = useMemo(() => oakTexture(2, 2), []);
  const cols = 4;
  const rows = 5;
  return (
    <group position={[x, 0, z]} rotation={[0, flip ? -Math.PI / 2 : Math.PI / 2, 0]}>
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[2.6, 1.7, 1.3]} />
        <meshStandardMaterial map={wood} roughness={0.7} />
      </mesh>
      {/* Mặt trước các ngăn kéo */}
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const px = -1.0 + c * 0.66;
          const py = 0.28 + r * 0.3;
          return (
            <group key={`${r}:${c}`} position={[px, py, 0.66]}>
              <mesh>
                <boxGeometry args={[0.58, 0.24, 0.03]} />
                <meshStandardMaterial color="#5a3f27" roughness={0.65} />
              </mesh>
              <mesh position={[0, 0, 0.03]}>
                <sphereGeometry args={[0.035, 8, 8]} />
                <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.3} />
              </mesh>
            </group>
          );
        })
      )}
      <mesh position={[0, 1.76, 0]}>
        <boxGeometry args={[2.75, 0.12, 1.45]} />
        <meshStandardMaterial color="#4a3220" roughness={0.7} />
      </mesh>
    </group>
  );
}

/** Tượng bán thân trên bệ đá. Không có mặt mũi gì - ở khoảng cách đi bộ, một
 *  khối đầu-vai trên bệ đã đọc ra ngay là tượng. */
function Bust({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.86, 1.1, 0.86]} />
        <meshStandardMaterial color="#bfb49c" roughness={0.92} />
      </mesh>
      <mesh position={[0, 1.14, 0]}>
        <boxGeometry args={[1.0, 0.1, 1.0]} />
        <meshStandardMaterial color="#d3c9b2" roughness={0.88} />
      </mesh>
      <mesh position={[0, 1.46, 0]} castShadow>
        <capsuleGeometry args={[0.27, 0.3, 4, 12]} />
        <meshStandardMaterial color="#e3dac6" roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.86, 0]} castShadow>
        <sphereGeometry args={[0.21, 16, 16]} />
        <meshStandardMaterial color="#e3dac6" roughness={0.85} />
      </mesh>
    </group>
  );
}

/** Chậu cọ. Lá dựng bằng vài mặt phẳng xoè ra từ tâm - rẻ hơn nhiều so với
 *  hình học lá thật, và trong ánh đèn ấm thì khác biệt không đáng kể. */
function PottedPalm({ x, z }: { x: number; z: number }) {
  const fronds = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        angle: (i / 7) * Math.PI * 2,
        tilt: 0.5 + (i % 3) * 0.16,
        len: 1.1 + (i % 2) * 0.25,
      })),
    []
  );
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.42, 0.32, 0.64, 14]} />
        <meshStandardMaterial color="#7a4a2b" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.66, 0]}>
        <cylinderGeometry args={[0.44, 0.44, 0.08, 14]} />
        <meshStandardMaterial color="#3f2a18" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.8, 8]} />
        <meshStandardMaterial color="#4a5d32" roughness={0.8} />
      </mesh>
      {fronds.map((f, i) => (
        <mesh
          key={i}
          position={[Math.cos(f.angle) * 0.3, 1.5, Math.sin(f.angle) * 0.3]}
          rotation={[f.tilt, -f.angle, 0]}
        >
          <planeGeometry args={[0.3, f.len]} />
          <meshStandardMaterial
            color="#2f6b3a"
            roughness={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Ban công lửng chạy dọc hai tường dài, có lan can con tiện - và giờ lên được
 *  thật bằng cầu thang ở đầu bắc.
 *
 *  Sàn ban công BẮT ĐẦU từ đầu thang chứ không chạy suốt chiều dài phòng: chạy
 *  suốt thì nó thành cái trần thấp 6,4m ngay trên đầu người đang leo thang. */
function Mezzanine({ side }: { side: -1 | 1 }) {
  const wood = useMemo(() => oakTexture(10, 1), []);
  const y = MEZZ_Y;
  const deckZ0 = STAIR_Z1;
  const deckZ1 = halfL;
  const deckLen = deckZ1 - deckZ0;
  const deckCz = (deckZ0 + deckZ1) / 2;
  const x = side * (halfW - MEZZ_DEPTH / 2);
  const railX = side * MEZZ_INNER_X;
  const balusters = useMemo(
    () => Array.from({ length: 34 }, (_, i) => deckZ0 + 0.6 + (i * (deckLen - 1.2)) / 33),
    [deckZ0, deckLen]
  );
  return (
    <group>
      {/* Sàn ban công */}
      <mesh position={[x, y, deckCz]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[MEZZ_DEPTH, deckLen]} />
        <meshStandardMaterial map={wood} roughness={0.75} side={THREE.DoubleSide} />
      </mesh>
      {/* Diềm dưới sàn */}
      <mesh position={[x, y - 0.18, deckCz]}>
        <boxGeometry args={[MEZZ_DEPTH, 0.34, deckLen]} />
        <meshStandardMaterial color="#5a3f27" roughness={0.8} />
      </mesh>
      {/* Tay vịn */}
      <mesh position={[railX, y + 1.0, deckCz]}>
        <boxGeometry args={[0.16, 0.14, deckLen]} />
        <meshStandardMaterial color="#6b4a2f" roughness={0.7} />
      </mesh>
      {balusters.map((bz) => (
        <mesh key={bz} position={[railX, y + 0.5, bz]}>
          <cylinderGeometry args={[0.05, 0.06, 1.0, 6]} />
          <meshStandardMaterial color="#7a5836" roughness={0.75} />
        </mesh>
      ))}
      <Staircase side={side} />
      <MezzanineFurniture side={side} />
    </group>
  );
}

/** Đồ trên ban công: bàn học cá nhân nép tường ngoài, ghế bành quay ra lan can.
 *
 *  Ban công mà trống thì nó chỉ là một hành lang để đi qua. Vị trí lấy từ
 *  world.ts vì mỗi món vừa được vẽ ở đây vừa chặn đường ở đó. */
function MezzanineFurniture({ side }: { side: -1 | 1 }) {
  const wood = useMemo(() => oakTexture(1, 1), []);
  const y = MEZZ_Y;
  return (
    <group>
      {CARREL_ZS.map((z) => (
        <group key={`carrel${z}`} position={[side * CARREL_X, y, z]}>
          <mesh position={[0, 0.74, 0]} castShadow>
            <boxGeometry args={[1.0, 0.08, 1.75]} />
            <meshStandardMaterial map={wood} roughness={0.65} />
          </mesh>
          {[-0.78, 0.78].map((zo) => (
            <mesh key={zo} position={[0, 0.37, zo]}>
              <boxGeometry args={[0.9, 0.74, 0.08]} />
              <meshStandardMaterial color="#5a3f27" roughness={0.75} />
            </mesh>
          ))}
          {/* Vách ngăn phía tường, đúng kiểu bàn học cá nhân trong thư viện */}
          <mesh position={[side * 0.46, 1.06, 0]}>
            <boxGeometry args={[0.07, 0.62, 1.75]} />
            <meshStandardMaterial color="#4a3220" roughness={0.8} />
          </mesh>
          {/* Đèn chụp xanh thu nhỏ */}
          <mesh position={[side * 0.28, 1.06, 0.55]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.19, 0.17, 12, 1, true]} />
            <meshStandardMaterial
              color="#0f5132"
              emissive="#166534"
              emissiveIntensity={0.4}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[-side * 0.62, 0.42, 0]}>
            <boxGeometry args={[0.48, 0.84, 0.48]} />
            <meshStandardMaterial color="#4a3524" roughness={0.85} />
          </mesh>
        </group>
      ))}
      {ARMCHAIR_ZS.map((z) => (
        <group key={`chair${z}`} position={[side * ARMCHAIR_X, y, z]} rotation={[0, side * -Math.PI / 2, 0]}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[0.95, 0.34, 0.9]} />
            <meshStandardMaterial color="#5c2c33" roughness={0.92} />
          </mesh>
          <mesh position={[-0.42, 0.76, 0]}>
            <boxGeometry args={[0.16, 0.78, 0.9]} />
            <meshStandardMaterial color="#5c2c33" roughness={0.92} />
          </mesh>
          {[-0.42, 0.42].map((zo) => (
            <mesh key={zo} position={[0.02, 0.62, zo]}>
              <boxGeometry args={[0.86, 0.16, 0.14]} />
              <meshStandardMaterial color="#4b232a" roughness={0.9} />
            </mesh>
          ))}
          {[-0.4, 0.4].map((xo) =>
            [-0.36, 0.36].map((zo) => (
              <mesh key={`${xo}:${zo}`} position={[xo, 0.11, zo]}>
                <cylinderGeometry args={[0.05, 0.05, 0.22, 6]} />
                <meshStandardMaterial color="#3a2a1c" roughness={0.9} />
              </mesh>
            ))
          )}
        </group>
      ))}
    </group>
  );
}

/** Cầu thang ôm tường từ sàn lên ban công.
 *
 *  Mỗi bậc là một khối đặc từ nền lên tới mặt bậc, không phải bậc rỗng có cổ
 *  bậc riêng. Ở khoảng cách đi bộ hai cách cho ra cùng một hình, và khối đặc
 *  thì không bao giờ hở khe cho nhìn xuyên xuống dưới. */
function Staircase({ side }: { side: -1 | 1 }) {
  const wood = useMemo(() => oakTexture(1, 1), []);
  const run = STAIR_Z1 - STAIR_Z0;
  const tread = run / STAIR_STEPS;
  const rise = MEZZ_Y / STAIR_STEPS;
  const x = side * (halfW - MEZZ_DEPTH / 2);
  const railX = side * MEZZ_INNER_X;
  return (
    <group>
      {Array.from({ length: STAIR_STEPS }, (_, i) => {
        const top = (i + 1) * rise;
        return (
          <mesh key={i} position={[x, top / 2, STAIR_Z0 + (i + 0.5) * tread]} receiveShadow>
            <boxGeometry args={[MEZZ_DEPTH, top, tread]} />
            <meshStandardMaterial map={wood} roughness={0.8} />
          </mesh>
        );
      })}
      {/* Tay vịn nghiêng theo dốc thang. Góc lấy từ đúng run/rise của thang, nên
          đổi số bậc thì tay vịn tự bám theo. */}
      <mesh
        position={[railX, MEZZ_Y / 2 + 1.0, (STAIR_Z0 + STAIR_Z1) / 2]}
        rotation={[Math.atan2(MEZZ_Y, run), 0, 0]}
      >
        <boxGeometry args={[0.16, 0.14, Math.hypot(run, MEZZ_Y)]} />
        <meshStandardMaterial color="#6b4a2f" roughness={0.7} />
      </mesh>
      {Array.from({ length: 9 }, (_, i) => {
        const z = STAIR_Z0 + ((i + 0.5) * run) / 9;
        const base = ((i + 0.5) / 9) * MEZZ_Y;
        return (
          <mesh key={`b${i}`} position={[railX, base + 0.5, z]}>
            <cylinderGeometry args={[0.05, 0.06, 1.0, 6]} />
            <meshStandardMaterial color="#7a5836" roughness={0.75} />
          </mesh>
        );
      })}
    </group>
  );
}

/** Cột cờ đứng trong sảnh tròn.
 *
 *  Trước đây là cột nghiêng gắn tường dài, và lá cờ nằm đúng cao độ camera:
 *  đi bộ dọc tường là camera chui thẳng qua vải cờ, cả khung hình thành một
 *  mảng đỏ. Cột đứng trong sảnh tròn giải quyết cả hai - lá cờ treo trên đầu
 *  người, và sảnh tròn vốn là chỗ trang trọng để cắm cờ. */
function Flagpole({ x, z, side }: { x: number; z: number; side: -1 | 1 }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.42, 0.54, 0.44, 14]} />
        <meshStandardMaterial color="#bfb49c" roughness={0.9} />
      </mesh>
      <mesh position={[0, 3.6, 0]}>
        <cylinderGeometry args={[0.06, 0.09, 7.2, 12]} />
        <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, 7.3, 0]}>
        <sphereGeometry args={[0.13, 12, 12]} />
        <meshStandardMaterial color="#e5c452" metalness={0.95} roughness={0.2} />
      </mesh>
      <WavingFlag
        position={[side * 1.45, 5.6, 0]}
        rotation={[0, side > 0 ? 0 : Math.PI, 0]}
      />
    </group>
  );
}

export default function RoomProps() {
  const rug = useMemo(() => rugTexture(), []);
  const clock = useMemo(() => wallClockTexture(), []);
  const marble = useMemo(() => new THREE.Color("#c2b49a"), []);

  return (
    <group>
      {/* ── Sảnh tròn ở lối vào ───────────────────────────────────────── */}
      {/* Vòng đá lát nổi trên sàn, đánh dấu nơi nhân vật xuất hiện */}
      <mesh position={[0, 0.012, ROTUNDA_Z]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[ROTUNDA_RADIUS - 0.45, ROTUNDA_RADIUS, 48]} />
        <meshStandardMaterial color="#8a7434" metalness={0.6} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.008, ROTUNDA_Z]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[ROTUNDA_RADIUS - 0.45, 48]} />
        <meshStandardMaterial color={marble} roughness={0.4} metalness={0.05} />
      </mesh>
      {ROTUNDA_COLUMNS.map(([x, z]) => (
        <Column key={`${x}:${z}`} x={x} z={z} />
      ))}
      <BrassGlobe />

      {/* ── Ban công lửng hai bên, có cầu thang lên ────────────────────── */}
      <Mezzanine side={-1} />
      <Mezzanine side={1} />

      {/* ── Cờ Tổ quốc ────────────────────────────────────────────────── */}
      {/* Hai cột cờ hai bên quả địa cầu giữa sảnh tròn */}
      {FLAGPOLE_SPOTS.map(([x, z], i) => (
        <Flagpole key={`fp${x}`} x={x} z={z} side={i === 0 ? -1 : 1} />
      ))}
      {/* Lá cờ lớn trên tường bắc, cạnh đồng hồ - nhìn thấy từ suốt chiều dài
          sảnh, kể cả khi vừa bước qua cửa ở đầu nam */}
      <WavingFlag position={[-4.6, 8.2, -halfL + 0.66]} width={3.6} height={2.4} />
      <mesh position={[-4.6, 8.2, -halfL + 0.3]}>
        <boxGeometry args={[3.9, 2.7, 0.12]} />
        <meshStandardMaterial color="#4a3220" roughness={0.75} />
      </mesh>

      {/* ── Thảm dưới các hàng bàn ────────────────────────────────────── */}
      {TABLE_ZS.map((z) => (
        <mesh key={`rug${z}`} position={[0, 0.006, z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[12.5, 4.6]} />
          <meshStandardMaterial map={rug} roughness={0.95} />
        </mesh>
      ))}

      {/* ── Tủ phiếu mục lục ──────────────────────────────────────────── */}
      {CATALOG_ZS.map((z) => (
        <group key={`cat${z}`}>
          <CardCatalog x={-halfW + 0.75} z={z} flip={false} />
          <CardCatalog x={halfW - 0.75} z={z} flip />
        </group>
      ))}

      {/* ── Tượng bán thân ────────────────────────────────────────────── */}
      {BUST_ZS.map((z) => (
        <group key={`bust${z}`}>
          <Bust x={-halfW + 0.7} z={z} />
          <Bust x={halfW - 0.7} z={z} />
        </group>
      ))}

      {/* ── Chậu cọ ───────────────────────────────────────────────────── */}
      {PLANT_SPOTS.map(([x, z]) => (
        <PottedPalm key={`plant${x}:${z}`} x={x} z={z} />
      ))}

      {/* ── Đồng hồ lớn trên tường bắc, phía trên cổng ────────────────── */}
      <group position={[0, 8.2, -halfL + 0.35]}>
        <mesh>
          <circleGeometry args={[1.5, 40]} />
          <meshBasicMaterial map={clock} toneMapped={false} />
        </mesh>
        {/* Vành gỗ ôm mặt đồng hồ. rotation nằm trên MESH, không phải trên
            geometry - cylinderGeometry không nhận prop đó và sẽ nằm ngang. */}
        <mesh position={[0, 0, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.68, 1.68, 0.12, 40]} />
          <meshStandardMaterial color="#4a3220" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
