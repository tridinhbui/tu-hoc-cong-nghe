import { describe, expect, it } from "vitest";
import { runQuery, SqlError } from "../mini-sql";
import { execute } from "../tools/sql/engine";
import { SAMPLE_DB } from "../tools/sql/sample-db";
import { SQL_MISSIONS } from "../tools/sql/missions";
import { createSampleDb } from "../tools/sql/sample-db";
import {
  createSession,
  deserializeSession,
  missionState,
  runSql,
  serializeSession,
  splitStatements,
  type SqlSession,
} from "../tools/sql/session";
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

/* ------------------------------------------------------------------ *
 * Ghi dữ liệu: phiên, giao dịch, chỉ mục, EXPLAIN và 7 nhiệm vụ mới
 * ------------------------------------------------------------------ */

/** Chạy lần lượt các script trên một phiên; trả phiên và kết quả lần chạy CUỐI. */
function play(...scripts: string[]) {
  let session: SqlSession = createSession();
  let outcome = null as ReturnType<typeof runSql>["outcome"] | null;
  for (const sql of scripts) {
    const r = runSql(session, sql);
    session = r.session;
    outcome = r.outcome;
  }
  return { session, outcome: outcome! };
}
const passesWrite = (id: string, ...scripts: string[]) => {
  const { session, outcome } = play(...scripts);
  return SQL_MISSIONS.find((m) => m.id === id)!.check(missionState(session, outcome));
};
const count = (s: SqlSession, sql: string) => runQuery(s.db, sql).rows[0][0];

const WRITE_IDS = [
  "insert-customer",
  "update-one-price",
  "update-accessories",
  "delete-cancelled",
  "rollback-delete",
  "create-index-search",
  "insert-select-reorder",
];

describe("phiên SQL giữ trạng thái", () => {
  it("câu ghi có hiệu lực ở lần chạy sau, và không bao giờ đụng SAMPLE_DB", () => {
    const { session } = play("DELETE FROM orders WHERE status = 'cancelled'", "UPDATE products SET price = 1");
    expect(count(session, "SELECT COUNT(*) FROM orders")).toBe(14);
    expect(count(session, "SELECT MAX(price) FROM products")).toBe(1);
    expect(SAMPLE_DB.orders.rows).toHaveLength(16);
    expect(SAMPLE_DB.products.rows.some((r) => r.price !== 1)).toBe(true);
    expect(createSampleDb()).toEqual(SAMPLE_DB);
  });

  it("runSql không sửa phiên truyền vào", () => {
    const before = createSession();
    runSql(before, "DELETE FROM orders");
    expect(before.db.orders.rows).toHaveLength(16);
  });

  it("báo số dòng bị tác động, đánh dấu câu không WHERE và cảnh báo", () => {
    const bad = play("UPDATE products SET price = 0").outcome;
    expect(bad.ok && bad.statements).toEqual([{ kind: "update", affected: 12, table: "products", noWhere: true }]);
    expect(bad.ok && bad.warnings).toContain("writeWithoutWhere");
    const good = play("DELETE FROM orders WHERE status = 'cancelled'").outcome;
    expect(good.ok && good.statements?.[0]).toMatchObject({ kind: "delete", affected: 2, noWhere: false });
    expect(good.ok && good.warnings).not.toContain("writeWithoutWhere");
  });

  it("nhiều câu cách nhau bằng ; và chú thích --; câu lỗi dừng chuỗi nhưng câu trước vẫn chạy", () => {
    expect(splitStatements("SELECT 'a;b' FROM customers; -- ghi chú; vẫn là chú thích\nDELETE FROM orders;")).toEqual([
      "SELECT 'a;b' FROM customers",
      "DELETE FROM orders",
    ]);
    const r = play("DELETE FROM orders WHERE id = 1; DELETE FROM nope; DELETE FROM orders WHERE id = 2");
    expect(r.outcome.ok).toBe(false);
    expect(!r.outcome.ok && r.outcome.error.kind).toBe("unknownTable");
    expect(!r.outcome.ok && r.outcome.statements).toHaveLength(1);
    expect(count(r.session, "SELECT COUNT(*) FROM orders")).toBe(15);
  });

  it("lỗi ghi được phân loại để gợi ý đúng", () => {
    const kind = (sql: string, ...pre: string[]) => {
      const o = play(...pre, sql).outcome;
      return o.ok ? "ok" : o.error.kind;
    };
    expect(kind("INSERT customers VALUES (1)")).toBe("dmlSyntax");
    expect(kind("UPDATE products price = 1")).toBe("dmlSyntax");
    expect(kind("DELETE orders")).toBe("dmlSyntax");
    expect(kind("INSERT INTO customers (id, name) VALUES (1, 'x')")).toBe("constraint");
    expect(kind("COMMIT")).toBe("transaction");
    expect(kind("BEGIN", "BEGIN")).toBe("transaction");
    expect(kind("CREATE INDEX i ON orders (status)", "CREATE INDEX i ON orders (status)")).toBe("index");
    expect(kind("CREATE UNIQUE INDEX i ON orders (status)")).toBe("unsupported");
    expect(kind("CREATE TABLE t (a)")).toBe("unsupported");
    expect(kind("INSERT INTO customers (name) VALUES (abc)")).toBe("unknownColumn");
    expect(kind("SELEC * FROM customers")).toBe("missingSelect");
    expect(kind("SELECT * FROM customers c JOIN orders o")).toBe("joinSyntax");
  });

  it("execute() cũ vẫn chỉ đọc: câu ghi bị từ chối và SAMPLE_DB còn nguyên", () => {
    const out = execute(SAMPLE_DB, "DELETE FROM orders");
    expect(out.ok).toBe(false);
    expect(SAMPLE_DB.orders.rows).toHaveLength(16);
  });
});

