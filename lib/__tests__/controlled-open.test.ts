import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolveOpenChange } from "@/lib/controlled-open";

/** Lỗi này đã ship HAI LẦN trong cùng một repo, ở hai tệp viết rời nhau, nên
 *  bộ kiểm gác cả hai phía: phép tính (ở đây là thuần) và việc hai component
 *  thật sự dùng nó thay vì chép lại lần thứ ba. */

describe("resolveOpenChange", () => {
  it("đóng một panel ĐANG MỞ do cha điều khiển thì phải báo là có đổi", () => {
    // Đây chính là ca hỏng: trạng thái có hiệu lực là `true` (cha mở), người
    // dùng bấm X gọi `setOpen(false)`. Bản cũ so với state bên trong (`false`)
    // nên kết luận "không đổi" và không báo cho cha.
    expect(resolveOpenChange(true, false)).toEqual({ next: false, changed: true });
  });

  it("mở một panel đang đóng", () => {
    expect(resolveOpenChange(false, true)).toEqual({ next: true, changed: true });
  });

  it("đặt lại đúng giá trị đang có thì không báo đổi", () => {
    expect(resolveOpenChange(true, true)).toEqual({ next: true, changed: false });
    expect(resolveOpenChange(false, false)).toEqual({ next: false, changed: false });
  });

  it("dạng hàm nhận trạng thái CÓ HIỆU LỰC", () => {
    expect(resolveOpenChange(true, (prev) => !prev)).toEqual({ next: false, changed: true });
    expect(resolveOpenChange(false, (prev) => !prev)).toEqual({ next: true, changed: true });
  });

  it("dùng setter để ĐỌC trạng thái thì không được coi là đổi", () => {
    // FloatingStudyGroupChat đếm tin chưa đọc bằng `setOpen(cur => cur)`. Nếu
    // ca này báo `changed`, mỗi tin nhắn realtime thành một lần ghi state lên
    // cha và cả cây vẽ lại.
    expect(resolveOpenChange(true, (cur) => cur)).toEqual({ next: true, changed: false });
    expect(resolveOpenChange(false, (cur) => cur)).toEqual({ next: false, changed: false });
  });
});

describe("hai panel dùng chung phép tính này", () => {
  const FILES = [
    "components/FloatingStudyGroupChat.tsx",
    "components/ChatWithAdminWidget.tsx",
  ];

  for (const file of FILES) {
    it(`${file} không so sánh với state bên trong nữa`, () => {
      const src = readFileSync(file, "utf8");
      // Hình dạng cũ: `setInternal…((prev) => { … if (prev !== next) …`.
      // Nó chỉ đúng khi state bên trong LÀ sự thật, mà ở chế độ có điều khiển
      // thì không.
      expect(
        /setInternal\w*\(\s*\(\s*prev\s*\)\s*=>\s*\{[\s\S]{0,200}?prev\s*!==\s*next/.test(src),
        "so sánh với state bên trong: nút đóng sẽ không báo được cho cha"
      ).toBe(false);
    });
  }
});
