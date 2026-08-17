"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ROOM } from "./ReadingRoom";
import { ROTUNDA_Z } from "./room-obstacles";
import { boardTexture } from "./room-textures";
import { getCommunityFeed } from "@/lib/supabase-community";
import { getLeaderboardByMetric, type LeaderboardMetric } from "@/lib/supabase-user";
import { useI18n } from "@/lib/i18n/context";
import { gatesOf, type GateTarget } from "./gates";
import type { Dictionary } from "@/lib/i18n";

/** Ba thứ có thể tới xem trong sảnh. Trước đó phòng chỉ có bàn ghế, nên đi hết
 *  chiều dài rồi quay lại là hết việc - không có lý do nào để đi đâu cả.
 *
 *  Tất cả đều CHỈ ĐỌC và dựng một lần lúc vào phòng. Bảng tin không cần
 *  realtime: người ta vào đây để gặp nhau, không phải để theo dõi feed, và
 *  một kênh realtime nữa cho mấy dòng chữ trên tường là cái giá sai. */

/** Mười phút, và bỏ qua khi tab đang ẩn.
 *
 *  Trước đây là 2 phút với 2 truy vấn. Giờ có 4 bảng xếp hạng nên mỗi nhịp là
 *  5 truy vấn Supabase, cho mỗi tab sảnh đang mở - ở nhịp cũ là 150 truy vấn
 *  mỗi giờ cho một người ngồi yên trong phòng đọc. Nội dung trên tường là bảng
 *  tin cộng đồng và thứ hạng tuần: không thứ nào đổi trong hai phút, và không
 *  ai đứng nhìn một tấm bảng gỗ chờ nó nhảy số.
 *
 *  Bỏ qua lúc tab ẩn là phần quan trọng hơn con số: một tab sảnh bị bỏ quên
 *  trong nền vốn chạy mãi, và đó mới là chỗ tiêu nhiều nhất - người dùng không
 *  nhìn, nhưng hoá đơn vẫn tính. */
const BOARD_REFRESH_MS = 600_000;

/** Ba bảng xếp hạng ngoài XP. XP tách riêng vì nó đã có sẵn từ trước và giữ
 *  nguyên cách định dạng cũ.
 *
 *  "Huy hiệu" từng là bảng thứ tư và đã bị gỡ cùng lúc với tab cùng tên: chỉ số
 *  ấy chặn trên ở 5 - đúng bằng số huy hiệu cấp mà lib/badges.ts định nghĩa,
 *  trong khi lib/levels.ts có 15 cấp - nên mọi người từ level 6 trở lên đều
 *  hiện đúng một con số. Một tấm bảng mà ai cũng bằng nhau thì không xếp hạng
 *  cái gì cả.
 *
 *  Mỗi hạng mục có đơn vị riêng, và đơn vị là thứ nói cho người đọc biết bảng
 *  này xếp theo cái gì: "87" một mình không phân biệt được điểm quiz với số
 *  bài đã học. */
const METRIC_BOARDS: {
  metric: LeaderboardMetric;
  title: (t: Dictionary) => string;
  format: (value: number, t: Dictionary) => string;
}[] = [
  {
    metric: "lessons",
    title: (t) => t.lobbyLeaderboards.lessonsTitle,
    format: (v, t) => `${v} ${t.lobbyLeaderboards.unitLessons}`,
  },
  {
    metric: "avg_score",
    title: (t) => t.lobbyLeaderboards.avgScoreTitle,
    format: (v) => `${Math.round(v)}%`,
  },
  {
    metric: "streak",
    title: (t) => t.lobbyLeaderboards.streakTitle,
    format: (v, t) => `${v} ${t.lobbyLeaderboards.unitStreak}`,
  },
];

function useBoardData(t: Dictionary) {
  const [posts, setPosts] = useState<string[]>([]);
  const [ranking, setRanking] = useState<string[]>([]);
  /** Ba bảng còn lại, theo đúng thứ tự METRIC_BOARDS. */
  const [otherBoards, setOtherBoards] = useState<string[][]>([[], [], []]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const [feed, top, ...rest] = await Promise.all([
        getCommunityFeed(undefined, 8).catch(() => []),
        getLeaderboardByMetric("xp", 8).catch(() => []),
        ...METRIC_BOARDS.map((b) => getLeaderboardByMetric(b.metric, 8).catch(() => [])),
      ]);
      if (cancelled) return;
      setOtherBoards(
        rest.map((rows, i) =>
          rows.map((r, j) => `${j + 1}.  ${r.name}  —  ${METRIC_BOARDS[i].format(r.value, t)}`)
        )
      );
      setPosts(
        feed.map((p) => {
          const who = p.user_name || t.miscUi.defaultLearner;
          const what = (p.content || "").replace(/\s+/g, " ").trim();
          return `${who}: ${what}`;
        })
      );
      setRanking(top.map((r, i) => `${i + 1}.  ${r.name}  —  ${r.value.toLocaleString("vi-VN")} XP`));
    };

    void load();
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, BOARD_REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return { posts, ranking, otherBoards };
}

