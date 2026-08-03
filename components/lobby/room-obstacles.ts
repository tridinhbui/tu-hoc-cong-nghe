import { ROOM, TABLE_ZS, TABLE_HALF_W, TABLE_HALF_D } from "./ReadingRoom";

/** Mọi vật cản trong phòng, khai báo MỘT chỗ duy nhất.
 *
 *  Cùng lý do đã đưa TABLE_ZS ra tầng module: hình vẽ và khối chặn phải đọc
 *  chung một nguồn. Lần trước bàn được vẽ ở một nơi và chặn ở một nơi khác, và
 *  chỉ cần đổi số hàng bàn là hai thứ lệch nhau ngay. Giờ thêm cột, bệ tượng,
 *  quả địa cầu - mỗi thứ là một cơ hội nữa để chúng trôi ra khỏi nhau. */

/** Tầng mà vật cản này thuộc về. Bỏ trống là tầng trệt - phần lớn đồ đạc nằm
 *  dưới đó, và bắt khai báo tường minh ở mọi chỗ chỉ tổ dài dòng. */
type OnFloor = { floor?: 0 | 1 };

export type BoxObstacle = OnFloor & {
  kind: "box";
  x: number;
  z: number;
  halfW: number;
  halfD: number;
};

export type CircleObstacle = OnFloor & {
  kind: "circle";
  x: number;
  z: number;
  radius: number;
};

export type Obstacle = BoxObstacle | CircleObstacle;

const halfL = ROOM.length / 2;
const halfW = ROOM.width / 2;

/** Tâm sảnh tròn ở đầu nam - nơi nhân vật xuất hiện. */
export const ROTUNDA_Z = halfL - 6.5;
export const ROTUNDA_RADIUS = 5.2;

/** Bốn cột đá quanh sảnh tròn. */
export const ROTUNDA_COLUMNS: Array<[number, number]> = [
  [-3.6, ROTUNDA_Z - 3.6],
  [3.6, ROTUNDA_Z - 3.6],
  [-3.6, ROTUNDA_Z + 3.6],
  [3.6, ROTUNDA_Z + 3.6],
];

/** Quả địa cầu đồng giữa sảnh tròn. Chủ đề tài chính toàn cầu, và cũng là mốc
 *  định hướng: đứng ở đâu nhìn về phía nam cũng thấy nó. */
export const GLOBE_POS: [number, number] = [0, ROTUNDA_Z];

/** Tủ phiếu mục lục dọc hai tường dài - vật dụng đặc trưng của thư viện cũ.
 *
 *  Cả tủ, tượng lẫn chậu cây đều tránh khoảng z ∈ [-25, -11]: đó là chỗ cầu
 *  thang lên ban công ôm sát tường, và một cái tủ đứng ngay chân thang thì
 *  không lên tầng hai được nữa. */
export const CATALOG_ZS = [-9, -1, 7, 15];

/** Bệ tượng bán thân xen giữa các tủ. */
export const BUST_ZS = [-5, 3, 11, 19];

/** Chậu cọ dọc lối đi. */
export const PLANT_SPOTS: Array<[number, number]> = [
  [-halfW + 1.5, halfL - 2.2],
  [halfW - 1.5, halfL - 2.2],
  [-halfW + 1.6, -3],
  [halfW - 1.6, -3],
  [-5.6, -halfL + 2.4],
  [5.6, -halfL + 2.4],
];

/** Hai cột cờ hai bên quả địa cầu. */
export const FLAGPOLE_SPOTS: Array<[number, number]> = [
  [-4.4, ROTUNDA_Z],
  [4.4, ROTUNDA_Z],
];

/** Vật cản ngoài phố: cột đèn dọc mép vỉa hè, cây me, xe bánh mì. */
export const LAMP_XS = [-18, -6, 6, 18];
export const LAMP_Z = halfL + 10.5;
export const STREET_TREE_XS = [-15.5, -5.5, 5.5, 15.5];
export const TREE_Z = halfL + 6;
export const CART_POS: [number, number] = [-11.5, 33.4];

/** Đồ trên ban công tầng hai: bàn học cá nhân nép tường ngoài, ghế bành quay ra
 *  lan can. Xen kẽ với các cửa phòng học ở stations.ts (z = -6, 3, 12, 21) - đặt
 *  một cái bàn đúng chỗ cửa thì chắn mất lối vào phòng đó.
 *
 *  Khai báo ở FILE NÀY chứ không ở world.ts, dù world.ts mới là nơi mô tả tầng
 *  hai: world.ts đã import resolveObstacles từ đây, nên để hằng ở bên đó là một
 *  vòng lặp import thật sự - lúc chạy, mảng này sẽ đọc CARREL_ZS trong khi
 *  world.ts còn đang khởi tạo dở và nhận về undefined. Chiều phụ thuộc chỉ được
 *  đi một hướng: ReadingRoom → room-obstacles → world → các component. */
export const CARREL_ZS = [-1.5, 7.5, 16.5];
export const ARMCHAIR_ZS = [-9.5, 25];
export const CARREL_X = 11.1;
export const ARMCHAIR_X = 9.3;

