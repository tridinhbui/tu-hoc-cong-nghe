// Kế hoạch truy vấn kiểu SQLite (EXPLAIN QUERY PLAN) cho SQL Console.
//
// Mô phỏng TRUNG THỰC nhưng cố ý hẹp: chỉ truy vấn MỘT bảng, không JOIN, không
// truy vấn con. Ngoài phạm vi đó SQLite in thêm nhiều dòng (LIST SUBQUERY,
// bước dựng chỉ mục tạm, sắp xếp...) mà bộ máy này không tính đúng, nên nó từ
// chối thay vì in một kế hoạch sai. Phần được tính là phần người học cần thấy
// tận mắt: cách ĐI VÀO bảng.
//   SCAN t                              đọc từng dòng của cả bảng
//   SEARCH t USING INDEX i (c=?)        nhảy thẳng tới các dòng khớp qua chỉ mục
//   SEARCH t USING INTEGER PRIMARY KEY (rowid=?)
// Luật chọn (đúng tinh thần của SQLite, không phải toàn bộ bộ tối ưu chi phí):
// so sánh bằng trên khoá chính > chỉ mục khớp nhiều cột đầu nhất > khoảng
// (<, >, BETWEEN) trên khoá chính > khoảng trên cột đầu của một chỉ mục > quét.
// Chỉ mục chỉ dùng được từ CỘT ĐẦU của nó trở đi: chỉ mục (a, b) không giúp gì
// cho truy vấn chỉ lọc theo b. Hàm bọc cột, OR, <>, LIKE đều làm chỉ mục vô dụng.

import { SqlError, type Database, type Expr, type Query, type Table } from "@/lib/mini-sql";

export interface IndexDef {
  name: string;
  table: string;
  columns: string[];
}

export interface PlanRow {
  id: number;
  parent: number;
  detail: string;
}

function walk(e: Expr | undefined, f: (e: Expr) => void): void {
  if (!e) return;
  f(e);
  switch (e.k) {
    case "bin":
      walk(e.l, f);
      walk(e.r, f);
      break;
    case "not":
    case "isnull":
    case "like":
      walk(e.e, f);
      break;
    case "agg":
      if (e.arg !== "*") walk(e.arg, f);
      break;
    case "in":
      walk(e.e, f);
      e.list.forEach((x) => walk(x, f));
      break;
    case "between":
      walk(e.e, f);
      walk(e.lo, f);
      walk(e.hi, f);
      break;
    case "case":
      walk(e.operand, f);
      e.whens.forEach((w) => {
        walk(w.when, f);
        walk(w.then, f);
      });
      walk(e.otherwise, f);
      break;
    case "fn":
      e.args.forEach((a) => walk(a, f));
      break;
    case "insub":
      walk(e.e, f);
      break;
    default:
      break;
  }
}

function allExprs(q: Query): Expr[] {
  return [
    ...q.select.map((s) => s.expr),
    ...(q.where ? [q.where] : []),
    ...q.groupBy,
    ...(q.having ? [q.having] : []),
    ...q.orderBy.map((o) => o.expr),
  ];
}

const isLit = (e: Expr): boolean =>
  (e.k === "lit" && e.v !== null) || (e.k === "bin" && e.op === "-" && e.l.k === "lit" && e.l.v === 0 && e.r.k === "lit");

function conjuncts(e: Expr | undefined): Expr[] {
  if (!e) return [];
  if (e.k === "bin" && e.op === "AND") return [...conjuncts(e.l), ...conjuncts(e.r)];
  return [e];
}

const FLIP: Record<string, string> = { "<": ">", ">": "<", "<=": ">=", ">=": "<=", "=": "=" };

