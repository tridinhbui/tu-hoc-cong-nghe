import { describe, it, expect, vi } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import LessonSections from "@/components/LessonSections";
import type { LessonSectionBlock } from "@/lib/lesson-types";
import { I18nProvider } from "@/lib/i18n/context";
import { mergeLessonTranslation } from "@/lib/lesson-translations";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

const BLOCK: LessonSectionBlock = {
  type: "feynman",
  title: "TIEU-DE",
  intro: "VI-DU",
  columns: ["COT-A", "COT-B", "COT-C"],
  rows: [["HANG-1", "DOI-THUONG", "MAY-THAT"]],
  oneLiner: "MOT-CAU",
};

describe("feynman section block", () => {
  it("renders intro, table, and the one-line summary inside a lesson", () => {
    const html = renderToStaticMarkup(
      <I18nProvider initialLocale="vi">
        <LessonSections sections={[BLOCK]} />
      </I18nProvider>
    );
    for (const s of ["TIEU-DE", "VI-DU", "COT-B", "HANG-1", "MAY-THAT", "MOT-CAU", "Chế độ Feynman"]) {
      expect(html).toContain(s);
    }
  });

  // Mọi khối feynman trong kho phải là bảng vuông: FeynmanCard vẽ đúng ba cột,
  // nên một hàng thiếu ô là một ô trống, thừa ô là chữ biến mất không báo.
  it("every feynman block in the corpus has three columns and three-cell rows", () => {
    const dir = join(process.cwd(), "lib/lessons-data");
    const bad: string[] = [];
    for (const f of readdirSync(dir)) {
      if (!f.endsWith(".json") || f.startsWith("_")) continue;
      const lesson = JSON.parse(readFileSync(join(dir, f), "utf8"));
      for (const b of lesson.sections ?? []) {
        if (b.type !== "feynman") continue;
        if (b.columns?.length !== 3 || !b.rows?.length || b.rows.some((r: string[]) => r.length !== 3) || !b.oneLiner) {
          bad.push(lesson.slug);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it("a translation patch replaces rows only when the row count matches", () => {
    const lesson = { slug: "x", title: "t", sections: [BLOCK] } as never;
    const ok = mergeLessonTranslation(lesson, {
      slug: "x",
      sections: [{ type: "feynman", oneLiner: "ONE", rows: [["R1", "EVERYDAY", "MACHINE"]] }],
    } as never, "en") as { sections: Extract<LessonSectionBlock, { type: "feynman" }>[] };
    expect(ok.sections[0].oneLiner).toBe("ONE");
    expect(ok.sections[0].rows[0]).toEqual(["R1", "EVERYDAY", "MACHINE"]);

    const skewed = mergeLessonTranslation(lesson, {
      slug: "x",
      sections: [{ type: "feynman", rows: [["A", "B", "C"], ["D", "E", "F"]] }],
    } as never, "en") as { sections: Extract<LessonSectionBlock, { type: "feynman" }>[] };
    expect(skewed.sections[0].rows).toEqual(BLOCK.rows);
  });
});
