import { describe, expect, it } from "vitest";
import {
  MIN_PANEL_WIDTH,
  VIEWPORT_MARGIN,
  clampPanelWidth,
  readStoredWidth,
  widthFromPointer,
} from "@/lib/resizable-panel";

/** Bề rộng kéo tay của panel chat.
 *
 *  Ba biên, cả ba đều làm panel không dùng được nếu sai: hẹp quá thì tin nhắn
 *  vỡ chữ, rộng quá thì panel tràn khỏi màn hình VÀ mất luôn cạnh để kéo lại,
 *  và một giá trị hỏng trong localStorage không được phép làm panel biến mất. */

describe("giữ trong khoảng dùng được", () => {
  it("giá trị bình thường thì giữ nguyên", () => {
    expect(clampPanelWidth(600, 1440)).toBe(600);
  });

  it("kéo hẹp quá thì dừng ở mức tối thiểu", () => {
    expect(clampPanelWidth(80, 1440)).toBe(MIN_PANEL_WIDTH);
    expect(clampPanelWidth(0, 1440)).toBe(MIN_PANEL_WIDTH);
    expect(clampPanelWidth(-500, 1440)).toBe(MIN_PANEL_WIDTH);
  });

  it("kéo rộng quá thì dừng trước mép màn hình", () => {
    // Nếu để tràn thì cạnh kéo nằm ngoài khung nhìn và không kéo lại được nữa.
    expect(clampPanelWidth(99_999, 1440)).toBe(1440 - VIEWPORT_MARGIN);
  });

  it("màn hình hẹp hơn cả mức tối thiểu thì lấy trọn bề ngang", () => {
    // Thà chạm mép còn hơn tràn ra ngoài.
    expect(clampPanelWidth(500, 300)).toBe(300);
  });

  it("khung nhìn vô nghĩa không làm vỡ", () => {
    expect(clampPanelWidth(600, 0)).toBe(MIN_PANEL_WIDTH);
    expect(clampPanelWidth(600, Number.NaN)).toBe(MIN_PANEL_WIDTH);
  });

  it("bề rộng yêu cầu là NaN thì về mức tối thiểu, không thành NaN", () => {
    expect(clampPanelWidth(Number.NaN, 1440)).toBe(MIN_PANEL_WIDTH);
  });

  it("trả về số nguyên", () => {
    expect(Number.isInteger(clampPanelWidth(600.7, 1440))).toBe(true);
  });
});

describe("kéo cạnh trái của panel neo phải", () => {
  it("kéo sang trái thì rộng ra", () => {
    const near = widthFromPointer(900, 1440, 24);
    const far = widthFromPointer(600, 1440, 24);
    expect(far).toBeGreaterThan(near);
  });

  it("bề rộng là khoảng cách từ con trỏ tới mép phải, trừ lề", () => {
    expect(widthFromPointer(800, 1440, 24)).toBe(1440 - 800 - 24);
  });

  it("kéo quá mép trái vẫn dừng trong khoảng hợp lệ", () => {
    expect(widthFromPointer(-200, 1440, 24)).toBe(1440 - VIEWPORT_MARGIN);
  });

  it("kéo quá sang phải thì dừng ở mức tối thiểu", () => {
    expect(widthFromPointer(1430, 1440, 24)).toBe(MIN_PANEL_WIDTH);
  });
});

describe("đọc bề rộng đã nhớ", () => {
  it("chưa nhớ gì thì trả null để dùng mặc định", () => {
    // null KHÁC 0: trả 0 sẽ làm panel mở ra với bề rộng tối thiểu cho người
    // lần đầu dùng, thay vì cỡ mặc định đã thiết kế.
    expect(readStoredWidth(null, 1440)).toBeNull();
  });

  it("đọc lại đúng số đã lưu", () => {
    expect(readStoredWidth("640", 1440)).toBe(640);
  });

  it("giá trị rác thì coi như chưa nhớ", () => {
    expect(readStoredWidth("abc", 1440)).toBeNull();
    expect(readStoredWidth("", 1440)).toBeNull();
  });

  it("số đã lưu lớn hơn màn hình hiện tại thì thu về vừa màn hình", () => {
    // Lưu trên màn ngoài rồi mở lại trên laptop - không được để panel tràn.
    expect(readStoredWidth("2400", 1280)).toBe(1280 - VIEWPORT_MARGIN);
  });
});