export function explainPlan(db: Database, indexes: IndexDef[], q: Query): PlanRow[] {
  const unsupported = () =>
    new SqlError("Chưa hỗ trợ: EXPLAIN trong mô phỏng chỉ dùng cho truy vấn một bảng, không JOIN và không truy vấn con");
  if (q.joins.length > 0) throw unsupported();
  let hasSub = false;
  for (const e of allExprs(q)) walk(e, (x) => void (hasSub ||= x.k === "sub" || x.k === "insub"));
  if (hasSub) throw unsupported();

  const table: Table | undefined = db[q.from.table];
  if (!table) throw new SqlError(`Không có bảng "${q.from.table}"`);
  const { alias } = q.from;
  const label = alias !== table.name ? `${table.name} AS ${alias}` : table.name;

  const colOf = (e: Expr): string | null => {
    if (e.k !== "col") return null;
    let name = e.name;
    if (name.includes(".")) {
      const prefix = name.slice(0, name.indexOf("."));
      if (prefix.toLowerCase() !== alias.toLowerCase() && prefix.toLowerCase() !== table.name.toLowerCase()) return null;
      name = name.slice(name.indexOf(".") + 1);
    }
    return table.columns.find((c) => c.toLowerCase() === name.toLowerCase()) ?? null;
  };

  const eq = new Set<string>();
  const lo = new Set<string>();
  const hi = new Set<string>();
  const bound = (col: string, op: string) => {
    if (op === "=") eq.add(col);
    else if (op === ">" || op === ">=") lo.add(col);
    else if (op === "<" || op === "<=") hi.add(col);
  };
  for (const c of conjuncts(q.where)) {
    if (c.k === "bin") {
      const lc = colOf(c.l);
      const rc = colOf(c.r);
      if (lc && isLit(c.r)) bound(lc, c.op);
      else if (rc && isLit(c.l)) bound(rc, FLIP[c.op] ?? "?");
    } else if (c.k === "between" && !c.negated) {
      const col = colOf(c.e);
      if (col && isLit(c.lo) && isLit(c.hi)) {
        lo.add(col);
        hi.add(col);
      }
    } else if (c.k === "in" && !c.negated) {
      const col = colOf(c.e);
      if (col && c.list.length > 0 && c.list.every(isLit)) eq.add(col);
    }
  }

  const rangeTerms = (col: string, name = col) => [lo.has(col) ? `${name}>?` : null, hi.has(col) ? `${name}<?` : null].filter(Boolean) as string[];

  // Mọi cột mà truy vấn đọc: chỉ mục chứa đủ chúng (cộng khoá chính, luôn có
  // sẵn trong chỉ mục) thì SQLite không cần quay lại bảng - COVERING INDEX.
  const needed = new Set<string>();
  for (const e of allExprs(q)) {
    walk(e, (x) => {
      if (x.k === "col") {
        const c = colOf(x);
        if (c) needed.add(c);
      }
    });
  }
  const covers = (idx: IndexDef) => !q.star && [...needed].every((c) => idx.columns.includes(c) || c === table.pk);

  let detail = `SCAN ${label}`;
  const pkEq = table.pk && eq.has(table.pk);
  const mine = indexes.filter((i) => i.table === table.name);

  let best: { idx: IndexDef; k: number; range: string[] } | null = null;
  for (const idx of mine) {
    let k = 0;
    while (k < idx.columns.length && eq.has(idx.columns[k])) k++;
    const range = k < idx.columns.length ? rangeTerms(idx.columns[k]) : [];
    if (k === 0 && range.length === 0) continue;
    if (!best || k > best.k || (k === best.k && range.length > best.range.length)) best = { idx, k, range };
  }
  const viaIndex = (b: NonNullable<typeof best>) => {
    const terms = [...b.idx.columns.slice(0, b.k).map((c) => `${c}=?`), ...b.range];
    return `SEARCH ${label} USING ${covers(b.idx) ? "COVERING " : ""}INDEX ${b.idx.name} (${terms.join(" AND ")})`;
  };

  if (pkEq) detail = `SEARCH ${label} USING INTEGER PRIMARY KEY (rowid=?)`;
  else if (best && best.k >= 1) detail = viaIndex(best);
  else if (table.pk && rangeTerms(table.pk).length > 0) {
    detail = `SEARCH ${label} USING INTEGER PRIMARY KEY (${rangeTerms(table.pk, "rowid").join(" AND ")})`;
  } else if (best) detail = viaIndex(best);

  return [{ id: 2, parent: 0, detail }];
}
