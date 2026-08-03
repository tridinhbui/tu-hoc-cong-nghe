import * as THREE from "three";
import { DOOR_HALF_W, ROOM } from "./ReadingRoom";
import { resolveObstacles } from "./room-obstacles";

/** Hình học của thế giới đi lại được: thư viện, ban công tầng hai, và con phố
 *  Sài Gòn phía trước cửa.
 *
 *  Trước đây chỉ có một mặt sàn phẳng ở y=0 và một khung chữ nhật kẹp cứng, nên
 *  "đi được ở đâu" gói gọn trong hai dòng clamp. Thêm tầng hai và ngoài trời thì
 *  hai câu hỏi tách hẳn ra: ĐI ĐƯỢC TỚI ĐÂU (mặt bằng) và ĐỨNG Ở ĐỘ CAO NÀO.
 *  Cả hai sống ở đây, một nguồn duy nhất, vì hình vẽ và va chạm mà tự tính riêng
 *  thì chỉ cần đổi một con số là chúng lệch nhau.
 *
 *  Tầng được mang theo trong trạng thái người chơi chứ không suy ra từ toạ độ.
 *  Suy ra thì không thể: đứng ở x=10, z=0 vừa có thể là đang đi dưới gầm ban
 *  công, vừa có thể là đang đứng trên ban công. Chỉ có lịch sử di chuyển - đã
 *  leo thang hay chưa - mới phân biệt được. */

export type Floor = 0 | 1;

const halfL = ROOM.length / 2;
const halfW = ROOM.width / 2;

// ── Tầng hai: ban công lửng chạy dọc hai tường dài ──────────────────────────

export const MEZZ_Y = 6.4;
export const MEZZ_DEPTH = 4.0;
/** Mép trong ban công (phía lòng phòng). */
export const MEZZ_INNER_X = halfW - MEZZ_DEPTH;
/** Dải x đi lại được trên ban công: lùi vào khỏi lan can và khỏi tường. */
export const MEZZ_BAND: [number, number] = [MEZZ_INNER_X + 0.5, halfW - 0.55];

/** Cầu thang ôm tường ở đầu bắc, nối sàn lên ban công. */
export const STAIR_Z0 = -halfL + 3;
export const STAIR_Z1 = -halfL + 17;
export const STAIR_STEPS = 18;
/** Bậc trên cùng của ban công, chừa mép để không lao vào tường đầu hồi. */
const MEZZ_Z_MAX = halfL - 0.9;

// ── Ngoài trời: thềm, quảng trường, lòng đường ──────────────────────────────

export const STEP_Z0 = halfL + 0.8;
export const STEP_Z1 = halfL + 3.6;
export const STEP_COUNT = 4;
/** Cao độ mặt phố, thấp hơn sàn thư viện đúng bằng chiều cao bậc thềm. */
export const PLAZA_Y = -1.4;
/** Nửa chiều rộng quảng trường trước cửa. */
export const PLAZA_HALF_X = 22;
/** Mép vỉa hè, cũng là giới hạn đi lại - lòng đường để cho xe. */
export const CURB_Z = halfL + 12;
export const ROAD_Z0 = CURB_Z;
export const ROAD_Z1 = halfL + 22;
/** Vỉa hè và dãy nhà bên kia đường. Không đi tới được, chỉ để nhìn. */
export const FAR_WALK_Z = halfL + 26;
export const STREET_HALF_X = 44;

/** Hai làn xe chạy ngược chiều. Bên phải là chiều +x, đúng luật đi bên phải. */
export const LANE_Z: [number, number] = [ROAD_Z0 + 2.6, ROAD_Z1 - 2.6];

interface Rect {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
}

/** Hẻm hai bên hông thư viện và sân sau. Trước đây ngoài trời chỉ có quảng
 *  trường trước cửa: bước ra khỏi thư viện là đứng trong một cái hộp rộng 44m
 *  và hết - quay đầu lại chỉ thấy mặt tiền, hai bên là hư không. Vành đai này
 *  cho đi vòng hết 360 độ quanh toà nhà, và cũng là chỗ đặt những thứ một thư
 *  viện thật có ở mặt sau: sân trong, xe cộ, thùng rác, cửa hậu. */
export const SIDE_X0 = ROOM.width / 2;
export const SIDE_X1 = PLAZA_HALF_X;
/** Mép ngoài cùng của sân sau, tính từ đầu bắc toà nhà. */
export const REAR_Z = -ROOM.length / 2 - 14;

/** Mặt bằng đi lại của tầng trệt, nối liền nhau qua các mép chung. Ô cửa là một
 *  chữ nhật hẹp riêng - nhờ vậy tường đầu nam vẫn chặn, chỉ chừa đúng lối ra. */
