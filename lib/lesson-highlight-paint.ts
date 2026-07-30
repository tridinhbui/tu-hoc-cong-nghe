/**
 * Locates saved highlight quotes inside rendered lesson content so they can be
 * painted in place.
 *
 * `lesson_highlights` stores the quoted text and nothing else - deliberately,
 * see the table's migration: lesson bodies come from two different rendering
 * pipelines (data-driven `LessonSections` and freeform case-study JSX), so
 * there is no DOM path or character offset that means the same thing in both.
 * Finding the quote again by text is therefore the only option, and it has the
 * nice property that highlights saved before this module existed light up too.
 *
 * Two things make a naive `indexOf` on `textContent` fail:
 *
 *   - A quote almost never lives in one text node. "**bold** words" renders as
 *     three nodes, and a selection spanning them produces one string. So the
 *     search runs over the concatenation of every text node, with a map back
 *     to (node, offset) per character.
 *   - `Selection.toString()` collapses whitespace differently from the source
 *     (newlines between JSX elements, indentation inside `<p>`). Both sides are
 *     normalised to single spaces before matching, and the map is built against
 *     the normalised string so offsets still resolve to real DOM positions.
 */

interface TextIndex {
  nodes: Text[];
  /** Whitespace-normalised concatenation of every text node under the root. */
  text: string;
  /** Per character of `text`: which node it came from, and its offset in that node. */
  nodeAt: Int32Array;
  offsetAt: Int32Array;
}

/** Collapses every whitespace run to a single space, matching buildTextIndex. */
export function normalizeQuote(quote: string): string {
  return quote.replace(/\s+/g, " ").trim();
}

// Selecting across a block boundary makes the browser put a newline in
// `Selection.toString()`, but adjacent blocks often have no text node between
// them at all (`<p>a</p><p>b</p>`). Without a synthetic separator the index
// reads "ab" while the saved quote reads "a b", and any highlight spanning two
// paragraphs silently fails to match. Tag-based rather than
// getComputedStyle-based so it does not depend on layout or a stylesheet.
const BLOCK_TAGS = new Set([
  "ADDRESS", "ARTICLE", "ASIDE", "BLOCKQUOTE", "BR", "DD", "DIV", "DL", "DT",
  "FIGCAPTION", "FIGURE", "FOOTER", "H1", "H2", "H3", "H4", "H5", "H6",
  "HEADER", "HR", "LI", "MAIN", "NAV", "OL", "P", "PRE", "SECTION", "TABLE",
  "TD", "TH", "TR", "UL",
]);

function nearestBlock(node: Text, root: HTMLElement): Element | null {
  let el = node.parentElement;
  while (el && el !== root.parentElement) {
    if (BLOCK_TAGS.has(el.tagName)) return el;
    el = el.parentElement;
  }
  return null;
}

function buildTextIndex(root: HTMLElement): TextIndex {
  const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      // Form controls render their value as a text child but selecting inside
      // them is not lesson prose; `data-no-highlight` lets a caller opt a
      // subtree out (quiz answers, the highlights list itself).
      if (parent.closest("script, style, textarea, input, [data-no-highlight]")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: Text[] = [];
  const chars: string[] = [];
  const nodeAt: number[] = [];
  const offsetAt: number[] = [];
  let pendingSpace = false;
  let previousBlock: Element | null = null;

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const raw = node.data;
    const nodeIndex = nodes.push(node) - 1;

    const block = nearestBlock(node, root);
    if (previousBlock !== null && block !== previousBlock) {
      pendingSpace = chars.length > 0;
    }
    previousBlock = block;

    for (let i = 0; i < raw.length; i++) {
      const isSpace = /\s/.test(raw[i]);
      if (isSpace) {
        // Defer it: a trailing space that never gets followed by a real
        // character must not end up in `text`, or a quote ending at the end of
        // a paragraph would fail to match.
        pendingSpace = chars.length > 0;
        continue;
      }
      if (pendingSpace) {
        chars.push(" ");
        nodeAt.push(nodeIndex);
        offsetAt.push(i);
        pendingSpace = false;
      }
      chars.push(raw[i]);
      nodeAt.push(nodeIndex);
      offsetAt.push(i);
    }
  }

  return {
    nodes,
    text: chars.join(""),
    nodeAt: Int32Array.from(nodeAt),
    offsetAt: Int32Array.from(offsetAt),
  };
}

/**
 * Every range in `root` matching any of `quotes`. A quote that appears more
 * than once lights up at every occurrence - without a stored position there is
 * no way to tell which one the learner selected, and colouring all of them is
 * both consistent and what a find-in-page highlighter does.
 *
 * Quotes that no longer appear (lesson content was edited since) are skipped
 * silently; they still show in the highlights list below the lesson.
 */
export function findQuoteRanges(root: HTMLElement, quotes: string[]): Range[] {
  const wanted = quotes.map(normalizeQuote).filter((q) => q.length > 0);
  if (wanted.length === 0) return [];

  const index = buildTextIndex(root);
  if (index.text.length === 0) return [];

  const doc = root.ownerDocument;
  const ranges: Range[] = [];

  for (const quote of wanted) {
    let from = 0;
    for (;;) {
      const start = index.text.indexOf(quote, from);
      if (start === -1) break;
      const end = start + quote.length; // exclusive

      const range = doc.createRange();
      range.setStart(index.nodes[index.nodeAt[start]], index.offsetAt[start]);
      range.setEnd(index.nodes[index.nodeAt[end - 1]], index.offsetAt[end - 1] + 1);
      ranges.push(range);

      from = end;
    }
  }

  return ranges;
}

/**
 * Whether the browser can paint ranges without touching the DOM. The CSS
 * Custom Highlight API is used rather than wrapping matches in `<mark>`
 * elements because the lesson body is React-rendered: injecting wrappers into
 * it fights reconciliation and breaks on the next re-render. Unsupported
 * browsers simply get no colour - the highlights list still works.
 */
export function supportsHighlightApi(): boolean {
  return (
    typeof CSS !== "undefined" &&
    "highlights" in CSS &&
    typeof (globalThis as { Highlight?: unknown }).Highlight === "function"
  );
}
