import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

// Cổng mặc-định-từ-chối, dựng lại thành một bài test.
//
// `proxy.ts` từng gác toàn bộ ứng dụng: mọi đường dẫn cần phiên đăng nhập trừ
// danh sách trắng, nên một trang mới thêm vào là riêng tư NGAY, không phải chờ
// ai nhớ gắn phép kiểm. Chú thích trong tệp ấy ghi rõ vì sao nó ra đời: trước
// đó mỗi trang phải tự nhớ, và vài trang đã quên - /tai-lieu cùng mọi bài học
// đều kết xuất đầy đủ nội dung cho khách chưa đăng nhập.
//
// Proxy phải đi vì Next 16 chạy nó ở runtime Node và Workers chưa hỗ trợ. Cổng
// giờ nằm ở layout của từng nhánh, và tính chất mất đi khi làm vậy là đúng cái
// giá trị nhất: một route mới nằm ngoài mọi layout có cổng sẽ công khai trở
// lại, im lặng, đúng lỗi mà proxy sinh ra để chặn.
//
// Bài test này là thứ thay thế. Nó làm CI đỏ khi có route cấp một không nằm
// trong danh sách công khai cũng không được một layout nào gác. Thêm route mới
// thì phải chọn: gắn cổng, hoặc khai công khai ở đây có chủ ý.

const APP = join(process.cwd(), "app");

// Dịch một-đối-một từ PUBLIC_PATHS và PUBLIC_PREFIXES của proxy.ts cũ.
const PUBLIC = new Set([
  "login",              // Đăng nhập thì hiển nhiên phải vào được khi chưa đăng nhập.
  "dieu-khoan",
  "chinh-sach-bao-mat",
  "dev-world-preview",  // Tự 404 ở production; xem app/dev-world-preview/page.tsx.
]);

// Nhánh tự xác thực: mỗi route handler bên trong tự kiểm, và chuyển hướng một
// endpoint JSON sang trang HTML /login chỉ làm hỏng bên gọi bằng một phản hồi
// không phải JSON thay vì một 401 sạch sẽ.
const SELF_AUTHENTICATING = new Set(["api", "auth", "actions"]);

// Nhánh có cổng RIÊNG, không dùng lib/require-user.ts.
const OWN_GATE: Record<string, string> = {
  // getAdminSession() + redirect("/dashboard") trong app/admin/layout.tsx.
  admin: "getAdminSession",
};

// Nhóm route công khai có chủ ý trong bản Cloudflare/D1 hiện tại. Cổng
// Supabase ở app/(app)/layout.tsx đã bị gỡ vì build không còn được phụ thuộc
// NEXT_PUBLIC_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_ANON_KEY.
const PUBLIC_GROUPS = new Set(["(app)"]);

function segmentsOf(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((n) => !n.startsWith("_"));           // private folder, không thành route
}

/** Layout của nhánh này có gọi một cổng xác thực không. */
function gateIn(dir: string, marker: string): boolean {
  const layout = join(dir, "layout.tsx");
  if (!existsSync(layout)) return false;
  return readFileSync(layout, "utf8").includes(marker);
}

describe("mọi route đều được gác, hoặc công khai có chủ ý", () => {
  it("route cấp một nào cũng thuộc đúng một nhóm", () => {
    const ungated: string[] = [];

    for (const seg of segmentsOf(APP)) {
      if (seg.startsWith("(") && seg.endsWith(")")) {
        if (PUBLIC_GROUPS.has(seg)) continue;
        // Nhóm route: một cổng ở layout của nhóm phủ mọi route bên trong.
        if (!gateIn(join(APP, seg), "requireUser")) ungated.push(`${seg}/ (layout nhóm không có cổng)`);
        continue;
      }
      if (PUBLIC.has(seg) || SELF_AUTHENTICATING.has(seg)) continue;
      if (OWN_GATE[seg]) {
        if (!gateIn(join(APP, seg), OWN_GATE[seg])) ungated.push(`${seg} (mất cổng riêng ${OWN_GATE[seg]})`);
        continue;
      }
      if (gateIn(join(APP, seg), "requireUser")) continue;

      // Không có cổng ở cấp nhánh: mọi thư mục con phải tự có cổng. Đây là hình
      // dạng của /bai-hoc, nơi bốn bài xem thử phải mở cho khách nên cổng buộc
      // phải nằm sâu hơn một cấp và có điều kiện theo slug.
      const children = segmentsOf(join(APP, seg));
      if (!children.length) { ungated.push(seg); continue; }
      for (const child of children)
        if (!gateIn(join(APP, seg, child), "requireUser")) ungated.push(`${seg}/${child}`);
    }

    expect(ungated).toEqual([]);
  });

  it("proxy.ts không quay lại - Workers không nạp được nó", () => {
    // Nếu tệp này xuất hiện lại thì `opennextjs-cloudflare build` sẽ hỏng với
    // "Node.js middleware is not currently supported", và nó sẽ hỏng SAU khi
    // build Next chạy xong - tức mất vài phút mới thấy. Bắt ở đây rẻ hơn.
    expect(existsSync(join(process.cwd(), "proxy.ts"))).toBe(false);
    expect(existsSync(join(process.cwd(), "middleware.ts"))).toBe(false);
  });
});
