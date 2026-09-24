import type { D1Database } from "@cloudflare/workers-types";
import { createD1Rpc } from "./rpc-dispatch";

/**
 * Bộ dựng truy vấn D1 nhại bề mặt API của supabase-js.
 *
 * VÌ SAO NHẠI CHỨ KHÔNG VIẾT LẠI. Repo có 527 lời gọi `.from()` trải trên 225
 * tệp. Viết lại từng chỗ thành SQL là 527 cơ hội sai lặng lẽ, và không có bộ
 * kiểm nào bắt được một mệnh đề WHERE dịch thiếu - truy vấn vẫn chạy, chỉ trả
 * sai dữ liệu. Nhại API thì việc chuyển đổi thành đổi một dòng import, và hình
 * dạng truy vấn ở chỗ gọi giữ nguyên từng ký tự.
 *
 * BỀ MẶT ĐƯỢC ĐO, KHÔNG PHẢI ĐOÁN. Hai mươi toán tử dưới đây là những gì mã
 * hiện tại thật sự dùng, đếm bằng grep trên toàn repo. Cố ý KHÔNG dựng đủ
 * PostgREST: mỗi toán tử thừa là mã không ai gọi và không bộ kiểm nào chạy tới.
 *
 * KHÁC BIỆT PHẢI BIẾT SO VỚI SUPABASE:
 *
 *  - `.select()` KHÔNG hiểu cú pháp nhúng quan hệ (`select("*, user:user_id(*)")`).
 *    Postgres nối bảng qua khoá ngoại còn ở đây phải viết JOIN tay. Bộ dựng NÉM
 *    LỖI khi gặp cú pháp ấy thay vì lặng lẽ trả thiếu cột - hỏng to còn hơn
 *    hỏng nhỏ mà không ai thấy.
 *  - Không có RLS. Supabase lọc theo `auth.uid()` ở tầng cơ sở dữ liệu; D1 thì
 *    không có gì tương đương, nên MỌI truy vấn chạm dữ liệu người dùng phải tự
 *    mang điều kiện chủ sở hữu. Đây là rủi ro lớn nhất của cả cuộc chuyển đổi.
 *  - Boolean là 0/1 và jsonb là chuỗi; `decode()` đổi ngược theo lược đồ đã chụp.
 */

type Row = Record<string, unknown>;

// Kiểu cột lấy từ bản chụp lược đồ, để giải mã ngược đúng thứ đã mã hoá lúc nạp.
// Không đoán từ giá trị: một cột boolean chứa 0 và một cột integer chứa 0 nhìn
// giống hệt nhau sau khi qua SQLite.
export type ColumnTypes = Record<string, Record<string, string>>;

function decodeValue(value: unknown, format: string | undefined): unknown {
  if (value === null || value === undefined) return null;
  switch (format) {
    case "boolean":
      return value === 1 || value === "1" || value === true;
    case "jsonb":
    case "json":
    case "text[]":
      try {
        return JSON.parse(String(value));
      } catch {
        return null;
      }
    default:
      return value;
  }
}

export class D1QueryError extends Error {}

/** Vi pham chinh sach truy cap - tach rieng de khong lan voi loi SQL. */
export class D1PolicyError extends Error {}

/**
 * Bang tra cuu chinh sach, sinh boi scripts/d1/generate-policies.mjs tu 186
 * chinh sach RLS dang chay. Xem tep do ve vi sao "manual" mac dinh la TU CHOI.
 */
export type Policy =
  | { kind: "owner"; column: string; publicRead?: boolean }
  | { kind: "public" }
  | { kind: "manual"; reason: string };

export type PolicyRegistry = Record<string, Policy>;

/**
 * Vi tu SQL dich thang tu dieu kien RLS goc, theo bang va theo lenh.
 * Sinh boi scripts/d1/translate-policies.mjs.
 *
 * 51/51 vi tu chay nguyen van tren SQLite. Giu nguyen SQL thay vi viet lai
 * bang TypeScript la co y: ban dich giong het ban goc ve ngu nghia va doc lai
 * thi so duoc tung ky tu voi chinh sach dang chay. Viet lai la them mot lan
 * dien dich, va moi lan dien dich la mot co hoi lam lech quyen.
 *
 * `?` trong vi tu la id nguoi goi, buoc theo dung so lan xuat hien.
 */
export type ManualPredicates = Record<string, Partial<Record<"select" | "insert" | "update" | "delete", string>>>;

