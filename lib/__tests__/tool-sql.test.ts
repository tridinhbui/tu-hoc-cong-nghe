import { describe, expect, it } from "vitest";
import { runQuery } from "../mini-sql";
import { execute, lintQuery, resultCovers, closest } from "../tools/sql/engine";
import { SAMPLE_DB, SAMPLE_SCHEMA, createSampleDb } from "../tools/sql/sample-db";
import { SQL_MISSIONS, SQL_MISSION_IDS } from "../tools/sql/missions";
import { toolSqlVi, toolSqlEn } from "../i18n/dictionaries/sections/tool-sql";

const run = (sql: string) => {
  const out = execute(SAMPLE_DB, sql);
  if (!out.ok) throw new Error(`${sql} -> ${out.error.message}`);
  return out.result;
};

describe("cơ sở dữ liệu mẫu", () => {
  it("schema khớp dữ liệu và mỗi bảng có 10-30 dòng", () => {
    for (const s of SAMPLE_SCHEMA) {
      const table = SAMPLE_DB[s.name];
      expect(table.columns).toEqual(s.columns.map((c) => c.name));
      expect(table.rows.length).toBeGreaterThanOrEqual(10);
      expect(table.rows.length).toBeLessThanOrEqual(30);
    }
  });

  it("khoá ngoại đều trỏ tới dòng có thật", () => {
    const ids = (t: string) => new Set(SAMPLE_DB[t].rows.map((r) => r.id));
    for (const o of SAMPLE_DB.orders.rows) expect(ids("customers").has(o.customer_id)).toBe(true);
    for (const i of SAMPLE_DB.order_items.rows) {
      expect(ids("orders").has(i.order_id)).toBe(true);
      expect(ids("products").has(i.product_id)).toBe(true);
    }
  });

  it("LEFT JOIN và INNER JOIN cho kết quả khác nhau vì có khách chưa đặt đơn", () => {
    const inner = run("SELECT c.id FROM customers c JOIN orders o ON o.customer_id = c.id");
    const left = run("SELECT c.id FROM customers c LEFT JOIN orders o ON o.customer_id = c.id");
    expect(left.rows.length).toBeGreaterThan(inner.rows.length);
    const none = run("SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL");
    expect(none.rows.length).toBe(2);
  });

  it("createSampleDb trả bản mới mỗi lần", () => {
    expect(createSampleDb()).not.toBe(createSampleDb());
    expect(createSampleDb()).toEqual(SAMPLE_DB);
  });
});

describe("execute: lỗi được phân loại để gợi ý đúng chỗ", () => {
  const kindOf = (sql: string) => {
    const out = execute(SAMPLE_DB, sql);
    expect(out.ok).toBe(false);
    return out.ok ? null : out.error;
  };

  it("thiếu FROM / thiếu dấu phẩy", () => {
    expect(kindOf("SELECT name customers")?.kind).toBe("missingFrom");
    expect(kindOf("SELECT name city FROM customers")?.kind).toBe("missingFrom");
  });

  it("gõ sai SELECT", () => {
    expect(kindOf("SELEC * FROM customers")?.kind).toBe("missingSelect");
  });

  it("bảng không có, kèm gợi ý tên gần đúng", () => {
    const e = kindOf("SELECT * FROM customer");
    expect(e?.kind).toBe("unknownTable");
    expect(e?.name).toBe("customer");
    expect(e?.suggestion).toBe("customers");
  });

  it("cột không có, kèm gợi ý", () => {
    const e = kindOf("SELECT nam FROM customers");
    expect(e?.kind).toBe("unknownColumn");
    expect(e?.suggestion).toBe("name");
  });

  it("quên nháy quanh chữ", () => {
    expect(kindOf("SELECT name FROM customers WHERE city = Hà Nội")?.kind).toBe("trailing");
  });

  it("GROUP thiếu BY, JOIN thiếu ON, chuỗi chưa đóng", () => {
    expect(kindOf("SELECT status, COUNT(*) FROM orders GROUP status")?.kind).toBe("missingBy");
    expect(kindOf("SELECT * FROM customers c JOIN orders o")?.kind).toBe("joinSyntax");
    expect(kindOf("SELECT * FROM customers WHERE city = 'Hà Nội")?.kind).toBe("unclosedString");
  });

  it("mọi loại lỗi đều có gợi ý ở cả hai ngôn ngữ", () => {
    for (const k of Object.keys(toolSqlVi.toolSql.errorHints)) {
      expect(toolSqlEn.toolSql.errorHints[k as keyof typeof toolSqlVi.toolSql.errorHints]).toBeTruthy();
    }
  });

  it("thành công thì có thời gian chạy", () => {
    const out = execute(SAMPLE_DB, "SELECT * FROM products");
    expect(out.ok).toBe(true);
    expect(out.ms).toBeGreaterThanOrEqual(0);
  });

  it("closest không đoán bừa khi quá xa", () => {
    expect(closest("xyzabc", ["customers"])).toBeUndefined();
    expect(closest("Customers", ["customers"])).toBe("customers");
  });
});

