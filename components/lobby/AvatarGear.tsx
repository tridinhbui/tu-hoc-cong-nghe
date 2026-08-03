"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { type CharacterEquipments } from "@/lib/rpg-items";

/** Đồ trang bị hiện lên người nhân vật 3D.
 *
 *  Cửa hàng đã bán Vương Miện CFO, Kính Phân Tích BCTC, Kiếm LBO và Linh vật Bò
 *  Tăng Trưởng từ lâu, và cho tới giờ không món nào hiện ra ở bất cứ đâu -
 *  người học trả xu để đổi lấy một dòng chữ trong tủ đồ. Đây là chỗ những món
 *  ấy trở thành thứ nhìn thấy được, và nhìn thấy được TRÊN NGƯỜI NGƯỜI KHÁC,
 *  vì đó mới là lý do người ta mua đồ trang trí.
 *
 *  Toàn khối cơ bản, không model: cùng lý do với mọi thứ khác trong ba thế giới
 *  này - một căn phòng có tám người đeo đủ đồ vẫn phải mở được trên máy yếu.
 *
 *  Toạ độ bám theo hình người trong LobbyAvatar: đầu ở y=1.62 bán kính 0.21,
 *  thân tâm y=1.08, tay ở x=±0.32 y=1.32. Đổi hình người thì phải đổi ở đây. */

const HEAD_Y = 1.62;

function Crown() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    // Xoay rất chậm để bắt ánh sáng - một vương miện đứng im trông như dán.
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  return (
    <group ref={ref} position={[0, HEAD_Y + 0.19, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.17, 0.19, 0.1, 10, 1, true]} />
        <meshStandardMaterial color="#f5c542" metalness={0.9} roughness={0.25} side={THREE.DoubleSide} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.17, 0.09, Math.sin(a) * 0.17]} castShadow>
            <coneGeometry args={[0.045, 0.11, 4]} />
            <meshStandardMaterial color="#ffd75e" metalness={0.9} roughness={0.2} />
          </mesh>
        );
      })}
    </group>
  );
}

function Glasses() {
  return (
    <group position={[0, HEAD_Y + 0.03, 0.185]}>
      {[-0.085, 0.085].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <boxGeometry args={[0.13, 0.085, 0.03]} />
          <meshStandardMaterial color="#12161c" roughness={0.25} metalness={0.5} />
        </mesh>
      ))}
      <mesh>
        <boxGeometry args={[0.06, 0.02, 0.02]} />
        <meshStandardMaterial color="#12161c" roughness={0.3} />
      </mesh>
    </group>
  );
}

/** Huy hiệu VIP: viên đá bay vòng quanh vai, không lơ lửng trên đỉnh đầu.
 *
 *  Phía trên đầu là chỗ đã có biển tên và bong bóng thoại - ba thứ chồng nhau
 *  ở đúng một chỗ thì cái nào cũng đọc không ra. Bay vòng quanh thì nó luôn có
 *  khoảng trống của riêng mình, và chuyển động cũng khiến nó dễ nhận ra hơn. */
function VipGem() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 1.1;
    ref.current.position.set(Math.cos(t) * 0.46, HEAD_Y - 0.12 + Math.sin(t * 2) * 0.06, Math.sin(t) * 0.46);
    ref.current.rotation.y = t * 2;
  });
  return (
    <mesh ref={ref} position={[0.46, HEAD_Y - 0.12, 0]}>
      <octahedronGeometry args={[0.1, 0]} />
      <meshBasicMaterial color="#7dd3fc" toneMapped={false} />
    </mesh>
  );
}

