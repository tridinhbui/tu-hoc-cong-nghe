import { describe, expect, it } from "vitest";
import { getLessonDisplayLabel, getLessonShortTitle } from "../lesson-labels";
import { lessons } from "../lessons";

// Nhãn bài học là chỗ bốn hệ đánh số của kho nội dung gặp nhau.
//
// Kho bài mang bốn con số cho cùng một bài: `id` (thứ tự trong dữ liệu, có
// lỗ hổng), `day` (bản sao của id, chỉ 286/689 bài có), số chặng trong tiêu
// đề, và ordinal mà dashboard tự đánh theo thứ tự học. Chỉ con số cuối cùng
// là thứ người học từng nhìn thấy ở nơi khác.
//
// Hàm nhãn trước đây rơi xuống `Bài ${lesson.id}` khi không đọc được tiêu đề,
// nên 298 bài hiện một id nội bộ bốn chữ số ngay trên đầu trang - "Bài 1690" -
// một con số không xuất hiện ở bất kỳ đâu khác trong ứng dụng.

const ALL = lessons.map((l) => ({ id: l.id, title: l.title, track: l.track }));

describe("nhãn đọc được từ tiêu đề", () => {
  it("giữ số chặng của track cá nhân", () => {
    expect(getLessonDisplayLabel({ id: 269, title: "Chặng 7, Bài 1: Đầu tư giá trị - abc", track: undefined })).toBe(
      "Chặng 7 · Bài 1",
    );
  });

  it("đọc tiền tố tên chặng của track chuyên ngành", () => {
    expect(getLessonDisplayLabel({ id: 1431, title: "Excel, Bài 1: Kỷ luật bàn phím", track: undefined })).toBe(
      "Excel · Bài 1",
    );
    expect(
      getLessonDisplayLabel({ id: 1101, title: "IB & Phân tích, Bài 1: Quality of Earnings", track: undefined }),
    ).toBe("IB & Phân tích · Bài 1");
  });

  it("đọc dạng số đứng ngay sau tên chuỗi bài", () => {
    expect(getLessonDisplayLabel({ id: 1571, title: "CFA Ethics 15: Khung ra quyết định", track: undefined })).toBe(
      "CFA Ethics · Bài 15",
    );
  });

  it("bài case giữ nhãn riêng", () => {
    expect(getLessonDisplayLabel({ id: 801, title: "Tesla Q1/2026 Cash Flow", track: "bonus" })).toBe(
      "Case chuyên sâu",
    );
  });

  it("không đọc được tiêu đề thì lấy tên chặng, không lấy id", () => {
    const label = getLessonDisplayLabel({ id: 1690, title: "Đọc thuyết minh - phần dài nhất", track: undefined });
    expect(label).not.toMatch(/\d{3}/);
    expect(label.length).toBeGreaterThan(0);
  });
});

describe("không nhãn nào rò số nội bộ", () => {
  it("không bài nào hiện id bốn chữ số", () => {
    const leaking = ALL.filter((l) => /\d{4}/.test(getLessonDisplayLabel(l))).map(
      (l) => `${l.id} → "${getLessonDisplayLabel(l)}"`,
    );
    expect(leaking).toEqual([]);
  });

  it("không nhãn nào là chữ 'Day' - hệ đánh số đó không hiện ở đâu khác", () => {
    const days = ALL.filter((l) => /^Day\s/.test(getLessonDisplayLabel(l))).map((l) => l.id);
    expect(days).toEqual([]);
  });

  it("mọi bài đều có nhãn khi người gọi truyền đủ track", () => {
    const empty = ALL.filter((l) => getLessonDisplayLabel(l) === "").map((l) => l.id);
    expect(empty).toEqual([]);
  });

  it("thiếu track thì mất nhãn, nhưng không bao giờ rơi xuống id", () => {
    // Nhiều nơi gọi truyền `{ id, title, track: undefined }` và không có
    // trường `day`, nên mọi nhánh dựa vào hai trường đó chết ở đó. Nhãn rỗng
    // là hệ quả chấp nhận được; một id nội bộ thì không.
    const labels = ALL.map((l) => getLessonDisplayLabel({ ...l, track: undefined }));
    expect(labels.filter((x) => /\d{4}/.test(x))).toEqual([]);
    // Chỉ bài case mới có thể rỗng - chúng không thuộc chặng nào cả.
    const emptyIds = ALL.filter((_, i) => labels[i] === "").map((l) => l.id);
    expect(emptyIds.every((id) => ALL.find((l) => l.id === id)!.track === "bonus")).toBe(true);
  });
});

describe("tiêu đề rút gọn", () => {
  it("cắt cả hai dạng tiền tố khỏi tiêu đề hiển thị", () => {
    expect(getLessonShortTitle({ title: "Chặng 7, Bài 1: Vay mua nhà" })).toBe("Vay mua nhà");
    expect(getLessonShortTitle({ title: "Tự học Tài chính Day 81: Present Value" })).toBe("Present Value");
  });
});
