"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { oakTexture, speechBubbleTexture } from "@/components/lobby/room-textures";
import {
  DEFAULT_ORBIT,
  FOV,
  HEAD_TOP,
  LOOK_AT,
  bubbleLayout,
  clampOrbit,
  orbitToPosition,
  type Orbit,
} from "@/components/interview/interview-camera";

/** Phòng phỏng vấn 3D: một người mặc vest ngồi sau bàn, đối diện người học.
 *
 *  Dựng bằng primitive như cả phần còn lại của thế giới 3D trong app (phố nghề,
 *  sảnh, phòng thi ở CivicScenes) chứ không dán ảnh render.
 *
 *  Lý do là kỹ thuật chứ không phải khẩu vị: bộ ảnh public/careers là JPG
 *  1024×1024 nền studio đặc màu và KHÔNG có kênh alpha. Dán làm billboard thì
 *  thấy nguyên ô vuông nền hồng đứng giữa phòng; tách nền thì phải cắt tay từng
 *  tấm, và mỗi người phỏng vấn mới lại là một tấm nữa. Khối hộp thì quay được,
 *  gật được, và đổi màu vest là đổi được người.
 *
 *  Camera QUAY ĐƯỢC, trong biên hẹp, và luôn nhắm vào đầu người phỏng vấn.
 *
 *  Bản đầu để camera đứng yên với lập luận "thêm điều khiển là mời người ta
 *  nghịch cảnh trong lúc lẽ ra đang nghĩ câu trả lời". Lập luận ấy chỉ đúng khi
 *  khung hình đã đúng - mà nó sai: camera không được bảo nhìn vào đâu nên nhìn
 *  gốc toạ độ, tức điểm giữa SÀN, và cái đầu ở cao độ 1,56 nằm hẳn ngoài khung.
 *  Đứng yên ở một khung hình sai nghĩa là không có cách nào thấy người đối
 *  diện. Xem interview-camera.ts cho phần hình học và các biên.
 *
 *  Và câu hỏi giờ có BONG BÓNG THOẠI trong cảnh, dùng lại đúng
 *  `speechBubbleTexture` của sảnh 3D - thứ đã có đuôi trỏ xuống và tự xuống
 *  dòng theo bề rộng. */

/** Màu vest theo vòng thi: vòng càng cao người đối diện càng "đậm" - xanh xám ở
 *  vòng sàng lọc, than chì ở vòng áp lực. */
const SUITS: Record<string, { suit: string; tie: string }> = {
  de: { suit: "#5b6b7d", tie: "#8fb3c9" },
  "trung-binh": { suit: "#3f4b5c", tie: "#b0803a" },
  kho: { suit: "#26292f", tie: "#8d2f37" },
  "tat-ca": { suit: "#33404f", tie: "#c2a04a" },
};

/** Người phỏng vấn. Ngồi, nên chỉ dựng thân, đầu và hai cánh tay đặt trên bàn -
 *  chân khuất sau mặt bàn nên không dựng, đúng cách phòng thi ở CivicScenes chỉ
 *  dựng thứ nhìn thấy. */
