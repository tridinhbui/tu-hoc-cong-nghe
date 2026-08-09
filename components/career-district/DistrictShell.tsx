"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  BIKE_SPOTS,
  LAMP_XS,
  LAMP_Z,
  GATE_PILLAR_Z,
  GATE_XS,
  GATE_Z,
  CAFE_COUNTER,
  civicRoomsOf,
  CAFE_X,
  CAFE_PLANTS,
  CAFE_SHELF_XS,
  CAFE_SHELF_Z,
  CAFE_TABLES,
  CENTER_LAMPS,
  FOUNTAIN,
  GAME_SQUARE_X,
  PARK_BENCHES,
  PARK_TREES,
  POND,
  SHOP_X,
  STREET,
  TOWER_X,
  STREET_TREE_XS,
  TREE_Z,
  careerCountIn,
  careerCategoryBlurbsOf,
  type DistrictRoom,
} from "./district-space";
import { formulasFor, type WallFormula } from "./district-content";
import { STATION_IDS } from "@/components/lobby/stations";
import CivicScene, { isCivicRoom } from "./CivicScenes";
import { ORGANIC_BUILDINGS } from "@/lib/rpg-buildings";
import { CAREER_CATEGORY_ORDER, isCareerCategory, type CareerCategory } from "@/lib/career-categories";
import {
  asphaltTexture,
  boardTexture,
  bookshelfTexture,
  nameplateTexture,
  oakTexture,
} from "@/components/lobby/room-textures";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

/** Phần nhìn thấy được của khu phố nghề: con phố ngoài trời, và bên trong mỗi
 *  căn nhà là một phòng ngành.
 *
 *  Chỉ dựng ĐÚNG căn phòng đang đứng. Dựng cả khu rồi ẩn bớt thì đơn giản hơn
 *  về code, nhưng năm căn phòng với bốn mươi bốn cái bàn cùng nằm trong bộ nhớ
 *  GPU là thứ máy yếu không gánh nổi, mà người học thì chỉ nhìn thấy một phòng
 *  tại một thời điểm. */

/** Biển hiệu / bảng chữ treo tường. Texture dựng bằng canvas nên phải tự dọn:
 *  boardTexture không đi qua cache của room-textures. */
function TextBoard({
  title,
  rows,
  accent,
  width,
  height,
  position,
  rotation = [0, 0, 0],
}: {
  title: string;
  rows: string[];
  accent: string;
  width: number;
  height: number;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  // Sub-component, nên có useI18n() riêng.
  const { t } = useI18n();
  const tex = useMemo(
    () => boardTexture(title, rows, { accent, emptyText: t.miscUi.canvasBoard.empty }),
    [title, rows, accent, t]
  );
  useEffect(() => () => tex.dispose(), [tex]);
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      <mesh>
        <planeGeometry args={[width + 0.14, height + 0.14]} />
        <meshStandardMaterial color="#181410" roughness={0.7} />
      </mesh>
    </group>
  );
}


/** Nhiều bản sao giống hệt nhau, vẽ trong MỘT lần gọi.
 *
 *  Con phố có chín cái cây, bốn cột đèn, năm cái xe và mười ba cái bục - mỗi
 *  bản sao trước đây là một draw call riêng, và con phố là căn phòng ai cũng
 *  vào đầu tiên. Hình dạng thì y hệt nhau, nên GPU chỉ cần biết nó một lần và
 *  biết chúng đứng ở đâu.
 *
 *  Đổi lại: mọi bản sao dùng chung một vật liệu, nên thứ nào cần màu riêng
 *  từng cái (bục game) phải truyền màu qua instanceColor chứ không qua
 *  material. */
function Instances({
  count,
  place,
  color,
  children,
}: {
  count: number;
  /** Đặt bản sao thứ i vào chỗ của nó. */
  place: (i: number, m: THREE.Object3D) => void;
  color: string;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i += 1) {
      place(i, dummy);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    // Bóng đổ của cây và cột đèn ngoài phố không đáng: chúng đứng im, và mỗi
    // bản sao đổ bóng là một lượt render nữa vào shadow map.
    mesh.castShadow = false;
  }, [count, place]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} receiveShadow>
      {children}
      <meshStandardMaterial color={color} roughness={0.9} />
    </instancedMesh>
  );
}

/** Chỉ phần tán - thân cây đi qua instancing. Giữ Tree đầy đủ vì công viên
 *  dùng nó với vị trí rời rạc, không thành nhóm lặp. */
function TreeCanopy({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 3.1 + i * 0.55, 0]} castShadow>
          <icosahedronGeometry args={[1.35 - i * 0.28, 0]} />
          <meshStandardMaterial color={i % 2 ? "#2f6b46" : "#3d8a58"} flatShading roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

/** Bóng đèn và ánh sáng - cột đi qua instancing. */
function LampHead({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 4.85, 0]}>
        <sphereGeometry args={[0.24, 12, 12]} />
        <meshBasicMaterial color="#ffe6b0" toneMapped={false} />
      </mesh>
      <pointLight position={[0, 4.7, 0]} intensity={9} distance={13} color="#ffdca8" />
    </group>
  );
}

/** Yên, bánh và màu riêng - thân xe đi qua instancing. */
function MotorbikeDetail({ x, z, color }: { x: number; z: number; color: string }) {
  return (
    <group position={[x, 0, z]} rotation={[0, Math.PI / 2, 0]}>
      <mesh position={[0, 0.52, 0]} castShadow>
        <boxGeometry args={[1.06, 0.27, 0.35]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[-0.18, 0.74, 0]} castShadow>
        <boxGeometry args={[0.44, 0.16, 0.3]} />
        <meshStandardMaterial color="#1c1917" roughness={0.9} />
      </mesh>
      {[-0.58, 0.58].map((wx) => (
        <mesh key={wx} position={[wx, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.08, 8, 16]} />
          <meshStandardMaterial color="#131313" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

function Tree({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.26, 3, 8]} />
        <meshStandardMaterial color="#4a3728" roughness={0.95} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 3.1 + i * 0.55, 0]} castShadow>
          <icosahedronGeometry args={[1.35 - i * 0.28, 0]} />
          <meshStandardMaterial color={i % 2 ? "#2f6b46" : "#3d8a58"} flatShading roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function StreetLamp({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 2.4, 0]}>
        <cylinderGeometry args={[0.08, 0.11, 4.8, 8]} />
        <meshStandardMaterial color="#2c2c2c" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[0, 4.85, 0]}>
        <sphereGeometry args={[0.24, 12, 12]} />
        <meshBasicMaterial color="#ffe6b0" toneMapped={false} />
      </mesh>
      <pointLight position={[0, 4.7, 0]} intensity={9} distance={13} color="#ffdca8" />
    </group>
  );
}

