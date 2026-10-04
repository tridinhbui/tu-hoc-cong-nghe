import { describe, it, expect } from "vitest";
import {
  BASE_URL,
  DEMO_TOKEN,
  PARTNER_API_KEY,
  createApiState,
  normalizeApiState,
  sendRequest,
  type ApiState,
  type HttpMethod,
  type HttpResponse,
} from "@/lib/tools/api/engine";
import { API_MISSIONS, type ApiMissionId } from "@/lib/tools/api/missions";
import { COLLECTION } from "@/lib/tools/api/collection";
import { toolApiEn, toolApiVi } from "@/lib/i18n/dictionaries/sections/tool-api";

const T0 = 1_800_000_000_000;

const NEW_IDS: ApiMissionId[] = [
  "sortExpensive",
  "apiKeyHeader",
  "contentType415",
  "migrateV2",
  "fixFromErrorDetails",
  "authVsPermission",
  "paginateAll",
  "putReplace",
  "retryAfter429",
  "idempotentOrder",
];

type Opts = { body?: unknown; headers?: Record<string, string>; now?: number; raw?: string };

function call(state: ApiState, method: HttpMethod, path: string, opts: Opts = {}) {
  const body = opts.raw ?? (opts.body === undefined ? "" : JSON.stringify(opts.body));
  const headers: Record<string, string> = { ...(body ? { "Content-Type": "application/json" } : {}), ...opts.headers };
  const { state: next, result } = sendRequest(
    state,
    { method, url: path.startsWith("http") ? path : `${BASE_URL}${path}`, headers, body },
    opts.now ?? T0,
  );
  return { state: next, res: result as HttpResponse };
}

/** Chạy một chuỗi thao tác và trả trạng thái cuối cùng. */
function run(steps: [HttpMethod, string, Opts?][], from: ApiState = createApiState()): ApiState {
  let s = from;
  for (const [m, p, o] of steps) s = call(s, m, p, o).state;
  return s;
}

const mission = (id: ApiMissionId) => API_MISSIONS.find((m) => m.id === id)!;
const passes = (id: ApiMissionId, s: ApiState) => mission(id).check(s);
const bearer = { Authorization: `Bearer ${DEMO_TOKEN}` };
const LOGIN: [HttpMethod, string, Opts] = ["POST", "/login", { body: { email: "a@b.vn", password: "demo123" } }];
const GOOD_PRODUCT = { name: "Webcam HD", price: 890000, category: "accessories" };

describe("api missions (mở rộng): khung chung", () => {
  it("mỗi nhiệm vụ mới có chữ vi + en và tiêu chí khớp từ điển", () => {
    for (const id of NEW_IDS) {
      const m = mission(id);
      expect(m, id).toBeTruthy();
      for (const dict of [toolApiVi, toolApiEn]) {
        const copy = dict.toolApi.missions[id];
        expect(copy.title && copy.hint && copy.brief && copy.from).toBeTruthy();
        const labels = copy.criteria as Record<string, string>;
        for (const cr of m.criteria) expect(labels[cr.id], `${id}.${cr.id}`).toBeTruthy();
      }
    }
  });

  it("tiêu chí cuối của mỗi nhiệm vụ chính là check, và mọi nhiệm vụ đỏ ở trạng thái đầu", () => {
    const fresh = createApiState();
    for (const m of API_MISSIONS) {
      expect(m.check(fresh), m.id).toBe(false);
      expect(m.criteria.every((c) => !c.check(fresh)), m.id).toBe(true);
      // Nhiệm vụ đạt thì tiêu chí cuối phải đạt cùng lúc (cùng hàm check).
      expect(m.criteria[m.criteria.length - 1].id).toBeTruthy();
    }
  });

  it("trạng thái cũ lưu trong localStorage (thiếu trường mới) vẫn chạy được", () => {
    const old = createApiState() as Partial<ApiState>;
    delete old.orders;
    delete old.exportCalls;
    delete old.nextOrderId;
    const s = normalizeApiState(old as ApiState);
    expect(s.orders).toEqual([]);
    expect(call(s, "POST", "/orders", { body: { product_id: 1, quantity: 1 } }).res.status).toBe(201);
    for (const m of API_MISSIONS) expect(() => m.check(old as ApiState)).not.toThrow();
  });

  it("bộ sưu tập mẫu mới có tên vi + en", () => {
    for (const item of COLLECTION) {
      expect(toolApiVi.toolApi.collection[item.id]).toBeTruthy();
      expect(toolApiEn.toolApi.collection[item.id]).toBeTruthy();
    }
  });

  it("nhiệm vụ cũ không đổi hành vi: danh sách vẫn có data/total/limit", () => {
    const body = JSON.parse(call(createApiState(), "GET", "/products").res.body);
    expect(body.total).toBe(6);
    expect(body.data).toHaveLength(6);
    expect(body.limit).toBe(20);
    expect(body.has_more).toBe(false);
    expect(body.next_cursor).toBeNull();
  });
});

