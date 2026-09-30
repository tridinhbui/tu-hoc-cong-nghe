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

export const PRACTICE_BLOCK_TYPES = ["exercise", "sim", "aiLab", "scenario"];
export const VISUAL_BLOCK_TYPES = ["chart", "flow", "feynman"];
export const INTERACTIVE_BLOCK_TYPES = ["sim", "aiLab", "scenario", "chart", "flow"];

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

/** Đếm khối thực hành / hình ảnh của một bài - cho hai cổng
 *  MIN_PRACTICE_BLOCKS và MIN_VISUAL_BLOCKS. */
export function countBlockKinds(sections) {
  const list = Array.isArray(sections) ? sections : [];
  return {
    practice: list.filter((s) => PRACTICE_BLOCK_TYPES.includes(s?.type)).length,
    visual: list.filter((s) => VISUAL_BLOCK_TYPES.includes(s?.type)).length,
  };
}
