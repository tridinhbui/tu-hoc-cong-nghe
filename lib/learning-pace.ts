/** Nhịp học người dùng tự đặt ở /lo-trinh, và phép tính đi kèm.
 *
 *  Tách ra khỏi LearningPathClient vì có HAI chỗ đọc cùng một nhịp và in ra
 *  cùng một câu "còn N bài, khoảng M tuần": trang /lo-trinh, và khối tóm tắt
 *  trên /hoc-bai. Chép công thức sang chỗ thứ hai thì hai con số sẽ lệch nhau
 *  ngay lần đầu ai đó đổi MEDIAN_LESSON_MINUTES hay cách làm tròn, và không có
 *  gì báo - người học thấy "12 tuần" ở trang này và "11 tuần" ở trang kia.
 *
 *  Khoá localStorage cũng ở đây, vì cùng lý do: hai chỗ gõ tay cùng một chuỗi
 *  thì lệch một ký tự là nhịp đặt ở trang này không hiện ở trang kia, và triệu
 *  chứng là "cài đặt không lưu" chứ không phải một lỗi đọc ra được. */

export const PACE_KEY = "thtcdn_path_pace";

/** Một bài mất khoảng bằng này phút, tính cả câu hỏi cuối bài. */
export const MEDIAN_LESSON_MINUTES = 6;

export interface Pace {
  perDay: 1 | 2;
  daysPerWeek: number;
}

export const DEFAULT_PACE: Pace = { perDay: 1, daysPerWeek: 5 };

/** Đọc nhịp đã lưu. Trả về nhịp mặc định nếu chưa đặt, JSON hỏng, hoặc đang
 *  chạy ở server - gọi được từ cả hai phía mà không phải bọc typeof window. */
export function readPace(): Pace {
  if (typeof window === "undefined") return DEFAULT_PACE;
  const saved = window.localStorage.getItem(PACE_KEY);
  if (!saved) return DEFAULT_PACE;
  try {
    const parsed = JSON.parse(saved) as Pace;
    // perDay chỉ nhận 1 hoặc 2 - đây là hai lựa chọn duy nhất trên giao diện,
    // và một giá trị khác lọt vào (bản cũ, người dùng sửa tay) sẽ làm phép chia
    // ra số tuần vô nghĩa thay vì fail rõ ràng.
    if (parsed?.perDay !== 1 && parsed?.perDay !== 2) return DEFAULT_PACE;
    const days = Number(parsed.daysPerWeek);
    if (!Number.isFinite(days) || days < 1 || days > 7) return DEFAULT_PACE;
    return { perDay: parsed.perDay, daysPerWeek: days };
  } catch {
    return DEFAULT_PACE;
  }
}

export function writePace(pace: Pace): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PACE_KEY, JSON.stringify(pace));
}

/** Bao nhiêu tuần để đi hết `count` bài với nhịp này. 0 nếu nhịp bằng 0 - chia
 *  cho 0 sẽ ra Infinity và in ra màn hình dưới dạng "khoảng ∞ tuần". */
export function weeksFor(count: number, perDay: number, daysPerWeek: number): number {
  const perWeek = perDay * daysPerWeek;
  return perWeek > 0 ? Math.ceil(count / perWeek) : 0;
}

/** Số phút mỗi ngày ở nhịp này. */
export function minutesPerDay(pace: Pace): number {
  return pace.perDay * MEDIAN_LESSON_MINUTES;
}

/** Nhận một nhịp từ NGUỒN NGOÀI (cột Supabase, JSON cũ) và trả về nhịp hợp lệ,
 *  hoặc null nếu chưa đặt.
 *
 *  Tách khỏi readPace vì hai nguồn có hình dạng khác nhau nhưng cùng một tập
 *  giá trị hợp lệ: localStorage giữ một object, Supabase giữ hai cột rời có thể
 *  NULL. Viết phép kiểm hai lần là để hai bên trôi khỏi nhau - và bên trôi sẽ
 *  là bên ít người đọc hơn.
 *
 *  Trả null chứ không trả DEFAULT_PACE: "chưa chọn" và "đã chọn đúng bằng mặc
 *  định" là hai trạng thái khác nhau, và chỉ nơi gọi mới biết cần phân biệt hay
 *  không. Cột trong CSDL cũng để NULL đúng vì lý do đó. */
export function paceFromParts(perDay: unknown, daysPerWeek: unknown): Pace | null {
  if (perDay !== 1 && perDay !== 2) return null;
  const days = Number(daysPerWeek);
  if (!Number.isFinite(days) || days < 1 || days > 7) return null;
  return { perDay, daysPerWeek: Math.trunc(days) };
}

/** Ngày dự kiến học xong `count` bài, tính từ `from`.
 *
 *  "Khoảng 28 tuần" là một con số khó cảm - nó đòi người đọc tự cộng vào lịch.
 *  Một ngày cụ thể thì không. Cả hai cùng hiện, vì con số tuần vẫn là thứ so
 *  sánh được giữa hai hướng học còn ngày thì không.
 *
 *  Làm tròn theo TUẦN chứ không theo ngày, vì `weeksFor` đã làm tròn lên tuần -
 *  cộng ngày lẻ vào một con số đã tròn tuần là giả vờ chính xác hơn thực tế. */
export function finishDate(count: number, pace: Pace, from: Date): Date | null {
  const weeks = weeksFor(count, pace.perDay, pace.daysPerWeek);
  if (weeks <= 0) return null;
  const d = new Date(from.getTime());
  d.setDate(d.getDate() + weeks * 7);
  return d;
}
