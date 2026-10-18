// Kiểm hợp lệ cho năm khối tương tác (lib/lesson-types.ts): sim, aiLab,
// scenario, chart, flow.
//
// Một khối tương tác hỏng không báo lỗi lúc build - nó chỉ ra một bài tập
// không ai qua được, một tình huống có ngõ cụt, hay một biểu đồ NaN. Nên mọi
// luật dưới đây chạy trong CI qua scripts/audit-lesson-content.mjs, cùng lý
// do audit:exercises chạy lời giải của từng bài tập viết mã.
//
// Tệp .js thuần để cả script audit (.mjs) lẫn code TypeScript import được.

import { evalExpr, parseExpr, xValues } from "./expr.js";
import { dnsGoalMet, httpGoalMet, simulateDns, simulateHttp, HTTP_AUTH, HTTP_METHODS, cpuGoalMet, formatMachineError, parseProgram, schedulerGoalMet, simulateScheduler } from "./machine.js";

export const PRACTICE_BLOCK_TYPES = ["exercise", "sim", "aiLab", "scenario", "machine"];
export const VISUAL_BLOCK_TYPES = ["chart", "flow", "feynman"];
export const INTERACTIVE_BLOCK_TYPES = ["sim", "aiLab", "scenario", "chart", "flow", "machine"];

const SIM_TOOLS = ["terminal", "editor", "sql", "api", "cloud"];
const nonEmpty = (v) => typeof v === "string" && v.trim().length > 0;

/** Trả về danh sách lỗi (chuỗi tiếng Việt) của một khối; rỗng là hợp lệ.
 *
 *  `ctx.simMissions`: { [tool]: Set<id nhiệm vụ> }. Không truyền thì bỏ qua
 *  bước đối chiếu nhiệm vụ (dùng khi chỉ có dữ liệu, không có lib/tools). */
export function validateInteractiveBlock(block, ctx = {}) {
  switch (block?.type) {
    case "sim":
      return validateSim(block, ctx);
    case "aiLab":
      return block.mode === "spotError" ? validateSpotError(block) : validatePromptLab(block);
    case "scenario":
      return validateScenario(block);
    case "chart":
      return "data" in block && block.data ? validateDataChart(block) : validateSeriesChart(block);
    case "flow":
      return validateFlow(block);
    case "machine":
      return block.kind === "scheduler"
        ? validateScheduler(block)
        : block.kind === "http"
          ? validateHttp(block)
          : block.kind === "dns"
            ? validateDns(block)
            : validateCpu(block);
    default:
      return [];
  }
}

function validateSim(b, ctx) {
  const errs = [];
  if (!SIM_TOOLS.includes(b.tool)) errs.push(`sim: công cụ lạ "${b.tool}"`);
  if (!nonEmpty(b.title) || !nonEmpty(b.task)) errs.push("sim: thiếu title hoặc task");
  const known = ctx.simMissions?.[b.tool];
  if (known && !known.has(b.mission)) errs.push(`sim: nhiệm vụ "${b.mission}" không có trong lib/tools/${b.tool}/missions.ts`);
  return errs;
}

function validatePromptLab(b) {
  const errs = [];
  if (b.mode !== "prompt") errs.push(`aiLab: mode lạ "${b.mode}"`);
  if (!nonEmpty(b.title) || !nonEmpty(b.task)) errs.push("aiLab: thiếu title hoặc task");
  const parts = Array.isArray(b.parts) ? b.parts : [];
  if (parts.length < 2) errs.push("aiLab: cần ít nhất 2 phần prompt");
  const ids = new Set();
  for (const p of parts) {
    if (ids.has(p.id)) errs.push(`aiLab: trùng id phần "${p.id}"`);
    ids.add(p.id);
    const opts = Array.isArray(p.options) ? p.options : [];
    if (opts.length < 2) errs.push(`aiLab: phần "${p.id}" cần ít nhất 2 phương án`);
    const good = opts.filter((o) => o.good).length;
    if (good !== 1) errs.push(`aiLab: phần "${p.id}" phải có đúng 1 phương án good, đang có ${good}`);
    if (opts.some((o) => !nonEmpty(o.text) || !nonEmpty(o.feedback))) errs.push(`aiLab: phần "${p.id}" có phương án thiếu text/feedback`);
  }
  const responses = Array.isArray(b.responses) ? b.responses : [];
  if (responses.length < 2) errs.push("aiLab: cần ít nhất 2 câu trả lời (prompt tốt và prompt kém)");
  const last = responses[responses.length - 1];
  if (last && last.requires && last.requires.length) errs.push("aiLab: câu trả lời cuối phải là mặc định (không requires)");
  for (const r of responses) {
    for (const id of r.requires ?? []) if (!ids.has(id)) errs.push(`aiLab: requires trỏ tới phần không có "${id}"`);
    if (!nonEmpty(r.text)) errs.push("aiLab: câu trả lời rỗng");
  }
  // Chọn đúng hết thì phải ra câu trả lời đòi hỏi ĐỦ mọi phần - nếu không,
  // một phần tốt là thừa và người học không có lý do để chọn nó.
  const full = responses.find((r) => (r.requires ?? []).every((id) => ids.has(id)));
  if (full && (full.requires ?? []).length !== ids.size) {
    errs.push("aiLab: câu trả lời đầu tiên khớp khi chọn đúng hết phải requires đủ mọi phần");
  }
  return errs;
}

