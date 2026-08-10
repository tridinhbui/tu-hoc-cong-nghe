import type { LobbyPose } from "@/lib/supabase-lobby";

/** Phần tính toán của đường truyền vị trí 3D: lượng tử hoá gói gửi đi, và hệ
 *  số nội suy phía nhận.
 *
 *  Tách khỏi component vì cả ba cảnh 3D (đại sảnh, phòng học nhóm, khu phố
 *  nghề) đều gửi vị trí theo cùng một cách, và vì đây là loại thay đổi mà
 *  "trông vẫn mượt" là bằng chứng yếu nhất có thể có - phải đo được.
 *
 *  BA THỨ ĐI CÙNG NHAU, và bỏ thứ nào thì hai thứ kia phản tác dụng:
 *
 *  1. Nhịp gửi giãn từ 120ms lên 200ms. Đây là phần tiết kiệm băng thông thật:
 *     mỗi gói mình gửi là N gói cả phòng phải nhận, nên chi phí của phòng tăng
 *     theo BÌNH PHƯƠNG số người, và giãn nhịp cắt thẳng vào đó.
 *  2. Lượng tử hoá toạ độ. Giãn nhịp làm mỗi giây ít gói hơn; lượng tử hoá làm
 *     mỗi gói NHỎ hơn. Hai phần nhân với nhau chứ không cộng.
 *  3. Nội suy tính theo nhịp gửi, không phải một hằng số. Đây là phần dễ quên
 *     nhất và là lý do chính khiến giãn nhịp trông như giật.
 */

/** Bước lưới toạ độ: 1cm. Nhân vật cao khoảng 1.7 đơn vị và camera đứng cách
 *  vài đơn vị, nên 1cm nằm dưới một pixel trên màn hình - không có cách nào
 *  nhìn thấy được. Đổi lại, `x: 3.1400000000000001` rút còn `x: 3.14`, và JSON
 *  của Realtime là văn bản nên mỗi chữ số thừa là một byte thừa nhân với số
 *  người trong phòng. */
export const POSITION_STEP = 0.01;

/** Bước lưới góc quay: khoảng 1.4 độ (2π/256). Mắt không tách được hai hướng
 *  lệch nhau chừng đó trên một nhân vật cao vài chục pixel, và nội suy phía
 *  nhận còn làm mượt tiếp phần chênh. */
export const ROTATION_STEP = (Math.PI * 2) / 256;

/** Làm tròn về bội gần nhất của `step`, rồi cắt đuôi số thực.
 *
 *  `Number(x.toFixed(n))` chứ không chỉ `Math.round(x / step) * step`: phép
 *  chia-nhân để lại rác nhị phân (`0.1 + 0.2` kiểu), nên `3.14` có thể ra
 *  `3.1400000000000001` và gói tin dài hơn cả trước khi lượng tử hoá. Đúng cái
 *  việc này sinh ra để tránh. */
function snap(value: number, step: number, decimals: number): number {
  return Number((Math.round(value / step) * step).toFixed(decimals));
}

/** Gói vị trí đã lượng tử hoá, sẵn sàng gửi.
 *
 *  `y` giữ nguyên tính tuỳ chọn: gói không có `y` nghĩa là đang ở tầng trệt
 *  (xem LobbyPose), và biến nó thành `y: 0` sẽ thêm một trường vào MỌI gói của
 *  mọi người đang đi ở tầng một - ngược hẳn mục đích. */
export function quantizePose(pose: LobbyPose): LobbyPose {
  const out: LobbyPose = {
    x: snap(pose.x, POSITION_STEP, 2),
    z: snap(pose.z, POSITION_STEP, 2),
    ry: snap(pose.ry, ROTATION_STEP, 4),
  };
  if (pose.y !== undefined && pose.y !== 0) out.y = snap(pose.y, POSITION_STEP, 2);
  return out;
}

/** Hai gói sau lượng tử hoá có khác nhau không.
 *
 *  Ngưỡng "đã nhúc nhích" ở phía gửi trước đây so trên toạ độ THÔ với hằng số
 *  0.01/0.02 viết tay, lặp lại ở cả ba cảnh. So sau khi lượng tử hoá thì ngưỡng
 *  chính là bước lưới, nên không còn khoảng nào để một thay đổi vừa đủ vượt
 *  ngưỡng thô nhưng lại biến mất khi làm tròn - tức là gửi một gói y hệt gói
 *  trước. */
export function poseDiffers(a: LobbyPose, b: LobbyPose): boolean {
  return a.x !== b.x || a.z !== b.z || a.ry !== b.ry || (a.y ?? 0) !== (b.y ?? 0);
}