const MEZZ_PROPS: Obstacle[] = [-1, 1].flatMap((side) => [
  ...CARREL_ZS.map((z): BoxObstacle => ({
    kind: "box",
    x: side * CARREL_X,
    z,
    halfW: 0.62,
    halfD: 0.95,
    floor: 1,
  })),
  ...ARMCHAIR_ZS.map((z): CircleObstacle => ({
    kind: "circle",
    x: side * ARMCHAIR_X,
    z,
    radius: 0.62,
    floor: 1,
  })),
]);

export const OBSTACLES: Obstacle[] = [
  ...TABLE_ZS.map((z): BoxObstacle => ({
    kind: "box",
    x: 0,
    z,
    halfW: TABLE_HALF_W,
    halfD: TABLE_HALF_D,
  })),
  ...ROTUNDA_COLUMNS.map(([x, z]): CircleObstacle => ({ kind: "circle", x, z, radius: 0.62 })),
  { kind: "circle", x: GLOBE_POS[0], z: GLOBE_POS[1], radius: 1.05 },
  ...FLAGPOLE_SPOTS.map(([x, z]): CircleObstacle => ({ kind: "circle", x, z, radius: 0.5 })),
  // Tủ và bệ tượng nép sát tường, chỉ chặn phần nhô ra lối đi.
  ...CATALOG_ZS.flatMap((z): BoxObstacle[] => [
    { kind: "box", x: -halfW + 0.75, z, halfW: 0.75, halfD: 1.4 },
    { kind: "box", x: halfW - 0.75, z, halfW: 0.75, halfD: 1.4 },
  ]),
  ...BUST_ZS.flatMap((z): CircleObstacle[] => [
    { kind: "circle", x: -halfW + 0.7, z, radius: 0.55 },
    { kind: "circle", x: halfW - 0.7, z, radius: 0.55 },
  ]),
  ...PLANT_SPOTS.map(([x, z]): CircleObstacle => ({ kind: "circle", x, z, radius: 0.7 })),
  // Ngoài phố
  ...LAMP_XS.map((x): CircleObstacle => ({ kind: "circle", x, z: LAMP_Z, radius: 0.34 })),
  ...STREET_TREE_XS.map((x): CircleObstacle => ({ kind: "circle", x, z: TREE_Z, radius: 0.6 })),
  { kind: "box", x: CART_POS[0], z: CART_POS[1], halfW: 1.1, halfD: 0.7 },
  ...MEZZ_PROPS,
];

/** Đẩy nhân vật ra khỏi vật cản gần nhất.
 *
 *  Hộp: giải theo trục chồng lấn NÔNG hơn - đó là hướng vừa đi vào, nên đẩy
 *  ngược lại cho cảm giác trượt dọc mép thay vì bị bắn ngang qua.
 *  Tròn: đẩy thẳng ra theo bán kính.
 *
 *  Chỉ giải MỘT vật cản mỗi khung hình. Giải hết trong một vòng lặp nghe hợp
 *  lý hơn nhưng sinh ra hiện tượng kẹt góc: hai vật cản cạnh nhau đẩy qua đẩy
 *  lại và nhân vật đứng im. Một lần mỗi khung, ở 60fps, mắt không thấy được.
 *
 *  Vật cản lọc theo tầng: bàn ghế dưới sảnh không được chặn người đang đi trên
 *  ban công, và ngược lại. Lan can thì không cần khai báo ở đây - dải đi lại
 *  của ban công đã hẹp sẵn trong world.ts, lan can nằm ngoài dải đó. */
export function resolveObstacles(
  x: number,
  z: number,
  bodyRadius: number,
  floor: 0 | 1 = 0
): { x: number; z: number } {
  for (const o of OBSTACLES) {
    if ((o.floor ?? 0) !== floor) continue;
    if (o.kind === "box") {
      const dx = x - o.x;
      const dz = z - o.z;
      const overlapX = o.halfW + bodyRadius - Math.abs(dx);
      const overlapZ = o.halfD + bodyRadius - Math.abs(dz);
      if (overlapX > 0 && overlapZ > 0) {
        if (overlapZ < overlapX) {
          return { x, z: o.z + Math.sign(dz || 1) * (o.halfD + bodyRadius) };
        }
        return { x: o.x + Math.sign(dx || 1) * (o.halfW + bodyRadius), z };
      }
    } else {
      const dx = x - o.x;
      const dz = z - o.z;
      const dist = Math.hypot(dx, dz);
      const minDist = o.radius + bodyRadius;
      if (dist < minDist) {
        // Đứng đúng tâm thì không có hướng nào để đẩy; chọn một hướng bất kỳ
        // thay vì chia cho 0.
        const nx = dist > 1e-4 ? dx / dist : 1;
        const nz = dist > 1e-4 ? dz / dist : 0;
        return { x: o.x + nx * minDist, z: o.z + nz * minDist };
      }
    }
  }
  return { x, z };
}
