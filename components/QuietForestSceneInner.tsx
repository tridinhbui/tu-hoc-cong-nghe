"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  EMBER_COUNT,
  RAIN_COUNT,
  SHELTER_RADIUS,
  ambientWind,
  flameMotion,
  forestTrees,
  gustAt,
  kindleProgress,
  pushOutOfShelter,
} from "@/lib/quiet-flame-scene";
import {
  SPAWN,
  SPAWN_CLEAR,
  clearsSigns,
  nearestSign,
  WALK_RADIUS,
  resolveQuietWalk,
  signsOf,
  type QuietSign,
} from "@/lib/quiet-forest-space";
import {
  applyFollowCamera,
  cameraYawOf,
  inputTowardTarget,
  turnToward,
  useWalkKeys,
  worldDirection,
  type OrbitState,
  type WalkState,
} from "@/components/world-controls/easy-walk";
import { useI18n } from "@/lib/i18n/context";

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

/** Rừng THẤY ĐƯỢC, sau khi bỏ những cây chắn chỗ.
 *
 *  `forestTrees()` sinh rừng từ trước khi cảnh này có biển và có người đi lại,
 *  nên nó không biết gì về hai thứ đó. Lọc ở đây thay vì sửa nó: hàm ấy còn
 *  phục vụ chỗ khác, và "chỗ nào có cây" không nên phụ thuộc vào "chỗ nào có
 *  biển".
 *
 *  Cùng một danh sách này được dùng cho va chạm, nên cây bị bỏ đi cũng thôi
 *  chặn đường - nếu hai bên đọc hai danh sách khác nhau thì người dùng sẽ đâm
 *  vào một thân cây vô hình, đúng loại lỗi không ai đoán ra khi nhìn màn hình. */
function visibleTrees() {
  return forestTrees().filter(
    (t) => clearsSigns(t) && Math.hypot(t.x - SPAWN.x, t.z - SPAWN.z) > SPAWN_CLEAR
  );
}

/** Rừng: thân cây và tán, gần như đen. Sương mù lo phần chiều sâu.
 *
 *  Vật liệu là `meshStandardMaterial` chứ không phải `basic`: cả khu rừng chỉ
 *  nhìn thấy được nhờ ánh lửa hắt vào mấy thân gần nhất, và đó là thứ nói cho
 *  người xem biết đống lửa đang toả sáng. Dùng `basic` thì rừng sáng đều và
 *  ngọn lửa mất hết vai trò. */