describe("giao dịch", () => {
  it("ROLLBACK hoàn tác mọi thay đổi từ BEGIN, kể cả chỉ mục, và đếm số dòng bị hoàn tác", () => {
    const { session, outcome } = play(
      "BEGIN; DELETE FROM orders; UPDATE products SET price = 1; CREATE INDEX i ON orders (status); SELECT COUNT(*) FROM orders;",
      "ROLLBACK",
    );
    expect(outcome.ok && outcome.statements?.[0]).toEqual({ kind: "rollback", affected: 28 });
    expect(count(session, "SELECT COUNT(*) FROM orders")).toBe(16);
    expect(session.indexes).toEqual([]);
    expect(session.tx).toBeNull();
    expect(session.stats.rolledBackRows).toBe(28);
  });

  it("COMMIT giữ thay đổi; ngoài giao dịch mỗi câu lệnh tự lưu", () => {
    const a = play("BEGIN; DELETE FROM orders WHERE id = 1;", "COMMIT");
    expect(count(a.session, "SELECT COUNT(*) FROM orders")).toBe(15);
    expect(a.session.stats).toMatchObject({ commits: 1, rollbacks: 0 });
    const b = play("DELETE FROM orders WHERE id = 1");
    expect(b.session.tx).toBeNull();
    expect(play("DELETE FROM orders WHERE id = 1", "BEGIN", "ROLLBACK").session.db.orders.rows).toHaveLength(15);
  });

  it("giao dịch đang mở không được tính là đã lưu", () => {
    expect(passesWrite("delete-cancelled", "BEGIN; DELETE FROM orders WHERE status = 'cancelled'")).toBe(false);
    expect(passesWrite("delete-cancelled", "BEGIN; DELETE FROM orders WHERE status = 'cancelled'", "COMMIT")).toBe(true);
  });
});

