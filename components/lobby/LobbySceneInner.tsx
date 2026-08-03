"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import ReadingRoom, { ROOM, TABLE_ZS, TABLE_HALF_W, TABLE_HALF_D } from "./ReadingRoom";
import RoomFixtures from "./RoomFixtures";
import LobbyAvatar, { type AvatarPose } from "./LobbyAvatar";
import {
  CHAT_BUBBLE_MS,
  MOVE_BROADCAST_MS,
  colorForUser,
  joinLobby,
  sendPose,
  type LobbyChatMessage,
  type LobbyIdentity,
  type LobbyPeer,
} from "@/lib/supabase-lobby";
import { disposeRoomTextures } from "./room-textures";

const WALK_SPEED = 4.2;
const TURN_SPEED = 2.6;
/** Bán kính thân người, dùng khi đẩy ra khỏi bàn. */
const BODY_RADIUS = 0.34;

/** Trạng thái phím giữ ngoài React - đọc mỗi frame, không re-render. */
function useHeldKeys(externalKeys: React.MutableRefObject<Record<string, boolean>>) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Không nuốt phím khi người dùng đang gõ vào ô nhập nào đó của trang -
      // gõ chat mà nhân vật chạy theo từng chữ thì không dùng được.
      const target = e.target as HTMLElement | null;
      if (target && /INPUT|TEXTAREA|SELECT/.test(target.tagName)) return;
      const key = normalize(e.key);
      if (!key) return;
      externalKeys.current[key] = true;
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

/** Đẩy nhân vật ra khỏi khối bàn gần nhất nếu vừa bước vào trong.
 *  Giải theo trục có mức chồng lấn NHỎ hơn: đó là hướng vừa đi vào, nên đẩy
 *  ngược lại cho cảm giác trượt dọc mép bàn thay vì bị bắn ngang qua nó. */
function resolveTableCollision(x: number, z: number): { x: number; z: number } {
  for (const tz of TABLE_ZS) {
    const dx = x - 0;
    const dz = z - tz;
    const overlapX = TABLE_HALF_W + BODY_RADIUS - Math.abs(dx);
    const overlapZ = TABLE_HALF_D + BODY_RADIUS - Math.abs(dz);
    if (overlapX > 0 && overlapZ > 0) {
      if (overlapZ < overlapX) {
        return { x, z: tz + Math.sign(dz || 1) * (TABLE_HALF_D + BODY_RADIUS) };
      }
      return { x: Math.sign(dx || 1) * (TABLE_HALF_W + BODY_RADIUS), z };
    }
  }
  return { x, z };
}

/** Mọi logic mỗi-frame của người chơi: đọc phím, di chuyển, chặn tường và bàn,
 *  đẩy camera đuổi theo, và phát vị trí lên kênh chung theo nhịp. */
function PlayerRig({
  userId,
  poseRef,
  keysRef,
  peerCountRef,
}: {
  userId: string;
  poseRef: React.MutableRefObject<AvatarPose>;
  keysRef: React.MutableRefObject<Record<string, boolean>>;
  peerCountRef: React.MutableRefObject<number>;
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
      const nx = pose.x - Math.sin(pose.ry) * WALK_SPEED * forward * delta;
      const nz = pose.z - Math.cos(pose.ry) * WALK_SPEED * forward * delta;
      const solved = resolveTableCollision(
        THREE.MathUtils.clamp(nx, -ROOM.bounds.x, ROOM.bounds.x),
        THREE.MathUtils.clamp(nz, -ROOM.bounds.z, ROOM.bounds.z)
      );
      pose.x = solved.x;
      pose.z = solved.z;
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
    //
    // Nhịp giãn ra khi phòng đông: mỗi gói mình gửi là N gói cả phòng phải
    // nhận, nên chi phí tăng theo bình phương số người. Trên 12 người thì
    // dáng đi mượt thêm vài khung hình không đáng để đánh đổi lấy việc kênh
    // bắt đầu rớt gói của tất cả mọi người.
    const crowded = peerCountRef.current > 12;
    const interval = crowded ? MOVE_BROADCAST_MS * 2 : MOVE_BROADCAST_MS;
    const now = state.clock.elapsedTime * 1000;
    const moved =
      Math.abs(pose.x - lastSentPose.current.x) > 0.01 ||
      Math.abs(pose.z - lastSentPose.current.z) > 0.01 ||
      Math.abs(pose.ry - lastSentPose.current.ry) > 0.02;
    if (moved && now - lastSent.current >= interval) {
      lastSent.current = now;
      lastSentPose.current = { ...pose };
      sendPose(userId, { x: pose.x, z: pose.z, ry: pose.ry });
    }
  });

  return null;
}