function Weapon({ assetKey }: { assetKey: string }) {
  // Cầm ở tay phải, chúc xuống - cầm giơ lên thì che mất biển tên.
  if (assetKey === "weapon_lbo_sword") {
    return (
      <group position={[0.4, 1.05, 0.05]} rotation={[0.2, 0, -0.35]}>
        <mesh castShadow>
          <boxGeometry args={[0.055, 0.78, 0.02]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.42, 0]}>
          <boxGeometry args={[0.2, 0.05, 0.05]} />
          <meshStandardMaterial color="#7c5c2e" roughness={0.6} metalness={0.4} />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
          <meshStandardMaterial color="#3b2d1c" roughness={0.9} />
        </mesh>
      </group>
    );
  }
  if (assetKey === "weapon_bell") {
    return (
      <group position={[0.4, 1.12, 0.05]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.15, 0.2, 12, 1, true]} />
          <meshStandardMaterial color="#d4a017" metalness={0.9} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.12, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#8a6914" metalness={0.8} roughness={0.4} />
        </mesh>
      </group>
    );
  }
  // Bút định giá
  return (
    <group position={[0.4, 1.16, 0.06]} rotation={[0, 0, -0.5]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.3, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.17, 0]}>
        <coneGeometry args={[0.022, 0.06, 8]} />
        <meshStandardMaterial color="#f5c542" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Armor({ assetKey, shirt }: { assetKey: string; shirt: string }) {
  if (assetKey === "armor_risk_shield") {
    // Khiên đeo sau lưng, không cầm: cầm khiên thì tay không đánh nhịp bước
    // được nữa, mà dáng đi mới là thứ nói nhân vật đang sống.
    return (
      <group position={[0, 1.12, -0.28]} rotation={[0.12, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.05, 6]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, -0.035]}>
          <cylinderGeometry args={[0.16, 0.16, 0.04, 6]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>
    );
  }
  // Áo giáp tích sản: hai miếng vai, giữ màu áo để vẫn nhận ra là ai.
  return (
    <group>
      {[-0.3, 0.3].map((x) => (
        <mesh key={x} position={[x, 1.36, 0]} castShadow>
          <sphereGeometry args={[0.12, 10, 8]} />
          <meshStandardMaterial color={shirt} metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

/** Linh vật đi theo: lượn quanh chân nhân vật, nhấp nhô. */
function Companion({ assetKey }: { assetKey: string }) {
  const ref = useRef<THREE.Group>(null);
  const bull = assetKey === "pet_bull";
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.8;
    ref.current.position.set(Math.cos(t) * 0.75, 0.3 + Math.sin(t * 2.4) * 0.05, Math.sin(t) * 0.75 - 0.2);
    ref.current.rotation.y = -t + Math.PI / 2;
  });
  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={[0.3, 0.22, 0.42]} />
        <meshStandardMaterial color={bull ? "#7f1d1d" : "#78350f"} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.1, 0.24]} castShadow>
        <boxGeometry args={[0.22, 0.2, 0.2]} />
        <meshStandardMaterial color={bull ? "#991b1b" : "#92400e"} roughness={0.85} />
      </mesh>
      {/* sừng bò / tai gấu */}
      {[-0.09, 0.09].map((x) => (
        <mesh key={x} position={[x, 0.22, 0.24]}>
          {bull ? <coneGeometry args={[0.035, 0.13, 6]} /> : <sphereGeometry args={[0.06, 8, 8]} />}
          <meshStandardMaterial color={bull ? "#e7e5e4" : "#78350f"} roughness={0.6} />
        </mesh>
      ))}
      {[-0.1, 0.1].map((x) =>
        [-0.14, 0.14].map((z) => (
          <mesh key={`${x}:${z}`} position={[x, -0.16, z]}>
            <boxGeometry args={[0.06, 0.14, 0.06]} />
            <meshStandardMaterial color="#292524" roughness={0.9} />
          </mesh>
        ))
      )}
    </group>
  );
}

/** Toàn bộ đồ đang mặc. Nhận `shirt` để miếng vai lấy đúng màu áo nhân vật. */
export default function AvatarGear({
  gear,
  shirt,
}: {
  gear: CharacterEquipments | null | undefined;
  shirt: string;
}) {
  if (!gear) return null;
  return (
    <group>
      {gear.accessory === "acc_crown" && <Crown />}
      {gear.accessory === "acc_glasses" && <Glasses />}
      {gear.accessory === "title_vip_diamond" && <VipGem />}
      {gear.weapon && <Weapon assetKey={gear.weapon} />}
      {gear.armor && <Armor assetKey={gear.armor} shirt={shirt} />}
      {gear.companion && <Companion assetKey={gear.companion} />}
    </group>
  );
}
