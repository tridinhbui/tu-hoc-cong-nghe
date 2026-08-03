"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import StudyRoomShell from "./StudyRoomShell";
import {
  BODY_RADIUS,
  ROOM,
  SEATS,
  isNearDoor,
  nearestFreeSeat,
  resolveStudyObstacles,
} from "./study-room-space";
import { applyOrbitCamera, useCameraOrbit, useHeldKeys, type HeldKeys, type OrbitState } from "./use-walk-controls";
import LobbyAvatar, { type AvatarPose } from "@/components/lobby/LobbyAvatar";
import { disposeRoomTextures } from "@/components/lobby/room-textures";
import { CHAT_BUBBLE_MS, MOVE_BROADCAST_MS, type LobbyChatMessage } from "@/lib/supabase-lobby";
import {
  SPAWN_RY,
  SPAWN_Z,
  joinStudyWorld,
  sendStudyPose,
  setStudySeat,
  type StudyWorldIdentity,
  type StudyWorldPeer,
} from "@/lib/supabase-study-world";

const WALK_SPEED = 3.6;
const TURN_SPEED = 2.5;

/** Mỗi frame của người chơi: đọc phím, đi, chặn tường và đồ đạc, đẩy camera
 *  theo, và phát vị trí lên kênh phòng theo nhịp. */
function PlayerRig({
  roomId,
  userId,
  poseRef,
  keysRef,
  peerCountRef,
  seatedRef,
  takenSeatsRef,
  onSeatableChange,
  onDoorProximity,
  orbitRef,
}: {
  roomId: number;
  userId: string;
  poseRef: React.MutableRefObject<AvatarPose>;
  keysRef: React.MutableRefObject<HeldKeys>;
  peerCountRef: React.MutableRefObject<number>;
  seatedRef: React.MutableRefObject<number | null>;
  takenSeatsRef: React.MutableRefObject<Set<number>>;
  onSeatableChange: (seat: number | null) => void;
  onDoorProximity: (near: boolean) => void;
  orbitRef: React.MutableRefObject<OrbitState>;
}) {
  const { camera } = useThree();
  useCameraOrbit(orbitRef);
  const lastSent = useRef(0);
  const lastSentPose = useRef<AvatarPose>({ x: 0, z: SPAWN_Z, ry: SPAWN_RY });
  const lastSeatable = useRef<number | null>(null);
  const lastNearDoor = useRef(false);

  useFrame((state, rawDelta) => {
    const keys = keysRef.current;
    const pose = poseRef.current;
    // Trần bước thời gian. requestAnimationFrame dừng hẳn khi tab bị ẩn, nên
    // frame đầu tiên sau khi quay lại mang theo cả quãng thời gian đã trôi -
    // có thể là vài giây. Nhân nó với tốc độ đi thì một bước dài hàng mét, và
    // bộ giải va chạm chỉ kiểm tra ĐIỂM ĐẾN chứ không kiểm tra đường đi, nên
    // nhân vật xuyên thẳng qua cái bàn. Kẹp ở 1/20 giây: chậm hơn thì hụt
    // chuyển động sau khi đổi tab, nhanh hơn thì lại lọt.
    const delta = Math.min(rawDelta, 1 / 20);

    // Đang ngồi thì không đi được. Khoá ở đây chứ không chỉ ẩn nút đứng dậy:
    // bàn phím vẫn cắm đó, và một nhân vật vừa ngồi vừa trôi ngang phòng thì
    // phiên học không còn nghĩa gì.
    if (seatedRef.current !== null) {
      applyOrbitCamera(camera, pose, orbitRef.current, delta, 3.8);
      if (lastSeatable.current !== null) {
        lastSeatable.current = null;
        onSeatableChange(null);
      }
      if (lastNearDoor.current) {
        lastNearDoor.current = false;
        onDoorProximity(false);
      }
      return;
    }

    // Trái/phải xoay người, lên/xuống tiến lùi - kiểu điều khiển xe tăng, khớp
    // với bốn nút mũi tên trên màn hình hơn là strafe.
    if (keys.left) pose.ry += TURN_SPEED * delta;
    if (keys.right) pose.ry -= TURN_SPEED * delta;
    const forward = (keys.up ? 1 : 0) - (keys.down ? 0.6 : 0);
    if (forward !== 0) {
      const nx = pose.x - Math.sin(pose.ry) * WALK_SPEED * forward * delta;
      const nz = pose.z - Math.cos(pose.ry) * WALK_SPEED * forward * delta;
      const solved = resolveStudyObstacles(
        THREE.MathUtils.clamp(nx, -ROOM.bounds.x, ROOM.bounds.x),
        THREE.MathUtils.clamp(nz, -ROOM.bounds.z, ROOM.bounds.z),
        BODY_RADIUS
      );
      pose.x = solved.x;
      pose.z = solved.z;
    }

    // Báo ra ngoài khi bước vào/ra tầm ghế hoặc cửa. So với lần trước rồi mới
    // gọi: đây là useFrame, gọi setState mỗi khung hình sẽ re-render cả cây
    // React 60 lần một giây.
    const seatable = nearestFreeSeat(pose.x, pose.z, takenSeatsRef.current);
    if (seatable !== lastSeatable.current) {
      lastSeatable.current = seatable;
      onSeatableChange(seatable);
    }
    const nearDoor = isNearDoor(pose.x, pose.z);
    if (nearDoor !== lastNearDoor.current) {
      lastNearDoor.current = nearDoor;
      onDoorProximity(nearDoor);
    }

    applyOrbitCamera(camera, pose, orbitRef.current, delta);

    // Phát vị trí theo nhịp, và chỉ khi thực sự nhúc nhích - người đứng yên
    // không nên chiếm ngân sách sự kiện của cả phòng. Nhịp giãn ra khi đông
    // vì mỗi gói mình gửi là N gói cả phòng phải nhận.
    const interval = peerCountRef.current > 6 ? MOVE_BROADCAST_MS * 2 : MOVE_BROADCAST_MS;
    const now = state.clock.elapsedTime * 1000;
    const moved =
      Math.abs(pose.x - lastSentPose.current.x) > 0.01 ||
      Math.abs(pose.z - lastSentPose.current.z) > 0.01 ||
      Math.abs(pose.ry - lastSentPose.current.ry) > 0.02;
    if (moved && now - lastSent.current >= interval) {
      lastSent.current = now;
      lastSentPose.current = { ...pose };
      sendStudyPose(roomId, userId, { x: pose.x, z: pose.z, ry: pose.ry });
    }
  });

  return null;
}