describe("sortExpensive", () => {
  it("xanh khi sort=-price&limit=3 (hoặc sort=price&order=desc)", () => {
    expect(passes("sortExpensive", run([["GET", "/products?sort=-price&limit=3"]]))).toBe(true);
    expect(passes("sortExpensive", run([["GET", "/products?sort=price&order=desc&limit=3"]]))).toBe(true);
  });
  it("đỏ khi sắp tăng dần, không sort, sai limit hoặc lọc danh mục", () => {
    expect(passes("sortExpensive", run([["GET", "/products?sort=price&limit=3"]]))).toBe(false);
    // Thứ tự mặc định (theo id) tình cờ cũng giảm dần giá ở ba dòng đầu: vẫn phải đỏ.
    expect(passes("sortExpensive", run([["GET", "/products?limit=3"]]))).toBe(false);
    expect(passes("sortExpensive", run([["GET", "/products?sort=id&limit=3"]]))).toBe(false);
    expect(passes("sortExpensive", run([["GET", "/products?sort=-price&limit=2"]]))).toBe(false);
    expect(passes("sortExpensive", run([["GET", "/products?sort=-price"]]))).toBe(false);
    expect(passes("sortExpensive", run([["GET", "/products?sort=-price&limit=3&category=accessories"]]))).toBe(false);
    expect(passes("sortExpensive", run([["GET", "/products?sort=-colour&limit=3"]]))).toBe(false);
  });
  it("sort trả đúng thứ tự và báo lỗi khi tên trường sai", () => {
    const { res } = call(createApiState(), "GET", "/products?sort=-price&limit=3");
    expect(JSON.parse(res.body).data.map((p: { id: number }) => p.id)).toEqual([1, 4, 5]);
    const bad = call(createApiState(), "GET", "/products?sort=colour");
    expect(bad.res.status).toBe(400);
    expect(JSON.parse(bad.res.body).error).toBe("invalid_query");
  });
});

describe("apiKeyHeader", () => {
  it("xanh khi gửi đúng khoá trong header X-API-Key (không phân biệt hoa thường tên header)", () => {
    expect(passes("apiKeyHeader", run([["GET", "/partner/inventory", { headers: { "X-API-Key": PARTNER_API_KEY } }]]))).toBe(true);
    expect(passes("apiKeyHeader", run([["GET", "/partner/inventory", { headers: { "x-api-key": PARTNER_API_KEY } }]]))).toBe(true);
  });
  it("đỏ khi thiếu khoá, sai khoá hoặc đặt khoá vào URL", () => {
    expect(passes("apiKeyHeader", run([["GET", "/partner/inventory"]]))).toBe(false);
    const wrong = run([["GET", "/partner/inventory", { headers: { "X-API-Key": "pk_wrong" } }]]);
    expect(wrong.history[0].status).toBe(401);
    expect(passes("apiKeyHeader", wrong)).toBe(false);
    const inUrl = run([["GET", `/partner/inventory?api_key=${PARTNER_API_KEY}`]]);
    expect(inUrl.history[0].status).toBe(400);
    expect(passes("apiKeyHeader", inUrl)).toBe(false);
    // Có khoá đúng trong header nhưng cũng để lộ trong URL: vẫn bị từ chối.
    const both = run([["GET", `/partner/inventory?api_key=${PARTNER_API_KEY}`, { headers: { "X-API-Key": PARTNER_API_KEY } }]]);
    expect(passes("apiKeyHeader", both)).toBe(false);
  });
});

