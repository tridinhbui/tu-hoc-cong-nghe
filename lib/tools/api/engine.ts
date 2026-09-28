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
}

export interface ApiState {
  products: Product[];
  nextId: number;
  seq: number;
  /** Mốc thời gian (ms) của các lần gọi /reports còn trong cửa sổ một phút. */
  reportCalls: number[];
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
    history: [],
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

function route(
  state: ApiState,
  req: SentRequest,
  path: string,
  query: Record<string, string>,
  now: number,
): { state: ApiState; outcome: RouteOutcome } {
  const { method } = req;
  const same = (outcome: RouteOutcome) => ({ state, outcome });

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
      let items = state.products;
      if (query.category !== undefined && query.category !== "") {
        items = items.filter((p) => p.category === query.category);
      }
      let limit = 20;
      if (query.limit !== undefined) {
        const n = Number(query.limit);
        if (!/^\d+$/.test(query.limit) || n < 1 || n > 100) {
          return same(
            json(
              400,
              errorBody("invalid_query", "limit must be an integer between 1 and 100", {
                details: [{ field: "limit", message: `got "${query.limit}"` }],
              }),
            ),
          );
        }
        limit = n;
      }
      return same(
        json(200, {
          data: items.slice(0, limit),
          total: items.length,
          limit,
          ...(query.category ? { category: query.category } : {}),
        }),
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

    if (method === "GET") return same(existing ? json(200, existing) : notFound());
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
    state: record(next, { path: parsed.path.replace(/\/+$/, "") || "/", query, status: outcome.status, timeMs }),
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