function Interviewer({ suit, tie }: { suit: string; tie: string }) {
  const head = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);

  useFrame((state) => {
    const tSec = state.clock.elapsedTime;
    // Thở, biên độ rất nhỏ - to hơn một chút là thành nhún nhảy.
    if (torso.current) torso.current.position.y = 0.92 + Math.sin(tSec * 1.4) * 0.012;
    if (head.current) {
      // Đang hỏi thì gật theo nhịp nói; im thì chỉ đảo đầu rất chậm, đủ để
      // không đọc ra là một bức tượng.
      // "Đang nói" là 2,6 giây đầu kể từ khi cảnh dựng lên, đọc thẳng từ đồng
      // hồ của chính cảnh. Cha dựng lại cảnh bằng `key` mỗi câu hỏi, nên mốc
      // này luôn khớp với lượt hỏi mà không cần React hẹn giờ hộ.
      head.current.rotation.x = tSec < 2.6 ? Math.sin(tSec * 6) * 0.05 : Math.sin(tSec * 0.7) * 0.02;
      head.current.rotation.y = Math.sin(tSec * 0.5) * 0.08;
    }
  });

  return (
    <group position={[0, 0, -1.1]}>
      <group ref={torso} position={[0, 0.92, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.72, 0.78, 0.42]} />
          <meshStandardMaterial color={suit} roughness={0.72} />
        </mesh>
        <mesh position={[0, 0.06, 0.215]}>
          <boxGeometry args={[0.24, 0.5, 0.02]} />
          <meshStandardMaterial color="#f2efe8" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.02, 0.23]}>
          <boxGeometry args={[0.08, 0.42, 0.02]} />
          <meshStandardMaterial color={tie} roughness={0.55} />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.15, 0.16, 0.215]} rotation={[0, 0, side * 0.28]}>
            <boxGeometry args={[0.14, 0.44, 0.025]} />
            <meshStandardMaterial color={suit} roughness={0.6} />
          </mesh>
        ))}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.46, -0.06, 0.06]}>
            <mesh castShadow rotation={[0.5, 0, side * 0.12]}>
              <boxGeometry args={[0.2, 0.62, 0.2]} />
              <meshStandardMaterial color={suit} roughness={0.72} />
            </mesh>
            <mesh position={[0, -0.32, 0.24]}>
              <boxGeometry args={[0.18, 0.12, 0.24]} />
              <meshStandardMaterial color="#d9a882" roughness={0.85} />
            </mesh>
          </group>
        ))}
      </group>

      <mesh position={[0, 1.36, 0]}>
        <boxGeometry args={[0.16, 0.12, 0.16]} />
        <meshStandardMaterial color="#d9a882" roughness={0.85} />
      </mesh>

      <group ref={head} position={[0, 1.56, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.42, 0.44, 0.4]} />
          <meshStandardMaterial color="#e3b28c" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.19, -0.01]}>
          <boxGeometry args={[0.45, 0.14, 0.43]} />
          <meshStandardMaterial color="#2b2118" roughness={0.9} />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.1, 0.02, 0.201]}>
            <boxGeometry args={[0.07, 0.06, 0.01]} />
            <meshStandardMaterial color="#241c16" roughness={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Kệ sách áp tường trái.
 *
 *  Gáy sách dựng bằng vòng lặp chứ không gõ tay từng cái: mười hai gáy gõ tay
 *  là mười hai lần chọn màu và chiều cao, và kết quả luôn đọc ra là có quy
 *  luật. Chiều cao và màu lấy từ chỉ số qua một hàm băm nhỏ - trông ngẫu nhiên,
 *  nhưng giống hệt nhau ở mọi lần dựng, nên cảnh không nhấp nháy khi React
 *  render lại. */
const SPINE_COLORS = ["#7a3b2e", "#2f4a3d", "#6b5535", "#3b3f56", "#5c3143", "#43503a"];

function Bookshelf() {
  const shelves = [0.95, 1.42, 1.89];
  return (
    <group position={[-1.95, 0, -3.0]}>
      {/* Thân kệ */}
      <mesh position={[0, 1.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 2.3, 0.34]} />
        <meshStandardMaterial color="#4a3526" roughness={0.9} />
      </mesh>
      {shelves.map((y) => (
        <group key={y}>
          <mesh position={[0, y - 0.02, 0.02]}>
            <boxGeometry args={[1.6, 0.04, 0.3]} />
            <meshStandardMaterial color="#5c4331" roughness={0.85} />
          </mesh>
          {Array.from({ length: 11 }).map((_, i) => {
            const seed = (i * 37 + Math.round(y * 100)) % 97;
            const h = 0.26 + (seed % 5) * 0.022;
            return (
              <mesh key={i} position={[-0.7 + i * 0.135, y + h / 2, 0.03]} castShadow>
                <boxGeometry args={[0.1, h, 0.22]} />
                <meshStandardMaterial color={SPINE_COLORS[seed % SPINE_COLORS.length]} roughness={0.8} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

/** Đèn bàn thả trần. Chỉ dựng chao và dây - bóng đèn là một khối phát sáng, còn
 *  ánh sáng thật do `pointLight` ở chỗ dựng cảnh lo. Tách hai thứ ra vì một
 *  khối emissive KHÔNG chiếu sáng gì trong three.js, và tưởng nó chiếu là lý do
 *  hay gặp khiến người ta thêm chao đèn rồi thắc mắc sao phòng vẫn tối. */
function DeskLamp() {
  return (
    <group position={[-1.15, 0, -1.15]}>
      <mesh position={[0, 2.85, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.9, 6]} />
        <meshStandardMaterial color="#2b2620" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.32, 0]} castShadow>
        <coneGeometry args={[0.3, 0.28, 16, 1, true]} />
        <meshStandardMaterial color="#2f2a23" roughness={0.75} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshStandardMaterial color="#ffe9bf" emissive="#ffcf85" emissiveIntensity={2.2} />
      </mesh>
    </group>
  );
}

/** Chậu cây. Tán lá là ba khối cầu bẹt lệch nhau - một khối cầu duy nhất đọc ra
 *  là quả bóng, ba khối lệch mới đọc ra là lá. */
function Plant() {
  return (
    <group position={[-1.75, 0, -2.15]}>
      <mesh position={[0, 0.17, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.17, 0.13, 0.34, 12]} />
        <meshStandardMaterial color="#c9b9a4" roughness={0.9} />
      </mesh>
      {[
        [0, 0.56, 0, 0.24],
        [0.14, 0.47, 0.06, 0.17],
        [-0.12, 0.5, -0.05, 0.15],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]} scale={[1, 0.78, 1]} castShadow>
          <sphereGeometry args={[r, 12, 10]} />
          <meshStandardMaterial color={i === 0 ? "#3f6b45" : "#4a7c50"} roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

/** Bàn, ghế, tường, cửa sổ. Kích thước chọn để camera ở ghế đối diện nhìn ra là
 *  thấy trọn người ngồi sau bàn mà không thấy mép phòng. */
function Room() {
  const floor = useMemo(() => oakTexture(4, 4), []);
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial map={floor} roughness={0.9} />
      </mesh>

      <mesh position={[0, 1.7, -3.4]} receiveShadow>
        <boxGeometry args={[9, 3.4, 0.14]} />
        {/* Sáng hơn #2a2723 cũ: tường và vest than chì trước đây gần như cùng
            một giá trị độ sáng, nên bóng người tan vào nền. */}
        <meshStandardMaterial color="#3d382f" roughness={0.95} />
      </mesh>
      {/* Cửa sổ, có KHUNG và đẩy lên cao hơn.
          Bản đầu là một tấm xanh trần ở ngang tầm đầu người: với khung hình cũ
          thì không ai thấy nó, còn với khung hình đã sửa thì nó nằm ngay cạnh
          mặt người phỏng vấn và đọc ra là một tấm bảng xanh lơ lửng chứ không
          phải cửa sổ - thấy rõ trong ảnh chụp màn hình. Một cái khung sẫm quanh
          nó là toàn bộ khác biệt giữa "ô cửa" và "hình chữ nhật màu". */}
      <group position={[2.15, 2.25, -3.3]}>
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[2.06, 1.26, 0.06]} />
          <meshStandardMaterial color="#4a4038" roughness={0.9} />
        </mesh>
        <mesh>
          <boxGeometry args={[1.86, 1.06, 0.05]} />
          <meshStandardMaterial color="#9dc3df" emissive="#6c9dc4" emissiveIntensity={0.45} />
        </mesh>
        {/* Nẹp giữa - một ô kính liền không đọc ra là cửa sổ. */}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[0.05, 1.06, 0.03]} />
          <meshStandardMaterial color="#4a4038" roughness={0.9} />
        </mesh>
      </group>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 4.4, 1.7, -0.6]} receiveShadow>
          <boxGeometry args={[0.14, 3.4, 6]} />
          <meshStandardMaterial color="#423c33" roughness={0.95} />
        </mesh>
      ))}

      <mesh position={[0, 0.74, -0.35]} castShadow receiveShadow>
        <boxGeometry args={[2.7, 0.08, 1.15]} />
        <meshStandardMaterial color="#5b4332" roughness={0.65} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 1.15, 0.36, -0.35]} castShadow>
          <boxGeometry args={[0.12, 0.72, 0.9]} />
          <meshStandardMaterial color="#4a3a28" roughness={0.8} />
        </mesh>
      ))}

      {/* Lưng ghế nhô lên sau vai người phỏng vấn. */}
      <mesh position={[0, 1.15, -1.62]} castShadow>
        <boxGeometry args={[0.9, 1.0, 0.12]} />
        <meshStandardMaterial color="#211f1d" roughness={0.85} />
      </mesh>

      {/* Hai tệp hồ sơ trên bàn - thứ duy nhất nói ra đây là một buổi phỏng vấn
          chứ không phải một cái bàn trống. */}
      <mesh position={[-0.75, 0.8, -0.2]} rotation={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.42, 0.03, 0.3]} />
        <meshStandardMaterial color="#efe9dd" roughness={0.9} />
      </mesh>
      <mesh position={[0.8, 0.79, -0.25]} rotation={[0, -0.12, 0]} castShadow>
        <boxGeometry args={[0.3, 0.02, 0.22]} />
        <meshStandardMaterial color="#d8cfbe" roughness={0.9} />
      </mesh>
    </>
  );
}

