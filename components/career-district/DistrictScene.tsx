"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import DistrictShell from "./DistrictShell";
import {
  getRoom,
  moveWithin,
  nearestDesk,
  nearestDoorway,
  nearestPortal,
  nearestStop,
  nearestCafeSeat,
  isAtCivicStand,
  isAtLift,
  type CareerDesk,
  type DistrictRoom,
  type DistrictRoomId,
  type Doorway,
  type Pose,
  type CafeSeat,
  type PathStop,
  type RoomPortal,
} from "./district-space";
import {
  ARRIVE_RADIUS,
  applyFollowCamera,
  createWalkState,
  inputTowardTarget,
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
import type { CharacterEquipments } from "@/lib/rpg-items";
import { MOVE_BROADCAST_MS } from "@/lib/supabase-lobby";
import {
  joinStudyWorld,
  sendStudyPose,
  type StudyWorldPeer,
} from "@/lib/supabase-study-world";
import { CHAT_BUBBLE_MS, type LobbyChatMessage } from "@/lib/supabase-lobby";

const WALK_SPEED = 4.4;

interface RigProps {
  room: DistrictRoom;
  poseRef: React.MutableRefObject<AvatarPose>;
  walkRef: React.MutableRefObject<WalkState>;
  orbitRef: React.MutableRefObject<OrbitState>;
  onDeskChange: (desk: CareerDesk | null) => void;
  onDoorChange: (door: Doorway | null) => void;
  onPortalChange: (portal: RoomPortal | null) => void;
  onLiftChange: (atLift: boolean) => void;
  onStopChange: (stop: PathStop | null) => void;
  onSeatChange: (seat: CafeSeat | null) => void;
  onStandChange: (atStand: boolean) => void;
  seatTakenRef: React.MutableRefObject<ReadonlySet<number>>;
  onWalkingChange: (walking: boolean) => void;
  /** Danh tính để phát vị trí; null là chưa đăng nhập, khi đó không phát gì. */
  userId: string;
  peerCountRef: React.MutableRefObject<number>;
  mapPlayerRef: React.MutableRefObject<{ x: number; z: number }>;
}

function PlayerRig({ room, poseRef, walkRef, orbitRef, onDeskChange, onDoorChange, onPortalChange, onLiftChange, onStopChange, onSeatChange, onStandChange, seatTakenRef, onWalkingChange, userId, peerCountRef, mapPlayerRef }: RigProps) {
  const { camera } = useThree();
  const lastDesk = useRef<string | null>(null);
  const lastDoor = useRef<string | null>(null);
  const lastPortal = useRef<string | null>(null);
  const lastLift = useRef(false);
  /** Ngoài trời thì không có tường để camera xuyên, nên nới khung kẹp ra. */
  const outdoorRef = useRef(false);
  const outdoor = room.kind === "street" || room.id === "cong-vien" || room.id === "trung-tam";
  useEffect(() => {
    outdoorRef.current = outdoor;
  }, [outdoor]);
  const lastStop = useRef<string | null>(null);
  const lastSeat = useRef<number | null>(null);
  const lastStand = useRef(false);
  const lastWalking = useRef(false);
  /** Đích bị kẹt: đứng yên mấy khung liền dù đang cố đi thì bỏ đích, thay vì
   *  húc vào tường mãi mãi. */
  const stuckFrames = useRef(0);
  const lastSent = useRef(0);
  const lastSentPose = useRef<AvatarPose>({ x: 0, z: 0, ry: 0 });

  // Trước đây đây là một ref được gán lúc render, để usePointerControls luôn
  // gọi bản mới nhất. Lớp đó thừa: usePointerControls đã tự giữ hàm mới nhất
  // qua ref của chính nó. Hai lớp ref lồng nhau chỉ làm luật react-hooks/refs
  // đỏ mà không mua thêm gì.
  const onTap = useCallback((nx: number, ny: number) => {
    // Bắn tia từ camera qua điểm vừa chạm xuống mặt sàn y=0.
    const ray = new THREE.Raycaster();
    ray.setFromCamera(new THREE.Vector2(nx, ny), camera);
    const hit = new THREE.Vector3();
    if (!ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hit)) return;
    walkRef.current.target = { x: hit.x, z: hit.z };
    stuckFrames.current = 0;
  }, [camera]);
  usePointerControls(orbitRef, onTap);

  useFrame((state, rawDelta) => {
    // Trần bước thời gian: requestAnimationFrame dừng khi tab bị ẩn, nên khung
    // đầu tiên lúc quay lại mang theo cả quãng đã trôi. Nhân với tốc độ đi là
    // một bước dài hàng mét, và bộ giải va chạm chỉ xét điểm đến chứ không xét
    // đường đi - nhân vật xuyên thẳng qua bàn.
    const delta = Math.min(rawDelta, 1 / 20);
    const pose = poseRef.current;
    const walk = walkRef.current;
    const orbit = orbitRef.current;

    // Hướng "tới" lấy từ góc camera mà người dùng đang giữ, không đo lại từ vị
    // trí camera: camera được nội suy mỗi khung hình nên số đo lại luôn trễ, và
    // cái trễ đó cộng dồn thành hiện tượng trôi hướng.
    const yaw = orbit.yaw;

    // Đích tự đi và ý định thủ công đi chung một đường: đích chỉ sinh ra ý
    // định, còn phần chuyển động phía dưới không cần biết nó đến từ đâu.
    let input = walk.input;
    if (walk.target) {
      const auto = inputTowardTarget(walk.target, pose.x, pose.z, yaw);
      if (!auto) {
        walk.target = null;
      } else if (Math.hypot(walk.input.x, walk.input.y) < 0.08) {
        input = auto;
      }
    }

    const dir = worldDirection(input, yaw);
    let walking = false;
    if (dir) {
      const before = { x: pose.x, z: pose.z };
      const solved = moveWithin(room, pose.x + dir.x * WALK_SPEED * delta, pose.z + dir.z * WALK_SPEED * delta);
      pose.x = solved.x;
      pose.z = solved.z;
      pose.ry = turnToward(pose.ry, dir.x, dir.z, delta);
      const progressed = Math.hypot(pose.x - before.x, pose.z - before.z) > WALK_SPEED * delta * 0.2;
      walking = progressed;
      if (walk.target) {
        stuckFrames.current = progressed ? 0 : stuckFrames.current + 1;
        // Nửa giây húc vào vật cản là đủ để biết đường này không thông.
        if (stuckFrames.current > 30) {
          walk.target = null;
          stuckFrames.current = 0;
        }
      }
    }

    if (walking !== lastWalking.current) {
      lastWalking.current = walking;
      onWalkingChange(walking);
    }

    // Báo ra ngoài khi bước vào/ra tầm một cái bàn hay một cánh cửa. So với
    // lần trước rồi mới gọi: đây là useFrame, gọi setState mỗi khung hình sẽ
    // re-render cả cây React 60 lần một giây.
    const desk = nearestDesk(room, pose.x, pose.z);
    if ((desk?.careerId ?? null) !== lastDesk.current) {
      lastDesk.current = desk?.careerId ?? null;
      onDeskChange(desk);
    }
    const door = nearestDoorway(room, pose.x, pose.z);
    if ((door?.id ?? null) !== lastDoor.current) {
      lastDoor.current = door?.id ?? null;
      onDoorChange(door);
    }
    const portal = nearestPortal(room, pose.x, pose.z);
    if ((portal?.id ?? null) !== lastPortal.current) {
      lastPortal.current = portal?.id ?? null;
      onPortalChange(portal);
    }
    const stop = nearestStop(room, pose.x, pose.z);
    if ((stop?.slug ?? null) !== lastStop.current) {
      lastStop.current = stop?.slug ?? null;
      onStopChange(stop);
    }
    const seat = nearestCafeSeat(room, pose.x, pose.z, seatTakenRef.current);
    if ((seat?.index ?? null) !== lastSeat.current) {
      lastSeat.current = seat?.index ?? null;
      onSeatChange(seat);
    }
    const atStand = isAtCivicStand(room, pose.x, pose.z);
    if (atStand !== lastStand.current) {
      lastStand.current = atStand;
      onStandChange(atStand);
    }
    const atLift = isAtLift(room, pose.x, pose.z);
    if (atLift !== lastLift.current) {
      lastLift.current = atLift;
      onLiftChange(atLift);
    }

    // Camera đứng ở góc người dùng đã chọn, độc lập với hướng nhân vật, và bị
    // kẹp trong lòng phòng. Ngoài phố thì nới rộng: không có tường để xuyên,
    // và kẹp sát sẽ dí camera vào gáy nhân vật giữa một con phố rộng.
    applyFollowCamera(camera, pose, orbit, delta, {
      bounds: room.bounds,
      margin: outdoorRef.current ? 6 : 0.2,
    });

    // Vị trí ra ngoài qua ref, không qua state: bản đồ nhỏ đọc nó mỗi khung
    // hình, và đi qua setState sẽ kéo cả cây React render lại 60 lần một giây.
    mapPlayerRef.current.x = pose.x;
    mapPlayerRef.current.z = pose.z;

    // Phát vị trí theo nhịp, và chỉ khi thực sự nhúc nhích. Nhịp giãn ra khi
    // đông: mỗi gói mình gửi là N gói cả phòng phải nhận, nên chi phí tăng
    // theo bình phương số người.
    const interval = peerCountRef.current > 8 ? MOVE_BROADCAST_MS * 2 : MOVE_BROADCAST_MS;
    const now = state.clock.elapsedTime * 1000;
    const moved =
      Math.abs(pose.x - lastSentPose.current.x) > 0.01 ||
      Math.abs(pose.z - lastSentPose.current.z) > 0.01 ||
      Math.abs(pose.ry - lastSentPose.current.ry) > 0.02;
    if (moved && now - lastSent.current >= interval) {
      lastSent.current = now;
      lastSentPose.current = { ...pose };
      sendStudyPose(room.id, userId, { x: pose.x, z: pose.z, ry: pose.ry });
    }
  });

  return null;
}

