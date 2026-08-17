import { describe, expect, it } from "vitest";
import { libDataVi, libDataEn } from "@/lib/i18n/dictionaries/sections/lib-data";
import { TECH_CARDS } from "@/lib/tech-cards";
import { DOCUMENT_CATEGORIES } from "@/lib/document-categories";
import { SHOUTOUT_VARIANTS } from "@/lib/supabase-user";

/** Ba module dữ liệu được dịch qua TỪ ĐIỂN chứ không qua thư mục `-i18n/`:
 *  lib/tech-cards.ts, lib/document-categories.ts và
 *  lib/highlight-stage-grouping.ts đều tra vào `libData.*` theo id.
 *
 *  Cách đó hợp lý - chúng nhỏ, và khoá là id ổn định nên tra cứu không trôi
 *  theo vị trí. Nhưng nó thiếu đúng thứ mà các bộ overlay có: một cổng bắt buộc
 *  đủ. `Record<string, string>` nhận mọi khoá, nên thêm một thẻ mới vào
 *  TECH_CARDS mà quên thêm khoá từ điển thì thẻ ấy hiện tiếng Việt giữa giao
 *  diện tiếng Anh, và không có gì báo.
 *
 *  Bộ kiểm này là điều kiện để ba tệp đó được tách khỏi tổng trong
 *  scripts/i18n-coverage.mjs - xem OVERLAY_COMPLETE ở đó. Tách ra là lời khẳng
 *  định đã xong, nên phải có cổng trước. */

// `unknown` ở giữa vì libData giờ chứa cả object khoá-theo-id lẫn MẢNG
// (`shoutouts`), nên một chữ ký Record<string, Record<...>> không còn phủ hết.
const en = libDataEn.libData as unknown as Record<string, any>;
const vi = libDataVi.libData as unknown as Record<string, any>;

describe("libData: module dữ liệu dịch qua từ điển", () => {
  it("mọi thẻ tài chính đều có khoá trong cả hai ngôn ngữ", () => {
    const ids = TECH_CARDS.map((c) => c.id);
    const missingEn = ids.filter((id) => !en.techCards?.[id]);
    const missingVi = ids.filter((id) => !vi.techCards?.[id]);
    expect(missingEn, `thiếu bản EN: ${missingEn.join(", ")}`).toEqual([]);
    expect(missingVi, `thiếu bản VI: ${missingVi.join(", ")}`).toEqual([]);
  });

  it("mọi loại tài liệu đều có khoá trong cả hai ngôn ngữ", () => {
    const values = DOCUMENT_CATEGORIES.map((c) => c.value);
    const missingEn = values.filter((v) => !en.documentCategories?.[v]);
    const missingVi = values.filter((v) => !vi.documentCategories?.[v]);
    expect(missingEn, `thiếu bản EN: ${missingEn.join(", ")}`).toEqual([]);
    expect(missingVi, `thiếu bản VI: ${missingVi.join(", ")}`).toEqual([]);
  });

  it("hai ngôn ngữ có cùng tập khoá ở mọi nhóm", () => {
    // Một khoá thừa bên EN là dấu hiệu id đã đổi bên dữ liệu mà từ điển chưa
    // theo - bản dịch đó không bao giờ được dùng, và không có gì báo.
    const drift: string[] = [];
    for (const group of Object.keys(vi)) {
      const a = Object.keys(vi[group] ?? {}).sort();
      const b = Object.keys(en[group] ?? {}).sort();
      if (a.join("|") !== b.join("|")) drift.push(`${group}: vi=[${a}] en=[${b}]`);
    }
    expect(drift, drift.join("\n")).toEqual([]);
  });

  it("sáu thời điểm trong ngày đều có nhãn ở cả hai ngôn ngữ", () => {
    const phases = ["dawn", "morning", "afternoon", "dusk", "night", "lateNight"];
    for (const bag of [vi, en]) {
      expect(Object.keys(bag.roomTimeOfDay ?? {}).sort()).toEqual([...phases].sort());
    }
  });

  it("số biến thể câu vinh danh khớp SHOUTOUT_VARIANTS ở cả hai ngôn ngữ", () => {
    // Lệch thì hoặc một biến thể không bao giờ được chọn, hoặc tra ra undefined
    // và lời chào mất câu - cả hai đều im lặng.
    for (const bag of [vi, en]) {
      expect(bag.shoutouts?.length).toBe(SHOUTOUT_VARIANTS);
    }
  });

  it("bản EN không còn chuỗi tiếng Việt", () => {
    const DIACRITICS =
      /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
    const leaks: string[] = [];
    const walk = (node: unknown, path: string) => {
      if (typeof node === "string") {
        if (DIACRITICS.test(node)) leaks.push(`${path}: ${node}`);
      } else if (Array.isArray(node)) {
        node.forEach((v, i) => walk(v, `${path}[${i}]`));
      } else if (node && typeof node === "object") {
        for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`);
      }
    };
    walk(en, "libData");
    expect(leaks, leaks.join("\n")).toEqual([]);
  });
});