export interface StudyRoomSceneProps {
  roomId: number;
  identity: Omit<StudyWorldIdentity, "seat" | "seatStartedAt">;
  /** Ghế đang ngồi; HUD điều khiển qua nút ngồi/đứng. */
  seated: number | null;
  seatStartedAt: number | null;
  onSeatableChange: (seat: number | null) => void;
  onDoorProximity: (near: boolean) => void;
  onPeerCount: (count: number) => void;
  onChatMessage: (message: LobbyChatMessage) => void;
  /** Câu của chính mình, do HUD đẩy xuống ngay khi bấm gửi. */
  selfSpeech: { text: string; at: number } | null;
  boardTitle: string;
  boardRows: string[];
  lampColor: string;
  daylight: number;
}

export default function StudyRoomScene({
  roomId,
  identity,
  seated,
  seatStartedAt,
  onSeatableChange,
  onDoorProximity,
  onPeerCount,
  onChatMessage,
  selfSpeech,
  boardTitle,
  boardRows,
  lampColor,
  daylight,
}: StudyRoomSceneProps) {
  const [peers, setPeers] = useState<StudyWorldPeer[]>([]);
  const [speeches, setSpeeches] = useState<Record<string, { text: string; at: number }>>({});
  const keysRef = useRef<HeldKeys>({});
  const selfPose = useRef<AvatarPose>({ x: 0, z: SPAWN_Z, ry: SPAWN_RY });
  const peerPoseRefs = useRef(new Map<string, React.MutableRefObject<AvatarPose>>());
  const peerCountRef = useRef(0);
  const seatedRef = useRef<number | null>(null);
  const takenSeatsRef = useRef<Set<number>>(new Set());
  const orbitRef = useRef<OrbitState>({ yaw: 0, pitch: 0.32, dist: 5.2 });

  useHeldKeys(keysRef);

  const handleChat = useCallback(
    (message: LobbyChatMessage) => {
      setSpeeches((prev) => ({ ...prev, [message.userId]: { text: message.text, at: message.at } }));
      onChatMessage(message);
    },
    [onChatMessage]
  );

  useEffect(() => {
    const leave = joinStudyWorld(
      roomId,
      { ...identity, seat: null, seatStartedAt: null },
      setPeers,
      handleChat
    );
    return () => {
      leave();
      // Vân bề mặt dùng chung với đại sảnh và được cache ở tầng module; nhả ra
      // khi rời phòng, nếu không cả bộ ở lại trong GPU suốt phiên.
      disposeRoomTextures();
    };
    // identity được dựng lại mỗi render ở component cha là chuyện thường; chỉ
    // join lại khi danh tính thật sự đổi.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, identity.userId, identity.name, identity.avatarUrl, handleChat]);

  // Ngồi xuống: khoá nhân vật vào ghế và công bố qua presence. Đứng lên: nhả
  // khoá, lùi ra khỏi ghế một bước để không kẹt trong lòng ghế.
  useEffect(() => {
    seatedRef.current = seated;
    if (seated !== null) {
      const spot = SEATS[seated];
      if (!spot) return;
      selfPose.current = { x: spot.x, z: spot.z, ry: spot.ry };
      // Đẩy luôn một gói vị trí: người khác phải thấy mình ngồi xuống NGAY,
      // chứ không phải lần sau mình nhúc nhích - mà ngồi thì không nhúc nhích
      // nữa, nên sẽ là không bao giờ.
      sendStudyPose(roomId, identity.userId, selfPose.current);
      setStudySeat(roomId, seated, seatStartedAt);
    } else {
      setStudySeat(roomId, null, null);
    }
  }, [seated, seatStartedAt, roomId, identity.userId]);

  useEffect(() => {
    peerCountRef.current = peers.length;
    onPeerCount(peers.length);
  }, [peers.length, onPeerCount]);

  /** Dọn bong bóng đã hết hạn - để lại thì mỗi người từng nói một câu sẽ giữ
   *  chuỗi đó trong bộ nhớ suốt phiên. */
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

  const others = useMemo(() => {
    const list = peers.filter((p) => p.userId !== identity.userId);
    for (const p of list) {
      const ref = peerPoseRefs.current.get(p.userId);
      if (!ref) peerPoseRefs.current.set(p.userId, { current: { x: p.x, z: p.z, ry: p.ry } });
      else ref.current = { x: p.x, z: p.z, ry: p.ry };
    }
    const ids = new Set(list.map((p) => p.userId));
    for (const id of [...peerPoseRefs.current.keys()]) {
      if (!ids.has(id)) peerPoseRefs.current.delete(id);
    }
    return list;
  }, [peers, identity.userId]);

  // Ghế người khác đang ngồi, đọc mỗi frame khi tìm ghế trống. Qua ref chứ
  // không qua props của PlayerRig: nó thay đổi mỗi lần có người ngồi xuống và
  // PlayerRig không nên dựng lại vì chuyện đó.
  useEffect(() => {
    takenSeatsRef.current = new Set(
      others.filter((p) => p.seat !== null).map((p) => p.seat as number)
    );
  }, [others]);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 3.1, SPAWN_Z + 5], fov: 55 }}
      // Trần DPR: màn Retina 3x không cần render 3x cho một phòng học, và đây
      // là khác biệt lớn nhất giữa mát máy và cháy quạt.
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#12100e"]} />
      <fog attach="fog" args={["#12100e", 22, 46]} />
      <ambientLight intensity={0.52 + daylight * 0.3} color="#ffe9cf" />
      {/* Nửa sáng trời nửa hắt sàn: một căn phòng chỉ có ambient phẳng lì trông
          như giấy dán, còn chỉ có đèn điểm thì mọi góc xa đều đen kịt. */}
      <hemisphereLight args={["#ffe3bd", "#2a1f16", 0.55 + daylight * 0.4]} />
      <directionalLight
        position={[6, 9, 3]}
        intensity={0.65 + daylight * 0.6}
        color="#fff3dd"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <StudyRoomShell
        boardTitle={boardTitle}
        boardRows={boardRows}
        lampColor={lampColor}
        daylight={daylight}
      />

      <LobbyAvatar
        name={identity.name}
        color={identity.color}
        avatarUrl={identity.avatarUrl}
        status={{ streak: identity.streak, level: identity.level, doneToday: identity.doneToday }}
        seated={seated !== null}
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
            status={{ streak: p.streak, level: p.level, doneToday: p.doneToday }}
            seated={p.seat !== null}
            speech={speeches[p.userId] ?? null}
            poseRef={ref}
          />
        );
      })}

      <PlayerRig
        roomId={roomId}
        userId={identity.userId}
        poseRef={selfPose}
        keysRef={keysRef}
        peerCountRef={peerCountRef}
        seatedRef={seatedRef}
        takenSeatsRef={takenSeatsRef}
        onSeatableChange={onSeatableChange}
        onDoorProximity={onDoorProximity}
        orbitRef={orbitRef}
      />
    </Canvas>
  );
}
