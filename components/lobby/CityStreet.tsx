"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DOOR_HALF_W, DOOR_HEIGHT, ROOM } from "./ReadingRoom";
import { CART_POS, LAMP_XS, LAMP_Z, STREET_TREE_XS, TREE_Z } from "./room-obstacles";
import {
  CURB_Z,
  FAR_WALK_Z,
  LANE_Z,
  PLAZA_Y,
  ROAD_Z0,
  ROAD_Z1,
  STEP_COUNT,
  STEP_Z0,
  STEP_Z1,
  STREET_HALF_X,
} from "./world";
import { asphaltTexture, cityFacadeTexture, skyTexture } from "./room-textures";
import { rgbToHex, type DaySample } from "./daylight";
import WavingFlag from "./WavingFlag";
import Riverfront from "./Riverfront";

/** Phố Sài Gòn ngay trước cửa thư viện.
 *
 *  Chỉ đi được tới mép vỉa hè - lòng đường là cảnh, không phải sân chơi. Cho
 *  bước xuống đường thì phải xử lý xe đâm vào người, mà đây là sảnh xã giao chứ
 *  không phải trò chơi; kết quả duy nhất sẽ là nhân vật đứng giữa làn xe còn xe
 *  chạy xuyên qua. Ranh giới nằm ở world.ts (CURB_Z), phần vẽ ở đây bám theo. */

const halfL = ROOM.length / 2;

/** Xe cộ: mỗi chiếc chạy dọc trục x, ra khỏi tầm nhìn thì vòng lại đầu kia.
 *
 *  Vị trí tính bằng công thức từ đồng hồ chung chứ không cộng dồn delta mỗi
 *  khung: cộng dồn thì tab chạy nền bị trình duyệt bóp xuống 1fps sẽ làm cả đàn
 *  xe trôi lệch nhau vĩnh viễn, còn công thức thì quay lại tab là mọi thứ vẫn ở
 *  đúng chỗ đáng ra phải ở. */
interface Vehicle {
  kind: "moto" | "car" | "bus";
  lane: 0 | 1;
  speed: number;
  offset: number;
  color: string;
}

const SPAN = STREET_HALF_X * 2;

function makeTraffic(): Vehicle[] {
  const colors = ["#c94f3d", "#3d6ec9", "#e0b13a", "#d9d3c6", "#4f9d69", "#8a5ac9"];
  const out: Vehicle[] = [];
  // Xe máy áp đảo về số lượng - đó là điều đầu tiên ai cũng nhận ra ở đường phố
  // Việt Nam, và một con phố toàn ô tô sẽ trông như bất kỳ thành phố nào khác.
  for (let i = 0; i < 22; i += 1) {
    out.push({
      kind: "moto",
      lane: i % 2 === 0 ? 0 : 1,
      speed: 7 + (i % 5) * 1.1,
      offset: (i * SPAN) / 22,
      color: colors[i % colors.length],
    });
  }
  for (let i = 0; i < 5; i += 1) {
    out.push({
      kind: "car",
      lane: i % 2 === 0 ? 0 : 1,
      speed: 6.2 + (i % 3) * 0.9,
      offset: (i * SPAN) / 5 + 7,
      color: colors[(i + 2) % colors.length],
    });
  }
  out.push({ kind: "bus", lane: 1, speed: 5.4, offset: 18, color: "#2f7a4f" });
  out.push({ kind: "bus", lane: 0, speed: 5.1, offset: 52, color: "#2f7a4f" });
  return out;
}

function Moto({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[1.5, 0.34, 0.42]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.25} />
      </mesh>
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, 0.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.12, 12]} />
          <meshStandardMaterial color="#1c1c1e" roughness={0.9} />
        </mesh>
      ))}
      {/* Người lái: thân và đầu đội mũ bảo hiểm */}
      <mesh position={[-0.05, 0.9, 0]}>
        <capsuleGeometry args={[0.17, 0.34, 4, 8]} />
        <meshStandardMaterial color="#2f3540" roughness={0.85} />
      </mesh>
      <mesh position={[-0.05, 1.28, 0]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial color="#e8e2d4" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Car({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0.48, 0]} castShadow>
        <boxGeometry args={[3.9, 0.62, 1.7]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.45} />
      </mesh>
      <mesh position={[-0.15, 1.0, 0]}>
        <boxGeometry args={[2.1, 0.56, 1.55]} />
        <meshStandardMaterial color="#2b3238" roughness={0.2} metalness={0.3} />
      </mesh>
      {[-1.3, 1.3].map((x) =>
        [-0.8, 0.8].map((z) => (
          <mesh key={`${x}:${z}`} position={[x, 0.26, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.27, 0.27, 0.18, 12]} />
            <meshStandardMaterial color="#1c1c1e" roughness={0.9} />
          </mesh>
        ))
      )}
    </group>
  );
}