describe("EXPLAIN QUERY PLAN", () => {
  const plan = (sql: string, ...pre: string[]) => {
    const o = play(...pre, sql).outcome;
    if (!o.ok) throw new Error(o.error.message);
    return o.result.rows.map((r) => r[3]);
  };

  it("không chỉ mục thì SCAN, có chỉ mục khớp cột lọc thì SEARCH", () => {
    const q = "EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 1";
    expect(plan(q)).toEqual(["SCAN orders"]);
    expect(plan(q, "CREATE INDEX idx_c ON orders (customer_id)")).toEqual(["SEARCH orders USING INDEX idx_c (customer_id=?)"]);
  });

  it("chỉ mục trên cột khác, hàm bọc cột, <> hay OR đều không giúp gì", () => {
    const idx = "CREATE INDEX idx_c ON orders (customer_id)";
    expect(plan("EXPLAIN SELECT * FROM orders WHERE status = 'delivered'", idx)).toEqual(["SCAN orders"]);
    expect(plan("EXPLAIN SELECT * FROM orders WHERE customer_id <> 1", idx)).toEqual(["SCAN orders"]);
    expect(plan("EXPLAIN SELECT * FROM orders WHERE customer_id = 1 OR status = 'x'", idx)).toEqual(["SCAN orders"]);
    expect(plan("EXPLAIN SELECT * FROM orders WHERE ROUND(customer_id) = 1", idx)).toEqual(["SCAN orders"]);
  });

  it("chỉ mục nhiều cột chỉ dùng được từ cột ĐẦU", () => {
    const idx = "CREATE INDEX idx_ab ON orders (status, customer_id)";
    expect(plan("EXPLAIN SELECT * FROM orders WHERE customer_id = 1", idx)).toEqual(["SCAN orders"]);
    expect(plan("EXPLAIN SELECT * FROM orders WHERE status = 'delivered'", idx)).toEqual([
      "SEARCH orders USING INDEX idx_ab (status=?)",
    ]);
    expect(plan("EXPLAIN SELECT * FROM orders WHERE status = 'delivered' AND customer_id = 1", idx)).toEqual([
      "SEARCH orders USING INDEX idx_ab (status=? AND customer_id=?)",
    ]);
  });

  it("khoá chính, khoảng, IN, COVERING INDEX, bí danh", () => {
    expect(plan("EXPLAIN SELECT * FROM customers WHERE id = 5")).toEqual(["SEARCH customers USING INTEGER PRIMARY KEY (rowid=?)"]);
    expect(plan("EXPLAIN SELECT * FROM customers WHERE id > 5")).toEqual(["SEARCH customers USING INTEGER PRIMARY KEY (rowid>?)"]);
    const idx = "CREATE INDEX idx_d ON orders (order_date)";
    expect(plan("EXPLAIN SELECT * FROM orders WHERE order_date BETWEEN '2026-08-01' AND '2026-08-31'", idx)).toEqual([
      "SEARCH orders USING INDEX idx_d (order_date>? AND order_date<?)",
    ]);
    expect(plan("EXPLAIN SELECT id, order_date FROM orders WHERE order_date = '2026-08-01'", idx)).toEqual([
      "SEARCH orders USING COVERING INDEX idx_d (order_date=?)",
    ]);
    expect(plan("EXPLAIN SELECT * FROM orders o WHERE o.order_date IN ('2026-08-01', '2026-08-03')", idx)).toEqual([
      "SEARCH orders AS o USING INDEX idx_d (order_date=?)",
    ]);
  });

  it("từ chối JOIN và truy vấn con thay vì in kế hoạch sai", () => {
    const j = play("EXPLAIN SELECT * FROM orders o JOIN customers c ON c.id = o.customer_id").outcome;
    expect(!j.ok && j.error.kind).toBe("unsupported");
    const q = play("EXPLAIN SELECT * FROM orders WHERE id IN (SELECT order_id FROM order_items)").outcome;
    expect(!q.ok && q.error.kind).toBe("unsupported");
  });

  it("DROP INDEX đưa kế hoạch về SCAN", () => {
    expect(
      plan("EXPLAIN SELECT * FROM orders WHERE customer_id = 1", "CREATE INDEX i ON orders (customer_id)", "DROP INDEX i"),
    ).toEqual(["SCAN orders"]);
  });
});

describe("lưu và đọc phiên", () => {
  it("vòng đi vòng lại giữ nguyên dữ liệu, chỉ mục, giao dịch đang mở và bộ đếm", () => {
    const { session } = play("CREATE INDEX i ON orders (customer_id); BEGIN; DELETE FROM orders WHERE id <= 3; INSERT INTO customers (name) VALUES ('Z')");
    const back = deserializeSession(JSON.parse(JSON.stringify(serializeSession(session))));
    expect(back).not.toBeNull();
    expect(back!.indexes).toEqual(session.indexes);
    expect(back!.tx?.changed).toBe(4);
    expect(back!.db.orders.rows).toEqual(session.db.orders.rows);
    expect(back!.db.customers.pk).toBe("id");
    // Sau khi nạp lại, ROLLBACK vẫn hoàn tác đúng.
    const r = runSql(back!, "ROLLBACK").session;
    expect(r.db.orders.rows).toHaveLength(16);
    expect(r.db.customers.rows).toHaveLength(12);
  });

  it("dữ liệu lạ hoặc hỏng thì trả null để bắt đầu lại từ dữ liệu mẫu", () => {
    expect(deserializeSession(null)).toBeNull();
    expect(deserializeSession("x")).toBeNull();
    expect(deserializeSession({ v: 99 })).toBeNull();
    const good = JSON.parse(JSON.stringify(serializeSession(createSession())));
    expect(deserializeSession(good)).not.toBeNull();
    expect(deserializeSession({ ...good, rows: { ...good.rows, orders: [{ id: { x: 1 } }] } })).toBeNull();
    expect(deserializeSession({ ...good, rows: { ...good.rows, orders: "no" } })).toBeNull();
    expect(deserializeSession({ ...good, indexes: [{ name: "i", table: "orders", columns: ["khong_co"] }] })).toBeNull();
    expect(deserializeSession({ ...good, stats: { rolledBackRows: "1" } })).toBeNull();
  });
});

