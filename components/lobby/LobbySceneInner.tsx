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
  setSeat,
  tableSessionStart,
  type LobbyChatMessage,
  type LobbyIdentity,
  type LobbyPeer,
} from "@/lib/supabase-lobby";
import { disposeRoomTextures } from "./room-textures";
import PomodoroClock from "./PomodoroClock";

const WALK_SPEED = 4.2;
const TURN_SPEED = 2.6;
/** Bán kính thân người, dùng khi đẩy ra khỏi bàn. */
const BODY_RADIUS = 0.34;
/** Đứng trong khoảng này quanh một bàn thì ngồi xuống được. */
const SEAT_REACH = 2.4;

/** Bàn gần nhất trong tầm ngồi, hoặc null. Ghế xếp hai bên chiều dài bàn nên
 *  chỉ cần đứng đúng dải z và trong bề ngang bàn. */
export function nearestSeatableTable(x: number, z: number): number | null {
  for (let i = 0; i < TABLE_ZS.length; i += 1) {
    const dz = Math.abs(z - TABLE_ZS[i]);
    if (dz <= TABLE_HALF_D + SEAT_REACH && Math.abs(x) <= TABLE_HALF_W + 0.5) return i;
  }
  return null;
}

/** Vị trí ghế dọc theo chiều dài bàn, khớp với các khối ghế trong ReadingRoom. */
const SEAT_XS = [-3.4, -1.2, 1.2, 3.4];

/** Chỗ ngồi: nép sát mép bàn, phía người đang đứng, mặt quay vào bàn.
 *
 *  Bám vào GHẾ GẦN NGƯỜI NHẤT chứ không phải giữa bàn - nếu ai ngồi xuống
 *  cũng về x=0 thì hai người cùng bàn sẽ lồng vào nhau, và cả điểm của cái
 *  bàn là ngồi cạnh được người khác. */
export function seatPose(tableId: number, fromX: number, fromZ: number): AvatarPose {
  const tz = TABLE_ZS[tableId];
  const side = fromZ >= tz ? 1 : -1;
  const x = SEAT_XS.reduce((best, s) => (Math.abs(s - fromX) < Math.abs(best - fromX) ? s : best), SEAT_XS[0]);
  return {
    x,
    z: tz + side * (TABLE_HALF_D + 0.75),
    // Quay mặt vào bàn: ry=0 là nhìn về -z, nên phía +z cần quay 0, phía -z quay PI.
    ry: side > 0 ? 0 : Math.PI,
  };
}

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

export interface OrbitState {
  /** Lệch góc ngang so với hướng nhân vật đang quay, radian. */
  yaw: number;
  /** Góc chúc xuống. Chặn hai đầu để không lộn qua đỉnh đầu hay chui xuống sàn. */
  pitch: number;
  /** Khoảng cách camera tới nhân vật. */
  dist: number;
}

/** Kéo chuột để xoay quanh nhân vật, lăn chuột để tiến/lùi camera.
 *
 *  Góc xoay là ĐỘ LỆCH so với hướng nhân vật, không phải góc tuyệt đối: đi tới
 *  đâu camera vẫn giữ nguyên góc nhìn tương đối mà người dùng vừa chọn, thay vì
 *  bị giật về sau lưng mỗi lần quay người.
 *
 *  Bắt sự kiện trên chính canvas WebGL chứ không trên window: HUD nằm đè lên
 *  trên, và kéo từ ô chat hay nút "Ngồi xuống" mà camera xoay theo thì bấm nút
 *  gần như không trúng. */
function useCameraOrbit(orbit: React.MutableRefObject<OrbitState>) {
  const { gl } = useThree();

  useEffect(() => {
    const el = gl.domElement;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const down = (e: PointerEvent) => {
      // Chỉ chuột trái / một ngón; chuột phải để dành cho menu ngữ cảnh.
      if (e.button !== 0) return;
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      orbit.current.yaw -= dx * 0.005;
      orbit.current.pitch = THREE.MathUtils.clamp(orbit.current.pitch + dy * 0.004, -0.25, 1.1);
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      el.style.cursor = "grab";
    };
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      orbit.current.dist = THREE.MathUtils.clamp(orbit.current.dist + e.deltaY * 0.006, 2.2, 16);
    };

    el.style.cursor = "grab";
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("wheel", wheel, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("wheel", wheel);
      el.style.cursor = "";
    };
  }, [gl, orbit]);
}

