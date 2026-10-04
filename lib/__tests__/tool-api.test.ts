import { describe, it, expect } from "vitest";
import {
  BASE_URL,
  DEMO_TOKEN,
  createApiState,
  jsonError,
  paramsFromUrl,
  parseUrl,
  prettyJson,
  sendRequest,
  tokenizeJson,
  urlWithParams,
  type ApiState,
  type HttpMethod,
  type HttpResponse,
} from "@/lib/tools/api/engine";
import { API_MISSIONS } from "@/lib/tools/api/missions";
import { COLLECTION, bodyFor, buildHeaders } from "@/lib/tools/api/collection";
import { toolApiEn, toolApiVi } from "@/lib/i18n/dictionaries/sections/tool-api";

const T0 = 1_800_000_000_000;

function call(
  state: ApiState,
  method: HttpMethod,
  path: string,
  opts: { body?: unknown; headers?: Record<string, string>; now?: number; raw?: string } = {},
) {
  const body = opts.raw ?? (opts.body === undefined ? "" : JSON.stringify(opts.body));
  const headers: Record<string, string> = { ...(body ? { "Content-Type": "application/json" } : {}), ...opts.headers };
  const { state: next, result } = sendRequest(
    state,
    { method, url: path.startsWith("http") ? path : `${BASE_URL}${path}`, headers, body },
    opts.now ?? T0,
  );
  return { state: next, res: result as HttpResponse };
}

const header = (res: HttpResponse, name: string) =>
  res.headers.find(([k]) => k.toLowerCase() === name.toLowerCase())?.[1];

describe("api engine: products", () => {
  it("lists products and filters by category and limit", () => {
    const s = createApiState();
    const all = call(s, "GET", "/products").res;
    expect(all.status).toBe(200);
    expect(all.statusText).toBe("OK");
    expect(JSON.parse(all.body).total).toBe(6);

    const acc = JSON.parse(call(s, "GET", "/products?category=accessories&limit=2").res.body);
    expect(acc.total).toBe(3);
    expect(acc.data).toHaveLength(2);
    expect(acc.data.every((p: { category: string }) => p.category === "accessories")).toBe(true);

    expect(call(s, "GET", "/products?limit=abc").res.status).toBe(400);
  });

  it("returns 404 for a missing product and for an unknown route", () => {
    const s = createApiState();
    const res = call(s, "GET", "/products/999").res;
    expect(res.status).toBe(404);
    expect(JSON.parse(res.body).error).toBe("not_found");
    expect(call(s, "GET", "/nope").res.status).toBe(404);
  });

  it("creates a product with 201 + Location, and persists it", () => {
    const { state, res } = call(createApiState(), "POST", "/products", {
      body: { name: "Webcam", price: 890000, category: "accessories" },
    });
    expect(res.status).toBe(201);
    expect(header(res, "Location")).toBe("/v1/products/7");
    expect(call(state, "GET", "/products/7").res.status).toBe(200);
  });

  it("rejects invalid bodies with 400 and field details", () => {
    const s = createApiState();
    const bad = call(s, "POST", "/products", { body: { price: "abc", category: "food" } }).res;
    expect(bad.status).toBe(400);
    const err = JSON.parse(bad.body);
    expect(err.error).toBe("validation_failed");
    expect(err.details.map((d: { field: string }) => d.field).sort()).toEqual(["category", "name", "price"]);

    const broken = call(s, "POST", "/products", { raw: '{"name": "x",' }).res;
    expect(broken.status).toBe(400);
    expect(JSON.parse(broken.body).error).toBe("invalid_json");
  });

  it("returns 415 when the body is not sent as JSON", () => {
    const s = createApiState();
    const res = call(s, "POST", "/products", {
      raw: '{"name":"Webcam","price":1,"category":"audio"}',
      headers: { "Content-Type": "text/plain" },
    }).res;
    expect(res.status).toBe(415);
    const none = sendRequest(s, { method: "POST", url: `${BASE_URL}/products`, headers: {}, body: "{}" }, T0)
      .result as HttpResponse;
    expect(none.status).toBe(415);
  });

  it("updates with PUT and PATCH, deletes with 204", () => {
    let s = createApiState();
    const patched = call(s, "PATCH", "/products/2", { body: { price: 990000 } });
    expect(patched.res.status).toBe(200);
    expect(JSON.parse(patched.res.body)).toMatchObject({ id: 2, price: 990000, name: "Mechanical Keyboard K2" });
    s = patched.state;

    expect(call(s, "PUT", "/products/2", { body: { price: 5 } }).res.status).toBe(400);
    const put = call(s, "PUT", "/products/2", { body: { name: "K3", price: 5, category: "accessories" } });
    expect(put.res.status).toBe(200);
    expect(JSON.parse(put.res.body).stock).toBe(0);

    const del = call(put.state, "DELETE", "/products/6");
    expect(del.res.status).toBe(204);
    expect(del.res.body).toBe("");
    expect(call(del.state, "GET", "/products/6").res.status).toBe(404);
    expect(call(del.state, "DELETE", "/products/6").res.status).toBe(404);
  });

  it("answers 405 with an Allow header for an unsupported method", () => {
    const res = call(createApiState(), "DELETE", "/products").res;
    expect(res.status).toBe(405);
    expect(header(res, "Allow")).toBe("GET, POST");
  });
});