describe("contentType415", () => {
  const asText: [HttpMethod, string, Opts] = [
    "POST",
    "/products",
    { raw: JSON.stringify(GOOD_PRODUCT), headers: { "Content-Type": "text/plain" } },
  ];
  it("xanh khi 415 rồi gửi lại đúng JSON được 201", () => {
    const s = run([asText, ["POST", "/products", { body: GOOD_PRODUCT }]]);
    expect(s.history[0].status).toBe(415);
    expect(passes("contentType415", s)).toBe(true);
  });
  it("đỏ khi chỉ có 415, hoặc tạo được rồi mới gặp 415 (sai thứ tự)", () => {
    expect(passes("contentType415", run([asText]))).toBe(false);
    expect(passes("contentType415", run([["POST", "/products", { body: GOOD_PRODUCT }], asText]))).toBe(false);
    // Sau 415 vẫn gửi text/plain nên không bao giờ tạo được.
    expect(passes("contentType415", run([asText, asText]))).toBe(false);
  });
});

describe("migrateV2", () => {
  it("xanh khi đọc v1 (có Sunset) rồi gọi v2", () => {
    const s = run([["GET", "/products"], ["GET", "https://api.cua-hang.dev/v2/products"]]);
    expect(passes("migrateV2", s)).toBe(true);
    const sunset = s.history[0].response!.headers.find(([k]) => k === "Sunset");
    expect(sunset).toBeTruthy();
  });
  it("v2 đổi hình dạng dữ liệu và chỉ dùng con trỏ", () => {
    const { res } = call(createApiState(), "GET", "https://api.cua-hang.dev/v2/products?limit=2");
    const body = JSON.parse(res.body);
    expect(body.items[0]).toEqual({ id: 1, name: "Laptop Air 13", price_vnd: 22990000, category: "laptop", in_stock: true });
    expect(body.next_cursor).toBe("c_2");
    const off = call(createApiState(), "GET", "https://api.cua-hang.dev/v2/products?offset=2");
    expect(off.res.status).toBe(400);
    expect(JSON.parse(off.res.body).error).toBe("offset_not_supported");
    expect(call(createApiState(), "POST", "https://api.cua-hang.dev/v2/products", { body: GOOD_PRODUCT }).res.status).toBe(405);
  });
  it("đỏ khi chỉ gọi v2, gọi v2 trước v1, hoặc v1 không có Sunset", () => {
    expect(passes("migrateV2", run([["GET", "https://api.cua-hang.dev/v2/products"]]))).toBe(false);
    expect(passes("migrateV2", run([["GET", "https://api.cua-hang.dev/v2/products"], ["GET", "/products"]]))).toBe(false);
    expect(passes("migrateV2", run([["GET", "/health"], ["GET", "https://api.cua-hang.dev/v2/products"]]))).toBe(false);
    expect(passes("migrateV2", run([["GET", "/products"], ["GET", "https://api.cua-hang.dev/v2/products?offset=1"]]))).toBe(false);
    expect(passes("migrateV2", run([["GET", "/products"], ["GET", "https://api.cua-hang.dev/v2/products/999"]]))).toBe(false);
  });
});

