import type { ApiState, HistoryEntry } from "@/lib/tools/api/engine";

/** Nhiệm vụ của công cụ API, xếp từ dễ tới khó - đúng thứ tự một người mới
 *  gặp trong tuần đầu làm việc với một API: đọc, lọc, đọc lỗi, ghi, gửi sai,
 *  đăng nhập, sửa, xoá; rồi tới tuần thứ hai: sắp xếp, khoá API, kiểu nội dung,
 *  đổi phiên bản, đọc lỗi có cấu trúc, 401 khác 403, phân trang, PUT khác
 *  PATCH, giới hạn tần suất, chống tạo trùng. Tên và gợi ý nằm trong từ điển
 *  (toolApi.missions.<id>). */
export interface ApiMission {
  id: ApiMissionId;
  check: (state: ApiState) => boolean;
  /** Tiêu chí đạt, từ yếu tới mạnh; tiêu chí cuối chính là `check`. */
  criteria: { id: string; check: (state: ApiState) => boolean }[];
  /** Lần gọi trong Lịch sử đã làm nhiệm vụ đạt - "kết quả" để hiện lại. */
  evidence: (state: ApiState) => HistoryEntry | undefined;
}

export type ApiMissionId =
  | "firstGet"
  | "filterCategory"
  | "readNotFound"
  | "createProduct"
  | "badRequest"
  | "loginThenMe"
  | "patchPrice"
  | "deleteProduct"
  | "sortExpensive"
  | "apiKeyHeader"
  | "contentType415"
  | "migrateV2"
  | "fixFromErrorDetails"
  | "authVsPermission"
  | "paginateAll"
  | "putReplace"
  | "retryAfter429"
  | "idempotentOrder";

const PRODUCT_ID = /^\/v1\/products\/[^/]+$/;

const has = (s: ApiState, pred: (h: HistoryEntry) => boolean) => s.history.some(pred);

function bodyHasPrice(h: HistoryEntry): boolean {
  try {
    const parsed: unknown = JSON.parse(h.request.body);
    return typeof parsed === "object" && parsed !== null && "price" in parsed;
  } catch {
    return false;
  }
}

const last = (s: ApiState, pred: (h: HistoryEntry) => boolean) => [...s.history].reverse().find(pred);

/** Nhiệm vụ "gửi đúng yêu cầu, nhận đúng mã": hai tiêu chí, yêu cầu rồi mã trạng thái. */
function callMission(
  id: ApiMissionId,
  request: (h: HistoryEntry) => boolean,
  status: (code: number) => boolean,
): ApiMission {
  const hit = (h: HistoryEntry) => request(h) && status(h.status);
  const check = (s: ApiState) => has(s, hit);
  return {
    id,
    check,
    criteria: [
      { id: "request", check: (s) => has(s, request) },
      { id: "status", check },
    ],
    evidence: (s) => last(s, hit),
  };
}

const isLogin = (h: HistoryEntry) => h.request.method === "POST" && h.path === "/v1/login" && h.status === 200;
const isMe = (h: HistoryEntry) => h.request.method === "GET" && h.path === "/v1/me" && h.status === 200;

function loginThenMe(s: ApiState): HistoryEntry | undefined {
  const login = s.history.findIndex(isLogin);
  if (login === -1) return undefined;
  return [...s.history.slice(login + 1)].reverse().find(isMe);
}
const loggedInMe = (s: ApiState) => !!loginThenMe(s);

export const API_MISSIONS: ApiMission[] = [
  callMission("firstGet", (h) => h.request.method === "GET", (code) => code >= 200 && code < 300),
  callMission(
    "filterCategory",
    (h) => h.request.method === "GET" && h.path === "/v1/products" && !!h.query.category,
    (code) => code === 200,
  ),
  callMission("readNotFound", (h) => h.request.method === "GET" && PRODUCT_ID.test(h.path), (code) => code === 404),
  callMission("createProduct", (h) => h.request.method === "POST" && h.path === "/v1/products", (code) => code === 201),
  callMission("badRequest", (h) => h.request.method === "POST" && h.path === "/v1/products", (code) => code === 400),
  {
    id: "loginThenMe",
    check: loggedInMe,
    criteria: [
      { id: "login", check: (s) => has(s, isLogin) },
      { id: "me", check: loggedInMe },
    ],
    evidence: loginThenMe,
  },
  callMission(
    "patchPrice",
    (h) => h.request.method === "PATCH" && PRODUCT_ID.test(h.path) && bodyHasPrice(h),
    (code) => code === 200,
  ),
  callMission("deleteProduct", (h) => h.request.method === "DELETE" && PRODUCT_ID.test(h.path), (code) => code === 204),
];

