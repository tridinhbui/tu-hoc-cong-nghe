import { CFA_LEVEL_1_SUBJECTS, type CfaSubjectId } from "@/lib/cfa-track";

/** Nối THƯ VIỆN với LỘ TRÌNH - hai hệ nội dung trước giờ không biết nhau.
 *
 *  Thư viện là bốn quyển `Book` → `Reading` → `Module` nằm trong Supabase.
 *  Lộ trình mười môn là `CFA_LEVEL_1_SUBJECTS`, gắn với bài học trong repo.
 *  Chúng chưa từng có đường nối, nên trang CFA hiện bốn bìa sách y hệt nhau dù
 *  người học đang ở môn nào - không quyển nào nói được "quyển này là quyển bạn
 *  cần bây giờ".
 *
 *  Ánh xạ ở mức QUYỂN, không phải mức reading. Hai lý do:
 *
 *  1. Id quyển ổn định (bốn giá trị, đặt tay), còn tiêu đề reading là dữ liệu
 *     trong bảng - ai sửa một tiêu đề trên admin là bảng ánh xạ theo tiêu đề
 *     lệch ngay, mà không có gì báo.
 *  2. Mức quyển đã đủ trả lời câu người học hỏi: "giờ nên mở quyển nào". Chia
 *     nhỏ tới từng reading cho ra độ chính xác không ai dùng tới.
 *
 *  Ranh giới môn trong mỗi quyển đọc ra từ chính tiêu đề các reading của nó -
 *  ghi lại đây để lần sau ai kiểm còn biết nó dựa vào đâu:
 *
 *    book-1  quant (tỷ giá & lợi nhuận → hồi quy, big data)
 *            economics (chu kỳ kinh doanh → thị trường ngoại hối)
 *            corporate (hình thức tổ chức → mô hình kinh doanh)
 *    book-2  fsa (báo cáo kinh doanh → kỹ thuật phân tích tài chính)
 *            equity (tổ chức thị trường → định giá cổ phiếu)
 *    book-3  fixedIncome (công cụ thu nhập cố định → MBS)
 *            derivatives (đặc điểm thị trường phái sinh → mô hình nhị thức)
 *    book-4  alternatives (đầu tư thay thế → tài sản kỹ thuật số)
 *            portfolio (rủi ro & lợi nhuận danh mục → quản lý rủi ro)
 *            ethics (đạo đức & niềm tin → ứng dụng đạo đức, GIPS)
 */
export const CFA_BOOK_SUBJECTS: Record<string, CfaSubjectId[]> = {
  "book-1": ["quant", "economics", "corporate"],
  "book-2": ["fsa", "equity"],
  "book-3": ["fixedIncome", "derivatives"],
  "book-4": ["alternatives", "portfolio", "ethics"],
};

/** Quyển nào phục vụ môn đang học. `null` khi đã đi hết mười môn. */
export function booksForSubject(subjectId: CfaSubjectId | null): string[] {
  if (!subjectId) return [];
  return Object.entries(CFA_BOOK_SUBJECTS)
    .filter(([, subjects]) => subjects.includes(subjectId))
    .map(([bookId]) => bookId);
}

/** Môn mà một quyển phục vụ. Quyển ngoài bảng (SchweserNotes) trả mảng rỗng
 *  thay vì ném: giao diện chỉ lọc `book-*`, nhưng bảng dữ liệu còn bốn quyển
 *  Schweser và một ngày nào đó chúng có thể được hiện ra. */
export function subjectsForBook(bookId: string): CfaSubjectId[] {
  return CFA_BOOK_SUBJECTS[bookId] ?? [];
}

/** Mọi môn mà bảng này nhắc tới. Dùng trong bài kiểm để bắt lỗi bỏ sót môn. */
export function mappedSubjectIds(): Set<CfaSubjectId> {
  return new Set(Object.values(CFA_BOOK_SUBJECTS).flat());
}

/** Id môn hợp lệ, đọc từ nguồn thay vì chép lại. */
export function knownSubjectIds(): Set<CfaSubjectId> {
  return new Set(CFA_LEVEL_1_SUBJECTS.map((s) => s.id));
}
