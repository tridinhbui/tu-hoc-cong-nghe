import { describe, expect, it } from "vitest";
import { LESSON_ROOM_LINKS } from "@/lib/lesson-room-links";
import { lessonRoomLinksEn } from "@/lib/lesson-room-links-i18n/en";
import { mergeLessonRoomLink } from "@/lib/lesson-room-links-i18n";

/** Nhãn nối bài học sang phòng 3D.
 *
 *  Cái dễ hỏng riêng ở đây là `room`: nếu lớp phủ ghi đè được nó thì một bản
 *  dịch gõ nhầm sẽ đưa người học sang phòng khác - hỏng ĐIỀU HƯỚNG chứ không
 *  phải hỏng chữ. Kiểu `LessonRoomLinkTranslation` không có trường đó, và phép
 *  kiểm dưới đây xác nhận merge giữ nguyên nó. */

describe("bản dịch nối bài học - phòng (en)", () => {
  it("mọi khoá trỏ vào một slug có thật, và mọi slug đều có bản dịch", () => {
    const unknown = Object.keys(lessonRoomLinksEn).filter((s) => !LESSON_ROOM_LINKS[s]);
    expect(unknown, `slug không có trong LESSON_ROOM_LINKS: ${unknown.join(", ")}`).toEqual([]);
    const missing = Object.keys(LESSON_ROOM_LINKS).filter((s) => !lessonRoomLinksEn[s]);
    expect(missing, `chưa dịch: ${missing.join(", ")}`).toEqual([]);
  });

  it("merge không đổi phòng đích", () => {
    for (const [slug, link] of Object.entries(LESSON_ROOM_LINKS)) {
      const merged = mergeLessonRoomLink(slug, link, "en");
      expect(merged.room, slug).toBe(link.room);
      expect(merged.cta, slug).not.toBe(link.cta);
    }
  });

  it("hai slug dùng chung nội dung tiếng Việt thì bản Anh cũng phải giống nhau", () => {
    // cash-conversion-cycle và -2 cố ý trùng nội dung. Dịch lệch nhau thì cùng
    // một căn phòng lại được mô tả bằng hai câu khác nhau tuỳ bài học dẫn vào.
    const byViText = new Map<string, string[]>();
    for (const [slug, link] of Object.entries(LESSON_ROOM_LINKS)) {
      const key = `${link.cta}||${link.why}`;
      if (!byViText.has(key)) byViText.set(key, []);
      byViText.get(key)!.push(slug);
    }
    const drift: string[] = [];
    for (const slugs of byViText.values()) {
      if (slugs.length < 2) continue;
      const texts = new Set(
        slugs.map((s) => `${lessonRoomLinksEn[s]?.cta}||${lessonRoomLinksEn[s]?.why}`)
      );
      if (texts.size > 1) drift.push(slugs.join(" / "));
    }
    expect(drift, `bản Anh lệch nhau ở: ${drift.join("; ")}`).toEqual([]);
  });

  it("bản tiếng Anh không còn chữ tiếng Việt", () => {
    const DIACRITICS =
      /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
    const leaks: string[] = [];
    for (const [slug, patch] of Object.entries(lessonRoomLinksEn)) {
      for (const [field, text] of Object.entries(patch)) {
        if (typeof text === "string" && DIACRITICS.test(text)) leaks.push(`${slug}.${field}: ${text}`);
      }
    }
    expect(leaks, leaks.join("\n")).toEqual([]);
  });

  it("locale vi trả về đúng bản gốc", () => {
    const [slug, link] = Object.entries(LESSON_ROOM_LINKS)[0];
    expect(mergeLessonRoomLink(slug, link, "vi")).toBe(link);
  });
});
