import type { LessonSectionBlock } from "../lesson-types";

// Khối `sim` đợt hai - nhiệm vụ mới của trình mô phỏng. Một người viết cho một tệp.
export const Q04_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "tham-so-bo-loc-va-phan-trang-api": [
    {
      type: "sim",
      tool: "api",
      mission: "sortExpensive",
      title: "Nhờ API sắp xếp và chỉ trả ba dòng",
      task: "Bài vừa cho thấy tham số truy vấn quyết định API trả về phần nào của dữ liệu. Trong trình mô phỏng, gọi GET /v1/products với sort = -price và limit = 3 ở tab Params để lấy đúng ba sản phẩm đắt nhất, giá giảm dần. Dấu trừ nghĩa là giảm dần, và việc sắp xếp nằm ở phía máy chủ chứ không phải app.",
    },
  ],
  "phan-trang-va-tap-ket-qua-lon": [
    {
      type: "sim",
      tool: "api",
      mission: "paginateAll",
      title: "Đi hết danh sách bằng con trỏ",
      task: "Bài nói về việc đừng kéo về thứ bạn không hiển thị. Hãy gọi GET /v1/products với limit nhỏ hơn tổng số sản phẩm, chép next_cursor trong phản hồi rồi gọi tiếp với tham số cursor, cứ thế cho tới khi mọi sản phẩm đã xuất hiện. Xin một lần limit=100 không được tính.",
    },
  ],
  "xac-thuc-khoa-api-va-ma-thong-bao": [
    {
      type: "sim",
      tool: "api",
      mission: "apiKeyHeader",
      title: "Gửi khoá API trong header",
      task: "Khoá API là bí mật nên phải đi trong header, không nằm trong URL. Ở tab Headers, thêm X-API-Key với khoá pk_demo_5f3a9c rồi gọi GET /v1/partner/inventory để xem tồn kho như một đối tác, và nhận 200 OK.",
    },
  ],
  "goi-api-dau-tien-tu-dong-lenh-toi-ma": [
    {
      type: "sim",
      tool: "api",
      mission: "apiKeyHeader",
      title: "Gọi một API bằng khoá trong header",
      task: "Bạn đã thấy một lời gọi API gồm phương thức, địa chỉ và header. Giờ hãy làm lại điều đó trong trình mô phỏng: thêm header X-API-Key = pk_demo_5f3a9c ở tab Headers rồi gọi GET /v1/partner/inventory. Không có header này, khoá sẽ phải nằm trong URL, nơi nó bị lưu lại trong nhật ký.",
    },
  ],
  "json-va-cach-doc-tai-lieu-api": [
    {
      type: "sim",
      tool: "api",
      mission: "contentType415",
      title: "Vì sao body phải là JSON",
      task: "Bài nhấn mạnh kỹ năng thật là đọc tài liệu rồi kiểm chứng nó bằng một lượt gọi. Tài liệu giả định ở đây nói body của yêu cầu tạo sản phẩm là JSON. Hãy kiểm chứng: gửi POST /v1/products với body Text và xem lỗi 415, sau đó chọn JSON với name, price, category rồi gửi lại cho tới khi nhận 201 Created.",
    },
  ],
  "phien-ban-api": [
    {
      type: "sim",
      tool: "api",
      mission: "migrateV2",
      title: "Đọc ngày ngừng v1 rồi sang v2",
      task: "Một phiên bản cũ thường được báo tắt trước bằng header. Gọi GET /v1/products, mở tab Headers của phản hồi để đọc Deprecation và Sunset, rồi gọi GET /v2/products để xem dữ liệu đổi hình dạng thế nào. Trong mô phỏng này v2 chỉ có phần đọc sản phẩm.",
    },
  ],
  "so-phien-ban-la-mot-loi-hua": [
    {
      type: "sim",
      tool: "api",
      mission: "migrateV2",
      title: "Lời hứa của v1 và lời mời sang v2",
      task: "Số phiên bản là lời hứa về việc không đổi hình dạng dữ liệu, và khi hết hạn lời hứa thì phải báo trước. Gọi GET /v1/products, đọc ngày ghi ở header Sunset của phản hồi, rồi gọi GET /v2/products để so hình dạng dữ liệu mới.",
    },
  ],
  "ma-trang-thai-phan-hoi": [
    {
      type: "sim",
      tool: "api",
      mission: "fixFromErrorDetails",
      title: "Đọc 400 để sửa đúng chỗ sai",
      task: "Mã 4xx cho biết lỗi nằm ở yêu cầu, và thân phản hồi nói cụ thể chỗ nào. Gửi POST /v1/products với {\"price\": \"abc\", \"category\": \"toy\"}, đọc mảng details trong lỗi 400 để thấy từng trường sai, rồi sửa đúng những trường đó và gửi lại cho tới khi nhận 201 Created.",
    },
  ],
  "api-la-hop-dong": [
    {
      type: "sim",
      tool: "api",
      mission: "fixFromErrorDetails",
      title: "Hợp đồng nói trường nào sai",
      task: "Bài nói hợp đồng API là mọi thứ phía gọi nhìn thấy, kể cả thông báo lỗi. Hãy đứng ở phía người gọi: gửi một yêu cầu POST /v1/products sai từ hai trường trở lên, đọc details trong lỗi 400 (đây là phần hợp đồng nói rõ sai ở đâu), sửa từng trường theo đó rồi gửi lại để tạo được sản phẩm.",
    },
  ],
  "ra-soat-phan-quyen-vai-tro-va-han-muc": [
    {
      type: "sim",
      tool: "api",
      mission: "authVsPermission",
      title: "Chưa đăng nhập khác với không đủ quyền",
      task: "Rà soát phân quyền là rà vế 'được làm gì', còn vế 'là ai' đã xong trước đó; mô phỏng giúp thấy hai vế tách nhau. Gọi GET /v1/admin/stats khi chưa có token để nhận 401, đăng nhập bằng POST /v1/login, đặt Auth kiểu Bearer rồi gọi lại và xem mã đổi thành 403 Forbidden: đã xác thực nhưng vai trò không đủ quyền.",
    },
  ],
  "doc-mot-he-thong-xac-thuc": [
    {
      type: "sim",
      tool: "api",
      mission: "authVsPermission",
      title: "Tái hiện 401 rồi 403",
      task: "Đọc một hệ thống xác thực nghĩa là biết thẻ nào mở được cửa nào. Gọi GET /v1/admin/stats khi chưa đăng nhập (401), rồi POST /v1/login, thêm token Bearer và gọi lại. Mã trạng thái sẽ đổi sang 403: thẻ hợp lệ nhưng không có quyền xem trang quản trị.",
    },
  ],
  "http-phuong-thuc-va-ma-trang-thai": [
    {
      type: "sim",
      tool: "api",
      mission: "putReplace",
      title: "PUT thay cả bản ghi",
      task: "Bài đã phân biệt PUT với PATCH. Hãy tự thấy hệ quả: GET /v1/products/3 để biết nó đang có gì, rồi PUT /v1/products/3 với đủ name, price, category và đúng stock hiện tại, đổi tên hoặc giá. Bỏ sót stock thì tồn kho bị đặt lại về 0.",
    },
  ],
  "gioi-han-tan-suat-va-thu-lai": [
    {
      type: "sim",
      tool: "api",
      mission: "retryAfter429",
      title: "Bị 429 thì chờ đúng Retry-After",
      task: "Giới hạn tần suất chỉ có ích nếu phía gọi biết lùi lại. Bấm Send liên tiếp ba lần với GET /v1/exports (tối đa 2 lần mỗi 8 giây) cho tới khi nhận 429, đọc header Retry-After ở tab Headers, chờ đủ số giây đó rồi gọi lại và nhận 200.",
    },
  ],
  "gioi-han-toc-do-goi": [
    {
      type: "sim",
      tool: "api",
      mission: "retryAfter429",
      title: "Thử chạm giới hạn rồi hồi phục",
      task: "Gọi dồn GET /v1/exports cho tới khi nhận 429 Too Many Requests, đọc Retry-After trong header phản hồi và chờ đúng thời gian đó. Gọi dồn tiếp chỉ kéo dài thời gian bị chặn; sau khi chờ đủ, một lời gọi mới sẽ trả 200.",
    },
  ],
  "do-tin-cay-khi-goi-llm": [
    {
      type: "sim",
      tool: "api",
      mission: "idempotentOrder",
      title: "Thử lại mà không tạo hai đơn",
      task: "Thử lại một thao tác có tác dụng phụ chỉ an toàn khi bên nhận bỏ qua bản trùng. Gửi POST /v1/orders với {\"product_id\": 1, \"quantity\": 1}, thêm header Idempotency-Key = don-an-001, rồi Send hai lần: lần đầu tạo đơn (201), lần sau trả lại đơn cũ (200) chứ không tạo thêm.",
    },
  ],
  "thu-lai-mot-lan-hay-tu-tay-lam": [
    {
      type: "sim",
      tool: "api",
      mission: "idempotentOrder",
      title: "Thử lại tự động mà không nhân đôi đơn",
      task: "Tự động thử lại chỉ đúng khi việc làm lại không gây hậu quả thêm. Thêm header Idempotency-Key = don-an-001 vào POST /v1/orders với {\"product_id\": 1, \"quantity\": 1} rồi gửi hai lần để thấy lần thứ hai nhận 200 và Idempotent-Replayed thay vì một đơn mới.",
    },
  ],
};
