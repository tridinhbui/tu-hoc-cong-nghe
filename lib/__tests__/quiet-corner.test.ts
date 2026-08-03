import { describe, expect, it } from "vitest";
import {
  BREATH_CYCLES,
  BREATH_CYCLE_SECONDS,
  BREATH_PHASES,
  QUIET_CORNER_CLOSING,
  QUIET_CORNER_LIMITS,
  QUIET_CORNER_QUESTIONS,
  WORRY_REFRAMES,
  getLateNightNote,
  getQuietGreeting,
} from "../quiet-corner";

describe("dong nhac dem khuya tren dashboard", () => {
  // Card lời nhắn ở dashboard chỉ có ba dòng; dòng này được phép chen vào
  // đúng dải giờ mà nó đáng giá, còn lại phải im.
  it("chi len tieng tu 23h toi truoc 5h sang", () => {
    for (const hour of [23, 0, 2, 4]) {
      expect(getLateNightNote(hour)).toBeTruthy();
    }
    for (const hour of [5, 9, 14, 19, 22]) {
      expect(getLateNightNote(hour)).toBeNull();
    }
  });

  it("ngan hon cau chao day du cua trang rieng", () => {
    const note = getLateNightNote(1)!;
    expect(note.length).toBeLessThan(getQuietGreeting(1).length);
  });
});

describe("cau chao theo gio", () => {
  it("moi gio trong ngay deu co mot cau chao", () => {
    for (let hour = 0; hour < 24; hour++) {
      expect(getQuietGreeting(hour).length).toBeGreaterThan(20);
    }
  });

  // Toàn bộ giá trị của hàm này nằm ở chỗ nửa đêm nghe KHÁC ban ngày - nếu hai
  // dải trả về cùng một câu thì nó chỉ là một hằng số đội lốt hàm.
  it("nua dem va ban ngay khong dung chung mot cau", () => {
    expect(getQuietGreeting(1)).not.toBe(getQuietGreeting(9));
    expect(getQuietGreeting(9)).not.toBe(getQuietGreeting(14));
    expect(getQuietGreeting(14)).not.toBe(getQuietGreeting(23));
  });

  it("cau khuya thua nhan noi lo chu khong ra lenh di ngu", () => {
    const lateNight = getQuietGreeting(1).toLowerCase();
    expect(lateNight).not.toContain("hãy đi ngủ");
    expect(lateNight).not.toContain("nên ngủ");
  });
});

describe("nhip tho", () => {
  it("la nhip hop 4-4-4-4, mot vong 16 giay", () => {
    expect(BREATH_PHASES.map((p) => p.seconds)).toEqual([4, 4, 4, 4]);
    expect(BREATH_CYCLE_SECONDS).toBe(16);
  });

  it("ca bai tho nam trong khoang mot phut, khong keo dai thanh nhiem vu", () => {
    const total = BREATH_CYCLE_SECONDS * BREATH_CYCLES;
    expect(total).toBeGreaterThanOrEqual(45);
    expect(total).toBeLessThanOrEqual(120);
  });

  it("vong tron phinh ra khi hit vao va co lai khi tho ra", () => {
    const [inhale, , exhale] = BREATH_PHASES;
    expect(inhale.scale).toBeGreaterThan(exhale.scale);
  });
});

describe("goc nhin cho noi lo tien bac", () => {
  it("khong trung id", () => {
    expect(new Set(WORRY_REFRAMES.map((w) => w.id)).size).toBe(WORRY_REFRAMES.length);
  });

  it("moi noi lo deu co goc nhin du dai de noi duoc mot y", () => {
    for (const item of WORRY_REFRAMES) {
      expect(item.worry.length).toBeGreaterThan(15);
      expect(item.reframe.length).toBeGreaterThan(60);
    }
  });

  // Trang này không được phép trượt thành tư vấn đầu tư - đó là ranh giới đã
  // ghi trong lib/quiet-corner.ts, nên khoá lại bằng test thay vì bằng lời hứa.
  it("khong goc nhin nao ra chi dan mua ban cu the", () => {
    const directives = [
      "bạn nên mua",
      "hãy mua",
      "nên bán",
      "hãy bán",
      "nên đầu tư vào",
      "cổ phiếu nên",
      "đảm bảo lợi nhuận",
      "chắc chắn sinh lời",
    ];
    for (const item of WORRY_REFRAMES) {
      const text = item.reframe.toLowerCase();
      for (const phrase of directives) {
        expect(text).not.toContain(phrase);
      }
    }
  });
});

describe("diem ha canh", () => {
  // Trang không được kết thúc bằng disclaimer - phần khép lại phải là lời cho
  // phép rời đi, và không được lén nhét một cú đẩy "học tiếp" vào đây.
  it("loi khep lai khong chua loi keu goi hoc tiep", () => {
    const all = QUIET_CORNER_CLOSING.lines.join(" ").toLowerCase();
    expect(all).not.toContain("học tiếp");
    expect(all).not.toContain("xp");
    expect(all).not.toContain("streak");
    expect(QUIET_CORNER_CLOSING.lines.length).toBeGreaterThan(0);
  });
});

describe("ranh gioi cua trang", () => {
  it("noi ro day khong phai tri lieu va co huong dan tim tro giup", () => {
    const body = QUIET_CORNER_LIMITS.body.toLowerCase();
    expect(body).toContain("không phải tư vấn tâm lý");
    expect(body).toContain("chuyên gia");
  });

  // Một số hotline sai hoặc đã ngừng hoạt động còn tệ hơn không có số nào.
  it("khong in so dien thoai nao chua duoc kiem chung", () => {
    expect(QUIET_CORNER_LIMITS.body).not.toMatch(/\d{4,}/);
  });
});

// Ba câu hỏi này phục vụ nỗi lo không có trong danh sách viết sẵn, nên chúng
// phải giữ đúng ranh giới của cả trang: hỏi về thông tin và thời điểm, không
// gợi ý nên làm gì với tiền.
describe("ba cau hoi cho noi lo rieng", () => {
  it("khong trung id va moi cau deu co phan giai thich du dai", () => {
    const ids = new Set(QUIET_CORNER_QUESTIONS.items.map((q) => q.id));
    expect(ids.size).toBe(QUIET_CORNER_QUESTIONS.items.length);
    for (const item of QUIET_CORNER_QUESTIONS.items) {
      expect(item.question.endsWith("?")).toBe(true);
      expect(item.note.length).toBeGreaterThan(80);
    }
  });

  it("khong cau nao ra chi dan tai chinh cu the", () => {
    const directives = ["bạn nên mua", "hãy mua", "nên bán", "hãy bán", "nên đầu tư vào"];
    const all = QUIET_CORNER_QUESTIONS.items
      .map((q) => `${q.question} ${q.note}`)
      .join(" ")
      .toLowerCase();
    for (const phrase of directives) {
      expect(all).not.toContain(phrase);
    }
  });
});
