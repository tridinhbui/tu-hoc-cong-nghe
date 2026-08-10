import { format } from "@/lib/i18n";
import type { Lesson } from "@/lib/lesson-types";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL, isLessonInRange } from "@/lib/track-stages";

// `day` used to be parsed out of the title. It is now a real field, moved
// there by lib/lesson-day-prefix.js at build time; the title parse is kept
// only as a fallback for any caller still passing a raw, unprocessed lesson.
type LessonLike = Pick<Lesson, "id" | "title" | "track"> & { day?: number };

/** The legacy curriculum day for a lesson, or undefined if it never had one. */
function resolveDay(lesson: Pick<Lesson, "title"> & { day?: number }): number | undefined {
  if (typeof lesson.day === "number") return lesson.day;
  const dayMatch = lesson.title.match(/Day\s+(\d+)/i);
  return dayMatch ? Number(dayMatch[1]) : undefined;
}

// Nhãn hiển thị của một bài, đọc từ TIÊU ĐỀ chứ không từ id.
//
// Trước đây hàm này chỉ nhận ra một dạng tiền tố - "Chặng N, Bài M" - rồi
// lần lượt rơi xuống "Day N" và cuối cùng là "Bài <id>". Kết quả là người
// học đi qua chương trình gặp bốn hệ đánh số khác nhau, trong đó 298 bài
// hiện thẳng id nội bộ: "Bài 1690", "Bài 1301". Id là số thứ tự trong dữ
// liệu, không phải thứ tự học - dashboard đánh số bài theo vị trí học
// (001, 002...) nên hai con số đó không bao giờ khớp nhau.
//
// Đọc từ tiêu đề là điều kiện bắt buộc chứ không phải lựa chọn cho gọn:
// phần lớn nơi gọi hàm này truyền `{ id, title, track: undefined }` và
// không hề có trường `day`, nên mọi nhánh dựa vào `day` đều chết ở đó.
//
// Hai dạng tiền tố đang dùng trong kho bài:
//   "Chặng 7, Bài 3: ..."   - track cá nhân, số chặng là số người học thấy
//   "Excel, Bài 1: ..."     - track chuyên ngành, tên chặng thay cho số vì
//                             dashboard đánh lại số chặng theo nhánh nghề
//   "CFA Ethics 15: ..."    - chuỗi bài chứng chỉ, số nằm ngay sau tên
const TITLE_PATTERNS: RegExp[] = [
  /^(Chặng\s+\d+),\s*Bài\s+(\d+)\s*[:\-]/i,
  /^([^,:]{2,32}),\s*Bài\s+(\d+)\s*[:\-]/i,
  /^([A-Za-zÀ-ỹ][^:0-9]{1,30}?)\s+(\d{1,2})\s*:/,
];

/** Hai mẫu chữ, nhận qua tham số: hàm này gọi từ nhiều component và cả nơi
 *  không có `useI18n`. Chuỗi tiếng Việt trong thân hàm chỉ còn là dự phòng. */
export interface LessonLabelStrings {
  /** Chứa {stage} và {number}. */
  stageAndNumber: string;
  bonusCase: string;
}

/* i18n-ignore-start: hai mẫu DỰ PHÒNG, dùng khi chỗ gọi chưa truyền bảng chữ.
   Bản dịch nằm ở `lessonLabel` trong lib/i18n/dictionaries/sections/lib-strings.ts
   và ba component đều truyền `t.lessonLabel` vào. */
const FALLBACK: LessonLabelStrings = {
  stageAndNumber: "{stage} · Bài {number}",
  bonusCase: "Case chuyên sâu",
};
/* i18n-ignore-end */

export function getLessonDisplayLabel(lesson: LessonLike, s: LessonLabelStrings = FALLBACK): string {
  for (const pattern of TITLE_PATTERNS) {
    const m = pattern.exec(lesson.title);
    if (m) return format(s.stageAndNumber, { stage: m[1].trim(), number: m[2] });
  }

  // Nhận ra bài case bằng CẢ tiêu đề, không chỉ bằng `track`: nhiều nơi gọi
  // truyền `track: undefined` nên nhánh dựa vào trường đó không bao giờ chạy.
  if (lesson.track === "bonus" || lesson.title.startsWith("Case chuyên sâu")) return s.bonusCase;

  // Không có tiền tố nào đọc được: lấy tên chặng mà bài đó thuộc về. Vẫn là
  // thứ người học nhìn thấy ở dashboard, khác hẳn một id nội bộ.
  const personal = TRACK_PERSONAL.stages.find((stage) => isLessonInRange(lesson.id, stage));
  if (personal) return personal.label;
  const professional = TRACK_PROFESSIONAL.stages.find((stage) => isLessonInRange(lesson.id, stage));
  if (professional) return professional.name.split(":")[0].split("(")[0].trim();

  // Không thuộc chặng nào và không có tiền tố - thà không có nhãn còn hơn
  // hiện một con số vô nghĩa với người đọc.
  return "";
}

export function getLessonShortTitle(lesson: Pick<Lesson, "title">): string {
  return lesson.title
    .replace(/^Tự học Tài chính Day\s+\d+:\s*/i, "")
    .replace(/^Chặng\s+\d+,\s*Bài\s+\d+:\s*/i, "")
    .trim();
}

/** Key into RECALL_SCHEDULE (lib/recall-schedule.ts). Reads the `day` field
 *  now that the number no longer lives in the title - returning undefined here
 *  silently disables spaced repetition for that lesson, so this must keep
 *  resolving for every lesson that previously had "Day N" in its title. */
export function getLessonRecallDay(lesson: LessonLike): number | undefined {
  return resolveDay(lesson);
}
