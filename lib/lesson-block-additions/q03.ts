import type { LessonSectionBlock } from "../lesson-types";

// Khối `sim` đợt hai - nhiệm vụ mới của trình mô phỏng. Một người viết cho một tệp.
export const Q03_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "select-loc-sap-xep-va-gioi-han": [
    {
      type: "sim",
      tool: "sql",
      mission: "null-email",
      title: "Tìm khách chưa có email",
      task: "Bài vừa nói so sánh với NULL không cho đúng cũng không cho sai. Hãy tự thấy điều đó: viết truy vấn lấy tên các khách có ô email đang trống. Thử trước với email = NULL để xem kết quả rỗng, rồi sửa sang IS NULL.",
    },
  ],
  "bang-cot-kieu-du-lieu-va-rang-buoc": [
    {
      type: "sim",
      tool: "sql",
      mission: "coalesce-email",
      title: "Thay email trống bằng chữ N/A",
      task: "NULL nghĩa là không có giá trị, nên một cột cho phép NULL sẽ để lại ô trống khi xuất dữ liệu. Xuất tên và email của mọi khách, và dùng COALESCE để khách chưa có email hiện chữ N/A thay vì ô trống.",
    },
  ],
  "gop-nhom-va-ham-tong-hop": [
    {
      type: "sim",
      tool: "sql",
      mission: "shipping-fanout",
      title: "Tổng phí ship không bị cộng nhân đôi",
      task: "Bài nói gộp nhóm ngay sau khi ghép bảng làm tổng bị cộng nhiều lần. Tính tổng phí ship của các đơn có ít nhất một phụ kiện, mỗi đơn chỉ tính một lần dù có nhiều phụ kiện. Hãy lọc ra các đơn trước, rồi mới cộng phí ship của bảng đơn hàng.",
    },
  ],
  "join-ghep-du-lieu-nhieu-bang": [
    {
      type: "sim",
      tool: "sql",
      mission: "repeat-buyers",
      title: "Khách mua lại, đếm đơn chứ không đếm dòng",
      task: "Sau khi ghép đơn hàng với dòng hàng, một đơn có thể hiện thành nhiều hàng. Tìm các khách có từ 2 đơn đã giao trở lên, kèm số đơn và doanh thu của những đơn đó. Đếm đơn bằng COUNT(DISTINCT ...) và đặt điều kiện trên nhóm bằng HAVING.",
    },
  ],
  "loc-ban-ghi-trung-do-nguoi-dien-hai-lan": [
    {
      type: "sim",
      tool: "sql",
      mission: "duplicate-emails",
      title: "Tìm email bị đăng ký hai lần",
      task: "Bài chọn email làm chìa khoá để nhận ra bản ghi trùng. Hãy làm đúng việc đó trong SQL: gom khách theo email và liệt kê các email xuất hiện từ hai lần trở lên cùng số lần. Khách chưa có email không phải là trùng, nên cần loại các ô trống trước khi gom.",
    },
  ],
  "don-hang-trung-binh-bi-vai-don-lon-keo-len": [
    {
      type: "sim",
      tool: "sql",
      mission: "order-limit",
      title: "Sắp xếp giảm dần để nhìn vài dòng đầu",
      task: "Bài chỉ cách tìm giá trị ngoại cỡ bằng một thao tác: sắp xếp từ lớn đến nhỏ rồi nhìn vài dòng đầu. Trong trình mô phỏng SQL, làm đúng thao tác đó trên bảng sản phẩm (không phải bảng đơn hàng): lấy 5 sản phẩm giá cao nhất bằng ORDER BY ... DESC và LIMIT 5.",
    },
  ],
  "bang-tong-hop-pivot-tra-loi-cau-doanh-thu-theo-thang-theo-nhom": [
    {
      type: "sim",
      tool: "sql",
      mission: "delivered-revenue-month",
      title: "Doanh thu theo tháng, chỉ tính đơn đã giao",
      task: "Bảng tổng hợp gom doanh thu theo tháng; trong SQL đó là GROUP BY theo tháng của ngày đặt. Tính doanh thu từng tháng (số lượng nhân giá) của các đơn có trạng thái delivered, tháng sớm đứng trước. Nhớ lọc trạng thái trước khi cộng, nếu không con số tháng nào cũng lệch.",
    },
  ],
  "hoi-dung-cau-voi-bang-tong-hop": [
    {
      type: "sim",
      tool: "sql",
      mission: "cancel-rate",
      title: "Tỉ lệ đơn bị huỷ, tính từ tử số và mẫu số",
      task: "Bài dặn không lấy trung bình của các tỉ lệ: cộng tử số, cộng mẫu số rồi mới chia. Tính phần trăm đơn bị huỷ trên tổng số đơn, làm tròn 1 chữ số thập phân. Tử số là số đơn cancelled, mẫu số là tất cả đơn, và cần nhân với 100.0 để phép chia không bị cắt thành số nguyên.",
    },
  ],
  "dinh-nghia-chi-so-va-su-troi-dat": [
    {
      type: "sim",
      tool: "sql",
      mission: "count-distinct-buyers",
      title: "Bao nhiêu người đã mua: đếm người, không đếm đơn",
      task: "Một chỉ số là con số cộng định nghĩa, và hai định nghĩa cho hai con số khác nhau. Hãy đếm số khách đã từng mua bằng COUNT(DISTINCT ...) trên bảng đơn hàng, rồi so với COUNT(*) để thấy vì sao đếm đơn cho con số lớn hơn số người.",
    },
  ],
};