describe("api engine: auth and rate limit", () => {
  it("logs in and guards /me with a bearer token", () => {
    const s = createApiState();
    expect(call(s, "POST", "/login", { body: { email: "a@b.c" } }).res.status).toBe(400);
    expect(call(s, "POST", "/login", { body: { email: "a@b.c", password: "nope" } }).res.status).toBe(401);
    const login = call(s, "POST", "/login", { body: { email: "a@b.c", password: "demo123" } }).res;
    expect(login.status).toBe(200);
    expect(JSON.parse(login.body).token).toBe(DEMO_TOKEN);

    const anon = call(s, "GET", "/me").res;
    expect(anon.status).toBe(401);
    expect(header(anon, "WWW-Authenticate")).toContain("Bearer");
    expect(call(s, "GET", "/me", { headers: { Authorization: "Bearer wrong" } }).res.status).toBe(401);
    expect(call(s, "GET", "/me", { headers: { authorization: `Bearer ${DEMO_TOKEN}` } }).res.status).toBe(200);
    expect(call(s, "GET", "/admin/stats", { headers: { Authorization: `Bearer ${DEMO_TOKEN}` } }).res.status).toBe(403);
  });

  it("rate-limits /reports to 3 calls a minute with Retry-After", () => {
    let s = createApiState();
    for (let i = 0; i < 3; i++) {
      const r = call(s, "GET", "/reports", { now: T0 + i * 1000 });
      expect(r.res.status).toBe(200);
      s = r.state;
    }
    const limited = call(s, "GET", "/reports", { now: T0 + 10_000 });
    expect(limited.res.status).toBe(429);
    expect(header(limited.res, "Retry-After")).toBe("50");
    expect(call(limited.state, "GET", "/reports", { now: T0 + 61_000 }).res.status).toBe(200);
  });
});

describe("api engine: network, url and json helpers", () => {
  it("reports invalid URLs and unknown hosts as network errors", () => {
    const s = createApiState();
    const bad = sendRequest(s, { method: "GET", url: "api/products", headers: {}, body: "" }, T0);
    expect(bad.result).toMatchObject({ kind: "error", code: "INVALID_URL" });
    const host = sendRequest(s, { method: "GET", url: "https://example.org/v1", headers: {}, body: "" }, T0);
    expect(host.result).toMatchObject({ kind: "error", code: "ENOTFOUND", host: "example.org" });
    expect(host.state.history.at(-1)?.status).toBe(0);
  });

  it("round-trips query params through the URL", () => {
    expect(parseUrl(`${BASE_URL}/products?category=audio`)?.query).toEqual([["category", "audio"]]);
    const url = urlWithParams(`${BASE_URL}/products?x=1`, [["category", "a b"], ["limit", "2"]]);
    expect(url).toBe(`${BASE_URL}/products?category=a%20b&limit=2`);
    expect(paramsFromUrl(url)).toEqual([["category", "a b"], ["limit", "2"]]);
    expect(urlWithParams(url, [])).toBe(`${BASE_URL}/products`);
  });

  it("validates, formats and tokenizes JSON", () => {
    expect(jsonError('{"a":1}')).toBeNull();
    expect(jsonError("{a:1}")).toBeTypeOf("string");
    expect(prettyJson('{"a":1}')).toBe('{\n  "a": 1\n}');
    const types = tokenizeJson('{"a": "x", "b": 2, "c": true}').map((t) => t.type);
    expect(types).toContain("key");
    expect(types).toContain("string");
    expect(types).toContain("number");
    expect(types).toContain("literal");
    expect(
      tokenizeJson('{"a": [1, null]}')
        .map((t) => t.text)
        .join(""),
    ).toBe('{"a": [1, null]}');
  });

  it("measures response time and size", () => {
    const res = call(createApiState(), "GET", "/products").res;
    expect(res.timeMs).toBeGreaterThan(0);
    expect(res.sizeBytes).toBeGreaterThan(res.body.length);
  });
});

