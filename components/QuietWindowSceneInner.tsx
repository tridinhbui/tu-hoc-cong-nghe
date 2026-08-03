"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import {
  DRAG_PITCH_LIMIT,
  DRAG_YAW_LIMIT,
  GLASS_DROP_COUNT,
  KINDLE_SECONDS,
  RAIN_COUNT,
  ambientWind,
  flameMotion,
  gustAt,
  kindleProgress,
  springBack,
} from "@/lib/quiet-flame-scene";

// Khung cửa sổ mưa, ngọn lửa ở bên trong, kéo chuột để nhìn nghiêng.
//
// Bố cục theo chiều sâu, từ xa tới gần:
//   z = -6   màn mưa ngoài trời
//   z = -1.6 mặt kính, có giọt đọng chảy xuống
//   z = -1.2 khung cửa và hai thanh nẹp
//   z =  0   ngọn lửa trên bấc, tức là trong phòng
//
// Ngọn lửa đứng TRƯỚC kính chứ không sau: người xem ở trong phòng nhìn ra
// mưa, và đó là toàn bộ cảm giác mà cảnh này phục vụ. Đặt lửa ra ngoài thì
// mưa dập tắt nó, cả về logic lẫn về hình.

/** Ngọn lửa: ba lớp chồng nhau, cộng sáng, không lớp nào đổ bóng. */
function Flame({ intensity }: { intensity: number }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const start = useRef<number | null>(null);
  const gust = useRef({ strength: 0, at: 0 });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (start.current === null) start.current = t;
    const kindle = kindleProgress(t - start.current);

    const wind = ambientWind(t) + gustAt(gust.current.strength, t - gust.current.at);
    const m = flameMotion(wind, kindle, t);

    if (group.current) {
      group.current.rotation.z = -m.tilt;
      group.current.scale.set(1, Math.max(0.05, m.stretch), 1);
      // Ngọn lửa dạt theo gió chứ không chỉ nghiêng - chân bấc đứng yên, phần
      // ngọn mới đi, nên phần dịch ngang tỷ lệ với chiều cao.
      group.current.position.x = m.tilt * 0.28;
    }
    if (core.current) {
      const mat = core.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.55 + m.glow * 0.4;
    }
    if (light.current) {
      light.current.intensity = 0.6 + m.glow * 2.6 * intensity;
      light.current.distance = 5 + m.glow * 3;
    }
  });

  // Kéo trên chính ngọn lửa thì thổi vào nó. Đây là chỗ "chát nhen nhóm" -
  // lửa nghiêng gần như lụi rồi mới đứng dậy lại.
  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (e.buttons === 0) return;
    const strength = Math.max(-1.4, Math.min(1.4, e.movementX * 0.05));
    if (Math.abs(strength) < 0.05) return;
    gust.current = { strength, at: e.nativeEvent.timeStamp / 1000 };
  };

  return (
    <group position={[0, -0.45, 0]}>
      {/* Bấc: cho ngọn lửa một chỗ đứng. Thiếu nó thì đây chỉ là một hình cam
          trôi giữa khoảng không. */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.018, 0.026, 0.16, 8]} />
        <meshStandardMaterial color="#3a2a1c" roughness={0.9} />
      </mesh>

      <group ref={group} onPointerMove={onPointerMove}>
        {/* Quầng ngoài, rất mờ - phần khí nóng quanh ngọn lửa. */}
        <mesh position={[0, 0.42, 0]}>
          <coneGeometry args={[0.26, 1.05, 24, 1, true]} />
          <meshBasicMaterial
            color="#f97316"
            transparent
            opacity={0.16}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {/* Thân lửa. */}
        <mesh position={[0, 0.3, 0]}>
          <coneGeometry args={[0.16, 0.78, 24]} />
          <meshBasicMaterial
            color="#fb923c"
            transparent
            opacity={0.62}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {/* Lõi: gần như đứng yên. Đinh hoả cháy bền chứ không bùng. */}
        <mesh ref={core} position={[0, 0.16, 0]}>
          <coneGeometry args={[0.075, 0.34, 20]} />
          <meshBasicMaterial
            color="#fde68a"
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      <pointLight ref={light} position={[0, 0.35, 0.2]} color="#ffb057" intensity={1.4} distance={6} />
    </group>
  );
}