describe("nhiệm vụ ghi dữ liệu", () => {
  it("đủ bảy nhiệm vụ, có chữ vi và en đủ nhãn tiêu chí, en không dấu tiếng Việt", () => {
    const vi = toolSqlVi.toolSql.missions as Record<string, { criteria: Record<string, string> }>;
    const en = toolSqlEn.toolSql.missions as Record<string, { criteria: Record<string, string> }>;
    for (const id of WRITE_IDS) {
      const m = SQL_MISSIONS.find((x) => x.id === id)!;
      expect(m.kind, id).toBe("write");
      expect(Object.keys(vi[id].criteria).sort(), id).toEqual(["changed", "match"]);
      expect(Object.keys(en[id].criteria).sort(), id).toEqual(["changed", "match"]);
      for (const key of ["from", "title", "brief", "hint"]) {
        expect(String((en[id] as unknown as Record<string, string>)[key]), `${id}.${key}`).not.toMatch(
          /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i,
        );
      }
    }
  });

  it("đỏ ở trạng thái khởi đầu, kể cả khi chạy vài câu SELECT", () => {
    const start = missionState(createSession(), null);
    const afterSelect = play("SELECT * FROM orders").outcome;
    for (const id of WRITE_IDS) {
      const m = SQL_MISSIONS.find((x) => x.id === id)!;
      expect(m.check(start), id).toBe(false);
      expect(m.criteria.some((c) => c.check(start)), id).toBe(false);
      expect(m.check(missionState(createSession(), afterSelect)), id).toBe(false);
    }
  });

  it("xanh với câu tham chiếu, tiêu chí cuối chính là check, artifact chạy được", () => {
    for (const id of WRITE_IDS) {
      const m = SQL_MISSIONS.find((x) => x.id === id)!;
      const { session, outcome } = play(m.reference);
      expect(outcome.ok, id).toBe(true);
      const state = missionState(session, outcome);
      expect(m.check(state), id).toBe(true);
      expect(m.criteria.map((c) => c.check(state)), id).toEqual(m.criteria.map(() => true));
      expect(m.criteria[m.criteria.length - 1].check, id).toBe(m.check);
      if (m.artifact) {
        const shown = execute(session.db, m.artifact);
        expect(shown.ok && shown.result.rows.length, id).toBeGreaterThan(0);
      }
    }
  });

  it("insert-customer: cách viết khác qua; thiếu cột, sai giá trị hoặc thêm hai lần thì trượt", () => {
    expect(
      passesWrite("insert-customer", "INSERT INTO customers (id, name, city, email, joined_at) VALUES (50, 'Tran Minh Anh', 'Vinh', 'anh.tran@mail.vn', '2026-01-01')"),
    ).toBe(true);
    expect(passesWrite("insert-customer", "INSERT INTO customers (name, city, email) VALUES ('Tran Minh Anh', 'Vinh', 'anh.tran@mail.vn')")).toBe(true);
    expect(passesWrite("insert-customer", "INSERT INTO customers (name, city) VALUES ('Tran Minh Anh', 'Vinh')")).toBe(false);
    expect(passesWrite("insert-customer", "INSERT INTO customers (name, city, email) VALUES ('Tran Minh Anh', 'Hue', 'anh.tran@mail.vn')")).toBe(false);
    const twice = "INSERT INTO customers (name, city, email) VALUES ('Tran Minh Anh', 'Vinh', 'anh.tran@mail.vn')";
    expect(passesWrite("insert-customer", twice, twice)).toBe(false);
    // Thiếu danh sách cột: 5 cột mà chỉ 3 giá trị → lỗi, không thêm gì.
    expect(passesWrite("insert-customer", "INSERT INTO customers VALUES ('Tran Minh Anh', 'Vinh', 'anh.tran@mail.vn')")).toBe(false);
  });

  it("update-one-price: WHERE id qua; quên WHERE hoặc sửa nhầm dòng thì đỏ, rồi khôi phục sửa lại được", () => {
    expect(passesWrite("update-one-price", "UPDATE products SET price = 22990000 WHERE name = 'Laptop đồ hoạ 16 inch'")).toBe(true);
    expect(passesWrite("update-one-price", "UPDATE products SET price = 22990000")).toBe(false);
    expect(passesWrite("update-one-price", "UPDATE products SET price = 22990000 WHERE id = 1")).toBe(false);
    expect(passesWrite("update-one-price", "UPDATE products SET price = 22990000 WHERE id = 2 OR id = 3")).toBe(false);
    expect(passesWrite("update-one-price", "UPDATE products SET price = '22990000' WHERE id = 2")).toBe(true);
    // Quên WHERE rồi chỉ sửa tiếp dòng 2 vẫn đỏ: 11 sản phẩm kia đã hỏng.
    expect(passesWrite("update-one-price", "UPDATE products SET price = 22990000", "UPDATE products SET price = 22990000 WHERE id = 2")).toBe(false);
    // Bọc trong giao dịch, thấy sai, ROLLBACK, làm lại đúng → xanh.
    expect(
      passesWrite(
        "update-one-price",
        "BEGIN; UPDATE products SET price = 22990000;",
        "ROLLBACK",
        "UPDATE products SET price = 22990000 WHERE id = 2",
      ),
    ).toBe(true);
  });

  it("update-accessories: cần cả hai điều kiện và đúng phép trừ", () => {
    const ok = "UPDATE products SET price = price - 50000 WHERE category = 'Phụ kiện' AND price > 500000";
    expect(passesWrite("update-accessories", ok)).toBe(true);
    expect(passesWrite("update-accessories", "UPDATE products SET price = price - 50000 WHERE category = 'Phụ kiện'")).toBe(false);
    expect(passesWrite("update-accessories", "UPDATE products SET price = price - 50000 WHERE price > 500000")).toBe(false);
    expect(passesWrite("update-accessories", "UPDATE products SET price = 50000 WHERE category = 'Phụ kiện' AND price > 500000")).toBe(false);
    expect(passesWrite("update-accessories", ok, ok)).toBe(false);
  });

  it("delete-cancelled: đúng đơn huỷ qua; quên WHERE hoặc sai trạng thái trượt; dọn luôn dòng hàng mồ côi cũng qua", () => {
    expect(passesWrite("delete-cancelled", "DELETE FROM orders WHERE status = 'cancelled'")).toBe(true);
    expect(passesWrite("delete-cancelled", "DELETE FROM orders WHERE id IN (3, 15)")).toBe(true);
    expect(passesWrite("delete-cancelled", "DELETE FROM orders WHERE status = 'cancelled'; DELETE FROM order_items WHERE order_id IN (3, 15)")).toBe(true);
    expect(passesWrite("delete-cancelled", "DELETE FROM orders")).toBe(false);
    expect(passesWrite("delete-cancelled", "DELETE FROM orders WHERE status = 'canceled'")).toBe(false);
    expect(passesWrite("delete-cancelled", "DELETE FROM orders WHERE status <> 'delivered'")).toBe(false);
    expect(passesWrite("delete-cancelled", "DELETE FROM orders WHERE status = 'cancelled'; DELETE FROM customers WHERE id = 12")).toBe(false);
  });

  it("rollback-delete: cần ROLLBACK một thay đổi lớn; COMMIT, thay đổi nhỏ hay quên đóng giao dịch đều trượt", () => {
    expect(passesWrite("rollback-delete", "BEGIN; DELETE FROM orders; ROLLBACK;")).toBe(true);
    expect(passesWrite("rollback-delete", "BEGIN", "DELETE FROM orders", "SELECT COUNT(*) FROM orders", "ROLLBACK")).toBe(true);
    expect(passesWrite("rollback-delete", "BEGIN; UPDATE products SET price = 0; UPDATE orders SET status = 'x'; ROLLBACK;")).toBe(true);
    expect(passesWrite("rollback-delete", "BEGIN; DELETE FROM orders; COMMIT;")).toBe(false);
    expect(passesWrite("rollback-delete", "BEGIN; DELETE FROM orders;")).toBe(false);
    expect(passesWrite("rollback-delete", "BEGIN; DELETE FROM orders WHERE id = 1; ROLLBACK;")).toBe(false);
    expect(passesWrite("rollback-delete", "SELECT COUNT(*) FROM orders")).toBe(false);
    // Xoá thật rồi ROLLBACK một giao dịch rỗng: dữ liệu mất nên đỏ.
    expect(passesWrite("rollback-delete", "DELETE FROM orders", "BEGIN; ROLLBACK;")).toBe(false);
  });

  it("create-index-search: phải có chỉ mục ĐÚNG cột và chứng minh bằng EXPLAIN", () => {
    const explain = "EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 1";
    expect(passesWrite("create-index-search", "CREATE INDEX i1 ON orders (customer_id)", explain)).toBe(true);
    expect(passesWrite("create-index-search", "CREATE INDEX i1 ON orders (customer_id, status)", "EXPLAIN SELECT id FROM orders WHERE customer_id = 2")).toBe(true);
    // Chưa chạy lại EXPLAIN sau khi tạo chỉ mục: chưa xác nhận.
    expect(passesWrite("create-index-search", explain, "CREATE INDEX i1 ON orders (customer_id)")).toBe(false);
    // Chỉ mục trên cột khác, hoặc cột đứng sau, hoặc đã xoá lại: vẫn SCAN.
    expect(passesWrite("create-index-search", "CREATE INDEX i1 ON orders (status)", explain)).toBe(false);
    expect(passesWrite("create-index-search", "CREATE INDEX i1 ON orders (status, customer_id)", explain)).toBe(false);
    expect(passesWrite("create-index-search", "CREATE INDEX i1 ON orders (customer_id)", "DROP INDEX i1", explain)).toBe(false);
    // EXPLAIN truy vấn khác không tính.
    expect(passesWrite("create-index-search", "CREATE INDEX i1 ON orders (customer_id)", "EXPLAIN SELECT * FROM orders WHERE status = 'x'")).toBe(false);
    // Chỉ mục nằm trong giao dịch chưa COMMIT thì chưa xong.
    expect(passesWrite("create-index-search", "BEGIN; CREATE INDEX i1 ON orders (customer_id); " + explain)).toBe(false);
    expect(passesWrite("create-index-search", "BEGIN; CREATE INDEX i1 ON orders (customer_id); COMMIT;", explain)).toBe(true);
  });

  it("insert-select-reorder: DISTINCT đúng một đơn mỗi khách; thiếu DISTINCT, sai giá trị hay chạy hai lần thì trượt", () => {
    const ok = "INSERT INTO orders (customer_id, order_date, status, shipping_fee) SELECT DISTINCT customer_id, '2026-09-01', 'pending', 0 FROM orders WHERE status = 'delivered'";
    expect(passesWrite("insert-select-reorder", ok)).toBe(true);
    const grouped = ok.replace("SELECT DISTINCT customer_id,", "SELECT customer_id,") + " GROUP BY customer_id";
    expect(passesWrite("insert-select-reorder", grouped)).toBe(true);
    expect(passesWrite("insert-select-reorder", ok.replace("SELECT DISTINCT", "SELECT"))).toBe(false);
    expect(passesWrite("insert-select-reorder", ok.replace("'pending'", "'draft'"))).toBe(false);
    expect(passesWrite("insert-select-reorder", ok.replace("WHERE status = 'delivered'", ""))).toBe(false);
    expect(passesWrite("insert-select-reorder", ok, ok)).toBe(false);
    const { session } = play(ok);
    expect(count(session, "SELECT COUNT(*) FROM orders")).toBe(24);
    expect(runQuery(session.db, "SELECT MIN(id), MAX(id) FROM orders WHERE order_date = '2026-09-01'").rows).toEqual([[17, 24]]);
  });

  it("nhiệm vụ đọc cũ chạy y nguyên qua phiên: cùng kết quả như trên SAMPLE_DB", () => {
    for (const m of SQL_MISSIONS.filter((x) => x.kind !== "write")) {
      const { session, outcome } = play(m.reference);
      expect(m.check(missionState(session, outcome)), m.id).toBe(true);
      expect(outcome.ok && outcome.result, m.id).toEqual(runQuery(SAMPLE_DB, m.reference));
    }
  });
});
