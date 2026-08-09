import { describe, expect, it } from "vitest";
import { getDictionary } from "@/lib/i18n";
import {
  SKIN_TONES,
  HAIR_COLORS,
  OUTFIT_COLORS,
  HAIR_STYLES,
  FACE_SHAPES,
  EYE_EXPRESSIONS,
  GLASSES_OPTIONS,
  BEARD_OPTIONS,
  OUTFIT_STYLES,
  ACCESSORIES_OPTIONS,
  BACKGROUND_OPTIONS,
} from "@/lib/avatar-customizer-types";

/** Lớp phủ nhãn của trình tuỳ biến avatar.
 *
 *  VÌ SAO CÓ TỆP NÀY. Khối `i18n-ignore` trong lib/avatar-customizer-types.ts
 *  khai rằng "mọi `label` đã có lớp phủ, khoá theo `id`". Lời khai đó sai suốt
 *  từ lúc được viết, và không có gì bắt được:
 *
 *  - Lớp phủ có ĐÚNG 71 khoá cho 71 lựa chọn, nên đếm số thì thấy đủ.
 *  - Nhưng khoá được BỊA ra từ nhãn chứ không chép từ `id`: "Đen Tuyền" thành
 *    `jet-black` trong khi `id` thật là `black`. 28 `id` không có khoá, 30 khoá
 *    không khớp `id` nào.
 *  - Nơi dựng viết `t.avatarOptions[x.id] ?? x.label`, nên khoá trượt rơi lặng
 *    lẽ về nhãn tiếng Việt. Không lỗi biên dịch, không cảnh báo.
 *  - Bốn nhóm (tóc, ánh mắt, kính, râu) thậm chí không tra lớp phủ lần nào.
 *
 *  Nên bộ kiểm này gác HAI CHIỀU. Chỉ kiểm "mọi id đều có khoá" thì một lớp
 *  phủ đầy khoá chết vẫn xanh, mà khoá chết chính là dấu vết của việc gõ tay
 *  một danh sách id thay vì đọc nó từ nguồn.
 *
 *  KHOÁ THEO NHÓM, không phẳng. Ba nhóm cùng có `id: "none"` (không kính,
 *  không râu, không phụ kiện) với ba nhãn khác nhau; một Record phẳng chỉ giữ
 *  được một. Bản lớp phủ đầu tiên né bằng cách đặt `no-glasses`/`no-accessory`
 *  - tức là đổi `id` cho vừa cấu trúc, và `id` ở đây được GHI XUỐNG cấu hình
 *  avatar của người dùng nên nó là thứ không được phép đổi.
 */

const GROUPS = [
  ["skinTones", SKIN_TONES],
  ["hairColors", HAIR_COLORS],
  ["outfitColors", OUTFIT_COLORS],
  ["hairStyles", HAIR_STYLES],
  ["faceShapes", FACE_SHAPES],
  ["eyeExpressions", EYE_EXPRESSIONS],
  ["glasses", GLASSES_OPTIONS],
  ["beards", BEARD_OPTIONS],
  ["outfitStyles", OUTFIT_STYLES],
  ["accessories", ACCESSORIES_OPTIONS],
  ["backgrounds", BACKGROUND_OPTIONS],
] as const;

const LOCALES = ["vi", "en"] as const;

describe("lớp phủ nhãn avatar phủ đúng danh sách lựa chọn", () => {
  for (const locale of LOCALES) {
    const overlay = getDictionary(locale).avatarOptions;

    for (const [group, options] of GROUPS) {
      it(`${locale}/${group}: mọi id đều có khoá`, () => {
        const table = overlay[group];
        const missing = options.filter((o) => !table[o.id]).map((o) => o.id);
        expect(missing).toEqual([]);
      });

      it(`${locale}/${group}: không có khoá thừa`, () => {
        const ids = new Set(options.map((o) => o.id));
        const dead = Object.keys(overlay[group]).filter((k) => !ids.has(k));
        expect(dead).toEqual([]);
      });
    }
  }

  it("bản Anh không còn chữ tiếng Việt", () => {
    // Cùng lý do như dictionary-parity.test.ts: `tsc` chứng minh khoá TỒN TẠI,
    // không chứng minh nó đã được dịch. Dán nguyên nhãn tiếng Việt sang vẫn
    // biên dịch được.
    const en = getDictionary("en").avatarOptions;
    const viet = /[àáảãạăâằắẳẵặầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
    const leaked: string[] = [];
    for (const [group] of GROUPS) {
      for (const [id, value] of Object.entries(en[group])) {
        if (viet.test(value)) leaked.push(`${group}.${id} = "${value}"`);
      }
    }
    expect(leaked).toEqual([]);
  });

  it("ba nhóm dùng chung id \"none\" và giữ được ba nhãn khác nhau", () => {
    // Đây là ràng buộc đã ép cấu trúc phải theo nhóm. Nếu ai đó gộp lại thành
    // một Record phẳng, phép so sánh này đỏ ngay.
    const vi = getDictionary("vi").avatarOptions;
    const labels = [vi.glasses.none, vi.beards.none, vi.accessories.none];
    expect(new Set(labels).size).toBe(3);
  });
});