/** Hệ số nội suy cho một khung hình, suy từ NHỊP GỬI chứ không phải hằng số.
 *
 *  Vì sao đây là phần bắt buộc phải đi kèm việc giãn nhịp. Phía nhận làm mượt
 *  theo kiểu số mũ: mỗi khung hình tiến một phần về phía đích. Hằng số cũ là
 *  `delta * 10`, tức hằng thời gian khoảng 100ms - vừa khớp với nhịp gửi 120ms,
 *  nên nhân vật gần như luôn đang trên đường đi và chưa kịp tới thì gói sau đã
 *  tới.
 *
 *  Giữ nguyên hằng số ấy mà giãn nhịp lên 200ms thì nhân vật tới đích sau
 *  khoảng 100ms rồi ĐỨNG YÊN 100ms nữa mới có gói mới. Kết quả không phải là
 *  "hơi trễ" mà là đi-dừng-đi-dừng, thứ mắt bắt được ngay lập tức - và người ta
 *  sẽ kết luận là mạng lag chứ không phải là một hằng số đặt sai.
 *
 *  Nên hằng thời gian bám theo nhịp: `1 - exp(-delta/τ)` với τ tỉ lệ nhịp gửi.
 *  Dạng mũ chứ không phải `delta * k` để kết quả không phụ thuộc tốc độ khung
 *  hình - máy 120fps và máy 30fps phải ra cùng một quãng đường sau cùng một
 *  khoảng thời gian.
 *
 *  Hệ số 0.85 tìm bằng cách thử: τ đúng bằng nhịp gửi thì nhân vật luôn tụt lại
 *  một quãng thấy được, còn dưới 0.7 thì bắt đầu lộ lại nhịp đi-dừng. */
export const SMOOTHING_RATIO = 0.85;

export function smoothingFactor(deltaSeconds: number, intervalMs: number): number {
  if (!(deltaSeconds > 0)) return 0;
  const tau = (intervalMs * SMOOTHING_RATIO) / 1000;
  if (!(tau > 0)) return 1;
  // Kẹp ở 1: một khung hình dài bất thường (chuyển tab rồi quay lại) cho ra
  // giá trị sát 1, và vượt 1 sẽ làm vị trí VƯỢT QUA đích rồi dao động.
  return Math.min(1, 1 - Math.exp(-deltaSeconds / tau));
}

/** Đo nhịp gói ĐẾN THẬT của một người, để nội suy tự bám theo.
 *
 *  Vì sao không dùng thẳng MOVE_BROADCAST_MS ở phía nhận: con số đó là nhịp
 *  DANH NGHĨA, còn nhịp thật của từng người khác nó ở hai chỗ, và cả hai đều
 *  đẩy về phía chậm hơn.
 *
 *  - Cả ba cảnh đều tự giãn nhịp gấp đôi khi phòng đông (>12, >8, >6 người tuỳ
 *    cảnh). Người gửi biết mình đang giãn; người nhận KHÔNG - không có gì trong
 *    gói tin nói ra điều đó. Nội suy theo 200ms trong khi gói tới mỗi 400ms là
 *    đúng lại cái lỗi đi-dừng vừa sửa, chỉ khác là nó chỉ xuất hiện lúc phòng
 *    đông, tức là lúc khó dựng lại nhất.
 *  - Mạng thật không đều. Một người ở kết nối chập chờn có nhịp tới thưa hơn
 *    hẳn nhịp gửi.
 *
 *  Trung bình trượt theo cấp số nhân, không phải trung bình cộng: nó tự quên
 *  quá khứ, nên người vừa qua một đoạn mạng xấu không kéo theo hệ số chậm mãi.
 *
 *  Kẹp trên ở 4 lần nhịp danh nghĩa: một người rời tab rồi quay lại tạo ra một
 *  khoảng cách nhiều giây, và để nó vào trung bình sẽ làm nhân vật bò như sên
 *  suốt nhiều giây sau đó. Kẹp dưới ở nhịp danh nghĩa vì gói không bao giờ tới
 *  dày hơn mức gửi - tới dày hơn nghĩa là đo nhầm, không phải mạng nhanh hơn. */
export function makeIntervalTracker(nominalMs: number = 200) {
  const min = nominalMs;
  const max = nominalMs * 4;
  let value = nominalMs;
  let lastAt: number | null = null;
  return {
    /** Gọi khi thấy gói MỚI (đích nội suy vừa đổi). */
    sample(nowMs: number): void {
      if (lastAt !== null) {
        const gap = Math.min(max, Math.max(min, nowMs - lastAt));
        value += (gap - value) * 0.3;
      }
      lastAt = nowMs;
    },
    get intervalMs(): number {
      return value;
    },
  };
}
