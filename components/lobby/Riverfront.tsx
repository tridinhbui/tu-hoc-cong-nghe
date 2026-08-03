"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FAR_WALK_Z, PLAZA_Y, RIVER_Y, RIVER_Z0, RIVER_Z1, STREET_HALF_X } from "./world";
import type { DaySample } from "./daylight";

/** Sông Sài Gòn ở cuối tầm nhìn, kèm một cây cầu và mấy chiếc sà lan.
 *
 *  Cả thế giới thư viện cho tới giờ đều là hộp: phòng đọc là hộp, quảng trường
 *  là hộp rộng hơn, vành đai 360 độ quanh toà nhà kết thúc bằng tường rào, và
 *  mái nhà - chỗ duy nhất dựng ra để đứng nhìn - cũng chỉ nhìn thấy thêm một
 *  dãy nhà nữa. Con sông là thứ rẻ nhất phá được cái hộp đó.
 *
 *  KHÔNG đi tới được, và đó là chủ ý. Mọi thứ khác trong thành phố này đều bắt
 *  người ta làm gì đó; một đường chân trời không với tới được là thứ duy nhất
 *  không đòi hỏi gì cả. Cùng lý do với cái kính viễn vọng trên mái không bấm
 *  được.
 *
 *  Rẻ theo đúng nghĩa đo được: cả file này dựng dưới hai chục mesh, không có
 *  cái nào đổ bóng, và mặt nước động bằng cách dịch toạ độ vân chứ không phải
 *  bằng lưới sóng. Số đo đêm nay nói tam giác không phải nút thắt của thế giới
 *  này mà draw call mới là - nên thứ ở xa tít phải tốn ít LỆNH VẼ, còn nó có
 *  bao nhiêu cạnh thì không quan trọng. */

/** Mặt nước. Động bằng cách xê dịch vân, không phải bằng lưới sóng: sóng thật
 *  cần một mặt phẳng chia nhỏ và một lần cập nhật đỉnh mỗi khung hình, để đổi
 *  lấy chuyển động mà ở khoảng cách này không ai phân biệt được. */
function Water({ glow }: { glow: number }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    if (mat.current) {
      // Dải sáng chạy chậm trên mặt nước - đủ để nó không phải một tấm bìa.
      mat.current.emissiveIntensity = 0.05 + Math.sin(state.clock.elapsedTime * 0.35) * 0.02;
    }
  });
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, RIVER_Y, (RIVER_Z0 + RIVER_Z1) / 2]}
    >
      <planeGeometry args={[STREET_HALF_X * 9, RIVER_Z1 - RIVER_Z0]} />
      <meshStandardMaterial
        ref={mat}
        // Nước ban ngày lấy màu trời, ban đêm gần như đen và chỉ còn ánh đèn
        // bờ bên kia hắt xuống.
        color={glow > 0.45 ? "#3d6b84" : "#101d28"}
        emissive="#7fb4d4"
        emissiveIntensity={0.05}
        roughness={0.18}
        metalness={0.65}
      />
    </mesh>
  );
}

/** Sà lan chở cát - thứ trôi trên sông Sài Gòn suốt ngày. */
function Barge({ x, z, dir }: { x: number; z: number; dir: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    // Kẹp delta: rAF dừng khi tab bị ẩn, nên khung hình đầu tiên lúc quay lại
    // mang một delta khổng lồ và chiếc sà lan nhảy vọt qua nửa con sông.
    ref.current.position.x += dir * Math.min(delta, 1 / 20) * 1.6;
    const span = STREET_HALF_X * 4;
    if (ref.current.position.x > span) ref.current.position.x = -span;
    if (ref.current.position.x < -span) ref.current.position.x = span;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6 + z) * 0.12;
  });
  return (
    <group ref={ref} position={[x, 0, z]}>
      <mesh position={[0, RIVER_Y + 0.5, 0]}>
        <boxGeometry args={[14, 1.6, 4.4]} />
        <meshStandardMaterial color="#4a4a44" roughness={0.9} />
      </mesh>
      {/* Đống cát trên khoang - dáng nhận ra ngay là sà lan chứ không phải tàu */}
      <mesh position={[-1.5, RIVER_Y + 1.7, 0]}>
        <boxGeometry args={[8, 1.2, 3.4]} />
        <meshStandardMaterial color="#a89578" roughness={1} />
      </mesh>
      {/* Ca-bin ở đuôi */}
      <mesh position={[5.4, RIVER_Y + 2, 0]}>
        <boxGeometry args={[2.6, 2.4, 3.2]} />
        <meshStandardMaterial color="#6d7b6a" roughness={0.85} />
      </mesh>
    </group>
  );
}

export default function Riverfront({ day }: { day: DaySample }) {
  const dark = day.windowGlow < 0.45;
  const bankZ = RIVER_Z0 - 4;

  return (
    <group>
      {/* Kè bờ bên này: dải đất giữa dãy nhà và mép nước, để mặt nước không
          mọc thẳng ra từ chân dãy nhà. */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, PLAZA_Y - 0.05, (FAR_WALK_Z + 30 + bankZ) / 2]}
      >
        <planeGeometry args={[STREET_HALF_X * 9, bankZ - (FAR_WALK_Z + 30)]} />
        <meshStandardMaterial color="#4e4a41" roughness={1} />
      </mesh>
      {/* Vách kè, che đúng khoảng hụt giữa cao độ phố và mặt nước. */}
      <mesh position={[0, (PLAZA_Y + RIVER_Y) / 2, bankZ]}>
        <boxGeometry args={[STREET_HALF_X * 9, PLAZA_Y - RIVER_Y, 1.2]} />
        <meshStandardMaterial color="#5b564c" roughness={0.95} />
      </mesh>

      <Water glow={day.windowGlow} />

      <Barge x={-40} z={RIVER_Z0 + 26} dir={1} />
      <Barge x={62} z={RIVER_Z0 + 62} dir={-1} />

      {/* Đã từng có một cây cầu ở rìa tầm nhìn. Bỏ đi sau khi nhìn thật: ở
          khoảng cách này mắt chỉ nhận được BÓNG DÁNG, và bóng dáng của một mặt
          cầu dài 130 m nhìn từ xa là một tấm xám trôi lơ lửng - trụ cầu quá
          nhỏ để thấy, nên không có gì nối nó xuống nước. Chính bài học mà dãy
          nhà bên kia đường đã học rồi: ở xa thì hình khối đơn giản mới đọc
          được, thêm chi tiết chỉ thành nhiễu. */}

      {/* Bờ bên kia: một dải nhà thấp mờ. Đêm thì chỉ còn một vệt đèn - đó là
          toàn bộ thứ cần có ở khoảng cách này. */}
      <mesh position={[0, PLAZA_Y + 6, RIVER_Z1 + 6]}>
        <boxGeometry args={[STREET_HALF_X * 9, 14, 10]} />
        <meshStandardMaterial
          color={dark ? "#1b232b" : "#5f6a6f"}
          emissive={dark ? "#ffcf87" : "#000000"}
          // 0,12 chìm hẳn vào nền trời đêm, mà vệt đèn bờ bên kia đúng là thứ
          // duy nhất đáng thấy lúc tối - ban ngày thì dải nhà tự nói được, ban
          // đêm nó chỉ còn là một đường sáng.
          emissiveIntensity={dark ? 0.55 : 0}
          roughness={0.95}
        />
      </mesh>
    </group>
  );
}
