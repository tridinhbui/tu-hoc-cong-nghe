// Một bộ máy SQL nhỏ, đủ để học viên gõ truy vấn thật trong bài Excel số 6.
//
// Phạm vi đúng bằng phạm vi bài học: SELECT [DISTINCT], WHERE (kể cả BETWEEN),
// JOIN, GROUP BY, HAVING, ORDER BY, LIMIT, năm hàm tổng hợp, CASE WHEN, vài hàm
// vô hướng (COALESCE, ROUND, SUBSTR, LOWER, UPPER, LENGTH) và truy vấn con
// KHÔNG tương quan (IN (SELECT ...), (SELECT ...) như một giá trị). Không có
// window function, không truy vấn con tương quan, không DDL - bài học không
// dạy chúng và một bộ máy nửa vời sẽ dạy sai nhiều hơn dạy đúng.
//
// Điểm quan trọng nhất được giữ đúng như thật: INNER JOIN âm thầm làm mất
// dòng, LEFT JOIN giữ lại và để chỗ thiếu hiện thành NULL. Cả bài học xoay
// quanh sự khác biệt đó, nên nó phải chạy được chứ không thể chỉ được mô tả.

export type SqlValue = string | number | null;
export type Row = Record<string, SqlValue>;
export type Table = { name: string; columns: string[]; rows: Row[] };
export type Database = Record<string, Table>;

export class SqlError extends Error {}

export type QueryResult = { columns: string[]; rows: SqlValue[][] };

/* ------------------------------------------------------------------ *
 * Tokenizer
 * ------------------------------------------------------------------ */

type Tok = { t: "word" | "num" | "str" | "op" | "punc"; v: string };

const OPS = ["<=", ">=", "<>", "!=", "=", "<", ">", "+", "-", "*", "/"];

function lex(sql: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < sql.length) {
    const c = sql[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (c === "'" || c === '"') {
      let j = i + 1;
      let v = "";
      while (j < sql.length && sql[j] !== c) {
        v += sql[j];
        j++;
      }
      if (j >= sql.length) throw new SqlError("Chuỗi chưa được đóng dấu nháy");
      out.push({ t: "str", v });
      i = j + 1;
      continue;
    }
    if (c === "(" || c === ")" || c === "," || c === ".") {
      out.push({ t: "punc", v: c });
      i++;
      continue;
    }
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < sql.length && /[0-9._]/.test(sql[j])) j++;
      out.push({ t: "num", v: sql.slice(i, j) });
      i = j;
      continue;
    }
    const op = OPS.find((o) => sql.startsWith(o, i));
    if (op) {
      out.push({ t: "op", v: op });
      i += op.length;
      continue;
    }
    if (/[A-Za-z_\u00C0-\u1EF9]/.test(c)) {
      let j = i;
      while (j < sql.length && /[A-Za-z0-9_\u00C0-\u1EF9]/.test(sql[j])) j++;
      out.push({ t: "word", v: sql.slice(i, j) });
      i = j;
      continue;
    }
    throw new SqlError(`Ký tự không hiểu: ${c}`);
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Cây biểu thức
 * ------------------------------------------------------------------ */

type Expr =
  | { k: "col"; name: string }
  | { k: "lit"; v: SqlValue }
  | { k: "bin"; op: string; l: Expr; r: Expr }
  | { k: "agg"; fn: string; arg: Expr | "*"; distinct?: boolean }
  | { k: "not"; e: Expr }
  | { k: "in"; e: Expr; list: Expr[]; negated: boolean }
  | { k: "isnull"; e: Expr; negated: boolean }
  | { k: "like"; e: Expr; pattern: string; negated: boolean }
  | { k: "between"; e: Expr; lo: Expr; hi: Expr; negated: boolean }
  | { k: "case"; operand?: Expr; whens: { when: Expr; then: Expr }[]; otherwise?: Expr }
  | { k: "fn"; name: string; args: Expr[] }
  | { k: "sub"; q: Query }
  | { k: "insub"; e: Expr; q: Query; negated: boolean };

const FUNCS = new Set(["COALESCE", "ROUND", "SUBSTR", "SUBSTRING", "LOWER", "UPPER", "LENGTH"]);

