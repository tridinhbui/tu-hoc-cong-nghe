import { classifyWrite, signalsFromResult, type ChangeSignal, type WriteKind } from "./watched";

/**
 * Bọc binding D1 để mọi lệnh ghi vào bảng được theo dõi phát tín hiệu realtime.
 *
 * VÌ SAO Ở ĐÂY. Supabase có dòng thay đổi (logical replication) - cơ sở dữ liệu
 * tự báo mỗi khi một hàng đổi, bất kể ai ghi. D1 không có gì tương đương, nên
 * người GHI phải tự báo. Móc ở /api/db thì trông tự nhiên nhưng bỏ sót: đo được
 * 13 câu SQL thô trong lib/d1/rpc.ts ghi vào ba bảng được theo dõi (vào phòng
 * học, rời phòng, tin nhắn bot hằng tuần), cộng các route cron và trang quản trị
 * ghi qua client máy chủ. Không cái nào đi qua /api/db.
 *
 * Chỗ duy nhất mọi lệnh ghi đều đi qua là getDb() trong lib/d1/server.ts -
 * `env.DB` không được chạm ở bất kỳ đâu khác. Bọc ở đó là phủ hết.
 *
 * HAI BẤT BIẾN, cả hai đều có bộ kiểm:
 *   1. Trong suốt: mọi câu không ghi vào bảng được theo dõi trả về ĐÚNG đối
 *      tượng D1 gốc, không bọc gì.
 *   2. Không bao giờ làm hỏng lệnh ghi: tín hiệu phát SAU khi ghi thành công,
 *      và lỗi của `publish` bị nuốt và ghi log. Realtime trễ thì giao diện đứng
 *      một nhịp; realtime làm hỏng lệnh ghi thì mất dữ liệu.
 */

type Publish = (signals: ChangeSignal[]) => void;

type Stmt = {
  bind: (...args: unknown[]) => Stmt;
  run?: () => Promise<unknown>;
  all?: () => Promise<unknown>;
  first?: (col?: string) => Promise<unknown>;
  raw?: () => Promise<unknown>;
};

type Db = {
  prepare: (sql: string) => Stmt;
  batch?: (stmts: Stmt[]) => Promise<unknown[]>;
};

/** Bản gốc và loại ghi của mỗi câu đã bọc, để batch() lấy lại được câu thật. */
const REAL = new WeakMap<object, { real: Stmt; kind: WriteKind }>();

function safePublish(publish: Publish, signals: ChangeSignal[]) {
  if (!signals.length) return;
  try {
    publish(signals);
  } catch (err) {
    console.error("[realtime] phát tín hiệu thất bại, lệnh ghi vẫn giữ nguyên:", err);
  }
}

function wrapStmt(real: Stmt, kind: WriteKind, publish: Publish): Stmt {
  const wrapped: Stmt = new Proxy(real, {
    get(target, prop, receiver) {
      if (prop === "bind") {
        return (...args: unknown[]) => wrapStmt(target.bind(...args), kind, publish);
      }
      if (prop === "run" || prop === "all") {
        const fn = target[prop];
        if (typeof fn !== "function") return fn;
        return async () => {
          const result = await fn.call(target);
          safePublish(publish, signalsFromResult(kind, result as never));
          return result;
        };
      }
      if (prop === "first") {
        const fn = target.first;
        if (typeof fn !== "function") return fn;
        return async (col?: string) => {
          const row = await fn.call(target, col);
          // first() không trả meta, nên không biết bao nhiêu hàng đã đổi. Có
          // hàng mang id (câu có RETURNING) thì báo đúng hàng đó; không thì báo
          // cấp bảng - thừa một lần đọc lại còn hơn thiếu một cập nhật.
          const asResult = row && typeof row === "object" && col === undefined ? { results: [row] } : undefined;
          safePublish(publish, signalsFromResult(kind, asResult));
          return row;
        };
      }
      if (prop === "raw") {
        const fn = target.raw;
        if (typeof fn !== "function") return fn;
        return async (...a: unknown[]) => {
          const out = await (fn as (...x: unknown[]) => Promise<unknown>).apply(target, a);
          // raw() trả mảng các mảng, không có tên cột - không rút được id.
          safePublish(publish, [{ ...kind, id: null }]);
          return out;
        };
      }
      return Reflect.get(target, prop, receiver);
    },
  });
  REAL.set(wrapped, { real, kind });
  return wrapped;
}

export function withRealtimePublishing<T extends object>(db: T, publish: Publish): T {
  const d = db as unknown as Db;
  return new Proxy(db, {
    get(target, prop, receiver) {
      if (prop === "prepare") {
        return (sql: string) => {
          const stmt = d.prepare.call(target, sql);
          const kind = classifyWrite(sql);
          return kind ? wrapStmt(stmt, kind, publish) : stmt;
        };
      }
      if (prop === "batch" && typeof d.batch === "function") {
        return async (stmts: Stmt[]) => {
          // D1 thật chỉ nhận câu lệnh THẬT của nó. Đưa vỏ bọc vào batch() sẽ
          // hỏng - nên đổi về bản gốc, chạy, rồi mới đối chiếu từng kết quả.
          const entries = stmts.map((s) => REAL.get(s));
          const results = await d.batch!.call(target, stmts.map((s, i) => entries[i]?.real ?? s));
          const signals: ChangeSignal[] = [];
          results.forEach((r, i) => {
            const e = entries[i];
            if (e) signals.push(...signalsFromResult(e.kind, r as never));
          });
          safePublish(publish, dedupe(signals));
          return results;
        };
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}

function dedupe(signals: ChangeSignal[]): ChangeSignal[] {
  const seen = new Set<string>();
  return signals.filter((s) => {
    const k = `${s.table}|${s.event}|${s.id}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
