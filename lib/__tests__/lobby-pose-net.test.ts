import { describe, expect, it } from "vitest";
import {
  POSITION_STEP,
  ROTATION_STEP,
  SMOOTHING_RATIO,
  makeIntervalTracker,
  poseDiffers,
  quantizePose,
  smoothingFactor,
} from "@/lib/lobby-pose-net";
import { MOVE_BROADCAST_MS } from "@/lib/supabase-lobby";

/** Đường truyền vị trí 3D.
 *
 *  Đây là loại thay đổi mà "chạy thử thấy vẫn mượt" là bằng chứng yếu nhất có
 *  thể có: một mình một phòng thì không có gói nào của người khác để mà giật,
 *  và đúng lúc phòng đông - lúc duy nhất việc này có ý nghĩa - thì lại là lúc
 *  khó dựng lại nhất. Nên phần tính toán tách ra và đo ở đây. */

describe("lượng tử hoá gói vị trí", () => {
  it("làm tròn về lưới 1cm và không để lại rác nhị phân", () => {
    const q = quantizePose({ x: 3.14159265, z: -2.71828, ry: 1.2345 });
    expect(q.x).toBe(3.14);
    expect(q.z).toBe(-2.72);
    // Điểm của việc này là gói tin NGẮN đi. Một con số đúng nhưng viết thành
    // 3.1400000000000001 thì dài hơn cả trước khi làm tròn.
    expect(JSON.stringify(q.x).length).toBeLessThanOrEqual(5);
    expect(JSON.stringify(q.z).length).toBeLessThanOrEqual(6);
  });

  it("gói đã lượng tử hoá ngắn hơn hẳn gói thô", () => {
    const raw = { x: 3.14159265358979, z: -2.718281828459045, ry: 1.4142135623730951 };
    expect(JSON.stringify(quantizePose(raw)).length).toBeLessThan(JSON.stringify(raw).length / 2);
  });

  it("bỏ y khi đang ở tầng trệt, giữ khi đang ở trên cao", () => {
    // `y` tuỳ chọn là một quy ước có sẵn của LobbyPose: không có y = tầng trệt.
    // Ghi `y: 0` vào mọi gói sẽ thêm một trường cho mọi người đang đi ở tầng
    // một - ngược hẳn mục đích.
    expect(quantizePose({ x: 1, z: 2, ry: 0 }).y).toBeUndefined();
    expect(quantizePose({ x: 1, z: 2, y: 0, ry: 0 }).y).toBeUndefined();
    expect(quantizePose({ x: 1, z: 2, y: 3.456, ry: 0 }).y).toBe(3.46);
  });

  it("lưới góc quay chia tròn vòng, không trôi khi quay nhiều vòng", () => {
    // 256 bước một vòng: mọi bội của bước phải giữ nguyên sau khi làm tròn.
    for (const k of [0, 1, 37, 128, 255]) {
      const angle = k * ROTATION_STEP;
      expect(quantizePose({ x: 0, z: 0, ry: angle }).ry).toBeCloseTo(angle, 3);
    }
  });

  it("sai số không bao giờ vượt nửa bước lưới", () => {
    for (let i = 0; i < 400; i += 1) {
      const x = (i * 0.0137) % 20 - 10;
      expect(Math.abs(quantizePose({ x, z: 0, ry: 0 }).x - x)).toBeLessThanOrEqual(POSITION_STEP / 2 + 1e-9);
    }
  });
});

describe("bỏ gói trùng sau lượng tử hoá", () => {
  it("hai vị trí lệch dưới một bước lưới không sinh gói mới", () => {
    // Ngưỡng "đã nhúc nhích" cũ so trên toạ độ THÔ, nên một dịch chuyển
    // 0.011 vượt ngưỡng nhưng làm tròn lại về đúng số cũ - gửi một gói y hệt
    // gói trước, tốn băng thông cho không thông tin nào.
    const a = quantizePose({ x: 1.0, z: 1.0, ry: 0 });
    const b = quantizePose({ x: 1.004, z: 1.003, ry: 0.005 });
    expect(poseDiffers(a, b)).toBe(false);
  });

  it("dịch đủ một bước thì có gói mới", () => {
    const a = quantizePose({ x: 1.0, z: 1.0, ry: 0 });
    expect(poseDiffers(a, quantizePose({ x: 1.02, z: 1.0, ry: 0 }))).toBe(true);
    expect(poseDiffers(a, quantizePose({ x: 1.0, z: 1.0, ry: ROTATION_STEP * 2 }))).toBe(true);
  });

  it("thiếu y và y=0 là cùng một vị trí", () => {
    expect(poseDiffers({ x: 0, z: 0, ry: 0 }, { x: 0, z: 0, y: 0, ry: 0 })).toBe(false);
  });
});

