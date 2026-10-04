// Nhiệm vụ của SQL Console, xếp từ dễ tới khó theo đúng thứ tự một người mới
// gặp ở tuần đầu đi làm: đọc một bảng, lọc, sắp xếp, đếm theo nhóm, lọc nhóm,
// rồi tới JOIN - chỗ dữ liệu bắt đầu "mất dòng" mà không báo.
//
// Mỗi nhiệm vụ chấm KẾT QUẢ, không chấm câu lệnh: đáp án mẫu được chính bộ máy
// chạy từ một câu tham chiếu, rồi so bằng resultCovers (tên cột, thứ tự cột và
// cột thừa không tính). Tên và gợi ý nằm trong từ điển, khoá theo id.

import { runQuery, type QueryResult } from "@/lib/mini-sql";
import { resultCovers } from "./engine";
import { SAMPLE_DB } from "./sample-db";

export interface SqlMissionState {
  /** Kết quả của lần chạy thành công gần nhất. */
  result: QueryResult | null;
}

export interface SqlMission {
  id: string;
  /** Số dòng đáp án đúng phải có - hiện thành tiêu chí "trả về đúng n dòng". */
  expectedRowCount: () => number;
  /** Tiêu chí đạt, xếp từ yếu tới mạnh; tiêu chí cuối CHÍNH LÀ `check`, nên
   *  "đủ mọi tiêu chí" và "qua nhiệm vụ" không bao giờ lệch nhau. */
  criteria: { id: SqlCriterionId; check: (state: SqlMissionState) => boolean }[];
  /** Câu tham chiếu: chỉ chứa những cột bắt buộc phải có. */
  reference: string;
  /** Thứ tự dòng có được chấm không (chỉ khi đề bài yêu cầu sắp xếp). */
  ordered: boolean;
  check: (state: SqlMissionState) => boolean;
}

export type SqlCriterionId = "runs" | "rows" | "match";

function mission(id: string, reference: string, ordered: boolean): SqlMission {
  let expected: QueryResult | null = null;
  const getExpected = () => (expected ??= runQuery(SAMPLE_DB, reference));
  const check = (state: SqlMissionState) => {
    if (!state.result) return false;
    return resultCovers(state.result, getExpected(), ordered);
  };
  return {
    id,
    reference,
    ordered,
    check,
    expectedRowCount: () => getExpected().rows.length,
    criteria: [
      { id: "runs", check: (s) => s.result !== null },
      { id: "rows", check: (s) => !!s.result && s.result.rows.length === getExpected().rows.length },
      { id: "match", check },
    ],
  };
}