describe("lintQuery: lỗi hợp lệ cú pháp mà bộ máy không báo", () => {
  it("trộn cột thường với COUNT mà không GROUP BY", () => {
    expect(lintQuery("SELECT status, COUNT(*) FROM orders")).toContain("aggregateWithoutGroupBy");
    expect(lintQuery("SELECT status, COUNT(*) FROM orders GROUP BY status")).toEqual([]);
    expect(lintQuery("SELECT COUNT(*) FROM orders")).toEqual([]);
  });

  it("= NULL", () => {
    expect(lintQuery("SELECT * FROM orders WHERE status = NULL")).toContain("equalsNull");
    expect(lintQuery("SELECT * FROM orders WHERE status IS NULL")).toEqual([]);
    expect(lintQuery("SELECT * FROM orders WHERE status = 'x = NULL'")).toEqual([]);
  });
});

describe("resultCovers", () => {
  const expected = runQuery(SAMPLE_DB, "SELECT name FROM customers WHERE city = 'Hà Nội'");

  it("bỏ qua tên cột, cột thừa và thứ tự dòng khi không yêu cầu", () => {
    expect(resultCovers(run("SELECT id, name AS ten, city FROM customers WHERE city = 'Hà Nội' ORDER BY id DESC"), expected, false)).toBe(true);
  });

  it("sai số dòng thì trượt", () => {
    expect(resultCovers(run("SELECT name FROM customers"), expected, false)).toBe(false);
  });

  it("thứ tự dòng được chấm khi ordered", () => {
    const ref = runQuery(SAMPLE_DB, "SELECT name FROM products ORDER BY price DESC LIMIT 5");
    expect(resultCovers(run("SELECT name, price FROM products ORDER BY price DESC LIMIT 5"), ref, true)).toBe(true);
    expect(resultCovers(run("SELECT name FROM products ORDER BY price LIMIT 5"), ref, true)).toBe(false);
  });
});

/** Một cách giải của học viên cho từng nhiệm vụ - viết khác câu tham chiếu. */
const SOLUTIONS: Record<string, string> = {
  "select-all": "SELECT * FROM customers;",
  "where-city": "SELECT * FROM customers WHERE city = 'Hà Nội'",
  "order-limit": "SELECT name, price FROM products ORDER BY price DESC LIMIT 5",
  "group-count": "SELECT status, COUNT(*) AS so_don FROM orders GROUP BY status ORDER BY so_don DESC",
  "having-avg": "SELECT category, AVG(price) AS tb FROM products GROUP BY category HAVING AVG(price) > 5000000",
  "left-join-null":
    "SELECT customers.name, orders.id FROM customers LEFT JOIN orders ON customers.id = orders.customer_id WHERE orders.id IS NULL",
  "best-sellers":
    "SELECT p.name, SUM(i.quantity) AS total FROM products p JOIN order_items i ON i.product_id = p.id GROUP BY p.id ORDER BY total DESC LIMIT 3",
  "revenue-per-customer":
    "SELECT c.id, c.name, SUM(i.quantity * p.price) AS revenue FROM orders o JOIN customers c ON c.id = o.customer_id JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id GROUP BY c.id ORDER BY revenue DESC LIMIT 10",
};

