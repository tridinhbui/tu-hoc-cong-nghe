import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import path from "path";

/** Chặn việc dựng số liệu người dùng rồi hiển thị như thật.
 *
 *  Widget "Đang online" trên dashboard từng hiện một con số sinh bằng hàm sin
 *  theo giờ trong ngày, dao động 50-150, kèm chấm xanh nhấp nháy. Nó ổn định,
 *  có nhịp ngày đêm, và không liên quan tới một người dùng nào. Mã nguồn ghi
 *  chú rất thành thật rằng đó là số dựng - nhưng ghi chú thì lập trình viên
 *  đọc, còn người dùng chỉ đọc "137 người đang học cùng lúc" rồi tin.
 *
 *  Cùng họ với `cfa-claims.test.ts`: cả hai chặn thứ không bao giờ tự lộ ra -
 *  không lỗi biên dịch, không test đỏ, chỉ có người dùng bị nói sai.
 *
 *  Quét mã nguồn thay vì kiểm một hàm cụ thể, vì cái cần chặn là một CÁCH LÀM
 *  chứ không phải một hàm. */

const ROOTS = ["components", "app", "lib"];

/** Những mẫu chỉ xuất hiện khi ai đó đang bịa ra một con số để hiển thị. */
const FABRICATION = [
  /simulatedOnline/i,
  /\bfakeUserCount\b/i,
  /\bmockOnline/i,
  // Sàn hiển thị: "hiện ít nhất N người" là cách nói khác của bịa.
  /Math\.max\(\s*\w*[Cc]ount\w*\s*,\s*\d{2,}\s*\)/,
];

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name.startsWith(".")) continue;
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(ts|tsx)$/.test(full) && !full.includes("__tests__")) out.push(full);
  }
  return out;
}

describe("không dựng số liệu người dùng", () => {
  const files = ROOTS.flatMap((r) => {
    try {
      return walk(r);
    } catch {
      return [];
    }
  });

  it("quét được mã nguồn", () => {
    expect(files.length).toBeGreaterThan(50);
  });

  it("không file nào sinh số người dùng giả để hiển thị", () => {
    const hits: string[] = [];
    for (const f of files) {
      const src = readFileSync(f, "utf8")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/^\s*\/\/.*$/gm, "");
      for (const rx of FABRICATION) {
        if (rx.test(src)) hits.push(`${f} khớp ${rx}`);
      }
    }
    expect(hits).toEqual([]);
  });

  it("widget đang online đọc từ presence thật, không từ đồng hồ", () => {
    const src = readFileSync("components/OnlineUsersWidget.tsx", "utf8");
    expect(src).toContain("observeLobbyCount");
    // Số dựng cũ tính từ Date.now(); presence thật thì không cần biết mấy giờ.
    expect(src.replace(/\/\*[\s\S]*?\*\//g, "")).not.toContain("Date.now()");
  });
});
