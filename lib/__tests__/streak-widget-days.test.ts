import { describe, expect, it } from "vitest";
import { extractStreakDays } from "@/lib/streak-post-days";

/** Con số trên huy hiệu của CommunityStreakWidget.
 *
 *  VÌ SAO CÓ TỆP NÀY. Bản đầu của hàm chỉ có một nhánh: regex `/(\d+)\s*ngày/i`
 *  chạy trên `content` - tức là nó đọc ngược con số ra từ CÂU HIỂN THỊ mà
 *  app/api/cron/send-streak-milestones dựng ("... vừa đạt chuỗi 7 ngày học liên
 *  tục! 🔥"). Cùng lệnh insert đó đã ghi sẵn `metadata.streak_days`.
 *
 *  Nghĩa là huy hiệu phụ thuộc vào lời văn của một tệp khác. Sửa câu, hoặc dịch
 *  nó sang tiếng Anh, thì huy hiệu biến mất - không lỗi, không cảnh báo, và
 *  người sửa câu không có lý do gì để nghĩ tới một widget trên dashboard.
 *
 *  Giờ metadata là đường chính và regex là nhánh dự phòng cho những bài đã lưu
 *  trước khi có metadata. Bộ kiểm này giữ cả hai nhánh, và giữ luôn thứ tự ưu
 *  tiên giữa chúng. */

const post = (content: string, metadata: Record<string, unknown> | null = null) => ({
  content,
  metadata,
});

describe("đọc số ngày từ metadata trước", () => {
  it("lấy metadata.streak_days khi có", () => {
    expect(extractStreakDays(post("bất kỳ chữ gì", { streak_days: 7 }))).toBe(7);
  });

  it("metadata thắng khi hai nguồn lệch nhau", () => {
    // Không phải trường hợp giả định: nếu câu được viết lại mà metadata giữ
    // nguyên, con số ĐÚNG là cái trong metadata.
    expect(extractStreakDays(post("vừa đạt chuỗi 3 ngày", { streak_days: 30 }))).toBe(30);
  });

  it("chuỗi số trong metadata vẫn đọc được", () => {
    // PostgREST trả jsonb, và một giá trị số có thể về dưới dạng chuỗi.
    expect(extractStreakDays(post("x", { streak_days: "12" }))).toBe(12);
  });

  it("làm tròn xuống thay vì hiện số lẻ", () => {
    expect(extractStreakDays(post("x", { streak_days: 5.9 }))).toBe(5);
  });
});

describe("dự phòng bằng câu tiếng Việt", () => {
  it("đọc được bài cũ chưa có metadata", () => {
    expect(extractStreakDays(post("An vừa đạt chuỗi 14 ngày học liên tục! 🔥"))).toBe(14);
  });

  it("metadata hỏng thì rơi về câu, không trả null", () => {
    for (const bad of [null, {}, { streak_days: null }, { streak_days: "abc" }, { streak_days: 0 }]) {
      expect(extractStreakDays(post("chuỗi 9 ngày", bad as Record<string, unknown> | null)), String(bad)).toBe(9);
    }
  });

  it("không có số nào thì trả null để dòng đó chỉ hiện tên", () => {
    // null KHÁC 0: widget ẩn hẳn huy hiệu, chứ không hiện "0 ngày".
    expect(extractStreakDays(post("An vừa lập một kỷ lục mới"))).toBeNull();
    expect(extractStreakDays(post(""))).toBeNull();
  });

  it("số âm hoặc số 0 trong câu không thành huy hiệu", () => {
    expect(extractStreakDays(post("chuỗi 0 ngày"))).toBeNull();
  });
});

describe("giới hạn đã biết của nhánh dự phòng", () => {
  it("câu tiếng Anh KHÔNG đọc được - đó là lý do metadata phải là đường chính", () => {
    // Khoá lại đúng lỗ hổng đã có: nếu feedPostContent từng được dịch mà hàm
    // này vẫn chỉ có regex, mọi huy hiệu sẽ biến mất trong im lặng.
    expect(extractStreakDays(post("An just hit a 7 day streak!"))).toBeNull();
    // Và với metadata thì cùng bài đó vẫn hiện đúng.
    expect(extractStreakDays(post("An just hit a 7 day streak!", { streak_days: 7 }))).toBe(7);
  });
});
