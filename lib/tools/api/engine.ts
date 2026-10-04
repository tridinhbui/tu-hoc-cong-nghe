/**
 * Bộ máy API giả lập cho /cong-cu/api - thuần TypeScript, không React, không
 * gọi mạng thật.
 *
 * Nó đóng vai một REST API của cửa hàng tại https://api.cua-hang.dev/v1 và cư
 * xử như một API thật: đúng mã trạng thái, đúng header (Location, Retry-After,
 * WWW-Authenticate, Allow), thân lỗi JSON có trường `error` máy đọc được, và độ
 * trễ giả lập. Mọi hàm là thuần: nhận trạng thái cũ, trả trạng thái mới, nên
 * kiểm thử được mà không cần trình duyệt.
 *
 * Chữ bên trong phản hồi (reason phrase, thông điệp lỗi, dữ liệu sản phẩm) để
 * tiếng Anh như một API thật; phần giải thích cho người học nằm trong từ điển.
 */

export const API_HOST = "api.cua-hang.dev";
export const BASE_URL = `https://${API_HOST}/v1`;
export const DEMO_TOKEN = "demo-token";
export const REPORT_LIMIT_PER_MINUTE = 3;
/** /exports: 2 lần mỗi 8 giây - cửa sổ ngắn để học viên chờ Retry-After thật mà không phải đợi cả phút. */
export const EXPORT_LIMIT = 2;
export const EXPORT_WINDOW_MS = 8_000;
/** Khoá API của đối tác trong tình huống mô phỏng - nói thẳng trong nhiệm vụ. */
export const PARTNER_API_KEY = "pk_demo_5f3a9c";
/** Ngày API v1 ngừng hoạt động (header Sunset) - chữ cố định để kiểm thử so khớp được. */
export const V1_SUNSET = "Wed, 31 Mar 2027 23:59:59 GMT";
export const HISTORY_LIMIT = 50;

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export const METHODS: HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export interface Order {
  id: number;
  product_id: number;
  quantity: number;
  total: number;
  status: "created";
  /** Giá trị header Idempotency-Key của lần tạo, nếu có. */
  idempotency_key?: string;
}

/** Yêu cầu đúng như lúc gửi đi: header đã gộp cả header tự sinh. */
export interface SentRequest {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  body: string;
}

export interface HttpResponse {
  kind: "http";
  status: number;
  statusText: string;
  headers: [string, string][];
  body: string;
  timeMs: number;
  sizeBytes: number;
}

export interface NetworkError {
  kind: "error";
  code: "INVALID_URL" | "ENOTFOUND";
  host?: string;
  timeMs: number;
}

export type ApiResult = HttpResponse | NetworkError;

export interface HistoryEntry {
  id: number;
  at: number;
  request: SentRequest;
  /** Đường dẫn không kèm query, ví dụ "/v1/products/3". Rỗng khi lỗi mạng. */
  path: string;
  query: Record<string, string>;
  /** 0 khi yêu cầu không tới được máy chủ (URL sai, sai tên miền). */
  status: number;
  timeMs: number;
  /** Phản hồi nhận được (body cắt ở RESPONSE_KEEP ký tự). Thiếu ở lịch sử lưu từ bản cũ. */
  response?: { headers: [string, string][]; body: string };
  /** Sản phẩm trước khi yêu cầu chạy, với các đường /products/:id - để chấm "có làm mất dữ liệu không". */
  before?: Product;
}
export const RESPONSE_KEEP = 8000;

export interface ApiState {
  products: Product[];
  nextId: number;
  seq: number;
  /** Mốc thời gian (ms) của các lần gọi /reports còn trong cửa sổ một phút. */
  reportCalls: number[];
  /** Mốc thời gian (ms) của các lần gọi /exports còn trong cửa sổ ngắn. */
  exportCalls: number[];
  orders: Order[];
  nextOrderId: number;
  /** Cũ nhất trước, mới nhất sau. */
  history: HistoryEntry[];
}

/* i18n-ignore-start: dữ liệu mẫu trong cơ sở dữ liệu của API giả lập, trả về dạng JSON như API thật - không phải chữ giao diện */
export const CATEGORIES = ["laptop", "accessories", "monitor", "audio"] as const;

const SEED_PRODUCTS: Product[] = [
  { id: 1, name: "Laptop Air 13", price: 22990000, category: "laptop", stock: 12 },
  { id: 2, name: "Mechanical Keyboard K2", price: 1290000, category: "accessories", stock: 40 },
  { id: 3, name: "Wireless Mouse M3", price: 490000, category: "accessories", stock: 85 },
  { id: 4, name: "27-inch 4K Monitor", price: 7490000, category: "monitor", stock: 9 },
  { id: 5, name: "Noise-cancelling Headphones", price: 3990000, category: "audio", stock: 21 },
  { id: 6, name: "USB-C Hub 7-in-1", price: 690000, category: "accessories", stock: 0 },
];

