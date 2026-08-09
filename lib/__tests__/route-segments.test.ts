import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
// Không còn @ts-expect-error ở đây: tsc giờ tự suy được kiểu của module
// .mjs này, nên chỉ thị ấy thành thừa - và một expect-error không bắt được
// lỗi nào thì chính nó là lỗi (TS2578), làm đỏ cả cây build.
import { collectRouteSegments } from "../../scripts/build-route-segments.mjs";

// lib/route-segments.json quyết định proxy trả 404 hay đá về /login. Nó lệch
// khỏi thư mục app/ thì hỏng im lặng theo đúng hai chiều:
//
//   - thiếu một route CÓ THẬT  -> khách vào trang riêng tư thấy 404 thay vì
//     được mời đăng nhập, tức mất luôn đường vào trang đó;
//   - thừa một route ĐÃ XOÁ    -> quay lại đúng hành vi cũ, đá về /login rồi
//     đăng nhập xong mới thấy 404.
//
// Nên bài test này sinh lại từ hệ tệp và so, chứ không đọc thuộc danh sách.
// Một bảng gõ tay trong proxy.ts đã lệch 767 commit mà không ai thấy.
describe("lib/route-segments.json", () => {
  it("khớp với các đoạn cấp một đang có trong app/", () => {
    const generated = collectRouteSegments("app") as string[];
    const committed = JSON.parse(
      readFileSync("lib/route-segments.json", "utf8")
    ) as string[];

    expect(committed).toEqual(generated);
  });

  it("có các route quan trọng nhất, để một lần sinh rỗng không lọt qua", () => {
    const committed = JSON.parse(
      readFileSync("lib/route-segments.json", "utf8")
    ) as string[];

    for (const segment of ["login", "dashboard", "bai-hoc", "api", "auth"]) {
      expect(committed).toContain(segment);
    }
  });
});
