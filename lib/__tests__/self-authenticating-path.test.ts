import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import path from "path";
import { isSelfAuthenticatingPath } from "@/lib/self-authenticating-path";

/** Phép đoán này quyết định proxy CÓ GỌI `getUser()` hay không, và nó sai về
 *  hai phía rất khác nhau - khác cả với lib/has-auth-cookie.ts, vốn chỉ sai về
 *  phía tốn tiền.
 *
 *  Trả `false` nhầm: một request `/api/*` bị xác minh hai lần thay vì một. Chỉ
 *  tốn một vòng mạng, đúng trạng thái trước khi có tệp này.
 *
 *  Trả `true` nhầm: proxy thoát TRƯỚC cổng mặc-định-từ-chối, nên một trang lẽ
 *  ra phải đăng nhập lại dựng cho khách. Đó là lý do danh sách phải là hai
 *  tiền tố cố định và phải nằm sẵn trong PUBLIC_PREFIXES - bộ kiểm cuối giữ
 *  đúng ràng buộc đó. */

describe("đường dẫn tự xác thực", () => {
  it("route API tự xác thực trong chính handler", () => {
    for (const p of ["/api/pvp", "/api/career-profile", "/api/cron/send-weekly-digest"]) {
      expect(isSelfAuthenticatingPath(p)).toBe(true);
    }
  });

  it("luồng auth chạy trước khi có phiên", () => {
    expect(isSelfAuthenticatingPath("/auth/callback")).toBe(true);
    expect(isSelfAuthenticatingPath("/auth/reset-password")).toBe(true);
  });

  it("trang cần đăng nhập KHÔNG được lọt", () => {
    for (const p of ["/dashboard", "/lo-trinh", "/su-nghiep", "/bai-hoc/roic", "/admin/users"]) {
      expect(isSelfAuthenticatingPath(p)).toBe(false);
    }
  });

  it("trang công khai cũng không lọt - chúng vẫn cần getUser() để chuyển hướng", () => {
    // "/" chuyển người đã đăng nhập sang /dashboard, và phép chuyển đó cần biết
    // có ai đang đăng nhập. Bỏ nó vào đây là làm chết tính năng ấy chứ không
    // phải tiết kiệm.
    expect(isSelfAuthenticatingPath("/")).toBe(false);
    expect(isSelfAuthenticatingPath("/login")).toBe(false);
  });

  it("khớp cả đoạn, không khớp nửa chữ", () => {
    // Không có route nào tên thế này hôm nay. Bộ kiểm giữ cho một route như vậy
    // thêm vào ngày mai không lặng lẽ mất cổng đăng nhập.
    expect(isSelfAuthenticatingPath("/apibutnot")).toBe(false);
    expect(isSelfAuthenticatingPath("/authentic")).toBe(false);
    expect(isSelfAuthenticatingPath("/api")).toBe(false);
  });

  it("mọi tiền tố ở đây đều đã nằm trong PUBLIC_PREFIXES của proxy", () => {
    // Đây là ràng buộc thật sự giữ cho việc thoát sớm là an toàn: proxy bỏ qua
    // cổng mặc-định-từ-chối cho các đường dẫn này, và điều đó chỉ vô hại khi
    // cổng ấy vốn đã không chặn chúng. Đọc thẳng từ proxy.ts để hai danh sách
    // không thể trôi khỏi nhau trong im lặng.
    const proxySource = readFileSync(path.join(process.cwd(), "proxy.ts"), "utf8");
    const block = /const PUBLIC_PREFIXES = \[([\s\S]*?)\];/.exec(proxySource);
    expect(block, "không tìm thấy PUBLIC_PREFIXES trong proxy.ts").not.toBeNull();
    const publicPrefixes = [...block![1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);

    for (const p of ["/api/x", "/auth/x"]) {
      expect(isSelfAuthenticatingPath(p)).toBe(true);
      expect(
        publicPrefixes.some((prefix) => p.startsWith(prefix)),
        `${p} thoát sớm nhưng KHÔNG nằm trong PUBLIC_PREFIXES - cổng đăng nhập vừa bị gỡ`
      ).toBe(true);
    }
  });
});