/** Reason phrase chuẩn của HTTP - đúng chữ máy chủ thật gửi về. */
export const REASON_PHRASES: Record<number, string> = {
  200: "OK",
  201: "Created",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  415: "Unsupported Media Type",
  409: "Conflict",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
};
/* i18n-ignore-end */

export function createApiState(): ApiState {
  return {
    products: SEED_PRODUCTS.map((p) => ({ ...p })),
    nextId: SEED_PRODUCTS.length + 1,
    seq: 0,
    reportCalls: [],
    exportCalls: [],
    orders: [],
    nextOrderId: 1001,
    history: [],
  };
}

/** Bổ sung các trường mới cho trạng thái đã lưu từ phiên bản cũ (localStorage). */
export function normalizeApiState(state: ApiState): ApiState {
  return {
    ...state,
    exportCalls: state.exportCalls ?? [],
    orders: state.orders ?? [],
    nextOrderId: state.nextOrderId ?? 1001,
  };
}

// ---------------------------------------------------------------- URL helpers

export interface ParsedUrl {
  host: string;
  path: string;
  query: [string, string][];
}

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s.replace(/\+/g, " "));
  } catch {
    return s;
  }
}

export function parseQuery(qs: string): [string, string][] {
  if (!qs) return [];
  return qs
    .split("&")
    .filter((part) => part.length > 0)
    .map((part) => {
      const eq = part.indexOf("=");
      return eq === -1
        ? [safeDecode(part), ""]
        : [safeDecode(part.slice(0, eq)), safeDecode(part.slice(eq + 1))];
    });
}

