import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/** `coins` chỉ được đổi qua hàm ở server. Cổng này giữ điều đó.
 *
 *  VÌ SAO CẦN. Trước 20260914, `coins` là một cột thường trên user_profiles và
 *  policy cho phép người dùng cập nhật hồ sơ của chính mình - nên mở console
 *  lên là đặt được số dư tuỳ ý. Ba đường cấp coin từ client còn để chính trình
 *  duyệt quyết SỐ TIỀN: vòng quay gửi lên giải nó tự bốc, bản đồ cộng thẳng +5,
 *  game cộng số điểm nó tự báo.
 *
 *  Trigger `guard_coins_column` khoá cột lại, nhưng nó khoá theo cách IM LẶNG -
 *  đặt lại giá trị cũ thay vì ném lỗi, vì PostgREST gửi cả object nên một lượt
 *  cập nhật hồ sơ hợp lệ cũng có thể mang theo `coins` mà không định đổi nó.
 *
 *  Hệ quả: ai đó viết lại một câu `update({ coins })` từ client sẽ thấy nó chạy
 *  "thành công" và không có gì đỏ ở đâu cả. Tiền chỉ đơn giản không đổi, và
 *  triệu chứng xuất hiện ở một màn hình khác, muộn hơn. Đó chính là kiểu hỏng
 *  mà cổng tĩnh này bắt được còn kiểm thử chạy thì không. */

const root = join(__dirname, "..", "..");

/** route này chạy bằng service role và số tiền do server quyết; trigger cố ý
 *  không chặn vai trò ấy. Xem chú thích trong 20260914. */
const ALLOWED = new Set([
  // Ba route chạy ở server và SỐ TIỀN do server quyết. Chúng ghi bằng service
  // role, vai trò mà trigger cố ý miễn trừ - xem chú thích trong 20260914.
  // Điều kiện để có mặt ở đây là cả hai: chạy ở server, VÀ không nhận số tiền
  // từ thân request.
  "app/api/pvp/route.ts",
  "app/api/weekly-challenge/route.ts",
  "app/api/world-boss/route.ts",
]);

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(join(root, dir))) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const rel = `${dir}/${entry}`;
    if (statSync(join(root, rel)).isDirectory()) walk(rel, out);
    else if (/\.(ts|tsx)$/.test(entry)) out.push(rel);
  }
  return out;
}

describe("đường ghi coins", () => {
  const files = [...walk("components"), ...walk("app"), ...walk("lib")].filter(
    (f) => !f.includes("__tests__"),
  );

  it("không tệp nào ghi thẳng cột coins ngoài route dùng service role", () => {
    const offenders: string[] = [];
    for (const rel of files) {
      if (ALLOWED.has(rel)) continue;
      const src = readFileSync(join(root, rel), "utf8");
      // `.update(...)` có chứa khoá `coins`. Cố ý hẹp: chỉ bắt lượt GHI, nên
      // `.select("coins")` và mọi chỗ đọc số dư để hiển thị đều đi qua.
      for (const m of src.matchAll(/\.update\(\s*\{[^}]*\bcoins\b[^}]*\}/g)) {
        offenders.push(`${rel}: ${m[0].slice(0, 60).replace(/\s+/g, " ")}`);
      }
    }
    expect(offenders, "dùng rpc('grant_coins') hoặc rpc('purchase_cosmetic')").toEqual([]);
  });

  it("các nguồn cấp coin đều gọi grant_coins với đúng tên nguồn", () => {
    // Tên nguồn phải khớp mệnh đề CASE trong grant_coins; sai một chữ thì hàm
    // ném 'Nguồn không hợp lệ' và người chơi mất phần thưởng.
    const expected: Array<[string, string]> = [
      ["components/TechRpgWorldMap.tsx", "building"],
      ["components/DashboardClient.tsx", "game"],
      ["components/WeeklyChallengeWidget.tsx", "challenge"],
    ];
    for (const [file, source] of expected) {
      const src = readFileSync(join(root, file), "utf8");
      expect(src, file).toContain("grant_coins");
      expect(src, `${file} thiếu nguồn "${source}"`).toContain(`p_source: "${source}"`);
    }
  });

  it("D1 khoá cột coins ở tầng truy vấn, thay trigger guard_coins_column của Postgres", () => {
    // Trigger Postgres cũ (20260914_lock_coins_column.sql) gắn theo VAI TRÒ,
    // thứ D1 không có. Thay thế là PROTECTED_COLUMNS trong query-builder: mọi
    // actor không phải ADMIN_BYPASS ghi vào đây thì bị chặn cứng. Bài kiểm
    // hành vi nằm ở lib/d1/__tests__/query-builder.test.ts; ở đây chỉ giữ
    // cho danh sách không bị ai rút mất coins.
    const src = readFileSync(join(root, "lib/d1/query-builder.ts"), "utf8");
    const list = /PROTECTED_COLUMNS[^=]*=\s*\{([\s\S]*?)\};/.exec(src)?.[1] ?? "";
    expect(list).toMatch(/user_profiles:\s*\[[^\]]*"coins"/);
    // Bốn route được phép ghi coins phải ghi bằng client bỏ qua chính sách -
    // client theo phiên sẽ bị cổng cột chặn.
    for (const rel of ALLOWED) {
      expect(readFileSync(join(root, rel), "utf8"), rel).toMatch(/createAdminClient|getSystemDb|requireAdminDb/);
    }
  });
});
