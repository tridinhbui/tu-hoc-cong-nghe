"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { CIVIC_ROOMS, type DistrictRoom } from "./district-space";
import { bookshelfTexture, oakTexture } from "@/components/lobby/room-textures";

/** Nội thất sáu căn nhà dân sự: cửa hàng, bảng vàng, phòng thi, căn hộ, bảo
 *  tàng, khu nhà bạn bè.
 *
 *  Tách khỏi DistrictShell vì file đó đã gánh con phố, phòng ngành, tháp,
 *  quảng trường game, công viên và quán cà phê - thêm sáu cảnh nữa thì nó
 *  thành một file không ai đọc hết được. Cắt theo "khu dân sự" chứ không cắt
 *  ngẫu nhiên: sáu cảnh này chia nhau một khuôn (vỏ phòng + bục giữa) và sửa
 *  cái này thường là sửa cả nhóm.
 *
 *  Cả sáu đều KHÔNG dựng lại nội dung bằng khối 3D. Bảng xếp hạng, danh sách
 *  đồ, hồ sơ cá nhân đều đã có màn hình riêng làm tốt việc đó; căn phòng đưa
 *  người ta tới chỗ đứng, còn nội dung mở ra trên HUD. Dựng một bảng xếp hạng
 *  bằng chữ 3D thì vừa khó đọc hơn vừa lệch khỏi bản thật ngay lần sửa đầu. */

/** Vỏ phòng dùng chung: sàn, trần, bốn tường, và bục ở giữa. */
function CivicShell({ room, children }: { room: DistrictRoom; children?: React.ReactNode }) {
  const floor = useMemo(() => oakTexture(5, 5), []);
  const { width, depth, height } = room.size;
  const halfW = width / 2;
  const halfD = depth / 2;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial map={floor} roughness={0.85} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#221c18" roughness={1} />
      </mesh>
      {[
        [0, height / 2, -halfD, 0, width],
        [0, height / 2, halfD, Math.PI, width],
        [-halfW, height / 2, 0, Math.PI / 2, depth],
        [halfW, height / 2, 0, -Math.PI / 2, depth],
      ].map(([x, y, z, ry, span], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[0, ry, 0]} receiveShadow>
          <planeGeometry args={[span, height]} />
          <meshStandardMaterial color={i < 2 ? "#38302a" : "#332c26"} roughness={0.95} />
        </mesh>
      ))}

      {/* Bục giữa phòng: chỗ đứng để HUD mở nội dung. Vòng sáng dưới chân là
          thứ nói "đứng vào đây" mà không cần một dòng hướng dẫn nào. */}
      <group position={[0, 0, -1]}>
        <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.3, 1.45, 0.36, 24]} />
          <meshStandardMaterial color="#2c2620" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.95, 1.24, 30]} />
          <meshBasicMaterial color={room.accent} toneMapped={false} />
        </mesh>
        <pointLight position={[0, 3, 0]} intensity={14} distance={12} color={room.accent} />
      </group>

      {/* Đèn trần đều khắp, để phòng dài không tối ở giữa. */}
      {Array.from({ length: Math.max(2, Math.round(depth / 7)) }, (_, i) => (
        <pointLight
          key={i}
          position={[0, height - 0.6, -halfD + 4 + i * 7]}
          intensity={11}
          distance={13}
          color="#ffeccd"
        />
      ))}

      {children}
    </group>
  );
}

/** Cửa hàng: gương lớn và giá treo đồ. */
function ShopInterior({ room }: { room: DistrictRoom }) {
  const halfW = room.size.width / 2;
  const halfD = room.size.depth / 2;
  return (
    <>
      {/* Gương: mặt phẳng phản chiếu giả bằng màu sáng và khung gỗ. Gương thật
          cần render cảnh hai lần, và một cửa hàng không đáng giá đó. */}
      <group position={[0, 0, -halfD + 0.4]}>
        <mesh position={[0, 2.2, 0]}>
          <planeGeometry args={[3.4, 4]} />
          <meshStandardMaterial color="#cfd8e3" metalness={0.85} roughness={0.12} />
        </mesh>
        <mesh position={[0, 2.2, -0.05]}>
          <planeGeometry args={[3.8, 4.4]} />
          <meshStandardMaterial color="#6b4a2f" roughness={0.7} />
        </mesh>
        <pointLight position={[0, 3.4, 1.4]} intensity={9} distance={9} color="#fff4e0" />
      </group>

      {/* Giá treo đồ hai bên */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * (halfW - 1.6), 0, -1]}>
          <mesh position={[0, 1.7, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
            <meshStandardMaterial color="#8b9095" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 1.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 5, 8]} />
            <meshStandardMaterial color="#b8bcc0" metalness={0.8} roughness={0.3} />
          </mesh>
          {[-1.8, -0.6, 0.6, 1.8].map((z) => (
            <mesh key={z} position={[0, 1.1, z]} castShadow>
              <boxGeometry args={[0.5, 0.9, 0.14]} />
              <meshStandardMaterial
                color={["#7f1d1d", "#1e3a8a", "#14532d", "#78350f"][Math.abs(z * 10) % 4]}
                roughness={0.8}
              />
            </mesh>
          ))}
        </group>
      ))}
    </>
  );
}