/** Ai dang chay truy van. `null` = khach chua dang nhap. */
/**
 * Cờ CHỈ được cấp sau khi requireAdminDb() (lib/admin/db.ts) đã xác nhận
 * người gọi thật sự là admin qua getCurrentUser() - không nơi nào khác được
 * tự tạo giá trị này. Đây là Symbol, không phải chuỗi: một client viết
 * "__admin__" làm actor không đi qua được, chỉ import đúng ký hiệu này mới
 * được. Thay cho service-role key của Supabase - key ấy tự nó không kiểm gì,
 * chỗ kiểm nằm ở lib/admin-auth.ts; ở đây gộp cả hai làm một để không ai lấy
 * được cờ bỏ qua chính sách mà chưa qua đúng cổng.
 */
export const ADMIN_BYPASS: unique symbol = Symbol("d1-admin-bypass");
export type Actor = string | null | typeof ADMIN_BYPASS;

type Op = { sql: string; args: unknown[] };

class Builder implements PromiseLike<{ data: Row[] | Row | null; error: Error | null }> {
  private wheres: Op[] = [];
  private orders: string[] = [];
  private limitN: number | null = null;
  private offsetN = 0;
  private columns = "*";
  private mode: "select" | "insert" | "update" | "upsert" | "delete" = "select";
  private payload: Row[] = [];
  private wantSingle: "one" | "maybe" | null = null;
  private conflictTarget: string | null = null;

  constructor(
    private db: D1Database,
    private table: string,
    private types: ColumnTypes,
    private policy: Policy,
    private actor: Actor,
    private predicates: ManualPredicates[string] | undefined
  ) {}

  /**
   * Khai rang cho goi TU chiu trach nhiem kiem quyen cho bang nay.
   *
   * Chi dung voi 30 bang "manual" - nhung bang ma chinh sach RLS goc dung truy
   * van con (quyen thua ke tu bang cha, hoac kiem vai tro admin), thu khong quy
   * ve mot dieu kien mot cot. Client khong the ap chung may moc, nen no tu choi
   * cho toi khi co dong nay.
   *
   * `reason` la bat buoc va phai noi cho goi kiem quyen BANG CACH NAO. Mot chuoi
   * rong hay "da kiem roi" khong giup gi cho nguoi doc lai sau nay - va chinh la
   * luc ma lo du lieu xay ra.
   */
  unsafeManualPolicy(reason: string) {
    if (!reason || reason.trim().length < 20) {
      throw new D1PolicyError(
        `unsafeManualPolicy() tren "${this.table}" can mot ly do noi ro quyen duoc kiem the nao.`
      );
    }
    this.manualAcknowledged = true;
    return this;
  }

  private manualAcknowledged = false;

  /**
   * Ap dieu kien chu so huu. Day la thu thay cho RLS, va no chay o `build()`
   * chu khong o cho goi - de mot truy van quen `.eq("user_id", ...)` van khong
   * doc duoc du lieu nguoi khac.
   */
  private applyPolicy() {
    // Admin: bỏ qua MỌI chính sách, cả "owner" lẫn "manual" - đúng cách
    // service-role key của Supabase bỏ qua RLS hoàn toàn. Chỉ đạt tới đây khi
    // requireAdminDb() đã xác nhận vai trò admin trước đó.
    if (this.actor === ADMIN_BYPASS) return;

    const p = this.policy;

    if (p.kind === "manual") {
      // Vi tu dich thang tu chinh sach goc, neu co. 22/30 bang "manual" co, va
      // chung duoc AP TU DONG - nen `.unsafeManualPolicy()` chi con can cho 8
      // bang that su khong co chinh sach nao.
      const pred = this.predicates?.[this.mode === "upsert" ? "insert" : this.mode];
      if (pred) {
        const n = (pred.match(/\?/g) ?? []).length;
        if (this.actor === null && n > 0) {
          throw new D1PolicyError(
            `Bang "${this.table}" can biet nguoi goi de kiem quyen nhung truy van chay khong co nguoi dung.`
          );
        }
        this.wheres.push({ sql: `(${pred})`, args: Array(n).fill(this.actor) });
        return;
      }
      if (!this.manualAcknowledged) {
        throw new D1PolicyError(
          `Bang "${this.table}" co chinh sach truy cap khong ap may moc duoc (${p.reason}). ` +
            `Kiem quyen trong ma roi goi .unsafeManualPolicy("<kiem the nao>").`
        );
      }
      return;
    }
    if (p.kind !== "owner") return;

    // Doc cong khai: chinh sach goc cho moi nguoi xem (vi du bai dang cong dong)
    // nhung chi chu so huu duoc ghi. Nen dieu kien chi ap cho lenh ghi.
    if (this.mode === "select" && p.publicRead) return;

    if (this.actor === null) {
      throw new D1PolicyError(
        `Bang "${this.table}" loc theo "${p.column}" nhung truy van chay khong co nguoi dung. ` +
          `Dung createD1Client(db, types, registry, <id nguoi dung>).`
      );
    }

    if (this.mode === "insert" || this.mode === "upsert") {
      // Ghi: ep cot chu so huu thay vi loc. Cho goi co the truyen user_id cua
      // NGUOI KHAC - vo tinh hoac co y - va WHERE khong chan duoc lenh INSERT.
      for (const row of this.payload) row[p.column] = this.actor;
      return;
    }
    this.wheres.push({ sql: `${this.col(p.column)} = ?`, args: [this.actor] });
  }