/** Xe máy dựng trước hiên - vài khối hộp, nhưng là thứ nói "đây là Sài Gòn". */
function Motorbike({ x, z, color }: { x: number; z: number; color: string }) {
  return (
    <group position={[x, 0, z]} rotation={[0, Math.PI / 2, 0]}>
      <mesh position={[0, 0.52, 0]} castShadow>
        <boxGeometry args={[1.05, 0.26, 0.34]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[-0.18, 0.74, 0]} castShadow>
        <boxGeometry args={[0.44, 0.16, 0.3]} />
        <meshStandardMaterial color="#1c1917" roughness={0.9} />
      </mesh>
      {[-0.58, 0.58].map((wx) => (
        <mesh key={wx} position={[wx, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.08, 8, 16]} />
          <meshStandardMaterial color="#131313" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

/** Một căn nhà mặt phố: mặt tiền, cửa sáng đèn, biển hiệu nhóm ngành. */
function Shophouse({ category, progress }: { category: CareerCategory; progress: { done: number; total: number } }) {
  // Component con tự gọi useI18n() thay vì nhận `t` qua prop - đây là phía
  // client, đúng quy ước AGENTS.md; truyền xuống chỉ để dịch một biển hiệu sẽ
  // phải sửa mọi chỗ gọi.
  const { t } = useI18n();
  const x = SHOP_X[category];
  const count = careerCountIn(category);
  return (
    <group position={[x, 0, STREET.facadeZ]}>
      {/* thân nhà */}
      <mesh position={[0, STREET.height / 2, -2]} castShadow receiveShadow>
        <boxGeometry args={[13, STREET.height, 6]} />
        <meshStandardMaterial color="#3c3a37" roughness={0.95} />
      </mesh>
      {/* mái hiên */}
      <mesh position={[0, 3.5, 1.1]} castShadow>
        <boxGeometry args={[13.4, 0.28, 2.4]} />
        <meshStandardMaterial color="#7f1d1d" roughness={0.8} />
      </mesh>
      {/* khung cửa sáng đèn - lối vào */}
      <mesh position={[0, 1.5, 0.32]}>
        <planeGeometry args={[3.2, 3]} />
        <meshBasicMaterial color="#ffe2b0" opacity={0.72} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.5, 0.28]}>
        <planeGeometry args={[3.6, 3.3]} />
        <meshStandardMaterial color="#221c17" roughness={0.9} />
      </mesh>
      <pointLight position={[0, 2.2, 1.6]} intensity={7} distance={9} color="#ffd9a0" />
      {/* cửa sổ tầng trên */}
      {[-3.6, 3.6].map((wx) => (
        <mesh key={wx} position={[wx, 5.6, 0.32]}>
          <planeGeometry args={[2.2, 1.8]} />
          <meshStandardMaterial color="#1e293b" emissive="#334155" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {/* Biển hiệu treo ở MẶT TRƯỚC MÁI HIÊN, không phải trên tường phía sau
          nó: đứng dưới vỉa hè nhìn lên thì chính cái mái che mất tấm biển trên
          tường, và người đi ngang không biết căn nhà này là ngành gì. Biển phố
          Sài Gòn thật cũng nằm đúng chỗ này vì đúng lý do đó. */}
      <TextBoard
        title={t.careerDistrict.shopSigns[category]}
        rows={[
          careerCategoryBlurbsOf(t)[category],
          // Biển hiệu đổi khi vượt mốc: đi ngang một căn nhà đã xong và một
          // căn chưa động tới phải thấy khác nhau, nếu không cả dãy phố trông
          // y hệt nhau suốt cả trăm bài học.
          progress.total > 0 && progress.done >= progress.total
            ? `★ Bạn đã học xong cả ${progress.total} bài của nhóm này`
            : progress.done > 0
            ? `Đang học · ${progress.done}/${progress.total} bài`
            : `${count} nghề · chưa học bài nào ở đây`,
        ]}
        accent={SHOP_ACCENT[category]}
        width={8.2}
        height={1.9}
        position={[0, 3.9, 2.33]}
      />
    </group>
  );
}

const SHOP_ACCENT: Record<CareerCategory, string> = {
  investment: "#5eead4",
  banking: "#93c5fd",
  advisory: "#fdba74",
  accounting: "#c4b5fd",
  data: "#f0abfc",
};


/** Toà tháp ở đầu phố. Cao hơn hẳn dãy nhà bên cạnh vì nó phải nhìn thấy được
 *  từ giữa phố - đó là cách duy nhất người học biết là có nó mà không cần đọc
 *  hướng dẫn. */
function Tower() {
  const { t } = useI18n();
  return (
    <group position={[TOWER_X, 0, STREET.facadeZ]}>
      <mesh position={[0, 13, -3]} castShadow receiveShadow>
        <boxGeometry args={[15, 26, 8]} />
        <meshStandardMaterial color="#33312e" roughness={0.9} />
      </mesh>
      {/* các tầng sáng đèn - mỗi dải là một tầng bên trong */}
      {Array.from({ length: 7 }, (_, i) => (
        <mesh key={i} position={[0, 5.6 + i * 3, 1.05]}>
          <planeGeometry args={[12.4, 1.5]} />
          <meshBasicMaterial color="#f5c96a" opacity={0.5} transparent toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[0, 3.6, 1.3]} castShadow>
        <boxGeometry args={[15.6, 0.3, 2.6]} />
        <meshStandardMaterial color="#a16207" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.6, 1.02]}>
        <planeGeometry args={[3.6, 3.2]} />
        <meshBasicMaterial color="#ffe2b0" opacity={0.78} transparent toneMapped={false} />
      </mesh>
      <pointLight position={[0, 2.3, 2.2]} intensity={9} distance={11} color="#ffd9a0" />
      <TextBoard
        title={t.careerDistrict.shell.towerTitle}
        rows={[t.careerDistrict.shell.towerRow1, format(t.careerDistrict.shell.towerRow2, { n: STATION_IDS.length })]}
        accent="#fbbf24"
        width={9}
        height={2}
        position={[0, 4, 2.63]}
      />
    </group>
  );
}

/** Nhà thi đấu ở đầu đông phố - cửa vào quảng trường game. Màu neon để nó
 *  không lẫn với năm căn nhà nghề và toà tháp: một khu vui chơi phải trông
 *  khác một văn phòng ngay từ ngoài đường. */
function GameHall() {
  const { t } = useI18n();
  return (
    <group position={[GAME_SQUARE_X, 0, STREET.facadeZ]}>
      <mesh position={[0, 6, -3]} castShadow receiveShadow>
        <boxGeometry args={[16, 12, 8]} />
        <meshStandardMaterial color="#2b2233" roughness={0.85} />
      </mesh>
      {[-5, 0, 5].map((x) => (
        <mesh key={x} position={[x, 7.4, 1.05]}>
          <planeGeometry args={[3.4, 1.1]} />
          <meshBasicMaterial color={["#f472b6", "#facc15", "#60a5fa"][(x + 5) / 5]} opacity={0.75} transparent toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[0, 3.6, 1.3]} castShadow>
        <boxGeometry args={[16.4, 0.3, 2.6]} />
        <meshStandardMaterial color="#7e22ce" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.6, 1.02]}>
        <planeGeometry args={[4, 3.2]} />
        <meshBasicMaterial color="#fbcfe8" opacity={0.75} transparent toneMapped={false} />
      </mesh>
      <pointLight position={[0, 2.4, 2.4]} intensity={10} distance={12} color="#f472b6" />
      <TextBoard
        title={t.careerDistrict.shell.gameHallTitle}
        rows={[t.careerDistrict.shell.gameHallRow1, format(t.careerDistrict.shell.gameHallRow2, { n: ORGANIC_BUILDINGS.length })]}
        accent="#f472b6"
        width={9.4}
        height={2}
        position={[0, 4, 2.63]}
      />
    </group>
  );
}

/** Mặt tiền quán cà phê: hiên rộng, đèn dây vàng, bàn ghế bày cả ra vỉa hè.
 *  Nhìn từ ngoài đường phải biết ngay đây là quán chứ không phải văn phòng. */
function CafeFront() {
  const { t } = useI18n();
  return (
    <group position={[CAFE_X, 0, STREET.facadeZ]}>
      <mesh position={[0, 4, -2]} castShadow receiveShadow>
        <boxGeometry args={[11, 8, 6]} />
        <meshStandardMaterial color="#4a3b2e" roughness={0.9} />
      </mesh>
      {/* mái hiên vải sọc */}
      <mesh position={[0, 3.2, 1.6]} rotation={[0.22, 0, 0]} castShadow>
        <boxGeometry args={[11.6, 0.12, 3]} />
        <meshStandardMaterial color="#b45309" roughness={0.85} />
      </mesh>
      {/* cửa kính sáng đèn vàng */}
      <mesh position={[0, 1.5, 0.32]}>
        <planeGeometry args={[7, 3]} />
        <meshBasicMaterial color="#ffd9a0" opacity={0.6} transparent toneMapped={false} />
      </mesh>
      <pointLight position={[0, 2.2, 2]} intensity={9} distance={12} color="#ffcf87" />
      {/* bàn ghế bày ra vỉa hè */}
      {[-3.4, 0, 3.4].map((x) => (
        <group key={x} position={[x, 0, 2.9]}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.42, 0.4, 0.05, 14]} />
            <meshStandardMaterial color="#b8bcc0" metalness={0.7} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.48, 8]} />
            <meshStandardMaterial color="#8b9095" metalness={0.65} roughness={0.45} />
          </mesh>
          {[-0.6, 0.6].map((sx) => (
            <mesh key={sx} position={[sx, 0.22, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.24, 0.06, 10]} />
              <meshStandardMaterial color="#b91c1c" roughness={0.6} />
            </mesh>
          ))}
        </group>
      ))}
      {/* đèn dây vắt trước hiên */}
      {[-4.5, -2.2, 0, 2.2, 4.5].map((x) => (
        <mesh key={x} position={[x, 3.3, 3]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#ffcf87" toneMapped={false} />
        </mesh>
      ))}
      <TextBoard
        title={t.careerDistrict.shell.cafeTitle}
        rows={[t.careerDistrict.shell.cafeFrontRow1, t.careerDistrict.shell.cafeFrontRow2]}
        accent="#fbbf24"
        width={7.6}
        height={1.9}
        position={[0, 3.9, 3.12]}
      />
    </group>
  );
}

function StreetScene({ progressByCategory }: { progressByCategory: Record<CareerCategory, { done: number; total: number }> }) {
  const { t } = useI18n();
  const civicRooms = useMemo(() => civicRoomsOf(t), [t]);
  const asphalt = useMemo(() => asphaltTexture(), []);
  return (
    <group>
      {/* lòng đường + vỉa hè */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 12]} receiveShadow>
        <planeGeometry args={[STREET.halfLength * 2 + 20, 16]} />
        <meshStandardMaterial map={asphalt} roughness={0.98} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.5]} receiveShadow>
        <planeGeometry args={[STREET.halfLength * 2 + 20, 13]} />
        <meshStandardMaterial color="#6b6560" roughness={0.95} />
      </mesh>
      {/* mép vỉa hè */}
      <mesh position={[0, 0.09, 6.1]}>
        <boxGeometry args={[STREET.halfLength * 2 + 20, 0.18, 0.4]} />
        <meshStandardMaterial color="#8b8078" roughness={0.9} />
      </mesh>

      {CAREER_CATEGORY_ORDER.map((c) => (
        <Shophouse key={c} category={c} progress={progressByCategory[c]} />
      ))}
      <Tower />
      <GameHall />
      <CafeFront />
      {/* Sáu căn nhà dân sự dọc phố. Cùng một khuôn mặt tiền, khác màu và khác
          biển - chúng là dãy nhà nền của thành phố, không phải công trình
          điểm nhấn như tháp hay nhà thi đấu. */}
      {civicRooms.map((c) => (
        <group key={c.id} position={[c.streetX, 0, STREET.facadeZ]}>
          <mesh position={[0, 4.5, -2]} castShadow receiveShadow>
            <boxGeometry args={[11, 9, 6]} />
            <meshStandardMaterial color="#3a352f" roughness={0.92} />
          </mesh>
          <mesh position={[0, 3.4, 1.1]} castShadow>
            <boxGeometry args={[11.4, 0.26, 2.2]} />
            <meshStandardMaterial color={c.accent} roughness={0.75} />
          </mesh>
          <mesh position={[0, 1.5, 0.32]}>
            <planeGeometry args={[3, 2.9]} />
            <meshBasicMaterial color="#ffe2b0" opacity={0.6} transparent toneMapped={false} />
          </mesh>
          <pointLight position={[0, 2.2, 1.6]} intensity={6} distance={9} color="#ffd9a0" />
          {[-3.4, 3.4].map((wx) => (
            <mesh key={wx} position={[wx, 5.8, 0.32]}>
              <planeGeometry args={[2, 1.6]} />
              <meshStandardMaterial color="#1e293b" emissive="#334155" emissiveIntensity={0.4} />
            </mesh>
          ))}
          <TextBoard
            title={c.label.toUpperCase()}
            rows={[c.blurb]}
            accent={c.accent}
            width={7.4}
            height={1.7}
            position={[0, 3.75, 2.23]}
          />
        </group>
      ))}

      {/* Hai cổng sang hai thế giới 3D còn lại. Vòm đá thay vì tấm biển: một
          cánh cổng phải trông như đi qua được thì người ta mới thử đi qua. */}
      {GATE_XS.map((x, i) => (
        <group key={x} position={[x, 0, GATE_PILLAR_Z]}>
          <mesh position={[0, 2.2, 0]} castShadow>
            <cylinderGeometry args={[0.55, 0.68, 4.4, 10]} />
            <meshStandardMaterial color="#5b5048" roughness={0.9} />
          </mesh>
          <mesh position={[0, 4.6, 0]}>
            <sphereGeometry args={[0.42, 14, 14]} />
            <meshBasicMaterial color={i === 0 ? "#e5b567" : "#34d399"} toneMapped={false} />
          </mesh>
          <pointLight
            position={[0, 4.4, 1]}
            intensity={8}
            distance={11}
            color={i === 0 ? "#e5b567" : "#34d399"}
          />
          <mesh position={[0, 0.02, 1.9]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.5, 1.85, 26]} />
            <meshBasicMaterial color={i === 0 ? "#e5b567" : "#34d399"} transparent opacity={0.6} toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* Ba nhóm lặp lại nhiều nhất ngoài phố đi qua instancing: thân cây, cột
          đèn và thân xe. Phần cần khác nhau từng cái - tán cây nhiều lớp, bóng
          đèn phát sáng, bánh xe - vẫn vẽ riêng, vì chúng ít và chúng là thứ
          mắt nhìn vào. */}
      <Instances
        count={STREET_TREE_XS.length}
        color="#4a3728"
        place={(i, m) => {
          m.position.set(STREET_TREE_XS[i], 1.5, TREE_Z);
          m.scale.set(1, 1, 1);
        }}
      >
        <cylinderGeometry args={[0.18, 0.26, 3, 8]} />
      </Instances>
      {STREET_TREE_XS.map((x) => (
        <TreeCanopy key={x} x={x} z={TREE_Z} />
      ))}

      <Instances
        count={LAMP_XS.length}
        color="#2c2c2c"
        place={(i, m) => {
          m.position.set(LAMP_XS[i], 2.4, LAMP_Z);
          m.scale.set(1, 1, 1);
        }}
      >
        <cylinderGeometry args={[0.08, 0.11, 4.8, 8]} />
      </Instances>
      {LAMP_XS.map((x) => (
        <LampHead key={x} x={x} z={LAMP_Z} />
      ))}

      <Instances
        count={BIKE_SPOTS.length}
        color="#1c1917"
        place={(i, m) => {
          const [x, z] = BIKE_SPOTS[i];
          m.position.set(x, 0.52, z);
          m.rotation.set(0, Math.PI / 2, 0);
          m.scale.set(1, 1, 1);
        }}
      >
        <boxGeometry args={[1.05, 0.26, 0.34]} />
      </Instances>
      {BIKE_SPOTS.map(([x, z], i) => (
        <MotorbikeDetail key={x} x={x} z={z} color={["#b91c1c", "#0f766e", "#1d4ed8", "#a16207", "#7c3aed"][i % 5]} />
      ))}

      {/* Dãy nhà bên kia đường: chỉ để nhìn, không tới được. */}
      {[-28, -14, 0, 14, 28].map((x) => (
        <mesh key={x} position={[x, 6, 21]} receiveShadow>
          <boxGeometry args={[12, 12, 8]} />
          <meshStandardMaterial color="#2a2724" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}


/** Công viên: hồ nước, ghế đá, cây xếp vòng, trời mở.
 *
 *  Không trần và không tường - đây là chỗ duy nhất trong khu phố ở ngoài trời
 *  mà không phải mặt đường, và cái cảm giác "ngẩng lên thấy trời" là toàn bộ
 *  lý do nó tồn tại. */
function ParkScene({ room }: { room: DistrictRoom }) {
  const { width, depth } = room.size;
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width + 8, depth + 8]} />
        <meshStandardMaterial color="#3f5f3a" roughness={0.98} />
      </mesh>
      {/* lối đi lát quanh hồ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[POND.radius + 0.6, POND.radius + 2.2, 40]} />
        <meshStandardMaterial color="#7d7166" roughness={0.95} />
      </mesh>
      {/* hồ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[POND.x, 0.02, POND.z]}>
        <circleGeometry args={[POND.radius, 36]} />
        <meshStandardMaterial color="#1e4d5c" roughness={0.15} metalness={0.5} />
      </mesh>
      <mesh position={[POND.x, 0.06, POND.z]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[POND.radius - 0.12, POND.radius, 36]} />
        <meshStandardMaterial color="#8b8078" roughness={0.9} />
      </mesh>

      {PARK_TREES.map(([x, z]) => (
        <Tree key={`${x}:${z}`} x={x} z={z} />
      ))}

      {PARK_BENCHES.map(([x, z]) => (
        <group key={`${x}:${z}`} position={[x, 0, z]} rotation={[0, z > 0 ? Math.PI : 0, 0]}>
          <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.8, 0.09, 0.5]} />
            <meshStandardMaterial color="#6b4f33" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.72, -0.22]} castShadow>
            <boxGeometry args={[1.8, 0.5, 0.07]} />
            <meshStandardMaterial color="#6b4f33" roughness={0.9} />
          </mesh>
          {[-0.75, 0.75].map((lx) => (
            <mesh key={lx} position={[lx, 0.21, 0]}>
              <boxGeometry args={[0.12, 0.42, 0.44]} />
              <meshStandardMaterial color="#57534e" roughness={0.85} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Hàng rào thấp quanh công viên: nói "hết công viên" mà không dựng tường. */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[0, 0.4, (s * depth) / 2]}>
          <boxGeometry args={[width, 0.8, 0.12]} />
          <meshStandardMaterial color="#4a443e" roughness={0.9} />
        </mesh>
      ))}
      {[-1, 1].map((s) => (
        <mesh key={`x${s}`} position={[(s * width) / 2, 0.4, 0]}>
          <boxGeometry args={[0.12, 0.8, depth]} />
          <meshStandardMaterial color="#4a443e" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/** Quảng trường trung tâm: đài phun nước, vòng cột đèn, bốn lối toả ra. */
function CenterScene({ room }: { room: DistrictRoom }) {
  const { width, depth } = room.size;
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width + 6, depth + 6]} />
        <meshStandardMaterial color="#6f6862" roughness={0.95} />
      </mesh>
      {/* vòng lát đá quanh đài phun */}
      {[4.2, 6.6, 9].map((r) => (
        <mesh key={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[r - 0.14, r, 48]} />
          <meshStandardMaterial color="#8b8078" roughness={0.9} />
        </mesh>
      ))}

      {/* đài phun nước */}
      <group position={[FOUNTAIN.x, 0, FOUNTAIN.z]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[FOUNTAIN.radius, FOUNTAIN.radius + 0.2, 0.7, 24]} />
          <meshStandardMaterial color="#9a9086" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[FOUNTAIN.radius - 0.25, 24]} />
          <meshStandardMaterial color="#2f6f86" roughness={0.15} metalness={0.5} />
        </mesh>
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.34, 1.6, 12]} />
          <meshStandardMaterial color="#b0a698" roughness={0.8} />
        </mesh>
        <mesh position={[0, 2.5, 0]}>
          <sphereGeometry args={[0.34, 14, 14]} />
          <meshBasicMaterial color="#a5d8e8" toneMapped={false} />
        </mesh>
        <pointLight position={[0, 2.6, 0]} intensity={8} distance={12} color="#a5d8e8" />
      </group>

      {CENTER_LAMPS.map(([x, z]) => (
        <StreetLamp key={`${x}:${z}`} x={x} z={z} />
      ))}

      {/* Bốn khối chỉ hướng ở bốn lối ra, màu theo đích đến. */}
      {room.doorways.map((d) => (
        <group key={d.id} position={[d.x * 0.82, 0, d.z * 0.82]}>
          <mesh position={[0, 1.1, 0]} castShadow>
            <boxGeometry args={[0.3, 2.2, 0.3]} />
            <meshStandardMaterial color="#3f3a35" roughness={0.85} />
          </mesh>
          <mesh position={[0, 2.35, 0]}>
            <octahedronGeometry args={[0.3, 0]} />
            <meshBasicMaterial color={d.accent} toneMapped={false} />
          </mesh>
          <pointLight position={[0, 2.4, 0]} intensity={5} distance={7} color={d.accent} />
        </group>
      ))}
    </group>
  );
}


