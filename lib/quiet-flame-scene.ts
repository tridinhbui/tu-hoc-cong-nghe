/**
 * Chuyển động của cảnh 3D trong khung cửa sổ mưa ở /loi-nhan: gió, nhịp nhen
 * lửa, và cách ngọn lửa phản ứng với cả hai.
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

/** Số hạt mưa ngoài cửa. Đủ dày để đọc ra là mưa, đủ thưa để không phải hạ DPR. */
export const RAIN_COUNT = 520;

/** Số giọt đọng chảy trên mặt kính. Ít hơn hẳn mưa ngoài trời: mắt đọc từng
 *  giọt một, nên nhiều quá thì thành nhiễu chứ không thành cửa sổ. */
export const GLASS_DROP_COUNT = 26;

/** Giới hạn xoay khi kéo, radian. Cảnh này là một khung cửa nhìn ra mưa chứ
 *  không phải một vật thể xoay tự do - kéo quá tay là thấy mặt sau của khung. */
export const DRAG_YAW_LIMIT = 0.5;
export const DRAG_PITCH_LIMIT = 0.28;

/** Kéo góc nhìn về vị trí nghỉ sau khi thả tay. Nhân với delta của khung hình
 *  để tốc độ về không phụ thuộc tốc độ khung hình. */
export function springBack(current: number, delta: number): number {
  const next = current * (1 - Math.min(1, Math.max(0, delta) * 2.4));
  return Math.abs(next) < 0.0005 ? 0 : next;
}
