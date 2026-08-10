import { describe, it, expect } from "vitest";
import { LAMP_SIZE_LABELS } from "@/lib/warm-lamps";
import { STUDY_ROOM_TOPICS } from "@/lib/supabase-study-rooms";
import { SCHEDULE_PRE_2026, SCHEDULE_2026 } from "@/lib/vn-income-tax";
import { formatCooldown } from "@/lib/stage-exam";
import { getLessonDisplayLabel } from "@/lib/lesson-labels";
import { ITEM_DESCRIPTIONS } from "@/lib/rpg-items";
import { CHEST_REWARDS } from "@/lib/chests";
import { libStringsVi, libStringsEn } from "@/lib/i18n/dictionaries/sections/lib-strings";

const DIA =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

describe("phần chữ rải trong lib/", () => {
  it("nhãn đèn khớp từng chữ và đúng số lượng", () => {
    expect(libStringsVi.lampSizes).toEqual([...LAMP_SIZE_LABELS]);
    // Khớp theo VỊ TRÍ với LAMP_RADII, nên lệch độ dài là gán nhãn sai kích cỡ.
    expect(libStringsEn.lampSizes).toHaveLength(LAMP_SIZE_LABELS.length);
  });

  it("ba chủ đề phòng học và hai biểu thuế khớp bản gốc", () => {
    for (const topic of STUDY_ROOM_TOPICS) {
      expect(libStringsVi.studyRoomTopics[topic.id], topic.id).toBe(topic.label);
      expect(libStringsEn.studyRoomTopics[topic.id], topic.id).toBeTruthy();
    }
    expect(libStringsVi.taxSchedules.pre2026).toBe(SCHEDULE_PRE_2026.label);
    expect(libStringsVi.taxSchedules.from2026).toBe(SCHEDULE_2026.label);
  });

  it("mẫu thời lượng giữ đúng thứ tự giờ/phút của từng ngôn ngữ", () => {
    // Không ghép "giờ" với "phút" ở phía mã: thứ tự và dấu cách khác nhau giữa
    // các ngôn ngữ, nên mẫu phải hoàn chỉnh.
    expect(formatCooldown(65 * 60_000, libStringsVi.cooldown)).toBe("1 giờ 5 phút");
    expect(formatCooldown(65 * 60_000, libStringsEn.cooldown)).toBe("1 hr 5 min");
    expect(formatCooldown(42 * 60_000, libStringsEn.cooldown)).toBe("42 min");
  });

  it("nhãn bài dựng đúng từ mẫu ở cả hai ngôn ngữ", () => {
    const lesson = { id: 1, title: "Chặng 3, Bài 12: Dòng tiền", track: undefined };
    expect(getLessonDisplayLabel(lesson, libStringsEn.lessonLabel)).toContain("Lesson");
    expect(getLessonDisplayLabel({ id: 2, title: "x", track: "bonus" }, libStringsEn.lessonLabel)).toBe(
      libStringsEn.lessonLabel.bonusCase
    );
  });

  it("mọi vật phẩm RPG đều có bản dịch, không thừa không thiếu", () => {
    // `.name` được vẽ ở cửa hàng quận 3D (CivicPanel). Tôi từng kết luận nhầm
    // là nó không hiện ra vì hai chỗ đọc khác chỉ lấy `.icon` - ca này chốt lại
    // bằng chính bảng dữ liệu thay vì bằng một lần đọc mã.
    for (const [key, item] of Object.entries(ITEM_DESCRIPTIONS)) {
      expect(libStringsVi.rpgItems[key], `thiếu ${key}`).toBe(item.name);
      expect(libStringsEn.rpgItems[key], `${key} thiếu bản Anh`).toBeTruthy();
    }
    const ids = new Set(Object.keys(ITEM_DESCRIPTIONS));
    expect(Object.keys(libStringsVi.rpgItems).filter((k) => !ids.has(k))).toEqual([]);
  });

  it("mọi phần thưởng rương đều có bản dịch cho cả value và desc", () => {
    // `value` của loại "title" được ghi xuống cột `reward_value` nên nó là
    // KHOÁ; ở đây tra ra chữ hiển thị. Cả hai đều hiện ở modal mở rương.
    for (const r of CHEST_REWARDS) {
      expect(libStringsVi.chestDescriptions[r.desc], `thiếu desc: ${r.desc}`).toBe(r.desc);
      expect(libStringsEn.chestDescriptions[r.desc], `desc thiếu bản Anh: ${r.desc}`).toBeTruthy();
      if (r.type === "title") {
        expect(libStringsVi.chestTitles[r.value], `thiếu title: ${r.value}`).toBe(r.value);
        expect(libStringsEn.chestTitles[r.value], `title thiếu bản Anh: ${r.value}`).toBeTruthy();
      }
    }
  });

  it("bản Anh không còn dấu tiếng Việt", () => {
    const walk = (v: unknown): string[] =>
      typeof v === "string" ? [v] : Array.isArray(v) ? v.flatMap(walk) : v && typeof v === "object" ? Object.values(v).flatMap(walk) : [];
    // `chestTitles`/`chestDescriptions` bị loại: KHOÁ của chúng cố ý là chuỗi
    // tiếng Việt (chính giá trị đã ghi xuống DB), chỉ giá trị mới là bản dịch -
    // và `walk` không phân biệt được khoá với giá trị.
    const { chestTitles, chestDescriptions, ...rest } = libStringsEn;
    for (const value of [...walk(rest), ...Object.values(chestTitles), ...Object.values(chestDescriptions)]) {
      expect(DIA.test(value), `"${value}"`).toBe(false);
    }
  });

  it("placeholder khớp giữa hai bản", () => {
    const marks = (s: string) => (s.match(/\{(\w+)\}/g) ?? []).sort().join(",");
    const flat = (o: Record<string, unknown>, p = ""): [string, string][] =>
      Object.entries(o).flatMap(([k, v]) =>
        typeof v === "string" ? [[`${p}${k}`, v] as [string, string]] : v && typeof v === "object" && !Array.isArray(v) ? flat(v as Record<string, unknown>, `${p}${k}.`) : []
      );
    const en = new Map(flat(libStringsEn as unknown as Record<string, unknown>));
    for (const [path, vi] of flat(libStringsVi as unknown as Record<string, unknown>)) {
      if (vi.includes("{")) expect(marks(en.get(path) ?? ""), path).toBe(marks(vi));
    }
  });
});
