import { describe, it, expect } from "vitest";
import { execFileSync } from "child_process";
import { readFileSync } from "fs";
import path from "path";

/** 2026-09-30: VERCEL ĐÃ NGẮT. App chạy trên Cloudflare Workers
 *  (wrangler.jsonc, .github/workflows/cloudflare-deploy.yml); Vercel vẫn còn
 *  nối với repo GitHub nên mỗi commit lên main nó lại build - và build hỏng,
 *  vì bản Cloudflare không build được trên Vercel - rồi gửi mail "Production
 *  deployment failed" cho chủ repo. Bộ kiểm dưới đây giờ gác điều ngược lại
 *  với trước: Vercel KHÔNG build nhánh nào.
 *
 *  ĐỪNG XOÁ vercel.json để "gỡ cho sạch": không có tệp này thì Vercel quay về
 *  mặc định là build MỌI nhánh. Ngắt hẳn là việc ở bảng điều khiển Vercel
 *  (Project Settings → Git → Disconnect, hoặc xoá project); tệp này là lớp
 *  chặn phía repo, còn đứng đó cả khi project vẫn nối.
 *
 *  Lịch sử bên dưới giữ lại vì nó vẫn đúng về cách tệp này hỏng lặng lẽ.
 *
 *  `vercel.json` quyết định push lên main có deploy hay không, và nó hỏng theo
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

  it("tắt deploy từ git cho mọi nhánh", () => {
    // `false` trần, không phải bảng glob: không còn mẫu nào để chồng nhau.
    expect(config.git?.deploymentEnabled).toBe(false);
  });

  it("ignoreCommand bỏ qua build ở mọi nhánh, kể cả main", () => {
    // Lớp chặn thứ hai, phòng khi Vercel bỏ qua `deploymentEnabled` (ví dụ
    // deploy tay qua "Redeploy" trong bảng điều khiển).
    for (const ref of ["main", "chuyen-sang-cong-nghe", "dev", "feature/x", "MAIN"]) {
      expect(buildsOn(ref), ref).toBe(false);
    }
  });

  it("không khai báo cron nào", () => {
    // Cron chạy trên Cloudflare, không phải Vercel.
    expect(config.crons ?? []).toHaveLength(0);
  });
});
