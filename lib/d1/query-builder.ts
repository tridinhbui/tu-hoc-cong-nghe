import type { D1Database } from "@cloudflare/workers-types";
import { createD1Rpc } from "./rpc-dispatch";

/**
 * Bộ dựng truy vấn D1 nhại bề mặt API của SDK client cũ.
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
 * KHÁC BIỆT PHẢI BIẾT SO VỚI CLOUDFLARE:
 *
 *  - `.select()` KHÔNG hiểu cú pháp nhúng quan hệ (`select("*, user:user_id(*)")`).
 *    Postgres nối bảng qua khoá ngoại còn ở đây phải viết JOIN tay. Bộ dựng NÉM
 *    LỖI khi gặp cú pháp ấy thay vì lặng lẽ trả thiếu cột - hỏng to còn hơn
 *    hỏng nhỏ mà không ai thấy.
 *  - Không có RLS. Cloudflare lọc theo `auth.uid()` ở tầng cơ sở dữ liệu; D1 thì
 *    không có gì tương đương, nên MỌI truy vấn chạm dữ liệu người dùng phải tự
 *    mang điều kiện chủ sở hữu. Đây là rủi ro lớn nhất của cả cuộc chuyển đổi.
 *  - Boolean là 0/1 và jsonb là chuỗi; `decode()` đổi ngược theo lược đồ đã chụp.
 */

type Row = Record<string, unknown>;

// Kiểu cột lấy từ bản chụp lược đồ, để giải mã ngược đúng thứ đã mã hoá lúc nạp.
// Không đoán từ giá trị: một cột boolean chứa 0 và một cột integer chứa 0 nhìn
// giống hệt nhau sau khi qua SQLite.
export type ColumnTypes = Record<string, Record<string, string>>;

/** Tách một chuỗi theo dấu phẩy, bỏ qua dấu phẩy nằm trong ngoặc tròn - cần
 *  cho or() vì "lesson_id.in.(1,2,3)" có dấu phẩy TRONG một mệnh đề. */
function splitTopLevelCommas(s: string): string[] {
  const out: string[] = [];
  let depth = 0, start = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") depth++;
    else if (s[i] === ")") depth--;
    else if (s[i] === "," && depth === 0) {
      out.push(s.slice(start, i));
      start = i + 1;
    }
  }
  out.push(s.slice(start));
  return out;
}

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

/** Trần số hàng cho một lệnh có kiểm hàng mới. Xem buildCheckedInsert/Update. */
const MAX_CHECKED_ROWS = 20;

/**
 * Cột của bảng mà vị từ nhắc tới. Thừa thì vô hại - `id` trong `p.id` của một
 * bảng khác cũng lọt vào, và chỉ tốn thêm một cột trong bảng dẫn xuất - còn
 * thiếu thì vị từ đọc một cột không tồn tại và câu lệnh hỏng. Nên cố ý khớp
 * rộng: mọi định danh trùng tên cột, sau khi bỏ chuỗi trong nháy để `'manual'`
 * không bị nhầm thành cột tên manual.
 */
function predicateColumns(pred: string, columns: string[]): string[] {
  const ids = new Set(pred.replace(/'(?:[^']|'')*'/g, "''").match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? []);
  return columns.filter((c) => ids.has(c));
}

/**
 * Biểu thức mặc định của từng cột, đọc từ CHÍNH bảng qua PRAGMA table_info - đúng
 * thứ SQLite sẽ điền khi cột bị bỏ trống, kể cả các migration thêm sau bản chụp
 * lược đồ. Lược đồ không đổi trong đời một isolate, nên mỗi bảng đọc một lần.
 */
