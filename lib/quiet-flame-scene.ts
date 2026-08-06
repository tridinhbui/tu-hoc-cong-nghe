/**
 * Chuyển động và bố cục của cảnh 3D ở /loi-nhan - một đốm lửa nhỏ trong mưa
 * nhỏ giữa rừng: gió, nhịp nhen lửa, cách ngọn lửa phản ứng với cả hai, và vị
 * trí các thân cây quanh khoảng trống.
 *
 * Tách khỏi component R3F vì hai lý do. Thứ nhất, đây là phần duy nhất của
 * cảnh kiểm chứng được mà không cần WebGL - hình dạng của gió, trần biên độ,
 * và tính chất quan trọng nhất: gió mạnh tới đâu ngọn lửa cũng không tắt.
 * Thứ hai, các hàm này chạy mỗi khung hình, nên chúng phải thuần và không cấp
 * phát gì.
 *
 * Không đụng tới lib/quiet-flame.ts: file kia mô tả độ sáng của ngọn lửa theo
 * số nỗi lo đã đặt xuống, còn file này mô tả nó động đậy thế nào. Hai thứ
 * nhân vào nhau ở component chứ không trộn ở đây.
 *
 * Quy ước: mọi tham số thời gian tính bằng giây.
 */

/**
 * Gió nền, biên độ trong khoảng [-1, 1].
 *
 * Tổng ba sóng sin có chu kỳ không chia hết cho nhau, nên toàn cảnh rất lâu
 * mới trở lại đúng một trạng thái cũ - cùng nguyên tắc với các lớp chuyển
 * động trong DinhHoaFlame. Mắt không bắt được điểm lặp thì đọc ra là "thở"
 * chứ không phải "chạy vòng".
 */
export function ambientWind(t: number): number {
  return (
    0.55 * Math.sin(t / 3.7) +
    0.3 * Math.sin(t / 7.3 + 1.1) +
    0.15 * Math.sin(t / 1.9 + 2.6)
  );
}

/** Hằng số tắt dần của cơn giật, giây. Chọn để cơn giật còn thấy được khoảng
 *  ba giây: đủ để người kéo nhận ra ngọn lửa phản ứng với mình, chưa đủ dài
 *  để thành một hiệu ứng ồn. */
const GUST_DECAY = 0.9;

/** Cơn giật do người dùng kéo, tắt dần theo hàm mũ kể từ lúc phát sinh. */
export function gustAt(strength: number, age: number): number {
  if (age < 0 || !Number.isFinite(age)) return 0;
  return strength * Math.exp(-age / GUST_DECAY);
}

/** Thời gian nhen lửa, giây. */
export const KINDLE_SECONDS = 3.2;

/**
 * Đường nhen lửa: từ một đốm sáng lên ngọn lửa đầy.
 *
 * Không phải đường thẳng và cũng không phải ease-out đều. Lửa nhen thật có một
 * nhịp chững ở giữa - bén được rồi gần như lụi, rồi mới bắt hẳn - và nhịp
 * chững đó là toàn bộ lý do hàm này tồn tại thay vì một phép nội suy.
 */
export function kindleProgress(elapsed: number): number {
  if (!(elapsed > 0)) return 0;
  if (elapsed >= KINDLE_SECONDS) return 1;
  const x = elapsed / KINDLE_SECONDS;
  const base = 1 - Math.pow(1 - x, 2.2);
  const falter = 0.18 * Math.exp(-Math.pow((x - 0.4) / 0.12, 2));
  return Math.min(1, Math.max(0, base - falter));
}

export interface FlameMotion {
  /** Độ nghiêng thân lửa, radian. Dương là nghiêng theo chiều gió. */
  tilt: number;
  /** Hệ số chiều cao, quanh 1. Gió mạnh thì lửa bị dạt thấp xuống. */
  stretch: number;
  /** Hệ số độ sáng, trong [0, 1]. */
  glow: number;
}

/** Trần biên độ gió mà ngọn lửa còn phản ứng. Trên mức này nó không dạt thêm:
 *  đinh hoả là lửa đèn, một cú kéo chuột thật mạnh cũng không được phép thổi
 *  ngang nó ra - và trần này cũng là thứ giữ cho cảnh không vỡ hình. */
const WIND_CAP = 1.6;