const GROUND_RECTS: Rect[] = [
  { x0: -ROOM.bounds.x, x1: ROOM.bounds.x, z0: -ROOM.bounds.z, z1: ROOM.bounds.z },
  { x0: -DOOR_HALF_W + 0.4, x1: DOOR_HALF_W - 0.4, z0: ROOM.bounds.z, z1: STEP_Z0 },
  { x0: -PLAZA_HALF_X, x1: PLAZA_HALF_X, z0: STEP_Z0, z1: CURB_Z - 1.1 },
  // Hai hẻm hông, chạy từ quảng trường ra tận sân sau.
  { x0: SIDE_X0, x1: SIDE_X1, z0: REAR_Z, z1: STEP_Z0 },
  { x0: -SIDE_X1, x1: -SIDE_X0, z0: REAR_Z, z1: STEP_Z0 },
  // Sân sau nối hai hẻm lại thành vòng khép kín.
  { x0: -SIDE_X1, x1: SIDE_X1, z0: REAR_Z, z1: -ROOM.length / 2 },
];

const MEZZ_RECTS: Rect[] = [
  { x0: MEZZ_BAND[0], x1: MEZZ_BAND[1], z0: STAIR_Z0, z1: MEZZ_Z_MAX },
  { x0: -MEZZ_BAND[1], x1: -MEZZ_BAND[0], z0: STAIR_Z0, z1: MEZZ_Z_MAX },
];

function inside(r: Rect, x: number, z: number): boolean {
  return x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1;
}

function insideAny(rects: Rect[], x: number, z: number): boolean {
  return rects.some((r) => inside(r, x, z));
}

/** Giải một bước đi trong mặt bằng ghép từ nhiều ô chữ nhật.
 *
 *  Điều kiện không phải "điểm đích nằm trong một ô nào đó" mà là "CẢ QUÃNG từ
 *  chỗ đang đứng tới đích nằm trong mặt bằng". Chỉ xét điểm đích thì mặt bằng
 *  hở: lòng phòng dừng ở z=26,4 còn quảng trường bắt đầu ở z=28,8, giữa hai
 *  khoảng đó chỉ có ô cửa hẹp - nhưng một bước nhảy từ giữa phòng ra thẳng
 *  z=29,4 lại rơi đúng vào quảng trường và được cho qua, tức là đi xuyên tường
 *  nam ở chỗ không có cửa.
 *
 *  Ở tốc độ đi bộ mỗi khung hình chỉ nhích ~0,07 nên đường nối gần như luôn
 *  hợp lệ; phép kiểm này là lưới an toàn cho những bước lớn bất thường (khung
 *  hình rớt, tab ngủ dậy) chứ không phải chi phí thường trực.
 *
 *  Quãng không hợp lệ thì kẹp đích vào ô đang đứng, nên nhân vật trượt dọc mép
 *  tường thay vì đứng khựng. */
function resolveMove(
  rects: Rect[],
  fromX: number,
  fromZ: number,
  toX: number,
  toZ: number
): { x: number; z: number } {
  // Lấy mẫu theo KHOẢNG CÁCH chứ không theo số mẫu cố định. Chia đôi n lần thì
  // bước càng dài mẫu càng thưa, đúng lúc cần dày nhất: khe hở hẹp nhất trong
  // mặt bằng là quãng 2,4 giữa tường nam và bậc thềm, và một cú nhảy dài 30
  // đơn vị chia làm 6 sẽ bước qua nó mà không mẫu nào rơi vào.
  const len = Math.hypot(toX - fromX, toZ - fromZ);
  const samples = Math.min(64, Math.max(1, Math.ceil(len / 0.4)));
  let ok = insideAny(rects, toX, toZ);
  for (let i = 1; ok && i < samples; i += 1) {
    const t = i / samples;
    ok = insideAny(rects, fromX + (toX - fromX) * t, fromZ + (toZ - fromZ) * t);
  }
  if (ok) return { x: toX, z: toZ };

  // Ô đang đứng, hoặc ô gần chỗ đang đứng nhất nếu vị trí cũ cũng đã ra ngoài.
  let home = rects[0];
  let bestDist = Infinity;
  for (const r of rects) {
    const cx = THREE.MathUtils.clamp(fromX, r.x0, r.x1);
    const cz = THREE.MathUtils.clamp(fromZ, r.z0, r.z1);
    const d = (cx - fromX) ** 2 + (cz - fromZ) ** 2;
    if (d < bestDist) {
      bestDist = d;
      home = r;
    }
  }
  return {
    x: THREE.MathUtils.clamp(toX, home.x0, home.x1),
    z: THREE.MathUtils.clamp(toZ, home.z0, home.z1),
  };
}

