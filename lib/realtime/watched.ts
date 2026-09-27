/**
 * Realtime trên Cloudflare: những gì CẢ máy chủ lẫn trình duyệt cùng phải đồng ý.
 *
 * Tệp này thuần - không import runtime nào - vì nó được dùng ở ba nơi chạy trên
 * ba môi trường khác nhau: lớp D1 phía máy chủ (Next trên Workers), worker tuỳ
 * biến chặn `/realtime/*` (Workers thuần, chạy TRƯỚC Next), và client trình duyệt.
 */

/**
 * Bảng mà client nghe `postgres_changes`. Đo bằng grep trên lib/cloudflare-*.ts,
 * không đoán; `lib/__tests__/realtime-watched.test.ts` đỏ khi có module nghe
 * một bảng không nằm ở đây, vì khi đó lệnh ghi vào bảng ấy sẽ không phát tín
 * hiệu nào và giao diện đứng im mà không lỗi nào báo.
 */
export const WATCHED_TABLES = [
  "bug_report_messages",
  "bug_reports",
  "chat_messages",
  "community_notifications",
  "community_post_comments",
  "community_post_reactions",
  "community_posts",
  "direct_messages",
  "study_room_members",
  "study_room_messages",
  "user_friendships",
] as const;

export type WatchedTable = (typeof WATCHED_TABLES)[number];
const WATCHED = new Set<string>(WATCHED_TABLES);

export function isWatchedTable(table: string): table is WatchedTable {
  return WATCHED.has(table);
}

export type RealtimeEvent = "INSERT" | "UPDATE" | "DELETE";

/**
 * Tín hiệu "bảng X vừa đổi". CỐ Ý không mang nội dung hàng.
 *
 * `postgres_changes` của Supabase tôn trọng RLS: người nghe chỉ nhận hàng họ
 * được phép đọc. Một hub phát nguyên hàng cho mọi người đang nghe bảng
 * `direct_messages` là rò tin nhắn riêng ra ngoài hai người trong cuộc. Nên hub
 * chỉ phát `id`, và client tự đọc lại hàng đó qua /api/db - nơi policy registry
 * ép quyền. Người không được đọc thì lần đọc lại trả rỗng và handler không chạy.
 *
 * `id` là null khi không biết hàng nào bị chạm: câu UPDATE/DELETE thô không có
 * RETURNING, hoặc bảng khoá ghép. Khi đó chỉ handler KHÔNG nhận tham số (loại
 * `() => refetch()`) được gọi - handler đọc `payload.new` không bao giờ nhận
 * một hàng rỗng giả vờ là hàng thật.
 */
export type ChangeSignal = { table: WatchedTable; event: RealtimeEvent; id: number | null };

export type WriteKind = { table: WatchedTable; event: RealtimeEvent };

/**
 * Câu SQL này có ghi vào một bảng được theo dõi không, và là loại ghi nào.
 *
 * Trả null với mọi thứ không nhận ra - kể cả câu ghi dạng `WITH ... INSERT`.
 * Null nghĩa là KHÔNG PHÁT, tức giao diện có thể trễ một nhịp, chứ không phải
 * lộ dữ liệu: sai về phía an toàn. Nhưng im lặng vẫn là im lặng, nên bộ kiểm
 * chạy bộ phân loại này trên MỌI câu ghi vào bảng được theo dõi trong
 * lib/d1/rpc.ts và đòi nhận ra hết.
 *
 * UPSERT (`INSERT ... ON CONFLICT DO UPDATE`) báo là INSERT. Supabase báo đúng
 * kết quả thật; ở đây không biết được hàng đã có sẵn hay chưa. Chấp nhận được
 * vì cả năm module đều xử INSERT và UPDATE bằng cùng một hàm gộp theo id.
 */