/** Sàn độ sáng khi lửa đã bén. Ngọn lửa trong trang này không bao giờ tắt;
 *  đó là điều kiện thiết kế, không phải hệ quả tình cờ của các hằng số. */
const GLOW_FLOOR = 0.18;

/**
 * Ngọn lửa phản ứng với gió: nghiêng theo, thấp xuống, và tối đi một chút.
 *
 * Lửa mới nhen thì yếu nên gió tác động mạnh hơn - đây là chỗ người xem cảm
 * được cái mong manh của lúc mới bén.
 */
export function flameMotion(wind: number, kindle: number, t: number): FlameMotion {
  const w = Math.min(WIND_CAP, Math.max(-WIND_CAP, Number.isFinite(wind) ? wind : 0));
  const k = Math.min(1, Math.max(0, kindle));
  const fragility = 1.6 - 0.6 * k;
  const flicker = 0.04 * Math.sin(t / 0.31) + 0.025 * Math.sin(t / 0.17 + 2.1);

  const glow = (1 - Math.abs(w) * 0.2) * (0.25 + 0.75 * k) + flicker * k;

  return {
    tilt: w * 0.22 * fragility,
    stretch: (1 - Math.abs(w) * 0.16 * fragility) * (0.35 + 0.65 * k),
    glow: Math.min(1, Math.max(k > 0.05 ? GLOW_FLOOR : 0, glow)),
  };
}

/** Số hạt mưa. Thấp hơn hẳn bản cũ (520) dù không gian rộng hơn nhiều: mưa
 *  bây giờ rơi trong cả khối cảnh chứ không phải một màn phẳng sau kính, và
 *  đây là mưa NHỎ - dày lên là thành mưa rào, mà mưa rào thì không ai ngồi
 *  lại bên đống lửa. */
export const RAIN_COUNT = 300;

/** Số cây trong rừng. Sương mù nuốt phần lớn chúng thành bóng, nên thêm cây
 *  chủ yếu tốn draw call chứ không dày thêm được rừng. */
export const TREE_COUNT = 22;

/** Số tàn lửa bay lên từ đống lửa. Ít, và bay chậm: đây là lửa nhỏ cháy bền,
 *  không phải đống lửa trại đang bùng. */
export const EMBER_COUNT = 18;

/** Bán kính khoảng trống quanh đống lửa mà mưa không rơi vào - tán cây ngay
 *  trên đầu che lại.
 *
 *  Đây là câu trả lời cho vấn đề mà bản khung cửa sổ đã né bằng cách đặt lửa
 *  trong nhà: ngoài trời mưa thì lửa phải tắt, cả về logic lẫn về hình. Một
 *  đốm lửa cháy giữa màn mưa xuyên thẳng qua nó trông như lỗi dựng hình. Có
 *  một túi khô ngay trên đầu thì cảnh tự giải thích được, và người xem không
 *  phải nghĩ về nó một giây nào. */
export const SHELTER_RADIUS = 1.9;

/** Khoảng dôi ra ngoài mép tán khi đẩy một hạt mưa ra khỏi túi khô. Không có
 *  nó thì hạt bị đặt đúng lên đường tròn bán kính `SHELTER_RADIUS`, và cả màn
 *  mưa hiện ra một viền tròn sắc nét - đọc ra là một cái vòng chứ không phải
 *  mép một tán lá. */
const SHELTER_MARGIN = 1.25;

/**
 * Đẩy một điểm trên mặt phẳng ra khỏi vùng có tán che, giữ nguyên hướng.
 *
 * Ở trong component thì đây là ba dòng trong hàm đặt lại vị trí hạt mưa, và
 * cũng chính là ba dòng duy nhất của cả cảnh 3D quyết định một điều người xem
 * nhìn thấy ngay: đống lửa có bị mưa xuyên qua hay không. Để nguyên trong
 * `useFrame` thì không có cách nào kiểm chứng ngoài việc nhìn - mà nhìn thì
 * lại phụ thuộc rAF, thứ không chạy khi khung xem bị ẩn.
 *
 * ĐẨY RA chứ không BỎ QUA hạt: bỏ qua thì số hạt thực tế giảm dần theo xác
 * suất rơi vào vùng che, và màn mưa loãng đi một cách không ai kiểm soát.
 */