function Bus({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[8.4, 2.3, 2.4]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Dải cửa kính chạy suốt thân */}
      <mesh position={[0, 1.75, 1.22]}>
        <planeGeometry args={[7.6, 0.9]} />
        <meshStandardMaterial color="#9fc4d8" emissive="#5f7f92" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 1.75, -1.22]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[7.6, 0.9]} />
        <meshStandardMaterial color="#9fc4d8" emissive="#5f7f92" emissiveIntensity={0.5} />
      </mesh>
      {[-2.8, 0, 2.8].map((x) =>
        [-1.1, 1.1].map((z) => (
          <mesh key={`${x}:${z}`} position={[x, 0.4, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.42, 0.42, 0.24, 12]} />
            <meshStandardMaterial color="#1c1c1e" roughness={0.9} />
          </mesh>
        ))
      )}
    </group>
  );
}

function Traffic() {
  const traffic = useMemo(() => makeTraffic(), []);
  const refs = useRef<Array<THREE.Group | null>>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < traffic.length; i += 1) {
      const g = refs.current[i];
      const v = traffic[i];
      if (!g) continue;
      // Làn 0 chạy về +x, làn 1 chạy ngược lại - đi bên phải, như luật.
      const dir = v.lane === 0 ? 1 : -1;
      const travelled = (v.offset + t * v.speed) % SPAN;
      g.position.x = dir * (travelled - STREET_HALF_X);
      g.position.z = LANE_Z[v.lane];
    }
  });

  return (
    // Hạ đúng bằng độ dày mặt đường: lòng đường lún xuống 0,13 so với vỉa hè,
    // và bánh xe lăn trên vỉa hè trong khi thân xe ở giữa đường thì nhìn ra ngay.
    <group position={[0, PLAZA_Y - 0.13, 0]}>
      {traffic.map((v, i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          rotation={[0, v.lane === 0 ? 0 : Math.PI, 0]}
        >
          {v.kind === "moto" ? (
            <Moto color={v.color} />
          ) : v.kind === "car" ? (
            <Car color={v.color} />
          ) : (
            <Bus color={v.color} />
          )}
        </group>
      ))}
    </group>
  );
}

/** Người đi bộ trên vỉa hè bên kia đường.
 *
 *  Chỉ ở BÊN KIA, nơi người chơi không tới được. Đặt họ trên vỉa hè trước cửa
 *  thì sớm muộn cũng có người đi xuyên qua nhân vật thật, và một bóng người đi
 *  xuyên qua mình phá cảm giác "đây là chỗ có người" nhanh hơn là không có ai.
 *
 *  Bước chân là dao động sin theo quãng đường đã đi chứ không theo đồng hồ:
 *  người đi nhanh thì sải chân nhanh, và ai đứng lại thì chân đứng yên. */
