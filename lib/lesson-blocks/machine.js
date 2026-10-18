// Động cơ của khối `machine` (lib/lesson-types.ts): một CPU đồ chơi và một bộ
// lập lịch tiến trình, đủ nhỏ để người học nhìn thấy từng bước.
//
// Luật chung của các khối tương tác vẫn giữ: KHÔNG eval, KHÔNG chạy mã của
// người học bằng thứ gì ngoài bộ thông dịch dưới đây. Chương trình của người
// học là văn bản được phân tích thành lệnh; tài nguyên bị chặn cứng
// (MAX_LINES dòng, MAX_STEPS bước, MEM_SIZE ô nhớ) nên vòng lặp vô hạn kết
// thúc bằng một thông báo lỗi chứ không treo trang.
//
// Tệp .js thuần để cả script audit (.mjs), validate.js lẫn component import.

export const MAX_LINES = 40;
export const MAX_STEPS = 400;
export const MEM_SIZE = 8;
export const REG_COUNT = 4;
const LIMIT = 1_000_000;

/** Bộ lệnh: tên -> kiểu toán hạng. r = thanh ghi, n = số nguyên, a = địa chỉ ô nhớ, l = nhãn. */
export const ISA = {
  LOAD: ["r", "n"], // LOAD R0, 5      R0 = 5
  LDM: ["r", "a"], //  LDM R1, 3       R1 = bộ nhớ[3]
  STM: ["a", "r"], //  STM 4, R1       bộ nhớ[4] = R1
  ADD: ["r", "r"], //  ADD R0, R1      R0 = R0 + R1
  SUB: ["r", "r"], //  SUB R0, R1      R0 = R0 - R1
  JNZ: ["r", "l"], //  JNZ R0, vong    nhảy nếu R0 khác 0
  JMP: ["l"],
  HALT: [],
};

function parseReg(tok) {
  const m = /^R([0-9])$/i.exec(tok);
  if (!m) return null;
  const n = Number(m[1]);
  return n < REG_COUNT ? n : null;
}

/** Phân tích chương trình. Trả về { instrs, labels, errors }; `instrs[i].line`
 *  là chỉ số dòng gốc (0-based) để tô sáng đúng dòng người học đang nhìn. */
export function parseProgram(lines) {
  const errors = [];
  const instrs = [];
  const labels = {};
  if (!Array.isArray(lines)) return { instrs, labels, errors: [{ code: "notArray" }] };
  if (lines.length > MAX_LINES) errors.push({ code: "tooLong", max: MAX_LINES, n: lines.length });

  lines.slice(0, MAX_LINES).forEach((raw, line) => {
    const text = String(raw).split(";")[0].trim();
    if (!text) return;
    const lab = /^([A-Za-z_][A-Za-z0-9_]*):$/.exec(text);
    if (lab) {
      if (labels[lab[1]] !== undefined) errors.push({ code: "dupLabel", line: line + 1, tok: lab[1] });
      labels[lab[1]] = instrs.length;
      return;
    }
    const [op0, ...rest] = text.split(/[\s,]+/).filter(Boolean);
    const op = op0.toUpperCase();
    const spec = ISA[op];
    if (!spec) {
      errors.push({ code: "badOp", line: line + 1, tok: op0, ops: Object.keys(ISA).join(", ") });
      return;
    }
    if (rest.length !== spec.length) {
      errors.push({ code: "badArity", line: line + 1, tok: op, need: spec.length, n: rest.length });
      return;
    }
    const args = [];
    spec.forEach((kind, k) => {
      const tok = rest[k];
      if (kind === "r") {
        const r = parseReg(tok);
        if (r === null) errors.push({ code: "badReg", line: line + 1, tok, last: REG_COUNT - 1 });
        args.push(r);
      } else if (kind === "n" || kind === "a") {
        if (!/^-?\d+$/.test(tok)) errors.push({ code: "badInt", line: line + 1, tok });
        const v = Number(tok);
        if (kind === "a" && (v < 0 || v >= MEM_SIZE)) errors.push({ code: "badAddr", line: line + 1, tok, last: MEM_SIZE - 1 });
        args.push(v);
      } else {
        args.push(tok);
      }
    });
    instrs.push({ op, args, line });
  });

  for (const ins of instrs) {
    const lab = ISA[ins.op].indexOf("l");
    if (lab >= 0 && labels[ins.args[lab]] === undefined) {
      errors.push({ code: "noLabel", line: ins.line + 1, tok: ins.args[lab] });
    }
  }
  return { instrs, labels, errors };
}

/** Mẫu thông báo lỗi tiếng Việt - bản mặc định cho CI. Giao diện dùng mẫu
 *  trong từ điển (t.lessonMachine.err) để người đọc tiếng Anh không thấy tiếng Việt. */