/** Đặt camera theo quỹ đạo quanh nhân vật. `distOverride` cho phép ngồi thì
 *  ngồi gần hơn một chút mà vẫn giữ nguyên góc người dùng đã xoay. */
function applyOrbitCamera(
  camera: THREE.Camera,
  pose: AvatarPose,
  orbit: OrbitState,
  delta: number,
  distOverride?: number
) {
  const dist = distOverride ?? orbit.dist;
  const angle = pose.ry + orbit.yaw;
  const horizontal = Math.cos(orbit.pitch) * dist;
  const target = new THREE.Vector3(
    pose.x + Math.sin(angle) * horizontal,
    // Chặn sàn: pitch âm cộng khoảng cách xa sẽ dìm camera xuống dưới nền, và
    // lúc đó nửa dưới khung hình là mặt sau của sàn - một mảng đen. Kẹp ở đây
    // thay vì siết pitch, vì giới hạn thật phụ thuộc cả vào dist.
    Math.max(0.55, 1.5 + Math.sin(orbit.pitch) * dist),
    pose.z + Math.cos(angle) * horizontal
  );
  camera.position.lerp(target, Math.min(1, delta * 6));
  camera.lookAt(pose.x, 1.5, pose.z);
}

/** Mọi logic mỗi-frame của người chơi: đọc phím, di chuyển, chặn tường và bàn,
 *  đẩy camera đuổi theo, và phát vị trí lên kênh chung theo nhịp. */