describe("fixFromErrorDetails", () => {
  const twoWrong: [HttpMethod, string, Opts] = ["POST", "/products", { body: { price: "abc", category: "toy" } }];
  it("xanh khi lỗi nhiều trường rồi sửa đúng", () => {
    const s = run([twoWrong, ["POST", "/products", { body: GOOD_PRODUCT }]]);
    const err = JSON.parse(s.history[0].response!.body);
    expect(err.details.map((d: { field: string }) => d.field).sort()).toEqual(["category", "name", "price"]);
    expect(passes("fixFromErrorDetails", s)).toBe(true);
  });
  it("đỏ khi chỉ sai một trường, chưa sửa, hoặc đã tạo được từ trước", () => {
    const oneWrong = run([["POST", "/products", { body: { ...GOOD_PRODUCT, price: "abc" } }], ["POST", "/products", { body: GOOD_PRODUCT }]]);
    expect(passes("fixFromErrorDetails", oneWrong)).toBe(false);
    expect(passes("fixFromErrorDetails", run([twoWrong]))).toBe(false);
    expect(passes("fixFromErrorDetails", run([["POST", "/products", { body: GOOD_PRODUCT }], twoWrong]))).toBe(false);
    // JSON hỏng cũng là 400 nhưng không có details nhiều trường.
    expect(passes("fixFromErrorDetails", run([["POST", "/products", { raw: "{oops" }], ["POST", "/products", { body: GOOD_PRODUCT }]]))).toBe(false);
  });
});

describe("authVsPermission", () => {
  it("xanh theo đúng chuỗi 401, đăng nhập, 403", () => {
    const s = run([["GET", "/admin/stats"], LOGIN, ["GET", "/admin/stats", { headers: bearer }]]);
    expect(s.history.map((h) => h.status)).toEqual([401, 200, 403]);
    expect(passes("authVsPermission", s)).toBe(true);
  });
  it("đỏ khi thiếu một bước hoặc sai thứ tự", () => {
    expect(passes("authVsPermission", run([["GET", "/admin/stats"]]))).toBe(false);
    expect(passes("authVsPermission", run([["GET", "/admin/stats"], LOGIN]))).toBe(false);
    // Không có 401 trước khi đăng nhập.
    expect(passes("authVsPermission", run([LOGIN, ["GET", "/admin/stats", { headers: bearer }]]))).toBe(false);
    // 403 có trước lần đăng nhập thứ hai không thay được: cần 401, rồi đăng nhập, rồi 403.
    expect(passes("authVsPermission", run([["GET", "/admin/stats", { headers: bearer }], ["GET", "/admin/stats"], LOGIN]))).toBe(false);
    // Token sai vẫn là 401, không phải 403.
    expect(
      passes("authVsPermission", run([["GET", "/admin/stats"], LOGIN, ["GET", "/admin/stats", { headers: { Authorization: "Bearer nope" } }]])),
    ).toBe(false);
  });
});