/** Đưa vị trí người chơi ra ngoài Canvas mỗi frame, để RoomFixtures đo khoảng
 *  cách tới cổng mà không cần chính nó nằm trong cây R3F của PlayerRig. */
function PlayerPositionTap({
  poseRef,
  out,
}: {
  poseRef: React.MutableRefObject<AvatarPose>;
  out: React.MutableRefObject<{ x: number; z: number }>;
}) {
  useFrame(() => {
    out.current.x = poseRef.current.x;
    out.current.z = poseRef.current.z;
  });
  return null;
}

interface Props {
  identity: LobbyIdentity;
  onChatMessage: (message: LobbyChatMessage) => void;
  onPortalProximity: (near: boolean) => void;
  /** Câu nói của chính mình, do HUD đẩy xuống khi bấm gửi. */
  selfSpeech: { text: string; at: number } | null;
  onPeerCount: (count: number) => void;
}

export default function LobbySceneInner({
  identity,
  onChatMessage,
  onPortalProximity,
  selfSpeech,
  onPeerCount,
}: Props) {
  const [peers, setPeers] = useState<LobbyPeer[]>([]);
  const [speeches, setSpeeches] = useState<Record<string, { text: string; at: number }>>({});
  const keysRef = useRef<Record<string, boolean>>({});
  // Xuất phát ở cửa phía nam, quay mặt vào phòng.
  const selfPose = useRef<AvatarPose>({ x: 0, z: ROOM.bounds.z - 1, ry: Math.PI });
  const playerPos = useRef({ x: 0, z: ROOM.bounds.z - 1 });
  const peerPoseRefs = useRef(new Map<string, React.MutableRefObject<AvatarPose>>());
  const peerCountRef = useRef(0);

  useHeldKeys(keysRef);

  const handleChat = useCallback(
    (message: LobbyChatMessage) => {
      setSpeeches((prev) => ({ ...prev, [message.userId]: { text: message.text, at: message.at } }));
      onChatMessage(message);
    },
    [onChatMessage]
  );

  useEffect(() => {
    const leave = joinLobby(identity, setPeers, handleChat);
    return () => {
      leave();
      disposeRoomTextures();
    };
    // identity dựng lại mỗi render ở component cha là chuyện thường; chỉ join
    // lại khi danh tính thực sự đổi.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity.userId, identity.name, identity.avatarUrl, handleChat]);

  useEffect(() => {
    peerCountRef.current = peers.length;
    onPeerCount(peers.length);
  }, [peers.length, onPeerCount]);

  /** Dọn bong bóng đã hết hạn khỏi state - nếu để lại, mỗi người từng nói một
   *  câu sẽ giữ chuỗi đó trong bộ nhớ suốt phiên. */
  useEffect(() => {
    if (Object.keys(speeches).length === 0) return;
    const timer = window.setInterval(() => {
      const now = Date.now();
      setSpeeches((prev) => {
        const next: typeof prev = {};
        let changed = false;
        for (const [id, s] of Object.entries(prev)) {
          if (now - s.at < CHAT_BUBBLE_MS) next[id] = s;
          else changed = true;
        }
        return changed ? next : prev;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [speeches]);

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
      <RoomFixtures playerRef={playerPos} onPortalProximity={onPortalProximity} />

      <LobbyAvatar
        name={identity.name}
        color={identity.color}
        avatarUrl={identity.avatarUrl}
        speech={selfSpeech}
        poseRef={selfPose}
        isSelf
      />
      {others.map((p) => {
        const ref = peerPoseRefs.current.get(p.userId);
        if (!ref) return null;
        return (
          <LobbyAvatar
            key={p.userId}
            name={p.name}
            color={p.color}
            avatarUrl={p.avatarUrl}
            speech={speeches[p.userId] ?? null}
            poseRef={ref}
          />
        );
      })}

      <PlayerRig
        userId={identity.userId}
        poseRef={selfPose}
        keysRef={keysRef}
        peerCountRef={peerCountRef}
      />
      <PlayerPositionTap poseRef={selfPose} out={playerPos} />
    </Canvas>
  );
}

export { colorForUser };