/** Mưa ngoài trời: các đoạn thẳng rơi xuống, nghiêng theo gió. */
function Rain() {
  const ref = useRef<THREE.LineSegments>(null);
  const speeds = useMemo(() => new Float32Array(RAIN_COUNT), []);

  const geometry = useMemo(() => {
    const positions = new Float32Array(RAIN_COUNT * 6);
    for (let i = 0; i < RAIN_COUNT; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = Math.random() * 9 - 3;
      const z = -6 - Math.random() * 5;
      const len = 0.22 + Math.random() * 0.3;
      positions.set([x, y, z, x, y - len, z], i * 6);
      speeds[i] = 3.2 + Math.random() * 3.4;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [speeds]);

  useFrame(({ clock }, delta) => {
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const skew = ambientWind(clock.getElapsedTime()) * 0.55;
    for (let i = 0; i < RAIN_COUNT; i++) {
      const o = i * 6;
      const drop = speeds[i] * delta;
      const drift = skew * delta;
      arr[o + 1] -= drop;
      arr[o + 4] -= drop;
      arr[o] += drift;
      arr[o + 3] += drift;
      if (arr[o + 4] < -4.5) {
        const x = (Math.random() - 0.5) * 14;
        arr[o] = x;
        arr[o + 3] = x;
        arr[o + 1] = 5.5;
        arr[o + 4] = 5.5 - (0.22 + Math.random() * 0.3);
      }
    }
    attr.needsUpdate = true;
    if (ref.current) ref.current.visible = true;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#9fb4c9" transparent opacity={0.34} />
    </lineSegments>
  );
}

/** Giọt đọng trên mặt kính: chảy xuống chậm, dừng, rồi lại chảy. */
function GlassDrops() {
  const ref = useRef<THREE.Points>(null);
  const state = useMemo(
    () =>
      Array.from({ length: GLASS_DROP_COUNT }, () => ({
        x: (Math.random() - 0.5) * 3.4,
        y: Math.random() * 2.4 - 1.2,
        v: 0,
        wait: Math.random() * 3,
      })),
    []
  );

  const geometry = useMemo(() => {
    const positions = new Float32Array(GLASS_DROP_COUNT * 3);
    for (let i = 0; i < GLASS_DROP_COUNT; i++) {
      positions.set([state[i].x, state[i].y, -1.58], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [state]);

  useFrame((_, delta) => {
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < GLASS_DROP_COUNT; i++) {
      const d = state[i];
      // Giọt nước trên kính không rơi đều: nó đọng lại tới khi đủ nặng rồi
      // trượt một đoạn, và đó là thứ phân biệt mặt kính với mưa ngoài trời.
      if (d.wait > 0) {
        d.wait -= delta;
        d.v *= 0.9;
      } else {
        d.v = Math.min(0.9, d.v + delta * 1.4);
        if (Math.random() < 0.012) d.wait = 0.3 + Math.random() * 1.4;
      }
      d.y -= d.v * delta;
      if (d.y < -1.4) {
        d.y = 1.4;
        d.x = (Math.random() - 0.5) * 3.4;
        d.v = 0;
        d.wait = Math.random() * 2;
      }
      arr[i * 3] = d.x;
      arr[i * 3 + 1] = d.y;
    }
    attr.needsUpdate = true;
    if (ref.current) ref.current.visible = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#cfe0f0" size={0.05} sizeAttenuation transparent opacity={0.5} />
    </points>
  );
}

/** Khung cửa: bốn cạnh và hai thanh nẹp chia ô. */
function WindowFrame() {
  const bar = (
    key: string,
    position: [number, number, number],
    args: [number, number, number]
  ) => (
    <mesh key={key} position={position} castShadow={false}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="#2b211a" roughness={0.85} metalness={0.05} />
    </mesh>
  );

  return (
    <group position={[0, 0, -1.2]}>
      {bar("top", [0, 1.55, 0], [3.7, 0.22, 0.18])}
      {bar("bottom", [0, -1.55, 0], [3.7, 0.26, 0.22])}
      {bar("left", [-1.78, 0, 0], [0.2, 3.3, 0.18])}
      {bar("right", [1.78, 0, 0], [0.2, 3.3, 0.18])}
      {bar("mullion-v", [0, 0, 0], [0.09, 3.3, 0.12])}
      {bar("mullion-h", [0, 0.25, 0], [3.6, 0.09, 0.12])}
    </group>
  );
}

/** Mặt kính: một tấm gần như trong, chỉ để bắt chút ánh lửa hắt lên. */
function Glass() {
  return (
    <mesh position={[0, 0, -1.6]}>
      <planeGeometry args={[3.6, 3.2]} />
      <meshStandardMaterial
        color="#0d1a24"
        transparent
        opacity={0.42}
        roughness={0.12}
        metalness={0.4}
      />
    </mesh>
  );
}

/** Kéo để nhìn nghiêng. Thả tay thì cảnh tự về vị trí nghỉ - đây là một khung
 *  cửa, không phải một vật thể xoay tự do. */
function DraggableStage({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ yaw: 0, pitch: 0 });
  const dragging = useRef(false);

  useFrame((_, delta) => {
    if (!dragging.current) {
      target.current.yaw = springBack(target.current.yaw, delta);
      target.current.pitch = springBack(target.current.pitch, delta);
    }
    if (group.current) {
      group.current.rotation.y += (target.current.yaw - group.current.rotation.y) * Math.min(1, delta * 6);
      group.current.rotation.x += (target.current.pitch - group.current.rotation.x) * Math.min(1, delta * 6);
    }
  });

  return (
    <group
      ref={group}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as Element & { setPointerCapture?: (id: number) => void }).setPointerCapture?.(
          e.pointerId
        );
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerLeave={() => {
        dragging.current = false;
      }}
      // Khối này nằm trong dòng chảy trang, không phải toàn màn hình, nên cú
      // chạm kéo dọc phải để cho trang cuộn - và trình duyệt cuộn trang bằng
      // cách HUỶ chuỗi pointer đang chạy. Huỷ thì không có pointerup lẫn
      // pointerleave nào cả; thiếu nhánh này thì cờ kéo kẹt ở true và lần chạm
      // sau, dù chỉ lướt qua, đã xoay được cả khung cảnh.
      onPointerCancel={() => {
        dragging.current = false;
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        target.current.yaw = Math.max(
          -DRAG_YAW_LIMIT,
          Math.min(DRAG_YAW_LIMIT, target.current.yaw + e.movementX * 0.004)
        );
        target.current.pitch = Math.max(
          -DRAG_PITCH_LIMIT,
          Math.min(DRAG_PITCH_LIMIT, target.current.pitch + e.movementY * 0.003)
        );
      }}
    >
      {children}
    </group>
  );
}

export default function QuietWindowSceneInner({
  intensity = 0.6,
  reducedMotion = false,
}: {
  intensity?: number;
  reducedMotion?: boolean;
}) {
  return (
    <Canvas
      // Trần DPR: màn Retina 3x không cần render 3x cho một khung cửa sổ, và
      // đây là khác biệt lớn nhất giữa mát máy và cháy quạt.
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, 4.2], fov: 42 }}
      gl={{ antialias: true, powerPreference: "low-power" }}
      // Ngọn lửa là nguồn sáng duy nhất đáng kể, nên nền phải gần như đen -
      // phủ ấm lên nền xám cho ra một mảng nâu đục và lửa mất hết chiều sâu.
      style={{ background: "transparent" }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      <ambientLight intensity={0.16} color="#7d8fa6" />
      {/* Ánh sáng lạnh hắt từ ngoài cửa vào, để khung cửa không chìm hẳn. */}
      <directionalLight position={[-2, 3, -4]} intensity={0.35} color="#8fb3d9" />

      <DraggableStage>
        <Rain />
        <Glass />
        <GlassDrops />
        <WindowFrame />
        <Flame intensity={intensity} />
      </DraggableStage>
    </Canvas>
  );
}
