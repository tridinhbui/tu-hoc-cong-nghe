import type { ApiState, HistoryEntry } from "@/lib/tools/api/engine";

/** Nhiệm vụ của công cụ API, xếp từ dễ tới khó - đúng thứ tự một người mới
 *  gặp trong tuần đầu làm việc với một API: đọc, lọc, đọc lỗi, ghi, gửi sai,
 *  đăng nhập, sửa, xoá. Tên và gợi ý nằm trong từ điển (toolApi.missions.<id>). */
export interface ApiMission {
  id: ApiMissionId;
  check: (state: ApiState) => boolean;
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

export const API_MISSIONS: ApiMission[] = [
  {
    id: "firstGet",
    check: (s) => has(s, (h) => h.request.method === "GET" && h.status >= 200 && h.status < 300),
  },
  {
    id: "filterCategory",
    check: (s) =>
      has(
        s,
        (h) =>
          h.request.method === "GET" && h.path === "/v1/products" && !!h.query.category && h.status === 200,
      ),
  },
  {
    id: "readNotFound",
    check: (s) => has(s, (h) => h.request.method === "GET" && PRODUCT_ID.test(h.path) && h.status === 404),
  },
  {
    id: "createProduct",
    check: (s) => has(s, (h) => h.request.method === "POST" && h.path === "/v1/products" && h.status === 201),
  },
  {
    id: "badRequest",
    check: (s) => has(s, (h) => h.request.method === "POST" && h.path === "/v1/products" && h.status === 400),
  },
  {
    id: "loginThenMe",
    check: (s) => {
      const login = s.history.findIndex(
        (h) => h.request.method === "POST" && h.path === "/v1/login" && h.status === 200,
      );
      if (login === -1) return false;
      return s.history
        .slice(login + 1)
        .some((h) => h.request.method === "GET" && h.path === "/v1/me" && h.status === 200);
    },
  },
  {
    id: "patchPrice",
    check: (s) =>
      has(s, (h) => h.request.method === "PATCH" && PRODUCT_ID.test(h.path) && h.status === 200 && bodyHasPrice(h)),
  },
  {
    id: "deleteProduct",
    check: (s) => has(s, (h) => h.request.method === "DELETE" && PRODUCT_ID.test(h.path) && h.status === 204),
  },
];
