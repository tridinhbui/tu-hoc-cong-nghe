import { describe, expect, it } from "vitest";
import { runQuery, resultsMatch, SqlError, type Database } from "../mini-sql";

const db: Database = {
  danh_muc: {
    name: "danh_muc",
    columns: ["ma", "nganh", "so_luong"],
    rows: [
      { ma: "FPT", nganh: "Công nghệ", so_luong: 1000 },
      { ma: "HPG", nganh: "Thép", so_luong: 2000 },
      { ma: "VNM", nganh: "Tiêu dùng", so_luong: 500 },
      { ma: "GAS", nganh: "Năng lượng", so_luong: 300 },
    ],
  },
  gia: {
    name: "gia",
    columns: ["ma", "gia"],
    rows: [
      { ma: "FPT", gia: 120 },
      { ma: "HPG", gia: 27 },
      { ma: "VNM", gia: 68 },
    ],
  },
};

const q = (sql: string) => runQuery(db, sql);

describe("SELECT và WHERE", () => {
  it("chọn cột và lọc", () => {
    expect(q("SELECT ma FROM danh_muc WHERE so_luong > 800").rows).toEqual([["FPT"], ["HPG"]]);
  });

  it("SELECT * lấy đủ cột theo đúng thứ tự bảng", () => {
    const r = q("SELECT * FROM gia");
    expect(r.columns).toEqual(["ma", "gia"]);
    expect(r.rows.length).toBe(3);
  });

  it("AND, OR và ngoặc đổi được kết quả", () => {
    expect(q("SELECT ma FROM danh_muc WHERE so_luong > 400 AND nganh = 'Thép'").rows).toEqual([["HPG"]]);
    expect(q("SELECT ma FROM danh_muc WHERE nganh = 'Thép' OR nganh = 'Công nghệ'").rows.length).toBe(2);
  });

  it("IN và NOT IN", () => {
    expect(q("SELECT ma FROM danh_muc WHERE ma IN ('FPT','GAS')").rows).toEqual([["FPT"], ["GAS"]]);
    expect(q("SELECT ma FROM danh_muc WHERE ma NOT IN ('FPT','GAS')").rows).toEqual([["HPG"], ["VNM"]]);
  });

  it("LIKE với dấu phần trăm", () => {
    expect(q("SELECT ma FROM danh_muc WHERE nganh LIKE 'Công%'").rows).toEqual([["FPT"]]);
  });

  it("bí danh cột bằng AS", () => {
    expect(q("SELECT ma AS mck FROM gia LIMIT 1").columns).toEqual(["mck"]);
  });
});

describe("JOIN - bài học trung tâm của bài 6", () => {
  it("INNER JOIN âm thầm đánh rơi mã không có giá", () => {
    const r = q("SELECT d.ma FROM danh_muc d JOIN gia g ON d.ma = g.ma");
    expect(r.rows.length).toBe(3);
    expect(r.rows.flat()).not.toContain("GAS");
  });

  it("JOIN trần mặc định là INNER, đúng như SQL thật", () => {
    const bare = q("SELECT d.ma FROM danh_muc d JOIN gia g ON d.ma = g.ma");
    const inner = q("SELECT d.ma FROM danh_muc d INNER JOIN gia g ON d.ma = g.ma");
    expect(bare.rows).toEqual(inner.rows);
  });

  it("LEFT JOIN giữ đủ dòng và để chỗ thiếu hiện thành NULL", () => {
    const r = q("SELECT d.ma, g.gia FROM danh_muc d LEFT JOIN gia g ON d.ma = g.ma");
    expect(r.rows.length).toBe(4);
    expect(r.rows).toContainEqual(["GAS", null]);
  });

  it("IS NULL tìm ra đúng những mã bị thiếu dữ liệu", () => {
    const r = q("SELECT d.ma FROM danh_muc d LEFT JOIN gia g ON d.ma = g.ma WHERE g.gia IS NULL");
    expect(r.rows).toEqual([["GAS"]]);
  });

  it("= NULL không bao giờ khớp - lý do phải dùng IS NULL", () => {
    const r = q("SELECT d.ma FROM danh_muc d LEFT JOIN gia g ON d.ma = g.ma WHERE g.gia = NULL");
    expect(r.rows).toEqual([]);
  });
});

describe("tổng hợp", () => {
  it("SUM trên cả bảng không cần GROUP BY", () => {
    expect(q("SELECT SUM(so_luong) FROM danh_muc").rows).toEqual([[3800]]);
  });

  it("GROUP BY gom theo cột và đếm đúng", () => {
    const r = q("SELECT nganh, COUNT(*) FROM danh_muc GROUP BY nganh");
    expect(r.rows.length).toBe(4);
  });

  it("giá trị danh mục qua JOIN rồi SUM", () => {
    const r = q("SELECT SUM(d.so_luong * g.gia) FROM danh_muc d JOIN gia g ON d.ma = g.ma");
    expect(r.rows[0][0]).toBe(1000 * 120 + 2000 * 27 + 500 * 68);
  });

  it("HAVING lọc sau khi gom, WHERE lọc trước", () => {
    const r = q("SELECT nganh, SUM(so_luong) AS tong FROM danh_muc GROUP BY nganh HAVING SUM(so_luong) > 900");
    expect(r.rows).toEqual([
      ["Công nghệ", 1000],
      ["Thép", 2000],
    ]);
  });

  it("COUNT đếm cả NULL khi dùng *, bỏ NULL khi đếm một cột", () => {
    const sql = "FROM danh_muc d LEFT JOIN gia g ON d.ma = g.ma";
    expect(q(`SELECT COUNT(*) ${sql}`).rows[0][0]).toBe(4);
    expect(q(`SELECT COUNT(g.gia) ${sql}`).rows[0][0]).toBe(3);
  });
});

describe("sắp xếp và giới hạn", () => {
  it("ORDER BY giảm dần rồi LIMIT", () => {
    expect(q("SELECT ma FROM danh_muc ORDER BY so_luong DESC LIMIT 2").rows).toEqual([["HPG"], ["FPT"]]);
  });

  it("ORDER BY trên biểu thức tổng hợp", () => {
    const r = q("SELECT nganh, SUM(so_luong) AS t FROM danh_muc GROUP BY nganh ORDER BY t DESC LIMIT 1");
    expect(r.rows).toEqual([["Thép", 2000]]);
  });
});

describe("báo lỗi", () => {
  it("tên bảng sai được gọi tên", () => {
    expect(() => q("SELECT * FROM khong_co")).toThrow(SqlError);
  });

  it("tên cột sai được gọi tên", () => {
    expect(() => q("SELECT khong_co FROM gia")).toThrow(/khong_co/);
  });

  it("thiếu FROM báo rõ thay vì im lặng", () => {
    expect(() => q("SELECT ma")).toThrow(/FROM/);
  });
});

describe("so kết quả", () => {
  const a = q("SELECT ma FROM danh_muc WHERE so_luong > 800");
  it("khác thứ tự dòng vẫn khớp khi truy vấn không ORDER BY", () => {
    const flipped = { columns: a.columns, rows: [...a.rows].reverse() };
    expect(resultsMatch(a, flipped, false)).toBe(true);
    expect(resultsMatch(a, flipped, true)).toBe(false);
  });

  it("thiếu một dòng thì không khớp", () => {
    expect(resultsMatch(a, { columns: a.columns, rows: a.rows.slice(1) }, false)).toBe(false);
  });
});
