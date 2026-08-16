import totals from "@/lib/lessons-data/_track-totals.json";

/**
 * Số bài và số giờ THẬT của từng chặng, sinh ra từ kho bài.
 *
 * VÌ SAO CÓ FILE NÀY. `estimatedHours` trước đây là hằng số gõ tay trong
 * lib/tracks.ts và lib/track-stages.ts, và cả ba chặng đều đã lệch:
 *
 *     chặng            khai      thật
 *     cá nhân          10 giờ    21,9 giờ
 *     chuyên nghiệp    18 giờ    48,8 giờ
 *     CFA              27 giờ    38,6 giờ
 *
 * Không ai nói dối: con số được gõ một lần lúc chặng còn vài chục bài, rồi kho
 * bài đi tiếp còn con số thì đứng yên. Cùng đúng cái lỗi mà chú thích đầu
 * components/CfaTrackView.tsx ghi lại cho banner flashcard ("500+ thuật ngữ"
 * khi bộ thẻ có 75).
 *
 * Bảng tổng do scripts/generate-lesson-data.mjs sinh cùng lúc với
 * lib/lessons-data/, tức là mỗi lần thêm hay sửa bài. Nhập JSON tĩnh nên dùng
 * được ở cả server lẫn client, và nó chỉ có ba dòng số - khác _index.json 814
 * mục, thứ không nên đi xuống trình duyệt.
 */

/** `cfa` KHÔNG phải chặng thứ tư - nó là một lớp ánh xạ trên chính bài của ba
 *  chặng kia, nên nó có mặt ở đây để tra số giờ nhưng không được cộng vào
 *  TOTAL_LESSONS. Xem chú thích cùng nội dung trong
 *  scripts/generate-lesson-data.mjs. */
export type TrackTotalsId = "personal" | "professional" | "bonus" | "cfa";

interface TrackTotal {
  lessons: number;
  minutes: number;
  /** Bài không khai `totalMinutes`. Lớn hơn 0 nghĩa là số giờ đang THẤP hơn
   *  thực tế, và khâu sinh dữ liệu in cảnh báo khi gặp. */
  missingMinutes: number;
}

// `?? {}` vì scripts/generate-lesson-data.mjs nạp CHÍNH file này trong lúc
// nó đang sinh ra _track-totals.json - vòng lặp mà chú thích `requireShim`
// trong script đó mô tả, kèm lời dặn rằng chỗ phải chịu được tệp rỗng là đây.
// Vòng lặp đã xảy ra thật: một lượt chạy dọn sạch lib/lessons-data rồi hỏng
// giữa chừng, và từ đó mọi lượt sau đều chết ở dòng này. Giá trị rỗng chỉ
// sống trong lượt chạy đang sinh dữ liệu; bản build thật luôn đọc file đầy đủ.
const TRACKS = (totals.tracks ?? {}) as Partial<Record<TrackTotalsId, TrackTotal>>;

const EMPTY: TrackTotal = { lessons: 0, minutes: 0, missingMinutes: 0 };

export function trackTotals(track: TrackTotalsId): TrackTotal {
  return TRACKS[track] ?? EMPTY;
}

/** Số giờ của một chặng, làm tròn tới 0,5 giờ.
 *
 *  Làm tròn nửa giờ chứ không lấy số nguyên: 21,9 → 22 thì mất thông tin ít,
 *  nhưng 12,3 → 12 và 12,7 → 13 đọc ra như hai chặng khác nhau trong khi chênh
 *  nhau hai mươi phút. Nửa giờ là mức chi tiết mà một ước lượng thời gian học
 *  chịu được, và cũng là mức người đọc dùng được để xếp lịch.
 *
 *  Làm tròn về mốc GẦN NHẤT, nên nó có thể xuống (48,6 → 48,5) cũng như lên
 *  (21,9 → 22). Sai số tối đa mười lăm phút trên một con số hàng chục giờ, và
 *  ở cỡ đó thì không đáng đổi lấy một quy tắc phức tạp hơn. */
export function trackHours(track: TrackTotalsId): number {
  return Math.round((trackTotals(track).minutes / 60) * 2) / 2;
}

/** Tổng số bài đang hiện, mọi chặng. */
export const TOTAL_LESSONS: number = totals.totalLessons ?? 0;

/** Tổng thời lượng mọi chặng, tính bằng phút. */
export const TOTAL_MINUTES: number = totals.totalMinutes ?? 0;

/** Số bài làm tròn XUỐNG bội của mười, cho những câu quảng cáo dạng "{n}+".
 *
 *  Làm tròn xuống chứ không lên: dấu "+" hứa rằng con số thật LỚN HƠN hoặc
 *  bằng, nên làm tròn lên là biến một lời hứa đúng thành một lời hứa sai. */
export function roundedLessonCount(total: number = TOTAL_LESSONS): number {
  return Math.floor(total / 10) * 10;
}

/** CẢNH BÁO KHI DÙNG TOTAL_LESSONS.
 *
 *  Con số này đếm mọi bài trong kho lúc build. Nó KHÔNG bằng con số dashboard
 *  hiện ("3 / 778"): dashboard lọc thêm theo cờ `is_visible` trong bảng
 *  `lessons` trên Supabase, thứ chỉ biết được lúc chạy và do quản trị viên
 *  đặt. Chênh lệch hiện tại là 36 bài đang bị ẩn.
 *
 *  Nên dùng TOTAL_LESSONS cho câu chữ giới thiệu (trang chủ, trang đăng nhập -
 *  nơi chưa có phiên đăng nhập để hỏi Supabase), và dùng số đã lọc cho mọi chỗ
 *  nói về tiến độ của một người học cụ thể. Đổi chỗ hai con số này cho nhau là
 *  cách sinh ra một lỗi không ai thấy: cả hai đều là số thật, chỉ trả lời hai
 *  câu hỏi khác nhau. */