/** Quán cà phê vỉa hè Sài Gòn: bàn inox, ghế nhựa thấp, đèn dây, kệ sách tài
 *  chính và quầy pha phin.
 *
 *  Ghế thấp và bàn nhỏ là chi tiết làm nên nó - bàn ghế văn phòng cao ngang
 *  bụng thì đây thành một phòng họp có cây cảnh. Đèn dây vắt ngang trần là thứ
 *  duy nhất ở đây phát sáng ấm, và nó làm gần hết việc. */
function CafeScene({ room, seatTaken }: { room: DistrictRoom; seatTaken: ReadonlySet<number> }) {
  const { t } = useI18n();
  const floor = useMemo(() => oakTexture(5, 6), []);
  const shelf = useMemo(() => bookshelfTexture(), []);
  const { width, depth, height } = room.size;
  const halfW = width / 2;
  const halfD = depth / 2;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial map={floor} roughness={0.9} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#241c16" roughness={1} />
      </mesh>
      {[
        [0, height / 2, -halfD, 0],
        [0, height / 2, halfD, Math.PI],
        [-halfW, height / 2, 0, Math.PI / 2],
        [halfW, height / 2, 0, -Math.PI / 2],
      ].map(([x, y, z, ry], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[0, ry, 0]} receiveShadow>
          <planeGeometry args={[i < 2 ? width : depth, height]} />
          <meshStandardMaterial color={i < 2 ? "#3d3128" : "#372c24"} roughness={0.95} />
        </mesh>
      ))}

      {/* Cửa kính nhìn ra phố, ở tường nam. */}
      <mesh position={[0, 1.8, halfD - 0.06]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width - 3, 3]} />
        <meshBasicMaterial color="#f5d9a8" opacity={0.32} transparent toneMapped={false} />
      </mesh>

      {/* Đèn dây vắt ngang - phần "chill" của quán, và gần như toàn bộ ánh sáng. */}
      {[-4, 0, 4].map((z) => (
        <group key={z}>
          <mesh position={[0, height - 0.6, z]}>
            <boxGeometry args={[width - 1, 0.03, 0.03]} />
            <meshStandardMaterial color="#2a2320" />
          </mesh>
          {[-6, -3, 0, 3, 6].map((x) => (
            <group key={x} position={[x, height - 0.78, z]}>
              <mesh>
                <sphereGeometry args={[0.11, 10, 10]} />
                <meshBasicMaterial color="#ffcf87" toneMapped={false} />
              </mesh>
              <pointLight intensity={2.4} distance={7} color="#ffcf87" />
            </group>
          ))}
        </group>
      ))}

      {/* Bàn inox + ghế nhựa thấp. Ghế sáng lên khi có người ngồi. */}
      {CAFE_TABLES.map(([x, z], i) => {
        const taken = seatTaken.has(i);
        return (
          <group key={`${x}:${z}`} position={[x, 0, z]}>
            <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.52, 0.5, 0.05, 18]} />
              <meshStandardMaterial color="#b8bcc0" metalness={0.75} roughness={0.35} />
            </mesh>
            <mesh position={[0, 0.26, 0]}>
              <cylinderGeometry args={[0.06, 0.09, 0.5, 10]} />
              <meshStandardMaterial color="#8b9095" metalness={0.7} roughness={0.4} />
            </mesh>
            {/* ly cà phê phin */}
            <mesh position={[0.16, 0.61, 0.08]} castShadow>
              <cylinderGeometry args={[0.06, 0.05, 0.12, 10]} />
              <meshStandardMaterial color="#f5f5f4" roughness={0.4} />
            </mesh>
            <mesh position={[0.16, 0.7, 0.08]}>
              <cylinderGeometry args={[0.055, 0.055, 0.06, 10]} />
              <meshStandardMaterial color="#8a8a8a" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* cuốn sách đang mở */}
            <mesh position={[-0.14, 0.57, -0.02]} rotation={[0, 0.35, 0]} castShadow>
              <boxGeometry args={[0.34, 0.04, 0.24]} />
              <meshStandardMaterial color={["#7f1d1d", "#1e3a8a", "#14532d", "#78350f"][i % 4]} roughness={0.8} />
            </mesh>
            {/* ghế nhựa thấp, quay ra phía cửa */}
            <group position={[0, 0, 1.15]}>
              <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.22, 0.26, 0.07, 12]} />
                <meshStandardMaterial color={taken ? "#f59e0b" : "#b91c1c"} roughness={0.6} />
              </mesh>
              {[0, 1, 2, 3].map((k) => {
                const a = (k / 4) * Math.PI * 2 + Math.PI / 4;
                return (
                  <mesh key={k} position={[Math.cos(a) * 0.16, 0.1, Math.sin(a) * 0.16]}>
                    <cylinderGeometry args={[0.022, 0.022, 0.2, 6]} />
                    <meshStandardMaterial color={taken ? "#b45309" : "#7f1d1d"} roughness={0.7} />
                  </mesh>
                );
              })}
            </group>
          </group>
        );
      })}

      {/* Kệ sách tài chính dọc tường bắc */}
      {CAFE_SHELF_XS.map((x) => (
        <mesh key={x} position={[x, 1.05, CAFE_SHELF_Z]} castShadow receiveShadow>
          <boxGeometry args={[3, 2.1, 0.7]} />
          <meshStandardMaterial map={shelf} roughness={0.9} />
        </mesh>
      ))}
      <TextBoard
        title={t.careerDistrict.shell.cafeTitle}
        rows={[t.careerDistrict.shell.cafeInteriorRow1, t.careerDistrict.shell.cafeInteriorRow2]}
        accent="#fbbf24"
        width={6.6}
        height={1.9}
        position={[0, 2.9, CAFE_SHELF_Z + 0.4]}
      />

      {/* Quầy pha phin */}
      <group position={[CAFE_COUNTER.x, 0, CAFE_COUNTER.z]}>
        <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[CAFE_COUNTER.halfW * 2, 1.1, CAFE_COUNTER.halfD * 2]} />
          <meshStandardMaterial color="#4a3728" roughness={0.85} />
        </mesh>
        <mesh position={[0, 1.14, 0]}>
          <boxGeometry args={[CAFE_COUNTER.halfW * 2 + 0.1, 0.06, CAFE_COUNTER.halfD * 2 + 0.1]} />
          <meshStandardMaterial color="#2b2320" roughness={0.5} metalness={0.3} />
        </mesh>
        {[-0.5, 0, 0.5].map((z) => (
          <mesh key={z} position={[0.2, 1.26, z]}>
            <cylinderGeometry args={[0.07, 0.07, 0.16, 10]} />
            <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        <pointLight position={[0, 2.1, 0.8]} intensity={4} distance={6} color="#ffcf87" />
      </group>

      {/* Chậu cây góc quán: dùng lại hình cây ngoài phố nhưng thu nhỏ, thay vì
          thêm một loại cây nữa chỉ để đứng trong nhà. */}
      {CAFE_PLANTS.map(([x, z]) => (
        <group key={`${x}:${z}`} position={[x, 0, z]} scale={0.5}>
          <Tree x={0} z={0} />
        </group>
      ))}
    </group>
  );
}

function DeskUnit({
  x,
  z,
  ry,
  title,
  emoji,
  accent,
}: {
  x: number;
  z: number;
  ry: number;
  title: string;
  emoji: string;
  accent: string;
}) {
  const plate = useMemo(() => nameplateTexture(`${emoji} ${title}`), [emoji, title]);
  useEffect(() => () => plate.dispose(), [plate]);
  return (
    <group position={[x, 0, z]} rotation={[0, ry, 0]}>
      {/* mặt bàn (bàn quay ngang: chiều dài chạy theo trục z của phòng) */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.08, 1.24]} />
        <meshStandardMaterial color="#7a5c3c" roughness={0.6} />
      </mesh>
      {[[-0.95, -0.5], [0.95, -0.5], [-0.95, 0.5], [0.95, 0.5]].map(([lx, lz], i) => (
        <mesh key={i} position={[lx, 0.37, lz]}>
          <boxGeometry args={[0.09, 0.74, 0.09]} />
          <meshStandardMaterial color="#4a3524" roughness={0.9} />
        </mesh>
      ))}
      {/* màn hình - mỗi nghề một cái bàn đang làm việc, không phải bàn trống */}
      <mesh position={[0.2, 1.02, 0]} rotation={[0, -0.25, 0]} castShadow>
        <boxGeometry args={[0.72, 0.44, 0.04]} />
        <meshStandardMaterial color="#0f172a" emissive={accent} emissiveIntensity={0.45} />
      </mesh>
      <mesh position={[-0.55, 0.82, 0.16]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[0.34, 0.06, 0.26]} />
        <meshStandardMaterial color="#e7e5e4" roughness={0.7} />
      </mesh>
      {/* biển tên nghề, dựng đứng ở mép bàn phía lối đi */}
      <mesh position={[0, 1.32, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.9, 0.48]} />
        <meshBasicMaterial map={plate} transparent depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

function OfficeScene({
  room,
  lessonTitles,
  doneSlugs,
  dueSlugs,
}: {
  room: DistrictRoom;
  lessonTitles: string[];
  doneSlugs: ReadonlySet<string>;
  dueSlugs: ReadonlySet<string>;
}) {
  const { t } = useI18n();
  const floor = useMemo(() => oakTexture(6, 14), []);
  const shelf = useMemo(() => bookshelfTexture(), []);
  const { width, depth, height } = room.size;
  const halfW = width / 2;
  const halfD = depth / 2;
  const formulas: WallFormula[] = useMemo(
    () => (isCareerCategory(room.id) ? formulasFor(room.id, 6) : []),
    [room.id]
  );

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial map={floor} roughness={0.85} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#1d1916" roughness={1} />
      </mesh>
      {/* bốn tường */}
      <mesh position={[0, height / 2, -halfD]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#39312b" roughness={0.95} />
      </mesh>
      <mesh position={[0, height / 2, halfD]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#39312b" roughness={0.95} />
      </mesh>
      <mesh position={[-halfW, height / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color="#332c26" roughness={0.95} />
      </mesh>
      <mesh position={[halfW, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color="#332c26" roughness={0.95} />
      </mesh>

      {/* Bảng đầu phòng. Chỉ treo ở PHÒNG NGÀNH: tường bắc của một tầng tháp
          đã dành cho bảng công thức phía dưới, và treo cả hai thì chúng chồng
          lên nhau thành một mớ chữ không đọc được. Sảnh tháp có bảng riêng vì
          nó không có nghề nào để đếm. */}
      {room.desks.length > 0 ? (
        <TextBoard
          title={room.label}
          rows={[format(t.careerDistrict.shell.officeDesksRow, { n: room.desks.length }), t.careerDistrict.shell.officePathRow]}
          accent={room.accent}
          width={6.4}
          height={2.6}
          position={[0, 2.1, -halfD + 0.1]}
        />
      ) : room.portals.length === 0 ? (
        <TextBoard
          title={t.careerDistrict.shell.towerTitle}
          rows={[t.careerDistrict.shell.officeLiftRow, format(t.careerDistrict.shell.officeFloorsRow, { n: STATION_IDS.length })]}
          accent={room.accent}
          width={6.4}
          height={2.4}
          position={[0, 2.9, -halfD + 0.1]}
        />
      ) : null}

      {/* Bảng công thức treo dọc hai tường, xen giữa các bàn.
          Treo CAO hơn đầu người: ngang tầm mắt thì chúng che mất biển tên nghề
          ngay dưới, và cả hai đều là thứ phải đọc được. */}
      {formulas.map((f, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        const slot = Math.floor(i / 2);
        const z = -halfD + 6 + slot * 4.6;
        if (z > halfD - 2) return null;
        return (
          <TextBoard
            key={f.id}
            title={f.equation}
            rows={[f.title, format(t.careerDistrict.shell.formulaSource, { source: f.source })]}
            accent={room.accent}
            width={3.9}
            height={1.7}
            position={[side * (halfW - 0.12), 2.75, z]}
            rotation={[0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
          />
        );
      })}

      {/* Kệ bài học cạnh cửa ra: thứ cuối cùng nhìn thấy trước khi rời phòng.
          Chỉ phòng ngành mới có kệ - tầng tháp không có "bài học của tầng",
          nó có một tính năng. */}
      {lessonTitles.length > 0 && (
      <group position={[0, 0, halfD - 0.45]}>
        {[-3.4, 3.4].map((sx) => (
          <mesh key={sx} position={[sx, 1.1, 0]} castShadow receiveShadow>
            <boxGeometry args={[3, 2.2, 0.5]} />
            <meshStandardMaterial map={shelf} roughness={0.9} />
          </mesh>
        ))}
      </group>
      )}
      {lessonTitles.length > 0 && (
        <TextBoard
          title={t.careerDistrict.shell.lessonShelfTitle}
          rows={lessonTitles.slice(0, 5)}
          accent={room.accent}
          width={5.4}
          height={2.4}
          position={[0, 2.4, halfD - 0.14]}
          rotation={[0, Math.PI, 0]}
        />
      )}

      {room.desks.map((d) => (
        <DeskUnit key={d.careerId} {...d} accent={room.accent} />
      ))}

      {/* Cột bài học của phòng lộ trình. Cột đã học sáng lên, cột chưa học
          còn tối - đứng giữa hành lang nhìn về hai phía là biết mình đang ở
          đâu trên lộ trình, thứ một danh sách phẳng không nói được. */}
      {(room.stops ?? []).map((stop) => {
        const done = doneSlugs.has(stop.slug);
        // Ba trạng thái, không phải hai: chưa học (tối), đã học (sáng màu
        // phòng), và ĐẾN HẠN ÔN (hổ phách, sáng hơn hẳn). Trạng thái thứ ba là
        // lý do người học đi lại hành lang cũ - nếu nó trông giống "đã học"
        // thì cả cơ chế ôn ngắt quãng vô hình trong thế giới này.
        const due = dueSlugs.has(stop.slug);
        const lit = due ? "#fbbf24" : done ? room.accent : "#4b4540";
        return (
          <group key={stop.slug} position={[stop.x, 0, stop.z]}>
            <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.42, 0.5, 1.8, 8]} />
              <meshStandardMaterial color={due ? "#4a3c22" : done ? "#3f3a2a" : "#2a2724"} roughness={0.85} />
            </mesh>
            <mesh position={[0, 1.95, 0]}>
              <sphereGeometry args={[due ? 0.32 : 0.26, 14, 14]} />
              <meshBasicMaterial color={lit} toneMapped={false} />
            </mesh>
            {(done || due) && (
              <pointLight position={[0, 2.1, 0]} intensity={due ? 9 : 5} distance={due ? 7 : 5} color={lit} />
            )}
            <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.62, due ? 0.9 : 0.78, 20]} />
              <meshBasicMaterial color={done || due ? lit : "#3a3532"} toneMapped={false} />
            </mesh>
          </group>
        );
      })}

      {/* Bục ở quảng trường game: bục tròn phát sáng, không phải cái bàn. Một
          quảng trường trò chơi mà kê mười ba cái bàn làm việc thì nó không còn
          là quảng trường trò chơi nữa. */}
      {room.id === "khu-game" &&
        room.portals.map((p) => (
          <group key={p.id} position={[p.x, 0, p.z]}>
            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[1.05, 1.2, 0.7, 16]} />
              <meshStandardMaterial color="#241f2b" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.72, 1.02, 24]} />
              <meshBasicMaterial color={p.accent} toneMapped={false} />
            </mesh>
            {/* Khối phát sáng trên đỉnh bục là meshBasicMaterial, không phải
                standard + emissive: trong một quảng trường thiếu sáng thì mặt
                standard vẫn ăn bóng đổ và khối đọc thành một cục đen, đúng cái
                ngược lại với "ngọn hải đăng chỉ chỗ". */}
            <mesh position={[0, 1.9, 0]}>
              <icosahedronGeometry args={[0.55, 0]} />
              <meshBasicMaterial color={p.accent} toneMapped={false} />
            </mesh>
            <mesh position={[0, 1.9, 0]}>
              <icosahedronGeometry args={[0.78, 0]} />
              <meshBasicMaterial color={p.accent} transparent opacity={0.16} toneMapped={false} />
            </mesh>
            <pointLight position={[0, 2.1, 0]} intensity={7} distance={7} color={p.accent} />
          </group>
        ))}

      {/* Bàn cổng: cái bàn mà đứng trước nó thì mở được tính năng thật. */}
      {room.id !== "khu-game" &&
        room.portals.map((p) => (
        <group key={p.id} position={[p.x, 0, p.z]}>
          <mesh position={[0, 0.76, 0]} castShadow receiveShadow>
            <boxGeometry args={[3, 0.1, 1.5]} />
            <meshStandardMaterial color="#7a5c3c" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.38, 0]}>
            <boxGeometry args={[2.6, 0.72, 1.1]} />
            <meshStandardMaterial color="#4a3524" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.24, 0]}>
            <boxGeometry args={[1.5, 0.9, 0.06]} />
            <meshStandardMaterial color="#0f172a" emissive={p.accent} emissiveIntensity={0.7} />
          </mesh>
            <pointLight position={[0, 2, 1]} intensity={8} distance={7} color={p.accent} />
          </group>
        ))}

      {/* Công thức chủ đạo của tầng, khắc to trên tường bắc. */}
      {room.portals[0]?.formula && (
        <TextBoard
          title={room.portals[0].formula as string}
          rows={[room.portals[0].formulaNote ?? "", room.portals[0].blurb]}
          accent={room.accent}
          width={8.4}
          height={2.8}
          position={[0, 2.5, -depth / 2 + 0.1]}
        />
      )}

      {/* Buồng thang máy */}
      {room.lift && (
        <group position={[room.lift.x, 0, room.lift.z]}>
          <mesh position={[0, 1.6, 0]}>
            <boxGeometry args={[3, 3.2, 0.3]} />
            <meshStandardMaterial color="#1f2937" roughness={0.5} metalness={0.6} />
          </mesh>
          <mesh position={[0, 1.6, 0.18]}>
            <planeGeometry args={[2.4, 2.8]} />
            <meshBasicMaterial color="#fbbf24" opacity={0.28} transparent toneMapped={false} />
          </mesh>
          <pointLight position={[0, 2.4, 0.9]} intensity={6} distance={6} color="#fbbf24" />
        </group>
      )}

      {/* Đèn trần: một cái cho mỗi cặp bàn, đủ để phòng dài không tối ở giữa. */}
      {/* Đèn trần rải theo CHIỀU SÂU phòng, không theo số bàn: quảng trường
          game không có cái bàn nào nên công thức cũ cho đúng hai ngọn đèn ở
          đầu bắc và cả nửa phòng phía nam tối om. */}
      {Array.from({ length: Math.max(2, Math.round(depth / 7)) }, (_, i) => {
        const z = -halfD + 4 + i * 7;
        return (
          <pointLight key={i} position={[0, height - 0.7, z]} intensity={16} distance={12} color="#ffeccd" />
        );
      })}
    </group>
  );
}