export const ERROR_TEMPLATES_VI = {
  tooLong: "Tối đa {max} dòng, bạn có {n}.",
  dupLabel: 'Dòng {line}: nhãn "{tok}" bị trùng.',
  badOp: 'Dòng {line}: lệnh "{tok}" không có. Các lệnh: {ops}.',
  badArity: "Dòng {line}: {tok} cần {need} toán hạng, bạn đưa {n}.",
  badReg: 'Dòng {line}: "{tok}" không phải thanh ghi (R0 đến R{last}).',
  badInt: 'Dòng {line}: "{tok}" phải là số nguyên.',
  badAddr: "Dòng {line}: địa chỉ {tok} ngoài bộ nhớ (0 đến {last}).",
  noLabel: 'Dòng {line}: nhãn "{tok}" không tồn tại.',
  notArray: "Chương trình phải là mảng dòng.",
  tooManySteps: "Quá {max} bước mà chưa dừng - có vòng lặp không thoát được?",
  overflow: "Số vượt {max} - CPU đồ chơi dừng lại.",
};

/** Điền mẫu `{x}` bằng tham số của lỗi. */
export function formatMachineError(err, templates = ERROR_TEMPLATES_VI) {
  if (!err) return "";
  const tpl = templates[err.code] ?? err.code;
  return tpl.replace(/\{(\w+)\}/g, (_, k) => String(err[k] ?? `{${k}}`));
}

export function initialState(memory) {
  const mem = Array.from({ length: MEM_SIZE }, (_, i) => Number(memory?.[i] ?? 0));
  return { pc: 0, regs: Array(REG_COUNT).fill(0), mem, halted: false, steps: 0, error: null, line: null };
}

/** Chạy MỘT lệnh; trả về trạng thái mới (không sửa trạng thái cũ). */
export function stepCpu(state, prog) {
  if (state.halted || state.error) return state;
  const s = { ...state, regs: [...state.regs], mem: [...state.mem] };
  if (s.steps >= MAX_STEPS) return { ...s, error: { code: "tooManySteps", max: MAX_STEPS } };
  const ins = prog.instrs[s.pc];
  if (!ins) return { ...s, halted: true, line: null }; // chạy hết chương trình
  s.steps += 1;
  s.line = ins.line;
  const [a, b] = ins.args;
  let next = s.pc + 1;
  switch (ins.op) {
    case "LOAD": s.regs[a] = b; break;
    case "LDM": s.regs[a] = s.mem[b]; break;
    case "STM": s.mem[a] = s.regs[b]; break;
    case "ADD": s.regs[a] += s.regs[b]; break;
    case "SUB": s.regs[a] -= s.regs[b]; break;
    case "JNZ": if (s.regs[a] !== 0) next = prog.labels[b]; break;
    case "JMP": next = prog.labels[a]; break;
    case "HALT": s.halted = true; break;
    default: break;
  }
  if (s.regs.some((v) => Math.abs(v) > LIMIT)) s.error = { code: "overflow", max: LIMIT };
  s.pc = next;
  return s;
}

/** Chạy tới khi dừng hoặc lỗi. Trả về { final, trace }; trace là mọi trạng thái. */
export function runCpu(lines, memory) {
  const prog = parseProgram(lines);
  const first = initialState(memory);
  if (prog.errors.length) return { final: { ...first, error: prog.errors[0] }, trace: [first], parseErrors: prog.errors };
  const trace = [first];
  let s = first;
  while (!s.halted && !s.error) {
    s = stepCpu(s, prog);
    trace.push(s);
  }
  return { final: s, trace, parseErrors: [] };
}

/** Đạt mục tiêu khi chương trình DỪNG sạch và mọi ô trong `goal.cells`
 *  ({ cell, value }) đúng giá trị. */
export function cpuGoalMet(goal, lines, memory) {
  const { final } = runCpu(lines, memory);
  return final.halted && !final.error && goal.cells.every((c) => final.mem[c.cell] === c.value);
}

// ── Bộ lập lịch ──────────────────────────────────────────────────────────

/** Round-robin. `procs`: [{ name, arrival, burst }]. `switchCost`: thời gian
 *  chuyển ngữ cảnh khi CPU đổi sang tiến trình khác. */
