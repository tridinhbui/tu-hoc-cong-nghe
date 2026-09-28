import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import LessonSections from "@/components/LessonSections";
import type { LessonSectionBlock } from "@/lib/lesson-types";
import { I18nProvider } from "@/lib/i18n/context";
import { mergeLessonTranslation } from "@/lib/lesson-translations";
import { gradeOutput, normalizeOutput } from "@/lib/code-runner/grade";
import { estimateBlockSeconds, countBlockWords } from "@/lib/lesson-reading";
import { highlightCode } from "@/lib/code-runner/highlight";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

const CODE: LessonSectionBlock = { type: "code", language: "python", code: "print('MA-VI-DU')", caption: "CHU-THICH", runnable: true };
const EXERCISE: LessonSectionBlock = {
  type: "exercise",
  language: "python",
  title: "TIEU-DE-BT",
  task: "DE-BAI",
  starter: "# KHOI-DAU",
  solution: "print('LOI-GIAI')",
  expectedOutput: "DAU-RA-CAN",
  hints: ["GOI-Y-1", "GOI-Y-2"],
};

const render = (sections: LessonSectionBlock[]) =>
  renderToStaticMarkup(
    <I18nProvider initialLocale="vi">
      <LessonSections sections={sections} />
    </I18nProvider>,
  );

describe("grading by output", () => {
  it("ignores trailing whitespace and trailing blank lines, nothing else", () => {
    expect(gradeOutput("a  \nb\n\n", "a\nb").pass).toBe(true);
    expect(gradeOutput("a\r\nb", "a\nb").pass).toBe(true);
    // Khoảng trắng giữa dòng và hoa/thường là một phần của đầu ra.
    expect(gradeOutput("Tong:5", "Tong: 5").pass).toBe(false);
    expect(gradeOutput("tong: 5", "Tong: 5").pass).toBe(false);
  });

  it("names the first differing line, and a missing line as missing", () => {
    expect(gradeOutput("1\n2\n4", "1\n2\n3")).toEqual({ pass: false, line: 3, expectedLine: "3", actualLine: "4" });
    expect(gradeOutput("1", "1\n2")).toEqual({ pass: false, line: 2, expectedLine: "2", actualLine: undefined });
    expect(normalizeOutput("")).toBe("");
  });
});

describe("code and exercise blocks", () => {
  it("render inside a lesson body", () => {
    const html = render([CODE, EXERCISE]);
    for (const s of ["MA-VI-DU", "CHU-THICH", "Chạy thử", "TIEU-DE-BT", "DE-BAI", "KHOI-DAU", "DAU-RA-CAN", "Bài tập"]) {
      expect(html).toContain(s);
    }
    // Lời giải và gợi ý không lộ ra trước khi người học chạy thử / bấm xem.
    expect(html).not.toContain("LOI-GIAI");
    expect(html).not.toContain("GOI-Y-1");
  });

  it("a non-runnable language never gets a Run button, even when flagged", () => {
    const html = render([{ type: "code", language: "sql", code: "SELECT 1", runnable: true }]);
    expect(html).not.toContain("Chạy thử");
  });

  it("highlighting is lossless, so the colour layer lines up under the textarea", () => {
    const src = "def f(x):\n    # chú thích\n    return f'{x}' + \"a\\\"b\"  # c\nprint(f(1))\n";
    expect(highlightCode(src, "python").map((t) => t.text).join("")).toBe(src);
    const sql = "SELECT ten, COUNT(*) FROM don_hang -- x\nWHERE ghi_chu = 'it''s';";
    expect(highlightCode(sql, "sql").map((t) => t.text).join("")).toBe(sql);
  });

  it("code is timed by lines, not counted as prose words", () => {
    const code = { type: "code", language: "python", code: "a = 1\nb = 2\nprint(a + b)" } as const;
    expect(countBlockWords(code)).toBe(0);
    expect(estimateBlockSeconds(code)).toBeGreaterThan(estimateBlockSeconds({ ...code, code: "a = 1" }));
    expect(countBlockWords(EXERCISE)).toBe(countBlockWords({ ...EXERCISE, solution: "x ".repeat(500) }));
  });
});

describe("translating code blocks", () => {
  const lesson = { slug: "x", title: "t", sections: [CODE, EXERCISE] } as never;
  type Ex = Extract<LessonSectionBlock, { type: "exercise" }>;

  it("takes solution and expectedOutput only as a pair", () => {
    const paired = mergeLessonTranslation(lesson, {
      slug: "x",
      sections: [
        { type: "code", caption: "CAPTION" },
        { type: "exercise", title: "TITLE", solution: "print('EN')", expectedOutput: "EN" },
      ],
    } as never, "en") as { sections: LessonSectionBlock[] };
    const ex = paired.sections[1] as Ex;
    expect(ex.title).toBe("TITLE");
    expect(ex.solution).toBe("print('EN')");
    expect(ex.expectedOutput).toBe("EN");
    expect((paired.sections[0] as { caption?: string }).caption).toBe("CAPTION");

    const half = mergeLessonTranslation(lesson, {
      slug: "x",
      sections: [{ type: "code" }, { type: "exercise", solution: "print('EN')" }],
    } as never, "en") as { sections: LessonSectionBlock[] };
    expect((half.sections[1] as Ex).solution).toBe("print('LOI-GIAI')");
    expect((half.sections[1] as Ex).expectedOutput).toBe("DAU-RA-CAN");
  });

  it("never lets a translation change the language", () => {
    const merged = mergeLessonTranslation(lesson, {
      slug: "x",
      sections: [{ type: "code", language: "javascript" }, { type: "exercise" }],
    } as never, "en") as { sections: LessonSectionBlock[] };
    expect((merged.sections[0] as { language: string }).language).toBe("python");
  });
});
