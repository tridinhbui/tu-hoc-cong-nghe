/**
 * Dấu vân tay ngắn, ổn định, cho một chuỗi.
 *
 * FNV-1a. KHÔNG phải hàm băm mật mã và không dùng ở chỗ nào cần chống giả mạo -
 * hai chỗ gọi nó là mã chứng chỉ (để tra cứu) và dấu vân tay nội dung câu hỏi
 * (để biết câu hỏi có bị sửa từ lần trả lời trước không). Cả hai chỉ cần: cùng
 * đầu vào cho cùng kết quả, và hai đầu vào khác nhau gần như chắc chắn cho hai
 * kết quả khác nhau.
 *
 * Tính chất quan trọng nhất là ỔN ĐỊNH QUA THỜI GIAN: giá trị này được ghi vào
 * cơ sở dữ liệu rồi so lại ở lần chạy sau, có thể sau nhiều tháng và ở một bản
 * build khác. Vì thế đừng đổi thuật toán ở đây - đổi là mọi dấu vân tay đã lưu
 * thành vô nghĩa cùng lúc, và với quiz_mistakes thì hệ quả là toàn bộ lịch sử
 * câu sai của mọi người học bị bỏ qua trong im lặng.
 */
export function stableHash(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(36).toUpperCase().padStart(7, "0");
}

/** Chuẩn hoá trước khi băm nội dung câu hỏi.
 *
 *  Gộp khoảng trắng và bỏ phân biệt hoa thường, để một lần sửa lại cách xuống
 *  dòng trong lib/lessons.ts không bị đọc thành "câu hỏi đã đổi" rồi vứt lịch
 *  sử câu sai của người học đi. Dấu tiếng Việt thì GIỮ: "lãi" và "lai" là hai
 *  từ khác nhau. */
export function questionFingerprint(question: string): string {
  return stableHash(question.replace(/\s+/g, " ").trim().toLowerCase());
}
