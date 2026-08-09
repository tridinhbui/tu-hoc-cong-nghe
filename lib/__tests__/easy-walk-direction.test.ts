import { describe, expect, it } from "vitest";
import * as THREE from "three";
import {
  applyFollowCamera,
  cameraYawOf,
  inputTowardTarget,
  worldDirection,
  type OrbitState,
} from "@/components/world-controls/easy-walk";

/** Hướng đi phải khớp với thứ người dùng đang nhìn thấy.
 *
 *  Lý do bài này tồn tại: /loi-nhan đi ngược. Đẩy cần điều khiển về phía trước
 *  thì nhân vật đi về phía máy quay, trái thành phải. Không có gì báo lỗi, vì
 *  cả bốn thế giới 3D dùng chung `worldDirection` và ba thế giới kia truyền
 *  `orbit.yaw` vào, còn cảnh rừng truyền `cameraYawOf(camera, ...)` - và hàm
 *  ấy trả về `orbit.yaw + π`, tức quay toàn bộ input 180 độ.
 *
 *  Và lý do nó sống lâu: `inputTowardTarget` là hàm NGHỊCH ĐẢO của
 *  `worldDirection` dùng cùng một yaw, nên chạm-để-đi tự triệt tiêu sai số. Chỉ
 *  bàn phím và cần điều khiển bị. Một bài kiểm tra vòng tròn (đổi đi rồi đổi
 *  lại) sẽ xanh trong khi trò chơi vẫn đi ngược, nên bài này neo vào TRỤC THẾ
 *  GIỚI chứ không neo vào tính đối xứng.
 */

const FORWARD = { x: 0, y: 1 };
const BACK = { x: 0, y: -1 };
const RIGHT = { x: 1, y: 0 };
const LEFT = { x: -1, y: 0 };

describe("worldDirection, quy ước trục", () => {
  it("yaw = 0 nghĩa là máy quay nhìn theo -z, nên tiến là -z", () => {
    const dir = worldDirection(FORWARD, 0)!;
    expect(dir.x).toBeCloseTo(0, 10);
    expect(dir.z).toBeCloseTo(-1, 10);
  });

  it("lùi là +z, phải là +x, trái là -x khi yaw = 0", () => {
    expect(worldDirection(BACK, 0)!.z).toBeCloseTo(1, 10);
    expect(worldDirection(RIGHT, 0)!.x).toBeCloseTo(1, 10);
    expect(worldDirection(LEFT, 0)!.x).toBeCloseTo(-1, 10);
  });

  it("quay máy quay 90 độ thì 'tiến' quay theo đúng 90 độ", () => {
    const dir = worldDirection(FORWARD, Math.PI / 2)!;
    expect(dir.x).toBeCloseTo(-1, 10);
    expect(dir.z).toBeCloseTo(0, 10);
  });
});

describe("cameraYawOf khớp với chỗ máy quay thực sự đứng", () => {
  /** Máy quay đặt bởi applyFollowCamera cho một orbit yaw cho trước. Chạy lerp
   *  nhiều lần để nó tới đúng vị trí đích thay vì còn ở giữa đường. */
  function settledCamera(orbitYaw: number, pose = { x: 0, z: 0 }) {
    const camera = new THREE.PerspectiveCamera();
    const orbit: OrbitState = { yaw: orbitYaw, pitch: 0.35, dist: 6 };
    for (let i = 0; i < 200; i += 1) applyFollowCamera(camera, pose, orbit, 0.1);
    return { camera, orbit };
  }

  it("trả về đúng orbit.yaw - cùng con số ba thế giới kia truyền vào", () => {
    // Đây là điều kiện quan trọng nhất: bốn thế giới phải đi giống nhau, và ba
    // trong bốn truyền orbit.yaw. Lệch π ở đây là đi ngược ở đúng một trang.
    for (const yaw of [0, 0.7, Math.PI / 2, 2.5, -1.2, Math.PI]) {
      const { camera } = settledCamera(yaw);
      const got = cameraYawOf(camera, 0, 0);
      const diff = Math.atan2(Math.sin(got - yaw), Math.cos(got - yaw));
      expect(Math.abs(diff), `yaw ${yaw}`).toBeLessThan(1e-6);
    }
  });

  it("tiến thì ĐI XA máy quay, không đi về phía nó", () => {
    // Bài kiểm tra mà người dùng thực sự chạy: đẩy tiến, và khoảng cách tới máy
    // quay phải tăng lên.
    for (const yaw of [0, 1.1, Math.PI / 2, -2.0]) {
      const { camera } = settledCamera(yaw);
      const dir = worldDirection(FORWARD, cameraYawOf(camera, 0, 0))!;
      const before = Math.hypot(camera.position.x, camera.position.z);
      const after = Math.hypot(camera.position.x - dir.x, camera.position.z - dir.z);
      expect(after, `yaw ${yaw}`).toBeGreaterThan(before);
    }
  });

  it("phải là bên phải MÀN HÌNH, không phải bên trái", () => {
    for (const yaw of [0, 0.9, -1.7]) {
      const { camera } = settledCamera(yaw);
      const dir = worldDirection(RIGHT, cameraYawOf(camera, 0, 0))!;
      // Vector "phải" của máy quay, đọc từ ma trận của chính nó.
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
      const dot = right.x * dir.x + right.z * dir.z;
      expect(dot, `yaw ${yaw}`).toBeGreaterThan(0.9);
    }
  });
});

describe("chạm-để-đi che mất lỗi, nên đừng chỉ kiểm nó", () => {
  it("vòng tròn qua inputTowardTarget xanh với BẤT KỲ yaw nào, kể cả yaw sai", () => {
    // Chính vì thế mà lỗi trên sống được: đổi đích thành input rồi đổi input
    // thành hướng bằng cùng một yaw thì sai số triệt tiêu. Neo lại điều đó ở
    // đây để không ai coi bài kiểm tra vòng tròn là bằng chứng hướng đi đúng.
    const target = { x: 3, z: -4 };
    for (const yaw of [0, 1.3, Math.PI, -2.2]) {
      const input = inputTowardTarget(target, 0, 0, yaw)!;
      const dir = worldDirection(input, yaw)!;
      const len = Math.hypot(target.x, target.z);
      expect(dir.x, `yaw ${yaw}`).toBeCloseTo(target.x / len, 6);
      expect(dir.z, `yaw ${yaw}`).toBeCloseTo(target.z / len, 6);
    }
  });
});