function validateSpotError(b) {
  const errs = [];
  if (!nonEmpty(b.title) || !nonEmpty(b.task)) errs.push("aiLab: thiếu title hoặc task");
  const segs = Array.isArray(b.segments) ? b.segments : [];
  const wrong = segs.filter((s) => s.error !== undefined);
  if (segs.length < 4) errs.push("aiLab spotError: cần ít nhất 4 đoạn");
  if (wrong.length < 1) errs.push("aiLab spotError: cần ít nhất 1 đoạn sai");
  if (wrong.length >= segs.length) errs.push("aiLab spotError: phải có đoạn đúng để còn phân biệt");
  if (segs.some((s) => !nonEmpty(s.text))) errs.push("aiLab spotError: có đoạn rỗng");
  if (wrong.some((s) => !nonEmpty(s.error))) errs.push("aiLab spotError: đoạn sai phải giải thích vì sao sai");
  return errs;
}

function validateScenario(b) {
  const errs = [];
  if (!nonEmpty(b.title)) errs.push("scenario: thiếu title");
  const nodes = b.nodes && typeof b.nodes === "object" ? b.nodes : {};
  if (!nodes[b.start]) return [...errs, `scenario: không có cảnh bắt đầu "${b.start}"`];
  for (const [id, n] of Object.entries(nodes)) {
    if (!nonEmpty(n.text)) errs.push(`scenario: cảnh "${id}" rỗng`);
    const hasChoices = Array.isArray(n.choices) && n.choices.length > 0;
    if (hasChoices === Boolean(n.ending)) errs.push(`scenario: cảnh "${id}" phải có choices HOẶC ending, không cả hai, không thiếu cả hai`);
    if (hasChoices && n.choices.length < 2) errs.push(`scenario: cảnh "${id}" chỉ có 1 lựa chọn - không phải một quyết định`);
    for (const c of n.choices ?? []) {
      if (!nodes[c.next]) errs.push(`scenario: cảnh "${id}" trỏ tới cảnh không có "${c.next}"`);
      if (!nonEmpty(c.label)) errs.push(`scenario: cảnh "${id}" có lựa chọn không nhãn`);
    }
  }
  // Duyệt từ cảnh đầu: không vòng lặp, và ghi lại cảnh nào tới được.
  const reached = new Set();
  const onPath = new Set();
  const walk = (id) => {
    if (onPath.has(id)) {
      errs.push(`scenario: vòng lặp qua cảnh "${id}"`);
      return;
    }
    if (reached.has(id) || !nodes[id]) return;
    reached.add(id);
    onPath.add(id);
    for (const c of nodes[id].choices ?? []) walk(c.next);
    onPath.delete(id);
  };
  walk(b.start);
  for (const id of Object.keys(nodes)) if (!reached.has(id)) errs.push(`scenario: cảnh "${id}" không tới được từ cảnh đầu`);
  if (![...reached].some((id) => nodes[id].ending === "good")) errs.push("scenario: không có kết thúc good nào tới được");
  if (![...reached].some((id) => nodes[id].ending === "bad")) errs.push("scenario: cần ít nhất một kết thúc bad - không có cách sai thì không phải tình huống");
  return errs;
}

