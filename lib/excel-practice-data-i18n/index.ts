import type { Locale } from "@/lib/i18n";
import type { ExcelPracticeSet } from "@/lib/excel-practice-data";
import { excelPracticeEn } from "./en";

/**
 * Bản dịch 6 bộ bài tập Excel/SQL trong lib/excel-practice-data.ts.
 *
 * Ba thứ ở tệp gốc TUYỆT ĐỐI không dịch, và cả ba đều là nội dung bài học chứ
 * không phải chữ hiển thị:
 *
 * 1. `formula` và `solution`. Tên hàm Excel và từ khoá SQL đã là tiếng Anh, và
 *    bộ chấm so bằng GIÁ TRỊ tính ra - dịch một công thức mẫu là làm nó sai.
 *
 * 2. Ô chứa mã chứng khoán. `A3` của bộ excel-lookup là `"HPG "` với một khoảng
 *    trắng ở cuối, và cả nhiệm vụ 2 của bộ đó tồn tại để học viên tìm ra khoảng
 *    trắng ấy. Chạm vào ô này là xoá mất bài học.
 *
 * 3. Nhãn tháng `T1`..`T12` ở cột A của bộ excel-shortcuts. Chúng là nhãn trục,
 *    không phải câu, và đổi sang `M1` không thêm gì cho người đọc tiếng Anh
 *    trong khi thêm 12 dòng phải giữ đồng bộ.
 *
 * `NOT_COPY_CELLS` ghi lại đúng ba nhóm đó, và bộ kiểm đủ-100% đọc chính danh
 * sách này - nên bỏ một ô ra khỏi phần dịch phải là một lựa chọn có tên, không
 * phải một chỗ bị quên.
 */

/** Ô có nội dung chuỗi mà KHÔNG phải chữ hiển thị, theo từng bộ. */
export const NOT_COPY_CELLS: Record<string, ReadonlySet<string>> = {
  // Mã chứng khoán ở cả bảng nguồn và danh mục. A3 = "HPG " (có khoảng trắng).
  "excel-lookup": new Set(["A2", "A3", "A4", "A5", "A6", "E2", "E3", "E4", "E5"]),
  // Nhãn tháng T1..T12.
  "excel-shortcuts": new Set(Array.from({ length: 12 }, (_, i) => `A${i + 2}`)),
  // EBIT là chữ viết tắt dùng như nhau ở hai ngôn ngữ.
  "excel-three-statement": new Set(["A5"]),
};

export interface ExcelTaskTranslation {
  prompt?: string;
  hint?: string;
  explain?: string;
  /** THEO VỊ TRÍ, và chỉ dịch phần `why`. `text` là mảnh công thức bị bắt buộc
   *  hoặc bị cấm, nên nó nằm lại ở tệp gốc. */
  mustUseWhy?: string[];
  mustAvoidWhy?: string[];
  /** THEO VỊ TRÍ. Thứ tự các bước LÀ đáp án của bộ excel-power-query, nên đảo
   *  thứ tự ở đây là đổi đáp án. */
  steps?: string[];
}

export interface ExcelSetTranslation {
  title?: string;
  intro?: string;
  /** Khoá theo tham chiếu ô ("A1"), chỉ cho ô có nội dung chuỗi. */
  cells?: Record<string, string>;
  /** THEO VỊ TRÍ, khớp `tasks` của tệp gốc. */
  tasks?: ExcelTaskTranslation[];
  /** Bộ dạng "steps" chỉ có một nhiệm vụ, ở trường `task` số ít. */
  task?: ExcelTaskTranslation;
}

const BY_LOCALE: Record<string, Record<string, ExcelSetTranslation>> = {
  en: excelPracticeEn,
};

/** Áp bản dịch lên một nhiệm vụ.
 *
 *  Mảng theo vị trí LỆCH ĐỘ DÀI thì bỏ nguyên mảng và giữ tiếng Việt, không
 *  ghép từng phần tử. Ghép lệch ở đây không phải hiển thị sai chữ - `steps` là
 *  đáp án của bài xếp thứ tự, nên một mảng thiếu phần tử sẽ đổi đáp án. */
function mergeTask<T extends Record<string, unknown>>(task: T, patch?: ExcelTaskTranslation): T {
  if (!patch) return task;
  const merged: Record<string, unknown> = { ...task };
  if (patch.prompt) merged.prompt = patch.prompt;
  if (patch.hint && typeof task.hint === "string") merged.hint = patch.hint;
  if (patch.explain) merged.explain = patch.explain;

  const why = (
    key: "mustUse" | "mustAvoid",
    translated: string[] | undefined
  ) => {
    const source = task[key] as { text: string; why: string }[] | undefined;
    if (!source || !translated || translated.length !== source.length) return;
    merged[key] = source.map((item, i) => ({ ...item, why: translated[i] }));
  };
  why("mustUse", patch.mustUseWhy);
  why("mustAvoid", patch.mustAvoidWhy);

  const steps = task.steps as string[] | undefined;
  if (steps && patch.steps && patch.steps.length === steps.length) merged.steps = patch.steps;

  return merged as T;
}

export function mergeExcelPracticeSet(
  key: string,
  set: ExcelPracticeSet,
  locale: Locale
): ExcelPracticeSet {
  const patch = locale === "vi" ? null : BY_LOCALE[locale]?.[key];
  if (!patch) return set;

  const base = {
    title: patch.title ?? set.title,
    intro: patch.intro ?? set.intro,
  };

  if (set.kind === "steps") {
    return { ...set, ...base, task: mergeTask(set.task, patch.task) };
  }

  const tasks =
    patch.tasks && patch.tasks.length === set.tasks.length
      ? set.tasks.map((task, i) => mergeTask(task, patch.tasks![i]))
      : set.tasks;

  if (set.kind === "sql") return { ...set, ...base, tasks: tasks as typeof set.tasks };

  // Lưới: chỉ thay `value` của ô đang là chuỗi. Ô công thức và ô số đi qua
  // nguyên vẹn - một ô số bị thay bằng chuỗi sẽ làm cả bộ chấm sai.
  const cells = patch.cells
    ? Object.fromEntries(
        Object.entries(set.cells).map(([ref, cell]) => {
          const translated = patch.cells![ref];
          const isText = "value" in cell && typeof cell.value === "string";
          return [ref, translated && isText ? { ...cell, value: translated } : cell];
        })
      )
    : set.cells;

  return { ...set, ...base, cells, tasks: tasks as typeof set.tasks };
}
