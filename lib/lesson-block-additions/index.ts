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
import { P17_ADDITIONS } from "./p17";
import { P18_ADDITIONS } from "./p18";
import { P19_ADDITIONS } from "./p19";
import { P20_ADDITIONS } from "./p20";
import { P21_ADDITIONS } from "./p21";
import { P22_ADDITIONS } from "./p22";
import { P23_ADDITIONS } from "./p23";
import { P24_ADDITIONS } from "./p24";
import { P25_ADDITIONS } from "./p25";
import { P26_ADDITIONS } from "./p26";
import { P27_ADDITIONS } from "./p27";
import { P28_ADDITIONS } from "./p28";
import { P29_ADDITIONS } from "./p29";
import { P30_ADDITIONS } from "./p30";
import { P31_ADDITIONS } from "./p31";
import { P32_ADDITIONS } from "./p32";
import { P33_ADDITIONS } from "./p33";
import { P34_ADDITIONS } from "./p34";
import { P35_ADDITIONS } from "./p35";
import { P36_ADDITIONS } from "./p36";
import { P37_ADDITIONS } from "./p37";
import { P38_ADDITIONS } from "./p38";
import { P39_ADDITIONS } from "./p39";
import { P40_ADDITIONS } from "./p40";
import { P41_ADDITIONS } from "./p41";
import { P42_ADDITIONS } from "./p42";
import { P43_ADDITIONS } from "./p43";
import { P44_ADDITIONS } from "./p44";
import { P45_ADDITIONS } from "./p45";
import { P46_ADDITIONS } from "./p46";
import { Q01_ADDITIONS } from "./q01";
import { Q02_ADDITIONS } from "./q02";
import { Q03_ADDITIONS } from "./q03";
import { Q04_ADDITIONS } from "./q04";
import { Q05_ADDITIONS } from "./q05";
import { Q06_ADDITIONS } from "./q06";
import { Q07_ADDITIONS } from "./q07";
import { R01_ADDITIONS } from "./r01";
import { R02_ADDITIONS } from "./r02";
import { R03_ADDITIONS } from "./r03";
import { R04_ADDITIONS } from "./r04";
import { R05_ADDITIONS } from "./r05";
import { R06_ADDITIONS } from "./r06";
import { R07_ADDITIONS } from "./r07";
import { R08_ADDITIONS } from "./r08";
import { R09_ADDITIONS } from "./r09";
import { R10_ADDITIONS } from "./r10";
import { R11_ADDITIONS } from "./r11";
import { R12_ADDITIONS } from "./r12";
import { R13_ADDITIONS } from "./r13";
import { R14_ADDITIONS } from "./r14";
import { R15_ADDITIONS } from "./r15";
import { R16_ADDITIONS } from "./r16";
import { R17_ADDITIONS } from "./r17";
import { R18_ADDITIONS } from "./r18";
import { R19_ADDITIONS } from "./r19";
import { R20_ADDITIONS } from "./r20";
import { R21_ADDITIONS } from "./r21";
import { R22_ADDITIONS } from "./r22";
import { R23_ADDITIONS } from "./r23";
import { R24_ADDITIONS } from "./r24";
import { R25_ADDITIONS } from "./r25";
import { R26_ADDITIONS } from "./r26";

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
  p17: P17_ADDITIONS,
  p18: P18_ADDITIONS,
  p19: P19_ADDITIONS,
  p20: P20_ADDITIONS,
  p21: P21_ADDITIONS,
  p22: P22_ADDITIONS,
  p23: P23_ADDITIONS,
  p24: P24_ADDITIONS,
  p25: P25_ADDITIONS,
  p26: P26_ADDITIONS,
  p27: P27_ADDITIONS,
  p28: P28_ADDITIONS,
  p29: P29_ADDITIONS,
  p30: P30_ADDITIONS,
  p31: P31_ADDITIONS,
  p32: P32_ADDITIONS,
  p33: P33_ADDITIONS,
  p34: P34_ADDITIONS,
  p35: P35_ADDITIONS,
  p36: P36_ADDITIONS,
  p37: P37_ADDITIONS,
  p38: P38_ADDITIONS,
  p39: P39_ADDITIONS,
  p40: P40_ADDITIONS,
  p41: P41_ADDITIONS,
  p42: P42_ADDITIONS,
  p43: P43_ADDITIONS,
  p44: P44_ADDITIONS,
  p45: P45_ADDITIONS,
  p46: P46_ADDITIONS,
};

/**
 * Đợt hai (2026-10-05): khối `sim` nhúng nhiệm vụ MỚI của trình mô phỏng vào bài
 * đã nhận khối ở đợt một. Khác đợt một ở chỗ một slug được phép nằm ở nhiều tệp
 * - các khối được NỐI vào sau khối của đợt một, theo thứ tự tệp. Mỗi tệp q vẫn do
 * một người viết, và scripts/check-block-additions.mjs chặn một bài có hơn một
 * khối sim.
 */
const SIM_FILES: Record<string, Record<string, LessonSectionBlock[]>> = {
  q01: Q01_ADDITIONS,
  q02: Q02_ADDITIONS,
  q03: Q03_ADDITIONS,
  q04: Q04_ADDITIONS,
  q05: Q05_ADDITIONS,
  q06: Q06_ADDITIONS,
  q07: Q07_ADDITIONS,
  r01: R01_ADDITIONS,
  r02: R02_ADDITIONS,
  r03: R03_ADDITIONS,
  r04: R04_ADDITIONS,
  r05: R05_ADDITIONS,
  r06: R06_ADDITIONS,
  r07: R07_ADDITIONS,
  r08: R08_ADDITIONS,
  r09: R09_ADDITIONS,
  r10: R10_ADDITIONS,
  r11: R11_ADDITIONS,
  r12: R12_ADDITIONS,
  r13: R13_ADDITIONS,
  r14: R14_ADDITIONS,
  r15: R15_ADDITIONS,
  r16: R16_ADDITIONS,
  r17: R17_ADDITIONS,
  r18: R18_ADDITIONS,
  r19: R19_ADDITIONS,
  r20: R20_ADDITIONS,
  r21: R21_ADDITIONS,
  r22: R22_ADDITIONS,
  r23: R23_ADDITIONS,
  r24: R24_ADDITIONS,
  r25: R25_ADDITIONS,
  r26: R26_ADDITIONS,
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
  for (const record of Object.values(SIM_FILES)) {
    for (const [slug, blocks] of Object.entries(record)) merged[slug] = [...(merged[slug] ?? []), ...blocks];
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