function validateSeriesChart(b) {
  const errs = [];
  if (!nonEmpty(b.title) || !nonEmpty(b.caption)) errs.push("chart: thiếu title hoặc caption");
  if (!["line", "area", "bar"].includes(b.kind)) errs.push(`chart: kind lạ "${b.kind}"`);
  const xs = xValues(b.x ?? {});
  if (xs.length < 2) errs.push("chart: trục x cần ít nhất 2 điểm (kiểm from/to/step)");
  const params = Array.isArray(b.params) ? b.params : [];
  for (const p of params) {
    if (!(p.min < p.max) || !(p.step > 0)) errs.push(`chart: tham số "${p.id}" có min/max/step sai`);
    if (!(p.value >= p.min && p.value <= p.max)) errs.push(`chart: tham số "${p.id}" có value ngoài [min, max]`);
  }
  const series = Array.isArray(b.series) ? b.series : [];
  if (series.length < 1) errs.push("chart: cần ít nhất 1 series");
  const names = params.map((p) => p.id);
  // Tính ở mặc định và ở cả hai đầu mọi thanh trượt: một biểu thức chia cho
  // tham số sẽ chỉ nổ khi người học kéo về 0.
  const settings = [Object.fromEntries(params.map((p) => [p.id, p.value]))];
  for (const p of params) {
    settings.push({ ...settings[0], [p.id]: p.min });
    settings.push({ ...settings[0], [p.id]: p.max });
  }
  for (const s of series) {
    let tree;
    try {
      tree = parseExpr(s.expr, names);
    } catch (e) {
      errs.push(`chart: series "${s.label}" - ${e.message}`);
      continue;
    }
    for (const vars of settings) {
      for (const x of xs) {
        const y = evalExpr(tree, { ...vars, x });
        if (!Number.isFinite(y)) {
          errs.push(`chart: series "${s.label}" ra ${y} tại x=${x}, ${JSON.stringify(vars)}`);
          break;
        }
      }
    }
  }
  return [...new Set(errs)];
}

function validateDataChart(b) {
  const errs = [];
  if (!nonEmpty(b.title) || !nonEmpty(b.caption)) errs.push("chart: thiếu title hoặc caption");
  const labels = Array.isArray(b.seriesLabels) ? b.seriesLabels : [];
  if (labels.length < 1) errs.push("chart: cần seriesLabels");
  const data = Array.isArray(b.data) ? b.data : [];
  if (data.length < 2) errs.push("chart: cần ít nhất 2 hàng dữ liệu");
  for (const row of data) {
    if (!Array.isArray(row.values) || row.values.length !== labels.length) {
      errs.push(`chart: hàng "${row.label}" phải có đúng ${labels.length} giá trị`);
    } else if (row.values.some((v) => !Number.isFinite(v))) {
      errs.push(`chart: hàng "${row.label}" có giá trị không phải số`);
    }
  }
  return errs;
}

function validateFlow(b) {
  const errs = [];
  if (!nonEmpty(b.title)) errs.push("flow: thiếu title");
  const steps = Array.isArray(b.steps) ? b.steps : [];
  if (steps.length < 3) errs.push("flow: cần ít nhất 3 bước");
  if (steps.some((s) => !nonEmpty(s.label) || !nonEmpty(s.detail))) errs.push("flow: mỗi bước cần label và detail");
  return errs;
}

// Khối machine được CHẠY trong CI, cùng triết lý audit:exercises: lời giải phải
// đạt mục tiêu và mã khởi đầu KHÔNG được đạt sẵn - nếu không, khối là một bài
// tập qua được mà không cần làm gì.
function validateCpu(b) {
  const errs = [];
  if (b.kind !== "cpu") errs.push(`machine: kind lạ "${b.kind}"`);
  if (!nonEmpty(b.title) || !nonEmpty(b.task)) errs.push("machine/cpu: thiếu title hoặc task");
  if (!Array.isArray(b.memory) || b.memory.length > 8 || b.memory.some((v) => !Number.isInteger(v))) errs.push("machine/cpu: memory phải là tối đa 8 số nguyên");
  const cells = b.goal?.cells;
  if (!Array.isArray(cells) || !cells.length || cells.some((c) => !Number.isInteger(c.cell) || c.cell < 0 || c.cell > 7 || !Number.isInteger(c.value))) {
    errs.push("machine/cpu: goal.cells cần ít nhất một { cell 0-7, value }");
    return errs;
  }
  for (const key of ["starter", "solution"]) {
    if (!Array.isArray(b[key]) || !b[key].length) {
      errs.push(`machine/cpu: thiếu ${key}`);
      return errs;
    }
    const parse = parseProgram(b[key]);
    if (parse.errors.length) errs.push(`machine/cpu: ${key} không phân tích được: ${formatMachineError(parse.errors[0])}`);
  }
  if (errs.length) return errs;
  if (!cpuGoalMet(b.goal, b.solution, b.memory)) errs.push("machine/cpu: solution không đạt mục tiêu");
  if (cpuGoalMet(b.goal, b.starter, b.memory)) errs.push("machine/cpu: starter đã đạt mục tiêu sẵn - người học không phải làm gì");
  if (!Array.isArray(b.hints) || b.hints.length < 2) errs.push("machine/cpu: cần ít nhất 2 gợi ý");
  return errs;
}

