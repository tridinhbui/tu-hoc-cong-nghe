"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  DRAG_PITCH_LIMIT,
  DRAG_YAW_LIMIT,
  EMBER_COUNT,
  RAIN_COUNT,
  SHELTER_RADIUS,
  ambientWind,
  flameMotion,
  forestTrees,
  gustAt,
  kindleProgress,
  pushOutOfShelter,
  springBack,
} from "@/lib/quiet-flame-scene";

/** Ngưỡng tốc độ kéo ngang để tính là một cú thổi, điểm ảnh mỗi giây. Đặt trên
 *  tốc độ của một cú kéo thong thả để "nhìn nghiêng" không vô tình dập lửa. */
const BLOW_SPEED = 900;

/** Cao độ mặt đất. Mọi thứ đứng trên đất đều lấy mốc từ đây thay vì tự chọn
 *  một số, nếu không thì hạ mặt đất xuống là đống lửa lơ lửng. */
const GROUND_Y = -0.78;

/** Chùm tàn kéo dài bao lâu sau khi đặt xuống một nỗi lo, giây. Đủ để nhìn
 *  thấy, ngắn hơn hẳn cú bùng của ngọn lửa (FLARE_MS) để nó đọc ra là một
 *  nhịp thở chứ không phải một hiệu ứng ăn mừng. */
const BURST_SECONDS = 2.4;

// Một đốm lửa nhỏ trong mưa nhỏ giữa rừng.
//
// Bố cục theo chiều sâu:
//   z = -14 … -3   thân cây, chìm dần vào sương
//   z = -14 … +5   mưa, rơi xuyên CẢ khối cảnh, kể cả trước mặt đống lửa
//   z =   0        đống lửa trong khoảng trống
//
// Khác căn bản với bản khung cửa sổ trước đó: ở đó người xem ngồi trong nhà
// nhìn mưa qua kính, mưa và lửa nằm ở hai phía của một tấm kính và không bao
// giờ gặp nhau. Ở đây không còn kính, nên mưa rơi cả phía trước lẫn phía sau
// ngọn lửa - đó là toàn bộ khác biệt giữa "nhìn mưa" và "đang ở trong mưa".
//
// Cái giá phải trả là câu hỏi mà bản cũ né được bằng cách đặt lửa trong nhà:
// mưa thì lửa phải tắt. Trả lời bằng SHELTER_RADIUS - một túi khô do tán cây
// ngay trên đầu che lại, thấy được vì mưa hiện rõ ở mọi chỗ khác.

/** Trạng thái con trỏ dùng chung cho cả cảnh.
 *
 *  Vì sao không để mỗi phần tự bắt sự kiện của mình: trong react-three-fiber,
 *  `onPointerMove` đặt trên một `<group>` chỉ nổ khi tia chiếu TRÚNG một mesh
 *  con của nó. Cảnh này phần lớn là khoảng tối trống, nên kéo ở chỗ trống thì
 *  không có gì xảy ra - đúng cái cảm giác "phải kéo mấy lần mới trúng". Và cú
 *  thổi thì còn phải trúng đúng ngọn lửa, một mục tiêu rộng chừng ba mươi điểm
 *  ảnh, lại còn tự dịch đi khi cảnh xoay.
 *
 *  Nên sự kiện được bắt ở thẻ DOM bao ngoài Canvas: kéo ở đâu trong khung cũng
 *  ăn, và không cần tia chiếu nào cả. */
export interface PointerState {
  dragging: boolean;
  yaw: number;
  pitch: number;
  /** Cơn giật đang chờ hoặc đang tắt dần. `at` là mốc thời gian theo đồng hồ
   *  của Canvas, và **chỉ Flame được phép đóng dấu nó**: `at < 0` nghĩa là cơn
   *  giật vừa phát sinh, chưa có mốc.
   *
   *  Chỗ này từng là một lỗi câm. Trình xử lý sự kiện đóng dấu bằng
   *  `event.timeStamp`, đếm từ lúc tải trang; `useFrame` so nó với
   *  `clock.getElapsedTime()`, đếm từ lúc Canvas dựng xong - luôn muộn hơn.
   *  Nên tuổi của cơn giật luôn âm, `gustAt` trả 0 cho tuổi âm, và cú thổi
   *  chưa từng chạy một lần nào. */
  gust: { strength: number; at: number };
}

