import {
  BODY_RADIUS,
  resolveObstacles,
  type BoxObstacle,
  type CircleObstacle,
  type Obstacle,
} from "@/lib/walkable-space";

/** Hình học của phòng học nhóm: kích thước, đồ đạc, vật cản, chỗ ngồi.
 *
 *  Một nguồn duy nhất cho cả ba thứ hay trôi ra khỏi nhau: chỗ VẼ cái bàn, chỗ
 *  CHẶN cái bàn, và chỗ ĐẶT người ngồi vào bàn. components/lobby/room-obstacles.ts
 *  đã ghi lại đúng bài học ấy cho thư viện; ở đây tách file riêng vì đây là một
 *  căn phòng khác với danh sách đồ đạc khác, và hàm giải va chạm của thư viện
 *  gắn cứng vào mảng OBSTACLES cùng khái niệm tầng lửng của riêng nó. */

export const ROOM = {
  /** Bề ngang (trục x) và chiều sâu (trục z) tính từ tường tới tường. */
  width: 15,
  depth: 18,
  height: 4,
  /** Nửa kích thước phần ĐI LẠI được - đã lùi vào khỏi chân tường. */
  bounds: { x: 6.6, z: 8.2 },
};

export const HALF_W = ROOM.width / 2;
export const HALF_D = ROOM.depth / 2;

// ── Bàn học chung ───────────────────────────────────────────────────────────

export const TABLE = {
  x: 0,
  z: -0.6,
  halfW: 2.4,
  halfD: 1.2,
  /** Cao độ mặt bàn. */
  top: 0.76,
};

/** Bốn vị trí ghế dọc mỗi cạnh dài, tám ghế tất cả. Đủ cho phòng tối đa 8
 *  người mà không phải xếp ai vào đầu bàn - ngồi đầu bàn thì mặt hướng dọc, và
 *  hai người ngồi hai đầu sẽ không nhìn thấy nhau qua đống đồ giữa bàn. */
const SEAT_XS = [-1.8, -0.6, 0.6, 1.8];
/** Khoảng lùi của ghế khỏi mép bàn. */
const SEAT_GAP = 0.82;

export interface SeatSpot {
  index: number;
  x: number;
  z: number;
  /** Hướng nhìn: quay mặt vào bàn. ry=0 là nhìn về -z. */
  ry: number;
}

/** Tám chỗ ngồi, đánh số 0-7: 0-3 là cạnh nam (z lớn), 4-7 là cạnh bắc. */
export const SEATS: SeatSpot[] = [
  ...SEAT_XS.map((x, i) => ({
    index: i,
    x,
    z: TABLE.z + TABLE.halfD + SEAT_GAP,
    ry: 0,
  })),
  ...SEAT_XS.map((x, i) => ({
    index: i + SEAT_XS.length,
    x,
    z: TABLE.z - TABLE.halfD - SEAT_GAP,
    ry: Math.PI,
  })),
];

/** Đứng trong khoảng này quanh bàn thì ngồi xuống được. */
const SEAT_REACH = 2.6;

/** Ghế trống gần người nhất trong tầm với, hoặc null.
 *
 *  Nhận vào danh sách ghế ĐANG CÓ NGƯỜI thay vì tự tra: chọn ghế là việc của
 *  hình học, còn ai đang ngồi đâu là việc của presence, và trộn hai thứ lại thì
 *  hàm này không kiểm thử được nếu không dựng cả một kênh realtime. */
export function nearestFreeSeat(x: number, z: number, taken: ReadonlySet<number>): number | null {
  const nearTable =
    Math.abs(x - TABLE.x) <= TABLE.halfW + SEAT_REACH &&
    Math.abs(z - TABLE.z) <= TABLE.halfD + SEAT_REACH;
  if (!nearTable) return null;

  let best: number | null = null;
  let bestDist = Infinity;
  for (const seat of SEATS) {
    if (taken.has(seat.index)) continue;
    const d = Math.hypot(seat.x - x, seat.z - z);
    if (d < bestDist) {
      bestDist = d;
      best = seat.index;
    }
  }
  return best;
}

