import { describe, expect, it } from "vitest";
import { decodeBotEvent, encodeBotEvent, renderBotMessage, type StudyRoomBotEvent } from "@/lib/study-room-bot-messages";
import { format } from "@/lib/i18n";
import { vi } from "@/lib/i18n/dictionaries/vi";
import { en } from "@/lib/i18n/dictionaries/en";

/** Tin nhắn bot phòng học nhóm.
 *
 *  Hai route ghi thẳng vào `study_room_messages.content`, một hàng cho cả nhóm
 *  đọc chung, nên câu chữ phải dựng ở phía người xem chứ không ở phía ghi. Bộ
 *  kiểm này gác ba thứ, và cái thứ ba là cái dễ mất nhất khi ai đó sửa sau này. */

describe("tin nhắn bot phòng học", () => {
  it("mã hoá rồi giải mã ra đúng sự kiện ban đầu", () => {
    // Không dùng `as const`: nó làm `names` thành readonly tuple, còn
    // StudyRoomBotEvent khai báo `string[]` - tsc từ chối gán. Chú thích kiểu
    // tường minh vừa giữ được kiểm tra kiểu, vừa không đóng băng mảng.
    const events: StudyRoomBotEvent[] = [
      { kind: "daily-none" },
      { kind: "daily-all", count: 5 },
      { kind: "daily-partial", names: ["An", "Bình"], extra: 2, notYet: 3 },
      { kind: "rules", topic: "cfa", lessonCount: 324 },
    ];
    for (const event of events) {
      expect(decodeBotEvent(encodeBotEvent(event))).toEqual(event);
    }
  });

  /** ĐÂY LÀ PHÉP KIỂM QUAN TRỌNG NHẤT.
   *
   *  Mọi tin nhắn bot ghi TRƯỚC thay đổi này là câu văn tiếng Việt thuần nằm
   *  sẵn trong cơ sở dữ liệu, và không có đường nào dịch ngược chúng. Nếu
   *  decode ném lỗi hoặc trả về rỗng thay vì null, những dòng đó biến thành ô
   *  trống trong lịch sử chat của mọi nhóm - mất dữ liệu nhìn thấy được, do một
   *  thay đổi thuần trình bày gây ra. */
  it("tin nhắn cũ dạng câu văn vẫn hiện nguyên văn", () => {
    const legacy = [
      "Cập nhật hôm nay: chưa ai trong nhóm học bài nào cả 👀 Ai học đầu tiên hôm nay nào?",
      "Tài Tài đây 👋 Nhóm này đang học theo hướng CFA Level I, hiện có khoảng 324 bài.",
      "", // hàng rỗng cũng không được ném lỗi
      "thtcdn:bot:{hỏng", // JSON hỏng: rơi về nguyên văn thay vì vỡ
      "thtcdn:bot:null",
    ];
    for (const content of legacy) {
      expect(decodeBotEvent(content)).toBeNull();
      expect(renderBotMessage(content, vi.groupChat, format)).toBe(content);
    }
  });

  it("dựng câu theo đúng ngôn ngữ người đọc", () => {
    const partial = encodeBotEvent({
      kind: "daily-partial",
      names: ["An", "Bình"],
      extra: 2,
      notYet: 3,
    });
    const viText = renderBotMessage(partial, vi.groupChat, format);
    const enText = renderBotMessage(partial, en.groupChat, format);

    expect(viText).not.toBe(enText);
    // Tên người là dữ liệu, phải có nguyên vẹn ở CẢ HAI bản.
    for (const text of [viText, enText]) {
      expect(text).toContain("An");
      expect(text).toContain("Bình");
      expect(text).toContain("3");
      expect(text).toContain("2"); // phần "+2 người nữa"
    }
    // Không sót placeholder chưa thay.
    expect(viText).not.toMatch(/\{\w+\}/);
    expect(enText).not.toMatch(/\{\w+\}/);
  });

  it("ba chủ đề phòng đều dựng được câu luật, không sót placeholder", () => {
    for (const topic of ["personal", "professional", "cfa"] as const) {
      const content = encodeBotEvent({ kind: "rules", topic, lessonCount: 120 });
      for (const dict of [vi, en]) {
        const text = renderBotMessage(content, dict.groupChat, format);
        expect(text).toContain("120");
        expect(text).not.toMatch(/\{\w+\}/);
      }
    }
  });

  it("bản tiếng Anh không còn chữ tiếng Việt", () => {
    const DIACRITICS =
      /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
    // "Tài Tài" là TÊN của bot, giữ nguyên ở cả hai ngôn ngữ - bản EN của
    // `byAdmin` cũng viết "Tài Tài • group admin". Trừ nó ra trước khi soát,
    // đúng cách đã làm với "CPA Việt Nam" ở bản dịch nghề.
    const BOT_NAME = "Tài Tài";
    for (const content of [
      encodeBotEvent({ kind: "daily-none" }),
      encodeBotEvent({ kind: "daily-all", count: 4 }),
      encodeBotEvent({ kind: "rules", topic: "personal", lessonCount: 90 }),
    ]) {
      const text = renderBotMessage(content, en.groupChat, format).split(BOT_NAME).join("");
      expect(DIACRITICS.test(text), text).toBe(false);
    }
  });
});