/** Vòng tròn nhỏ nơi vừa chạm để đi tới - không có nó thì người dùng chạm xong
 *  không biết hệ thống có nhận hay không. */
function TargetMarker({
  walkRef,
  accent,
  still,
}: {
  walkRef: React.MutableRefObject<WalkState>;
  accent: string;
  still: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const target = walkRef.current.target;
    mesh.visible = !!target;
    if (target) {
      mesh.position.set(target.x, 0.05, target.z);
      // Vòng tròn đích nở bóp để dễ thấy; đứng yên khi người dùng xin ít
      // chuyển động, nhưng vẫn hiện - nó là phản hồi cho cú chạm, không phải
      // trang trí.
      mesh.scale.setScalar(still ? 1 : 1 + Math.sin(state.clock.elapsedTime * 6) * 0.12);
    }
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
      <ringGeometry args={[ARRIVE_RADIUS * 0.7, ARRIVE_RADIUS, 24]} />
      <meshBasicMaterial color={accent} transparent opacity={0.9} toneMapped={false} />
    </mesh>
  );
}

export interface DistrictSceneProps {
  roomId: DistrictRoomId;
  /** Danh tính để hiện diện với người khác trong cùng phòng. */
  userId: string;
  gear: CharacterEquipments;
  streak: number;
  doneToday: boolean;
  onPeerCount: (count: number) => void;
  /** Câu của chính mình, do HUD đẩy xuống ngay khi bấm gửi. */
  selfSpeech: { text: string; at: number } | null;
  /** Chỗ đứng khi vừa vào phòng này. Đổi tham chiếu là đặt lại vị trí. */
  entry: Pose;
  name: string;
  color: string;
  avatarUrl: string | null;
  level: number;
  lessonTitles: string[];
  walkRef: React.MutableRefObject<WalkState>;
  onDeskChange: (desk: CareerDesk | null) => void;
  onDoorChange: (door: Doorway | null) => void;
  onPortalChange: (portal: RoomPortal | null) => void;
  onLiftChange: (atLift: boolean) => void;
  onStopChange: (stop: PathStop | null) => void;
  onSeatChange: (seat: CafeSeat | null) => void;
  onStandChange: (atStand: boolean) => void;
  onWalkingChange: (walking: boolean) => void;
  /** Vị trí người chơi và người khác, để bản đồ nhỏ ngoài Canvas đọc mỗi khung
   *  hình mà không phải đi qua state. */
  playerRef: React.MutableRefObject<{ x: number; z: number }>;
  onPeersChange: (peers: Array<{ x: number; z: number; color: string }>) => void;
  /** Slug bài đã hoàn thành - cột trên hành lang lộ trình sáng theo cái này. */
  doneSlugs: ReadonlySet<string>;
  /** Bài tới hạn ôn - cột của chúng sáng khác màu và hỏi lại. */
  dueSlugs: ReadonlySet<string>;
  /** Tiến độ từng nhóm ngành, khắc lên biển hiệu ngoài phố. */
  progressByCategory: Record<string, { done: number; total: number }>;
  /** Ghế cà phê đang có người - của mình và của người khác. */
  seatTaken: ReadonlySet<number>;
  /** Ban ngày 1, khuya 0 - quyết định trời và đèn đường. */
  daylight: number;
  /** Vẽ liên tục kể cả khi trình duyệt báo tab đang ẩn.
   *
   *  Chỉ trang xem cảnh lúc dev dùng cờ này, và nó tồn tại vì một lý do rất
   *  cụ thể: khung xem của công cụ tự động LUÔN báo là ẩn, nên qua đường đó
   *  cảnh không bao giờ vẽ một khung hình nào và không kiểm được gì. Ở bản
   *  thật thì để mặc định - dừng vẽ khi tab ẩn là đúng, và phố nghề là thế
   *  giới lớn nhất trong ba cái nên cũng là chỗ tốn nhất khi bị bỏ quên. */
  forceRender?: boolean;
}

