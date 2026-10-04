import type { LessonSectionBlock } from "../lesson-types";

// Khối `sim` cho các nhiệm vụ chưa có bài ở đợt hai (git-tag, orphan-volumes, distinct-city,
// date-range, case-price-tier, undelivered-products). Được phép nhúng vào bài đã có bản dịch
// tiếng Anh - khi đó bản dịch phải được chèn khối sim tương ứng.
export const Q06_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "chat-luong-du-lieu": [
    {
      type: "sim",
      tool: "sql",
      mission: "distinct-city",
      title: "Liệt kê giá trị khác nhau của một cột",
      task: "Một trong bốn phép kiểm trên bảng mới nhận là nhìn xem cột có những giá trị nào, mỗi giá trị đúng một lần, để thấy ngay chỗ viết lệch hoặc lạ. Trong bảng khách hàng của trình mô phỏng, viết truy vấn lấy cột thành phố với DISTINCT để mỗi thành phố chỉ hiện một dòng, dù có nhiều khách ở đó.",
    },
  ],
  "ngay-thang-luu-dang-chu-doi-ngay-sang-ngay-that": [
    {
      type: "sim",
      tool: "sql",
      mission: "date-range",
      title: "Lọc đơn trong một tháng khi ngày là chữ",
      task: "Bài này bắt đầu từ việc lọc doanh thu một tháng mà ngày lưu như chữ. Trong cơ sở dữ liệu, ngày viết dạng năm-tháng-ngày vẫn sắp và so sánh đúng thứ tự, nên lọc theo khoảng được. Viết truy vấn lấy mã các đơn đặt từ đầu đến cuối tháng 8 năm 2026 bằng BETWEEN, và để ý đơn đặt đúng ngày mùng 1 không được rơi mất.",
    },
  ],
  "tong-ket-co-so-du-lieu": [
    {
      type: "sim",
      tool: "sql",
      mission: "undelivered-products",
      title: "Tìm sản phẩm chưa từng nằm trong đơn đã giao",
      task: "Bài tổng kết nhắc lỗi im lặng: ghép bảng làm biến mất thực thể không có bản ghi con, và truy vấn vẫn trả về con số trông hợp lý. Ở đây mọi sản phẩm đều từng có trong chi tiết đơn, nên chỉ nhìn một bảng là sai. Viết truy vấn lấy tên các sản phẩm chưa nằm trong đơn nào có trạng thái đã giao, bằng truy vấn con hoặc LEFT JOIN với điều kiện trạng thái đặt đúng chỗ.",
    },
  ],
};
