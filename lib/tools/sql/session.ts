// Phiên làm việc của SQL Console: cơ sở dữ liệu GIỮ TRẠNG THÁI giữa các lần chạy.
//
// Một phiên gồm bản sao cơ sở dữ liệu mẫu (sửa được), danh sách chỉ mục, giao
// dịch đang mở (nếu có) và vài bộ đếm để nhiệm vụ chấm được những thứ không còn
// dấu vết trong dữ liệu - như "đã ROLLBACK một thay đổi lớn".
//
// runSql KHÔNG sửa phiên truyền vào mà trả phiên mới, nên React giữ nó trong
// state được; bản sao sâu chỉ vài chục dòng. SAMPLE_DB (dùng để so sánh trong
// nhiệm vụ) không bao giờ bị ghi: mọi câu lệnh chạy trên bản sao của phiên.
//
// Mô phỏng này đơn giản hoá có chủ đích, và nói rõ ở đây để không ai tin hơn
// mức nó làm: một người dùng duy nhất (không có hai giao dịch chạy song song,
// nên không có khoá hay cách ly), không ràng buộc khoá ngoại, không ràng buộc
// NOT NULL / UNIQUE ngoài khoá chính, CREATE INDEX chỉ ảnh hưởng tới kế hoạch
// EXPLAIN (dữ liệu quá nhỏ để đo được tốc độ thật).

import {
  execWrite,
  parseStatement,
  runSelect,
  SqlError,
  type Database,
  type QueryResult,
  type Row,
  type SqlValue,
} from "@/lib/mini-sql";
import { classifyError, lintQuery, type ExecOutcome, type SqlWarningKind, type StatementInfo } from "./engine";
import { explainPlan, type IndexDef } from "./plan";
import { createSampleDb } from "./sample-db";
import type { SqlMissionState } from "./missions";

export type { IndexDef } from "./plan";

export interface SessionStats {
  /** Tổng số dòng bị hoàn tác bởi các ROLLBACK từ lần khôi phục dữ liệu gần nhất. */
  rolledBackRows: number;
  rollbacks: number;
  commits: number;
}

interface TxSnapshot {
  db: Database;
  indexes: IndexDef[];
  /** Số dòng đã INSERT/UPDATE/DELETE kể từ BEGIN. */
  changed: number;
}

export interface SqlSession {
  db: Database;
  indexes: IndexDef[];
  tx: TxSnapshot | null;
  stats: SessionStats;
}

export function cloneDb(db: Database): Database {
  return Object.fromEntries(
    Object.entries(db).map(([name, t]) => [
      name,
      { ...t, columns: [...t.columns], rows: t.rows.map((r) => ({ ...r })), types: t.types && { ...t.types } },
    ]),
  );
}

const cloneIndexes = (indexes: IndexDef[]): IndexDef[] => indexes.map((i) => ({ ...i, columns: [...i.columns] }));

export function createSession(): SqlSession {
  return { db: createSampleDb(), indexes: [], tx: null, stats: { rolledBackRows: 0, rollbacks: 0, commits: 0 } };
}

function cloneSession(s: SqlSession): SqlSession {
  return {
    db: cloneDb(s.db),
    indexes: cloneIndexes(s.indexes),
    tx: s.tx && { db: cloneDb(s.tx.db), indexes: cloneIndexes(s.tx.indexes), changed: s.tx.changed },
    stats: { ...s.stats },
  };
}