  private col(name: string) {
    return `"${name.replace(/"/g, '""')}"`;
  }

  select(columns = "*") {
    if (/\(/.test(columns)) {
      throw new D1QueryError(
        `select("${columns}") dùng cú pháp nhúng quan hệ của PostgREST. D1 không nối bảng ` +
          `theo khoá ngoại được - viết JOIN tay bằng .raw() hoặc tách thành hai truy vấn.`
      );
    }
    if (this.mode === "select") this.columns = columns;
    return this;
  }

  eq(column: string, value: unknown) {
    // Boolean phải đổi sang 0/1 TRƯỚC khi so sánh: SQLite lưu 0/1 nên
    // `WHERE completed = 'true'` không khớp hàng nào, im lặng.
    const fmt = this.types[this.table]?.[column];
    const v = fmt === "boolean" ? (value ? 1 : 0) : value;
    this.wheres.push({ sql: `${this.col(column)} = ?`, args: [v] });
    return this;
  }
  neq(column: string, value: unknown) { this.wheres.push({ sql: `${this.col(column)} != ?`, args: [value] }); return this; }
  gt(column: string, value: unknown)  { this.wheres.push({ sql: `${this.col(column)} > ?`, args: [value] }); return this; }
  gte(column: string, value: unknown) { this.wheres.push({ sql: `${this.col(column)} >= ?`, args: [value] }); return this; }
  lt(column: string, value: unknown)  { this.wheres.push({ sql: `${this.col(column)} < ?`, args: [value] }); return this; }
  lte(column: string, value: unknown) { this.wheres.push({ sql: `${this.col(column)} <= ?`, args: [value] }); return this; }
  like(column: string, pattern: string) { this.wheres.push({ sql: `${this.col(column)} LIKE ?`, args: [pattern] }); return this; }
  // SQLite LIKE vốn không phân biệt hoa thường với ASCII, nhưng KHÔNG phải với
  // chữ có dấu: 'Ố' và 'ố' là hai ký tự khác nhau với nó. Với nội dung tiếng
  // Việt thì ilike ở đây KHÔNG tương đương ilike của Postgres, và chỗ nào cần
  // đúng thì phải chuẩn hoá chuỗi trước khi lưu.
  ilike(column: string, pattern: string) { this.wheres.push({ sql: `${this.col(column)} LIKE ?`, args: [pattern] }); return this; }

  is(column: string, value: null | boolean) {
    if (value === null) this.wheres.push({ sql: `${this.col(column)} IS NULL`, args: [] });
    else this.wheres.push({ sql: `${this.col(column)} = ?`, args: [value ? 1 : 0] });
    return this;
  }

  in(column: string, values: readonly unknown[]) {
    if (!values.length) {
      // `IN ()` là lỗi cú pháp ở SQLite. Supabase trả mảng rỗng cho trường hợp
      // này, nên phải khớp hành vi đó chứ không được ném lỗi.
      this.wheres.push({ sql: "0 = 1", args: [] });
      return this;
    }
    this.wheres.push({ sql: `${this.col(column)} IN (${values.map(() => "?").join(",")})`, args: [...values] });
    return this;
  }

  match(criteria: Row) {
    for (const [k, v] of Object.entries(criteria)) this.eq(k, v);
    return this;
  }

  not(column: string, operator: string, value: unknown) {
    if (operator === "is" && value === null) {
      this.wheres.push({ sql: `${this.col(column)} IS NOT NULL`, args: [] });
      return this;
    }
    throw new D1QueryError(`not("${column}", "${operator}", ...) chưa được dựng - chỉ có not(col, "is", null).`);
  }

  order(column: string, opts?: { ascending?: boolean }) {
    this.orders.push(`${this.col(column)} ${opts?.ascending === false ? "DESC" : "ASC"}`);
    return this;
  }

  limit(n: number) { this.limitN = n; return this; }

  range(from: number, to: number) {
    this.offsetN = from;
    this.limitN = to - from + 1;
    return this;
  }

  single()      { this.wantSingle = "one"; return this; }
  maybeSingle() { this.wantSingle = "maybe"; return this; }

  insert(values: Row | Row[]) {
    this.mode = "insert";
    this.payload = Array.isArray(values) ? values : [values];
    return this;
  }

  update(values: Row) { this.mode = "update"; this.payload = [values]; return this; }
  delete() { this.mode = "delete"; return this; }

  upsert(values: Row | Row[], opts?: { onConflict?: string }) {
    this.mode = "upsert";
    this.payload = Array.isArray(values) ? values : [values];
    // Supabase mặc định coi khoá chính là đích xung đột. SQLite bắt buộc phải
    // nêu rõ cột trong `ON CONFLICT(...)`, nên thiếu onConflict là lỗi ngay chứ
    // không phải một câu UPSERT lặng lẽ biến thành INSERT rồi ném lỗi trùng khoá.
    if (!opts?.onConflict) {
      throw new D1QueryError(
        `upsert vào "${this.table}" thiếu { onConflict }. SQLite cần biết cột xung đột; ` +
          `Supabase suy ra từ khoá chính, D1 thì không.`
      );
    }
    this.conflictTarget = opts.onConflict;
    return this;
  }

  private encode(row: Row): Row {
    const t = this.types[this.table] ?? {};
    const out: Row = {};
    for (const [k, v] of Object.entries(row)) {
      const fmt = t[k];
      if (v === null || v === undefined) out[k] = null;
      else if (fmt === "boolean") out[k] = v ? 1 : 0;
      else if (fmt === "jsonb" || fmt === "json" || fmt === "text[]") out[k] = JSON.stringify(v);
      else out[k] = v;
    }
    return out;
  }

  private build(): Op {
    // Đếm điều kiện do NGƯỜI GỌI viết, trước khi chính sách thêm điều kiện của
    // nó. Phép chặn "update/delete không có WHERE" bên dưới phải nhìn vào ý
    // định của người viết mã: bộ lọc chủ sở hữu tuy có thu hẹp phạm vi lại
    // (chỉ còn hàng của chính người gọi) nhưng một lệnh xoá quét sạch dữ liệu
    // của chính mình vẫn gần như luôn là lỗi, không phải chủ ý.
    const callerWheres = this.wheres.length;
    this.applyPolicy();
    const where = this.wheres.length
      ? " WHERE " + this.wheres.map((w) => w.sql).join(" AND ")
      : "";
    const whereArgs = this.wheres.flatMap((w) => w.args);
    const T = this.col(this.table);

    switch (this.mode) {
      case "select": {
        const cols = this.columns === "*"
          ? "*"
          : this.columns.split(",").map((c) => this.col(c.trim())).join(", ");
        let sql = `SELECT ${cols} FROM ${T}${where}`;
        if (this.orders.length) sql += ` ORDER BY ${this.orders.join(", ")}`;
        if (this.limitN !== null) sql += ` LIMIT ${this.limitN} OFFSET ${this.offsetN}`;
        return { sql, args: whereArgs };
      }
      case "insert":
      case "upsert": {
        const rows = this.payload.map((r) => this.encode(r));
        const names = [...new Set(rows.flatMap((r) => Object.keys(r)))];
        const tuples = rows.map(() => `(${names.map(() => "?").join(",")})`).join(",");
        const args = rows.flatMap((r) => names.map((n) => r[n] ?? null));
        let sql = `INSERT INTO ${T} (${names.map((n) => this.col(n)).join(",")}) VALUES ${tuples}`;
        if (this.mode === "upsert") {
          const target = this.conflictTarget!.split(",").map((c) => this.col(c.trim())).join(",");
          const setters = names.map((n) => `${this.col(n)} = excluded.${this.col(n)}`).join(", ");
          sql += ` ON CONFLICT(${target}) DO UPDATE SET ${setters}`;
        }
        return { sql: sql + " RETURNING *", args };
      }
      case "update": {
        const row = this.encode(this.payload[0]);
        const names = Object.keys(row);
        if (!callerWheres) {
          // Supabase cho phép UPDATE toàn bảng, và đó chính là lý do phải chặn
          // ở đây: một `.eq()` viết thiếu là ghi đè cả bảng mà không có gì báo
          // cho tới khi ai đó đọc lại.
          throw new D1QueryError(`update trên "${this.table}" không có điều kiện WHERE - sẽ ghi đè MỌI hàng.`);
        }
        return {
          sql: `UPDATE ${T} SET ${names.map((n) => `${this.col(n)} = ?`).join(", ")}${where} RETURNING *`,
          args: [...names.map((n) => row[n] ?? null), ...whereArgs],
        };
      }
      case "delete": {
        if (!callerWheres) {
          throw new D1QueryError(`delete trên "${this.table}" không có điều kiện WHERE - sẽ xoá MỌI hàng.`);
        }
        return { sql: `DELETE FROM ${T}${where} RETURNING *`, args: whereArgs };
      }
    }
  }

  private decodeRows(rows: Row[]): Row[] {
    const t = this.types[this.table] ?? {};
    return rows.map((r) => {
      const out: Row = {};
      for (const [k, v] of Object.entries(r)) out[k] = decodeValue(v, t[k]);
      return out;
    });
  }

  async run(): Promise<{ data: Row[] | Row | null; error: Error | null }> {
    try {
      const { sql, args } = this.build();
      const res = await this.db.prepare(sql).bind(...args).all();
      const rows = this.decodeRows((res.results ?? []) as Row[]);

      if (this.wantSingle === "one") {
        if (rows.length !== 1) {
          return { data: null, error: new D1QueryError(`single() cần đúng 1 hàng, nhận ${rows.length}`) };
        }
        return { data: rows[0], error: null };
      }
      if (this.wantSingle === "maybe") {
        if (rows.length > 1) {
          return { data: null, error: new D1QueryError(`maybeSingle() nhận ${rows.length} hàng`) };
        }
        return { data: rows[0] ?? null, error: null };
      }
      return { data: rows, error: null };
    } catch (err) {
      // Trả lỗi trong đối tượng thay vì ném, đúng như supabase-js: 527 chỗ gọi
      // hiện tại đều viết theo dạng `const { data, error } = await ...`, và đổi
      // sang ném sẽ làm mọi chỗ ấy nuốt lỗi thành sự cố chưa bắt.
      return { data: null, error: err as Error };
    }
  }

  then<A, B = never>(
    onfulfilled?: ((v: { data: Row[] | Row | null; error: Error | null }) => A | PromiseLike<A>) | null,
    onrejected?: ((r: unknown) => B | PromiseLike<B>) | null
  ): PromiseLike<A | B> {
    return this.run().then(onfulfilled, onrejected);
  }
}

export function createD1Client(
  db: D1Database,
  types: ColumnTypes,
  registry: PolicyRegistry,
  actor: Actor,
  predicates: ManualPredicates = {}
) {
  return {
    from(table: string) {
      if (!types[table]) {
        // Bảng không có trong bản chụp lược đồ gần như luôn là lỗi gõ tên. Bắt
        // ở đây thì lỗi chỉ đúng tên bảng; để SQLite bắt thì thông báo là
        // "no such table" lẫn giữa một câu SQL do máy sinh.
        throw new D1QueryError(`Bảng "${table}" không có trong lược đồ. Gõ nhầm tên?`);
      }
      const policy = registry[table];
      if (!policy) {
        // Bang co trong luoc do nhung khong co trong bang tra cuu chinh sach.
        // Xay ra khi ai do them bang moi ma chua chay lai generate-policies.mjs.
        // Tu choi, vi mac dinh cho qua o day nghia la bang moi nao cung mo toang.
        throw new D1PolicyError(
          `Bang "${table}" khong co trong bang tra cuu chinh sach. Chay lai scripts/d1/generate-policies.mjs.`
        );
      }
      return new Builder(db, table, types, policy, actor, predicates[table]);
    },

    /**
     * 53 hàm RPC, điều phối trong ./rpc-dispatch.ts.
     *
     * Ở đây chỉ nối vào chứ không dựng: bảng ánh xạ tên→hàm và thứ tự tham số
     * là việc riêng, và nó có bộ kiểm riêng đối chiếu với chữ ký thật.
     *
     * ADMIN_BYPASS không truyền được xuống đây - 53 hàm là SQL viết tay, không
     * đi qua applyPolicy(), nên "bỏ qua chính sách" không có nghĩa gì với
     * chúng. Admin gọi .rpc() (chưa ai làm) sẽ cần thiết kế riêng cho hàm đó,
     * không phải một cờ chung.
     */
    rpc: createD1Rpc(db, typeof actor === "string" ? actor : null),
  };
}
