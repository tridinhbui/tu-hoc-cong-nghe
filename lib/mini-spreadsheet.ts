// Một bộ máy công thức nhỏ, đủ để học viên gõ công thức thật ngay trong bài
// học thay vì đọc mô tả về công thức.
//
// Phạm vi được chọn theo đúng những gì sáu bài Excel dạy: tham chiếu ô và
// vùng, tham chiếu tuyệt đối, nhóm hàm tra cứu, nhóm hàm tổng hợp có điều
// kiện, và các giá trị lỗi. Không có mảng động, không có hàm ngày tháng,
// không có định dạng - những thứ đó không phải nội dung bài học nào ở đây.
//
// Hai đặc điểm được giữ lại vì chính chúng là bài học:
//   - Lỗi lan truyền như trong Excel: một ô lỗi làm mọi ô phụ thuộc lỗi theo,
//     nên học viên thấy được vì sao #N/A ở một góc bảng phá cả mô hình.
//   - Tham chiếu vòng bị phát hiện và báo tên chuỗi ô tạo ra nó, thay vì treo.
//     Bài 3 dạy đúng vòng lặp lãi vay này.

export type CellValue = number | string | boolean | ExcelError;

export type ExcelErrorCode =
  | "#N/A"
  | "#VALUE!"
  | "#REF!"
  | "#DIV/0!"
  | "#NAME?"
  | "#NUM!"
  | "#CIRC!";

export class ExcelError {
  constructor(
    readonly code: ExcelErrorCode,
    readonly detail?: string,
  ) {}
  toString() {
    return this.code;
  }
}

export function isError(v: unknown): v is ExcelError {
  return v instanceof ExcelError;
}

/** Ô có thể là giá trị tĩnh (`value`) hoặc công thức (`formula`, bắt đầu bằng "="). */
export type Cell = { value?: CellValue; formula?: string };
export type Sheet = Record<string, Cell>;

/* ------------------------------------------------------------------ *
 * Địa chỉ ô
 * ------------------------------------------------------------------ */

const REF_RE = /^(\$?)([A-Z]{1,2})(\$?)(\d{1,4})$/;

export function colToIndex(col: string): number {
  let n = 0;
  for (const ch of col) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n;
}

export function indexToCol(index: number): string {
  let n = index;
  let out = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    out = String.fromCharCode(65 + rem) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out;
}

export function parseRef(ref: string): { col: number; row: number } | null {
  const m = REF_RE.exec(ref.toUpperCase());
  if (!m) return null;
  return { col: colToIndex(m[2]), row: Number(m[4]) };
}

/** Bỏ dấu $ để tra vào sheet - sheet luôn được khoá theo địa chỉ tương đối. */
export function normalizeRef(ref: string): string {
  const m = REF_RE.exec(ref.toUpperCase());
  if (!m) return ref.toUpperCase();
  return m[2] + m[4];
}

