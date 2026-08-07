import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Một hook React trong server component: lỗi chỉ lộ ra khi mở trang thật.
//
// components/TopicMasteryWidget.tsx gọi useI18n() - hook đọc React Context -
// mà không có "use client". Nó throw ngay khi render, nên /cay-ky-nang không mở
// được: "An error occurred in the Server Components render", và production ẩn
// thông điệp nên console không nói gì hơn.
//
// KHÔNG CÓ GÌ BẮT ĐƯỢC NÓ. tsc không mô hình hoá ranh giới server/client, nên
// biên dịch sạch. `next build` không render trang đó vì nó là force-dynamic,
// nên build xanh. Test hiện có không render component. Nó lên live rồi mới lộ.
//
// Đây là phép kiểm TĨNH thay vì render thử, vì render một server component cần
// request context (cookies()) và phải mock next/headers - test đó kiểm cái mock
// nhiều hơn kiểm code. Đọc chỉ thị "use client" thì chính xác và không mock gì.

const ROOTS = ["components", "app"];
const SKIP = new Set(["node_modules", ".next", ".claude"]);

/** Hook React chỉ chạy được ở client. useI18n đọc Context nên cùng loại. */
const CLIENT_ONLY_HOOKS = [
  "useI18n",
  "useState",
  "useEffect",
  "useRef",
  "useContext",
  "useReducer",
  "useMemo",
  "useCallback",
  "useLayoutEffect",
];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (full.endsWith(".tsx")) out.push(full);
  }
  return out;
}

/** Bỏ comment đi, để một hook được NHẮC TỚI trong comment không bị tính.
 *  CfaNextLevels.tsx có đúng trường hợp đó: nó dùng getServerLocale() cho
 *  đúng, và chỉ nhắc "useI18n" trong một câu giải thích. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

describe("hook React trong server component", () => {
  const files = ROOTS.flatMap((r) => walk(r));

  it("có file để kiểm - nếu không, test này vô nghĩa", () => {
    expect(files.length).toBeGreaterThan(200);
  });

  it('không file nào thiếu "use client" mà vẫn gọi hook', () => {
    const offenders: string[] = [];
    for (const file of files) {
      const raw = readFileSync(file, "utf8");
      if (/^\s*["']use client["']/m.test(raw)) continue;
      const src = stripComments(raw);
      for (const hook of CLIENT_ONLY_HOOKS) {
        if (new RegExp(`\\b${hook}\\s*\\(`).test(src)) {
          offenders.push(`${file}: ${hook}()`);
          break;
        }
      }
    }
    expect(offenders, 'server component gọi hook - thêm "use client" hoặc dùng getServerDictionary()').toEqual([]);
  });
});
