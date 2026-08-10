// Cột `en` của conceptTable: khi nào được dịch, và vì sao nó phải được dịch.
//
// LessonSections vẽ mỗi mục thành hai phần: `vi` in đậm là thuật ngữ đang được
// dạy, `en` là con chip nhỏ bên cạnh. Thiết kế ấy chỉ đúng khi `en` thật sự là
// thuật ngữ tiếng Anh. Trong kho thì không: một phần đáng kể các bảng mượn cột
// này làm cột phán quyết hoặc cột phân loại và điền tiếng Việt vào -
// `en: "Vi phạm ngay lúc chép"`, `en: "An toàn thanh khoản"`. Người đọc tiếng
// Anh thấy một thuật ngữ tiếng Việt kèm một "bản dịch" cũng tiếng Việt.
//
// Bản dịch từng không với tới được chỗ đó: `mergeSection` chỉ ghép `def`. Bộ
// kiểm này giữ ba tính chất của cách sửa - `vi` vẫn bất khả xâm phạm, `en` ghép
// được, và bỏ trống thì rơi về bản gốc chứ không thành `undefined` - đồng thời
// đếm số mục còn tiếng Việt ở cột `en` mà chưa có bản dịch.
//
// Con số đó là CẢNH BÁO CÓ TRẦN chứ không phải cổng cứng bằng 0: nó đo dữ liệu
// nguồn tiếng Việt, và một bài mới viết hôm nay hoàn toàn có thể hợp lệ mà vẫn
// mượn cột `en` như vậy. Trần đặt ở mức kho hiện đạt, theo đúng cách bốn cổng
// nội dung trong scripts/audit-lesson-content.mjs được đặt.
import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import { mergeLessonTranslation } from "../lesson-translations.js";

const DATA_DIR = path.join(process.cwd(), "lib/lessons-data");
const EN_DIR = path.join(process.cwd(), "lib/lessons-i18n/en");

const VIETNAMESE = /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụỳýỷỹỵ]/i;

function lessonWithTable(en: string) {
  return {
    slug: "x",
    sections: [
      {
        type: "conceptTable" as const,
        title: "Bảng",
        concepts: [{ vi: "Vốn lưu động", en, def: "Chênh lệch tài sản và nợ ngắn hạn" }],
      },
    ],
  };
}

// `mergeLessonTranslation` được viết bằng JavaScript và chỉ đọc đúng những
// trường nó ghép, nên bài giả ở đây cố tình thiếu 13 trường bắt buộc của
// `Lesson`. Ép kiểu ở ranh giới gọi thay vì dựng một bài đầy đủ: bộ kiểm này
// nói về một cột của một khối, không phải về hình dạng của cả bài học.
function mergedConcept(en: string, patch: Record<string, string>) {
  const merged = mergeLessonTranslation(
    lessonWithTable(en) as never,
    {
      slug: "x",
      sections: [{ type: "conceptTable", concepts: [patch] }],
    } as never,
    "en"
  ) as { sections: { concepts: { vi: string; en: string; def: string }[] }[] };
  return merged.sections[0].concepts[0];
}

describe("conceptTable en column", () => {
  it("dịch được cột en khi bản dịch cung cấp", () => {
    const concept = mergedConcept("Vi phạm ngay lúc chép", { en: "Breach at the moment of copying" });
    expect(concept.en).toBe("Breach at the moment of copying");
  });

  it("rơi về bản gốc khi bản dịch bỏ trống, để thuật ngữ tiếng Anh thật đi qua nguyên vẹn", () => {
    const concept = mergedConcept("Working capital", { def: "The gap between current assets and liabilities" });
    expect(concept.en).toBe("Working capital");
  });

  it("không bao giờ ghép cột vi - thuật ngữ tiếng Việt là thứ đang được dạy", () => {
    const concept = mergedConcept("Working capital", { vi: "Working capital", def: "d" } as Record<string, string>);
    expect(concept.vi).toBe("Vốn lưu động");
  });
});

describe("conceptTable en column, phủ sóng trên kho", () => {
  // Mức kho đạt được lúc viết bộ kiểm này. Hạ xuống sau một lô dịch; đừng nâng
  // lên để một build đỏ thành xanh.
  const MAX_UNTRANSLATED = 0;

  it("số mục có cột en bằng tiếng Việt mà chưa được dịch không vượt trần", () => {
    const offenders: string[] = [];

    for (const file of readdirSync(DATA_DIR)) {
      if (!file.endsWith(".json") || file === "_index.json") continue;
      const vi = JSON.parse(readFileSync(path.join(DATA_DIR, file), "utf8"));
      let translated: { sections?: { concepts?: { en?: string }[] }[] } | null = null;
      try {
        translated = JSON.parse(readFileSync(path.join(EN_DIR, file), "utf8"));
      } catch {
        translated = null;
      }

      (vi.sections ?? []).forEach((block: { type: string; concepts?: { en?: string }[] }, i: number) => {
        if (block.type !== "conceptTable") return;
        (block.concepts ?? []).forEach((concept, j) => {
          if (!concept.en || !VIETNAMESE.test(concept.en)) return;
          if (translated?.sections?.[i]?.concepts?.[j]?.en) return;
          offenders.push(`${file.replace(/\.json$/, "")} sections[${i}].concepts[${j}]: "${concept.en}"`);
        });
      });
    }

    expect(
      offenders.length,
      `Cột en đang là tiếng Việt và chưa có bản dịch:\n  ${offenders.slice(0, 20).join("\n  ")}`
    ).toBeLessThanOrEqual(MAX_UNTRANSLATED);
  });
});
