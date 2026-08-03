"use client";

import { useEffect } from "react";
import * as THREE from "three";

/** Cách đi lại trong mọi cảnh 3D của ứng dụng.
 *
 *  Bản đầu tiên (thư viện, rồi phòng nhóm) dùng kiểu "xe tăng": trái/phải xoay
 *  người, lên/xuống tiến lùi. Kiểu đó dễ viết và khó dùng - muốn đi sang ngang
 *  phải xoay rồi đi rồi xoay lại, và người chưa từng chơi game 3D gần như luôn
 *  bấm sai hướng ở lần đầu. Ba thay đổi ở đây, cả ba đều nhằm đúng một việc là
 *  bỏ bước "dịch trong đầu" giữa cái mình muốn và cái mình bấm:
 *
 *  1. ĐI THEO HƯỚNG NHÌN. Bấm tới là đi về phía đang nhìn thấy, bấm trái là đi
 *     sang trái màn hình. Nhân vật tự quay theo hướng đi. Không còn khái niệm
 *     "hướng của nhân vật" mà người dùng phải theo dõi riêng.
 *  2. MỘT VECTOR, NHIỀU NGUỒN. Phím, cần điều khiển ảo và tự-đi-tới-đích cùng
 *     ghi vào một vector duy nhất, nên chúng không bao giờ đánh nhau và thêm
 *     một cách điều khiển nữa không phải sửa vòng lặp chuyển động.
 *  3. CHẠM ĐỂ ĐI TỚI. Chạm vào một điểm trên sàn là nhân vật tự đi tới đó. Đây
 *     là cách duy nhất trong ba cách không đòi hỏi người dùng biết trước gì
 *     cả, và trên điện thoại thì nó là cách dễ nhất. */

export interface MoveInput {
  /** Trái (-1) ↔ phải (+1) theo màn hình. */
  x: number;
  /** Lùi (-1) ↔ tới (+1) theo màn hình. */
  y: number;
}

export interface WalkState {
  /** Ý định di chuyển từ phím và cần điều khiển. */
  input: MoveInput;
  /** Đích đang tự đi tới, hoặc null. */
  target: { x: number; z: number } | null;
  /** Phím nào đang giữ - giữ riêng để nhả một phím không xoá phím kia. */
  keys: Record<string, boolean>;
}

export function createWalkState(): WalkState {
  return { input: { x: 0, y: 0 }, target: null, keys: {} };
}

function keyAxis(key: string): [keyof MoveInput, number] | null {
  switch (key) {
    case "w": case "W": case "ArrowUp": return ["y", 1];
    case "s": case "S": case "ArrowDown": return ["y", -1];
    case "a": case "A": case "ArrowLeft": return ["x", -1];
    case "d": case "D": case "ArrowRight": return ["x", 1];
    default: return null;
  }
}

function recomputeFromKeys(state: WalkState) {
  let x = 0;
  let y = 0;
  for (const [key, held] of Object.entries(state.keys)) {
    if (!held) continue;
    const axis = keyAxis(key);
    if (!axis) continue;
    if (axis[0] === "x") x += axis[1];
    else y += axis[1];
  }
  state.input.x = Math.max(-1, Math.min(1, x));
  state.input.y = Math.max(-1, Math.min(1, y));
}

/** Bàn phím. Bấm phím cũng huỷ luôn đích tự đi: người dùng vừa giành lại
 *  quyền lái thì nhân vật không được tiếp tục đi về chỗ cũ. */
export function useWalkKeys(stateRef: React.MutableRefObject<WalkState>) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      // Đang gõ chữ thì không được nuốt phím - gõ chat mà nhân vật chạy theo
      // từng chữ thì cả hai việc đều hỏng.
      if (target && (/INPUT|TEXTAREA|SELECT/.test(target.tagName) || target.isContentEditable)) return;
      if (!keyAxis(e.key)) return;
      e.preventDefault();
      stateRef.current.keys[e.key] = true;
      stateRef.current.target = null;
      recomputeFromKeys(stateRef.current);
    };
    const up = (e: KeyboardEvent) => {
      if (!keyAxis(e.key)) return;
      stateRef.current.keys[e.key] = false;
      recomputeFromKeys(stateRef.current);
    };
    // Rời tab thì nhả hết, nếu không nhân vật đi mãi.
    const blur = () => {
      stateRef.current.keys = {};
      stateRef.current.input.x = 0;
      stateRef.current.input.y = 0;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, [stateRef]);
}

/** Hướng đi trong thế giới, suy từ ý định trên màn hình và góc camera.
 *
 *  Đây là chỗ "đi theo hướng nhìn" thực sự xảy ra: vector người dùng bấm được
 *  quay đúng bằng góc camera, nên "tới" luôn là "vào sâu trong màn hình" bất kể
 *  camera đang đứng ở đâu. Trả về null khi không có ý định đi. */
export function worldDirection(input: MoveInput, cameraYaw: number): { x: number; z: number } | null {
  const mag = Math.hypot(input.x, input.y);
  if (mag < 0.08) return null;
  const nx = input.x / mag;
  const ny = input.y / mag;
  const sin = Math.sin(cameraYaw);
  const cos = Math.cos(cameraYaw);
  // Trục -z là hướng camera đang nhìn khi yaw = 0.
  return {
    x: nx * cos - ny * sin,
    z: -(ny * cos + nx * sin),
  };
}

/** Góc quay của camera quanh trục đứng, đọc từ chính ma trận của nó. Lấy ở đây
 *  thay vì tự cộng dồn: camera còn được nội suy mỗi khung hình, nên con số tự
 *  cộng sẽ lệch dần khỏi thứ người dùng đang nhìn thấy. */
export function cameraYawOf(camera: THREE.Camera, focusX: number, focusZ: number): number {
  return Math.atan2(camera.position.x - focusX, camera.position.z - focusZ) + Math.PI;
}

/** Quay người mượt về hướng đang đi, theo cung ngắn. */
export function turnToward(currentRy: number, dirX: number, dirZ: number, delta: number): number {
  const want = Math.atan2(-dirX, -dirZ);
  let diff = want - currentRy;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return currentRy + diff * Math.min(1, delta * 12);
}

/** Còn cách đích gần hơn khoảng này thì coi như đã tới. */
export const ARRIVE_RADIUS = 0.35;

/** Ý định di chuyển sinh ra từ đích tự đi, đã đổi về hệ màn hình để đi chung
 *  đường với phím và cần điều khiển.
 *
 *  Trả về null khi đã tới nơi - phía gọi xoá đích. */
export function inputTowardTarget(
  target: { x: number; z: number },
  x: number,
  z: number,
  cameraYaw: number
): MoveInput | null {
  const dx = target.x - x;
  const dz = target.z - z;
  if (Math.hypot(dx, dz) < ARRIVE_RADIUS) return null;
  // Nghịch đảo của worldDirection: đưa hướng thế giới về hệ màn hình.
  const sin = Math.sin(-cameraYaw);
  const cos = Math.cos(-cameraYaw);
  const sx = dx * cos - -dz * sin;
  const sy = -dz * cos + dx * sin;
  const mag = Math.hypot(sx, sy) || 1;
  return { x: sx / mag, y: sy / mag };
}