/** Bong bóng thoại của người phỏng vấn.
 *
 *  Dùng lại `speechBubbleTexture` của sảnh 3D: nó đã tự xuống dòng theo bề
 *  rộng, đã có đuôi trỏ XUỐNG, và đã dựng canvas đúng chiều cao theo số dòng.
 *  Viết bản thứ hai chỉ để có một bong bóng hình khác là thêm một chỗ để chữ
 *  bị cắt khi câu hỏi dài.
 *
 *  Đuôi trỏ xuống nên bong bóng phải nằm NGAY TRÊN đầu - lệch sang bên thì cái
 *  đuôi trỏ vào không khí và cả hiệu ứng "người này đang nói" mất, đúng điều
 *  chú thích đầu InterviewerStage.tsx đã ghi về phiên bản DOM của nó.
 *
 *  Luôn quay về camera, vì camera giờ kéo được: một tấm phẳng đứng yên sẽ mỏng
 *  dần rồi biến thành một đường thẳng khi người học kéo sang bên. */
function SpeechBubble({ text }: { text: string }) {
  const group = useRef<THREE.Group>(null);
  const bubble = useMemo(() => {
    if (!text.trim()) return null;
    try {
      return speechBubbleTexture(text, "left");
    } catch {
      // Không lấy được canvas 2D thì bỏ bong bóng, không làm sập cả cảnh - bản
      // chữ dưới khung vẫn còn nguyên.
      return null;
    }
  }, [text]);

  useEffect(() => () => bubble?.texture.dispose(), [bubble]);

  // Kích thước và chỗ đặt tính từ chỗ CÒN TRỐNG trong khung, không đặt cứng.
  // Bản đầu đặt cứng 2.1 và bị cắt mất hai dòng trên ngay ở câu hỏi thật đầu
  // tiên - chiều cao bong bóng đi theo độ dài câu hỏi, mà ngân hàng câu hỏi có
  // cả câu một dòng lẫn câu năm dòng. Xem bubbleLayout.
  // `maxWidth` hẹp hơn mặc định 2,3: bong bóng giờ đứng CẠNH người phỏng vấn
  // chứ không nằm trên đỉnh đầu, nên nó phải vừa khoảng trống bên phải chứ
  // không được phép trải hết bề ngang khung.
  const layout = bubble ? bubbleLayout(bubble.aspect, { maxWidth: 2.0 }) : null;

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    g.quaternion.copy(state.camera.quaternion);
    // Hiện dần trong 0,35 giây đầu rồi nhấc lên chỗ nghỉ. Đọc đồng hồ của cảnh
    // chứ không nhận prop: cha dựng lại cảnh mỗi câu hỏi bằng `key`, nên mốc 0
    // luôn đúng là lúc câu hỏi này được đặt ra.
    const t = Math.min(1, state.clock.elapsedTime / 0.35);
    g.scale.setScalar(0.82 + t * 0.18);
  });

  if (!bubble || !layout) return null;

  // BÊN PHẢI người phỏng vấn, ngang tầm đầu - không còn treo trên đỉnh đầu.
  //
  // Đuôi cũng đổi theo: `"left"` cho nó trỏ ngược về phía người nói. Bong bóng
  // đặt lệch phải mà giữ đuôi chỉ xuống thì đuôi trỏ vào khoảng không bên cạnh
  // vai, và cả hiệu ứng "người này đang nói" mất theo - đó chính là thứ khối
  // này tồn tại để tạo ra.
  //
  // `y` lấy từ HEAD_TOP thay vì `layout.y`: `layout.y` đặt đáy bong bóng ngay
  // trên đỉnh đầu, đúng cho vị trí cũ. Ở bên cạnh thì nó nên ngang mặt.
  return (
    <group ref={group} position={[1.28, HEAD_TOP - 0.08, -1.0]}>
      <mesh>
        <planeGeometry args={[layout.width, layout.height]} />
        <meshBasicMaterial map={bubble.texture} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}