// ── Đồ đạc và vật cản ───────────────────────────────────────────────────────

/** Kệ sách áp tường tây. */
export const SHELF_ZS = [-5.4, -1.4, 2.6];
export const SHELF_X = -HALF_W + 0.32;

/** Góc nghỉ ở đông nam: ghế sofa và bàn nước. */
export const SOFA = { x: 4.7, z: 5.2 };
/** Bàn nước lùi khỏi sofa đủ xa để hai vùng chặn KHÔNG chạm nhau. Bộ giải va
 *  chạm chỉ xử lý một vật cản mỗi khung hình (xem resolveStudyObstacles), nên
 *  hai món kê sát nhau sẽ đẩy người học từ món này vào lòng món kia. Khoảng
 *  cách tối thiểu ấy được canh gác bằng test, không phải bằng mắt. */
export const COFFEE_TABLE = { x: 4.7, z: 3.2, radius: 0.62 };

/** Quầy nước áp tường đông bắc - chỗ đứng nói chuyện khi nghỉ giữa phiên. */
export const COUNTER = { x: HALF_W - 0.55, z: -5.6, halfW: 0.55, halfD: 1.6 };

/** Chậu cây ở các góc và cạnh cửa.
 *
 *  Hai chậu đầu hồi bắc kê lùi hẳn khỏi góc: sát góc thì chúng chạm vào kệ
 *  sách và quầy nước, và hai vùng chặn chạm nhau là lỗi (xem COFFEE_TABLE). */
export const PLANTS: Array<[number, number]> = [
  [-5.4, -HALF_D + 1.1],
  [4.9, -HALF_D + 1.1],
  [-HALF_W + 1.1, HALF_D - 1.4],
  [-2.6, HALF_D - 1.3],
];

/** Bảng trắng treo tường bắc; không phải vật cản (treo trên cao) nhưng vị trí
 *  của nó cần được cả cảnh lẫn HUD biết. */
export const BOARD = { x: 0, z: -HALF_D + 0.12, y: 2.05, width: 4.6, height: 2.5 };

/** Cửa ở tường nam - nơi nhân vật xuất hiện và cũng là lối về thư viện. */
export const DOOR = { x: 0, z: HALF_D - 0.06, halfWidth: 1.1, height: 2.6 };

export { BODY_RADIUS };

export const OBSTACLES: Obstacle[] = [
  { kind: "box", x: TABLE.x, z: TABLE.z, halfW: TABLE.halfW, halfD: TABLE.halfD },
  ...SHELF_ZS.map((z): BoxObstacle => ({ kind: "box", x: SHELF_X, z, halfW: 0.32, halfD: 1.5 })),
  { kind: "box", x: SOFA.x, z: SOFA.z, halfW: 1.25, halfD: 0.55 },
  { kind: "circle", x: COFFEE_TABLE.x, z: COFFEE_TABLE.z, radius: COFFEE_TABLE.radius },
  { kind: "box", x: COUNTER.x, z: COUNTER.z, halfW: COUNTER.halfW, halfD: COUNTER.halfD },
  ...PLANTS.map(([x, z]): CircleObstacle => ({ kind: "circle", x, z, radius: 0.52 })),
];

/** Giải va chạm cho riêng phòng này. Thuật toán ở lib/walkable-space.ts, dùng
 *  chung với mọi không gian đi được khác; chỉ danh sách đồ đạc là của riêng
 *  phòng nhóm. */
export function resolveStudyObstacles(x: number, z: number, bodyRadius = BODY_RADIUS) {
  return resolveObstacles(OBSTACLES, x, z, bodyRadius);
}

/** Đứng trong khoảng này quanh cửa thì hiện lời mời ra ngoài. */
export const DOOR_REACH = 1.9;

export function isNearDoor(x: number, z: number) {
  return Math.abs(x - DOOR.x) <= DOOR.halfWidth + DOOR_REACH && z >= DOOR.z - DOOR_REACH;
}
