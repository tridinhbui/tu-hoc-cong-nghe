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
  /** Câu tham chiếu: chỉ chứa những cột bắt buộc phải có. */
  reference: string;
  /** Thứ tự dòng có được chấm không (chỉ khi đề bài yêu cầu sắp xếp). */
  ordered: boolean;
  check: (state: SqlMissionState) => boolean;
}

function mission(id: string, reference: string, ordered: boolean): SqlMission {
  let expected: QueryResult | null = null;
  return {
    id,
    reference,
    ordered,
    check: (state) => {
      if (!state.result) return false;
      expected ??= runQuery(SAMPLE_DB, reference);
      return resultCovers(state.result, expected, ordered);
    },
  };
}

/* i18n-ignore-start: reference SQL queries used to compute expected results; never displayed */
export const SQL_MISSIONS: SqlMission[] = [
  mission("select-all", "SELECT name FROM customers", false),
  mission("where-city", "SELECT name FROM customers WHERE city = 'Hà Nội'", false),
  mission("order-limit", "SELECT name FROM products ORDER BY price DESC LIMIT 5", true),
  mission("group-count", "SELECT status, COUNT(*) FROM orders GROUP BY status", false),
  mission(
    "having-avg",
    "SELECT category FROM products GROUP BY category HAVING AVG(price) > 5000000",
    false,
  ),
  mission(
    "left-join-null",
    "SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL",
    false,
  ),
  mission(
    "best-sellers",
    "SELECT p.name, SUM(oi.quantity) AS sold FROM order_items oi JOIN products p ON p.id = oi.product_id GROUP BY p.name ORDER BY sold DESC LIMIT 3",
    true,
  ),
  mission(
    "revenue-per-customer",
    "SELECT c.name, SUM(oi.quantity * p.price) FROM customers c JOIN orders o ON o.customer_id = c.id JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id GROUP BY c.name",
    false,
  ),
];
/* i18n-ignore-end */

export const SQL_MISSION_IDS = SQL_MISSIONS.map((m) => m.id);