/** Tách nhiều câu lệnh theo dấu chấm phẩy (bỏ qua dấu trong chuỗi) và bỏ chú thích `-- ...`. */
export function splitStatements(sql: string): string[] {
  const out: string[] = [];
  let cur = "";
  let quote: string | null = null;
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    if (quote) {
      cur += ch;
      if (ch === quote) {
        if (sql[i + 1] === quote) cur += sql[++i];
        else quote = null;
      }
      continue;
    }
    if (ch === "'" || ch === '"') {
      quote = ch;
      cur += ch;
      continue;
    }
    if (ch === "-" && sql[i + 1] === "-") {
      while (i < sql.length && sql[i] !== "\n") i++;
      cur += "\n";
      continue;
    }
    if (ch === ";") {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out.map((x) => x.trim()).filter(Boolean);
}

const now = () => (typeof performance !== "undefined" ? performance.now() : Date.now());

/**
 * Chạy một hoặc nhiều câu lệnh (cách nhau bằng `;`) trên một BẢN SAO của phiên.
 * Câu lỗi dừng chuỗi, nhưng các câu đứng trước nó vẫn đã chạy - như một tệp
 * script ở dòng lệnh. Kết quả hiện ra là của câu cuối cùng.
 */
export function runSql(prev: SqlSession, sql: string): { session: SqlSession; outcome: ExecOutcome } {
  const session = cloneSession(prev);
  const start = now();
  const statements: StatementInfo[] = [];
  const warnings: SqlWarningKind[] = [];
  let result: QueryResult = { columns: [], rows: [] };

  try {
    const parts = splitStatements(sql);
    if (parts.length === 0) throw new SqlError("Truy vấn kết thúc giữa chừng");
    for (const part of parts) {
      const stmt = parseStatement(part);
      switch (stmt.kind) {
        case "select":
          result = runSelect(session.db, stmt.q);
          statements.push({ kind: "select" });
          break;
        case "insert":
        case "update":
        case "delete": {
          const n = execWrite(session.db, stmt);
          if (session.tx) session.tx.changed += n;
          result = { columns: [], rows: [] };
          statements.push({
            kind: stmt.kind,
            affected: n,
            table: stmt.table,
            noWhere: stmt.kind !== "insert" && !stmt.where,
          });
          break;
        }
        case "createIndex": {
          const table = session.db[stmt.table];
          if (!table) throw new SqlError(`Không có bảng "${stmt.table}"`);
          const columns = stmt.columns.map((c) => {
            const hit = table.columns.find((x) => x.toLowerCase() === c.toLowerCase());
            if (!hit) throw new SqlError(`Không có cột "${c}"`);
            return hit;
          });
          const dup = session.indexes.find((i) => i.name.toLowerCase() === stmt.name.toLowerCase());
          if (dup && !stmt.ifNotExists) throw new SqlError(`Chỉ mục "${stmt.name}" đã tồn tại`);
          if (!dup) session.indexes.push({ name: stmt.name, table: table.name, columns });
          result = { columns: [], rows: [] };
          statements.push({ kind: "createIndex", name: stmt.name, table: table.name });
          break;
        }
        case "dropIndex": {
          const at = session.indexes.findIndex((i) => i.name.toLowerCase() === stmt.name.toLowerCase());
          if (at < 0 && !stmt.ifExists) throw new SqlError(`Không có chỉ mục "${stmt.name}"`);
          if (at >= 0) session.indexes.splice(at, 1);
          result = { columns: [], rows: [] };
          statements.push({ kind: "dropIndex", name: stmt.name });
          break;
        }
        case "begin":
          if (session.tx) throw new SqlError("Không thể BEGIN: đang ở trong một giao dịch rồi - hãy COMMIT hoặc ROLLBACK trước");
          session.tx = { db: cloneDb(session.db), indexes: cloneIndexes(session.indexes), changed: 0 };
          result = { columns: [], rows: [] };
          statements.push({ kind: "begin" });
          break;
        case "commit": {
          if (!session.tx) throw new SqlError("Không có giao dịch nào đang mở để COMMIT");
          statements.push({ kind: "commit", affected: session.tx.changed });
          session.stats.commits += 1;
          session.tx = null;
          result = { columns: [], rows: [] };
          break;
        }
        case "rollback": {
          if (!session.tx) throw new SqlError("Không có giao dịch nào đang mở để ROLLBACK");
          const undone = session.tx.changed;
          session.db = session.tx.db;
          session.indexes = session.tx.indexes;
          session.stats.rollbacks += 1;
          session.stats.rolledBackRows += undone;
          session.tx = null;
          result = { columns: [], rows: [] };
          statements.push({ kind: "rollback", affected: undone });
          break;
        }
        case "explain": {
          const plan = explainPlan(session.db, session.indexes, stmt.q);
          result = {
            columns: ["id", "parent", "notused", "detail"],
            rows: plan.map((p) => [p.id, p.parent, 0, p.detail]),
          };
          statements.push({ kind: "explain" });
          break;
        }
      }
      for (const w of lintQuery(part)) if (!warnings.includes(w)) warnings.push(w);
    }
    return { session, outcome: { ok: true, result, ms: now() - start, warnings, statements } };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return {
      session,
      outcome: { ok: false, error: classifyError(session.db, message), ms: now() - start, statements },
    };
  }
}

/** Trạng thái để nhiệm vụ chấm: kết quả SELECT cuối + dữ liệu hiện có của phiên. */
export function missionState(session: SqlSession, outcome: ExecOutcome | null): SqlMissionState {
  const ok = outcome?.ok ? outcome : null;
  const last = ok?.statements?.[ok.statements.length - 1];
  const kind = last?.kind ?? (ok ? "select" : undefined);
  return {
    result: ok && kind === "select" ? ok.result : null,
    plan: ok && kind === "explain" ? ok.result.rows.map((r) => String(r[3])) : undefined,
    db: session.db,
    indexes: session.indexes,
    stats: session.stats,
    inTransaction: session.tx !== null,
  };
}

/* ------------------------------------------------------------------ *
 * Lưu / đọc phiên (localStorage)
 * ------------------------------------------------------------------ */

const FORMAT = 1;

const rowsOf = (db: Database) => Object.fromEntries(Object.entries(db).map(([name, t]) => [name, t.rows]));

/** Dạng JSON của phiên: chỉ lưu DÒNG DỮ LIỆU, còn lược đồ luôn lấy từ mã nguồn. */
export function serializeSession(s: SqlSession): unknown {
  return {
    v: FORMAT,
    rows: rowsOf(s.db),
    indexes: s.indexes,
    tx: s.tx && { rows: rowsOf(s.tx.db), indexes: s.tx.indexes, changed: s.tx.changed },
    stats: s.stats,
  };
}

const isObj = (x: unknown): x is Record<string, unknown> => typeof x === "object" && x !== null && !Array.isArray(x);
const isNum = (x: unknown): x is number => typeof x === "number" && Number.isFinite(x);

function readDb(raw: unknown): Database | null {
  if (!isObj(raw)) return null;
  const db = createSampleDb();
  for (const [name, table] of Object.entries(db)) {
    const rows = raw[name];
    if (!Array.isArray(rows) || rows.length > 5000) return null;
    const out: Row[] = [];
    for (const r of rows) {
      if (!isObj(r)) return null;
      const row: Row = {};
      for (const col of table.columns) {
        const v = r[col];
        if (v !== null && typeof v !== "string" && !isNum(v)) return null;
        row[col] = v as SqlValue;
      }
      out.push(row);
    }
    table.rows = out;
  }
  return db;
}

function readIndexes(raw: unknown, db: Database): IndexDef[] | null {
  if (!Array.isArray(raw) || raw.length > 100) return null;
  const out: IndexDef[] = [];
  for (const i of raw) {
    if (!isObj(i) || typeof i.name !== "string" || typeof i.table !== "string" || !Array.isArray(i.columns)) return null;
    const table = db[i.table];
    if (!table || i.columns.length === 0) return null;
    if (!i.columns.every((c): c is string => typeof c === "string" && table.columns.includes(c))) return null;
    out.push({ name: i.name, table: i.table, columns: i.columns });
  }
  return out;
}

/** Đọc phiên đã lưu. Bất cứ chỗ nào lạ → null, để giao diện bắt đầu lại từ dữ liệu mẫu. */
export function deserializeSession(raw: unknown): SqlSession | null {
  try {
    if (!isObj(raw) || raw.v !== FORMAT) return null;
    const db = readDb(raw.rows);
    if (!db) return null;
    const indexes = readIndexes(raw.indexes, db);
    if (!indexes) return null;

    let tx: TxSnapshot | null = null;
    if (raw.tx !== null && raw.tx !== undefined) {
      if (!isObj(raw.tx)) return null;
      const txDb = readDb(raw.tx.rows);
      const txIndexes = txDb && readIndexes(raw.tx.indexes, txDb);
      if (!txDb || !txIndexes || !isNum(raw.tx.changed)) return null;
      tx = { db: txDb, indexes: txIndexes, changed: raw.tx.changed };
    }

    const st = raw.stats;
    if (!isObj(st) || !isNum(st.rolledBackRows) || !isNum(st.rollbacks) || !isNum(st.commits)) return null;
    return { db, indexes, tx, stats: { rolledBackRows: st.rolledBackRows, rollbacks: st.rollbacks, commits: st.commits } };
  } catch {
    return null;
  }
}
