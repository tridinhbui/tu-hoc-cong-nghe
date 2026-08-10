"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { poseDiffers, quantizePose } from "@/lib/lobby-pose-net";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import StudyRoomShell from "./StudyRoomShell";
import {
  BODY_RADIUS,
  ROOM,
  SEATS,
  TABLE,
  isNearDoor,
  nearestFreeSeat,
  resolveStudyObstacles,
} from "./study-room-space";
import {
  applyFollowCamera,
  inputTowardTarget,
  recenterOrbit,
  turnToward,
  usePointerControls,
  useWalkKeys,
  worldDirection,
  type OrbitState,
  type WalkState,
} from "@/components/world-controls/easy-walk";
import { useRenderQuality } from "@/components/world-controls/render-quality";
import { QualityGovernor, useGovernedQuality } from "@/components/world-controls/quality-governor";
import { usePageVisible } from "@/components/world-controls/use-page-visible";
import LobbyAvatar, { type AvatarPose } from "@/components/lobby/LobbyAvatar";
import { disposeRoomTextures } from "@/components/lobby/room-textures";
import PomodoroClock from "@/components/lobby/PomodoroClock";
import { CHAT_BUBBLE_MS, MOVE_BROADCAST_MS, type LobbyChatMessage } from "@/lib/supabase-lobby";
import { earliestSessionStart } from "@/lib/study-session";
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

/** Góc ngẩng camera lúc vào phòng, và là góc nó trôi về sau khi thả cú kéo. */
const REST_PITCH = 0.32;

/** Khung giữ camera trong phòng. Tường chỉ vẽ một mặt, nên camera lùi ra ngoài
 *  là khung hình thành mảng đen. */
const CAMERA_BOUNDS = {
  minX: -ROOM.bounds.x,
  maxX: ROOM.bounds.x,
  minZ: -ROOM.bounds.z,
  maxZ: ROOM.bounds.z,
};



/** Mỗi frame của người chơi: đọc phím, đi, chặn tường và đồ đạc, đẩy camera
 *  theo, và phát vị trí lên kênh phòng theo nhịp. */
