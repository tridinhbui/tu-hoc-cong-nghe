"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { nameplateTexture } from "./room-textures";

/** Hình người tối giản: đầu - thân - hai tay hai chân đánh lắc khi bước.
 *  Không tải model GLB nào cả: một hình khối rõ ràng, chạy mượt với vài chục
 *  người trong phòng, quan trọng hơn một model đẹp làm nghẽn GPU. */

export interface AvatarPose {
  x: number;
  z: number;
  ry: number;
}

interface Props {
  name: string;
  color: string;
  /** Đọc pose mỗi frame từ ref thay vì props: vị trí đổi 60 lần/giây, đi qua
   *  setState sẽ re-render cả cây React từng ấy lần. */
  poseRef: React.MutableRefObject<AvatarPose>;
  isSelf?: boolean;
}

export default function LobbyAvatar({ name, color, poseRef, isSelf = false }: Props) {
  const root = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Mesh>(null);
  const rightArm = useRef<THREE.Mesh>(null);
  const leftLeg = useRef<THREE.Mesh>(null);
  const rightLeg = useRef<THREE.Mesh>(null);
  const walkPhase = useRef(0);
  const lastPos = useRef(new THREE.Vector2());

  const nameTex = useMemo(() => nameplateTexture(name), [name]);
  const shirt = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state, delta) => {
    const g = root.current;
    if (!g) return;
    const pose = poseRef.current;

    if (isSelf) {
      // Nhân vật của mình bám pose tức thời - trễ ở đây cảm giác như lag input.
      g.position.set(pose.x, 0, pose.z);
      g.rotation.y = pose.ry;
    } else {
      // Người khác chỉ gửi ~8 gói/giây; nội suy để bước đi liền mạch.
      const k = Math.min(1, delta * 10);
      g.position.x += (pose.x - g.position.x) * k;
      g.position.z += (pose.z - g.position.z) * k;
      let dry = pose.ry - g.rotation.y;
      // quay theo cung ngắn
      if (dry > Math.PI) dry -= Math.PI * 2;
      if (dry < -Math.PI) dry += Math.PI * 2;
      g.rotation.y += dry * k;
    }

    // Đánh tay chân theo tốc độ thật sự di chuyển được, không theo phím bấm -
    // nhờ vậy nhân vật người khác cũng bước đúng nhịp dù ta không biết phím họ.
    const speed = lastPos.current.distanceTo(new THREE.Vector2(g.position.x, g.position.z)) / Math.max(delta, 1e-4);
    lastPos.current.set(g.position.x, g.position.z);
    const target = speed > 0.3 ? 9 : 0;
    walkPhase.current += delta * target;
    const swing = Math.sin(walkPhase.current) * Math.min(0.7, speed * 0.28);
    if (leftArm.current) leftArm.current.rotation.x = swing;
    if (rightArm.current) rightArm.current.rotation.x = -swing;
    if (leftLeg.current) leftLeg.current.rotation.x = -swing;
    if (rightLeg.current) rightLeg.current.rotation.x = swing;

    // Biển tên luôn quay về camera
    const plate = g.getObjectByName("nameplate");
    if (plate) plate.quaternion.copy(state.camera.quaternion);
  });

  return (
    <group ref={root}>
      {/* đầu */}
      <mesh position={[0, 1.62, 0]} castShadow>
        <sphereGeometry args={[0.21, 16, 16]} />
        <meshStandardMaterial color="#e8c39e" roughness={0.8} />
      </mesh>
      {/* thân */}
      <mesh position={[0, 1.08, 0]} castShadow>
        <capsuleGeometry args={[0.24, 0.52, 6, 12]} />
        <meshStandardMaterial color={shirt} roughness={0.75} />
      </mesh>
      {/* tay - neo trục quay ở vai bằng cách dịch geometry xuống */}
      <mesh ref={leftArm} position={[-0.32, 1.32, 0]} castShadow>
        <capsuleGeometry args={[0.075, 0.5, 4, 8]} />
        <meshStandardMaterial color={shirt} roughness={0.75} />
      </mesh>
      <mesh ref={rightArm} position={[0.32, 1.32, 0]} castShadow>
        <capsuleGeometry args={[0.075, 0.5, 4, 8]} />
        <meshStandardMaterial color={shirt} roughness={0.75} />
      </mesh>
      {/* chân */}
      <mesh ref={leftLeg} position={[-0.12, 0.52, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.5, 4, 8]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.85} />
      </mesh>
      <mesh ref={rightLeg} position={[0.12, 0.52, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.5, 4, 8]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.85} />
      </mesh>
      {/* biển tên */}
      <mesh name="nameplate" position={[0, 2.15, 0]}>
        <planeGeometry args={[1.35, 0.34]} />
        <meshBasicMaterial map={nameTex} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}
