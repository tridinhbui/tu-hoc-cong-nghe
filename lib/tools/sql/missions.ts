// Nhiệm vụ của SQL Console, xếp từ dễ tới khó theo đúng thứ tự một người mới
// gặp ở tuần đầu đi làm: đọc một bảng, lọc, sắp xếp, đếm theo nhóm, lọc nhóm,
// rồi tới JOIN - chỗ dữ liệu bắt đầu "mất dòng" mà không báo.
//
// Mỗi nhiệm vụ chấm KẾT QUẢ, không chấm câu lệnh: đáp án mẫu được chính bộ máy
// chạy từ một câu tham chiếu, rồi so bằng resultCovers (tên cột, thứ tự cột và
// cột thừa không tính). Tên và gợi ý nằm trong từ điển, khoá theo id.

import { runQuery, type Database, type QueryResult, type Table } from "@/lib/mini-sql";
import { resultCovers } from "./engine";
import { SAMPLE_DB } from "./sample-db";
import { createSession, runSql, type IndexDef, type SessionStats } from "./session";

export interface SqlMissionState {
  /** Kết quả của câu SELECT cuối cùng trong lần chạy gần nhất (null nếu câu cuối không phải SELECT). */
  result: QueryResult | null;
  /** Cơ sở dữ liệu của phiên SAU lần chạy - để chấm nhiệm vụ ghi dữ liệu. */
  db?: Database;
  indexes?: IndexDef[];
  stats?: SessionStats;
  /** Cột "detail" của lần EXPLAIN gần nhất, nếu câu cuối là EXPLAIN. */
  plan?: string[];
  /** Đang trong giao dịch chưa COMMIT/ROLLBACK. */
  inTransaction?: boolean;
}

export interface SqlMission {
  id: string;
  /** Số dòng đáp án đúng phải có - hiện thành tiêu chí "trả về đúng n dòng". */
  expectedRowCount: () => number;
  /** Tiêu chí đạt, xếp từ yếu tới mạnh; tiêu chí cuối CHÍNH LÀ `check`, nên
   *  "đủ mọi tiêu chí" và "qua nhiệm vụ" không bao giờ lệch nhau. */
  criteria: { id: SqlCriterionId; check: (state: SqlMissionState) => boolean }[];
  /** Câu tham chiếu: chỉ chứa những cột bắt buộc phải có. Nhiệm vụ "write" thì
   *  đây là một script nhiều câu, chạy trên phiên mới. */
  reference: string;
  /** "write": chấm TRẠNG THÁI bảng sau khi ghi, không chấm kết quả SELECT. */
  kind?: "read" | "write";
  /** Câu SELECT chạy trên phiên khi nhiệm vụ xong, để bàn giao một bảng kết quả. */
  artifact?: string;
  /** Thứ tự dòng có được chấm không (chỉ khi đề bài yêu cầu sắp xếp). */
  ordered: boolean;
  check: (state: SqlMissionState) => boolean;
}

export type SqlCriterionId = "runs" | "rows" | "match" | "changed";

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
/* ------------------------------------------------------------------ *
 * Nhiệm vụ GHI dữ liệu: chấm trạng thái bảng sau thay đổi
 * ------------------------------------------------------------------ */

const matrix = (t: Table | undefined) =>
  t ? JSON.stringify(t.rows.map((r) => t.columns.map((c) => r[c] ?? null))) : "";
const sameAsSample = (db: Database, tables: string[]) => tables.every((n) => matrix(db[n]) === matrix(SAMPLE_DB[n]));
const ALL_TABLES = ["customers", "products", "orders", "order_items"];
const except = (...names: string[]) => ALL_TABLES.filter((n) => !names.includes(n));

/** Cơ sở dữ liệu SAU KHI chạy câu tham chiếu trên dữ liệu mẫu (tính một lần). */
function afterScript(reference: string): () => Database {
  let cached: Database | null = null;
  return () => (cached ??= runSql(createSession(), reference).session.db);
}