function Forest() {
  const trees = useMemo(() => visibleTrees(), []);

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

/** Một tấm biển gỗ: hai cọc, một tấm ván, và một ngọn đèn nhỏ trên đầu.
 *
 *  Chữ KHÔNG khắc lên gỗ bằng texture. Đã thử và bỏ: ở khoảng cách đọc được
 *  thì ba dòng chữ Việt có dấu trên một tấm ván rộng 1,2m phải render ở cỡ
 *  chữ mà màn điện thoại không tải nổi, và xoay camera đi mười độ là nó nhoè
 *  hẳn. Tấm biển ở đây là thứ NÓI RẰNG có gì đó để đọc; chữ thật hiện trên
 *  HUD khi đứng đủ gần - cùng cách thẻ cửa phòng ở sảnh thư viện làm, và vì
 *  cùng một lý do đã ghi ở đó.
 *
 *  Đèn nhỏ là thứ khiến tấm biển tìm được trong bóng tối. Không có nó thì cả
 *  ba tấm chìm vào rừng đen và người đọc không biết là có gì để đi tới. */
function Signpost({ sign, lit }: { sign: QuietSign; lit: boolean }) {
  const glow = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!glow.current) return;
    const mat = glow.current.material as THREE.MeshBasicMaterial;
    // Nhịp thở chậm, và sáng thêm khi có người đứng cạnh. 0,18Hz - chậm hơn
    // nhịp thở người thật, vì một cái đèn nhấp nháy theo nhịp thở là thứ người
    // ta nhìn thấy chứ không phải thứ làm họ dịu xuống.
    const pulse = 0.5 + Math.sin(clock.getElapsedTime() * 1.1) * 0.14;
    mat.opacity = lit ? Math.min(1, pulse + 0.42) : pulse;
  });

  return (
    <group position={[sign.x, GROUND_Y, sign.z]} rotation={[0, sign.ry, 0]}>
      {/* Hai cọc */}
      {[-0.42, 0.42].map((x) => (
        <mesh key={x} position={[x, 0.62, 0]}>
          <cylinderGeometry args={[0.045, 0.05, 1.24, 6]} />
          <meshStandardMaterial color="#3a2d22" roughness={1} />
        </mesh>
      ))}
      {/* Ván */}
      <mesh position={[0, 1.02, 0.02]}>
        <boxGeometry args={[1.12, 0.52, 0.06]} />
        <meshStandardMaterial color="#5a4433" roughness={0.9} />
      </mesh>
      {/* Ba vạch khắc - gợi ra là có chữ, không cố giả làm chữ. */}
      {[0.14, 0.0, -0.14].map((y, i) => (
        <mesh key={y} position={[-0.12 + i * 0.04, 1.02 + y, 0.06]}>
          <boxGeometry args={[0.62 - i * 0.14, 0.035, 0.01]} />
          <meshStandardMaterial color="#2a1d13" roughness={1} />
        </mesh>
      ))}
      {/* Đèn treo trên đầu biển */}
      <mesh ref={glow} position={[0, 1.46, 0.02]}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshBasicMaterial color={sign.accent} transparent opacity={0.6} toneMapped={false} />
      </mesh>
      <pointLight
        position={[0, 1.46, 0.3]}
        color={sign.accent}
        intensity={lit ? 3.4 : 1.5}
        distance={4.2}
        decay={2}
      />
    </group>
  );
}

/** Người đi trong rừng: đầu, thân, hai tay hai chân đánh lắc khi bước.
 *
 *  Cố ý KHÔNG dùng lại `components/lobby/LobbyAvatar`. Hình khối thì giống,
 *  nhưng cái đó mang theo biển tên, cấp độ, chuỗi ngày, đồ trang bị và bong
 *  bóng chat - toàn bộ những thứ mà trang này là trang duy nhất trong app cố ý
 *  không có. Một nhân vật đeo biển "Lv.7 · chuỗi 12 ngày" đứng trong Góc yên
 *  tĩnh sẽ mang nguyên phần còn lại của ứng dụng vào đây.
 *
 *  Màu cũng khác: một bóng người tối, chỉ nhận ánh lửa. Đây là bạn đang đứng
 *  trong rừng lúc nửa đêm, không phải một avatar trong game. */
