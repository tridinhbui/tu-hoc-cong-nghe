/** Bỏ tiền tố "Chặng N, Bài M:" khi tiêu đề đã nằm SẴN trong thẻ chặng đó.
 *
 *  Thẻ chặng trên dashboard đã có huy hiệu "CHẶNG 1" ở trên và số thứ tự bài ở
 *  bên cạnh, rồi từng dòng bên trong lại mở đầu bằng "Chặng 1, Bài 1:",
 *  "Chặng 1, Bài 2:"... Một người học hỏi thẳng: "vì sao trong stage 1 lại có
 *  thêm stage 1?".
 *
 *  Nó không chỉ thừa. Tiền tố chiếm 15-18 ký tự ĐẦU dòng, nên khi tiêu đề bị
 *  cắt thì phần bị mất đúng là phần nói bài này dạy gì - cùng người học ấy báo
 *  luôn: "e ko biết nội dung mình đang học là bài gì".
 *
 *  BỎ Ở CHỖ HIỂN THỊ, KHÔNG BỎ Ở DỮ LIỆU, và khác hẳn `stripLessonDayPrefixes`
 *  ở điểm này. Tiền tố "Day N" bị gỡ khỏi dữ liệu vì con số ấy là một nguồn sự
 *  thật thứ hai đã trôi khỏi id. Còn "Chặng N, Bài M" thì `stage-numbering.test`
 *  đang gác cho khớp chặng thật, và ở NGOÀI thẻ chặng - trang bài học, tìm
 *  kiếm, dấu trang, sổ tay - nó là ngữ cảnh duy nhất cho biết bài nằm ở đâu.
 *
 *  "Tổng ôn chặng N" KHÔNG bị đụng tới: đó là tên bài, không phải tiền tố. */
const STAGE_LESSON_PREFIX = /^(?:Chặng\s*\d+,\s*Bài\s*\d+|Stage\s*\d+,\s*Lesson\s*\d+)\s*:\s*/i;

export function stripStageLessonPrefix(title: string): string {
  const stripped = title.replace(STAGE_LESSON_PREFIX, "");
  // Một tiêu đề CHỈ có tiền tố thì bỏ đi là còn chuỗi rỗng - trả lại bản gốc
  // còn hơn hiện một dòng trống.
  return stripped.trim() ? stripped : title;
}
