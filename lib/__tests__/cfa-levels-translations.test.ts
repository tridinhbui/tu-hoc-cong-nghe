import { describe, expect, it } from "vitest";
import { CFA_LEVELS, weightMidpointTotal } from "@/lib/cfa-levels";
import { cfaLevelsEn } from "@/lib/cfa-levels-i18n/en";
import { mergeCfaLevel } from "@/lib/cfa-levels-i18n";

/** Bản dịch mô tả CFA Level II/III.
 *
 *  Rủi ro riêng của tệp này KHÔNG phải chữ mà là SỐ. Chú thích đầu
 *  lib/cfa-levels.ts nói rõ: trọng số lấy từ trang candidate resources của CFA
 *  Institute, và "một bảng trọng số bịa trông y hệt một bảng trọng số đúng".
 *  Một bản dịch gõ nhầm "2 hours 12 minutes" thành "2 hours 20 minutes" cũng
 *  không ai phát hiện bằng mắt.
 *
 *  Nên bộ kiểm này soát con số chứ không chỉ soát ngôn ngữ: mọi chữ số xuất
 *  hiện trong `facts` bản Việt phải xuất hiện lại trong bản Anh, cùng số lần. */

const byLevel = new Map(CFA_LEVELS.map((s) => [s.level, s]));

describe("bản dịch CFA Level II/III (en)", () => {
  it("mọi khoá trỏ vào một cấp có thật, và cả hai cấp đều có bản dịch", () => {
    expect(Object.keys(cfaLevelsEn).filter((k) => !byLevel.has(k as "II" | "III"))).toEqual([]);
    expect(CFA_LEVELS.filter((s) => !cfaLevelsEn[s.level]).map((s) => s.level)).toEqual([]);
  });

  it("mảng dịch cùng số phần tử với bản gốc", () => {
    const bad: string[] = [];
    for (const [level, patch] of Object.entries(cfaLevelsEn)) {
      const source = byLevel.get(level as "II" | "III");
      if (!source) continue;
      if (patch.facts && patch.facts.length !== source.facts.length) {
        bad.push(`${level}.facts: vi ${source.facts.length}, en ${patch.facts.length}`);
      }
      if (patch.topicNames && patch.topicNames.length !== source.topics.length) {
        bad.push(`${level}.topicNames: vi ${source.topics.length}, en ${patch.topicNames.length}`);
      }
    }
    expect(bad, bad.join("\n")).toEqual([]);
  });

  it("mọi con số trong facts sống sót qua bản dịch", () => {
    const digits = (s: string) => (s.match(/\d+/g) ?? []).sort().join(",");
    const bad: string[] = [];
    for (const [level, patch] of Object.entries(cfaLevelsEn)) {
      const source = byLevel.get(level as "II" | "III");
      if (!source || !patch.facts) continue;
      source.facts.forEach(([, viValue], i) => {
        const enValue = patch.facts![i][1];
        if (digits(viValue) !== digits(enValue)) {
          bad.push(`${level}.facts[${i}]: vi "${viValue}" -> en "${enValue}"`);
        }
      });
    }
    expect(
      bad,
      `Con số trong facts là dữ liệu lấy từ CFA Institute, không phải chữ để viết lại:\n${bad.join("\n")}`
    ).toEqual([]);
  });

  it("merge không đụng tới trọng số lo/hi", () => {
    for (const source of CFA_LEVELS) {
      const merged = mergeCfaLevel(source, "en");
      expect(merged.topics.map((t) => [t.lo, t.hi])).toEqual(source.topics.map((t) => [t.lo, t.hi]));
      expect(weightMidpointTotal(merged)).toBe(weightMidpointTotal(source));
      expect(merged.level).toBe(source.level);
      expect(merged.pathways).toEqual(source.pathways);
      // và có dịch thật
      expect(merged.format).not.toBe(source.format);
    }
  });

  it("bản tiếng Anh không còn chữ tiếng Việt", () => {
    const DIACRITICS =
      /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
    const leaks: string[] = [];
    for (const [level, patch] of Object.entries(cfaLevelsEn)) {
      const probe = (label: string, text: string) => {
        if (DIACRITICS.test(text)) leaks.push(`${level}.${label}: ${text}`);
      };
      if (patch.format) probe("format", patch.format);
      if (patch.noMockReason) probe("noMockReason", patch.noMockReason);
      patch.facts?.forEach(([k, v], i) => {
        probe(`facts[${i}].label`, k);
        probe(`facts[${i}].value`, v);
      });
      patch.topicNames?.forEach((n, i) => probe(`topicNames[${i}]`, n));
    }
    expect(leaks, leaks.join("\n")).toEqual([]);
  });

  it("locale vi trả về đúng bản gốc", () => {
    expect(mergeCfaLevel(CFA_LEVELS[0], "vi")).toBe(CFA_LEVELS[0]);
  });
});