describe("paginateAll", () => {
  it("xanh khi đi hết bằng con trỏ", () => {
    let s = createApiState();
    let cursor: string | null = null;
    let pages = 0;
    do {
      const r = call(s, "GET", `/products?limit=2${cursor ? `&cursor=${cursor}` : ""}`);
      s = r.state;
      cursor = JSON.parse(r.res.body).next_cursor;
      pages++;
    } while (cursor);
    expect(pages).toBe(3);
    expect(passes("paginateAll", s)).toBe(true);
  });
  it("xanh khi đi hết bằng offset", () => {
    const s = run([["GET", "/products?limit=4"], ["GET", "/products?limit=4&offset=4"]]);
    expect(passes("paginateAll", s)).toBe(true);
  });
  it("đỏ khi lấy một lần, mới đọc nửa đường, hoặc con trỏ hỏng", () => {
    expect(passes("paginateAll", run([["GET", "/products?limit=100"]]))).toBe(false);
    expect(passes("paginateAll", run([["GET", "/products?limit=2"]]))).toBe(false);
    expect(passes("paginateAll", run([["GET", "/products?limit=2"], ["GET", "/products?limit=2&cursor=c_2"]]))).toBe(false);
    expect(passes("paginateAll", run([["GET", "/products?limit=2"], ["GET", "/products?limit=2&cursor=bad"]]))).toBe(false);
    // Lọc theo danh mục: ba trang nhỏ của một danh mục không phải là "mọi sản phẩm".
    expect(
      passes("paginateAll", run([["GET", "/products?limit=1&category=accessories"], ["GET", "/products?limit=1&category=accessories&cursor=c_2"]])),
    ).toBe(false);
  });
  it("cursor và offset không dùng chung; con trỏ giữ đúng chỗ khi có sản phẩm mới chèn thêm", () => {
    expect(call(createApiState(), "GET", "/products?offset=1&cursor=c_2").res.status).toBe(400);
    const first = call(createApiState(), "GET", "/products?limit=2");
    const added = call(first.state, "POST", "/products", { body: GOOD_PRODUCT });
    const next = JSON.parse(call(added.state, "GET", "/products?limit=2&cursor=c_2").res.body);
    expect(next.data.map((p: { id: number }) => p.id)).toEqual([3, 4]);
  });
});

describe("putReplace", () => {
  it("xanh khi PUT đủ trường, đổi giá và giữ stock", () => {
    const s = run([["PUT", "/products/3", { body: { name: "Wireless Mouse M3", price: 450000, category: "accessories", stock: 85 } }]]);
    expect(s.history[0].status).toBe(200);
    expect(passes("putReplace", s)).toBe(true);
  });
  it("đỏ khi PUT bỏ stock (stock về 0), đổi stock, hoặc không đổi gì", () => {
    const dropped = run([["PUT", "/products/3", { body: { name: "Wireless Mouse M3", price: 450000, category: "accessories" } }]]);
    expect(dropped.history[0].status).toBe(200);
    expect(dropped.products.find((p) => p.id === 3)!.stock).toBe(0);
    expect(passes("putReplace", dropped)).toBe(false);
    const changedStock = run([["PUT", "/products/3", { body: { name: "Wireless Mouse M3", price: 450000, category: "accessories", stock: 1 } }]]);
    expect(passes("putReplace", changedStock)).toBe(false);
    const noChange = run([["PUT", "/products/3", { body: { name: "Wireless Mouse M3", price: 490000, category: "accessories", stock: 85 } }]]);
    expect(passes("putReplace", noChange)).toBe(false);
  });
  it("đỏ khi dùng PATCH hoặc PUT thiếu trường bắt buộc", () => {
    expect(passes("putReplace", run([["PATCH", "/products/3", { body: { price: 450000 } }]]))).toBe(false);
    const partial = run([["PUT", "/products/3", { body: { price: 450000 } }]]);
    expect(partial.history[0].status).toBe(400);
    expect(passes("putReplace", partial)).toBe(false);
  });
  it("sản phẩm hết hàng sẵn (stock 0) không thể dùng để qua nhiệm vụ", () => {
    const s = run([["PUT", "/products/6", { body: { name: "USB-C Hub 7-in-1", price: 590000, category: "accessories", stock: 0 } }]]);
    expect(s.history[0].status).toBe(200);
    expect(passes("putReplace", s)).toBe(false);
  });
});