// ---------------------------------------------------------------- nhiệm vụ mở rộng
// Các nhiệm vụ dưới đây chấm cả PHẢN HỒI mà máy chủ thật sự trả về
// (HistoryEntry.response), không chỉ yêu cầu đã gửi - nên không "qua" được bằng
// cách gõ đúng chữ mà máy chủ không chấp nhận.

interface ResBody {
  [key: string]: unknown;
}

function resJson(h: HistoryEntry): ResBody | undefined {
  if (!h.response) return undefined;
  try {
    const v: unknown = JSON.parse(h.response.body);
    return typeof v === "object" && v !== null && !Array.isArray(v) ? (v as ResBody) : undefined;
  } catch {
    return undefined;
  }
}

function resHeader(h: HistoryEntry, name: string): string | undefined {
  const want = name.toLowerCase();
  return h.response?.headers.find(([k]) => k.toLowerCase() === want)?.[1];
}

function reqHeader(h: HistoryEntry, name: string): string | undefined {
  const want = name.toLowerCase();
  for (const [k, v] of Object.entries(h.request.headers)) if (k.toLowerCase() === want) return v;
  return undefined;
}

const isProductList = (h: HistoryEntry) => h.request.method === "GET" && h.path === "/v1/products";
const dataArray = (b: ResBody | undefined): Record<string, unknown>[] =>
  b && Array.isArray(b.data) ? (b.data as Record<string, unknown>[]) : [];

/** Tìm lần gọi đầu tiên thoả `first`, rồi lần gọi đầu tiên SAU nó thoả `then`. */
function sequence(
  s: ApiState,
  first: (h: HistoryEntry) => boolean,
  then: (h: HistoryEntry) => boolean,
): HistoryEntry | undefined {
  const i = s.history.findIndex(first);
  if (i === -1) return undefined;
  return s.history.slice(i + 1).find(then);
}

// -- sortExpensive: 3 sản phẩm đắt nhất, sắp xếp giảm dần theo giá
const sortsPriceDesc = (h: HistoryEntry) =>
  (h.query.sort === "-price" || (h.query.sort === "price" && h.query.order === "desc")) && !h.query.category;
const topThree = (h: HistoryEntry) => {
  if (!isProductList(h) || h.status !== 200 || !sortsPriceDesc(h)) return false;
  const prices = dataArray(resJson(h)).map((p) => Number(p.price));
  return prices.length === 3 && prices.every((p, i) => i === 0 || prices[i - 1] >= p);
};

// -- apiKeyHeader: đối tác lấy tồn kho bằng khoá API đặt trong header
const partnerCall = (h: HistoryEntry) => h.request.method === "GET" && h.path === "/v1/partner/inventory";
const partnerWithHeader = (h: HistoryEntry) => partnerCall(h) && !!reqHeader(h, "X-API-Key")?.trim();

// -- contentType415: bị từ chối vì sai kiểu nội dung, rồi gửi lại đúng
const postProduct = (h: HistoryEntry) => h.request.method === "POST" && h.path === "/v1/products";
const wrongType = (h: HistoryEntry) => postProduct(h) && h.status === 415;
const created = (h: HistoryEntry) => postProduct(h) && h.status === 201;

// -- migrateV2: thấy cảnh báo ngừng hoạt động của v1, rồi gọi được v2
const v1WithSunset = (h: HistoryEntry) =>
  h.request.method === "GET" && /^\/v1\/products(\/\d+)?$/.test(h.path) && h.status === 200 && !!resHeader(h, "Sunset");
const v2Read = (h: HistoryEntry) =>
  h.request.method === "GET" && /^\/v2\/products(\/\d+)?$/.test(h.path) && h.status === 200;

// -- fixFromErrorDetails: lỗi 400 chỉ ra từ hai trường sai trở lên, rồi sửa hết
const multiFieldError = (h: HistoryEntry) => {
  if (!postProduct(h) || h.status !== 400) return false;
  const b = resJson(h);
  return b?.error === "validation_failed" && Array.isArray(b.details) && b.details.length >= 2;
};

