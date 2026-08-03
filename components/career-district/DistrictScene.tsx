"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  isAtLift,
  type CareerDesk,
  type DistrictRoom,
  type DistrictRoomId,
  type Doorway,
  type Pose,
  type PathStop,
  type RoomPortal,
} from "./district-space";
import {
  ARRIVE_RADIUS,
  createWalkState,
  inputTowardTarget,
  turnToward,
  useWalkKeys,
  worldDirection,
  type WalkState,
} from "@/components/world-controls/easy-walk";
import LobbyAvatar, { type AvatarPose } from "@/components/lobby/LobbyAvatar";
import { disposeRoomTextures } from "@/components/lobby/room-textures";
import { MOVE_BROADCAST_MS } from "@/lib/supabase-lobby";
import {
  joinStudyWorld,
  sendStudyPose,
  type StudyWorldPeer,
} from "@/lib/supabase-study-world";

const WALK_SPEED = 4.4;

export interface OrbitState {
  /** Góc TUYỆT ĐỐI của camera quanh nhân vật, không phải độ lệch so với hướng
   *  nhân vật.
   *
   *  Ở kiểu điều khiển xe tăng thì lưu độ lệch là đúng: hướng nhân vật do người
   *  dùng quyết, camera bám theo. Ở kiểu đi-theo-hướng-nhìn thì ngược lại, và
   *  lưu độ lệch tạo ra một vòng lặp: bấm tới → nhân vật quay theo hướng camera
   *  → camera quay theo nhân vật → hướng "tới" đổi → nhân vật quay tiếp. Nhân
   *  vật tự xoáy tròn và không đi tới đâu. Góc tuyệt đối cắt đứt vòng đó: camera
   *  chỉ đổi khi người dùng kéo. */
  yaw: number;
  pitch: number;
  dist: number;
}

/** Kéo để xoay, lăn để phóng. Bắt trên chính canvas chứ không trên window: HUD
 *  đè lên trên, và kéo từ một cái nút mà camera xoay theo thì bấm nút gần như
 *  không trúng.
 *
 *  Kéo NGẮN không tính là xoay mà tính là một cú chạm - đó là cách "chạm để đi
 *  tới" và "kéo để nhìn quanh" cùng sống trên một mặt phẳng mà không phải chia
 *  màn hình làm hai vùng. */
function usePointerControls(
  orbit: React.MutableRefObject<OrbitState>,
  onTap: (nx: number, ny: number) => void
) {
  const { gl } = useThree();
  useEffect(() => {
    const el = gl.domElement;
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      orbit.current.yaw -= dx * 0.005;
      orbit.current.pitch = THREE.MathUtils.clamp(orbit.current.pitch + dy * 0.004, 0.05, 1.05);
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      // Dưới 8px tổng dịch chuyển thì đây là một cú chạm, không phải cú kéo.
      if (moved < 8) {
        const rect = el.getBoundingClientRect();
        onTap(((e.clientX - rect.left) / rect.width) * 2 - 1, -(((e.clientY - rect.top) / rect.height) * 2 - 1));
      }
    };
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      orbit.current.dist = THREE.MathUtils.clamp(orbit.current.dist + e.deltaY * 0.008, 3, 18);
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
  }, [gl, orbit, onTap]);
}

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
  onWalkingChange: (walking: boolean) => void;
  /** Danh tính để phát vị trí; null là chưa đăng nhập, khi đó không phát gì. */
  userId: string;
  peerCountRef: React.MutableRefObject<number>;
}

function PlayerRig({ room, poseRef, walkRef, orbitRef, onDeskChange, onDoorChange, onPortalChange, onLiftChange, onStopChange, onWalkingChange, userId, peerCountRef }: RigProps) {
  const { camera } = useThree();
  const lastDesk = useRef<string | null>(null);
  const lastDoor = useRef<string | null>(null);
  const lastPortal = useRef<string | null>(null);
  const lastLift = useRef(false);
  const lastStop = useRef<string | null>(null);
  const lastWalking = useRef(false);
  /** Đích bị kẹt: đứng yên mấy khung liền dù đang cố đi thì bỏ đích, thay vì
   *  húc vào tường mãi mãi. */
  const stuckFrames = useRef(0);
  const lastSent = useRef(0);
  const lastSentPose = useRef<AvatarPose>({ x: 0, z: 0, ry: 0 });

  const onTap = useRef<(nx: number, ny: number) => void>(() => {});
  onTap.current = (nx, ny) => {
    // Bắn tia từ camera qua điểm vừa chạm xuống mặt sàn y=0.
    const ray = new THREE.Raycaster();
    ray.setFromCamera(new THREE.Vector2(nx, ny), camera);
    const hit = new THREE.Vector3();
    if (!ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hit)) return;
    walkRef.current.target = { x: hit.x, z: hit.z };
    stuckFrames.current = 0;
  };
  usePointerControls(orbitRef, (nx, ny) => onTap.current(nx, ny));

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
    const atLift = isAtLift(room, pose.x, pose.z);
    if (atLift !== lastLift.current) {
      lastLift.current = atLift;
      onLiftChange(atLift);
    }

    // Camera đứng ở góc người dùng đã chọn, độc lập với hướng nhân vật.
    const angle = orbit.yaw;
    const horizontal = Math.cos(orbit.pitch) * orbit.dist;
    // Giữ camera TRONG phòng. Camera vai thứ ba đứng cách nhân vật ~6m, nên
    // chỉ cần đứng gần tường là nó nằm ngoài bức tường đó - và tường chỉ vẽ
    // một mặt, nên khung hình thành một mảng đen hoặc lộ cả ruột phòng. Kẹp
    // theo khung đi lại của chính phòng, nới ra một chút để camera vẫn lùi
    // được sát tường mà không xuyên qua.
    const margin = room.kind === "street" ? 6 : 0.2;
    const want = new THREE.Vector3(
      THREE.MathUtils.clamp(
        pose.x + Math.sin(angle) * horizontal,
        room.bounds.minX - margin,
        room.bounds.maxX + margin
      ),
      Math.max(0.8, 1.6 + Math.sin(orbit.pitch) * orbit.dist),
      THREE.MathUtils.clamp(
        pose.z + Math.cos(angle) * horizontal,
        room.bounds.minZ - margin,
        room.bounds.maxZ + margin
      )
    );
    camera.position.lerp(want, Math.min(1, delta * 6));

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
    camera.lookAt(pose.x, 1.45, pose.z);
  });

  return null;
}

