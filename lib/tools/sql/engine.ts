// Lớp bọc quanh lib/mini-sql.ts cho SQL Console ở /cong-cu/sql.
//
// mini-sql.ts là bộ máy truy vấn; tệp này thêm những gì một ứng dụng khách cơ
// sở dữ liệu cần mà bộ máy không lo: đo thời gian chạy, phân loại lỗi để giao
// diện đưa ra gợi ý đúng chỗ sai, đoán tên bảng/cột bị gõ nhầm, và cảnh báo
// hai lỗi mà bộ máy KHÔNG báo vì về cú pháp chúng hợp lệ:
//   - trộn cột thường với hàm tổng hợp mà không GROUP BY (SQLite cũng im lặng
//     trả về một dòng lấy đại một giá trị, MySQL cũ cũng vậy);
//   - so sánh "= NULL", luôn cho ra rỗng.
// Không có React ở đây, để mọi thứ kiểm được bằng vitest.

import { runQuery, type Database, type QueryResult, type SqlValue } from "@/lib/mini-sql";

export type SqlErrorKind =
  | "missingSelect"
  | "missingFrom"
  | "missingBy"
  | "unknownTable"
  | "unknownColumn"
  | "unclosedString"
  | "joinSyntax"
  | "trailing"
  | "incomplete"
  | "other";

export interface SqlErrorInfo {
  kind: SqlErrorKind;
  /** Nguyên văn thông điệp của bộ máy. */
  message: string;
  /** Tên bảng/cột/từ gây lỗi, nếu đọc được từ thông điệp. */
  name?: string;
  /** Tên gần đúng nhất có thật trong cơ sở dữ liệu. */
  suggestion?: string;
}

export type SqlWarningKind = "aggregateWithoutGroupBy" | "equalsNull";

export type ExecOutcome =
  | { ok: true; result: QueryResult; ms: number; warnings: SqlWarningKind[] }
  | { ok: false; error: SqlErrorInfo; ms: number };

const now = () => (typeof performance !== "undefined" ? performance.now() : Date.now());

export function execute(db: Database, sql: string): ExecOutcome {
  const start = now();
  try {
    const result = runQuery(db, sql);
    return { ok: true, result, ms: now() - start, warnings: lintQuery(sql) };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, error: classifyError(db, message), ms: now() - start };
  }
}

/* i18n-ignore-start: patterns match the Vietnamese error text produced by lib/mini-sql.ts; never displayed */
const PATTERNS: { kind: SqlErrorKind; rx: RegExp }[] = [
  { kind: "missingSelect", rx: /Thiếu từ khoá SELECT/ },
  { kind: "missingFrom", rx: /Thiếu từ khoá FROM/ },
  { kind: "missingBy", rx: /Thiếu từ khoá BY/ },
  { kind: "unknownTable", rx: /Không có bảng "([^"]*)"/ },
  { kind: "unknownColumn", rx: /Không có cột "([^"]*)"/ },
  { kind: "unclosedString", rx: /Chuỗi chưa được đóng dấu nháy/ },
  { kind: "joinSyntax", rx: /Điều kiện ON|Thiếu từ khoá ON|Thiếu từ khoá JOIN/ },
  { kind: "trailing", rx: /Thừa nội dung ở cuối: (.*)$/ },
  { kind: "incomplete", rx: /kết thúc giữa chừng|Thiếu tên bảng/ },
];
/* i18n-ignore-end */

export function classifyError(db: Database, message: string): SqlErrorInfo {
  for (const { kind, rx } of PATTERNS) {
    const m = rx.exec(message);
    if (!m) continue;
    const info: SqlErrorInfo = { kind, message };
    if (m[1] !== undefined) info.name = m[1];
    if (kind === "unknownTable" && info.name) {
      info.suggestion = closest(info.name, Object.keys(db));
    }
    if (kind === "unknownColumn" && info.name) {
      const short = info.name.includes(".") ? info.name.slice(info.name.indexOf(".") + 1) : info.name;
      const all = [...new Set(Object.values(db).flatMap((t) => t.columns))];
      info.suggestion = closest(short, all);
    }
    return info;
  }
  return { kind: "other", message };
}

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)] as number[]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return dp[a.length][b.length];
}

