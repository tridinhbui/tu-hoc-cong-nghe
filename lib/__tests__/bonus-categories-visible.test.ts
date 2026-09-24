import { describe, expect, it } from "vitest";
import {
  BONUS_CATEGORIES,
  BONUS_CATEGORY_FALLBACK,
  BONUS_CATEGORY_ORDER,
} from "@/lib/bonus-lesson-categories";
import { avatarOptionsVi, avatarOptionsEn } from "@/lib/i18n/dictionaries/sections/avatar-options";

/**
 * CHẾ ĐỘ HỎNG mà bộ kiểm này gác: một bài bổ trợ không hiện ra ở đâu cả.
 *
 * `DashboardClient` dựng các nhóm bằng cách duyệt `BONUS_CATEGORY_ORDER` rồi
 * lọc bài theo từng nhóm. Một nhóm có trong `BONUS_CATEGORIES` mà thiếu ở
 * `BONUS_CATEGORY_ORDER` thì mọi bài thuộc nhóm đó lọc ra rỗng và biến mất -
 * không lỗi biên dịch, không trang trắng, chỉ là một mục ngắn hơn nó đáng ra
 * phải có. Đã xảy ra thật: nhóm "Đo lường & vận hành hệ thống" được gán cho 20
 * bài trong đợt chuyển sang công nghệ và không ai thêm nó vào mảng thứ tự.
 *
 * Cùng hình dạng, chỗ thứ hai: nhãn hiển thị bị đem đi so với khoá. Bản cũ lấy
 * `t.dashboard.bonusOther` làm nhóm dự phòng, nên ở tiếng Anh nó là "Other"
 * còn khoá là "Khác" - 25 bài chưa gán nhóm biến mất, CHỈ ở tiếng Anh. Một lỗi
 * chỉ xuất hiện ở ngôn ngữ mà người sửa ít mở ra xem là lỗi sống lâu.
 */
describe("không nhóm bổ trợ nào tàng hình", () => {
  const nhomDungThat = [...new Set(Object.values(BONUS_CATEGORIES))];

  it("mọi nhóm đang được gán đều có mặt trong thứ tự hiển thị", () => {
    const thieu = nhomDungThat.filter((c) => !BONUS_CATEGORY_ORDER.includes(c));
    expect(
      thieu,
      `Nhóm này có bài nhưng không nằm trong BONUS_CATEGORY_ORDER, nên bài của ` +
        `nó không hiện ở đâu cả: ${thieu.join(", ")}`
    ).toEqual([]);
  });

  it("nhóm dự phòng nằm trong thứ tự hiển thị", () => {
    // Không có nó thì mọi bài CHƯA gán nhóm biến mất.
    expect(BONUS_CATEGORY_ORDER).toContain(BONUS_CATEGORY_FALLBACK);
  });

  it("mọi nhóm đều có nhãn ở cả hai ngôn ngữ", () => {
    // Thiếu nhãn không làm bài biến mất (giao diện lùi về chính chuỗi khoá),
    // nhưng người đọc tiếng Anh sẽ thấy một tiêu đề tiếng Việt giữa trang.
    for (const tuDien of [avatarOptionsVi, avatarOptionsEn]) {
      const thieu = BONUS_CATEGORY_ORDER.filter((c) => !tuDien.bonusCategories[c]);
      expect(thieu).toEqual([]);
    }
  });

  it("nhãn tiếng Anh không trùng nguyên văn nhãn tiếng Việt", () => {
    // Dán chuỗi tiếng Việt sang en.ts thì `tsc` vẫn xanh và người đọc tiếng
    // Anh nhận tiếng Việt - cùng cái bẫy mà dictionary-parity.test.ts gác.
    const chuaDich = BONUS_CATEGORY_ORDER.filter(
      (c) => avatarOptionsEn.bonusCategories[c] === avatarOptionsVi.bonusCategories[c]
    );
    expect(chuaDich).toEqual([]);
  });
});
