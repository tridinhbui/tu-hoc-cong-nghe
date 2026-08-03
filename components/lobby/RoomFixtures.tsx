"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ROOM } from "./ReadingRoom";
import { boardTexture } from "./room-textures";
import { getCommunityFeed } from "@/lib/supabase-community";
import { getLeaderboardByMetric } from "@/lib/supabase-user";

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
function StudyGroupPortal({
  playerRef,
  onProximity,
}: {
  playerRef: React.MutableRefObject<{ x: number; z: number }>;
  onProximity: (near: boolean) => void;
}) {
  const glow = useRef<THREE.Mesh>(null);
  const wasNear = useRef(false);
  const z = -ROOM.length / 2 + 0.4;

  useFrame((state) => {
    const p = playerRef.current;
    const near = Math.hypot(p.x - 0, p.z - z) < 4.5;
    if (near !== wasNear.current) {
      wasNear.current = near;
      onProximity(near);
    }
    if (glow.current) {
      const mat = glow.current.material as THREE.MeshBasicMaterial;
      // Nhịp thở chậm để cánh cổng "sống" mà không nhấp nháy gây khó chịu.
      mat.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 1.6) * 0.12 + (near ? 0.25 : 0);
    }
  });

  return (
    <group position={[0, 0, z]}>
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
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.4} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 2, 1.4]} color="#7dd3fc" intensity={6} distance={9} decay={2} />
    </group>
  );
}

export default function RoomFixtures({
  playerRef,
  onPortalProximity,
}: {
  playerRef: React.MutableRefObject<{ x: number; z: number }>;
  onPortalProximity: (near: boolean) => void;
}) {
  const { posts, ranking } = useBoardData();
  const halfW = ROOM.width / 2;

  return (
    <group>
      {/* Bảng tin FinSocial - tường trái, giữa phòng */}
      <WallBoard
        position={[-halfW + 0.3, 4.6, -6]}
        rotation={[0, Math.PI / 2, 0]}
        title="Bảng tin cộng đồng"
        rows={posts}
        accent="#c9a227"
      />

      {/* Bảng xếp hạng - tường phải, đối diện */}
      <WallBoard
        position={[halfW - 0.3, 4.6, -6]}
        rotation={[0, -Math.PI / 2, 0]}
        title="Bảng vàng tuần này"
        rows={ranking}
        accent="#e5b567"
      />

      <StudyGroupPortal playerRef={playerRef} onProximity={onPortalProximity} />
    </group>
  );
}
