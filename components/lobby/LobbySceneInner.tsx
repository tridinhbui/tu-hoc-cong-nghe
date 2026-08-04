"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import ReadingRoom, { ROOM, TABLE_ZS, TABLE_HALF_W, TABLE_HALF_D } from "./ReadingRoom";
import RoomFixtures, { type GateTarget } from "./RoomFixtures";
import RoomProps from "./RoomProps";
import CityStreet from "./CityStreet";
import LibrarySurrounds from "./LibrarySurrounds";
import Rooftop from "./Rooftop";
import { stepWorld, type Floor } from "./world";
import { ROTUNDA_Z } from "./room-obstacles";
import { daylightAt, rgbToHex, sunPosition } from "./daylight";
import StationDoors from "./StationDoors";
import type { Station } from "./stations";
import { useRenderQuality } from "@/components/world-controls/render-quality";
import { usePageVisible } from "@/components/world-controls/use-page-visible";
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
import {
  inputTowardTarget,
  turnToward,
  usePointerControls,
  useWalkKeys,
  worldDirection,
  type WalkState,
} from "@/components/world-controls/easy-walk";
import PomodoroClock from "./PomodoroClock";

/** Giờ hiện tại làm tròn xuống bội số 15 phút, dạng số thập phân (13.75 =
 *  13h45). daylight.ts nhận đúng dạng này. */
function quarterHourNow(): number {
  const now = new Date();
  return now.getHours() + Math.floor(now.getMinutes() / 15) * 0.25;
}

const WALK_SPEED = 4.2;
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

export interface OrbitState {
  /** Góc TUYỆT ĐỐI của camera, không phải độ lệch so với hướng nhân vật.
   *
   *  Đổi từ độ lệch sang tuyệt đối là điều kiện để đi-theo-hướng-nhìn hoạt
   *  động: giữ độ lệch thì bấm tới làm nhân vật quay, nhân vật quay làm camera
   *  quay, camera quay làm "tới" đổi nghĩa - nhân vật xoáy tròn tại chỗ. */
  yaw: number;
  /** Góc chúc xuống. Chặn hai đầu để không lộn qua đỉnh đầu hay chui xuống sàn. */
  pitch: number;
  /** Khoảng cách camera tới nhân vật. */
  dist: number;
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
  const angle = orbit.yaw;
  const horizontal = Math.cos(orbit.pitch) * dist;
  // Mọi cao độ tính TƯƠNG ĐỐI so với chân nhân vật: đứng trên ban công hay
  // dưới lòng phố thì camera vẫn ở ngang vai, không phải ngang sàn tầng trệt.
  const foot = pose.y ?? 0;
  const target = new THREE.Vector3(
    pose.x + Math.sin(angle) * horizontal,
    // Chặn sàn: pitch âm cộng khoảng cách xa sẽ dìm camera xuống dưới nền, và
    // lúc đó nửa dưới khung hình là mặt sau của sàn - một mảng đen. Kẹp ở đây
    // thay vì siết pitch, vì giới hạn thật phụ thuộc cả vào dist.
    foot + Math.max(0.55, 1.5 + Math.sin(orbit.pitch) * dist),
    pose.z + Math.cos(angle) * horizontal
  );
  camera.position.lerp(target, Math.min(1, delta * 6));
  camera.lookAt(pose.x, foot + 1.5, pose.z);
}

/** Mọi logic mỗi-frame của người chơi: đọc phím, di chuyển, chặn tường và bàn,
 *  đẩy camera đuổi theo, và phát vị trí lên kênh chung theo nhịp. */