export function expandRange(a: string, b: string): string[] {
  const from = parseRef(a);
  const to = parseRef(b);
  if (!from || !to) return [];
  const out: string[] = [];
  const c1 = Math.min(from.col, to.col);
  const c2 = Math.max(from.col, to.col);
  const r1 = Math.min(from.row, to.row);
  const r2 = Math.max(from.row, to.row);
  // Duyệt theo cột trước rồi tới dòng: INDEX/MATCH trên một vùng một chiều
  // cần thứ tự đọc khớp với thứ tự người dùng nhìn thấy trên lưới.
  for (let c = c1; c <= c2; c++) {
    for (let r = r1; r <= r2; r++) out.push(indexToCol(c) + r);
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Tokenizer
 * ------------------------------------------------------------------ */

type Token =
  | { t: "num"; v: number }
  | { t: "str"; v: string }
  | { t: "ref"; v: string }
  | { t: "range"; a: string; b: string }
  | { t: "name"; v: string }
  | { t: "op"; v: string }
  | { t: "lp" }
  | { t: "rp" }
  | { t: "comma" };

const OPS = [">=", "<=", "<>", "+", "-", "*", "/", "^", "&", "=", "<", ">"];

export function tokenize(src: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  const s = src.trim();
  while (i < s.length) {
    const ch = s[i];
    if (ch === " " || ch === "\t" || ch === "\n") {
      i++;
      continue;
    }
    if (ch === "(") {
      out.push({ t: "lp" });
      i++;
      continue;
    }
    if (ch === ")") {
      out.push({ t: "rp" });
      i++;
      continue;
    }
    if (ch === "," || ch === ";") {
      out.push({ t: "comma" });
      i++;
      continue;
    }
    if (ch === '"') {
      let j = i + 1;
      let v = "";
      while (j < s.length) {
        if (s[j] === '"' && s[j + 1] === '"') {
          v += '"';
          j += 2;
          continue;
        }
        if (s[j] === '"') break;
        v += s[j];
        j++;
      }
      out.push({ t: "str", v });
      i = j + 1;
      continue;
    }
    const op = OPS.find((o) => s.startsWith(o, i));
    if (op) {
      out.push({ t: "op", v: op });
      i += op.length;
      continue;
    }
    if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(s[i + 1] ?? ""))) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      // Cho phép cả "1.234,5" kiểu Việt Nam ở phần giá trị tĩnh; trong công
      // thức thì dấu chấm là dấu thập phân như Excel bản tiếng Anh.
      out.push({ t: "num", v: Number(s.slice(i, j)) });
      i = j;
      continue;
    }
    if (/[A-Za-z_$]/.test(ch)) {
      let j = i;
      while (j < s.length && /[A-Za-z0-9_.$]/.test(s[j])) j++;
      const word = s.slice(i, j);
      // Vùng: A1:B9
      if (s[j] === ":" && REF_RE.test(word.toUpperCase())) {
        let k = j + 1;
        while (k < s.length && /[A-Za-z0-9$]/.test(s[k])) k++;
        const second = s.slice(j + 1, k);
        if (REF_RE.test(second.toUpperCase())) {
          out.push({ t: "range", a: normalizeRef(word), b: normalizeRef(second) });
          i = k;
          continue;
        }
      }
      if (REF_RE.test(word.toUpperCase()) && s[j] !== "(") {
        out.push({ t: "ref", v: normalizeRef(word) });
        i = j;
        continue;
      }
      out.push({ t: "name", v: word.toUpperCase() });
      i = j;
      continue;
    }
    throw new ExcelError("#NAME?", `Ký tự không hiểu: ${ch}`);
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Parser (precedence climbing)
 * ------------------------------------------------------------------ */

export type Node =
  | { k: "num"; v: number }
  | { k: "str"; v: string }
  | { k: "ref"; v: string }
  | { k: "range"; a: string; b: string }
  | { k: "call"; name: string; args: Node[] }
  | { k: "bin"; op: string; l: Node; r: Node }
  | { k: "neg"; e: Node }
  | { k: "pct"; e: Node };

const PREC: Record<string, number> = {
  "=": 1,
  "<": 1,
  ">": 1,
  "<=": 1,
  ">=": 1,
  "<>": 1,
  "&": 2,
  "+": 3,
  "-": 3,
  "*": 4,
  "/": 4,
  "^": 5,
};

export function parse(tokens: Token[]): Node {
  let p = 0;
  const peek = () => tokens[p];

  function primary(): Node {
    const tk = tokens[p];
    if (!tk) throw new ExcelError("#VALUE!", "Công thức kết thúc giữa chừng");
    if (tk.t === "num") {
      p++;
      return { k: "num", v: tk.v };
    }
    if (tk.t === "str") {
      p++;
      return { k: "str", v: tk.v };
    }
    if (tk.t === "ref") {
      p++;
      return { k: "ref", v: tk.v };
    }
    if (tk.t === "range") {
      p++;
      return { k: "range", a: tk.a, b: tk.b };
    }
    if (tk.t === "op" && tk.v === "-") {
      p++;
      return { k: "neg", e: primary() };
    }
    if (tk.t === "op" && tk.v === "+") {
      p++;
      return primary();
    }
    if (tk.t === "lp") {
      p++;
      const e = expr(0);
      if (peek()?.t !== "rp") throw new ExcelError("#VALUE!", "Thiếu dấu đóng ngoặc");
      p++;
      return e;
    }
    if (tk.t === "name") {
      const name = tk.v;
      p++;
      if (peek()?.t !== "lp") {
        if (name === "TRUE") return { k: "num", v: 1 };
        if (name === "FALSE") return { k: "num", v: 0 };
        throw new ExcelError("#NAME?", `Không biết tên "${name}"`);
      }
      p++;
      const args: Node[] = [];
      if (peek()?.t === "rp") {
        p++;
        return { k: "call", name, args };
      }
      for (;;) {
        args.push(expr(0));
        const nx = peek();
        if (nx?.t === "comma") {
          p++;
          continue;
        }
        if (nx?.t === "rp") {
          p++;
          break;
        }
        throw new ExcelError("#VALUE!", `Thiếu dấu đóng ngoặc cho ${name}`);
      }
      return { k: "call", name, args };
    }
    throw new ExcelError("#VALUE!", "Không đọc được công thức");
  }

  function expr(minPrec: number): Node {
    let left = primary();
    for (;;) {
      const tk = peek();
      if (!tk || tk.t !== "op") break;
      const prec = PREC[tk.v];
      if (prec === undefined || prec < minPrec) break;
      p++;
      // ^ kết hợp phải, phần còn lại kết hợp trái
      const right = expr(tk.v === "^" ? prec : prec + 1);
      left = { k: "bin", op: tk.v, l: left, r: right };
    }
    return left;
  }

  const out = expr(0);
  if (p !== tokens.length) throw new ExcelError("#VALUE!", "Thừa ký tự ở cuối công thức");
  return out;
}

/* ------------------------------------------------------------------ *
 * Ép kiểu
 * ------------------------------------------------------------------ */

export function toNumber(v: CellValue | undefined): number | ExcelError {
  if (v === undefined || v === "" || v === null) return 0;
  if (isError(v)) return v;
  if (typeof v === "number") return v;
  if (typeof v === "boolean") return v ? 1 : 0;
  const cleaned = v.trim().replace(/\s/g, "").replace(/%$/, "");
  if (cleaned === "") return 0;
  const n = Number(cleaned.replace(/,/g, ""));
  if (Number.isNaN(n)) return new ExcelError("#VALUE!", `"${v}" không phải số`);
  return v.trim().endsWith("%") ? n / 100 : n;
}

export function toText(v: CellValue | undefined): string {
  if (v === undefined || v === null) return "";
  if (isError(v)) return v.code;
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  return String(v);
}

/** So khớp kiểu Excel: không phân biệt hoa thường, số và chuỗi số coi là một. */
export function looseEquals(a: CellValue | undefined, b: CellValue | undefined): boolean {
  if (isError(a) || isError(b)) return false;
  const an = typeof a === "number" ? a : Number(String(a ?? "").trim());
  const bn = typeof b === "number" ? b : Number(String(b ?? "").trim());
  if (!Number.isNaN(an) && !Number.isNaN(bn) && String(a ?? "").trim() !== "" && String(b ?? "").trim() !== "") {
    return an === bn;
  }
  // Cố ý KHÔNG cắt khoảng trắng: "HPG " khác "HPG" trong Excel, và chính sự
  // khác biệt vô hình đó là nguyên nhân số một của lỗi tra cứu mà bài 2 dạy.
  // Cắt hộ ở đây sẽ làm bài tập luôn chạy đúng và xoá mất bài học.
  return toText(a).toLowerCase() === toText(b).toLowerCase();
}

/** Điều kiện dạng ">100", "<>x", "Hà Nội" như trong SUMIF/COUNTIF. */
export function matchesCriterion(value: CellValue | undefined, criterion: CellValue): boolean {
  const raw = toText(criterion).trim();
  const m = /^(>=|<=|<>|>|<|=)(.*)$/.exec(raw);
  if (!m) return looseEquals(value, criterion);
  const [, op, rest] = m;
  const target: CellValue = rest.trim() === "" ? "" : Number.isNaN(Number(rest)) ? rest.trim() : Number(rest);
  if (op === "=") return looseEquals(value, target);
  if (op === "<>") return !looseEquals(value, target);
  const a = toNumber(value);
  const b = toNumber(target);
  if (isError(a) || isError(b)) return false;
  if (op === ">") return a > b;
  if (op === "<") return a < b;
  if (op === ">=") return a >= b;
  return a <= b;
}

/* ------------------------------------------------------------------ *
 * Evaluator
 * ------------------------------------------------------------------ */

type Ctx = {
  sheet: Sheet;
  /** Ô đang tính, theo thứ tự - dùng để phát hiện và mô tả tham chiếu vòng. */
  stack: string[];
  cache: Map<string, CellValue>;
};

/** Giá trị của một Node, có thể là vùng (mảng) khi tham số cần vùng. */
type Val = CellValue | CellValue[];

function flat(v: Val): CellValue[] {
  return Array.isArray(v) ? v : [v];
}

function single(v: Val): CellValue {
  if (!Array.isArray(v)) return v;
  if (v.length === 1) return v[0];
  return new ExcelError("#VALUE!", "Cần một ô, nhận được cả một vùng");
}

function numericList(v: Val): number[] | ExcelError {
  const out: number[] = [];
  for (const item of flat(v)) {
    if (isError(item)) return item;
    // Vùng chứa chữ thì bỏ qua, giống SUM của Excel.
    if (typeof item === "string" && item.trim() !== "" && Number.isNaN(Number(item.replace(/,/g, "")))) {
      continue;
    }
    if (item === "" || item === undefined) continue;
    const n = toNumber(item);
    if (isError(n)) return n;
    out.push(n);
  }
  return out;
}

export function evaluateCell(sheet: Sheet, ref: string): CellValue {
  return evalRef({ sheet, stack: [], cache: new Map() }, normalizeRef(ref));
}

function evalRef(ctx: Ctx, ref: string): CellValue {
  const key = normalizeRef(ref);
  if (ctx.cache.has(key)) return ctx.cache.get(key)!;
  if (ctx.stack.includes(key)) {
    const loop = [...ctx.stack.slice(ctx.stack.indexOf(key)), key].join(" → ");
    return new ExcelError("#CIRC!", loop);
  }
  const cell = ctx.sheet[key];
  if (!cell) return "";
  if (cell.formula === undefined) {
    const v = cell.value ?? "";
    ctx.cache.set(key, v);
    return v;
  }
  ctx.stack.push(key);
  let out: CellValue;
  try {
    out = evalFormula(ctx, cell.formula);
  } catch (e) {
    out = isError(e) ? e : new ExcelError("#VALUE!");
  } finally {
    ctx.stack.pop();
  }
  // Không cache khi đang ở trong một vòng lặp chưa đóng: giá trị #CIRC! chỉ
  // đúng cho lần duyệt này chứ không đúng cho ô đó nói chung.
  if (!(isError(out) && out.code === "#CIRC!")) ctx.cache.set(key, out);
  return out;
}

export function evalFormula(ctx: Ctx, formula: string): CellValue {
  const src = formula.startsWith("=") ? formula.slice(1) : formula;
  if (src.trim() === "") return "";
  const node = parse(tokenize(src));
  return single(evalNode(ctx, node));
}

function evalNode(ctx: Ctx, n: Node): Val {
  switch (n.k) {
    case "num":
      return n.v;
    case "str":
      return n.v;
    case "ref":
      return evalRef(ctx, n.v);
    case "range":
      return expandRange(n.a, n.b).map((r) => evalRef(ctx, r));
    case "neg": {
      const v = toNumber(single(evalNode(ctx, n.e)));
      return isError(v) ? v : -v;
    }
    case "pct": {
      const v = toNumber(single(evalNode(ctx, n.e)));
      return isError(v) ? v : v / 100;
    }
    case "bin":
      return evalBin(ctx, n);
    case "call":
      return evalCall(ctx, n);
  }
}

function evalBin(ctx: Ctx, n: Extract<Node, { k: "bin" }>): Val {
  const l = single(evalNode(ctx, n.l));
  const r = single(evalNode(ctx, n.r));
  if (isError(l)) return l;
  if (isError(r)) return r;
  if (n.op === "&") return toText(l) + toText(r);
  if (n.op === "=") return looseEquals(l, r);
  if (n.op === "<>") return !looseEquals(l, r);
  const a = toNumber(l);
  const b = toNumber(r);
  if (isError(a)) return a;
  if (isError(b)) return b;
  switch (n.op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? new ExcelError("#DIV/0!") : a / b;
    case "^":
      return a ** b;
    case "<":
      return a < b;
    case ">":
      return a > b;
    case "<=":
      return a <= b;
    case ">=":
      return a >= b;
  }
  return new ExcelError("#VALUE!", `Toán tử lạ: ${n.op}`);
}

function firstError(vals: Val[]): ExcelError | null {
  for (const v of vals) for (const item of flat(v)) if (isError(item)) return item;
  return null;
}

function evalCall(ctx: Ctx, n: Extract<Node, { k: "call" }>): Val {
  const name = n.name;

  // IF và IFERROR phải lười: nhánh không chọn thì không được tính, nếu không
  // IFERROR(A1/B1, 0) sẽ vẫn nổ #DIV/0! trước khi kịp bắt.
  if (name === "IF") {
    if (n.args.length < 2) return new ExcelError("#VALUE!", "IF cần ít nhất 2 tham số");
    const cond = single(evalNode(ctx, n.args[0]));
    if (isError(cond)) return cond;
    const truthy = typeof cond === "boolean" ? cond : toNumber(cond) !== 0;
    if (truthy) return evalNode(ctx, n.args[1]);
    return n.args[2] ? evalNode(ctx, n.args[2]) : false;
  }
  if (name === "IFERROR" || name === "IFNA") {
    const v = evalNode(ctx, n.args[0]);
    const err = firstError([v]);
    if (err && (name === "IFERROR" || err.code === "#N/A")) {
      return n.args[1] ? evalNode(ctx, n.args[1]) : "";
    }
    return v;
  }

  const args = n.args.map((a) => evalNode(ctx, a));

  switch (name) {
    case "SUM":
    case "AVERAGE":
    case "MEDIAN":
    case "MIN":
    case "MAX":
    case "PRODUCT": {
      const nums: number[] = [];
      for (const a of args) {
        const list = numericList(a);
        if (isError(list)) return list;
        nums.push(...list);
      }
      if (name === "SUM") return nums.reduce((s, x) => s + x, 0);
      if (name === "PRODUCT") return nums.reduce((s, x) => s * x, 1);
      if (nums.length === 0) return new ExcelError("#DIV/0!", "Không có số nào");
      if (name === "AVERAGE") return nums.reduce((s, x) => s + x, 0) / nums.length;
      if (name === "MEDIAN") {
        // Trung vị, không phải trung bình - và đây là lý do nó tồn tại ở đây:
        // định giá so sánh dùng trung vị bội số của nhóm ngang hàng, vì một
        // công ty bị định giá lệch sẽ kéo trung bình đi mà không kéo trung vị.
        const sorted = [...nums].sort((x, y) => x - y);
        const mid = sorted.length >> 1;
        return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
      }
      return name === "MIN" ? Math.min(...nums) : Math.max(...nums);
    }
    case "COUNT": {
      let c = 0;
      for (const a of args)
        for (const v of flat(a)) if (typeof v === "number" || (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v)))) c++;
      return c;
    }
    case "COUNTA": {
      let c = 0;
      for (const a of args) for (const v of flat(a)) if (v !== "" && v !== undefined) c++;
      return c;
    }
    case "ABS":
    case "ROUND":
    case "ROUNDUP":
    case "ROUNDDOWN":
    case "INT":
    case "SQRT": {
      const x = toNumber(single(args[0]));
      if (isError(x)) return x;
      if (name === "ABS") return Math.abs(x);
      if (name === "INT") return Math.floor(x);
      if (name === "SQRT") return x < 0 ? new ExcelError("#NUM!") : Math.sqrt(x);
      const dRaw = args[1] === undefined ? 0 : toNumber(single(args[1]));
      if (isError(dRaw)) return dRaw;
      const f = 10 ** dRaw;
      if (name === "ROUNDUP") return (x < 0 ? -1 : 1) * Math.ceil(Math.abs(x) * f) / f;
      if (name === "ROUNDDOWN") return (x < 0 ? -1 : 1) * Math.floor(Math.abs(x) * f) / f;
      return Math.round(Math.abs(x) * f) / f * (x < 0 ? -1 : 1);
    }
    case "TRIM":
      return toText(single(args[0])).trim().replace(/\s+/g, " ");
    case "UPPER":
      return toText(single(args[0])).toUpperCase();
    case "LOWER":
      return toText(single(args[0])).toLowerCase();
    case "LEN":
      return toText(single(args[0])).length;
    case "AND":
    case "OR": {
      const err = firstError(args);
      if (err) return err;
      const vals = args.flatMap((a) => flat(a)).map((v) => (typeof v === "boolean" ? v : toNumber(v) !== 0));
      return name === "AND" ? vals.every(Boolean) : vals.some(Boolean);
    }
    case "NOT": {
      const v = single(args[0]);
      if (isError(v)) return v;
      return !(typeof v === "boolean" ? v : toNumber(v) !== 0);
    }
    case "ISERROR":
      return firstError([args[0]]) !== null;
    case "ISNA":
      return firstError([args[0]])?.code === "#N/A";
    case "ISNUMBER": {
      const v = single(args[0]);
      return typeof v === "number";
    }
    case "SUMIF":
    case "COUNTIF": {
      const range = flat(args[0]);
      const crit = single(args[1]);
      if (isError(crit)) return crit;
      const sumRange = args[2] !== undefined ? flat(args[2]) : range;
      let total = 0;
      let count = 0;
      for (let i = 0; i < range.length; i++) {
        if (!matchesCriterion(range[i], crit)) continue;
        count++;
        const v = toNumber(sumRange[i]);
        if (isError(v)) return v;
        total += v;
      }
      return name === "COUNTIF" ? count : total;
    }
    case "SUMIFS":
    case "COUNTIFS": {
      // SUMIFS(vùng_tổng, vùng_đk1, đk1, ...) - vùng tổng đứng TRƯỚC, ngược
      // với SUMIF. Đây là chỗ nhầm phổ biến nhất và bài 2 nói thẳng về nó.
      const sumRange = name === "SUMIFS" ? flat(args[0]) : null;
      const rest = name === "SUMIFS" ? args.slice(1) : args;
      if (rest.length < 2 || rest.length % 2 !== 0) {
        return new ExcelError("#VALUE!", `${name} cần từng cặp vùng điều kiện và điều kiện`);
      }
      const len = sumRange ? sumRange.length : flat(rest[0]).length;
      let total = 0;
      let count = 0;
      for (let i = 0; i < len; i++) {
        let ok = true;
        for (let p = 0; p < rest.length; p += 2) {
          const crit = single(rest[p + 1]);
          if (isError(crit)) return crit;
          if (!matchesCriterion(flat(rest[p])[i], crit)) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;
        count++;
        if (sumRange) {
          const v = toNumber(sumRange[i]);
          if (isError(v)) return v;
          total += v;
        }
      }
      return name === "COUNTIFS" ? count : total;
    }
    case "MATCH": {
      const key = single(args[0]);
      if (isError(key)) return key;
      const range = flat(args[1]);
      const modeRaw = args[2] === undefined ? 1 : toNumber(single(args[2]));
      if (isError(modeRaw)) return modeRaw;
      if (modeRaw === 0) {
        const i = range.findIndex((v) => looseEquals(v, key));
        return i < 0 ? new ExcelError("#N/A", "Không tìm thấy khoá") : i + 1;
      }
      // Khớp gần đúng: yêu cầu vùng đã sắp xếp, đúng như Excel.
      let best = -1;
      for (let i = 0; i < range.length; i++) {
        const a = toNumber(range[i]);
        const b = toNumber(key);
        if (isError(a) || isError(b)) continue;
        if (modeRaw > 0 ? a <= b : a >= b) best = i;
      }
      return best < 0 ? new ExcelError("#N/A", "Không tìm thấy khoá") : best + 1;
    }
    case "INDEX": {
      const range = flat(args[0]);
      const iRaw = toNumber(single(args[1]));
      if (isError(iRaw)) return iRaw;
      if (iRaw < 1 || iRaw > range.length) return new ExcelError("#REF!", "Vị trí nằm ngoài vùng");
      return range[iRaw - 1];
    }
    case "XLOOKUP": {
      const key = single(args[0]);
      if (isError(key)) return key;
      const lookup = flat(args[1]);
      const ret = flat(args[2]);
      const i = lookup.findIndex((v) => looseEquals(v, key));
      if (i < 0) {
        // Tham số thứ tư là giá trị thay thế khi không tìm thấy - lý do chính
        // khiến XLOOKUP an toàn hơn VLOOKUP bọc IFERROR.
        return args[3] !== undefined ? single(args[3]) : new ExcelError("#N/A", "Không tìm thấy khoá");
      }
      return ret[i] ?? new ExcelError("#REF!", "Vùng trả về ngắn hơn vùng khoá");
    }
    case "VLOOKUP": {
      // Giữ nguyên điểm yếu thật của VLOOKUP: chỉ số cột là một con số cứng.
      const key = single(args[0]);
      if (isError(key)) return key;
      const table = n.args[1];
      if (table.k !== "range") return new ExcelError("#VALUE!", "VLOOKUP cần một vùng bảng");
      const colOff = toNumber(single(args[2]));
      if (isError(colOff)) return colOff;
      const from = parseRef(table.a)!;
      const to = parseRef(table.b)!;
      const c1 = Math.min(from.col, to.col);
      const c2 = Math.max(from.col, to.col);
      const r1 = Math.min(from.row, to.row);
      const r2 = Math.max(from.row, to.row);
      if (colOff < 1 || c1 + colOff - 1 > c2) return new ExcelError("#REF!", "Số cột vượt ra ngoài bảng");
      for (let r = r1; r <= r2; r++) {
        if (looseEquals(evalRef(ctx, indexToCol(c1) + r), key)) {
          return evalRef(ctx, indexToCol(c1 + colOff - 1) + r);
        }
      }
      return new ExcelError("#N/A", "Không tìm thấy khoá");
    }
    case "NA":
      return new ExcelError("#N/A");
  }
  return new ExcelError("#NAME?", `Bài này chưa hỗ trợ hàm ${name}`);
}

/* ------------------------------------------------------------------ *
 * Hiển thị
 * ------------------------------------------------------------------ */

export function formatValue(v: CellValue | undefined, decimals?: number): string {
  if (v === undefined || v === "") return "";
  if (isError(v)) return v.code;
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  if (typeof v === "number") {
    if (!Number.isFinite(v)) return "#NUM!";
    const d = decimals ?? (Number.isInteger(v) ? 0 : 2);
    return v.toLocaleString("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d });
  }
  return v;
}

/** So kết quả học viên với đáp án, có dung sai cho số thập phân. */
export function valuesMatch(actual: CellValue, expected: CellValue, tolerance = 0.005): boolean {
  if (isError(expected)) return isError(actual) && actual.code === expected.code;
  if (isError(actual)) return false;
  if (typeof expected === "number") {
    const a = toNumber(actual);
    if (isError(a)) return false;
    return Math.abs(a - expected) <= tolerance;
  }
  return looseEquals(actual, expected);
}
