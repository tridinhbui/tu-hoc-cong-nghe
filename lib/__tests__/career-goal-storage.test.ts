import { describe, expect, it } from "vitest";
import {
  CAREER_GOAL_EVENT,
  CAREER_GOAL_KEY,
  CAREER_GOAL_STORAGE_EVENT,
  CAREER_ITEMS_KEY,
} from "../career-goal-storage";

// Hai kênh mang hai loại tin và KHÔNG được trùng tên.
//
// CAREER_GOAL_EVENT mang giá trị mới trong `detail.careerId`, và AppNavbar
// đọc thẳng từ đó. CAREER_GOAL_STORAGE_EVENT chỉ nói "khoá vừa đổi" và được
// bắn bằng một Event trần. Gộp chúng lại thì mỗi lần đồng bộ mục tiêu từ
// server, AppNavbar sẽ đọc `detail` ra undefined và xoá mất mục tiêu đang có
// - đúng lỗi suýt lọt khi hai kênh còn chung một tên.

describe("kênh báo đổi mục tiêu sự nghiệp", () => {
  it("hai kênh khác tên nhau", () => {
    expect(CAREER_GOAL_EVENT).not.toBe(CAREER_GOAL_STORAGE_EVENT);
  });

  it("khoá lưu trữ khác nhau và không rỗng", () => {
    expect(CAREER_GOAL_KEY).not.toBe(CAREER_ITEMS_KEY);
    for (const value of [CAREER_GOAL_KEY, CAREER_ITEMS_KEY, CAREER_GOAL_EVENT, CAREER_GOAL_STORAGE_EVENT]) {
      expect(value.length).toBeGreaterThan(0);
    }
  });

  it("giữ nguyên tên khoá cũ - đổi là mất mục tiêu của mọi người đã lưu", () => {
    expect(CAREER_GOAL_KEY).toBe("active_career_goal");
    expect(CAREER_ITEMS_KEY).toBe("active_career_completed_items");
  });

  it("giữ nguyên tên sự kiện AppNavbar đã nghe sẵn", () => {
    expect(CAREER_GOAL_EVENT).toBe("thtcdn:career-goal-updated");
  });
});
