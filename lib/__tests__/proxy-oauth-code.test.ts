import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "fs";
import path from "path";

/** Mã OAuth rơi xuống trang chủ thì phải được chuyển tiếp sang /auth/callback.
 *
 *  Supabase chỉ dùng `redirect_to` khi URL ấy khớp danh sách Redirect URLs của
 *  dự án. Không khớp thì nó rơi về "Site URL" - trang chủ - và gắn `?code=` vào
 *  đó, không báo lỗi gì. Người dùng đứng ở `/?code=<uuid>` và chưa đăng nhập.
 *
 *  Nhánh này đã đi qua ba chỗ, và bài test đi theo:
 *
 *   1. `proxy.ts`. Đi cùng proxy, vì Next 16 chạy Proxy ở runtime Node còn
 *      Workers thì chưa hỗ trợ.
 *   2. `redirects()` trong next.config.ts - đúng ra là chỗ tốt nhất, vì nó
 *      chạy ở tầng định tuyến trước mọi mã ứng dụng. KHÔNG DÙNG ĐƯỢC:
 *      `@opennextjs/cloudflare` bỏ qua điều kiện `has`, nên quy tắc khớp cả
 *      request KHÔNG có `?code=`. Đo trên cùng một routes-manifest: `next dev`
 *      trả 200 cho `/`, Worker trả 307 - trang chủ bị đá đi ở mọi lượt vào.
 *   3. `components/home/RedirectSignedIn.tsx`, phía trình duyệt.
 *
 *  Bài test đọc nguồn chứ không dựng component: thứ đáng gác ở đây là THỨ TỰ,
 *  và thứ tự đọc được từ nguồn. */

const repoRoot = process.cwd();
const gate = path.join(repoRoot, "components", "home", "RedirectSignedIn.tsx");
const source = readFileSync(gate, "utf8");

// Đo trên nguồn ĐÃ BỎ CHÚ THÍCH. Bản đầu của bài test này đo trên nguồn thô và
// hỏng ngay: tệp mở đầu bằng một chú thích kể lại lịch sử ba chỗ nhánh này từng
// nằm, trong đó có chữ "getSession()", nên phép so vị trí đọc phải một câu văn
// chứ không phải một lời gọi. Chú thích càng kỹ thì bẫy này càng dễ sập.
const code = source
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .split("\n")
  .filter((line) => !line.trim().startsWith("//"))
  .join("\n");

describe("mã OAuth rơi xuống trang chủ", () => {
  it("trang chủ có nhánh chuyển tiếp sang /auth/callback", () => {
    expect(code).toContain('get("code")');
    expect(code).toMatch(/router\.replace\(`\/auth\/callback/);
  });

  it("nhánh mã OAuth chạy TRƯỚC phép kiểm phiên", () => {
    // Người vừa đăng nhập bằng Google chưa có phiên nào - đó chính là thứ họ
    // đang cố lấy. Kiểm phiên trước thì hàm thoát ở nhánh "chưa đăng nhập" và
    // mã không bao giờ được đổi lấy phiên: đúng lỗi ban đầu, tự dựng lại.
    const codeAt = code.indexOf('get("code")');
    const sessionAt = code.indexOf("getSession()");
    expect(codeAt).toBeGreaterThan(-1);
    expect(sessionAt).toBeGreaterThan(-1);
    expect(codeAt).toBeLessThan(sessionAt);
  });

  it("không quay lại next.config, nơi adapter bỏ qua điều kiện has", () => {
    const config = readFileSync(path.join(repoRoot, "next.config.ts"), "utf8");
    expect(config).not.toMatch(/type:\s*"query",\s*key:\s*"code"/);
  });

  it("proxy.ts không quay lại", () => {
    expect(existsSync(path.join(repoRoot, "proxy.ts"))).toBe(false);
  });
});
