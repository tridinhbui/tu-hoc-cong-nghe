import { describe, it, expect } from "vitest";
import { execFileSync } from "child_process";
import { readFileSync } from "fs";
import path from "path";

/** `vercel.json` quyết định push lên main có deploy hay không, và nó hỏng theo
 *  kiểu KHÔNG tạo ra tín hiệu nào: "không deploy" trông y hệt "chưa push". Đã
 *  hỏng hai lần theo hai cách khác nhau, nên cổng này kiểm cả hai.
 *
 *  LẦN MỘT, ngầm. Commit 973e088 sửa một lỗi kiểu `as const` trong bộ kiểm và
 *  tiện tay đổi `main: true` thành `main: false`, không nhắc gì trong thông
 *  điệp commit.
 *
 *  LẦN HAI, và đây mới là cái đáng sợ, vì nó hỏng ngay từ lúc được "sửa".
 *  Cấu hình cũ là `{ "main": true, "**": false }`. Cả HAI mẫu đều khớp nhánh
 *  `main` - `**` khớp cả tên không chứa dấu gạch chéo - nên kết quả phụ thuộc
 *  vào thứ tự ưu tiên giữa hai mẫu chồng nhau, thứ không tra được từ trong
 *  repo. 82 commit đã đi qua cửa sổ đó mà không có bản deploy nào.
 *
 *  Nên bỏ hẳn glob chồng nhau. `ignoreCommand` so sánh chuỗi chính xác với
 *  $VERCEL_GIT_COMMIT_REF: exit 1 nghĩa là build, exit 0 nghĩa là bỏ qua. Không
 *  còn mẫu nào chồng lên mẫu nào, và bộ kiểm CHẠY THẬT lệnh đó thay vì đọc
 *  chuỗi - một lệnh shell đúng cú pháp nhưng sai logic vẫn khớp mọi phép so
 *  chuỗi. */
describe("vercel.json", () => {
  const config = JSON.parse(
    readFileSync(path.join(process.cwd(), "vercel.json"), "utf8"),
  );

  /** Trả về true nếu Vercel sẽ build cho nhánh này (ignoreCommand thoát 1). */
  const buildsOn = (ref: string): boolean => {
    try {
      execFileSync("sh", ["-c", config.ignoreCommand], {
        env: { ...process.env, VERCEL_GIT_COMMIT_REF: ref },
        stdio: "ignore",
      });
      return false; // thoát 0 = bỏ qua build
    } catch {
      return true; // thoát khác 0 = build
    }
  };

  it("có ignoreCommand chứ không dựa vào glob chồng nhau", () => {
    expect(typeof config.ignoreCommand).toBe("string");
    // `main` và `**` cùng khớp nhánh main; đó là lỗi cũ, đừng dựng lại.
    const enabled = config.git?.deploymentEnabled ?? {};
    expect(Object.keys(enabled).filter((k) => k !== "**")).toEqual([]);
  });

  it("build khi và chỉ khi nhánh là main", () => {
    expect(buildsOn("main")).toBe(true);
    for (const ref of ["dev", "staging", "feature/x", "release/1.2", "hotfix/a/b"]) {
      expect(buildsOn(ref), ref).toBe(false);
    }
  });

  it("so khớp chính xác, không phải tiền tố", () => {
    // `main-backup` và `mainline` không được kích hoạt build production.
    for (const ref of ["main-backup", "mainline", "origin/main", "MAIN"]) {
      expect(buildsOn(ref), ref).toBe(false);
    }
  });

  it("không khai báo cron nào khi chưa có máy chủ để cron gọi tới", () => {
    // Sáu cron cũ trỏ vào /api/cron/* và cả sáu đều đọc Supabase của dự án tài
    // chính cũ. Khi ngắt cơ sở dữ liệu đó, để lịch cron nguyên vẹn nghĩa là
    // Vercel vẫn gọi sáu endpoint mỗi ngày và cả sáu lỗi lặng lẽ - đúng kiểu
    // hỏng-không-tín-hiệu mà chú thích đầu file này nói tới.
    //
    // Cổng vẫn giữ hình dạng cũ chứ không xoá hẳn: nếu sau này có cron thật cho
    // phiên bản công nghệ, mỗi mục vẫn phải là một đường /api/cron/ hợp lệ.
    const crons = config.crons ?? [];
    expect(Array.isArray(crons)).toBe(true);
    expect(crons).toHaveLength(0);
    for (const c of crons) {
      expect(c.path).toMatch(/^\/api\/cron\//);
      expect(typeof c.schedule).toBe("string");
    }
  });
});
