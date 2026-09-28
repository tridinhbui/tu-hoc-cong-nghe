import * as THREE from "three";

/** Camera của phòng phỏng vấn: quay quanh ĐẦU người phỏng vấn.
 *
 *  Hai lỗi được sửa cùng lúc ở đây, và chúng có cùng một gốc.
 *
 *  MẶT NGƯỜI KHÔNG NHÌN THẤY. Camera đứng ở `[0, 1.45, 2.1]` nhưng không ai
 *  bảo nó nhìn vào đâu, nên react-three-fiber để nó nhìn gốc toạ độ - tức là
 *  điểm giữa SÀN. Từ độ cao 1,45 mà nhìn xuống sàn cách 2,1 là chúi xuống
 *  khoảng 35 độ; với fov 42 và khung 21:9 thì nửa góc dọc chỉ còn chừng 10 độ,
 *  nên cái đầu ở cao độ 1,56 nằm hẳn ngoài khung. Người học thấy đúng mặt bàn
 *  và hai tệp hồ sơ - khớp với ảnh chụp màn hình.
 *
 *  KHÔNG QUAY ĐƯỢC. Chú thích cũ của cảnh nói camera cố tình đứng yên, "thêm
 *  điều khiển là mời người ta nghịch cảnh trong lúc lẽ ra đang nghĩ câu trả
 *  lời". Lập luận ấy hợp lý khi khung hình đã đúng; khi khung hình sai thì đứng
 *  yên nghĩa là không có cách nào thấy được người đối diện.
 *
 *  Nên tâm quay là ĐẦU người phỏng vấn, không phải gốc toạ độ. Nhờ vậy mọi góc
 *  hợp lệ đều còn thấy mặt - không cần nút đặt lại, và cũng không cần cho camera
 *  tự trôi về chỗ cũ (một cú giật lại sau mỗi lần kéo là thứ gây khó chịu hơn
 *  hẳn việc phải tự kéo lại).
 */

/** Đầu người phỏng vấn: `Interviewer` đứng ở z = -1.1, đầu ở y = 1.56. Nhắm
 *  Nhắm CAO hơn tâm đầu, không thấp hơn. Bản đầu nhắm 1,46 - hơi dưới mặt -
 *  theo lối đóng khung của một cuộc gọi video, và điều đó đúng khi trên đầu
 *  không có gì. Ở đây trên đầu có bong bóng thoại, và chỗ trống cho nó chính là
 *  phần khung phía trên tâm ngắm: nhắm thấp thì mặt nằm cao trong khung và bong
 *  bóng hết chỗ. 1,62 cộng khoảng cách 3,15 cho khoảng 0,93 đơn vị trống trên
 *  đỉnh đầu - đủ cho câu hỏi dài tới sáu dòng mà chữ vẫn còn đọc được, đo trên
 *  chính ngân hàng câu hỏi (trung vị 78 ký tự ≈ 3 dòng, p90 159 ≈ 6 dòng). */
export const LOOK_AT = new THREE.Vector3(0, 1.62, -1.1);

export interface Orbit {
  /** 0 là đối diện thẳng. Dương là dịch sang phải. */
  yaw: number;
  /** Dương là nhìn từ trên xuống. */
  pitch: number;
  dist: number;
}

export const DEFAULT_ORBIT: Orbit = { yaw: 0, pitch: 0.06, dist: 3.15 };

/** Biên của cú kéo, và mỗi biên là một thứ cụ thể chứ không phải một con số
 *  tròn cho đẹp:
 *
 *  - `yaw` ±0,62 rad (±35°): quá đó thì bắt đầu thấy mép tường hông ở x = ±4,4
 *    và người phỏng vấn quay nghiêng tới mức không còn là "đang nói với bạn".
 *  - `pitch` −0,18…0,55: dưới 0 là nhìn ngược lên hàm, trên 0,55 là nhìn xuống
 *    đỉnh đầu và mặt bàn lại chiếm khung như lỗi cũ.
 *  - `dist` 2,0…4,2: gần hơn 2 là camera lọt vào trong mặt bàn (bàn ở z = -0,35
 *    dày 1,15 nên mép trước ở z ≈ 0,22), xa hơn 4,2 là thấy tường sau ở
 *    z = -3,4 và phòng đọc ra là một cái hộp. */
export const LIMITS = {
  yaw: 0.62,
  pitchMin: -0.18,
  pitchMax: 0.55,
  distMin: 2.0,
  distMax: 4.2,
} as const;

export function clampOrbit(orbit: Orbit): Orbit {
  return {
    yaw: THREE.MathUtils.clamp(orbit.yaw, -LIMITS.yaw, LIMITS.yaw),
    pitch: THREE.MathUtils.clamp(orbit.pitch, LIMITS.pitchMin, LIMITS.pitchMax),
    dist: THREE.MathUtils.clamp(orbit.dist, LIMITS.distMin, LIMITS.distMax),
  };
}