/** Tên có thật gần nhất (không phân biệt hoa thường, sai tối đa 2 ký tự). */
export function closest(name: string, candidates: string[]): string | undefined {
  const lower = name.toLowerCase();
  let best: string | undefined;
  let bestD = Infinity;
  for (const c of candidates) {
    if (c === name) continue;
    const d = c.toLowerCase() === lower ? 0 : levenshtein(lower, c.toLowerCase());
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  return bestD <= 2 ? best : undefined;
}

/** Tách danh sách SELECT theo dấu phẩy ở cấp ngoài cùng (bỏ qua ngoặc và chuỗi). */
function splitTopLevel(s: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let quote: string | null = null;
  let cur = "";
  for (const ch of s) {
    if (quote) {
      if (ch === quote) quote = null;
    } else if (ch === "'" || ch === '"') quote = ch;
    else if (ch === "(") depth++;
    else if (ch === ")") depth--;
    else if (ch === "," && depth === 0) {
      parts.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  parts.push(cur);
  return parts.map((p) => p.trim()).filter(Boolean);
}

/** Bỏ nội dung chuỗi trong câu lệnh, để từ khoá nằm trong chuỗi không bị đếm. */
function stripStrings(sql: string): string {
  return sql.replace(/'[^']*'|"[^"]*"/g, "''");
}

export function lintQuery(sql: string): SqlWarningKind[] {
  const warnings: SqlWarningKind[] = [];
  const bare = stripStrings(sql);
  const m = /\bSELECT\b([\s\S]*?)\bFROM\b/i.exec(sql);
  if (m && !/\bGROUP\s+BY\b/i.test(bare)) {
    const items = splitTopLevel(m[1]);
    const isAgg = (p: string) => /^(SUM|COUNT|AVG|MIN|MAX)\s*\(/i.test(p);
    const isPlainCol = (p: string) => /^[A-Za-z_À-ỹ][\wÀ-ỹ]*(\.[A-Za-z_À-ỹ][\wÀ-ỹ]*)?(\s+(AS\s+)?\w+)?$/i.test(p);
    if (items.some(isAgg) && items.some((p) => !isAgg(p) && isPlainCol(p))) {
      warnings.push("aggregateWithoutGroupBy");
    }
  }
  if (/(=|<>|!=)\s*NULL\b/i.test(bare)) warnings.push("equalsNull");
  return warnings;
}

/* ------------------------------------------------------------------ *
 * So kết quả - dùng cho nhiệm vụ
 * ------------------------------------------------------------------ */

const normValue = (v: SqlValue): SqlValue => (typeof v === "number" ? Math.round(v * 1000) / 1000 : v);

function columnValues(r: QueryResult, i: number): SqlValue[] {
  return r.rows.map((row) => normValue(row[i] ?? null));
}

const multisetKey = (vals: SqlValue[]) =>
  JSON.stringify(vals.map((v) => JSON.stringify(v)).sort());

/**
 * Kết quả của học viên có "chứa" kết quả mẫu không: cùng số dòng, và mỗi cột
 * của kết quả mẫu khớp với một cột riêng của học viên (tên cột, thứ tự cột và
 * cột thừa đều không quan trọng - người thật cũng đặt bí danh khác nhau). Khi
 * `ordered` thì thứ tự dòng phải đúng; ngược lại chỉ cần cùng tập dòng.
 *
 * Nhiệm vụ vì thế chấm KẾT QUẢ chứ không chấm câu chữ: JOIN theo c.id hay theo
 * tên, viết alias hay không, đều qua nếu dữ liệu trả về đúng.
 */
export function resultCovers(actual: QueryResult, expected: QueryResult, ordered: boolean): boolean {
  if (actual.rows.length !== expected.rows.length) return false;
  if (expected.columns.length === 0) return true;
  if (actual.columns.length < expected.columns.length) return false;

  const actualKeys = actual.columns.map((_, i) => multisetKey(columnValues(actual, i)));
  const candidates = expected.columns.map((_, j) => {
    const key = multisetKey(columnValues(expected, j));
    return actual.columns.map((_, i) => i).filter((i) => actualKeys[i] === key);
  });
  if (candidates.some((c) => c.length === 0)) return false;

  const expectedRows = expected.rows.map((row) => row.map((v) => JSON.stringify(normValue(v ?? null))));
  const rowKey = (cells: string[]) => cells.join("\u0001");
  const expectedSeq = expectedRows.map(rowKey);
  const expectedSorted = [...expectedSeq].sort();

  const pick: number[] = [];
  const used = new Set<number>();
  const tryAssign = (j: number): boolean => {
    if (j === candidates.length) {
      const seq = actual.rows.map((row) => rowKey(pick.map((i) => JSON.stringify(normValue(row[i] ?? null)))));
      if (ordered) return JSON.stringify(seq) === JSON.stringify(expectedSeq);
      return JSON.stringify([...seq].sort()) === JSON.stringify(expectedSorted);
    }
    for (const i of candidates[j]) {
      if (used.has(i)) continue;
      used.add(i);
      pick.push(i);
      if (tryAssign(j + 1)) return true;
      pick.pop();
      used.delete(i);
    }
    return false;
  };
  return tryAssign(0);
}