export default function DistrictScene({
  roomId,
  userId,
  gear,
  streak,
  doneToday,
  onPeerCount,
  selfSpeech,
  entry,
  name,
  color,
  avatarUrl,
  level,
  lessonTitles,
  walkRef,
  onDeskChange,
  onDoorChange,
  onPortalChange,
  onLiftChange,
  onStopChange,
  onSeatChange,
  onStandChange,
  playerRef,
  onPeersChange,
  doneSlugs,
  dueSlugs,
  progressByCategory,
  seatTaken,
  onWalkingChange,
  daylight,
  forceRender = false,
}: DistrictSceneProps) {
  // Chất lượng gốc là một lần đoán từ số nhân CPU; bộ điều tiết bên dưới sửa
  // lại nó theo thời lượng khung hình thật, vì một laptop tám nhân dùng đồ hoạ
  // tích hợp vẫn báo là máy khoẻ.
  const baseQuality = useRenderQuality();
  const { quality, onLevel } = useGovernedQuality(baseQuality);
  const pageVisible = usePageVisible();
  const room = getRoom(roomId);
  const poseRef = useRef<AvatarPose>({ ...entry });
  const [peers, setPeers] = useState<StudyWorldPeer[]>([]);
  const [speeches, setSpeeches] = useState<Record<string, { text: string; at: number }>>({});
  const peerPoseRefs = useRef(new Map<string, React.MutableRefObject<AvatarPose>>());
  const peerCountRef = useRef(0);
  const seatTakenRef = useRef<ReadonlySet<number>>(seatTaken);
  useEffect(() => {
    seatTakenRef.current = seatTaken;
  }, [seatTaken]);
  /** Màn hẹp thì lùi camera ra xa hơn. Khung hình dọc của điện thoại cắt mất
   *  bề ngang, nên cùng một khoảng cách sẽ cho ra một cái đầu nhân vật chiếm
   *  nửa màn hình và không thấy căn phòng đâu cả. */
  const narrow = typeof window !== "undefined" && window.innerWidth < 640;
  const orbitRef = useRef<OrbitState>({
    yaw: entry.ry,
    pitch: room.kind === "street" ? 0.46 : 0.36,
    dist: (room.kind === "street" || room.id === "cong-vien" || room.id === "trung-tam" ? 8.5 : 6) * (narrow ? 1.45 : 1),
  });

  useWalkKeys(walkRef);

  // Đổi phòng: đặt lại vị trí, bỏ đích đang đi và mọi phím còn giữ. Không xoá
  // phím thì bước qua cửa xong nhân vật tiếp tục lao về phía trước ở phòng
  // mới, và cú đầu tiên người học thấy là mình húc vào tường.
  useEffect(() => {
    poseRef.current = { ...entry };
    // Camera về sau lưng hướng vừa bước vào: giữ góc cũ thì vừa qua cửa đã phải
    // xoay lại để biết mình đang nhìn đi đâu.
    orbitRef.current.yaw = entry.ry;
    walkRef.current.target = null;
    walkRef.current.keys = {};
    walkRef.current.input.x = 0;
    walkRef.current.input.y = 0;
  }, [roomId, entry, walkRef]);

  useEffect(() => () => disposeRoomTextures(), []);

  /** Vào kênh hiện diện của ĐÚNG phòng đang đứng: id phòng trong khu phố đã là
   *  chuỗi duy nhất, nên nó dùng thẳng làm khoá kênh. Đổi phòng là rời kênh cũ
   *  và vào kênh mới - người ở hành lang Chặng 3 không thấy người ở tầng CFA,
   *  đúng như trong một toà nhà thật. */
  useEffect(() => {
    if (!userId) return;
    const leave = joinStudyWorld(
      roomId,
      {
        userId,
        name,
        avatarUrl,
        color,
        streak,
        level,
        doneToday,
        gear,
        seat: null,
        seatStartedAt: null,
      },
      setPeers,
      (message: LobbyChatMessage) =>
        setSpeeches((prev) => ({ ...prev, [message.userId]: { text: message.text, at: message.at } }))
    );
    return leave;
  }, [roomId, userId, name, avatarUrl, color, streak, level, doneToday, gear]);

  useEffect(() => {
    peerCountRef.current = peers.length;
    onPeerCount(peers.length);
    onPeersChange(peers.filter((p) => p.userId !== userId).map((p) => ({ x: p.x, z: p.z, color: p.color })));
  }, [peers, onPeerCount, onPeersChange, userId]);

  /** Dọn bong bóng đã hết hạn - để lại thì mỗi người từng nói một câu sẽ giữ
   *  chuỗi đó trong bộ nhớ suốt phiên. */
  useEffect(() => {
    if (Object.keys(speeches).length === 0) return;
    const timer = window.setInterval(() => {
      const now = Date.now();
      setSpeeches((prev) => {
        const next: typeof prev = {};
        let changed = false;
        for (const [id, sp] of Object.entries(prev)) {
          if (now - sp.at < CHAT_BUBBLE_MS) next[id] = sp;
          else changed = true;
        }
        return changed ? next : prev;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [speeches]);

  /** Pose người khác đi vào ref để LobbyAvatar nội suy mỗi khung hình, thay vì
   *  đi qua state và kéo cả cây React render lại 8 lần một giây. */
  const others = useMemo(() => {
    return peers.filter((p) => p.userId !== userId);
  }, [peers, userId]);

  // Đồng bộ Map pose trong EFFECT, không trong useMemo.
  //
  // Bản trước sửa thẳng peerPoseRefs.current bên trong useMemo, và đó là lỗi
  // thật chứ không chỉ là lint đỏ: React được phép vứt kết quả useMemo đi rồi
  // tính lại, hoặc chạy nó mà không commit. Việc thêm/xoá người trong Map là
  // tác dụng phụ, và tác dụng phụ trong useMemo thì chạy bao nhiêu lần cũng
  // được - hoặc không lần nào.
  useEffect(() => {
    const map = peerPoseRefs.current;
    for (const p of others) {
      const ref = map.get(p.userId);
      if (!ref) map.set(p.userId, { current: { x: p.x, z: p.z, ry: p.ry } });
      else ref.current = { x: p.x, z: p.z, ry: p.ry };
    }
    const ids = new Set(others.map((p) => p.userId));
    for (const id of [...map.keys()]) {
      if (!ids.has(id)) map.delete(id);
    }
  }, [others]);

  // Ba nơi ngoài trời: con phố, công viên, quảng trường trung tâm. Chúng dùng
  // chung bầu trời, sương xa và camera nới rộng - nhốt chúng trong ánh sáng
  // phòng kín thì công viên trông như một cái sân trong nhà.
  const outdoor = room.kind === "street" || room.id === "cong-vien" || room.id === "trung-tam";
  const sky = outdoor ? (daylight > 0.5 ? "#7fb2d9" : "#14161f") : "#100e0c";

  return (
    <Canvas
      // Tab ẩn thì ngừng vẽ. Phố nghề là thế giới lớn nhất trong ba cái, nên
      // đây cũng là chỗ một tab nền bỏ quên tốn nhiều nhất.
      frameloop={pageVisible || forceRender ? "always" : "never"}
      shadows={quality.shadows}
      camera={{ position: [entry.x, 3.4, entry.z + 6], fov: 55 }}
      dpr={quality.dpr}
      // Bám theo cùng phép đo máy yếu mà useRenderQuality đang dùng: xin GPU
      // rời trong khi vừa hạ DPR vì máy yếu là tự vô hiệu một nửa cơ chế.
      gl={{
        antialias: baseQuality.shadows,
        powerPreference: baseQuality.shadows ? "high-performance" : "low-power",
      }}
    >
      {/* Đo khung hình thật và hạ chất lượng nếu cảnh không theo kịp. */}
      <QualityGovernor onLevel={onLevel} />
      <color attach="background" args={[sky]} />
      <fog attach="fog" args={[sky, outdoor ? 34 : 20, outdoor ? 95 : 48]} />
      <ambientLight intensity={outdoor ? 0.5 + daylight * 0.45 : 0.5} color="#ffe9cf" />
      <hemisphereLight args={[outdoor ? "#bcd7f0" : "#ffe3bd", "#2a1f16", outdoor ? 0.5 + daylight * 0.4 : 0.5]} />
      <directionalLight
        position={[10, 16, 6]}
        intensity={outdoor ? 0.4 + daylight * 0.9 : 0.7}
        color="#fff3dd"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <DistrictShell
        room={room}
        lessonTitles={lessonTitles}
        doneSlugs={doneSlugs}
        dueSlugs={dueSlugs}
        progressByCategory={progressByCategory as never}
        seatTaken={seatTaken}
      />
      <TargetMarker walkRef={walkRef} accent={room.accent} still={quality.reducedMotion} />

      <LobbyAvatar
        name={name}
        color={color}
        avatarUrl={avatarUrl}
        status={{ streak, level, doneToday }}
        gear={gear}
        speech={selfSpeech}
        poseRef={poseRef}
        isSelf
      />

      {/* Đọc ref lúc render là CẢ THIẾT KẾ ở đây, không phải sơ suất. Vị trí
          người khác về 8 lần một giây; cho chúng đi qua state nghĩa là kéo cả
          cây React render lại 8 lần một giây cho một cảnh 3D. Thay vào đó mỗi
          người có một ref, và LobbyAvatar tự nội suy trong vòng khung hình.

          Ref chưa có thì bỏ qua một khung hình - Map được đồng bộ trong effect
          ở trên, nên người vừa vào phòng xuất hiện ở khung kế tiếp. */}
      {/* eslint-disable-next-line react-hooks/refs -- pose người khác cố ý đi ngoài state */}
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
            gear={p.gear}
            speech={speeches[p.userId] ?? null}
            poseRef={ref}
          />
        );
      })}

      <PlayerRig
        room={room}
        userId={userId}
        peerCountRef={peerCountRef}
        mapPlayerRef={playerRef}
        poseRef={poseRef}
        walkRef={walkRef}
        orbitRef={orbitRef}
        onDeskChange={onDeskChange}
        onDoorChange={onDoorChange}
        onPortalChange={onPortalChange}
        onLiftChange={onLiftChange}
        onStopChange={onStopChange}
        onSeatChange={onSeatChange}
        onStandChange={onStandChange}
        seatTakenRef={seatTakenRef}
        onWalkingChange={onWalkingChange}
      />
    </Canvas>
  );
}

export { createWalkState };
