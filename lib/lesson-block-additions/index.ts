import type { Lesson, LessonSectionBlock } from "../lesson-types";
import { P01_ADDITIONS } from "./p01";
import { P02_ADDITIONS } from "./p02";
import { P03_ADDITIONS } from "./p03";
import { P04_ADDITIONS } from "./p04";
import { P05_ADDITIONS } from "./p05";
import { P06_ADDITIONS } from "./p06";
import { P07_ADDITIONS } from "./p07";
import { P08_ADDITIONS } from "./p08";
import { P09_ADDITIONS } from "./p09";
import { P10_ADDITIONS } from "./p10";
import { P11_ADDITIONS } from "./p11";
import { P12_ADDITIONS } from "./p12";
import { P13_ADDITIONS } from "./p13";
import { P14_ADDITIONS } from "./p14";
import { P15_ADDITIONS } from "./p15";
import { P16_ADDITIONS } from "./p16";

/**
 * Khối THÊM vào bài đã có (KE-HOACH-1500-BAI.md: bài nào cũng có thực hành và
 * hình ảnh). Khoá là slug; giá trị là các khối chèn vào `sections`.
 *
 * Vì sao một lớp riêng chứ không sửa thẳng lib/lessons.ts hay các tệp
 * lib/*-lessons.ts: bài nằm rải ở hàng chục tệp, nhiều tệp ~2MB; và
 * lib/lesson-quiz-overrides.js chỉ được mang `quiz` (AGENTS.md - một override
 * mang `sections` làm bài trong lessons.ts âm thầm bị bỏ qua). Lớp này chỉ
 * CỘNG THÊM khối, không thay khối nào đã có, nên không thể che nội dung gốc.
 *
 * Chèn TRƯỚC khối `closing` cuối bài (nếu có), để phần chốt vẫn là phần cuối.
 * Bài đã có bản dịch trong lib/lessons-i18n/<locale>/ phải chèn khối dịch tương
 * ứng vào CÙNG vị trí, nếu không cả thân bài tiếng Anh rơi về tiếng Việt - xem
 * "Adding a block to a translated lesson" trong AGENTS.md.
 *
 * Một slug không tồn tại, hoặc nằm ở hai tệp, là lỗi NÉM RA ngay lúc nạp:
 * gõ sai một chữ trong slug nếu chỉ bị bỏ qua thì không có tín hiệu nào cả.
 */
const FILES: Record<string, Record<string, LessonSectionBlock[]>> = {
  p01: P01_ADDITIONS,
  p02: P02_ADDITIONS,
  p03: P03_ADDITIONS,
  p04: P04_ADDITIONS,
  p05: P05_ADDITIONS,
  p06: P06_ADDITIONS,
  p07: P07_ADDITIONS,
  p08: P08_ADDITIONS,
  p09: P09_ADDITIONS,
  p10: P10_ADDITIONS,
  p11: P11_ADDITIONS,
  p12: P12_ADDITIONS,
  p13: P13_ADDITIONS,
  p14: P14_ADDITIONS,
  p15: P15_ADDITIONS,
  p16: P16_ADDITIONS,
};

export const LESSON_BLOCK_ADDITIONS: Record<string, LessonSectionBlock[]> = (() => {
  const merged: Record<string, LessonSectionBlock[]> = {};
  const owner: Record<string, string> = {};
  for (const [file, record] of Object.entries(FILES)) {
    for (const [slug, blocks] of Object.entries(record)) {
      if (owner[slug]) throw new Error(`lesson-block-additions: slug "${slug}" nằm ở cả ${owner[slug]} và ${file}`);
      owner[slug] = file;
      merged[slug] = blocks;
    }
  }
  return merged;
})();

export function withBlockAdditions(
  lessons: Lesson[],
  additions: Record<string, LessonSectionBlock[]> = LESSON_BLOCK_ADDITIONS,
): Lesson[] {
  const used = new Set<string>();
  const out = lessons.map((lesson) => {
    const added = additions[lesson.slug];
    if (!added || added.length === 0) return lesson;
    used.add(lesson.slug);
    const sections = lesson.sections ?? [];
    const last = sections[sections.length - 1];
    const hasClosing = last?.type === "closing";
    const body = hasClosing ? sections.slice(0, -1) : sections;
    return { ...lesson, sections: [...body, ...added, ...(hasClosing ? [last] : [])] };
  });
  const unknown = Object.keys(additions).filter((s) => !used.has(s) && additions[s].length > 0);
  if (unknown.length) throw new Error(`lesson-block-additions: không có bài nào có slug: ${unknown.join(", ")}`);
  return out;
}