const AGGS = new Set(["SUM", "COUNT", "AVG", "MIN", "MAX"]);
const KEYWORDS = new Set([
  "SELECT", "FROM", "WHERE", "GROUP", "BY", "HAVING", "ORDER", "LIMIT", "JOIN",
  "INNER", "LEFT", "ON", "AS", "AND", "OR", "NOT", "IN", "IS", "NULL", "LIKE",
  "ASC", "DESC", "DISTINCT", "BETWEEN", "CASE", "WHEN", "THEN", "ELSE", "END",
]);

type Select = { expr: Expr; alias: string };
type Join = { type: "INNER" | "LEFT"; table: string; alias: string; left: Expr; right: Expr };

type Query = {
  distinct: boolean;
  select: Select[];
  star: boolean;
  from: { table: string; alias: string };
  joins: Join[];
  where?: Expr;
  groupBy: Expr[];
  having?: Expr;
  orderBy: { expr: Expr; desc: boolean }[];
  limit?: number;
};

class Parser {
  private i = 0;
  constructor(private toks: Tok[]) {}

  private peek() {
    return this.toks[this.i];
  }
  private isWord(w: string) {
    const tk = this.peek();
    return tk?.t === "word" && tk.v.toUpperCase() === w;
  }
  private eatWord(w: string) {
    if (!this.isWord(w)) return false;
    this.i++;
    return true;
  }
  private expectWord(w: string) {
    if (!this.eatWord(w)) throw new SqlError(`Thiếu từ khoá ${w}`);
  }
  private isPunc(p: string) {
    const tk = this.peek();
    return tk?.t === "punc" && tk.v === p;
  }
  private eatPunc(p: string) {
    if (!this.isPunc(p)) return false;
    this.i++;
    return true;
  }

  parse(): Query {
    const q = this.parseSelect();
    if (this.i < this.toks.length) throw new SqlError(`Thừa nội dung ở cuối: ${this.toks[this.i].v}`);
    return q;
  }

  private parseSelect(): Query {
    this.expectWord("SELECT");
    const distinct = this.eatWord("DISTINCT");
    const select: Select[] = [];
    let star = false;
    if (this.peek()?.t === "op" && this.peek()!.v === "*") {
      this.i++;
      star = true;
    } else {
      for (;;) {
        const expr = this.expr(0);
        let alias = exprLabel(expr);
        if (this.eatWord("AS")) {
          const tk = this.peek();
          if (tk?.t !== "word" && tk?.t !== "str") throw new SqlError("Thiếu tên sau AS");
          alias = tk.v;
          this.i++;
        }
        select.push({ expr, alias });
        if (!this.eatPunc(",")) break;
      }
    }

    this.expectWord("FROM");
    const from = this.tableRef();

    const joins: Join[] = [];
    for (;;) {
      let type: "INNER" | "LEFT" | null = null;
      if (this.eatWord("INNER")) type = "INNER";
      else if (this.eatWord("LEFT")) {
        this.eatWord("OUTER");
        type = "LEFT";
      }
      if (this.isWord("JOIN")) {
        this.i++;
        // JOIN trần mặc định là INNER, đúng như SQL thật - và đó chính là lý
        // do những dòng bị mất không ai để ý.
        const t = this.tableRef();
        this.expectWord("ON");
        const cond = this.expr(0);
        if (cond.k !== "bin" || cond.op !== "=") throw new SqlError("Điều kiện ON phải có dạng a = b");
        joins.push({ type: type ?? "INNER", table: t.table, alias: t.alias, left: cond.l, right: cond.r });
        continue;
      }
      if (type) throw new SqlError("Thiếu từ khoá JOIN");
      break;
    }

    const where = this.eatWord("WHERE") ? this.expr(0) : undefined;

    const groupBy: Expr[] = [];
    if (this.eatWord("GROUP")) {
      this.expectWord("BY");
      for (;;) {
        groupBy.push(this.expr(0));
        if (!this.eatPunc(",")) break;
      }
    }

    const having = this.eatWord("HAVING") ? this.expr(0) : undefined;

    const orderBy: { expr: Expr; desc: boolean }[] = [];
    if (this.eatWord("ORDER")) {
      this.expectWord("BY");
      for (;;) {
        const expr = this.expr(0);
        const desc = this.eatWord("DESC") ? true : (this.eatWord("ASC"), false);
        orderBy.push({ expr, desc });
        if (!this.eatPunc(",")) break;
      }
    }

    let limit: number | undefined;
    if (this.eatWord("LIMIT")) {
      const tk = this.peek();
      if (tk?.t !== "num") throw new SqlError("LIMIT cần một số");
      limit = Number(tk.v);
      this.i++;
    }

    return { distinct, select, star, from, joins, where, groupBy, having, orderBy, limit };
  }