describe("nội suy bám theo nhịp gửi", () => {
  it("không phụ thuộc tốc độ khung hình", () => {
    // Cùng 200ms, chia thành các khung hình dài ngắn khác nhau, phải còn lại
    // xấp xỉ cùng một phần quãng đường. Dạng `delta * k` cũ KHÔNG có tính chất
    // này - máy 120fps làm mượt khác máy 30fps.
    const remaining = (fps: number) => {
      let left = 1;
      const dt = 1 / fps;
      for (let t = 0; t < 0.2 - 1e-9; t += dt) left *= 1 - smoothingFactor(dt, 200);
      return left;
    };
    expect(Math.abs(remaining(120) - remaining(30))).toBeLessThan(0.02);
  });

  it("sau đúng một nhịp gửi, còn lại một phần thấy được - không tới đích rồi đứng", () => {
    // Đây là cả lý do hàm này tồn tại. Tới đích sớm rồi đứng chờ gói sau chính
    // là nhịp đi-dừng-đi-dừng, và mắt bắt được nó ngay.
    let left = 1;
    const dt = 1 / 60;
    for (let t = 0; t < 0.2 - 1e-9; t += dt) left *= 1 - smoothingFactor(dt, 200);
    expect(left).toBeGreaterThan(0.2);
    expect(left).toBeLessThan(0.45);
  });

  it("giãn nhịp thì nội suy chậm theo, không giữ nguyên", () => {
    // Bảo vệ đúng cái bẫy: đổi MOVE_BROADCAST_MS mà quên phía nhận.
    const dt = 1 / 60;
    expect(smoothingFactor(dt, 400)).toBeLessThan(smoothingFactor(dt, 200));
    expect(smoothingFactor(dt, 200)).toBeLessThan(smoothingFactor(dt, 120));
  });

  it("khung hình dài bất thường không làm vượt đích", () => {
    // Chuyển tab rồi quay lại cho ra một delta rất lớn; hệ số > 1 sẽ làm vị trí
    // vượt qua đích rồi dao động quanh nó.
    expect(smoothingFactor(5, 200)).toBeLessThanOrEqual(1);
    expect(smoothingFactor(0, 200)).toBe(0);
    expect(smoothingFactor(-1, 200)).toBe(0);
  });

  it("hằng thời gian đúng bằng nhịp nhân SMOOTHING_RATIO", () => {
    // Sau đúng một hằng thời gian, còn lại 1/e.
    const tau = (200 * SMOOTHING_RATIO) / 1000;
    expect(smoothingFactor(tau, 200)).toBeCloseTo(1 - Math.exp(-1), 6);
  });
});

describe("nhịp gửi", () => {
  it("là 200ms và vẫn nằm dưới trần 10 sự kiện/giây của Realtime", () => {
    // Trần là của Supabase, không phải của mình: vượt nó thì kênh rớt gói của
    // TẤT CẢ mọi người trong phòng, chứ không riêng người gửi nhiều.
    expect(MOVE_BROADCAST_MS).toBe(200);
    expect(1000 / MOVE_BROADCAST_MS).toBeLessThanOrEqual(10);
  });
});

describe("đo nhịp gói đến thật", () => {
  it("bám theo nhịp thật khi người gửi giãn gấp đôi lúc phòng đông", () => {
    // Cả ba cảnh tự giãn nhịp gấp đôi khi đông, và gói tin KHÔNG nói ra điều
    // đó - nên phía nhận phải tự đo, nếu không thì lỗi đi-dừng quay lại đúng
    // lúc phòng đông, tức lúc khó dựng lại nhất.
    const tracker = makeIntervalTracker(200);
    for (let i = 0; i <= 40; i += 1) tracker.sample(i * 400);
    expect(tracker.intervalMs).toBeGreaterThan(380);
    expect(tracker.intervalMs).toBeLessThanOrEqual(400);
  });

  it("một lần treo dài không kéo nhịp đi mãi", () => {
    // Rời tab rồi quay lại tạo khoảng cách nhiều giây. Không kẹp thì nhân vật
    // bò như sên suốt nhiều giây sau đó.
    const tracker = makeIntervalTracker(200);
    for (let i = 0; i <= 10; i += 1) tracker.sample(i * 200);
    tracker.sample(2000 + 30000);
    expect(tracker.intervalMs).toBeLessThanOrEqual(200 * 4);
    for (let i = 1; i <= 10; i += 1) tracker.sample(32000 + i * 200);
    expect(tracker.intervalMs).toBeLessThan(260);
  });

  it("không bao giờ tụt dưới nhịp danh nghĩa", () => {
    // Gói tới dày hơn mức gửi nghĩa là đo nhầm, không phải mạng nhanh hơn.
    const tracker = makeIntervalTracker(200);
    for (let i = 0; i <= 20; i += 1) tracker.sample(i * 5);
    expect(tracker.intervalMs).toBeGreaterThanOrEqual(200);
  });

  it("gói đầu tiên chưa đo được gì nên giữ nhịp danh nghĩa", () => {
    const tracker = makeIntervalTracker(200);
    tracker.sample(1234);
    expect(tracker.intervalMs).toBe(200);
  });
});
