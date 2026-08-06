"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { CIVIC_ROOM_IDS, type DistrictRoom } from "./district-space";
import { inputsFor } from "@/lib/cash-cycle";
import { BONDS, RHO_CASE_DEFS, STOCKS, mix } from "@/lib/portfolio-risk";
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


/** Phòng Ba Báo Cáo: ba bức tường, ba báo cáo, và những sợi sáng nối chúng.
 *
 *  Căn phòng phải nói được điều mà tấm thẻ nói: một bút toán chạm vào cả ba.
 *  Ba tấm bảng đứng ở ba hướng, và ba sợi sáng nối chúng qua đỉnh đầu người
 *  học - đứng giữa mà quay một vòng là thấy đủ ba, thứ một trang giấy không
 *  làm được. */
function ThreeStatementInterior({ room }: { room: DistrictRoom }) {
  const halfW = room.size.width / 2;
  const halfD = room.size.depth / 2;
  const walls: Array<{ pos: [number, number, number]; ry: number; color: string; label: string }> = [
    { pos: [0, 2.6, -halfD + 0.2], ry: 0, color: "#67e8f9", label: "KQKD" },
    { pos: [-halfW + 0.2, 2.6, 0], ry: Math.PI / 2, color: "#86efac", label: "LCTT" },
    { pos: [halfW - 0.2, 2.6, 0], ry: -Math.PI / 2, color: "#fcd34d", label: "BCĐKT" },
  ];
  return (
    <>
      {walls.map((w) => (
        <group key={w.label} position={w.pos} rotation={[0, w.ry, 0]}>
          <mesh>
            <planeGeometry args={[6.4, 3.6]} />
            <meshStandardMaterial color="#141a1c" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[6.6, 3.8]} />
            <meshBasicMaterial color={w.color} transparent opacity={0.18} toneMapped={false} />
          </mesh>
          {/* Vài vạch giả lập các dòng của báo cáo - đủ để nhận ra "đây là một
              cái bảng số", không cần đọc được. */}
          {[0.9, 0.3, -0.3, -0.9].map((y) => (
            <mesh key={y} position={[-1.2, y, 0.03]}>
              <planeGeometry args={[3.4, 0.14]} />
              <meshBasicMaterial color={w.color} transparent opacity={0.45} toneMapped={false} />
            </mesh>
          ))}
          <pointLight position={[0, 0, 1.6]} intensity={7} distance={9} color={w.color} />
        </group>
      ))}

      {/* Ba sợi sáng nối ba tường qua đỉnh đầu: mối nối, ở dạng nhìn thấy được. */}
      {walls.map((w, i) => {
        const next = walls[(i + 1) % walls.length];
        const mid: [number, number, number] = [
          (w.pos[0] + next.pos[0]) / 2,
          4.2,
          (w.pos[2] + next.pos[2]) / 2,
        ];
        const len = Math.hypot(next.pos[0] - w.pos[0], next.pos[2] - w.pos[2]);
        const angle = Math.atan2(next.pos[2] - w.pos[2], next.pos[0] - w.pos[0]);
        return (
          <mesh key={`link-${i}`} position={mid} rotation={[0, -angle, 0]}>
            <boxGeometry args={[len, 0.05, 0.05]} />
            <meshBasicMaterial color={w.color} transparent opacity={0.5} toneMapped={false} />
          </mesh>
        );
      })}
    </>
  );
}

/** Tháp Lãi Kép: các bậc dựng theo đúng đường lãi kép.
 *
 *  Bậc sinh từ công thức chứ không kê tay - nếu kê tay thì hình sẽ đẹp hơn và
 *  sai, mà cả căn phòng tồn tại để nói rằng đường cong này có hình dạng ấy. */