  private tableRef() {
    const tk = this.peek();
    if (tk?.t !== "word") throw new SqlError("Thiếu tên bảng");
    this.i++;
    const table = tk.v;
    let alias = table;
    this.eatWord("AS");
    const nx = this.peek();
    if (nx?.t === "word" && !KEYWORDS.has(nx.v.toUpperCase())) {
      alias = nx.v;
      this.i++;
    }
    return { table, alias };
  }

  private expr(min: number): Expr {
    let left = this.unary();
    for (;;) {
      const tk = this.peek();
      if (!tk) break;
      if (tk.t === "word") {
        const w = tk.v.toUpperCase();
        if (w === "AND" && min <= 1) {
          this.i++;
          left = { k: "bin", op: "AND", l: left, r: this.expr(2) };
          continue;
        }
        if (w === "OR" && min <= 0) {
          this.i++;
          left = { k: "bin", op: "OR", l: left, r: this.expr(1) };
          continue;
        }
        if (w === "IS" && min <= 3) {
          this.i++;
          const negated = this.eatWord("NOT");
          this.expectWord("NULL");
          left = { k: "isnull", e: left, negated };
          continue;
        }
        if ((w === "IN" || w === "NOT" || w === "LIKE" || w === "BETWEEN") && min <= 3) {
          const negated = w === "NOT";
          if (negated) this.i++;
          if (this.eatWord("BETWEEN")) {
            const lo = this.expr(4);
            this.expectWord("AND");
            const hi = this.expr(4);
            left = { k: "between", e: left, lo, hi, negated };
            continue;
          }
          if (this.eatWord("IN")) {
            if (!this.eatPunc("(")) throw new SqlError("IN cần danh sách trong ngoặc");
            if (this.isWord("SELECT")) {
              const q = this.parseSelect();
              if (!this.eatPunc(")")) throw new SqlError("Thiếu dấu đóng ngoặc của truy vấn con");
              left = { k: "insub", e: left, q, negated };
              continue;
            }
            const list: Expr[] = [];
            for (;;) {
              list.push(this.expr(4));
              if (!this.eatPunc(",")) break;
            }
            if (!this.eatPunc(")")) throw new SqlError("Thiếu dấu đóng ngoặc của IN");
            left = { k: "in", e: left, list, negated };
            continue;
          }
          if (this.eatWord("LIKE")) {
            const tkp = this.peek();
            if (tkp?.t !== "str") throw new SqlError("LIKE cần một chuỗi mẫu");
            this.i++;
            left = { k: "like", e: left, pattern: tkp.v, negated };
            continue;
          }
          if (negated) throw new SqlError("Sau NOT cần IN, LIKE, BETWEEN hoặc NULL");
        }
        break;
      }
      if (tk.t !== "op") break;
      const prec = ["=", "<>", "!=", "<", ">", "<=", ">="].includes(tk.v) ? 3 : ["+", "-"].includes(tk.v) ? 4 : 5;
      if (prec < min) break;
      this.i++;
      left = { k: "bin", op: tk.v, l: left, r: this.expr(prec + 1) };
    }
    return left;
  }