/** Kéo để nhìn quanh. Viết tay thay vì dùng OrbitControls của drei vì repo
 *  không có drei, và vì phần cần ở đây hẹp hơn hẳn: quay quanh một điểm cố
 *  định, kẹp trong biên, không pan.
 *
 *  KHÔNG có "trôi về chỗ cũ". Sảnh 3D có `recenterOrbit` vì camera ở đó phải
 *  bám sau lưng nhân vật đang đi; ở đây tâm quay là đầu người phỏng vấn và biên
 *  đủ hẹp để mọi góc hợp lệ đều còn thấy mặt, nên không có gì phải cứu - và một
 *  cú giật lại sau mỗi lần kéo gây khó chịu hơn hẳn việc tự kéo lại. */
function CameraRig() {
  const { camera, gl } = useThree();
  const orbit = useRef<Orbit>({ ...DEFAULT_ORBIT });
  const target = useRef<Orbit>({ ...DEFAULT_ORBIT });
  const position = useRef(new THREE.Vector3());

  useEffect(() => {
    // Ba biến dưới là trạng thái của MỘT cử chỉ kéo: đang kéo chưa, và điểm
    // chạm trước đó. Chúng sống trong closure của effect và chỉ được các trình
    // xử lý mà chính effect này gắn đọc/ghi - không có gì bên ngoài nhìn thấy.
    // Cùng lý do và cùng cách xử lý như usePointerControls trong
    // components/world-controls/easy-walk.ts; đổi sang ref thì được lint xanh
    // mà mất việc chúng tự sạch khi effect chạy lại.
    const el = gl.domElement;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      target.current = clampOrbit({
        yaw: target.current.yaw - (e.clientX - lastX) * 0.004,
        pitch: target.current.pitch + (e.clientY - lastY) * 0.003,
        dist: target.current.dist,
      });
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };
    // `passive: false` + preventDefault: không có nó thì lăn chuột trên cảnh
    // cuộn cả trang, và trang này bị ghim đúng một màn hình nên cú cuộn ấy
    // không đi đâu cả - chỉ làm bố cục nhảy.
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      target.current = clampOrbit({
        ...target.current,
        dist: target.current.dist + Math.sign(e.deltaY) * 0.18,
      });
    };

    // Con trỏ và `touch-action` đặt bằng class Tailwind trên khối bọc canvas ở
    // InterviewerStage.tsx, không sửa `el.style` ở đây: sửa style của canvas
    // trong effect vừa là thứ react-hooks/immutability chặn, vừa là một chỗ
    // nữa quyết định hình dạng con trỏ ngoài CSS.
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
    };
  }, [gl]);

  useFrame((_, delta) => {
    // Đuổi theo góc đích thay vì nhảy tới: cú kéo thành mượt, và quan trọng hơn
    // là dạng số mũ nên kết quả không phụ thuộc tốc độ khung hình.
    const k = Math.min(1, 1 - Math.exp(-delta / 0.08));
    orbit.current.yaw += (target.current.yaw - orbit.current.yaw) * k;
    orbit.current.pitch += (target.current.pitch - orbit.current.pitch) * k;
    orbit.current.dist += (target.current.dist - orbit.current.dist) * k;
    camera.position.copy(orbitToPosition(orbit.current, position.current));
    camera.lookAt(LOOK_AT);
  });

  return null;
}

