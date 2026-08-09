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

  /** Thanh bên cao đúng một viewport, và chỉ RUỘT nó cuộn.
   *
   *  Bản trước đặt `overflow-y-auto` lên cả cột trong `<aside>`. Khi danh sách
   *  mục dài hơn màn hình - hiện tại là 13 mục cộng ba nhóm gập lại - thì logo và
   *  ô tìm kiếm cuộn mất theo, còn thẻ người dùng ở đáy chỉ tới được sau khi cuộn
   *  hết. Hai thứ đáng lẽ luôn thấy lại là hai thứ trôi đi đầu tiên.
   *
   *  Ba lớp dưới đây là cơ chế, không phải trang trí:
   *    min-h-0 trên cột  - flex item mặc định `min-height: auto`, nên không có nó
   *                        thì vùng giữa nở ra bằng nội dung và đẩy cả cột cao
   *                        hơn viewport thay vì tự cuộn. Đây là lớp dễ bị gỡ
   *                        nhất vì trông như không làm gì.
   *    flex-1 min-h-0 trên <nav> - vùng cuộn thật.
   *    shrink-0 ở đầu và đáy     - hai vùng luôn đứng yên.
   */
  it("thanh bên: cột không cuộn, chỉ <nav> ở giữa cuộn", () => {
    const navbar = readFileSync(path.join(repoRoot, "components/AppNavbar.tsx"), "utf8");
    const aside = navbar.slice(navbar.indexOf("<aside"), navbar.indexOf("</aside>"));

    // `inset-y-0` trên <aside> là thứ khoá chiều cao vào đúng một viewport.
    expect(aside, "thanh bên phải cao đúng một viewport").toContain("inset-y-0");

    // Tìm <nav> SAU thẻ div, không phải lần xuất hiện đầu tiên trong cả khối:
    // chú thích trong AppNavbar có nhắc chữ "<nav>", và bản đầu của phép kiểm này
    // bắt được đúng chữ đó nên slice ra rỗng và đỏ vì lỗi của chính nó.
    const colStart = aside.indexOf('<div className="flex h-full');
    const navStart = aside.indexOf("<nav", colStart);
    expect(colStart, "không tìm được cột trong <aside>").toBeGreaterThan(-1);
    expect(navStart, "không tìm được <nav> sau cột").toBeGreaterThan(-1);
    const column = aside.slice(colStart, navStart);
    expect(column, "cột ngoài không được cuộn - chỉ ruột mới cuộn").not.toContain("overflow-y-auto");
    expect(column, "cột ngoài thiếu min-h-0, vùng giữa sẽ nở ra thay vì cuộn").toContain("min-h-0");

    const navTag = aside.slice(navStart, aside.indexOf(">", navStart));
    expect(navTag, "<nav> phải là vùng cuộn").toContain("overflow-y-auto");
    expect(navTag, "<nav> thiếu flex-1: nó sẽ không chiếm phần cao còn lại").toContain("flex-1");
    expect(navTag, "<nav> thiếu min-h-0: nó sẽ nở ra bằng nội dung").toContain("min-h-0");
  });
});
