import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/** Lớp vỏ của mọi trang sau khi đăng nhập.
 *
 *  app/(app)/layout.tsx là chỗ DUY NHẤT render AppNavbar. Không trang nào trong
 *  nhóm (app) tự dựng navbar của riêng nó - ba chỗ còn nhắc tên AppNavbar trong
 *  app/ đều chỉ là chú thích tính chiều cao. Nên gỡ nó khỏi tệp này là gỡ khỏi
 *  toàn bộ ứng dụng, trên mọi khổ màn hình cùng lúc.
 *
 *  Đã xảy ra thật, ở 1ac5092. Commit ấy nhắm vào useRoutePrefetch - navbar nạp
 *  trước 19 tuyến, mỗi tuyến một lần dựng RSC, khoảng 31 lần dựng cho MỖI lượt
 *  xem một trang - nhưng nhát cắt đi quá tay và mang theo cả lớp vỏ. Chính
 *  commit đó THÊM /bxh vào navbar, nên chủ đích là giữ, không phải bỏ.
 *
 *  Không cổng nào thấy: tsc vẫn xanh vì một layout trả về <div>{children}</div>
 *  là hợp lệ hoàn hảo, và không bộ kiểm nào dựng nhóm (app) lên. Triệu chứng chỉ
 *  hiện ra khi có người mở app bằng mắt.
 *
 *  Hai lớp CSS trên vỏ cũng nằm trong cổng này, vì chúng mất cùng lúc và đó là
 *  phần "vỡ responsive" của cùng một lỗi:
 *
 *    lg:pl-64         chừa chỗ cho thanh bên cố định (w-64) ở màn hình lớn.
 *                     Thiếu nó thì nội dung chui xuống dưới thanh bên.
 *    overflow-x-hidden chặn cuộn ngang trên mobile. Thiếu nó thì bất kỳ phần tử
 *                     nào tràn mép cũng kéo cả trang trượt ngang.
 */

const repoRoot = path.resolve(__dirname, "..", "..");
const layoutPath = path.join(repoRoot, "app", "(app)", "layout.tsx");
const source = readFileSync(layoutPath, "utf8");

describe("lớp vỏ (app)", () => {
  it("render AppNavbar", () => {
    expect(source).toContain('from "@/components/AppNavbar"');
    expect(
      /<AppNavbar\s*\/>/.test(source),
      "app/(app)/layout.tsx phải render <AppNavbar />; đây là chỗ duy nhất trong app dựng nó"
    ).toBe(true);
  });

  it("giữ chỗ cho thanh bên trên màn hình lớn và chặn cuộn ngang trên mobile", () => {
    expect(source, "thiếu lg:pl-64 - nội dung sẽ nằm dưới thanh bên w-64").toContain("lg:pl-64");
    expect(source, "thiếu overflow-x-hidden - trang sẽ trượt ngang trên mobile").toContain(
      "overflow-x-hidden"
    );
  });

  it("không trang nào trong (app) tự render navbar của riêng nó", () => {
    // Nếu điều này đổi, giả định của bộ kiểm trên - "chỗ duy nhất" - không còn
    // đúng, và cổng này đang canh sai tệp.
    const { execSync } = require("node:child_process") as typeof import("node:child_process");
    const hits = execSync(
      `grep -rl "<AppNavbar" --include="*.tsx" app/ || true`,
      { cwd: repoRoot, encoding: "utf8" }
    )
      .split("\n")
      .filter(Boolean);
    expect(hits).toEqual(["app/(app)/layout.tsx"]);
  });
});