const defaultsCache = new Map<string, Record<string, string | null>>();
async function loadDefaults(db: D1Database, table: string): Promise<Record<string, string | null>> {
  const hit = defaultsCache.get(table);
  if (hit) return hit;
  const res = await db.prepare(`PRAGMA table_info("${table.replace(/"/g, '""')}")`).bind().all();
  const out: Record<string, string | null> = {};
  for (const r of (res.results ?? []) as { name: string; dflt_value: string | null }[]) {
    out[r.name] = r.dflt_value ?? null;
  }
  defaultsCache.set(table, out);
  return out;
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
 * được. Thay cho khoá service-role của hệ cũ - key ấy tự nó không kiểm gì,
 * chỗ kiểm nằm ở lib/admin-auth.ts; ở đây gộp cả hai làm một để không ai lấy
 * được cờ bỏ qua chính sách mà chưa qua đúng cổng.
 */
export const ADMIN_BYPASS: unique symbol = Symbol("d1-admin-bypass");

/**
 * Cột mà người dùng KHÔNG được tự ghi, kể cả trên chính hàng của mình.
 *
 * Chính sách "owner" lọc theo HÀNG, không theo CỘT: nó chỉ hỏi "hàng này có
 * phải của người gọi không", nên một lệnh cập nhật đặt coins tuỳ ý trên hàng
 * của chính mình đi qua trót lọt. Postgres chặn chuyện ấy bằng trigger guard_coins_column
 * (20260914_lock_coins_column.sql), gắn theo VAI TRÒ - thứ D1 không có.
 *
 * Danh sách này RỘNG HƠN bản gốc, có chủ ý. Bản gốc chỉ khoá `coins`; policy
 * "Users can update their own profile" cho ghi cả hàng, nên `role` và
 * `is_disabled` ghi được từ console - tức người dùng tự nâng mình lên admin,
 * hoặc tự mở khoá tài khoản vừa bị khoá. Chuyển sang D1 là dịp đóng lỗ ấy,
 * không phải mang nó theo. `email` khoá vì nó phải khớp auth_users; đổi email
 * là việc của lớp tài khoản, không phải một lệnh UPDATE hồ sơ.
 *
 * CHẶN CỨNG, không lặng lẽ bỏ qua như trigger Postgres (trigger ấy đặt
 * NEW.coins := OLD.coins rồi báo thành công). Đo trước khi chọn: mọi lượt ghi
 * user_profiles từ client đều nêu đích danh cột, không chỗ nào gửi cả hàng,
 * nên không có lượt ghi hợp lệ nào vô tình mang theo các cột này.
 */
const PROTECTED_COLUMNS: Record<string, readonly string[]> = {
  user_profiles: ["coins", "role", "is_disabled", "email"],
};
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
  private wantCount = false;
  private headOnly = false;

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
  private policyApplied = false;

  /** applyPolicy() có side-effect (đẩy thêm điều kiện vào wheres) - gọi hai
   *  lần là áp chính sách hai lần. build() và buildCountSql() đều cần where
   *  đã áp chính sách, nên bọc lại để chỉ chạy đúng một lần. */
  private applyPolicyOnce() {
    if (this.policyApplied) return;
    this.policyApplied = true;
    // Ghi lại số điều kiện NGƯỜI GỌI viết, trước khi chính sách thêm của nó.
    // Phép chặn "update/delete không có WHERE" trong build() đọc con số này;
    // đếm sau khi áp chính sách thì điều kiện do máy thêm sẽ trông như điều
    // kiện người viết mã cố ý đặt, và phép chặn thành vô dụng.
    this.callerWhereCount = this.wheres.length;
    this.applyPolicy();
  }

  private callerWhereCount: number | null = null;

  /**
   * WITH CHECK cho bảng dùng vị từ: điều kiện phải đúng trên HÀNG MỚI.
   *
   * Bản đầu của bộ dựng này đẩy vị từ vào `wheres` cho MỌI loại lệnh. Với
   * SELECT/DELETE/UPDATE thì `WHERE` là USING - đúng. Với INSERT thì không có
   * `WHERE` nào để đẩy vào, nên điều kiện bị BỎ QUA HOÀN TOÀN: đo trên SQL thật,
   * một người dùng gửi được tin nhắn riêng dưới tên người khác vào bất kỳ cuộc
   * trò chuyện nào, đăng bài cộng đồng dưới tên người khác, và tự tạo đơn khiếu
   * nại đã được duyệt sẵn. UPDATE thì chỉ kiểm hàng CŨ - sửa bài của mình rồi
   * đặt `user_id` sang người khác là qua. Bộ kiểm hai tài khoản không bắt được
   * vì nó chỉ thử lệnh chèn ở bảng "owner", chưa từng ở bảng vị từ.
   */
  private writeCheck: { pred: string; n: number; cols: string[] } | null = null;
  /** Hàng cũ (kèm rowid) đã đọc trước để dựng hàng mới cho WITH CHECK của UPDATE. */
  private checkRows: Row[] | null = null;
  /** Biểu thức mặc định thật của bảng, từ PRAGMA table_info. */
  private tableDefaults: Record<string, string | null> | null = null;

  private applyPolicy() {
    // Admin: bỏ qua MỌI chính sách, cả "owner" lẫn "manual" - đúng cách
    // khoá service-role của hệ cũ bỏ qua RLS hoàn toàn. Chỉ đạt tới đây khi
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
        if (this.mode === "upsert") {
          // UPSERT cần cả điều kiện INSERT lẫn điều kiện UPDATE trên hai hàng
          // khác nhau. Lệnh upsert duy nhất vào bảng vị từ trong repo nằm ở
          // trang quản trị, vốn bỏ qua chính sách - nên từ chối ở đây không làm
          // hỏng gì đang chạy, còn cho qua thì là đúng lỗ hổng vừa vá.
          throw new D1PolicyError(
            `upsert vào "${this.table}" không được hỗ trợ dưới danh nghĩa người dùng - dùng insert hoặc update.`
          );
        }
        const cols = predicateColumns(pred, Object.keys(this.types[this.table] ?? {}));
        if (this.mode === "insert") {
          this.writeCheck = { pred, n, cols };
          return;
        }
        // SELECT / DELETE / UPDATE: vị từ trên hàng CŨ - đây là USING.
        this.wheres.push({ sql: `(${pred})`, args: Array(n).fill(this.actor) });
        if (this.mode === "update") {
          // Hàng mới chỉ có thể khác hàng cũ ở những cột được SET. Không cột
          // nào được SET nằm trong vị từ thì vị từ trên hàng mới BẰNG vị từ
          // trên hàng cũ, vốn đã kiểm ở trên - khỏi tốn thêm lượt đọc. Đây là
          // trường hợp của gần như mọi lệnh sửa thật: đánh dấu đã đọc, sửa nội
          // dung bài, chấp nhận lời mời kết bạn.
          const setCols = Object.keys(this.payload[0] ?? {});
          if (setCols.some((c) => cols.includes(c))) this.writeCheck = { pred, n, cols };
        }
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
    if (this.mode === "update") {
      // WITH CHECK của bảng owner: hàng mới vẫn phải thuộc người gọi. WHERE chỉ
      // kiểm hàng cũ, nên `update({ user_id: "người khác" }).eq("id", x)` sẽ
      // chuyển hàng của mình sang tên người khác - một bài đăng, một đánh giá,
      // một kết quả thi hiện ra như của họ.
      const v = this.payload[0]?.[p.column];
      if (v !== undefined && v !== this.actor) {
        throw new D1PolicyError(
          `Không được đổi "${p.column}" của "${this.table}" sang người dùng khác.`
        );
      }
    }
    this.wheres.push({ sql: `${this.col(p.column)} = ?`, args: [this.actor] });
  }

  private col(name: string) {
    return `"${name.replace(/"/g, '""')}"`;
  }

  select(columns = "*", opts?: { count?: "exact"; head?: boolean }) {
    if (/\(/.test(columns)) {
      throw new D1QueryError(
        `select("${columns}") dùng cú pháp nhúng quan hệ của PostgREST. D1 không nối bảng ` +
          `theo khoá ngoại được - viết JOIN tay bằng .raw() hoặc tách thành hai truy vấn.`
      );
    }
    if (this.mode === "select") this.columns = columns;
    // 38 chỗ gọi thật dùng { count: "exact" } (đôi khi kèm { head: true } để
    // không cần tải data, chỉ cần con số) - đo trước khi dựng, như .or().
    this.wantCount = opts?.count === "exact";
    this.headOnly = opts?.head === true;
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
      // `IN ()` là lỗi cú pháp ở SQLite. SDK client cũ trả mảng rỗng cho trường hợp
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

  /**
   * `.or("col1.op1.val1,col2.op2.val2")` - cú pháp lọc PostgREST, đo được ở
   * 9 chỗ gọi thật trên toàn repo trước khi dựng.
   *
   * CHỈ 6 TOÁN TỬ, đúng những gì 9 chỗ gọi ấy dùng: eq, is (chỉ null), lt,
   * gt, ilike, in. Gặp toán tử khác thì NÉM LỖI thay vì lặng lẽ bỏ qua mệnh
   * đề - một mệnh đề bị bỏ qua âm thầm là bộ lọc lọc RỘNG HƠN ý định, và với
   * .or() thì "rộng hơn" nghĩa là trả về nhiều hàng hơn nó nên trả.
   *
   * TÁCH THEO DẤU PHẨY NGOÀI NGOẶC, không tách thẳng: `lesson_id.in.(1,2,3)`
   * có dấu phẩy nằm TRONG một mệnh đề duy nhất. Tách ẩu ở đây là cắt đôi một
   * điều kiện IN thành hai mệnh đề vô nghĩa, và không có gì báo lỗi - truy
   * vấn vẫn chạy, chỉ trả sai dữ liệu.
   */
  or(filter: string) {
    const clauses = splitTopLevelCommas(filter).map((c) => this.parseOrClause(c));
    this.wheres.push({
      sql: `(${clauses.map((c) => c.sql).join(" OR ")})`,
      args: clauses.flatMap((c) => c.args),
    });
    return this;
  }

  private parseOrClause(clause: string): { sql: string; args: unknown[] } {
    const m = /^([a-zA-Z_][a-zA-Z0-9_]*)\.([a-z]+)\.(.*)$/.exec(clause);
    if (!m) {
      throw new D1QueryError(`or("${clause}") không đúng dạng "cột.toán_tử.giá_trị".`);
    }
    const [, column, op, rawValue] = m;
    const col = this.col(column);
    const fmt = this.types[this.table]?.[column];

    switch (op) {
      case "eq": {
        const v = fmt === "boolean" ? (rawValue === "true" ? 1 : 0) : rawValue;
        return { sql: `${col} = ?`, args: [v] };
      }
      case "is":
        if (rawValue !== "null") {
          throw new D1QueryError(`or(): "is" chỉ dựng cho null, nhận "${rawValue}".`);
        }
        return { sql: `${col} IS NULL`, args: [] };
      case "lt":
        return { sql: `${col} < ?`, args: [rawValue] };
      case "gt":
        return { sql: `${col} > ?`, args: [rawValue] };
      case "ilike":
        // Xem ghi chú ở ilike() phía trên: không tương đương ILIKE của
        // Postgres với chữ có dấu, chỉ đúng với ASCII.
        return { sql: `${col} LIKE ?`, args: [rawValue] };
      case "in": {
        const inner = rawValue.replace(/^\(|\)$/g, "");
        const values = inner === "" ? [] : inner.split(",");
        if (!values.length) return { sql: "0 = 1", args: [] };
        return { sql: `${col} IN (${values.map(() => "?").join(",")})`, args: values };
      }
      default:
        throw new D1QueryError(
          `or(): toán tử "${op}" chưa được dựng - chỉ có eq/is/lt/gt/ilike/in, vì đó là những gì 9 chỗ gọi .or() trong repo thật sự dùng.`
        );
    }
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
    // Cloudflare mặc định coi khoá chính là đích xung đột. SQLite bắt buộc phải
    // nêu rõ cột trong `ON CONFLICT(...)`, nên thiếu onConflict là lỗi ngay chứ
    // không phải một câu UPSERT lặng lẽ biến thành INSERT rồi ném lỗi trùng khoá.
    if (!opts?.onConflict) {
      throw new D1QueryError(
        `upsert vào "${this.table}" thiếu { onConflict }. SQLite cần biết cột xung đột; ` +
          `PostgREST suy ra từ khoá chính, D1 thì không.`
      );
    }
    this.conflictTarget = opts.onConflict;
    return this;
  }

  private guardProtectedColumns() {
    if (this.actor === ADMIN_BYPASS) return;
    if (this.mode !== "insert" && this.mode !== "update" && this.mode !== "upsert") return;
    const blocked = PROTECTED_COLUMNS[this.table];
    if (!blocked) return;
    for (const row of this.payload) {
      for (const col of blocked) {
        if (col in row) {
          throw new D1PolicyError(
            `Không được tự ghi "${this.table}.${col}". Cột này chỉ đổi được qua mã máy chủ ` +
              `(grant_coins/purchase_cosmetic cho coins, trang quản trị cho role/is_disabled).`
          );
        }
      }
    }
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
    this.guardProtectedColumns();
    this.applyPolicyOnce();
    const callerWheres = this.callerWhereCount ?? 0;
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
        if (this.writeCheck) return this.buildCheckedInsert(T);
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
          // PostgREST cũ cho phép UPDATE toàn bảng, và đó chính là lý do phải chặn
          // ở đây: một `.eq()` viết thiếu là ghi đè cả bảng mà không có gì báo
          // cho tới khi ai đó đọc lại.
          throw new D1QueryError(`update trên "${this.table}" không có điều kiện WHERE - sẽ ghi đè MỌI hàng.`);
        }
        if (this.writeCheck) return this.buildCheckedUpdate(T, row, where, whereArgs);
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

  /** Câu đếm dùng CHUNG where đã áp chính sách với câu select - gọi
   *  applyPolicyOnce() để chắc chắn không áp chính sách một lần nữa (và
   *  không thiếu, nếu đây là lệnh gọi đầu tiên chạm tới where). */
  /**
   * INSERT có WITH CHECK: `INSERT ... SELECT ... FROM (hàng mới) AS <bảng> WHERE <vị từ>`.
   *
   * Mẹo nằm ở bí danh: bảng dẫn xuất chứa hàng mới được đặt TRÙNG TÊN bảng
   * thật, nên vị từ gốc dùng nguyên văn - cả cột trần (`sender_id`) lẫn dạng
   * có tên bảng (`direct_messages.friendship_id`) đều trỏ vào hàng MỚI, không
   * phải viết lại vị từ. Truy vấn con trong EXISTS vẫn tham chiếu bảng thật của
   * nó (`from user_friendships f`) như trước.
   *
   * `NOT EXISTS (... WHERE NOT vị từ)` làm lệnh thành tất-cả-hoặc-không: một hàng
   * sai là không hàng nào được chèn, đúng như Postgres huỷ cả câu lệnh. COALESCE
   * vì vị từ trên NULL cho NULL - không đúng cũng không sai - và NULL phải tính
   * là không qua.
   *
   * Cột mà vị từ đọc nhưng người gọi bỏ trống (vd `status` để bảng tự điền
   * 'pending') lấy BIỂU THỨC MẶC ĐỊNH THẬT của bảng, nạp trong run(). Không có
   * thì NULL, và vị từ không qua - sai về phía từ chối.
   */
  private buildCheckedInsert(T: string): Op {
    const { pred, n, cols } = this.writeCheck!;
    const rows = this.payload.map((r) => this.encode(r));
    if (rows.length > MAX_CHECKED_ROWS) {
      throw new D1PolicyError(
        `Chèn ${rows.length} hàng một lần vào "${this.table}" vượt mức ${MAX_CHECKED_ROWS} cho bảng có kiểm quyền hàng mới.`
      );
    }
    const names = [...new Set(rows.flatMap((r) => Object.keys(r)))];
    const extra = cols.filter((c) => !names.includes(c));
    const dflt = this.tableDefaults ?? {};
    const derived = rows
      .map((_, i) => {
        const alias = (c: string) => (i === 0 ? ` AS ${this.col(c)}` : "");
        return "SELECT " + [
          ...names.map((c) => `?${alias(c)}`),
          ...extra.map((c) => `${dflt[c] ?? "NULL"}${alias(c)}`),
        ].join(", ");
      })
      .join(" UNION ALL ");
    const rowArgs = rows.flatMap((r) => names.map((c) => r[c] ?? null));
    const predArgs = Array(n).fill(this.actor);
    const list = names.map((c) => this.col(c)).join(",");
    return {
      sql:
        `INSERT INTO ${T} (${list}) SELECT ${list} FROM (${derived}) AS ${T} ` +
        `WHERE COALESCE((${pred}), 0) ` +
        `AND NOT EXISTS (SELECT 1 FROM (${derived}) AS ${T} WHERE NOT COALESCE((${pred}), 0)) ` +
        `RETURNING *`,
      args: [...rowArgs, ...predArgs, ...rowArgs, ...predArgs],
    };
  }

  /**
   * UPDATE có WITH CHECK, chỉ khi lệnh SET một cột mà vị từ đọc.
   *
   * Hàng mới = hàng cũ (đọc trước trong run(), kèm rowid) chồng giá trị SET lên.
   * Dựng chúng thành bảng dẫn xuất đặt bí danh trùng tên bảng - cùng mẹo như
   * INSERT - và đòi mọi hàng mới qua vị từ. Ghim đúng các rowid đã đọc, để
   * hàng được cập nhật chính là hàng đã được kiểm.
   */
  private buildCheckedUpdate(T: string, row: Row, where: string, whereArgs: unknown[]): Op {
    const { pred, n, cols } = this.writeCheck!;
    const old = this.checkRows;
    if (!old) {
      throw new D1PolicyError(`update có kiểm hàng mới trên "${this.table}" phải chạy qua run().`);
    }
    if (old.length > MAX_CHECKED_ROWS) {
      throw new D1PolicyError(
        `Sửa ${old.length} hàng "${this.table}" một lần, có đổi cột dùng để kiểm quyền, vượt mức ${MAX_CHECKED_ROWS}.`
      );
    }
    const names = Object.keys(row);
    const derived = old
      .map((_, i) => "SELECT " + cols.map((c) => `?${i === 0 ? ` AS ${this.col(c)}` : ""}`).join(", "))
      .join(" UNION ALL ");
    const derivedArgs = old.flatMap((o) => cols.map((c) => (c in row ? row[c] : o[c]) ?? null));
    const rowids = old.map((o) => o.__rowid);
    const pin = ` AND rowid IN (${rowids.map(() => "?").join(",")})`;
    return {
      sql:
        `UPDATE ${T} SET ${names.map((c) => `${this.col(c)} = ?`).join(", ")}${where}${pin} ` +
        `AND NOT EXISTS (SELECT 1 FROM (${derived}) AS ${T} WHERE NOT COALESCE((${pred}), 0)) ` +
        `RETURNING *`,
      args: [
        ...names.map((c) => row[c] ?? null),
        ...whereArgs,
        ...rowids,
        ...derivedArgs,
        ...Array(n).fill(this.actor),
      ],
    };
  }

  private buildCountSql(): Op {
    this.applyPolicyOnce();
    const where = this.wheres.length
      ? " WHERE " + this.wheres.map((w) => w.sql).join(" AND ")
      : "";
    return { sql: `SELECT count(*) as n FROM ${this.col(this.table)}${where}`, args: this.wheres.flatMap((w) => w.args) };
  }

  async run(): Promise<{ data: Row[] | Row | null; error: Error | null; count?: number | null }> {
    try {
      // count TRƯỚC select: cả hai dùng chung this.wheres sau khi chính sách
      // áp xong, và applyPolicyOnce() phải chạy đúng một lần trước khi câu
      // nào trong hai câu đọc this.wheres.
      let count: number | null = null;
      if (this.wantCount) {
        const cq = this.buildCountSql();
        const cres = await this.db.prepare(cq.sql).bind(...cq.args).all();
        count = Number((cres.results?.[0] as { n: number } | undefined)?.n ?? 0);
      }

      // head: true - chỉ cần con số, không tải data. 38 chỗ gọi count:"exact"
      // phần lớn kèm head:true đúng cho việc này (đếm tin chưa đọc, đếm bài
      // chờ duyệt) - tải cả data rồi vứt đi là lãng phí một lượt quét bảng.
      if (this.headOnly) {
        return { data: [], error: null, count };
      }

      if (this.mode === "insert" || this.mode === "update") {
        this.guardProtectedColumns();
        this.applyPolicyOnce();
      }
      if (this.writeCheck && this.mode === "insert") {
        this.tableDefaults = await loadDefaults(this.db, this.table);
      }
      if (this.writeCheck && this.mode === "update") {
        if (!this.callerWhereCount) {
          throw new D1QueryError(`update trên "${this.table}" không có điều kiện WHERE - sẽ ghi đè MỌI hàng.`);
        }
        // Đọc trước hàng cũ mà lệnh sẽ chạm - cùng WHERE, tức cùng USING - để
        // dựng hàng mới cho WITH CHECK.
        const where = " WHERE " + this.wheres.map((w) => w.sql).join(" AND ");
        const cols = this.writeCheck.cols.map((c) => this.col(c)).join(", ");
        const pre = await this.db
          .prepare(`SELECT rowid AS "__rowid"${cols ? ", " + cols : ""} FROM ${this.col(this.table)}${where}`)
          .bind(...this.wheres.flatMap((w) => w.args))
          .all();
        this.checkRows = (pre.results ?? []) as Row[];
        if (!this.checkRows.length) {
          return this.wantSingle === "one"
            ? { data: null, error: new D1QueryError("single() cần đúng 1 hàng, nhận 0"), count }
            : { data: this.wantSingle === "maybe" ? null : [], error: null, count };
        }
      }

      const { sql, args } = this.build();
      const res = await this.db.prepare(sql).bind(...args).all();
      const rows = this.decodeRows((res.results ?? []) as Row[]);

      // Vị từ chặn thì câu lệnh chạy xong mà không ghi hàng nào - và lặng im.
      // Postgres báo lỗi ở đây; báo lại đúng như vậy, để chỗ gọi đang kiểm
      // `error` biết thao tác đã KHÔNG xảy ra thay vì tưởng đã lưu.
      const expected = this.mode === "insert" ? this.payload.length : this.checkRows?.length ?? 0;
      if (this.writeCheck && rows.length < expected) {
        return {
          data: null,
          error: new D1PolicyError(`new row violates row-level security policy for table "${this.table}"`),
          count,
        };
      }

      if (this.wantSingle === "one") {
        if (rows.length !== 1) {
          return { data: null, error: new D1QueryError(`single() cần đúng 1 hàng, nhận ${rows.length}`) };
        }
        return { data: rows[0], error: null, count };
      }
      if (this.wantSingle === "maybe") {
        if (rows.length > 1) {
          return { data: null, error: new D1QueryError(`maybeSingle() nhận ${rows.length} hàng`) };
        }
        return { data: rows[0] ?? null, error: null, count };
      }
      return { data: rows, error: null, count };
    } catch (err) {
      // Trả lỗi trong đối tượng thay vì ném, đúng như SDK client cũ: 527 chỗ gọi
      // hiện tại đều viết theo dạng `const { data, error } = await ...`, và đổi
      // sang ném sẽ làm mọi chỗ ấy nuốt lỗi thành sự cố chưa bắt.
      return { data: null, error: err as Error };
    }
  }

  then<A, B = never>(
    onfulfilled?: ((v: { data: Row[] | Row | null; error: Error | null; count?: number | null }) => A | PromiseLike<A>) | null,
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
    rpc: createD1Rpc(db, typeof actor === "string" ? actor : null, { serviceRole: actor === ADMIN_BYPASS }),
  };
}
