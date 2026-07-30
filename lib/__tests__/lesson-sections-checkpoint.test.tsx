import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import LessonSections from "@/components/LessonSections";
import type { LessonSectionBlock } from "@/lib/lesson-types";

// Renders the real component rather than asserting on the placement helper
// alone, because the bug this guards against was a rendering one: the
// mid-article check was computed correctly and then emitted after the entire
// body. Only rendering catches that.

const SECTIONS: LessonSectionBlock[] = [
  { type: "paragraph", text: "KHOI-MOT" },
  { type: "paragraph", text: "KHOI-HAI" },
  { type: "heading", text: "TIEU-DE" },
  { type: "paragraph", text: "KHOI-BA" },
  { type: "closing", lines: ["KHOI-BON"] },
];

const CHECKPOINT = <div>DIEM-KIEM-TRA</div>;

function render(props: Partial<Parameters<typeof LessonSections>[0]> = {}) {
  return renderToStaticMarkup(<LessonSections sections={SECTIONS} {...props} />);
}

describe("LessonSections checkpoint slot", () => {
  it("renders the checkpoint between the given block and the next one", () => {
    const html = render({ checkpoint: CHECKPOINT, checkpointAfterIndex: 1 });

    const checkpointAt = html.indexOf("DIEM-KIEM-TRA");
    expect(checkpointAt).toBeGreaterThan(-1);
    expect(checkpointAt).toBeGreaterThan(html.indexOf("KHOI-HAI"));
    expect(checkpointAt).toBeLessThan(html.indexOf("TIEU-DE"));
  });

  it("does not render a checkpoint when there is no index to place it at", () => {
    expect(render({ checkpoint: CHECKPOINT, checkpointAfterIndex: -1 })).not.toContain("DIEM-KIEM-TRA");
  });

  it("does not render a checkpoint when none was passed", () => {
    expect(render({ checkpointAfterIndex: 1 })).not.toContain("DIEM-KIEM-TRA");
  });

  it("keeps heading ids keyed to the full-array index so the TOC still resolves", () => {
    // LessonTableOfContents scrolls to `heading-${index}` computed over the
    // whole sections array. Splitting the body into two renders to make room
    // for the checkpoint would restart that index at 0 and break every
    // anchor after the split - hence the inline slot.
    const withCheckpoint = render({ checkpoint: CHECKPOINT, checkpointAfterIndex: 1 });
    expect(withCheckpoint).toContain('id="heading-2"');
    expect(render()).toContain('id="heading-2"');
  });

  it("renders every block exactly once, checkpoint or not", () => {
    const html = render({ checkpoint: CHECKPOINT, checkpointAfterIndex: 1 });
    for (const marker of ["KHOI-MOT", "KHOI-HAI", "TIEU-DE", "KHOI-BA", "KHOI-BON"]) {
      expect(html.split(marker).length - 1, `${marker} xuất hiện đúng 1 lần`).toBe(1);
    }
  });
});