function Wanderer({ poseRef }: { poseRef: React.MutableRefObject<{ x: number; z: number; ry: number; stride: number }> }) {
  const group = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Mesh>(null);
  const armR = useRef<THREE.Mesh>(null);
  const legL = useRef<THREE.Mesh>(null);
  const legR = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const p = poseRef.current;
    if (group.current) {
      group.current.position.set(p.x, GROUND_Y, p.z);
      group.current.rotation.y = p.ry;
    }
    // `stride` do vòng đi bộ cộng dồn theo QUÃNG ĐƯỜNG chứ theo thời gian:
    // đứng yên thì chân đứng yên, và đi chậm thì bước chậm - không cần một cờ
    // "đang đi" nào cả.
    const swing = Math.sin(p.stride) * 0.55;
    if (armL.current) armL.current.rotation.x = swing;
    if (armR.current) armR.current.rotation.x = -swing;
    if (legL.current) legL.current.rotation.x = -swing;
    if (legR.current) legR.current.rotation.x = swing;
  });

  // Đủ sáng để tìm thấy mình trong rừng đêm.
  //
  // Bản đầu để #2b2622 - một bóng người tối, đúng ý đồ "bạn đang đứng trong
  // rừng lúc nửa đêm" và sai hoàn toàn trên màn hình: trên nền đất gần đen,
  // dưới một nguồn sáng duy nhất cách 5m, hình người biến mất. Nhìn ảnh chụp
  // thì thấy một khu rừng trống, và người dùng sẽ kết luận là không có nhân
  // vật nào chứ không kết luận là nhân vật đang tối.
  //
  // `emissive` rất nhẹ là thứ giữ cho nó không bao giờ tan hẳn vào nền khi đi
  // ra xa đống lửa - ánh lửa lo phần còn lại.
  const limb = "#8a7b68";
  const cloth = "#6f6354";
  return (
    <group ref={group}>
      {/* Vệt tối dưới chân: bóng giả, và cũng là thứ nói "bạn đang đứng ĐÂY".
          Rẻ hơn hẳn một bóng đổ thật, và bóng thật ở đây sẽ do một nguồn sáng
          động hắt ra - tức là phải bật shadow map cho cả cảnh. */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.26, 20]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.32} depthWrite={false} />
      </mesh>

      {/* Chân */}
      <mesh ref={legL} position={[-0.075, 0.34, 0]}>
        <capsuleGeometry args={[0.05, 0.3, 4, 8]} />
        <meshStandardMaterial color={limb} roughness={0.9} emissive="#2a1f14" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={legR} position={[0.075, 0.34, 0]}>
        <capsuleGeometry args={[0.05, 0.3, 4, 8]} />
        <meshStandardMaterial color={limb} roughness={0.9} emissive="#2a1f14" emissiveIntensity={0.5} />
      </mesh>
      {/* Thân */}
      <mesh position={[0, 0.72, 0]}>
        <capsuleGeometry args={[0.115, 0.3, 4, 10]} />
        <meshStandardMaterial color={cloth} roughness={0.9} emissive="#2a1f14" emissiveIntensity={0.5} />
      </mesh>
      {/* Tay */}
      <mesh ref={armL} position={[-0.165, 0.78, 0]}>
        <capsuleGeometry args={[0.035, 0.26, 4, 8]} />
        <meshStandardMaterial color={limb} roughness={0.9} emissive="#2a1f14" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={armR} position={[0.165, 0.78, 0]}>
        <capsuleGeometry args={[0.035, 0.26, 4, 8]} />
        <meshStandardMaterial color={limb} roughness={0.9} emissive="#2a1f14" emissiveIntensity={0.5} />
      </mesh>
      {/* Đầu */}
      <mesh position={[0, 1.02, 0]}>
        <sphereGeometry args={[0.105, 14, 14]} />
        <meshStandardMaterial color="#9c8b76" roughness={0.85} emissive="#2a1f14" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

/** Vòng đi bộ và máy quay bám sau lưng.
 *
 *  Dùng lại `easy-walk` của ba thế giới 3D kia thay vì viết riêng: đi từ Sảnh
 *  thư viện sang đây mà ngón tay phải học lại cách đi là thứ người dùng đọc
 *  thành "hai ứng dụng khác nhau" - đúng lý do file đó được gộp lại.
 *
 *  Khác một chỗ có chủ ý: TỐC ĐỘ. Ba thế giới kia đi 2,6 m/s vì ở đó người ta
 *  đang đi tới chỗ cần tới. Trang này thì không có chỗ nào cần tới, nên đi
 *  nhanh là đang chống lại chính nó. */
const WALK_SPEED = 1.35;