function writeMission(spec: {
  id: string;
  reference: string;
  artifact?: string;
  /** Thay đổi chính đã xảy ra chưa (chưa xét tác dụng phụ). */
  changed: (s: SqlMissionState & { db: Database }) => boolean;
  /** Điều kiện đầy đủ; chỉ gọi khi có `db` và không còn giao dịch mở. */
  full: (db: Database, s: SqlMissionState) => boolean;
  /** Cho phép đang trong giao dịch (nhiệm vụ về giao dịch tự xét). */
  allowOpenTx?: boolean;
}): SqlMission {
  const changed = (s: SqlMissionState) => !!s.db && spec.changed({ ...s, db: s.db });
  const check = (s: SqlMissionState) => !!s.db && (spec.allowOpenTx || !s.inTransaction) && spec.full(s.db, s);
  return {
    id: spec.id,
    reference: spec.reference,
    kind: "write",
    artifact: spec.artifact,
    ordered: false,
    check,
    expectedRowCount: () => 0,
    criteria: [
      { id: "changed", check: changed },
      { id: "match", check },
    ],
  };
}

const NEW_CUSTOMER = { name: "Tran Minh Anh", city: "Vinh", email: "anh.tran@mail.vn" };
const REORDER_DATE = "2026-09-01";
const deliveredBuyers = () => [
  ...new Set(SAMPLE_DB.orders.rows.filter((r) => r.status === "delivered").map((r) => r.customer_id)),
];

const insertCustomer = (() => {
  const base = SAMPLE_DB.customers.rows.length;
  return writeMission({
    id: "insert-customer",
    reference:
      "INSERT INTO customers (name, city, email, joined_at) VALUES ('Tran Minh Anh', 'Vinh', 'anh.tran@mail.vn', '2026-09-15')",
    artifact: "SELECT * FROM customers ORDER BY id DESC LIMIT 3",
    changed: (s) => s.db.customers.rows.some((r) => r.name === NEW_CUSTOMER.name),
    full: (db) => {
      const rows = db.customers.rows;
      if (rows.length !== base + 1) return false;
      const t = { ...db.customers, rows: rows.slice(0, base) };
      if (matrix(t) !== matrix(SAMPLE_DB.customers)) return false;
      const added = rows[base];
      return (
        added.name === NEW_CUSTOMER.name &&
        added.city === NEW_CUSTOMER.city &&
        added.email === NEW_CUSTOMER.email &&
        typeof added.id === "number" &&
        sameAsSample(db, except("customers"))
      );
    },
  });
})();

const updateOnePrice = (() => {
  const expected = afterScript("UPDATE products SET price = 22990000 WHERE id = 2");
  return writeMission({
    id: "update-one-price",
    reference: "UPDATE products SET price = 22990000 WHERE id = 2",
    artifact: "SELECT id, name, price FROM products WHERE id = 2",
    changed: (s) => s.db.products.rows.some((r) => r.id === 2 && r.price === 22990000),
    full: (db) => matrix(db.products) === matrix(expected().products) && sameAsSample(db, except("products")),
  });
})();

const updateAccessories = (() => {
  const script = "UPDATE products SET price = price - 50000 WHERE category = 'Phụ kiện' AND price > 500000";
  const expected = afterScript(script);
  return writeMission({
    id: "update-accessories",
    reference: script,
    artifact: "SELECT id, name, price FROM products WHERE category = 'Phụ kiện'",
    changed: (s) =>
      s.db.products.rows.some((r) => r.id === 4 && r.price === 1840000) &&
      s.db.products.rows.some((r) => r.id === 9 && r.price === 540000),
    full: (db) => matrix(db.products) === matrix(expected().products) && sameAsSample(db, except("products")),
  });
})();

