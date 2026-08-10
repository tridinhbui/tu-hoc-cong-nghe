"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { nameplateTexture, speechBubbleTexture, type NameplateStatus } from "./room-textures";
import { CHAT_BUBBLE_MS, MOVE_BROADCAST_MS } from "@/lib/supabase-lobby";
import { makeIntervalTracker, smoothingFactor } from "@/lib/lobby-pose-net";
import AvatarGear from "./AvatarGear";
import { type CharacterEquipments } from "@/lib/rpg-items";
import { useI18n } from "@/lib/i18n/context";

/** Hình người tối giản: đầu - thân - hai tay hai chân đánh lắc khi bước.
 *  Không tải model GLB nào cả: một hình khối rõ ràng, chạy mượt với vài chục
 *  người trong phòng, quan trọng hơn một model đẹp làm nghẽn GPU. */

export interface AvatarPose {
  x: number;
  z: number;
  /** Cao độ chân. Bỏ trống nghĩa là đứng trên sàn tầng trệt. */
  y?: number;
  ry: number;
}

interface Props {
  name: string;
  color: string;
  avatarUrl?: string | null;
  /** Chuỗi ngày, cấp độ, hôm nay đã học chưa - khắc thẳng lên biển tên. */
  status?: NameplateStatus;
  /** Đang ngồi học: hạ người xuống ghế và ngừng đánh tay chân. */
  seated?: boolean;
  /** Câu đang nói; null là không có bong bóng. Đổi tham chiếu là bong bóng mới. */
  speech?: { text: string; at: number } | null;
  /** Đọc pose mỗi frame từ ref thay vì props: vị trí đổi 60 lần/giây, đi qua
   *  setState sẽ re-render cả cây React từng ấy lần. */
  poseRef: React.MutableRefObject<AvatarPose>;
  isSelf?: boolean;
  /** Đồ đang trang bị. Đi kèm presence nên người khác cũng thấy - đó mới là
   *  lý do người ta mua đồ trang trí. */
  gear?: CharacterEquipments | null;
  /** Vẽ mờ: người này thuộc phòng nhưng đang không online. */
  ghost?: boolean;
}

/** Ảnh đại diện dán lên mặt. Ảnh nằm ở miền khác (Supabase storage, Google),
 *  nên cần crossOrigin - thiếu nó thì WebGL từ chối texture vì canvas bị coi
 *  là "tainted". Hỏng thì trả null và nhân vật giữ khuôn mặt trơn, không phải
 *  lý do để cả căn phòng không dựng được. */
function useAvatarTexture(url?: string | null) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!url) {
      setTexture(null);
      return;
    }
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      url,
      (t) => {
        if (cancelled) {
          t.dispose();
          return;
        }
        t.colorSpace = THREE.SRGBColorSpace;
        setTexture(t);
      },
      undefined,
      () => {
        // Ảnh hỏng hoặc bị chặn CORS - im lặng dùng mặt trơn.
        if (!cancelled) setTexture(null);
      }
    );
    return () => {
      cancelled = true;
    };
  }, [url]);

  useEffect(() => () => texture?.dispose(), [texture]);
  return texture;
}

