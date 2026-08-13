import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import path from "path";

/** Hai thói quen viết làm giao diện đọc ra như máy sinh, và cả hai đo được.
 *
 *  Người đọc bài đánh giá công khai nói "nhìn qua là biết vibecode" mà không
 *  chỉ được ra chỗ nào. Đây là hai chỗ đo được trong số đó.
 *
 *  1. HÌNH TƯỢNG ĐỨNG ĐẦU CHUỖI. `"🚀 Bắt đầu kiểm tra"` - hình vẽ dán trước
 *     câu chữ để cho có sinh khí. Sản phẩm thật dùng component icon: cùng kích
 *     thước, cùng màu, canh được theo dòng chữ. Emoji trong chuỗi thì mỗi hệ
 *     điều hành vẽ một kiểu, không đổi màu theo theme, và không canh được.
 *
 *     Chỉ gác vị trí ĐẦU chuỗi. Hình tượng giữa câu thường TRỎ tới một thứ có
 *     thật trên màn hình - "giải tỏa biểu tượng cảnh báo 🔴 trên Navbar",
 *     "Bấm nút Thả tim ❤️" - nên cấm luôn là làm câu mất nghĩa.
 *
 *  2. TITLE CASE TIẾNG ANH ÁP VÀO TIẾNG VIỆT. `"Bản Đồ Sự Nghiệp Tài Chính"`.
 *     Tiếng Việt không viết hoa từng từ; đó là thói quen tiếng Anh đi thẳng
 *     vào bản dịch. Người Việt đọc thấy ngay dù không gọi tên được.
 *
 *     Ngưỡng là BA từ hoa liên tiếp, không phải hai: hai từ hoa cạnh nhau
 *     thường là danh từ riêng ("Phố Wall", "Times Square"), ba trở lên mới là
 *     Title Case. Và trần đặt ở mức kho HIỆN ĐẠT chứ không phải 0 - 43 chuỗi
 *     còn lại phần lớn là tên sản phẩm ("Tự Học Tài Chính") hoặc câu dài có
 *     danh từ riêng nằm cạnh nhau, tức là dương tính giả. Một cổng kêu oan là
 *     một cổng người ta học cách phớt lờ.
 */

const PICTOGRAPH = /\p{Extended_Pictographic}/u;
/** Không phải hình trang trí: bản quyền là văn bản pháp lý. */
const NOT_DECORATION = new Set(["©", "®", "™", "‼", "⁉"]);

function displayStrings(locale: "vi" | "en"): string[] {
  const source = readFileSync(
    path.join(process.cwd(), `lib/i18n/dictionaries/${locale}.ts`),
    "utf8"
  );
  // Bắt cả `key: "value",` lẫn dòng chỉ có mỗi chuỗi - chuỗi dài bị xuống
  // dòng thì `key:` nằm ở dòng trên, và lượt quét đầu tiên đã sót đúng bốn
  // chuỗi vì chỉ khớp dạng một dòng.
  return [...source.matchAll(/^\s*(?:[A-Za-z0-9_]+:\s*)?"((?:[^"\\]|\\.)*)",?\s*$/gm)].map(
    (m) => m[1]
  );
}

function leadsWithPictograph(value: string): boolean {
  const first = [...value][0];
  if (!first || NOT_DECORATION.has(first)) return false;
  return PICTOGRAPH.test(first);
}

function longestCapitalisedRun(value: string): number {
  let run = 0;
  let best = 0;
  for (const word of value.split(/\s+/)) {
    if (/^[A-ZÀ-Ỹ][a-zà-ỹ]+$/.test(word)) {
      run += 1;
      best = Math.max(best, run);
    } else {
      run = 0;
    }
  }
  return best;
}

describe("chữ trong giao diện không mở đầu bằng hình tượng", () => {
  for (const locale of ["vi", "en"] as const) {
    it(`${locale}.ts`, () => {
      const offenders = displayStrings(locale).filter(leadsWithPictograph);
      expect(
        offenders,
        "dán emoji trước câu là trang trí, không phải icon - dùng component icon"
      ).toEqual([]);
    });
  }
});

describe("tiếng Việt không viết Title Case kiểu tiếng Anh", () => {
  // Mức kho đạt được sau lượt dọn. Hạ xuống sau mỗi đợt viết lại; đừng nâng
  // lên để một build đỏ thành xanh.
  const MAX_TITLE_CASE = 43;

  it("số chuỗi có từ ba từ viết hoa liên tiếp không vượt trần", () => {
    const offenders = displayStrings("vi").filter((v) => longestCapitalisedRun(v) >= 3);
    expect(
      offenders.length,
      `Title Case tiếng Anh trong bản tiếng Việt:\n  ${offenders.slice(0, 15).join("\n  ")}`
    ).toBeLessThanOrEqual(MAX_TITLE_CASE);
  });
});
