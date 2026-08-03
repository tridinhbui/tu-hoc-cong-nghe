"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import ReadingRoom, { ROOM } from "./ReadingRoom";
import LobbyAvatar, { type AvatarPose } from "./LobbyAvatar";
import {
  MOVE_BROADCAST_MS,
  colorForUser,
  joinLobby,
  sendPose,
  type LobbyIdentity,
  type LobbyPeer,
} from "@/lib/supabase-lobby";
import { disposeRoomTextures } from "./room-textures";

const WALK_SPEED = 4.2;
const TURN_SPEED = 2.6;

/** Trạng thái phím giữ ngoài React - đọc mỗi frame, không re-render. */
function useHeldKeys(externalKeys: React.MutableRefObject<Record<string, boolean>>) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Không nuốt phím khi người dùng đang gõ vào ô nhập nào đó của trang.
      const target = e.target as HTMLElement | null;
      if (target && /INPUT|TEXTAREA|SELECT/.test(target.tagName)) return;
      const key = normalize(e.key);
      if (!key) return;
      externalKeys.current[key] = true;
      // Chặn trang cuộn theo phím mũi tên khi đang đi trong sảnh.
      if (["up", "down", "left", "right"].includes(key)) e.preventDefault();
    };
    const up = (e: KeyboardEvent) => {
      const key = normalize(e.key);
      if (key) externalKeys.current[key] = false;
    };
    // Rời tab thì nhả hết phím - nếu không nhân vật tự đi mãi.
    const blur = () => {
      externalKeys.current = {};
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, [externalKeys]);
}

function normalize(key: string): string | null {
  switch (key) {
    case "w": case "W": case "ArrowUp": return "up";
    case "s": case "S": case "ArrowDown": return "down";
    case "a": case "A": case "ArrowLeft": return "left";
    case "d": case "D": case "ArrowRight": return "right";
    default: return null;
  }
}

/** Mọi logic mỗi-frame của người chơi: đọc phím, di chuyển, kẹp trong tường,
 *  đẩy camera đuổi theo, và phát vị trí lên kênh chung theo nhịp. */
function PlayerRig({
  userId,
  poseRef,
  keysRef,
}: {
  userId: string;
  poseRef: React.MutableRefObject<AvatarPose>;
  keysRef: React.MutableRefObject<Record<string, boolean>>;
}) {
  const { camera } = useThree();
  const lastSent = useRef(0);
  const lastSentPose = useRef<AvatarPose>({ x: 0, z: 0, ry: 0 });

  useFrame((state, delta) => {
    const keys = keysRef.current;
    const pose = poseRef.current;

    // Trái/phải xoay người, lên/xuống tiến lùi - kiểu điều khiển xe tăng, dễ
    // hiểu với phím mũi tên hơn là strafe.
    if (keys.left) pose.ry += TURN_SPEED * delta;
    if (keys.right) pose.ry -= TURN_SPEED * delta;
    const forward = (keys.up ? 1 : 0) - (keys.down ? 0.6 : 0);
    if (forward !== 0) {
      pose.x -= Math.sin(pose.ry) * WALK_SPEED * forward * delta;
      pose.z -= Math.cos(pose.ry) * WALK_SPEED * forward * delta;
      pose.x = THREE.MathUtils.clamp(pose.x, -ROOM.bounds.x, ROOM.bounds.x);
      pose.z = THREE.MathUtils.clamp(pose.z, -ROOM.bounds.z, ROOM.bounds.z);
    }

    // Camera vai thứ ba: treo sau lưng, nhìn hơi chúc xuống.
    const camTarget = new THREE.Vector3(
      pose.x + Math.sin(pose.ry) * 5.2,
      3.4,
      pose.z + Math.cos(pose.ry) * 5.2
    );
    camera.position.lerp(camTarget, Math.min(1, delta * 5));
    camera.lookAt(pose.x, 1.5, pose.z);

    // Phát vị trí: theo nhịp, và chỉ khi thực sự nhúc nhích - người đứng yên
    // không chiếm ngân sách sự kiện của cả phòng.
    const now = state.clock.elapsedTime * 1000;
    const moved =
      Math.abs(pose.x - lastSentPose.current.x) > 0.01 ||
      Math.abs(pose.z - lastSentPose.current.z) > 0.01 ||
      Math.abs(pose.ry - lastSentPose.current.ry) > 0.02;
    if (moved && now - lastSent.current >= MOVE_BROADCAST_MS) {
      lastSent.current = now;
      lastSentPose.current = { ...pose };
      sendPose(userId, { x: pose.x, z: pose.z, ry: pose.ry });
    }
  });

  return null;
}

interface Props {
  identity: LobbyIdentity;
}

export default function LobbySceneInner({ identity }: Props) {
  const [peers, setPeers] = useState<LobbyPeer[]>([]);
  const keysRef = useRef<Record<string, boolean>>({});
  // Xuất phát ở cửa phía nam, quay mặt vào phòng.
  const selfPose = useRef<AvatarPose>({ x: 0, z: ROOM.bounds.z - 1, ry: Math.PI });
  const peerPoseRefs = useRef(new Map<string, React.MutableRefObject<AvatarPose>>());

  useHeldKeys(keysRef);

  useEffect(() => {
    const leave = joinLobby(identity, setPeers);
    return () => {
      leave();
      disposeRoomTextures();
    };
    // identity dựng lại mỗi render ở component cha là chuyện thường; chỉ join
    // lại khi danh tính thực sự đổi.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity.userId, identity.name, identity.avatarUrl]);

  // Pose của người khác đi vào ref để LobbyAvatar nội suy mỗi frame.
  const others = useMemo(() => {
    const list = peers.filter((p) => p.userId !== identity.userId);
    for (const p of list) {
      let ref = peerPoseRefs.current.get(p.userId);
      if (!ref) {
        ref = { current: { x: p.x, z: p.z, ry: p.ry } };
        peerPoseRefs.current.set(p.userId, ref);
      } else {
        ref.current = { x: p.x, z: p.z, ry: p.ry };
      }
    }
    // dọn ref của người đã rời phòng
    const ids = new Set(list.map((p) => p.userId));
    for (const id of [...peerPoseRefs.current.keys()]) {
      if (!ids.has(id)) peerPoseRefs.current.delete(id);
    }
    return list;
  }, [peers, identity.userId]);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 3.4, ROOM.bounds.z + 4], fov: 55 }}
      // Trần giới hạn DPR: màn Retina 3x không cần render 3x cho một sảnh xã
      // giao, và đây là khác biệt lớn nhất giữa mát máy và cháy quạt.
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      {/* Nền sáng ấm kiểu đèn sợi đốt trong phòng gỗ */}
      <color attach="background" args={["#171310"]} />
      <fog attach="fog" args={["#171310", 30, 75]} />
      <ambientLight intensity={0.55} color="#ffe8c4" />
      <directionalLight
        position={[8, 12, 4]}
        intensity={1.1}
        color="#fff3dd"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <ReadingRoom />

      <LobbyAvatar
        name={identity.name}
        color={identity.color}
        poseRef={selfPose}
        isSelf
      />
      {others.map((p) => {
        const ref = peerPoseRefs.current.get(p.userId);
        if (!ref) return null;
        return <LobbyAvatar key={p.userId} name={p.name} color={p.color} poseRef={ref} />;
      })}

      <PlayerRig userId={identity.userId} poseRef={selfPose} keysRef={keysRef} />
    </Canvas>
  );
}

export { colorForUser };