/** Bảng vàng: bục xếp hạng và tường bia đá. */
function HallOfFameInterior({ room }: { room: DistrictRoom }) {
  const halfD = room.size.depth / 2;
  return (
    <>
      {/* Bục nhất nhì ba, cao thấp khác nhau. */}
      {[
        { x: 0, h: 1.5, c: "#fcd34d" },
        { x: -1.9, h: 1.1, c: "#d4d4d8" },
        { x: 1.9, h: 0.85, c: "#b45309" },
      ].map((p) => (
        <group key={p.x} position={[p.x, 0, -halfD + 3.2]}>
          <mesh position={[0, p.h / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.5, p.h, 1.5]} />
            <meshStandardMaterial color="#3b342c" roughness={0.85} />
          </mesh>
          <mesh position={[0, p.h + 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.4, 1.4]} />
            <meshBasicMaterial color={p.c} toneMapped={false} />
          </mesh>
        </group>
      ))}
      {/* Bia đá dọc hai tường: một tấm cho mỗi năng lực. */}
      {[-1, 1].map((side) =>
        [-2.5, 0.5, 3.5].map((z) => (
          <mesh
            key={`${side}:${z}`}
            position={[side * (room.size.width / 2 - 0.3), 2.1, z]}
            rotation={[0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
          >
            <planeGeometry args={[1.8, 2.4]} />
            <meshStandardMaterial color="#4a4239" roughness={0.9} />
          </mesh>
        ))
      )}
    </>
  );
}

/** Phòng thi: bàn xếp hàng, đồng hồ tường, không có gì khác. */
function ExamInterior({ room }: { room: DistrictRoom }) {
  const halfD = room.size.depth / 2;
  return (
    <>
      {[-3.2, 0, 3.2].map((x) =>
        [-4, -1.2].map((z) => (
          <group key={`${x}:${z}`} position={[x, 0, z]}>
            <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.5, 0.07, 0.8]} />
              <meshStandardMaterial color="#7a5c3c" roughness={0.7} />
            </mesh>
            {[[-0.65, -0.32], [0.65, -0.32], [-0.65, 0.32], [0.65, 0.32]].map(([lx, lz], i) => (
              <mesh key={i} position={[lx, 0.37, lz]}>
                <boxGeometry args={[0.07, 0.74, 0.07]} />
                <meshStandardMaterial color="#4a3524" roughness={0.9} />
              </mesh>
            ))}
            <mesh position={[0, 0.79, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.55, 0.72]} />
              <meshStandardMaterial color="#e7e5e4" roughness={0.9} />
            </mesh>
          </group>
        ))
      )}
      {/* Đồng hồ tường - thứ duy nhất trên tường một phòng thi. */}
      <group position={[0, 3.1, -halfD + 0.15]}>
        <mesh>
          <cylinderGeometry args={[0.7, 0.7, 0.09, 24]} />
          <meshStandardMaterial color="#e7e5e4" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.02, 24]} />
          <meshBasicMaterial color="#1c1917" />
        </mesh>
      </group>
    </>
  );
}

