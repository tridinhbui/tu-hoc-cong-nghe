"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import {
  BIKE_SPOTS,
  LAMP_XS,
  LAMP_Z,
  SHOP_X,
  STREET,
  TOWER_X,
  STREET_TREE_XS,
  TREE_Z,
  careerCountIn,
  CAREER_CATEGORY_BLURBS,
  type DistrictRoom,
} from "./district-space";
import { formulasFor, type WallFormula } from "./district-content";
import { STATIONS } from "@/components/lobby/stations";
import { CAREER_CATEGORY_ORDER, isCareerCategory, type CareerCategory } from "@/lib/career-categories";
import {
  asphaltTexture,
  boardTexture,
  bookshelfTexture,
  nameplateTexture,
  oakTexture,
} from "@/components/lobby/room-textures";

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
  const tex = useMemo(
    () => boardTexture(title, rows, { accent }),
    [title, rows, accent]
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
function Shophouse({ category }: { category: CareerCategory }) {
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
        title={CAREER_CATEGORY_LABEL_SHORT[category]}
        rows={[CAREER_CATEGORY_BLURBS[category], `${count} nghề bên trong`]}
        accent={SHOP_ACCENT[category]}
        width={8.2}
        height={1.9}
        position={[0, 3.9, 2.33]}
      />
    </group>
  );
}

/** Tên ngắn cho biển hiệu: tên đầy đủ dài quá thì chữ trên biển bé lại đến mức
 *  đứng dưới đường không đọc được. */
const CAREER_CATEGORY_LABEL_SHORT: Record<CareerCategory, string> = {
  investment: "ĐẦU TƯ",
  banking: "NGÂN HÀNG",
  advisory: "TƯ VẤN",
  accounting: "KẾ TOÁN",
  data: "DỮ LIỆU",
};

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
        title="THÁP TỰ HỌC"
        rows={["Mỗi tầng một phòng chức năng", `${STATIONS.length} tầng · thang máy trong sảnh`]}
        accent="#fbbf24"
        width={9}
        height={2}
        position={[0, 4, 2.63]}
      />
    </group>
  );
}

function StreetScene() {
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
        <Shophouse key={c} category={c} />
      ))}
      <Tower />

      {STREET_TREE_XS.map((x) => (
        <Tree key={x} x={x} z={TREE_Z} />
      ))}
      {LAMP_XS.map((x) => (
        <StreetLamp key={x} x={x} z={LAMP_Z} />
      ))}
      {BIKE_SPOTS.map(([x, z], i) => (
        <Motorbike key={x} x={x} z={z} color={["#b91c1c", "#0f766e", "#1d4ed8", "#a16207", "#7c3aed"][i % 5]} />
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
}: {
  room: DistrictRoom;
  lessonTitles: string[];
  doneSlugs: ReadonlySet<string>;
}) {
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
          rows={[`${room.desks.length} nghề trong nhóm này`, "Đi tới từng bàn để xem lộ trình học"]}
          accent={room.accent}
          width={6.4}
          height={2.6}
          position={[0, 2.1, -halfD + 0.1]}
        />
      ) : room.portals.length === 0 ? (
        <TextBoard
          title="THÁP TỰ HỌC"
          rows={["Thang máy ngay trước mặt", `${STATIONS.length} tầng, mỗi tầng một phòng chức năng`]}
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
            rows={[f.title, `Sổ tay ${f.source}`]}
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
          title="Kệ bài học của nhóm"
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
        return (
          <group key={stop.slug} position={[stop.x, 0, stop.z]}>
            <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.42, 0.5, 1.8, 8]} />
              <meshStandardMaterial color={done ? "#3f3a2a" : "#2a2724"} roughness={0.85} />
            </mesh>
            <mesh position={[0, 1.95, 0]}>
              <sphereGeometry args={[0.26, 14, 14]} />
              <meshBasicMaterial color={done ? room.accent : "#4b4540"} toneMapped={false} />
            </mesh>
            {done && <pointLight position={[0, 2.1, 0]} intensity={5} distance={5} color={room.accent} />}
            <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.62, 0.78, 20]} />
              <meshBasicMaterial color={done ? room.accent : "#3a3532"} toneMapped={false} />
            </mesh>
          </group>
        );
      })}

      {/* Bàn cổng: cái bàn mà đứng trước nó thì mở được tính năng thật. */}
      {room.portals.map((p) => (
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
      {Array.from({ length: Math.max(2, Math.ceil(room.desks.length / 3)) }, (_, i) => {
        const z = -halfD + 5 + i * 6;
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
}: {
  room: DistrictRoom;
  /** Tên bài học của phòng này, đã tra sẵn ở tầng trên. */
  lessonTitles: string[];
  /** Slug những bài đã hoàn thành, để cột trên hành lang sáng lên. */
  doneSlugs: ReadonlySet<string>;
}) {
  return room.kind === "street" ? (
    <StreetScene />
  ) : (
    <OfficeScene room={room} lessonTitles={lessonTitles} doneSlugs={doneSlugs} />
  );
}