function validateScheduler(b) {
  const errs = [];
  if (!nonEmpty(b.title) || !nonEmpty(b.task)) errs.push("machine/scheduler: thiếu title hoặc task");
  const procs = Array.isArray(b.procs) ? b.procs : [];
  if (procs.length < 3) errs.push("machine/scheduler: cần ít nhất 3 tiến trình");
  if (procs.some((p) => !nonEmpty(p.name) || !Number.isInteger(p.arrival) || p.arrival < 0 || !Number.isInteger(p.burst) || p.burst < 1)) {
    errs.push("machine/scheduler: mỗi tiến trình cần name, arrival >= 0, burst >= 1 (số nguyên)");
  }
  const q = b.quantum;
  if (!q || !Number.isInteger(q.min) || !Number.isInteger(q.max) || q.min < 1 || q.max <= q.min || q.value < q.min || q.value > q.max) {
    errs.push("machine/scheduler: quantum cần min >= 1, max > min, value trong khoảng");
  }
  if (!Number.isInteger(b.switchCost) || b.switchCost < 0) errs.push("machine/scheduler: switchCost phải là số nguyên >= 0");
  if (!b.goal || !(b.goal.maxAvgResponse > 0) || !(b.goal.maxTotal > 0)) errs.push("machine/scheduler: goal cần maxAvgResponse và maxTotal");
  if (errs.length) return errs;
  const ok = [];
  for (let v = q.min; v <= q.max; v++) if (schedulerGoalMet(b.goal, procs, v, b.switchCost)) ok.push(v);
  if (!ok.length) errs.push("machine/scheduler: không quantum nào trong thanh trượt đạt mục tiêu");
  if (!ok.includes(b.solutionQuantum)) errs.push(`machine/scheduler: solutionQuantum ${b.solutionQuantum} không đạt mục tiêu`);
  if (ok.includes(q.value)) errs.push("machine/scheduler: giá trị ban đầu của thanh trượt đã đạt mục tiêu sẵn");
  if (ok.length === q.max - q.min + 1) errs.push("machine/scheduler: mọi quantum đều đạt - không có đánh đổi nào");
  // Mỗi giới hạn phải có tác dụng riêng: bỏ một cái thì có quantum thừa lọt qua.
  const onlyResp = [];
  const onlyTotal = [];
  for (let v = q.min; v <= q.max; v++) {
    const r = simulateScheduler(procs, v, b.switchCost);
    if (r.avgResponse <= b.goal.maxAvgResponse) onlyResp.push(v);
    if (r.total <= b.goal.maxTotal) onlyTotal.push(v);
  }
  if (onlyResp.length === ok.length) errs.push("machine/scheduler: giới hạn maxTotal không loại quantum nào - bỏ đi cũng không đổi");
  if (onlyTotal.length === ok.length) errs.push("machine/scheduler: giới hạn maxAvgResponse không loại quantum nào - bỏ đi cũng không đổi");
  if (!Array.isArray(b.hints) || b.hints.length < 2) errs.push("machine/scheduler: cần ít nhất 2 gợi ý");
  return errs;
}

