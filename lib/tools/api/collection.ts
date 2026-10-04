import { BASE_URL, type HttpMethod } from "@/lib/tools/api/engine";

/** Bộ sưu tập yêu cầu mẫu ở cột trái - như một Postman collection có sẵn.
 *  Tên hiển thị lấy từ từ điển (toolApi.collection.<id>). */
export interface RequestDraft {
  method: HttpMethod;
  url: string;
  headers: { key: string; value: string; enabled: boolean }[];
  bodyMode: "none" | "json" | "text";
  body: string;
  authMode: "none" | "bearer";
  token: string;
}

export type CollectionId =
  | "listProducts"
  | "filterProducts"
  | "getProduct"
  | "createProduct"
  | "login"
  | "me"
  | "patchPrice"
  | "deleteProduct"
  | "reports"
  | "partnerInventory"
  | "exports"
  | "createOrder"
  | "adminStats"
  | "v2Products";

export function emptyDraft(): RequestDraft {
  return {
    method: "GET",
    url: `${BASE_URL}/products`,
    headers: [{ key: "Accept", value: "application/json", enabled: true }],
    bodyMode: "none",
    body: "",
    authMode: "none",
    token: "",
  };
}

function draft(partial: Partial<RequestDraft>): RequestDraft {
  return { ...emptyDraft(), ...partial };
}

/* i18n-ignore-start: thân yêu cầu JSON mẫu gửi tới API giả lập - dữ liệu, không phải chữ giao diện */
export const COLLECTION: { id: CollectionId; request: RequestDraft }[] = [
  { id: "listProducts", request: draft({ url: `${BASE_URL}/products` }) },
  { id: "filterProducts", request: draft({ url: `${BASE_URL}/products?category=accessories&limit=5` }) },
  { id: "getProduct", request: draft({ url: `${BASE_URL}/products/1` }) },
  {
    id: "createProduct",
    request: draft({
      method: "POST",
      url: `${BASE_URL}/products`,
      bodyMode: "json",
      body: JSON.stringify({ name: "Webcam HD 1080p", price: 890000, category: "accessories", stock: 15 }, null, 2),
    }),
  },
  {
    id: "login",
    request: draft({
      method: "POST",
      url: `${BASE_URL}/login`,
      bodyMode: "json",
      body: JSON.stringify({ email: "demo@cua-hang.dev", password: "demo123" }, null, 2),
    }),
  },
  { id: "me", request: draft({ url: `${BASE_URL}/me`, authMode: "bearer" }) },
  {
    id: "patchPrice",
    request: draft({
      method: "PATCH",
      url: `${BASE_URL}/products/2`,
      bodyMode: "json",
      body: JSON.stringify({ price: 990000 }, null, 2),
    }),
  },
  { id: "deleteProduct", request: draft({ method: "DELETE", url: `${BASE_URL}/products/6` }) },
  { id: "reports", request: draft({ url: `${BASE_URL}/reports` }) },
  { id: "partnerInventory", request: draft({ url: `${BASE_URL}/partner/inventory` }) },
  { id: "exports", request: draft({ url: `${BASE_URL}/exports` }) },
  {
    id: "createOrder",
    request: draft({
      method: "POST",
      url: `${BASE_URL}/orders`,
      bodyMode: "json",
      body: JSON.stringify({ product_id: 1, quantity: 1 }, null, 2),
    }),
  },
  { id: "adminStats", request: draft({ url: `${BASE_URL}/admin/stats` }) },
  { id: "v2Products", request: draft({ url: `https://api.cua-hang.dev/v2/products?limit=3` }) },
];
/* i18n-ignore-end */

/** Header tự sinh (như Postman): Content-Type theo kiểu body, Authorization theo tab Auth. */
export function autoHeaders(d: RequestDraft): { key: string; value: string }[] {
  const out: { key: string; value: string }[] = [{ key: "User-Agent", value: "ApiClient/1.0 (sim)" }];
  if (d.method !== "GET" && d.bodyMode === "json") out.push({ key: "Content-Type", value: "application/json" });
  if (d.method !== "GET" && d.bodyMode === "text") out.push({ key: "Content-Type", value: "text/plain" });
  if (d.authMode === "bearer") out.push({ key: "Authorization", value: `Bearer ${d.token}` });
  return out;
}

/** Gộp header tự sinh với header người dùng tự thêm (header tự thêm thắng). */
export function buildHeaders(d: RequestDraft): Record<string, string> {
  const out: Record<string, string> = {};
  const set = (k: string, v: string) => {
    for (const existing of Object.keys(out)) if (existing.toLowerCase() === k.toLowerCase()) delete out[existing];
    out[k] = v;
  };
  for (const h of autoHeaders(d)) set(h.key, h.value);
  for (const h of d.headers) if (h.enabled && h.key.trim()) set(h.key.trim(), h.value);
  return out;
}

export function bodyFor(d: RequestDraft): string {
  return d.method === "GET" || d.bodyMode === "none" ? "" : d.body;
}