/** Bảng treo tường: khung gỗ + mặt bảng vẽ bằng canvas. */
function WallBoard({
  position,
  rotation,
  title,
  rows,
  emptyText,
  accent,
  width = 5.4,
  height = 3.6,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  rows: string[];
  /** Chữ hiện khi bảng chưa có hàng nào. Truyền vào chứ không đọc từ điển ở
   *  đây: `boardTexture` vẽ lên canvas nên nó không phải React, và WallBoard
   *  cũng không có `t` trong tầm - chỉ nơi gọi mới có. */
  emptyText: string;
  accent?: string;
  width?: number;
  height?: number;
}) {
  // Sub-component, nên có useI18n() riêng.
  const { t } = useI18n();
  const texture = useMemo(
    () => boardTexture(title, rows, { accent, width: 768, height: 512, emptyText }),
    [title, rows, accent, emptyText]
  );
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[width + 0.34, height + 0.34, 0.12]} />
        <meshStandardMaterial color="#4a3220" roughness={0.7} />
      </mesh>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Cổng vào nhóm học ở đầu bắc. Đứng gần thì phát tín hiệu ra ngoài để HUD
 *  hiện lời mời - việc điều hướng để React lo, cảnh 3D chỉ báo "đang đứng
 *  trong vùng".
 *
 *  Danh sách cổng và kiểu `GateTarget` sống ở `./gates` chứ không ở đây, để
 *  bảng chỉ đường trên HUD đọc được mà không kéo `three` theo. Xuất lại ở đây
 *  cho những chỗ đã quen `import ... from "./RoomFixtures"`. */
export type { GateTarget };

/** Một cánh cổng sang thế giới 3D khác.
 *
 *  Trước đây đây là StudyGroupPortal, gắn cứng vào một đích duy nhất và báo ra
 *  ngoài bằng một biến boolean. Có cổng thứ hai là biến ấy không đủ nữa: HUD
 *  phải biết đang đứng trước cổng NÀO, không phải đang đứng trước một cổng nào
 *  đó. Nên nó nhận đích và trả về đích. */
function Gate({
  playerRef,
  onProximity,
  target,
  position,
  rotationY = 0,
}: {
  playerRef: React.MutableRefObject<{ x: number; z: number }>;
  onProximity: (target: GateTarget | null) => void;
  target: GateTarget;
  position: [number, number, number];
  rotationY?: number;
}) {
  const glow = useRef<THREE.Mesh>(null);
  const wasNear = useRef(false);
  const [gx, , z] = position;

  useFrame((state) => {
    const p = playerRef.current;
    const near = Math.hypot(p.x - gx, p.z - z) < 4.5;
    if (near !== wasNear.current) {
      wasNear.current = near;
      onProximity(near ? target : null);
    }
    if (glow.current) {
      const mat = glow.current.material as THREE.MeshBasicMaterial;
      // Nhịp thở chậm để cánh cổng "sống" mà không nhấp nháy gây khó chịu.
      mat.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 1.6) * 0.12 + (near ? 0.25 : 0);
    }
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* khung vòm */}
      <mesh position={[-1.7, 1.9, 0]}>
        <boxGeometry args={[0.36, 3.8, 0.5]} />
        <meshStandardMaterial color="#6b4a2f" roughness={0.7} />
      </mesh>
      <mesh position={[1.7, 1.9, 0]}>
        <boxGeometry args={[0.36, 3.8, 0.5]} />
        <meshStandardMaterial color="#6b4a2f" roughness={0.7} />
      </mesh>
      <mesh position={[0, 3.95, 0]}>
        <boxGeometry args={[3.76, 0.4, 0.5]} />
        <meshStandardMaterial color="#6b4a2f" roughness={0.7} />
      </mesh>
      {/* ánh sáng trong khung cửa */}
      <mesh ref={glow} position={[0, 1.9, 0.12]}>
        <planeGeometry args={[3.2, 3.7]} />
        <meshBasicMaterial color={target.accent} transparent opacity={0.4} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 2, 1.4]} color={target.accent} intensity={6} distance={9} decay={2} />
    </group>
  );
}