export function pushOutOfShelter(x: number, z: number): { x: number; z: number } {
  const d = Math.hypot(x, z);
  if (d >= SHELTER_RADIUS) return { x, z };
  // Điểm trùng gốc toạ độ không có hướng để đẩy theo - chọn một hướng cố định
  // thay vì chia cho 0 và trả về NaN, thứ sẽ làm hỏng cả buffer hình học.
  if (d < 1e-6) return { x: SHELTER_RADIUS * SHELTER_MARGIN, z: 0 };
  const scale = (SHELTER_RADIUS / d) * SHELTER_MARGIN;
  return { x: x * scale, z: z * scale };
}

export interface ForestTree {
  x: number;
  z: number;
  /** Chiều cao thân, đơn vị cảnh. */
  height: number;
  /** Bán kính thân ở gốc. */
  radius: number;
  /** Độ nghiêng thân, radian. Rừng thật không có cây nào thẳng tuyệt đối. */
  lean: number;
}

/** Bộ sinh số giả ngẫu nhiên tất định (mulberry32).
 *
 *  Dùng thay `Math.random` vì bố cục rừng phải GIỐNG NHAU giữa các lần dựng:
 *  React 18 gọi effect hai lần ở chế độ Strict, và một cảnh tự sắp lại cây mỗi
 *  lần dựng thì không kiểm chứng được bằng ảnh chụp, cũng không viết được test.
 *  Bù lại phải trả bằng việc mọi người dùng thấy đúng một khu rừng - chấp nhận
 *  được, vì thứ chuyển động trong cảnh là mưa và lửa chứ không phải cây. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Vị trí các thân cây quanh khoảng trống có đống lửa.
 *
 * Hai vùng cấm, và cả hai đều là điều kiện để cảnh đọc được chứ không phải
 * chi tiết trang trí:
 *
 *   1. Không cây nào ở gần hơn `SHELTER_RADIUS + 1.4` tính từ đống lửa - đó
 *      là khoảng trống người ta ngồi.
 *   2. Không cây nào nằm trong hành lang giữa máy quay và đống lửa (z dương,
 *      |x| nhỏ). Camera đứng ở z ≈ +4, nên một thân cây rơi vào đó sẽ che mất
 *      đúng thứ duy nhất cảnh này có để xem.
 */
export function forestTrees(count: number = TREE_COUNT): ForestTree[] {
  const rand = mulberry32(0x5eed_1a3f);
  const trees: ForestTree[] = [];
  // Trần vòng lặp: bộ sinh là tất định nên vòng lặp này luôn kết thúc, nhưng
  // một `while (trees.length < count)` không trần là cách một thay đổi hằng số
  // vô hại biến thành trang treo cứng.
  for (let guard = 0; guard < count * 40 && trees.length < count; guard++) {
    const angle = rand() * Math.PI * 2;
    const dist = SHELTER_RADIUS + 1.4 + rand() * 10.5;
    const x = Math.cos(angle) * dist;
    const z = Math.sin(angle) * dist;
    if (z > 0.4 && Math.abs(x) < 2.4) continue; // hành lang máy quay
    trees.push({
      x,
      z,
      height: 3.4 + rand() * 4.6,
      radius: 0.09 + rand() * 0.13,
      lean: (rand() - 0.5) * 0.14,
    });
  }
  return trees;
}

/** Giới hạn xoay khi kéo, radian. Rộng hơn bản khung cửa sổ (0,5 / 0,28): ở
 *  đó kéo quá tay là thấy mặt sau của khung, còn ở đây quay thêm chỉ là nhìn
 *  sâu hơn vào rừng. Vẫn có trần, vì cảnh chỉ dựng cây ở phía trong tầm nhìn. */
export const DRAG_YAW_LIMIT = 0.75;
export const DRAG_PITCH_LIMIT = 0.3;

/** Kéo góc nhìn về vị trí nghỉ sau khi thả tay. Nhân với delta của khung hình
 *  để tốc độ về không phụ thuộc tốc độ khung hình. */
export function springBack(current: number, delta: number): number {
  const next = current * (1 - Math.min(1, Math.max(0, delta) * 2.4));
  return Math.abs(next) < 0.0005 ? 0 : next;
}