function Wandering({
  walkRef,
  orbitRef,
  poseRef,
  signs,
  onSignNear,
}: {
  walkRef: React.MutableRefObject<WalkState>;
  orbitRef: React.MutableRefObject<OrbitState>;
  poseRef: React.MutableRefObject<{ x: number; z: number; ry: number; stride: number }>;
  signs: QuietSign[];
  onSignNear: (sign: QuietSign | null) => void;
}) {
  const { camera } = useThree();
  const trees = useMemo(() => visibleTrees(), []);
  const nearId = useRef<string | null>(null);

  useFrame((_, delta) => {
    const pose = poseRef.current;
    const walk = walkRef.current;
    const yaw = cameraYawOf(camera, pose.x, pose.z);

    // Đích tự đi tới ghi vào cùng vector với phím và cần điều khiển, nên ba
    // cách điều khiển không bao giờ đánh nhau.
    let input = walk.input;
    if (walk.target) {
      const toward = inputTowardTarget(walk.target, pose.x, pose.z, yaw);
      if (!toward) walk.target = null;
      else input = toward;
    }

    const dir = worldDirection(input, yaw);
    if (dir) {
      const step = WALK_SPEED * delta;
      const next = resolveQuietWalk(pose.x + dir.x * step, pose.z + dir.z * step, trees);
      // Quãng THẬT sự đi được, sau va chạm - đi vào thân cây thì chân dừng
      // theo, không giậm tại chỗ.
      pose.stride += Math.hypot(next.x - pose.x, next.z - pose.z) * 5.2;
      pose.x = next.x;
      pose.z = next.z;
      pose.ry = turnToward(pose.ry, dir.x, dir.z, delta);
    }

    // `lookAtY` phải tính TỪ MẶT ĐẤT của cảnh này, không phải từ y = 0.
    //
    // `applyFollowCamera` sinh ra cho ba thế giới có sàn ở y = 0, nên mặc định
    // của nó (1,45) là ngang ngực một người đứng trên sàn đó. Rừng này hạ mặt
    // đất xuống -0,78, nên cùng con số ấy trỏ vào khoảng không trên đầu nhân
    // vật - máy quay nhìn qua đầu và hình người tụt xuống dưới mép khung. Nhìn
    // ảnh chụp thì thấy một khu rừng không có ai trong đó, và không có lỗi nào
    // để tra.
    // `bounds` giữ máy quay TRONG khoảng trống. Máy quay vai thứ ba đứng cách
    // nhân vật hơn 5m, nên đi tới sát mép vành đi lại là nó lùi ra ngoài, vào
    // giữa vành cây - và thân cây chỉ vẽ một mặt, nên khung hình thành một
    // mảng đen không đọc được là cái gì. Cùng lý do `applyFollowCamera` có
    // tham số này cho Sảnh thư viện.
    //
    // Nới thêm 1,2 so với vành đi lại: kẹp đúng bằng vành thì máy quay dán vào
    // lưng nhân vật ngay khi họ chạm mép, và cú đổi góc nhìn đột ngột ấy còn
    // khó chịu hơn một cái cây chắn ngang.
    const edge = WALK_RADIUS + 1.2;
    applyFollowCamera(camera, pose, orbitRef.current, delta, {
      lookAtY: GROUND_Y + 0.8,
      bounds: { minX: -edge, maxX: edge, minZ: -edge, maxZ: edge },
    });

    // Báo ra ngoài khi ĐỔI tấm biển, không phải mỗi khung hình: setState 60
    // lần một giây sẽ dựng lại cả cây React của trang.
    const near = nearestSign(signs, pose.x, pose.z);
    const id = near?.id ?? null;
    if (id !== nearId.current) {
      nearId.current = id;
      onSignNear(near);
    }
  });

  return null;
}

/** Chạm vào mặt đất là đi tới đó.
 *
 *  Chuyển điểm chạm thành một điểm trên mặt đất bằng giao tuyến với mặt phẳng
 *  y = GROUND_Y, không bằng tia chiếu vào mesh. Mặt đất là một đĩa bán kính 26
 *  nên tia chiếu cũng trúng, nhưng nó sẽ trúng cả thân cây, tấm biển và màn
 *  mưa nằm chắn phía trước - và "chạm vào chỗ muốn tới" mà bị một hạt mưa nuốt
 *  mất là lỗi không ai tái hiện được.
 *
 *  Điểm chạm để trong ref chứ không phải state: nó được sinh ra trong trình xử
 *  lý sự kiện DOM bên ngoài Canvas và chỉ được đọc trong vòng khung hình. */
