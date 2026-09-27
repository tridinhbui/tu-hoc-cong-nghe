import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { MIN_PASSWORD_LENGTH } from "../auth/password-policy";

// Con số trong câu thông báo phải là con số máy chủ thật sự đòi.
//
// Đã lệch một lần: máy chủ đòi 8, form kiểm < 6 và bốn câu nói "ít nhất 6" -
// mặc định của dịch vụ xác thực cũ. Mật khẩu 7 ký tự qua form, bị máy chủ từ
// chối, rồi người dùng đọc một câu nói rằng 7 là đủ.

const FILES = [
  "lib/i18n/dictionaries/vi.ts",
  "lib/i18n/dictionaries/en.ts",
  "lib/i18n/dictionaries/sections/misc-data.ts",
  "lib/i18n/dictionaries/sections/docs-auth.ts",
];

describe("độ dài mật khẩu tối thiểu", () => {
  it("mọi câu thông báo nêu đúng con số máy chủ đòi", () => {
    const wrong: string[] = [];
    let found = 0;
    for (const f of FILES) {
      const src = readFileSync(f, "utf8");
      // Chỉ câu nói về MẬT KHẨU: "ít nhất 2 ký tự" của ô tìm kiếm là quy tắc khác,
      // và bản đầu của bộ kiểm này đã bắt nhầm đúng câu đó.
      for (const m of src.matchAll(/(?:Mật khẩu|mật khẩu|[Pp]assword)[^"\n]{0,40}?(?:ít nhất|at least|phải từ) (\d+) (?:ký tự|characters)/g)) {
        found++;
        if (Number(m[1]) !== MIN_PASSWORD_LENGTH) wrong.push(`${f}: "${m[0]}"`);
      }
    }
    expect(found).toBeGreaterThanOrEqual(4); // phép đo không rỗng vì regex hỏng
    expect(wrong).toEqual([]);
  });

  it("form và máy chủ dùng chung hằng số, không viết số cứng", () => {
    for (const f of ["lib/auth/service.ts", "app/login/page.tsx", "app/auth/reset-password/page.tsx"]) {
      const src = readFileSync(f, "utf8");
      expect(src, f).toContain("MIN_PASSWORD_LENGTH");
      expect(src, f).not.toMatch(/password\.length < \d/i);
    }
  });
});