export function parseUrl(url: string): ParsedUrl | null {
  const m = /^(https?):\/\/([^/?#\s]+)([^?#\s]*)(?:\?([^#\s]*))?(?:#\S*)?$/i.exec(url.trim());
  if (!m) return null;
  return { host: m[2].toLowerCase(), path: m[3] || "/", query: parseQuery(m[4] ?? "") };
}

/** Tách phần query ra thành hàng key/value cho tab Params. */
export function paramsFromUrl(url: string): [string, string][] {
  const q = url.indexOf("?");
  if (q === -1) return [];
  return parseQuery(url.slice(q + 1).split("#")[0]);
}

/** Ghi lại phần query của URL từ các hàng trong tab Params. */
export function urlWithParams(url: string, params: [string, string][]): string {
  const q = url.indexOf("?");
  const base = q === -1 ? url : url.slice(0, q);
  // Hàng key rỗng nhưng có value vẫn giữ, để người đang sửa key không mất dòng.
  const kept = params.filter(([k, v]) => k.trim().length > 0 || v.length > 0);
  if (kept.length === 0) return base;
  const qs = kept
    .map(([k, v]) => (v === "" ? encodeURIComponent(k) : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`))
    .join("&");
  return `${base}?${qs}`;
}

function headerValue(headers: Record<string, string>, name: string): string | undefined {
  const wanted = name.toLowerCase();
  for (const [k, v] of Object.entries(headers)) {
    if (k.toLowerCase() === wanted) return v;
  }
  return undefined;
}

export function byteLength(s: string): number {
  return new TextEncoder().encode(s).length;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(2)} KB`;
}

// ---------------------------------------------------------------- routing

interface RouteOutcome {
  status: number;
  body?: unknown;
  headers?: [string, string][];
}

function json(status: number, body: unknown, headers: [string, string][] = []): RouteOutcome {
  return { status, body, headers };
}

/* i18n-ignore-start: thân lỗi JSON và header của API giả lập, giữ tiếng Anh như một API thật trả về */
function errorBody(error: string, message: string, extra: Record<string, unknown> = {}) {
  return { error, message, ...extra };
}

function methodNotAllowed(method: string, path: string, allowed: HttpMethod[]): RouteOutcome {
  return json(405, errorBody("method_not_allowed", `${method} is not supported on ${path}`), [
    ["Allow", allowed.join(", ")],
  ]);
}

type ParsedBody = { ok: true; value: unknown } | { ok: false; outcome: RouteOutcome };

function readJsonBody(req: SentRequest): ParsedBody {
  const contentType = headerValue(req.headers, "Content-Type") ?? "";
  if (!/application\/json/i.test(contentType)) {
    return {
      ok: false,
      outcome: json(
        415,
        errorBody(
          "unsupported_media_type",
          contentType
            ? `Expected Content-Type application/json, got ${contentType}`
            : "Missing Content-Type header; send the body as application/json",
        ),
      ),
    };
  }
  if (req.body.trim() === "") {
    return { ok: false, outcome: json(400, errorBody("empty_body", "Request body is empty")) };
  }
  try {
    return { ok: true, value: JSON.parse(req.body) };
  } catch (e) {
    return {
      ok: false,
      outcome: json(400, errorBody("invalid_json", e instanceof Error ? e.message : "Body is not valid JSON")),
    };
  }
}

interface FieldIssue {
  field: string;
  message: string;
}

type Validated = { ok: true; value: Partial<Omit<Product, "id">> } | { ok: false; outcome: RouteOutcome };

function validateProduct(input: unknown, partial: boolean): Validated {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { ok: false, outcome: json(400, errorBody("invalid_body", "Body must be a JSON object")) };
  }
  const o = input as Record<string, unknown>;
  const issues: FieldIssue[] = [];
  const value: Partial<Omit<Product, "id">> = {};

  if ("id" in o) issues.push({ field: "id", message: "is read-only and set by the server" });

  if (o.name === undefined) {
    if (!partial) issues.push({ field: "name", message: "is required" });
  } else if (typeof o.name !== "string" || o.name.trim().length < 2) {
    issues.push({ field: "name", message: "must be a string of at least 2 characters" });
  } else value.name = o.name.trim();

  if (o.price === undefined) {
    if (!partial) issues.push({ field: "price", message: "is required" });
  } else if (typeof o.price !== "number" || !Number.isInteger(o.price) || o.price <= 0) {
    issues.push({
      field: "price",
      message:
        typeof o.price === "string"
          ? "must be a number, not a string (remove the quotes)"
          : "must be a positive integer (VND)",
    });
  } else value.price = o.price;

  if (o.category === undefined) {
    if (!partial) issues.push({ field: "category", message: "is required" });
  } else if (typeof o.category !== "string" || !(CATEGORIES as readonly string[]).includes(o.category)) {
    issues.push({ field: "category", message: `must be one of: ${CATEGORIES.join(", ")}` });
  } else value.category = o.category;

  if (o.stock !== undefined) {
    if (typeof o.stock !== "number" || !Number.isInteger(o.stock) || o.stock < 0) {
      issues.push({ field: "stock", message: "must be an integer >= 0" });
    } else value.stock = o.stock;
  }

  if (issues.length > 0) {
    return {
      ok: false,
      outcome: json(
        400,
        errorBody(
          "validation_failed",
          `Request body has ${issues.length} invalid field${issues.length > 1 ? "s" : ""}`,
          { details: issues },
        ),
      ),
    };
  }
  if (partial && Object.keys(value).length === 0) {
    return {
      ok: false,
      outcome: json(400, errorBody("empty_patch", "Send at least one of: name, price, category, stock")),
    };
  }
  return { ok: true, value };
}

function bearerToken(req: SentRequest): string | null {
  const auth = headerValue(req.headers, "Authorization");
  if (!auth) return null;
  const m = /^Bearer\s+(\S+)$/i.exec(auth.trim());
  return m ? m[1] : "";
}

function unauthorized(token: string | null): RouteOutcome {
  if (token === null) {
    return json(401, errorBody("unauthorized", "Missing Authorization header"), [
      ["WWW-Authenticate", 'Bearer realm="cua-hang"'],
    ]);
  }
  return json(401, errorBody("invalid_token", "The access token is invalid or expired"), [
    ["WWW-Authenticate", 'Bearer realm="cua-hang", error="invalid_token"'],
  ]);
}

const V1_DEPRECATION: [string, string][] = [
  ["Deprecation", "true"],
  ["Sunset", V1_SUNSET],
  ["Link", '</v2/products>; rel="successor-version"'],
];

const SORT_FIELDS = ["id", "price", "name", "stock"] as const;

type ProductQuery =
  | {
      ok: true;
      page: Product[];
      total: number;
      limit: number;
      offset: number | null;
      nextCursor: string | null;
    }
  | { ok: false; outcome: RouteOutcome };

const invalidQuery = (message: string, field: string, got: string): { ok: false; outcome: RouteOutcome } => ({
  ok: false,
  outcome: json(400, errorBody("invalid_query", message, { details: [{ field, message: `got "${got}"` }] })),
});

/** Lọc, sắp xếp và cắt trang danh sách sản phẩm - dùng chung cho v1 và v2. */
function queryProducts(state: ApiState, query: Record<string, string>, allowOffset: boolean): ProductQuery {
  let items = state.products;
  if (query.category !== undefined && query.category !== "") {
    items = items.filter((p) => p.category === query.category);
  }
  if (query.in_stock !== undefined && query.in_stock !== "") {
    if (query.in_stock !== "true" && query.in_stock !== "false") {
      return invalidQuery("in_stock must be true or false", "in_stock", query.in_stock);
    }
    const wantStock = query.in_stock === "true";
    items = items.filter((p) => p.stock > 0 === wantStock);
  }

  let sortField: (typeof SORT_FIELDS)[number] = "id";
  let desc = false;
  if (query.sort !== undefined && query.sort !== "") {
    const raw = query.sort;
    const name = raw.startsWith("-") ? raw.slice(1) : raw;
    if (!(SORT_FIELDS as readonly string[]).includes(name)) {
      return invalidQuery(`sort must be one of: ${SORT_FIELDS.join(", ")} (prefix with - for descending)`, "sort", raw);
    }
    sortField = name as (typeof SORT_FIELDS)[number];
    desc = raw.startsWith("-");
  }
  if (query.order !== undefined && query.order !== "") {
    if (query.order !== "asc" && query.order !== "desc") return invalidQuery("order must be asc or desc", "order", query.order);
    if (query.order === "desc") desc = true;
  }
  items = [...items].sort((a, b) => {
    const av = a[sortField];
    const bv = b[sortField];
    const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
    return (cmp !== 0 ? cmp : a.id - b.id) * (desc ? -1 : 1);
  });

  let limit = 20;
  if (query.limit !== undefined) {
    const n = Number(query.limit);
    if (!/^\d+$/.test(query.limit) || n < 1 || n > 100) {
      return invalidQuery("limit must be an integer between 1 and 100", "limit", query.limit);
    }
    limit = n;
  }

  if (query.offset !== undefined && query.cursor !== undefined) {
    return {
      ok: false,
      outcome: json(400, errorBody("conflicting_params", "Use either offset or cursor, not both")),
    };
  }
  let start = 0;
  let offset: number | null = null;
  if (query.offset !== undefined) {
    if (!allowOffset) {
      return {
        ok: false,
        outcome: json(400, errorBody("offset_not_supported", "v2 paginates with cursor only; remove offset and use next_cursor")),
      };
    }
    if (!/^\d+$/.test(query.offset)) return invalidQuery("offset must be an integer >= 0", "offset", query.offset);
    offset = Number(query.offset);
    start = offset;
  }
  if (query.cursor !== undefined) {
    const m = /^c_(\d+)$/.exec(query.cursor);
    const at = m ? items.findIndex((p) => p.id === Number(m[1])) : -1;
    if (at === -1) {
      return {
        ok: false,
        outcome: json(400, errorBody("invalid_cursor", "The cursor is malformed or no longer valid; restart from the first page")),
      };
    }
    start = at + 1;
  }
  const page = items.slice(start, start + limit);
  const more = start + limit < items.length;
  return {
    ok: true,
    page,
    total: items.length,
    limit,
    offset,
    nextCursor: more && page.length > 0 ? `c_${page[page.length - 1].id}` : null,
  };
}

const toV2 = (p: Product) => ({
  id: p.id,
  name: p.name,
  price_vnd: p.price,
  category: p.category,
  in_stock: p.stock > 0,
});

/** v2 xem trước: chỉ đọc sản phẩm, phân trang bằng con trỏ, giá đổi tên thành price_vnd. */
function routeV2(state: ApiState, req: SentRequest, path: string, query: Record<string, string>): RouteOutcome {
  const { method } = req;
  const sub = path.replace(/^\/v2/, "").replace(/\/+$/, "") || "/";
  if (sub === "/products") {
    if (method !== "GET") return methodNotAllowed(method, path, ["GET"]);
    const q = queryProducts(state, query, false);
    if (!q.ok) return q.outcome;
    return json(200, { items: q.page.map(toV2), next_cursor: q.nextCursor });
  }
  const idMatch = /^\/products\/([^/]+)$/.exec(sub);
  if (idMatch) {
    if (method !== "GET") return methodNotAllowed(method, path, ["GET"]);
    const raw = safeDecode(idMatch[1]);
    const found = /^\d+$/.test(raw) ? state.products.find((p) => p.id === Number(raw)) : undefined;
    return found ? json(200, toV2(found)) : json(404, errorBody("not_found", `Product with id ${raw} does not exist`));
  }
  return json(404, errorBody("not_found", `Cannot ${method} ${path} - the v2 preview only has /v2/products`));
}

function route(
  state: ApiState,
  req: SentRequest,
  path: string,
  query: Record<string, string>,
  now: number,
): { state: ApiState; outcome: RouteOutcome } {
  const { method } = req;
  const same = (outcome: RouteOutcome) => ({ state, outcome });

  if (path === "/v2" || path.startsWith("/v2/")) return same(routeV2(state, req, path, query));
  if (!path.startsWith("/v1/") && path !== "/v1") {
    return same(json(404, errorBody("not_found", `Cannot ${method} ${path} - every route starts with /v1`)));
  }
  const sub = path.replace(/^\/v1/, "").replace(/\/+$/, "") || "/";

  // /health
  if (sub === "/health") {
    if (method !== "GET") return same(methodNotAllowed(method, path, ["GET"]));
    return same(json(200, { status: "ok", version: "1.4.2" }));
  }

  // /products
  if (sub === "/products") {
    if (method === "GET") {
      const q = queryProducts(state, query, true);
      if (!q.ok) return same(q.outcome);
      return same(
        json(
          200,
          {
            data: q.page,
            total: q.total,
            limit: q.limit,
            ...(query.category ? { category: query.category } : {}),
            ...(q.offset !== null ? { offset: q.offset } : {}),
            has_more: q.nextCursor !== null,
            next_cursor: q.nextCursor,
          },
          V1_DEPRECATION,
        ),
      );
    }
    if (method === "POST") {
      const parsed = readJsonBody(req);
      if (!parsed.ok) return same(parsed.outcome);
      const valid = validateProduct(parsed.value, false);
      if (!valid.ok) return same(valid.outcome);
      const product: Product = {
        id: state.nextId,
        name: valid.value.name!,
        price: valid.value.price!,
        category: valid.value.category!,
        stock: valid.value.stock ?? 0,
      };
      return {
        state: { ...state, products: [...state.products, product], nextId: state.nextId + 1 },
        outcome: json(201, product, [["Location", `/v1/products/${product.id}`]]),
      };
    }
    return same(methodNotAllowed(method, path, ["GET", "POST"]));
  }

  // /products/:id
  const idMatch = /^\/products\/([^/]+)$/.exec(sub);
  if (idMatch) {
    const raw = safeDecode(idMatch[1]);
    const id = /^\d+$/.test(raw) ? Number(raw) : NaN;
    const existing = state.products.find((p) => p.id === id);
    const notFound = () =>
      json(404, errorBody("not_found", `Product with id ${raw} does not exist`));

    if (method === "GET") return same(existing ? json(200, existing, V1_DEPRECATION) : notFound());
    if (method === "DELETE") {
      if (!existing) return same(notFound());
      return {
        state: { ...state, products: state.products.filter((p) => p.id !== id) },
        outcome: { status: 204 },
      };
    }
    if (method === "PUT" || method === "PATCH") {
      if (!existing) return same(notFound());
      const parsed = readJsonBody(req);
      if (!parsed.ok) return same(parsed.outcome);
      const valid = validateProduct(parsed.value, method === "PATCH");
      if (!valid.ok) return same(valid.outcome);
      const updated: Product =
        method === "PUT"
          ? {
              id,
              name: valid.value.name!,
              price: valid.value.price!,
              category: valid.value.category!,
              stock: valid.value.stock ?? 0,
            }
          : { ...existing, ...valid.value };
      return {
        state: { ...state, products: state.products.map((p) => (p.id === id ? updated : p)) },
        outcome: json(200, updated),
      };
    }
    return same(methodNotAllowed(method, path, ["GET", "PUT", "PATCH", "DELETE"]));
  }

  // /login
  if (sub === "/login") {
    if (method !== "POST") return same(methodNotAllowed(method, path, ["POST"]));
    const parsed = readJsonBody(req);
    if (!parsed.ok) return same(parsed.outcome);
    const o = (typeof parsed.value === "object" && parsed.value !== null ? parsed.value : {}) as Record<string, unknown>;
    const missing = ["email", "password"].filter((f) => typeof o[f] !== "string" || (o[f] as string) === "");
    if (missing.length > 0) {
      return same(
        json(
          400,
          errorBody("validation_failed", "email and password are required", {
            details: missing.map((field) => ({ field, message: "is required" })),
          }),
        ),
      );
    }
    if (o.password !== "demo123") {
      return same(json(401, errorBody("invalid_credentials", "Email or password is incorrect")));
    }
    return same(json(200, { token: DEMO_TOKEN, token_type: "Bearer", expires_in: 3600 }));
  }

  // /me
  if (sub === "/me") {
    if (method !== "GET") return same(methodNotAllowed(method, path, ["GET"]));
    const token = bearerToken(req);
    if (token !== DEMO_TOKEN) return same(unauthorized(token));
    return same(json(200, { id: 42, email: "demo@cua-hang.dev", name: "Demo User", role: "customer" }));
  }

  // /admin/stats - đăng nhập rồi vẫn bị chặn: 403 khác 401 ở chỗ này.
  if (sub === "/admin/stats") {
    if (method !== "GET") return same(methodNotAllowed(method, path, ["GET"]));
    const token = bearerToken(req);
    if (token !== DEMO_TOKEN) return same(unauthorized(token));
    return same(json(403, errorBody("forbidden", "This endpoint requires role admin; you are customer")));
  }

  // /reports - giới hạn 3 lần mỗi phút.
  if (sub === "/reports") {
    if (method !== "GET") return same(methodNotAllowed(method, path, ["GET"]));
    const recent = state.reportCalls.filter((t) => now - t < 60_000);
    const limitHeaders = (remaining: number): [string, string][] => [
      ["X-RateLimit-Limit", String(REPORT_LIMIT_PER_MINUTE)],
      ["X-RateLimit-Remaining", String(remaining)],
    ];
    if (recent.length >= REPORT_LIMIT_PER_MINUTE) {
      const retryAfter = Math.max(1, Math.ceil((recent[0] + 60_000 - now) / 1000));
      return {
        state: { ...state, reportCalls: recent },
        outcome: json(
          429,
          errorBody("rate_limited", `Too many requests: ${REPORT_LIMIT_PER_MINUTE} per minute. Retry in ${retryAfter}s`),
          [["Retry-After", String(retryAfter)], ...limitHeaders(0)],
        ),
      };
    }
    const calls = [...recent, now];
    const revenue = state.products.reduce((sum, p) => sum + p.price * Math.min(p.stock, 3), 0);
    return {
      state: { ...state, reportCalls: calls },
      outcome: json(
        200,
        {
          period: "last_7_days",
          orders: 128,
          revenue_vnd: revenue,
          top_category: "accessories",
          low_stock: state.products.filter((p) => p.stock < 5).map((p) => p.id),
        },
        limitHeaders(REPORT_LIMIT_PER_MINUTE - calls.length),
      ),
    };
  }

  // /partner/inventory - xác thực bằng khoá API trong header, không phải trong URL.
  if (sub === "/partner/inventory") {
    if (method !== "GET") return same(methodNotAllowed(method, path, ["GET"]));
    if (query.api_key !== undefined || query.apikey !== undefined || query.key !== undefined) {
      return same(
        json(400, errorBody("key_in_query", "API keys must be sent in the X-API-Key header, never in the URL: URLs end up in logs and browser history")),
      );
    }
    const key = headerValue(req.headers, "X-API-Key");
    if (key === undefined || key.trim() === "") {
      return same(
        json(401, errorBody("missing_api_key", "Missing X-API-Key header"), [["WWW-Authenticate", 'ApiKey header="X-API-Key"']]),
      );
    }
    if (key !== PARTNER_API_KEY) {
      return same(
        json(401, errorBody("invalid_api_key", "The API key is not recognised"), [["WWW-Authenticate", 'ApiKey header="X-API-Key"']]),
      );
    }
    return same(
      json(200, { partner: "Minh Anh Store", items: state.products.map((p) => ({ id: p.id, stock: p.stock })) }),
    );
  }

  // /exports - giới hạn EXPORT_LIMIT lần mỗi EXPORT_WINDOW_MS.
  if (sub === "/exports") {
    if (method !== "GET") return same(methodNotAllowed(method, path, ["GET"]));
    const recent = (state.exportCalls ?? []).filter((t) => now - t < EXPORT_WINDOW_MS);
    const limitHeaders = (remaining: number): [string, string][] => [
      ["X-RateLimit-Limit", String(EXPORT_LIMIT)],
      ["X-RateLimit-Remaining", String(remaining)],
    ];
    if (recent.length >= EXPORT_LIMIT) {
      const retryAfter = Math.max(1, Math.ceil((recent[0] + EXPORT_WINDOW_MS - now) / 1000));
      return {
        state: { ...state, exportCalls: recent },
        outcome: json(
          429,
          errorBody("rate_limited", `Too many requests: ${EXPORT_LIMIT} per ${EXPORT_WINDOW_MS / 1000}s. Retry in ${retryAfter}s`),
          [["Retry-After", String(retryAfter)], ...limitHeaders(0)],
        ),
      };
    }
    const calls = [...recent, now];
    return {
      state: { ...state, exportCalls: calls },
      outcome: json(200, { file: "orders-daily.csv", rows: 128 }, limitHeaders(EXPORT_LIMIT - calls.length)),
    };
  }

  // /orders - tạo đơn; header Idempotency-Key chặn tạo trùng khi gửi lại.
  if (sub === "/orders") {
    const orders = state.orders ?? [];
    if (method === "GET") return same(json(200, { data: orders, total: orders.length }));
    if (method !== "POST") return same(methodNotAllowed(method, path, ["GET", "POST"]));
    const parsed = readJsonBody(req);
    if (!parsed.ok) return same(parsed.outcome);
    const o = (typeof parsed.value === "object" && parsed.value !== null && !Array.isArray(parsed.value)
      ? parsed.value
      : null) as Record<string, unknown> | null;
    if (!o) return same(json(400, errorBody("invalid_body", "Body must be a JSON object")));
    const issues: FieldIssue[] = [];
    const product =
      typeof o.product_id === "number" && Number.isInteger(o.product_id)
        ? state.products.find((p) => p.id === o.product_id)
        : undefined;
    if (o.product_id === undefined) issues.push({ field: "product_id", message: "is required" });
    else if (!product) issues.push({ field: "product_id", message: "must be the id of an existing product" });
    const qty = o.quantity;
    if (qty === undefined) issues.push({ field: "quantity", message: "is required" });
    else if (typeof qty !== "number" || !Number.isInteger(qty) || qty < 1 || qty > 10) {
      issues.push({ field: "quantity", message: "must be an integer between 1 and 10" });
    }
    if (issues.length > 0 || !product || typeof qty !== "number") {
      return same(
        json(400, errorBody("validation_failed", `Request body has ${issues.length} invalid field${issues.length > 1 ? "s" : ""}`, { details: issues })),
      );
    }
    const rawKey = headerValue(req.headers, "Idempotency-Key");
    if (rawKey !== undefined && (rawKey.trim() === "" || rawKey.length > 64)) {
      return same(json(400, errorBody("invalid_idempotency_key", "Idempotency-Key must be 1 to 64 characters")));
    }
    if (rawKey !== undefined) {
      const seen = orders.find((x) => x.idempotency_key === rawKey);
      if (seen) {
        if (seen.product_id === product.id && seen.quantity === qty) {
          return same(json(200, seen, [["Idempotent-Replayed", "true"], ["Location", `/v1/orders/${seen.id}`]]));
        }
        return same(
          json(422, errorBody("idempotency_key_reused", "This Idempotency-Key was already used with a different request body")),
        );
      }
    }
    if (qty > product.stock) {
      return same(
        json(409, errorBody("out_of_stock", `Only ${product.stock} left of product ${product.id}, requested ${qty}`)),
      );
    }
    const order: Order = {
      id: state.nextOrderId ?? 1001,
      product_id: product.id,
      quantity: qty,
      total: product.price * qty,
      status: "created",
      ...(rawKey !== undefined ? { idempotency_key: rawKey } : {}),
    };
    return {
      state: {
        ...state,
        orders: [...orders, order],
        nextOrderId: order.id + 1,
        products: state.products.map((p) => (p.id === product.id ? { ...p, stock: p.stock - qty } : p)),
      },
      outcome: json(201, order, [["Location", `/v1/orders/${order.id}`]]),
    };
  }
  const orderMatch = /^\/orders\/([^/]+)$/.exec(sub);
  if (orderMatch) {
    if (method !== "GET") return same(methodNotAllowed(method, path, ["GET"]));
    const raw = safeDecode(orderMatch[1]);
    const found = (state.orders ?? []).find((x) => String(x.id) === raw);
    return same(found ? json(200, found) : json(404, errorBody("not_found", `Order with id ${raw} does not exist`)));
  }

  return same(json(404, errorBody("not_found", `Cannot ${method} ${path}`)));
}
/* i18n-ignore-end */

function latencyFor(method: HttpMethod, path: string, seq: number): number {
  let base = method === "GET" ? 70 : method === "DELETE" ? 90 : 120;
  if (path.endsWith("/login")) base = 240;
  if (path.endsWith("/reports")) base = 380;
  const jitter = (seq * 7919 + path.length * 31) % 67;
  return base + jitter;
}

/** Gửi một yêu cầu tới API giả lập. Thuần: không đụng mạng, không đọc đồng hồ. */
export function sendRequest(
  state: ApiState,
  req: SentRequest,
  now: number,
): { state: ApiState; result: ApiResult } {
  state = normalizeApiState(state);
  const seq = state.seq + 1;
  const parsed = parseUrl(req.url);

  const record = (s: ApiState, entry: Omit<HistoryEntry, "id" | "at" | "request">): ApiState => ({
    ...s,
    seq,
    history: [...s.history, { id: seq, at: now, request: req, ...entry }].slice(-HISTORY_LIMIT),
  });

  if (!parsed) {
    const result: NetworkError = { kind: "error", code: "INVALID_URL", timeMs: 0 };
    return { state: record(state, { path: "", query: {}, status: 0, timeMs: 0 }), result };
  }
  if (parsed.host !== API_HOST) {
    const result: NetworkError = { kind: "error", code: "ENOTFOUND", host: parsed.host, timeMs: 30 };
    return { state: record(state, { path: "", query: {}, status: 0, timeMs: 30 }), result };
  }

  const query: Record<string, string> = {};
  for (const [k, v] of parsed.query) query[k] = v;

  const productPath = /^\/v1\/products\/(\d+)\/?$/.exec(parsed.path);
  const before = productPath ? state.products.find((p) => p.id === Number(productPath[1])) : undefined;
  const { state: next, outcome } = route(state, req, parsed.path, query, now);
  const body = outcome.body === undefined ? "" : JSON.stringify(outcome.body);
  const timeMs = latencyFor(req.method, parsed.path, seq);

  /* i18n-ignore-start: header phản hồi HTTP chuẩn, giữ nguyên như máy chủ thật */
  const headers: [string, string][] = [];
  if (body) headers.push(["Content-Type", "application/json; charset=utf-8"]);
  headers.push(["Content-Length", String(byteLength(body))]);
  headers.push(["Date", new Date(now).toUTCString()]);
  headers.push(["Server", "cua-hang-api"]);
  headers.push(["X-Request-Id", `req_${(seq * 2654435761 % 4294967296).toString(16).padStart(8, "0")}`]);
  headers.push(...(outcome.headers ?? []));
  /* i18n-ignore-end */

  const headerBytes = headers.reduce((n, [k, v]) => n + byteLength(`${k}: ${v}\r\n`), 0);
  const result: HttpResponse = {
    kind: "http",
    status: outcome.status,
    statusText: REASON_PHRASES[outcome.status] ?? "",
    headers,
    body,
    timeMs,
    sizeBytes: headerBytes + byteLength(body),
  };
  return {
    state: record(next, {
      path: parsed.path.replace(/\/+$/, "") || "/",
      query,
      status: outcome.status,
      timeMs,
      response: { headers, body: body.slice(0, RESPONSE_KEEP) },
      ...(before ? { before: { ...before } } : {}),
    }),
    result,
  };
}

// ---------------------------------------------------------------- JSON view

export type JsonTokenType = "key" | "string" | "number" | "literal" | "punct" | "plain";
export interface JsonToken {
  type: JsonTokenType;
  text: string;
}

/** In đẹp một chuỗi JSON; trả nguyên văn nếu không phải JSON. */
export function prettyJson(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text;
  }
}

/** Kiểm tra JSON: null nếu hợp lệ (hoặc rỗng), ngược lại là thông điệp lỗi của trình phân tích. */
export function jsonError(text: string): string | null {
  if (text.trim() === "") return null;
  try {
    JSON.parse(text);
    return null;
  } catch (e) {
    return e instanceof Error ? e.message : String(e);
  }
}

/** Tách JSON đã in đẹp thành các mảnh để tô màu cú pháp. */
export function tokenizeJson(text: string): JsonToken[] {
  const out: JsonToken[] = [];
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}[\],:])/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push({ type: "plain", text: text.slice(last, m.index) });
    if (m[1] !== undefined) {
      if (m[2] !== undefined) {
        out.push({ type: "key", text: m[1] });
        out.push({ type: "punct", text: m[2] });
      } else out.push({ type: "string", text: m[1] });
    } else if (m[3] !== undefined) out.push({ type: "literal", text: m[3] });
    else if (m[4] !== undefined) out.push({ type: "number", text: m[4] });
    else out.push({ type: "punct", text: m[5] });
    last = re.lastIndex;
  }
  if (last < text.length) out.push({ type: "plain", text: text.slice(last) });
  return out;
}

export function statusClass(status: number): "success" | "client" | "server" | "none" {
  if (status >= 200 && status < 300) return "success";
  if (status >= 400 && status < 500) return "client";
  if (status >= 500) return "server";
  return "none";
}
