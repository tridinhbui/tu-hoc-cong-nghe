import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/** Khung xem trước của Editor chạy trong iframe có sandbox, và jsdom - nơi mọi test
 *  nhiệm vụ chạy - KHÔNG áp sandbox. Nên cấu hình thật chỉ canh được bằng chữ:
 *
 *  thiếu `allow-forms`, Chrome không bắn sự kiện `submit` (đo thật: fired=0), nên
 *  nhiệm vụ form-validate không bao giờ xanh cho người học dù mọi test đều qua.
 *  `allow-same-origin` thì ngược lại KHÔNG được có: nó cho trang của người học đọc
 *  localStorage và cookie của chính app. */
describe("sandbox của khung xem trước Editor", () => {
  const src = readFileSync("components/tools/EditorSim.tsx", "utf8");
  const sandbox = /sandbox="([^"]*)"/.exec(src)?.[1] ?? "";

  it("cho phép script và biểu mẫu", () => {
    expect(sandbox.split(/\s+/)).toEqual(expect.arrayContaining(["allow-scripts", "allow-forms"]));
  });

  it("không cho cùng nguồn gốc với app", () => {
    expect(sandbox).not.toContain("allow-same-origin");
  });
});