/** Cao độ mặt cầu thang tại z, bám theo BẬC chứ không theo mặt phẳng nghiêng.
 *
 *  Dốc trơn thì tính dễ hơn, nhưng hình vẽ là bậc thang thật, và chân nhân vật
 *  sẽ lún vào giữa mỗi bậc rồi nhô lên - ở bậc cao 0,36 thì thấy rõ. Bám bậc
 *  cho chân luôn đứng trên mặt bậc. */
export function stairHeightAt(z: number): number {
  if (z <= STAIR_Z0) return 0;
  if (z >= STAIR_Z1) return MEZZ_Y;
  const t = (z - STAIR_Z0) / (STAIR_Z1 - STAIR_Z0);
  // +1 vì bậc thứ i chiếm quãng z thứ i nhưng MẶT của nó nằm ở độ cao thứ i+1;
  // bỏ số này đi thì chân nhân vật đi xuyên qua từng bậc một.
  return (Math.min(STAIR_STEPS, Math.floor(t * STAIR_STEPS) + 1) / STAIR_STEPS) * MEZZ_Y;
}

/** Cao độ bậc thềm trước cửa, cùng cách bám bậc. */
function porchHeightAt(z: number): number {
  if (z <= STEP_Z0) return 0;
  if (z >= STEP_Z1) return PLAZA_Y;
  const t = (z - STEP_Z0) / (STEP_Z1 - STEP_Z0);
  return (Math.ceil(t * STEP_COUNT) / STEP_COUNT) * PLAZA_Y;
}

export function groundHeightAt(x: number, z: number, floor: Floor): number {
  if (floor === 1) return stairHeightAt(z);
  // Mọi chỗ NGOÀI mặt bằng toà nhà đều ở cốt quảng trường, không chỉ phần
  // trước cửa: hẻm hông và sân sau nằm ngoài dải z của bậc thềm, nên nếu chỉ
  // hỏi porchHeightAt thì chúng trả về cốt 0 và người học đi vòng ra sau nhà
  // sẽ lơ lửng cao hơn mặt đất đúng 1,4m.
  const outsideBuilding = Math.abs(x) > ROOM.width / 2 - 0.01 || z < -ROOM.length / 2;
  if (outsideBuilding) return PLAZA_Y;
  return porchHeightAt(z);
}

/** Cửa cầu thang: đứng đúng dải x của thang và ở quãng chân thang thì bước lên.
 *  Nới rộng một chút về phía nam so với STAIR_Z0 để không phải căn từng pixel. */
function atStairFoot(x: number, z: number): boolean {
  const ax = Math.abs(x);
  return ax >= MEZZ_BAND[0] - 0.35 && ax <= MEZZ_BAND[1] + 0.2 && z >= STAIR_Z0 - 0.1 && z <= STAIR_Z0 + 1.8;
}

export interface WorldStep {
  x: number;
  z: number;
  y: number;
  floor: Floor;
}

/** Giải một bước đi: kẹp vào mặt bằng của tầng hiện tại, đẩy khỏi vật cản, xử
 *  lý lên/xuống thang, rồi trả về cả cao độ.
 *
 *  Thứ tự có ý nghĩa. Kẹp trước rồi mới đẩy vật cản, vì ngược lại thì cú kẹp
 *  cuối cùng có thể nhét nhân vật trở vào trong vật cản vừa đẩy ra. */
export function stepWorld(
  from: { x: number; z: number },
  x: number,
  z: number,
  floor: Floor,
  bodyRadius: number
): WorldStep {
  let nextFloor: Floor = floor;

  // Rời chân thang xuống phía nam thì trở về tầng trệt. Kiểm tra trước khi kẹp,
  // vì mặt bằng tầng hai chặn ở đúng STAIR_Z0 và sẽ không bao giờ cho z nhỏ hơn.
  if (floor === 1 && z < STAIR_Z0) nextFloor = 0;
  else if (floor === 0 && atStairFoot(x, z)) nextFloor = 1;

  const rects = nextFloor === 1 ? MEZZ_RECTS : GROUND_RECTS;
  const clamped = resolveMove(rects, from.x, from.z, x, z);
  const solved = resolveObstacles(clamped.x, clamped.z, bodyRadius, nextFloor);

  return {
    x: solved.x,
    z: solved.z,
    y: groundHeightAt(solved.x, solved.z, nextFloor),
    floor: nextFloor,
  };
}