describe("retryAfter429", () => {
  it("xanh khi bị 429, chờ đủ Retry-After rồi gọi lại được 200", () => {
    let s = createApiState();
    s = call(s, "GET", "/exports", { now: T0 }).state;
    s = call(s, "GET", "/exports", { now: T0 + 1000 }).state;
    const blocked = call(s, "GET", "/exports", { now: T0 + 2000 });
    expect(blocked.res.status).toBe(429);
    const retryAfter = Number(blocked.res.headers.find(([k]) => k === "Retry-After")![1]);
    expect(retryAfter).toBe(6);
    expect(passes("retryAfter429", blocked.state)).toBe(false);
    const again = call(blocked.state, "GET", "/exports", { now: T0 + 2000 + retryAfter * 1000 });
    expect(again.res.status).toBe(200);
    expect(passes("retryAfter429", again.state)).toBe(true);
  });
  it("đỏ khi gọi dồn tiếp thay vì chờ, hoặc chưa từng bị chặn", () => {
    let s = createApiState();
    for (const dt of [0, 1000, 2000, 3000, 4000]) s = call(s, "GET", "/exports", { now: T0 + dt }).state;
    expect(s.history.map((h) => h.status)).toEqual([200, 200, 429, 429, 429]);
    expect(passes("retryAfter429", s)).toBe(false);
    const calm = run([["GET", "/exports", { now: T0 }], ["GET", "/exports", { now: T0 + 20_000 }]]);
    expect(calm.history.map((h) => h.status)).toEqual([200, 200]);
    expect(passes("retryAfter429", calm)).toBe(false);
  });
  it("429 xảy ra thì 200 có trước nó không tính", () => {
    let s = createApiState();
    s = call(s, "GET", "/exports", { now: T0 }).state;
    s = call(s, "GET", "/exports", { now: T0 + 100 }).state;
    s = call(s, "GET", "/exports", { now: T0 + 200 }).state;
    expect(s.history.map((h) => h.status)).toEqual([200, 200, 429]);
    expect(passes("retryAfter429", s)).toBe(false);
  });
});

describe("idempotentOrder", () => {
  const order = (key?: string, qty = 1): [HttpMethod, string, Opts] => [
    "POST",
    "/orders",
    { body: { product_id: 1, quantity: qty }, headers: key ? { "Idempotency-Key": key } : {} },
  ];
  it("xanh khi gửi hai lần cùng khoá: một đơn, lần sau là bản phát lại", () => {
    const s = run([order("don-an-001"), order("don-an-001")]);
    expect(s.history.map((h) => h.status)).toEqual([201, 200]);
    expect(s.history[1].response!.headers.find(([k]) => k === "Idempotent-Replayed")![1]).toBe("true");
    expect(s.orders).toHaveLength(1);
    expect(s.products.find((p) => p.id === 1)!.stock).toBe(11); // chỉ trừ kho một lần
    expect(passes("idempotentOrder", s)).toBe(true);
  });
  it("đỏ khi không có khoá (tạo trùng), mỗi lần một khoá, hoặc mới gửi một lần", () => {
    const dup = run([order(), order()]);
    expect(dup.orders).toHaveLength(2);
    expect(passes("idempotentOrder", dup)).toBe(false);
    expect(passes("idempotentOrder", run([order("a-1"), order("a-2")]))).toBe(false);
    expect(passes("idempotentOrder", run([order("a-1")]))).toBe(false);
  });
  it("đỏ khi dùng lại khoá cho nội dung khác (422) hoặc đơn vượt tồn kho (409)", () => {
    const reuse = run([order("k-1", 1), order("k-1", 2)]);
    expect(reuse.history.map((h) => h.status)).toEqual([201, 422]);
    expect(passes("idempotentOrder", reuse)).toBe(false);
    const tooMany = call(createApiState(), "POST", "/orders", { body: { product_id: 4, quantity: 10 } });
    expect(tooMany.res.status).toBe(409);
    expect(passes("idempotentOrder", run([order("k-9", 10)]))).toBe(false);
  });
  it("đơn có khoá kèm một đơn không khoá khác vẫn xanh (chỉ đếm đơn mang khoá đó)", () => {
    const s = run([order(), order("k-2"), order("k-2")]);
    expect(s.orders).toHaveLength(2);
    expect(passes("idempotentOrder", s)).toBe(true);
  });
});