function CompoundTowerInterior({ room }: { room: DistrictRoom }) {
  const halfD = room.size.depth / 2;
  const years = 24;
  const rate = 0.1;
  const values = Array.from({ length: years }, (_, y) => Math.pow(1 + rate, y));
  const max = values[values.length - 1];
  const runway = room.size.depth - 5;
  return (
    <>
      {values.map((v, y) => {
        // Năm 0 ở SÁT CỬA, năm cuối ở đầu xa: đi vào là đi dọc theo đường cong
        // và ngẩng dần lên. Bản đầu xếp ngược, nên bậc cao nhất chắn ngay cửa
        // và cả căn phòng chỉ là một bức tường cam.
        const z = halfD - 2.5 - (y / years) * runway;
        const h = 0.15 + (v / max) * 4.4;
        return (
          <mesh key={y} position={[0, h / 2, z]} castShadow receiveShadow>
            {/* Hẹp và chừa lối đi hai bên: rộng gần hết phòng thì nó thành bức
                tường mà người học đi xuyên qua, vì bậc không phải vật cản. */}
            <boxGeometry args={[4.5, h, runway / years - 0.06]} />
            <meshStandardMaterial
              color={y > years * 0.72 ? "#fb923c" : "#4a3f33"}
              emissive={y > years * 0.72 ? "#fb923c" : "#000000"}
              emissiveIntensity={0.3}
              roughness={0.8}
            />
          </mesh>
        );
      })}
      {/* Một vệt sáng chạy dọc đỉnh các bậc - đường cong lãi kép, nhìn từ bên. */}
      <mesh position={[2.6, 2.4, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.06, 0.06, runway]} />
        <meshBasicMaterial color="#fb923c" transparent opacity={0.35} toneMapped={false} />
      </mesh>
    </>
  );
}