export default function DistrictShell({
  room,
  lessonTitles,
  doneSlugs,
  dueSlugs,
  progressByCategory,
  seatTaken,
}: {
  room: DistrictRoom;
  /** Tên bài học của phòng này, đã tra sẵn ở tầng trên. */
  lessonTitles: string[];
  /** Slug những bài đã hoàn thành, để cột trên hành lang sáng lên. */
  doneSlugs: ReadonlySet<string>;
  /** Slug những bài tới hạn ôn lại. */
  dueSlugs: ReadonlySet<string>;
  /** Tiến độ từng nhóm ngành, khắc lên biển hiệu ngoài phố. */
  progressByCategory: Record<CareerCategory, { done: number; total: number }>;
  /** Ghế cà phê đang có người, để ghế đổi màu. */
  seatTaken: ReadonlySet<number>;
}) {
  if (room.kind === "street") return <StreetScene progressByCategory={progressByCategory} />;
  // Công viên và quảng trường là ngoài trời: chúng không có trần, không có bốn
  // bức tường, và dùng chung OfficeScene sẽ nhốt chúng trong một cái hộp.
  if (room.id === "cong-vien") return <ParkScene room={room} />;
  if (room.id === "trung-tam") return <CenterScene room={room} />;
  if (room.id === "quan-ca-phe") return <CafeScene room={room} seatTaken={seatTaken} />;
  // Sáu căn nhà dân sự chia nhau một khuôn, nên chúng sống ở file riêng.
  if (isCivicRoom(room.id)) return <CivicScene room={room} />;
  return (
    <OfficeScene room={room} lessonTitles={lessonTitles} doneSlugs={doneSlugs} dueSlugs={dueSlugs} />
  );
}
