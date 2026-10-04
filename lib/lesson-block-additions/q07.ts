import type { LessonSectionBlock } from "../lesson-types";

// Khối `sim` cho nhiệm vụ SQL ghi dữ liệu / chỉ mục (INSERT, UPDATE, DELETE, EXPLAIN).
export const Q07_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "giao-dich-co-so-du-lieu": [
    {
      type: "sim",
      tool: "sql",
      mission: "rollback-delete",
      title: "Thử lệnh xoá nguy hiểm trong một giao dịch",
      task: "Bài vừa nói giao dịch là một khối mà hoặc trọn vẹn, hoặc không để lại dấu vết. Trong SQL Console, hãy mở giao dịch bằng BEGIN, xoá toàn bộ bảng orders, đếm lại để thấy bảng trống, rồi ROLLBACK và kiểm tra cả 16 đơn đã trở về. Bạn sẽ thấy rõ ranh giới giữa thay đổi tạm và thay đổi đã lưu.",
    },
  ],
  "giao-dich-va-tinh-toan-ven": [
    {
      type: "sim",
      tool: "sql",
      mission: "update-one-price",
      title: "Sửa một dòng, và cái bẫy của UPDATE quên WHERE",
      task: "Bài nói thao tác ghi nên có điều kiện chặt và nên thử trong giao dịch trước khi tin. Đổi giá của đúng một sản phẩm trong bảng products bằng UPDATE có WHERE, đọc số dòng bị tác động mà bảng kết quả báo, và thử cả bản quên WHERE bên trong BEGIN ... ROLLBACK để thấy một câu lệnh sai chạm vào mọi dòng ra sao.",
    },
  ],
  "chi-muc-trong-co-so-du-lieu": [
    {
      type: "sim",
      tool: "sql",
      mission: "create-index-search",
      title: "Từ SCAN đến SEARCH bằng một chỉ mục",
      task: "Bài giải thích chỉ mục biến việc đọc cả bảng thành vài bước nhảy. Trong SQL Console, chạy EXPLAIN QUERY PLAN cho truy vấn tìm đơn của một khách để thấy SCAN, tạo chỉ mục trên cột customer_id của bảng orders, rồi chạy lại đúng truy vấn đó để thấy kế hoạch đổi thành SEARCH. Thử thêm một chỉ mục trên cột khác để thấy nó không giúp gì cho truy vấn này.",
    },
  ],
  "chi-muc-va-toc-do-truy-van": [
    {
      type: "sim",
      tool: "sql",
      mission: "create-index-search",
      title: "Chứng minh chỉ mục có tác dụng bằng kế hoạch truy vấn",
      task: "Bài nhắc rằng đánh chỉ mục phải dựa trên truy vấn thật và phải xem lại kế hoạch sau khi đổi. Hãy làm đúng quy trình đó: EXPLAIN QUERY PLAN cho SELECT * FROM orders WHERE customer_id = 1, tạo chỉ mục trên customer_id, rồi chạy lại EXPLAIN để xác nhận dòng kế hoạch chuyển từ SCAN sang SEARCH. Dữ liệu mẫu chỉ có 16 đơn nên bạn sẽ không đo được tốc độ, nhưng kế hoạch cho thấy cách truy cập đã đổi.",
    },
  ],
  "doc-ke-hoach-thuc-thi": [
    {
      type: "sim",
      tool: "sql",
      mission: "create-index-search",
      title: "Đọc kế hoạch trước và sau khi thêm chỉ mục",
      task: "Kế hoạch thực thi là chỗ cơ sở dữ liệu nói nó định đi vào bảng bằng cách nào. Trong SQL Console, xem kế hoạch của một truy vấn lọc theo customer_id trên bảng orders (SCAN cả bảng), tạo một chỉ mục phù hợp, rồi đọc lại kế hoạch để thấy SEARCH ... USING INDEX. Mô phỏng chỉ in cách truy cập một bảng, không in ước lượng chi phí.",
    },
  ],
  "truy-van-cham-va-ke-hoach-thuc-thi": [
    {
      type: "sim",
      tool: "sql",
      mission: "create-index-search",
      title: "Khi truy vấn thật sự chậm: xem kế hoạch rồi sửa",
      task: "Sau khi loại trừ N cộng một, bước tiếp theo là xem kế hoạch của truy vấn đang nghi ngờ. Hãy EXPLAIN QUERY PLAN câu SELECT * FROM orders WHERE customer_id = 1, nhận ra nó đang quét toàn bảng, thêm chỉ mục cho cột lọc rồi EXPLAIN lại để xác nhận bằng chính kế hoạch chứ không bằng cảm giác.",
    },
  ],
  "han-muc-va-nguong-xet-duyet": [
    {
      type: "sim",
      tool: "sql",
      mission: "delete-cancelled",
      title: "Xoá đúng những dòng cần xoá, và nhìn con số trước khi tin",
      task: "Bài nói mọi thao tác xoá hàng loạt cần một trần để giới hạn thiệt hại khi sai. Trong SQL Console, chạy trước SELECT với đúng điều kiện để đếm số đơn cancelled, rồi DELETE FROM orders với WHERE tương ứng và đối chiếu số dòng được báo. Bạn cũng có thể thử bản quên WHERE trong BEGIN ... ROLLBACK để thấy một câu xoá quên điều kiện chạm tới bao nhiêu dòng, và vì sao cần một trần chặn trước.",
    },
  ],
  "co-so-du-lieu-la-gi": [
    {
      type: "sim",
      tool: "sql",
      mission: "update-accessories",
      title: "Sửa dữ liệu ngay trong cơ sở dữ liệu bằng một UPDATE",
      task: "Bài cho thấy một câu UPDATE tính thẳng trên giá trị hiện có tránh được kiểu đọc rồi ghi đè làm mất cập nhật. Trong SQL Console, giảm 50.000 đ cho các sản phẩm thuộc danh mục Phụ kiện đang có giá trên 500.000 đ bằng một UPDATE duy nhất với SET price = price - 50000 và WHERE đủ hai điều kiện, rồi kiểm tra bằng SELECT rằng sản phẩm khác không bị đụng tới.",
    },
  ],
  "khoa-chinh-khoa-ngoai-va-quan-he": [
    {
      type: "sim",
      tool: "sql",
      mission: "insert-customer",
      title: "Thêm một khách hàng và để khoá chính tự cấp số",
      task: "Bài nói khoá chính phải duy nhất và không trống. Trong SQL Console, thêm một khách mới vào bảng customers bằng INSERT mà không liệt kê cột id, rồi SELECT để xem bộ máy tự cấp số kế tiếp. Sau đó thử INSERT lại với một id đã có để đọc thông báo trùng khoá chính. Mô phỏng này không ép khoá ngoại, nên phần khoá ngoại bạn vẫn làm ở bài tập code của bài.",
    },
  ],
};
