"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ROOM } from "./ReadingRoom";
import { ROTUNDA_Z } from "./room-obstacles";
import { boardTexture } from "./room-textures";
import { getCommunityFeed } from "@/lib/supabase-community";
import { getLeaderboardByMetric } from "@/lib/supabase-user";
import { useI18n } from "@/lib/i18n/context";

/** Ba thứ có thể tới xem trong sảnh. Trước đó phòng chỉ có bàn ghế, nên đi hết
 *  chiều dài rồi quay lại là hết việc - không có lý do nào để đi đâu cả.
 *
 *  Tất cả đều CHỈ ĐỌC và dựng một lần lúc vào phòng. Bảng tin không cần
 *  realtime: người ta vào đây để gặp nhau, không phải để theo dõi feed, và
 *  một kênh realtime nữa cho mấy dòng chữ trên tường là cái giá sai. */

const BOARD_REFRESH_MS = 120_000;

function useBoardData() {
  const [posts, setPosts] = useState<string[]>([]);
  const [ranking, setRanking] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const [feed, top] = await Promise.all([
        getCommunityFeed(undefined, 8).catch(() => []),
        getLeaderboardByMetric("xp", 8).catch(() => []),
      ]);
      if (cancelled) return;
      setPosts(
        feed.map((p) => {
          const who = p.user_name || "Người học";
          const what = (p.content || "").replace(/\s+/g, " ").trim();
          return `${who}: ${what}`;
        })
      );
      setRanking(top.map((r, i) => `${i + 1}.  ${r.name}  —  ${r.value.toLocaleString("vi-VN")} XP`));
    };

    void load();
    const timer = window.setInterval(load, BOARD_REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return { posts, ranking };
}

/** Bảng treo tường: khung gỗ + mặt bảng vẽ bằng canvas. */
function WallBoard({
  position,
  rotation,
  title,
  rows,
  accent,
  width = 5.4,
  height = 3.6,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  rows: string[];
  accent?: string;
  width?: number;
  height?: number;
}) {
  const texture = useMemo(
    () => boardTexture(title, rows, { accent, width: 768, height: 512 }),
    [title, rows, accent]
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
 *  trong vùng". */
export interface GateTarget {
  id: string;
  href: string;
  label: string;
  accent: string;
}

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
const GATE_STUDY: GateTarget = {
  id: "nhom-hoc",
  href: "/nhom-hoc",
  label: "Bước qua cổng → vào Nhóm học",
  accent: "#7dd3fc",
};

const GATE_DISTRICT: GateTarget = {
  id: "pho-nghe",
  href: "/pho-nghe",
  label: "Bước qua cổng → ra Phố nghề",
  accent: "#fbbf24",
};

export default function RoomFixtures({
  playerRef,
  onPortalProximity,
}: {
  playerRef: React.MutableRefObject<{ x: number; z: number }>;
  onPortalProximity: (target: GateTarget | null) => void;
}) {
  const { t } = useI18n();
  const { posts, ranking } = useBoardData();
  const halfW = ROOM.width / 2;

  return (
    <group>
      {/* Bảng tin FinSocial - tường trái, giữa phòng. Hạ xuống dưới cốt 6,4:
          phía trên là sàn ban công, treo cao hơn là bảng nằm sau gầm sàn. */}
      <WallBoard
        position={[-halfW + 0.3, 3.5, -6]}
        rotation={[0, Math.PI / 2, 0]}
        title={t.miscUi.roomFixtures.communityBoard}
        rows={posts}
        accent="#c9a227"
      />

      {/* Bảng xếp hạng - treo trên tầng hai. Đặt ở đây chứ không đối diện bảng
          tin dưới sàn là có chủ ý: ban công cần một lý do để leo lên, và "muốn
          xem mình đứng thứ mấy tuần này" là lý do rẻ nhất mà vẫn thật. */}
      <WallBoard
        position={[halfW - 0.3, 8.4, 6]}
        rotation={[0, -Math.PI / 2, 0]}
        title={t.miscUi.roomFixtures.weeklyLeaderboard}
        rows={ranking}
        accent="#e5b567"
      />

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