/** Căn hộ: lò sưởi cho ngọn lửa chuỗi ngày, tủ cúp, bàn làm việc. */
function ApartmentInterior({ room }: { room: DistrictRoom }) {
  const shelf = useMemo(() => bookshelfTexture(), []);
  const halfW = room.size.width / 2;
  const halfD = room.size.depth / 2;
  return (
    <>
      {/* Lò sưởi - chỗ của ngọn lửa chuỗi ngày. Ngọn lửa thật vẽ trên HUD; ở
          đây là cái lò và ánh sáng nó hắt ra. */}
      <group position={[0, 0, -halfD + 0.5]}>
        <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 2.2, 0.7]} />
          <meshStandardMaterial color="#4b4239" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.75, 0.38]}>
          <planeGeometry args={[1.9, 1.3]} />
          <meshBasicMaterial color="#ff9d3d" toneMapped={false} />
        </mesh>
        <pointLight position={[0, 1, 1.4]} intensity={12} distance={10} color="#ff9d3d" />
      </group>

      {/* Tủ cúp */}
      <mesh position={[-halfW + 0.5, 1.1, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 2.2, 0.7]} />
        <meshStandardMaterial map={shelf} roughness={0.9} />
      </mesh>
      {[-1.4, 0, 1.4].map((z) => (
        <mesh key={z} position={[-halfW + 0.9, 1.85, z]} castShadow>
          <cylinderGeometry args={[0.14, 0.2, 0.36, 12]} />
          <meshStandardMaterial color="#f5c542" metalness={0.85} roughness={0.25} />
        </mesh>
      ))}

      {/* Bàn làm việc cạnh cửa sổ */}
      <group position={[halfW - 2, 0, 0.5]}>
        <mesh position={[0, 0.76, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.08, 1.1]} />
          <meshStandardMaterial color="#7a5c3c" roughness={0.6} />
        </mesh>
        <mesh position={[0, 1.06, -0.2]} rotation={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[0.8, 0.5, 0.04]} />
          <meshStandardMaterial color="#0f172a" emissive={room.accent} emissiveIntensity={0.4} />
        </mesh>
      </group>
      <mesh position={[halfW - 0.06, 2.2, 0.5]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[3, 2.4]} />
        <meshBasicMaterial color="#8ec5ff" opacity={0.35} transparent />
      </mesh>
    </>
  );
}

/** Bảo tàng: hai dãy bệ trưng bày dọc gian dài. */
function MuseumInterior({ room }: { room: DistrictRoom }) {
  const halfD = room.size.depth / 2;
  const slots = Math.floor((room.size.depth - 8) / 3.6);
  return (
    <>
      {Array.from({ length: slots }, (_, i) => {
        const z = -halfD + 5 + i * 3.6;
        const side = i % 2 === 0 ? -1 : 1;
        return (
          <group key={i} position={[side * 4.6, 0, z]}>
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.1, 1, 1.1]} />
              <meshStandardMaterial color="#3b342c" roughness={0.85} />
            </mesh>
            {/* Hiện vật: khối kính phát sáng, mỗi bệ một màu. */}
            <mesh position={[0, 1.35, 0]}>
              <icosahedronGeometry args={[0.34, 0]} />
              <meshBasicMaterial
                color={["#a5b4fc", "#fca5a5", "#fcd34d", "#86efac"][i % 4]}
                toneMapped={false}
              />
            </mesh>
            <pointLight position={[0, 1.9, 0]} intensity={4} distance={5} color="#e0e7ff" />
          </group>
        );
      })}
    </>
  );
}

/** Khu nhà bạn bè: một dãy cửa nhỏ, mỗi cửa một người. */
function FriendsInterior({ room }: { room: DistrictRoom }) {
  const halfD = room.size.depth / 2;
  return (
    <>
      {[-1, 1].map((side) =>
        [-3.5, -0.5, 2.5].map((z) => (
          <group key={`${side}:${z}`} position={[side * (room.size.width / 2 - 0.4), 0, z]}>
            <mesh position={[0, 1.4, 0]} rotation={[0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
              <planeGeometry args={[1.4, 2.6]} />
              <meshBasicMaterial color="#fbe8a6" opacity={0.4} transparent toneMapped={false} />
            </mesh>
            <mesh position={[side * -0.05, 1.4, 0]} rotation={[0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
              <planeGeometry args={[1.7, 2.9]} />
              <meshStandardMaterial color="#2b241e" roughness={0.9} />
            </mesh>
            <pointLight position={[side * -0.9, 2, 0]} intensity={4} distance={5} color="#fbe8a6" />
          </group>
        ))
      )}
      {/* Bảng tên khu ở đầu hồi */}
      <mesh position={[0, 2.6, -halfD + 0.15]}>
        <planeGeometry args={[5, 1.4]} />
        <meshStandardMaterial color="#2f4a44" roughness={0.85} />
      </mesh>
    </>
  );
}

const INTERIORS: Partial<Record<string, (props: { room: DistrictRoom }) => React.ReactElement>> = {
  "cua-hang": ShopInterior,
  "bang-vang": HallOfFameInterior,
  "phong-thi": ExamInterior,
  "can-ho": ApartmentInterior,
  "bao-tang": MuseumInterior,
  "nha-ban-be": FriendsInterior,
};

export function isCivicRoom(id: string) {
  return CIVIC_ROOMS.some((c) => c.id === id);
}

export default function CivicScene({ room }: { room: DistrictRoom }) {
  const Interior = INTERIORS[room.id as string];
  return <CivicShell room={room}>{Interior ? <Interior room={room} /> : null}</CivicShell>;
}
