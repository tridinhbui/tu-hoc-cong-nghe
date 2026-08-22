import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { gatesOf } from "@/components/lobby/gates";
import { getDictionary } from "@/lib/i18n";

/** Mỗi chỉ số cứng vào `gatesOf(...)` phải trỏ vào một cổng có thật.
 *
 *  Bài này ra đời từ một sự cố thật, và điều đáng ghi là nó KHÔNG bị bắt bởi
 *  bất cứ thứ gì đang có. `components/lobby/RoomFixtures.tsx` dựng hai cánh
 *  cổng bằng `gatesOf(t)[0]` và `gatesOf(t)[1]`. Khi cổng sang Phố nghề bị gỡ
 *  cùng route /pho-nghe, danh sách rút còn một phần tử - và:
 *
 *    - `tsc` vẫn xanh, vì truy cập mảng theo chỉ số trong TypeScript trả về
 *      `GateTarget` chứ không phải `GateTarget | undefined` (không bật
 *      `noUncheckedIndexedAccess`).
 *    - Cả 1.326 bộ kiểm vẫn xanh, vì không cái nào dựng cảnh 3D.
 *    - `next build` vẫn xanh, vì lỗi chỉ xảy ra lúc chạy trong trình duyệt.
 *
 *  Kết quả là /cong-dong nổ với "Cannot read properties of undefined (reading
 *  'accent')" và chỉ có người mở trang mới thấy. Một cảnh three.js là vùng mà
 *  các cổng tĩnh với tới rất ít, nên chỗ nào còn chỉ số cứng vào một danh sách
 *  có thể ngắn đi thì chỗ đó phải có người canh.
 *
 *  Bài đọc MÃ NGUỒN chứ không import component: RoomFixtures là client
 *  component kéo theo three.js, và thứ cần khoá ở đây là con số trong ngoặc
 *  vuông chứ không phải hành vi render. */

const LOBBY_DIR = "components/lobby";

/** Bỏ chú thích trước khi quét.
 *
 *  Bản đầu của bài này quét thẳng mã nguồn và đỏ ngay - vì chính chú thích
 *  trong RoomFixtures.tsx nhắc lại chuỗi `gatesOf(t)[1]` để kể lại sự cố. Một
 *  cổng bắt được câu văn giải thích lỗi thay vì bắt lỗi là cổng người ta học
 *  cách bỏ qua, nên phần văn bản phải bị loại trước khi so khớp. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

function lobbySources(): { file: string; src: string }[] {
  const out: { file: string; src: string }[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.tsx?$/.test(name)) out.push({ file: full, src: stripComments(readFileSync(full, "utf8")) });
    }
  };
  walk(LOBBY_DIR);
  return out;
}

describe("chỉ số cứng vào danh sách cổng", () => {
  it("mọi gatesOf(...)[N] đều trỏ vào một cổng có thật", () => {
    // Số cổng không phụ thuộc ngôn ngữ - từ điển chỉ đắp nhãn lên - nhưng vẫn
    // kiểm cả hai, vì một lần rẽ nhánh theo locale lọt vào đây sẽ rất khó thấy.
    const counts = (["vi", "en"] as const).map((locale) => gatesOf(getDictionary(locale)).length);
    expect(new Set(counts).size, "số cổng lệch giữa hai ngôn ngữ").toBe(1);
    const gateCount = counts[0];
    expect(gateCount, "không đọc được cổng nào - gatesOf hỏng?").toBeGreaterThan(0);

    const outOfRange: string[] = [];
    for (const { file, src } of lobbySources()) {
      for (const m of src.matchAll(/gatesOf\([^)]*\)\s*\[\s*(\d+)\s*\]/g)) {
        const idx = Number(m[1]);
        if (idx >= gateCount) outOfRange.push(`${file}: gatesOf(...)[${idx}] nhưng chỉ có ${gateCount} cổng`);
      }
    }
    expect(outOfRange, "chỉ số trỏ ra ngoài danh sách cổng").toEqual([]);
  });

  it("mỗi cổng đều có accent, vì Gate đọc thẳng target.accent", () => {
    // Đây chính là thuộc tính đã ném lỗi. Một cổng thiếu accent sẽ hỏng theo
    // đúng cách ấy, chỉ khác là hỏng cho mọi người thay vì cho một chỉ số.
    for (const gate of gatesOf(getDictionary("vi"))) {
      expect(gate.accent, `cổng ${gate.id} thiếu accent`).toMatch(/^#[0-9a-fA-F]{3,8}$/);
      expect(gate.href, `cổng ${gate.id} thiếu href`).toMatch(/^\//);
    }
  });
});