// -- authVsPermission: 401 khi chưa đăng nhập, rồi 403 khi đã đăng nhập mà thiếu quyền
const adminStats = (h: HistoryEntry) => h.request.method === "GET" && h.path === "/v1/admin/stats";
function forbiddenAfterLogin(s: ApiState): HistoryEntry | undefined {
  const i401 = s.history.findIndex((h) => adminStats(h) && h.status === 401);
  if (i401 === -1) return undefined;
  const iLogin = s.history.findIndex((h, i) => i > i401 && isLogin(h));
  if (iLogin === -1) return undefined;
  return s.history.slice(iLogin + 1).find((h) => adminStats(h) && h.status === 403);
}
const loggedInAfter401 = (s: ApiState) => {
  const i401 = s.history.findIndex((h) => adminStats(h) && h.status === 401);
  return i401 !== -1 && s.history.some((h, i) => i > i401 && isLogin(h));
};

// -- paginateAll: đọc hết danh sách bằng các trang nhỏ
function pagedIds(s: ApiState): Set<number> {
  const ids = new Set<number>();
  for (const h of s.history) {
    if (!isProductList(h) || h.status !== 200 || h.query.category || h.query.in_stock) continue;
    const b = resJson(h);
    const rows = dataArray(b);
    if (!b || typeof b.total !== "number" || rows.length >= b.total) continue; // một trang chứa hết = không phải phân trang
    for (const p of rows) if (typeof p.id === "number") ids.add(p.id);
  }
  return ids;
}
const pagedFirstPage = (s: ApiState) =>
  s.history.some((h) => {
    const b = isProductList(h) && h.status === 200 ? resJson(h) : undefined;
    return !!b && b.has_more === true && typeof b.next_cursor === "string";
  });
const pagedFollowUp = (s: ApiState) =>
  s.history.some((h) => isProductList(h) && h.status === 200 && (h.query.cursor !== undefined || Number(h.query.offset) > 0));
const readEverything = (s: ApiState) => {
  const seen = pagedIds(s);
  return s.products.length > 0 && s.products.every((p) => seen.has(p.id));
};

// -- putReplace: PUT thay cả bản ghi - đổi tên/giá mà không làm mất tồn kho
const putKeepingStock = (h: HistoryEntry) => {
  if (h.request.method !== "PUT" || !PRODUCT_ID.test(h.path) || h.status !== 200 || !h.before) return false;
  const b = resJson(h);
  if (!b) return false;
  return h.before.stock > 0 && b.stock === h.before.stock && (b.name !== h.before.name || b.price !== h.before.price);
};
const putAny = (h: HistoryEntry) => h.request.method === "PUT" && PRODUCT_ID.test(h.path);

// -- retryAfter429: bị chặn vì gọi quá nhanh, chờ đủ Retry-After rồi gọi lại thành công
const exportsCall = (h: HistoryEntry) => h.request.method === "GET" && h.path === "/v1/exports";
const recoveredAfter429 = (s: ApiState) => sequence(s, (h) => exportsCall(h) && h.status === 429, (h) => exportsCall(h) && h.status === 200);

// -- idempotentOrder: gửi lại cùng một khoá thì không tạo thêm đơn
const orderPost = (h: HistoryEntry) => h.request.method === "POST" && h.path === "/v1/orders";
const keyOf = (h: HistoryEntry) => reqHeader(h, "Idempotency-Key");
function idempotentKey(s: ApiState): string | undefined {
  const orders = s.orders ?? [];
  const keys = new Set(s.history.filter((h) => orderPost(h) && h.status === 201 && keyOf(h)).map((h) => keyOf(h)!));
  return [...keys].find(
    (k) =>
      orders.filter((o) => o.idempotency_key === k).length === 1 &&
      s.history.some((h) => orderPost(h) && keyOf(h) === k && h.status === 200 && resHeader(h, "Idempotent-Replayed") === "true"),
  );
}
const replayEvidence = (s: ApiState) => {
  const k = idempotentKey(s);
  return k === undefined ? undefined : last(s, (h) => orderPost(h) && keyOf(h) === k && h.status === 200);
};