/** Hai cánh cổng của phòng đọc: đầu bắc sang phòng học nhóm, tường tây cạnh
 *  sảnh tròn sang Phố nghề. Đặt hai đầu đối nhau để không ai đi nhầm, và cổng
 *  Phố nghề nằm ngay chỗ người chơi xuất hiện - thứ đầu tiên nhìn thấy khi vào
 *  thư viện là còn một thành phố nữa ở ngoài kia. */
// Labels come from the dictionary at render time; module scope has no
// useI18n() to call, so ./gates keeps only the ids/hrefs/accents and fills
// the label in from the dictionary handed to gatesOf().
function gateStudy(t: Dictionary): GateTarget {
  return gatesOf(t)[0];
}

function gateDistrict(t: Dictionary): GateTarget {
  return gatesOf(t)[1];
}

export default function RoomFixtures({
  playerRef,
  onPortalProximity,
}: {
  playerRef: React.MutableRefObject<{ x: number; z: number }>;
  onPortalProximity: (target: GateTarget | null) => void;
}) {
  const { t } = useI18n();
  const { posts, ranking, otherBoards } = useBoardData(t);
  const halfW = ROOM.width / 2;
  const GATE_STUDY = gateStudy(t);
  const GATE_DISTRICT = gateDistrict(t);

  return (
    <group>
      {/* Bảng tin Bảng tin - tường trái, giữa phòng. Hạ xuống dưới cốt 6,4:
          phía trên là sàn ban công, treo cao hơn là bảng nằm sau gầm sàn. */}
      <WallBoard
        position={[-halfW + 0.3, 3.5, -6]}
        rotation={[0, Math.PI / 2, 0]}
        title={t.miscUi.roomFixtures.communityBoard}
        rows={posts}
        emptyText={t.miscUi.canvasBoard.empty}
        accent="#c9a227"
      />

      {/* Năm bảng xếp hạng, cả năm ở TẦNG TRỆT dọc tường đông.
      
          Trước đây chỉ có một bảng (XP) và nó treo trên ban công tầng hai, với
          lý do là "ban công cần một lý do để leo lên". Lý do ấy không còn: ban
          công giờ có tám cửa phòng học, mỗi cửa khắc một công thức thật - thừa
          sức giữ chân người leo lên. Còn bảng xếp hạng thì ngược lại, nó thuộc
          về chỗ đông người đi qua.
      
          Và bốn hạng mục kia trước đây không có đường nào tới được: trang bảng
          xếp hạng không được nhắc ở bất kỳ đâu trong app - không nav, không
          link, không router.push. Ai muốn xem hạng theo số bài học hay chuỗi
          ngày chỉ còn cách gõ thẳng địa chỉ.
      
          Cách nhau 9 đơn vị dọc chiều dài 56 của phòng: đủ xa để đứng đọc một
          bảng thì bảng bên cạnh không chen vào khung hình, đủ gần để đi dọc
          tường là thấy hết bốn cái. */}
      {[
        { title: t.lobbyLeaderboards.xpTitle, rows: ranking, accent: "#e5b567" },
        ...METRIC_BOARDS.map((board, i) => ({
          title: board.title(t),
          rows: otherBoards[i] ?? [],
          accent: ["#7dd3fc", "#86efac", "#fca5a5", "#c4b5fd"][i],
        })),
      ].map((board, i) => (
        <WallBoard
          key={board.title}
          position={[halfW - 0.3, 3.5, -18 + i * 9]}
          rotation={[0, -Math.PI / 2, 0]}
          title={board.title}
          emptyText={t.miscUi.canvasBoard.empty}
          rows={board.rows.length > 0 ? board.rows : [t.lobbyLeaderboards.empty]}
          accent={board.accent}
        />
      ))}

      <Gate
        playerRef={playerRef}
        onProximity={onPortalProximity}
        target={GATE_STUDY}
        position={[0, 0, -ROOM.length / 2 + 0.4]}
      />
      <Gate
        playerRef={playerRef}
        onProximity={onPortalProximity}
        target={GATE_DISTRICT}
        position={[-halfW + 0.4, 0, ROTUNDA_Z]}
        rotationY={Math.PI / 2}
      />
    </group>
  );
}