/** Đống củi: hai thanh gác chéo và một vòng đá.
 *
 *  Thay cho cái bấc nến của bản cũ. Bấc nến ngoài rừng đọc ra là một vật thể
 *  lạc chỗ, và nó cũng là thứ duy nhất trong cảnh nói cho người xem biết ngọn
 *  lửa này do ai đó nhóm lên chứ không phải tự cháy. */
function Campfire() {
  const stones = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2;
        return {
          x: Math.cos(a) * 0.46,
          z: Math.sin(a) * 0.46,
          s: 0.07 + ((i * 37) % 11) / 90,
        };
      }),
    []
  );

  return (
    <group position={[0, GROUND_Y, 0]}>
      {stones.map((s, i) => (
        <mesh key={i} position={[s.x, s.s * 0.5, s.z]}>
          <dodecahedronGeometry args={[s.s, 0]} />
          <meshStandardMaterial color="#4a4038" roughness={0.95} />
        </mesh>
      ))}

      {/* Củi gác chéo. Nghiêng vào tâm nên ngọn lửa mọc ra từ giữa chúng. */}
      <mesh position={[-0.1, 0.1, 0]} rotation={[0, 0.5, Math.PI / 2.6]}>
        <cylinderGeometry args={[0.045, 0.055, 0.72, 7]} />
        <meshStandardMaterial color="#2a1d13" roughness={1} />
      </mesh>
      <mesh position={[0.11, 0.1, 0.04]} rotation={[0.3, -0.7, -Math.PI / 2.5]}>
        <cylinderGeometry args={[0.04, 0.05, 0.66, 7]} />
        <meshStandardMaterial color="#231910" roughness={1} />
      </mesh>
    </group>
  );
}

/** Ngọn lửa: ba lớp chồng nhau, cộng sáng, không lớp nào đổ bóng. */
function Flame({
  intensity,
  pointer,
}: {
  intensity: number;
  pointer: React.RefObject<PointerState>;
}) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const start = useRef<number | null>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (start.current === null) start.current = t;
    const kindle = kindleProgress(t - start.current);

    // Đóng dấu cơn giật vào đồng hồ của chính vòng lặp này, ở khung hình đầu
    // tiên sau khi nó phát sinh. Đó là mốc duy nhất mà `gustAt` so được.
    const gust = pointer.current.gust;
    if (gust.at < 0) gust.at = t;
    const wind = ambientWind(t) + gustAt(gust.strength, t - gust.at);
    const m = flameMotion(wind, kindle, t);

    if (group.current) {
      group.current.rotation.z = -m.tilt;
      group.current.scale.set(1, Math.max(0.05, m.stretch), 1);
      // Ngọn lửa dạt theo gió chứ không chỉ nghiêng - chân củi đứng yên, phần
      // ngọn mới đi, nên phần dịch ngang tỷ lệ với chiều cao.
      group.current.position.x = m.tilt * 0.28;
    }
    if (core.current) {
      const mat = core.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.55 + m.glow * 0.4;
    }
    if (light.current) {
      light.current.intensity = 2.4 + m.glow * 17 * intensity;
      light.current.distance = 11 + m.glow * 7;
    }
  });

  return (
    <group position={[0, GROUND_Y + 0.14, 0]} scale={1.45}>
      <group ref={group}>
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

      {/* Nguồn sáng thật của cảnh. Cường độ lớn hơn hẳn bản khung cửa sổ (1,4)
          không phải vì lửa to hơn, mà vì ở đó ngọn lửa tự phát sáng là chủ thể
          duy nhất và cái đèn này gần như trang trí; ở đây cả khu rừng, mặt đất
          và màn mưa chỉ nhìn thấy được nhờ nó. `decay` dưới mức vật lý 2 để
          ánh lửa với tới được mấy thân cây gần - đúng là gian lận, nhưng suy
          giảm bình phương thật sẽ để rừng chìm hẳn vào đen. */}
      <pointLight
        ref={light}
        position={[0, 0.35, 0]}
        color="#ffb057"
        intensity={9}
        distance={16}
        decay={1.5}
      />
    </group>
  );
}