export function classifyWrite(sql: string): WriteKind | null {
  const s = sql.replace(/^(\s|--[^\n]*\n|\/\*[\s\S]*?\*\/)+/, "");
  let m = s.match(/^insert\s+(?:or\s+(?:replace|ignore|abort|rollback|fail)\s+)?into\s+"?([A-Za-z_][A-Za-z0-9_]*)"?/i);
  if (m) return isWatchedTable(m[1]) ? { table: m[1], event: "INSERT" } : null;
  m = s.match(/^update\s+(?:or\s+(?:replace|ignore|abort|rollback|fail)\s+)?"?([A-Za-z_][A-Za-z0-9_]*)"?\s/i);
  if (m) return isWatchedTable(m[1]) ? { table: m[1], event: "UPDATE" } : null;
  m = s.match(/^delete\s+from\s+"?([A-Za-z_][A-Za-z0-9_]*)"?/i);
  if (m) return isWatchedTable(m[1]) ? { table: m[1], event: "DELETE" } : null;
  return null;
}

/**
 * Một lệnh ghi trả về MỘT tín hiệu cho mỗi hàng, tới mức này. Quá mức thì gộp
 * thành một tín hiệu cấp bảng: đánh dấu đã đọc 400 tin nhắn không nên thành
 * 400 lần mỗi client đọc lại một hàng.
 */
export const MAX_ROW_SIGNALS = 50;

type ResultLike = {
  results?: unknown;
  meta?: { changes?: number; last_row_id?: number | null };
} | null | undefined;

/** Rút tín hiệu từ kết quả D1 của một câu ghi đã THÀNH CÔNG. */
export function signalsFromResult(kind: WriteKind, result: ResultLike): ChangeSignal[] {
  // Không hàng nào đổi thì không có gì để báo. UPDATE khớp 0 hàng là chuyện
  // thường (đánh dấu đã đọc khi đã đọc rồi), và phát tín hiệu cho nó sẽ khiến
  // mọi người nghe đọc lại vô ích.
  if (result?.meta?.changes === 0) return [];

  const rows = Array.isArray(result?.results) ? (result!.results as Record<string, unknown>[]) : [];
  const ids = rows.map((r) => toId(r?.id)).filter((x): x is number => x !== null);

  if (ids.length && ids.length === rows.length) {
    if (ids.length > MAX_ROW_SIGNALS) return [{ ...kind, id: null }];
    return [...new Set(ids)].map((id) => ({ ...kind, id }));
  }

  // INSERT một hàng không có RETURNING: D1 vẫn cho biết rowid vừa cấp. Với bảng
  // khoá INTEGER PRIMARY KEY, rowid CHÍNH LÀ id - đúng mười trên mười một bảng
  // được theo dõi.
  const last = toId(result?.meta?.last_row_id);
  if (kind.event === "INSERT" && result?.meta?.changes === 1 && last !== null) {
    return [{ ...kind, id: last }];
  }
  return [{ ...kind, id: null }];
}

function toId(v: unknown): number | null {
  if (typeof v === "number" && Number.isSafeInteger(v) && v > 0) return v;
  if (typeof v === "bigint" && v > BigInt(0) && v <= BigInt(Number.MAX_SAFE_INTEGER)) return Number(v);
  if (typeof v === "string" && /^[1-9][0-9]{0,15}$/.test(v)) return Number(v);
  return null;
}

/**
 * Tên Durable Object. Hai họ, tách bằng tiền tố để một chủ đề presence không bao
 * giờ trùng tên với hub của một bảng:
 *
 *   table:<bảng>  - tín hiệu thay đổi dữ liệu, máy chủ phát
 *   topic:<tên>   - presence + broadcast, client với client
 */
export function hubNameForTable(table: WatchedTable) {
  return `table:${table}`;
}

export function hubNameForTopic(topic: string) {
  return `topic:${topic}`;
}

const TOPIC_RE = /^[A-Za-z0-9_\-.:]{1,120}$/;

/**
 * Tên hub nào được phép mở từ trình duyệt.
 *
 * Mỗi tên là một Durable Object riêng, tạo ra khi lần đầu có người gọi. Không
 * gác thì ai cũng dựng được vô hạn đối tượng bằng cách đổi tên trong URL. Hub
 * bảng chỉ nhận đúng mười một bảng; hub chủ đề nhận một bảng chữ hẹp.
 */
export function isValidHubName(name: string): boolean {
  if (name.startsWith("table:")) return isWatchedTable(name.slice(6));
  if (name.startsWith("topic:")) return TOPIC_RE.test(name.slice(6));
  return false;
}
