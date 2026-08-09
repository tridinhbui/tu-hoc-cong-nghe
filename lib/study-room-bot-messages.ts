/**
 * Tin nhắn của bot trong phòng học nhóm, lưu dưới dạng SỰ KIỆN chứ không phải
 * câu văn.
 *
 * VẤN ĐỀ. Hai route sinh tin nhắn bot ở server rồi `insert` thẳng vào
 * `study_room_messages.content`. Chuỗi đó là tiếng Việt, đã nằm trong cơ sở dữ
 * liệu, và cả nhóm đọc chung một hàng - nên không có chỗ nào để dịch theo người
 * xem. Chú thích cũ trong cả hai route nói đúng điều đó và dừng lại ở đó.
 *
 * AGENTS.md đã ghi cùng hình dạng cho `app/api/world-boss/route.ts`: "either the
 * route reads the locale, or it returns ids the client resolves". Hai lựa chọn,
 * và chúng không tương đương:
 *
 *   Route đọc locale lúc GHI thì ngôn ngữ bị đóng băng vào dữ liệu đã lưu. Một
 *   phòng có người Việt và người Anh sẽ nhận bản của bất kỳ ai kích hoạt cron,
 *   và đổi ngôn ngữ về sau không sửa được những dòng đã ghi.
 *
 *   Ghi ID để client dịch lúc HIỂN THỊ thì mỗi người đọc thấy tiếng của mình,
 *   kể cả với dòng ghi từ trước khi họ đổi ngôn ngữ. Đây là cách chọn.
 *
 * HÌNH DẠNG. `content` giữ nguyên kiểu `text` - không cần migration, không cần
 * cột mới. Sự kiện được mã hoá thành JSON kèm tiền tố nhận dạng:
 *
 *   thtcdn:bot:{"kind":"daily-none"}
 *
 * TƯƠNG THÍCH NGƯỢC là phần bắt buộc, không phải tuỳ chọn. Mọi dòng đã ghi
 * trước thay đổi này là câu văn tiếng Việt thuần, và không có đường nào dịch
 * ngược chúng. `decodeBotEvent` trả về null cho chúng, và `renderBotMessage`
 * in nguyên văn - người đọc tiếng Anh vẫn thấy tiếng Việt ở những dòng cũ, và
 * đó là kết quả đúng: bịa lại nội dung cũ tệ hơn là hiển thị nó như đã lưu.
 */

export type StudyRoomBotEvent =
  /** Chưa ai trong nhóm học hôm nay. */
  | { kind: "daily-none" }
  /** Cả nhóm đều đã học. */
  | { kind: "daily-all"; count: number }
  /** Một phần đã học: kèm tên vài người và số người còn lại. */
  | { kind: "daily-partial"; names: string[]; extra: number; notYet: number }
  /** Lời chào và luật khi phòng vừa lập. */
  | { kind: "rules"; topic: "personal" | "professional" | "cfa"; lessonCount: number };

const PREFIX = "thtcdn:bot:";

export function encodeBotEvent(event: StudyRoomBotEvent): string {
  return PREFIX + JSON.stringify(event);
}

/** Trả về null cho mọi dòng KHÔNG phải sự kiện - gồm cả tin nhắn bot cũ đã lưu
 *  dưới dạng câu văn, và cả JSON hỏng. Người gọi in nguyên `content` khi null. */
export function decodeBotEvent(content: string): StudyRoomBotEvent | null {
  if (!content.startsWith(PREFIX)) return null;
  try {
    const parsed = JSON.parse(content.slice(PREFIX.length)) as StudyRoomBotEvent;
    return parsed && typeof parsed.kind === "string" ? parsed : null;
  } catch {
    return null;
  }
}

/** Dựng câu cho người đọc hiện tại.
 *
 *  Nhận đúng phần từ điển cần dùng chứ không nhận cả `Dictionary`, để hàm này
 *  gọi được từ hai component đang dùng hai nhánh khoá khác nhau (`groupChat` ở
 *  FloatingStudyGroupChat, `studyGroups` ở StudyGroupsClient) mà không phải
 *  nhân đôi logic.
 *
 *  Trả về `content` nguyên văn khi không giải mã được - tin nhắn bot cũ đã lưu
 *  dạng câu văn rơi vào nhánh này. */
export interface BotMessageStrings {
  botDailyNone: string;
  botDailyAll: string;
  botDailyPartial: string;
  botDailyExtra: string;
  botRules: string;
  botTopicPersonal: string;
  botTopicProfessional: string;
  botTopicCfa: string;
}

export function renderBotMessage(
  content: string,
  s: BotMessageStrings,
  format: (template: string, values: Record<string, string | number>) => string
): string {
  const event = decodeBotEvent(content);
  if (!event) return content;

  switch (event.kind) {
    case "daily-none":
      return s.botDailyNone;
    case "daily-all":
      return format(s.botDailyAll, { count: event.count });
    case "daily-partial": {
      // Tên người là DỮ LIỆU, ghép ở đây chứ không dịch. Phần "+N bạn nữa" là
      // câu chữ nên nó có khoá riêng.
      const names =
        event.names.join(", ") +
        (event.extra > 0 ? format(s.botDailyExtra, { extra: event.extra }) : "");
      return format(s.botDailyPartial, { names, notYet: event.notYet });
    }
    case "rules": {
      const topic =
        event.topic === "personal"
          ? s.botTopicPersonal
          : event.topic === "professional"
            ? s.botTopicProfessional
            : s.botTopicCfa;
      return format(s.botRules, { topic, count: event.lessonCount });
    }
    default:
      return content;
  }
}