function Pedestrians() {
  const walkers = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        speed: 1.1 + (i % 4) * 0.35,
        offset: (i * SPAN) / 14,
        dir: i % 2 === 0 ? 1 : -1,
        z: FAR_WALK_Z - 1.2 - (i % 3) * 0.9,
        shirt: ["#c9584f", "#3f6fa8", "#d8b25a", "#4f8a63", "#8a5f9e", "#c9c2b4"][i % 6],
        height: 0.92 + (i % 3) * 0.07,
      })),
    []
  );
  const refs = useRef<Array<THREE.Group | null>>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < walkers.length; i += 1) {
      const g = refs.current[i];
      const w = walkers[i];
      if (!g) continue;
      const travelled = (w.offset + t * w.speed) % SPAN;
      g.position.x = w.dir * (travelled - STREET_HALF_X);
      g.position.y = Math.abs(Math.sin(travelled * 2.4)) * 0.05;
    }
  });

  return (
    <group position={[0, PLAZA_Y, 0]}>
      {walkers.map((w, i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[0, 0, w.z]}
          scale={w.height}
        >
          <mesh position={[0, 0.42, 0]}>
            <boxGeometry args={[0.3, 0.5, 0.22]} />
            <meshStandardMaterial color="#2f3038" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.0, 0]}>
            <capsuleGeometry args={[0.19, 0.4, 4, 10]} />
            <meshStandardMaterial color={w.shirt} roughness={0.85} />
          </mesh>
          <mesh position={[0, 1.44, 0]}>
            <sphereGeometry args={[0.17, 12, 12]} />
            <meshStandardMaterial color="#d9b48d" roughness={0.75} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Cột đèn đường có cần vươn ra lòng đường. Sáng theo giờ: ban ngày chỉ là cái
 *  cột, chập tối mới thành nguồn sáng thật. */
function StreetLamp({ x, lamps }: { x: number; lamps: number }) {
  return (
    <group position={[x, PLAZA_Y, LAMP_Z]}>
      <mesh position={[0, 2.6, 0]}>
        <cylinderGeometry args={[0.09, 0.13, 5.2, 10]} />
        <meshStandardMaterial color="#39413f" roughness={0.7} metalness={0.4} />
      </mesh>
      <mesh position={[0, 5.2, 0.7]} rotation={[Math.PI / 2.6, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 1.6, 8]} />
        <meshStandardMaterial color="#39413f" roughness={0.7} metalness={0.4} />
      </mesh>
      <mesh position={[0, 5.55, 1.35]}>
        <boxGeometry args={[0.44, 0.16, 0.8]} />
        <meshStandardMaterial
          color="#fff0c4"
          emissive="#ffd98a"
          emissiveIntensity={0.15 + lamps * 2.6}
          toneMapped={false}
        />
      </mesh>
      {/* Dưới 0,25 thì bỏ hẳn nguồn sáng chứ không hạ cường độ về gần 0: mỗi
          pointLight vẫn tốn đúng chi phí như nhau dù có sáng hay không. */}
      {lamps > 0.25 && (
        <pointLight
          position={[0, 5.3, 1.35]}
          color="#ffd08a"
          intensity={13 * lamps}
          distance={16}
          decay={2}
        />
      )}
    </group>
  );
}

/** Cây me đường phố: thân thẳng, tán là mấy khối cầu chồng lệch nhau. Tán cầu
 *  rẻ hơn nhiều so với lá thật và ở khoảng cách này không phân biệt được. */
function StreetTree({ x }: { x: number }) {
  const blobs = useMemo(
    () => [
      { p: [0, 4.3, 0] as [number, number, number], r: 1.55 },
      { p: [0.95, 3.8, 0.5] as [number, number, number], r: 1.15 },
      { p: [-0.9, 3.9, -0.4] as [number, number, number], r: 1.2 },
      { p: [0.1, 5.2, -0.6] as [number, number, number], r: 1.0 },
    ],
    []
  );
  return (
    <group position={[x, PLAZA_Y, TREE_Z]}>
      <mesh position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.34, 3.2, 10]} />
        <meshStandardMaterial color="#4a3826" roughness={0.95} />
      </mesh>
      {blobs.map((b, i) => (
        <mesh key={i} position={b.p} castShadow>
          <sphereGeometry args={[b.r, 14, 12]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#33562f" : "#3d6437"} roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

/** Xe bánh mì đầu hè - chi tiết nhỏ nhưng đọc ra ngay là vỉa hè Việt Nam. */
function BanhMiCart() {
  return (
    <group position={[CART_POS[0], PLAZA_Y, CART_POS[1]]}>
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[2.1, 0.7, 1.2]} />
        <meshStandardMaterial color="#c7d8d2" roughness={0.5} />
      </mesh>
      {/* Tủ kính bày bánh */}
      <mesh position={[0, 1.55, 0]}>
        <boxGeometry args={[1.9, 0.5, 1.0]} />
        <meshStandardMaterial color="#dfeef0" transparent opacity={0.42} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.9, 0.4, 1.0]} />
        <meshStandardMaterial color="#8f5b32" roughness={0.85} />
      </mesh>
      {[-0.85, 0.85].map((x) => (
        <mesh key={x} position={[x, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.12, 10]} />
          <meshStandardMaterial color="#1f1f21" roughness={0.9} />
        </mesh>
      ))}
      {/* Dù che */}
      <mesh position={[0, 2.35, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.6, 6]} />
        <meshStandardMaterial color="#5a5a5e" />
      </mesh>
      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[1.9, 0.7, 8]} />
        <meshStandardMaterial color="#d0402f" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/** Dãy nhà bên kia đường: nhà ống cao thấp so le, cộng một toà tháp cao ở xa.
 *  Chiều cao lấy từ chỉ số chứ không random - random thì mỗi lần vào phòng phố
 *  lại khác, và người dùng sẽ nhớ là phố "đổi hình" chứ không nhớ là có phố. */
function CityBlock({ lamps }: { lamps: number }) {
  const facade = useMemo(() => cityFacadeTexture(), []);
  const shops = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const w = 4.2 + ((i * 7) % 5) * 0.85;
        return { w, h: 9 + ((i * 13) % 7) * 2.4 };
      }),
    []
  );

  let cursor = -STREET_HALF_X;
  const placed = shops.map((s) => {
    const x = cursor + s.w / 2;
    cursor += s.w + 0.35;
    return { ...s, x };
  });

  return (
    <group position={[0, PLAZA_Y, 0]}>
      {placed.map((s, i) => (
        <mesh key={i} position={[s.x, s.h / 2, FAR_WALK_Z + 4]}>
          <boxGeometry args={[s.w, s.h, 8]} />
          {/* emissiveMap chứ không phải emissive trơn: dùng chính vân mặt tiền
              làm mặt phát sáng nên chỉ những ô cửa sổ màu vàng rực lên về đêm,
              còn mảng tường xám thì gần như không. Emissive trơn sẽ làm cả toà
              nhà phát sáng đều như một khối đèn. */}
          <meshStandardMaterial
            map={facade}
            emissiveMap={facade}
            emissive="#ffffff"
            emissiveIntensity={lamps * 0.75}
            roughness={0.9}
          />
        </mesh>
      ))}
      {/* Toà tháp ở xa, lệch khỏi trục cửa để không che mất trục nhìn chính */}
      <group position={[19, 0, FAR_WALK_Z + 26]}>
        <mesh position={[0, 21, 0]}>
          <boxGeometry args={[11, 42, 11]} />
          <meshStandardMaterial
            color="#5d6b78"
            roughness={0.28}
            metalness={0.55}
            emissive="#2b3a48"
            emissiveIntensity={0.35}
          />
        </mesh>
        {/* Vành đài quan sát nhô ra ở lưng chừng - dáng nhận ra được của
            đường chân trời Sài Gòn */}
        <mesh position={[0, 33, 2.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[5.4, 5.4, 3.2, 20]} />
          <meshStandardMaterial color="#7d8b96" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 46, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 8, 8]} />
          <meshStandardMaterial color="#8f9aa4" metalness={0.7} />
        </mesh>
      </group>
      <group position={[-24, 0, FAR_WALK_Z + 30]}>
        <mesh position={[0, 16, 0]}>
          <boxGeometry args={[9, 32, 9]} />
          <meshStandardMaterial color="#6a6355" roughness={0.5} metalness={0.25} />
        </mesh>
      </group>
    </group>
  );
}