  private unary(): Expr {
    if (this.eatWord("NOT")) return { k: "not", e: this.expr(3) };
    const tk = this.peek();
    if (!tk) throw new SqlError("Truy vấn kết thúc giữa chừng");
    if (tk.t === "num") {
      this.i++;
      return { k: "lit", v: Number(tk.v) };
    }
    if (tk.t === "str") {
      this.i++;
      return { k: "lit", v: tk.v };
    }
    if (this.eatPunc("(")) {
      if (this.isWord("SELECT")) {
        const q = this.parseSelect();
        if (!this.eatPunc(")")) throw new SqlError("Thiếu dấu đóng ngoặc của truy vấn con");
        return { k: "sub", q };
      }
      const e = this.expr(0);
      if (!this.eatPunc(")")) throw new SqlError("Thiếu dấu đóng ngoặc");
      return e;
    }
    if (tk.t === "op" && tk.v === "-") {
      this.i++;
      const e = this.unary();
      return { k: "bin", op: "-", l: { k: "lit", v: 0 }, r: e };
    }
    if (tk.t === "word") {
      const w = tk.v.toUpperCase();
      this.i++;
      if (w === "NULL") return { k: "lit", v: null };
      if (w === "CASE") {
        const operand = this.isWord("WHEN") ? undefined : this.expr(0);
        const whens: { when: Expr; then: Expr }[] = [];
        while (this.eatWord("WHEN")) {
          const when = this.expr(0);
          this.expectWord("THEN");
          whens.push({ when, then: this.expr(0) });
        }
        if (whens.length === 0) throw new SqlError("CASE cần ít nhất một WHEN ... THEN");
        const otherwise = this.eatWord("ELSE") ? this.expr(0) : undefined;
        this.expectWord("END");
        return { k: "case", operand, whens, otherwise };
      }
      if (FUNCS.has(w) && this.isPunc("(")) {
        this.i++;
        const args: Expr[] = [];
        if (!this.isPunc(")")) {
          for (;;) {
            args.push(this.expr(0));
            if (!this.eatPunc(",")) break;
          }
        }
        if (!this.eatPunc(")")) throw new SqlError(`Thiếu dấu đóng ngoặc của ${w}`);
        return { k: "fn", name: w, args };
      }
      if (AGGS.has(w) && this.isPunc("(")) {
        this.i++;
        const distinct = this.eatWord("DISTINCT");
        let arg: Expr | "*";
        if (this.peek()?.t === "op" && this.peek()!.v === "*") {
          this.i++;
          arg = "*";
        } else {
          arg = this.expr(0);
        }
        if (!this.eatPunc(")")) throw new SqlError(`Thiếu dấu đóng ngoặc của ${w}`);
        return { k: "agg", fn: w, arg, distinct };
      }
      let name = tk.v;
      if (this.eatPunc(".")) {
        const nx = this.peek();
        if (nx?.t !== "word") throw new SqlError("Thiếu tên cột sau dấu chấm");
        name = `${name}.${nx.v}`;
        this.i++;
      }
      return { k: "col", name };
    }
    throw new SqlError(`Không đọc được: ${tk.v}`);
  }
}

function exprLabel(e: Expr): string {
  switch (e.k) {
    case "col":
      return e.name;
    case "lit":
      return String(e.v);
    case "agg":
      return `${e.fn}(${e.arg === "*" ? "*" : exprLabel(e.arg)})`;
    case "fn":
      return `${e.name}(${e.args.map(exprLabel).join(", ")})`;
    case "case":
      return "CASE";
    default:
      return "?";
  }
}

/* ------------------------------------------------------------------ *
 * Thực thi
 * ------------------------------------------------------------------ */

function lookup(row: Row, name: string): SqlValue {
  if (name in row) return row[name];
  const short = name.includes(".") ? name.slice(name.indexOf(".") + 1) : name;
  if (short in row) return row[short];
  // Cột chỉ ghi tên trần nhưng dữ liệu đang mang tiền tố bảng.
  const suffix = "." + short.toLowerCase();
  for (const key of Object.keys(row)) {
    if (key.toLowerCase().endsWith(suffix)) return row[key];
  }
  throw new SqlError(`Không có cột "${name}"`);
}

function cmp(a: SqlValue, b: SqlValue): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a ?? "").localeCompare(String(b ?? ""), "vi");
}

function truthy(v: SqlValue | boolean): boolean {
  if (v === null || v === undefined) return false;
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  return v !== "";
}

// Cơ sở dữ liệu đang chạy, để truy vấn con (không tương quan) tìm được bảng.
// Bộ máy chạy đồng bộ nên một biến mô-đun là đủ; runQuery lưu và khôi phục nó.
let activeDb: Database | null = null;

