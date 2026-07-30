// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { findQuoteRanges, normalizeQuote } from "@/lib/lesson-highlight-paint";

function mount(html: string): HTMLElement {
  const root = document.createElement("article");
  root.innerHTML = html;
  document.body.appendChild(root);
  return root;
}

/** What the painted range actually covers, as the browser would read it. */
function textOf(range: Range): string {
  return range.toString();
}

describe("normalizeQuote", () => {
  it("collapses whitespace runs and trims", () => {
    expect(normalizeQuote("  dòng   tiền\n  tự  do ")).toBe("dòng tiền tự do");
  });
});

describe("findQuoteRanges", () => {
  it("finds a quote inside a single text node", () => {
    const root = mount("<p>Dòng tiền tự do là tiền còn lại sau chi phí vốn.</p>");
    const ranges = findQuoteRanges(root, ["tiền còn lại"]);
    expect(ranges).toHaveLength(1);
    expect(textOf(ranges[0])).toBe("tiền còn lại");
  });

  it("finds a quote spanning a <strong>, which is three text nodes", () => {
    const root = mount("<p>Chỉ số <strong>EBITDA</strong> không phải dòng tiền.</p>");
    const ranges = findQuoteRanges(root, ["Chỉ số EBITDA không phải"]);
    expect(ranges).toHaveLength(1);
    expect(textOf(ranges[0])).toBe("Chỉ số EBITDA không phải");
  });

  it("matches across the newlines and indentation that JSX leaves in the DOM", () => {
    const root = mount("<p>\n      Vốn lưu động âm\n      là một lợi thế.\n    </p>");
    // What Selection.toString() would have produced: single spaces.
    const ranges = findQuoteRanges(root, ["Vốn lưu động âm là một lợi thế."]);
    expect(ranges).toHaveLength(1);
    expect(normalizeQuote(textOf(ranges[0]))).toBe("Vốn lưu động âm là một lợi thế.");
  });

  it("matches a quote that ends at the end of a paragraph", () => {
    const root = mount("<p>Biên lợi nhuận gộp.   </p><p>Đoạn sau.</p>");
    const ranges = findQuoteRanges(root, ["Biên lợi nhuận gộp."]);
    expect(ranges).toHaveLength(1);
    expect(textOf(ranges[0])).toBe("Biên lợi nhuận gộp.");
  });

  it("matches a selection spanning two paragraphs", () => {
    // Adjacent <p>s with no text node between them. The browser's
    // Selection.toString() would have given "Câu một.\nCâu hai.", so the saved
    // quote carries a separator that the DOM itself does not contain.
    const root = mount("<p>Câu một.</p><p>Câu hai.</p>");
    const ranges = findQuoteRanges(root, ["một. Câu hai"]);
    expect(ranges).toHaveLength(1);
    // Range.toString() concatenates the text data, so the block separator is
    // not echoed back - what matters is that the range covers both ends.
    expect(textOf(ranges[0])).toBe("một.Câu hai");
    expect(ranges[0].startContainer.textContent).toBe("Câu một.");
    expect(ranges[0].endContainer.textContent).toBe("Câu hai.");
  });

  it("lights up every occurrence of a repeated quote", () => {
    const root = mount("<p>chi phí vốn</p><p>khác</p><p>chi phí vốn</p>");
    const ranges = findQuoteRanges(root, ["chi phí vốn"]);
    expect(ranges).toHaveLength(2);
    expect(ranges.map(textOf)).toEqual(["chi phí vốn", "chi phí vốn"]);
  });

  it("skips a quote whose text is no longer in the lesson", () => {
    const root = mount("<p>Nội dung đã được viết lại.</p>");
    expect(findQuoteRanges(root, ["câu cũ đã bị xoá"])).toEqual([]);
  });

  it("ignores subtrees marked data-no-highlight", () => {
    const root = mount('<p>giữ nguyên</p><div data-no-highlight><p>giữ nguyên</p></div>');
    const ranges = findQuoteRanges(root, ["giữ nguyên"]);
    expect(ranges).toHaveLength(1);
  });

  it("handles several quotes at once", () => {
    const root = mount("<p>alpha beta gamma delta</p>");
    const ranges = findQuoteRanges(root, ["alpha", "gamma delta"]);
    expect(ranges.map(textOf).sort()).toEqual(["alpha", "gamma delta"]);
  });

  it("returns nothing for empty or whitespace-only quotes", () => {
    const root = mount("<p>nội dung</p>");
    expect(findQuoteRanges(root, ["", "   "])).toEqual([]);
  });

  it("returns nothing when the container has no text", () => {
    const root = mount("");
    expect(findQuoteRanges(root, ["bất kỳ"])).toEqual([]);
  });
});
