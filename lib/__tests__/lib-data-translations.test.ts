import { describe, expect, it } from "vitest";
import { libDataVi, libDataEn } from "@/lib/i18n/dictionaries/sections/lib-data";
import { FINANCE_CARDS } from "@/lib/finance-cards";
import { DOCUMENT_CATEGORIES } from "@/lib/document-categories";

/** Ba module dữ liệu được dịch qua TỪ ĐIỂN chứ không qua thư mục `-i18n/`:
 *  lib/finance-cards.ts, lib/document-categories.ts và
 *  lib/highlight-stage-grouping.ts đều tra vào `libData.*` theo id.
 *
 *  Cách đó hợp lý - chúng nhỏ, và khoá là id ổn định nên tra cứu không trôi
 *  theo vị trí. Nhưng nó thiếu đúng thứ mà các bộ overlay có: một cổng bắt buộc
 *  đủ. `Record<string, string>` nhận mọi khoá, nên thêm một thẻ mới vào
 *  FINANCE_CARDS mà quên thêm khoá từ điển thì thẻ ấy hiện tiếng Việt giữa giao
 *  diện tiếng Anh, và không có gì báo.
 *
 *  Bộ kiểm này là điều kiện để ba tệp đó được tách khỏi tổng trong
 *  scripts/i18n-coverage.mjs - xem OVERLAY_COMPLETE ở đó. Tách ra là lời khẳng
 *  định đã xong, nên phải có cổng trước. */

const en = libDataEn.libData as Record<string, Record<string, unknown>>;
const vi = libDataVi.libData as Record<string, Record<string, unknown>>;

describe("libData: module dữ liệu dịch qua từ điển", () => {
  it("mọi thẻ tài chính đều có khoá trong cả hai ngôn ngữ", () => {
    const ids = FINANCE_CARDS.map((c) => c.id);
    const missingEn = ids.filter((id) => !en.financeCards?.[id]);
    const missingVi = ids.filter((id) => !vi.financeCards?.[id]);
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