/** Vị trí camera cho một góc quay. Toạ độ cầu quanh `LOOK_AT`, với z dương là
 *  phía người học ngồi. */
export function orbitToPosition(orbit: Orbit, out = new THREE.Vector3()): THREE.Vector3 {
  const { yaw, pitch, dist } = clampOrbit(orbit);
  const horizontal = Math.cos(pitch) * dist;
  return out.set(
    LOOK_AT.x + Math.sin(yaw) * horizontal,
    LOOK_AT.y + Math.sin(pitch) * dist,
    LOOK_AT.z + Math.cos(yaw) * horizontal
  );
}

/** Camera có còn ở trong phòng không.
 *
 *  Dùng cho bộ kiểm chứ không cho lúc chạy: các biên ở trên được chọn để điều
 *  này LUÔN đúng, nên nếu một lần đổi số làm nó sai thì đó là một cú kéo xuyên
 *  qua tường - thứ không có gì khác trong cảnh bắt được.
 *
 *  Tường hông ở x = ±4,4, tường sau ở z = -3,4, sàn ở y = 0. Mép trước mặt bàn
 *  ở z ≈ 0,22 nên camera phải ở NGOÀI nó. */
export function isInsideRoom(p: THREE.Vector3): boolean {
  return Math.abs(p.x) < 4.3 && p.y > 0.3 && p.z > 0.25 && p.z < 3.3;
}

/** Góc mở dọc của camera. Ba chỗ cần đúng một con số này: `Canvas` truyền nó
 *  cho camera, phép tính khung nhìn dưới đây, và bộ kiểm. */
export const FOV = 42;

/** Nửa chiều cao nhìn thấy được ở khoảng cách `dist`, tính theo đơn vị thế
 *  giới. `fov` của three.js là góc DỌC, nên tỉ lệ khung hình không vào đây -
 *  khung có rộng thêm bao nhiêu thì phần thêm cũng là bề ngang. */
export function visibleHalfHeight(dist: number, fovDeg = FOV): number {
  return dist * Math.tan(THREE.MathUtils.degToRad(fovDeg) / 2);
}

/** Bong bóng thoại: to bao nhiêu và đặt ở đâu.
 *
 *  Bản đầu đặt cứng `width = 2.1` và `y = 1.9 + height/2`, và nó BỊ CẮT ngay ở
 *  câu hỏi thật đầu tiên - ảnh chụp màn hình cho thấy hai dòng trên của bong
 *  bóng nằm ngoài mép trên khung hình.
 *
 *  Con số cụ thể: câu ba dòng cho canvas 512×206, tức aspect 2,49; với bề rộng
 *  2,1 thì cao 0,84, tâm ở y = 2,32 và đỉnh ở 2,74 - trong khi mép trên khung
 *  nhìn ở khoảng cách mặc định chỉ tới 2,55.
 *
 *  Đây là loại lỗi không sửa được bằng cách chọn một con số khác, vì chiều cao
 *  bong bóng đi theo ĐỘ DÀI CÂU HỎI: câu ngắn thì vừa, câu dài thì tràn, và
 *  ngân hàng câu hỏi có cả hai. Nên hàm này tính ngược từ chỗ còn trống: bắt
 *  đầu ở bề rộng mong muốn, và nếu đỉnh vượt mép trên thì thu ĐỀU cả bong bóng
 *  cho tới khi vừa. Chữ nhỏ đi vẫn đọc được; chữ bị cắt thì không.
 *
 *  Đáy bong bóng không được thấp hơn đỉnh đầu (≈1,78) vì cái đuôi trỏ xuống -
 *  đè lên mặt người thì mất luôn cả hai thứ. */
export const HEAD_TOP = 1.78;
/** Chừa một dải mỏng dưới mép trên khung: sát mép quá thì trông như bị cắt kể
 *  cả khi vừa đúng, và tỉ lệ khung của thẻ còn đổi theo cỡ màn hình. */
const TOP_MARGIN = 0.12;

export interface BubbleLayout {
  width: number;
  height: number;
  /** Tâm bong bóng theo trục đứng. */
  y: number;
}

export function bubbleLayout(
  aspect: number,
  opts: { maxWidth?: number; dist?: number; fovDeg?: number } = {}
): BubbleLayout {
  const maxWidth = opts.maxWidth ?? 2.3;
  const dist = opts.dist ?? DEFAULT_ORBIT.dist;
  const top = LOOK_AT.y + visibleHalfHeight(dist, opts.fovDeg) - TOP_MARGIN;
  const room = top - HEAD_TOP;

  let width = maxWidth;
  let height = width / aspect;
  if (height > room) {
    // Thu đều: bề rộng giảm theo cùng tỉ lệ nên chữ không bị bóp méo.
    const scale = room / height;
    width *= scale;
    height = room;
  }
  return { width, height, y: HEAD_TOP + height / 2 };
}