function PlayerRig({
  roomId,
  userId,
  poseRef,
  walkRef,
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
  walkRef: React.MutableRefObject<WalkState>;
  peerCountRef: React.MutableRefObject<number>;
  seatedRef: React.MutableRefObject<number | null>;
  takenSeatsRef: React.MutableRefObject<Set<number>>;
  onSeatableChange: (seat: number | null) => void;
  onDoorProximity: (near: boolean) => void;
  orbitRef: React.MutableRefObject<OrbitState>;
}) {
  const { camera } = useThree();
  usePointerControls(orbitRef, (nx, ny) => {
    // Chạm vào sàn là đi tới đó. Cách duy nhất trong ba cách điều khiển không
    // đòi người dùng biết trước gì cả.
    const ray = new THREE.Raycaster();
    ray.setFromCamera(new THREE.Vector2(nx, ny), camera);
    const hit = new THREE.Vector3();
    if (!ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hit)) return;
    walkRef.current.target = { x: hit.x, z: hit.z };
  });
  const lastSent = useRef(0);
  const lastSentPose = useRef<AvatarPose>({ x: 0, z: SPAWN_Z, ry: SPAWN_RY });
  const lastSeatable = useRef<number | null>(null);
  const lastNearDoor = useRef(false);

  useFrame((state, rawDelta) => {
    const walk = walkRef.current;
    const pose = poseRef.current;
    const orbit = orbitRef.current;
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
      // Ngồi thì không đi được, nên không có vòng lặp nào để lo: camera luôn
      // được phép trôi về sau lưng.
      recenterOrbit(orbit, pose.ry, delta, { allowed: true, restPitch: REST_PITCH });
      applyFollowCamera(camera, pose, orbit, delta, { distOverride: 3.8, bounds: CAMERA_BOUNDS });
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

    // Đi theo hướng nhìn: bấm tới là đi vào sâu màn hình, nhân vật tự quay theo
    // hướng đi. Cùng một bộ điều khiển với Phố nghề, nên bước qua cổng không
    // phải học lại cách đi.
    let input = walk.input;
    if (walk.target) {
      const auto = inputTowardTarget(walk.target, pose.x, pose.z, orbit.yaw);
      if (!auto) walk.target = null;
      else if (Math.hypot(walk.input.x, walk.input.y) < 0.08) input = auto;
    }
    const dir = worldDirection(input, orbit.yaw);
    if (dir) {
      const solved = resolveStudyObstacles(
        THREE.MathUtils.clamp(pose.x + dir.x * WALK_SPEED * delta, -ROOM.bounds.x, ROOM.bounds.x),
        THREE.MathUtils.clamp(pose.z + dir.z * WALK_SPEED * delta, -ROOM.bounds.z, ROOM.bounds.z),
        BODY_RADIUS
      );
      pose.x = solved.x;
      pose.z = solved.z;
      pose.ry = turnToward(pose.ry, dir.x, dir.z, delta);
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

    recenterOrbit(orbit, pose.ry, delta, {
      allowed: Math.hypot(walk.input.x, walk.input.y) < 0.08,
      restPitch: REST_PITCH,
    });
    applyFollowCamera(camera, pose, orbit, delta, { bounds: CAMERA_BOUNDS });

    // Phát vị trí theo nhịp, và chỉ khi thực sự nhúc nhích - người đứng yên
    // không nên chiếm ngân sách sự kiện của cả phòng. Nhịp giãn ra khi đông
    // vì mỗi gói mình gửi là N gói cả phòng phải nhận.
    const interval = peerCountRef.current > 6 ? MOVE_BROADCAST_MS * 2 : MOVE_BROADCAST_MS;
    const now = state.clock.elapsedTime * 1000;
    // "Đã nhúc nhích" đo trên gói ĐÃ LƯỢNG TỬ HOÁ, không phải trên toạ độ thô.
    // Ba ngưỡng 0.01/0.02 viết tay trước đây nằm ngay cạnh bước lưới 1cm, nên
    // có một khe hẹp mà một dịch chuyển vượt ngưỡng thô lại làm tròn về đúng
    // gói cũ - gửi một gói y hệt gói trước, tốn băng thông cho không thông tin
    // nào. So sau khi làm tròn thì ngưỡng CHÍNH LÀ bước lưới, không còn khe.
    const next = quantizePose({ x: pose.x, z: pose.z, ry: pose.ry });
    const moved = poseDiffers(next, lastSentPose.current);
    if (moved && now - lastSent.current >= interval) {
      lastSent.current = now;
      lastSentPose.current = next;
      sendStudyPose(roomId, userId, next);
    }
  });

  return null;
}

export interface StudyRoomSceneProps {
  /** Trạng thái đi lại, do HUD ở ngoài cùng ghi vào qua cần điều khiển. */
  walkRef: React.MutableRefObject<WalkState>;
  roomId: number;
  identity: Omit<StudyWorldIdentity, "seat" | "seatStartedAt">;
  /** Ghế đang ngồi; HUD điều khiển qua nút ngồi/đứng. */
  seated: number | null;
  seatStartedAt: number | null;
  onSeatableChange: (seat: number | null) => void;
  onDoorProximity: (near: boolean) => void;
  onPeerCount: (count: number) => void;
  /** Số người trong phòng đang ngồi trong một phiên học. */
  onSeatedCount: (count: number) => void;
  onChatMessage: (message: LobbyChatMessage) => void;
  /** Câu của chính mình, do HUD đẩy xuống ngay khi bấm gửi. */
  selfSpeech: { text: string; at: number } | null;
  /** Thành viên nhóm, kể cả người đang offline. Người offline vẫn ngồi ở bàn
   *  dạng mờ: một căn phòng tám ghế mà lúc nào cũng chỉ có một người trông như
   *  hỏng, trong khi sự thật là nhóm có tám người và bảy người đang bận. */
  members: Array<{ userId: string; name: string; avatarUrl: string | null; color: string; level: number }>;
  boardTitle: string;
  boardRows: string[];
  lampColor: string;
  daylight: number;
}

