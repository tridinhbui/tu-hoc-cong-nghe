import { describe, expect, it } from "vitest";
import { FINANCE_CAREERS } from "@/lib/finance-careers";
import { careersEn } from "@/lib/finance-careers-i18n/en";
import { mergeCareer } from "@/lib/finance-careers-i18n";

/** Bản dịch nghề là một PATCH chồng lên bản tiếng Việt, nên nó hỏng theo hai
 *  kiểu mà TypeScript không thấy được cái nào:
 *
 *  1. Khoá không khớp `id` nào. `Record<string, ...>` nhận mọi chuỗi, nên gõ
 *     sai "finanical-analyst" thì compile sạch và bản dịch đơn giản là không
 *     bao giờ được dùng. Không có lỗi, không có cảnh báo, trang vẫn ra tiếng
 *     Việt.
 *
 *  2. Mảng lệch số phần tử. mergeCareer bỏ nguyên mảng và rơi về tiếng Việt -
 *     đó là chốt an toàn để không trộn hai thứ tiếng trong một danh sách, chứ
 *     không phải trạng thái chấp nhận được. Không đo thì một mảng thiếu một
 *     dòng sẽ hiện ra như "nghề này chưa dịch phần kỹ năng" mãi mãi.
 *
 *  Cùng hình dạng với luật positional options của lessons-i18n, và cùng lý do. */

const byId = new Map(FINANCE_CAREERS.map((c) => [c.id, c]));

const ARRAY_FIELDS = [
  "responsibilities",
  "skills",
  "careerPath",
  "requiredTools",
  "certifications",
] as const;

describe("bản dịch nghề (en)", () => {
  it("mọi khoá đều trỏ vào một nghề có thật", () => {
    const unknown = Object.keys(careersEn).filter((id) => !byId.has(id));
    expect(unknown, `id không có trong FINANCE_CAREERS: ${unknown.join(", ")}`).toEqual([]);
  });

  it("mảng dịch cùng số phần tử với bản tiếng Việt", () => {
    const mismatches: string[] = [];
    for (const [id, patch] of Object.entries(careersEn)) {
      const source = byId.get(id);
      if (!source) continue;
      for (const field of ARRAY_FIELDS) {
        const translated = patch[field];
        if (!translated) continue;
        const sourceLength = source[field].length;
        if (translated.length !== sourceLength) {
          mismatches.push(`${id}.${field}: vi có ${sourceLength}, en có ${translated.length}`);
        }
      }
    }
    expect(mismatches, mismatches.join("\n")).toEqual([]);
  });

  it("không để sót chuỗi tiếng Việt trong bản dịch", () => {
    // Dấu tiếng Việt là tín hiệu đủ chắc ở đây: mọi giá trị trong tệp này lẽ ra
    // là tiếng Anh. Ngoại lệ duy nhất là tên riêng - "CPA Việt Nam" là TÊN của
    // chứng chỉ Việt Nam, "Tự Học Tài Chính" là tên sản phẩm - nên chúng được
    // liệt kê ra chứ không nới luật.
    const ALLOWED = ["CPA Việt Nam", "Tự Học Tài Chính"];
    const DIACRITICS =
      /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
    const leaks: string[] = [];
    for (const [id, patch] of Object.entries(careersEn)) {
      for (const [field, value] of Object.entries(patch)) {
        for (const text of Array.isArray(value) ? value : [value]) {
          let probe = String(text);
          for (const name of ALLOWED) probe = probe.split(name).join("");
          if (DIACRITICS.test(probe)) leaks.push(`${id}.${field}: ${text}`);
        }
      }
    }
    expect(leaks, leaks.join("\n")).toEqual([]);
  });

  it("mergeCareer giữ nguyên mọi trường cấu trúc", () => {
    const source = FINANCE_CAREERS.find((c) => careersEn[c.id])!;
    const merged = mergeCareer(source, "en");
    expect(merged.id).toBe(source.id);
    expect(merged.emoji).toBe(source.emoji);
    expect(merged.relatedLessonSlugs).toEqual(source.relatedLessonSlugs);
    expect(merged.entryDifficulty).toBe(source.entryDifficulty);
    expect(merged.stressLevel).toBe(source.stressLevel);
    expect(merged.wlb).toBe(source.wlb);
    expect(merged.englishTitle).toBe(source.englishTitle);
    // và có dịch thật
    expect(merged.title).not.toBe(source.title);
  });

  it("locale vi trả về đúng bản gốc", () => {
    const source = FINANCE_CAREERS[0];
    expect(mergeCareer(source, "vi")).toBe(source);
  });

  /** Cổng này chỉ dựng được SAU KHI đủ 44/44, và đó là lý do nó ở đây chứ
   *  không có từ đầu: một cổng "phải đủ 100%" đặt lúc mới dịch 4 bài thì đỏ
   *  suốt cả chục lô, và một cổng đỏ thường trực là cổng người ta học cách phớt
   *  lờ - đúng điều AGENTS.md ghi.
   *
   *  Giờ kho đã đủ, nên nó chuyển vai: không phải để đo tiến độ nữa mà để chặn
   *  một nghề MỚI thêm vào lib/finance-careers.ts mà quên bản dịch. Không có
   *  nó thì nghề mới hiện tiếng Việt giữa trang tiếng Anh, im lặng hoàn toàn -
   *  mergeCareer trả về bản gốc khi không tìm thấy patch, đúng như thiết kế. */
  it("mọi nghề đều có bản dịch - thêm nghề mới thì phải dịch kèm", () => {
    const missing = FINANCE_CAREERS.filter((c) => !careersEn[c.id]).map((c) => c.id);
    expect(
      missing,
      `chưa dịch: ${missing.join(", ")}\n` +
        `Thêm vào lib/finance-careers-i18n/en.ts. Thiếu thì nghề này hiện tiếng Việt ` +
        `giữa giao diện tiếng Anh mà không có gì báo.`
    ).toEqual([]);
  });
});