export default function LobbyAvatar({
  name,
  color,
  avatarUrl,
  status,
  seated = false,
  speech,
  poseRef,
  isSelf = false,
  gear,
  ghost = false,
}: Props) {
  const { t } = useI18n();
  const root = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Mesh>(null);
  const rightArm = useRef<THREE.Mesh>(null);
  const leftLeg = useRef<THREE.Mesh>(null);
  const rightLeg = useRef<THREE.Mesh>(null);
  const bubbleGroup = useRef<THREE.Group>(null);
  const walkPhase = useRef(0);
  const lastPos = useRef(new THREE.Vector2());
  // Nhịp gói đến THẬT của người này. Không dùng thẳng MOVE_BROADCAST_MS vì cả
  // ba cảnh tự giãn nhịp gấp đôi khi phòng đông, và gói tin không nói ra điều
  // đó - xem makeIntervalTracker.
  const arrival = useRef(makeIntervalTracker(MOVE_BROADCAST_MS));
  const lastTarget = useRef({ x: 0, z: 0, ry: 0 });

  const nameTex = useMemo(
    () => nameplateTexture(name, status, { doneToday: t.lobby.plateDoneToday, notYet: t.lobby.plateNotYet }),
    [name, status?.streak, status?.level, status?.doneToday, t.lobby.plateDoneToday, t.lobby.plateNotYet]
  );
  useEffect(() => () => nameTex.dispose(), [nameTex]);
  const shirt = useMemo(() => new THREE.Color(color), [color]);
  const face = useAvatarTexture(avatarUrl);

  const bubble = useMemo(() => {
    if (!speech?.text) return null;
    return speechBubbleTexture(speech.text);
  }, [speech?.text, speech?.at]);

  useEffect(() => () => bubble?.texture.dispose(), [bubble]);

  useFrame((state, delta) => {
    const g = root.current;
    if (!g) return;
    const pose = poseRef.current;

    // Ngồi thì hạ cả thân xuống ~0.45 và gập chân - không có xương nên "ngồi"
    // ở đây là hạ độ cao cộng gập đùi, đủ để nhìn từ xa phân biệt được ai đang
    // học và ai chỉ đứng cạnh bàn. Chuyển mượt thay vì nhảy cóc một khung hình.
    const seatDrop = (seated ? -0.42 : 0) + (pose.y ?? 0);
    g.position.y += (seatDrop - g.position.y) * Math.min(1, delta * 8);

    if (isSelf) {
      // Nhân vật của mình bám pose tức thời - trễ ở đây cảm giác như lag input.
      g.position.x = pose.x;
      g.position.z = pose.z;
      g.rotation.y = pose.ry;
    } else {
      // Người khác chỉ gửi 5 gói/giây; nội suy để bước đi liền mạch.
      //
      // Hệ số suy TỪ nhịp gửi, không phải hằng số. Chỗ này từng là
      // `Math.min(1, delta * 10)` - hằng thời gian khoảng 100ms, vừa khớp nhịp
      // 120ms cũ nên nhân vật luôn đang trên đường đi. Giữ nguyên nó mà giãn
      // nhịp lên 200ms thì nhân vật tới đích sau ~100ms rồi ĐỨNG YÊN 100ms nữa
      // mới có gói mới: không phải "hơi trễ" mà là đi-dừng-đi-dừng, và người
      // dùng sẽ kết luận là mạng lag chứ không phải một hằng số đặt sai.
      // Đích đổi = gói mới tới. Đó là tín hiệu duy nhất có ở đây: pose đi vào
      // qua một ref, không có sự kiện nào kèm theo.
      if (
        pose.x !== lastTarget.current.x ||
        pose.z !== lastTarget.current.z ||
        pose.ry !== lastTarget.current.ry
      ) {
        lastTarget.current = { x: pose.x, z: pose.z, ry: pose.ry };
        arrival.current.sample(state.clock.elapsedTime * 1000);
      }
      const k = smoothingFactor(delta, arrival.current.intervalMs);
      g.position.x += (pose.x - g.position.x) * k;
      g.position.z += (pose.z - g.position.z) * k;
      let dry = pose.ry - g.rotation.y;
      // quay theo cung ngắn
      if (dry > Math.PI) dry -= Math.PI * 2;
      if (dry < -Math.PI) dry += Math.PI * 2;
      g.rotation.y += dry * k;
    }

    // Đánh tay chân theo tốc độ thật sự di chuyển được, không theo phím bấm -
    // nhờ vậy nhân vật người khác cũng bước đúng nhịp dù ta không biết phím họ.
    const speed = lastPos.current.distanceTo(new THREE.Vector2(g.position.x, g.position.z)) / Math.max(delta, 1e-4);
    lastPos.current.set(g.position.x, g.position.z);
    const target = seated ? 0 : speed > 0.3 ? 9 : 0;
    walkPhase.current += delta * target;
    const swing = seated ? 0 : Math.sin(walkPhase.current) * Math.min(0.7, speed * 0.28);
    // Ngồi: đùi gập ra trước một góc cố định, tay buông trên mặt bàn.
    const legRest = seated ? -1.15 : 0;
    const armRest = seated ? -0.55 : 0;
    if (leftArm.current) leftArm.current.rotation.x = swing + armRest;
    if (rightArm.current) rightArm.current.rotation.x = -swing + armRest;
    if (leftLeg.current) leftLeg.current.rotation.x = -swing + legRest;
    if (rightLeg.current) rightLeg.current.rotation.x = swing + legRest;

    // Biển tên và bong bóng luôn quay về camera
    const plate = g.getObjectByName("nameplate");
    if (plate) plate.quaternion.copy(state.camera.quaternion);
    if (bubbleGroup.current) {
      bubbleGroup.current.quaternion.copy(state.camera.quaternion);
      if (speech) {
        // Mờ dần trong giây cuối thay vì biến mất đột ngột.
        const age = Date.now() - speech.at;
        const fade = THREE.MathUtils.clamp((CHAT_BUBBLE_MS - age) / 800, 0, 1);
        bubbleGroup.current.visible = age < CHAT_BUBBLE_MS;
        const mat = (bubbleGroup.current.children[0] as THREE.Mesh | undefined)?.material as
          | THREE.MeshBasicMaterial
          | undefined;
        if (mat) mat.opacity = fade;
      } else {
        bubbleGroup.current.visible = false;
      }
    }
  });

  // Người vắng mặt vẽ mờ và không đổ bóng: đổ bóng thì họ trông như đang thật
  // sự ở đó, mà cả điểm của hình mờ là nói "người này thuộc phòng, nhưng
  // không có mặt".
  const ghostProps = ghost
    ? { transparent: true, opacity: 0.32, depthWrite: false }
    : {};

  return (
    <group ref={root}>
      {/* đầu */}
      <mesh position={[0, 1.62, 0]} castShadow>
        <sphereGeometry args={[0.21, 16, 16]} />
        <meshStandardMaterial color="#e8c39e" roughness={0.8} {...ghostProps} />
      </mesh>
      {/* ảnh đại diện dán lên mặt trước của đầu */}
      {face && (
        <mesh position={[0, 1.62, 0.208]}>
          <circleGeometry args={[0.155, 24]} />
          <meshBasicMaterial map={face} toneMapped={false} />
        </mesh>
      )}
      {/* thân */}
      <mesh position={[0, 1.08, 0]} castShadow>
        <capsuleGeometry args={[0.24, 0.52, 6, 12]} />
        <meshStandardMaterial color={shirt} roughness={0.75} {...ghostProps} />
      </mesh>
      {/* tay */}
      <mesh ref={leftArm} position={[-0.32, 1.32, 0]} castShadow>
        <capsuleGeometry args={[0.075, 0.5, 4, 8]} />
        <meshStandardMaterial color={shirt} roughness={0.75} {...ghostProps} />
      </mesh>
      <mesh ref={rightArm} position={[0.32, 1.32, 0]} castShadow>
        <capsuleGeometry args={[0.075, 0.5, 4, 8]} />
        <meshStandardMaterial color={shirt} roughness={0.75} {...ghostProps} />
      </mesh>
      {/* chân */}
      <mesh ref={leftLeg} position={[-0.12, 0.52, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.5, 4, 8]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.85} {...ghostProps} />
      </mesh>
      <mesh ref={rightLeg} position={[0.12, 0.52, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.5, 4, 8]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.85} {...ghostProps} />
      </mesh>
      <AvatarGear gear={gear} shirt={color} />

      {/* biển tên */}
      <mesh name="nameplate" position={[0, status ? 2.24 : 2.15, 0]}>
        <planeGeometry args={status ? [1.45, 0.54] : [1.35, 0.34]} />
        <meshBasicMaterial map={nameTex} transparent depthWrite={false} opacity={ghost ? 0.5 : 1} />
      </mesh>
      {/* Bong bóng thoại. Neo theo MÉP DƯỚI chứ không theo tâm: chiều cao thay
          đổi theo số dòng, nên neo tâm sẽ khiến câu dài trùm xuống che mặt
          nhân vật còn câu ngắn thì lửng lơ. */}
      {bubble && (
        <group ref={bubbleGroup} position={[0, 2.42 + 1.7 / bubble.aspect / 2, 0]}>
          <mesh>
            <planeGeometry args={[1.7, 1.7 / bubble.aspect]} />
            <meshBasicMaterial
              map={bubble.texture}
              transparent
              opacity={1}
              depthWrite={false}
              depthTest={false}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