API_MISSIONS.push(
  {
    id: "sortExpensive",
    check: (s) => has(s, topThree),
    criteria: [
      { id: "request", check: (s) => has(s, (h) => isProductList(h) && sortsPriceDesc(h)) },
      { id: "status", check: (s) => has(s, (h) => isProductList(h) && sortsPriceDesc(h) && h.status === 200) },
      { id: "top3", check: (s) => has(s, topThree) },
    ],
    evidence: (s) => last(s, topThree),
  },
  {
    id: "apiKeyHeader",
    check: (s) => has(s, (h) => partnerWithHeader(h) && h.status === 200),
    criteria: [
      { id: "header", check: (s) => has(s, partnerWithHeader) },
      { id: "ok", check: (s) => has(s, (h) => partnerWithHeader(h) && h.status === 200) },
    ],
    evidence: (s) => last(s, (h) => partnerWithHeader(h) && h.status === 200),
  },
  {
    id: "contentType415",
    check: (s) => !!sequence(s, wrongType, created),
    criteria: [
      { id: "rejected", check: (s) => has(s, wrongType) },
      { id: "fixed", check: (s) => !!sequence(s, wrongType, created) },
    ],
    evidence: (s) => sequence(s, wrongType, created),
  },
  {
    id: "migrateV2",
    check: (s) => !!sequence(s, v1WithSunset, v2Read),
    criteria: [
      { id: "v1", check: (s) => has(s, v1WithSunset) },
      { id: "v2", check: (s) => !!sequence(s, v1WithSunset, v2Read) },
    ],
    evidence: (s) => sequence(s, v1WithSunset, v2Read),
  },
  {
    id: "fixFromErrorDetails",
    check: (s) => !!sequence(s, multiFieldError, created),
    criteria: [
      { id: "bad", check: (s) => has(s, postProduct) },
      { id: "details", check: (s) => has(s, multiFieldError) },
      { id: "fixed", check: (s) => !!sequence(s, multiFieldError, created) },
    ],
    evidence: (s) => sequence(s, multiFieldError, created),
  },
  {
    id: "authVsPermission",
    check: (s) => !!forbiddenAfterLogin(s),
    criteria: [
      { id: "anon", check: (s) => has(s, (h) => adminStats(h) && h.status === 401) },
      { id: "login", check: loggedInAfter401 },
      { id: "forbidden", check: (s) => !!forbiddenAfterLogin(s) },
    ],
    evidence: forbiddenAfterLogin,
  },
  {
    id: "paginateAll",
    check: readEverything,
    criteria: [
      { id: "firstPage", check: pagedFirstPage },
      { id: "nextPage", check: (s) => pagedFirstPage(s) && pagedFollowUp(s) },
      { id: "all", check: readEverything },
    ],
    evidence: (s) => last(s, (h) => isProductList(h) && h.status === 200 && (h.query.cursor !== undefined || Number(h.query.offset) > 0)),
  },
  {
    id: "putReplace",
    check: (s) => has(s, putKeepingStock),
    criteria: [
      { id: "request", check: (s) => has(s, putAny) },
      { id: "status", check: (s) => has(s, (h) => putAny(h) && h.status === 200) },
      { id: "stock", check: (s) => has(s, putKeepingStock) },
    ],
    evidence: (s) => last(s, putKeepingStock),
  },
  {
    id: "retryAfter429",
    check: (s) => !!recoveredAfter429(s),
    criteria: [
      { id: "ok", check: (s) => has(s, (h) => exportsCall(h) && h.status === 200) },
      { id: "limited", check: (s) => has(s, (h) => exportsCall(h) && h.status === 429) },
      { id: "recovered", check: (s) => !!recoveredAfter429(s) },
    ],
    evidence: recoveredAfter429,
  },
  {
    id: "idempotentOrder",
    check: (s) => idempotentKey(s) !== undefined,
    criteria: [
      { id: "key", check: (s) => has(s, (h) => orderPost(h) && h.status === 201 && !!keyOf(h)) },
      { id: "replay", check: (s) => has(s, (h) => orderPost(h) && h.status === 200 && resHeader(h, "Idempotent-Replayed") === "true") },
      { id: "single", check: (s) => idempotentKey(s) !== undefined },
    ],
    evidence: replayEvidence,
  },
);

// Hợp đồng chung của mọi trình mô phỏng: tiêu chí cuối CHÍNH LÀ `check` (cùng một
// hàm, không chỉ cùng kết quả), nên "đủ mọi tiêu chí" và "qua nhiệm vụ" không lệch
// nhau. Các nhiệm vụ viết bằng đối tượng literal ở trên khai hai bản chép; gán lại
// ở đây thay vì để mỗi nhiệm vụ tự giữ cho khớp.
for (const mission of API_MISSIONS) mission.check = mission.criteria[mission.criteria.length - 1].check;