export default function InterviewRoomScene({ round, question }: { round: string; question?: string }) {
  const suit = SUITS[round] ?? SUITS["tat-ca"];
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      // Vị trí ban đầu tính từ cùng một chỗ với lúc kéo, nên khung hình đầu
      // tiên đã đúng - không có một khung nhìn sai rồi mới chỉnh lại.
      camera={{ position: orbitToPosition(DEFAULT_ORBIT).toArray(), fov: FOV }}
      gl={{ antialias: true, powerPreference: "low-power" }}
    >
      <color attach="background" args={["#1d1813"]} />
      <fog attach="fog" args={["#1d1813", 8, 20]} />
      {/* Sáng hơn hẳn bản đầu (0.55/0.5/0.9). Người dùng báo "không rõ", và
          phòng tối là một nửa lý do: vest than chì trên nền tường #2a2723 gần
          như cùng một giá trị độ sáng, nên cả người đọc ra là một mảng tối.
          Ánh sáng môi trường mạnh hơn tách được hai mảng đó ra. */}
      {/* Ánh sáng nền HẠ MẠNH so với bản trước (0,95 và 0,8).
          Ba nguồn fill cộng lại từng lên tới ~3,1 và chúng rửa trôi bóng của
          đèn chính - đó là lý do mọi khối hộp trong phòng đọc ra phẳng lì dù
          `castShadow` đã bật đủ. Giữ nền vừa đủ để chỗ tối không đen đặc, còn
          hình khối để đèn bàn và đèn chính lo. */}
      <ambientLight intensity={0.28} color="#ffeeda" />
      <hemisphereLight args={["#ffe8c8", "#2a221a", 0.32]} />
      <directionalLight
        position={[2.5, 4.5, 3]}
        intensity={1.15}
        color="#fff3dd"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Đèn rọi MẶT, đặt ở phía người học. Đây là thứ thiếu hẳn ở bản đầu:
          mọi nguồn sáng đều ở trên và phía sau, nên khuôn mặt - phần duy nhất
          người học cần nhìn - luôn nằm trong bóng của chính cái đầu. Không đổ
          bóng, vì nó chỉ để nâng độ sáng chứ không để tạo hình khối. */}
      <pointLight position={[0, 2.0, 1.6]} intensity={0.85} distance={7} decay={2} color="#fff1e0" />
      {/* Đèn bàn: nguồn sáng ẤM, gần, và là thứ tạo ra vùng sáng trên mặt bàn.
          Đặt hơi lệch trái để bóng người phỏng vấn đổ chéo chứ không đổ thẳng
          ra sau - bóng thẳng đọc ra như đèn flash. */}
      <pointLight position={[-1.15, 2.15, -1.15]} intensity={1.8} distance={4.6} decay={2} color="#ffd9a0" castShadow />
      <Room />
      <Bookshelf />
      <DeskLamp />
      <Plant />
      <Interviewer suit={suit.suit} tie={suit.tie} />
      {question ? <SpeechBubble text={question} /> : null}
      <CameraRig />
    </Canvas>
  );
}
