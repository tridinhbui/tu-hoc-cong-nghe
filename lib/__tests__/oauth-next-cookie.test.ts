import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import path from "path";
import { OAUTH_NEXT_COOKIE, clearOAuthNextCookie } from "@/lib/oauth-next-cookie";

/**
 * ĐÃ VIẾT LẠI SAU KHI TRANG ĐĂNG NHẬP CHUYỂN SANG /api/auth/google/*.
 *
 * Bản trước kiểm chuỗi `redirectTo:` không mang query - một ràng buộc của
 * Supabase (khớp URL với danh sách Redirect Urls TRÊN TOÀN BỘ chuỗi). Google
 * OAuth tự viết ở đây không có ràng buộc ấy: redirect_uri gửi cho Google
 * (lib/auth/google.ts) LUÔN là chính route callback, cố định, không phụ
 * thuộc danh sách bên ngoài nào để trượt khỏi - nên phép kiểm đó không còn ý
 * nghĩa gì với kiến trúc mới.
 *
 * Tính chất ĐÁNG giữ lại không đổi: đích đến sau đăng nhập vẫn đi bằng cookie
 * chứ không phải query (route callback chạy trên server, không thấy được
 * `?next=` của trang đăng nhập), cookie vẫn phải đặt TRƯỚC khi rời trang, và
 * vẫn phải được dọn trên cả hai nhánh thành công lẫn thất bại.
 */

const loginSource = readFileSync(path.join(process.cwd(), "app/login/page.tsx"), "utf8");
const callbackSource = readFileSync(
  path.join(process.cwd(), "app/api/auth/google/callback/route.ts"),
  "utf8"
);

describe("đăng nhập Google", () => {
  it("đặt cookie đích đến TRƯỚC khi điều hướng sang /api/auth/google/start", () => {
    const setCall = loginSource.indexOf("rememberOAuthNext(");
    const navCall = loginSource.indexOf('window.location.href = "/api/auth/google/start"');
    expect(setCall, "trang đăng nhập không đặt cookie đích đến").toBeGreaterThan(-1);
    expect(
      setCall,
      "điều hướng đi ngay sau dòng đó, nên đặt cookie sau nó có thể không kịp chạy"
    ).toBeLessThan(navCall);
  });

  it("không còn gọi thẳng Supabase cho luồng Google", () => {
    expect(loginSource).not.toContain("signInWithOAuth");
  });
});

describe("callback đọc đích đến", () => {
  it("đọc từ cookie, lọc lại bằng safeNextPath trước khi dùng", () => {
    // Cookie do trình duyệt gửi lên, không đáng tin hơn bất kỳ nguồn nào khác
    // - "//evil.com" đặt được vào cookie y như vào query.
    expect(callbackSource).toContain("OAUTH_NEXT_COOKIE");
    expect(callbackSource).toMatch(/safeNextPath\(/);
  });

  it("dọn cookie trên cả nhánh thành công lẫn nhánh lỗi", () => {
    // Để lại thì lần đăng nhập bằng email sau đó thừa hưởng đích đến của lần
    // OAuth này.
    const count = (callbackSource.match(/clearOAuthNextCookie\(\)/g) ?? []).length;
    expect(count, "cần ít nhất một lần dọn ở nhánh lỗi và một lần ở nhánh thành công").toBeGreaterThanOrEqual(2);
  });
});

describe("chuỗi cookie", () => {
  it("xoá bằng Max-Age=0 và cùng Path với lúc đặt", () => {
    const cleared = clearOAuthNextCookie();
    expect(cleared).toContain(`${OAUTH_NEXT_COOKIE}=`);
    expect(cleared).toContain("Max-Age=0");
    expect(cleared, "khác Path thì trình duyệt xoá một cookie khác").toContain("Path=/");
  });
});
