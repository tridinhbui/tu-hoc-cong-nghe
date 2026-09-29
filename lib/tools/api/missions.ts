import type { ApiState, HistoryEntry } from "@/lib/tools/api/engine";

/** Nhiệm vụ của công cụ API, xếp từ dễ tới khó - đúng thứ tự một người mới
 *  gặp trong tuần đầu làm việc với một API: đọc, lọc, đọc lỗi, ghi, gửi sai,
 *  đăng nhập, sửa, xoá. Tên và gợi ý nằm trong từ điển (toolApi.missions.<id>). */
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
  | "deleteProduct";

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
