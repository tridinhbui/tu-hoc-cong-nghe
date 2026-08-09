import { DEFAULT_LOCALE, type Locale } from "./locales";

/**
 * Hai mẩu lặp lại ở MỌI lớp phủ dịch dữ liệu (`lib/<tên>-i18n/`).
 *
 * VÌ SAO TÁCH RA, và lý do thứ hai quan trọng hơn lý do thứ nhất.
 *
 * Lý do thứ nhất là bớt trùng: bảy lớp phủ đang chép lại cùng một `BY_LOCALE`
 * cộng cùng một phép so `locale === "vi"`.
 *
 * Lý do thứ hai là `mergePositional`. Mảng trong một bản dịch là mảng THEO VỊ
 * TRÍ - phần tử i của bản Anh dịch phần tử i của bản Việt - và khi độ dài lệch
 * thì thứ mất không phải là chữ mà là ĐÁP ÁN: `correct` của quiz là chỉ số vào
 * chính mảng đó, `steps` của bài xếp thứ tự LÀ đáp án, và `affectedSectors` là
 * khoá ghép. Nên mọi lớp phủ đều phải có cùng một bộ chắn "lệch độ dài thì bỏ
 * nguyên mảng, giữ bản gốc" - và một bộ chắn được chép bảy lần là một bộ chắn
 * sẽ có lần thứ tám viết thiếu. Ở đây nó chỉ có một bản.
 *
 * Hỏng theo chiều an toàn: lệch độ dài trả về bản gốc, tức người đọc thấy tiếng
 * Việt. Đó là kết quả xấu nhưng đọc được, khác hẳn với việc gán định nghĩa của
 * mục này lên tên của mục khác.
 */

/** Bản dịch cho `locale`, hoặc `null` khi không cần dịch.
 *
 *  `null` cho chính ngôn ngữ gốc là điểm quan trọng: chỗ gọi trả về đúng đối
 *  tượng nguồn (cùng tham chiếu) thay vì một bản sao đã ghép, nên `toBe(source)`
 *  vẫn đúng và React không thấy một tham chiếu mới ở mỗi lần dựng. */
export function overlayFor<T>(
  byLocale: Readonly<Record<string, T>>,
  locale: Locale
): T | null {
  return locale === DEFAULT_LOCALE ? null : (byLocale[locale] ?? null);
}

/** Ghép một mảng bản dịch lên mảng gốc THEO VỊ TRÍ.
 *
 *  Trả về `null` khi không ghép được - thiếu bản dịch, hoặc lệch độ dài - để
 *  chỗ gọi tự quyết định dùng lại chính mảng gốc. Trả `null` thay vì trả bản
 *  sao của mảng gốc là có ý: một số chỗ gọi cần giữ NGUYÊN tham chiếu cũ. */
export function mergePositional<S, P>(
  source: readonly S[],
  patch: readonly P[] | undefined,
  merge: (item: S, translated: P) => S
): S[] | null {
  if (!patch || patch.length !== source.length) return null;
  return source.map((item, i) => merge(item, patch[i]));
}
