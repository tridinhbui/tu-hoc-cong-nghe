import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import path from "path";
import { OAUTH_NEXT_COOKIE, clearOAuthNextCookie } from "@/lib/oauth-next-cookie";

/** `redirectTo` của luồng Google phải KHỚP CHÍNH XÁC một mục trong danh sách
 *  Redirect URLs của Supabase.
 *
 *  Phép khớp ấy áp cho toàn bộ URL, không riêng đường dẫn. Danh sách của dự án
 *  này đăng ký bốn URL trần, không ký tự đại diện, nên bất kỳ query nào gắn vào
 *  `redirectTo` cũng làm nó trượt - và Supabase trượt thì rơi về Site URL kèm
 *  `?code=`, không báo lỗi. Lỗi ấy đã xảy ra thật: `?next=` luôn có mặt vì
 *  `safeNextPath(null)` trả "/dashboard", nên MỌI lần đăng nhập Google đều hỏng.
 *
 *  Bộ kiểm đọc mã nguồn: đây là một ràng buộc với cấu hình bên ngoài repo, thứ
 *  không chạy được trong test, nên chỗ duy nhất giữ được nó là hình dạng của
 *  chuỗi `redirectTo`. */

const loginSource = readFileSync(path.join(process.cwd(), "app/login/page.tsx"), "utf8");
const callbackSource = readFileSync(
  path.join(process.cwd(), "app/auth/callback/route.ts"),
  "utf8"
);

describe("redirectTo của OAuth", () => {
  it("không mang query nào", () => {
    const redirectTo = /redirectTo:\s*`([^`]+)`/.exec(loginSource);
    expect(redirectTo, "không tìm thấy redirectTo trong trang đăng nhập").not.toBeNull();
    const oauthTarget = [...loginSource.matchAll(/redirectTo:\s*`([^`]+)`/g)].map((m) => m[1]);
    const callbackTarget = oauthTarget.find((url) => url.includes("/auth/callback"));
    expect(callbackTarget, "không tìm thấy redirectTo trỏ tới /auth/callback").toBeTruthy();
    expect(
      callbackTarget,
      "một query ở đây làm URL trượt khỏi danh sách Redirect URLs và Supabase rơi về trang chủ"
    ).not.toContain("?");
  });

  it("đích đến đi bằng cookie, và cookie được đặt TRƯỚC khi rời trang", () => {
    const setCall = loginSource.indexOf("rememberOAuthNext(");
    const oauthCall = loginSource.indexOf("signInWithOAuth(");
    expect(setCall, "trang đăng nhập không đặt cookie đích đến").toBeGreaterThan(-1);
    expect(
      setCall,
      "signInWithOAuth điều hướng đi ngay, nên đặt cookie sau nó có thể không kịp chạy"
    ).toBeLessThan(oauthCall);
  });
});

describe("callback đọc đích đến", () => {
  it("ưu tiên cookie, vẫn nhận ?next= làm đường lui", () => {
    expect(callbackSource).toContain("OAUTH_NEXT_COOKIE");
    expect(callbackSource).toMatch(/searchParams\.get\("next"\)/);
  });

  it("lọc lại bằng safeNextPath dù đọc từ nguồn nào", () => {
    // Cả cookie lẫn query đều do trình duyệt gửi lên, nên không nguồn nào đáng
    // tin hơn nguồn nào - "//evil.com" đặt được vào cookie y như vào query.
    const resolver = /function resolveNext[\s\S]*?\n}/.exec(callbackSource)?.[0] ?? "";
    expect(resolver).toBeTruthy();
    expect((resolver.match(/safeNextPath\(/g) ?? []).length).toBeGreaterThanOrEqual(2);
  });

  it("dọn cookie trên cả nhánh thành công lẫn nhánh lỗi", () => {
    // Để lại thì lần đăng nhập bằng email sau đó thừa hưởng đích đến của lần
    // OAuth này.
    expect((callbackSource.match(/clearOAuthNextCookie\(\)/g) ?? []).length).toBe(2);
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
