import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { TERMINAL_MISSIONS } from "@/lib/tools/terminal/missions";
import { SQL_MISSIONS } from "@/lib/tools/sql/missions";
import { API_MISSIONS } from "@/lib/tools/api/missions";
import { CLOUD_MISSIONS } from "@/lib/tools/cloud/missions";
import { EDITOR_MISSIONS } from "@/lib/tools/editor/missions";
import { validateInteractiveBlock, countBlockKinds } from "@/lib/lesson-blocks/validate.js";
import { mergeLessonTranslation } from "@/lib/lesson-translations.js";

/* lib/tools/mission-ids.json là bản sao id nhiệm vụ để scripts/audit-lesson-
 * content.mjs (Node thuần, không đọc được .ts) kiểm khối `sim` trỏ đúng nhiệm
 * vụ có thật. Bản sao nào cũng lệch được, nên test này giữ nó khớp nguồn. */
describe("lib/tools/mission-ids.json", () => {
  it("khớp đúng danh sách nhiệm vụ trong lib/tools/*/missions.ts", () => {
    const file = JSON.parse(readFileSync(path.resolve(__dirname, "../tools/mission-ids.json"), "utf8"));
    const ids = (l: { id: string }[]) => l.map((m) => m.id);
    expect(file).toEqual({
      terminal: ids(TERMINAL_MISSIONS),
      editor: ids(EDITOR_MISSIONS),
      sql: ids(SQL_MISSIONS),
      api: ids(API_MISSIONS),
      cloud: ids(CLOUD_MISSIONS),
    });
  });
});

describe("validateInteractiveBlock", () => {
  const simMissions = { terminal: new Set(["pwd"]) };

  it("sim: nhiệm vụ phải có thật", () => {
    expect(validateInteractiveBlock({ type: "sim", tool: "terminal", mission: "pwd", title: "a", task: "b" }, { simMissions })).toEqual([]);
    expect(validateInteractiveBlock({ type: "sim", tool: "terminal", mission: "khong-co", title: "a", task: "b" }, { simMissions })).toHaveLength(1);
  });

  it("scenario: bắt ngõ cụt, vòng lặp và thiếu kết thúc good", () => {
    const ok = {
      type: "scenario",
      title: "t",
      start: "a",
      nodes: {
        a: { text: "x", choices: [{ label: "1", next: "g" }, { label: "2", next: "b" }] },
        g: { text: "tốt", ending: "good" },
        b: { text: "xấu", ending: "bad" },
      },
    };
    expect(validateInteractiveBlock(ok)).toEqual([]);
    const loop = { ...ok, nodes: { ...ok.nodes, a: { text: "x", choices: [{ label: "1", next: "a" }, { label: "2", next: "b" }] } } };
    expect(validateInteractiveBlock(loop).join(" ")).toMatch(/vòng lặp/);
    const noGood = { ...ok, nodes: { a: ok.nodes.a, g: { text: "x", ending: "bad" }, b: ok.nodes.b } };
    expect(validateInteractiveBlock(noGood).join(" ")).toMatch(/good/);
  });

  it("chart: bắt biểu thức chia cho 0 ở đầu thanh trượt", () => {
    const chart = {
      type: "chart",
      kind: "line",
      title: "t",
      caption: "c",
      xLabel: "x",
      yLabel: "y",
      x: { from: 1, to: 10, step: 1 },
      params: [{ id: "k", label: "k", min: 0, max: 5, step: 1, value: 2 }],
      series: [{ label: "s", expr: "x / k" }],
    };
    expect(validateInteractiveBlock(chart).join(" ")).toMatch(/Infinity/);
    expect(validateInteractiveBlock({ ...chart, series: [{ label: "s", expr: "x * k" }] })).toEqual([]);
    expect(validateInteractiveBlock({ ...chart, series: [{ label: "s", expr: "constructor" }] }).join(" ")).toMatch(/tên không có/);
  });

  it("aiLab prompt: mỗi phần đúng một phương án good", () => {
    const lab = {
      type: "aiLab",
      mode: "prompt",
      title: "t",
      task: "k",
      parts: [
        { id: "a", label: "A", options: [{ text: "1", good: true, feedback: "f" }, { text: "2", feedback: "f" }] },
        { id: "b", label: "B", options: [{ text: "1", good: true, feedback: "f" }, { text: "2", good: true, feedback: "f" }] },
      ],
      responses: [{ requires: ["a", "b"], text: "tốt" }, { text: "kém" }],
    };
    expect(validateInteractiveBlock(lab).join(" ")).toMatch(/đúng 1 phương án good/);
  });

  it("đếm khối thực hành và hình ảnh", () => {
    expect(countBlockKinds([{ type: "lead" }, { type: "aiLab" }, { type: "chart" }, { type: "feynman" }])).toEqual({ practice: 1, visual: 2 });
  });
});

describe("dịch khối tương tác", () => {
  it("chỉ lấy chữ, cấu trúc luôn từ bản tiếng Việt", () => {
    const lesson = {
      slug: "s",
      title: "t",
      sections: [
        {
          type: "scenario",
          title: "Tình huống",
          start: "a",
          nodes: { a: { text: "Cảnh", choices: [{ label: "Chọn", next: "g" }, { label: "Chọn 2", next: "b" }] }, g: { text: "Tốt", ending: "good" }, b: { text: "Xấu", ending: "bad" } },
        },
      ],
    };
    const patch = {
      slug: "s",
      sections: [{ type: "scenario", title: "Scenario", nodes: { a: { text: "Scene", choices: [{ label: "Pick", next: "b" }, { label: "Pick 2" }] } } }],
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const merged = mergeLessonTranslation(lesson as any, patch as any, "en") as any;
    const block = merged.sections[0];
    expect(block.title).toBe("Scenario");
    expect(block.nodes.a.text).toBe("Scene");
    expect(block.nodes.a.choices[0]).toEqual({ label: "Pick", next: "g" });
    expect(block.nodes.g.text).toBe("Tốt");
  });
});
