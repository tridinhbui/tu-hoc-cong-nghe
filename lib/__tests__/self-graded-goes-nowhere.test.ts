import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/** Điểm người học TỰ CHO MÌNH không được chảy vào bất kỳ con số nào.
 *
 *  lib/cfa-essays.ts nói rõ điều này ở đầu file: "Điểm tự chấm không đi đâu cả:
 *  không lưu, không vào XP, không vào `avg_quiz_score`. Một con số do chính
 *  người học tự cho mình mà lại chảy vào phần trăm năng lực ở /su-nghiep thì
 *  còn tệ hơn là không có gì."
 *
 *  Lý do bài test này tồn tại: cho tới nay câu đó chỉ là một chú thích. Nó đúng
 *  hôm nay - CfaEssayPractice chỉ import React, dữ liệu đề và i18n - nhưng
 *  không có gì ngăn một thay đổi sau này nối nó vào Supabase, và người viết
 *  thay đổi đó không có lý do gì để mở lib/cfa-essays.ts ra đọc.
 *
 *  Repo này vừa gặp đúng hình dạng ấy ở chỗ khác: chú thích đầu
 *  scripts/audit-ib-option-length.mjs khẳng định "the guard in
 *  lib/__tests__/ib-question-bank.test.ts enforces the ceiling" trong khi không
 *  có trần nào ở đó. Một lời hứa trong chú thích không phải một cổng.
 *
 *  Cách kiểm: đọc mã nguồn màn hình luyện tập và tìm những cách ghi ra ngoài.
 *  Kiểm bằng cách đọc file chứ không bằng cách dựng component, vì thứ cần chặn
 *  là sự TỒN TẠI của một đường ghi, không phải việc nó có chạy trong một lần
 *  render cụ thể hay không - cùng kiểu với lib/__tests__/world-cost.test.ts. */

/** Mỗi mục là một cách đưa số ra khỏi trình duyệt. Danh sách hẹp có chủ ý: nó
 *  chỉ nêu đích danh các đường ghi, nên thêm một icon hay một hook giao diện
 *  không làm bài này đỏ. */
const PERSISTENCE_MARKERS = [
  { pattern: /@\/lib\/supabase/, why: "import Supabase" },
  { pattern: /createClient\s*\(/, whyKey: "createClient()" },
  { pattern: /\bfetch\s*\(/, whyKey: "fetch() tới một API route" },
  { pattern: /\.upsert\s*\(|\.insert\s*\(|\.update\s*\(/, whyKey: "ghi thẳng vào bảng" },
  { pattern: /recalculateUserStats|awardXp|updateStreak|markCfa/, whyKey: "gọi hàm cộng điểm" },
].map((m) => ({ pattern: m.pattern, why: m.why ?? m.whyKey! }));

/** Hai màn hình luyện tập mà người học tự chấm cho mình.
 *
 *  Câu tự luận là trường hợp có chủ ý ghi thành văn. Item set đi kèm vì nó cùng
 *  hình dạng - tự chấm, không có máy chấm phía sau - và nếu sau này nó ĐƯỢC
 *  quyết định cho ghi điểm thì đó phải là một quyết định có người nhìn thấy,
 *  chứ không phải một dòng import thêm vào lúc nào không rõ. */
const SELF_GRADED_SCREENS = [
  "components/CfaEssayPractice.tsx",
  "components/CfaItemSetPractice.tsx",
];

describe("điểm tự chấm không rời khỏi trình duyệt", () => {
  for (const file of SELF_GRADED_SCREENS) {
    it(`${file} không có đường ghi nào`, () => {
      const source = readFileSync(file, "utf8");
      const found = PERSISTENCE_MARKERS.filter((m) => m.pattern.test(source)).map((m) => m.why);
      expect(
        found,
        `${file} vừa có đường ghi (${found.join(", ")}). Điểm do người học tự cho ` +
          `mình mà chảy vào avg_quiz_score, XP hay phần trăm năng lực ở /su-nghiep ` +
          `thì còn tệ hơn là không có gì - xem chú thích đầu lib/cfa-essays.ts. ` +
          `Nếu đây là quyết định có chủ ý thì sửa cả chú thích đó lẫn bài test này.`
      ).toEqual([]);
    });
  }

  it("bắt được một đường ghi nếu có ai thêm vào", () => {
    // Chứng minh phép kiểm không phải một bài luôn xanh: cùng bộ dấu hiệu đó,
    // chạy trên một màn hình CÓ ghi điểm thật, phải tìm ra thứ gì đó.
    const scoring = readFileSync("components/CfaModulePageClient.tsx", "utf8");
    const found = PERSISTENCE_MARKERS.filter((m) => m.pattern.test(scoring));
    expect(found.length).toBeGreaterThan(0);
  });
});