function evalExpr(e: Expr, row: Row, group?: Row[]): SqlValue | boolean {
  switch (e.k) {
    case "sub": {
      const r = execQuery(activeDb!, e.q);
      return r.rows[0]?.[0] ?? null;
    }
    case "insub": {
      const v = evalExpr(e.e, row, group) as SqlValue;
      const vals = execQuery(activeDb!, e.q).rows.map((r) => r[0] ?? null);
      return inResult(v, vals, e.negated);
    }
    case "between": {
      const v = evalExpr(e.e, row, group) as SqlValue;
      const lo = evalExpr(e.lo, row, group) as SqlValue;
      const hi = evalExpr(e.hi, row, group) as SqlValue;
      if (v === null || lo === null || hi === null) return false;
      const hit = cmp(v, lo) >= 0 && cmp(v, hi) <= 0;
      return e.negated ? !hit : hit;
    }
    case "case": {
      const operand = e.operand ? (evalExpr(e.operand, row, group) as SqlValue) : undefined;
      for (const w of e.whens) {
        const c = evalExpr(w.when, row, group);
        const hit = e.operand ? looseEq(operand as SqlValue, c as SqlValue) : truthy(c);
        if (hit) return evalExpr(w.then, row, group);
      }
      return e.otherwise ? evalExpr(e.otherwise, row, group) : null;
    }
    case "fn": {
      const args = e.args.map((a) => evalExpr(a, row, group) as SqlValue);
      return callFn(e.name, args);
    }
    case "lit":
      return e.v;
    case "col":
      return lookup(row, e.name);
    case "not":
      return !truthy(evalExpr(e.e, row, group));
    case "isnull": {
      const v = evalExpr(e.e, row, group);
      const isNull = v === null || v === undefined;
      return e.negated ? !isNull : isNull;
    }
    case "in": {
      const v = evalExpr(e.e, row, group) as SqlValue;
      return inResult(
        v,
        e.list.map((item) => evalExpr(item, row, group) as SqlValue),
        e.negated,
      );
    }
    case "like": {
      const v = String(evalExpr(e.e, row, group) ?? "");
      const rx = new RegExp(
        "^" + e.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/%/g, ".*").replace(/_/g, ".") + "$",
        "i",
      );
      const hit = rx.test(v);
      return e.negated ? !hit : hit;
    }
    case "agg": {
      if (!group) throw new SqlError(`${e.fn} chỉ dùng được cùng GROUP BY hoặc trên cả bảng`);
      let vals: SqlValue[];
      if (e.arg === "*") vals = group.map(() => 1);
      else vals = group.map((r) => evalExpr(e.arg as Expr, r) as SqlValue).filter((v) => v !== null && v !== undefined);
      if (e.distinct) vals = [...new Set(vals)];
      if (e.fn === "COUNT") return vals.length;
      const nums = vals.map((v) => (typeof v === "number" ? v : Number(v))).filter((v) => !Number.isNaN(v));
      if (nums.length === 0) return null;
      if (e.fn === "SUM") return nums.reduce((s, x) => s + x, 0);
      if (e.fn === "AVG") return nums.reduce((s, x) => s + x, 0) / nums.length;
      return e.fn === "MIN" ? Math.min(...nums) : Math.max(...nums);
    }
    case "bin": {
      if (e.op === "AND") return truthy(evalExpr(e.l, row, group)) && truthy(evalExpr(e.r, row, group));
      if (e.op === "OR") return truthy(evalExpr(e.l, row, group)) || truthy(evalExpr(e.r, row, group));
      const l = evalExpr(e.l, row, group) as SqlValue;
      const r = evalExpr(e.r, row, group) as SqlValue;
      switch (e.op) {
        case "=":
          return looseEq(l, r);
        case "<>":
        case "!=":
          return !looseEq(l, r);
        case "<":
          return cmp(l, r) < 0;
        case ">":
          return cmp(l, r) > 0;
        case "<=":
          return cmp(l, r) <= 0;
        case ">=":
          return cmp(l, r) >= 0;
      }
      // NULL lan qua phép tính: 5 + NULL là NULL, không phải 5.
      if (l === null || r === null) return null;
      const a = Number(l);
      const b = Number(r);
      if (Number.isNaN(a) || Number.isNaN(b)) return null;
      if (e.op === "+") return a + b;
      if (e.op === "-") return a - b;
      if (e.op === "*") return a * b;
      if (e.op === "/") return b === 0 ? null : a / b;
      throw new SqlError(`Toán tử lạ: ${e.op}`);
    }
  }
}