describe("api collection", () => {
  it("every collection request succeeds against a fresh API (except /me, which needs a token)", () => {
    for (const item of COLLECTION) {
      const d = item.request;
      const { result } = sendRequest(
        createApiState(),
        { method: d.method, url: d.url, headers: buildHeaders(d), body: bodyFor(d) },
        T0,
      );
      const status = (result as HttpResponse).status;
      // /me, /partner/inventory và /admin/stats cố ý bắt đầu bằng 401: người học phải tự thêm token hoặc khoá.
      if (item.id === "me" || item.id === "partnerInventory" || item.id === "adminStats") expect(status).toBe(401);
      else expect(status, item.id).toBeLessThan(300);
    }
  });

  it("has copy for every collection item in both languages", () => {
    for (const item of COLLECTION) {
      expect(toolApiVi.toolApi.collection[item.id]).toBeTruthy();
      expect(toolApiEn.toolApi.collection[item.id]).toBeTruthy();
    }
  });
});

describe("api missions", () => {
  it("has 6-30 missions with unique ids and vi+en copy", () => {
    expect(API_MISSIONS.length).toBeGreaterThanOrEqual(6);
    expect(API_MISSIONS.length).toBeLessThanOrEqual(30);
    expect(new Set(API_MISSIONS.map((m) => m.id)).size).toBe(API_MISSIONS.length);
    for (const m of API_MISSIONS) {
      for (const dict of [toolApiVi, toolApiEn]) {
        expect(dict.toolApi.missions[m.id].title).toBeTruthy();
        expect(dict.toolApi.missions[m.id].hint).toBeTruthy();
      }
    }
  });

  it("starts with nothing done", () => {
    const s = createApiState();
    expect(API_MISSIONS.filter((m) => m.check(s))).toEqual([]);
  });

  it("each mission is completed by the action it describes, in order", () => {
    let s = createApiState();
    const done = () => API_MISSIONS.filter((m) => m.check(s)).map((m) => m.id);
    const step = (method: HttpMethod, path: string, opts: Parameters<typeof call>[3] = {}) => {
      s = call(s, method, path, opts).state;
    };

    step("GET", "/products");
    expect(done()).toEqual(["firstGet"]);
    step("GET", "/products?category=audio");
    expect(done()).toContain("filterCategory");
    step("GET", "/products/999");
    expect(done()).toContain("readNotFound");
    step("POST", "/products", { body: { name: "Webcam", price: 890000, category: "accessories" } });
    expect(done()).toContain("createProduct");
    step("POST", "/products", { body: { name: "Webcam", price: "abc", category: "accessories" } });
    expect(done()).toContain("badRequest");

    step("GET", "/me");
    expect(done()).not.toContain("loginThenMe");
    step("POST", "/login", { body: { email: "demo@cua-hang.dev", password: "demo123" } });
    expect(done()).not.toContain("loginThenMe");
    step("GET", "/me", { headers: { Authorization: `Bearer ${DEMO_TOKEN}` } });
    expect(done()).toContain("loginThenMe");

    step("PATCH", "/products/2", { body: { price: 990000 } });
    expect(done()).toContain("patchPrice");
    step("DELETE", "/products/6");
    expect(done()).toContain("deleteProduct");

    expect(done()).toEqual(
      expect.arrayContaining([
        "firstGet", "filterCategory", "readNotFound", "createProduct",
        "badRequest", "loginThenMe", "patchPrice", "deleteProduct",
      ]),
    );
  });
});
