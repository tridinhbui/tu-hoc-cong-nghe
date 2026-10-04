import { describe, expect, it } from "vitest";
import { runQuery, SqlError } from "../mini-sql";
import { execute } from "../tools/sql/engine";
import { SAMPLE_DB } from "../tools/sql/sample-db";
import { SQL_MISSIONS } from "../tools/sql/missions";
import { toolSqlVi, toolSqlEn } from "../i18n/dictionaries/sections/tool-sql";

const NEW_IDS = [
  "distinct-city",
  "null-email",
  "date-range",
  "coalesce-email",
  "count-distinct-buyers",
  "case-price-tier",
  "cancel-rate",
  "avg-subquery",
  "duplicate-emails",
  "delivered-revenue-month",
  "undelivered-products",
  "repeat-buyers",
  "shipping-fanout",
];

const run = (sql: string) => {
  const out = execute(SAMPLE_DB, sql);
  if (!out.ok) throw new Error(`${sql} -> ${out.error.message}`);
  return out.result;
};
const passes = (id: string, sql: string) => SQL_MISSIONS.find((m) => m.id === id)!.check({ result: run(sql) });

/** Một cách giải khác câu tham chiếu - phải qua. */
const SOLUTION: Record<string, string> = {
  "distinct-city": "SELECT city FROM customers GROUP BY city",
  "null-email": "SELECT * FROM customers WHERE email IS NULL",
  "date-range": "SELECT id, order_date FROM orders WHERE order_date >= '2026-08-01' AND order_date <= '2026-08-31'",
  "coalesce-email":
    "SELECT id, name, CASE WHEN email IS NULL THEN 'N/A' ELSE email END AS contact FROM customers",
  "count-distinct-buyers": "SELECT COUNT(DISTINCT o.customer_id) FROM orders o",
  "case-price-tier":
    "SELECT CASE WHEN price >= 10000000 THEN 'premium' WHEN price >= 2000000 THEN 'mid' ELSE 'budget' END AS tier, COUNT(*) AS so_luong FROM products GROUP BY tier",
  "cancel-rate":
    "SELECT ROUND(100.0 * SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*), 1) AS pct FROM orders",
  "avg-subquery": "SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products) ORDER BY price",
  "duplicate-emails":
    "SELECT email, COUNT(email) AS lan FROM customers GROUP BY email HAVING COUNT(email) > 1",
  "delivered-revenue-month":
    "SELECT SUBSTR(o.order_date, 1, 7) AS thang, SUM(i.quantity * p.price) AS dt FROM products p JOIN order_items i ON i.product_id = p.id JOIN orders o ON o.id = i.order_id WHERE o.status = 'delivered' GROUP BY thang ORDER BY thang ASC",
  "undelivered-products":
    "SELECT p.name FROM products p WHERE p.id NOT IN (SELECT i.product_id FROM order_items i JOIN orders o ON o.id = i.order_id WHERE o.status = 'delivered')",
  "repeat-buyers":
    "SELECT c.id, c.name, COUNT(DISTINCT o.id) AS n, SUM(i.quantity * p.price) AS total FROM customers c JOIN orders o ON o.customer_id = c.id JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'delivered' GROUP BY c.id HAVING COUNT(DISTINCT o.id) >= 2",
  "shipping-fanout":
    "SELECT SUM(shipping_fee) FROM orders WHERE id IN (SELECT order_id FROM order_items WHERE product_id IN (SELECT id FROM products WHERE category = 'Phụ kiện'))",
};

/** Cách làm sai hay gặp - phải KHÔNG qua. */
const WRONG: Record<string, string[]> = {
  "distinct-city": ["SELECT city FROM customers"],
  "null-email": ["SELECT name FROM customers WHERE email = NULL", "SELECT name FROM customers WHERE email IS NOT NULL"],
  "date-range": [
    "SELECT id FROM orders WHERE order_date > '2026-08-01' AND order_date <= '2026-08-31'",
    "SELECT id FROM orders WHERE order_date BETWEEN '2026-08-02' AND '2026-08-31'",
  ],
  "coalesce-email": ["SELECT name, email FROM customers"],
  "count-distinct-buyers": ["SELECT COUNT(*) FROM orders", "SELECT COUNT(customer_id) FROM orders"],
  "case-price-tier": [
    "SELECT CASE WHEN price >= 10000000 THEN 'premium' ELSE 'budget' END AS tier, COUNT(*) FROM products GROUP BY tier",
  ],
  "cancel-rate": [
    "SELECT ROUND(1.0 * COUNT(*) / (SELECT COUNT(*) FROM orders), 3) FROM orders WHERE status = 'cancelled'",
    "SELECT COUNT(*) FROM orders WHERE status = 'cancelled'",
  ],
  "avg-subquery": ["SELECT name FROM products WHERE price > 5000000", "SELECT name FROM products WHERE price < (SELECT AVG(price) FROM products)"],
  "duplicate-emails": [
    "SELECT email, COUNT(*) AS n FROM customers GROUP BY email HAVING COUNT(*) > 1",
    "SELECT email FROM customers",
  ],
  "delivered-revenue-month": [
    "SELECT SUBSTR(o.order_date, 1, 7) AS m, SUM(i.quantity * p.price) AS r FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id GROUP BY SUBSTR(o.order_date, 1, 7) ORDER BY m",
    "SELECT SUBSTR(o.order_date, 1, 7) AS m, SUM(i.quantity * p.price) AS r FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'delivered' GROUP BY SUBSTR(o.order_date, 1, 7) ORDER BY m DESC",
  ],
  "undelivered-products": [
    "SELECT name FROM products WHERE id NOT IN (SELECT product_id FROM order_items)",
    "SELECT name FROM products WHERE id IN (SELECT product_id FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE status = 'delivered'))",
  ],
  "repeat-buyers": [
    "SELECT c.name, COUNT(*) AS orders, SUM(i.quantity * p.price) AS revenue FROM customers c JOIN orders o ON o.customer_id = c.id JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'delivered' GROUP BY c.name HAVING COUNT(*) >= 2",
  ],
  "shipping-fanout": [
    "SELECT SUM(o.shipping_fee) FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE p.category = 'Phụ kiện'",
    "SELECT SUM(DISTINCT o.shipping_fee) FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE p.category = 'Phụ kiện'",
    "SELECT SUM(shipping_fee) FROM orders",
  ],
};