function TapToWalk({
  tapRef,
  walkRef,
}: {
  tapRef: React.MutableRefObject<{ x: number; y: number } | null>;
  walkRef: React.MutableRefObject<WalkState>;
}) {
  const { camera } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), -GROUND_Y), []);
  const hit = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const tap = tapRef.current;
    if (!tap) return;
    tapRef.current = null;
    raycaster.setFromCamera(new THREE.Vector2(tap.x, tap.y), camera);
    if (!raycaster.ray.intersectPlane(plane, hit)) return;
    // Chạm vào trời thì không có đích nào cả - `intersectPlane` vẫn trả điểm
    // cho tia đi lên nếu mặt phẳng ở phía sau, nên phải tự loại.
    if (!Number.isFinite(hit.x)) return;
    walkRef.current.target = { x: hit.x, z: hit.z };
  });

  return null;
}

export default function QuietForestSceneInner({
  intensity = 0.6,
  reducedMotion = false,
  setDownCount = 0,
  walkRef,
  onSignNear,
}: {
  intensity?: number;
  reducedMotion?: boolean;
  setDownCount?: number;
  /** Ý định di chuyển, sở hữu ở ngoài Canvas: cần điều khiển ảo là một phần
   *  tử HTML nằm đè lên khung, nên nó phải ghi được vào cùng vector mà vòng
   *  lặp vẽ đọc. Cùng khuôn với Sảnh thư viện. */
  walkRef: React.MutableRefObject<WalkState>;
  onSignNear: (sign: QuietSign | null) => void;
}) {
  const { t } = useI18n();
  const signs = useMemo(() => signsOf(t), [t]);
  const pointer = useRef<PointerState>({
    dragging: false,
    yaw: 0,
    pitch: 0,
    gust: { strength: 0, at: 0 },
  });
  /** Vị trí và hướng nhân vật. Ref chứ không state: đổi 60 lần một giây. */
  const pose = useRef({ x: SPAWN.x, z: SPAWN.z, ry: SPAWN.ry, stride: 0 });
  /** Góc máy quay quanh nhân vật. Góc TUYỆT ĐỐI, không phải độ lệch so với
   *  hướng nhân vật - xem chú thích ở OrbitState về cái vòng lặp tự xoáy. */
  /** Góc ngẩng thấp hơn ba thế giới kia: chiều cao máy quay mà
   *  `applyFollowCamera` tính ra cũng lấy mốc y = 0, nên trên mặt đất -0,78
   *  mọi góc ngẩng đều cao hơn ý định đúng 0,78. */
  const orbit = useRef<OrbitState>({ yaw: 0, pitch: 0.14, dist: 5.2 });
  const tap = useRef<{ x: number; y: number } | null>(null);
  /** Tổng quãng kéo của cử chỉ hiện tại, để phân biệt một cú CHẠM với một cú
   *  KÉO mà không phải chia màn hình làm hai vùng. */
  const moved = useRef(0);
  /** Tấm biển đang đứng cạnh. Ở đây chỉ để làm sáng ngọn đèn trên biển đó;
   *  chữ thì do trang bên ngoài hiện, qua `onSignNear`. */
  const [litSign, setLitSign] = useState<string | null>(null);

  useWalkKeys(walkRef);

  const handleSignNear = useCallback(
    (sign: QuietSign | null) => {
      setLitSign(sign?.id ?? null);
      onSignNear(sign);
    },
    [onSignNear]
  );
  /** Toạ độ lần trước, để tự tính quãng dịch. `movementX` của sự kiện pointer
   *  bằng 0 trên phần lớn trình duyệt di động khi nguồn là ngón tay - đó là lý
   *  do thứ hai khiến thao tác kéo "không ăn", và nó chỉ hỏng trên điện thoại
   *  nên rất dễ không ai thấy. */
  const last = useRef<{ x: number; y: number; t: number } | null>(null);

  const begin = (e: React.PointerEvent<HTMLDivElement>) => {
    pointer.current.dragging = true;
    moved.current = 0;
    last.current = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const end = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointer.current.dragging) return;
    pointer.current.dragging = false;
    last.current = null;
    // Dưới 8 điểm ảnh là một cú chạm, không phải cú kéo - cùng ngưỡng với
    // usePointerControls ở ba thế giới kia.
    if (moved.current >= 8) return;
    const rect = e.currentTarget.getBoundingClientRect();
    tap.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
    };
  };

  /** Rời khung hoặc bị huỷ thì chỉ thả cú kéo, KHÔNG tính là một cú chạm: kéo
   *  ra ngoài mép khung rồi nhả tay không phải là "tôi muốn đi tới đó". */
  const cancel = () => {
    pointer.current.dragging = false;
    last.current = null;
  };

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointer.current.dragging || !last.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    const dt = Math.max(1, e.timeStamp - last.current.t);
    last.current = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    moved.current += Math.abs(dx) + Math.abs(dy);

    // Kéo giờ xoay MÁY QUAY quanh nhân vật, không xoay cả sân khấu như trước.
    // Sân khấu xoay được là hợp lý khi cảnh là một bức tranh động; khi có
    // người đứng trong đó thì nghiêng cả khu rừng đi là nghiêng luôn cả mặt
    // đất người ta đang đứng.
    //
    // Không kẹp góc ngang: đi vòng quanh đống lửa rồi muốn nhìn lại phía sau
    // là việc bình thường, và DRAG_YAW_LIMIT sinh ra cho một cảnh đứng yên.
    // Góc ngẩng thì vẫn kẹp - lật qua đỉnh đầu là cách nhanh nhất để mất
    // phương hướng.
    const o = orbit.current;
    o.yaw -= dx * 0.005;
    o.pitch = Math.max(0.05, Math.min(0.85, o.pitch + dy * 0.004));

    // Thổi vào lửa bằng TỐC ĐỘ ngang, không bằng việc trúng ngọn lửa. Lướt tay
    // nhanh ngang qua một ngọn nến thì nó dạt - đó là thứ ai cũng đã làm ngoài
    // đời, nên không cần giải thích. Kéo chậm để nhìn nghiêng thì dưới ngưỡng
    // và lửa đứng yên.
    const speed = (dx / dt) * 1000; // điểm ảnh mỗi giây
    if (Math.abs(speed) > BLOW_SPEED) {
      const strength = Math.max(-1.4, Math.min(1.4, (speed / BLOW_SPEED) * 0.5));
      // `at: -1` là "chưa đóng dấu" - xem chú thích ở PointerState.
      pointer.current.gust = { strength, at: -1 };
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
      onPointerLeave={cancel}
      onPointerCancel={cancel}
    >
      <Canvas
        // Trần DPR: màn Retina 3x không cần render 3x cho một khoảng rừng tối,
        // và đây là khác biệt lớn nhất giữa mát máy và cháy quạt.
        dpr={[1, 1.75]}
        camera={{ position: [SPAWN.x, 2.4, SPAWN.z + 5.4], fov: 48 }}
        onCreated={({ camera }) => camera.lookAt(SPAWN.x, 1.0, SPAWN.z)}
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

        <Ground />
        <Forest />
        <ShelterTree />
        <Rain />
        <Campfire />
        <Flame intensity={intensity} pointer={pointer} />
        <Embers setDownCount={setDownCount} />

        {signs.map((s) => (
          <Signpost key={s.id} sign={s} lit={s.id === litSign} />
        ))}
        <Wanderer poseRef={pose} />
        <TapToWalk tapRef={tap} walkRef={walkRef} />
        <Wandering
          walkRef={walkRef}
          orbitRef={orbit}
          poseRef={pose}
          signs={signs}
          onSignNear={handleSignNear}
        />
      </Canvas>
    </div>
  );
}