export function simulateScheduler(procs, quantum, switchCost = 0) {
  const q = Math.max(1, Math.floor(quantum));
  const list = procs.map((p, i) => ({ ...p, i, left: p.burst, start: null, finish: null }));
  const pending = [...list].sort((a, b) => a.arrival - b.arrival || a.i - b.i);
  const queue = [];
  const segments = [];
  let t = 0;
  let last = null;
  let guard = 0;

  const admit = () => {
    while (pending.length && pending[0].arrival <= t) queue.push(pending.shift());
  };

  while ((pending.length || queue.length) && guard++ < 10000) {
    admit();
    if (!queue.length) {
      const nextArrival = pending[0].arrival;
      segments.push({ who: null, kind: "idle", from: t, to: nextArrival });
      t = nextArrival;
      continue;
    }
    const p = queue.shift();
    if (last !== null && last !== p.i && switchCost > 0) {
      segments.push({ who: null, kind: "switch", from: t, to: t + switchCost });
      t += switchCost;
      admit();
    }
    if (p.start === null) p.start = t;
    const run = Math.min(q, p.left);
    segments.push({ who: p.name, kind: "run", from: t, to: t + run });
    t += run;
    p.left -= run;
    last = p.i;
    admit(); // đến trong lúc chạy thì xếp TRƯỚC tiến trình bị ngắt
    if (p.left > 0) queue.push(p);
    else p.finish = t;
  }

  const n = list.length || 1;
  const per = list.map((p) => ({
    name: p.name,
    response: p.start - p.arrival,
    wait: p.finish - p.arrival - p.burst,
    finish: p.finish,
  }));
  return {
    segments,
    per,
    avgResponse: per.reduce((s, p) => s + p.response, 0) / n,
    avgWait: per.reduce((s, p) => s + p.wait, 0) / n,
    total: t,
    switches: segments.filter((s) => s.kind === "switch").length,
  };
}

export function schedulerGoalMet(goal, procs, quantum, switchCost) {
  const r = simulateScheduler(procs, quantum, switchCost);
  return r.avgResponse <= goal.maxAvgResponse && r.total <= goal.maxTotal;
}

// ── HTTP: máy chủ giả, quy tắc nằm trong dữ liệu ─────────────────────────

export const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"];
export const HTTP_AUTH = ["none", "bad", "good"];
export const HTTP_STATUS = { ok: 200, created: 201, badJson: 400, noAuth: 401, forbidden: 403, notFound: 404, wrongMethod: 405, missingField: 422 };

/** `server.routes`: [{ method, path, auth?: bool, fields?: [tên trường JSON bắt buộc] }].
 *  Thứ tự kiểm tra như máy chủ thật: đường dẫn → phương thức → xác thực → thân yêu cầu.
 *  Trả về { status, code }; `code` là khoá thông điệp trong từ điển. */
export function simulateHttp(server, req) {
  const path = String(req.path ?? "").trim();
  const method = String(req.method ?? "").toUpperCase();
  const onPath = server.routes.filter((r) => r.path === path);
  if (!onPath.length) return { status: 404, code: "notFound" };
  const route = onPath.find((r) => r.method === method);
  if (!route) return { status: 405, code: "wrongMethod", allow: onPath.map((r) => r.method).join(", ") };
  if (route.auth) {
    if (req.auth === "none" || !req.auth) return { status: 401, code: "noAuth" };
    if (req.auth !== "good") return { status: 403, code: "forbidden" };
  }
  if (route.fields?.length) {
    let body;
    try {
      body = JSON.parse(req.body ?? "");
    } catch {
      return { status: 400, code: "badJson" };
    }
    if (body === null || typeof body !== "object" || Array.isArray(body)) return { status: 400, code: "badJson" };
    const missing = route.fields.filter((f) => typeof body[f] !== "string" || !body[f].trim());
    if (missing.length) return { status: 422, code: "missingField", field: missing[0] };
  }
  return method === "POST" ? { status: 201, code: "created" } : { status: 200, code: "ok" };
}

export function httpGoalMet(goal, server, req) {
  return simulateHttp(server, req).status === goal.status;
}

// ── DNS: bộ nhớ đệm và TTL ───────────────────────────────────────────────

/** Một máy khách tra tên ở các thời điểm `lookups` (giây). Tại `changeAt` bản
 *  ghi đổi từ `oldIp` sang `newIp`. Kết quả lưu đệm đến hết TTL. */
export function simulateDns(cfg, ttl) {
  const rows = [];
  let cached = null;
  let expires = -1;
  let auth = 0;
  for (const t of cfg.lookups) {
    const current = t >= cfg.changeAt ? cfg.newIp : cfg.oldIp;
    let source;
    let answer;
    if (cached !== null && t < expires) {
      source = "cache";
      answer = cached;
    } else {
      source = "authoritative";
      answer = current;
      cached = current;
      expires = t + ttl;
      auth += 1;
    }
    const stale = answer !== current;
    rows.push({ t, source, answer, stale });
  }
  return { rows, authQueries: auth, staleCount: rows.filter((r) => r.stale).length };
}

export function dnsGoalMet(goal, cfg, ttl) {
  const r = simulateDns(cfg, ttl);
  return r.staleCount <= goal.maxStale && r.authQueries <= goal.maxQueries;
}