function PlayerRig({
  userId,
  poseRef,
  walkRef,
  peerCountRef,
  seatedRef,
  onSeatableChange,
  orbitRef,
  floorRef,
}: {
  userId: string;
  poseRef: React.MutableRefObject<AvatarPose>;
  walkRef: React.MutableRefObject<WalkState>;
  peerCountRef: React.MutableRefObject<number>;
  /** Đang ngồi bàn nào; null là đang đứng. Đọc mỗi frame để khoá di chuyển. */
  seatedRef: React.MutableRefObject<number | null>;
  onSeatableChange: (tableId: number | null) => void;
  orbitRef: React.MutableRefObject<OrbitState>;
  /** Tầng đang đứng. Không suy ra được từ toạ độ - xem world.ts. */
  floorRef: React.MutableRefObject<Floor>;
}) {
  const { camera } = useThree();
  usePointerControls(orbitRef, (nx, ny) => {
    // Chạm vào sàn là đi tới đó. Mặt phẳng lấy theo cao độ ĐANG đứng, không
    // phải y=0: đang ở ban công mà chiếu xuống sàn tầng trệt thì cú chạm rơi
    // xuống dưới nhà và nhân vật đi về phía lan can.
    const ray = new THREE.Raycaster();
    ray.setFromCamera(new THREE.Vector2(nx, ny), camera);
    const hit = new THREE.Vector3();
    const y = poseRef.current.y ?? 0;
    if (!ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -y), hit)) return;
    walkRef.current.target = { x: hit.x, z: hit.z };
  }, { min: 2.2, max: 16 });
  const lastSent = useRef(0);
  const lastSentPose = useRef<AvatarPose>({ x: 0, z: 0, ry: 0 });
  const lastSeatable = useRef<number | null>(null);

  useFrame((state, delta) => {
    const walk = walkRef.current;
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

    // Đi theo hướng nhìn, cùng bộ điều khiển với phòng nhóm và Phố nghề: bước
    // qua cổng sang thế giới khác không phải học lại cách đi.
    let input = walk.input;
    if (walk.target) {
      const auto = inputTowardTarget(walk.target, pose.x, pose.z, orbitRef.current.yaw);
      if (!auto) walk.target = null;
      else if (Math.hypot(walk.input.x, walk.input.y) < 0.08) input = auto;
    }
    const dir = worldDirection(input, orbitRef.current.yaw);
    if (dir) {
      const nx = pose.x + dir.x * WALK_SPEED * delta;
      const nz = pose.z + dir.z * WALK_SPEED * delta;
      const solved = stepWorld({ x: pose.x, z: pose.z }, nx, nz, floorRef.current, BODY_RADIUS);
      pose.x = solved.x;
      pose.z = solved.z;
      floorRef.current = solved.floor;
      // Bám cao độ mượt thay vì nhảy cóc từng bậc: bậc thang cao 0,36 và một cú
      // dịch tức thời mỗi bậc làm camera giật suốt cả đoạn leo.
      const cur = pose.y ?? 0;
      pose.y = cur + (solved.y - cur) * Math.min(1, delta * 12);
      pose.ry = turnToward(pose.ry, dir.x, dir.z, delta);
    }

    // Báo ra ngoài khi bước vào/ra tầm một cái bàn, để HUD hiện nút ngồi.
    // So với lần trước rồi mới gọi: đây là useFrame, gọi setState mỗi khung
    // hình sẽ re-render cả cây React 60 lần/giây.
    const seatable = floorRef.current === 0 ? nearestSeatableTable(pose.x, pose.z) : null;
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
      sendPose(userId, { x: pose.x, z: pose.z, y: pose.y ?? 0, ry: pose.ry });
    }
  });

  return null;
}

/** Đưa vị trí người chơi ra ngoài Canvas mỗi frame, để RoomFixtures đo khoảng
 *  cách tới cổng mà không cần chính nó nằm trong cây R3F của PlayerRig. */
function PlayerPositionTap({
  poseRef,
  floorRef,
  out,
}: {
  poseRef: React.MutableRefObject<AvatarPose>;
  floorRef: React.MutableRefObject<Floor>;
  out: React.MutableRefObject<{ x: number; z: number; floor: Floor }>;
}) {
  useFrame(() => {
    out.current.x = poseRef.current.x;
    out.current.z = poseRef.current.z;
    out.current.floor = floorRef.current;
  });
  return null;
}