/** IN / NOT IN theo đúng SQL: NULL trong danh sách làm NOT IN không bao giờ đúng. */
function inResult(v: SqlValue, vals: SqlValue[], negated: boolean): boolean {
  if (v === null || v === undefined) return false;
  const hit = vals.some((x) => looseEq(v, x));
  if (!negated) return hit;
  if (hit) return false;
  return !vals.some((x) => x === null || x === undefined);
}

function callFn(name: string, args: SqlValue[]): SqlValue {
  const need = (n: number) => {
    if (args.length < n) throw new SqlError(`${name} cần ít nhất ${n} tham số`);
  };
  switch (name) {
    case "COALESCE":
      need(1);
      return args.find((a) => a !== null && a !== undefined) ?? null;
    case "ROUND": {
      need(1);
      if (args[0] === null) return null;
      const n = Number(args[0]);
      if (Number.isNaN(n)) return null;
      const d = args[1] === undefined || args[1] === null ? 0 : Number(args[1]);
      const f = 10 ** d;
      return Math.round(n * f) / f;
    }
    case "SUBSTR":
    case "SUBSTRING": {
      need(2);
      if (args[0] === null) return null;
      const str = String(args[0]);
      const start = Math.max(Number(args[1]), 1) - 1;
      return args[2] === undefined || args[2] === null ? str.slice(start) : str.slice(start, start + Number(args[2]));
    }
    case "LOWER":
      need(1);
      return args[0] === null ? null : String(args[0]).toLowerCase();
    case "UPPER":
      need(1);
      return args[0] === null ? null : String(args[0]).toUpperCase();
    default:
      need(1);
      return args[0] === null ? null : String(args[0]).length;
  }
}

function looseEq(a: SqlValue, b: SqlValue): boolean {
  // NULL không bằng gì cả, kể cả NULL - đúng như SQL thật, và đúng lý do phải
  // dùng IS NULL thay vì = NULL.
  if (a === null || b === null || a === undefined || b === undefined) return false;
  if (typeof a === "number" || typeof b === "number") return Number(a) === Number(b);
  return String(a) === String(b);
}

function hasAgg(e: Expr): boolean {
  switch (e.k) {
    case "agg":
      return true;
    case "bin":
      return hasAgg(e.l) || hasAgg(e.r);
    case "not":
      return hasAgg(e.e);
    case "in":
      return hasAgg(e.e) || e.list.some(hasAgg);
    case "insub":
      return hasAgg(e.e);
    case "between":
      return hasAgg(e.e) || hasAgg(e.lo) || hasAgg(e.hi);
    case "case":
      return (
        (!!e.operand && hasAgg(e.operand)) ||
        e.whens.some((w) => hasAgg(w.when) || hasAgg(w.then)) ||
        (!!e.otherwise && hasAgg(e.otherwise))
      );
    case "fn":
      return e.args.some(hasAgg);
    case "isnull":
    case "like":
      return hasAgg(e.e);
    default:
      return false;
  }
}

function prefixed(table: Table, alias: string): Row[] {
  return table.rows.map((r) => {
    const out: Row = {};
    for (const col of table.columns) {
      out[col] = r[col] ?? null;
      out[`${alias}.${col}`] = r[col] ?? null;
    }
    return out;
  });
}

export function runQuery(db: Database, sql: string): QueryResult {
  const q = new Parser(lex(sql.replace(/;\s*$/, ""))).parse();
  const previous = activeDb;
  activeDb = db;
  try {
    return execQuery(db, q);
  } finally {
    activeDb = previous;
  }
}