/* i18n-ignore-start: reference SQL queries used to compute expected results; never displayed */
// Thứ tự là thứ tự học: tám nhiệm vụ gốc xen với các nhiệm vụ mới theo độ khó
// (dễ → vừa → khó). Tiến độ lưu theo id nên đổi thứ tự không mất gì của ai.
export const SQL_MISSIONS: SqlMission[] = [
  mission("select-all", "SELECT name FROM customers", false),
  mission("where-city", "SELECT name FROM customers WHERE city = 'Hà Nội'", false),
  // Sáu thành phố trong 12 dòng: quên DISTINCT thì ra 12 dòng và trượt tiêu chí số dòng.
  mission("distinct-city", "SELECT DISTINCT city FROM customers", false),
  // Hai khách để trống email. "= NULL" không bao giờ đúng nên cho ra 0 dòng.
  mission("null-email", "SELECT name FROM customers WHERE email IS NULL", false),
  // Đơn 10 đặt đúng ngày 01/08: "> '2026-08-01'" làm rơi nó mà không báo lỗi.
  mission("date-range", "SELECT id FROM orders WHERE order_date BETWEEN '2026-08-01' AND '2026-08-31'", false),
  mission("order-limit", "SELECT name FROM products ORDER BY price DESC LIMIT 5", true),
  mission("group-count", "SELECT status, COUNT(*) FROM orders GROUP BY status", false),
  // Chữ thay thế được ghi trong đề (N/A) để đáp án có đúng một dạng.
  mission("coalesce-email", "SELECT name, COALESCE(email, 'N/A') AS email FROM customers", false),
  // 16 đơn nhưng chỉ 10 khách: COUNT(*) đếm đơn, không đếm người.
  mission("count-distinct-buyers", "SELECT COUNT(DISTINCT customer_id) AS buyers FROM orders", false),
  mission(
    "having-avg",
    "SELECT category FROM products GROUP BY category HAVING AVG(price) > 5000000",
    false,
  ),
  // Nhãn (premium / mid / budget) được ghi trong đề; chấm cả nhãn lẫn số đếm.
  mission(
    "case-price-tier",
    "SELECT CASE WHEN price >= 10000000 THEN 'premium' WHEN price >= 2000000 THEN 'mid' ELSE 'budget' END AS tier, COUNT(*) AS n FROM products GROUP BY CASE WHEN price >= 10000000 THEN 'premium' WHEN price >= 2000000 THEN 'mid' ELSE 'budget' END",
    false,
  ),
  // 2 trong 16 đơn bị huỷ = 12,5. Đáp án 0,125 (tỉ lệ thay vì phần trăm) trượt.
  mission(
    "cancel-rate",
    "SELECT ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM orders), 1) AS pct FROM orders WHERE status = 'cancelled'",
    false,
  ),
  mission(
    "left-join-null",
    "SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL",
    false,
  ),
  // Giá trung bình 7.003.333: bốn sản phẩm trên mức đó.
  mission(
    "avg-subquery",
    "SELECT name FROM products WHERE price > (SELECT AVG(price) FROM products)",
    false,
  ),
  // Hai email trùng thật (id 4 và 11) và hai ô NULL. GROUP BY gom các NULL vào
  // một nhóm nên quên lọc NULL sẽ thấy thêm một "email trùng" không có thật.
  mission(
    "duplicate-emails",
    "SELECT email, COUNT(*) AS n FROM customers WHERE email IS NOT NULL GROUP BY email HAVING COUNT(*) > 1",
    false,
  ),
  mission(
    "best-sellers",
    "SELECT p.name, SUM(oi.quantity) AS sold FROM order_items oi JOIN products p ON p.id = oi.product_id GROUP BY p.name ORDER BY sold DESC LIMIT 3",
    true,
  ),
  // Doanh thu theo tháng của đơn đã giao: quên lọc trạng thái thì cả hai tháng
  // đều lệch số, dù vẫn đúng 2 dòng.
  mission(
    "delivered-revenue-month",
    "SELECT SUBSTR(o.order_date, 1, 7) AS month, SUM(oi.quantity * p.price) AS revenue FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.status = 'delivered' GROUP BY SUBSTR(o.order_date, 1, 7) ORDER BY month",
    true,
  ),
  // Sản phẩm 2 và 7 chỉ nằm trong đơn chưa giao được. Mọi sản phẩm đều từng có
  // trong order_items, nên "chưa từng bán" ra rỗng - phải lọc theo đơn đã giao.
  mission(
    "undelivered-products",
    "SELECT name FROM products WHERE id NOT IN (SELECT product_id FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE status = 'delivered'))",
    false,
  ),
  // "CEO muốn biết 10 khách hàng tạo doanh thu cao nhất": xếp hạng nên thứ tự
  // được chấm. Chỉ 10 trong 12 khách từng mua, nên LEFT JOIN (12 dòng, 2 dòng
  // NULL) trượt tiêu chí số dòng - đúng chỗ người học phải tự debug.
  mission(
    "revenue-per-customer",
    "SELECT c.name, SUM(oi.quantity * p.price) AS revenue FROM customers c JOIN orders o ON o.customer_id = c.id JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id GROUP BY c.name ORDER BY revenue DESC LIMIT 10",
    true,
  ),
  // Bẫy đếm sau khi JOIN: đơn có 2 dòng hàng bị đếm 2 lần. COUNT(*) cho ra nhiều
  // khách "mua lại" hơn thực tế; chỉ COUNT(DISTINCT o.id) mới đúng.
  mission(
    "repeat-buyers",
    "SELECT c.name, COUNT(DISTINCT o.id) AS orders, SUM(oi.quantity * p.price) AS revenue FROM customers c JOIN orders o ON o.customer_id = c.id JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.status = 'delivered' GROUP BY c.name HAVING COUNT(DISTINCT o.id) >= 2",
    false,
  ),
  // Bẫy "SUM bị nhân": phí ship nằm ở bảng đơn; JOIN sang dòng hàng làm đơn có
  // 2 phụ kiện bị cộng 2 lần (300.000 thay vì 240.000). SUM(DISTINCT) cũng sai
  // (75.000) vì gộp cả những đơn trùng mức phí.
  mission(
    "shipping-fanout",
    "SELECT SUM(shipping_fee) AS fee FROM orders WHERE id IN (SELECT oi.order_id FROM order_items oi JOIN products p ON p.id = oi.product_id WHERE p.category = 'Phụ kiện')",
    false,
  ),
];
/* i18n-ignore-end */

export const SQL_MISSION_IDS = SQL_MISSIONS.map((m) => m.id);
