// Biểu thức số học an toàn cho khối `chart` (lib/lesson-types.ts).
//
// Vì sao không dùng `new Function` / `eval`: trang bài học KHÔNG có
// 'unsafe-eval' trong CSP (xem AGENTS.md, mục Code blocks - chỉ /runners/ có),
// và dù có thì biến một chuỗi trong dữ liệu bài thành mã chạy được là mở cửa
// cho mọi thứ khác. Ngữ pháp ở đây nhỏ có chủ ý:
//
//   expr   := term (("+" | "-") term)*
//   term   := power (("*" | "/") power)*
//   power  := unary ("^" power)?          (luỹ thừa kết hợp phải)
//   unary  := "-" unary | atom
//   atom   := số | tên | tên "(" expr ("," expr)* ")" | "(" expr ")"
//
// Tên là `x` hoặc id một tham số; hàm chỉ có min, max, round, abs, floor, ceil.
// Parse một lần thành cây, tính nhiều lần khi kéo thanh trượt.

const FUNCS = {
  min: (...a) => Math.min(...a),
  max: (...a) => Math.max(...a),
  round: (v) => Math.round(v),
  abs: (v) => Math.abs(v),
  floor: (v) => Math.floor(v),
  ceil: (v) => Math.ceil(v),
};

function tokenize(src) {
  const tokens = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === " " || c === "\t") {
      i++;
      continue;
    }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      const text = src.slice(i, j);
      const value = Number(text);
      if (!Number.isFinite(value)) throw new Error(`số không hợp lệ: "${text}"`);
      tokens.push({ t: "num", value });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < src.length && /[A-Za-z0-9_]/.test(src[j])) j++;
      tokens.push({ t: "name", value: src.slice(i, j) });
      i = j;
      continue;
    }
    if ("+-*/^(),".includes(c)) {
      tokens.push({ t: c });
      i++;
      continue;
    }
    throw new Error(`ký tự không được phép: "${c}"`);
  }
  return tokens;
}

/** Parse `src` thành cây. Ném lỗi (tiếng Việt, để bộ kiểm in thẳng ra) khi sai
 *  cú pháp hoặc dùng tên không có trong `names`. */
export function parseExpr(src, names) {
  const allowed = new Set(["x", ...names]);
  const tokens = tokenize(String(src));
  let pos = 0;
  const peek = () => tokens[pos];
  const take = (t) => {
    const tok = tokens[pos];
    if (!tok || tok.t !== t) throw new Error(`cần "${t}" ở vị trí ${pos}`);
    pos++;
    return tok;
  };

  function expr() {
    let node = term();
    while (peek() && (peek().t === "+" || peek().t === "-")) {
      const op = tokens[pos++].t;
      node = { op, a: node, b: term() };
    }
    return node;
  }
  function term() {
    let node = power();
    while (peek() && (peek().t === "*" || peek().t === "/")) {
      const op = tokens[pos++].t;
      node = { op, a: node, b: power() };
    }
    return node;
  }
  function power() {
    const base = unary();
    if (peek() && peek().t === "^") {
      pos++;
      return { op: "^", a: base, b: power() };
    }
    return base;
  }
  function unary() {
    if (peek() && peek().t === "-") {
      pos++;
      return { op: "neg", a: unary() };
    }
    return atom();
  }
  function atom() {
    const tok = peek();
    if (!tok) throw new Error("biểu thức kết thúc giữa chừng");
    if (tok.t === "num") {
      pos++;
      return { op: "num", value: tok.value };
    }
    if (tok.t === "(") {
      pos++;
      const node = expr();
      take(")");
      return node;
    }
    if (tok.t === "name") {
      pos++;
      if (peek() && peek().t === "(") {
        if (!(tok.value in FUNCS)) throw new Error(`hàm không được phép: ${tok.value}`);
        pos++;
        const args = [expr()];
        while (peek() && peek().t === ",") {
          pos++;
          args.push(expr());
        }
        take(")");
        return { op: "call", fn: tok.value, args };
      }
      if (!allowed.has(tok.value)) throw new Error(`tên không có trong tham số: ${tok.value}`);
      return { op: "var", name: tok.value };
    }
    throw new Error(`không mong đợi "${tok.t}"`);
  }

  const tree = expr();
  if (pos !== tokens.length) throw new Error(`thừa ký tự sau vị trí ${pos}`);
  return tree;
}

/** Tính cây với `vars` ({ x, <id tham số>... }). */
export function evalExpr(node, vars) {
  switch (node.op) {
    case "num":
      return node.value;
    case "var":
      return vars[node.name];
    case "neg":
      return -evalExpr(node.a, vars);
    case "+":
      return evalExpr(node.a, vars) + evalExpr(node.b, vars);
    case "-":
      return evalExpr(node.a, vars) - evalExpr(node.b, vars);
    case "*":
      return evalExpr(node.a, vars) * evalExpr(node.b, vars);
    case "/":
      return evalExpr(node.a, vars) / evalExpr(node.b, vars);
    case "^":
      return Math.pow(evalExpr(node.a, vars), evalExpr(node.b, vars));
    case "call":
      return FUNCS[node.fn](...node.args.map((a) => evalExpr(a, vars)));
    default:
      throw new Error(`nút lạ: ${node.op}`);
  }
}

/** Các giá trị x của trục ngang, chặn ở 200 điểm để một `step` gõ nhầm không
 *  sinh ra hàng triệu điểm. */
export function xValues({ from, to, step }) {
  const out = [];
  if (!(step > 0) || !(to >= from)) return out;
  for (let v = from; v <= to + step / 1e6 && out.length < 200; v += step) out.push(Math.round(v * 1e6) / 1e6);
  return out;
}
