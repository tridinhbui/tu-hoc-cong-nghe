import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import FreeRecallCard from "@/components/FreeRecallCard";

// The whole point of this component is that it withholds the summary until
// the learner has tried to recall it unaided. If the children ever leak into
// the initial render, the exercise is pointless - so that is what is tested,
// rather than the timer mechanics.

const SUMMARY = <div>NOI-DUNG-TOM-TAT</div>;

describe("FreeRecallCard", () => {
  it("hides the summary behind the exercise on a first visit", () => {
    const html = renderToStaticMarkup(
      <FreeRecallCard lessonId={1} lessonSlug="bai-test" takeaways={["Ý một", "Ý hai", "Ý ba"]}>
        {SUMMARY}
      </FreeRecallCard>,
    );

    expect(html).not.toContain("NOI-DUNG-TOM-TAT");
    expect(html).toContain("Đổ não 60 giây");
  });

  it("shows the answer key options only after writing, never up front", () => {
    const html = renderToStaticMarkup(
      <FreeRecallCard lessonId={1} lessonSlug="bai-test" takeaways={["BI-MAT-MOT", "BI-MAT-HAI"]}>
        {SUMMARY}
      </FreeRecallCard>,
    );

    // The takeaways are the answers - they must not be on screen while the
    // learner is still being asked to recall them.
    expect(html).not.toContain("BI-MAT-MOT");
    expect(html).not.toContain("BI-MAT-HAI");
  });

  it("steps aside entirely when there is nothing to score against", () => {
    for (const takeaways of [[], ["Chỉ một ý"]]) {
      const html = renderToStaticMarkup(
        <FreeRecallCard lessonId={1} lessonSlug="bai-test" takeaways={takeaways}>
          {SUMMARY}
        </FreeRecallCard>,
      );
      expect(html).toContain("NOI-DUNG-TOM-TAT");
      expect(html).not.toContain("Đổ não 60 giây");
    }
  });

  it("renders the server snapshot without touching localStorage", () => {
    // getServerSnapshot must return false rather than throwing on a server
    // render, where `window` does not exist.
    expect(() =>
      renderToStaticMarkup(
        <FreeRecallCard lessonId={7} lessonSlug="bai-test" takeaways={["Ý một", "Ý hai"]}>
          {SUMMARY}
        </FreeRecallCard>,
      ),
    ).not.toThrow();
  });
});