function execQuery(db: Database, q: Query): QueryResult {
  const base = db[q.from.table];
  if (!base) throw new SqlError(`Không có bảng "${q.from.table}"`);
  let rows = prefixed(base, q.from.alias);

  for (const join of q.joins) {
    const other = db[join.table];
    if (!other) throw new SqlError(`Không có bảng "${join.table}"`);
    const otherRows = prefixed(other, join.alias);
    const nullRow: Row = Object.fromEntries(
      other.columns.flatMap((c) => [
        [c, null],
        [`${join.alias}.${c}`, null],
      ]),
    );
    const out: Row[] = [];
    for (const left of rows) {
      const matches = otherRows.filter((right) => {
        const merged = { ...left, ...right };
        return looseEq(evalExpr(join.left, merged) as SqlValue, evalExpr(join.right, merged) as SqlValue);
      });
      if (matches.length === 0) {
        // Đây là chỗ INNER JOIN đánh rơi dòng mà không nói gì.
        if (join.type === "LEFT") out.push({ ...left, ...nullRow });
        continue;
      }
      for (const right of matches) out.push({ ...left, ...right });
    }
    rows = out;
  }

  if (q.where) rows = rows.filter((r) => truthy(evalExpr(q.where!, r)));

  // Bí danh ở SELECT dùng được trong GROUP BY (SQLite, MySQL đều cho), nhưng
  // chỉ khi tên đó không phải một cột có thật - cột có thật luôn thắng.
  const byAlias = new Map(q.select.map((s) => [s.alias.toLowerCase(), s.expr]));
  const resolveGroup = (g: Expr): Expr => {
    if (g.k !== "col" || rows.length === 0) return g;
    const aliased = byAlias.get(g.name.toLowerCase());
    if (!aliased) return g;
    try {
      lookup(rows[0], g.name);
      return g;
    } catch {
      return aliased;
    }
  };
  const groupBy = q.groupBy.map(resolveGroup);

  const aggregated = q.groupBy.length > 0 || q.select.some((s) => hasAgg(s.expr));

  let resultRows: { row: Row; group: Row[] }[];
  if (!aggregated) {
    resultRows = rows.map((row) => ({ row, group: [row] }));
  } else if (q.groupBy.length === 0) {
    resultRows = [{ row: rows[0] ?? {}, group: rows }];
  } else {
    const buckets = new Map<string, Row[]>();
    for (const row of rows) {
      const key = JSON.stringify(groupBy.map((g) => evalExpr(g, row)));
      const bucket = buckets.get(key);
      if (bucket) bucket.push(row);
      else buckets.set(key, [row]);
    }
    resultRows = [...buckets.values()].map((group) => ({ row: group[0], group }));
  }

  if (q.having) resultRows = resultRows.filter((r) => truthy(evalExpr(q.having!, r.row, r.group)));

  // ORDER BY được viết bằng bí danh ở SELECT là cách viết thường gặp nhất
  // ("ORDER BY tong DESC"), nên phải trả nó về biểu thức gốc trước khi tính.
  const resolve = (e: Expr): Expr => (e.k === "col" ? (byAlias.get(e.name.toLowerCase()) ?? e) : e);

  for (const ord of [...q.orderBy].reverse()) {
    const expr = resolve(ord.expr);
    resultRows = [...resultRows].sort((a, b) => {
      const av = evalExpr(expr, a.row, a.group) as SqlValue;
      const bv = evalExpr(expr, b.row, b.group) as SqlValue;
      return (ord.desc ? -1 : 1) * cmp(av, bv);
    });
  }

  const columns = q.star
    ? [...base.columns, ...q.joins.flatMap((j) => db[j.table].columns)]
    : q.select.map((s) => s.alias);

  const out = resultRows.map(({ row, group }) =>
    q.star
      ? columns.map((c) => row[c] ?? null)
      : q.select.map((s) => {
          const v = evalExpr(s.expr, row, aggregated ? group : undefined);
          return typeof v === "boolean" ? (v ? 1 : 0) : v;
        }),
  );

  let finalRows = out;
  if (q.distinct) {
    const seen = new Set<string>();
    finalRows = out.filter((r) => {
      const key = JSON.stringify(r);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  if (q.limit !== undefined) finalRows = finalRows.slice(0, q.limit);

  return { columns, rows: finalRows };
}

/** So hai kết quả, bỏ qua thứ tự cột và thứ tự dòng khi truy vấn không ORDER BY. */
export function resultsMatch(actual: QueryResult, expected: QueryResult, ordered: boolean): boolean {
  if (actual.rows.length !== expected.rows.length) return false;
  if (actual.columns.length !== expected.columns.length) return false;
  const norm = (rows: SqlValue[][]) =>
    rows.map((r) => r.map((v) => (typeof v === "number" ? Math.round(v * 1000) / 1000 : v)));
  const a = norm(actual.rows);
  const b = norm(expected.rows);
  if (ordered) return JSON.stringify(a) === JSON.stringify(b);
  const key = (rows: SqlValue[][]) => rows.map((r) => JSON.stringify(r)).sort();
  return JSON.stringify(key(a)) === JSON.stringify(key(b));
}