/** Lỗi thường gặp - phải KHÔNG qua nhiệm vụ. */
const WRONG: Record<string, string> = {
  "where-city": "SELECT name FROM customers WHERE city = 'Hồ Chí Minh'",
  "order-limit": "SELECT name FROM products ORDER BY price LIMIT 5",
  "group-count": "SELECT status, COUNT(*) FROM orders",
  "having-avg": "SELECT category FROM products WHERE price > 5000000 GROUP BY category",
  "left-join-null": "SELECT c.name FROM customers c JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL",
  "best-sellers": "SELECT p.name, COUNT(*) AS n FROM products p JOIN order_items i ON i.product_id = p.id GROUP BY p.id ORDER BY n DESC LIMIT 3",
  // Đúng số liệu nhưng quên xếp hạng: CEO hỏi "cao nhất", thứ tự là một phần đáp án.
  "revenue-per-customer":
    "SELECT c.name, SUM(i.quantity * p.price) AS revenue FROM customers c JOIN orders o ON o.customer_id = c.id JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id GROUP BY c.name ORDER BY revenue ASC",
};

describe("nhiệm vụ", () => {
  it("6-8 nhiệm vụ, id không trùng", () => {
    expect(SQL_MISSIONS.length).toBeGreaterThanOrEqual(6);
    expect(SQL_MISSIONS.length).toBeLessThanOrEqual(8);
    expect(new Set(SQL_MISSION_IDS).size).toBe(SQL_MISSION_IDS.length);
  });

  it("mọi nhiệm vụ có tên và gợi ý ở cả vi và en", () => {
    const vi = toolSqlVi.toolSql.missions as Record<string, { title: string; hint: string }>;
    const en = toolSqlEn.toolSql.missions as Record<string, { title: string; hint: string }>;
    for (const id of SQL_MISSION_IDS) {
      expect(vi[id]?.title, id).toBeTruthy();
      expect(vi[id]?.hint, id).toBeTruthy();
      expect(en[id]?.title, id).toBeTruthy();
      expect(en[id]?.hint, id).toBeTruthy();
    }
    expect(Object.keys(vi).sort()).toEqual([...SQL_MISSION_IDS].sort());
  });

  it("câu tham chiếu tự qua nhiệm vụ của nó", () => {
    for (const m of SQL_MISSIONS) {
      expect(m.check({ result: run(m.reference) }), m.id).toBe(true);
    }
  });

  it("mỗi nhiệm vụ làm được bằng một câu viết khác câu tham chiếu", () => {
    for (const m of SQL_MISSIONS) {
      const sql = SOLUTIONS[m.id];
      expect(sql, m.id).toBeTruthy();
      expect(m.check({ result: run(sql) }), m.id).toBe(true);
    }
  });

  it("lỗi hay gặp không qua được nhiệm vụ", () => {
    for (const [id, sql] of Object.entries(WRONG)) {
      const m = SQL_MISSIONS.find((x) => x.id === id)!;
      expect(m.check({ result: run(sql) }), id).toBe(false);
    }
  });

  it("chưa chạy gì thì không nhiệm vụ nào xong", () => {
    for (const m of SQL_MISSIONS) expect(m.check({ result: null })).toBe(false);
  });

  it("đáp án mẫu có số liệu đúng như dữ liệu được thiết kế", () => {
    expect(run("SELECT name FROM customers WHERE city = 'Hà Nội'").rows.length).toBe(4);
    expect(run("SELECT category FROM products GROUP BY category HAVING AVG(price) > 5000000").rows.flat().sort()).toEqual(
      ["Laptop", "Điện thoại"].sort(),
    );
    const best = run(SQL_MISSIONS.find((m) => m.id === "best-sellers")!.reference);
    expect(best.rows.map((r) => r[1])).toEqual([7, 6, 5]);
  });
});