/** Vòng tròn nhỏ nơi vừa chạm để đi tới - không có nó thì người dùng chạm xong
 *  không biết hệ thống có nhận hay không. */
function TargetMarker({ walkRef, accent }: { walkRef: React.MutableRefObject<WalkState>; accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const target = walkRef.current.target;
    mesh.visible = !!target;
    if (target) {
      mesh.position.set(target.x, 0.05, target.z);
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.12;
      mesh.scale.setScalar(pulse);
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
  streak: number;
  doneToday: boolean;
  onPeerCount: (count: number) => void;
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
  onWalkingChange: (walking: boolean) => void;
  /** Slug bài đã hoàn thành - cột trên hành lang lộ trình sáng theo cái này. */
  doneSlugs: ReadonlySet<string>;
  /** Tiến độ từng nhóm ngành, khắc lên biển hiệu ngoài phố. */
  progressByCategory: Record<string, { done: number; total: number }>;
  /** Ban ngày 1, khuya 0 - quyết định trời và đèn đường. */
  daylight: number;
}

export default function DistrictScene({
  roomId,
  userId,
  streak,
  doneToday,
  onPeerCount,
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
  doneSlugs,
  progressByCategory,
  onWalkingChange,
  daylight,
}: DistrictSceneProps) {
  const room = getRoom(roomId);
  const poseRef = useRef<AvatarPose>({ ...entry });
  const [peers, setPeers] = useState<StudyWorldPeer[]>([]);
  const peerPoseRefs = useRef(new Map<string, React.MutableRefObject<AvatarPose>>());
  const peerCountRef = useRef(0);
  const orbitRef = useRef<OrbitState>({
    yaw: entry.ry,
    pitch: room.kind === "street" ? 0.46 : 0.36,
    dist: room.kind === "street" ? 8.5 : 6,
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
        seat: null,
        seatStartedAt: null,
      },
      setPeers
    );
    return leave;
  }, [roomId, userId, name, avatarUrl, color, streak, level, doneToday]);

  useEffect(() => {
    peerCountRef.current = peers.length;
    onPeerCount(peers.length);
  }, [peers.length, onPeerCount]);

  /** Pose người khác đi vào ref để LobbyAvatar nội suy mỗi khung hình, thay vì
   *  đi qua state và kéo cả cây React render lại 8 lần một giây. */
  const others = useMemo(() => {
    const list = peers.filter((p) => p.userId !== userId);
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
  }, [peers, userId]);

  const outdoor = room.kind === "street";
  const sky = outdoor ? (daylight > 0.5 ? "#7fb2d9" : "#14161f") : "#100e0c";

  return (
    <Canvas
      shadows
      camera={{ position: [entry.x, 3.4, entry.z + 6], fov: 55 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
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
        progressByCategory={progressByCategory as never}
      />
      <TargetMarker walkRef={walkRef} accent={room.accent} />

      <LobbyAvatar
        name={name}
        color={color}
        avatarUrl={avatarUrl}
        status={{ streak: 0, level, doneToday: false }}
        poseRef={poseRef}
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
            poseRef={ref}
          />
        );
      })}

      <PlayerRig
        room={room}
        userId={userId}
        peerCountRef={peerCountRef}
        poseRef={poseRef}
        walkRef={walkRef}
        orbitRef={orbitRef}
        onDeskChange={onDeskChange}
        onDoorChange={onDoorChange}
        onPortalChange={onPortalChange}
        onLiftChange={onLiftChange}
        onStopChange={onStopChange}
        onWalkingChange={onWalkingChange}
      />
    </Canvas>
  );
}

export { createWalkState };