describe("nhiệm vụ SQL mới", () => {
  it("đủ mười ba nhiệm vụ mới, có khai chữ vi và en, không dấu tiếng Việt trong en", () => {
    const vi = toolSqlVi.toolSql.missions as Record<string, Record<string, unknown>>;
    const en = toolSqlEn.toolSql.missions as Record<string, Record<string, unknown>>;
    for (const id of NEW_IDS) {
      expect(SQL_MISSIONS.some((m) => m.id === id), id).toBe(true);
      for (const key of ["from", "title", "brief", "hint"]) {
        expect(vi[id][key], `${id}.${key}`).toBeTruthy();
        expect(en[id][key], `${id}.${key}`).toBeTruthy();
        expect(String(en[id][key]), `${id}.${key}`).not.toMatch(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i);
      }
      expect((vi[id].criteria as { match: string }).match).toBeTruthy();
      expect((en[id].criteria as { match: string }).match).toBeTruthy();
    }
  });

  for (const id of NEW_IDS) {
    describe(id, () => {
      const mission = SQL_MISSIONS.find((m) => m.id === id)!;

      it("đỏ khi chưa chạy gì và khi chỉ xem cả bảng", () => {
        expect(mission.check({ result: null })).toBe(false);
        expect(mission.criteria.every((c) => c.check({ result: null }))).toBe(false);
        expect(passes(id, "SELECT * FROM customers LIMIT 3")).toBe(false);
      });

      it("xanh với câu tham chiếu và với một cách giải khác", () => {
        expect(mission.check({ result: run(mission.reference) })).toBe(true);
        expect(passes(id, SOLUTION[id])).toBe(true);
      });

      it("đỏ với các cách làm sai", () => {
        for (const sql of WRONG[id]) expect(passes(id, sql), sql).toBe(false);
      });

      it("tiêu chí cuối chính là check", () => {
        const last = mission.criteria[mission.criteria.length - 1];
        const good = { result: run(mission.reference) };
        expect(last.check(good)).toBe(mission.check(good));
      });
    });
  }

  it("số liệu thiết kế của dữ liệu mẫu", () => {
    const val = (id: string) => runQuery(SAMPLE_DB, SQL_MISSIONS.find((m) => m.id === id)!.reference).rows;
    expect(val("distinct-city")).toHaveLength(6);
    expect(val("null-email")).toHaveLength(2);
    expect(val("date-range")).toHaveLength(7);
    expect(val("count-distinct-buyers")).toEqual([[10]]);
    expect(val("cancel-rate")).toEqual([[12.5]]);
    expect(val("avg-subquery")).toHaveLength(4);
    expect(val("duplicate-emails")).toEqual([["dung.pham@mail.vn", 2]]);
    expect(val("undelivered-products")).toHaveLength(2);
    expect(val("repeat-buyers")).toEqual([["Nguyễn Văn An", 2, 18340000]]);
    expect(val("shipping-fanout")).toEqual([[240000]]);
  });
});

describe("mini-sql mở rộng không đổi kết quả cũ", () => {
  it("NULL lan qua phép tính, NOT IN gặp NULL không bao giờ đúng", () => {
    expect(runQuery(SAMPLE_DB, "SELECT 5 + NULL FROM products LIMIT 1").rows).toEqual([[null]]);
    const withNull = runQuery(SAMPLE_DB, "SELECT name FROM customers WHERE id NOT IN (SELECT id FROM customers WHERE email IS NULL)");
    expect(withNull.rows).toHaveLength(10);
    expect(runQuery(SAMPLE_DB, "SELECT name FROM customers WHERE city NOT IN ('Hà Nội', NULL)").rows).toHaveLength(0);
  });

  it("truy vấn con tương quan hoặc thiếu ngoặc báo lỗi rõ", () => {
    expect(() => runQuery(SAMPLE_DB, "SELECT name FROM products WHERE price > (SELECT AVG(price) FROM products")).toThrow(SqlError);
  });

  it("truy vấn không đụng tính năng mới vẫn chạy như cũ", () => {
    expect(runQuery(SAMPLE_DB, "SELECT status, COUNT(*) FROM orders GROUP BY status").rows).toHaveLength(4);
  });
});