export default function StudyRoomScene({
  walkRef,
  roomId,
  identity,
  seated,
  seatStartedAt,
  onSeatableChange,
  onDoorProximity,
  onPeerCount,
  onSeatedCount,
  onChatMessage,
  selfSpeech,
  members,
  boardTitle,
  boardRows,
  lampColor,
  daylight,
}: StudyRoomSceneProps) {
  // Chất lượng gốc là một lần đoán từ số nhân CPU; bộ điều tiết bên dưới sửa
  // lại nó theo thời lượng khung hình thật, vì một laptop tám nhân dùng đồ hoạ
  // tích hợp vẫn báo là máy khoẻ.
  const baseQuality = useRenderQuality();
  const { quality, onLevel } = useGovernedQuality(baseQuality);
  const pageVisible = usePageVisible();
  const [peers, setPeers] = useState<StudyWorldPeer[]>([]);
  const [speeches, setSpeeches] = useState<Record<string, { text: string; at: number }>>({});
  const selfPose = useRef<AvatarPose>({ x: 0, z: SPAWN_Z, ry: SPAWN_RY });
  const peerPoseRefs = useRef(new Map<string, React.MutableRefObject<AvatarPose>>());
  const peerCountRef = useRef(0);
  const seatedRef = useRef<number | null>(null);
  const takenSeatsRef = useRef<Set<number>>(new Set());
  const orbitRef = useRef<OrbitState>({ yaw: SPAWN_RY, pitch: REST_PITCH, dist: 5.2 });

  useWalkKeys(walkRef);

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
      // Vân bề mặt dùng chung với thư viện và được cache ở tầng module; nhả ra
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

  /** Có bao nhiêu người quanh bàn đang thực sự trong một phiên - kể cả mình.
   *  Cả căn phòng dựng lên vì sự hiện diện của người khác, nhưng trước đây
   *  ngồi cạnh một người đang học và ngồi cạnh một người đang đi loanh quanh
   *  trông y hệt nhau. */
  const seatedCount = useMemo(
    () => peers.filter((p) => p.seat !== null).length + (seated !== null ? 1 : 0),
    [peers, seated]
  );
  useEffect(() => {
    onSeatedCount(seatedCount);
  }, [seatedCount, onSeatedCount]);

  /** Mốc bắt đầu của phiên đang chạy ở bàn này: sớm nhất trong số người đang
   *  ngồi, kể cả mình. Đồng hồ thuộc về BÀN chứ không thuộc về người - ai ngồi
   *  xuống muộn nhận đúng thời gian còn lại thay vì mở một phiên riêng cạnh
   *  người khác. Cùng quy tắc thư viện đang dùng cho các bàn của nó. */
  const tableStartedAt = useMemo(
    () =>
      earliestSessionStart([
        ...peers.filter((p) => p.seat !== null).map((p) => p.seatStartedAt),
        seated !== null ? seatStartedAt : null,
      ]),
    [peers, seated, seatStartedAt]
  );

  /** Dọn bong bóng đã hết hạn - để lại thì mỗi người từng nói một câu sẽ giữ
   *  chuỗi đó trong bộ nhớ suốt phiên. */
  useEffect(() => {
    // Mảng phụ thuộc rỗng có chủ ý: trước đây nó là [speeches], nên mỗi câu
    // nói trong phòng lại huỷ và dựng lại interval. Bản cập nhật dạng hàm ở
    // dưới đã luôn đọc được giá trị mới nhất, nên không cần phụ thuộc nào.
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
  }, []);

  /** Thành viên vắng mặt được xếp vào những ghế còn trống, theo thứ tự ổn
   *  định để họ không nhảy ghế mỗi lần có người ra vào. */
  const ghostPoseRefs = useRef(new Map<string, React.MutableRefObject<AvatarPose>>());
  const ghosts = useMemo(() => {
    const online = new Set(peers.map((p) => p.userId));
    online.add(identity.userId);
    const takenSeats = new Set(peers.filter((p) => p.seat !== null).map((p) => p.seat as number));
    if (seated !== null) takenSeats.add(seated);
    const free = SEATS.filter((s) => !takenSeats.has(s.index));
    const absent = members.filter((m) => !online.has(m.userId)).slice(0, free.length);
    for (let i = 0; i < absent.length; i += 1) {
      const spot = free[i];
      const existing = ghostPoseRefs.current.get(absent[i].userId);
      const pose = { x: spot.x, z: spot.z, ry: spot.ry };
      if (existing) existing.current = pose;
      else ghostPoseRefs.current.set(absent[i].userId, { current: pose });
    }
    const ids = new Set(absent.map((m) => m.userId));
    for (const id of [...ghostPoseRefs.current.keys()]) {
      if (!ids.has(id)) ghostPoseRefs.current.delete(id);
    }
    return absent;
  }, [members, peers, identity.userId, seated]);

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
      // Tab ẩn thì ngừng vẽ. Một phiên Pomodoro 25 phút ở tab nền vẫn quay GPU
      // hết tốc độ là điều trớ trêu: chuyển tab đi chỗ khác CHÍNH LÀ cách người
      // ta dùng Pomodoro. "never" chứ không phải "demand" vì cảnh này không có
      // gì cần vẽ một lần khi ẩn - lúc quay lại nó tự chạy tiếp.
      frameloop={pageVisible ? "always" : "never"}
      shadows={quality.shadows}
      camera={{ position: [0, 3.1, SPAWN_Z + 5], fov: 55 }}
      // Trần DPR: màn Retina 3x không cần render 3x cho một phòng học, và đây
      // là khác biệt lớn nhất giữa mát máy và cháy quạt.
      dpr={quality.dpr}
      // Comment ở StudyRoomShell nói phòng phải mở được trên máy yếu, nhưng
      // "high-performance" lại ép laptop bật GPU rời cho một căn phòng tĩnh.
      // Bám theo cùng phép đo máy yếu mà useRenderQuality đang dùng.
      gl={{
        antialias: baseQuality.shadows,
        powerPreference: baseQuality.shadows ? "high-performance" : "low-power",
      }}
    >
      {/* Đo khung hình thật và hạ chất lượng nếu cảnh không theo kịp. */}
      <QualityGovernor onLevel={onLevel} />
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

      {/* Đồng hồ phiên treo trên bàn. Trước đây đếm ngược chỉ nằm ở góc HUD -
          tức là nhìn vào căn phòng thì không thấy gì, trong khi cả căn phòng
          tồn tại vì đúng phiên 25 phút đó. Treo cao hơn mặt bàn 1,7 đơn vị để
          không bị đầu người ngồi che. */}
      {tableStartedAt !== null && (
        <PomodoroClock
          position={[TABLE.x, TABLE.top + 1.7, TABLE.z]}
          startedAt={tableStartedAt}
          seatedCount={seatedCount}
        />
      )}

      <LobbyAvatar
        name={identity.name}
        color={identity.color}
        avatarUrl={identity.avatarUrl}
        status={{ streak: identity.streak, level: identity.level, doneToday: identity.doneToday }}
        seated={seated !== null}
        gear={identity.gear}
        speech={selfSpeech}
        poseRef={selfPose}
        isSelf
      />
      {/* Thành viên vắng mặt, ngồi mờ ở ghế của mình. Chỉ vẽ những ghế mà
          không có ai đang online chiếm - người online luôn được vẽ đầy đủ, và
          hai bản của cùng một người ngồi chồng nhau thì tệ hơn là không vẽ. */}
      {ghosts.map((g) => {
        const ref = ghostPoseRefs.current.get(g.userId);
        if (!ref) return null;
        return (
          <LobbyAvatar
            key={`ghost-${g.userId}`}
            name={g.name}
            color={g.color}
            avatarUrl={g.avatarUrl}
            status={{ streak: 0, level: g.level, doneToday: false }}
            seated
            poseRef={ref}
            ghost
          />
        );
      })}

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
            gear={p.gear}
            speech={speeches[p.userId] ?? null}
            poseRef={ref}
          />
        );
      })}

      <PlayerRig
        roomId={roomId}
        userId={identity.userId}
        poseRef={selfPose}
        walkRef={walkRef}
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