interface Props {
  identity: LobbyIdentity;
  onChatMessage: (message: LobbyChatMessage) => void;
  onPortalProximity: (target: GateTarget | null) => void;
  /** Câu nói của chính mình, do HUD đẩy xuống khi bấm gửi. */
  selfSpeech: { text: string; at: number } | null;
  onPeerCount: (count: number) => void;
  /** Bàn đang đứng cạnh (null nếu không), để HUD hiện nút "Ngồi xuống học". */
  onSeatableChange: (tableId: number | null) => void;
  /** Cửa phòng học đang đứng trước, để HUD hiện thẻ công thức + nút vào phòng. */
  onStationNear: (station: Station | null) => void;
  /** Bàn đang ngồi; do HUD điều khiển qua sit/stand. */
  seatedTable: number | null;
  seatStartedAt: number | null;
  /** Ý định di chuyển. Sở hữu ở LobbyClient vì cần điều khiển nằm ngoài Canvas
   *  và phải ghi vào đúng vector mà vòng lặp vẽ trong này đọc. */
  walkRef: React.MutableRefObject<WalkState>;
}

export default function LobbySceneInner({
  identity,
  onChatMessage,
  onPortalProximity,
  selfSpeech,
  onPeerCount,
  onSeatableChange,
  onStationNear,
  seatedTable,
  seatStartedAt,
  walkRef,
}: Props) {
  const quality = useRenderQuality();
  const pageVisible = usePageVisible();
  const [peers, setPeers] = useState<LobbyPeer[]>([]);
  const [speeches, setSpeeches] = useState<Record<string, { text: string; at: number }>>({});

  // Xuất phát trong sảnh tròn ở đầu nam, quay mặt vào phòng.
  //
  // ry=0 là nhìn về -z, và camera bám ở phía +z sau lưng - tức là ngoài hiên,
  // nhìn qua ô cửa vào trong. Trước đây spawn quay ry=PI nên camera nằm giữa
  // phòng chĩa ngược ra tường, và quả địa cầu che kín khung hình.
  // Chỗ xuất hiện phải chọn theo CAMERA chứ không theo nhân vật: camera bám
  // cách sau lưng 5,6 đơn vị, nên đứng đâu cũng phải hỏi "phía sau chỗ đó có
  // gì". Đứng giữa sảnh tròn thì quả địa cầu lọt vào đúng giữa camera và nhân
  // vật; lùi hẳn ra cửa thì camera rơi ra ngoài hiên. Lệch sang bên một chút và
  // lùi khỏi tâm sảnh là chỗ duy nhất thoả cả hai.
  const spawnX = 2.8;
  const spawnZ = ROTUNDA_Z - 3.2;
  const selfPose = useRef<AvatarPose>({ x: spawnX, z: spawnZ, y: 0, ry: 0 });
  const playerPos = useRef<{ x: number; z: number; floor: Floor }>({ x: spawnX, z: spawnZ, floor: 0 });
  const peerPoseRefs = useRef(new Map<string, React.MutableRefObject<AvatarPose>>());
  const peerCountRef = useRef(0);
  const seatedRef = useRef<number | null>(null);
  const floorRef = useRef<Floor>(0);
  // Góc nhìn mặc định: hơi chếch từ trên xuống, sau lưng nhân vật.
  const orbitRef = useRef<OrbitState>({ yaw: Math.PI, pitch: 0.4, dist: 5.6 });

  /** Giờ thật của người học, làm tròn tới 15 phút. Không cần mịn hơn: mỗi lần
   *  đổi là dựng lại vân bầu trời, và mắt không thấy được chênh lệch giữa 14h02
   *  với 14h07. Mốc 15 phút cũng chặn số vân sinh ra trong một phiên ở mức 4
   *  cái mỗi giờ ngồi. */
  const [hour, setHour] = useState(() => quarterHourNow());
  useEffect(() => {
    const timer = window.setInterval(() => setHour(quarterHourNow()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const day = useMemo(() => daylightAt(hour), [hour]);
  const sun = useMemo(() => sunPosition(hour), [hour]);

  useWalkKeys(walkRef);

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
    // Chạy suốt phiên, không phụ thuộc `speeches`. Để `speeches` trong deps thì
    // mỗi câu chat lại huỷ và dựng lại interval, nên bong bóng nói lúc sống 1
    // giây lúc gần 2 giây tuỳ ai vừa nói - và dọn dẹp chính là thứ không nên
    // phụ thuộc vào việc có người nói hay không.
  }, []);

  // Pose của người khác đi vào ref để LobbyAvatar nội suy mỗi frame.
  const others = useMemo(() => {
    const list = peers.filter((p) => p.userId !== identity.userId);
    for (const p of list) {
      let ref = peerPoseRefs.current.get(p.userId);
      if (!ref) {
        ref = { current: { x: p.x, z: p.z, y: p.y ?? 0, ry: p.ry } };
        peerPoseRefs.current.set(p.userId, ref);
      } else {
        ref.current = { x: p.x, z: p.z, y: p.y ?? 0, ry: p.ry };
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
      shadows={quality.shadows}
      camera={{ position: [spawnX, 3.4, spawnZ + 6], fov: 55 }}
      // Trần giới hạn DPR: màn Retina 3x không cần render 3x cho một sảnh xã
      // giao, và đây là khác biệt lớn nhất giữa mát máy và cháy quạt.
      dpr={quality.dpr}
      // Chất lượng thấp là người dùng đang nói máy của họ không kham nổi, nên
      // xin GPU rời và bật khử răng cưa lúc đó là đi ngược lại đúng cái họ vừa
      // chọn - trên laptop nó còn ép chuyển sang card rời và ăn pin.
      gl={{
        antialias: quality.shadows,
        powerPreference: quality.shadows ? "high-performance" : "low-power",
      }}
      // Đứng ở tab khác mà vẫn render cả một con phố là đốt pin cho một khung
      // hình không ai nhìn. Người bên cạnh vẫn thấy ta đứng yên trong phòng vì
      // presence do Supabase giữ, không do vòng lặp vẽ.
      frameloop={pageVisible ? "always" : "never"}
    >
      <color attach="background" args={[rgbToHex(day.fogColor)]} />
      {/* Sương đẩy xa hơn phiên bản chỉ-có-phòng-đọc: giữ được chiều sâu hun
          hút của sảnh nhưng không nuốt mất dãy nhà bên kia đường. Màu sương
          theo giờ, nếu không thì buổi trưa cả con phố vẫn phủ một lớp nâu tối. */}
      <fog attach="fog" args={[rgbToHex(day.fogColor), 34, 130]} />
      <ambientLight intensity={day.ambientIntensity} color={rgbToHex(day.ambientColor)} />
      <directionalLight
        position={sun}
        intensity={day.sunIntensity}
        color={rgbToHex(day.sunColor)}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <ReadingRoom day={day} />
      <RoomProps />
      <CityStreet day={day} />
      {/* Hai hẻm hông và sân sau - phần còn lại của vòng 360 độ quanh thư viện. */}
      <LibrarySurrounds day={day} />
      {/* Sân thượng: cốt thứ ba, leo từ đầu bắc ban công. */}
      <Rooftop day={day} />
      <RoomFixtures playerRef={playerPos} onPortalProximity={onPortalProximity} />
      <StationDoors playerRef={playerPos} onNearChange={onStationNear} />

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
        gear={identity.gear}
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
            gear={p.gear}
            poseRef={ref}
          />
        );
      })}

      <PlayerRig
        userId={identity.userId}
        poseRef={selfPose}
        walkRef={walkRef}
        peerCountRef={peerCountRef}
        seatedRef={seatedRef}
        onSeatableChange={onSeatableChange}
        orbitRef={orbitRef}
        floorRef={floorRef}
      />
      <PlayerPositionTap poseRef={selfPose} floorRef={floorRef} out={playerPos} />
    </Canvas>
  );
}

export { colorForUser };