export default function CityStreet({ day }: { day: DaySample }) {
  const asphalt = useMemo(() => asphaltTexture(), []);
  const sky = useMemo(
    () => skyTexture(rgbToHex(day.skyTop), rgbToHex(day.skyMid), rgbToHex(day.skyHorizon)),
    [day.skyTop, day.skyMid, day.skyHorizon]
  );
  const roadLen = ROAD_Z1 - ROAD_Z0;

  return (
    <group>
      {/* Vòm trời. BackSide để nhìn từ bên trong, và tắt fog cho dải chuyển màu
          không bị sương nuốt thành một mảng xám phẳng. */}
      <mesh>
        <sphereGeometry args={[190, 24, 16]} />
        <meshBasicMaterial map={sky} side={THREE.BackSide} fog={false} toneMapped={false} />
      </mesh>

      {/* Ngưỡng cửa: nối sàn thư viện ra tới mép bậc thềm. Sàn phòng đọc dừng ở
          đúng z = halfL nên không có mảnh này thì bước qua cửa là hụt chân. */}
      <mesh
        position={[0, 0.002, (halfL - 0.6 + STEP_Z0) / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[DOOR_HALF_W * 2, STEP_Z0 - halfL + 0.6]} />
        <meshStandardMaterial color="#cfc5b3" roughness={0.5} />
      </mesh>

      {/* Bậc thềm xuống phố. Số bậc và cao độ khớp với porchHeightAt ở world.ts;
          lệch nhau là chân nhân vật lơ lửng hoặc lún vào đá. */}
      {Array.from({ length: STEP_COUNT }, (_, i) => {
        const depth = (STEP_Z1 - STEP_Z0) / STEP_COUNT;
        const top = ((i + 1) / STEP_COUNT) * PLAZA_Y;
        return (
          <mesh key={i} position={[0, top - 1.5, STEP_Z0 + (i + 0.5) * depth]} receiveShadow>
            <boxGeometry args={[DOOR_HALF_W * 2 + 5.5, 3, depth]} />
            <meshStandardMaterial color="#c8beaa" roughness={0.75} />
          </mesh>
        );
      })}

      {/* Vỉa hè trước thư viện */}
      <mesh position={[0, PLAZA_Y, (STEP_Z1 + CURB_Z) / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[STREET_HALF_X * 2, CURB_Z - STEP_Z1]} />
        <meshStandardMaterial color="#a9a294" roughness={0.9} />
      </mesh>
      {/* Bó vỉa - gờ đá nhô lên, cho mắt thấy rõ đâu là chỗ dừng */}
      <mesh position={[0, PLAZA_Y + 0.09, CURB_Z - 0.2]}>
        <boxGeometry args={[STREET_HALF_X * 2, 0.3, 0.4]} />
        <meshStandardMaterial color="#8e8779" roughness={0.9} />
      </mesh>

      {/* Lòng đường */}
      <mesh
        position={[0, PLAZA_Y - 0.13, (ROAD_Z0 + ROAD_Z1) / 2]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        receiveShadow
      >
        <planeGeometry args={[roadLen, STREET_HALF_X * 2]} />
        <meshStandardMaterial map={asphalt} roughness={0.95} />
      </mesh>

      {/* Vỉa hè bên kia */}
      <mesh position={[0, PLAZA_Y, (ROAD_Z1 + FAR_WALK_Z) / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[STREET_HALF_X * 2, FAR_WALK_Z - ROAD_Z1]} />
        <meshStandardMaterial color="#a9a294" roughness={0.9} />
      </mesh>

      <Traffic />
      {LAMP_XS.map((x) => (
        <StreetLamp key={x} x={x} lamps={day.lamps} />
      ))}
      {STREET_TREE_XS.map((x) => (
        <StreetTree key={x} x={x} />
      ))}
      <Pedestrians />
      <BanhMiCart />
      <CityBlock lamps={day.lamps} />
      <Riverfront day={day} />

      {/* Mặt tiền thư viện nhìn từ ngoài: bệ đá chạy hai bên cửa, để bước ra
          không thấy mặt sau của bức tường mỏng dính. */}
      {/* Diềm đá chạy ngang mặt tiền. Phải nằm TRÊN đỉnh ô cửa - đặt ở tầm
          ngang người thì nó cắt đúng qua lối ra, và từ trong nhìn ra chỉ thấy
          một thanh xám chắn ngang khung hình. */}
      <mesh position={[0, DOOR_HEIGHT + 0.6, halfL + 0.35]}>
        <boxGeometry args={[ROOM.width + 3, 0.7, 0.7]} />
        <meshStandardMaterial color="#ddd2bc" roughness={0.85} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * (DOOR_HALF_W + (ROOM.width / 2 - DOOR_HALF_W) / 2 + 1.5), 3.4, halfL + 0.3]}
        >
          <boxGeometry args={[ROOM.width / 2 - DOOR_HALF_W + 3, 12, 0.6]} />
          <meshStandardMaterial color="#c4b9a2" roughness={0.9} />
        </mesh>
      ))}
      {/* Cờ Tổ quốc trước cửa thư viện, hai bên bậc thềm */}
      {[-1, 1].map((side) => (
        <group key={`fp${side}`} position={[side * 7.2, PLAZA_Y, STEP_Z1 + 1.2]}>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.5, 0.62, 0.5, 12]} />
            <meshStandardMaterial color="#b3aa98" roughness={0.9} />
          </mesh>
          <mesh position={[0, 4.2, 0]}>
            <cylinderGeometry args={[0.08, 0.11, 8, 10]} />
            <meshStandardMaterial color="#d8d2c4" roughness={0.5} metalness={0.4} />
          </mesh>
          {/* Cờ treo dọc cột, quay ra phía đường để người đi bộ nhìn thấy mặt
              phải chứ không phải mặt lưng. */}
          <WavingFlag
            position={[side > 0 ? 1.6 : -1.6, 6.6, 0]}
            rotation={[0, side > 0 ? 0 : Math.PI, 0]}
            width={2.9}
            height={1.95}
          />
        </group>
      ))}
    </group>
  );
}