function PlayerRig({
  userId,
  poseRef,
  keysRef,
  peerCountRef,
  seatedRef,
  onSeatableChange,
  orbitRef,
}: {
  userId: string;
  poseRef: React.MutableRefObject<AvatarPose>;
  keysRef: React.MutableRefObject<Record<string, boolean>>;
  peerCountRef: React.MutableRefObject<number>;
  /** Đang ngồi bàn nào; null là đang đứng. Đọc mỗi frame để khoá di chuyển. */
  seatedRef: React.MutableRefObject<number | null>;
  onSeatableChange: (tableId: number | null) => void;
  orbitRef: React.MutableRefObject<OrbitState>;
}) {
  const { camera } = useThree();
  useCameraOrbit(orbitRef);
  const lastSent = useRef(0);
  const lastSentPose = useRef<AvatarPose>({ x: 0, z: 0, ry: 0 });
  const lastSeatable = useRef<number | null>(null);

  useFrame((state, delta) => {
    const keys = keysRef.current;
    const pose = poseRef.current;
    const seated = seatedRef.current;

    // Đang ngồi thì không đi được. Khoá ở đây chứ không chỉ ẩn nút đứng dậy:
    // bàn phím vẫn cắm đó, và một nhân vật vừa ngồi vừa trôi ngang phòng thì
    // phiên học không còn nghĩa gì.
    if (seated !== null) {
      applyOrbitCamera(camera, pose, orbitRef.current, delta, 4.4);
      if (lastSeatable.current !== null) {
        lastSeatable.current = null;
        onSeatableChange(null);
      }
      return;
    }

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

    // Báo ra ngoài khi bước vào/ra tầm một cái bàn, để HUD hiện nút ngồi.
    // So với lần trước rồi mới gọi: đây là useFrame, gọi setState mỗi khung
    // hình sẽ re-render cả cây React 60 lần/giây.
    const seatable = nearestSeatableTable(pose.x, pose.z);
    if (seatable !== lastSeatable.current) {
      lastSeatable.current = seatable;
      onSeatableChange(seatable);
    }

    // Camera vai thứ ba, xoay được bằng chuột.
    applyOrbitCamera(camera, pose, orbitRef.current, delta);

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
  /** Bàn đang đứng cạnh (null nếu không), để HUD hiện nút "Ngồi xuống học". */
  onSeatableChange: (tableId: number | null) => void;
  /** Bàn đang ngồi; do HUD điều khiển qua sit/stand. */
  seatedTable: number | null;
  seatStartedAt: number | null;
}

export default function LobbySceneInner({
  identity,
  onChatMessage,
  onPortalProximity,
  selfSpeech,
  onPeerCount,
  onSeatableChange,
  seatedTable,
  seatStartedAt,
}: Props) {
  const [peers, setPeers] = useState<LobbyPeer[]>([]);
  const [speeches, setSpeeches] = useState<Record<string, { text: string; at: number }>>({});
  const keysRef = useRef<Record<string, boolean>>({});
  // Xuất phát ở cửa phía nam, quay mặt vào phòng.
  const selfPose = useRef<AvatarPose>({ x: 0, z: ROOM.bounds.z - 1, ry: Math.PI });
  const playerPos = useRef({ x: 0, z: ROOM.bounds.z - 1 });
  const peerPoseRefs = useRef(new Map<string, React.MutableRefObject<AvatarPose>>());
  const peerCountRef = useRef(0);
  const seatedRef = useRef<number | null>(null);
  // Góc nhìn mặc định: hơi chếch từ trên xuống, sau lưng nhân vật.
  const orbitRef = useRef<OrbitState>({ yaw: 0, pitch: 0.34, dist: 5.6 });

  useHeldKeys(keysRef);

  // Ngồi xuống: khoá nhân vật vào ghế và công bố chỗ ngồi qua presence.
  // Đứng lên: nhả khoá, xoá chỗ ngồi.
  useEffect(() => {
    seatedRef.current = seatedTable;
    if (seatedTable !== null) {
      const p = selfPose.current;
      const target = seatPose(seatedTable, p.x, p.z);
      selfPose.current = target;
      // Đẩy luôn một gói vị trí: người khác phải thấy mình đã ngồi vào ghế
      // ngay, chứ không phải khi mình nhúc nhích lần sau (mà ngồi thì không
      // nhúc nhích nữa, nên sẽ là không bao giờ).
      sendPose(identity.userId, target);
      setSeat({ tableId: seatedTable, startedAt: seatStartedAt ?? Date.now() });
    } else {
      setSeat(null);
    }
  }, [seatedTable, seatStartedAt, identity.userId]);

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

  /** Gom người ngồi theo bàn, kể cả chính mình - đồng hồ phải hiện ngay cả khi
   *  mình là người duy nhất trong phòng. */
  const tableSessions = useMemo(() => {
    const byTable = new Map<number, Array<{ seat: { tableId: number; startedAt: number } | null }>>();
    const seatedAll = [
      ...peers.filter((p) => p.userId !== identity.userId && p.seat),
      ...(seatedTable !== null
        ? [{ seat: { tableId: seatedTable, startedAt: seatStartedAt ?? Date.now() } }]
        : []),
    ];
    for (const p of seatedAll) {
      if (!p.seat) continue;
      const list = byTable.get(p.seat.tableId) ?? [];
      list.push(p);
      byTable.set(p.seat.tableId, list);
    }
    return [...byTable.entries()].map(([tableId, list]) => ({
      tableId,
      startedAt: tableSessionStart(list) ?? Date.now(),
      count: list.length,
    }));
  }, [peers, identity.userId, seatedTable, seatStartedAt]);

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

      {/* Đồng hồ Pomodoro: một cái cho mỗi bàn ĐANG có người ngồi. Bàn trống
          không treo đồng hồ - phòng đầy đồng hồ đếm ngược rỗng thì cái đang
          chạy thật không còn nổi bật nữa. */}
      {tableSessions.map(({ tableId, startedAt, count }) => (
        <PomodoroClock
          key={tableId}
          position={[0, 2.15, TABLE_ZS[tableId]]}
          startedAt={startedAt}
          seatedCount={count}
        />
      ))}

      <LobbyAvatar
        name={identity.name}
        color={identity.color}
        avatarUrl={identity.avatarUrl}
        status={{ streak: identity.streak, level: identity.level, doneToday: identity.doneToday }}
        seated={seatedTable !== null}
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
            seated={!!p.seat}
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
        seatedRef={seatedRef}
        onSeatableChange={onSeatableChange}
        orbitRef={orbitRef}
      />
      <PlayerPositionTap poseRef={selfPose} out={playerPos} />
    </Canvas>
  );
}

export { colorForUser };