/** Phòng Tầng Vốn: ba tấm xếp chồng, vốn chủ trên đỉnh. */
function CapitalStackInterior({ room }: { room: DistrictRoom }) {
  const halfD = room.size.depth / 2;
  const tranches = [
    { y: 0.5, h: 1, color: "#60a5fa", w: 6 },
    { y: 1.7, h: 0.8, color: "#c084fc", w: 5 },
    { y: 2.7, h: 1.2, color: "#4ade80", w: 4 },
  ];
  return (
    <>
      {tranches.map((t) => (
        <group key={t.color} position={[0, t.y, -halfD + 4.5]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[t.w, t.h, t.w]} />
            <meshStandardMaterial color={t.color} roughness={0.55} metalness={0.2} />
          </mesh>
          <mesh position={[0, t.h / 2 + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[t.w + 0.1, t.w + 0.1]} />
            <meshBasicMaterial color={t.color} transparent opacity={0.25} toneMapped={false} />
          </mesh>
          <pointLight position={[0, 0, t.w / 2 + 1]} intensity={5} distance={8} color={t.color} />
        </group>
      ))}
    </>
  );
}

/** Phòng Vòng Quay Tiền: ba cung của một vòng tròn đi được.
 *
 *  Vòng quay tiền là DSO + DIO − DPO, và cái mà một biểu đồ trên giấy không
 *  nói được là DPO mang DẤU TRỪ. Ở đây hai cung đầu (tiền kẹt ở kho, tiền kẹt
 *  ở khách) chạy thuận chiều kim đồng hồ, còn cung phải trả chạy NGƯỢC lại và
 *  đổi màu - đứng giữa phòng nhìn xuống là thấy ngay nó kéo vòng ngắn lại.
 *
 *  Không dựng con số ở đây. Số nằm ở lib/cash-cycle.ts, chỗ duy nhất có thể
 *  sai về tài chính và là chỗ duy nhất có test. */
function CashCycleInterior({ room }: { room: DistrictRoom }) {
  const R = Math.min(room.size.width, room.size.depth) / 2 - 3.2;

  // Ba cung SUY RA từ bộ số của chuỗi siêu thị trong lib/cash-cycle.ts, không
  // gõ tay bằng phân số. Bản đầu gõ 0,32 / 0,36 / 1,06 và cung cuối lệch khỏi
  // số thật (0,36 + 55/75 = 1,093) - đúng loại lỗi "con số trong câu văn không
  // ai kiểm" mà cả nhánh này đang đi dọn. Suy ra thì hình không thể lệch khỏi
  // tài chính, và sửa DSO/DIO/DPO ở lib là căn phòng tự vẽ lại.
  const { dso, dio, dpo } = inputsFor("ban-le")!;
  // Cả vòng tròn = tổng ba vế, nên ba cung đi hết đúng một vòng và không đè
  // lên nhau. Thông điệp nằm ở độ dài so nhau: cung "được nợ" dài hơn cả hai
  // cung kia cộng lại, và đó chính là nghĩa hình học của vòng quay ÂM.
  const total = dso + dio + dpo;
  let cursor = 0;
  const arcs = [
    { days: dio, color: "#f59e0b", y: 0.12 }, // hàng nằm kho
    { days: dso, color: "#38bdf8", y: 0.12 }, // chờ khách trả
    { days: dpo, color: "#a3e635", y: 0.34 }, // được nhà cung cấp cho nợ
  ].map((a) => {
    const from = cursor;
    cursor += a.days / total;
    return { ...a, from, to: cursor };
  });
  const segments = 22;
  return (
    <>
      {arcs.map((arc) =>
        Array.from({ length: segments }, (_, i) => {
          const t = arc.from + ((arc.to - arc.from) * i) / segments;
          const a = t * Math.PI * 2;
          return (
            <mesh
              key={`${arc.color}:${i}`}
              position={[Math.sin(a) * R, arc.y, -1 + Math.cos(a) * R]}
              rotation={[0, -a, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[0.55, arc.y === 0.34 ? 0.5 : 0.2, 1.1]} />
              <meshStandardMaterial
                color={arc.color}
                emissive={arc.color}
                emissiveIntensity={arc.y === 0.34 ? 0.45 : 0.22}
                roughness={0.7}
              />
            </mesh>
          );
        })
      )}
      {/* Cột giữa: chỗ đứng để nhìn cả vòng cùng lúc. Vòng vẽ trên sàn mà
          không có tâm thì đứng trong đó chỉ thấy hai vạch sáng hai bên. */}
      <mesh position={[0, 1.1, -1]} castShadow>
        <cylinderGeometry args={[0.5, 0.65, 2.2, 12]} />
        <meshStandardMaterial color="#3f4a2a" roughness={0.85} />
      </mesh>
      <mesh position={[0, 2.35, -1]}>
        <torusGeometry args={[0.85, 0.07, 8, 24]} />
        <meshBasicMaterial color="#a3e635" toneMapped={false} />
      </mesh>
    </>
  );
}

/** Phòng Rủi Ro & Phân Bổ: bốn cặp cột, một vạch treo lơ lửng.
 *
 *  Ở mỗi mức tương quan có một cột đặc (rủi ro THẬT của danh mục 50/50) và
 *  ngay trên đầu nó một vạch mảnh (trung bình có trọng số - con số người học
 *  TƯỞNG là đáp án). Khoảng hụt giữa hai thứ đó chính là bài học, và nó là thứ
 *  một bảng số không nói được: đi dọc căn phòng thì thấy khoảng hụt teo dần,
 *  và tới cột cuối cùng - tương quan bằng 1 - nó biến mất hẳn.
 *
 *  Chiều cao suy ra từ lib/portfolio-risk.ts, không gõ tay. Bản đầu của phòng
 *  vòng quay tiền gõ tay ba phân số và lệch khỏi số thật ngay lần đầu. */
function PortfolioRiskInterior({ room }: { room: DistrictRoom }) {
  const halfD = room.size.depth / 2;
  const runway = room.size.depth - 6;
  // Thang chung cho cả bốn cặp: mỗi cặp một thang thì bốn cột cao bằng nhau và
  // cả căn phòng không nói gì. Neo vào naiveVol vì nó không đổi theo ρ.
  const naive = mix(STOCKS, BONDS, { w: 0.5, rho: 0 }).naiveVol;
  const H = 4.2 / naive;

  return (
    <>
      {RHO_CASE_DEFS.map((c, i) => {
        const r = mix(STOCKS, BONDS, { w: 0.5, rho: c.rho });
        const z = halfD - 3.5 - (i / (RHO_CASE_DEFS.length - 1)) * runway;
        const h = r.vol * H;
        const naiveH = r.naiveVol * H;
        const free = r.diversificationGain > 1e-9;
        return (
          <group key={c.id} position={[0, 0, z]}>
            {/* Cột rủi ro thật. Hẹp và lệch sang một bên để chừa lối đi - cột
                choán hết phòng thì người học đi xuyên qua nó, vì nó không phải
                vật cản. */}
            <mesh position={[-2.6, h / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.5, h, 1.5]} />
              <meshStandardMaterial
                color={free ? "#38bdf8" : "#78716c"}
                emissive={free ? "#38bdf8" : "#000000"}
                emissiveIntensity={0.28}
                roughness={0.75}
              />
            </mesh>
            {/* Vạch trung bình có trọng số, treo đúng trên đầu cột. */}
            <mesh position={[-2.6, naiveH, 0]}>
              <boxGeometry args={[2.1, 0.09, 2.1]} />
              <meshBasicMaterial color="#fbbf24" toneMapped={false} />
            </mesh>
            {/* Khoảng hụt: một khối trong suốt lấp đúng phần "được cho không".
                Ở ρ = 1 nó cao bằng 0 và biến mất - đúng như phải thế. */}
            {free && (
              <mesh position={[-2.6, (h + naiveH) / 2, 0]}>
                <boxGeometry args={[1.62, naiveH - h, 1.62]} />
                {/* opacity 0,24 gần như chìm hẳn vào phòng tối, mà đây đúng là
                    thứ căn phòng muốn chỉ ra. */}
                <meshBasicMaterial color="#4ade80" transparent opacity={0.45} toneMapped={false} />
              </mesh>
            )}
            {/* Cột lợi nhuận, đối diện lối đi: cao BẰNG NHAU ở cả bốn mức. Đó
                là nửa còn lại của bài học - lợi nhuận không đổi khi tương quan
                đổi, chỉ rủi ro đổi. */}
            <mesh position={[2.6, (r.ret * H) / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.1, r.ret * H, 1.1]} />
              <meshStandardMaterial color="#c084fc" roughness={0.8} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

/** Bàn Tròn Giảng Lại: một cái bàn tròn và một ghế trống đối diện.
 *
 *  Ghế trống là cả căn phòng. Giảng lại chỉ có tác dụng khi có người nghe
 *  tưởng tượng, và mỗi đề trong lib/teach-back.ts chỉ định một người nghe khác
 *  nhau - bạn mở quán ăn, em họ 18 tuổi, đồng nghiệp định dồn hết vào một mã.
 *  Đổi người nghe là đổi cả bài giảng, nên căn phòng phải nói được rằng có ai
 *  đó đang ngồi đối diện.
 *
 *  Bảng trắng sau lưng để trống cũng có chủ ý: đây là chỗ nói ra, không phải
 *  chỗ đọc lại. */
function TeachBackInterior({ room }: { room: DistrictRoom }) {
  const halfD = room.size.depth / 2;
  return (
    <>
      {/* Bàn tròn ở z = −4,5, KHÔNG phải ở giữa phòng.
          Bản đầu đặt nó ngay giữa, tức đúng lên bục đứng ở (0, −1), và cái bàn
          1,9 m che mất vòng sáng dưới chân bục - thứ duy nhất trong mọi phòng
          dân sự nói "đứng vào đây". Chỉ thấy được khi vào phòng nhìn, không
          bài test hình học nào bắt: bục là vật cản, còn bàn thì không, nên
          chúng chồng nhau mà không phòng nào "sai". */}
      <group position={[0, 0, -4.5]}>
        <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.7, 1.7, 0.1, 28]} />
          <meshStandardMaterial color="#7a5230" roughness={0.65} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.28, 0.45, 0.7, 12]} />
          <meshStandardMaterial color="#4a3524" roughness={0.9} />
        </mesh>
      </group>

      {/* Một cái ghế duy nhất, và nó TRỐNG. Người học đã đứng ở bục rồi nên
          không cần ghế cho họ; bản đầu có thêm một ghế "của người học" cùng màu
          sàn, vừa vô hình vừa nói sai chuyện. Ghế trống là cả căn phòng. */}
      <group position={[0, 0, -6.4]}>
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.1, 0.9]} />
          <meshStandardMaterial
            color={room.accent}
            emissive={room.accent}
            emissiveIntensity={0.4}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0, 0.95, -0.42]} castShadow>
          <boxGeometry args={[0.9, 0.9, 0.1]} />
          <meshStandardMaterial
            color={room.accent}
            emissive={room.accent}
            emissiveIntensity={0.3}
            roughness={0.8}
          />
        </mesh>
        {[[-0.36, -0.36], [0.36, -0.36], [-0.36, 0.36], [0.36, 0.36]].map(([lx, lz], i) => (
          <mesh key={i} position={[lx, 0.22, lz]}>
            <boxGeometry args={[0.08, 0.44, 0.08]} />
            <meshStandardMaterial color="#3d2c1d" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Bảng trắng để trống sau lưng ghế trống. */}
      <mesh position={[0, 2.1, -halfD + 0.25]}>
        <planeGeometry args={[5, 2.6]} />
        <meshStandardMaterial color="#e7e5e4" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.1, -halfD + 0.2]}>
        <planeGeometry args={[5.3, 2.9]} />
        <meshStandardMaterial color="#57534e" roughness={0.8} />
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
  "ba-bao-cao": ThreeStatementInterior,
  "thap-lai-kep": CompoundTowerInterior,
  "phong-lbo": CapitalStackInterior,
  "vong-quay-tien": CashCycleInterior,
  "phan-bo-rui-ro": PortfolioRiskInterior,
  "ban-tron": TeachBackInterior,
};

export function isCivicRoom(id: string) {
  return (CIVIC_ROOM_IDS as string[]).includes(id);
}

export default function CivicScene({ room }: { room: DistrictRoom }) {
  const Interior = INTERIORS[room.id as string];
  return <CivicShell room={room}>{Interior ? <Interior room={room} /> : null}</CivicShell>;
}
