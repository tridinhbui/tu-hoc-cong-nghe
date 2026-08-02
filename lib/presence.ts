// Số hiển thị cho widget "Đang online" trên dashboard.
//
// Trước đây đây là presence thật: mỗi client ghi user_profiles.last_seen_at
// mỗi 60 giây, rồi đọc lại qua hai RPC get_online_users/get_online_count, và
// con số hiển thị là max(số thật, một sàn dựng sẵn).
//
// Phần presence đã được gỡ bỏ theo quyết định sản phẩm: chỉ giữ chuông thông
// báo realtime, không duy trì presence. Việc gỡ hẳn thay vì để nguyên là có
// lý do - lib/presence.ts cũ nuốt lỗi "thiếu bảng/thiếu cột/thiếu hàm"
// (42P01/42883/42703) và trả về 0 hoặc [], nên nếu migration presence không
// chạy thì mỗi client vẫn bắn một UPDATE hỏng mỗi 60 giây, mãi mãi, và không
// để lại dấu vết nào trong console.
//
// Con số còn lại là số dựng, có chủ đích, không phải dữ liệu người dùng.

/** Sàn hiển thị của widget "đang học cùng lúc". */
const FLOOR_MIN = 50;
const FLOOR_MAX = 150;
/** Giữ nguyên một con số trong 10 phút, đủ dài để nó không nhảy giữa hai lần
 *  widget tự làm mới (60 giây). */
const BUCKET_MS = 10 * 60_000;

/** Số giả ngẫu nhiên trong [0,1) nhưng tất định theo seed - cùng seed luôn ra
 *  cùng giá trị, nên con số hiển thị ổn định thay vì bốc lại mỗi lần gọi. */
function seededUnit(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Sàn mô phỏng cho số người đang học.
 *
 * Bản trước gọi thẳng `Math.random()` mỗi lần, mà widget làm mới mỗi 60 giây,
 * nên con số nhảy 137 → 62 → 148 từng phút. Điều đó tự tố cáo chính nó: một
 * lượng người học thật không bao giờ đổi như vậy. Ở đây thay bằng:
 *
 *  - tất định theo khối 10 phút, nên nó đứng yên giữa các lần làm mới và chỉ
 *    dịch chuyển từng bước nhỏ;
 *  - có nhịp theo giờ trong ngày - đáy lúc 4h sáng, đỉnh lúc 21h - vì đây là
 *    app tự học, người dùng vào nhiều nhất vào buổi tối sau giờ làm.
 *
 * Mọi thứ đều tính từ mốc đầu khối, không từ `now`: nếu lấy giờ trực tiếp từ
 * `now` thì phần nhịp ngày đổi theo từng phút và con số lại nhích sau mỗi lần
 * widget làm mới - đúng cái đang muốn tránh.
 *
 * Thuần tuý và nhận `now` làm tham số để test được mà không cần đồng hồ thật.
 */
export function simulatedOnlineFloor(now: number): number {
  const bucket = Math.floor(now / BUCKET_MS);
  const bucketStart = new Date(bucket * BUCKET_MS);
  const hour = bucketStart.getHours() + bucketStart.getMinutes() / 60;

  // Giờ tính từ đáy (4h). Đỉnh đặt ở 21h, tức 17 giờ sau đáy - nên hai nhánh
  // lên và xuống dài không bằng nhau, phải nắn riêng thay vì dùng một cosin
  // đối xứng (cosin đối xứng sẽ đẩy đỉnh về 16h).
  const fromTrough = (hour - 4 + 24) % 24;
  const PEAK_AFTER_TROUGH = 17;
  const phase =
    fromTrough < PEAK_AFTER_TROUGH
      ? (fromTrough / PEAK_AFTER_TROUGH) * 0.5
      : 0.5 + ((fromTrough - PEAK_AFTER_TROUGH) / (24 - PEAK_AFTER_TROUGH)) * 0.5;
  const daily = 0.5 - 0.5 * Math.cos(phase * 2 * Math.PI);

  // Nhiễu nhỏ theo từng khối để hai ngày cùng giờ không ra y hệt nhau.
  const jitter = (seededUnit(bucket) - 0.5) * 0.18;
  const t = Math.min(1, Math.max(0, daily * 0.9 + 0.05 + jitter));
  return Math.round(FLOOR_MIN + t * (FLOOR_MAX - FLOOR_MIN));
}

/** Không còn chạm cơ sở dữ liệu. Giữ tên cũ để widget không phải đổi ý niệm. */
export function getOnlineCount(now: number = Date.now()): number {
  return simulatedOnlineFloor(now);
}