function validateHttp(b) {
  const errs = [];
  if (!nonEmpty(b.title) || !nonEmpty(b.task)) errs.push("machine/http: thiếu title hoặc task");
  const routes = b.server?.routes;
  if (!Array.isArray(routes) || routes.length < 2) return [...errs, "machine/http: cần ít nhất 2 route"];
  for (const r of routes) {
    if (!HTTP_METHODS.includes(r.method) || !String(r.path).startsWith("/")) errs.push(`machine/http: route lạ ${r.method} ${r.path}`);
  }
  const okReq = (q) => q && HTTP_METHODS.includes(q.method) && HTTP_AUTH.includes(q.auth) && typeof q.path === "string" && typeof q.body === "string";
  if (!okReq(b.starter) || !okReq(b.solution)) return [...errs, "machine/http: starter/solution cần method, path, auth, body hợp lệ"];
  if (!Number.isInteger(b.goal?.status)) return [...errs, "machine/http: thiếu goal.status"];
  if (!httpGoalMet(b.goal, b.server, b.solution)) errs.push("machine/http: solution không đạt goal.status");
  if (httpGoalMet(b.goal, b.server, b.starter)) errs.push("machine/http: starter đã đạt sẵn");
  // Đường từ starter tới đích phải qua ít nhất 2 mã lỗi khác nhau - nếu không thì không phải gỡ lỗi từng bước.
  const seen = new Set([simulateHttp(b.server, b.starter).status]);
  const fixes = [
    { ...b.starter, path: b.solution.path },
    { ...b.starter, path: b.solution.path, method: b.solution.method },
    { ...b.starter, path: b.solution.path, method: b.solution.method, auth: b.solution.auth },
  ];
  for (const f of fixes) seen.add(simulateHttp(b.server, f).status);
  if (seen.size < 3) errs.push("machine/http: đường sửa lỗi đi qua ít hơn 3 mã khác nhau");
  if (!Array.isArray(b.hints) || b.hints.length < 2) errs.push("machine/http: cần ít nhất 2 gợi ý");
  return errs;
}

function validateDns(b) {
  const errs = [];
  if (!nonEmpty(b.title) || !nonEmpty(b.task)) errs.push("machine/dns: thiếu title hoặc task");
  const z = b.zone;
  if (!z || !nonEmpty(z.name) || !nonEmpty(z.oldIp) || !nonEmpty(z.newIp) || z.oldIp === z.newIp) errs.push("machine/dns: zone cần name, oldIp khác newIp");
  if (!Array.isArray(z?.lookups) || z.lookups.length < 6 || z.lookups.some((t, i, a) => !Number.isInteger(t) || (i && t <= a[i - 1]))) errs.push("machine/dns: lookups cần >= 6 mốc tăng dần");
  if (errs.length) return errs;
  if (!(z.changeAt > z.lookups[0] && z.changeAt < z.lookups[z.lookups.length - 1])) errs.push("machine/dns: changeAt phải nằm giữa các lần tra");
  const t = b.ttl;
  if (!t || !(t.step >= 1) || t.min < 1 || t.max <= t.min || t.value < t.min || t.value > t.max) return [...errs, "machine/dns: ttl cần min >= 1, max > min, step >= 1, value trong khoảng"];
  const all = [];
  for (let v = t.min; v <= t.max; v += t.step) all.push(v);
  const ok = all.filter((v) => dnsGoalMet(b.goal, z, v));
  if (!ok.length) errs.push("machine/dns: không TTL nào đạt mục tiêu");
  if (!ok.includes(b.solutionTtl)) errs.push(`machine/dns: solutionTtl ${b.solutionTtl} không đạt mục tiêu`);
  if (ok.includes(t.value)) errs.push("machine/dns: giá trị ban đầu đã đạt sẵn");
  const staleOk = all.filter((v) => simulateDns(z, v).staleCount <= b.goal.maxStale);
  const qOk = all.filter((v) => simulateDns(z, v).authQueries <= b.goal.maxQueries);
  if (staleOk.length === ok.length) errs.push("machine/dns: maxQueries không loại TTL nào");
  if (qOk.length === ok.length) errs.push("machine/dns: maxStale không loại TTL nào");
  if (!Array.isArray(b.hints) || b.hints.length < 2) errs.push("machine/dns: cần ít nhất 2 gợi ý");
  return errs;
}

/** Đếm khối thực hành / hình ảnh của một bài - cho hai cổng
 *  MIN_PRACTICE_BLOCKS và MIN_VISUAL_BLOCKS. */
export function countBlockKinds(sections) {
  const list = Array.isArray(sections) ? sections : [];
  return {
    practice: list.filter((s) => PRACTICE_BLOCK_TYPES.includes(s?.type)).length,
    visual: list.filter((s) => VISUAL_BLOCK_TYPES.includes(s?.type)).length,
  };
}