/**
 * Tàn lửa bay lên rồi tắt. Bay chậm và ít - lửa nhỏ cháy bền, không phải đống
 * lửa trại đang bùng.
 *
 * `setDownCount` tăng lên một khi người đọc vừa đặt xuống một nỗi lo. Lúc đó
 * toàn bộ tàn được thả lại cùng lúc và bay nhanh gấp đôi trong một nhịp: đống
 * lửa bốc lên một chùm, rồi trở lại nhịp cháy cũ.
 *
 * Vì sao đáng làm: đặt xuống một nỗi lo là cử chỉ DUY NHẤT trang này mời người
 * ta làm, và trước đây nó chỉ được đáp lại bằng ngọn lửa sáng thêm vài phần
 * trăm - một thay đổi thật nhưng gần như không ai nhận ra. Chùm tàn thì thấy
 * được, và nó không phải phần thưởng: không điểm, không đếm, không lưu lại,
 * đúng theo nguyên tắc của trang.
 */
function Embers({ setDownCount }: { setDownCount: number }) {
  const state = useMemo(
    () =>
      Array.from({ length: EMBER_COUNT }, (_, i) => ({
        x: 0,
        y: 0,
        z: 0,
        life: (i / EMBER_COUNT) * 2.4,
        speed: 0.5 + ((i * 53) % 17) / 26,
      })),
    []
  );

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(EMBER_COUNT * 3), 3));
    return g;
  }, []);

  const seenCount = useRef(setDownCount);
  const burstUntil = useRef(0);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (seenCount.current !== setDownCount) {
      seenCount.current = setDownCount;
      // Chỉ bùng khi con số TĂNG. Nó không giảm được trong phiên hiện tại,
      // nhưng so bằng "khác" thay vì "lớn hơn" sẽ biến mọi lần dựng lại thành
      // một chùm tàn không ai gây ra.
      if (setDownCount > 0) {
        burstUntil.current = t + BURST_SECONDS;
        for (const e of state) e.life = 0;
      }
    }
    const bursting = t < burstUntil.current;

    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const drift = ambientWind(clock.getElapsedTime()) * 0.22;
    for (let i = 0; i < EMBER_COUNT; i++) {
      const e = state[i];
      e.life -= delta;
      if (e.life <= 0) {
        // Sinh lại ngay trên đống củi, lệch ngẫu nhiên một chút.
        e.x = (Math.random() - 0.5) * 0.16;
        e.z = (Math.random() - 0.5) * 0.16;
        e.y = 0.1;
        e.life = 1.8 + Math.random() * 1.6;
      }
      e.y += e.speed * (bursting ? 2.1 : 1) * delta;
      e.x += drift * delta;
      arr[i * 3] = e.x;
      arr[i * 3 + 1] = GROUND_Y + e.y;
      arr[i * 3 + 2] = e.z;
    }
    attr.needsUpdate = true;
  });

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color="#ffb057"
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/** Mưa nhỏ: các đoạn thẳng ngắn rơi trong cả khối cảnh, trừ túi khô dưới tán. */
function Rain() {
  const speeds = useMemo(() => new Float32Array(RAIN_COUNT), []);

  /** Đặt một hạt vào vị trí mới, tránh vùng có tán che.
   *
   *  Đẩy ra ngoài thay vì bỏ qua hạt: bỏ qua thì số hạt thực tế giảm dần theo
   *  xác suất rơi vào vùng che, và mưa loãng đi một cách không kiểm soát. */
  const place = (arr: Float32Array, i: number, top: boolean) => {
    const { x, z } = pushOutOfShelter((Math.random() - 0.5) * 20, -14 + Math.random() * 19);
    const len = 0.14 + Math.random() * 0.26;
    const y = top ? 7.2 : Math.random() * 9 - 1.5;
    const o = i * 6;
    arr[o] = x;
    arr[o + 1] = y;
    arr[o + 2] = z;
    arr[o + 3] = x;
    arr[o + 4] = y - len;
    arr[o + 5] = z;
  };

  const geometry = useMemo(() => {
    const positions = new Float32Array(RAIN_COUNT * 6);
    for (let i = 0; i < RAIN_COUNT; i++) {
      place(positions, i, false);
      // Mưa nhỏ rơi chậm hơn mưa rào, và đây là thứ phân biệt hai loại rõ hơn
      // cả số lượng hạt.
      speeds[i] = 2.4 + Math.random() * 2.2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [speeds]);

  useFrame(({ clock }, delta) => {
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const skew = ambientWind(clock.getElapsedTime()) * 0.4;
    for (let i = 0; i < RAIN_COUNT; i++) {
      const o = i * 6;
      const drop = speeds[i] * delta;
      const drift = skew * delta;
      arr[o + 1] -= drop;
      arr[o + 4] -= drop;
      arr[o] += drift;
      arr[o + 3] += drift;
      if (arr[o + 4] < GROUND_Y) place(arr, i, true);
    }
    attr.needsUpdate = true;
  });

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#a8bed2" transparent opacity={0.38} />
    </lineSegments>
  );
}

/** Rừng: thân cây và tán, gần như đen. Sương mù lo phần chiều sâu.
 *
 *  Vật liệu là `meshStandardMaterial` chứ không phải `basic`: cả khu rừng chỉ
 *  nhìn thấy được nhờ ánh lửa hắt vào mấy thân gần nhất, và đó là thứ nói cho
 *  người xem biết đống lửa đang toả sáng. Dùng `basic` thì rừng sáng đều và
 *  ngọn lửa mất hết vai trò. */
function Forest() {
  const trees = useMemo(() => forestTrees(), []);

  return (
    <group>
      {trees.map((t, i) => (
        <group key={i} position={[t.x, GROUND_Y, t.z]} rotation={[0, 0, t.lean]}>
          <mesh position={[0, t.height / 2, 0]}>
            <cylinderGeometry args={[t.radius * 0.7, t.radius, t.height, 6]} />
            <meshStandardMaterial color="#3a2d22" roughness={1} />
          </mesh>
          {/* Tán: hai nón chồng, đủ để đọc ra là cây lá kim trong bóng tối. */}
          <mesh position={[0, t.height * 0.82, 0]}>
            <coneGeometry args={[t.height * 0.26, t.height * 0.62, 7]} />
            <meshStandardMaterial color="#1d3129" roughness={1} />
          </mesh>
          <mesh position={[0, t.height * 1.12, 0]}>
            <coneGeometry args={[t.height * 0.18, t.height * 0.46, 7]} />
            <meshStandardMaterial color="#182821" roughness={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Mặt đất ướt. `metalness` cao hơn đất khô để bắt được ánh lửa thành một
 *  vũng sáng quanh đống củi - đó là cách người xem biết trời vừa mưa mà không
 *  cần nhìn thấy hạt nào chạm đất. */
function Ground() {
  return (
    <mesh position={[0, GROUND_Y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[26, 48]} />
      <meshStandardMaterial color="#1f1a15" roughness={0.5} metalness={0.4} />
    </mesh>
  );
}

/** Cái cây che cho đống lửa - lý do hình ảnh cho SHELTER_RADIUS.
 *
 *  Bản đầu là một cái nón trần lơ lửng trên đầu, và nó đọc ra đúng như thế:
 *  một thanh đen vắt ngang đỉnh khung hình, không rõ là cái gì. Túi khô trong
 *  màn mưa cần một vật CÓ THẬT đỡ lấy nó, nếu không thì mưa tự nhiên thủng một
 *  lỗ tròn và trông như lỗi dựng hình.
 *
 *  Thân đứng lệch sang bên để không chắn đống lửa, tán thì xoè ra phủ qua tâm -
 *  đúng dáng một cái cây người ta chọn để ngồi nhờ dưới gốc. */
function ShelterTree() {
  return (
    <group position={[1.85, GROUND_Y, -1.15]}>
      <mesh position={[0, 2.3, 0]} rotation={[0, 0, -0.09]}>
        <cylinderGeometry args={[0.16, 0.24, 4.6, 8]} />
        <meshStandardMaterial color="#3a2d22" roughness={1} />
      </mesh>
      {/* Tán lệch về phía đống lửa, tâm nằm gần như ngay trên nó. */}
      <mesh position={[-1.7, 5.15, 1.05]} rotation={[0, 0.3, 0.12]}>
        <coneGeometry args={[SHELTER_RADIUS * 1.45, 2.6, 9]} />
        <meshStandardMaterial color="#1d3129" roughness={1} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-1.55, 6.3, 0.9]} rotation={[0, -0.2, 0.08]}>
        <coneGeometry args={[SHELTER_RADIUS * 1.05, 2.1, 9]} />
        <meshStandardMaterial color="#182821" roughness={1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/** Kéo để nhìn nghiêng. Thả tay thì cảnh tự về vị trí nghỉ.
 *
 *  Sân khấu chỉ ĐỌC góc từ trạng thái con trỏ; việc bắt sự kiện nằm ở thẻ DOM
 *  bao ngoài Canvas. */
function DraggableStage({
  pointer,
  children,
}: {
  pointer: React.RefObject<PointerState>;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const p = pointer.current;
    if (!p.dragging) {
      p.yaw = springBack(p.yaw, delta);
      p.pitch = springBack(p.pitch, delta);
    }
    if (group.current) {
      group.current.rotation.y += (p.yaw - group.current.rotation.y) * Math.min(1, delta * 6);
      group.current.rotation.x += (p.pitch - group.current.rotation.x) * Math.min(1, delta * 6);
    }
  });

  return <group ref={group}>{children}</group>;
}

export default function QuietForestSceneInner({
  intensity = 0.6,
  reducedMotion = false,
  setDownCount = 0,
}: {
  intensity?: number;
  reducedMotion?: boolean;
  setDownCount?: number;
}) {
  const pointer = useRef<PointerState>({
    dragging: false,
    yaw: 0,
    pitch: 0,
    gust: { strength: 0, at: 0 },
  });
  /** Toạ độ lần trước, để tự tính quãng dịch. `movementX` của sự kiện pointer
   *  bằng 0 trên phần lớn trình duyệt di động khi nguồn là ngón tay - đó là lý
   *  do thứ hai khiến thao tác kéo "không ăn", và nó chỉ hỏng trên điện thoại
   *  nên rất dễ không ai thấy. */
  const last = useRef<{ x: number; y: number; t: number } | null>(null);

  const begin = (e: React.PointerEvent<HTMLDivElement>) => {
    pointer.current.dragging = true;
    last.current = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const end = () => {
    pointer.current.dragging = false;
    last.current = null;
  };

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointer.current.dragging || !last.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    const dt = Math.max(1, e.timeStamp - last.current.t);
    last.current = { x: e.clientX, y: e.clientY, t: e.timeStamp };

    const p = pointer.current;
    p.yaw = Math.max(-DRAG_YAW_LIMIT, Math.min(DRAG_YAW_LIMIT, p.yaw + dx * 0.004));
    p.pitch = Math.max(-DRAG_PITCH_LIMIT, Math.min(DRAG_PITCH_LIMIT, p.pitch + dy * 0.003));

    // Thổi vào lửa bằng TỐC ĐỘ ngang, không bằng việc trúng ngọn lửa. Lướt tay
    // nhanh ngang qua một ngọn nến thì nó dạt - đó là thứ ai cũng đã làm ngoài
    // đời, nên không cần giải thích. Kéo chậm để nhìn nghiêng thì dưới ngưỡng
    // và lửa đứng yên.
    const speed = (dx / dt) * 1000; // điểm ảnh mỗi giây
    if (Math.abs(speed) > BLOW_SPEED) {
      const strength = Math.max(-1.4, Math.min(1.4, (speed / BLOW_SPEED) * 0.5));
      // `at: -1` là "chưa đóng dấu" - xem chú thích ở PointerState.
      p.gust = { strength, at: -1 };
    }
  };

  return (
    // touch-action: pan-y - cuộn dọc vẫn thuộc về trang, còn kéo ngang là của
    // cảnh này. Khối nằm giữa dòng chảy trang chứ không chiếm toàn màn hình,
    // nên nuốt hết cử chỉ sẽ khoá luôn việc cuộn qua nó trên điện thoại.
    <div
      className="h-full w-full touch-pan-y"
      onPointerDown={begin}
      onPointerMove={move}
      onPointerUp={end}
      onPointerLeave={end}
      onPointerCancel={end}
    >
      <Canvas
        // Trần DPR: màn Retina 3x không cần render 3x cho một khoảng rừng tối,
        // và đây là khác biệt lớn nhất giữa mát máy và cháy quạt.
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.15, 5.1], fov: 48 }}
        onCreated={({ camera }) => camera.lookAt(0, 0.35, 0)}
        gl={{ antialias: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        {/* Sương mù là thứ biến hai chục cái nón thành một khu rừng: cây xa
            chìm dần thay vì đứng thành hàng rồi hết đột ngột ở cây cuối. */}
        <fogExp2 attach="fog" args={["#080d0f", 0.055]} />

        <ambientLight intensity={0.5} color="#3f5666" />
        {/* Trời mưa ban đêm: một chút sáng lạnh từ trên xuống để tán cây không
            chìm hẳn thành mảng đen phẳng. */}
        <directionalLight position={[-3, 6, -2]} intensity={0.5} color="#7ea6cc" />

        <DraggableStage pointer={pointer}>
          <Ground />
          <Forest />
          <ShelterTree />
          <Rain />
          <Campfire />
          <Flame intensity={intensity} pointer={pointer} />
          <Embers setDownCount={setDownCount} />
        </DraggableStage>
      </Canvas>
    </div>
  );
}