const deleteCancelled = (() => {
  const script = "DELETE FROM orders WHERE status = 'cancelled'";
  const expected = afterScript(script);
  // Dọn luôn dòng hàng mồ côi của đơn đã xoá cũng được chấp nhận: đó là việc làm
  // thật, và khoá ngoại không được ép trong mô phỏng này.
  const gone = new Set(SAMPLE_DB.orders.rows.filter((r) => r.status === "cancelled").map((r) => r.id));
  const itemsWithoutGone = JSON.stringify(
    SAMPLE_DB.order_items.rows.filter((r) => !gone.has(r.order_id)).map((r) => SAMPLE_DB.order_items.columns.map((c) => r[c] ?? null)),
  );
  return writeMission({
    id: "delete-cancelled",
    reference: script,
    artifact: "SELECT status, COUNT(*) AS n FROM orders GROUP BY status",
    changed: (s) => !s.db.orders.rows.some((r) => r.status === "cancelled"),
    full: (db) =>
      matrix(db.orders) === matrix(expected().orders) &&
      sameAsSample(db, ["customers", "products"]) &&
      (matrix(db.order_items) === matrix(SAMPLE_DB.order_items) || matrix(db.order_items) === itemsWithoutGone),
  });
})();

// Tối thiểu số dòng một giao dịch phải đã hoàn tác: đủ lớn để là "thử một lệnh
// nguy hiểm" (xoá hay sửa cả bảng 16 đơn), không phải nghịch một dòng.
const ROLLBACK_MIN_ROWS = 10;

const rollbackDelete = writeMission({
  id: "rollback-delete",
  reference: "BEGIN; DELETE FROM orders; ROLLBACK;",
  artifact: "SELECT COUNT(*) AS orders FROM orders",
  changed: (s) => (s.stats?.rolledBackRows ?? 0) >= ROLLBACK_MIN_ROWS,
  full: (db, s) => (s.stats?.rolledBackRows ?? 0) >= ROLLBACK_MIN_ROWS && sameAsSample(db, ALL_TABLES),
});

const INDEX_PLAN = /^SEARCH orders( AS \w+)? USING (COVERING )?INDEX \S+ \(customer_id=\?/;
const createIndexSearch = writeMission({
  id: "create-index-search",
  reference:
    "CREATE INDEX idx_orders_customer ON orders (customer_id); EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 1;",
  changed: (s) => !!s.indexes?.some((i) => i.table === "orders" && i.columns[0] === "customer_id"),
  full: (_db, s) =>
    !!s.indexes?.some((i) => i.table === "orders" && i.columns[0] === "customer_id") &&
    !!s.plan?.some((d) => INDEX_PLAN.test(d)),
});

const insertSelectReorder = (() => {
  const base = SAMPLE_DB.orders.rows.length;
  return writeMission({
    id: "insert-select-reorder",
    reference: `INSERT INTO orders (customer_id, order_date, status, shipping_fee) SELECT DISTINCT customer_id, '${REORDER_DATE}', 'pending', 0 FROM orders WHERE status = 'delivered'`,
    artifact: "SELECT id, customer_id, order_date, status FROM orders ORDER BY id DESC LIMIT 10",
    changed: (s) => s.db.orders.rows.length > base,
    full: (db) => {
      const rows = db.orders.rows;
      const buyers = deliveredBuyers();
      if (rows.length !== base + buyers.length) return false;
      if (matrix({ ...db.orders, rows: rows.slice(0, base) }) !== matrix(SAMPLE_DB.orders)) return false;
      const added = rows.slice(base);
      const ids = new Set(added.map((r) => r.customer_id));
      return (
        ids.size === buyers.length &&
        buyers.every((b) => ids.has(b)) &&
        added.every((r) => r.order_date === REORDER_DATE && r.status === "pending" && r.shipping_fee === 0) &&
        sameAsSample(db, except("orders"))
      );
    },
  });
})();

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
  // Nhóm ghi dữ liệu (INSERT / UPDATE / DELETE / giao dịch / chỉ mục): chấm
  // trạng thái bảng SAU thay đổi, không chấm kết quả của SELECT cuối.
  insertCustomer,
  updateOnePrice,
  updateAccessories,
  deleteCancelled,
  rollbackDelete,
  createIndexSearch,
  insertSelectReorder,
];
/* i18n-ignore-end */

export const SQL_MISSION_IDS = SQL_MISSIONS.map((m) => m.id);
