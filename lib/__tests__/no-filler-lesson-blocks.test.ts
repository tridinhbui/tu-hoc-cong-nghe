import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

/** Không khối nào của bài học được dựng từ chữ rỗng.
 *
 *  Lỗi có thật: LessonPageClient từng có buildDefaultSummary và
 *  buildDefaultApplication, và thứ chúng sinh ra là
 *
 *    keyIdea:       "Bài này giúp bạn hiểu rõ hơn về <tên bài>."
 *    commonMistake: một chuỗi giống hệt nhau ở mọi bài
 *    action:        một chuỗi giống hệt nhau ở mọi bài
 *
 *  Hậu quả không phải một tấm thẻ xấu mà là một tấm thẻ NÓI DỐI: nó trông y
 *  hệt tấm thẻ của 689 bài có tóm tắt thật, chiếm cùng chỗ, mang cùng tiêu đề,
 *  và không chứa một chữ nào về bài đang đọc. Vì luôn có hàm thay thế nên
 *  không ai phát hiện được - 26 bài đã ở tình trạng đó, và chỉ lộ ra khi đếm
 *  xem bài nào có trường `summary`.
 *
 *  Đây là cùng một họ với luật 4 trong AGENTS.md ("không có phương án phi lý"):
 *  khoảng trống được bày ra như nội dung. Luật đó nói về phương án quiz; bài
 *  này canh phần còn lại của trang. */

const FILLER_MARKERS = [
  "buildDefaultSummary",
  "buildDefaultApplication",
  // Cái thứ ba, chỉ lộ ra khi bài test này chạy lần đầu: nó bịa CÂU HỎI luyện
  // tập cho 97 bài không có, kèm phương án phi lý đúng loại mà luật 4 cấm.
  "buildDefaultPracticePrompt",
  "Vì chỉ cần đọc là đủ, không cần áp dụng",
  "giúp bạn hiểu rõ hơn về",
  "Đọc khái niệm như một câu chữ",
  "Hãy nối bài học này với một quyết định nhỏ",
];

describe("không dựng nội dung bài học từ chữ rỗng", () => {
  /** Bỏ mọi dạng chú thích, giữ lại mã chạy.
   *
   *  Phải bỏ cả khối `/* … *\/` chứ không chỉ dòng `//`: chú thích trong JSX
   *  là `{/* … *\/}`, và bản đầu của bài này chỉ lọc theo đầu dòng nên nó bắt
   *  ngay chính đoạn chú thích vừa viết để giải thích vì sao chữ rỗng bị gỡ. */
  function runtimeCode(src: string): string {
    return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  }

  it("LessonPageClient không còn hàm dựng thay thế nào", () => {
    // Chuỗi vẫn được phép nằm trong CHÚ THÍCH giải thích vì sao nó bị gỡ - đó
    // chính là thứ giữ cho bài học không bị quên. Chỉ cấm nó nằm trong mã chạy.
    const code = runtimeCode(readFileSync("components/LessonPageClient.tsx", "utf8"));
    for (const marker of FILLER_MARKERS) {
      expect(code, `"${marker}" quay lại trong mã chạy`).not.toContain(marker);
    }
  });

  it("ba khối cuối trang đều có điều kiện, không cái nào dựng vô điều kiện", () => {
    const src = readFileSync("components/LessonPageClient.tsx", "utf8");
    for (const tag of [
      "LessonSummaryCard",
      "LessonApplicationCard",
      "ReviewLoopCard",
      "LessonQuestionCard",
    ]) {
      // Dựng vô điều kiện nghĩa là có một đường nào đó dựng nó ra mà không có
      // dữ liệu - và đường đó rồi sẽ cần một giá trị mặc định.
      const at = src.indexOf(`<${tag}`);
      expect(at, `${tag} không còn được dựng`).toBeGreaterThan(0);
      const before = src.slice(Math.max(0, at - 220), at);
      expect(before, `${tag} dựng vô điều kiện`).toMatch(/&&\s*\(?\s*$|\?\s*\(?\s*$/);
    }
  });

  it("bài nào có summary thì đó là chữ của chính bài đó", () => {
    // Nếu ai đó dán cùng một tóm tắt vào nhiều bài, nó cũng là chữ rỗng - chỉ
    // là chữ rỗng viết tay thay vì sinh ra bằng hàm.
    const dir = "lib/lessons-data";
    const files = readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "_index.json");
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const f of files) {
      const lesson = JSON.parse(readFileSync(`${dir}/${f}`, "utf8"));
      const idea = lesson.summary?.keyIdea;
      if (!idea) continue;
      const prev = seen.get(idea);
      if (prev) dupes.push(`${lesson.slug} trùng keyIdea với ${prev}`);
      else seen.set(idea, lesson.slug);
    }
    expect(dupes).toEqual([]);
  });
});
